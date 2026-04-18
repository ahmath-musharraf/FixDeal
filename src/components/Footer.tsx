import React from 'react';
import { Car, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com/fixdeal.lk', label: 'Facebook' },
    { icon: Twitter, href: 'https://twitter.com/fixdeal_lk', label: 'Twitter' },
    { icon: Instagram, href: 'https://instagram.com/fixdeal.lk', label: 'Instagram' },
    { icon: Linkedin, href: 'https://linkedin.com/company/fixdeal-lk', label: 'LinkedIn' },
  ];

  return (
    <footer className="bg-zinc-900 text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="bg-white p-1 rounded-lg">
                <img 
                  src="https://raw.githubusercontent.com/ahmath-musharraf/FixDeal/refs/heads/main/Fix1.png" 
                  alt="FIX DEAL Logo" 
                  className="w-8 h-8 object-contain"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement?.classList.add('p-2');
                    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                    svg.setAttribute('class', 'text-brand-dark w-6 h-6');
                    svg.innerHTML = '<path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9C2.1 11.6 2 11.8 2 12v4c0 .6.4 1 1 1h2m12 0c0 1.1.9 2 2 2s2-.9 2-2-.9-2-2-2-2 .9-2 2ZM5 17c0 1.1.9 2 2 2s2-.9 2-2-.9-2-2-2-2 .9-2 2Z"/>';
                    e.currentTarget.parentElement?.appendChild(svg);
                  }}
                />
              </div>
              <span className="font-display font-bold text-2xl tracking-tight">
                FIX<span className="text-brand-accent">DEAL</span>
              </span>
            </Link>
            <p className="text-zinc-400 text-sm leading-relaxed mb-8">
              The ultimate marketplace in Sri Lanka. Quality, transparency, and convenience in every deal.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a 
                  key={social.label} 
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-white hover:text-brand-dark transition-all cursor-pointer"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-zinc-400 text-sm">
              <li><Link to="/buy" className="hover:text-white transition-colors">Buy Items</Link></li>
              <li><Link to="/sell" className="hover:text-white transition-colors">Sell Your Items</Link></li>
              <li><Link to="/rent" className="hover:text-white transition-colors">Rent Anything</Link></li>
              <li><Link to="/service" className="hover:text-white transition-colors">Professional Services</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">Support</h4>
            <ul className="space-y-4 text-zinc-400 text-sm">
              <li><Link to="/help" className="hover:text-white transition-colors">Help Center</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">Contact Info</h4>
            <ul className="space-y-4 text-zinc-400 text-sm">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-white shrink-0" />
                <span>+94 11 234 5678</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-white shrink-0" />
                <span>info@fixdeal.lk</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-white shrink-0" />
                <span>Colombo, Sri Lanka</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-6 text-zinc-500 text-xs text-center md:text-left">
          <div className="space-y-2">
            <p>2026 © FIX DEAL. All rights reserved.</p>
            <p>
              Website created by: <a href="https://mushieditz.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors font-medium">Mushi Editz</a>
            </p>
          </div>
          <div className="flex gap-8">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
            <Link to="/cookies" className="hover:text-white transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
