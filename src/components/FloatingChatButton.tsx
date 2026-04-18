import React, { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';

export const FloatingChatButton = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [unreadCount, setUnreadCount] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!user) {
      setUnreadCount(0);
      return;
    }

    const chatsRef = collection(db, 'chats');
    const q = query(
      chatsRef, 
      where('unreadCount.' + user.uid, '>', 0)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      let total = 0;
      snapshot.forEach((doc) => {
        const data = doc.data();
        total += data.unreadCount?.[user.uid] || 0;
      });
      setUnreadCount(total);
    });

    return () => unsubscribe();
  }, [user]);

  // Hide on chat pages
  const isChatPage = location.pathname.startsWith('/chat/') || location.pathname === '/messages';
  if (isChatPage) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-4"
        >
          <Link
            to="/messages"
            className="group relative flex items-center gap-3 bg-brand-dark text-white p-4 rounded-full shadow-2xl shadow-brand-dark/40 hover:bg-brand-primary transition-all active:scale-95"
          >
            <div className="relative">
              <MessageCircle className="w-6 h-6" />
              {unreadCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-brand-dark animate-bounce">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </div>
            <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 font-bold text-sm whitespace-nowrap">
              Messages
            </span>
          </Link>
          
          <button 
            onClick={() => setIsVisible(false)}
            className="bg-white/80 backdrop-blur-md text-zinc-400 p-1 rounded-full border border-zinc-200 hover:text-zinc-600 transition-colors"
          >
            <X className="w-3 h-3" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
