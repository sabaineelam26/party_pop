import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { PartyPopper, CheckCircle2, Calendar, User, ArrowRight, Home } from 'lucide-react';
import { Booking } from '../types';

interface ConfettiModalProps {
  booking: Booking | null;
  onClose: () => void;
  onViewBookings: () => void;
  onGoHome: () => void;
}

export const ConfettiModal: React.FC<ConfettiModalProps> = ({
  booking,
  onClose,
  onViewBookings,
  onGoHome,
}) => {
  useEffect(() => {
    if (booking) {
      // Trigger canvas-confetti blast
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

      const interval: any = setInterval(() => {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) {
          return clearInterval(interval);
        }
        const particleCount = 50 * (timeLeft / duration);
        confetti({ ...defaults, particleCount, origin: { x: 0.2, y: 0.5 } });
        confetti({ ...defaults, particleCount, origin: { x: 0.8, y: 0.5 } });
      }, 250);

      return () => clearInterval(interval);
    }
  }, [booking]);

  if (!booking) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="relative bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 text-center shadow-2xl border border-party-purple-100 dark:border-white/10">
        
        {/* Animated Celebration Icon */}
        <div className="mx-auto w-20 h-20 rounded-3xl bg-gradient-to-tr from-party-purple-600 via-party-pink-500 to-party-gold-400 flex items-center justify-center text-white text-3xl shadow-xl shadow-party-purple-300 dark:shadow-party-purple-950 mb-6 animate-bounce-slow">
          🎉
        </div>

        {/* Headline */}
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-3">
          Congratulations!
        </h2>

        {/* Required Success Message */}
        <div className="bg-party-purple-50 dark:bg-party-purple-950/60 p-4 rounded-2xl border border-party-purple-100 dark:border-party-purple-800 mb-6">
          <p className="text-party-purple-900 dark:text-party-purple-200 font-semibold text-sm leading-relaxed">
            🎉 Congratulations! Your birthday party booking request has been submitted successfully. We will contact you soon.
          </p>
        </div>

        {/* Booking Reference Card */}
        <div className="bg-slate-50 dark:bg-slate-950/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-left space-y-2 mb-6 text-xs text-slate-600 dark:text-slate-300">
          <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-slate-800 font-bold text-slate-800 dark:text-white">
            <span>Booking Reference:</span>
            <span className="text-party-purple-700 dark:text-party-pink-400 bg-party-purple-100 dark:bg-party-purple-950/80 px-2.5 py-0.5 rounded-full font-mono text-sm border border-party-purple-200 dark:border-party-purple-800">{booking.id}</span>
          </div>
          <div className="flex justify-between">
            <span>Birthday Person:</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">{booking.birthday_person_name}</span>
          </div>
          <div className="flex justify-between">
            <span>Selected Package:</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">{booking.package_name}</span>
          </div>
          <div className="flex justify-between">
            <span>Selected Theme:</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">{booking.theme_name}</span>
          </div>
          {booking.selected_addons && booking.selected_addons.length > 0 && (
            <div className="flex justify-between">
              <span>Selected Add-ons ({booking.selected_addons.length}):</span>
              <span className="font-semibold text-party-purple-700 dark:text-party-pink-400">+€{booking.addons_price || 0}</span>
            </div>
          )}
          {booking.promo_code && (
            <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
              <span>Promo Code Applied:</span>
              <span className="font-mono bg-emerald-100 dark:bg-emerald-950/80 px-1.5 py-0.5 rounded text-[11px] font-bold border border-emerald-200 dark:border-emerald-800">{booking.promo_code} (-€{booking.discount_amount})</span>
            </div>
          )}
          <div className="flex justify-between">
            <span>Event Date:</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">{booking.event_date}</span>
          </div>
          <div className="flex justify-between pt-2 border-t border-slate-200 dark:border-slate-800 text-sm font-extrabold text-slate-900 dark:text-white">
            <span>Total Estimated Price:</span>
            <span className="text-party-purple-700 dark:text-party-pink-400">€{booking.estimated_price}</span>
          </div>
        </div>

        {/* Navigation CTAs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={() => {
              onClose();
              onViewBookings();
            }}
            className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-party-purple-600 to-party-pink-500 hover:from-party-purple-700 hover:to-party-pink-600 text-white text-sm font-bold shadow-md hover:shadow-glow transition-all flex items-center justify-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            View My Bookings
          </button>

          <button
            onClick={() => {
              onClose();
              onGoHome();
            }}
            className="w-full py-3 px-4 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-sm font-bold transition-all flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-700"
          >
            <Home className="w-4 h-4" />
            Return Home
          </button>
        </div>

      </div>
    </div>
  );
};
