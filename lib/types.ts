export interface Room {
  id: string;
  slug: string;
  name: string;
  type: 'standard' | 'deluxe' | 'suite' | 'presidential';
  price: number;
  description: string;
  shortDescription: string;
  images: string[];
  amenities: string[];
  maxGuests: number;
  size: number;
  available: boolean;
  rating: number;
  reviewCount: number;
  features: string[];
}

export interface Booking {
  id: string;
  roomId: string;
  roomName: string;
  userId: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  paymentStatus: 'pending' | 'paid' | 'refunded';
  createdAt: string;
  specialRequests?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'admin';
  phone?: string;
  avatar?: string;
}

export interface BookingStats {
  totalBookings: number;
  totalRevenue: number;
  occupancyRate: number;
  averageRating: number;
  pendingBookings: number;
  confirmedBookings: number;
  monthlyRevenue: Array<{ month: string; revenue: number }>;
  roomTypeBookings: Array<{ type: string; count: number }>;
}