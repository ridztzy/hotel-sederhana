import { Room, Booking, User, BookingStats } from './types';

// Data kamar contoh
export const mockRooms: Room[] = [
  {
    id: '1',
    slug: 'presidential-suite',
    name: 'Presidential Suite',
    type: 'presidential',
    price: 2500000, // Harga dalam Rupiah
    description: 'Rasakan puncak kemewahan di Presidential Suite kami. Suite seluas 2.000 kaki persegi ini memiliki ruang tamu terpisah, kamar mandi marmer dengan jacuzzi, balkon pribadi dengan pemandangan kota, dan layanan butler pribadi.',
    shortDescription: 'Kemewahan tertinggi dengan layanan butler dan pemandangan kota panoramik',
    images: [
      'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg',
      'https://images.pexels.com/photos/237371/pexels-photo-237371.jpeg',
      'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg'
    ],
    amenities: ['Kasur King', 'Ruang Tamu', 'Kamar Mandi Marmer', 'Jacuzzi', 'Layanan Butler', 'Balkon Pribadi', 'Mini Bar', 'Pemandangan Kota'],
    maxGuests: 4,
    size: 2000,
    available: true,
    rating: 4.9,
    reviewCount: 127,
    features: ['Layanan Butler 24/7', 'Pemandangan Kota Premium', 'Finishing Marmer', 'Ruang Tamu Terpisah']
  },
  {
    id: '2',
    slug: 'luxury-suite',
    name: 'Luxury Suite',
    type: 'suite',
    price: 1200000, // Harga dalam Rupiah
    description: 'Luxury Suite kami menawarkan kenyamanan mewah dengan kamar tidur dan ruang tamu terpisah. Dilengkapi furnitur premium, kamar mandi marmer, dan pemandangan indah kota.',
    shortDescription: 'Suite luas dengan ruang tamu terpisah dan fasilitas premium',
    images: [
      'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg',
      'https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg',
      'https://images.pexels.com/photos/237371/pexels-photo-237371.jpeg'
    ],
    amenities: ['Kasur King', 'Ruang Tamu', 'Kamar Mandi Marmer', 'Mini Bar', 'Meja Kerja', 'Pemandangan Kota', 'WiFi Premium'],
    maxGuests: 3,
    size: 800,
    available: true,
    rating: 4.7,
    reviewCount: 89,
    features: ['Ruang Tamu Terpisah', 'Furnitur Premium', 'Pemandangan Kota', 'Ruang Kerja']
  },
  {
    id: '3',
    slug: 'deluxe-room',
    name: 'Deluxe Room',
    type: 'deluxe',
    price: 450000, // Harga dalam Rupiah
    description: 'Deluxe Room yang elegan dengan fasilitas modern, area duduk nyaman, dan pemandangan indah. Cocok untuk pebisnis dan pasangan yang mencari kenyamanan dan gaya.',
    shortDescription: 'Kenyamanan modern dengan furnitur elegan dan pemandangan kota',
    images: [
      'https://images.pexels.com/photos/262047/pexels-photo-262047.jpeg',
      'https://images.pexels.com/photos/271643/pexels-photo-271643.jpeg',
      'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg'
    ],
    amenities: ['Kasur Queen', 'Area Duduk', 'Meja Kerja', 'Kulkas Mini', 'Pembuat Kopi', 'Pemandangan Kota', 'WiFi Premium'],
    maxGuests: 2,
    size: 400,
    available: true,
    rating: 4.5,
    reviewCount: 234,
    features: ['Desain Modern', 'Area Duduk Nyaman', 'Fasilitas Bisnis', 'Lokasi Premium']
  },
  {
    id: '4',
    slug: 'standard-room',
    name: 'Standard Room',
    type: 'standard',
    price: 280000, // Harga dalam Rupiah
    description: 'Standard Room yang nyaman dan lengkap dengan semua fasilitas penting. Desain kontemporer, tempat tidur nyaman, dan lokasi strategis di dalam hotel.',
    shortDescription: 'Akomodasi nyaman dengan desain kontemporer',
    images: [
      'https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg',
      'https://images.pexels.com/photos/262047/pexels-photo-262047.jpeg',
      'https://images.pexels.com/photos/271643/pexels-photo-271643.jpeg'
    ],
    amenities: ['Kasur Queen', 'Meja Kerja', 'Kulkas Mini', 'Pembuat Kopi', 'WiFi', 'AC'],
    maxGuests: 2,
    size: 300,
    available: true,
    rating: 4.2,
    reviewCount: 156,
    features: ['Desain Kontemporer', 'Fasilitas Esensial', 'Tempat Tidur Nyaman', 'Harga Terjangkau']
  },
  {
    id: '5',
    slug: 'ocean-view-suite',
    name: 'Ocean View Suite',
    type: 'suite',
    price: 1800000, // Harga dalam Rupiah
    description: 'Ocean View Suite dengan jendela panorama, teras pribadi, dan fasilitas mewah. Nikmati matahari terbit yang indah langsung dari kamar Anda.',
    shortDescription: 'Pemandangan laut menakjubkan dengan teras pribadi',
    images: [
      'https://images.pexels.com/photos/237371/pexels-photo-237371.jpeg',
      'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg',
      'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg'
    ],
    amenities: ['Kasur King', 'Pemandangan Laut', 'Teras Pribadi', 'Ruang Tamu', 'Mini Bar', 'Jacuzzi', 'WiFi Premium'],
    maxGuests: 4,
    size: 1200,
    available: true,
    rating: 4.8,
    reviewCount: 73,
    features: ['Pemandangan Laut Panorama', 'Teras Pribadi', 'Fasilitas Mewah', 'Suasana Romantis']
  },
  {
    id: '6',
    slug: 'garden-deluxe',
    name: 'Garden Deluxe',
    type: 'deluxe',
    price: 520000, // Harga dalam Rupiah
    description: 'Garden Deluxe yang tenang menghadap taman indah kami. Dilengkapi teras pribadi, furnitur elegan, dan pemandangan taman yang asri.',
    shortDescription: 'Pemandangan taman asri dengan teras pribadi',
    images: [
      'https://images.pexels.com/photos/271643/pexels-photo-271643.jpeg',
      'https://images.pexels.com/photos/262047/pexels-photo-262047.jpeg',
      'https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg'
    ],
    amenities: ['Kasur King', 'Pemandangan Taman', 'Teras Pribadi', 'Area Duduk', 'Mini Bar', 'Meja Kerja', 'WiFi'],
    maxGuests: 2,
    size: 450,
    available: false,
    rating: 4.6,
    reviewCount: 91,
    features: ['Pemandangan Taman', 'Teras Pribadi', 'Suasana Tenang', 'Desain Elegan']
  }
];

// Data pemesanan contoh
export const mockBookings: Booking[] = [
  {
    id: 'b1',
    roomId: '1',
    roomName: 'Presidential Suite',
    userId: 'u1',
    guestName: 'John Smith',
    guestEmail: 'john.smith@email.com',
    guestPhone: '+62 812 3456 7890',
    checkIn: '2024-01-15',
    checkOut: '2024-01-18',
    guests: 2,
    totalPrice: 7500000, // Harga dalam Rupiah
    status: 'confirmed',
    paymentStatus: 'paid',
    createdAt: '2024-01-10T10:00:00Z',
    specialRequests: 'Permintaan checkout lebih lambat'
  },
  {
    id: 'b2',
    roomId: '3',
    roomName: 'Deluxe Room',
    userId: 'u2',
    guestName: 'Sarah Johnson',
    guestEmail: 'sarah.j@email.com',
    guestPhone: '+62 813 2345 6789',
    checkIn: '2024-01-20',
    checkOut: '2024-01-22',
    guests: 1,
    totalPrice: 900000, // Harga dalam Rupiah
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
    guestPhone: '+62 814 1234 5678',
    checkIn: '2024-01-25',
    checkOut: '2024-01-28',
    guests: 3,
    totalPrice: 3600000, // Harga dalam Rupiah
    status: 'confirmed',
    paymentStatus: 'paid',
    createdAt: '2024-01-13T09:15:00Z',
    specialRequests: 'Tempat tidur tambahan untuk anak'
  }
];

// Data pengguna contoh
export const mockUsers: User[] = [
  {
    id: 'u1',
    name: 'John Smith',
    email: 'john.smith@email.com',
    role: 'customer',
    phone: '+62 812 3456 7890'
  },
  {
    id: 'admin1',
    name: 'Admin User',
    email: 'admin@luxestay.com',
    role: 'admin'
  }
];

// Statistik pemesanan contoh
export const mockStats: BookingStats = {
  totalBookings: 156, // Total Pemesanan
  totalRevenue: 234580000, // Total Pendapatan (dalam Rupiah)
  occupancyRate: 78.5, // Tingkat Hunian (%)
  averageRating: 4.6, // Rata-rata Rating
  pendingBookings: 12, // Pemesanan Menunggu
  confirmedBookings: 89, // Pemesanan Terkonfirmasi
  monthlyRevenue: [
    { month: 'Jan', revenue: 45000000 }, // Jan, Pendapatan: 45.000.000
    { month: 'Feb', revenue: 52000000 }, // Feb, Pendapatan: 52.000.000
    { month: 'Mar', revenue: 48000000 }, // Mar, Pendapatan: 48.000.000
    { month: 'Apr', revenue: 61000000 }, // Apr, Pendapatan: 61.000.000
    { month: 'Mei', revenue: 58000000 }, // Mei, Pendapatan: 58.000.000
    { month: 'Jun', revenue: 65000000 }  // Jun, Pendapatan: 65.000.000
  ],
  roomTypeBookings: [
    { type: 'Standar', count: 45 }, // Tipe Standar, 45 pemesanan
    { type: 'Deluxe', count: 38 },   // Tipe Deluxe, 38 pemesanan
    { type: 'Suite', count: 25 },    // Tipe Suite, 25 pemesanan
    { type: 'Presidential', count: 8 } // Tipe Presidential, 8 pemesanan
  ]
};