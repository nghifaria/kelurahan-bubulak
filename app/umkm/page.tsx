"use client";

export const dynamic = "force-dynamic";

import { useState, useMemo, useEffect } from "react";
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
import { BentoGrid } from "@/components/BentoGrid";
import { BentoCard } from "@/components/BentoCard";
import { UmkmItem, PublicPlaceItem } from "@/lib/data";
import { fetchUmkm, fetchPublicPlaces } from "@/lib/services";

export default function UmkmPage() {
  const [activeTab, setActiveTab] = useState<"umkm" | "fasilitas">("umkm");

  // Live Data States
  const [umkmList, setUmkmList] = useState<UmkmItem[]>([]);
  const [publicPlacesList, setPublicPlacesList] = useState<PublicPlaceItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // UMKM State
  const [searchUmkm, setSearchUmkm] = useState("");
  const [selectedUmkmCat, setSelectedUmkmCat] = useState<string>("Semua");

  // Public Places State
  const [searchPlace, setSearchPlace] = useState("");
  const [selectedPlaceCat, setSelectedPlaceCat] = useState<string>("Semua");

  useEffect(() => {
    async function loadLiveData() {
      setIsLoading(true);
      const [uData, pData] = await Promise.all([
        fetchUmkm(),
        fetchPublicPlaces(),
      ]);
      setUmkmList(uData);
      setPublicPlacesList(pData);
      setIsLoading(false);
    }
    loadLiveData();
  }, []);

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
  }, [umkmList, searchUmkm, selectedUmkmCat]);

  const filteredPlaces = useMemo(() => {
    return publicPlacesList.filter((place) => {
      const matchCat =
        selectedPlaceCat === "Semua" || place.category === selectedPlaceCat;
      const matchSearch =
        place.name.toLowerCase().includes(searchPlace.toLowerCase()) ||
        place.address.toLowerCase().includes(searchPlace.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [publicPlacesList, searchPlace, selectedPlaceCat]);

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
    <div className="flex flex-col space-y-8 pb-12 bg-slate-50">
      {/* PAGE HEADER LINEAR DARK */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-900 via-emerald-800 to-slate-900 text-white pt-12 pb-16">
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <nav className="mb-4 flex items-center justify-center gap-2 text-xs font-semibold text-emerald-200">
            <Link href="/" className="hover:text-white">
              Beranda
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-white">Direktori UMKM & Fasilitas</span>
          </nav>

          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/20 px-4 py-1.5 text-xs font-bold text-emerald-200">
            <Sparkles className="h-3.5 w-3.5 text-amber-300" />
            Pemberdayaan Ekonomi & Peta Wilayah
          </div>

          <h1 className="mb-3 text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl tracking-tight">
            Direktori UMKM & Tempat Umum
          </h1>
          <p className="mx-auto max-w-2xl text-base text-emerald-100/90 leading-relaxed font-medium">
            Dukung usaha lokal warga Bubulak dan temukan lokasi fasilitas publik penting di wilayah kelurahan.
          </p>

          {/* Main Tab Switcher */}
          <div className="mt-6 inline-flex rounded-2xl bg-slate-950/80 p-1.5 border border-slate-800">
            <button
              onClick={() => setActiveTab("umkm")}
              className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs sm:text-sm font-extrabold transition-all min-h-[44px] ${
                activeTab === "umkm"
                  ? "bg-emerald-500 text-slate-950 shadow-sm"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              <ShoppingBag className="h-4 w-4" />
              Katalog UMKM Warga
            </button>
            <button
              onClick={() => setActiveTab("fasilitas")}
              className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs sm:text-sm font-extrabold transition-all min-h-[44px] ${
                activeTab === "fasilitas"
                  ? "bg-emerald-500 text-slate-950 shadow-sm"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              <MapPin className="h-4 w-4" />
              Peta Fasilitas Publik
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 1: KATALOG UMKM */}
      {activeTab === "umkm" && (
        <div className="flex flex-col space-y-6">
          <section className="mx-auto w-full max-w-6xl px-4 -mt-8 sm:px-6 lg:px-8 z-10">
            <Card className="border border-slate-200 bg-white rounded-3xl shadow-md">
              <CardContent className="space-y-3.5 p-5">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <Input
                    type="search"
                    placeholder='Cari produk atau usaha warga... (contoh: "soto", "bambu", "servis AC", "jahit")'
                    value={searchUmkm}
                    onChange={(e) => setSearchUmkm(e.target.value)}
                    className="h-14 rounded-2xl border-2 border-slate-200 pl-12 pr-4 text-base font-bold text-slate-900 placeholder:text-slate-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 min-h-[48px]"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="flex items-center gap-1 text-xs font-bold text-slate-600 mr-1">
                    <Filter className="h-3.5 w-3.5" /> Kategori:
                  </span>
                  {umkmCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedUmkmCat(cat)}
                      className={`rounded-xl px-3.5 py-1.5 text-xs font-extrabold transition-all min-h-[36px] ${
                        selectedUmkmCat === cat
                          ? "bg-emerald-700 text-white shadow-2xs"
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

          <section className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            {isLoading ? (
              <div className="py-16 text-center text-slate-500 font-semibold bg-white rounded-3xl border border-dashed border-slate-300">
                Memuat katalog UMKM dari database...
              </div>
            ) : filteredUmkm.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center">
                <ShoppingBag className="mx-auto mb-2 h-12 w-12 text-slate-300" />
                <h3 className="mb-1 text-lg font-bold text-slate-800">
                  Usaha Tidak Ditemukan
                </h3>
                <p className="text-sm text-slate-500">
                  Tidak ada UMKM yang cocok dengan filter atau kata kunci Anda.
                </p>
                <button
                  onClick={() => {
                    setSearchUmkm("");
                    setSelectedUmkmCat("Semua");
                  }}
                  className="mt-3 inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-800 min-h-[44px]"
                >
                  Reset Filter Search
                </button>
              </div>
            ) : (
              <BentoGrid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredUmkm.map((item) => {
                  const IconComp = getUmkmCategoryIcon(item.category);
                  const mapDirectUrl = item.googleMapsUrl && item.googleMapsUrl.startsWith("http")
                    ? item.googleMapsUrl
                    : `https://maps.google.com/maps?q=${encodeURIComponent(item.businessName + ", Kelurahan Bubulak, Kota Bogor")}`;

                  return (
                    <div
                      key={item.id}
                      className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xs hover:border-emerald-300 hover:shadow-md transition-all duration-200"
                    >
                      {/* Photo Header */}
                      <div className="relative h-44 overflow-hidden bg-slate-900 text-white flex items-center justify-center">
                        {item.photoUrl && (item.photoUrl.startsWith("http") || item.photoUrl.startsWith("/")) ? (
                          <img
                            src={item.photoUrl}
                            alt={item.businessName}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        ) : null}
                        <IconComp className="absolute h-14 w-14 text-white/30 -z-10" />
                        <div className="absolute left-3 top-3 flex gap-1.5 z-10">
                          <Badge className="bg-amber-600 text-white font-bold text-[10px] uppercase">
                            {item.category}
                          </Badge>
                          {item.isVerified && (
                            <Badge className="bg-emerald-600 text-white gap-1 font-bold text-[10px]">
                              <CheckCircle2 className="h-3 w-3" /> Terverifikasi
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-1 flex-col p-5 justify-between">
                        <div>
                          <h3 className="mb-1 text-lg font-extrabold text-slate-900 group-hover:text-emerald-700 transition-colors">
                            {item.businessName}
                          </h3>
                          <p className="mb-2 text-xs font-bold text-emerald-800">
                            Pemilik: {item.ownerName}
                          </p>
                          <p className="mb-3 text-xs text-slate-600 leading-relaxed font-medium line-clamp-3">
                            {item.description}
                          </p>

                          <div className="mb-4 flex items-start gap-1.5 text-xs font-semibold text-slate-500 border-t border-slate-100 pt-2.5">
                            <MapPin className="h-3.5 w-3.5 shrink-0 text-emerald-600 mt-0.5" />
                            <span>{item.address}</span>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col gap-2 pt-2">
                          <a
                            href={`https://wa.me/${item.whatsappContact}?text=${encodeURIComponent(
                              `Halo ${item.ownerName}, saya warga Bubulak berminat dengan produk/jasa *${item.businessName}*.`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-emerald-700 text-xs font-extrabold text-white shadow-2xs transition-colors hover:bg-emerald-800 min-h-[44px]"
                          >
                            <MessageSquare className="h-4 w-4" />
                            Pesan via WhatsApp
                          </a>
                          <a
                            href={mapDirectUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 min-h-[40px]"
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                            Buka Lokasi di Google Maps
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </BentoGrid>
            )}
          </section>
        </div>
      )}

      {/* SECTION 2: PETA & FASILITAS PUBLIK */}
      {activeTab === "fasilitas" && (
        <div className="flex flex-col space-y-6">
          <section className="mx-auto w-full max-w-6xl px-4 -mt-8 sm:px-6 lg:px-8 z-10">
            <Card className="border border-slate-200 bg-white rounded-3xl shadow-md">
              <CardContent className="space-y-3.5 p-5">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <Input
                    type="search"
                    placeholder='Cari tempat umum... (contoh: "puskesmas", "kantor kelurahan", "masjid")'
                    value={searchPlace}
                    onChange={(e) => setSearchPlace(e.target.value)}
                    className="h-14 rounded-2xl border-2 border-slate-200 pl-12 pr-4 text-base font-bold text-slate-900 placeholder:text-slate-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 min-h-[48px]"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="flex items-center gap-1 text-xs font-bold text-slate-600 mr-1">
                    <Filter className="h-3.5 w-3.5" /> Kategori:
                  </span>
                  {placeCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedPlaceCat(cat)}
                      className={`rounded-xl px-3.5 py-1.5 text-xs font-extrabold transition-all min-h-[36px] ${
                        selectedPlaceCat === cat
                          ? "bg-emerald-700 text-white shadow-2xs"
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

          <section className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            {/* Embed Google Maps General Overview (Zero API Key Method) */}
            <div className="mb-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xs">
              <div className="bg-slate-900 p-4 text-white font-extrabold flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-emerald-400" />
                Peta Lokasi Wilayah Kelurahan Bubulak
              </div>
              <iframe
                src="https://maps.google.com/maps?q=Kelurahan+Bubulak,+Bogor+Barat,+Kota+Bogor&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="320"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Peta Lokasi Kelurahan Bubulak"
              />
            </div>

            {/* Public Places Grid */}
            {isLoading ? (
              <div className="py-16 text-center text-slate-500 font-semibold bg-white rounded-3xl border border-dashed border-slate-300">
                Memuat data tempat umum...
              </div>
            ) : filteredPlaces.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center">
                <MapPin className="mx-auto mb-2 h-12 w-12 text-slate-300" />
                <h3 className="mb-1 text-lg font-bold text-slate-800">
                  Tempat Tidak Ditemukan
                </h3>
                <p className="text-sm text-slate-500">
                  Tidak ada lokasi fasilitas umum yang cocok.
                </p>
              </div>
            ) : (
              <BentoGrid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredPlaces.map((place) => {
                  const IconComp = getPlaceCategoryIcon(place.category);
                  const mapPlaceUrl = place.googleMapsUrl && place.googleMapsUrl.startsWith("http")
                    ? place.googleMapsUrl
                    : `https://maps.google.com/maps?q=${encodeURIComponent(place.name + ", " + place.address + ", Kelurahan Bubulak, Kota Bogor")}`;

                  return (
                    <BentoCard
                      key={place.id}
                      colSpan="col-span-1"
                      icon={<IconComp className="h-5 w-5" />}
                      title={place.name}
                      subtitle={place.category}
                    >
                      {place.description && (
                        <p className="mb-3 text-xs text-slate-600 leading-relaxed font-medium">
                          {place.description}
                        </p>
                      )}

                      <div className="mb-4 flex items-start gap-1.5 text-xs font-semibold text-slate-500">
                        <MapPin className="h-3.5 w-3.5 shrink-0 text-emerald-600 mt-0.5" />
                        <span>{place.address}</span>
                      </div>

                      <a
                        href={mapPlaceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 text-xs font-extrabold text-white transition-colors hover:bg-emerald-800 min-h-[44px]"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Petunjuk Arah Google Maps
                      </a>
                    </BentoCard>
                  );
                })}
              </BentoGrid>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
