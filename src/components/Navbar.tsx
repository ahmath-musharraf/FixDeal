import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Car, Menu, X, ShoppingBag, DollarSign, Key, Wrench, MessageCircle, User as UserIcon, LogOut, LayoutDashboard, ShieldCheck, MessageSquare } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showFAB, setShowFAB] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();
  const { user, profile, isAdmin, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      setShowFAB(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
    setIsUserMenuOpen(false);
    navigate('/');
  };

  const isHome = location.pathname === '/';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || !isHome ? 'glass-dark py-3 shadow-sm' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-white p-2 rounded-lg">
            <Car className="text-brand-dark w-6 h-6" />
          </div>
          <span className={`font-display font-bold text-2xl tracking-tight text-white`}>
            FIX<span className="text-brand-accent">DEAL</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8 h-10">
          {[
            { name: 'Buy', path: '/buy' },
            { name: 'Sell', path: '/sell' },
            { name: 'Rent', path: '/rent' },
            { name: 'Service', path: '/service' }
          ].map((item) => (
            <Link 
              key={item.name} 
              to={item.path} 
              className={`text-sm font-medium transition-colors flex items-center h-full ${isScrolled || !isHome ? 'text-zinc-300 hover:text-white' : 'text-zinc-300 hover:text-white'}`}
            >
              {item.name}
            </Link>
          ))}
          
          {user ? (
            <div className="relative flex items-center h-full">
              <button 
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-full border border-white/20 hover:bg-white/20 transition-all h-full"
              >
                <div className="w-6 h-6 bg-brand-accent rounded-full flex items-center justify-center">
                  <UserIcon className="w-3.5 h-3.5 text-brand-dark" />
                </div>
                <span className="text-xs font-bold">{profile?.name.split(' ')[0]}</span>
              </button>
              
              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-full right-0 mt-4 w-56 bg-white rounded-3xl shadow-2xl border border-zinc-100 p-2 overflow-hidden"
                  >
                    <Link 
                      to="/dashboard" 
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-zinc-600 hover:bg-zinc-50 transition-all"
                    >
                      <LayoutDashboard className="w-4 h-4" /> Dashboard
                    </Link>
                    <Link 
                      to="/messages" 
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-zinc-600 hover:bg-zinc-50 transition-all"
                    >
                      <MessageSquare className="w-4 h-4" /> Messages
                    </Link>
                    {isAdmin && (
                      <Link 
                        to="/admin" 
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-brand-dark hover:bg-zinc-50 transition-all"
                      >
                        <ShieldCheck className="w-4 h-4" /> Admin Panel
                      </Link>
                    )}
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-red-500 hover:bg-red-50 transition-all"
                    >
                      <LogOut className="w-4 h-4" /> Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link to="/login" className="bg-white text-brand-dark px-6 py-2.5 rounded-full text-sm font-bold hover:bg-zinc-100 transition-all shadow-lg shadow-white/10 active:scale-95">
              Sign In
            </Link>
          )}
        </div>

        <button 
          className={`md:hidden p-2 text-white`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-brand-dark border-t border-white/10 p-6 shadow-xl md:hidden"
          >
            <div className="flex flex-col gap-4">
              {[
                { name: 'Buy', path: '/buy' },
                { name: 'Sell', path: '/sell' },
                { name: 'Rent', path: '/rent' },
                { name: 'Service', path: '/service' },
                { name: 'Help Center', path: '/help' },
                { name: 'Contact Us', path: '/contact' }
              ].map((item) => (
                <Link 
                  key={item.name} 
                  to={item.path} 
                  className="text-lg font-medium text-zinc-300 hover:text-white"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {user ? (
                <>
                  <Link 
                    to="/dashboard" 
                    className="text-lg font-medium text-brand-accent"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link 
                    to="/messages" 
                    className="text-lg font-medium text-zinc-300 hover:text-white"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Messages
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="text-lg font-medium text-red-400 text-left"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link 
                  to="/login" 
                  className="bg-white text-brand-dark py-3 rounded-xl font-bold text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 px-4 pb-6 pt-2 bg-gradient-to-t from-zinc-50 via-zinc-50/80 to-transparent pointer-events-none">
        <div className="glass-dark rounded-[32px] p-1.5 shadow-2xl border border-white/10 flex items-center justify-around pointer-events-auto">
          {[
            { name: 'Buy', path: '/buy', icon: ShoppingBag },
            { name: 'Sell', path: '/sell', icon: DollarSign },
            { name: 'Rent', path: '/rent', icon: Key },
            { name: 'Profile', path: '/dashboard', icon: UserIcon }
          ].map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <motion.div
                key={item.name}
                whileTap={{ scale: 0.9 }}
                className="flex-1"
              >
                <Link 
                  to={item.path} 
                  className={`flex flex-col items-center gap-1 py-3 rounded-[24px] transition-all ${isActive ? 'bg-white text-brand-dark shadow-lg shadow-white/10' : 'text-zinc-400'}`}
                >
                  <item.icon className={`w-5 h-5 ${isActive ? 'fill-current' : ''}`} />
                  <span className="text-[9px] font-black uppercase tracking-[0.1em]">{item.name}</span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
