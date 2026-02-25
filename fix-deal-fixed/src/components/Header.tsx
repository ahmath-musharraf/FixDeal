import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, User, PlusCircle, LogOut, Menu, X, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { auth } from '../lib/firebase';
import { motion, AnimatePresence } from 'motion/react';

const Header: React.FC = () => {
  const { user, profile, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleLogout = async () => {
    await auth.signOut();
    navigate('/');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-xl">
              F
            </div>
            <span className="text-2xl font-bold tracking-tight text-primary hidden sm:block">
              FIX DEAL
            </span>
          </Link>

          {/* Search Bar (Desktop) */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search anything in Sri Lanka..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-full focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              />
              <Search className="absolute left-3 top-2.5 text-slate-400 w-5 h-5" />
            </div>
          </form>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {isAdmin && (
              <Link to="/admin" className="text-slate-600 hover:text-primary font-medium flex items-center gap-1">
                <ShieldCheck className="w-4 h-4" />
                Admin
              </Link>
            )}
            
            <Link to="/post-ad" className="btn-primary flex items-center gap-2">
              <PlusCircle className="w-5 h-5" />
              Post Ad
            </Link>

            {user ? (
              <>
                <Link to="/dashboard" className="text-slate-600 hover:text-primary font-medium">
                  My Ads
                </Link>
                <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
                  <div className="text-right">
                    <p className="text-sm font-semibold text-slate-900">{profile?.name || 'User'}</p>
                    <button onClick={handleLogout} className="text-xs text-slate-500 hover:text-red-500 flex items-center gap-1">
                      <LogOut className="w-3 h-3" /> Logout
                    </button>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    {profile?.name?.[0] || <User className="w-5 h-5" />}
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="text-slate-600 hover:text-primary font-medium">
                  Login
                </Link>
                <Link to="/register" className="btn-primary">
                  Register
                </Link>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-slate-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-slate-100 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-6">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search anything..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-100 rounded-2xl outline-none text-lg font-medium"
                />
                <Search className="absolute left-4 top-[18px] text-slate-400 w-6 h-6" />
              </form>
              
              <div className="grid grid-cols-2 gap-4">
                <Link to="/help" onClick={() => setIsMenuOpen(false)} className="p-4 bg-slate-50 rounded-2xl text-center font-bold text-slate-600">Help Center</Link>
                <Link to="/safety" onClick={() => setIsMenuOpen(false)} className="p-4 bg-slate-50 rounded-2xl text-center font-bold text-slate-600">Safety Tips</Link>
                <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="p-4 bg-slate-50 rounded-2xl text-center font-bold text-slate-600">Contact Us</Link>
                {isAdmin && <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="p-4 bg-primary/10 rounded-2xl text-center font-bold text-primary">Admin Panel</Link>}
              </div>

              {user ? (
                <button 
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }} 
                  className="w-full py-4 bg-red-50 text-red-500 rounded-2xl font-bold flex items-center justify-center gap-2"
                >
                  <LogOut className="w-5 h-5" /> Logout
                </button>
              ) : (
                <div className="flex gap-4">
                  <Link to="/login" onClick={() => setIsMenuOpen(false)} className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl text-center font-bold">Login</Link>
                  <Link to="/register" onClick={() => setIsMenuOpen(false)} className="flex-1 py-4 bg-primary text-white rounded-2xl text-center font-bold">Register</Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
