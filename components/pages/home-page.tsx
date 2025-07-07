"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import RoomCard from "@/components/ui/room-card";
import { mockRooms } from "@/lib/data";
import {
  Search,
  Calendar,
  Users,
  Award,
  Shield,
  Headphones,
  Wifi,
  Star,
  ChevronRight,
} from "lucide-react";

export default function HomePage() {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2");
  const [roomType, setRoomType] = useState("all");

  const featuredRooms = mockRooms.slice(0, 3);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (checkIn) params.set("checkin", checkIn);
    if (checkOut) params.set("checkout", checkOut);
    if (guests !== "2") params.set("guests", guests);
    if (roomType !== "all") params.set("type", roomType);

    window.location.href = `/rooms?${params.toString()}`;
  };

  const [roomTypes, setRoomTypes] = useState<{ id: string; type: string }[]>(
    []
  );

  useEffect(() => {
    fetch("/api/room-types")
      .then((res) => res.json())
      .then((data) => setRoomTypes(data))
      .catch(() => setRoomTypes([]));
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop)",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/30" />
        </div>

        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Star className="h-5 w-5 text-amber-400" />
              <span className="text-sm font-medium">Layanan Bintang 5</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Temukan Penginapan
              <span className="block bg-gradient-to-r from-amber-500 to-amber-300 bg-clip-text text-transparent">
                Berkelas Dunia
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
              Pengalaman menginap premium dengan fasilitas terbaik dan layanan
              personal yang tak terlupakan
            </p>
          </motion.div>

          {/* Search Form */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-6xl mx-auto"
          >
            <Card className="backdrop-blur-sm bg-white/5 border border-white/10 shadow-xl">
              <CardContent className="p-6">
                {/* Desktop Version (hidden on mobile) */}
                <div className="hidden md:grid grid-cols-1 md:grid-cols-5 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="checkin" className="text-white/80">
                      Check-in
                    </Label>
                    <div className="relative">
                      {/* <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/70" /> */}
                      <Input
                        id="checkin"
                        type="date"
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        className="w-full pl-15 bg-white/5 border-white/20 text-white placeholder:text-white/50"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="checkout" className="text-white/80">
                      Check-out
                    </Label>
                    <div className="relative">
                      {/* <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/70" /> */}
                      <Input
                        id="checkout"
                        type="date"
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        className="w-full pl-15 bg-white/5 border-white/20 text-white placeholder:text-white/50"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="guests" className="text-white/80">
                      Tamu
                    </Label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/70" />
                      <Select value={guests} onValueChange={setGuests}>
                        <SelectTrigger className="pl-10 bg-white/5 border-white/20 text-white">
                          <SelectValue placeholder="2 Tamu" />
                        </SelectTrigger>
                        <SelectContent className="bg-background">
                          <SelectItem value="1">1 Tamu</SelectItem>
                          <SelectItem value="2">2 Tamu</SelectItem>
                          <SelectItem value="3">3 Tamu</SelectItem>
                          <SelectItem value="4">4 Tamu</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="roomtype" className="text-white/80">
                      Tipe Kamar
                    </Label>
                    <Select value={roomType} onValueChange={setRoomType}>
                      <SelectTrigger className="bg-white/5 border-white/20 text-white">
                        <SelectValue placeholder="Semua Tipe" />
                      </SelectTrigger>
                      <SelectContent className="bg-background">
                        <SelectItem value="all">Semua Tipe</SelectItem>
                        {roomTypes.map((rt) => (
                          <SelectItem key={rt.id} value={rt.type.toLowerCase()}>
                            {rt.type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-end">
                    <Button
                      onClick={handleSearch}
                      className="w-full h-[42px] bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-600/90 hover:to-amber-500/90 text-white"
                    >
                      <Search className="mr-2 h-4 w-4" />
                      Cari Kamar
                    </Button>
                  </div>
                </div>

                {/* Mobile Version (simplified) */}
                <div className="md:hidden space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="mobile-checkin" className="text-white/80">
                        Check-in
                      </Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/70" />
                        <Input
                          id="mobile-checkin"
                          type="date"
                          value={checkIn}
                          onChange={(e) => setCheckIn(e.target.value)}
                          className="w-full pl-10 bg-white/5 border-white/20 text-white"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="mobile-checkout"
                        className="text-white/80"
                      >
                        Check-out
                      </Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/70" />
                        <Input
                          id="mobile-checkout"
                          type="date"
                          value={checkOut}
                          onChange={(e) => setCheckOut(e.target.value)}
                          className="w-full pl-10 bg-white/5 border-white/20 text-white"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="mobile-guests" className="text-white/80">
                        Tamu
                      </Label>
                      <div className="relative">
                        <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/70" />
                        <Select value={guests} onValueChange={setGuests}>
                          <SelectTrigger className="pl-10 bg-white/5 border-white/20 text-white">
                            <SelectValue placeholder="2 Tamu" />
                          </SelectTrigger>
                          <SelectContent className="bg-background">
                            <SelectItem value="1">1 Tamu</SelectItem>
                            <SelectItem value="2">2 Tamu</SelectItem>
                            <SelectItem value="3">3 Tamu</SelectItem>
                            <SelectItem value="4">4 Tamu</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="mobile-roomtype"
                        className="text-white/80"
                      >
                        Tipe Kamar
                      </Label>
                      <Select value={roomType} onValueChange={setRoomType}>
                        <SelectTrigger className="bg-white/5 border-white/20 text-white">
                          <SelectValue placeholder="Semua Tipe" />
                        </SelectTrigger>
                        <SelectContent className="bg-background">
                          <SelectItem value="all">Semua Tipe</SelectItem>
                          {roomTypes.map((rt) => (
                            <SelectItem
                              key={rt.id}
                              value={rt.type.toLowerCase()}
                            >
                              {rt.type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button
                    onClick={handleSearch}
                    className="w-full h-[42px] bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-600/90 hover:to-amber-500/90 text-white"
                  >
                    <Search className="mr-2 h-4 w-4" />
                    Cari Kamar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 text-amber-600 font-medium mb-4">
              <div className="w-6 h-px bg-amber-600" />
              Kenapa Memilih Kami
              <div className="w-6 h-px bg-amber-600" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Pengalaman Menginap Tak Tertandingi
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Setiap detail dirancang untuk memberikan kenyamanan dan kemewahan
              tertinggi
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Award,
                title: "Layanan Berkelas",
                description:
                  "Diakui secara global atas keramahan dan kepuasan tamu",
                color: "text-amber-500",
              },
              {
                icon: Shield,
                title: "Keamanan 24/7",
                description:
                  "Sistem keamanan canggih dan check-in tanpa kontak",
                color: "text-amber-500",
              },
              {
                icon: Headphones,
                title: "Concierge Pribadi",
                description: "Layanan personal siap membantu kebutuhan Anda",
                color: "text-amber-500",
              },
              {
                icon: Wifi,
                title: "Fasilitas Premium",
                description:
                  "WiFi ultra cepat, spa, gym, dan restoran kelas atas",
                color: "text-amber-500",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-0 shadow-sm hover:shadow-md transition-shadow bg-transparent">
                  <CardContent className="p-6">
                    <div className={`${feature.color} mb-4`}>
                      <feature.icon className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Rooms */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 text-amber-600 font-medium mb-4">
              <div className="w-6 h-px bg-amber-600" />
              Akomodasi Eksklusif
              <div className="w-6 h-px bg-amber-600" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Kamar & Suite Unggulan
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Pilihan akomodasi premium kami yang paling diminati
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredRooms.map((room, index) => (
              <motion.div
                key={room.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <RoomCard room={room} />
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Button
              asChild
              size="lg"
              variant="outline"
              className="group bg-transparent hover:bg-amber-600 hover:text-white border-amber-600 text-amber-600"
            >
              <Link href="/rooms" className="flex items-center gap-2">
                Lihat Semua Kamar
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-br from-amber-700/90 to-amber-500/90">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Siap Memulai Pengalaman Mewah Anda?
            </h2>
            <p className="text-xl mb-8 text-amber-100 max-w-2xl mx-auto">
              Pesan sekarang dan dapatkan penawaran eksklusif untuk pemesanan
              langsung
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-amber-700 hover:bg-white/90 shadow-lg"
                asChild
              >
                <Link href="/rooms" className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Pesan Sekarang
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white/10 hover:text-white"
              >
                Hubungi Kami
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
