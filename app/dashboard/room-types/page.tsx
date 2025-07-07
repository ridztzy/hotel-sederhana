"use client";

import { AuthProvider } from '@/lib/auth-context';
import DashboardTypesPage from '@/components/pages/dashboard-room-types-page';

export default function DashboardTypes() {
  return (
    <AuthProvider>
      <DashboardTypesPage />
    </AuthProvider>
  );
}