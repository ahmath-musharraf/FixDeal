# FIX DEAL - The Future of Buying & Selling in Sri Lanka 🇱🇰

A modern, clean, and professional marketplace built with React, TypeScript, Tailwind CSS, and Firebase.

## Features

- **Authentication:** Email/Password & Google OAuth via Firebase.
- **User Roles:** Client and Admin roles with protected routes.
- **Ad Management:** Users can post, edit, and delete ads with multiple image uploads.
- **Admin Dashboard:** Moderators can approve/reject ads, manage users, and view platform analytics.
- **Responsive Design:** Fully optimized for mobile and desktop with smooth animations.
- **Search & Filters:** Real-time search and category-based filtering.

## Tech Stack

- **Frontend:** React 18, Vite, TypeScript, Tailwind CSS, Framer Motion (motion/react).
- **Backend:** Firebase (Auth, Firestore, Storage).
- **Icons:** Lucide React.
- **Date Handling:** date-fns.

## Getting Started

### 1. Firebase Setup

1. Create a new project in the [Firebase Console](https://console.firebase.google.com/).
2. Enable **Authentication** with Email/Password and Google providers.
3. Create a **Firestore Database** in test mode (or production mode with the provided rules).
4. Create a **Storage** bucket.
5. Register a Web App and copy the configuration.

### 2. Environment Variables

Create a `.env` file in the root directory and populate it with your Firebase keys:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 3. Firestore Security Rules

Copy the contents of `firestore.rules` into the "Rules" tab of your Firestore database in the Firebase Console.

### 4. Installation

```bash
npm install
npm run dev
```

## Folder Structure

- `/src/components`: Reusable UI components.
- `/src/context`: Authentication context.
- `/src/lib`: Firebase initialization.
- `/src/pages`: Main application pages.
- `/src/services`: Database and storage services.
- `/src/types`: TypeScript interfaces.

## Admin Setup

To make a user an admin:
1. Register a user.
2. Go to Firestore Console.
3. Find the user's document in the `users` collection.
4. Change the `role` field from `client` to `admin`.
