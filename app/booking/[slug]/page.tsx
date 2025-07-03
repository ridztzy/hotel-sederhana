import { mockRooms, mockBookings } from '@/lib/data';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return mockBookings.map((booking) => ({
    slug: booking.roomId, // atau booking.id, sesuaikan dengan dynamic param kamu
  }));
}

export default function BookingPage({ params }: { params: { slug: string } }) {
  const room = mockRooms.find((r) => r.slug === params.slug);

  if (!room) return notFound();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-10 max-w-2xl">
          <h1 className="text-3xl font-bold mb-4">Booking {room.name}</h1>
          <div className="mb-6">
            <div className="text-muted-foreground">{room.description}</div>
            <div className="mt-2 font-semibold text-primary">
              Rp{room.price.toLocaleString("id-ID")}/malam
            </div>
          </div>
          <form className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Nama Lengkap</label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Tanggal Check-in</label>
              <input
                type="date"
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Tanggal Check-out</label>
              <input
                type="date"
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Jumlah Tamu</label>
              <input
                type="number"
                min={1}
                max={room.maxGuests}
                defaultValue={1}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-white py-2 rounded font-semibold hover:bg-primary/90 transition"
            >
              Konfirmasi Booking
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}