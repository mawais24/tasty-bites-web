export type Dietary = "vegetarian" | "vegan" | "gluten-free";
export type MenuBadge = "popular" | "chef-special" | "new" | "signature";

export interface MenuCategoryRow {
  id: string;
  slug: string;
  name: string;
  tab_label: string | null;
  description: string | null;
  note: string | null;
  highlight: boolean;
  flavours: string[] | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface MenuItemRow {
  id: string;
  category_id: string;
  name: string;
  description: string | null;
  price: number;
  price_display: string | null;
  badge: MenuBadge | null;
  dietary: Dietary[];
  image_url: string | null;
  is_featured: boolean;
  display_order: number;
  is_available: boolean;
  created_at: string;
  updated_at: string;
}

export type BookingStatus = "pending" | "confirmed" | "cancelled";

export interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  booking_date: string;
  booking_time: string;
  party_size: number;
  special_requests: string | null;
  status: BookingStatus;
  created_at: string;
  updated_at: string;
}

export type DateOverrideMode = "manual" | "fully_booked" | "closed";

export interface BookingDateOverride {
  id: string;
  date: string;
  mode: DateOverrideMode;
  note: string | null;
  created_at: string;
  updated_at: string;
}

export interface BookingTimeSlot {
  id: string;
  time: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
}

export interface RestaurantSettings {
  id: number;
  closed_weekdays: number[];
  updated_at: string;
}
