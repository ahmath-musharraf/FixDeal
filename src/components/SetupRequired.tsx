import React from 'react';
import { motion } from 'motion/react';
import { ShieldAlert, ExternalLink, Settings } from 'lucide-react';

export const SetupRequired = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 px-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg bg-white rounded-[40px] p-12 text-center shadow-2xl border border-zinc-100"
      >
        <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-8">
          <ShieldAlert className="text-amber-500 w-10 h-10" />
        </div>
        <h2 className="text-3xl font-black mb-4">Setup Required</h2>
        <p className="text-zinc-500 mb-8 leading-relaxed">
          To enable authentication and database features, you need to configure your Firebase environment variables.
        </p>
        
        <div className="bg-zinc-50 rounded-3xl p-6 text-left mb-8 space-y-4">
          <h3 className="font-bold text-sm uppercase tracking-widest text-zinc-400 flex items-center gap-2">
            <Settings className="w-4 h-4" /> Steps to fix:
          </h3>
          <ol className="text-sm text-zinc-600 space-y-3 list-decimal ml-4">
            <li>Open the <strong>Environment Variables</strong> panel in the platform.</li>
            <li>Add the keys listed in <code>.env.example</code>.</li>
            <li>Paste your Firebase project configuration values.</li>
            <li>The app will automatically refresh and work.</li>
          </ol>
        </div>

        <div className="flex flex-col gap-4">
          <a 
            href="https://console.firebase.google.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full py-4 bg-brand-dark text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-brand-primary transition-all shadow-lg shadow-brand-dark/20"
          >
            Firebase Console <ExternalLink className="w-4 h-4" />
          </a>
          <button 
            onClick={() => window.location.reload()}
            className="w-full py-4 bg-white border border-zinc-200 text-zinc-600 rounded-2xl font-bold hover:bg-zinc-50 transition-all"
          >
            I've set the variables, refresh now
          </button>
        </div>
      </motion.div>
    </div>
  );
};
