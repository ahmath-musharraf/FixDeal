import React, { useState } from 'react';
import { motion } from '../lib/motion-shim';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, Globe } from 'lucide-react';
import { toast } from 'react-hot-toast';

const ContactUs: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success('Message sent! We will get back to you soon.');
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <section className="bg-primary py-24 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
        </div>
        <div className="max-w-[1440px] mx-auto relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-white mb-6"
          >
            Get in Touch
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-primary-light text-xl max-w-2xl mx-auto"
          >
            Have questions or feedback? We'd love to hear from you. Our team is here to help.
          </motion.p>
        </div>
      </section>

      <div className="max-w-[1440px] mx-auto px-4 -mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100">
              <h3 className="text-2xl font-black text-slate-900 mb-8">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Email Us</p>
                    <p className="text-lg font-bold text-slate-700">support@fixdeal.lk</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Call Us</p>
                    <p className="text-lg font-bold text-slate-700">+94 11 234 5678</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Visit Us</p>
                    <p className="text-lg font-bold text-slate-700">123 Galle Road, Colombo 03, Sri Lanka</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 p-8 rounded-[32px] text-white">
              <h3 className="text-xl font-black mb-6 flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" /> Support Hours
              </h3>
              <div className="space-y-3 text-slate-400">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span className="text-white font-bold">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span className="text-white font-bold">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="text-emerald-400 font-bold">Closed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100">
              <h3 className="text-3xl font-black text-slate-900 mb-8">Send us a Message</h3>
              
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Full Name</label>
                  <input type="text" required placeholder="John Doe" className="w-full px-6 py-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 transition-all border border-transparent focus:border-primary/20" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Email Address</label>
                  <input type="email" required placeholder="john@example.com" className="w-full px-6 py-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 transition-all border border-transparent focus:border-primary/20" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-bold text-slate-700">Subject</label>
                  <input type="text" required placeholder="How can we help?" className="w-full px-6 py-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 transition-all border border-transparent focus:border-primary/20" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-bold text-slate-700">Message</label>
                  <textarea required rows={5} placeholder="Tell us more about your inquiry..." className="w-full px-6 py-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 transition-all border border-transparent focus:border-primary/20 resize-none"></textarea>
                </div>
                <div className="md:col-span-2">
                  <button 
                    disabled={loading}
                    className="w-full btn-primary py-5 rounded-2xl text-lg flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    {loading ? (
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <Send className="w-5 h-5" /> Send Message
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
