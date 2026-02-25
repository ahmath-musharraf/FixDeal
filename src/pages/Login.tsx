import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider, db } from '../lib/firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { Mail, Lock, Chrome, ArrowRight, AlertCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { motion } from '../lib/motion-shim';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Welcome back!');
      navigate('/');
    } catch (error: any) {
      toast.error(error.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      // Check if user exists in Firestore
      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);
      
      if (!userSnap.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          role: 'client',
          verified: false,
          createdAt: serverTimestamp(),
        });
      }
      
      toast.success('Logged in with Google');
      navigate('/');
    } catch (error: any) {
      toast.error('Google login failed');
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
              <Lock className="w-8 h-8" />
            </div>
            <h1 className="text-3xl font-black text-slate-900">Welcome Back</h1>
            <p className="text-slate-500">Login to manage your ads and messages</p>
          </div>

          <form onSubmit={handleEmailLogin} className="space-y-4">
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
              <div className="flex justify-between mb-2">
                <label className="block text-sm font-bold text-slate-700">Password</label>
                <Link to="/forgot-password" title="Reset password" className="text-xs text-primary font-bold hover:underline">Forgot?</Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 text-slate-400 w-5 h-5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field pl-12"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary flex items-center justify-center gap-2 py-4"
            >
              {loading ? 'Logging in...' : (
                <>
                  Login to Account <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-4 text-slate-400 font-bold">Or continue with</span>
            </div>
          </div>

          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all font-bold text-slate-700"
          >
            <Chrome className="w-5 h-5 text-red-500" />
            Sign in with Google
          </button>

          <p className="text-center mt-8 text-slate-500 text-sm">
            Don't have an account? <Link to="/register" className="text-primary font-bold hover:underline">Create one for free</Link>
          </p>
        </div>
        
        <div className="bg-slate-50 p-4 flex items-center gap-3 border-t border-slate-100">
          <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />
          <p className="text-[10px] text-slate-500 leading-tight">
            By logging in, you agree to our Terms of Service and Privacy Policy. Never share your password with anyone.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
