import React, { useState } from 'react';
import { Sparkles, Palette, Check, ArrowRight } from 'lucide-react';
import { Theme } from '../types';
import { ThemeCard } from '../components/ThemeCard';

interface ThemesPageProps {
  themes: Theme[];
  selectedThemeId?: string;
  onSelectThemeAndBook: (theme: Theme) => void;
}

export const ThemesPage: React.FC<ThemesPageProps> = ({
  themes,
  selectedThemeId,
  onSelectThemeAndBook,
}) => {
  const [activeThemeId, setActiveThemeId] = useState<string | undefined>(selectedThemeId);

  const handleSelect = (theme: Theme) => {
    setActiveThemeId(theme.id);
    onSelectThemeAndBook(theme);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-party-pink-100 dark:bg-party-pink-950/80 text-party-pink-700 dark:text-party-pink-300 text-xs font-bold border border-party-pink-200 dark:border-party-pink-800 backdrop-blur-md">
          <Palette className="w-4 h-4 text-party-pink-600 dark:text-party-pink-400" />
          Party Theme Gallery
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Birthday Party <span className="gradient-text">Themes</span> 🎨
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
          Transform your party venue with our handcrafted theme decorations. Choose your favorite theme below to customize your booking.
        </p>
      </div>

      {/* Themes Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {themes.map((theme) => (
          <ThemeCard
            key={theme.id}
            theme={theme}
            isSelected={theme.id === activeThemeId}
            onSelectTheme={handleSelect}
          />
        ))}
      </div>

      {/* Interactive Theme Customization Banner */}
      <div className="bg-gradient-to-r from-party-purple-600 via-party-pink-500 to-party-gold-500 dark:from-party-purple-900 dark:via-party-pink-800 dark:to-party-gold-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl dark:shadow-glow-purple flex flex-col md:flex-row items-center justify-between gap-6 border border-white/10">
        <div className="space-y-2 text-center md:text-left">
          <span className="text-xs font-extrabold uppercase bg-white/20 px-3 py-1 rounded-full backdrop-blur-md">
            Bespoke Event Styling
          </span>
          <h3 className="text-2xl sm:text-3xl font-black tracking-tight">Don't see your dream theme?</h3>
          <p className="text-white/90 dark:text-slate-200 text-sm max-w-xl">
            We offer 100% custom theme creation! Select any package and write your unique theme request in the booking notes.
          </p>
        </div>

        <button
          onClick={() => {
            const firstTheme = themes[0];
            if (firstTheme) handleSelect(firstTheme);
          }}
          className="px-6 py-3.5 rounded-2xl bg-white hover:bg-party-gold-400 text-party-purple-900 hover:text-slate-950 font-extrabold text-sm shadow-lg hover:shadow-xl hover:scale-105 transition-all shrink-0 flex items-center gap-2 group"
        >
          <span>Choose Theme & Start Booking</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

    </div>
  );
};
