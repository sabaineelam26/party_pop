import React from 'react';
import { Sparkles, Phone, Mail, MapPin, Instagram, Facebook, Twitter, Heart } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-party-purple-900/40 relative overflow-hidden transition-colors duration-300">
      {/* Subtle top glow line */}
      <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-party-pink-500 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-party-purple-600 to-party-pink-500 flex items-center justify-center text-white text-xl shadow-md">
                🎈
              </div>
              <span className="text-2xl font-black text-white tracking-tight">
                Party<span className="text-party-pink-400">Pop</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Make Every Birthday Unforgettable 🎉
            </p>
            <p className="text-slate-400 text-xs leading-relaxed">
              PartyPop is your all-in-one birthday party booking platform. Browse custom themes, popular packages, and book your perfect celebration seamlessly.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-full bg-slate-900 hover:bg-party-purple-600 text-slate-300 hover:text-white flex items-center justify-center transition-all border border-slate-800">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-full bg-slate-900 hover:bg-party-pink-500 text-slate-300 hover:text-white flex items-center justify-center transition-all border border-slate-800">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" aria-label="Twitter" className="w-9 h-9 rounded-full bg-slate-900 hover:bg-party-gold-500 text-slate-300 hover:text-white flex items-center justify-center transition-all border border-slate-800">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-white font-bold text-base mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-party-pink-400" />
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => setActiveTab('home')} className="hover:text-party-pink-400 transition">
                  Home Page
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('packages')} className="hover:text-party-pink-400 transition">
                  Party Packages
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('themes')} className="hover:text-party-pink-400 transition">
                  Birthday Themes
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('how-it-works')} className="hover:text-party-pink-400 transition">
                  How It Works
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('booking')} className="hover:text-party-pink-400 transition">
                  Book Your Party
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('my-bookings')} className="hover:text-party-pink-400 transition">
                  My Bookings
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Popular Packages */}
          <div>
            <h4 className="text-white font-bold text-base mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-party-purple-400" />
              Popular Packages
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex justify-between items-center bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                <span className="text-slate-300">Basic Package</span>
                <span className="font-semibold text-party-gold-400">€150</span>
              </li>
              <li className="flex justify-between items-center bg-slate-900/80 p-2.5 rounded-xl border border-party-purple-500/30 shadow-xs">
                <span className="flex items-center gap-1.5 text-white font-medium">
                  Premium Package <span className="text-[9px] bg-party-pink-500 text-white font-black px-1.5 py-0.5 rounded-full">POPULAR</span>
                </span>
                <span className="font-semibold text-party-gold-400">€350</span>
              </li>
              <li className="flex justify-between items-center bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                <span className="text-slate-300">Luxury Package</span>
                <span className="font-semibold text-party-gold-400">€600</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Information */}
          <div>
            <h4 className="text-white font-bold text-base mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-party-gold-400" />
              Get In Touch
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-party-pink-400 shrink-0 mt-0.5" />
                <span className="text-slate-400 text-xs">124 Celebration Way, Party City, PC 56789</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-party-purple-400 shrink-0" />
                <span className="text-slate-400 text-xs">+1 (800) 555-PARTY (72789)</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-party-gold-400 shrink-0" />
                <span className="text-slate-400 text-xs">hello@partypop.com</span>
              </li>
            </ul>

            <div className="mt-5 p-3 rounded-xl bg-gradient-to-r from-party-purple-950 to-slate-900 border border-party-purple-800/40">
              <p className="text-xs font-semibold text-party-pink-300">Need Custom Event Planning?</p>
              <p className="text-[11px] text-slate-400 mt-0.5">We cater to all milestone events!</p>
            </div>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 PartyPop. All rights reserved. "Make Every Birthday Unforgettable"</p>
          <p className="flex items-center gap-1">
            Crafted with <Heart className="w-3.5 h-3.5 text-party-pink-500 fill-party-pink-500" /> for perfect celebrations
          </p>
        </div>
      </div>
    </footer>
  );
};
