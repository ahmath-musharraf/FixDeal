import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit, 
  startAfter, 
  serverTimestamp, 
  getCountFromServer,
  setDoc
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage, isFirebaseConfigValid } from '../lib/firebase';
import { AdListing, AdStatus, UserProfile, Chat, Message, Report } from '../types';

// Ads Services
export const postAd = async (adData: Omit<AdListing, 'id' | 'status' | 'isVerified' | 'createdAt' | 'isFeatured' | 'isPremium' | 'reportCount'>) => {
  if (!isFirebaseConfigValid) throw new Error('Firebase not configured');
  const adsRef = collection(db, 'ads');
  const docRef = await addDoc(adsRef, {
    ...adData,
    status: 'pending',
    isVerified: false,
    isFeatured: false,
    isPremium: false,
    reportCount: 0,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
};

export const updateAd = async (adId: string, adData: Partial<AdListing>) => {
  if (!isFirebaseConfigValid) return;
  const adRef = doc(db, 'ads', adId);
  await updateDoc(adRef, adData);
};

export const deleteAd = async (adId: string) => {
  if (!isFirebaseConfigValid) return;
  const adRef = doc(db, 'ads', adId);
  await deleteDoc(adRef);
};

export const getAdById = async (adId: string): Promise<AdListing | null> => {
  if (!isFirebaseConfigValid) return null;
  const adRef = doc(db, 'ads', adId);
  const adSnap = await getDoc(adRef);
  if (adSnap.exists()) {
    return { id: adSnap.id, ...adSnap.data() } as AdListing;
  }
  return null;
};

export const getAds = async (filters: { 
  category?: string; 
  status?: AdStatus; 
  userId?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  limitCount?: number;
  lastDoc?: any;
}) => {
  if (!isFirebaseConfigValid) return [];
  try {
    let q = query(collection(db, 'ads'), orderBy('createdAt', 'desc'));

    if (filters.category) {
      q = query(q, where('category', '==', filters.category));
    }
    if (filters.status) {
      q = query(q, where('status', '==', filters.status));
    }
    if (filters.userId) {
      q = query(q, where('userId', '==', filters.userId));
    }
    if (filters.minPrice !== undefined) {
      q = query(q, where('price', '>=', filters.minPrice));
    }
    if (filters.maxPrice !== undefined) {
      q = query(q, where('price', '<=', filters.maxPrice));
    }
    if (filters.limitCount) {
      q = query(q, limit(filters.limitCount));
    }
    if (filters.lastDoc) {
      q = query(q, startAfter(filters.lastDoc));
    }

    const querySnapshot = await getDocs(q);
    const ads = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as AdListing));
    
    // Client-side search for title (Firestore doesn't support full-text search natively)
    if (filters.search) {
      return ads.filter(ad => ad.title.toLowerCase().includes(filters.search!.toLowerCase()));
    }

    return ads;
  } catch (error) {
    console.error('Error fetching ads:', error);
    return [];
  }
};

// Admin Services
export const approveAd = async (adId: string) => {
  if (!isFirebaseConfigValid) return;
  const adRef = doc(db, 'ads', adId);
  await updateDoc(adRef, {
    status: 'approved',
    isVerified: true
  });
};

export const rejectAd = async (adId: string) => {
  if (!isFirebaseConfigValid) return;
  const adRef = doc(db, 'ads', adId);
  await updateDoc(adRef, {
    status: 'rejected',
    isVerified: false
  });
};

export const getAllUsers = async () => {
  if (!isFirebaseConfigValid) return [];
  const usersRef = collection(db, 'users');
  const querySnapshot = await getDocs(usersRef);
  return querySnapshot.docs.map(doc => doc.data() as UserProfile);
};

export const updateUserRole = async (uid: string, role: 'client' | 'admin') => {
  const userRef = doc(db, 'users', uid);
  await updateDoc(userRef, { role });
};

export const getAnalyticsSummary = async () => {
  if (!isFirebaseConfigValid) return null;
  const adsCol = collection(db, 'ads');
  const usersCol = collection(db, 'users');

  const totalAds = await getCountFromServer(adsCol);
  const pendingAds = await getCountFromServer(query(adsCol, where('status', '==', 'pending')));
  const approvedAds = await getCountFromServer(query(adsCol, where('status', '==', 'approved')));
  const totalUsers = await getCountFromServer(usersCol);

  return {
    totalAds: totalAds.data().count,
    pendingAds: pendingAds.data().count,
    approvedAds: approvedAds.data().count,
    totalUsers: totalUsers.data().count,
  };
};

// Report Services
export const reportAd = async (reportData: Omit<Report, 'id' | 'createdAt'>) => {
  if (!isFirebaseConfigValid) return;
  const reportsRef = collection(db, 'reports');
  await addDoc(reportsRef, {
    ...reportData,
    createdAt: serverTimestamp(),
  });
  
  const adRef = doc(db, 'ads', reportData.adId);
  const adSnap = await getDoc(adRef);
  if (adSnap.exists()) {
    const currentCount = adSnap.data().reportCount || 0;
    await updateDoc(adRef, { reportCount: currentCount + 1 });
  }
};

export const getReports = async () => {
  if (!isFirebaseConfigValid) return [];
  const q = query(collection(db, 'reports'), orderBy('createdAt', 'desc'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as unknown as Report));
};

// Chat Services
export const startChat = async (chatData: Omit<Chat, 'id' | 'lastMessage' | 'lastMessageAt' | 'unreadCount'>) => {
  if (!isFirebaseConfigValid) throw new Error('Firebase not configured');
  
  // Check if chat already exists
  const chatsRef = collection(db, 'chats');
  const q = query(
    chatsRef, 
    where('adId', '==', chatData.adId),
    where('buyerId', '==', chatData.buyerId)
  );
  const querySnapshot = await getDocs(q);
  
  if (!querySnapshot.empty) {
    return querySnapshot.docs[0].id;
  }
  
  const docRef = await addDoc(chatsRef, {
    ...chatData,
    lastMessage: '',
    lastMessageAt: serverTimestamp(),
    unreadCount: {
      [chatData.buyerId]: 0,
      [chatData.sellerId]: 0
    }
  });
  return docRef.id;
};

export const sendMessage = async (chatId: string, senderId: string, text: string) => {
  if (!isFirebaseConfigValid) return;
  
  const messagesRef = collection(db, 'chats', chatId, 'messages');
  await addDoc(messagesRef, {
    chatId,
    senderId,
    text,
    createdAt: serverTimestamp(),
  });
  
  const chatRef = doc(db, 'chats', chatId);
  const chatSnap = await getDoc(chatRef);
  if (chatSnap.exists()) {
    const data = chatSnap.data();
    const recipientId = data.buyerId === senderId ? data.sellerId : data.buyerId;
    const currentUnread = data.unreadCount?.[recipientId] || 0;
    
    await updateDoc(chatRef, {
      lastMessage: text,
      lastMessageAt: serverTimestamp(),
      [`unreadCount.${recipientId}`]: currentUnread + 1
    });
  }
};

export const getChats = async (userId: string) => {
  if (!isFirebaseConfigValid) return [];
  try {
    const chatsRef = collection(db, 'chats');
    const q1 = query(chatsRef, where('buyerId', '==', userId), orderBy('lastMessageAt', 'desc'));
    const q2 = query(chatsRef, where('sellerId', '==', userId), orderBy('lastMessageAt', 'desc'));
    
    const [snap1, snap2] = await Promise.all([getDocs(q1), getDocs(q2)]);
    const chats = [...snap1.docs, ...snap2.docs].map(doc => ({ id: doc.id, ...doc.data() } as Chat));
    return chats.sort((a, b) => (b.lastMessageAt?.toMillis() || 0) - (a.lastMessageAt?.toMillis() || 0));
  } catch (error) {
    console.error('Error fetching chats:', error);
    return [];
  }
};

export const getMessages = async (chatId: string) => {
  if (!isFirebaseConfigValid) return [];
  const messagesRef = collection(db, 'chats', chatId, 'messages');
  const q = query(messagesRef, orderBy('createdAt', 'asc'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Message));
};

export const markChatAsRead = async (chatId: string, userId: string) => {
  if (!isFirebaseConfigValid) return;
  const chatRef = doc(db, 'chats', chatId);
  await updateDoc(chatRef, {
    [`unreadCount.${userId}`]: 0
  });
};

export const getFeaturedAds = async (limitCount: number = 6) => {
  if (!isFirebaseConfigValid) return [];
  try {
    // Querying by status 'approved' to satisfy security rules
    // This avoids "Missing or insufficient permissions" and doesn't require a composite index
    const q = query(
      collection(db, 'ads'), 
      where('status', '==', 'approved'),
      limit(100) // Fetch a larger batch to find featured ones
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() } as AdListing))
      .filter(ad => ad.isFeatured === true) // Filter featured in memory
      .sort((a, b) => (b.createdAt?.toMillis() || 0) - (a.createdAt?.toMillis() || 0))
      .slice(0, limitCount);
  } catch (error) {
    console.error('Error fetching featured ads:', error);
    return [];
  }
};

// Storage Services
export const uploadImage = async (file: File, userId: string) => {
  if (!isFirebaseConfigValid) throw new Error('Firebase not configured');
  const storageRef = ref(storage, `ads/${userId}/${Date.now()}_${file.name}`);
  const snapshot = await uploadBytes(storageRef, file);
  return getDownloadURL(snapshot.ref);
};
