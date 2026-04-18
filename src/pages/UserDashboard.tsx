import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Trash2, Edit2, Clock, CheckCircle, XCircle, ShieldCheck, LayoutDashboard, Settings, User as UserIcon, LogOut, ChevronRight } from 'lucide-react';
import { getAds, deleteAd } from '../services/db';
import { AdListing } from '../types';
import { Link, useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

export const UserDashboard = () => {
  const { user, profile, logout } = useAuth();
  const navigate = useNavigate();
  const [ads, setAds] = useState<AdListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'my-ads' | 'profile'>('my-ads');

  useEffect(() => {
    if (user) {
      fetchUserAds();
    }
  }, [user]);

  const fetchUserAds = async () => {
    setLoading(true);
    try {
      const userAds = await getAds({ userId: user?.uid });
      setAds(userAds);
    } catch (error) {
      console.error('Error fetching ads:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (adId: string) => {
    if (window.confirm('Are you sure you want to delete this ad?')) {
      try {
        await deleteAd(adId);
        setAds(ads.filter(ad => ad.id !== adId));
      } catch (error) {
        console.error('Error deleting ad:', error);
      }
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const StatusBadge = ({ status }: { status: string }) => {
    const styles = {
      pending: 'bg-amber-50 text-amber-600 border-amber-100',
      approved: 'bg-emerald-50 text-emerald-600 border-emerald-100',
      rejected: 'bg-red-50 text-red-600 border-red-100',
    }[status as keyof typeof styles] || 'bg-zinc-50 text-zinc-600 border-zinc-100';

    const Icon = {
      pending: Clock,
      approved: CheckCircle,
      rejected: XCircle,
    }[status as keyof typeof Icon] || Clock;

    return (
      <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider ${styles}`}>
        <Icon className="w-3 h-3" />
        {status}
      </div>
    );
  };

  return (
    <div className="min-h-screen pt-32 pb-20 bg-zinc-50 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-8 rounded-[40px] border border-zinc-100 shadow-sm text-center">
              <div className="w-24 h-24 bg-brand-dark rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-brand-dark/20">
                <UserIcon className="text-white w-12 h-12" />
              </div>
              <h2 className="text-2xl font-black mb-1">{profile?.name}</h2>
              <p className="text-zinc-400 text-sm mb-6">{profile?.email}</p>
              <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-brand-dark uppercase tracking-widest bg-zinc-50 py-2 rounded-xl">
                <ShieldCheck className="w-3.5 h-3.5" />
                {profile?.role} Account
              </div>
            </div>

            <div className="bg-white p-4 rounded-[40px] border border-zinc-100 shadow-sm space-y-2">
              <button 
                onClick={() => setActiveTab('my-ads')}
                className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all ${activeTab === 'my-ads' ? 'bg-brand-dark text-white shadow-lg shadow-brand-dark/20' : 'text-zinc-500 hover:bg-zinc-50'}`}
              >
                <LayoutDashboard className="w-5 h-5" /> My Ads
              </button>
              <button 
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all ${activeTab === 'profile' ? 'bg-brand-dark text-white shadow-lg shadow-brand-dark/20' : 'text-zinc-500 hover:bg-zinc-50'}`}
              >
                <Settings className="w-5 h-5" /> Settings
              </button>
              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-bold text-red-500 hover:bg-red-50 transition-all"
              >
                <LogOut className="w-5 h-5" /> Logout
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {activeTab === 'my-ads' ? (
                <motion.div 
                  key="my-ads"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-black">My Ads</h1>
                    <Link to="/post-ad" className="bg-brand-dark text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-brand-primary transition-all shadow-lg shadow-brand-dark/20">
                      <Plus className="w-5 h-5" /> Post New Ad
                    </Link>
                  </div>

                  {loading ? (
                    <div className="grid md:grid-cols-2 gap-6">
                      {[1, 2, 3, 4].map(i => (
                        <div key={i} className="bg-white h-[200px] rounded-[40px] animate-pulse border border-zinc-100" />
                      ))}
                    </div>
                  ) : ads.length > 0 ? (
                    <div className="grid md:grid-cols-2 gap-6">
                      {ads.map(ad => (
                        <div key={ad.id} className="bg-white rounded-[40px] overflow-hidden border border-zinc-100 shadow-sm group hover:shadow-xl transition-all duration-500">
                          <div className="flex">
                            <div className="w-1/3 aspect-square relative overflow-hidden">
                              <img src={ad.images[0]} alt={ad.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            </div>
                            <div className="w-2/3 p-6 flex flex-col justify-between">
                              <div>
                                <div className="flex justify-between items-start mb-2">
                                  <StatusBadge status={ad.status} />
                                  <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">
                                    {formatDistanceToNow(ad.createdAt?.toDate() || new Date())} ago
                                  </p>
                                </div>
                                <h3 className="font-bold text-lg mb-1 line-clamp-1">{ad.title}</h3>
                                <p className="text-brand-dark font-black text-xl">LKR {ad.price.toLocaleString()}</p>
                              </div>
                              <div className="flex gap-2 mt-4">
                                <button className="flex-1 bg-zinc-50 text-zinc-600 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-zinc-100 transition-all">
                                  <Edit2 className="w-3.5 h-3.5" /> Edit
                                </button>
                                <button 
                                  onClick={() => handleDelete(ad.id)}
                                  className="w-11 h-11 bg-red-50 text-red-500 rounded-xl flex items-center justify-center hover:bg-red-500 hover:text-white transition-all"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-white p-20 rounded-[40px] border border-dashed border-zinc-200 text-center">
                      <div className="w-20 h-20 bg-zinc-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <LayoutDashboard className="text-zinc-300 w-10 h-10" />
                      </div>
                      <h3 className="text-xl font-bold text-zinc-900 mb-2">No ads yet</h3>
                      <p className="text-zinc-500 mb-8">Start selling today by posting your first ad!</p>
                      <Link to="/post-ad" className="text-brand-dark font-bold hover:underline">Post your first ad</Link>
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.div 
                  key="profile"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white p-10 rounded-[40px] border border-zinc-100 shadow-sm"
                >
                  <h1 className="text-3xl font-black mb-8">Profile Settings</h1>
                  <div className="space-y-8 max-w-xl">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider ml-1">Full Name</label>
                      <input 
                        type="text" 
                        defaultValue={profile?.name}
                        className="w-full px-6 py-4 bg-zinc-50 rounded-2xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-brand-dark/20 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider ml-1">Email Address</label>
                      <input 
                        type="email" 
                        disabled
                        defaultValue={profile?.email}
                        className="w-full px-6 py-4 bg-zinc-100 rounded-2xl border border-zinc-200 text-zinc-500 cursor-not-allowed"
                      />
                    </div>
                    <button className="bg-brand-dark text-white px-10 py-4 rounded-2xl font-bold hover:bg-brand-primary transition-all shadow-lg shadow-brand-dark/20">
                      Save Changes
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};
