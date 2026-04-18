import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Upload, DollarSign, ShieldCheck, Clock } from 'lucide-react';

export const Sell = () => {
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
          <h2 className="text-3xl font-bold mb-4">Request Received!</h2>
          <p className="text-zinc-500 mb-8 leading-relaxed">
            Our evaluation team will review your item details and contact you within 24 hours with a fair market offer.
          </p>
          <button 
            onClick={() => setIsSubmitted(false)}
            className="w-full bg-brand-dark text-white py-4 rounded-2xl font-bold hover:bg-brand-primary transition-all active:scale-95"
          >
            Back to Home
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
            Sell your items for the <span className="text-brand-dark">best price</span> in Sri Lanka
          </h1>
          <p className="text-lg text-zinc-600 mb-12 leading-relaxed">
            Get a quick, fair, and transparent evaluation for your items. We handle all the paperwork and ensure a hassle-free transaction.
          </p>

          <div className="space-y-8">
            {[
              { icon: DollarSign, title: 'Best Market Price', desc: 'We offer competitive prices based on real-time market data.' },
              { icon: ShieldCheck, title: 'Safe & Secure', desc: 'Verified transactions and secure payment on delivery.' },
              { icon: Clock, title: 'Quick Process', desc: 'Get an offer within 24 hours and sell your car in days.' }
            ].map((item, i) => (
              <div key={i} className="flex gap-6">
                <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center shrink-0">
                  <item.icon className="text-brand-dark w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 md:p-10 rounded-[32px] md:rounded-[40px] shadow-xl border border-zinc-100">
          <h2 className="text-2xl font-bold mb-8">Item Details</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-700">Category</label>
                <input required type="text" placeholder="e.g. Electronics" className="w-full px-4 py-3 bg-zinc-50 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-brand-dark/20" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-700">Item Name</label>
                <input required type="text" placeholder="e.g. iPhone 15 Pro" className="w-full px-4 py-3 bg-zinc-50 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-brand-dark/20" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-700">Year</label>
                <input required type="number" placeholder="2022" className="w-full px-4 py-3 bg-zinc-50 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-brand-dark/20" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-700">Mileage (KM)</label>
                <input required type="number" placeholder="45000" className="w-full px-4 py-3 bg-zinc-50 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-brand-dark/20" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-700">Upload Photos</label>
              <div className="border-2 border-dashed border-zinc-200 rounded-2xl p-8 text-center hover:border-brand-dark/50 transition-colors cursor-pointer">
                <Upload className="w-8 h-8 text-zinc-400 mx-auto mb-4" />
                <p className="text-sm text-zinc-500">Drag and drop or click to upload</p>
              </div>
            </div>
            <button type="submit" className="w-full bg-brand-dark text-white py-4 rounded-2xl font-bold hover:bg-brand-primary transition-all active:scale-95 shadow-xl shadow-brand-dark/20">
              Submit for Evaluation
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
