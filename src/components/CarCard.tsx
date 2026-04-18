import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, MessageCircle, ShieldCheck, Heart, Eye, X, Calendar, Gauge, MapPin } from 'lucide-react';
import { CarListing } from '../constants';
import { Link } from 'react-router-dom';

interface CarCardProps {
  car: CarListing;
}

export const CarCard: React.FC<CarCardProps> = ({ car }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsFavorite(favorites.includes(car.id));
  }, [car.id]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    let newFavorites;
    if (isFavorite) {
      newFavorites = favorites.filter((id: string) => id !== car.id);
    } else {
      newFavorites = [...favorites, car.id];
    }
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);
  };

  return (
    <>
      <motion.div 
        whileHover={{ y: -8 }}
        className="card-soft flex flex-col h-full group"
      >
        <div className="relative aspect-[16/10] overflow-hidden block">
          <Link to={`/car/${car.id}`} className="w-full h-full">
            <img 
              src={car.image} 
              alt={`${car.brand} ${car.model}`}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
          </Link>
          <button 
            onClick={toggleFavorite}
            className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md transition-all z-10 ${isFavorite ? 'bg-red-500 text-white shadow-lg shadow-red-500/30' : 'bg-white/20 text-white hover:bg-white/40'}`}
          >
            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
          <button 
            onClick={(e) => { e.preventDefault(); setShowQuickView(true); }}
            className="absolute bottom-4 left-4 bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full text-xs font-bold opacity-0 group-hover:opacity-100 transition-all flex items-center gap-2 hover:bg-white/40"
          >
            <Eye className="w-3.5 h-3.5" /> Quick View
          </button>
        </div>
        <div className="p-5 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-1">
            <Link to={`/car/${car.id}`} className="hover:text-brand-dark transition-colors">
              <h3 className="font-display font-bold text-lg leading-tight">
                {car.brand} {car.model}
              </h3>
            </Link>
            <img 
              src={car.logo} 
              alt={car.brand} 
              className="w-6 h-6 object-contain opacity-80"
              referrerPolicy="no-referrer"
            />
          </div>
          <p className="text-zinc-400 text-xs font-medium mb-3">{car.spec}</p>
          
          <div className="flex gap-4 text-zinc-500 text-xs font-semibold mb-6">
            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {car.year}</span>
            <span className="flex items-center gap-1"><Gauge className="w-3 h-3" /> {car.mileage.toLocaleString()} KM</span>
          </div>

          <div className="mt-auto">
            <div className="flex items-center justify-between mb-4 gap-2">
              <p className="text-2xl font-black text-brand-dark shrink-0">
                LKR {car.price.toLocaleString()}
              </p>
              {car.fulfilledByFD && (
                <div className="flex items-center gap-1 text-[10px] font-bold text-brand-dark uppercase tracking-wider bg-brand-dark/5 px-2 py-1 rounded-lg border border-brand-dark/10">
                  <ShieldCheck className="w-3 h-3" />
                  <span className="whitespace-nowrap">Fulfilled by FD</span>
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <a 
                href={`tel:+971502316225`}
                className="bg-brand-dark text-white py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-brand-primary transition-colors"
              >
                <Phone className="w-3.5 h-3.5 fill-current" /> CALL
              </a>
              <button 
                onClick={() => window.open('https://wa.me/971502316225', '_blank')}
                className="bg-brand-dark text-white py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-brand-primary transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-current" /> CHAT
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick View Modal */}
      <AnimatePresence>
        {showQuickView && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowQuickView(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[40px] overflow-hidden shadow-2xl"
            >
              <button 
                onClick={() => setShowQuickView(false)}
                className="absolute top-6 right-6 w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center z-10 hover:bg-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="grid md:grid-cols-2">
                <div className="aspect-square md:aspect-auto">
                  <img 
                    src={car.image} 
                    alt={car.model} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-2xl font-black mb-1">{car.brand} {car.model}</h2>
                      <p className="text-zinc-500 font-medium text-sm">{car.trim} • {car.spec}</p>
                    </div>
                    <img src={car.logo} alt={car.brand} className="w-8 h-8 object-contain" referrerPolicy="no-referrer" />
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-zinc-50 p-4 rounded-2xl">
                      <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider mb-1">Year</p>
                      <p className="font-bold text-sm">{car.year}</p>
                    </div>
                    <div className="bg-zinc-50 p-4 rounded-2xl">
                      <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider mb-1">Mileage</p>
                      <p className="font-bold text-sm">{car.mileage.toLocaleString()} KM</p>
                    </div>
                  </div>

                  <div className="mb-8">
                    <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider mb-1">Price</p>
                    <p className="text-3xl font-black text-brand-dark">LKR {car.price.toLocaleString()}</p>
                  </div>

                  <div className="flex flex-col gap-3">
                    <Link 
                      to={`/car/${car.id}`}
                      className="w-full bg-brand-dark text-white py-4 rounded-2xl font-bold text-center hover:bg-brand-primary transition-all"
                      onClick={() => setShowQuickView(false)}
                    >
                      View Full Details
                    </Link>
                    <div className="grid grid-cols-2 gap-3">
                      <a 
                        href="tel:+971502316225"
                        className="bg-zinc-100 text-brand-dark py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-zinc-200 transition-all"
                      >
                        <Phone className="w-4 h-4 fill-current" /> Call
                      </a>
                      <button 
                        onClick={() => window.open('https://wa.me/971502316225', '_blank')}
                        className="bg-zinc-100 text-brand-dark py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-zinc-200 transition-all"
                      >
                        <MessageCircle className="w-4 h-4 fill-current" /> Chat
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
