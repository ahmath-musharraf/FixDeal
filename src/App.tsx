import React, { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WhatsAppFAB } from './components/WhatsAppFAB';
import { ProtectedRoute, AdminRoute } from './components/AuthRoutes';
import { SetupRequired } from './components/SetupRequired';
import { isFirebaseConfigValid } from './lib/firebase';
import { motion, AnimatePresence } from 'motion/react';

// Lazy load pages for performance
const Home = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const Buy = lazy(() => import('./pages/Buy').then(m => ({ default: m.Buy })));
const Sell = lazy(() => import('./pages/Sell').then(m => ({ default: m.Sell })));
const Rent = lazy(() => import('./pages/Rent').then(m => ({ default: m.Rent })));
const Service = lazy(() => import('./pages/Service').then(m => ({ default: m.Service })));
const CarDetails = lazy(() => import('./pages/CarDetails').then(m => ({ default: m.CarDetails })));
const Login = lazy(() => import('./pages/Login').then(m => ({ default: m.Login })));
const Register = lazy(() => import('./pages/Register').then(m => ({ default: m.Register })));
const UserDashboard = lazy(() => import('./pages/UserDashboard').then(m => ({ default: m.UserDashboard })));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard').then(m => ({ default: m.AdminDashboard })));
const PostAd = lazy(() => import('./pages/PostAd').then(m => ({ default: m.PostAd })));
const AdDetail = lazy(() => import('./pages/AdDetail').then(m => ({ default: m.AdDetail })));
const CategoryListing = lazy(() => import('./pages/CategoryListing').then(m => ({ default: m.CategoryListing })));
const HelpCenter = lazy(() => import('./pages/HelpCenter').then(m => ({ default: m.HelpCenter })));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy').then(m => ({ default: m.PrivacyPolicy })));
const TermsOfService = lazy(() => import('./pages/TermsOfService').then(m => ({ default: m.TermsOfService })));
const ContactUs = lazy(() => import('./pages/ContactUs').then(m => ({ default: m.ContactUs })));
const Cookies = lazy(() => import('./pages/Cookies').then(m => ({ default: m.Cookies })));
const ChatList = lazy(() => import('./pages/ChatList').then(m => ({ default: m.ChatList })));
const ChatRoom = lazy(() => import('./pages/ChatRoom').then(m => ({ default: m.ChatRoom })));

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-zinc-50">
    <div className="w-12 h-12 border-4 border-brand-dark border-t-transparent rounded-full animate-spin" />
  </div>
);

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const PageWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.3, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

export default function App() {
  const location = useLocation();

  if (!isFirebaseConfigValid) {
    return <SetupRequired />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Navbar />
      <main className="flex-grow pb-24 md:pb-0">
        <AnimatePresence mode="wait">
          <Suspense fallback={<LoadingFallback />}>
            <Routes location={location}>
              <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
              <Route path="/buy" element={<PageWrapper><Buy /></PageWrapper>} />
              <Route path="/sell" element={<PageWrapper><Sell /></PageWrapper>} />
              <Route path="/rent" element={<PageWrapper><Rent /></PageWrapper>} />
              <Route path="/service" element={<PageWrapper><Service /></PageWrapper>} />
              <Route path="/car/:id" element={<PageWrapper><CarDetails /></PageWrapper>} />
              <Route path="/ad/:id" element={<PageWrapper><AdDetail /></PageWrapper>} />
              <Route path="/category/:category" element={<PageWrapper><CategoryListing /></PageWrapper>} />
              
              {/* Auth Pages */}
              <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
              <Route path="/register" element={<PageWrapper><Register /></PageWrapper>} />
              
              {/* User Dashboard */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <PageWrapper><UserDashboard /></PageWrapper>
                </ProtectedRoute>
              } />
              <Route path="/post-ad" element={
                <ProtectedRoute>
                  <PageWrapper><PostAd /></PageWrapper>
                </ProtectedRoute>
              } />

              {/* Chat System */}
              <Route path="/messages" element={
                <ProtectedRoute>
                  <PageWrapper><ChatList /></PageWrapper>
                </ProtectedRoute>
              } />
              <Route path="/chat/:chatId" element={
                <ProtectedRoute>
                  <PageWrapper><ChatRoom /></PageWrapper>
                </ProtectedRoute>
              } />
              
              {/* Admin Dashboard */}
              <Route path="/admin" element={
                <AdminRoute>
                  <PageWrapper><AdminDashboard /></PageWrapper>
                </AdminRoute>
              } />

              <Route path="/help" element={<PageWrapper><HelpCenter /></PageWrapper>} />
              <Route path="/privacy" element={<PageWrapper><PrivacyPolicy /></PageWrapper>} />
              <Route path="/terms" element={<PageWrapper><TermsOfService /></PageWrapper>} />
              <Route path="/contact" element={<PageWrapper><ContactUs /></PageWrapper>} />
              <Route path="/cookies" element={<PageWrapper><Cookies /></PageWrapper>} />
              <Route path="*" element={<PageWrapper><Home /></PageWrapper>} />
            </Routes>
          </Suspense>
        </AnimatePresence>
      </main>
      <Footer />
      <WhatsAppFAB />
    </div>
  );
}
