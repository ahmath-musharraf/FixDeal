import { initializeApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";
import { GoogleAuthProvider } from "firebase/auth";

// Replace these placeholder values with your actual Firebase project config.
// Get them from: https://console.firebase.google.com → Project Settings → Your apps → Web app
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "",
};

// Check if Firebase is configured
export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey &&
  firebaseConfig.projectId &&
  firebaseConfig.appId
);

let app: FirebaseApp | null = null;
let _auth: Auth | null = null;
let _db: Firestore | null = null;
let _storage: FirebaseStorage | null = null;

if (isFirebaseConfigured) {
  try {
    app = initializeApp(firebaseConfig);
    _auth = getAuth(app);
    _db = getFirestore(app);
    _storage = getStorage(app);
  } catch (e) {
    console.error("Firebase initialization error:", e);
  }
}

export const auth = _auth as Auth;
export const db = _db as Firestore;
export const storage = _storage as FirebaseStorage;
export const googleProvider = new GoogleAuthProvider();
