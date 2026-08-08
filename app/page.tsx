export const dynamic = "force-dynamic";
export const revalidate = 0;

import Link from "next/link";
import Image from "next/image";
import {
  Landmark,
  Clock,
  ChevronRight,
  Calendar,
  ArrowRight,
  Sparkles,
  FileText,
  Search,
  MessageSquare,
  Building,
  Users,
  ShoppingBag,
  CheckCircle2,
  PhoneCall,
  MapPin,
  MessageSquareWarning,
  Award,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { OperationalHoursWidget } from "@/components/OperationalHoursWidget";
import { fetchNews, fetchSiteSettings, fetchUmkm } from "@/lib/services";

function formatDate(dateString: string): string {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function HomePage() {
  const [siteSettings, newsItems, umkmList] = await Promise.all([
    fetchSiteSettings(),
    fetchNews(),
    fetchUmkm(),
  ]);

  const verifiedUmkm = umkmList.filter((u) => u.isVerified).slice(0, 3);

  return (
    <div className="flex flex-col space-y-12 pb-16 bg-slate-50">
      {/* ============================================ */}
      {/* URUTAN 1: HERO & SELAMAT DATANG */}
      {/* ============================================ */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-900 via-emerald-800 to-slate-900 text-white pt-12 pb-20 sm:pt-16 sm:pb-24">
        {/* Subtle Background Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10" aria-hidden="true" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            {/* Lencana Portal Digital */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/20 px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider text-emerald-200">
              <Sparkles className="h-4 w-4 text-amber-300" />
              Portal Layanan Publik Digital Resmi
            </div>

            {/* Headline Principal */}
            <h1 className="mb-4 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Selamat Datang di{" "}
              <span className="bg-gradient-to-r from-emerald-200 via-teal-200 to-amber-200 bg-clip-text text-transparent">
                {siteSettings.villageName}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mx-auto mb-8 max-w-2xl text-base text-emerald-100/90 sm:text-xl font-medium leading-relaxed">
              Pelayanan administrasi kependudukan cepat, transparan, dan tanpa antre lama. Cek syarat surat atau ajukan permohonan langsung dari HP Anda.
            </p>

            {/* Lurah Greeting Card */}
            <div className="inline-flex items-center gap-4 rounded-3xl border border-emerald-500/30 bg-white/10 p-4 text-left backdrop-blur-xs shadow-md max-w-lg mx-auto">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-700 text-white shrink-0 border border-emerald-500/50 shadow-sm">
                <Landmark className="h-7 w-7 text-amber-300" />
              </div>
              <div>
                <p className="text-xs font-extrabold uppercase tracking-wider text-emerald-300">
                  Lurah Bubulak
                </p>
                <p className="text-base font-extrabold text-white">
                  {siteSettings.lurahName}
                </p>
                <p className="text-xs text-emerald-100/80">
                  Kecamatan Bogor Barat · Kota Bogor
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* URUTAN 2: AKSES PINTAS LAYANAN (QUICK ACCESS) */}
      {/* ============================================ */}
      <section className="mx-auto w-full max-w-7xl px-4 -mt-16 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Card 1: Ajukan Surat Online */}
          <Link
            href="/ajukan"
            className="group flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:border-emerald-400 hover:shadow-md transition-all duration-200"
          >
            <div>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-700 text-white shadow-xs group-hover:bg-emerald-600 transition-colors">
                <FileText className="h-6 w-6" />
              </div>
              <h3 className="mb-1 text-lg font-extrabold text-slate-900 group-hover:text-emerald-700 transition-colors">
                Ajukan Surat Online
              </h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Isi form permohonan dokumen mandiri dari HP 24/7.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-1 text-xs font-bold text-emerald-800">
              Buat Pengajuan <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>

          {/* Card 2: Cek Resi Ticket */}
          <Link
            href="/cek-resi"
            className="group flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:border-blue-400 hover:shadow-md transition-all duration-200"
          >
            <div>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-700 text-white shadow-xs group-hover:bg-blue-600 transition-colors">
                <Search className="h-6 w-6" />
              </div>
              <h3 className="mb-1 text-lg font-extrabold text-slate-900 group-hover:text-blue-700 transition-colors">
                Cek Status Resi Ticket
              </h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Lacak status perkembangan surat atau aduan real-time.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-1 text-xs font-bold text-blue-800">
              Lacak Resi <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>

          {/* Card 3: Syarat Berkas */}
          <Link
            href="/layanan"
            className="group flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:border-slate-400 hover:shadow-md transition-all duration-200"
          >
            <div>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-xs group-hover:bg-slate-800 transition-colors">
                <Building className="h-6 w-6" />
              </div>
              <h3 className="mb-1 text-lg font-extrabold text-slate-900 group-hover:text-slate-700 transition-colors">
                Katalog Syarat Surat
              </h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Checklist persyaratan lengkap setiap dokumen kependudukan.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-1 text-xs font-bold text-slate-800">
              Lihat Syarat <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>

          {/* Card 4: Pengaduan Warga */}
          <Link
            href="/laporan"
            className="group flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:border-amber-400 hover:shadow-md transition-all duration-200"
          >
            <div>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-600 text-white shadow-xs group-hover:bg-amber-500 transition-colors">
                <MessageSquareWarning className="h-6 w-6" />
              </div>
              <h3 className="mb-1 text-lg font-extrabold text-slate-900 group-hover:text-amber-700 transition-colors">
                Pengaduan & Aspirasi
              </h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Laporkan kendala fasilitas umum & lingkungan warga.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-1 text-xs font-bold text-amber-800">
              Buat Laporan <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        </div>
      </section>

      {/* ============================================ */}
      {/* URUTAN 3: JADWAL & STATUS OPERASIONAL KELURAHAN */}
      {/* ============================================ */}
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xs">
          <OperationalHoursWidget />
        </div>
      </section>

      {/* ============================================ */}
      {/* URUTAN 4: DEMOGRAFI & STATISTIK PENDUDUK */}
      {/* ============================================ */}
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100/80 text-emerald-800 font-bold border border-emerald-200/60">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                  Demografi & Statistik Penduduk
                </h2>
                <p className="text-xs font-semibold text-slate-500">
                  Data kependudukan & wilayah Kelurahan Bubulak terkini
                </p>
              </div>
            </div>
            <Link
              href="/profil"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800"
            >
              Lihat Profil Lengkap <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4 text-center">
              <p className="text-3xl font-extrabold text-emerald-800">
                {siteSettings.demographics.totalPopulation.toLocaleString("id-ID")}
              </p>
              <p className="text-xs font-bold text-slate-600 uppercase tracking-wider mt-1">
                Total Penduduk (Jiwa)
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center">
              <p className="text-3xl font-extrabold text-slate-900">
                {siteSettings.demographics.totalKK.toLocaleString("id-ID")}
              </p>
              <p className="text-xs font-bold text-slate-600 uppercase tracking-wider mt-1">
                Kepala Keluarga (KK)
              </p>
            </div>

            <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-4 text-center">
              <p className="text-3xl font-extrabold text-amber-900">
                {siteSettings.demographics.rtCount} / {siteSettings.demographics.rwCount}
              </p>
              <p className="text-xs font-bold text-slate-600 uppercase tracking-wider mt-1">
                Jumlah RT / RW
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center">
              <p className="text-2xl font-extrabold text-slate-900">
                {siteSettings.demographics.areaSize}
              </p>
              <p className="text-xs font-bold text-slate-600 uppercase tracking-wider mt-1">
                Luas Wilayah Total
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* URUTAN 5: BERITA & PENGUMUMAN TERKINI */}
      {/* ============================================ */}
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <div className="mb-1 inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-0.5 text-xs font-bold text-emerald-800">
                <Sparkles className="h-3.5 w-3.5 text-emerald-700" /> Berita Terkini
              </div>
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                Pengumuman & Kabar Kelurahan
              </h2>
            </div>
            <Link
              href="/berita"
              className="inline-flex items-center gap-1 text-xs font-extrabold text-emerald-700 hover:text-emerald-800"
            >
              Lihat Semua Berita <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {newsItems.slice(0, 3).map((news) => (
              <div
                key={news.id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all hover:border-emerald-300 hover:shadow-sm"
              >
                <div className="relative h-44 w-full overflow-hidden bg-slate-900 flex items-center justify-center text-white">
                  {news.coverImageUrl && (news.coverImageUrl.startsWith("http") || news.coverImageUrl.startsWith("/")) ? (
                    <Image
                      src={news.coverImageUrl}
                      alt={news.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      unoptimized
                    />
                  ) : null}
                  <Landmark className="absolute h-14 w-14 text-white/30 -z-10" />
                  <div className="absolute top-3 left-3 z-10">
                    <Badge
                      className={`text-xs font-bold ${
                        news.category === "Pengumuman"
                          ? "bg-amber-500 text-white"
                          : news.category === "Kesehatan"
                          ? "bg-blue-600 text-white"
                          : "bg-emerald-700 text-white"
                      }`}
                    >
                      {news.category}
                    </Badge>
                  </div>
                </div>

                <div className="flex flex-1 flex-col justify-between p-5">
                  <div>
                    <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                      <Calendar className="h-3.5 w-3.5 text-emerald-600" />
                      {formatDate(news.publishedAt)}
                    </div>
                    <h3 className="mb-2 line-clamp-2 text-base font-extrabold text-slate-900 group-hover:text-emerald-700 transition-colors">
                      {news.title}
                    </h3>
                    <p className="line-clamp-3 text-xs text-slate-600 font-medium leading-relaxed">
                      {news.summary}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <Link
                      href={`/berita/${news.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-extrabold text-emerald-700 group-hover:text-emerald-800"
                    >
                      Baca selengkapnya <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* URUTAN 6: DIREKTORI UNGGULAN UMKM & TEMPAT UMUM */}
      {/* ============================================ */}
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-100 text-amber-900 font-bold border border-amber-200">
                <ShoppingBag className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                  Direktori UMKM Unggulan Warga
                </h2>
                <p className="text-xs font-semibold text-slate-500">
                  Usaha lokal terverifikasi di wilayah Kelurahan Bubulak
                </p>
              </div>
            </div>
            <Link
              href="/umkm"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800"
            >
              Lihat Katalog UMKM & Peta <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {verifiedUmkm.map((u) => (
              <div
                key={u.id}
                className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50/60 p-4"
              >
                <div>
                  <Badge className="mb-2 bg-emerald-700 text-white font-extrabold text-[10px] uppercase">
                    {u.category}
                  </Badge>
                  <h3 className="font-extrabold text-base text-slate-900">
                    {u.businessName}
                  </h3>
                  <p className="text-xs font-semibold text-emerald-700 mt-0.5">
                    Pemilik: {u.ownerName}
                  </p>
                  <p className="text-xs text-slate-600 line-clamp-2 mt-2 font-medium">
                    {u.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200/80">
                  <a
                    href={`https://wa.me/${u.whatsappContact}?text=${encodeURIComponent(
                      `Halo ${u.ownerName}, saya berminat dengan produk *${u.businessName}*.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 w-full items-center justify-center gap-1.5 rounded-xl bg-emerald-700 text-xs font-bold text-white hover:bg-emerald-800 transition-colors"
                  >
                    <MessageSquare className="h-3.5 w-3.5" /> Pesan via WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* URUTAN 7: BANNER PANGGIL PENGADUAN & KONTAK */}
      {/* ============================================ */}
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-800 bg-slate-950 text-white p-8 sm:p-12 shadow-sm relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="max-w-2xl">
              <Badge className="mb-3 bg-amber-500 text-slate-950 font-extrabold text-xs">
                Kanal Layanan Aspirasi Warga
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Ada Kendala Lingkungan atau Fasilitas Umum?
              </h2>
              <p className="mt-2 text-sm text-slate-300 leading-relaxed font-medium">
                Sampaikan laporan aduan Anda secara online. Petugas kelurahan akan menerima tiket dan menindaklanjuti secara responsif.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link
                href="/laporan"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-amber-500 px-6 text-sm font-extrabold text-slate-950 shadow-sm transition-all hover:bg-amber-400 min-h-[48px]"
              >
                Buat Pengaduan Warga <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={`https://wa.me/${siteSettings.contactWhatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-slate-700 bg-slate-900 px-6 text-sm font-extrabold text-white hover:bg-slate-800 min-h-[48px]"
              >
                <MessageSquare className="h-4 w-4 text-emerald-400" /> WhatsApp Resmi
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
