import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getChats } from '../services/db';
import { Chat } from '../types';
import { Link } from 'react-router-dom';
import { MessageSquare, ChevronRight, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { motion } from 'motion/react';

export const ChatList = () => {
  const { user } = useAuth();
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchChats();
    }
  }, [user]);

  const fetchChats = async () => {
    try {
      const userChats = await getChats(user!.uid);
      setChats(userChats);
    } catch (error) {
      console.error('Error fetching chats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-20 bg-zinc-50 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-brand-dark border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 bg-zinc-50 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-black mb-8">Messages</h1>
        
        {chats.length > 0 ? (
          <div className="space-y-4">
            {chats.map((chat) => {
              const unread = chat.unreadCount?.[user!.uid] || 0;
              return (
                <motion.div
                  key={chat.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Link 
                    to={`/chat/${chat.id}`}
                    className={`block bg-white p-6 rounded-3xl border border-zinc-100 shadow-sm hover:shadow-md transition-all group ${unread > 0 ? 'border-brand-dark/20 bg-brand-dark/5' : ''}`}
                  >
                    <div className="flex items-center gap-6">
                      <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0">
                        <img src={chat.adImage} alt={chat.adTitle} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-grow min-w-0">
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-bold text-lg truncate">{chat.adTitle}</h3>
                          <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest whitespace-nowrap">
                            {chat.lastMessageAt ? formatDistanceToNow(chat.lastMessageAt.toDate()) : ''} ago
                          </span>
                        </div>
                        <p className={`text-sm truncate ${unread > 0 ? 'text-zinc-900 font-bold' : 'text-zinc-500'}`}>
                          {chat.lastMessage || 'No messages yet'}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        {unread > 0 && (
                          <span className="bg-brand-dark text-white text-[10px] font-bold px-2 py-1 rounded-full">
                            {unread}
                          </span>
                        )}
                        <ChevronRight className="w-5 h-5 text-zinc-300 group-hover:text-brand-dark transition-colors" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white p-20 rounded-[40px] border border-dashed border-zinc-200 text-center">
            <div className="w-20 h-20 bg-zinc-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <MessageSquare className="text-zinc-300 w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-zinc-900 mb-2">No messages yet</h3>
            <p className="text-zinc-500 mb-8">When you start a conversation with a seller, it will appear here.</p>
            <Link to="/buy" className="text-brand-dark font-bold hover:underline">Browse Marketplace</Link>
          </div>
        )}
      </div>
    </div>
  );
};
