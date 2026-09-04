import React from 'react';
import { Sparkles, Check } from 'lucide-react';
import { Theme } from '../types';

interface ThemeCardProps {
  theme: Theme;
  isSelected?: boolean;
  onSelectTheme: (theme: Theme) => void;
}

export const ThemeCard: React.FC<ThemeCardProps> = ({
  theme,
  isSelected = false,
  onSelectTheme,
}) => {
  return (
    <div className={`group relative bg-white dark:bg-stone-900/95 rounded-3xl overflow-hidden border transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between ${
      isSelected 
        ? 'border-party-pink-500 dark:border-party-pink-400 shadow-glow ring-4 ring-party-pink-400/25' 
        : 'border-stone-100 dark:border-white/10 shadow-card dark:shadow-card-dark hover:shadow-card-hover dark:hover:shadow-card-hover-dark'
    }`}>
      {/* Visual Header */}
      <div className="relative h-48 overflow-hidden bg-stone-100 dark:bg-stone-800">
        <img
          src={theme.image}
          alt={theme.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent"></div>
        
        {theme.tag && (
          <div className="absolute top-3 left-3 bg-white/95 dark:bg-stone-900/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-party-purple-700 dark:text-party-pink-300 shadow-sm flex items-center gap-1 border border-white/20 dark:border-white/10">
            <Sparkles className="w-3 h-3 text-party-gold-500" />
            {theme.tag}
          </div>
        )}

        {isSelected && (
          <div className="absolute top-3 right-3 bg-party-pink-500 text-white p-1.5 rounded-full shadow-lg animate-bounce-slow">
            <Check className="w-4 h-4 stroke-[3]" />
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 className="text-lg font-extrabold text-stone-900 dark:text-white mb-1.5 group-hover:text-party-purple-600 dark:group-hover:text-party-pink-400 transition-colors">
            {theme.name}
          </h3>
          <p className="text-stone-600 dark:text-stone-300 text-xs leading-relaxed line-clamp-2">
            {theme.description}
          </p>
        </div>

        <button
          onClick={() => onSelectTheme(theme)}
          className={`w-full py-2.5 px-4 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            isSelected
              ? 'bg-party-pink-500 text-white shadow-md'
              : 'bg-party-purple-50 dark:bg-stone-800 text-party-purple-700 dark:text-party-purple-300 hover:bg-party-purple-600 hover:text-white dark:hover:bg-party-purple-600 dark:hover:text-white border border-party-purple-100 dark:border-stone-700'
          }`}
        >
          {isSelected ? (
            <>
              <Check className="w-4 h-4" />
              Theme Selected
            </>
          ) : (
            'Select Theme'
          )}
        </button>
      </div>
    </div>
  );
};
