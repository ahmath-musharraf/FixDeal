import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'motion/react';
import { UserPlus, Mail, Lock, User, AlertCircle, Chrome } from 'lucide-react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '../lib/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

export const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      await updateProfile(user, { displayName: name });
      
      // Create profile in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        name,
        email,
        role: 'client',
        verified: false,
        createdAt: serverTimestamp(),
      });
      
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);
    try {
      await loginWithGoogle();
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Google login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 flex items-center justify-center bg-zinc-50 px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-[40px] shadow-2xl overflow-hidden border border-zinc-100"
      >
        <div className="p-10">
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-brand-dark rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-brand-dark/20">
              <UserPlus className="text-white w-8 h-8" />
            </div>
            <h1 className="text-3xl font-black mb-2">Create Account</h1>
            <p className="text-zinc-500">Join the Let's Deal community</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-sm">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-6">
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Full Name" 
                required
                className="w-full pl-12 pr-4 py-4 bg-zinc-50 rounded-2xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-brand-dark/20 transition-all"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 w-5 h-5" />
              <input 
                type="email" 
                placeholder="Email Address" 
                required
                className="w-full pl-12 pr-4 py-4 bg-zinc-50 rounded-2xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-brand-dark/20 transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 w-5 h-5" />
              <input 
                type="password" 
                placeholder="Password" 
                required
                className="w-full pl-12 pr-4 py-4 bg-zinc-50 rounded-2xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-brand-dark/20 transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            
            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-4 bg-brand-dark text-white rounded-2xl font-bold hover:bg-brand-primary transition-all shadow-lg shadow-brand-dark/20 disabled:opacity-50"
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>

          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-100"></div>
            </div>
            <div className="relative flex justify-center text-[10px] uppercase">
              <span className="bg-white px-4 text-zinc-400 font-bold tracking-[0.2em]">Or continue with</span>
            </div>
          </div>

          <button 
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full py-4 bg-white border border-zinc-200 text-zinc-700 rounded-2xl font-bold hover:bg-zinc-50 transition-all flex items-center justify-center gap-3"
          >
            <Chrome className="w-5 h-5" /> Google
          </button>

          <p className="mt-10 text-center text-zinc-500 text-sm">
            Already have an account? <Link to="/login" className="text-brand-dark font-bold hover:underline">Sign in</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};
