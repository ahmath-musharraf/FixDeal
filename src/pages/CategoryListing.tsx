import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Search, SlidersHorizontal, Car, ChevronLeft, ChevronRight } from 'lucide-react';
import { getAds } from '../services/db';
import { AdListing, AdCategory } from '../types';
import { CarCard } from '../components/CarCard';

export const CategoryListing = () => {
  const { category } = useParams();
  const [ads, setAds] = useState<AdListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (category) {
      fetchCategoryAds();
    }
  }, [category]);

  const fetchCategoryAds = async () => {
    setLoading(true);
    try {
      const categoryAds = await getAds({ category: category as AdCategory, status: 'approved' });
      setAds(categoryAds);
    } catch (error) {
      console.error('Error fetching category ads:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredAds = ads.filter(ad => 
    ad.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ad.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-32 pb-20 bg-zinc-50 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <Link to="/" className="inline-flex items-center gap-2 text-zinc-500 font-bold hover:text-brand-dark transition-colors mb-6">
            <ChevronLeft className="w-5 h-5" /> Back to Home
          </Link>
          <h1 className="text-4xl font-black mb-4">{category} Marketplace</h1>
          <p className="text-zinc-500">Explore the best deals in the {category} category.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder={`Search in ${category}...`} 
              className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl border border-zinc-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-dark/20 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="flex items-center justify-center gap-2 px-6 py-4 bg-white border border-zinc-200 rounded-2xl font-bold hover:bg-zinc-50 transition-all shadow-sm">
            <SlidersHorizontal className="w-5 h-5" /> Filters
          </button>
        </div>

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="bg-white h-[400px] rounded-[40px] animate-pulse border border-zinc-100" />
            ))}
          </div>
        ) : filteredAds.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAds.map(ad => (
              <motion.div
                key={ad.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {/* Reusing CarCard logic but mapping AdListing to CarListing-like structure if needed, 
                    or just creating a generic AdCard. For now, let's use a simplified version or adapt CarCard.
                    Actually, let's create a generic AdCard component for better reuse.
                */}
                <Link to={`/ad/${ad.id}`} className="block bg-white rounded-[40px] overflow-hidden border border-zinc-100 shadow-sm group hover:shadow-2xl transition-all duration-500">
                  <div className="aspect-[16/10] overflow-hidden relative">
                    <img src={ad.images[0]} alt={ad.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute top-4 right-4 px-3 py-1 bg-white/80 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest">
                      {ad.category}
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold line-clamp-1">{ad.title}</h3>
                      {ad.isVerified && <Car className="w-5 h-5 text-brand-dark" />}
                    </div>
                    <p className="text-zinc-400 text-xs font-medium mb-6 flex items-center gap-1">
                      <Car className="w-3.5 h-3.5" /> {ad.location}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-2xl font-black text-brand-dark">LKR {ad.price.toLocaleString()}</p>
                      <div className="w-10 h-10 bg-zinc-50 rounded-xl flex items-center justify-center group-hover:bg-brand-dark group-hover:text-white transition-all">
                        <ChevronRight className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-white rounded-[40px] border border-dashed border-zinc-200">
            <div className="w-20 h-20 bg-zinc-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="text-zinc-300 w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-zinc-900 mb-2">No listings found</h3>
            <p className="text-zinc-500 mb-8">We couldn't find any ads in this category matching your criteria.</p>
            <button 
              onClick={() => setSearchQuery('')}
              className="text-brand-dark font-bold hover:underline"
            >
              Clear search
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
