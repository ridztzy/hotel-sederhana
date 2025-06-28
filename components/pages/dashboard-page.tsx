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
  Settings
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated || !isAdmin) {
    return null;
  }

  const stats = [
    {
      title: 'Total Bookings',
      value: mockStats.totalBookings,
      icon: Calendar,
      description: 'All time bookings',
      trend: '+12%'
    },
    {
      title: 'Total Revenue',
      value: `$${mockStats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      description: 'Total earnings',
      trend: '+8%'
    },
    {
      title: 'Occupancy Rate',
      value: `${mockStats.occupancyRate}%`,
      icon: Users,
      description: 'Current occupancy',
      trend: '+5%'
    },
    {
      title: 'Average Rating',
      value: mockStats.averageRating,
      icon: Star,
      description: 'Guest satisfaction',
      trend: '+0.2'
    }
  ];

  const quickActions = [
    {
      title: 'Manage Rooms',
      description: 'Add, edit, or remove room listings',
      icon: Hotel,
      href: '/dashboard/rooms',
      color: 'bg-blue-500'
    },
    {
      title: 'View Bookings',
      description: 'Manage customer reservations',
      icon: ClipboardList,
      href: '/dashboard/bookings',
      color: 'bg-emerald-500'
    },
    {
      title: 'Settings',
      description: 'Configure system settings',
      icon: Settings,
      href: '/dashboard/settings',
      color: 'bg-purple-500'
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {user?.name}. Here's what's happening at LuxeStay.
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
                <Card>
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
            <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {quickActions.map((action, index) => (
                <motion.div
                  key={action.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <div className="flex items-center space-x-4">
                        <div className={`p-2 rounded-lg ${action.color}`}>
                          <action.icon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{action.title}</CardTitle>
                          <CardDescription>{action.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Button asChild className="w-full">
                        <Link href={action.href}>
                          Go to {action.title}
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Bookings</CardTitle>
                <CardDescription>Latest customer reservations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium">Presidential Suite</p>
                      <p className="text-sm text-muted-foreground">John Smith</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">$2,500</p>
                      <p className="text-sm text-muted-foreground">Jan 15-18</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium">Luxury Suite</p>
                      <p className="text-sm text-muted-foreground">Michael Brown</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">$1,200</p>
                      <p className="text-sm text-muted-foreground">Jan 25-28</p>
                    </div>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4" asChild>
                  <Link href="/dashboard/bookings">View All Bookings</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Room Status</CardTitle>
                <CardDescription>Current room availability</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Total Rooms</span>
                    <span className="font-medium">6</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Available</span>
                    <span className="font-medium text-emerald-600">5</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Occupied</span>
                    <span className="font-medium text-blue-600">1</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Maintenance</span>
                    <span className="font-medium text-orange-600">0</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4" asChild>
                  <Link href="/dashboard/rooms">Manage Rooms</Link>
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