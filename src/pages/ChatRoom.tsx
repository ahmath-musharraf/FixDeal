import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getMessages, sendMessage, markChatAsRead, getAdById } from '../services/db';
import { Message, AdListing } from '../types';
import { ChevronLeft, Send, MapPin, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'motion/react';
import { db } from '../lib/firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

export const ChatRoom = () => {
  const { chatId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [ad, setAd] = useState<AdListing | null>(null);
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chatId || !user) return;

    // Mark as read
    markChatAsRead(chatId, user.uid);

    // Real-time listener for messages
    const messagesRef = collection(db, 'chats', chatId, 'messages');
    const q = query(messagesRef, orderBy('createdAt', 'asc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Message));
      setMessages(msgs);
      setLoading(false);
      scrollToBottom();
    });

    return () => unsubscribe();
  }, [chatId, user]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !chatId || !user) return;

    const text = newMessage;
    setNewMessage('');
    try {
      await sendMessage(chatId, user.uid, text);
    } catch (error) {
      console.error('Error sending message:', error);
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
      <div className="max-w-4xl mx-auto h-[calc(100vh-200px)] flex flex-col">
        {/* Header */}
        <div className="bg-white p-6 rounded-t-[40px] border border-zinc-100 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/messages" className="w-10 h-10 rounded-full bg-zinc-50 flex items-center justify-center hover:bg-zinc-100 transition-all">
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <div>
              <h2 className="font-bold text-lg">Chat</h2>
              <p className="text-xs text-zinc-400">Online</p>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-grow bg-white border-x border-zinc-100 overflow-y-auto p-8 space-y-6 no-scrollbar">
          {messages.map((msg) => {
            const isMe = msg.senderId === user?.uid;
            return (
              <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[70%] p-4 rounded-2xl text-sm ${isMe ? 'bg-brand-dark text-white rounded-tr-none' : 'bg-zinc-100 text-zinc-900 rounded-tl-none'}`}>
                  <p>{msg.text}</p>
                  <p className={`text-[10px] mt-1 opacity-50 ${isMe ? 'text-right' : 'text-left'}`}>
                    {msg.createdAt ? format(msg.createdAt.toDate(), 'HH:mm') : ''}
                  </p>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="bg-white p-6 rounded-b-[40px] border border-zinc-100 shadow-sm">
          <form onSubmit={handleSend} className="flex gap-4">
            <input 
              type="text" 
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-grow px-6 py-4 bg-zinc-50 rounded-2xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-brand-dark/20 transition-all"
            />
            <button 
              type="submit"
              disabled={!newMessage.trim()}
              className="w-14 h-14 bg-brand-dark text-white rounded-2xl flex items-center justify-center hover:bg-brand-primary transition-all shadow-lg shadow-brand-dark/20 disabled:opacity-50"
            >
              <Send className="w-6 h-6" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
