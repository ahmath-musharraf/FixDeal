import React, { useState } from 'react';
import { CarCard } from '../components/CarCard';
import { Search, SlidersHorizontal, Car } from 'lucide-react';
import { BRANDS, CAR_LISTINGS } from '../constants';

export const Buy = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  const filteredCars = CAR_LISTINGS.filter(car => {
    const matchesSearch = car.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         car.model.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBrand = selectedBrand ? car.brand.toLowerCase() === selectedBrand.toLowerCase() : true;
    return matchesSearch && matchesBrand;
  });

  return (
    <div className="pt-32 pb-20 min-h-screen bg-zinc-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <h1 className="font-display text-4xl font-bold mb-4">Explore Our Marketplace</h1>
          <p className="text-zinc-500">Find the perfect items from our verified collection in Sri Lanka.</p>
        </div>

        {/* Sticky Search & Filter Container */}
        <div className="sticky top-16 md:top-20 z-30 -mx-6 px-6 py-4 md:py-6 bg-zinc-50/90 backdrop-blur-xl mb-8 md:mb-12 border-b border-zinc-200/50">
          <div className="flex flex-col md:flex-row gap-3 md:gap-4 max-w-7xl mx-auto">
            <div className="relative flex-grow group">
              <Search className="absolute left-4 md:left-5 top-1/2 -translate-y-1/2 text-zinc-400 w-4 h-4 md:w-5 md:h-5 group-focus-within:text-brand-dark transition-colors" />
              <input 
                type="text" 
                placeholder="Search by brand or model..." 
                className="w-full pl-11 md:pl-14 pr-4 md:pr-6 py-3.5 md:py-5 bg-white rounded-2xl md:rounded-3xl border border-zinc-200 shadow-sm focus:outline-none focus:ring-4 focus:ring-brand-dark/5 focus:border-brand-dark/20 transition-all text-base md:text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="flex items-center justify-center gap-2 md:gap-3 px-6 md:px-8 py-3.5 md:py-5 bg-white border border-zinc-200 rounded-2xl md:rounded-3xl font-bold hover:bg-zinc-50 transition-all shadow-sm active:scale-95 text-sm md:text-base">
              <SlidersHorizontal className="w-4 h-4 md:w-5 md:h-5" /> Filters
            </button>
          </div>

          {/* Horizontal Brand Quick Filters */}
          <div className="max-w-7xl mx-auto mt-4 md:mt-6">
            <div className="flex gap-2 md:gap-3 overflow-x-auto py-2 no-scrollbar">
              <button 
                onClick={() => setSelectedBrand(null)}
                className={`px-6 md:px-8 py-2.5 md:py-3 rounded-xl md:rounded-2xl text-[10px] md:text-xs font-bold whitespace-nowrap transition-all uppercase tracking-widest ${!selectedBrand ? 'bg-brand-dark text-white shadow-xl shadow-brand-dark/20' : 'bg-white text-zinc-400 border border-zinc-100 hover:border-zinc-300'}`}
              >
                All Brands
              </button>
              {BRANDS.slice(0, 12).map(brand => (
                <button 
                  key={brand}
                  onClick={() => setSelectedBrand(brand)}
                  className={`px-6 md:px-8 py-2.5 md:py-3 rounded-xl md:rounded-2xl text-[10px] md:text-xs font-bold whitespace-nowrap transition-all uppercase tracking-widest ${selectedBrand === brand ? 'bg-brand-dark text-white shadow-xl shadow-brand-dark/20' : 'bg-white text-zinc-400 border border-zinc-100 hover:border-zinc-300'}`}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>
        </div>

        {filteredCars.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCars.map(car => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-white rounded-[40px] border border-dashed border-zinc-200">
            <div className="w-20 h-20 bg-zinc-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="text-zinc-300 w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-zinc-900 mb-2">No items found</h3>
            <p className="text-zinc-500 mb-8">Try adjusting your search or filters to find what you're looking for.</p>
            <button 
              onClick={() => { setSearchQuery(''); setSelectedBrand(null); }}
              className="text-brand-dark font-bold hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
