import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBJCizewKv2IJ6CFu_kR29Uxnv-PgpjYXU",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "fixdeal-ecf99.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "fixdeal-ecf99",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "fixdeal-ecf99.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1044741294368",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1044741294368:web:895b1c86bd947a8acd2f45",
};

// Check if Firebase config is valid
const isFirebaseConfigValid = !!firebaseConfig.apiKey && firebaseConfig.apiKey !== 'undefined';

if (!isFirebaseConfigValid) {
  console.warn('Firebase configuration is missing or invalid. Please set your environment variables.');
}

const app = isFirebaseConfigValid ? initializeApp(firebaseConfig) : {} as any;
export const auth = isFirebaseConfigValid ? getAuth(app) : {} as any;
export const db = isFirebaseConfigValid ? getFirestore(app) : {} as any;
export const storage = isFirebaseConfigValid ? getStorage(app) : {} as any;
export const googleProvider = new GoogleAuthProvider();
export { isFirebaseConfigValid };
