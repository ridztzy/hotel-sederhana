"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Room } from '@/lib/types';
import { Star, Users, Maximize } from 'lucide-react';

interface RoomCardProps {
  room: Room;
}

// Fungsi bantuan untuk format mata uang
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(amount);
};

// Fungsi bantuan untuk menerjemahkan tipe kamar
const translateRoomType = (type: Room['type']) => {
  const types: { [key: string]: string } = {
    standard: 'Standar',
    deluxe: 'Deluxe',
    suite: 'Suite',
    presidential: 'Presidential',
  };
  return types[type] || type.charAt(0).toUpperCase() + type.slice(1);
}

export default function KartuKamar({ room }: RoomCardProps) {
  return (
    <Card className="group overflow-hidden hover:shadow-xl transisi-semua durasi-300 hover:-translate-y-1">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={room.images[0]}
          alt={room.name}
          fill
          className="object-cover transisi-transform durasi-300 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4">
          <Badge 
            variant={room.available ? "default" : "secondary"}
            className="bg-white/90 text-gray-900 hover:bg-white/80 shadow-md"
          >
            {room.available ? 'Tersedia' : 'Dipesan'}
          </Badge>
        </div>
        <div className="absolute top-4 right-4">
          <Badge variant="outline" className="bg-white/90 text-gray-900 border-white/20 shadow-md">
            {translateRoomType(room.type)}
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-bold group-hover:text-primary transisi-warna">
              {room.name}
            </h3>
            <p className="text-muted-foreground mt-1 line-clamp-2 h-10">
              {room.shortDescription}
            </p>
          </div>

          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span>{room.maxGuests} tamu</span>
            </div>
            <div className="flex items-center space-x-1">
              <Maximize className="h-4 w-4" />
              <span>{room.size} m²</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="ml-1 font-medium">{room.rating.toFixed(1)}</span>
            </div>
            <span className="text-muted-foreground">({room.reviewCount} ulasan)</span>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div>
              <span className="text-2xl font-bold text-primary">{formatCurrency(room.price)}</span>
              <span className="text-muted-foreground">/malam</span>
            </div>
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link href={`/rooms/${room.slug}`}>
                Lihat Detail
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
