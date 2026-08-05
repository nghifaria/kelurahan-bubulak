"use client";

import { useState, useEffect } from "react";
import {
  ShoppingBag,
  MapPin,
  Plus,
  Edit,
  Trash2,
  UploadCloud,
  CheckCircle2,
  AlertCircle,
  X,
  Store,
  Building,
  Check,
  Ban,
  ExternalLink,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  fetchUmkm,
  fetchAllUmkmFromDb,
  fetchPublicPlaces,
  createUmkmInDb,
  updateUmkmInDb,
  deleteUmkmInDb,
  createPublicPlaceInDb,
  updatePublicPlaceInDb,
  deletePublicPlaceInDb,
  uploadImageToInsForge,
} from "@/lib/services";
import { UmkmItem, PublicPlaceItem } from "@/lib/data";

export default function AdminUmkmTempatPage() {
  const [activeTab, setActiveTab] = useState<"umkm" | "places">("umkm");

  // UMKM States
  const [umkmList, setUmkmList] = useState<UmkmItem[]>([]);
  const [isUmkmModalOpen, setIsUmkmModalOpen] = useState(false);
  const [editingUmkm, setEditingUmkm] = useState<UmkmItem | null>(null);

  const [businessName, setBusinessName] = useState("");
  const [umkmCategory, setUmkmCategory] = useState<UmkmItem["category"]>("Kuliner");
  const [ownerName, setOwnerName] = useState("");
  const [description, setDescription] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [whatsappContact, setWhatsappContact] = useState("");
  const [address, setAddress] = useState("");
  const [googleMapsUrl, setGoogleMapsUrl] = useState("");
  const [isVerified, setIsVerified] = useState(true);

  // Public Places States
  const [placesList, setPlacesList] = useState<PublicPlaceItem[]>([]);
  const [isPlaceModalOpen, setIsPlaceModalOpen] = useState(false);
  const [editingPlace, setEditingPlace] = useState<PublicPlaceItem | null>(null);

  const [placeName, setPlaceName] = useState("");
  const [placeCategory, setPlaceCategory] = useState<PublicPlaceItem["category"]>("Pemerintahan");
  const [placeAddress, setPlaceAddress] = useState("");
  const [placeMapsUrl, setPlaceMapsUrl] = useState("");
  const [placeDescription, setPlaceDescription] = useState("");

  // Common UI Feedback
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    loadAllData();
  }, []);

  async function loadAllData() {
    setIsLoading(true);
    const uData = await fetchAllUmkmFromDb();
    const pData = await fetchPublicPlaces();
    setUmkmList(uData);
    setPlacesList(pData);
    setIsLoading(false);
  }

  // --- UMKM HANDLERS ---
  const openAddUmkm = () => {
    setEditingUmkm(null);
    setBusinessName("");
    setUmkmCategory("Kuliner");
    setOwnerName("");
    setDescription("");
    setPhotoUrl("/placeholder-umkm-1.jpg");
    setWhatsappContact("");
    setAddress("");
    setGoogleMapsUrl("");
    setIsVerified(true);
    setFeedback(null);
    setIsUmkmModalOpen(true);
  };

  const openEditUmkm = (item: UmkmItem) => {
    setEditingUmkm(item);
    setBusinessName(item.businessName);
    setUmkmCategory(item.category);
    setOwnerName(item.ownerName);
    setDescription(item.description);
    setPhotoUrl(item.photoUrl);
    setWhatsappContact(item.whatsappContact);
    setAddress(item.address);
    setGoogleMapsUrl(item.googleMapsUrl || "");
    setIsVerified(item.isVerified);
    setFeedback(null);
    setIsUmkmModalOpen(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      setIsUploading(true);
      setFeedback(null);

      const { url, error } = await uploadImageToInsForge(file);
      setIsUploading(false);

      if (error || !url) {
        setFeedback({ type: "error", text: "Gagal mengunggah foto ke INSForge Storage." });
      } else {
        setPhotoUrl(url);
        setFeedback({ type: "success", text: "Foto UMKM berhasil diunggah ke storage!" });
      }
    }
  };

  const handleUmkmSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName || !whatsappContact) {
      setFeedback({ type: "error", text: "Nama Usaha & No. WhatsApp wajib diisi." });
      return;
    }

    setIsSubmitting(true);
    setFeedback(null);

    const cleanWa = whatsappContact.replace(/\D/g, "");
    const formattedWa = cleanWa.startsWith("0") ? "62" + cleanWa.slice(1) : cleanWa;

    if (editingUmkm) {
      const { error } = await updateUmkmInDb(editingUmkm.id, {
        businessName,
        category: umkmCategory,
        ownerName,
        description,
        photoUrl,
        whatsappContact: formattedWa,
        address,
        googleMapsUrl,
        isVerified,
      });

      if (error) {
        setFeedback({ type: "error", text: "Gagal memperbarui data UMKM." });
      } else {
        setIsUmkmModalOpen(false);
        loadAllData();
      }
    } else {
      const { error } = await createUmkmInDb({
        businessName,
        category: umkmCategory,
        ownerName,
        description,
        photoUrl: photoUrl || "/placeholder-umkm-1.jpg",
        whatsappContact: formattedWa,
        address,
        googleMapsUrl,
        isVerified,
      });

      if (error) {
        setFeedback({ type: "error", text: "Gagal menambahkan UMKM baru." });
      } else {
        setIsUmkmModalOpen(false);
        loadAllData();
      }
    }
    setIsSubmitting(false);
  };

  const handleDeleteUmkm = async (id: string, name: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus UMKM "${name}"?`)) {
      await deleteUmkmInDb(id);
      loadAllData();
    }
  };

  // --- PUBLIC PLACES HANDLERS ---
  const openAddPlace = () => {
    setEditingPlace(null);
    setPlaceName("");
    setPlaceCategory("Pemerintahan");
    setPlaceAddress("");
    setPlaceMapsUrl("");
    setPlaceDescription("");
    setFeedback(null);
    setIsPlaceModalOpen(true);
  };

  const openEditPlace = (item: PublicPlaceItem) => {
    setEditingPlace(item);
    setPlaceName(item.name);
    setPlaceCategory(item.category);
    setPlaceAddress(item.address);
    setPlaceMapsUrl(item.googleMapsUrl);
    setPlaceDescription(item.description || "");
    setFeedback(null);
    setIsPlaceModalOpen(true);
  };

  const handlePlaceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!placeName || !placeMapsUrl) {
      setFeedback({ type: "error", text: "Nama Tempat & Link Google Maps wajib diisi." });
      return;
    }

    setIsSubmitting(true);
    setFeedback(null);

    if (editingPlace) {
      const { error } = await updatePublicPlaceInDb(editingPlace.id, {
        name: placeName,
        category: placeCategory,
        address: placeAddress,
        googleMapsUrl: placeMapsUrl,
        description: placeDescription,
      });

      if (error) {
        setFeedback({ type: "error", text: "Gagal memperbarui tempat umum." });
      } else {
        setIsPlaceModalOpen(false);
        loadAllData();
      }
    } else {
      const { error } = await createPublicPlaceInDb({
        name: placeName,
        category: placeCategory,
        address: placeAddress,
        googleMapsUrl: placeMapsUrl,
        description: placeDescription,
      });

      if (error) {
        setFeedback({ type: "error", text: "Gagal menambahkan tempat umum." });
      } else {
        setIsPlaceModalOpen(false);
        loadAllData();
      }
    }
    setIsSubmitting(false);
  };

  const handleDeletePlace = async (id: string, name: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus tempat "${name}"?`)) {
      await deletePublicPlaceInDb(id);
      loadAllData();
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-3">
            <Store className="h-8 w-8 text-amber-600" />
            CMS UMKM Warga & Tempat Umum
          </h1>
          <p className="mt-1 text-base text-slate-600">
            Kelola direktori usaha warga lokal Bubulak dan peta lokasi fasilitas publik
          </p>
        </div>

        {/* Tab Selector */}
        <div className="inline-flex rounded-xl bg-slate-200 p-1.5 font-bold text-sm">
          <button
            onClick={() => setActiveTab("umkm")}
            className={`flex items-center gap-2 rounded-lg px-4 py-2.5 transition-all ${
              activeTab === "umkm"
                ? "bg-white text-slate-900 shadow-md"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <ShoppingBag className="h-4 w-4" />
            Katalog UMKM ({umkmList.length})
          </button>
          <button
            onClick={() => setActiveTab("places")}
            className={`flex items-center gap-2 rounded-lg px-4 py-2.5 transition-all ${
              activeTab === "places"
                ? "bg-white text-slate-900 shadow-md"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <MapPin className="h-4 w-4" />
            Tempat Umum ({placesList.length})
          </button>
        </div>
      </div>

      {/* ============================================ */}
      {/* TAB 1: MANAGE UMKM */}
      {/* ============================================ */}
      {activeTab === "umkm" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-slate-900">
              Daftar Usaha Warga Terdaftar
            </h2>
            <Button
              onClick={openAddUmkm}
              className="gap-2 rounded-xl bg-amber-600 font-bold text-white hover:bg-amber-700"
            >
              <Plus className="h-4 w-4" />
              + Tambah UMKM Baru
            </Button>
          </div>

          <Card className="overflow-hidden border-2 border-slate-200 shadow-md">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-base text-slate-800">
                <thead className="bg-slate-900 text-xs font-bold uppercase tracking-wider text-slate-300">
                  <tr>
                    <th className="px-6 py-4">Foto</th>
                    <th className="px-6 py-4">Nama Usaha</th>
                    <th className="px-6 py-4">Pemilik & Kontak WA</th>
                    <th className="px-6 py-4">Kategori</th>
                    <th className="px-6 py-4">Status Verifikasi</th>
                    <th className="px-6 py-4 text-right">Aksi Management</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {isLoading ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                        Memuat data UMKM dari INSForge...
                      </td>
                    </tr>
                  ) : (
                    umkmList.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50">
                        <td className="px-6 py-4">
                          <div className="h-12 w-16 overflow-hidden rounded-lg bg-amber-800 flex items-center justify-center text-white border border-slate-200 relative">
                            {item.photoUrl && (item.photoUrl.startsWith("http") || item.photoUrl.startsWith("/")) ? (
                              <img
                                src={item.photoUrl}
                                alt={item.businessName}
                                className="h-full w-full object-cover"
                                onError={(e) => {
                                  (e.target as HTMLElement).style.display = "none";
                                }}
                              />
                            ) : (
                              <Store className="h-5 w-5 text-white/40" />
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 font-bold text-slate-900">
                          {item.businessName}
                          <p className="text-xs text-slate-400 font-normal">{item.address}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="font-semibold text-slate-800">{item.ownerName}</p>
                          <p className="text-xs font-mono text-emerald-700">WA: {item.whatsappContact}</p>
                        </td>
                        <td className="px-6 py-4">
                          <Badge className="bg-amber-800 text-white text-xs">{item.category}</Badge>
                        </td>
                        <td className="px-6 py-4">
                          {item.isVerified ? (
                            <Badge className="bg-emerald-600 text-white font-bold gap-1 text-xs">
                              <Check className="h-3 w-3" /> Terverifikasi
                            </Badge>
                          ) : (
                            <Badge className="bg-slate-400 text-white text-xs">Belum Verifikasi</Badge>
                          )}
                        </td>
                        <td className="px-6 py-4 text-right space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => openEditUmkm(item)}
                            className="gap-1 border-slate-300 font-semibold"
                          >
                            <Edit className="h-4 w-4 text-emerald-700" />
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDeleteUmkm(item.id, item.businessName)}
                            className="gap-1 bg-red-600 font-semibold"
                          >
                            <Trash2 className="h-4 w-4" />
                            Hapus
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {/* ============================================ */}
      {/* TAB 2: MANAGE PUBLIC PLACES */}
      {/* ============================================ */}
      {activeTab === "places" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-slate-900">
              Daftar Tempat & Fasilitas Publik
            </h2>
            <Button
              onClick={openAddPlace}
              className="gap-2 rounded-xl bg-emerald-700 font-bold text-white hover:bg-emerald-800"
            >
              <Plus className="h-4 w-4" />
              + Tambah Tempat Umum
            </Button>
          </div>

          <Card className="overflow-hidden border-2 border-slate-200 shadow-md">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-base text-slate-800">
                <thead className="bg-slate-900 text-xs font-bold uppercase tracking-wider text-slate-300">
                  <tr>
                    <th className="px-6 py-4">Nama Tempat</th>
                    <th className="px-6 py-4">Kategori</th>
                    <th className="px-6 py-4">Alamat Wilayah</th>
                    <th className="px-6 py-4">Peta Google Maps</th>
                    <th className="px-6 py-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {isLoading ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                        Memuat data tempat dari INSForge...
                      </td>
                    </tr>
                  ) : (
                    placesList.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-50">
                        <td className="px-6 py-4 font-bold text-slate-900">{p.name}</td>
                        <td className="px-6 py-4">
                          <Badge className="bg-emerald-800 text-white text-xs">{p.category}</Badge>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600">{p.address}</td>
                        <td className="px-6 py-4">
                          <a
                            href={p.googleMapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:underline"
                          >
                            <ExternalLink className="h-3.5 w-3.5" /> Buka Maps
                          </a>
                        </td>
                        <td className="px-6 py-4 text-right space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => openEditPlace(p)}
                            className="gap-1 border-slate-300 font-semibold"
                          >
                            <Edit className="h-4 w-4 text-emerald-700" />
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDeletePlace(p.id, p.name)}
                            className="gap-1 bg-red-600 font-semibold"
                          >
                            <Trash2 className="h-4 w-4" />
                            Hapus
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {/* ============================================ */}
      {/* MODAL UMKM FORM */}
      {/* ============================================ */}
      {isUmkmModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 sm:p-8 shadow-2xl border-2 border-emerald-300">
            <div className="mb-6 flex items-center justify-between border-b border-slate-100 pb-4">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <ShoppingBag className="h-6 w-6 text-amber-600" />
                {editingUmkm ? "Edit Data UMKM" : "Tambah UMKM Warga Baru"}
              </h2>
              <button
                onClick={() => setIsUmkmModalOpen(false)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {feedback && (
              <div className="mb-6 rounded-xl bg-amber-50 p-4 border border-amber-300 text-amber-900 text-sm font-semibold">
                <p>{feedback.text}</p>
              </div>
            )}

            <form onSubmit={handleUmkmSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-bold text-slate-800">Nama Usaha *</label>
                  <Input
                    type="text"
                    placeholder="Contoh: Dapur Mamah Euis"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="h-12 rounded-xl"
                    required
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-bold text-slate-800">Nama Pemilik</label>
                  <Input
                    type="text"
                    placeholder="Contoh: Ibu Euis"
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                    className="h-12 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-bold text-slate-800">Kategori Usaha</label>
                  <select
                    value={umkmCategory}
                    onChange={(e) => setUmkmCategory(e.target.value as UmkmItem["category"])}
                    className="w-full h-12 rounded-xl border-2 border-slate-200 px-3 font-medium bg-white"
                  >
                    <option value="Kuliner">Kuliner</option>
                    <option value="Jasa">Jasa</option>
                    <option value="Kerajinan">Kerajinan</option>
                    <option value="Toko">Toko</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-bold text-slate-800">No. WhatsApp Pemilik *</label>
                  <Input
                    type="tel"
                    placeholder="Contoh: 081234567890"
                    value={whatsappContact}
                    onChange={(e) => setWhatsappContact(e.target.value)}
                    className="h-12 rounded-xl"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-bold text-slate-800">Alamat Usaha</label>
                <Input
                  type="text"
                  placeholder="Contoh: Jl. Raya Bubulak No. 42"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="h-12 rounded-xl"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-bold text-slate-800">Deskripsi Usaha</label>
                <textarea
                  rows={3}
                  placeholder="Jelaskan produk atau jasa unggulan..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full rounded-xl border-2 border-slate-200 p-3 text-sm"
                />
              </div>

              {/* Upload Foto */}
              <div className="rounded-xl border-2 border-dashed border-amber-300 bg-amber-50/50 p-4">
                <label className="mb-1 block text-sm font-bold text-slate-800">Foto Usaha (INSForge Storage)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="text-sm text-slate-600"
                />
                {isUploading && <p className="text-xs font-bold text-amber-700 mt-1">Mengunggah foto ke INSForge Storage...</p>}

                {photoUrl && (
                  <div className="mt-3 flex items-center gap-4 rounded-xl bg-white p-3 border border-amber-200">
                    <img
                      src={photoUrl}
                      alt="Preview Foto UMKM"
                      className="h-20 w-28 rounded-lg object-cover border border-slate-200"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = "none";
                      }}
                    />
                    <div className="text-xs font-mono text-slate-600 truncate flex-1">
                      <p className="font-bold text-slate-800 font-sans text-sm mb-0.5">Pratinjau Foto Usaha</p>
                      <p className="truncate text-amber-900">{photoUrl}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Verified Toggle */}
              <div className="rounded-xl bg-slate-50 p-3 border border-slate-200">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isVerified}
                    onChange={(e) => setIsVerified(e.target.checked)}
                    className="h-5 w-5 rounded border-slate-300 text-emerald-600"
                  />
                  <span className="text-sm font-bold text-slate-900">
                    Status Verifikasi Kelurahan (Tampilkan Badge Terverifikasi)
                  </span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <Button type="button" variant="outline" onClick={() => setIsUmkmModalOpen(false)}>Batal</Button>
                <Button type="submit" disabled={isSubmitting} className="bg-amber-600 font-bold text-white">Simpan UMKM</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================ */}
      {/* MODAL PUBLIC PLACE FORM */}
      {/* ============================================ */}
      {isPlaceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white p-6 sm:p-8 shadow-2xl border-2 border-emerald-300">
            <div className="mb-6 flex items-center justify-between border-b border-slate-100 pb-4">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <Building className="h-6 w-6 text-emerald-700" />
                {editingPlace ? "Edit Tempat Umum" : "Tambah Tempat Umum Baru"}
              </h2>
              <button
                onClick={() => setIsPlaceModalOpen(false)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {feedback && (
              <div className="mb-6 rounded-xl bg-emerald-50 p-4 border border-emerald-300 text-emerald-900 text-sm font-semibold">
                <p>{feedback.text}</p>
              </div>
            )}

            <form onSubmit={handlePlaceSubmit} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-bold text-slate-800">Nama Tempat / Fasilitas *</label>
                <Input
                  type="text"
                  placeholder="Contoh: Puskesmas Pembantu Bubulak"
                  value={placeName}
                  onChange={(e) => setPlaceName(e.target.value)}
                  className="h-12 rounded-xl"
                  required
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-bold text-slate-800">Kategori Tempat</label>
                <select
                  value={placeCategory}
                  onChange={(e) => setPlaceCategory(e.target.value as PublicPlaceItem["category"])}
                  className="w-full h-12 rounded-xl border-2 border-slate-200 px-3 font-medium bg-white"
                >
                  <option value="Pemerintahan">Pemerintahan</option>
                  <option value="Fasilitas Kesehatan">Fasilitas Kesehatan</option>
                  <option value="Masjid">Masjid</option>
                  <option value="Sekolah">Sekolah</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-bold text-slate-800">Alamat Tempat</label>
                <Input
                  type="text"
                  placeholder="Contoh: Jl. Raya Bubulak No. 10"
                  value={placeAddress}
                  onChange={(e) => setPlaceAddress(e.target.value)}
                  className="h-12 rounded-xl"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-bold text-slate-800">Tautan Google Maps *</label>
                <Input
                  type="url"
                  placeholder="Contoh: https://maps.app.goo.gl/..."
                  value={placeMapsUrl}
                  onChange={(e) => setPlaceMapsUrl(e.target.value)}
                  className="h-12 rounded-xl font-mono text-xs"
                  required
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <Button type="button" variant="outline" onClick={() => setIsPlaceModalOpen(false)}>Batal</Button>
                <Button type="submit" disabled={isSubmitting} className="bg-emerald-700 font-bold text-white">Simpan Tempat</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
