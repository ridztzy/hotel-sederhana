"use client";

import { AuthProvider } from '@/lib/auth-context';
import BookingsPage from '@/components/pages/bookings-page';

export default function Bookings() {
  return (
    <AuthProvider>
      <BookingsPage />
    </AuthProvider>
  );
}