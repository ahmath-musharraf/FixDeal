import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, CheckCircle2, Star, User, Heart } from 'lucide-react';
import { Ad } from '../types';
import { formatDistanceToNow } from 'date-fns';
import { motion } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { db } from '../lib/firebase';
import { doc, setDoc, deleteDoc, onSnapshot, collection, query, where } from 'firebase/firestore';
import { toast } from 'react-hot-toast';

interface AdCardProps {
  ad: Ad;
}

const AdCard: React.FC<AdCardProps> = ({ ad }) => {
  const { user } = useAuth();
  const [isSaved, setIsSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) {
      setIsSaved(false);
      return;
    }

    // Check if ad is saved by this user
    const savedAdId = `${user.uid}_${ad.id}`;
    const unsub = onSnapshot(doc(db, 'saved_ads', savedAdId), (doc) => {
      setIsSaved(doc.exists());
    });

    return () => unsub();
  }, [user, ad.id]);

  const toggleSave = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      toast.error('Please login to save ads');
      return;
    }

    setSaving(true);
    const savedAdId = `${user.uid}_${ad.id}`;
    const docRef = doc(db, 'saved_ads', savedAdId);

    try {
      if (isSaved) {
        await deleteDoc(docRef);
        toast.success('Removed from saved ads');
      } else {
        await setDoc(docRef, {
          userId: user.uid,
          adId: ad.id,
          savedAt: new Date(),
        });
        toast.success('Ad saved for later');
      }
    } catch (error) {
      console.error("Error toggling save:", error);
      toast.error('Failed to update saved ads');
    } finally {
      setSaving(false);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-md transition-all group flex flex-col relative"
    >
      {/* Save Button */}
      <button
        onClick={toggleSave}
        disabled={saving}
        className={`absolute top-3 right-3 z-30 p-2 rounded-full backdrop-blur-md transition-all ${
          isSaved 
            ? 'bg-red-500 text-white shadow-lg' 
            : 'bg-white/60 text-slate-600 hover:bg-white hover:text-red-500'
        }`}
      >
        <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
      </button>

      <Link to={`/ad/${ad.id}`} className="flex-1">
        <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
          {ad.images?.[0] ? (
            <img
              src={ad.images[0]}
              alt={ad.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-300">
              No Image
            </div>
          )}
          
          {/* Badges - Left */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {ad.isFeatured && (
              <span className="bg-amber-400 text-amber-950 text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">
                <Star className="w-3 h-3 fill-current" /> FEATURED
              </span>
            )}
            {ad.isPremium && (
              <span className="bg-primary text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-sm">
                PREMIUM
              </span>
            )}
          </div>
          
          <div className="absolute bottom-3 right-3">
             <span className="bg-white/90 backdrop-blur-sm text-primary text-xs font-bold px-2 py-1 rounded-lg">
               {ad.category}
             </span>
          </div>
        </div>

        <div className="p-3 md:p-4">
          <div className="flex items-center gap-1 mb-1">
            <h3 className="text-sm sm:text-base md:text-lg font-bold text-slate-900 truncate flex-1">
              {ad.title}
            </h3>
            {ad.isVerified && (
              <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-blue-500 fill-blue-50" />
            )}
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 md:mb-3 gap-1 sm:gap-0">
            <p className="text-primary font-bold text-base sm:text-lg md:text-xl">
              Rs. {ad.price.toLocaleString()}
            </p>
            <span className="flex items-center gap-1 text-[8px] sm:text-[9px] md:text-[10px] font-bold text-slate-500 bg-slate-100 px-1.5 md:px-2 py-0.5 md:py-1 rounded-lg self-start sm:self-auto">
              <MapPin className="w-2.5 h-2.5 md:w-3 md:h-3 text-primary" />
              {ad.location}
            </span>
          </div>
          
          <div className="flex items-center justify-between text-[8px] sm:text-[9px] md:text-[10px] text-slate-400 pt-2 md:pt-3 border-t border-slate-50">
            <div className="flex items-center gap-1">
              <Clock className="w-2.5 h-2.5 md:w-3 md:h-3" />
              {ad.createdAt?.seconds ? formatDistanceToNow(new Date(ad.createdAt.seconds * 1000)) + ' ago' : 'Just now'}
            </div>
          </div>
        </div>
      </Link>

      {/* Seller Quick View */}
      <div className="px-4 pb-4">
        <Link 
          to={`/search?seller=${ad.userId}`} 
          className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 hover:bg-primary/5 hover:text-primary transition-all group/seller border border-transparent hover:border-primary/10"
        >
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover/seller:bg-primary group-hover/seller:text-white transition-colors shrink-0">
            <User className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider leading-none mb-1">Seller</p>
            <p className="text-xs font-bold truncate text-slate-700 group-hover/seller:text-primary transition-colors">{ad.userName}</p>
          </div>
          <div className="px-2 py-1 bg-white rounded-lg text-[10px] font-bold text-primary opacity-0 group-hover/seller:opacity-100 transition-opacity border border-primary/10">
            VIEW PROFILE
          </div>
        </Link>
      </div>
    </motion.div>
  );
};

export default AdCard;
