"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  ChevronRight,
  Sparkles,
  ShoppingBag,
  MapPin,
  MessageSquare,
  ExternalLink,
  Store,
  Utensils,
  Wrench,
  Palette,
  Building2,
  HeartPulse,
  GraduationCap,
  Landmark,
  CheckCircle2,
  Filter,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { umkmList, publicPlacesList, UmkmItem, PublicPlaceItem } from "@/lib/data";

export default function UmkmPage() {
  const [activeTab, setActiveTab] = useState<"umkm" | "fasilitas">("umkm");

  // UMKM State
  const [searchUmkm, setSearchUmkm] = useState("");
  const [selectedUmkmCat, setSelectedUmkmCat] = useState<string>("Semua");

  // Public Places State
  const [searchPlace, setSearchPlace] = useState("");
  const [selectedPlaceCat, setSelectedPlaceCat] = useState<string>("Semua");

  const umkmCategories = ["Semua", "Kuliner", "Kerajinan", "Jasa", "Toko"];
  const placeCategories = [
    "Semua",
    "Pemerintahan",
    "Fasilitas Kesehatan",
    "Masjid",
    "Sekolah",
    "Lainnya",
  ];

  const filteredUmkm = useMemo(() => {
    return umkmList.filter((item) => {
      const matchCat =
        selectedUmkmCat === "Semua" || item.category === selectedUmkmCat;
      const matchSearch =
        item.businessName.toLowerCase().includes(searchUmkm.toLowerCase()) ||
        item.ownerName.toLowerCase().includes(searchUmkm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchUmkm.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [searchUmkm, selectedUmkmCat]);

  const filteredPlaces = useMemo(() => {
    return publicPlacesList.filter((place) => {
      const matchCat =
        selectedPlaceCat === "Semua" || place.category === selectedPlaceCat;
      const matchSearch =
        place.name.toLowerCase().includes(searchPlace.toLowerCase()) ||
        place.address.toLowerCase().includes(searchPlace.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [searchPlace, selectedPlaceCat]);

  const getUmkmCategoryIcon = (category: string) => {
    switch (category) {
      case "Kuliner":
        return Utensils;
      case "Kerajinan":
        return Palette;
      case "Jasa":
        return Wrench;
      case "Toko":
        return Store;
      default:
        return ShoppingBag;
    }
  };

  const getPlaceCategoryIcon = (category: string) => {
    switch (category) {
      case "Pemerintahan":
        return Landmark;
      case "Fasilitas Kesehatan":
        return HeartPulse;
      case "Sekolah":
        return GraduationCap;
      case "Masjid":
        return Building2;
      default:
        return MapPin;
    }
  };

  return (
    <div className="flex flex-col">
      {/* ============================================ */}
      {/* PAGE HEADER */}
      {/* ============================================ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-700 via-emerald-600 to-emerald-800">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)",
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-4xl px-4 py-12 text-center sm:px-6 sm:py-16 lg:px-8">
          <nav className="mb-6 flex items-center justify-center gap-2 text-sm text-emerald-200">
            <Link href="/" className="transition-colors hover:text-white">
              Beranda
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="font-medium text-white">UMKM & Peta Wilayah</span>
          </nav>

          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/20 px-4 py-2 text-sm font-medium text-emerald-100 backdrop-blur-sm">
            <Sparkles className="h-4 w-4" />
            Ekonomi & Fasilitas Warga
          </div>

          <h1 className="mb-4 text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
            Direktori UMKM & Tempat Umum
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-emerald-100/90">
            Dukung produk lokal warga Bubulak dan temukan lokasi fasilitas publik penting di wilayah kelurahan kita.
          </p>

          {/* Main Tab Switcher */}
          <div className="mt-8 inline-flex rounded-2xl bg-emerald-900/60 p-1.5 backdrop-blur-md">
            <button
              onClick={() => setActiveTab("umkm")}
              className={`flex items-center gap-2 rounded-xl px-6 py-3 text-base font-bold transition-all ${
                activeTab === "umkm"
                  ? "bg-white text-emerald-900 shadow-lg"
                  : "text-emerald-100 hover:text-white"
              }`}
            >
              <ShoppingBag className="h-5 w-5" />
              Katalog UMKM Warga
            </button>
            <button
              onClick={() => setActiveTab("fasilitas")}
              className={`flex items-center gap-2 rounded-xl px-6 py-3 text-base font-bold transition-all ${
                activeTab === "fasilitas"
                  ? "bg-white text-emerald-900 shadow-lg"
                  : "text-emerald-100 hover:text-white"
              }`}
            >
              <MapPin className="h-5 w-5" />
              Peta Fasilitas Publik
            </button>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
            preserveAspectRatio="none"
          >
            <path
              d="M0 24L80 28C160 32 320 40 480 42C640 44 800 40 960 34C1120 28 1280 20 1360 16L1440 12V60H1360C1280 60 1120 60 960 60C800 60 640 60 480 60C320 60 160 60 80 60H0V24Z"
              className="fill-background"
            />
          </svg>
        </div>
      </section>

      {/* ============================================ */}
      {/* SECTION 1: KATALOG UMKM */}
      {/* ============================================ */}
      {activeTab === "umkm" && (
        <div className="flex flex-col">
          <section className="mx-auto w-full max-w-5xl px-4 -mt-2 sm:px-6 lg:px-8">
            <Card className="border-2 border-emerald-200/60 shadow-xl">
              <CardContent className="space-y-4 p-4 sm:p-6">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 h-6 w-6 -translate-y-1/2 text-emerald-600" />
                  <Input
                    type="search"
                    placeholder='Cari produk atau usaha warga... (contoh: "soto", "bambu", "servis AC", "jahit")'
                    value={searchUmkm}
                    onChange={(e) => setSearchUmkm(e.target.value)}
                    className="h-14 rounded-xl border-2 border-emerald-200 pl-14 pr-4 text-lg placeholder:text-slate-400 focus:border-emerald-500 focus:ring-emerald-500 sm:h-16 sm:text-xl"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-2">
                  <span className="flex items-center gap-1 text-sm font-semibold text-slate-600 mr-2">
                    <Filter className="h-4 w-4" /> Kategori Usaha:
                  </span>
                  {umkmCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedUmkmCat(cat)}
                      className={`rounded-xl px-4 py-2.5 text-base font-semibold transition-all ${
                        selectedUmkmCat === cat
                          ? "bg-amber-600 text-white shadow-md"
                          : "bg-slate-100 text-slate-700 hover:bg-amber-50 hover:text-amber-800"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          <section className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
            {filteredUmkm.length === 0 ? (
              <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-12 text-center">
                <ShoppingBag className="mx-auto mb-4 h-16 w-16 text-slate-300" />
                <h3 className="mb-2 text-xl font-bold text-slate-700">
                  Usaha Tidak Ditemukan
                </h3>
                <p className="text-lg text-slate-500">
                  Tidak ada UMKM yang sesuai dengan pencarian Anda.
                </p>
                <button
                  onClick={() => {
                    setSearchUmkm("");
                    setSelectedUmkmCat("Semua");
                  }}
                  className="mt-4 inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 text-base font-semibold text-white hover:bg-emerald-800"
                >
                  Reset Filter
                </button>
              </div>
            ) : (
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {filteredUmkm.map((item) => {
                  const IconComp = getUmkmCategoryIcon(item.category);
                  return (
                    <Card
                      key={item.id}
                      className="group flex flex-col overflow-hidden border-2 border-slate-200 transition-all duration-300 hover:border-amber-300 hover:shadow-xl hover:-translate-y-1"
                    >
                      {/* Photo Placeholder */}
                      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-amber-600 via-amber-500 to-amber-700 text-white">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <IconComp className="h-20 w-20 text-white/30" />
                        </div>
                        <div className="absolute left-3 top-3 flex gap-2">
                          <Badge className="bg-amber-800 text-white font-bold text-xs">
                            {item.category}
                          </Badge>
                          {item.isVerified && (
                            <Badge className="bg-emerald-600 text-white gap-1 font-semibold text-xs">
                              <CheckCircle2 className="h-3 w-3" /> Terverifikasi Kelurahan
                            </Badge>
                          )}
                        </div>
                      </div>

                      <CardContent className="flex flex-1 flex-col p-6">
                        <h3 className="mb-1 text-xl font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                          {item.businessName}
                        </h3>
                        <p className="mb-3 text-sm font-semibold text-emerald-700">
                          Pemilik: {item.ownerName}
                        </p>
                        <p className="mb-4 text-base text-slate-600 flex-1 leading-relaxed">
                          {item.description}
                        </p>

                        <div className="mb-6 flex items-start gap-2 text-sm text-slate-500 border-t border-slate-100 pt-3">
                          <MapPin className="h-4 w-4 shrink-0 text-amber-600 mt-0.5" />
                          <span>{item.address}</span>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col gap-2 pt-2">
                          <a
                            href={`https://wa.me/${item.whatsappContact}?text=${encodeURIComponent(
                              `Halo ${item.ownerName}, saya warga Bubulak berminat dengan produk/jasa *${item.businessName}*.`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-emerald-700 text-base font-bold text-white shadow-md transition-colors hover:bg-emerald-800"
                          >
                            <MessageSquare className="h-5 w-5" />
                            Pesan via WhatsApp
                          </a>
                          {item.googleMapsUrl && (
                            <a
                              href={item.googleMapsUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-300 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                            >
                              <ExternalLink className="h-4 w-4" />
                              Buka di Google Maps
                            </a>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      )}

      {/* ============================================ */}
      {/* SECTION 2: PETA & FASILITAS PUBLIK */}
      {/* ============================================ */}
      {activeTab === "fasilitas" && (
        <div className="flex flex-col">
          <section className="mx-auto w-full max-w-5xl px-4 -mt-2 sm:px-6 lg:px-8">
            <Card className="border-2 border-emerald-200/60 shadow-xl">
              <CardContent className="space-y-4 p-4 sm:p-6">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 h-6 w-6 -translate-y-1/2 text-emerald-600" />
                  <Input
                    type="search"
                    placeholder='Cari tempat umum... (contoh: "puskesmas", "kantor kelurahan", "masjid")'
                    value={searchPlace}
                    onChange={(e) => setSearchPlace(e.target.value)}
                    className="h-14 rounded-xl border-2 border-emerald-200 pl-14 pr-4 text-lg placeholder:text-slate-400 focus:border-emerald-500 focus:ring-emerald-500 sm:h-16 sm:text-xl"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-2">
                  <span className="flex items-center gap-1 text-sm font-semibold text-slate-600 mr-2">
                    <Filter className="h-4 w-4" /> Kategori Tempat:
                  </span>
                  {placeCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedPlaceCat(cat)}
                      className={`rounded-xl px-4 py-2.5 text-base font-semibold transition-all ${
                        selectedPlaceCat === cat
                          ? "bg-emerald-700 text-white shadow-md"
                          : "bg-slate-100 text-slate-700 hover:bg-emerald-50 hover:text-emerald-800"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          <section className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
            {/* Embed Google Maps General Overview */}
            <div className="mb-10 overflow-hidden rounded-2xl border-2 border-slate-300 shadow-lg">
              <div className="bg-emerald-800 p-4 text-white font-bold flex items-center gap-2 text-lg">
                <MapPin className="h-5 w-5" />
                Peta Wilayah Kelurahan Bubulak
              </div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.279534855508!2d106.77264231432858!3d-6.619856095233186!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69c5d23b9f2b2d%3A0x4027a76e3530d40!2sKelurahan%20Bubulak!5e0!3m2!1sid!2sid!4v1690000000000!5m2!1sid!2sid"
                width="100%"
                height="320"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Peta Umum Kelurahan Bubulak"
              />
            </div>

            {/* Public Places Grid */}
            {filteredPlaces.length === 0 ? (
              <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-12 text-center">
                <MapPin className="mx-auto mb-4 h-16 w-16 text-slate-300" />
                <h3 className="mb-2 text-xl font-bold text-slate-700">
                  Tempat Tidak Ditemukan
                </h3>
                <p className="text-lg text-slate-500">
                  Tidak ada tempat umum yang sesuai dengan filter lokasi Anda.
                </p>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredPlaces.map((place) => {
                  const IconComp = getPlaceCategoryIcon(place.category);
                  return (
                    <Card
                      key={place.id}
                      className="group overflow-hidden border-2 border-slate-200 transition-all hover:border-emerald-300 hover:shadow-lg"
                    >
                      <CardContent className="p-6">
                        <div className="mb-4 flex items-center gap-3">
                          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 font-bold">
                            <IconComp className="h-6 w-6" />
                          </div>
                          <div>
                            <Badge variant="secondary" className="bg-emerald-50 text-emerald-800 text-xs font-semibold">
                              {place.category}
                            </Badge>
                            <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                              {place.name}
                            </h3>
                          </div>
                        </div>

                        {place.description && (
                          <p className="mb-4 text-base text-slate-600">
                            {place.description}
                          </p>
                        )}

                        <div className="mb-6 flex items-start gap-2 text-sm text-slate-500">
                          <MapPin className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
                          <span>{place.address}</span>
                        </div>

                        <a
                          href={place.googleMapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 text-base font-bold text-white transition-colors hover:bg-emerald-800"
                        >
                          <ExternalLink className="h-5 w-5" />
                          Petunjuk Arah Google Maps
                        </a>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
