import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Send, CheckCircle2 } from 'lucide-react';

export const ContactUs = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="pt-40 pb-20 min-h-screen bg-zinc-50 flex items-center justify-center px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white p-12 rounded-[40px] shadow-xl text-center"
        >
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="text-emerald-600 w-10 h-10" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Message Sent!</h2>
          <p className="text-zinc-500 mb-8 leading-relaxed">
            Thank you for reaching out. Our team will get back to you as soon as possible.
          </p>
          <button 
            onClick={() => setIsSubmitted(false)}
            className="w-full bg-brand-dark text-white py-4 rounded-2xl font-bold hover:bg-brand-primary transition-all active:scale-95"
          >
            Send Another Message
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 min-h-screen bg-zinc-50">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-start">
        <div>
          <h1 className="font-display text-5xl md:text-6xl font-extrabold leading-tight mb-8">
            Get in <span className="text-brand-dark">touch</span> with us
          </h1>
          <p className="text-lg text-zinc-600 mb-12 leading-relaxed">
            Have a question or need assistance? Our team is here to help you with any inquiries you may have.
          </p>

          <div className="space-y-8">
            <div className="flex gap-6">
              <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center shrink-0">
                <Phone className="text-brand-dark w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Phone</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">+971 50 231 6225</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center shrink-0">
                <Mail className="text-brand-dark w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Email</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">info@letsdeal.ae</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center shrink-0">
                <MapPin className="text-brand-dark w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Location</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">Dubai, United Arab Emirates</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-10 rounded-[40px] shadow-xl border border-zinc-100">
          <h2 className="text-2xl font-bold mb-8">Send a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-700">First Name</label>
                <input required type="text" placeholder="John" className="w-full px-4 py-3 bg-zinc-50 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-brand-dark/20" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-700">Last Name</label>
                <input required type="text" placeholder="Doe" className="w-full px-4 py-3 bg-zinc-50 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-brand-dark/20" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-700">Email Address</label>
              <input required type="email" placeholder="john@example.com" className="w-full px-4 py-3 bg-zinc-50 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-brand-dark/20" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-700">Message</label>
              <textarea required rows={4} placeholder="How can we help you?" className="w-full px-4 py-3 bg-zinc-50 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-brand-dark/20 resize-none"></textarea>
            </div>
            <button type="submit" className="w-full bg-brand-dark text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-brand-primary transition-all active:scale-95 shadow-xl shadow-brand-dark/20">
              <Send className="w-5 h-5" /> Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
