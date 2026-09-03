import { Package, Theme, Booking, BookingStatus } from '../types';
import { INITIAL_PACKAGES, INITIAL_THEMES, INITIAL_BOOKINGS } from '../data/initialData';

const KEYS = {
  PACKAGES: 'partypop_packages_v1',
  THEMES: 'partypop_themes_v1',
  BOOKINGS: 'partypop_bookings_v1',
};

// Helper to initialize local storage if empty
const initStorage = () => {
  if (!localStorage.getItem(KEYS.PACKAGES)) {
    localStorage.setItem(KEYS.PACKAGES, JSON.stringify(INITIAL_PACKAGES));
  }
  if (!localStorage.getItem(KEYS.THEMES)) {
    localStorage.setItem(KEYS.THEMES, JSON.stringify(INITIAL_THEMES));
  }
  if (!localStorage.getItem(KEYS.BOOKINGS)) {
    localStorage.setItem(KEYS.BOOKINGS, JSON.stringify(INITIAL_BOOKINGS));
  }
};

export const storageService = {
  // Packages CRUD
  getPackages(): Package[] {
    initStorage();
    try {
      const data = localStorage.getItem(KEYS.PACKAGES);
      return data ? JSON.parse(data) : INITIAL_PACKAGES;
    } catch {
      return INITIAL_PACKAGES;
    }
  },

  getPackageById(id: string): Package | undefined {
    return this.getPackages().find(p => p.id === id);
  },

  savePackage(pkg: Package): Package[] {
    const packages = this.getPackages();
    const existingIndex = packages.findIndex(p => p.id === pkg.id);
    
    let updated: Package[];
    if (existingIndex >= 0) {
      updated = [...packages];
      updated[existingIndex] = pkg;
    } else {
      updated = [pkg, ...packages];
    }
    
    localStorage.setItem(KEYS.PACKAGES, JSON.stringify(updated));
    return updated;
  },

  deletePackage(id: string): Package[] {
    const packages = this.getPackages().filter(p => p.id !== id);
    localStorage.setItem(KEYS.PACKAGES, JSON.stringify(packages));
    return packages;
  },

  // Themes CRUD
  getThemes(): Theme[] {
    initStorage();
    try {
      const data = localStorage.getItem(KEYS.THEMES);
      return data ? JSON.parse(data) : INITIAL_THEMES;
    } catch {
      return INITIAL_THEMES;
    }
  },

  getThemeById(id: string): Theme | undefined {
    return this.getThemes().find(t => t.id === id);
  },

  // Bookings CRUD
  getBookings(): Booking[] {
    initStorage();
    try {
      const data = localStorage.getItem(KEYS.BOOKINGS);
      return data ? JSON.parse(data) : INITIAL_BOOKINGS;
    } catch {
      return INITIAL_BOOKINGS;
    }
  },

  createBooking(bookingInput: {
    package_id: string;
    package_name: string;
    theme_id: string;
    theme_name: string;
    birthday_person_name: string;
    customer_name: string;
    email: string;
    phone: string;
    event_date: string;
    guests: number;
    selected_addons?: string[];
    addons_price?: number;
    promo_code?: string;
    discount_amount?: number;
    special_request?: string;
    estimated_price: number;
  }): Booking {
    const bookings = this.getBookings();
    const newId = `BK-${Math.floor(1000 + Math.random() * 9000)}`;
    const newBooking: Booking = {
      ...bookingInput,
      id: newId,
      user_id: 'usr-1',
      status: 'Pending',
      created_at: new Date().toISOString()
    };

    const updated = [newBooking, ...bookings];
    localStorage.setItem(KEYS.BOOKINGS, JSON.stringify(updated));
    return newBooking;
  },

  updateBookingStatus(id: string, status: BookingStatus): Booking[] {
    const bookings = this.getBookings();
    const updated = bookings.map(b => b.id === id ? { ...b, status } : b);
    localStorage.setItem(KEYS.BOOKINGS, JSON.stringify(updated));
    return updated;
  },

  resetAllData(): void {
    localStorage.setItem(KEYS.PACKAGES, JSON.stringify(INITIAL_PACKAGES));
    localStorage.setItem(KEYS.THEMES, JSON.stringify(INITIAL_THEMES));
    localStorage.setItem(KEYS.BOOKINGS, JSON.stringify(INITIAL_BOOKINGS));
  }
};
