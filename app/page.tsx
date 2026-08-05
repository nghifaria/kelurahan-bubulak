export const dynamic = "force-dynamic";
export const revalidate = 0;

import Link from "next/link";
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
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { BentoGrid } from "@/components/BentoGrid";
import { BentoCard } from "@/components/BentoCard";
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
    <div className="flex flex-col space-y-10 pb-12 bg-slate-50">
      {/* ============================================ */}
      {/* SECTION 1: HERO SECTION MINIMALIS */}
      {/* ============================================ */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-900 via-emerald-800 to-slate-900 text-white pt-12 pb-20 sm:pt-16 sm:pb-24">
        {/* Subtle Background Pattern (No heavy blurs) */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)",
              backgroundSize: "28px 28px",
            }}
          />
        </div>

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
              Pelayanan administrasi kependudukan cepat, transparan, dan tanpa harus antre lama. Cek syarat surat atau ajukan langsung secara online.
            </p>

            {/* Aksi Cepat Buttons (Touch target min 44x44px) */}
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <Link
                href="/ajukan"
                className="inline-flex h-14 w-full items-center justify-center gap-2.5 rounded-2xl bg-emerald-500 px-8 text-base font-extrabold text-slate-950 shadow-md transition-all hover:bg-emerald-400 active:scale-[0.98] sm:w-auto min-h-[48px]"
              >
                <FileText className="h-5 w-5" />
                Ajukan Surat Online
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/layanan"
                className="inline-flex h-14 w-full items-center justify-center gap-2.5 rounded-2xl border-2 border-emerald-300/30 bg-white/10 px-8 text-base font-extrabold text-white backdrop-blur-xs transition-all hover:bg-white/20 active:scale-[0.98] sm:w-auto min-h-[48px]"
              >
                Cek Syarat Surat
                <ChevronRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* SECTION 2: BENTO GRID LAYOUT (6 CARD MAIN) */}
      {/* ============================================ */}
      <section className="mx-auto w-full max-w-7xl px-4 -mt-14 sm:px-6 lg:px-8 z-10">
        <BentoGrid className="grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* CARD 1: WIDGET OPERASIONAL HARI & JAM KERJA (WIB) */}
          <div className="md:col-span-2 lg:col-span-2 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <OperationalHoursWidget />
          </div>

          {/* CARD 2: AKSES CEPAT LAYANAN & CEK RESI */}
          <BentoCard
            colSpan="md:col-span-2 lg:col-span-2"
            icon={<FileText className="h-5 w-5" />}
            title="Akses Pintas Layanan Warga"
            subtitle="Pilih kebutuhan administrasi dalam sekali sentuh"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-2">
              <Link
                href="/ajukan"
                className="group flex flex-col justify-between rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4 transition-all hover:bg-emerald-600 hover:text-white"
              >
                <div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-700 text-white group-hover:bg-white group-hover:text-emerald-800 mb-2">
                    <FileText className="h-5 w-5" />
                  </div>
                  <p className="font-extrabold text-base text-slate-900 group-hover:text-white">
                    Buat Surat
                  </p>
                  <p className="text-xs text-slate-600 group-hover:text-emerald-100">
                    Isi form pengajuan dari HP
                  </p>
                </div>
                <div className="mt-3 flex items-center text-xs font-bold text-emerald-800 group-hover:text-white">
                  Ajukan <ArrowRight className="h-3.5 w-3.5 ml-1" />
                </div>
              </Link>

              <Link
                href="/cek-resi"
                className="group flex flex-col justify-between rounded-2xl border border-blue-200 bg-blue-50/60 p-4 transition-all hover:bg-blue-600 hover:text-white"
              >
                <div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-700 text-white group-hover:bg-white group-hover:text-blue-800 mb-2">
                    <Search className="h-5 w-5" />
                  </div>
                  <p className="font-extrabold text-base text-slate-900 group-hover:text-white">
                    Cek Status Resi
                  </p>
                  <p className="text-xs text-slate-600 group-hover:text-blue-100">
                    Lacak progres berkas ticket
                  </p>
                </div>
                <div className="mt-3 flex items-center text-xs font-bold text-blue-800 group-hover:text-white">
                  Lacak Resi <ArrowRight className="h-3.5 w-3.5 ml-1" />
                </div>
              </Link>

              <Link
                href="/layanan"
                className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4 transition-all hover:bg-slate-800 hover:text-white"
              >
                <div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 text-white group-hover:bg-white group-hover:text-slate-900 mb-2">
                    <Building className="h-5 w-5" />
                  </div>
                  <p className="font-extrabold text-base text-slate-900 group-hover:text-white">
                    Syarat Berkas
                  </p>
                  <p className="text-xs text-slate-600 group-hover:text-slate-300">
                    Persyaratan lengkap surat
                  </p>
                </div>
                <div className="mt-3 flex items-center text-xs font-bold text-slate-800 group-hover:text-white">
                  Lihat Syarat <ArrowRight className="h-3.5 w-3.5 ml-1" />
                </div>
              </Link>
            </div>
          </BentoCard>

          {/* CARD 3: STATISTIK DEMOGRAFI PENDUDUK */}
          <BentoCard
            colSpan="md:col-span-2 lg:col-span-2"
            icon={<Users className="h-5 w-5" />}
            title="Statistik Kelurahan Bubulak"
            subtitle="Data kependudukan & wilayah terkini"
          >
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-2">
              <div className="rounded-2xl bg-emerald-50/80 p-3.5 text-center border border-emerald-200/60">
                <p className="text-2xl font-extrabold text-emerald-800">
                  {siteSettings.demographics.totalPopulation.toLocaleString("id-ID")}
                </p>
                <p className="text-[11px] font-bold text-slate-600 uppercase tracking-wider mt-0.5">
                  Penduduk (Jiwa)
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-3.5 text-center border border-slate-200">
                <p className="text-2xl font-extrabold text-slate-900">
                  {siteSettings.demographics.totalKK.toLocaleString("id-ID")}
                </p>
                <p className="text-[11px] font-bold text-slate-600 uppercase tracking-wider mt-0.5">
                  Kepala Keluarga
                </p>
              </div>

              <div className="rounded-2xl bg-amber-50/80 p-3.5 text-center border border-amber-200/60">
                <p className="text-2xl font-extrabold text-amber-900">
                  {siteSettings.demographics.rtCount} / {siteSettings.demographics.rwCount}
                </p>
                <p className="text-[11px] font-bold text-slate-600 uppercase tracking-wider mt-0.5">
                  Jumlah RT / RW
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-3.5 text-center border border-slate-200">
                <p className="text-xl font-extrabold text-slate-900">
                  {siteSettings.demographics.areaSize}
                </p>
                <p className="text-[11px] font-bold text-slate-600 uppercase tracking-wider mt-0.5">
                  Luas Wilayah
                </p>
              </div>
            </div>
          </BentoCard>

          {/* CARD 4: BERITA & PENGUMUMAN TERBARU */}
          <BentoCard
            colSpan="md:col-span-2 lg:col-span-2"
            icon={<Sparkles className="h-5 w-5" />}
            title="Berita & Pengumuman"
            subtitle="Informasi resmi terkini kelurahan"
            badge={
              <Link
                href="/berita"
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
              >
                Semua Berita <ArrowRight className="h-3 w-3" />
              </Link>
            }
          >
            <div className="space-y-3 mt-2">
              {newsItems.slice(0, 2).map((news) => (
                <Link
                  key={news.id}
                  href={`/berita/${news.slug}`}
                  className="flex items-start gap-3.5 rounded-2xl border border-slate-200 p-3 transition-colors hover:bg-slate-50"
                >
                  <div className="h-16 w-20 shrink-0 overflow-hidden rounded-xl bg-slate-200">
                    {news.coverImageUrl ? (
                      <img
                        src={news.coverImageUrl}
                        alt={news.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-emerald-800 text-white font-bold text-xs">
                        BUBULAK
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-[11px] text-slate-500 mb-0.5 font-semibold">
                      <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                        {news.category}
                      </Badge>
                      <span>{formatDate(news.publishedAt)}</span>
                    </div>
                    <p className="font-bold text-slate-900 text-sm line-clamp-1">
                      {news.title}
                    </p>
                    <p className="text-xs text-slate-600 line-clamp-1 mt-0.5">
                      {news.summary}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </BentoCard>

          {/* CARD 5: UNGGULAN UMKM LOKAL */}
          <BentoCard
            colSpan="md:col-span-2 lg:col-span-2"
            icon={<ShoppingBag className="h-5 w-5" />}
            title="Direktori UMKM Lokal"
            subtitle="Dukung usaha warga Bubulak"
            badge={
              <Link
                href="/umkm"
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
              >
                Lihat UMKM <ArrowRight className="h-3 w-3" />
              </Link>
            }
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-2">
              {verifiedUmkm.map((u) => (
                <div
                  key={u.id}
                  className="rounded-2xl border border-slate-200 bg-white p-3 shadow-2xs text-left"
                >
                  <p className="font-extrabold text-sm text-slate-900 line-clamp-1">
                    {u.businessName}
                  </p>
                  <p className="text-xs font-semibold text-emerald-700">
                    {u.category} · {u.ownerName}
                  </p>
                  <a
                    href={`https://wa.me/${u.whatsappContact}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2.5 inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-800 border border-emerald-200/60 hover:bg-emerald-600 hover:text-white transition-colors"
                  >
                    <MessageSquare className="h-3.5 w-3.5" /> Pesan WA
                  </a>
                </div>
              ))}
            </div>
          </BentoCard>

          {/* CARD 6: BANNER PANGGIL PENGADUAN WARGA */}
          <BentoCard
            colSpan="md:col-span-2 lg:col-span-2"
            className="bg-gradient-to-r from-slate-900 to-slate-800 text-white border-slate-800"
            icon={<MessageSquare className="h-5 w-5 text-amber-400" />}
            title="Pengaduan & Aspirasi Warga"
            subtitle="Ada kendala lingkungan atau fasilitas publik?"
          >
            <div className="mt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <p className="text-sm text-slate-300 max-w-md">
                Sampaikan laporan aduan secara online. Tim kelurahan akan menindaklanjuti secara responsif.
              </p>
              <Link
                href="/laporan"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-amber-500 px-6 text-sm font-bold text-slate-950 shadow-sm transition-all hover:bg-amber-400 active:scale-[0.98] shrink-0 min-h-[44px]"
              >
                Buat Pengaduan <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </BentoCard>
        </BentoGrid>
      </section>

      {/* ============================================ */}
      {/* SECTION 3: SAMBUTAN LURAH & GAMBARAN UMUM */}
      {/* ============================================ */}
      <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-xs">
          <div className="grid gap-8 lg:grid-cols-3 lg:items-center">
            {/* Profil Lurah Card */}
            <div className="text-center lg:text-left">
              <div className="mx-auto lg:mx-0 flex h-32 w-32 items-center justify-center rounded-3xl bg-emerald-900 text-white shadow-md border-2 border-emerald-600 mb-4 overflow-hidden relative">
                <Landmark className="h-16 w-16 text-white/30" />
              </div>
              <Badge className="mb-2 bg-amber-600 text-white font-extrabold text-xs uppercase tracking-wider">
                Lurah Bubulak
              </Badge>
              <h3 className="text-xl font-extrabold text-slate-900">
                {siteSettings.lurahName}
              </h3>
              <p className="text-xs font-semibold text-emerald-700">
                Pemerintah Kecamatan Bogor Barat
              </p>
            </div>

            {/* Narasi Gambaran Umum */}
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-2xl font-extrabold text-slate-900 border-b border-slate-100 pb-3">
                Komitmen Pelayanan Publik Bubulak
              </h2>
              <p className="text-base leading-relaxed text-slate-700 bg-slate-50 p-5 rounded-2xl border border-slate-200/80">
                &ldquo;{siteSettings.overviewText}&rdquo;
              </p>
              <div className="flex flex-wrap gap-4 text-xs font-bold text-slate-600">
                <span className="flex items-center gap-1.5 bg-emerald-50 text-emerald-800 px-3 py-1.5 rounded-xl border border-emerald-200">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Bebas Antre & Cepat
                </span>
                <span className="flex items-center gap-1.5 bg-emerald-50 text-emerald-800 px-3 py-1.5 rounded-xl border border-emerald-200">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Verifikasi Digital Resmi
                </span>
                <span className="flex items-center gap-1.5 bg-emerald-50 text-emerald-800 px-3 py-1.5 rounded-xl border border-emerald-200">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Terhubung Langsung ke WhatsApp
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
