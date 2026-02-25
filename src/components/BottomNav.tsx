import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, PlusCircle, LayoutDashboard, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const BottomNav: React.FC = () => {
  const location = useLocation();
  const { user } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-t border-slate-100 px-4 py-2 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-between max-w-md mx-auto">
        <Link 
          to="/" 
          className={`flex flex-col items-center gap-1 p-2 transition-all ${isActive('/') ? 'text-primary' : 'text-slate-400'}`}
        >
          <Home className={`w-6 h-6 ${isActive('/') ? 'fill-primary/10' : ''}`} />
          <span className="text-[10px] font-bold uppercase tracking-wider">Home</span>
        </Link>

        <Link 
          to="/search" 
          className={`flex flex-col items-center gap-1 p-2 transition-all ${isActive('/search') ? 'text-primary' : 'text-slate-400'}`}
        >
          <Search className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Search</span>
        </Link>

        <Link 
          to="/post-ad" 
          className="flex flex-col items-center -mt-8"
        >
          <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary/30 border-4 border-white">
            <PlusCircle className="w-8 h-8" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider mt-1 text-primary">Post</span>
        </Link>

        <Link 
          to="/dashboard" 
          className={`flex flex-col items-center gap-1 p-2 transition-all ${isActive('/dashboard') ? 'text-primary' : 'text-slate-400'}`}
        >
          <LayoutDashboard className={`w-6 h-6 ${isActive('/dashboard') ? 'fill-primary/10' : ''}`} />
          <span className="text-[10px] font-bold uppercase tracking-wider">My Ads</span>
        </Link>

        <Link 
          to={user ? "/dashboard" : "/login"} 
          className={`flex flex-col items-center gap-1 p-2 transition-all ${isActive('/login') || isActive('/register') ? 'text-primary' : 'text-slate-400'}`}
        >
          <User className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Profile</span>
        </Link>
      </div>
    </div>
  );
};

export default BottomNav;
