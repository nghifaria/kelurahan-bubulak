export const dynamic = "force-dynamic";
export const revalidate = 0;

import Link from "next/link";
import {
  Landmark,
  ChevronRight,
  Sparkles,
  Users,
  Target,
  Award,
  MapPin,
  Building,
  UserCheck,
  CheckCircle2,
  Briefcase,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  siteSettings,
  staffMembersList,
  achievementsList,
  villageStats,
} from "@/lib/data";

export default function ProfilPage() {
  const sortedStaff = [...staffMembersList].sort(
    (a, b) => a.displayOrder - b.displayOrder
  );

  return (
    <div className="flex flex-col">
      {/* ============================================ */}
      {/* PAGE HEADER */}
      {/* ============================================ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-800 via-emerald-700 to-emerald-900">
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
            <span className="font-medium text-white">Profil Kelurahan</span>
          </nav>

          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/20 px-4 py-2 text-sm font-medium text-emerald-100 backdrop-blur-sm">
            <Sparkles className="h-4 w-4" />
            Mengenal Lebih Dekat
          </div>

          <h1 className="mb-4 text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
            Profil Kelurahan Bubulak
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-emerald-100/90">
            Kecamatan Bogor Barat, Kota Bogor · Jawa Barat
          </p>
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
      {/* STATISTIK WILAYAH */}
      {/* ============================================ */}
      <section className="mx-auto w-full max-w-5xl px-4 -mt-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-5">
          <Card className="border-2 border-emerald-200/80 bg-white text-center shadow-lg">
            <CardContent className="p-4 sm:p-6">
              <p className="text-3xl font-extrabold text-emerald-700 sm:text-4xl">
                {villageStats.areaKm2}
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-600">
                Luas Wilayah (km²)
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-emerald-200/80 bg-white text-center shadow-lg">
            <CardContent className="p-4 sm:p-6">
              <p className="text-3xl font-extrabold text-emerald-700 sm:text-4xl">
                {villageStats.rwCount}
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-600">
                Rukun Warga (RW)
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-emerald-200/80 bg-white text-center shadow-lg">
            <CardContent className="p-4 sm:p-6">
              <p className="text-3xl font-extrabold text-emerald-700 sm:text-4xl">
                {villageStats.rtCount}
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-600">
                Rukun Tetangga (RT)
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-emerald-200/80 bg-white text-center shadow-lg">
            <CardContent className="p-4 sm:p-6">
              <p className="text-3xl font-extrabold text-emerald-700 sm:text-4xl">
                {villageStats.population.toLocaleString("id-ID")}
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-600">
                Jiwa Penduduk
              </p>
            </CardContent>
          </Card>

          <Card className="col-span-2 border-2 border-emerald-200/80 bg-white text-center shadow-lg sm:col-span-4 lg:col-span-1">
            <CardContent className="p-4 sm:p-6">
              <p className="text-3xl font-extrabold text-emerald-700 sm:text-4xl">
                {villageStats.familyCount.toLocaleString("id-ID")}
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-600">
                Kepala Keluarga (KK)
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ============================================ */}
      {/* VISI & MISI */}
      {/* ============================================ */}
      <section className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-bold text-emerald-800">
            <Target className="h-4 w-4" /> Visi & Misi
          </div>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Arah & Landasan Pelayanan Kami
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* VISI */}
          <Card className="border-2 border-emerald-300 bg-gradient-to-br from-emerald-50 via-white to-emerald-100/50 shadow-lg">
            <CardContent className="p-6 sm:p-8">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-700 text-white">
                  <Target className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold text-emerald-900">
                  Visi Kelurahan
                </h3>
              </div>
              <blockquote className="rounded-xl border-l-4 border-emerald-600 bg-white p-4 text-xl font-bold italic leading-relaxed text-slate-800 shadow-sm">
                &ldquo;Terwujudnya Kelurahan Bubulak yang Maju, Sejahtera, Mandiri, dan Melayani dengan Sepenuh Hati Berbasis Pelayanan Digital.&rdquo;
              </blockquote>
            </CardContent>
          </Card>

          {/* MISI */}
          <Card className="border-2 border-slate-200 bg-white shadow-lg">
            <CardContent className="p-6 sm:p-8">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-700 text-white">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">
                  Misi Kelurahan
                </h3>
              </div>
              <ul className="space-y-3">
                {[
                  "Meningkatkan kualitas pelayanan publik berbasis teknologi informasi yang cepat, ramah, dan transparan.",
                  "Meningkatkan kualitas sarana dan prasarana lingkungan hidup yang bersih, sehat, dan aman.",
                  "Mendorong pertumbuhan ekonomi warga melalui pemberdayaan UMKM lokal dan ekonomi kreatif.",
                  "Mempererat keharmonisan dan gotong royong antar warga masyarakat Kelurahan Bubulak.",
                ].map((misi, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-base text-slate-700">
                    <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 font-bold text-xs text-emerald-800">
                      {idx + 1}
                    </div>
                    <span>{misi}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ============================================ */}
      {/* STRUKTUR ORGANISASI & PEGAWAI */}
      {/* ============================================ */}
      <section className="bg-slate-50 py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-bold text-emerald-800">
              <Users className="h-4 w-4" /> Aparatur Kelurahan
            </div>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Struktur Organisasi Pegawai
            </h2>
            <p className="mt-2 text-lg text-slate-600">
              Jajaran aparatur pemerintah Kelurahan Bubulak yang siap melayani warga
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sortedStaff.map((staff) => {
              const isLurah = staff.displayOrder === 1;
              return (
                <Card
                  key={staff.id}
                  className={`overflow-hidden border-2 transition-all duration-300 ${
                    isLurah
                      ? "border-amber-400 bg-gradient-to-b from-amber-50/50 to-white shadow-xl ring-2 ring-amber-300 sm:col-span-2 lg:col-span-3 max-w-md mx-auto w-full"
                      : "border-slate-200 bg-white hover:border-emerald-300 hover:shadow-lg"
                  }`}
                >
                  <CardContent className="p-6 text-center">
                    {/* Staff Photo Placeholder */}
                    <div
                      className={`mx-auto mb-4 flex items-center justify-center rounded-2xl shadow-md ${
                        isLurah
                          ? "h-28 w-28 bg-emerald-800 text-white ring-4 ring-amber-300"
                          : "h-20 w-20 bg-emerald-700 text-white"
                      }`}
                    >
                      <Landmark className={isLurah ? "h-14 w-14" : "h-10 w-10"} />
                    </div>

                    {isLurah && (
                      <Badge className="mb-2 bg-amber-500 text-white font-bold text-xs uppercase tracking-wider">
                        Pimpinan Utama
                      </Badge>
                    )}

                    <h3
                      className={`font-bold text-slate-900 ${
                        isLurah ? "text-xl sm:text-2xl" : "text-lg"
                      }`}
                    >
                      {staff.name}
                    </h3>
                    <p
                      className={`mt-1 font-semibold ${
                        isLurah ? "text-base text-emerald-800" : "text-sm text-emerald-700"
                      }`}
                    >
                      {staff.position}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* PRESTASI KELURAHAN */}
      {/* ============================================ */}
      <section className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-1.5 text-sm font-bold text-amber-900">
            <Award className="h-4 w-4 text-amber-700" /> Penghargaan
          </div>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Prestasi Kelurahan Bubulak
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {achievementsList.map((ach) => (
            <Card
              key={ach.id}
              className="border-2 border-amber-200/80 bg-gradient-to-br from-amber-50/40 via-white to-white shadow-md"
            >
              <CardContent className="p-6">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500 text-white shadow-md">
                    <Award className="h-5 w-5" />
                  </div>
                  <Badge className="bg-amber-800 text-white font-extrabold text-sm">
                    {ach.year}
                  </Badge>
                </div>
                <h3 className="mb-2 text-lg font-bold text-slate-900">
                  {ach.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {ach.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
