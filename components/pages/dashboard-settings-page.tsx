"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  Globe, 
  Palette, 
  Save,
  Building,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';

export default function HalamanPengaturanDasbor() {
  const { user, isAuthenticated, isAdmin, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  // Semua hook useState harus dipanggil tanpa syarat di tingkat atas
  const [pengaturanHotel, setPengaturanHotel] = useState({
    name: 'Hotel Mewah Jaya',
    description: 'Rasakan kemewahan dan kenyamanan di Hotel Mewah Jaya. Liburan sempurna Anda menanti dengan fasilitas kelas dunia dan layanan luar biasa.',
    address: 'Jl. Jenderal Sudirman No. 123, Jakarta Pusat, 10220',
    phone: '+62 (21) 555-1234',
    email: 'info@hotelmewahjaya.com',
    website: 'https://hotelmewahjaya.com',
    checkInTime: '14:00',
    checkOutTime: '12:00',
    currency: 'IDR',
    timezone: 'Asia/Jakarta'
  });

  const [pengaturanNotifikasi, setPengaturanNotifikasi] = useState({
    emailBookings: true,
    emailCancellations: true,
    emailPayments: true,
    smsBookings: false,
    smsReminders: true,
    pushNotifications: true
  });

  const [pengaturanKeamanan, setPengaturanKeamanan] = useState({
    twoFactorAuth: false,
    sessionTimeout: '24',
    passwordExpiry: '90',
    loginAttempts: '5'
  });

  const [pengaturanTampilan, setPengaturanTampilan] = useState({
    theme: 'system',
    primaryColor: 'blue',
    language: 'id'
  });

  // Menangani pemeriksaan otentikasi di useEffect untuk menghindari masalah SSR
  useEffect(() => {
    if (!loading && (!isAuthenticated || !isAdmin)) {
      router.push('/login');
    }
  }, [isAuthenticated, isAdmin, loading, router]);

  const handleSimpanPengaturanHotel = () => {
    // Fungsionalitas simpan tiruan
    toast({
      title: "Pengaturan Disimpan",
      description: "Pengaturan hotel telah berhasil diperbarui.",
    });
  };

  const handleSimpanNotifikasi = () => {
    toast({
      title: "Notifikasi Diperbarui",
      description: "Preferensi notifikasi telah disimpan.",
    });
  };

  const handleSimpanKeamanan = () => {
    toast({
      title: "Pengaturan Keamanan Diperbarui",
      description: "Preferensi keamanan telah disimpan.",
    });
  };

  const handleSimpanTampilan = () => {
    toast({
      title: "Tampilan Diperbarui",
      description: "Pengaturan tampilan telah disimpan.",
    });
  };

  // Tampilkan status memuat saat otentikasi sedang diperiksa
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Memuat...</p>
        </div>
      </div>
    );
  }

  // Jangan render konten jika tidak terotentikasi atau bukan admin
  if (!isAuthenticated || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center space-x-2 mb-8">
            <Settings className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">Pengaturan</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Navigasi Pengaturan */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Kategori Pengaturan</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start">
                    <Building className="mr-2 h-4 w-4" />
                    Informasi Hotel
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Bell className="mr-2 h-4 w-4" />
                    Notifikasi
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Shield className="mr-2 h-4 w-4" />
                    Keamanan
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Palette className="mr-2 h-4 w-4" />
                    Tampilan
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Konten Pengaturan */}
            <div className="lg:col-span-2 space-y-8">
              {/* Informasi Hotel */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Building className="h-5 w-5" />
                    <span>Informasi Hotel</span>
                  </CardTitle>
                  <CardDescription>
                    Kelola informasi dasar dan detail kontak hotel Anda
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="hotelName">Nama Hotel</Label>
                      <Input
                        id="hotelName"
                        value={pengaturanHotel.name}
                        onChange={(e) => setPengaturanHotel({...pengaturanHotel, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="website">Situs Web</Label>
                      <Input
                        id="website"
                        value={pengaturanHotel.website}
                        onChange={(e) => setPengaturanHotel({...pengaturanHotel, website: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Deskripsi</Label>
                    <Textarea
                      id="description"
                      value={pengaturanHotel.description}
                      onChange={(e) => setPengaturanHotel({...pengaturanHotel, description: e.target.value})}
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          className="pl-10"
                          value={pengaturanHotel.email}
                          onChange={(e) => setPengaturanHotel({...pengaturanHotel, email: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telepon</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="phone"
                          className="pl-10"
                          value={pengaturanHotel.phone}
                          onChange={(e) => setPengaturanHotel({...pengaturanHotel, phone: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Alamat</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="address"
                        className="pl-10"
                        value={pengaturanHotel.address}
                        onChange={(e) => setPengaturanHotel({...pengaturanHotel, address: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="checkIn">Waktu Check-in</Label>
                      <Input
                        id="checkIn"
                        type="time"
                        value={pengaturanHotel.checkInTime}
                        onChange={(e) => setPengaturanHotel({...pengaturanHotel, checkInTime: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="checkOut">Waktu Check-out</Label>
                      <Input
                        id="checkOut"
                        type="time"
                        value={pengaturanHotel.checkOutTime}
                        onChange={(e) => setPengaturanHotel({...pengaturanHotel, checkOutTime: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="currency">Mata Uang</Label>
                      <Select value={pengaturanHotel.currency} onValueChange={(value) => setPengaturanHotel({...pengaturanHotel, currency: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="IDR">IDR (Rp)</SelectItem>
                          <SelectItem value="USD">USD ($)</SelectItem>
                          <SelectItem value="EUR">EUR (€)</SelectItem>
                          <SelectItem value="GBP">GBP (£)</SelectItem>
                          <SelectItem value="JPY">JPY (¥)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Zona Waktu</Label>
                      <Select value={pengaturanHotel.timezone} onValueChange={(value) => setPengaturanHotel({...pengaturanHotel, timezone: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Asia/Jakarta">WIB (Jakarta)</SelectItem>
                          <SelectItem value="Asia/Makassar">WITA (Makassar)</SelectItem>
                          <SelectItem value="Asia/Jayapura">WIT (Jayapura)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button onClick={handleSimpanPengaturanHotel} className="w-full md:w-auto">
                    <Save className="mr-2 h-4 w-4" />
                    Simpan Informasi Hotel
                  </Button>
                </CardContent>
              </Card>

              {/* Notifikasi */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Bell className="h-5 w-5" />
                    <span>Preferensi Notifikasi</span>
                  </CardTitle>
                  <CardDescription>
                    Konfigurasikan bagaimana Anda ingin menerima notifikasi
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Notifikasi Email</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="emailBookings">Pemesanan Baru</Label>
                        <Switch
                          id="emailBookings"
                          checked={pengaturanNotifikasi.emailBookings}
                          onCheckedChange={(checked) => setPengaturanNotifikasi({...pengaturanNotifikasi, emailBookings: checked})}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="emailCancellations">Pembatalan</Label>
                        <Switch
                          id="emailCancellations"
                          checked={pengaturanNotifikasi.emailCancellations}
                          onCheckedChange={(checked) => setPengaturanNotifikasi({...pengaturanNotifikasi, emailCancellations: checked})}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="emailPayments">Pembaruan Pembayaran</Label>
                        <Switch
                          id="emailPayments"
                          checked={pengaturanNotifikasi.emailPayments}
                          onCheckedChange={(checked) => setPengaturanNotifikasi({...pengaturanNotifikasi, emailPayments: checked})}
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="font-medium">Notifikasi SMS</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="smsBookings">Pemesanan Baru</Label>
                        <Switch
                          id="smsBookings"
                          checked={pengaturanNotifikasi.smsBookings}
                          onCheckedChange={(checked) => setPengaturanNotifikasi({...pengaturanNotifikasi, smsBookings: checked})}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="smsReminders">Pengingat Check-in</Label>
                        <Switch
                          id="smsReminders"
                          checked={pengaturanNotifikasi.smsReminders}
                          onCheckedChange={(checked) => setPengaturanNotifikasi({...pengaturanNotifikasi, smsReminders: checked})}
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="font-medium">Notifikasi Push</h4>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="pushNotifications">Notifikasi Browser</Label>
                      <Switch
                        id="pushNotifications"
                        checked={pengaturanNotifikasi.pushNotifications}
                        onCheckedChange={(checked) => setPengaturanNotifikasi({...pengaturanNotifikasi, pushNotifications: checked})}
                      />
                    </div>
                  </div>

                  <Button onClick={handleSimpanNotifikasi} className="w-full md:w-auto">
                    <Save className="mr-2 h-4 w-4" />
                    Simpan Pengaturan Notifikasi
                  </Button>
                </CardContent>
              </Card>

              {/* Keamanan */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="h-5 w-5" />
                    <span>Pengaturan Keamanan</span>
                  </CardTitle>
                  <CardDescription>
                    Kelola pengaturan keamanan dan kontrol akses
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="twoFactor">Autentikasi Dua Faktor</Label>
                      <p className="text-sm text-muted-foreground">Tambahkan lapisan keamanan ekstra ke akun Anda</p>
                    </div>
                    <Switch
                      id="twoFactor"
                      checked={pengaturanKeamanan.twoFactorAuth}
                      onCheckedChange={(checked) => setPengaturanKeamanan({...pengaturanKeamanan, twoFactorAuth: checked})}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="sessionTimeout">Batas Waktu Sesi (jam)</Label>
                      <Select value={pengaturanKeamanan.sessionTimeout} onValueChange={(value) => setPengaturanKeamanan({...pengaturanKeamanan, sessionTimeout: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 jam</SelectItem>
                          <SelectItem value="8">8 jam</SelectItem>
                          <SelectItem value="24">24 jam</SelectItem>
                          <SelectItem value="168">1 minggu</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="passwordExpiry">Kadaluarsa Kata Sandi (hari)</Label>
                      <Select value={pengaturanKeamanan.passwordExpiry} onValueChange={(value) => setPengaturanKeamanan({...pengaturanKeamanan, passwordExpiry: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="30">30 hari</SelectItem>
                          <SelectItem value="60">60 hari</SelectItem>
                          <SelectItem value="90">90 hari</SelectItem>
                          <SelectItem value="never">Tidak Pernah</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="loginAttempts">Maksimal Upaya Login</Label>
                      <Select value={pengaturanKeamanan.loginAttempts} onValueChange={(value) => setPengaturanKeamanan({...pengaturanKeamanan, loginAttempts: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="3">3 percobaan</SelectItem>
                          <SelectItem value="5">5 percobaan</SelectItem>
                          <SelectItem value="10">10 percobaan</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button onClick={handleSimpanKeamanan} className="w-full md:w-auto">
                    <Save className="mr-2 h-4 w-4" />
                    Simpan Pengaturan Keamanan
                  </Button>
                </CardContent>
              </Card>

              {/* Tampilan */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Palette className="h-5 w-5" />
                    <span>Tampilan & Lokalisasi</span>
                  </CardTitle>
                  <CardDescription>
                    Sesuaikan tampilan dan nuansa dasbor Anda
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="theme">Tema</Label>
                      <Select value={pengaturanTampilan.theme} onValueChange={(value) => setPengaturanTampilan({...pengaturanTampilan, theme: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Terang</SelectItem>
                          <SelectItem value="dark">Gelap</SelectItem>
                          <SelectItem value="system">Sistem</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="primaryColor">Warna Utama</Label>
                      <Select value={pengaturanTampilan.primaryColor} onValueChange={(value) => setPengaturanTampilan({...pengaturanTampilan, primaryColor: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="blue">Biru</SelectItem>
                          <SelectItem value="green">Hijau</SelectItem>
                          <SelectItem value="purple">Ungu</SelectItem>
                          <SelectItem value="red">Merah</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="language">Bahasa</Label>
                      <Select value={pengaturanTampilan.language} onValueChange={(value) => setPengaturanTampilan({...pengaturanTampilan, language: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="id">Bahasa Indonesia</SelectItem>
                          <SelectItem value="en">Inggris</SelectItem>
                          <SelectItem value="es">Spanyol</SelectItem>
                          <SelectItem value="fr">Prancis</SelectItem>
                          <SelectItem value="de">Jerman</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button onClick={handleSimpanTampilan} className="w-full md:w-auto">
                    <Save className="mr-2 h-4 w-4" />
                    Simpan Pengaturan Tampilan
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
