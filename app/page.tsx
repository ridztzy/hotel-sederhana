"use client";

import { AuthProvider } from '@/lib/auth-context';
import HomePage from '@/components/pages/home-page';

export default function Home() {
  return (
    <AuthProvider>
      <HomePage />
    </AuthProvider>
  );
}