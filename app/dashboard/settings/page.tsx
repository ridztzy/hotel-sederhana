"use client";

import { AuthProvider } from '@/lib/auth-context';
import DashboardSettingsPage from '@/components/pages/dashboard-settings-page';

export default function Settings() {
  return (
    <AuthProvider>
      <DashboardSettingsPage />
    </AuthProvider>
  );
}