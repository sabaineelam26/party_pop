import React, { useState } from 'react';
import { Sparkles, Search, Filter, Users, CheckCircle } from 'lucide-react';
import { Package } from '../types';
import { PackageCard } from '../components/PackageCard';

interface PackagesPageProps {
  packages: Package[];
  selectedCategoryFilter?: string;
  onViewPackageDetails: (pkg: Package) => void;
  onBookPackage: (pkg: Package) => void;
}

export const PackagesPage: React.FC<PackagesPageProps> = ({
  packages,
  selectedCategoryFilter = 'All',
  onViewPackageDetails,
  onBookPackage,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>(selectedCategoryFilter);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Kids Birthday Party', 'Teen Birthday Party', 'Adult Birthday Party', 'First Birthday Celebration'];

  const filteredPackages = packages.filter((pkg) => {
    const matchesCategory = activeCategory === 'All' || pkg.category === activeCategory;
    const matchesSearch = pkg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          pkg.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-party-purple-100 dark:bg-party-purple-950/80 text-party-purple-700 dark:text-party-purple-300 text-xs font-bold border border-party-purple-200 dark:border-party-purple-800 backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-party-pink-500" />
          Celebration Packages
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Birthday Party <span className="gradient-text">Packages</span> 🎈
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
          From cozy family parties to grand luxury milestone celebrations, explore our all-inclusive birthday packages designed for unforgettable fun.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-slate-900/90 p-4 sm:p-6 rounded-3xl border border-slate-200/80 dark:border-white/10 shadow-card dark:shadow-card-dark flex flex-col md:flex-row items-center justify-between gap-4 backdrop-blur-md">
        
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-party-purple-600 text-white shadow-md'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Field */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search packages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-party-purple-500 focus:bg-white dark:focus:bg-slate-900 transition-all"
          />
        </div>
      </div>

      {/* Packages Grid */}
      {filteredPackages.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPackages.map((pkg) => (
            <PackageCard
              key={pkg.id}
              pkg={pkg}
              onViewDetails={onViewPackageDetails}
              onBookNow={onBookPackage}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900/90 rounded-3xl p-12 text-center border border-slate-200 dark:border-white/10 shadow-card dark:shadow-card-dark space-y-4">
          <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto text-2xl">
            🔍
          </div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-white">No packages found</h3>
          <p className="text-slate-500 dark:text-slate-400 text-xs max-w-sm mx-auto">
            Try adjusting your search criteria or switching category filters.
          </p>
          <button
            onClick={() => {
              setActiveCategory('All');
              setSearchQuery('');
            }}
            className="px-5 py-2.5 rounded-2xl bg-party-purple-600 hover:bg-party-purple-700 text-white text-xs font-bold shadow-md transition-all"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Quick Comparison Info Table */}
      <div className="mt-16 bg-gradient-to-br from-party-purple-900/95 via-slate-900 to-party-purple-950 rounded-3xl p-6 sm:p-8 text-white shadow-2xl space-y-6 border border-white/10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h3 className="text-2xl font-black">Package Feature Comparison</h3>
          <p className="text-xs text-party-purple-200">
            Compare guest capacity and included services to find your best fit
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-party-purple-800 text-party-purple-200">
                <th className="py-3 px-4 font-bold">Feature</th>
                <th className="py-3 px-4 font-bold">Basic Package (€150)</th>
                <th className="py-3 px-4 font-bold">Premium Package (€350)</th>
                <th className="py-3 px-4 font-bold">Luxury Package (€600)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-party-purple-900/50">
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-200">Max Guests</td>
                <td className="py-3 px-4 text-slate-300">Up to 15</td>
                <td className="py-3 px-4 text-party-pink-300 font-bold">Up to 30</td>
                <td className="py-3 px-4 text-party-gold-400 font-bold">Up to 50</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-200">Decorations</td>
                <td className="py-3 px-4 text-slate-300">Basic Balloons & Banner</td>
                <td className="py-3 px-4 text-slate-300">Theme Balloons & Backdrop</td>
                <td className="py-3 px-4 text-slate-300">Custom Luxury Installations</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-200">Birthday Cake</td>
                <td className="py-3 px-4 text-slate-400">Add-on available</td>
                <td className="py-3 px-4 text-emerald-400 font-bold">Customized Included</td>
                <td className="py-3 px-4 text-emerald-400 font-bold">Multi-tier Designer Included</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-200">Catering & Drinks</td>
                <td className="py-3 px-4 text-slate-400">Basic Seating only</td>
                <td className="py-3 px-4 text-slate-300">Snacks & Drinks</td>
                <td className="py-3 px-4 text-slate-300">Full Food & Beverage Catering</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-200">Photography</td>
                <td className="py-3 px-4 text-slate-400">-</td>
                <td className="py-3 px-4 text-slate-300">Photo Corner</td>
                <td className="py-3 px-4 text-emerald-400 font-bold">Pro Photographer Included</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
