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
  CheckCircle2,
  Compass,
  Home,
  User,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  fetchSiteSettings,
  fetchStaffMembers,
  fetchAchievements,
} from "@/lib/services";

export default async function ProfilPage() {
  const [siteSettings, staffList, achievementsList] = await Promise.all([
    fetchSiteSettings(),
    fetchStaffMembers(),
    fetchAchievements(),
  ]);

  const sortedStaff = [...staffList].sort(
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
            Profil Resmi Kelurahan
          </div>

          <h1 className="mb-4 text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
            Profil {siteSettings.villageName}
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
      {/* STATISTIK WILAYAH & PENDUDUK */}
      {/* ============================================ */}
      <section className="mx-auto w-full max-w-6xl px-4 -mt-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          <Card className="border-2 border-emerald-200 bg-white text-center shadow-lg">
            <CardContent className="p-4">
              <p className="text-2xl font-extrabold text-emerald-700 sm:text-3xl">
                {siteSettings.demographics.totalPopulation.toLocaleString("id-ID")}
              </p>
              <p className="mt-1 text-xs font-bold text-slate-600 uppercase tracking-wider">
                Total Penduduk (Jiwa)
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-emerald-200 bg-white text-center shadow-lg">
            <CardContent className="p-4">
              <p className="text-2xl font-extrabold text-emerald-700 sm:text-3xl">
                {siteSettings.demographics.totalKK.toLocaleString("id-ID")}
              </p>
              <p className="mt-1 text-xs font-bold text-slate-600 uppercase tracking-wider">
                Kepala Keluarga (KK)
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-blue-200 bg-blue-50/50 text-center shadow-lg">
            <CardContent className="p-4">
              <p className="text-2xl font-extrabold text-blue-800 sm:text-3xl">
                {siteSettings.demographics.malePopulation.toLocaleString("id-ID")}
              </p>
              <p className="mt-1 text-xs font-bold text-blue-900 uppercase tracking-wider">
                Laki-laki (Jiwa)
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-pink-200 bg-pink-50/50 text-center shadow-lg">
            <CardContent className="p-4">
              <p className="text-2xl font-extrabold text-pink-700 sm:text-3xl">
                {siteSettings.demographics.femalePopulation.toLocaleString("id-ID")}
              </p>
              <p className="mt-1 text-xs font-bold text-pink-900 uppercase tracking-wider">
                Perempuan (Jiwa)
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-amber-200 bg-amber-50/50 text-center shadow-lg">
            <CardContent className="p-4">
              <p className="text-2xl font-extrabold text-amber-800 sm:text-3xl">
                {siteSettings.demographics.rtCount} / {siteSettings.demographics.rwCount}
              </p>
              <p className="mt-1 text-xs font-bold text-amber-900 uppercase tracking-wider">
                Jumlah RT / RW
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-emerald-200 bg-white text-center shadow-lg">
            <CardContent className="p-4">
              <p className="text-2xl font-extrabold text-emerald-700 sm:text-3xl">
                {siteSettings.demographics.areaSize}
              </p>
              <p className="mt-1 text-xs font-bold text-slate-600 uppercase tracking-wider">
                Luas Wilayah
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ============================================ */}
      {/* GAMBARAN UMUM & BATAS WILAYAH */}
      {/* ============================================ */}
      <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Gambaran Umum */}
          <div className="lg:col-span-2">
            <Card className="h-full border-2 border-slate-200 shadow-md">
              <CardContent className="p-6 sm:p-8">
                <div className="mb-4 flex items-center gap-3 border-b border-slate-100 pb-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-700 text-white">
                    <Building className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-extrabold text-slate-900">
                      Gambaran Umum Wilayah
                    </h2>
                    <p className="text-sm font-semibold text-emerald-700">
                      Profil & Karakteristik Kelurahan Bubulak
                    </p>
                  </div>
                </div>

                <p className="text-lg leading-relaxed text-slate-700 bg-slate-50 p-6 rounded-2xl border border-slate-200/80">
                  {siteSettings.overviewText}
                </p>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-4">
                    <p className="text-xs font-bold text-emerald-900 uppercase tracking-wider">
                      Ketinggian Wilayah
                    </p>
                    <p className="text-xl font-extrabold text-emerald-800 mt-0.5">
                      {siteSettings.demographics.altitude}
                    </p>
                  </div>
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-4">
                    <p className="text-xs font-bold text-emerald-900 uppercase tracking-wider">
                      Luas Total Wilayah
                    </p>
                    <p className="text-xl font-extrabold text-emerald-800 mt-0.5">
                      {siteSettings.demographics.areaSize}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Batas Wilayah */}
          <div>
            <Card className="h-full border-2 border-emerald-300 bg-gradient-to-br from-emerald-900 via-emerald-800 to-slate-900 text-white shadow-lg">
              <CardContent className="p-6 sm:p-8">
                <div className="mb-6 flex items-center gap-3 border-b border-emerald-700/60 pb-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-md">
                    <Compass className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-extrabold text-white">
                      Batas Wilayah
                    </h2>
                    <p className="text-xs text-emerald-200">
                      Kelurahan Bubulak
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-xl bg-white/10 p-3.5 backdrop-blur-sm border border-white/10">
                    <p className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
                      Sebelah Utara
                    </p>
                    <p className="text-base font-bold text-white mt-0.5">
                      {siteSettings.boundaries.north}
                    </p>
                  </div>

                  <div className="rounded-xl bg-white/10 p-3.5 backdrop-blur-sm border border-white/10">
                    <p className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
                      Sebelah Selatan
                    </p>
                    <p className="text-base font-bold text-white mt-0.5">
                      {siteSettings.boundaries.south}
                    </p>
                  </div>

                  <div className="rounded-xl bg-white/10 p-3.5 backdrop-blur-sm border border-white/10">
                    <p className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
                      Sebelah Barat
                    </p>
                    <p className="text-base font-bold text-white mt-0.5">
                      {siteSettings.boundaries.west}
                    </p>
                  </div>

                  <div className="rounded-xl bg-white/10 p-3.5 backdrop-blur-sm border border-white/10">
                    <p className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
                      Sebelah Timur
                    </p>
                    <p className="text-base font-bold text-white mt-0.5">
                      {siteSettings.boundaries.east}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* VISI & MISI */}
      {/* ============================================ */}
      <section className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
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
      {/* STRUKTUR ORGANISASI & PEGAWAI (RESMI TAHUN 2026) */}
      {/* ============================================ */}
      <section className="bg-slate-50 py-12 sm:py-16 border-t border-b border-slate-200">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-bold text-emerald-800">
              <Users className="h-4 w-4" /> Aparatur Kelurahan Resmi (2026)
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              Struktur Organisasi Pegawai Kelurahan Bubulak
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
                      ? "border-amber-400 bg-gradient-to-b from-amber-50/60 to-white shadow-xl ring-2 ring-amber-300 sm:col-span-2 lg:col-span-3 max-w-xl mx-auto w-full"
                      : "border-slate-200 bg-white hover:border-emerald-300 hover:shadow-lg"
                  }`}
                >
                  <CardContent className="p-6 text-center">
                    {/* Staff Photo / Placeholder */}
                    <div
                      className={`mx-auto mb-4 overflow-hidden rounded-2xl shadow-md border-2 ${
                        isLurah
                          ? "h-32 w-32 bg-emerald-900 text-white border-amber-400 ring-4 ring-amber-200"
                          : "h-24 w-24 bg-emerald-800 text-white border-emerald-300"
                      } flex items-center justify-center relative`}
                    >
                      {staff.photoUrl && (staff.photoUrl.startsWith("http") || (staff.photoUrl.startsWith("/") && !staff.photoUrl.includes("placeholder"))) ? (
                        <img
                          src={staff.photoUrl}
                          alt={staff.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <Landmark className={isLurah ? "h-16 w-16 text-white/40" : "h-12 w-12 text-white/40"} />
                      )}
                    </div>

                    {isLurah && (
                      <Badge className="mb-2 bg-amber-600 text-white font-extrabold text-xs uppercase tracking-wider">
                        Lurah Bubulak
                      </Badge>
                    )}

                    <h3
                      className={`font-extrabold text-slate-900 ${
                        isLurah ? "text-xl sm:text-2xl" : "text-lg"
                      }`}
                    >
                      {staff.name}
                    </h3>
                    <p
                      className={`mt-1 font-bold ${
                        isLurah ? "text-base text-emerald-800" : "text-sm text-emerald-700 uppercase"
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
      <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
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
