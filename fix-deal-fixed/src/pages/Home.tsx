import React, { useEffect, useState } from 'react';
import { collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Ad, CATEGORIES } from '../types';
import AdCard from '../components/AdCard';
import { Search, MapPin, ChevronRight, Zap, TrendingUp, ShieldCheck, Smartphone, Globe, Users, Award, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [featuredAds, setFeaturedAds] = useState<Ad[]>([]);
  const [recentAds, setRecentAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const featuredQuery = query(
          collection(db, 'ads'),
          where('status', '==', 'approved'),
          where('isFeatured', '==', true),
          limit(4)
        );
        const featuredSnap = await getDocs(featuredQuery);
        setFeaturedAds(featuredSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Ad)));

        const recentQuery = query(
          collection(db, 'ads'),
          where('status', '==', 'approved'),
          orderBy('createdAt', 'desc'),
          limit(8)
        );
        const recentSnap = await getDocs(recentQuery);
        setRecentAds(recentSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Ad)));
      } catch (error) {
        console.error("Error fetching ads:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, []);

  return (
    <div className="min-h-screen pb-20 bg-slate-50/50">
      {/* Hero Section */}
      <section className="relative bg-primary py-24 md:py-32 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-white rounded-full -translate-x-1/2 -translate-y-1/2 blur-[120px]"></div>
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-white rounded-full translate-x-1/2 translate-y-1/2 blur-[120px]"></div>
        </div>
        
        <div className="max-w-[1440px] mx-auto relative z-10 flex flex-col items-center">
          <div className="max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-white/10 text-white/80 px-4 py-1.5 rounded-full text-sm font-bold mb-8 backdrop-blur-sm border border-white/10"
            >
              <Award className="w-4 h-4 text-amber-400" /> #1 Marketplace in Sri Lanka
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-7xl lg:text-8xl font-black text-white mb-6 md:mb-8 tracking-tight leading-[1] md:leading-[0.9]"
            >
              Buy, Sell & Trade <br />
              <span className="text-amber-400">Everything.</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-primary-light text-lg md:text-2xl mb-10 md:mb-12 font-medium max-w-2xl mx-auto px-4"
            >
              The most trusted platform for Sri Lankans to trade safely and grow their business.
            </motion.p>

            {/* Search Box */}
            <form 
              onSubmit={handleSearch}
              className="bg-white p-2 md:p-3 rounded-[32px] shadow-2xl flex flex-col md:flex-row gap-2 md:gap-3 max-w-3xl mx-auto mx-4 md:mx-auto"
            >
              <div className="flex-[1.5] flex items-center px-4 md:px-6 gap-3 md:gap-4 border-b md:border-b-0 md:border-r border-slate-100">
                <Search className="text-slate-400 w-5 h-5 md:w-6 md:h-6" />
                <input 
                  type="text" 
                  placeholder="What are you looking for?" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full py-3 md:py-4 outline-none text-slate-700 text-base md:text-lg font-medium"
                />
              </div>
              <div className="flex-1 flex items-center px-4 md:px-6 gap-3 md:gap-4">
                <MapPin className="text-slate-400 w-5 h-5 md:w-6 md:h-6" />
                <select className="w-full py-3 md:py-4 outline-none text-slate-700 bg-transparent appearance-none font-medium text-base md:text-lg">
                  <option>All Island</option>
                  <option>Colombo</option>
                  <option>Kandy</option>
                  <option>Galle</option>
                </select>
              </div>
              <button type="submit" className="bg-primary text-white px-8 md:px-10 py-3 md:py-4 rounded-2xl font-black text-base md:text-lg hover:bg-primary-dark transition-all shadow-lg shadow-primary/20">
                Search
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-[1440px] mx-auto px-4 -mt-12 relative z-20">
        <div className="flex flex-nowrap md:grid md:grid-cols-3 gap-4 overflow-x-auto pb-4 md:pb-0 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
          {CATEGORIES.map((cat, i) => (
            <Link
              key={cat}
              to={`/search?category=${encodeURIComponent(cat)}`}
              className="min-w-[140px] md:min-w-0 flex-1"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center justify-center gap-3 hover:shadow-xl hover:border-primary/20 transition-all cursor-pointer group h-full"
              >
                <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <Zap className="w-7 h-7" />
                </div>
                <span className="text-sm font-black text-slate-700 group-hover:text-primary transition-colors whitespace-nowrap">{cat}</span>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-[1440px] mx-auto px-4 mt-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 bg-white p-8 md:p-12 rounded-[32px] md:rounded-[40px] shadow-sm border border-slate-100">
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-black text-primary mb-1 md:mb-2">500K+</p>
            <p className="text-slate-500 font-bold text-[10px] md:text-sm uppercase tracking-widest">Active Ads</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-black text-primary mb-1 md:mb-2">1M+</p>
            <p className="text-slate-500 font-bold text-[10px] md:text-sm uppercase tracking-widest">Monthly Users</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-black text-primary mb-1 md:mb-2">25+</p>
            <p className="text-slate-500 font-bold text-[10px] md:text-sm uppercase tracking-widest">Cities Covered</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-black text-primary mb-1 md:mb-2">100%</p>
            <p className="text-slate-500 font-bold text-[10px] md:text-sm uppercase tracking-widest">Verified Sellers</p>
          </div>
        </div>
      </section>

      {/* Featured Ads */}
      {featuredAds.length > 0 && (
        <section className="max-w-[1440px] mx-auto px-4 mt-32">
          <div className="flex items-end justify-between mb-12">
            <div>
              <div className="flex items-center gap-2 text-amber-500 font-black text-sm uppercase tracking-widest mb-2">
                <TrendingUp className="w-4 h-4" /> Recommended for you
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900">Featured Deals</h2>
            </div>
            <Link to="/search?featured=true" className="bg-white border border-slate-200 px-6 py-3 rounded-2xl font-bold text-slate-600 hover:bg-slate-50 transition-all flex items-center gap-2">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredAds.map(ad => (
              <AdCard key={ad.id} ad={ad} />
            ))}
          </div>
        </section>
      )}

      {/* How it Works */}
      <section className="bg-slate-900 py-20 md:py-32 mt-24 md:mt-32 overflow-hidden relative">
        <div className="max-w-[1440px] mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-20">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-4 md:mb-6">How FIX DEAL Works</h2>
            <p className="text-slate-400 text-lg md:text-xl">The simplest way to buy and sell in Sri Lanka. Just three easy steps.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12">
            {[
              { title: 'Post Your Ad', desc: 'Take photos, add details, and set your price. It takes less than 2 minutes.', icon: <Zap className="w-8 h-8" /> },
              { title: 'Connect with Buyers', desc: 'Get inquiries via chat or phone. Negotiate and finalize the deal.', icon: <Users className="w-8 h-8" /> },
              { title: 'Sell & Earn', desc: 'Meet in a safe place, exchange items, and get paid instantly.', icon: <CheckCircle2 className="w-8 h-8" /> }
            ].map((step, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-8 md:p-10 rounded-[32px] md:rounded-[40px] backdrop-blur-sm">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-primary flex items-center justify-center text-white mb-6 md:mb-8 shadow-xl shadow-primary/20">
                  {step.icon}
                </div>
                <h3 className="text-xl md:text-2xl font-black text-white mb-3 md:mb-4">{step.title}</h3>
                <p className="text-slate-400 leading-relaxed text-sm md:text-base">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Ads */}
      <section className="max-w-[1440px] mx-auto px-4 mt-24 md:mt-32">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 gap-4">
          <div>
            <div className="text-primary font-black text-sm uppercase tracking-widest mb-2">Fresh arrivals</div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900">Recent Postings</h2>
          </div>
          <Link to="/search" className="bg-white border border-slate-200 px-6 py-3 rounded-2xl font-bold text-slate-600 hover:bg-slate-50 transition-all flex items-center justify-center gap-2 w-full md:w-auto">
            Browse All <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <div key={i} className="bg-white rounded-[32px] h-96 animate-pulse border border-slate-100"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {recentAds.map(ad => (
              <AdCard key={ad.id} ad={ad} />
            ))}
          </div>
        )}
      </section>

      {/* App Download Banner */}
      <section className="max-w-[1440px] mx-auto px-4 mt-24 md:mt-32">
        <div className="bg-primary rounded-[40px] md:rounded-[50px] p-8 md:p-20 flex flex-col md:flex-row items-center gap-10 md:gap-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/10 rounded-full blur-[100px] -mr-64 -mt-64"></div>
          <div className="flex-1 relative z-10 text-center md:text-left">
            <h2 className="text-3xl md:text-6xl font-black text-white mb-6 md:mb-8 leading-tight">Trade on the go with our Mobile App</h2>
            <p className="text-primary-light text-lg md:text-xl mb-8 md:mb-12 max-w-xl mx-auto md:mx-0">Get instant notifications, chat with sellers in real-time, and post ads even faster with our mobile app.</p>
            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 md:gap-6">
              <button className="bg-slate-900 text-white px-8 py-4 rounded-2xl flex items-center justify-center md:justify-start gap-4 hover:bg-slate-800 transition-all">
                <Smartphone className="w-8 h-8" />
                <div className="text-left">
                  <p className="text-[10px] uppercase font-bold opacity-60">Download on</p>
                  <p className="text-lg font-black">App Store</p>
                </div>
              </button>
              <button className="bg-slate-900 text-white px-8 py-4 rounded-2xl flex items-center justify-center md:justify-start gap-4 hover:bg-slate-800 transition-all">
                <Globe className="w-8 h-8" />
                <div className="text-left">
                  <p className="text-[10px] uppercase font-bold opacity-60">Get it on</p>
                  <p className="text-lg font-black">Google Play</p>
                </div>
              </button>
            </div>
          </div>
          <div className="hidden md:block w-full md:w-1/3 relative z-10">
            <div className="aspect-[9/16] bg-slate-900 rounded-[40px] border-[8px] border-slate-800 shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-primary/20 to-transparent"></div>
               <div className="p-6">
                 <div className="w-12 h-12 bg-primary rounded-xl mb-6"></div>
                 <div className="h-4 w-32 bg-white/10 rounded-full mb-4"></div>
                 <div className="h-4 w-24 bg-white/10 rounded-full mb-8"></div>
                 <div className="grid grid-cols-2 gap-4">
                   <div className="aspect-square bg-white/5 rounded-2xl"></div>
                   <div className="aspect-square bg-white/5 rounded-2xl"></div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
