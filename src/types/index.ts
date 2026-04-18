export type UserRole = 'client' | 'admin';

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  role: UserRole;
  verified: boolean;
  createdAt: any;
}

export type AdCategory = 'Vehicles' | 'Motorcycle' | 'Electronics';
export type AdStatus = 'pending' | 'approved' | 'rejected';

export interface AdListing {
  id: string;
  title: string;
  description: string;
  price: number;
  category: AdCategory;
  images: string[];
  location: string;
  userId: string;
  status: AdStatus;
  isVerified: boolean;
  isFeatured: boolean;
  isPremium: boolean;
  boostedUntil?: any;
  reportCount: number;
  createdAt: any;
  userName?: string; // For display
}

export interface Chat {
  id: string;
  adId: string;
  adTitle: string;
  adImage: string;
  buyerId: string;
  sellerId: string;
  lastMessage: string;
  lastMessageAt: any;
  unreadCount: { [key: string]: number };
}

export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  text: string;
  createdAt: any;
}

export interface Report {
  id: string;
  adId: string;
  reporterId: string;
  reason: string;
  createdAt: any;
}

export interface AnalyticsSummary {
  totalAds: number;
  pendingAds: number;
  approvedAds: number;
  totalUsers: number;
}
