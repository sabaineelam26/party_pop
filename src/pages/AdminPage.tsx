import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, Package as PkgIcon, Calendar, Plus, Edit2, Trash2, 
  Check, X, Eye, Users, Tag, AlertCircle, Clock, Sparkles, LogOut, Home
} from 'lucide-react';
import { Package, Booking, BookingStatus, Theme } from '../types';
import { useAdminAuth } from '../context/AdminAuthContext';

interface AdminPageProps {
  packages: Package[];
  bookings: Booking[];
  themes: Theme[];
  onAddPackage: (pkg: Package) => void;
  onEditPackage: (pkg: Package) => void;
  onDeletePackage: (id: string) => void;
  onUpdateBookingStatus: (id: string, status: BookingStatus) => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({
  packages,
  bookings,
  themes,
  onAddPackage,
  onEditPackage,
  onDeletePackage,
  onUpdateBookingStatus,
}) => {
  const { logout } = useAdminAuth();
  const navigate = useNavigate();
  const [adminTab, setAdminTab] = useState<'packages' | 'bookings'>('packages');

  const handleLogout = () => {
    logout();
    navigate('/admin/login', { replace: true });
  };

  // Package Form Modal State
  const [isPackageModalOpen, setIsPackageModalOpen] = useState<boolean>(false);
  const [editingPkg, setEditingPkg] = useState<Package | null>(null);
  
  const [pkgName, setPkgName] = useState('');
  const [pkgDesc, setPkgDesc] = useState('');
  const [pkgPrice, setPkgPrice] = useState<number>(200);
  const [pkgGuests, setPkgGuests] = useState<number>(20);
  const [pkgImage, setPkgImage] = useState('');
  const [pkgIncludesStr, setPkgIncludesStr] = useState('');
  const [pkgCategory, setPkgCategory] = useState('Kids Birthday Party');

  // Selected Booking details modal
  const [viewingBooking, setViewingBooking] = useState<Booking | null>(null);

  const openNewPackageModal = () => {
    setEditingPkg(null);
    setPkgName('');
    setPkgDesc('');
    setPkgPrice(200);
    setPkgGuests(20);
    setPkgImage('https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&q=80&w=800');
    setPkgIncludesStr('Theme Balloons, Custom Cake, Music System, Party Coordinator');
    setPkgCategory('Kids Birthday Party');
    setIsPackageModalOpen(true);
  };

  const openEditPackageModal = (pkg: Package) => {
    setEditingPkg(pkg);
    setPkgName(pkg.name);
    setPkgDesc(pkg.description);
    setPkgPrice(pkg.price);
    setPkgGuests(pkg.max_guests);
    setPkgImage(pkg.image);
    setPkgIncludesStr(pkg.includes.join(', '));
    setPkgCategory(pkg.category || 'Kids Birthday Party');
    setIsPackageModalOpen(true);
  };

  const handleSavePackage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pkgName.trim()) return;

    const includesList = pkgIncludesStr.split(',').map(s => s.trim()).filter(Boolean);

    const newPkg: Package = {
      id: editingPkg ? editingPkg.id : `pkg-custom-${Date.now()}`,
      name: pkgName.trim(),
      description: pkgDesc.trim(),
      full_description: pkgDesc.trim(),
      price: Number(pkgPrice),
      max_guests: Number(pkgGuests),
      image: pkgImage.trim() || 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&q=80&w=800',
      includes: includesList.length > 0 ? includesList : ['Party Decor', 'Music System'],
      category: pkgCategory,
      popular: editingPkg ? editingPkg.popular : false,
    };

    if (editingPkg) {
      onEditPackage(newPkg);
    } else {
      onAddPackage(newPkg);
    }

    setIsPackageModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#110B04]">
      {/* Admin Topbar */}
      <div className="bg-stone-950 border-b border-stone-800 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-party-purple-600 to-party-pink-500 flex items-center justify-center">
            <ShieldCheck className="w-4 h-4 text-white" />
          </div>
          <span className="text-white font-black text-base tracking-tight">BdayBuzz <span className="text-party-pink-400">Admin</span></span>
        </div>
        <div className="flex items-center gap-2">
          <a href="/" className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-stone-400 hover:text-white hover:bg-stone-800 transition">
            <Home className="w-3.5 h-3.5" /> View Site
          </a>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 transition"
          >
            <LogOut className="w-3.5 h-3.5" /> Logout
          </button>
        </div>
      </div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Admin Header */}
      <div className="bg-stone-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b-4 border-party-purple-600 border border-stone-800">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-party-purple-800 text-party-pink-300 text-xs font-bold border border-party-purple-700">
            <ShieldCheck className="w-4 h-4 text-party-pink-400" />
            Simple Administration Control
          </div>
          <h1 className="text-3xl font-black tracking-tight">BdayBuzz Admin Panel 🛠️</h1>
          <p className="text-stone-400 text-xs">
            Manage packages catalog and update customer party booking statuses in real-time.
          </p>
        </div>

        {/* Section Switcher Tabs */}
        <div className="flex items-center gap-2 bg-stone-800 p-1.5 rounded-2xl border border-stone-700">
          <button
            onClick={() => setAdminTab('packages')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              adminTab === 'packages'
                ? 'bg-party-purple-600 text-white shadow-md'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            <PkgIcon className="w-4 h-4" />
            Manage Packages
          </button>
          
          <button
            onClick={() => setAdminTab('bookings')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              adminTab === 'bookings'
                ? 'bg-party-purple-600 text-white shadow-md'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            <Calendar className="w-4 h-4" />
            Manage Bookings ({bookings.length})
          </button>
        </div>
      </div>

      {/* SECTION A: MANAGE PACKAGES */}
      {adminTab === 'packages' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-stone-900 dark:text-white">Packages Catalog</h2>
            <button
              onClick={openNewPackageModal}
              className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-party-purple-600 to-party-pink-500 hover:from-party-purple-700 hover:to-party-pink-600 text-white text-xs font-bold shadow-md hover:shadow-glow transition flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              Add New Package
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-white dark:bg-stone-900/90 rounded-3xl overflow-hidden border border-stone-200/80 dark:border-white/10 shadow-card dark:shadow-card-dark flex flex-col justify-between backdrop-blur-md"
              >
                <div className="relative h-44 bg-stone-100 dark:bg-stone-800">
                  <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover" />
                  <div className="absolute top-3 right-3 bg-white/90 dark:bg-stone-900/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-black text-party-purple-700 dark:text-party-pink-400 shadow-sm border border-white/20 dark:border-white/10">
                    €{pkg.price}
                  </div>
                </div>

                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-extrabold text-stone-900 dark:text-white text-lg">{pkg.name}</h3>
                    <p className="text-stone-500 dark:text-stone-400 text-xs line-clamp-2 mt-1 leading-relaxed">{pkg.description}</p>
                    <p className="text-xs text-party-purple-600 dark:text-party-pink-400 font-semibold mt-2">Up to {pkg.max_guests} guests</p>
                  </div>

                  <div className="pt-3 border-t border-stone-100 dark:border-white/10 flex items-center justify-end gap-2">
                    <button
                      onClick={() => openEditPackageModal(pkg)}
                      className="px-3 py-1.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200 text-xs font-bold transition flex items-center gap-1 border border-stone-200 dark:border-stone-700"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      Edit
                    </button>
                    
                    <button
                      onClick={() => {
                        if (confirm(`Delete package "${pkg.name}"?`)) {
                          onDeletePackage(pkg.id);
                        }
                      }}
                      className="px-3 py-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/50 hover:bg-rose-100 dark:hover:bg-rose-900/60 text-rose-700 dark:text-rose-300 text-xs font-bold transition flex items-center gap-1 border border-rose-200 dark:border-rose-900"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION B: MANAGE BOOKINGS */}
      {adminTab === 'bookings' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-stone-900 dark:text-white">Customer Bookings List</h2>
            <span className="text-xs text-stone-500 dark:text-stone-400 font-semibold">Total Requests: {bookings.length}</span>
          </div>

          <div className="bg-white dark:bg-stone-900/90 rounded-3xl border border-stone-200/80 dark:border-white/10 shadow-card dark:shadow-card-dark overflow-hidden backdrop-blur-md">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-stone-100 dark:bg-stone-800/80 text-stone-700 dark:text-stone-200 font-bold border-b border-stone-200 dark:border-stone-700">
                    <th className="p-4">Ref ID</th>
                    <th className="p-4">Customer Details</th>
                    <th className="p-4">Birthday Person</th>
                    <th className="p-4">Package & Theme</th>
                    <th className="p-4">Event Date & Guests</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                  {bookings.map((b) => (
                    <tr key={b.id} className="hover:bg-stone-50/80 dark:hover:bg-stone-800/50 transition">
                      <td className="p-4 font-mono font-bold text-party-purple-700 dark:text-party-pink-400">{b.id}</td>
                      <td className="p-4">
                        <p className="font-extrabold text-stone-900 dark:text-white">{b.customer_name}</p>
                        <p className="text-stone-500 dark:text-stone-400 text-[11px]">{b.email}</p>
                        <p className="text-stone-500 dark:text-stone-400 text-[11px]">{b.phone}</p>
                      </td>
                      <td className="p-4 font-bold text-stone-800 dark:text-stone-200">{b.birthday_person_name}</td>
                      <td className="p-4 space-y-0.5">
                        <p className="font-bold text-party-purple-700 dark:text-party-purple-300">{b.package_name}</p>
                        <p className="text-party-pink-600 dark:text-party-pink-400 font-medium text-[11px]">{b.theme_name}</p>
                      </td>
                      <td className="p-4 space-y-0.5">
                        <p className="font-bold text-stone-800 dark:text-stone-200">{b.event_date}</p>
                        <p className="text-stone-500 dark:text-stone-400 text-[11px]">{b.guests} Guests</p>
                      </td>
                      <td className="p-4">
                        <select
                          value={b.status}
                          onChange={(e) => onUpdateBookingStatus(b.id, e.target.value as BookingStatus)}
                          className={`px-3 py-1.5 rounded-full text-xs font-black border focus:outline-none cursor-pointer ${
                            b.status === 'Confirmed'
                              ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
                              : b.status === 'Pending'
                              ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800'
                              : 'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border-rose-300 dark:border-rose-800'
                          }`}
                        >
                          <option value="Pending" className="dark:bg-stone-900">Pending</option>
                          <option value="Confirmed" className="dark:bg-stone-900">Confirmed</option>
                          <option value="Cancelled" className="dark:bg-stone-900">Cancelled</option>
                        </select>
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => setViewingBooking(b)}
                          className="px-3 py-1.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-party-purple-50 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200 hover:text-party-purple-700 dark:hover:text-white font-bold text-xs transition border border-stone-200 dark:border-stone-700"
                        >
                          Inspect
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Package Create / Edit Modal */}
      {isPackageModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white dark:bg-stone-900 rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-stone-200 dark:border-white/10">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100 dark:border-white/10">
              <h3 className="text-xl font-black text-stone-900 dark:text-white">
                {editingPkg ? 'Edit Package' : 'Create New Package'}
              </h3>
              <button
                onClick={() => setIsPackageModalOpen(false)}
                className="w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-600 dark:text-stone-300 flex items-center justify-center text-sm font-bold transition"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSavePackage} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">Package Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. VIP Carnival Blast"
                  value={pkgName}
                  onChange={(e) => setPkgName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-950/60 border border-stone-200 dark:border-stone-800 text-stone-800 dark:text-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-party-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">Starting Price (€)</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={pkgPrice}
                    onChange={(e) => setPkgPrice(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-950/60 border border-stone-200 dark:border-stone-800 text-stone-800 dark:text-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-party-purple-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">Max Guests</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={pkgGuests}
                    onChange={(e) => setPkgGuests(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-950/60 border border-stone-200 dark:border-stone-800 text-stone-800 dark:text-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-party-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">Image URL</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={pkgImage}
                  onChange={(e) => setPkgImage(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-950/60 border border-stone-200 dark:border-stone-800 text-stone-800 dark:text-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-party-purple-500"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">Included Features (comma-separated)</label>
                <textarea
                  rows={2}
                  placeholder="Theme Balloons, Custom Cake, Music System, Party Games"
                  value={pkgIncludesStr}
                  onChange={(e) => setPkgIncludesStr(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-950/60 border border-stone-200 dark:border-stone-800 text-stone-800 dark:text-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-party-purple-500"
                ></textarea>
              </div>

              <div>
                <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">Short Description</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Comprehensive description of package features..."
                  value={pkgDesc}
                  onChange={(e) => setPkgDesc(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-950/60 border border-stone-200 dark:border-stone-800 text-stone-800 dark:text-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-party-purple-500"
                ></textarea>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsPackageModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-bold hover:bg-stone-200 dark:hover:bg-stone-700 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-party-purple-600 to-party-pink-500 hover:from-party-purple-700 hover:to-party-pink-600 text-white font-bold shadow-md transition"
                >
                  Save Package
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Inspect Customer Booking Details Modal */}
      {viewingBooking && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white dark:bg-stone-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-stone-200 dark:border-white/10">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100 dark:border-white/10">
              <h3 className="text-xl font-black text-stone-900 dark:text-white">Admin Booking Inspection</h3>
              <button
                onClick={() => setViewingBooking(null)}
                className="w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-600 dark:text-stone-300 flex items-center justify-center font-bold transition"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-stone-700 dark:text-stone-300">
              <div className="flex justify-between items-center bg-stone-50 dark:bg-stone-950/60 p-3 rounded-xl border border-stone-100 dark:border-white/5">
                <span className="font-bold text-stone-500 dark:text-stone-400">Booking Ref</span>
                <span className="font-mono font-bold text-party-purple-700 dark:text-party-pink-400">{viewingBooking.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-stone-500 dark:text-stone-400">Customer Name:</span>
                <span className="font-bold text-stone-900 dark:text-white">{viewingBooking.customer_name}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-stone-500 dark:text-stone-400">Customer Email:</span>
                <span className="font-bold text-stone-900 dark:text-white">{viewingBooking.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-stone-500 dark:text-stone-400">Customer Phone:</span>
                <span className="font-bold text-stone-900 dark:text-white">{viewingBooking.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-stone-500 dark:text-stone-400">Birthday Person:</span>
                <span className="font-bold text-stone-900 dark:text-white">{viewingBooking.birthday_person_name}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-stone-500 dark:text-stone-400">Selected Package:</span>
                <span className="font-bold text-party-purple-700 dark:text-party-pink-400">{viewingBooking.package_name}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-stone-500 dark:text-stone-400">Selected Theme:</span>
                <span className="font-bold text-party-pink-600 dark:text-party-pink-400">{viewingBooking.theme_name}</span>
              </div>
              {viewingBooking.selected_addons && viewingBooking.selected_addons.length > 0 && (
                <div className="flex justify-between">
                  <span className="font-semibold text-stone-500 dark:text-stone-400">Selected Add-ons ({viewingBooking.selected_addons.length}):</span>
                  <span className="font-bold text-party-purple-700 dark:text-party-pink-400">+€{viewingBooking.addons_price || 0}</span>
                </div>
              )}
              {viewingBooking.promo_code && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
                  <span>Applied Promo Code:</span>
                  <span className="font-mono bg-emerald-100 dark:bg-emerald-900/60 px-1.5 py-0.5 rounded text-[11px] font-bold">{viewingBooking.promo_code} (-€{viewingBooking.discount_amount})</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="font-semibold text-stone-500 dark:text-stone-400">Event Date:</span>
                <span className="font-bold text-stone-900 dark:text-white">{viewingBooking.event_date}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-stone-500 dark:text-stone-400">Guest Count:</span>
                <span className="font-bold text-stone-900 dark:text-white">{viewingBooking.guests}</span>
              </div>
              {viewingBooking.special_request && (
                <div className="bg-amber-50 dark:bg-amber-950/40 p-3 rounded-xl border border-amber-200 dark:border-amber-900">
                  <span className="font-bold text-amber-900 dark:text-amber-200 block mb-1">Customer Notes:</span>
                  <p className="text-amber-800 dark:text-amber-300">{viewingBooking.special_request}</p>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-stone-100 dark:border-white/10 flex items-center justify-between">
              <div>
                <span className="text-xs text-stone-400 dark:text-stone-500 block font-bold">Update Status:</span>
                <div className="flex items-center gap-2 mt-1">
                  {(['Pending', 'Confirmed', 'Cancelled'] as BookingStatus[]).map((st) => (
                    <button
                      key={st}
                      onClick={() => {
                        onUpdateBookingStatus(viewingBooking.id, st);
                        setViewingBooking({ ...viewingBooking, status: st });
                      }}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                        viewingBooking.status === st
                          ? 'bg-party-purple-600 text-white shadow-sm'
                          : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
    </div>
  );
};
