import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Ad, CATEGORIES, LOCATIONS } from '../types';
import AdCard from '../components/AdCard';
import { Filter, Search as SearchIcon, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { motion } from 'motion/react';

const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);
  
  const category = searchParams.get('category') || '';
  const q = searchParams.get('q') || '';
  const sortBy = searchParams.get('sort') || 'newest';

  useEffect(() => {
    const fetchAds = async () => {
      setLoading(true);
      try {
        let adsQuery = query(
          collection(db, 'ads'),
          where('status', '==', 'approved')
        );

        if (category) {
          adsQuery = query(adsQuery, where('category', '==', category));
        }

        const querySnap = await getDocs(adsQuery);
        let results = querySnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Ad));

        // Client-side filtering for search term (Firestore doesn't support full-text search easily)
        if (q) {
          results = results.filter(ad => 
            ad.title.toLowerCase().includes(q.toLowerCase()) || 
            ad.description.toLowerCase().includes(q.toLowerCase())
          );
        }

        // Sorting
        results.sort((a, b) => {
          if (sortBy === 'price_low') return a.price - b.price;
          if (sortBy === 'price_high') return b.price - a.price;
          if (sortBy === 'oldest') return (a.createdAt?.seconds || 0) - (b.createdAt?.seconds || 0);
          return (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0); // newest
        });

        setAds(results);
      } catch (error) {
        console.error("Error searching ads:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, [category, q, sortBy]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('sort', e.target.value);
    setSearchParams(newParams);
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="bg-white border-b border-slate-100 py-8">
        <div className="max-w-[1440px] mx-auto px-4">
          <h1 className="text-3xl font-black text-slate-900 mb-6">
            {category ? `${category} in Sri Lanka` : q ? `Search results for "${q}"` : 'All Listings'}
          </h1>
          
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-nowrap md:flex-wrap gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => {
                    const newParams = new URLSearchParams(searchParams);
                    if (category === cat) newParams.delete('category');
                    else newParams.set('category', cat);
                    setSearchParams(newParams);
                  }}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap shrink-0 ${category === cat ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <ArrowUpDown className="absolute left-3 top-2.5 text-slate-400 w-4 h-4" />
                <select 
                  value={sortBy}
                  onChange={handleSortChange}
                  className="w-full pl-10 pr-4 py-2 bg-slate-100 rounded-xl text-sm font-bold outline-none appearance-none cursor-pointer"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 py-12">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <div key={i} className="bg-white rounded-2xl h-80 animate-pulse border border-slate-100"></div>
            ))}
          </div>
        ) : ads.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ads.map(ad => (
              <AdCard key={ad.id} ad={ad} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
              <SearchIcon className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">No ads found</h2>
            <p className="text-slate-500">Try adjusting your filters or search term</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
