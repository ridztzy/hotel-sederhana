import { Room, Booking, User, BookingStats } from './types';

export const mockRooms: Room[] = [
  {
    id: '1',
    slug: 'presidential-suite',
    name: 'Presidential Suite',
    type: 'presidential',
    price: 2500,
    description: 'Experience the pinnacle of luxury in our Presidential Suite. This expansive 2,000 sq ft suite features a separate living area, marble bathroom with jacuzzi, private balcony with city views, and personalized butler service.',
    shortDescription: 'Ultimate luxury with butler service and panoramic city views',
    images: [
      'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg',
      'https://images.pexels.com/photos/237371/pexels-photo-237371.jpeg',
      'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg'
    ],
    amenities: ['King Bed', 'Living Area', 'Marble Bathroom', 'Jacuzzi', 'Butler Service', 'Private Balcony', 'Mini Bar', 'City View'],
    maxGuests: 4,
    size: 2000,
    available: true,
    rating: 4.9,
    reviewCount: 127,
    features: ['24/7 Butler Service', 'Premium City Views', 'Marble Finishes', 'Separate Living Area']
  },
  {
    id: '2',
    slug: 'luxury-suite',
    name: 'Luxury Suite',
    type: 'suite',
    price: 1200,
    description: 'Our Luxury Suite offers sophisticated comfort with a separate bedroom and living area. Features include premium furnishings, marble bathroom, and stunning views of the city skyline.',
    shortDescription: 'Spacious suite with separate living area and premium amenities',
    images: [
      'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg',
      'https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg',
      'https://images.pexels.com/photos/237371/pexels-photo-237371.jpeg'
    ],
    amenities: ['King Bed', 'Living Area', 'Marble Bathroom', 'Mini Bar', 'Work Desk', 'City View', 'Premium WiFi'],
    maxGuests: 3,
    size: 800,
    available: true,
    rating: 4.7,
    reviewCount: 89,
    features: ['Separate Living Area', 'Premium Furnishings', 'City Views', 'Work Space']
  },
  {
    id: '3',
    slug: 'deluxe-room',
    name: 'Deluxe Room',
    type: 'deluxe',
    price: 450,
    description: 'Elegantly appointed Deluxe Room featuring modern amenities, comfortable seating area, and beautiful views. Perfect for business travelers and couples seeking comfort and style.',
    shortDescription: 'Modern comfort with elegant furnishings and city views',
    images: [
      'https://images.pexels.com/photos/262047/pexels-photo-262047.jpeg',
      'https://images.pexels.com/photos/271643/pexels-photo-271643.jpeg',
      'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg'
    ],
    amenities: ['Queen Bed', 'Seating Area', 'Work Desk', 'Mini Fridge', 'Coffee Maker', 'City View', 'Premium WiFi'],
    maxGuests: 2,
    size: 400,
    available: true,
    rating: 4.5,
    reviewCount: 234,
    features: ['Modern Design', 'Comfortable Seating', 'Business Amenities', 'Premium Location']
  },
  {
    id: '4',
    slug: 'standard-room',
    name: 'Standard Room',
    type: 'standard',
    price: 280,
    description: 'Comfortable and well-appointed Standard Room with all essential amenities. Features contemporary design, comfortable bedding, and convenient location within the hotel.',
    shortDescription: 'Comfortable accommodation with contemporary design',
    images: [
      'https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg',
      'https://images.pexels.com/photos/262047/pexels-photo-262047.jpeg',
      'https://images.pexels.com/photos/271643/pexels-photo-271643.jpeg'
    ],
    amenities: ['Queen Bed', 'Work Desk', 'Mini Fridge', 'Coffee Maker', 'WiFi', 'Air Conditioning'],
    maxGuests: 2,
    size: 300,
    available: true,
    rating: 4.2,
    reviewCount: 156,
    features: ['Contemporary Design', 'Essential Amenities', 'Comfortable Bedding', 'Great Value']
  },
  {
    id: '5',
    slug: 'ocean-view-suite',
    name: 'Ocean View Suite',
    type: 'suite',
    price: 1800,
    description: 'Breathtaking Ocean View Suite with panoramic windows, private terrace, and luxurious amenities. Wake up to stunning sunrise views over the ocean.',
    shortDescription: 'Stunning ocean views with private terrace',
    images: [
      'https://images.pexels.com/photos/237371/pexels-photo-237371.jpeg',
      'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg',
      'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg'
    ],
    amenities: ['King Bed', 'Ocean View', 'Private Terrace', 'Living Area', 'Mini Bar', 'Jacuzzi', 'Premium WiFi'],
    maxGuests: 4,
    size: 1200,
    available: true,
    rating: 4.8,
    reviewCount: 73,
    features: ['Panoramic Ocean Views', 'Private Terrace', 'Luxury Amenities', 'Romantic Setting']
  },
  {
    id: '6',
    slug: 'garden-deluxe',
    name: 'Garden Deluxe',
    type: 'deluxe',
    price: 520,
    description: 'Peaceful Garden Deluxe room overlooking our manicured gardens. Features a private patio, elegant furnishings, and serene garden views.',
    shortDescription: 'Serene garden views with private patio',
    images: [
      'https://images.pexels.com/photos/271643/pexels-photo-271643.jpeg',
      'https://images.pexels.com/photos/262047/pexels-photo-262047.jpeg',
      'https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg'
    ],
    amenities: ['King Bed', 'Garden View', 'Private Patio', 'Seating Area', 'Mini Bar', 'Work Desk', 'WiFi'],
    maxGuests: 2,
    size: 450,
    available: false,
    rating: 4.6,
    reviewCount: 91,
    features: ['Garden Views', 'Private Patio', 'Peaceful Setting', 'Elegant Design']
  }
];

export const mockBookings: Booking[] = [
  {
    id: 'b1',
    roomId: '1',
    roomName: 'Presidential Suite',
    userId: 'u1',
    guestName: 'John Smith',
    guestEmail: 'john.smith@email.com',
    guestPhone: '+1 234 567 8900',
    checkIn: '2024-01-15',
    checkOut: '2024-01-18',
    guests: 2,
    totalPrice: 7500,
    status: 'confirmed',
    paymentStatus: 'paid',
    createdAt: '2024-01-10T10:00:00Z',
    specialRequests: 'Late checkout requested'
  },
  {
    id: 'b2',
    roomId: '3',
    roomName: 'Deluxe Room',
    userId: 'u2',
    guestName: 'Sarah Johnson',
    guestEmail: 'sarah.j@email.com',
    guestPhone: '+1 234 567 8901',
    checkIn: '2024-01-20',
    checkOut: '2024-01-22',
    guests: 1,
    totalPrice: 900,
    status: 'pending',
    paymentStatus: 'pending',
    createdAt: '2024-01-12T14:30:00Z'
  },
  {
    id: 'b3',
    roomId: '2',
    roomName: 'Luxury Suite',
    userId: 'u3',
    guestName: 'Michael Brown',
    guestEmail: 'michael.brown@email.com',
    guestPhone: '+1 234 567 8902',
    checkIn: '2024-01-25',
    checkOut: '2024-01-28',
    guests: 3,
    totalPrice: 3600,
    status: 'confirmed',
    paymentStatus: 'paid',
    createdAt: '2024-01-13T09:15:00Z',
    specialRequests: 'Extra bed for child'
  }
];

export const mockUsers: User[] = [
  {
    id: 'u1',
    name: 'John Smith',
    email: 'john.smith@email.com',
    role: 'customer',
    phone: '+1 234 567 8900'
  },
  {
    id: 'admin1',
    name: 'Admin User',
    email: 'admin@luxestay.com',
    role: 'admin'
  }
];

export const mockStats: BookingStats = {
  totalBookings: 156,
  totalRevenue: 234580,
  occupancyRate: 78.5,
  averageRating: 4.6,
  pendingBookings: 12,
  confirmedBookings: 89,
  monthlyRevenue: [
    { month: 'Jan', revenue: 45000 },
    { month: 'Feb', revenue: 52000 },
    { month: 'Mar', revenue: 48000 },
    { month: 'Apr', revenue: 61000 },
    { month: 'May', revenue: 58000 },
    { month: 'Jun', revenue: 65000 }
  ],
  roomTypeBookings: [
    { type: 'Standard', count: 45 },
    { type: 'Deluxe', count: 38 },
    { type: 'Suite', count: 25 },
    { type: 'Presidential', count: 8 }
  ]
};