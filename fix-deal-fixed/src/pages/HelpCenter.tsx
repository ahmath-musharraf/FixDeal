import React from 'react';
import { motion } from 'motion/react';
import { HelpCircle, Search, ChevronRight, MessageCircle, FileText, Shield } from 'lucide-react';

const HelpCenter: React.FC = () => {
  const faqs = [
    {
      question: "How do I post an ad?",
      answer: "To post an ad, click on the 'Post Ad' button in the header. You'll need to be logged in. Fill in the title, description, price, category, and upload some clear photos of your item."
    },
    {
      question: "Is it free to use FIX DEAL?",
      answer: "Yes, basic listings are completely free! We also offer premium features to help your ads reach more buyers faster."
    },
    {
      question: "How do I contact a seller?",
      answer: "On the ad detail page, you can see the seller's name and a button to show their phone number. Logged-in users can see the full contact details."
    },
    {
      question: "What should I do if I suspect a scam?",
      answer: "If you encounter a suspicious ad or user, please use the 'Report' feature or contact our support team immediately. Never send money before seeing the item."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Hero */}
      <section className="bg-primary py-20 px-4 text-center">
        <div className="max-w-[1440px] mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-white mb-6"
          >
            How can we help you?
          </motion.h1>
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-4 text-slate-400 w-6 h-6" />
            <input 
              type="text" 
              placeholder="Search for help..." 
              className="w-full pl-12 pr-4 py-4 rounded-2xl outline-none shadow-xl text-lg"
            />
          </div>
        </div>
      </section>

      <div className="max-w-[1440px] mx-auto px-4 -mt-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: 'Buying', icon: <Search className="w-6 h-6" />, desc: 'Learn how to find and buy items safely.' },
            { title: 'Selling', icon: <Tag className="w-6 h-6" />, desc: 'Tips for creating great ads and selling fast.' },
            { title: 'Safety', icon: <Shield className="w-6 h-6" />, desc: 'Our commitment to your security.' }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all">
                {item.icon}
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-2">{item.title}</h3>
              <p className="text-slate-500">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-black text-slate-900 mb-8">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
                  <button className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-slate-50 transition-colors">
                    <span className="font-bold text-slate-800">{faq.question}</span>
                    <ChevronRight className="w-5 h-5 text-slate-400" />
                  </button>
                  <div className="px-6 py-4 text-slate-600 border-t border-slate-50 bg-slate-50/30">
                    {faq.answer}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-slate-900 rounded-[32px] p-8 text-white">
              <h3 className="text-2xl font-black mb-4">Still need help?</h3>
              <p className="text-slate-400 mb-8">Our support team is available 24/7 to assist you with any issues.</p>
              <button className="w-full btn-primary flex items-center justify-center gap-2">
                <MessageCircle className="w-5 h-5" /> Contact Support
              </button>
            </div>
            
            <div className="bg-white rounded-[32px] p-8 border border-slate-100">
              <h3 className="text-xl font-black text-slate-900 mb-6">Popular Articles</h3>
              <ul className="space-y-4">
                {['Safety Tips for Buyers', 'How to Promote your Ad', 'Rules for Posting', 'Account Verification'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-600 hover:text-primary cursor-pointer group">
                    <FileText className="w-4 h-4 text-slate-400 group-hover:text-primary" />
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Tag = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2z"></path>
    <line x1="7" y1="7" x2="7.01" y2="7"></line>
  </svg>
);

export default HelpCenter;
