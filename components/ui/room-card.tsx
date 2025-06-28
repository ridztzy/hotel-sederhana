"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Room } from '@/lib/types';
import { Star, Users, Maximize, MapPin } from 'lucide-react';

interface RoomCardProps {
  room: Room;
}

export default function RoomCard({ room }: RoomCardProps) {
  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={room.images[0]}
          alt={room.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4">
          <Badge 
            variant={room.available ? "default" : "secondary"}
            className="bg-white/90 text-gray-900 hover:bg-white/80"
          >
            {room.available ? 'Available' : 'Booked'}
          </Badge>
        </div>
        <div className="absolute top-4 right-4">
          <Badge variant="outline" className="bg-white/90 text-gray-900 border-white/20">
            {room.type.charAt(0).toUpperCase() + room.type.slice(1)}
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
              {room.name}
            </h3>
            <p className="text-muted-foreground mt-1 line-clamp-2">
              {room.shortDescription}
            </p>
          </div>

          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span>{room.maxGuests} guests</span>
            </div>
            <div className="flex items-center space-x-1">
              <Maximize className="h-4 w-4" />
              <span>{room.size} sq ft</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="ml-1 font-medium">{room.rating}</span>
            </div>
            <span className="text-muted-foreground">({room.reviewCount} reviews)</span>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div>
              <span className="text-2xl font-bold text-primary">${room.price}</span>
              <span className="text-muted-foreground">/night</span>
            </div>
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link href={`/room/${room.slug}`}>
                View Details
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}