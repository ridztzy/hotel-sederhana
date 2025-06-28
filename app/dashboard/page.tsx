"use client";

import { AuthProvider } from '@/lib/auth-context';
import DashboardPage from '@/components/pages/dashboard-page';

export default function Dashboard() {
  return (
    <AuthProvider>
      <DashboardPage />
    </AuthProvider>
  );
}