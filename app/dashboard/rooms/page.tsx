"use client";

import { AuthProvider } from '@/lib/auth-context';
import DashboardRoomsPage from '@/components/pages/dashboard-rooms-page';

export default function DashboardRooms() {
  return (
    <AuthProvider>
      <DashboardRoomsPage />
    </AuthProvider>
  );
}