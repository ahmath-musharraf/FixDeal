import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../context/AuthContext';
import { Ad } from '../types';
import { LayoutDashboard, PlusCircle, Trash2, Edit3, Eye, Clock, CheckCircle2 as CheckCircle, XCircle, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { motion } from '../lib/motion-shim';

const UserDashboard: React.FC = () => {
  const { user, profile } = useAuth();
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyAds = async () => {
      if (!user) return;
      try {
        const q = query(
          collection(db, 'ads'),
          where('userId', '==', user.uid)
        );
        const snap = await getDocs(q);
        setAds(snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Ad)));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyAds();
  }, [user]);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this ad?')) {
      try {
        await deleteDoc(doc(db, 'ads', id));
        setAds(ads.filter(ad => ad.id !== id));
        toast.success('Ad deleted successfully');
      } catch (error) {
        toast.error('Failed to delete ad');
      }
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full"><CheckCircle className="w-3 h-3" /> Approved</span>;
      case 'pending':
        return <span className="flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-full"><Clock className="w-3 h-3" /> Pending</span>;
      case 'rejected':
        return <span className="flex items-center gap-1 text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded-full"><XCircle className="w-3 h-3" /> Rejected</span>;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-3xl font-black text-slate-900 mb-2">My Dashboard</h1>
          <p className="text-slate-500">Manage your listings and account settings</p>
        </div>
        <Link to="/post-ad" className="btn-primary flex items-center gap-2 self-start">
          <PlusCircle className="w-5 h-5" /> Post New Ad
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Stats */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
                {profile?.name?.[0]}
              </div>
              <div>
                <h3 className="font-bold text-slate-900">{profile?.name}</h3>
                <p className="text-xs text-slate-500">{profile?.email}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                <span className="text-sm text-slate-600">Total Ads</span>
                <span className="font-bold text-primary">{ads.length}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                <span className="text-sm text-slate-600">Approved</span>
                <span className="font-bold text-emerald-600">{ads.filter(a => a.status === 'approved').length}</span>
              </div>
            </div>
          </div>

          <div className="bg-primary p-6 rounded-3xl shadow-lg text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
            <TrendingUp className="w-8 h-8 mb-4" />
            <h4 className="font-bold text-xl mb-2">Boost Your Ads</h4>
            <p className="text-primary-light text-sm mb-6">Get 10x more views by featuring your ads at the top of the list.</p>
            <button className="w-full bg-white text-primary py-2.5 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all">Upgrade Now</button>
          </div>
        </div>

        {/* Ads List */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-6 border-b border-slate-50 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">My Listings</h2>
              <div className="flex gap-2">
                <button className="p-2 bg-slate-50 rounded-lg text-slate-400 hover:text-primary transition-colors">
                  <LayoutDashboard className="w-5 h-5" />
                </button>
              </div>
            </div>

            {loading ? (
              <div className="p-12 flex flex-col items-center justify-center gap-4">
                <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                <p className="text-slate-500 font-medium">Loading your ads...</p>
              </div>
            ) : ads.length === 0 ? (
              <div className="p-20 text-center">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mx-auto mb-6">
                  <PlusCircle className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">No ads yet</h3>
                <p className="text-slate-500 mb-8">You haven't posted any ads yet. Start selling today!</p>
                <Link to="/post-ad" className="btn-primary">Post Your First Ad</Link>
              </div>
            ) : (
              <div className="divide-y divide-slate-50">
                {ads.map(ad => (
                  <div key={ad.id} className="p-6 flex flex-col md:flex-row gap-6 hover:bg-slate-50 transition-colors group">
                    <div className="w-full md:w-32 aspect-square rounded-2xl overflow-hidden bg-slate-100 shrink-0">
                      <img src={ad.images[0]} alt={ad.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-lg font-bold text-slate-900 truncate">{ad.title}</h3>
                        {getStatusBadge(ad.status)}
                      </div>
                      <p className="text-primary font-bold mb-2">Rs. {ad.price.toLocaleString()}</p>
                      <div className="flex flex-wrap gap-4 text-xs text-slate-500">
                        <span className="bg-slate-100 px-2 py-1 rounded-md">{ad.category}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {new Date(ad.createdAt?.seconds * 1000).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Link to={`/ad/${ad.id}`} className="p-2 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-xl transition-all" title="View">
                        <Eye className="w-5 h-5" />
                      </Link>
                      <button className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-xl transition-all" title="Edit">
                        <Edit3 className="w-5 h-5" />
                      </button>
                      <button onClick={() => handleDelete(ad.id)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all" title="Delete">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
