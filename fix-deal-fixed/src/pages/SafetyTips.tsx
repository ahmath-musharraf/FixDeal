import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, AlertTriangle, Eye, Phone, CreditCard, MapPin, CheckCircle2 } from 'lucide-react';

const SafetyTips: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <section className="bg-slate-900 py-24 px-4 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[100px] -mr-48 -mt-48"></div>
        <div className="max-w-[1440px] mx-auto relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-20 h-20 bg-emerald-500 rounded-3xl flex items-center justify-center text-white mx-auto mb-8 shadow-xl shadow-emerald-500/20"
          >
            <ShieldCheck className="w-10 h-10" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-white mb-6"
          >
            Your Safety is Our Priority
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 text-xl max-w-2xl mx-auto"
          >
            Follow these simple guidelines to ensure a safe and successful trading experience on FIX DEAL.
          </motion.p>
        </div>
      </section>

      <div className="max-w-[1440px] mx-auto px-4 mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* For Buyers */}
          <div className="space-y-8">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center">
                <Eye className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-black text-slate-900">Tips for Buyers</h2>
            </div>

            {[
              { title: 'Meet in Public', desc: 'Always meet the seller in a well-lit, public place like a shopping mall or a police station.', icon: <MapPin className="w-5 h-5" /> },
              { title: 'Inspect the Item', desc: 'Check the item thoroughly before paying. For electronics, test all functions.', icon: <Eye className="w-5 h-5" /> },
              { title: 'No Advance Payments', desc: 'Never send money via bank transfer or mobile wallet before seeing the item.', icon: <CreditCard className="w-5 h-5" /> },
              { title: 'Trust Your Gut', desc: 'If a deal seems too good to be true, it probably is. Be wary of unrealistic prices.', icon: <AlertTriangle className="w-5 h-5" /> }
            ].map((tip, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex gap-6"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center shrink-0">
                  {tip.icon}
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 mb-2">{tip.title}</h3>
                  <p className="text-slate-500">{tip.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* For Sellers */}
          <div className="space-y-8">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-amber-500/10 text-amber-500 rounded-2xl flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-black text-slate-900">Tips for Sellers</h2>
            </div>

            {[
              { title: 'Verify the Buyer', desc: 'Ask for the buyer\'s name and contact details. Avoid buyers who are unwilling to meet.', icon: <Phone className="w-5 h-5" /> },
              { title: 'Cash is King', desc: 'Prefer cash payments or real-time bank transfers made in your presence.', icon: <CreditCard className="w-5 h-5" /> },
              { title: 'Bring a Friend', desc: 'If you are meeting a buyer alone, let someone know where you are going.', icon: <Users className="w-5 h-5" /> },
              { title: 'Protect Your Privacy', desc: 'Don\'t share sensitive personal information like your home address or bank login.', icon: <ShieldCheck className="w-5 h-5" /> }
            ].map((tip, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex gap-6"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center shrink-0">
                  {tip.icon}
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 mb-2">{tip.title}</h3>
                  <p className="text-slate-500">{tip.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-20 bg-primary rounded-[40px] p-12 text-center text-white">
          <h2 className="text-3xl font-black mb-4">See something suspicious?</h2>
          <p className="text-primary-light text-lg mb-8 max-w-2xl mx-auto">Help us keep FIX DEAL safe. Report any suspicious ads or users immediately to our security team.</p>
          <button className="bg-white text-primary px-10 py-4 rounded-2xl font-black hover:bg-slate-100 transition-all">
            Report an Issue
          </button>
        </div>
      </div>
    </div>
  );
};

const Users = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);

export default SafetyTips;
