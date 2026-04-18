import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'motion/react';
import { LogIn, Mail, Lock, AlertCircle, Chrome, Phone, CheckCircle2 } from 'lucide-react';
import { signInWithEmailAndPassword, RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from 'firebase/auth';
import { auth } from '../lib/firebase';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email');
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  
  const { loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';

  const setupRecaptcha = () => {
    if (!(window as any).recaptchaVerifier) {
      (window as any).recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
      });
    }
  };

  const handlePhoneLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setupRecaptcha();
    
    const appVerifier = (window as any).recaptchaVerifier;
    try {
      const result = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      setConfirmationResult(result);
    } catch (err: any) {
      setError(err.message || 'Failed to send OTP');
      if ((window as any).recaptchaVerifier) {
        (window as any).recaptchaVerifier.clear();
        (window as any).recaptchaVerifier = null;
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!confirmationResult) return;
    setError('');
    setLoading(true);
    try {
      await confirmationResult.confirm(otp);
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);
    try {
      await loginWithGoogle();
      navigate(from, { replace: true });
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
              <LogIn className="text-white w-8 h-8" />
            </div>
            <h1 className="text-3xl font-black mb-2">Welcome Back</h1>
            <p className="text-zinc-500">Sign in to your Let's Deal account</p>
          </div>

          <div className="flex p-1 bg-zinc-100 rounded-2xl mb-10">
            <button 
              onClick={() => setLoginMethod('email')}
              className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${loginMethod === 'email' ? 'bg-white text-brand-dark shadow-sm' : 'text-zinc-500'}`}
            >
              Email
            </button>
            <button 
              onClick={() => setLoginMethod('phone')}
              className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${loginMethod === 'phone' ? 'bg-white text-brand-dark shadow-sm' : 'text-zinc-500'}`}
            >
              Phone
            </button>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-sm">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <p>{error}</p>
            </div>
          )}

          {loginMethod === 'email' ? (
            <form onSubmit={handleEmailLogin} className="space-y-6">
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
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>
          ) : (
            <div className="space-y-6">
              {!confirmationResult ? (
                <form onSubmit={handlePhoneLogin} className="space-y-6">
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 w-5 h-5" />
                    <input 
                      type="tel" 
                      placeholder="+94 7X XXX XXXX" 
                      required
                      className="w-full pl-12 pr-4 py-4 bg-zinc-50 rounded-2xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-brand-dark/20 transition-all"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                  <div id="recaptcha-container"></div>
                  <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full py-4 bg-brand-dark text-white rounded-2xl font-bold hover:bg-brand-primary transition-all shadow-lg shadow-brand-dark/20 disabled:opacity-50"
                  >
                    {loading ? 'Sending OTP...' : 'Send OTP'}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-6">
                  <div className="relative">
                    <CheckCircle2 className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 w-5 h-5" />
                    <input 
                      type="text" 
                      placeholder="Enter 6-digit OTP" 
                      required
                      maxLength={6}
                      className="w-full pl-12 pr-4 py-4 bg-zinc-50 rounded-2xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-brand-dark/20 transition-all"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                    />
                  </div>
                  <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full py-4 bg-emerald-500 text-white rounded-2xl font-bold hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20 disabled:opacity-50"
                  >
                    {loading ? 'Verifying...' : 'Verify & Login'}
                  </button>
                  <button 
                    type="button"
                    onClick={() => setConfirmationResult(null)}
                    className="w-full text-zinc-400 text-sm font-bold hover:text-brand-dark"
                  >
                    Change Phone Number
                  </button>
                </form>
              )}
            </div>
          )}

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
            Don't have an account? <Link to="/register" className="text-brand-dark font-bold hover:underline">Create one</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};
