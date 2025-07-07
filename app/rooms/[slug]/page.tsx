import { notFound } from "next/navigation";
import { mockRooms } from '@/lib/data';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import RoomHeader from '@/components/room/room-header';
import RoomGallery from '@/components/room/room-gallery';
import RoomInfo from '@/components/room/room-info';
import { AuthProvider } from "@/lib/auth-context";
import { Room } from "@/lib/types";


export function generateStaticParams() {
  return mockRooms.map(room => ({
    slug: room.slug,
  }));
}

export default function RoomDetailPage({ params }: { params: { slug: string } }) {
  const room = mockRooms.find((r) => r.slug === params.slug);

  if (!room) return notFound();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AuthProvider>
      <Navbar />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-10">
          <RoomHeader room={room} />
          <div className="flex flex-col md:flex-row gap-10">
            {room.images && <RoomGallery images={room.images} name={room.name} />}
            <RoomInfo room={room} />
          </div>
        </div>
      </main>
        <Footer />
        </AuthProvider>
    </div>
  );
}