import React from 'react';
import { motion } from '../lib/motion-shim';
import { FileText, Shield, Scale, UserCheck, AlertCircle, CheckCircle2 } from 'lucide-react';

const TermsOfService: React.FC = () => {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      icon: <CheckCircle2 className="w-6 h-6" />,
      content: "By accessing or using FIX DEAL, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site."
    },
    {
      title: "2. User Accounts",
      icon: <UserCheck className="w-6 h-6" />,
      content: "To post ads or access certain features, you must create an account. You are responsible for maintaining the confidentiality of your account and password. You must provide accurate and complete information during registration."
    },
    {
      title: "3. Posting Rules",
      icon: <FileText className="w-6 h-6" />,
      content: "Users are responsible for the content they post. Ads must not contain illegal, offensive, or misleading information. We reserve the right to remove any ad that violates our community guidelines without prior notice."
    },
    {
      title: "4. Privacy Policy",
      icon: <Shield className="w-6 h-6" />,
      content: "Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and protect your personal information. By using FIX DEAL, you consent to our data practices."
    },
    {
      title: "5. Limitation of Liability",
      icon: <Scale className="w-6 h-6" />,
      content: "FIX DEAL is a platform for users to connect. We do not own or inspect the items listed. We are not responsible for any transactions, disputes, or damages resulting from the use of our services."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <section className="bg-white border-b border-slate-100 py-24 px-4">
        <div className="max-w-[1440px] mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6"
          >
            <Scale className="w-8 h-8" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-slate-900 mb-6"
          >
            Terms of Service
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-500 text-xl max-w-2xl mx-auto"
          >
            Last updated: February 25, 2026. Please read these terms carefully before using our platform.
          </motion.p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 mt-20">
        <div className="bg-white rounded-[40px] shadow-sm border border-slate-100 p-8 md:p-12 space-y-12">
          {sections.map((section, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                  {section.icon}
                </div>
                <h2 className="text-2xl font-black text-slate-900">{section.title}</h2>
              </div>
              <p className="text-slate-600 leading-relaxed text-lg pl-14">
                {section.content}
              </p>
            </motion.div>
          ))}

          <div className="pt-12 border-t border-slate-100">
            <div className="bg-amber-50 border border-amber-100 rounded-3xl p-8 flex gap-6">
              <AlertCircle className="w-8 h-8 text-amber-500 shrink-0" />
              <div>
                <h3 className="text-lg font-black text-amber-900 mb-2">Important Notice</h3>
                <p className="text-amber-800 leading-relaxed">
                  We may update these terms from time to time. Continued use of the platform after changes are posted constitutes your acceptance of the new terms.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-slate-500 mb-6">Have questions about our terms?</p>
          <button className="btn-primary px-8 py-3 rounded-xl">
            Contact Legal Team
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
