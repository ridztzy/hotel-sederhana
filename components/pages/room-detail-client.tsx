"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import { useAuth } from '@/lib/auth-context';
import { mockRooms } from '@/lib/data';
import { Room } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { 
  ArrowLeft, 
  Star, 
  Users, 
  Square, 
  Wifi, 
  Car, 
  Coffee, 
  Dumbbell,
  Calendar,
  CreditCard,
  Check
} from 'lucide-react';

export default function RoomDetailClient() {
  const params = useParams();
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [room, setRoom] = useState<Room | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [specialRequests, setSpecialRequests] = useState('');
  const [showBookingDialog, setShowBookingDialog] = useState(false);
  const [isBooking, setIsBooking] = useState(false);

  useEffect(() => {
    if (params.slug) {
      const foundRoom = mockRooms.find(r => r.slug === params.slug);
      if (foundRoom) {
        setRoom(foundRoom);
      } else {
        router.push('/rooms');
      }
    }
  }, [params.slug, router]);

  const handleBooking = async () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to make a booking.",
        variant: "destructive",
      });
      router.push('/login');
      return;
    }

    if (!checkIn || !checkOut) {
      toast({
        title: "Missing Information",
        description: "Please select check-in and check-out dates.",
        variant: "destructive",
      });
      return;
    }

    if (new Date(checkIn) >= new Date(checkOut)) {
      toast({
        title: "Invalid Dates",
        description: "Check-out date must be after check-in date.",
        variant: "destructive",
      });
      return;
    }

    setIsBooking(true);
    
    // Simulate booking process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsBooking(false);
    setShowBookingDialog(false);
    
    toast({
      title: "Booking Confirmed!",
      description: "Your reservation has been successfully created.",
    });
    
    // Reset form
    setCheckIn('');
    setCheckOut('');
    setGuests(1);
    setSpecialRequests('');
  };

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const calculateTotal = () => {
    if (!room) return 0;
    return room.price * calculateNights();
  };

  if (!room) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-6 flex items-center space-x-2"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Rooms</span>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Room Images and Details */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Main Image */}
              <div className="relative mb-6">
                <img
                  src={room.images[selectedImage]}
                  alt={room.name}
                  className="w-full h-96 object-cover rounded-lg"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-white/90 text-black">
                    {room.type.charAt(0).toUpperCase() + room.type.slice(1)}
                  </Badge>
                </div>
              </div>

              {/* Image Thumbnails */}
              <div className="flex space-x-4 mb-8">
                {room.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative w-20 h-20 rounded-lg overflow-hidden ${
                      selectedImage === index ? 'ring-2 ring-primary' : ''
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${room.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* Room Info */}
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{room.name}</h1>
                  <p className="text-lg text-muted-foreground mb-4">{room.shortDescription}</p>
                  
                  <div className="flex items-center space-x-6 mb-6">
                    <div className="flex items-center space-x-2">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{room.rating}</span>
                      <span className="text-muted-foreground">({room.reviewCount} reviews)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-5 w-5 text-muted-foreground" />
                      <span>Up to {room.maxGuests} guests</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Square className="h-5 w-5 text-muted-foreground" />
                      <span>{room.size} sq ft</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-4">Description</h2>
                  <p className="text-muted-foreground leading-relaxed">{room.description}</p>
                </div>

                {/* Features */}
                {room.features.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-semibold mb-4">Special Features</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {room.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Check className="h-4 w-4 text-green-600" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Amenities */}
                <div>
                  <h2 className="text-2xl font-semibold mb-4">Amenities</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {room.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          {amenity.toLowerCase().includes('wifi') && <Wifi className="h-4 w-4 text-primary" />}
                          {amenity.toLowerCase().includes('parking') && <Car className="h-4 w-4 text-primary" />}
                          {amenity.toLowerCase().includes('coffee') && <Coffee className="h-4 w-4 text-primary" />}
                          {amenity.toLowerCase().includes('gym') && <Dumbbell className="h-4 w-4 text-primary" />}
                          {!amenity.toLowerCase().includes('wifi') && 
                           !amenity.toLowerCase().includes('parking') && 
                           !amenity.toLowerCase().includes('coffee') && 
                           !amenity.toLowerCase().includes('gym') && 
                           <Check className="h-4 w-4 text-primary" />}
                        </div>
                        <span className="text-sm">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Book Your Stay</span>
                    <span className="text-2xl font-bold">${room.price}</span>
                  </CardTitle>
                  <CardDescription>per night</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="checkin">Check-in</Label>
                      <Input
                        id="checkin"
                        type="date"
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="checkout">Check-out</Label>
                      <Input
                        id="checkout"
                        type="date"
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        min={checkIn || new Date().toISOString().split('T')[0]}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="guests">Guests</Label>
                    <Input
                      id="guests"
                      type="number"
                      min="1"
                      max={room.maxGuests}
                      value={guests}
                      onChange={(e) => setGuests(parseInt(e.target.value))}
                    />
                  </div>

                  {checkIn && checkOut && (
                    <div className="space-y-2 p-4 bg-muted/50 rounded-lg">
                      <div className="flex justify-between">
                        <span>${room.price} × {calculateNights()} nights</span>
                        <span>${room.price * calculateNights()}</span>
                      </div>
                      <div className="flex justify-between font-semibold text-lg border-t pt-2">
                        <span>Total</span>
                        <span>${calculateTotal()}</span>
                      </div>
                    </div>
                  )}

                  <Dialog open={showBookingDialog} onOpenChange={setShowBookingDialog}>
                    <DialogTrigger asChild>
                      <Button 
                        className="w-full" 
                        size="lg"
                        disabled={!room.available}
                      >
                        {room.available ? (
                          <>
                            <Calendar className="mr-2 h-4 w-4" />
                            Reserve Now
                          </>
                        ) : (
                          'Currently Unavailable'
                        )}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Confirm Your Booking</DialogTitle>
                        <DialogDescription>
                          Review your reservation details before confirming
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <h4 className="font-medium">Room Details</h4>
                          <p className="text-sm text-muted-foreground">{room.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {checkIn} to {checkOut} ({calculateNights()} nights)
                          </p>
                          <p className="text-sm text-muted-foreground">{guests} guest{guests > 1 ? 's' : ''}</p>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="special-requests">Special Requests (Optional)</Label>
                          <Textarea
                            id="special-requests"
                            placeholder="Any special requests or requirements..."
                            value={specialRequests}
                            onChange={(e) => setSpecialRequests(e.target.value)}
                            rows={3}
                          />
                        </div>

                        <div className="space-y-2 p-4 bg-muted/50 rounded-lg">
                          <div className="flex justify-between">
                            <span>Room Rate</span>
                            <span>${room.price} per night</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Nights</span>
                            <span>{calculateNights()}</span>
                          </div>
                          <div className="flex justify-between font-semibold text-lg border-t pt-2">
                            <span>Total Amount</span>
                            <span>${calculateTotal()}</span>
                          </div>
                        </div>

                        <Button 
                          onClick={handleBooking} 
                          className="w-full" 
                          disabled={isBooking}
                        >
                          {isBooking ? (
                            "Processing..."
                          ) : (
                            <>
                              <CreditCard className="mr-2 h-4 w-4" />
                              Confirm Booking
                            </>
                          )}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>

                  {!isAuthenticated && (
                    <p className="text-sm text-muted-foreground text-center">
                      <Button variant="link" className="p-0 h-auto" onClick={() => router.push('/login')}>
                        Sign in
                      </Button>
                      {' '}to make a reservation
                    </p>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}