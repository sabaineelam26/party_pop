import React, { useState, useEffect } from 'react';
import { 
  PartyPopper, Calendar, Users, User, Mail, Phone, Sparkles, 
  CheckCircle2, AlertCircle, Info, ShieldCheck, Tag, Heart,
  Cake, Wand2, Camera, Utensils, Music, Gift, Plus, Check,
  Percent, Trash2, Ticket, X
} from 'lucide-react';
import { Package, Theme, Booking, PromoCode } from '../types';
import { INITIAL_ADDONS, AVAILABLE_PROMO_CODES } from '../data/initialData';

interface BookingPageProps {
  packages: Package[];
  themes: Theme[];
  preSelectedPackageId?: string;
  preSelectedThemeId?: string;
  onBookingSubmitted: (booking: Booking) => void;
}

export const BookingPage: React.FC<BookingPageProps> = ({
  packages,
  themes,
  preSelectedPackageId,
  preSelectedThemeId,
  onBookingSubmitted,
}) => {
  // Get today's date formatted as YYYY-MM-DD for min attribute
  const todayStr = new Date().toISOString().split('T')[0];

  // Default initial package & theme
  const initialPackage = packages.find(p => p.id === preSelectedPackageId) || packages[1] || packages[0];
  const initialTheme = themes.find(t => t.id === preSelectedThemeId) || themes[0];

  const [selectedPackageId, setSelectedPackageId] = useState<string>(initialPackage?.id || '');
  const [selectedThemeId, setSelectedThemeId] = useState<string>(initialTheme?.id || '');
  const [birthdayPersonName, setBirthdayPersonName] = useState<string>('');
  const [customerName, setCustomerName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [eventDate, setEventDate] = useState<string>('');
  const [guests, setGuests] = useState<number>(initialPackage?.max_guests || 15);
  const [specialRequirements, setSpecialRequirements] = useState<string>('');

  // Add-ons state
  const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>([]);

  // Promo Code state
  const [promoInput, setPromoInput] = useState<string>('');
  const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(null);
  const [promoError, setPromoError] = useState<string>('');
  const [promoSuccess, setPromoSuccess] = useState<string>('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Sync state if props change
  useEffect(() => {
    if (preSelectedPackageId) {
      const p = packages.find(pkg => pkg.id === preSelectedPackageId);
      if (p) {
        setSelectedPackageId(p.id);
        if (guests > p.max_guests) setGuests(p.max_guests);
      }
    }
  }, [preSelectedPackageId, packages]);

  useEffect(() => {
    if (preSelectedThemeId) {
      setSelectedThemeId(preSelectedThemeId);
    }
  }, [preSelectedThemeId]);

  const activePackage = packages.find(p => p.id === selectedPackageId) || packages[0];
  const activeTheme = themes.find(t => t.id === selectedThemeId) || themes[0];

  // Helper for addon icons
  const getAddonIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cake': return <Cake className="w-5 h-5" />;
      case 'Wand2': return <Wand2 className="w-5 h-5" />;
      case 'Camera': return <Camera className="w-5 h-5" />;
      case 'Utensils': return <Utensils className="w-5 h-5" />;
      case 'Music': return <Music className="w-5 h-5" />;
      default: return <Sparkles className="w-5 h-5" />;
    }
  };

  const toggleAddon = (id: string) => {
    setSelectedAddonIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleApplyPromo = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setPromoError('');
    setPromoSuccess('');

    const trimmed = promoInput.trim().toUpperCase();
    if (!trimmed) {
      setPromoError('Please enter a promo code.');
      return;
    }

    const matched = AVAILABLE_PROMO_CODES.find(p => p.code.toUpperCase() === trimmed);
    if (matched) {
      setAppliedPromo(matched);
      setPromoSuccess(`🎉 Code "${matched.code}" applied! ${matched.description}`);
      setPromoError('');
    } else {
      setPromoError('Invalid promo code. Try "POP2026", "PARTY10", or "SAVE50".');
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoInput('');
    setPromoSuccess('');
    setPromoError('');
  };

  // Price Calculation Logic
  const basePrice = activePackage?.price || 0;
  const addonsTotal = selectedAddonIds.reduce((sum, id) => {
    const addon = INITIAL_ADDONS.find(a => a.id === id);
    return sum + (addon ? addon.price : 0);
  }, 0);
  const subtotal = basePrice + addonsTotal;

  let discountAmount = 0;
  if (appliedPromo) {
    if (appliedPromo.discountType === 'percentage') {
      discountAmount = Math.round((subtotal * appliedPromo.discountValue) / 100);
    } else {
      discountAmount = Math.min(subtotal, appliedPromo.discountValue);
    }
  }

  const estimatedTotalPrice = Math.max(0, subtotal - discountAmount);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!selectedPackageId) newErrors.package = 'Please select a package.';
    if (!selectedThemeId) newErrors.theme = 'Please select a theme.';
    if (!birthdayPersonName.trim()) newErrors.birthdayPersonName = 'Birthday person name is required.';
    if (!customerName.trim()) newErrors.customerName = 'Customer name is required.';
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Valid email address is required.';
    if (!phone.trim()) newErrors.phone = 'Phone number is required.';
    if (!eventDate) {
      newErrors.eventDate = 'Event date is required.';
    } else if (eventDate < todayStr) {
      newErrors.eventDate = 'Event date cannot be in the past.';
    }
    if (!guests || guests < 1) {
      newErrors.guests = 'Guest count must be at least 1.';
    } else if (activePackage && guests > activePackage.max_guests) {
      newErrors.guests = `Selected package supports up to ${activePackage.max_guests} guests.`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const createdBookingInput = {
        package_id: activePackage.id,
        package_name: activePackage.name,
        theme_id: activeTheme.id,
        theme_name: activeTheme.name,
        birthday_person_name: birthdayPersonName.trim(),
        customer_name: customerName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        event_date: eventDate,
        guests: Number(guests),
        selected_addons: selectedAddonIds,
        addons_price: addonsTotal,
        promo_code: appliedPromo ? appliedPromo.code : undefined,
        discount_amount: discountAmount > 0 ? discountAmount : undefined,
        special_request: specialRequirements.trim(),
        estimated_price: estimatedTotalPrice,
      };

      onBookingSubmitted(createdBookingInput as any);
      setIsSubmitting(false);
    }, 600);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-party-purple-100 dark:bg-party-purple-950/80 text-party-purple-700 dark:text-party-purple-300 text-xs font-bold border border-party-purple-200 dark:border-party-purple-800 backdrop-blur-md">
          <PartyPopper className="w-4 h-4 text-party-pink-500" />
          Easy Online Booking
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-stone-900 dark:text-white tracking-tight">
          Book Your Birthday <span className="gradient-text">Party</span> 🎉
        </h1>
        <p className="text-stone-600 dark:text-stone-300 text-base">
          Customize your celebration with packages, themes, add-ons & promo code savings.
        </p>
      </div>

      {/* Main Grid: Form + Side Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Form */}
        <div className="lg:col-span-7 bg-white dark:bg-stone-900/90 rounded-3xl p-6 sm:p-8 border border-stone-200/80 dark:border-white/10 shadow-card dark:shadow-card-dark space-y-6 backdrop-blur-md">
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            
            {/* Section 1: Package & Theme Selection */}
            <div className="space-y-4">
              <h3 className="text-sm font-black text-party-purple-700 dark:text-party-purple-400 uppercase tracking-wider flex items-center gap-2 pb-2 border-b border-stone-100 dark:border-white/10">
                <Tag className="w-4 h-4" />
                1. Select Package & Theme
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Select Package */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1.5">
                    Choose Party Package <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={selectedPackageId}
                    onChange={(e) => {
                      setSelectedPackageId(e.target.value);
                      const p = packages.find(pkg => pkg.id === e.target.value);
                      if (p && guests > p.max_guests) setGuests(p.max_guests);
                    }}
                    className={`w-full px-4 py-3 rounded-2xl bg-stone-50 dark:bg-stone-950/60 border text-sm font-semibold text-stone-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-party-purple-500 ${
                      errors.package ? 'border-rose-400 bg-rose-50/30' : 'border-stone-200 dark:border-stone-800'
                    }`}
                  >
                    {packages.map((pkg) => (
                      <option key={pkg.id} value={pkg.id} className="dark:bg-stone-900 text-stone-900 dark:text-white">
                        {pkg.name} — €{pkg.price} (Max {pkg.max_guests} Guests)
                      </option>
                    ))}
                  </select>
                  {errors.package && <p className="text-xs text-rose-500 mt-1">{errors.package}</p>}
                </div>

                {/* Select Theme */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1.5">
                    Choose Party Theme <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={selectedThemeId}
                    onChange={(e) => setSelectedThemeId(e.target.value)}
                    className={`w-full px-4 py-3 rounded-2xl bg-stone-50 dark:bg-stone-950/60 border text-sm font-semibold text-stone-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-party-purple-500 ${
                      errors.theme ? 'border-rose-400 bg-rose-50/30' : 'border-stone-200 dark:border-stone-800'
                    }`}
                  >
                    {themes.map((theme) => (
                      <option key={theme.id} value={theme.id} className="dark:bg-stone-900 text-stone-900 dark:text-white">
                        {theme.name}
                      </option>
                    ))}
                  </select>
                  {errors.theme && <p className="text-xs text-rose-500 mt-1">{errors.theme}</p>}
                </div>
              </div>
            </div>

            {/* Section 2: Celebration & Guest Details */}
            <div className="space-y-4 pt-4 border-t border-stone-100 dark:border-white/10">
              <h3 className="text-sm font-black text-party-purple-700 dark:text-party-purple-400 uppercase tracking-wider flex items-center gap-2 pb-2 border-b border-stone-100 dark:border-white/10">
                <Calendar className="w-4 h-4" />
                2. Event & Guest Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Birthday Person Name */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1.5">
                    Birthday Person Name <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                    <input
                      type="text"
                      placeholder="e.g. Sophia Miller (Turning 8!)"
                      value={birthdayPersonName}
                      onChange={(e) => setBirthdayPersonName(e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 rounded-2xl bg-stone-50 dark:bg-stone-950/60 border text-sm text-stone-800 dark:text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-party-purple-500 ${
                        errors.birthdayPersonName ? 'border-rose-400 bg-rose-50/30' : 'border-stone-200 dark:border-stone-800'
                      }`}
                    />
                  </div>
                  {errors.birthdayPersonName && <p className="text-xs text-rose-500 mt-1">{errors.birthdayPersonName}</p>}
                </div>

                {/* Number of Guests */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1.5">
                    Guests <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                    <input
                      type="number"
                      min="1"
                      max={activePackage?.max_guests || 50}
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className={`w-full pl-10 pr-4 py-3 rounded-2xl bg-stone-50 dark:bg-stone-950/60 border text-sm text-stone-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-party-purple-500 ${
                        errors.guests ? 'border-rose-400 bg-rose-50/30' : 'border-stone-200 dark:border-stone-800'
                      }`}
                    />
                  </div>
                  {errors.guests && <p className="text-xs text-rose-500 mt-1">{errors.guests}</p>}
                </div>
              </div>

              {/* Event Date Picker */}
              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1.5">
                  Event Date <span className="text-rose-500">*</span> <span className="text-stone-400 font-normal">(Past dates disabled)</span>
                </label>
                <input
                  type="date"
                  min={todayStr}
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className={`w-full px-4 py-3 rounded-2xl bg-stone-50 dark:bg-stone-950/60 border text-sm text-stone-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-party-purple-500 ${
                    errors.eventDate ? 'border-rose-400 bg-rose-50/30' : 'border-stone-200 dark:border-stone-800'
                  }`}
                />
                {errors.eventDate && <p className="text-xs text-rose-500 mt-1">{errors.eventDate}</p>}
              </div>
            </div>

            {/* Section 3: Add-ons & Extra Services */}
            <div className="space-y-4 pt-4 border-t border-stone-100 dark:border-white/10">
              <div className="flex items-center justify-between pb-2 border-b border-stone-100 dark:border-white/10">
                <h3 className="text-sm font-black text-party-purple-700 dark:text-party-purple-400 uppercase tracking-wider flex items-center gap-2">
                  <Gift className="w-4 h-4" />
                  3. Party Add-ons & Extras <span className="text-stone-400 font-normal text-xs uppercase font-sans">(Optional)</span>
                </h3>
                {selectedAddonIds.length > 0 && (
                  <span className="text-xs font-bold text-party-purple-600 dark:text-party-pink-400 bg-party-purple-50 dark:bg-party-purple-950/60 px-2.5 py-0.5 rounded-full border border-party-purple-200 dark:border-party-purple-800">
                    {selectedAddonIds.length} Selected (+€{addonsTotal})
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {INITIAL_ADDONS.map((addon) => {
                  const isSelected = selectedAddonIds.includes(addon.id);
                  return (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      className={`cursor-pointer rounded-2xl p-3.5 border transition-all duration-200 flex items-start gap-3 relative ${
                        isSelected 
                          ? 'border-party-purple-500 dark:border-party-pink-500 bg-party-purple-50/60 dark:bg-party-purple-950/40 shadow-sm ring-1 ring-party-purple-400 dark:ring-party-pink-400/50' 
                          : 'border-stone-200 dark:border-stone-800 hover:border-party-purple-300 dark:hover:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800/40'
                      }`}
                    >
                      <div className={`p-2 rounded-xl shrink-0 ${isSelected ? 'bg-party-purple-600 dark:bg-party-pink-600 text-white' : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300'}`}>
                        {getAddonIcon(addon.icon)}
                      </div>
                      <div className="flex-1 pr-6">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-bold text-stone-900 dark:text-white">{addon.name}</h4>
                        </div>
                        <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5 leading-snug">{addon.description}</p>
                        <span className="inline-block mt-2 text-xs font-extrabold text-party-purple-700 dark:text-party-pink-300 bg-white dark:bg-stone-800 px-2 py-0.5 rounded-md border border-stone-200 dark:border-stone-700 shadow-2xs">
                          +€{addon.price}
                        </span>
                      </div>
                      <div className="absolute top-3.5 right-3.5">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                          isSelected ? 'bg-party-purple-600 dark:bg-party-pink-500 text-white' : 'border border-stone-300 dark:border-stone-700 text-transparent'
                        }`}>
                          <Check className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Section 4: Customer Contact Info */}
            <div className="space-y-4 pt-4 border-t border-stone-100 dark:border-white/10">
              <h3 className="text-sm font-black text-party-purple-700 dark:text-party-purple-400 uppercase tracking-wider flex items-center gap-2 pb-2 border-b border-stone-100 dark:border-white/10">
                <Mail className="w-4 h-4" />
                4. Customer Contact Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Customer Name */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1.5">
                    Customer Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Your Full Name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className={`w-full px-4 py-3 rounded-2xl bg-stone-50 dark:bg-stone-950/60 border text-sm text-stone-800 dark:text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-party-purple-500 ${
                      errors.customerName ? 'border-rose-400 bg-rose-50/30' : 'border-stone-200 dark:border-stone-800'
                    }`}
                  />
                  {errors.customerName && <p className="text-xs text-rose-500 mt-1">{errors.customerName}</p>}
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1.5">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full px-4 py-3 rounded-2xl bg-stone-50 dark:bg-stone-950/60 border text-sm text-stone-800 dark:text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-party-purple-500 ${
                      errors.email ? 'border-rose-400 bg-rose-50/30' : 'border-stone-200 dark:border-stone-800'
                    }`}
                  />
                  {errors.email && <p className="text-xs text-rose-500 mt-1">{errors.email}</p>}
                </div>

                {/* Phone Number */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1.5">
                    Phone Number <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={`w-full px-4 py-3 rounded-2xl bg-stone-50 dark:bg-stone-950/60 border text-sm text-stone-800 dark:text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-party-purple-500 ${
                      errors.phone ? 'border-rose-400 bg-rose-50/30' : 'border-stone-200 dark:border-stone-800'
                    }`}
                  />
                  {errors.phone && <p className="text-xs text-rose-500 mt-1">{errors.phone}</p>}
                </div>
              </div>
            </div>

            {/* Section 5: Promo Code & Discounts */}
            <div className="space-y-3 pt-4 border-t border-stone-100 dark:border-white/10">
              <h3 className="text-sm font-black text-party-purple-700 dark:text-party-purple-400 uppercase tracking-wider flex items-center gap-2 pb-1">
                <Ticket className="w-4 h-4" />
                5. Promo Code & Discount <span className="text-stone-400 font-normal text-xs uppercase font-sans">(Optional)</span>
              </h3>

              {!appliedPromo ? (
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Ticket className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                      <input
                        type="text"
                        placeholder="Enter code (e.g. POP2026, PARTY10, SAVE50)"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-stone-50 dark:bg-stone-950/60 border border-stone-200 dark:border-stone-800 text-sm font-mono text-stone-800 dark:text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-party-purple-500 uppercase"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleApplyPromo}
                      className="px-5 py-2.5 rounded-2xl bg-party-purple-600 hover:bg-party-purple-700 text-white font-extrabold text-xs shadow-md transition-all shrink-0"
                    >
                      Apply Code
                    </button>
                  </div>

                  {promoError && (
                    <div className="flex items-center gap-2 text-xs text-rose-600 dark:text-rose-400 font-semibold bg-rose-50 dark:bg-rose-950/40 p-2.5 rounded-xl border border-rose-200 dark:border-rose-900">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{promoError}</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 p-3.5 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                      <Percent className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-emerald-900 dark:text-emerald-200 text-sm">{appliedPromo.code}</span>
                        <span className="bg-emerald-200 dark:bg-emerald-800 text-emerald-900 dark:text-emerald-100 text-[10px] font-black px-2 py-0.5 rounded-md">
                          APPLIED
                        </span>
                      </div>
                      <p className="text-xs text-emerald-700 dark:text-emerald-300 font-medium">{appliedPromo.description}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemovePromo}
                    className="p-1.5 text-emerald-700 dark:text-emerald-300 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-stone-800 rounded-lg transition-colors"
                    title="Remove Promo Code"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Section 6: Special Requirements */}
            <div className="space-y-3 pt-4 border-t border-stone-100 dark:border-white/10">
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                Special Requirements & Notes <span className="text-stone-400 font-normal">(Optional)</span>
              </label>
              <textarea
                rows={3}
                placeholder="Mention dietary preferences, custom colors, smash cake flavor, or song choices..."
                value={specialRequirements}
                onChange={(e) => setSpecialRequirements(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-stone-50 dark:bg-stone-950/60 border border-stone-200 dark:border-stone-800 text-sm text-stone-800 dark:text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-party-purple-500"
              ></textarea>
            </div>

            {/* Prominent Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-party-purple-600 via-party-pink-500 to-party-purple-700 hover:from-party-purple-700 hover:to-party-pink-600 text-white font-black text-lg shadow-xl shadow-party-purple-300 dark:shadow-party-purple-950 hover:shadow-glow hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Submitting Request...</span>
                ) : (
                  <>
                    <PartyPopper className="w-6 h-6" />
                    <span>Confirm Booking (€{estimatedTotalPrice}) 🎉</span>
                  </>
                )}
              </button>
            </div>

          </form>
        </div>

        {/* Right Column: Live Booking Summary */}
        <div className="lg:col-span-5 sticky top-24 space-y-6">
          <div className="bg-white dark:bg-stone-900/90 rounded-3xl p-6 sm:p-8 border border-stone-200/80 dark:border-white/10 shadow-card dark:shadow-card-dark space-y-6 backdrop-blur-md">
            
            <div className="flex items-center justify-between pb-4 border-b border-stone-100 dark:border-white/10">
              <h3 className="text-lg font-black text-stone-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-party-pink-500 fill-party-pink-400" />
                Booking Summary
              </h3>
              <span className="text-xs font-bold text-party-purple-700 dark:text-party-purple-300 bg-party-purple-100 dark:bg-party-purple-950/80 px-3 py-1 rounded-full border border-party-purple-200 dark:border-party-purple-800">
                Live Quote
              </span>
            </div>

            {/* Selected Package Preview */}
            {activePackage && (
              <div className="space-y-3">
                <div className="flex items-center gap-3 bg-stone-50 dark:bg-stone-950/60 p-3 rounded-2xl border border-stone-200/60 dark:border-white/10">
                  <img
                    src={activePackage.image}
                    alt={activePackage.name}
                    className="w-14 h-14 rounded-xl object-cover"
                  />
                  <div>
                    <span className="text-[10px] font-extrabold text-party-purple-600 dark:text-party-purple-400 uppercase">Selected Package</span>
                    <h4 className="font-extrabold text-stone-900 dark:text-white text-sm">{activePackage.name}</h4>
                    <p className="text-xs text-stone-500 dark:text-stone-400">Up to {activePackage.max_guests} guests</p>
                  </div>
                </div>

                {/* Included features checklist snippet */}
                <div className="space-y-1.5 pl-2 text-xs">
                  {activePackage.includes.map((inc, i) => (
                    <div key={i} className="flex items-center gap-2 text-stone-600 dark:text-stone-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-party-purple-500 dark:text-party-purple-400 shrink-0" />
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Selected Theme Preview */}
            {activeTheme && (
              <div className="flex items-center gap-3 bg-stone-50 dark:bg-stone-950/60 p-3 rounded-2xl border border-stone-200/60 dark:border-white/10">
                <img
                  src={activeTheme.image}
                  alt={activeTheme.name}
                  className="w-12 h-12 rounded-xl object-cover"
                />
                <div>
                  <span className="text-[10px] font-extrabold text-party-pink-600 dark:text-party-pink-400 uppercase">Selected Theme</span>
                  <h4 className="font-extrabold text-stone-900 dark:text-white text-xs">{activeTheme.name}</h4>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400">{activeTheme.tag}</p>
                </div>
              </div>
            )}

            {/* Selected Add-ons Breakdown List */}
            {selectedAddonIds.length > 0 && (
              <div className="space-y-2 pt-3 border-t border-stone-100 dark:border-white/10">
                <span className="text-[10px] font-extrabold text-party-purple-600 dark:text-party-purple-400 uppercase">Selected Add-ons</span>
                <div className="space-y-1 text-xs">
                  {selectedAddonIds.map(id => {
                    const addon = INITIAL_ADDONS.find(a => a.id === id);
                    if (!addon) return null;
                    return (
                      <div key={id} className="flex items-center justify-between text-stone-700 dark:text-stone-300 bg-stone-50 dark:bg-stone-950/60 px-2.5 py-1.5 rounded-lg border border-stone-200/60 dark:border-white/10">
                        <span className="font-semibold text-stone-800 dark:text-stone-200">{addon.name}</span>
                        <span className="font-mono text-party-purple-700 dark:text-party-pink-400 font-bold">+€{addon.price}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Summary Data Breakdown */}
            <div className="space-y-2.5 pt-4 border-t border-stone-100 dark:border-white/10 text-xs">
              <div className="flex justify-between text-stone-600 dark:text-stone-400">
                <span>Birthday Person:</span>
                <span className="font-bold text-stone-800 dark:text-stone-200">{birthdayPersonName || 'Not specified'}</span>
              </div>
              <div className="flex justify-between text-stone-600 dark:text-stone-400">
                <span>Event Date:</span>
                <span className="font-bold text-stone-800 dark:text-stone-200">{eventDate || 'Not selected'}</span>
              </div>
              <div className="flex justify-between text-stone-600 dark:text-stone-400">
                <span>Guests Count:</span>
                <span className="font-bold text-stone-800 dark:text-stone-200">{guests} guests</span>
              </div>
              
              <div className="pt-2 border-t border-stone-100 dark:border-white/10 space-y-1.5">
                <div className="flex justify-between text-stone-600 dark:text-stone-400">
                  <span>Base Package:</span>
                  <span className="font-bold text-stone-800 dark:text-stone-200">€{basePrice}</span>
                </div>
                {addonsTotal > 0 && (
                  <div className="flex justify-between text-stone-600 dark:text-stone-400">
                    <span>Add-ons Total:</span>
                    <span className="font-bold text-stone-800 dark:text-stone-200">+€{addonsTotal}</span>
                  </div>
                )}
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
                    <span>Promo Code Discount ({appliedPromo?.code}):</span>
                    <span className="font-bold">-€{discountAmount}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Total Estimated Price */}
            <div className="pt-4 border-t border-stone-200 dark:border-stone-800 bg-party-purple-50/70 dark:bg-stone-950/80 -mx-6 -mb-6 p-6 rounded-b-3xl flex items-center justify-between">
              <div>
                <span className="text-xs text-stone-500 dark:text-stone-400 font-semibold block">Estimated Price</span>
                {discountAmount > 0 ? (
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">Saved €{discountAmount}!</span>
                ) : (
                  <span className="text-xs text-party-purple-600 dark:text-party-purple-400">No hidden fees</span>
                )}
              </div>
              <div className="text-right">
                {discountAmount > 0 && (
                  <span className="text-xs text-stone-400 line-through block font-semibold">€{subtotal}</span>
                )}
                <span className="text-3xl font-black text-party-purple-800 dark:text-party-pink-400">€{estimatedTotalPrice}</span>
              </div>
            </div>

          </div>

          {/* Guarantee Pill */}
          <div className="bg-white dark:bg-stone-900/90 rounded-2xl p-4 border border-stone-200/80 dark:border-white/10 flex items-center gap-3 text-xs text-stone-600 dark:text-stone-300 shadow-sm backdrop-blur-md">
            <ShieldCheck className="w-6 h-6 text-party-purple-600 dark:text-party-purple-400 shrink-0" />
            <p>
              <strong className="text-stone-800 dark:text-white font-bold">100% Satisfaction Guarantee:</strong> Easy date modifications with 48h advance notice.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
