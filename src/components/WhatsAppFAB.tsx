import React from 'react';
import { MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';

export const WhatsAppFAB = () => {
  const phoneNumber = '94771234567'; // Replace with actual WhatsApp number
  const message = 'Hello FIX DEAL, I am interested in your services.';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-24 md:bottom-8 right-6 md:right-8 z-[9999] w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl shadow-emerald-500/30 group"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="w-8 h-8 fill-current" />
      <span className="absolute right-full mr-4 px-4 py-2 bg-white text-brand-dark text-sm font-bold rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-zinc-100">
        Chat with us
      </span>
    </motion.a>
  );
};
