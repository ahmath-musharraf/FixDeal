import React, { useEffect, useState } from 'react';
import { collection, query, getDocs, doc, updateDoc, deleteDoc, orderBy, where } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Ad, UserProfile } from '../types';
import { 
  ShieldCheck, 
  Users, 
  LayoutGrid, 
  CheckCircle2 as CheckCircle, 
  XCircle, 
  Trash2, 
  Eye, 
  BarChart3, 
  TrendingUp, 
  AlertTriangle,
  Search,
  Filter
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { format } from 'date-fns';
import { motion } from '../lib/motion-shim';

const AdminDashboard: React.FC = () => {
  const [ads, setAds] = useState<Ad[]>([]);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'ads' | 'users' | 'stats'>('ads');
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Ads
        const adsQuery = query(collection(db, 'ads'), orderBy('createdAt', 'desc'));
        const adsSnap = await getDocs(adsQuery);
        setAds(adsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Ad)));

        // Fetch Users
        const usersSnap = await getDocs(collection(db, 'users'));
        setUsers(usersSnap.docs.map(doc => doc.data() as UserProfile));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleStatusUpdate = async (adId: string, status: 'approved' | 'rejected') => {
    try {
      const adRef = doc(db, 'ads', adId);
      await updateDoc(adRef, { 
        status,
        isVerified: status === 'approved'
      });
      setAds(ads.map(ad => ad.id === adId ? { ...ad, status, isVerified: status === 'approved' } : ad));
      toast.success(`Ad ${status} successfully`);
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const handleDeleteAd = async (adId: string) => {
    if (window.confirm('Delete this ad permanently?')) {
      try {
        await deleteDoc(doc(db, 'ads', adId));
        setAds(ads.filter(ad => ad.id !== adId));
        toast.success('Ad deleted');
      } catch (error) {
        toast.error('Failed to delete');
      }
    }
  };

  const filteredAds = filter === 'all' ? ads : ads.filter(ad => ad.status === filter);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-300 pb-20">
      {/* Admin Header */}
      <div className="bg-slate-800 border-b border-slate-700 py-6 px-8">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-white">Admin Control Center</h1>
              <p className="text-sm text-slate-400">Manage marketplace listings and users</p>
            </div>
          </div>
          
          <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-700">
            <button 
              onClick={() => setActiveTab('ads')}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'ads' ? 'bg-primary text-white shadow-lg' : 'hover:text-white'}`}
            >
              <LayoutGrid className="w-4 h-4 inline mr-2" /> Listings
            </button>
            <button 
              onClick={() => setActiveTab('users')}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'users' ? 'bg-primary text-white shadow-lg' : 'hover:text-white'}`}
            >
              <Users className="w-4 h-4 inline mr-2" /> Users
            </button>
            <button 
              onClick={() => setActiveTab('stats')}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'stats' ? 'bg-primary text-white shadow-lg' : 'hover:text-white'}`}
            >
              <BarChart3 className="w-4 h-4 inline mr-2" /> Analytics
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 mt-10">
        {activeTab === 'ads' && (
          <div className="space-y-6">
            {/* Filters */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-800 p-4 rounded-2xl border border-slate-700">
              <div className="flex items-center gap-4">
                <button onClick={() => setFilter('all')} className={`px-3 py-1.5 rounded-lg text-xs font-bold ${filter === 'all' ? 'bg-slate-700 text-white' : 'hover:text-white'}`}>All</button>
                <button onClick={() => setFilter('pending')} className={`px-3 py-1.5 rounded-lg text-xs font-bold ${filter === 'pending' ? 'bg-amber-500/20 text-amber-500' : 'hover:text-white'}`}>Pending</button>
                <button onClick={() => setFilter('approved')} className={`px-3 py-1.5 rounded-lg text-xs font-bold ${filter === 'approved' ? 'bg-emerald-500/20 text-emerald-500' : 'hover:text-white'}`}>Approved</button>
                <button onClick={() => setFilter('rejected')} className={`px-3 py-1.5 rounded-lg text-xs font-bold ${filter === 'rejected' ? 'bg-red-500/20 text-red-500' : 'hover:text-white'}`}>Rejected</button>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                <input type="text" placeholder="Search ads..." className="bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-2 text-sm outline-none focus:border-primary" />
              </div>
            </div>

            {/* Ads Table */}
            <div className="bg-slate-800 rounded-3xl border border-slate-700 overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-900/50 text-xs font-bold uppercase tracking-wider text-slate-500">
                    <th className="px-6 py-4">Item</th>
                    <th className="px-6 py-4">Seller</th>
                    <th className="px-6 py-4">Price</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {filteredAds.map(ad => (
                    <tr key={ad.id} className="hover:bg-slate-700/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img src={ad.images[0]} className="w-10 h-10 rounded-lg object-cover" alt="" />
                          <div className="min-w-0">
                            <p className="text-sm font-bold text-white truncate max-w-[200px]">{ad.title}</p>
                            <p className="text-[10px] text-slate-500">{ad.category}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm">{ad.userName}</td>
                      <td className="px-6 py-4 text-sm font-bold text-primary-light">Rs. {ad.price.toLocaleString()}</td>
                      <td className="px-6 py-4">
                        <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase ${
                          ad.status === 'approved' ? 'bg-emerald-500/10 text-emerald-500' :
                          ad.status === 'pending' ? 'bg-amber-500/10 text-amber-500' :
                          'bg-red-500/10 text-red-500'
                        }`}>
                          {ad.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs text-slate-500">
                        {ad.createdAt?.seconds ? format(new Date(ad.createdAt.seconds * 1000), 'MMM d, yyyy') : 'N/A'}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {ad.status === 'pending' && (
                            <>
                              <button 
                                onClick={() => handleStatusUpdate(ad.id, 'approved')}
                                className="p-2 bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white rounded-lg transition-all"
                                title="Approve"
                              >
                                <CheckCircle className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => handleStatusUpdate(ad.id, 'rejected')}
                                className="p-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-all"
                                title="Reject"
                              >
                                <XCircle className="w-4 h-4" />
                              </button>
                            </>
                          )}
                          <button className="p-2 hover:bg-slate-700 rounded-lg transition-all" title="View">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteAd(ad.id)}
                            className="p-2 hover:bg-red-500/10 hover:text-red-500 rounded-lg transition-all" 
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredAds.length === 0 && (
                <div className="p-20 text-center text-slate-500">
                  <LayoutGrid className="w-12 h-12 mx-auto mb-4 opacity-20" />
                  <p>No listings found matching your criteria</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700">
              <TrendingUp className="text-primary-light w-8 h-8 mb-4" />
              <h3 className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-2">Total Revenue</h3>
              <p className="text-4xl font-black text-white">Rs. 4.2M</p>
              <p className="text-xs text-emerald-500 mt-2">+12% from last month</p>
            </div>
            <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700">
              <Users className="text-blue-400 w-8 h-8 mb-4" />
              <h3 className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-2">Active Users</h3>
              <p className="text-4xl font-black text-white">{users.length}</p>
              <p className="text-xs text-blue-400 mt-2">42 new today</p>
            </div>
            <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700">
              <AlertTriangle className="text-amber-400 w-8 h-8 mb-4" />
              <h3 className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-2">Pending Reviews</h3>
              <p className="text-4xl font-black text-white">{ads.filter(a => a.status === 'pending').length}</p>
              <p className="text-xs text-amber-400 mt-2">Requires immediate action</p>
            </div>
          </div>
        )}
        
        {activeTab === 'users' && (
          <div className="bg-slate-800 rounded-3xl border border-slate-700 overflow-hidden">
             <table className="w-full text-left">
                <thead className="bg-slate-900/50 text-xs font-bold uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="px-6 py-4">User</th>
                    <th className="px-6 py-4">Role</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {users.map(u => (
                    <tr key={u.uid} className="hover:bg-slate-700/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-white">
                            {u.name[0]}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-white">{u.name}</p>
                            <p className="text-[10px] text-slate-500">{u.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-xs font-bold uppercase">{u.role}</td>
                      <td className="px-6 py-4">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${u.verified ? 'bg-emerald-500/10 text-emerald-500' : 'bg-slate-700 text-slate-500'}`}>
                          {u.verified ? 'Verified' : 'Unverified'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-xs font-bold text-red-500 hover:underline">Suspend</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
             </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
