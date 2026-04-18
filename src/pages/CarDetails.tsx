import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { CAR_LISTINGS } from '../constants';
import { motion } from 'motion/react';
import { 
  ChevronLeft, 
  Phone, 
  MessageCircle, 
  ShieldCheck, 
  Calendar, 
  Gauge, 
  MapPin, 
  CheckCircle2 
} from 'lucide-react';

export const CarDetails = () => {
  const { id } = useParams();
  const car = CAR_LISTINGS.find(c => c.id === id);

  if (!car) {
    return (
      <div className="pt-40 pb-20 min-h-screen bg-zinc-50 text-center">
        <h2 className="text-2xl font-bold mb-4">Item not found</h2>
        <Link to="/buy" className="text-brand-dark font-bold hover:underline">Back to marketplace</Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 min-h-screen bg-zinc-50">
      <div className="max-w-7xl mx-auto px-6">
        <Link to="/buy" className="inline-flex items-center gap-2 text-zinc-500 hover:text-brand-dark transition-colors mb-8 font-medium">
          <ChevronLeft className="w-5 h-5" /> Back to Marketplace
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="aspect-[16/10] rounded-[40px] overflow-hidden shadow-xl">
              <img 
                src={car.image} 
                alt={`${car.brand} ${car.model}`}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="aspect-square rounded-2xl overflow-hidden shadow-sm">
                  <img 
                    src={car.image} 
                    alt="Gallery" 
                    className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity cursor-pointer"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-6 md:p-10 rounded-[32px] md:rounded-[40px] shadow-xl border border-zinc-100"
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-black mb-2 leading-tight">{car.brand} {car.model}</h1>
                <p className="text-zinc-500 font-medium text-sm md:text-base">{car.trim} • {car.spec}</p>
              </div>
              <img src={car.logo} alt={car.brand} className="w-10 h-10 md:w-12 md:h-12 object-contain" referrerPolicy="no-referrer" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-8">
              <div className="flex items-center gap-4 p-4 bg-zinc-50 rounded-2xl">
                <Calendar className="text-brand-dark w-5 h-5 md:w-6 md:h-6" />
                <div>
                  <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Year</p>
                  <p className="font-bold text-sm md:text-base">{car.year}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-zinc-50 rounded-2xl">
                <Gauge className="text-brand-dark w-5 h-5 md:w-6 md:h-6" />
                <div>
                  <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Mileage</p>
                  <p className="font-bold text-sm md:text-base">{car.mileage.toLocaleString()} KM</p>
                </div>
              </div>
            </div>

            <div className="mb-8 md:mb-10">
              <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-2">Price</p>
              <p className="text-4xl md:text-5xl font-black text-brand-dark">LKR {car.price.toLocaleString()}</p>
            </div>

            <div className="space-y-4 mb-10">
              {[
                'Verified and inspected',
                'Full documentation available',
                'Excellent condition',
                'Professional support'
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3 text-zinc-600 font-medium">
                  <CheckCircle2 className="text-emerald-500 w-5 h-5" />
                  {feature}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <a 
                href="tel:+971502316225"
                className="bg-brand-dark text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-brand-primary transition-all shadow-xl shadow-brand-dark/20 active:scale-95"
              >
                <Phone className="w-5 h-5 fill-current" /> Call Now
              </a>
              <button 
                onClick={() => window.open('https://wa.me/971502316225', '_blank')}
                className="bg-brand-dark text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-brand-primary transition-all shadow-xl shadow-brand-dark/20 active:scale-95"
              >
                <MessageCircle className="w-5 h-5 fill-current" /> WhatsApp
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
