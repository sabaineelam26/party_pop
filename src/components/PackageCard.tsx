import React from 'react';
import { Users, CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';
import { Package } from '../types';

interface PackageCardProps {
  pkg: Package;
  onViewDetails: (pkg: Package) => void;
  onBookNow: (pkg: Package) => void;
}

export const PackageCard: React.FC<PackageCardProps> = ({
  pkg,
  onViewDetails,
  onBookNow,
}) => {
  return (
    <div className={`relative bg-white dark:bg-stone-900/95 rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-2 flex flex-col h-full border ${
      pkg.popular 
        ? 'border-party-pink-300 dark:border-party-pink-500/50 shadow-glow ring-2 ring-party-pink-400/20' 
        : 'border-stone-100 dark:border-white/10 shadow-card dark:shadow-card-dark hover:shadow-card-hover dark:hover:shadow-card-hover-dark'
    }`}>
      {/* Popular Badge */}
      {pkg.popular && (
        <div className="absolute top-4 right-4 z-10 bg-gradient-to-r from-party-pink-500 to-party-purple-600 text-white text-xs font-bold px-3.5 py-1 rounded-full shadow-md flex items-center gap-1.5 animate-pulse-subtle">
          <Sparkles className="w-3.5 h-3.5 fill-white" />
          POPULAR CHOICE
        </div>
      )}

      {/* Package Image */}
      <div className="relative h-52 overflow-hidden bg-stone-100 dark:bg-stone-800 group">
        <img
          src={pkg.image}
          alt={pkg.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent"></div>
        
        {/* Guest capacity pill overlay */}
        <div className="absolute bottom-3 left-4 bg-white/90 dark:bg-stone-900/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-stone-800 dark:text-stone-200 flex items-center gap-1.5 shadow-sm border border-white/20 dark:border-white/10">
          <Users className="w-3.5 h-3.5 text-party-purple-600 dark:text-party-purple-400" />
          Up to {pkg.max_guests} guests
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex justify-between items-baseline mb-2">
            <h3 className="text-xl font-extrabold text-stone-900 dark:text-white">{pkg.name}</h3>
            <div className="text-right">
              <span className="text-2xl font-black text-party-purple-700 dark:text-party-pink-400">€{pkg.price}</span>
            </div>
          </div>

          <p className="text-stone-600 dark:text-stone-300 text-sm line-clamp-2 mb-4 leading-relaxed">
            {pkg.description}
          </p>

          {/* Included Features list snippet */}
          <div className="space-y-2 pt-3 border-t border-stone-100 dark:border-white/10">
            <p className="text-xs font-bold text-stone-400 dark:text-stone-500 uppercase tracking-wider">Includes:</p>
            <ul className="space-y-1.5">
              {pkg.includes.slice(0, 4).map((inc, idx) => (
                <li key={idx} className="flex items-center gap-2 text-xs font-medium text-stone-700 dark:text-stone-300">
                  <CheckCircle2 className="w-4 h-4 text-party-purple-500 dark:text-party-purple-400 shrink-0" />
                  <span className="truncate">{inc}</span>
                </li>
              ))}
              {pkg.includes.length > 4 && (
                <li className="text-xs text-party-purple-600 dark:text-party-pink-400 font-bold pl-6">
                  +{pkg.includes.length - 4} more features included
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={() => onViewDetails(pkg)}
            className="w-full py-2.5 px-3 rounded-2xl bg-stone-100 dark:bg-stone-800 hover:bg-party-purple-50 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200 hover:text-party-purple-700 dark:hover:text-white text-xs font-bold transition-all border border-stone-200 dark:border-stone-700"
          >
            View Details
          </button>
          
          <button
            onClick={() => onBookNow(pkg)}
            className="w-full py-2.5 px-3 rounded-2xl bg-gradient-to-r from-party-purple-600 to-party-pink-500 hover:from-party-purple-700 hover:to-party-pink-600 text-white text-xs font-bold shadow-md hover:shadow-glow transition-all flex items-center justify-center gap-1 group/btn"
          >
            <span>Book Now</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
