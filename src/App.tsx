import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { PackagesPage } from './pages/PackagesPage';
import { ThemesPage } from './pages/ThemesPage';
import { BookingPage } from './pages/BookingPage';
import { MyBookingsPage } from './pages/MyBookingsPage';
import { AdminPage } from './pages/AdminPage';
import { PackageDetailModal } from './components/PackageDetailModal';
import { ConfettiModal } from './components/ConfettiModal';

import { storageService } from './services/storage';
import { INITIAL_CATEGORIES } from './data/initialData';
import { Package, Theme, Booking, BookingStatus } from './types';
import { Sparkles, Home, Package as PkgIcon, Palette, Calendar, Ticket } from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  // Dark mode state initialized from localStorage or system preference
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  // App data state
  const [packages, setPackages] = useState<Package[]>([]);
  const [themes, setThemes] = useState<Theme[]>([]);
  const [categories] = useState(INITIAL_CATEGORIES);
  const [bookings, setBookings] = useState<Booking[]>([]);

  // Modals & Selection state
  const [detailModalPackage, setDetailModalPackage] = useState<Package | null>(null);
  const [submittedBooking, setSubmittedBooking] = useState<Booking | null>(null);
  
  const [preSelectedPackageId, setPreSelectedPackageId] = useState<string | undefined>(undefined);
  const [preSelectedThemeId, setPreSelectedThemeId] = useState<string | undefined>(undefined);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('All');

  // Load data on mount
  useEffect(() => {
    setPackages(storageService.getPackages());
    setThemes(storageService.getThemes());
    setBookings(storageService.getBookings());
  }, []);

  // Handlers
  const handleNavigate = (tab: string, categoryFilter?: string) => {
    if (categoryFilter) {
      setSelectedCategoryFilter(categoryFilter);
    } else {
      setSelectedCategoryFilter('All');
    }
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookPackage = (pkg: Package) => {
    setPreSelectedPackageId(pkg.id);
    setActiveTab('booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectThemeAndBook = (theme: Theme) => {
    setPreSelectedThemeId(theme.id);
    setActiveTab('booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCreateBooking = (bookingInput: any) => {
    const newBooking = storageService.createBooking(bookingInput);
    setBookings(storageService.getBookings());
    setSubmittedBooking(newBooking);
  };

  const handleCancelBooking = (bookingId: string) => {
    const updated = storageService.updateBookingStatus(bookingId, 'Cancelled');
    setBookings(updated);
  };

  const handleAddPackage = (newPkg: Package) => {
    const updated = storageService.savePackage(newPkg);
    setPackages(updated);
  };

  const handleEditPackage = (pkg: Package) => {
    const updated = storageService.savePackage(pkg);
    setPackages(updated);
  };

  const handleDeletePackage = (id: string) => {
    const updated = storageService.deletePackage(id);
    setPackages(updated);
  };

  const handleUpdateBookingStatus = (id: string, status: BookingStatus) => {
    const updated = storageService.updateBookingStatus(id, status);
    setBookings(updated);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFC] dark:bg-[#070B14] text-slate-800 dark:text-slate-100 selection:bg-party-purple-500 selection:text-white transition-colors duration-300 relative">
      
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-party-purple-700 via-party-pink-600 to-party-purple-800 dark:from-party-purple-950 dark:via-party-pink-900 dark:to-party-purple-950 text-white py-2 px-4 text-center text-xs font-bold flex items-center justify-center gap-2 shadow-xs border-b border-white/10">
        <Sparkles className="w-3.5 h-3.5 text-party-gold-300 animate-pulse shrink-0" />
        <span className="truncate">🎉 Special Offer: Get free custom photography corner with all Premium & Luxury bookings!</span>
        <span className="hidden sm:inline-block bg-white/20 px-2 py-0.5 rounded-full text-[10px] tracking-wide font-mono">CODE: POP2026</span>
      </div>

      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isAdmin={isAdmin}
        setIsAdmin={setIsAdmin}
        isDark={isDark}
        toggleTheme={toggleTheme}
        onQuickBook={() => {
          setActiveTab('booking');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Main Page Body */}
      <main className="flex-1 pb-20 md:pb-0">
        {activeTab === 'home' && (
          <HomePage
            categories={categories}
            popularPackages={packages.filter(p => p.popular || p.id === 'pkg-premium' || p.id === 'pkg-luxury' || p.id === 'pkg-basic')}
            onNavigate={handleNavigate}
            onViewPackageDetails={(pkg) => setDetailModalPackage(pkg)}
            onBookPackage={handleBookPackage}
          />
        )}

        {activeTab === 'packages' && (
          <PackagesPage
            packages={packages}
            selectedCategoryFilter={selectedCategoryFilter}
            onViewPackageDetails={(pkg) => setDetailModalPackage(pkg)}
            onBookPackage={handleBookPackage}
          />
        )}

        {activeTab === 'themes' && (
          <ThemesPage
            themes={themes}
            selectedThemeId={preSelectedThemeId}
            onSelectThemeAndBook={handleSelectThemeAndBook}
          />
        )}

        {activeTab === 'how-it-works' && (
          <div className="max-w-5xl mx-auto px-4 py-12 space-y-12 animate-fadeIn">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-extrabold text-party-purple-600 dark:text-party-purple-400 uppercase tracking-wider bg-party-purple-100 dark:bg-party-purple-950/60 px-3.5 py-1.5 rounded-full border border-party-purple-200 dark:border-party-purple-800">
                Step-by-Step Guide
              </span>
              <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">How PartyPop Works 🎈</h1>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                We make birthday party planning completely effortless. Follow our simple process to host your ideal celebration.
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  step: '01',
                  title: 'Choose a Package',
                  desc: 'Browse through our Basic, Premium, or Luxury party packages. Each package is clearly priced with maximum guest capacities and included services.',
                  color: 'from-party-purple-600 to-party-purple-700'
                },
                {
                  step: '02',
                  title: 'Pick a Theme',
                  desc: 'Explore our gallery of themes including Unicorn, Superhero, Princess, Dinosaur, Space, Floral, and more. Choose the visual aesthetic that matches your birthday person’s dream.',
                  color: 'from-party-pink-500 to-party-pink-600'
                },
                {
                  step: '03',
                  title: 'Select Your Date & Guests',
                  desc: 'Specify your event date, total expected guests, customer contact details, and any custom requirements or dietary notes.',
                  color: 'from-party-gold-500 to-party-gold-600'
                },
                {
                  step: '04',
                  title: 'Confirm Booking Request',
                  desc: 'Submit your booking request with 1-click. You’ll receive instant reference details and our party coordinator will reach out to finalize setups!',
                  color: 'from-emerald-500 to-emerald-600'
                }
              ].map((s) => (
                <div key={s.step} className="bg-white dark:bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-white/10 shadow-card dark:shadow-card-dark flex flex-col sm:flex-row items-start gap-6 hover:translate-x-1 transition-all">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${s.color} text-white font-black text-2xl flex items-center justify-center shrink-0 shadow-md`}>
                    {s.step}
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">{s.title}</h3>
                    <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center pt-6">
              <button
                onClick={() => handleNavigate('booking')}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-party-purple-600 via-party-pink-500 to-party-purple-700 text-white font-black text-base shadow-xl shadow-party-purple-500/30 hover:shadow-glow hover:scale-105 active:scale-95 transition-all"
              >
                Start Booking Your Party Now 🎉
              </button>
            </div>
          </div>
        )}

        {activeTab === 'booking' && (
          <BookingPage
            packages={packages}
            themes={themes}
            preSelectedPackageId={preSelectedPackageId}
            preSelectedThemeId={preSelectedThemeId}
            onBookingSubmitted={handleCreateBooking}
          />
        )}

        {activeTab === 'my-bookings' && (
          <MyBookingsPage
            bookings={bookings}
            onCancelBooking={handleCancelBooking}
            onNewBooking={() => handleNavigate('booking')}
          />
        )}

        {activeTab === 'admin' && (
          <AdminPage
            packages={packages}
            bookings={bookings}
            themes={themes}
            onAddPackage={handleAddPackage}
            onEditPackage={handleEditPackage}
            onDeletePackage={handleDeletePackage}
            onUpdateBookingStatus={handleUpdateBookingStatus}
          />
        )}
      </main>

      {/* Footer */}
      <Footer setActiveTab={handleNavigate} />

      {/* Mobile Floating Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-3 left-4 right-4 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/80 dark:border-white/10 rounded-2xl shadow-2xl p-1.5 flex items-center justify-around">
        <button
          onClick={() => handleNavigate('home')}
          className={`flex flex-col items-center gap-0.5 py-1.5 px-3 rounded-xl transition-all ${
            activeTab === 'home'
              ? 'text-party-purple-600 dark:text-party-purple-400 bg-party-purple-50 dark:bg-slate-800/80 font-bold'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px]">Home</span>
        </button>

        <button
          onClick={() => handleNavigate('packages')}
          className={`flex flex-col items-center gap-0.5 py-1.5 px-3 rounded-xl transition-all ${
            activeTab === 'packages'
              ? 'text-party-purple-600 dark:text-party-purple-400 bg-party-purple-50 dark:bg-slate-800/80 font-bold'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800'
          }`}
        >
          <PkgIcon className="w-5 h-5" />
          <span className="text-[10px]">Packages</span>
        </button>

        <button
          onClick={() => handleNavigate('themes')}
          className={`flex flex-col items-center gap-0.5 py-1.5 px-3 rounded-xl transition-all ${
            activeTab === 'themes'
              ? 'text-party-purple-600 dark:text-party-purple-400 bg-party-purple-50 dark:bg-slate-800/80 font-bold'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800'
          }`}
        >
          <Palette className="w-5 h-5" />
          <span className="text-[10px]">Themes</span>
        </button>

        <button
          onClick={() => handleNavigate('booking')}
          className="flex flex-col items-center gap-0.5 py-1.5 px-3.5 rounded-xl bg-gradient-to-tr from-party-purple-600 to-party-pink-500 text-white font-bold shadow-md scale-105 active:scale-95 transition-all"
        >
          <Calendar className="w-5 h-5" />
          <span className="text-[10px]">Book</span>
        </button>

        <button
          onClick={() => handleNavigate('my-bookings')}
          className={`flex flex-col items-center gap-0.5 py-1.5 px-3 rounded-xl transition-all ${
            activeTab === 'my-bookings'
              ? 'text-party-purple-600 dark:text-party-purple-400 bg-party-purple-50 dark:bg-slate-800/80 font-bold'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800'
          }`}
        >
          <Ticket className="w-5 h-5" />
          <span className="text-[10px]">Bookings</span>
        </button>
      </div>

      {/* Package Details Modal */}
      <PackageDetailModal
        pkg={detailModalPackage}
        themes={themes}
        onClose={() => setDetailModalPackage(null)}
        onBookThisPackage={(pkg) => handleBookPackage(pkg)}
      />

      {/* Success Confetti Modal */}
      <ConfettiModal
        booking={submittedBooking}
        onClose={() => setSubmittedBooking(null)}
        onViewBookings={() => handleNavigate('my-bookings')}
        onGoHome={() => handleNavigate('home')}
      />

    </div>
  );
}
