"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import { useAuth } from '@/lib/auth-context';
import { mockStats } from '@/lib/data';
import { 
  Users, 
  DollarSign, 
  Calendar, 
  Star, 
  TrendingUp, 
  Hotel,
  ClipboardList,
  Settings,
  BedDouble,
  Plus
} from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const { user, isAuthenticated, isAdmin, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!isAuthenticated || !isAdmin)) {
      router.push('/login');
    }
  }, [isAuthenticated, isAdmin, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  if (!isAuthenticated || !isAdmin) {
    return null;
  }

  const stats = [
    {
      title: 'Total Pemesanan',
      value: mockStats.totalBookings,
      icon: Calendar,
      description: 'Total pemesanan sepanjang waktu',
      trend: '+12%'
    },
    {
      title: 'Total Pendapatan',
      value: `Rp${mockStats.totalRevenue.toLocaleString("id-ID")}`,
      icon: DollarSign,
      description: 'Total pendapatan',
      trend: '+8%'
    },
    {
      title: 'Tingkat Hunian',
      value: `${mockStats.occupancyRate}%`,
      icon: Users,
      description: 'Tingkat hunian saat ini',
      trend: '+5%'
    },
    {
      title: 'Rata-rata Rating',
      value: mockStats.averageRating,
      icon: Star,
      description: 'Kepuasan tamu',
      trend: '+0.2'
    }
  ];

  const quickActions = [
    {
      title: 'Kelola Kamar',
      description: 'Tambah, edit, atau hapus data kamar',
      icon: Hotel,
      href: '/dashboard/rooms',
      color: 'bg-blue-500'
    },
    {
      title: 'Kelola Data',
      description: 'Kelola kategori kamar & harga',
      icon: BedDouble,
      href: '/dashboard/room-types',
      color: 'bg-amber-500'
    },
    {
      title: 'Lihat Pemesanan',
      description: 'Kelola reservasi pelanggan',
      icon: ClipboardList,
      href: '/dashboard/bookings',
      color: 'bg-emerald-500'
    },
    {
      title: 'Pengaturan',
      description: 'Konfigurasi sistem',
      icon: Settings,
      href: '/dashboard/settings',
      color: 'bg-purple-500'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Dasbor Admin</h1>
            <p className="text-muted-foreground">
              Selamat datang kembali, <span className="text-amber-600 font-medium">{user?.name}</span>. Berikut ringkasan aktivitas di LuxeStay.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="hover:shadow-md transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {stat.title}
                    </CardTitle>
                    <stat.icon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-emerald-600 flex items-center">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        {stat.trend}
                      </span>
                      {stat.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Aksi Cepat</h2>
              
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickActions.map((action, index) => (
                <motion.div
                  key={action.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-shadow">
                    <Link href={action.href}>
                      <CardHeader>
                        <div className="flex items-center space-x-4">
                          <div className={`p-3 rounded-lg ${action.color}`}>
                            <action.icon className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{action.title}</CardTitle>
                            <CardDescription>{action.description}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <Button className="w-full" variant="outline">
                          Kelola
                        </Button>
                      </CardContent>
                    </Link>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Pemesanan Terbaru</CardTitle>
                <CardDescription>Reservasi pelanggan terbaru</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { room: 'Presidential Suite', guest: 'John Smith', price: 'Rp2.500.000', date: '15-18 Jan' },
                    { room: 'Luxury Suite', guest: 'Michael Brown', price: 'Rp1.200.000', date: '25-28 Jan' },
                    { room: 'Deluxe Room', guest: 'Sarah Johnson', price: 'Rp850.000', date: '2-5 Feb' }
                  ].map((booking, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors"
                    >
                      <div>
                        <p className="font-medium">{booking.room}</p>
                        <p className="text-sm text-muted-foreground">{booking.guest}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{booking.price}</p>
                        <p className="text-sm text-muted-foreground">{booking.date}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4" asChild>
                  <Link href="/dashboard/bookings">Lihat Semua Pemesanan</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Status Kamar</CardTitle>
                <CardDescription>Ketersediaan kamar saat ini</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { label: 'Total Kamar', value: '6', color: 'text-foreground' },
                    { label: 'Tersedia', value: '5', color: 'text-emerald-600' },
                    { label: 'Terisi', value: '1', color: 'text-blue-600' },
                    { label: 'Perawatan', value: '0', color: 'text-orange-600' }
                  ].map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-3 hover:bg-muted/50 rounded-lg transition-colors"
                    >
                      <span>{item.label}</span>
                      <span className={`font-medium ${item.color}`}>{item.value}</span>
                    </motion.div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4" asChild>
                  <Link href="/dashboard/rooms">Kelola Kamar</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}