export type UserRole = 'client' | 'admin';

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  role: UserRole;
  verified: boolean;
  createdAt: any; // Firestore Timestamp
  phoneNumber?: string;
  photoURL?: string;
}

export type AdStatus = 'pending' | 'approved' | 'rejected';

export interface Ad {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  location: string;
  userId: string;
  userName: string;
  status: AdStatus;
  isVerified: boolean;
  isFeatured: boolean;
  isPremium: boolean;
  phoneNumber: string;
  createdAt: any; // Firestore Timestamp
  updatedAt?: any;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  createdAt: any;
  adId: string;
}

export const CATEGORIES = [
  'Vehicles',
  'Motorcycle',
  'Electronics'
];

export const LOCATIONS = [
  'Colombo',
  'Kandy',
  'Galle',
  'Jaffna',
  'Gampaha',
  'Kurunegala',
  'Matara',
  'Anuradhapura',
  'Ratnapura',
  'Badulla'
];
