import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MapPin, 
  Calendar, 
  Gauge, 
  ShieldCheck, 
  Phone, 
  MessageCircle, 
  ChevronLeft, 
  ChevronRight, 
  Share2, 
  Heart,
  Tag,
  Clock,
  User as UserIcon,
  CheckCircle2,
  Flag,
  MessageSquare
} from 'lucide-react';
import { getAdById, startChat, reportAd } from '../services/db';
import { AdListing } from '../types';
import { formatDistanceToNow } from 'date-fns';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { SEO } from '../components/SEO';

export const AdDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [ad, setAd] = useState<AdListing | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isReporting, setIsReporting] = useState(false);
  const [reportReason, setReportReason] = useState('');
  const [reportSuccess, setReportSuccess] = useState(false);

  useEffect(() => {
    if (id) {
      fetchAd();
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      setIsFavorite(favorites.includes(id));
    }
  }, [id]);

  const fetchAd = async () => {
    setLoading(true);
    try {
      const adData = await getAdById(id!);
      setAd(adData);
    } catch (error) {
      console.error('Error fetching ad:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    let newFavorites;
    if (isFavorite) {
      newFavorites = favorites.filter((favId: string) => favId !== id);
    } else {
      newFavorites = [...favorites, id];
    }
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);
  };

  const handleStartChat = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (!ad) return;
    
    try {
      const chatId = await startChat({
        adId: ad.id,
        adTitle: ad.title,
        adImage: ad.images[0],
        buyerId: user.uid,
        sellerId: ad.userId
      });
      navigate(`/chat/${chatId}`);
    } catch (error) {
      console.error('Error starting chat:', error);
    }
  };

  const handleReport = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (!ad || !reportReason) return;
    
    try {
      await reportAd({
        adId: ad.id,
        reporterId: user.uid,
        reason: reportReason
      });
      setReportSuccess(true);
      setTimeout(() => {
        setIsReporting(false);
        setReportSuccess(false);
        setReportReason('');
      }, 3000);
    } catch (error) {
      console.error('Error reporting ad:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50">
        <div className="w-12 h-12 border-4 border-brand-dark border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!ad) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center bg-zinc-50 px-6">
        <h1 className="text-4xl font-black mb-4">Ad Not Found</h1>
        <p className="text-zinc-500 mb-8 text-center max-w-md">The ad you are looking for might have been removed or is no longer available.</p>
        <Link to="/buy" className="bg-brand-dark text-white px-8 py-4 rounded-2xl font-bold hover:bg-brand-primary transition-all">
          Back to Marketplace
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 bg-zinc-50 px-6">
      <SEO 
        title={ad.title} 
        description={ad.description.substring(0, 160)} 
        image={ad.images[0]} 
      />
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Link to="/buy" className="inline-flex items-center gap-2 text-zinc-500 font-bold hover:text-brand-dark transition-colors">
            <ChevronLeft className="w-5 h-5" /> Back to Marketplace
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left Column: Images & Description */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div className="bg-white rounded-[40px] overflow-hidden shadow-sm border border-zinc-100 p-4">
              <div className="relative aspect-[16/9] rounded-[32px] overflow-hidden mb-4 group">
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={activeImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    src={ad.images[activeImage]} 
                    alt={ad.title} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </AnimatePresence>
                
                {ad.images.length > 1 && (
                  <>
                    <button 
                      onClick={() => setActiveImage(prev => (prev === 0 ? ad.images.length - 1 : prev - 1))}
                      className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-white"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button 
                      onClick={() => setActiveImage(prev => (prev === ad.images.length - 1 ? 0 : prev + 1))}
                      className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-white"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}
                
                <div className="absolute top-6 right-6 flex gap-3">
                  <button 
                    onClick={toggleFavorite}
                    className={`w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md transition-all ${isFavorite ? 'bg-red-500 text-white shadow-lg shadow-red-500/30' : 'bg-white/20 text-white hover:bg-white/40'}`}
                  >
                    <Heart className={`w-6 h-6 ${isFavorite ? 'fill-current' : ''}`} />
                  </button>
                  <button className="w-12 h-12 bg-white/20 backdrop-blur-md text-white rounded-full flex items-center justify-center hover:bg-white/40 transition-all">
                    <Share2 className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {ad.images.length > 1 && (
                <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
                  {ad.images.map((img, i) => (
                    <button 
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={`relative w-24 aspect-square rounded-2xl overflow-hidden shrink-0 border-2 transition-all ${activeImage === i ? 'border-brand-dark' : 'border-transparent opacity-60'}`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Description & Specs */}
            <div className="bg-white p-10 rounded-[40px] border border-zinc-100 shadow-sm">
              <div className="flex items-center gap-4 mb-8">
                <div className="px-4 py-1.5 bg-zinc-50 rounded-full text-[10px] font-bold text-zinc-500 uppercase tracking-widest border border-zinc-100">
                  {ad.category}
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                  <Clock className="w-3.5 h-3.5" />
                  Posted {formatDistanceToNow(ad.createdAt?.toDate() || new Date())} ago
                </div>
              </div>
              
              <h1 className="text-4xl font-black mb-6">{ad.title}</h1>
              <div className="flex flex-wrap gap-8 mb-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-zinc-50 rounded-xl flex items-center justify-center">
                    <MapPin className="text-brand-dark w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">Location</p>
                    <p className="font-bold text-sm">{ad.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-zinc-50 rounded-xl flex items-center justify-center">
                    <Tag className="text-brand-dark w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">Category</p>
                    <p className="font-bold text-sm">{ad.category}</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-zinc-50 pt-10">
                <h3 className="text-xl font-bold mb-6">Description</h3>
                <p className="text-zinc-500 leading-relaxed whitespace-pre-wrap">
                  {ad.description}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Price & Seller Info */}
          <div className="space-y-8">
            {/* Price Card */}
            <div className="bg-white p-10 rounded-[40px] border border-zinc-100 shadow-sm">
              <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mb-2">Price</p>
              <h2 className="text-5xl font-black text-brand-dark mb-8">LKR {ad.price.toLocaleString()}</h2>
              
              <div className="space-y-4">
                <button 
                  onClick={handleStartChat}
                  className="w-full py-5 bg-brand-dark text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-brand-primary transition-all shadow-xl shadow-brand-dark/20"
                >
                  <MessageSquare className="w-5 h-5" /> Chat with Seller
                </button>
                <div className="grid grid-cols-2 gap-4">
                  <a 
                    href="tel:+94112345678"
                    className="py-4 bg-zinc-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-zinc-800 transition-all"
                  >
                    <Phone className="w-4 h-4" /> Call
                  </a>
                  <button 
                    onClick={() => window.open('https://wa.me/94112345678', '_blank')}
                    className="py-4 bg-emerald-500 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-600 transition-all"
                  >
                    <MessageCircle className="w-4 h-4" /> WhatsApp
                  </button>
                </div>
              </div>

              {ad.isVerified && (
                <div className="mt-8 flex items-center gap-3 p-4 bg-brand-dark/5 rounded-2xl border border-brand-dark/10">
                  <ShieldCheck className="text-brand-dark w-6 h-6 shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-brand-dark uppercase tracking-widest">Verified Listing</p>
                    <p className="text-[10px] text-zinc-500">This item has been inspected and verified by our team.</p>
                  </div>
                </div>
              )}
            </div>

            {/* Seller Info */}
            <div className="bg-white p-10 rounded-[40px] border border-zinc-100 shadow-sm">
              <h3 className="text-xl font-bold mb-6">Seller Information</h3>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-zinc-100 rounded-2xl flex items-center justify-center">
                  <UserIcon className="text-zinc-400 w-8 h-8" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-lg">{ad.userName}</p>
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  </div>
                  <p className="text-xs text-zinc-400 font-medium">Member since 2024</p>
                </div>
              </div>
              <Link to={`/seller/${ad.userId}`} className="w-full py-4 bg-zinc-50 text-zinc-600 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-zinc-100 transition-all">
                View Seller Profile <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Report Ad */}
            <div className="bg-white p-10 rounded-[40px] border border-zinc-100 shadow-sm">
              {!isReporting ? (
                <button 
                  onClick={() => setIsReporting(true)}
                  className="w-full flex items-center justify-center gap-2 text-zinc-400 font-bold hover:text-red-500 transition-all"
                >
                  <Flag className="w-4 h-4" /> Report this ad
                </button>
              ) : (
                <div className="space-y-4">
                  {reportSuccess ? (
                    <div className="text-center py-4">
                      <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
                      <p className="text-sm font-bold text-emerald-600">Report submitted successfully</p>
                    </div>
                  ) : (
                    <>
                      <h4 className="font-bold text-sm mb-2">Why are you reporting?</h4>
                      <select 
                        className="w-full p-3 bg-zinc-50 rounded-xl border border-zinc-200 text-sm"
                        value={reportReason}
                        onChange={(e) => setReportReason(e.target.value)}
                      >
                        <option value="">Select a reason</option>
                        <option value="Spam">Spam</option>
                        <option value="Fraud">Fraud / Scam</option>
                        <option value="Inappropriate">Inappropriate content</option>
                        <option value="Duplicate">Duplicate ad</option>
                        <option value="Sold">Already sold</option>
                      </select>
                      <div className="flex gap-2">
                        <button 
                          onClick={handleReport}
                          disabled={!reportReason}
                          className="flex-1 bg-red-500 text-white py-3 rounded-xl font-bold text-sm disabled:opacity-50"
                        >
                          Submit Report
                        </button>
                        <button 
                          onClick={() => setIsReporting(false)}
                          className="px-4 bg-zinc-100 text-zinc-500 py-3 rounded-xl font-bold text-sm"
                        >
                          Cancel
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
