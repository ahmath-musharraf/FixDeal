import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle, 
  XCircle, 
  Trash2, 
  Users, 
  LayoutGrid, 
  BarChart3, 
  Clock, 
  ShieldCheck, 
  Search, 
  MoreVertical,
  ChevronRight,
  Eye
} from 'lucide-react';
import { getAds, approveAd, rejectAd, deleteAd, getAllUsers, getAnalyticsSummary } from '../services/db';
import { AdListing, UserProfile, AnalyticsSummary } from '../types';
import { format } from 'date-fns';

export const AdminDashboard = () => {
  const [ads, setAds] = useState<AdListing[]>([]);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'ads' | 'users' | 'analytics'>('analytics');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [allAds, allUsers, summary] = await Promise.all([
        getAds({}),
        getAllUsers(),
        getAnalyticsSummary()
      ]);
      setAds(allAds);
      setUsers(allUsers);
      setAnalytics(summary);
    } catch (error) {
      console.error('Error fetching admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (adId: string) => {
    try {
      await approveAd(adId);
      setAds(ads.map(ad => ad.id === adId ? { ...ad, status: 'approved', isVerified: true } : ad));
    } catch (error) {
      console.error('Error approving ad:', error);
    }
  };

  const handleReject = async (adId: string) => {
    try {
      await rejectAd(adId);
      setAds(ads.map(ad => ad.id === adId ? { ...ad, status: 'rejected', isVerified: false } : ad));
    } catch (error) {
      console.error('Error rejecting ad:', error);
    }
  };

  const handleDelete = async (adId: string) => {
    if (window.confirm('Are you sure you want to delete this ad permanently?')) {
      try {
        await deleteAd(adId);
        setAds(ads.filter(ad => ad.id !== adId));
      } catch (error) {
        console.error('Error deleting ad:', error);
      }
    }
  };

  const filteredAds = ads.filter(ad => 
    ad.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ad.userName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-32 pb-20 bg-zinc-50 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-black mb-2">Admin Command Center</h1>
            <p className="text-zinc-500">Manage listings, users, and platform analytics.</p>
          </div>
          <div className="flex bg-white p-1.5 rounded-2xl shadow-sm border border-zinc-100">
            {[
              { id: 'analytics', icon: BarChart3, label: 'Overview' },
              { id: 'ads', icon: LayoutGrid, label: 'Ads' },
              { id: 'users', icon: Users, label: 'Users' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === tab.id ? 'bg-brand-dark text-white shadow-lg' : 'text-zinc-500 hover:bg-zinc-50'}`}
              >
                <tab.icon className="w-4 h-4" /> {tab.label}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'analytics' && (
            <motion.div 
              key="analytics"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {[
                { label: 'Total Listings', value: analytics?.totalAds || 0, icon: LayoutGrid, color: 'brand-dark' },
                { label: 'Pending Review', value: analytics?.pendingAds || 0, icon: Clock, color: 'amber-500' },
                { label: 'Approved Ads', value: analytics?.approvedAds || 0, icon: CheckCircle, color: 'emerald-500' },
                { label: 'Total Users', value: analytics?.totalUsers || 0, icon: Users, color: 'brand-dark' }
              ].map((stat, i) => (
                <div key={i} className="bg-white p-8 rounded-[40px] border border-zinc-100 shadow-sm">
                  <div className={`w-12 h-12 rounded-2xl bg-${stat.color}/10 flex items-center justify-center mb-6`}>
                    <stat.icon className={`w-6 h-6 text-${stat.color}`} />
                  </div>
                  <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest mb-1">{stat.label}</p>
                  <h3 className="text-4xl font-black">{stat.value}</h3>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'ads' && (
            <motion.div 
              key="ads"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 w-5 h-5" />
                <input 
                  type="text" 
                  placeholder="Search ads by title or user..." 
                  className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl border border-zinc-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-dark/20 transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="bg-white rounded-[40px] border border-zinc-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-zinc-50 border-b border-zinc-100">
                        <th className="px-8 py-6 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Ad Details</th>
                        <th className="px-8 py-6 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">User</th>
                        <th className="px-8 py-6 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Status</th>
                        <th className="px-8 py-6 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Price</th>
                        <th className="px-8 py-6 text-[10px] font-bold text-zinc-400 uppercase tracking-widest text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-50">
                      {filteredAds.map(ad => (
                        <tr key={ad.id} className="hover:bg-zinc-50/50 transition-colors">
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-4">
                              <img src={ad.images[0]} className="w-12 h-12 rounded-xl object-cover" alt="" />
                              <div>
                                <p className="font-bold text-sm">{ad.title}</p>
                                <p className="text-xs text-zinc-400">{ad.category} • {ad.location}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-6 text-sm font-medium text-zinc-600">{ad.userName}</td>
                          <td className="px-8 py-6">
                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                              ad.status === 'approved' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                              ad.status === 'pending' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                              'bg-red-50 text-red-600 border-red-100'
                            }`}>
                              {ad.status}
                            </span>
                          </td>
                          <td className="px-8 py-6 font-black text-brand-dark">LKR {ad.price.toLocaleString()}</td>
                          <td className="px-8 py-6 text-right">
                            <div className="flex items-center justify-end gap-2">
                              {ad.status === 'pending' && (
                                <>
                                  <button 
                                    onClick={() => handleApprove(ad.id)}
                                    className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all"
                                    title="Approve"
                                  >
                                    <CheckCircle className="w-5 h-5" />
                                  </button>
                                  <button 
                                    onClick={() => handleReject(ad.id)}
                                    className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center hover:bg-amber-500 hover:text-white transition-all"
                                    title="Reject"
                                  >
                                    <XCircle className="w-5 h-5" />
                                  </button>
                                </>
                              )}
                              <button 
                                onClick={() => handleDelete(ad.id)}
                                className="w-10 h-10 bg-red-50 text-red-600 rounded-xl flex items-center justify-center hover:bg-red-500 hover:text-white transition-all"
                                title="Delete"
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'users' && (
            <motion.div 
              key="users"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 w-5 h-5" />
                <input 
                  type="text" 
                  placeholder="Search users by name or email..." 
                  className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl border border-zinc-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-dark/20 transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="bg-white rounded-[40px] border border-zinc-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-zinc-50 border-b border-zinc-100">
                        <th className="px-8 py-6 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">User Info</th>
                        <th className="px-8 py-6 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Role</th>
                        <th className="px-8 py-6 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Joined Date</th>
                        <th className="px-8 py-6 text-[10px] font-bold text-zinc-400 uppercase tracking-widest text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-50">
                      {filteredUsers.map(user => (
                        <tr key={user.uid} className="hover:bg-zinc-50/50 transition-colors">
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 bg-zinc-100 rounded-full flex items-center justify-center">
                                <Users className="w-5 h-5 text-zinc-400" />
                              </div>
                              <div>
                                <p className="font-bold text-sm">{user.name}</p>
                                <p className="text-xs text-zinc-400">{user.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                              user.role === 'admin' ? 'bg-brand-dark text-white border-brand-dark' : 'bg-zinc-50 text-zinc-600 border-zinc-100'
                            }`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="px-8 py-6 text-sm text-zinc-500">
                            {user.createdAt ? format(user.createdAt.toDate(), 'MMM dd, yyyy') : 'N/A'}
                          </td>
                          <td className="px-8 py-6 text-right">
                            <button className="w-10 h-10 bg-zinc-50 text-zinc-400 rounded-xl flex items-center justify-center hover:bg-zinc-100 transition-all">
                              <MoreVertical className="w-5 h-5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
