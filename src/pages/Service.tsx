import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Wrench, ShieldCheck, Clock, CheckCircle2, Calendar, User, Mail, Phone } from 'lucide-react';

export const Service = () => {
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
          <h2 className="text-3xl font-bold mb-4">Booking Confirmed!</h2>
          <p className="text-zinc-500 mb-8 leading-relaxed">
            Your service appointment has been scheduled. Our team will contact you shortly to confirm the details.
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
            Expert <span className="text-brand-dark">services</span> you can trust
          </h1>
          <p className="text-lg text-zinc-600 mb-12 leading-relaxed">
            From professional consultations to home services, our certified experts ensure you get the best experience in Sri Lanka.
          </p>

          <div className="space-y-8">
            {[
              { icon: Wrench, title: 'Certified Technicians', desc: 'Expert mechanics with years of experience in luxury and supercars.' },
              { icon: ShieldCheck, title: 'Genuine Parts', desc: 'We only use original manufacturer parts for all repairs and services.' },
              { icon: Clock, title: 'Same-Day Service', desc: 'Most routine maintenance tasks are completed within the same day.' }
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
          <h2 className="text-2xl font-bold mb-8">Book an Appointment</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-700">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 w-4 h-4" />
                  <input required type="text" placeholder="John Doe" className="w-full pl-12 pr-4 py-3 bg-zinc-50 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-brand-dark/20" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-700">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 w-4 h-4" />
                  <input required type="tel" placeholder="+94" className="w-full pl-12 pr-4 py-3 bg-zinc-50 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-brand-dark/20" />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-700">Service Type</label>
              <select className="w-full px-4 py-3 bg-zinc-50 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-brand-dark/20 appearance-none">
                <option>Home Delivery</option>
                <option>Professional Consultation</option>
                <option>Technical Support</option>
                <option>Installation Service</option>
                <option>Other</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-700">Preferred Date</label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 w-4 h-4" />
                <input required type="date" className="w-full pl-12 pr-4 py-3 bg-zinc-50 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-brand-dark/20" />
              </div>
            </div>
            <button type="submit" className="w-full bg-brand-dark text-white py-4 rounded-2xl font-bold hover:bg-brand-primary transition-all active:scale-95 shadow-xl shadow-brand-dark/20">
              Book Appointment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
