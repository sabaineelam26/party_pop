import React from 'react';
import { 
  PartyPopper, Sparkles, Calendar, Gift, ArrowRight, Star, 
  CheckCircle2, Heart, Award, ShieldCheck, Clock
} from 'lucide-react';
import { Package, Category } from '../types';
import { PackageCard } from '../components/PackageCard';

interface HomePageProps {
  categories: Category[];
  popularPackages: Package[];
  onNavigate: (tab: string, categoryFilter?: string) => void;
  onViewPackageDetails: (pkg: Package) => void;
  onBookPackage: (pkg: Package) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  categories,
  popularPackages,
  onNavigate,
  onViewPackageDetails,
  onBookPackage,
}) => {
  return (
    <div className="space-y-20 pb-16">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 bg-gradient-to-b from-party-purple-50/80 via-party-pink-50/40 to-slate-50 dark:from-party-purple-950/40 dark:via-party-pink-950/20 dark:to-[#070B14] transition-colors duration-300">
        
        {/* Ambient Glow Orbs */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-tr from-party-purple-500/20 to-party-pink-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/2 -right-24 w-80 h-80 bg-party-gold-500/15 rounded-full blur-3xl pointer-events-none"></div>

        {/* Floating Background Visual Elements (Balloons, Sparks) */}
        <div className="absolute top-10 left-8 sm:left-12 text-4xl sm:text-5xl animate-float opacity-80 select-none drop-shadow-md">🎈</div>
        <div className="absolute top-24 right-10 sm:right-20 text-4xl sm:text-5xl animate-float-delayed opacity-80 select-none drop-shadow-md">🎂</div>
        <div className="absolute bottom-12 left-1/4 text-3xl animate-float opacity-70 select-none" style={{ animationDelay: '1.2s' }}>✨</div>
        <div className="absolute bottom-20 right-1/4 text-4xl animate-float-delayed opacity-75 select-none" style={{ animationDelay: '2.4s' }}>🎁</div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-party-purple-100/90 dark:bg-party-purple-950/80 border border-party-purple-200 dark:border-party-purple-800 text-party-purple-700 dark:text-party-purple-300 text-xs sm:text-sm font-bold shadow-xs backdrop-blur-md">
                <Sparkles className="w-4 h-4 text-party-pink-500 fill-party-pink-400 animate-pulse" />
                The #1 Rated Birthday Booking Platform
              </div>

              {/* Exact Requested Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.15]">
                Make Every Birthday <br className="hidden sm:inline" />
                <span className="gradient-text">Unforgettable 🎉</span>
              </h1>

              {/* Exact Requested Subheading */}
              <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Discover beautiful birthday themes and party packages. Plan and book your perfect celebration in just a few clicks.
              </p>

              {/* Exact Requested CTA Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button
                  onClick={() => onNavigate('packages')}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-party-purple-600 via-party-pink-500 to-party-purple-700 hover:from-party-purple-700 hover:to-party-pink-600 text-white font-extrabold text-base shadow-lg shadow-party-purple-400/30 dark:shadow-party-purple-950 hover:shadow-glow hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 group"
                >
                  <span>Explore Packages</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                </button>

                <button
                  onClick={() => onNavigate('booking')}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white dark:bg-slate-900/90 hover:bg-party-purple-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-100 hover:text-party-purple-700 dark:hover:text-party-pink-400 font-extrabold text-base shadow-md dark:shadow-card-dark border border-slate-200/80 dark:border-white/10 hover:border-party-purple-300 dark:hover:border-party-purple-500/50 transition-all flex items-center justify-center gap-2"
                >
                  <PartyPopper className="w-5 h-5 text-party-pink-500" />
                  <span>Book Your Party</span>
                </button>
              </div>

              {/* Social Proof metrics */}
              <div className="pt-6 border-t border-slate-200/60 dark:border-white/10 grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0 text-center sm:text-left">
                <div className="p-2 rounded-2xl bg-white/40 dark:bg-slate-900/40 backdrop-blur-xs border border-transparent dark:border-white/5">
                  <p className="text-2xl font-black text-slate-900 dark:text-white">500+</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Happy Parties</p>
                </div>
                <div className="p-2 rounded-2xl bg-white/40 dark:bg-slate-900/40 backdrop-blur-xs border border-transparent dark:border-white/5">
                  <p className="text-2xl font-black text-slate-900 dark:text-white">4.9 ★</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Customer Rating</p>
                </div>
                <div className="p-2 rounded-2xl bg-white/40 dark:bg-slate-900/40 backdrop-blur-xs border border-transparent dark:border-white/5">
                  <p className="text-2xl font-black text-slate-900 dark:text-white">100%</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Satisfaction</p>
                </div>
              </div>
            </div>

            {/* Right Visual Collages */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                
                {/* Glow backdrop */}
                <div className="absolute -inset-4 bg-gradient-to-r from-party-purple-400 to-party-pink-400 dark:from-party-purple-600 dark:to-party-pink-600 rounded-3xl blur-2xl opacity-30 animate-pulse-subtle"></div>
                
                {/* Main Hero Card */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 bg-white dark:bg-slate-900 group">
                  <img
                    src="https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&q=80&w=800"
                    alt="Birthday Party Celebration"
                    className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent"></div>
                  
                  <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 dark:bg-slate-900/80 backdrop-blur-md text-xs font-semibold border border-white/20">
                      <Star className="w-3.5 h-3.5 text-party-gold-400 fill-party-gold-400" />
                      Unforgettable Moments Guaranteed
                    </div>
                    <p className="text-xl font-bold">PartyPop Signature Celebrations</p>
                  </div>
                </div>

                {/* Floating Overlay Badge */}
                <div className="absolute -bottom-6 -left-6 bg-white dark:bg-slate-900/95 rounded-2xl p-4 shadow-xl dark:shadow-card-dark border border-slate-100 dark:border-white/10 hidden sm:flex items-center gap-3 animate-float backdrop-blur-md" style={{ animationDelay: '0.5s' }}>
                  <div className="w-12 h-12 rounded-xl bg-party-pink-100 dark:bg-party-pink-950/60 text-party-pink-600 dark:text-party-pink-400 flex items-center justify-center font-extrabold text-xl shadow-xs">
                    🎈
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Seamless Planning</p>
                    <p className="text-sm font-black text-slate-900 dark:text-white">Book in under 2 minutes!</p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* A. FEATURED CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-extrabold text-party-purple-600 dark:text-party-purple-400 uppercase tracking-wider bg-party-purple-100 dark:bg-party-purple-950/60 px-3.5 py-1.5 rounded-full border border-party-purple-200 dark:border-party-purple-800">
            Tailored Experiences
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Featured Categories 🎁
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base">
            Whether it's a first birthday milestone or a high-energy teen bash, we have tailored packages for every age.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onNavigate('packages', cat.name)}
              className="group relative rounded-3xl overflow-hidden bg-white dark:bg-slate-900 shadow-card dark:shadow-card-dark hover:shadow-card-hover dark:hover:shadow-card-hover-dark border border-slate-100 dark:border-white/10 transition-all duration-300 hover:-translate-y-2 cursor-pointer flex flex-col justify-between h-72"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent"></div>
              
              <div className="relative p-4">
                <span className="inline-block px-3 py-1 rounded-full bg-white/20 dark:bg-slate-900/60 backdrop-blur-md text-white text-[11px] font-bold border border-white/20">
                  {cat.tag}
                </span>
              </div>

              <div className="relative p-6 text-white space-y-2">
                <h3 className="text-xl font-extrabold leading-tight group-hover:text-party-pink-300 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-slate-300 text-xs line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>
                <div className="pt-2 flex items-center gap-1.5 text-xs font-bold text-party-gold-400 group-hover:translate-x-1.5 transition-transform">
                  <span>Explore Category</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* B. POPULAR PACKAGES */}
      <section className="bg-slate-100/60 dark:bg-slate-900/40 py-16 border-y border-slate-200/80 dark:border-white/5 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div className="space-y-3">
              <span className="text-xs font-extrabold text-party-pink-600 dark:text-party-pink-400 uppercase tracking-wider bg-party-pink-100 dark:bg-party-pink-950/60 px-3.5 py-1.5 rounded-full border border-party-pink-200 dark:border-party-pink-800">
                Best Value
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                Popular Packages ✨
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-base max-w-xl">
                Choose from our top rated party packages curated to deliver maximum fun and stress-free celebrations.
              </p>
            </div>

            <button
              onClick={() => onNavigate('packages')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white dark:bg-slate-800 hover:bg-party-purple-50 dark:hover:bg-slate-700 text-party-purple-700 dark:text-party-purple-300 font-bold text-sm border border-party-purple-200 dark:border-party-purple-800/50 shadow-sm transition-all self-start md:self-auto hover:shadow-md"
            >
              View All Packages
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* 3 Package Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {popularPackages.map((pkg) => (
              <PackageCard
                key={pkg.id}
                pkg={pkg}
                onViewDetails={onViewPackageDetails}
                onBookNow={onBookPackage}
              />
            ))}
          </div>
        </div>
      </section>

      {/* C. HOW IT WORKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-extrabold text-party-purple-600 dark:text-party-purple-400 uppercase tracking-wider bg-party-purple-100 dark:bg-party-purple-950/60 px-3.5 py-1.5 rounded-full border border-party-purple-200 dark:border-party-purple-800">
            Simple Booking Flow
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            How It Works 🎈
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base">
            Planning your dream birthday party has never been easier. Just 4 simple steps!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          
          {/* Step 1 */}
          <div className="relative bg-white dark:bg-slate-900/90 rounded-3xl p-6 border border-slate-100 dark:border-white/10 shadow-card dark:shadow-card-dark hover:shadow-card-hover transition-all text-center space-y-4 hover:-translate-y-1">
            <div className="w-16 h-16 rounded-2xl bg-party-purple-100 dark:bg-party-purple-950/80 text-party-purple-600 dark:text-party-purple-300 font-black text-2xl mx-auto flex items-center justify-center shadow-inner border border-party-purple-200/50 dark:border-party-purple-800">
              1
            </div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white">1. Choose a Package</h3>
            <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
              Select between Basic, Premium, or Luxury options tailored to your guest size and budget.
            </p>
          </div>

          {/* Step 2 */}
          <div className="relative bg-white dark:bg-slate-900/90 rounded-3xl p-6 border border-slate-100 dark:border-white/10 shadow-card dark:shadow-card-dark hover:shadow-card-hover transition-all text-center space-y-4 hover:-translate-y-1">
            <div className="w-16 h-16 rounded-2xl bg-party-pink-100 dark:bg-party-pink-950/80 text-party-pink-600 dark:text-party-pink-300 font-black text-2xl mx-auto flex items-center justify-center shadow-inner border border-party-pink-200/50 dark:border-party-pink-800">
              2
            </div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white">2. Pick a Theme</h3>
            <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
              Browse Unicorn, Superhero, Princess, Space, and 8+ gorgeous styling themes.
            </p>
          </div>

          {/* Step 3 */}
          <div className="relative bg-white dark:bg-slate-900/90 rounded-3xl p-6 border border-slate-100 dark:border-white/10 shadow-card dark:shadow-card-dark hover:shadow-card-hover transition-all text-center space-y-4 hover:-translate-y-1">
            <div className="w-16 h-16 rounded-2xl bg-party-gold-100 dark:bg-party-gold-950/80 text-party-gold-700 dark:text-party-gold-300 font-black text-2xl mx-auto flex items-center justify-center shadow-inner border border-party-gold-200/50 dark:border-party-gold-800">
              3
            </div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white">3. Select Your Date</h3>
            <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
              Pick your preferred event date and tell us how many guests are celebrating.
            </p>
          </div>

          {/* Step 4 */}
          <div className="relative bg-white dark:bg-slate-900/90 rounded-3xl p-6 border border-slate-100 dark:border-white/10 shadow-card dark:shadow-card-dark hover:shadow-card-hover transition-all text-center space-y-4 hover:-translate-y-1">
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 font-black text-2xl mx-auto flex items-center justify-center shadow-inner border border-emerald-200/50 dark:border-emerald-800">
              4
            </div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white">4. Confirm Booking</h3>
            <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
              Submit your request instantly and our event manager handles the rest!
            </p>
          </div>

        </div>
      </section>

      {/* D. CALL TO ACTION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-party-purple-700 via-party-pink-600 to-party-purple-800 dark:from-party-purple-900 dark:via-party-pink-800 dark:to-party-purple-950 p-8 sm:p-12 lg:p-16 text-white shadow-2xl dark:shadow-glow-purple text-center sm:text-left flex flex-col lg:flex-row items-center justify-between gap-8 border border-white/10">
          
          {/* Subtle background graphics */}
          <div className="absolute -top-10 -right-10 text-9xl opacity-10 select-none pointer-events-none">🎈</div>

          <div className="space-y-4 max-w-2xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-party-gold-300 animate-pulse" />
              Limited Slots Available
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              Ready to Plan Your Perfect Birthday?
            </h2>
            <p className="text-party-purple-100 dark:text-slate-200 text-base sm:text-lg">
              Let us take care of decorations, setup, entertainment, and cake. Focus on making unforgettable memories!
            </p>
          </div>

          <div className="relative z-10 shrink-0">
            <button
              onClick={() => onNavigate('booking')}
              className="px-8 py-4 rounded-2xl bg-white hover:bg-party-gold-400 text-party-purple-900 hover:text-slate-950 font-black text-lg shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3 group"
            >
              <PartyPopper className="w-6 h-6 text-party-pink-600 group-hover:rotate-12 transition-transform" />
              <span>Book Your Party</span>
            </button>
          </div>

        </div>
      </section>

    </div>
  );
};
