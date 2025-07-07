"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Edit, Trash2, ArrowLeft } from "lucide-react";
import Link from "next/link"; // Meskipun tidak langsung digunakan di sini, tetap dipertahankan jika ada Link lain
import { useRouter } from "next/navigation";

// Asumsi Navbar dan Footer tersedia di proyek Anda
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

// Komponen Shadcn UI
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

// --- Definisi Tipe Data ---
interface RoomType {
  id: string;
  type: string;
}

interface Amenity {
  id: string;
  name: string;
}

interface Feature {
  id: string;
  name: string;
}

// Union Type untuk item yang sedang diedit/ditambah
type MasterDataItem = RoomType | Amenity | Feature;

// --- Komponen Utama: MasterDataPage ---
export default function MasterDataPage() {
  const router = useRouter();

  // State untuk Data Master dengan tipe yang jelas
  const [roomTypes, setRoomTypes] = useState<RoomType[]>([]);
  const [amenities, setAmenities] = useState<Amenity[]>([]);
  const [features, setFeatures] = useState<Feature[]>([]);

  // State untuk Status Loading dan Error
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // State untuk Manajemen Modal CRUD
  const [isCrudModalOpen, setIsCrudModalOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<
    "roomType" | "amenity" | "feature" | ""
  >("");
  const [modalMode, setModalMode] = useState<"add" | "edit" | "">("");
  const [currentItem, setCurrentItem] = useState<MasterDataItem | null>(null);
  const [inputValue, setInputValue] = useState<string>("");

  // State untuk Modal Konfirmasi Penghapusan
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);
  const [confirmAction, setConfirmAction] = useState<
    (() => Promise<void>) | null
  >(null);
  const [confirmMessage, setConfirmMessage] = useState<string>("");

  // Fungsi untuk mengambil data dari API
  const fetchData = useCallback(
    async (type: "room-types" | "amenities" | "features") => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/${type}`);
        if (!response.ok) {
          throw new Error(
            `Gagal mengambil data ${type}: ${response.statusText}`
          );
        }
        const data = await response.json();
        if (type === "room-types") {
          setRoomTypes(data);
        } else if (type === "amenities") {
          setAmenities(data);
        } else if (type === "features") {
          setFeatures(data);
        }
      } catch (err: any) {
        // Menggunakan 'any' untuk error yang tidak diketahui tipenya
        console.error(`Error fetching ${type}:`, err);
        setError(`Gagal memuat data ${type}. ${err.message || ""}`);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  // Mengambil semua data saat komponen dimuat
  useEffect(() => {
    fetchData("room-types");
    fetchData("amenities");
    fetchData("features");
  }, [fetchData]);

  // Fungsi untuk membuka modal CRUD
  const openCrudModal = (
    type: "roomType" | "amenity" | "feature",
    mode: "add" | "edit",
    item: MasterDataItem | null = null
  ) => {
    setModalType(type);
    setModalMode(mode);
    setCurrentItem(item);
    // Menggunakan type assertion untuk item agar TypeScript tahu properti yang diakses aman
    setInputValue(
      item
        ? type === "roomType"
          ? (item as RoomType).type
          : (item as Amenity).name
        : ""
    );
    setIsCrudModalOpen(true);
  };

  // Fungsi untuk menutup modal CRUD
  const closeCrudModal = () => {
    setIsCrudModalOpen(false);
    setModalType("");
    setModalMode("");
    setCurrentItem(null);
    setInputValue("");
  };

  // Menangani Pengiriman Tambah/Edit
  const handleSubmit = async () => {
    if (!inputValue.trim()) {
      // Mengganti alert dengan console.error atau notifikasi UI yang lebih baik
      console.error("Nama tidak boleh kosong!");
      setError("Nama tidak boleh kosong!"); // Menampilkan pesan error di UI
      return;
    }

    setIsLoading(true);
    setError(null);
    const apiPath =
      modalType === "roomType"
        ? "room-types"
        : modalType === "amenity"
        ? "amenities"
        : "features";
    const method = modalMode === "add" ? "POST" : "PUT";
    const url =
      modalMode === "add"
        ? `/api/${apiPath}`
        : `/api/${apiPath}/${currentItem?.id}`; // currentItem bisa null
    const payload =
      modalType === "roomType" ? { type: inputValue } : { name: inputValue };

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message ||
            `Gagal ${
              modalMode === "add" ? "menambah" : "mengedit"
            } ${modalType}.`
        );
      }

      closeCrudModal();
      await fetchData(apiPath as "room-types" | "amenities" | "features"); // Refresh data setelah operasi berhasil
    } catch (err: any) {
      console.error(
        `Error ${modalMode === "add" ? "adding" : "editing"} ${modalType}:`,
        err
      );
      setError(`Terjadi kesalahan: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Fungsi untuk membuka modal konfirmasi penghapusan
  const openConfirmModal = (
    type: "roomType" | "amenity" | "feature" | "fasilitas" | "fitur",
    id: string
  ) => {
    setConfirmMessage(`Apakah Anda yakin ingin menghapus ${type} ini?`);
    setConfirmAction(() => async () => {
      setIsLoading(true);
      setError(null);
      // Menyesuaikan penentuan apiPath agar sesuai dengan tipe yang valid
      const apiPath =
        type === "roomType"
          ? "room-types"
          : type === "amenity" || type === "fasilitas"
          ? "amenities"
          : "features";
      try {
        const response = await fetch(`/api/${apiPath}/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || `Gagal menghapus ${type}.`);
        }

        await fetchData(apiPath as "room-types" | "amenities" | "features"); // Refresh data setelah penghapusan berhasil
      } catch (err: any) {
        console.error(`Error deleting ${type}:`, err);
        setError(`Terjadi kesalahan: ${err.message}`);
      } finally {
        setIsLoading(false);
        setIsConfirmModalOpen(false); // Tutup modal konfirmasi setelah aksi
      }
    });
    setIsConfirmModalOpen(true);
  };

  // Fungsi untuk menjalankan aksi konfirmasi
  const handleConfirm = () => {
    if (confirmAction) {
      confirmAction();
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4 mb-8">
          <div className="flex md:justify-start justify-center">
            <Button
              variant="outline"
              onClick={() => router.push("/dashboard")}
              className="flex items-center gap-2 rounded-lg"
            >
              <ArrowLeft className="h-4 w-4" /> Kembali ke Dashboard
            </Button>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 dark:text-gray-100">
            Manajemen Data Master
          </h1>
          <div /> {/* Kosong untuk penyeimbang grid */}
        </div>

        {isLoading && (
          <div className="text-center text-blue-500 mb-4">Memuat data...</div>
        )}
        {error && <div className="text-center text-red-500 mb-4">{error}</div>}

        <Tabs defaultValue="roomTypes" className="w-full max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="roomTypes">Tipe Kamar</TabsTrigger>
            <TabsTrigger value="amenities">Fasilitas</TabsTrigger>
            <TabsTrigger value="features">Fitur</TabsTrigger>
          </TabsList>

          {/* Konten Tab Tipe Kamar */}
          <TabsContent value="roomTypes">
            <Card className="rounded-xl shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-2xl font-bold">Tipe Kamar</CardTitle>
                <Button
                  onClick={() => openCrudModal("roomType", "add")}
                  className="flex items-center gap-2 rounded-lg"
                >
                  <Plus className="h-4 w-4" /> Tambah Tipe Kamar
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableCaption>Daftar semua tipe kamar.</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Nama Tipe</TableHead>
                      <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {roomTypes.length === 0 && !isLoading ? (
                      <TableRow>
                        <TableCell
                          colSpan={3}
                          className="text-center py-4 text-gray-500"
                        >
                          Tidak ada tipe kamar ditemukan.
                        </TableCell>
                      </TableRow>
                    ) : (
                      roomTypes.map((rt) => (
                        <TableRow key={rt.id}>
                          <TableCell className="font-medium">{rt.id}</TableCell>
                          <TableCell>{rt.type}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="rounded-lg"
                                onClick={() =>
                                  openCrudModal("roomType", "edit", rt)
                                }
                              >
                                <Edit className="h-4 w-4 mr-2" /> Edit
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                className="rounded-lg"
                                onClick={() =>
                                  openConfirmModal("roomType", rt.id)
                                }
                              >
                                <Trash2 className="h-4 w-4 mr-2" /> Hapus
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Konten Tab Fasilitas */}
          <TabsContent value="amenities">
            <Card className="rounded-xl shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-2xl font-bold">Fasilitas</CardTitle>
                <Button
                  onClick={() => openCrudModal("amenity", "add")}
                  className="flex items-center gap-2 rounded-lg"
                >
                  <Plus className="h-4 w-4" /> Tambah Fasilitas
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableCaption>
                    Daftar semua fasilitas yang tersedia.
                  </TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Nama Fasilitas</TableHead>
                      <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {amenities.length === 0 && !isLoading ? (
                      <TableRow>
                        <TableCell
                          colSpan={3}
                          className="text-center py-4 text-gray-500"
                        >
                          Tidak ada fasilitas ditemukan.
                        </TableCell>
                      </TableRow>
                    ) : (
                      amenities.map((a) => (
                        <TableRow key={a.id}>
                          <TableCell className="font-medium">{a.id}</TableCell>
                          <TableCell>{a.name}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="rounded-lg"
                                onClick={() =>
                                  openCrudModal("amenity", "edit", a)
                                }
                              >
                                <Edit className="h-4 w-4 mr-2" /> Edit
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                className="rounded-lg"
                                onClick={() =>
                                  openConfirmModal("amenity", a.id)
                                }
                              >
                                <Trash2 className="h-4 w-4 mr-2" /> Hapus
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Konten Tab Fitur */}
          <TabsContent value="features">
            <Card className="rounded-xl shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-2xl font-bold">Fitur</CardTitle>
                <Button
                  onClick={() => openCrudModal("feature", "add")}
                  className="flex items-center gap-2 rounded-lg"
                >
                  <Plus className="h-4 w-4" /> Tambah Fitur
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableCaption>Daftar semua fitur yang tersedia.</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Nama Fitur</TableHead>
                      <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {features.length === 0 && !isLoading ? (
                      <TableRow>
                        <TableCell
                          colSpan={3}
                          className="text-center py-4 text-gray-500"
                        >
                          Tidak ada fitur ditemukan.
                        </TableCell>
                      </TableRow>
                    ) : (
                      features.map((f) => (
                        <TableRow key={f.id}>
                          <TableCell className="font-medium">{f.id}</TableCell>
                          <TableCell>{f.name}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="rounded-lg"
                                onClick={() =>
                                  openCrudModal("feature", "edit", f)
                                }
                              >
                                <Edit className="h-4 w-4 mr-2" /> Edit
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                className="rounded-lg"
                                onClick={() =>
                                  openConfirmModal("feature", f.id)
                                }
                              >
                                <Trash2 className="h-4 w-4 mr-2" /> Hapus
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />

      {/* --- Komponen Modal CRUD --- */}
      <Dialog open={isCrudModalOpen} onOpenChange={setIsCrudModalOpen}>
        <DialogContent className="sm:max-w-[425px] rounded-xl shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              {modalMode === "add" ? "Tambah Baru " : "Edit "}
              {modalType === "roomType" && "Tipe Kamar"}
              {modalType === "amenity" && "Fasilitas"}
              {modalType === "feature" && "Fitur"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                {modalType === "roomType" ? "Nama Tipe" : "Nama"}
              </Label>
              <Input
                id="name"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="col-span-3 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder={
                  modalType === "roomType"
                    ? "contoh: Standar, Deluxe"
                    : "contoh: WiFi, Balkon"
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={closeCrudModal}
              className="rounded-lg"
              disabled={isLoading}
            >
              Batal
            </Button>
            <Button
              onClick={handleSubmit}
              className="rounded-lg"
              disabled={isLoading}
            >
              {isLoading
                ? "Memproses..."
                : modalMode === "add"
                ? "Tambah"
                : "Simpan Perubahan"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* --- Komponen Modal Konfirmasi Penghapusan --- */}
      <Dialog open={isConfirmModalOpen} onOpenChange={setIsConfirmModalOpen}>
        <DialogContent className="sm:max-w-[425px] rounded-xl shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              Konfirmasi Penghapusan
            </DialogTitle>
          </DialogHeader>
          <div className="py-4 text-center text-lg">{confirmMessage}</div>
          <DialogFooter className="flex justify-center sm:justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setIsConfirmModalOpen(false)}
              className="rounded-lg"
            >
              Batal
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirm}
              className="rounded-lg"
              disabled={isLoading}
            >
              {isLoading ? "Menghapus..." : "Hapus"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
