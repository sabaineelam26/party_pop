import React from 'react';
import { X, Users, CheckCircle, Sparkles, PartyPopper, Tag } from 'lucide-react';
import { Package, Theme } from '../types';

interface PackageDetailModalProps {
  pkg: Package | null;
  themes: Theme[];
  onClose: () => void;
  onBookThisPackage: (pkg: Package, selectedThemeId?: string) => void;
}

export const PackageDetailModal: React.FC<PackageDetailModalProps> = ({
  pkg,
  themes,
  onClose,
  onBookThisPackage,
}) => {
  if (!pkg) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="relative bg-white dark:bg-slate-900 rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-100 dark:border-white/10 my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 dark:bg-slate-800/90 hover:bg-white dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 shadow-md flex items-center justify-center transition-all hover:scale-110"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Large Header Banner */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-900">
          <img
            src={pkg.image}
            alt={pkg.name}
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent"></div>
          
          <div className="absolute bottom-6 left-6 right-6 text-white flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              {pkg.category && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-party-pink-500 text-white text-xs font-bold mb-2 shadow-sm">
                  <Tag className="w-3 h-3" />
                  {pkg.category}
                </span>
              )}
              <h2 className="text-3xl font-black text-white tracking-tight">{pkg.name}</h2>
              <div className="flex items-center gap-4 mt-2 text-slate-300 text-sm">
                <span className="flex items-center gap-1.5 bg-white/20 dark:bg-slate-800/80 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md border border-white/20">
                  <Users className="w-4 h-4 text-party-purple-300" />
                  Up to {pkg.max_guests} Guests
                </span>
              </div>
            </div>

            <div className="bg-white/10 dark:bg-slate-800/80 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-2xl p-3 px-5 text-right">
              <span className="text-xs text-slate-300 block font-medium">Starting Price</span>
              <span className="text-3xl font-black text-party-gold-400">€{pkg.price}</span>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
          
          {/* Detailed Description */}
          <div>
            <h3 className="text-sm font-bold text-party-purple-700 dark:text-party-purple-400 uppercase tracking-wider mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Package Overview
            </h3>
            <p className="text-slate-700 dark:text-slate-300 text-base leading-relaxed">
              {pkg.full_description || pkg.description}
            </p>
          </div>

          {/* Included Services List */}
          <div className="bg-slate-50 dark:bg-slate-950/60 p-6 rounded-2xl border border-slate-200/80 dark:border-white/10">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
              What's Included in This Package:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {pkg.includes.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200/60 dark:border-white/10 shadow-2xs">
                  <div className="w-6 h-6 rounded-full bg-party-purple-100 dark:bg-party-purple-950 text-party-purple-600 dark:text-party-purple-400 flex items-center justify-center shrink-0">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium text-slate-800 dark:text-slate-200">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Available Themes Preview */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
              Recommended Compatible Themes:
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {themes.slice(0, 4).map((t) => (
                <div key={t.id} className="relative rounded-xl overflow-hidden group border border-slate-200 dark:border-white/10">
                  <img src={t.image} alt={t.name} className="w-full h-20 object-cover group-hover:scale-105 transition" />
                  <div className="absolute inset-0 bg-slate-900/60 flex items-center justify-center p-2 text-center">
                    <span className="text-xs font-bold text-white leading-tight">{t.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer CTA Bar */}
        <div className="p-6 bg-slate-50 dark:bg-slate-950/80 border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Ready to make magic happen?</p>
            <p className="text-sm font-bold text-slate-800 dark:text-white">Lock in your date with instant booking</p>
          </div>

          <button
            onClick={() => {
              onClose();
              onBookThisPackage(pkg);
            }}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-party-purple-600 via-party-pink-500 to-party-purple-700 hover:from-party-purple-700 hover:to-party-pink-600 text-white font-bold text-base shadow-lg shadow-party-purple-300 dark:shadow-party-purple-950 hover:shadow-glow hover:scale-105 transition-all flex items-center justify-center gap-2"
          >
            <PartyPopper className="w-5 h-5" />
            Book This Package (€{pkg.price})
          </button>
        </div>

      </div>
    </div>
  );
};
