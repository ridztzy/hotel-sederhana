"use client";

import { AuthProvider } from '@/lib/auth-context';
import DashboardBookingsPage from '@/components/pages/dashboard-bookings-page';

export default function DashboardBookings() {
  return (
    <AuthProvider>
      <DashboardBookingsPage />
    </AuthProvider>
  );
}