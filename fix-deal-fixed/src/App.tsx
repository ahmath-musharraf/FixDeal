import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Globe, Smartphone, AlertTriangle } from 'lucide-react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { isFirebaseConfigured } from './lib/firebase';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import Home from './pages/Home';
import SearchPage from './pages/Search';
import Login from './pages/Login';
import Register from './pages/Register';
import AdDetail from './pages/AdDetail';
import PostAd from './pages/PostAd';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import HelpCenter from './pages/HelpCenter';
import SafetyTips from './pages/SafetyTips';
import ContactUs from './pages/ContactUs';
import TermsOfService from './pages/TermsOfService';

const ProtectedRoute: React.FC<{ children: React.ReactNode; adminOnly?: boolean }> = ({ children, adminOnly }) => {
  const { user, profile, loading, isAdmin } = useAuth();

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (!user) return <Navigate to="/login" />;
  if (adminOnly && !isAdmin) return <Navigate to="/" />;

  return <>{children}</>;
};

function FirebaseSetupBanner() {
  if (isFirebaseConfigured) return null;
  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] bg-amber-50 border-b-2 border-amber-400 px-4 py-3 flex items-start gap-3">
      <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
      <div className="text-sm text-amber-800">
        <strong>Firebase not configured.</strong> Create a <code className="bg-amber-100 px-1 rounded">.env</code> file in the project root and add your Firebase credentials:
        <pre className="mt-1 text-xs bg-amber-100 rounded p-2 overflow-x-auto">
{`VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id`}
        </pre>
        Get these values from{' '}
        <a href="https://console.firebase.google.com" target="_blank" rel="noopener noreferrer" className="underline font-semibold">
          Firebase Console
        </a>{' '}→ Project Settings → Your apps → Web app.
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <FirebaseSetupBanner />
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/ad/:id" element={<AdDetail />} />
              
              <Route path="/post-ad" element={
                <ProtectedRoute>
                  <PostAd />
                </ProtectedRoute>
              } />
              
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <UserDashboard />
                </ProtectedRoute>
              } />

              <Route path="/admin" element={
                <ProtectedRoute adminOnly>
                  <AdminDashboard />
                </ProtectedRoute>
              } />

              <Route path="/help" element={<HelpCenter />} />
              <Route path="/safety" element={<SafetyTips />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/terms" element={<TermsOfService />} />
            </Routes>
          </main>
          <BottomNav />
          
          <footer className="bg-slate-900 text-slate-400 py-24 px-4">
            <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-xl">F</div>
                  <span className="text-2xl font-bold text-white tracking-tight">FIX DEAL</span>
                </div>
                <p className="max-w-sm mb-8 text-lg leading-relaxed">
                  The most trusted classified marketplace in Sri Lanka. Buy and sell everything from vehicles to electronics with ease.
                </p>
                <div className="flex gap-4">
                  {/* Social placeholders */}
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors cursor-pointer">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors cursor-pointer">
                    <Smartphone className="w-5 h-5" />
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-sm">Quick Links</h4>
                <ul className="space-y-4 text-base">
                  <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
                  <li><Link to="/search" className="hover:text-primary transition-colors">Browse Ads</Link></li>
                  <li><Link to="/post-ad" className="hover:text-primary transition-colors">Post an Ad</Link></li>
                  <li><Link to="/premium" className="hover:text-primary transition-colors">Premium Membership</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-sm">Support</h4>
                <ul className="space-y-4 text-base">
                  <li><Link to="/help" className="hover:text-primary transition-colors">Help Center</Link></li>
                  <li><Link to="/safety" className="hover:text-primary transition-colors">Safety Tips</Link></li>
                  <li><Link to="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
                  <li><Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
                </ul>
              </div>
            </div>
            <div className="max-w-[1440px] mx-auto mt-20 pt-8 border-t border-white/5 text-center text-sm">
              <p className="mb-2">&copy; {new Date().getFullYear()} FIX DEAL Sri Lanka. All rights reserved.</p>
              <p className="text-slate-500">
                Website created by <a href="https://mushieditz.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-bold">Mushi Editz</a>
              </p>
            </div>
          </footer>
        </div>
        <Toaster position="bottom-right" />
      </Router>
    </AuthProvider>
  );
}

export default App;
