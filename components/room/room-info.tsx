import { Card, CardContent } from '@/components/ui/card';
import { Users, Maximize } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function RoomInfo({ room }: { room: any }) {
  return (
    <div className="md:w-1/2 flex flex-col justify-between">
      <Card>
        <CardContent className="p-6 flex flex-col h-full">
          <div className="mb-4">
            <p className="text-muted-foreground">{room.description}</p>
          </div>
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-2 bg-muted px-3 py-1 rounded-full text-sm">
              <Users className="w-4 h-4" /> {room.maxGuests} Guests
            </div>
            <div className="flex items-center gap-2 bg-muted px-3 py-1 rounded-full text-sm">
              <Maximize className="w-4 h-4" /> {room.size} sq ft
            </div>
            {room.features?.map((f: string, i: number) => (
              <div key={i} className="flex items-center gap-2 bg-muted px-3 py-1 rounded-full text-sm">
                {f}
              </div>
            ))}
          </div>
          <div className="text-2xl font-bold text-primary mb-6">
            Rp{room.price.toLocaleString("id-ID")}/malam
          </div>
          <Button size="lg" className="w-full md:w-auto mt-auto">
            Pesan Sekarang
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}