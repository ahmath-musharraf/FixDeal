import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '../lib/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { User, Mail, Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { motion } from '../lib/motion-shim';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, { displayName: name });

      // Create user profile in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        name,
        email,
        role: 'client',
        verified: false,
        createdAt: serverTimestamp(),
      });

      toast.success('Account created successfully!');
      navigate('/');
    } catch (error: any) {
      toast.error(error.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-12 bg-slate-50">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden"
      >
        <div className="p-8">
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto mb-4">
              <User className="w-8 h-8" />
            </div>
            <h1 className="text-3xl font-black text-slate-900">Join FIX DEAL</h1>
            <p className="text-slate-500">Create an account to start buying and selling</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-3.5 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input-field pl-12"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 text-slate-400 w-5 h-5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field pl-12"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 text-slate-400 w-5 h-5" />
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field pl-12"
                  placeholder="Min. 6 characters"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary flex items-center justify-center gap-2 py-4 mt-4"
            >
              {loading ? 'Creating Account...' : (
                <>
                  Create Free Account <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <p className="text-center mt-8 text-slate-500 text-sm">
            Already have an account? <Link to="/login" className="text-primary font-bold hover:underline">Sign in instead</Link>
          </p>
        </div>
        
        <div className="bg-primary/5 p-6 flex items-start gap-4 border-t border-primary/10">
          <ShieldCheck className="w-6 h-6 text-primary shrink-0" />
          <div>
            <h4 className="text-sm font-bold text-primary mb-1">Your data is safe</h4>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              We use industry-standard encryption to protect your personal information. We never sell your data to third parties.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
