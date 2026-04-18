import React, { useState } from 'react';
import { CAR_LISTINGS } from '../constants';
import { CarCard } from '../components/CarCard';
import { Search, Calendar, MapPin } from 'lucide-react';

export const Rent = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCars = CAR_LISTINGS.filter(car => 
    car.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
    car.model.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pt-32 pb-20 min-h-screen bg-zinc-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <h1 className="font-display text-4xl font-bold mb-4">Rent Anything You Need</h1>
          <p className="text-zinc-500">Premium rentals for every occasion. Experience the best in Sri Lanka.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12 bg-white p-4 md:p-6 rounded-[24px] md:rounded-[32px] shadow-sm border border-zinc-100">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search brand..." 
              className="w-full pl-12 pr-4 py-4 bg-zinc-50 rounded-2xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-brand-dark/20 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="relative">
            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Pick-up Date" 
              className="w-full pl-12 pr-4 py-4 bg-zinc-50 rounded-2xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-brand-dark/20 transition-all"
              onFocus={(e) => (e.target.type = 'date')}
              onBlur={(e) => (e.target.type = 'text')}
            />
          </div>
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 w-5 h-5" />
            <select className="w-full pl-12 pr-4 py-4 bg-zinc-50 rounded-2xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-brand-dark/20 transition-all appearance-none">
              <option>Colombo</option>
              <option>Kandy</option>
              <option>Galle</option>
              <option>Negombo</option>
            </select>
          </div>
          <button className="bg-brand-dark text-white py-4 rounded-2xl font-bold hover:bg-brand-primary transition-all active:scale-95 shadow-xl shadow-brand-dark/20">
            Search Rental
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCars.map(car => (
            <div key={car.id} className="relative group">
              <CarCard car={car} />
              <div className="absolute top-4 right-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                Available
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
