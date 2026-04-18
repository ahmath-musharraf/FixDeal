import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  CheckCircle2, 
  ChevronRight, 
  ShoppingBag, 
  DollarSign, 
  Key, 
  Wrench,
  Car,
  Search,
  Star
} from 'lucide-react';
import { SERVICES, BRANDS, CAR_LISTINGS } from '../constants';
import { CarCard } from '../components/CarCard';
import { Link, useNavigate } from 'react-router-dom';
import { getFeaturedAds } from '../services/db';
import { AdListing } from '../types';
import { SEO } from '../components/SEO';

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="relative pt-32 pb-20 overflow-hidden bg-brand-dark">
      <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-brand-primary/50 rounded-l-[100px] hidden lg:block" />
      
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center text-center lg:text-left">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center lg:items-start"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold uppercase tracking-wider mb-6 border border-white/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            Sri Lanka's #1 Marketplace
          </div>
          <h1 className="font-display text-4xl sm:text-6xl md:text-8xl font-black leading-[1.1] md:leading-[0.9] mb-6 md:mb-8 text-white tracking-tighter">
            THE FUTURE OF <span className="text-zinc-500 italic">TRADING</span>
          </h1>
          <p className="text-base sm:text-xl text-zinc-400 mb-8 md:mb-10 max-w-lg leading-relaxed font-light">
            The most sophisticated marketplace in Sri Lanka. Explore, buy, and sell with absolute precision.
          </p>
          <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-10">
            <Link to="/buy" className="bg-white text-brand-dark px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-zinc-100 transition-all shadow-xl shadow-white/10 active:scale-95">
              Explore Deals <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/sell" className="bg-transparent border border-white/30 text-white px-8 py-4 rounded-2xl font-bold hover:bg-white/10 transition-all active:scale-95">
              Sell Your Car
            </Link>
          </div>

          <div className="relative max-w-lg">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-zinc-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all backdrop-blur-md"
              placeholder="Search for cars, brands, or models..."
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  navigate(`/buy?q=${(e.target as HTMLInputElement).value}`);
                }
              }}
            />
          </div>
          
          <div className="mt-12 flex items-center justify-center lg:justify-start gap-6">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map(i => (
                <img 
                  key={i}
                  src={`https://i.pravatar.cc/100?u=${i}`} 
                  className="w-10 h-10 rounded-full border-2 border-brand-dark"
                  alt="User"
                  referrerPolicy="no-referrer"
                />
              ))}
            </div>
            <div className="text-sm">
              <p className="font-bold text-white">10k+ Happy Users</p>
              <p className="text-zinc-400">Trusted across Sri Lanka</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="relative z-10 rounded-[40px] overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=1200" 
              alt="Luxury Car"
              className="w-full h-auto object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 glass p-6 rounded-3xl shadow-xl z-20 max-w-[200px]">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-brand-dark/10 p-2 rounded-lg">
                <CheckCircle2 className="text-brand-dark w-5 h-5" />
              </div>
              <span className="font-bold text-sm text-brand-dark">Verified Deals</span>
            </div>
            <p className="text-xs text-zinc-500">All cars undergo a 150-point inspection.</p>
          </div>
          <div className="absolute -top-6 -right-6 bg-white text-brand-dark p-6 rounded-3xl shadow-xl z-20">
            <p className="text-3xl font-black">24/7</p>
            <p className="text-xs font-medium opacity-80 uppercase tracking-widest">Support</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Brands = () => {
  return (
    <section className="py-20 bg-zinc-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <p className="text-center text-sm font-bold text-zinc-400 uppercase tracking-[0.2em]">
          Trusted by all major manufacturers
        </p>
      </div>
      <div className="flex gap-12 animate-marquee whitespace-nowrap">
        {[...BRANDS, ...BRANDS].map((brand, i) => (
          <span 
            key={i} 
            className="text-4xl font-display font-black text-zinc-200 hover:text-brand-dark transition-colors cursor-default"
          >
            {brand}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
      `}</style>
    </section>
  );
};

const CarListings = () => {
  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-16">
          <div>
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.3em] mb-4">Curated Selection</p>
            <h2 className="font-display text-5xl font-black tracking-tight">Super Car Deals</h2>
          </div>
          <Link to="/buy" className="hidden md:flex items-center gap-2 text-zinc-400 text-sm font-bold hover:text-brand-dark transition-colors group">
            Slide to see more <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-8 snap-x no-scrollbar">
          {CAR_LISTINGS.slice(0, 4).map((car) => (
            <div key={car.id} className="min-w-[320px] md:min-w-[380px] snap-start">
              <CarCard car={car} />
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

const Services = () => {
  return (
    <section className="py-24 bg-white" id="services">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.3em] mb-4">Our Ecosystem</p>
          <h2 className="font-display text-5xl font-black tracking-tight">Premium Services</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Buy - Large Bento Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 md:row-span-2 group relative bg-zinc-900 rounded-[40px] overflow-hidden hover:shadow-2xl transition-all duration-500 min-h-[400px]"
          >
            <img 
              src={SERVICES[0].image} 
              alt={SERVICES[0].title}
              className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 p-10">
              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center mb-6">
                <ShoppingBag className="w-6 h-6 text-brand-dark" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-3">{SERVICES[0].title}</h3>
              <p className="text-zinc-300 text-sm leading-relaxed mb-6 max-w-xs">
                {SERVICES[0].description}
              </p>
              <Link to="/buy" className="inline-flex items-center gap-2 bg-white text-brand-dark px-6 py-3 rounded-xl font-bold hover:gap-3 transition-all">
                Explore Deals <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          {/* Sell - Medium Bento Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="md:col-span-2 group relative bg-brand-dark rounded-[40px] overflow-hidden hover:shadow-2xl transition-all duration-500 min-h-[250px]"
          >
            <div className="absolute inset-0 bg-brand-primary/20" />
            <div className="relative p-10 flex flex-col justify-between h-full">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-6 border border-white/20">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{SERVICES[1].title}</h3>
                <p className="text-zinc-300 text-sm max-w-xs">{SERVICES[1].description}</p>
              </div>
              <Link to="/sell" className="mt-6 inline-flex items-center gap-2 text-white font-bold hover:gap-3 transition-all">
                Get Evaluation <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          {/* Rent & Service - Small Bento Cards */}
          {[SERVICES[2], SERVICES[3]].map((service, i) => {
            const Icon = i === 0 ? Key : Wrench;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + (i * 0.1) }}
                className="group relative bg-zinc-50 rounded-[40px] p-8 hover:shadow-xl transition-all duration-500 border border-zinc-100"
              >
                <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6 group-hover:bg-brand-dark transition-colors">
                  <Icon className="w-6 h-6 text-brand-dark group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-zinc-500 text-xs leading-relaxed mb-6">{service.description}</p>
                <Link to={`/${service.id}`} className="inline-flex items-center gap-2 text-sm font-bold text-brand-dark hover:gap-3 transition-all">
                  Book Now <ChevronRight className="w-4 h-4" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section className="py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
        <div className="relative">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <img 
                src="https://images.unsplash.com/photo-1562141961-b5d185666060?auto=format&fit=crop&q=80&w=600" 
                className="rounded-3xl shadow-lg" 
                alt="Car Detail"
                referrerPolicy="no-referrer"
              />
              <img 
                src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=600" 
                className="rounded-3xl shadow-lg" 
                alt="Car Interior"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="pt-12 space-y-4">
              <img 
                src="https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&q=80&w=600" 
                className="rounded-3xl shadow-lg" 
                alt="Supercar"
                referrerPolicy="no-referrer"
              />
              <div className="bg-brand-dark rounded-3xl p-8 text-white">
                <p className="text-4xl font-black mb-2">15+</p>
                <p className="text-sm font-medium opacity-80">Years of Experience</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="font-display text-4xl font-bold mb-8 leading-tight">
            Revolutionizing the marketplace in Sri Lanka
          </h2>
          <div className="space-y-6 text-zinc-600 leading-relaxed">
            <p>
              FIX DEAL stands true to its name. Buy, sell, rent or even service your items at the convenience of a few taps! Whether you're buying, selling, or renting, a quick, fair, and transparent process is a given.
            </p>
            <p>
              Our vast range of listings extend across all categories – Vehicles, Electronics, Property, and many more.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-8">
            <div>
              <p className="text-2xl font-bold text-zinc-900 mb-1">5000+</p>
              <p className="text-sm text-zinc-500">Cars Sold</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-zinc-900 mb-1">98%</p>
              <p className="text-sm text-zinc-500">Customer Satisfaction</p>
            </div>
          </div>
          <button className="mt-12 bg-zinc-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-zinc-800 transition-all active:scale-95">
            Learn More About Us
          </button>
        </div>
      </div>
    </section>
  );
};

const FeaturedAds = () => {
  const [ads, setAds] = useState<AdListing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAds = async () => {
      const featured = await getFeaturedAds(6);
      setAds(featured);
      setLoading(false);
    };
    fetchAds();
  }, []);

  if (loading || ads.length === 0) return null;

  return (
    <section className="py-24 bg-zinc-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-dark/5 text-brand-dark text-[10px] font-bold uppercase tracking-widest mb-4 border border-brand-dark/10">
              <Star className="w-3 h-3 fill-current" /> Premium Listings
            </div>
            <h2 className="font-display text-4xl font-bold">Featured Deals</h2>
          </div>
          <Link to="/buy" className="text-brand-dark font-bold flex items-center gap-2 hover:gap-3 transition-all">
            View All Marketplace <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {ads.map((ad) => (
            <Link key={ad.id} to={`/ad/${ad.id}`} className="group">
              <div className="card-soft overflow-hidden flex flex-col h-full">
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img src={ad.images[0]} alt={ad.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-brand-dark text-white rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" /> Featured
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="font-display text-xl font-bold mb-2 group-hover:text-brand-dark transition-colors">{ad.title}</h3>
                  <p className="text-zinc-400 text-xs font-medium mb-6">{ad.location}</p>
                  <p className="text-2xl font-black text-brand-dark mt-auto">LKR {ad.price.toLocaleString()}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export const Home = () => {
  return (
    <>
      <SEO />
      <Hero />
      <Brands />
      <FeaturedAds />
      <CarListings />
      <Services />
      <About />
      <section className="py-20 bg-brand-dark">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-white font-display text-4xl md:text-5xl font-bold mb-8">
            Ready to find your next deal?
          </h2>
          <p className="text-white/80 text-lg mb-12 max-w-2xl mx-auto">
            Join thousands of satisfied users in Sri Lanka and start trading today.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <button className="bg-white text-brand-dark px-10 py-5 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all active:scale-95">
              App Store
            </button>
            <button className="bg-zinc-900 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all active:scale-95">
              Google Play
            </button>
          </div>
        </div>
      </section>
    </>
  );
};
