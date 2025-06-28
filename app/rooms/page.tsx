"use client";

import { AuthProvider } from '@/lib/auth-context';
import RoomsPage from '@/components/pages/rooms-page';

export default function Rooms() {
  return (
    <AuthProvider>
      <RoomsPage />
    </AuthProvider>
  );
}