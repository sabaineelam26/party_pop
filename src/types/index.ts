export type BookingStatus = 'Pending' | 'Confirmed' | 'Cancelled';

export interface Package {
  id: string;
  name: string;
  description: string;
  full_description?: string;
  price: number;
  max_guests: number;
  image: string;
  includes: string[];
  category?: string;
  popular?: boolean;
}

export interface Theme {
  id: string;
  name: string;
  description: string;
  image: string;
  tag?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  tag: string;
}

export interface AddOn {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: string;
}

export interface PromoCode {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  description: string;
}

export interface Booking {
  id: string;
  user_id?: string;
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
  status: BookingStatus;
  estimated_price: number;
  created_at: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}
