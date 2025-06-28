"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import RoomCard from '@/components/ui/room-card';
import { mockRooms } from '@/lib/data';
import { Room } from '@/lib/types';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';

export default function RoomsPage() {
  const searchParams = useSearchParams();
  const [filteredRooms, setFilteredRooms] = useState<Room[]>(mockRooms);
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter states
  const [checkIn, setCheckIn] = useState(searchParams.get('checkin') || '');
  const [checkOut, setCheckOut] = useState(searchParams.get('checkout') || '');
  const [guests, setGuests] = useState(searchParams.get('guests') || 'all');
  const [roomType, setRoomType] = useState(searchParams.get('type') || 'all');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  useEffect(() => {
    filterRooms();
  }, [checkIn, checkOut, guests, roomType, priceRange, sortBy]);

  const filterRooms = () => {
    let filtered = [...mockRooms];

    // Filter by room type
    if (roomType !== 'all') {
      filtered = filtered.filter(room => room.type === roomType);
    }

    // Filter by guests
    if (guests !== 'all') {
      const guestCount = parseInt(guests);
      filtered = filtered.filter(room => room.maxGuests >= guestCount);
    }

    // Filter by price range
    if (priceRange !== 'all') {
      switch (priceRange) {
        case 'budget':
          filtered = filtered.filter(room => room.price <= 400);
          break;
        case 'mid':
          filtered = filtered.filter(room => room.price > 400 && room.price <= 1000);
          break;
        case 'luxury':
          filtered = filtered.filter(room => room.price > 1000);
          break;
      }
    }

    // Sort rooms
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'size':
        filtered.sort((a, b) => b.size - a.size);
        break;
      default:
        // Featured (default order)
        break;
    }

    setFilteredRooms(filtered);
  };

  const clearFilters = () => {
    setCheckIn('');
    setCheckOut('');
    setGuests('all');
    setRoomType('all');
    setPriceRange('all');
    setSortBy('featured');
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Header */}
      <section className="bg-gradient-to-r from-primary/10 to-blue-600/10 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Rooms & Suites</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover the perfect accommodation for your stay. From elegant standard rooms to luxurious presidential suites.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-80">
            <div className="flex items-center justify-between mb-6 lg:hidden">
              <h2 className="text-xl font-semibold">Filters</h2>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                {showFilters ? 'Hide' : 'Show'} Filters
              </Button>
            </div>

            <div className={`space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Search Dates</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="checkin">Check-in</Label>
                      <Input
                        id="checkin"
                        type="date"
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="checkout">Check-out</Label>
                      <Input
                        id="checkout"
                        type="date"
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Room Details</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Guests</Label>
                      <Select value={guests} onValueChange={setGuests}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Any Number</SelectItem>
                          <SelectItem value="1">1 Guest</SelectItem>
                          <SelectItem value="2">2 Guests</SelectItem>
                          <SelectItem value="3">3 Guests</SelectItem>
                          <SelectItem value="4">4+ Guests</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Room Type</Label>
                      <Select value={roomType} onValueChange={setRoomType}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Types</SelectItem>
                          <SelectItem value="standard">Standard</SelectItem>
                          <SelectItem value="deluxe">Deluxe</SelectItem>
                          <SelectItem value="suite">Suite</SelectItem>
                          <SelectItem value="presidential">Presidential</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Price Range</Label>
                      <Select value={priceRange} onValueChange={setPriceRange}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Prices</SelectItem>
                          <SelectItem value="budget">Under $400</SelectItem>
                          <SelectItem value="mid">$400 - $1,000</SelectItem>
                          <SelectItem value="luxury">$1,000+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button onClick={clearFilters} variant="outline" className="w-full">
                Clear All Filters
              </Button>
            </div>
          </div>

          {/* Results */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold">Available Rooms</h2>
                <p className="text-muted-foreground">
                  {filteredRooms.length} room{filteredRooms.length !== 1 ? 's' : ''} found
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <Label htmlFor="sort">Sort by:</Label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="size">Largest First</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {filteredRooms.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No rooms found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your filters to see more options.
                  </p>
                  <Button onClick={clearFilters}>Clear Filters</Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredRooms.map((room, index) => (
                  <motion.div
                    key={room.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <RoomCard room={room} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}