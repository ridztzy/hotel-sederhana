import { AuthProvider } from '@/lib/auth-context';
import RoomDetailClient from '@/components/pages/room-detail-client';
import { mockRooms } from '@/lib/data';

export async function generateStaticParams() {
  return mockRooms.map((room) => ({
    slug: room.slug,
  }));
}

export default function RoomPage() {
  return (
    <AuthProvider>
      <RoomDetailClient />
    </AuthProvider>
  );
}