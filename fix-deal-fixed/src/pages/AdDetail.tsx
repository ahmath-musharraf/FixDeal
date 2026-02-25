import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { doc, getDoc, collection, query, where, limit, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Ad } from '../types';
import { MapPin, Clock, Tag, User, Phone, MessageSquare, Share2, Flag, ChevronLeft, ChevronRight, CheckCircle2, ShieldCheck, Star } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../context/AuthContext';

const AdDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [ad, setAd] = useState<Ad | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showPhone, setShowPhone] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAd = async () => {
      if (!id) return;
      try {
        const docRef = doc(db, 'ads', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setAd({ id: docSnap.id, ...docSnap.data() } as Ad);
        } else {
          toast.error('Ad not found');
          navigate('/');
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAd();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!ad) return null;

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Breadcrumbs */}
      <div className="max-w-[1440px] mx-auto px-4 py-4">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Link to="/" className="hover:text-primary">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link to={`/search?category=${ad.category}`} className="hover:text-primary">{ad.category}</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="truncate max-w-[200px]">{ad.title}</span>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Images & Description */}
        <div className="lg:col-span-2 space-y-6">
          {/* Image Gallery */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 relative group">
            <div className="aspect-[16/10] bg-slate-100 relative">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  src={ad.images[currentImageIndex]}
                  alt={ad.title}
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </AnimatePresence>
              
              {ad.images.length > 1 && (
                <>
                  <button 
                    onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? ad.images.length - 1 : prev - 1))}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-slate-900 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button 
                    onClick={() => setCurrentImageIndex((prev) => (prev === ad.images.length - 1 ? 0 : prev + 1))}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-slate-900 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>
            
            {/* Thumbnails */}
            <div className="p-4 flex gap-3 overflow-x-auto scrollbar-hide">
              {ad.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${currentImageIndex === idx ? 'border-primary' : 'border-transparent opacity-60'}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Ad Details */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full">{ad.category}</span>
              <span className="flex items-center gap-1 text-xs text-slate-500"><MapPin className="w-3 h-3" /> {ad.location}</span>
              <span className="flex items-center gap-1 text-xs text-slate-500"><Clock className="w-3 h-3" /> {ad.createdAt?.seconds ? formatDistanceToNow(new Date(ad.createdAt.seconds * 1000)) + ' ago' : 'Just now'}</span>
            </div>
            
            <h1 className="text-3xl font-black text-slate-900 mb-4">{ad.title}</h1>
            <p className="text-3xl font-black text-primary mb-8">Rs. {ad.price.toLocaleString()}</p>
            
            <div className="border-t border-slate-50 pt-8">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Description</h3>
              <div className="text-slate-600 leading-relaxed whitespace-pre-wrap">
                {ad.description}
              </div>
            </div>
            
            <div className="mt-12 flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Flag className="w-4 h-4" />
                Is there something wrong with this ad?
              </div>
              <button className="text-xs font-bold text-red-500 hover:underline">Report Ad</button>
            </div>
          </div>
        </div>

        {/* Right Column: Seller Info & Actions */}
        <div className="space-y-6">
          {/* Seller Card */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Seller Information</h3>
              <Link to={`/search?seller=${ad.userId}`} className="text-xs font-bold text-primary hover:underline">Visit Store</Link>
            </div>
            <Link to={`/search?seller=${ad.userId}`} className="flex items-center gap-4 mb-8 group">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-bold text-2xl group-hover:bg-primary group-hover:text-white transition-all">
                {ad.userName?.[0] || 'U'}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <h4 className="font-bold text-slate-900 text-lg group-hover:text-primary transition-colors">{ad.userName}</h4>
                  {ad.isVerified && <CheckCircle2 className="w-4 h-4 text-blue-500" />}
                </div>
                <p className="text-xs text-slate-500">Member since 2024</p>
              </div>
            </Link>

            <div className="space-y-3">
              <button 
                onClick={() => setShowPhone(!showPhone)}
                className="w-full bg-primary text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-primary-dark transition-all shadow-lg shadow-primary/20"
              >
                <Phone className="w-5 h-5" />
                {showPhone ? (
                  user ? (ad.phoneNumber || '077 123 4567') : (
                    (ad.phoneNumber || '077 123 4567').substring(0, 3) + ' XXX ' + (ad.phoneNumber || '077 123 4567').slice(-4)
                  )
                ) : 'Show Phone Number'}
              </button>
              {!user && showPhone && (
                <p className="text-[10px] text-center text-slate-400">
                  <Link to="/login" className="text-primary hover:underline">Login</Link> to see the full number
                </p>
              )}
              <button className="w-full bg-white text-primary border border-primary/20 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-slate-50 transition-all">
                <MessageSquare className="w-5 h-5" />
                Chat with Seller
              </button>
            </div>
          </div>

          {/* Safety Tips */}
          <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100">
            <div className="flex items-center gap-2 text-emerald-700 font-bold mb-4">
              <ShieldCheck className="w-5 h-5" />
              Safety Tips
            </div>
            <ul className="text-xs text-emerald-600 space-y-3 list-disc pl-4">
              <li>Meet the seller in a safe public place</li>
              <li>Inspect the item thoroughly before paying</li>
              <li>Never pay in advance via bank transfer</li>
              <li>Beware of unrealistic low prices</li>
            </ul>
          </div>

          {/* Share */}
          <div className="flex items-center justify-center gap-6">
            <button className="flex flex-col items-center gap-2 text-slate-400 hover:text-primary transition-colors">
              <div className="w-12 h-12 rounded-full bg-white border border-slate-100 flex items-center justify-center shadow-sm">
                <Share2 className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold">SHARE</span>
            </button>
            <button className="flex flex-col items-center gap-2 text-slate-400 hover:text-amber-500 transition-colors">
              <div className="w-12 h-12 rounded-full bg-white border border-slate-100 flex items-center justify-center shadow-sm">
                <Star className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold">SAVE</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Actions */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-lg border-t border-slate-100 p-4 pb-safe flex gap-3 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] mb-[72px]">
        <button 
          onClick={() => setShowPhone(!showPhone)}
          className="flex-1 bg-primary text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
        >
          <Phone className="w-5 h-5" />
          {showPhone ? (
            user ? (ad.phoneNumber || '077 123 4567') : (
              (ad.phoneNumber || '077 123 4567').substring(0, 3) + ' XXX ' + (ad.phoneNumber || '077 123 4567').slice(-4)
            )
          ) : 'Call'}
        </button>
        <button className="flex-1 bg-white text-primary border border-primary/20 py-4 rounded-2xl font-bold flex items-center justify-center gap-2">
          <MessageSquare className="w-5 h-5" />
          Chat
        </button>
      </div>
    </div>
  );
};

export default AdDetail;
