"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Navbar from '@/components/layout/navbar';
import { useAuth } from '@/lib/auth-context';
import { mockRooms } from '@/lib/data';
import { Room } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Search, 
  Filter,
  ArrowLeft,
  Star,
  Users,
  BedDouble, // Mengganti Square dengan ikon yang lebih relevan
  DollarSign
} from 'lucide-react';

export default function HalamanDasborKamar() {
  const { user, isAuthenticated, isAdmin, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [rooms, setRooms] = useState<Room[]>(mockRooms);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  // State form untuk tambah/edit
  const [formData, setFormData] = useState({
    name: '',
    type: 'standard' as Room['type'],
    price: '',
    description: '',
    shortDescription: '',
    maxGuests: '',
    size: '',
    amenities: '',
    features: ''
  });

  useEffect(() => {
    if (!loading && (!isAuthenticated || !isAdmin)) {
      router.push('/login');
    }
  }, [isAuthenticated, isAdmin, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated || !isAdmin) {
    return null;
  }

  const filteredRooms = rooms.filter(room => {
    const matchesSearch = room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          room.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || room.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleAddRoom = () => {
    if (!formData.name || !formData.price || !formData.description) {
      toast({
        title: "Kesalahan",
        description: "Harap isi semua bidang yang wajib diisi",
        variant: "destructive",
      });
      return;
    }

    const newRoom: Room = {
      id: `r${Date.now()}`,
      slug: formData.name.toLowerCase().replace(/\s+/g, '-'),
      name: formData.name,
      type: formData.type,
      price: parseInt(formData.price),
      description: formData.description,
      shortDescription: formData.shortDescription,
      images: ['https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg'],
      amenities: formData.amenities.split(',').map(a => a.trim()).filter(a => a),
      maxGuests: parseInt(formData.maxGuests) || 2,
      size: parseInt(formData.size) || 28, // Ukuran dalam m²
      available: true,
      rating: 4.0,
      reviewCount: 0,
      features: formData.features.split(',').map(f => f.trim()).filter(f => f)
    };

    setRooms([...rooms, newRoom]);
    setIsAddDialogOpen(false);
    resetForm();
    toast({
      title: "Berhasil",
      description: "Kamar berhasil ditambahkan",
    });
  };

  const handleEditRoom = () => {
    if (!selectedRoom || !formData.name || !formData.price || !formData.description) {
      toast({
        title: "Kesalahan",
        description: "Harap isi semua bidang yang wajib diisi",
        variant: "destructive",
      });
      return;
    }

    const updatedRoom: Room = {
      ...selectedRoom,
      name: formData.name,
      type: formData.type,
      price: parseInt(formData.price),
      description: formData.description,
      shortDescription: formData.shortDescription,
      amenities: formData.amenities.split(',').map(a => a.trim()).filter(a => a),
      maxGuests: parseInt(formData.maxGuests) || 2,
      size: parseInt(formData.size) || 28,
      features: formData.features.split(',').map(f => f.trim()).filter(f => f)
    };

    setRooms(rooms.map(room => room.id === selectedRoom.id ? updatedRoom : room));
    setIsEditDialogOpen(false);
    setSelectedRoom(null);
    resetForm();
    toast({
      title: "Berhasil",
      description: "Kamar berhasil diperbarui",
    });
  };

  const handleDeleteRoom = (roomId: string) => {
    setRooms(rooms.filter(room => room.id !== roomId));
    toast({
      title: "Berhasil",
      description: "Kamar berhasil dihapus",
    });
  };

  const openEditDialog = (room: Room) => {
    setSelectedRoom(room);
    setFormData({
      name: room.name,
      type: room.type,
      price: room.price.toString(),
      description: room.description,
      shortDescription: room.shortDescription,
      maxGuests: room.maxGuests.toString(),
      size: room.size.toString(),
      amenities: room.amenities.join(', '),
      features: room.features.join(', ')
    });
    setIsEditDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      type: 'standard',
      price: '',
      description: '',
      shortDescription: '',
      maxGuests: '',
      size: '',
      amenities: '',
      features: ''
    });
  };

  const getRoomTypeColor = (type: Room['type']) => {
    switch (type) {
      case 'standard': return 'bg-blue-100 text-blue-800';
      case 'deluxe': return 'bg-green-100 text-green-800';
      case 'suite': return 'bg-purple-100 text-purple-800';
      case 'presidential': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => router.push('/dashboard')}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Kembali ke Dasbor</span>
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Kelola Kamar</h1>
              <p className="text-muted-foreground">Tambah, edit, dan kelola kamar hotel</p>
            </div>
          </div>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="h-4 w-4 mr-2" />
                Tambah Kamar
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Tambah Kamar Baru</DialogTitle>
                <DialogDescription>
                  Buat kamar baru untuk hotel Anda
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nama Kamar *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Contoh: Kamar Deluxe Pemandangan Kota"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Tipe Kamar *</Label>
                  <Select value={formData.type} onValueChange={(value: Room['type']) => setFormData({...formData, type: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih tipe kamar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standar</SelectItem>
                      <SelectItem value="deluxe">Deluxe</SelectItem>
                      <SelectItem value="suite">Suite</SelectItem>
                      <SelectItem value="presidential">Presidential</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Harga per Malam (IDR) *</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    placeholder="Contoh: 750000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxGuests">Maks Tamu</Label>
                  <Input
                    id="maxGuests"
                    type="number"
                    value={formData.maxGuests}
                    onChange={(e) => setFormData({...formData, maxGuests: e.target.value})}
                    placeholder="Contoh: 2"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="size">Ukuran (m²)</Label>
                  <Input
                    id="size"
                    type="number"
                    value={formData.size}
                    onChange={(e) => setFormData({...formData, size: e.target.value})}
                    placeholder="Contoh: 28"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="shortDescription">Deskripsi Singkat</Label>
                  <Input
                    id="shortDescription"
                    value={formData.shortDescription}
                    onChange={(e) => setFormData({...formData, shortDescription: e.target.value})}
                    placeholder="Deskripsi singkat untuk tampilan daftar"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="description">Deskripsi Lengkap *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Jelaskan tentang kamar ini secara detail"
                    rows={3}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="amenities">Fasilitas (pisahkan dengan koma)</Label>
                  <Input
                    id="amenities"
                    value={formData.amenities}
                    onChange={(e) => setFormData({...formData, amenities: e.target.value})}
                    placeholder="Contoh: WiFi, AC, TV Layar Datar"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="features">Fitur Unggulan (pisahkan dengan koma)</Label>
                  <Input
                    id="features"
                    value={formData.features}
                    onChange={(e) => setFormData({...formData, features: e.target.value})}
                    placeholder="Contoh: Pemandangan Laut, Balkon Pribadi"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2 mt-6">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Batal
                </Button>
                <Button onClick={handleAddRoom}>
                  Tambah Kamar
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Kartu Statistik */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Kamar</p>
                  <p className="text-2xl font-bold">{rooms.length}</p>
                </div>
                <BedDouble className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Tersedia</p>
                  <p className="text-2xl font-bold">{rooms.filter(r => r.available).length}</p>
                </div>
                <Users className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Harga Rata-rata</p>
                  <p className="text-2xl font-bold">{formatCurrency(rooms.reduce((acc, r) => acc + r.price, 0) / (rooms.length || 1))}</p>
                </div>
                <DollarSign className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Rating Rata-rata</p>
                  <p className="text-2xl font-bold">{(rooms.reduce((acc, r) => acc + r.rating, 0) / (rooms.length || 1)).toFixed(1)}</p>
                </div>
                <Star className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filter */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Cari kamar berdasarkan nama atau tipe..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Filter berdasarkan tipe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Tipe</SelectItem>
                    <SelectItem value="standard">Standar</SelectItem>
                    <SelectItem value="deluxe">Deluxe</SelectItem>
                    <SelectItem value="suite">Suite</SelectItem>
                    <SelectItem value="presidential">Presidential</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabel Kamar */}
        <Card>
          <CardHeader>
            <CardTitle>Daftar Kamar ({filteredRooms.length})</CardTitle>
            <CardDescription>
              Kelola kamar hotel dan detailnya di sini
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Kamar</TableHead>
                    <TableHead>Tipe</TableHead>
                    <TableHead>Harga</TableHead>
                    <TableHead>Tamu</TableHead>
                    <TableHead>Ukuran</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRooms.map((room) => (
                    <TableRow key={room.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <img
                            src={room.images[0]}
                            alt={room.name}
                            className="w-16 h-12 rounded-lg object-cover"
                          />
                          <div>
                            <p className="font-medium">{room.name}</p>
                            <p className="text-sm text-muted-foreground">{room.shortDescription}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getRoomTypeColor(room.type)}>
                          {room.type.charAt(0).toUpperCase() + room.type.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">{formatCurrency(room.price)}</TableCell>
                      <TableCell>{room.maxGuests}</TableCell>
                      <TableCell>{room.size} m²</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span>{room.rating.toFixed(1)}</span>
                          <span className="text-muted-foreground">({room.reviewCount})</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={room.available ? "default" : "secondary"}>
                          {room.available ? "Tersedia" : "Penuh"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => router.push(`/rooms/${room.slug}`)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openEditDialog(room)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteRoom(room.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Dialog Edit */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Kamar</DialogTitle>
              <DialogDescription>
                Perbarui informasi kamar yang sudah ada
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
               <div className="space-y-2">
                  <Label htmlFor="edit-name">Nama Kamar *</Label>
                  <Input
                    id="edit-name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Contoh: Kamar Deluxe Pemandangan Kota"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-type">Tipe Kamar *</Label>
                  <Select value={formData.type} onValueChange={(value: Room['type']) => setFormData({...formData, type: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih tipe kamar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standar</SelectItem>
                      <SelectItem value="deluxe">Deluxe</SelectItem>
                      <SelectItem value="suite">Suite</SelectItem>
                      <SelectItem value="presidential">Presidential</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-price">Harga per Malam (IDR) *</Label>
                  <Input
                    id="edit-price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    placeholder="Contoh: 750000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-maxGuests">Maks Tamu</Label>
                  <Input
                    id="edit-maxGuests"
                    type="number"
                    value={formData.maxGuests}
                    onChange={(e) => setFormData({...formData, maxGuests: e.target.value})}
                    placeholder="Contoh: 2"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-size">Ukuran (m²)</Label>
                  <Input
                    id="edit-size"
                    type="number"
                    value={formData.size}
                    onChange={(e) => setFormData({...formData, size: e.target.value})}
                    placeholder="Contoh: 28"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-shortDescription">Deskripsi Singkat</Label>
                  <Input
                    id="edit-shortDescription"
                    value={formData.shortDescription}
                    onChange={(e) => setFormData({...formData, shortDescription: e.target.value})}
                    placeholder="Deskripsi singkat untuk tampilan daftar"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="edit-description">Deskripsi Lengkap *</Label>
                  <Textarea
                    id="edit-description"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Jelaskan tentang kamar ini secara detail"
                    rows={3}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="edit-amenities">Fasilitas (pisahkan dengan koma)</Label>
                  <Input
                    id="edit-amenities"
                    value={formData.amenities}
                    onChange={(e) => setFormData({...formData, amenities: e.target.value})}
                    placeholder="Contoh: WiFi, AC, TV Layar Datar"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="edit-features">Fitur Unggulan (pisahkan dengan koma)</Label>
                  <Input
                    id="edit-features"
                    value={formData.features}
                    onChange={(e) => setFormData({...formData, features: e.target.value})}
                    placeholder="Contoh: Pemandangan Laut, Balkon Pribadi"
                  />
                </div>
            </div>
            <div className="flex justify-end space-x-2 mt-6">
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Batal
              </Button>
              <Button onClick={handleEditRoom}>
                Perbarui Kamar
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
