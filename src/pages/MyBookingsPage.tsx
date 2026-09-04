import React, { useState } from 'react';
import { 
  Calendar, Users, Tag, Sparkles, Clock, CheckCircle2, 
  XCircle, AlertCircle, Eye, RefreshCw, PartyPopper, Phone, Mail
} from 'lucide-react';
import { Booking, BookingStatus } from '../types';

interface MyBookingsPageProps {
  bookings: Booking[];
  onCancelBooking: (bookingId: string) => void;
  onNewBooking: () => void;
}

export const MyBookingsPage: React.FC<MyBookingsPageProps> = ({
  bookings,
  onCancelBooking,
  onNewBooking,
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const filteredBookings = bookings.filter((b) => {
    if (filterStatus === 'All') return true;
    return b.status === filterStatus;
  });

  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case 'Confirmed':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-extrabold border border-emerald-200 dark:border-emerald-800">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            Confirmed
          </span>
        );
      case 'Pending':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-xs font-extrabold border border-amber-200 dark:border-amber-800">
            <Clock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 animate-spin-slow" />
            Pending Review
          </span>
        );
      case 'Cancelled':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 text-xs font-extrabold border border-rose-200 dark:border-rose-800">
            <XCircle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
            Cancelled
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-stone-200 dark:border-white/10">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-party-purple-100 dark:bg-party-purple-950/80 text-party-purple-700 dark:text-party-purple-300 text-xs font-bold border border-party-purple-200 dark:border-party-purple-800 backdrop-blur-md">
            <Calendar className="w-4 h-4 text-party-purple-600 dark:text-party-purple-400" />
            Your Celebration Dashboard
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-stone-900 dark:text-white tracking-tight">
            My Party <span className="gradient-text">Bookings</span> 🎈
          </h1>
          <p className="text-stone-600 dark:text-stone-300 text-sm">
            Track and manage your upcoming birthday party reservation status in real time.
          </p>
        </div>

        <button
          onClick={onNewBooking}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-party-purple-600 to-party-pink-500 hover:from-party-purple-700 hover:to-party-pink-600 text-white text-xs font-bold shadow-md hover:shadow-glow transition-all flex items-center gap-2 self-start sm:self-auto"
        >
          <PartyPopper className="w-4 h-4" />
          Book Another Party
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {['All', 'Pending', 'Confirmed', 'Cancelled'].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
              filterStatus === status
                ? 'bg-stone-900 dark:bg-party-purple-600 text-white shadow-md'
                : 'bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 border border-stone-200 dark:border-stone-800'
            }`}
          >
            {status} ({status === 'All' ? bookings.length : bookings.filter(b => b.status === status).length})
          </button>
        ))}
      </div>

      {/* Bookings Display Cards */}
      {filteredBookings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBookings.map((b) => (
            <div
              key={b.id}
              className="bg-white dark:bg-stone-900/90 rounded-3xl p-6 border border-stone-200/80 dark:border-white/10 shadow-card dark:shadow-card-dark hover:shadow-card-hover dark:hover:shadow-card-hover-dark transition-all space-y-4 flex flex-col justify-between backdrop-blur-md"
            >
              <div>
                {/* Top Reference & Status */}
                <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-white/10">
                  <span className="font-mono text-xs font-bold text-stone-500 dark:text-stone-400">{b.id}</span>
                  {getStatusBadge(b.status)}
                </div>

                {/* Main Booking Summary */}
                <div className="pt-3 space-y-2">
                  <h3 className="text-lg font-black text-stone-900 dark:text-white leading-tight">
                    {b.birthday_person_name}'s Birthday
                  </h3>
                  
                  <div className="space-y-1.5 text-xs text-stone-600 dark:text-stone-300 pt-1">
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-party-purple-500 dark:text-party-purple-400 shrink-0" />
                      <span><strong>Package:</strong> {b.package_name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-party-pink-500 shrink-0" />
                      <span><strong>Theme:</strong> {b.theme_name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-party-gold-500 shrink-0" />
                      <span><strong>Date:</strong> {b.event_date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-stone-400 shrink-0" />
                      <span><strong>Guests:</strong> {b.guests} guests</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Price & Action */}
              <div className="pt-4 border-t border-stone-100 dark:border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-stone-400 dark:text-stone-500 font-bold block uppercase">Total</span>
                  <span className="text-xl font-black text-party-purple-700 dark:text-party-pink-400">€{b.estimated_price}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedBooking(b)}
                    className="p-2 px-3 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-party-purple-50 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200 hover:text-party-purple-700 dark:hover:text-white text-xs font-bold transition flex items-center gap-1 border border-stone-200 dark:border-stone-700"
                    title="View Details"
                  >
                    <Eye className="w-4 h-4" />
                    Details
                  </button>

                  {b.status === 'Pending' && (
                    <button
                      onClick={() => {
                        if (confirm(`Are you sure you want to cancel booking ${b.id}?`)) {
                          onCancelBooking(b.id);
                        }
                      }}
                      className="px-3 py-2 rounded-xl bg-rose-50 dark:bg-rose-950/50 hover:bg-rose-100 dark:hover:bg-rose-900/60 text-rose-700 dark:text-rose-300 text-xs font-bold transition border border-rose-200 dark:border-rose-900"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-stone-900/90 rounded-3xl p-12 text-center border border-stone-200 dark:border-white/10 shadow-card dark:shadow-card-dark space-y-4">
          <div className="w-16 h-16 rounded-full bg-party-purple-50 dark:bg-party-purple-950/60 flex items-center justify-center mx-auto text-3xl">
            🎈
          </div>
          <h3 className="text-xl font-extrabold text-stone-800 dark:text-white">No bookings found</h3>
          <p className="text-stone-500 dark:text-stone-400 text-xs max-w-sm mx-auto">
            You don't have any bookings under the "{filterStatus}" filter yet.
          </p>
          <button
            onClick={onNewBooking}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-party-purple-600 to-party-pink-500 hover:from-party-purple-700 hover:to-party-pink-600 text-white text-xs font-bold shadow-md hover:shadow-glow transition-all"
          >
            Create Your First Booking
          </button>
        </div>
      )}

      {/* Booking Detail Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white dark:bg-stone-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-stone-200 dark:border-white/10">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100 dark:border-white/10">
              <div>
                <span className="font-mono text-xs font-bold text-stone-400 dark:text-stone-500">Booking Ref: {selectedBooking.id}</span>
                <h3 className="text-xl font-black text-stone-900 dark:text-white">Booking Overview</h3>
              </div>
              <button
                onClick={() => setSelectedBooking(null)}
                className="w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-600 dark:text-stone-300 flex items-center justify-center text-sm font-bold transition"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-stone-700 dark:text-stone-300">
              <div className="flex justify-between items-center bg-stone-50 dark:bg-stone-950/60 p-3 rounded-xl border border-stone-100 dark:border-white/5">
                <span className="font-semibold text-stone-500 dark:text-stone-400">Status</span>
                {getStatusBadge(selectedBooking.status)}
              </div>
              <div className="flex justify-between p-2">
                <span className="font-semibold text-stone-500 dark:text-stone-400">Birthday Person:</span>
                <span className="font-bold text-stone-900 dark:text-white">{selectedBooking.birthday_person_name}</span>
              </div>
              <div className="flex justify-between p-2">
                <span className="font-semibold text-stone-500 dark:text-stone-400">Customer Name:</span>
                <span className="font-bold text-stone-900 dark:text-white">{selectedBooking.customer_name}</span>
              </div>
              <div className="flex justify-between p-2">
                <span className="font-semibold text-stone-500 dark:text-stone-400">Contact Email:</span>
                <span className="font-bold text-stone-900 dark:text-white">{selectedBooking.email}</span>
              </div>
              <div className="flex justify-between p-2">
                <span className="font-semibold text-stone-500 dark:text-stone-400">Contact Phone:</span>
                <span className="font-bold text-stone-900 dark:text-white">{selectedBooking.phone}</span>
              </div>
              <div className="flex justify-between p-2">
                <span className="font-semibold text-stone-500 dark:text-stone-400">Selected Package:</span>
                <span className="font-bold text-party-purple-700 dark:text-party-pink-400">{selectedBooking.package_name}</span>
              </div>
              <div className="flex justify-between p-2">
                <span className="font-semibold text-stone-500 dark:text-stone-400">Selected Theme:</span>
                <span className="font-bold text-party-pink-600 dark:text-party-pink-400">{selectedBooking.theme_name}</span>
              </div>
              {selectedBooking.selected_addons && selectedBooking.selected_addons.length > 0 && (
                <div className="flex justify-between p-2">
                  <span className="font-semibold text-stone-500 dark:text-stone-400">Selected Add-ons ({selectedBooking.selected_addons.length}):</span>
                  <span className="font-bold text-party-purple-700 dark:text-party-pink-400">+€{selectedBooking.addons_price || 0}</span>
                </div>
              )}
              {selectedBooking.promo_code && (
                <div className="flex justify-between p-2 text-emerald-600 dark:text-emerald-400">
                  <span className="font-semibold">Promo Code ({selectedBooking.promo_code}):</span>
                  <span className="font-bold">-€{selectedBooking.discount_amount}</span>
                </div>
              )}
              <div className="flex justify-between p-2">
                <span className="font-semibold text-stone-500 dark:text-stone-400">Event Date:</span>
                <span className="font-bold text-stone-900 dark:text-white">{selectedBooking.event_date}</span>
              </div>
              <div className="flex justify-between p-2">
                <span className="font-semibold text-stone-500 dark:text-stone-400">Guests Capacity:</span>
                <span className="font-bold text-stone-900 dark:text-white">{selectedBooking.guests} guests</span>
              </div>
              {selectedBooking.special_request && (
                <div className="bg-amber-50/70 dark:bg-amber-950/40 p-3 rounded-xl border border-amber-200/60 dark:border-amber-900">
                  <span className="font-bold text-amber-900 dark:text-amber-200 block mb-1">Special Requirements:</span>
                  <p className="text-amber-800 dark:text-amber-300 leading-relaxed">{selectedBooking.special_request}</p>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-stone-100 dark:border-white/10 flex items-center justify-between">
              <div>
                <span className="text-xs text-stone-400 dark:text-stone-500 block font-bold uppercase">Estimated Price</span>
                <span className="text-2xl font-black text-party-purple-800 dark:text-party-pink-400">€{selectedBooking.estimated_price}</span>
              </div>

              <button
                onClick={() => setSelectedBooking(null)}
                className="px-6 py-2.5 rounded-2xl bg-stone-900 dark:bg-stone-800 hover:bg-stone-800 dark:hover:bg-stone-700 text-white font-bold text-xs transition-all"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
