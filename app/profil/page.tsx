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
  Building,
  CheckCircle2,
  Compass,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { BentoGrid } from "@/components/BentoGrid";
import { BentoCard } from "@/components/BentoCard";
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
    <div className="flex flex-col space-y-10 pb-12 bg-slate-50">
      {/* PAGE HEADER LINEAR DARK */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-900 via-emerald-800 to-slate-900 text-white pt-12 pb-16">
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <nav className="mb-4 flex items-center justify-center gap-2 text-xs font-semibold text-emerald-200">
            <Link href="/" className="hover:text-white">
              Beranda
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-white">Profil Kelurahan</span>
          </nav>

          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/20 px-4 py-1.5 text-xs font-bold text-emerald-200">
            <Sparkles className="h-3.5 w-3.5 text-amber-300" />
            Profil & Demografi Resmi
          </div>

          <h1 className="mb-3 text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl tracking-tight">
            Profil {siteSettings.villageName}
          </h1>
          <p className="mx-auto max-w-2xl text-base text-emerald-100/90 leading-relaxed font-medium">
            Kecamatan Bogor Barat, Kota Bogor · Provinsi Jawa Barat
          </p>
        </div>
      </section>

      {/* DEMOGRAFI BENTO GRID (6 CARDS) */}
      <section className="mx-auto w-full max-w-6xl px-4 -mt-8 sm:px-6 lg:px-8 z-10">
        <BentoGrid className="grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-2xs">
            <p className="text-2xl font-extrabold text-emerald-800">
              {siteSettings.demographics.totalPopulation.toLocaleString("id-ID")}
            </p>
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-0.5">
              Total Penduduk
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-2xs">
            <p className="text-2xl font-extrabold text-slate-900">
              {siteSettings.demographics.totalKK.toLocaleString("id-ID")}
            </p>
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-0.5">
              Kepala Keluarga
            </p>
          </div>

          <div className="rounded-2xl border border-blue-200 bg-blue-50/60 p-4 text-center shadow-2xs">
            <p className="text-2xl font-extrabold text-blue-900">
              {siteSettings.demographics.malePopulation.toLocaleString("id-ID")}
            </p>
            <p className="text-[11px] font-bold text-blue-800 uppercase tracking-wider mt-0.5">
              Laki-laki
            </p>
          </div>

          <div className="rounded-2xl border border-pink-200 bg-pink-50/60 p-4 text-center shadow-2xs">
            <p className="text-2xl font-extrabold text-pink-900">
              {siteSettings.demographics.femalePopulation.toLocaleString("id-ID")}
            </p>
            <p className="text-[11px] font-bold text-pink-800 uppercase tracking-wider mt-0.5">
              Perempuan
            </p>
          </div>

          <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-4 text-center shadow-2xs">
            <p className="text-2xl font-extrabold text-amber-900">
              {siteSettings.demographics.rtCount} / {siteSettings.demographics.rwCount}
            </p>
            <p className="text-[11px] font-bold text-amber-800 uppercase tracking-wider mt-0.5">
              Jumlah RT / RW
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-2xs">
            <p className="text-xl font-extrabold text-slate-900">
              {siteSettings.demographics.areaSize}
            </p>
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-0.5">
              Luas Wilayah
            </p>
          </div>
        </BentoGrid>
      </section>

      {/* GAMBARAN UMUM & BATAS WILAYAH */}
      <section className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Gambaran Umum */}
          <div className="lg:col-span-2">
            <BentoCard
              colSpan="col-span-1"
              icon={<Building className="h-5 w-5" />}
              title="Gambaran Umum Wilayah"
              subtitle="Karakteristik geografis Kelurahan Bubulak"
            >
              <p className="text-sm leading-relaxed text-slate-700 bg-slate-50 p-5 rounded-2xl border border-slate-200 mt-2 font-medium">
                {siteSettings.overviewText}
              </p>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-3.5">
                  <p className="text-[11px] font-bold text-emerald-900 uppercase tracking-wider">
                    Ketinggian Wilayah
                  </p>
                  <p className="text-lg font-extrabold text-emerald-800 mt-0.5">
                    {siteSettings.demographics.altitude}
                  </p>
                </div>
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-3.5">
                  <p className="text-[11px] font-bold text-emerald-900 uppercase tracking-wider">
                    Luas Total Wilayah
                  </p>
                  <p className="text-lg font-extrabold text-emerald-800 mt-0.5">
                    {siteSettings.demographics.areaSize}
                  </p>
                </div>
              </div>
            </BentoCard>
          </div>

          {/* Batas Wilayah */}
          <div>
            <div className="rounded-3xl border border-slate-800 bg-slate-900 text-white p-6 shadow-sm h-full flex flex-col justify-between">
              <div>
                <div className="mb-4 flex items-center gap-3 border-b border-slate-800 pb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-700 text-white shrink-0">
                    <Compass className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-white">Batas Wilayah</h3>
                    <p className="text-xs text-slate-400 font-medium">Kelurahan Bubulak</p>
                  </div>
                </div>

                <div className="space-y-2.5">
                  <div className="rounded-xl bg-slate-800/80 p-3 border border-slate-700/60">
                    <p className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">Sebelah Utara</p>
                    <p className="text-sm font-bold text-white mt-0.5">{siteSettings.boundaries.north}</p>
                  </div>
                  <div className="rounded-xl bg-slate-800/80 p-3 border border-slate-700/60">
                    <p className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">Sebelah Selatan</p>
                    <p className="text-sm font-bold text-white mt-0.5">{siteSettings.boundaries.south}</p>
                  </div>
                  <div className="rounded-xl bg-slate-800/80 p-3 border border-slate-700/60">
                    <p className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">Sebelah Barat</p>
                    <p className="text-sm font-bold text-white mt-0.5">{siteSettings.boundaries.west}</p>
                  </div>
                  <div className="rounded-xl bg-slate-800/80 p-3 border border-slate-700/60">
                    <p className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">Sebelah Timur</p>
                    <p className="text-sm font-bold text-white mt-0.5">{siteSettings.boundaries.east}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VISI & MISI */}
      <section className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          {/* VISI */}
          <BentoCard
            colSpan="col-span-1"
            icon={<Target className="h-5 w-5 text-emerald-700" />}
            title="Visi Kelurahan"
            subtitle="Cita-cita pelayanan publik Bubulak"
          >
            <blockquote className="rounded-2xl border-l-4 border-emerald-600 bg-emerald-50/60 p-4 text-base font-bold italic text-slate-900 mt-2">
              &ldquo;Terwujudnya Kelurahan Bubulak yang Maju, Sejahtera, Mandiri, dan Melayani dengan Sepenuh Hati Berbasis Pelayanan Digital.&rdquo;
            </blockquote>
          </BentoCard>

          {/* MISI */}
          <BentoCard
            colSpan="col-span-1"
            icon={<CheckCircle2 className="h-5 w-5 text-emerald-700" />}
            title="Misi Kelurahan"
            subtitle="Langkah strategis pelayanan warga"
          >
            <ul className="space-y-2.5 mt-2">
              {[
                "Meningkatkan kualitas pelayanan publik berbasis teknologi informasi yang cepat, ramah, dan transparan.",
                "Meningkatkan kualitas sarana dan prasarana lingkungan hidup yang bersih, sehat, dan aman.",
                "Mendorong pertumbuhan ekonomi warga melalui pemberdayaan UMKM lokal dan ekonomi kreatif.",
                "Mempererat keharmonisan dan gotong royong antar warga masyarakat Kelurahan Bubulak.",
              ].map((misi, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs font-medium text-slate-700">
                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-emerald-700 font-bold text-[11px] text-white">
                    {idx + 1}
                  </div>
                  <span>{misi}</span>
                </li>
              ))}
            </ul>
          </BentoCard>
        </div>
      </section>

      {/* STRUKTUR ORGANISASI PEGAWAI RESMI 2026 */}
      <section className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 text-center">
          <Badge className="mb-2 bg-emerald-100 text-emerald-800 border border-emerald-200 font-extrabold text-xs">
            <Users className="h-3.5 w-3.5 mr-1" /> Aparatur Kelurahan Resmi (2026)
          </Badge>
          <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
            Struktur Organisasi Pegawai Kelurahan Bubulak
          </h2>
          <p className="mt-1 text-sm font-medium text-slate-600">
            Jajaran aparatur pemerintah Kelurahan Bubulak yang melayani masyarakat
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sortedStaff.map((staff) => {
            const isLurah = staff.displayOrder === 1;
            return (
              <Card
                key={staff.id}
                className={`overflow-hidden border transition-all ${
                  isLurah
                    ? "border-amber-400 bg-gradient-to-b from-amber-50/70 via-white to-white shadow-md sm:col-span-2 lg:col-span-3 max-w-lg mx-auto w-full rounded-3xl"
                    : "border-slate-200 bg-white rounded-3xl hover:border-emerald-300 hover:shadow-xs"
                }`}
              >
                <CardContent className="p-6 text-center">
                  <div
                    className={`mx-auto mb-3 overflow-hidden rounded-2xl border ${
                      isLurah
                        ? "h-28 w-28 bg-emerald-900 text-white border-amber-400"
                        : "h-20 w-20 bg-emerald-800 text-white border-emerald-300"
                    } flex items-center justify-center relative shadow-xs`}
                  >
                    {staff.photoUrl && (staff.photoUrl.startsWith("http") || (staff.photoUrl.startsWith("/") && !staff.photoUrl.includes("placeholder"))) ? (
                      <img
                        src={staff.photoUrl}
                        alt={staff.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <Landmark className={isLurah ? "h-12 w-12 text-white/40" : "h-10 w-10 text-white/40"} />
                    )}
                  </div>

                  {isLurah && (
                    <Badge className="mb-1.5 bg-amber-600 text-white font-extrabold text-[11px] uppercase tracking-wider">
                      Lurah Bubulak
                    </Badge>
                  )}

                  <h3 className={`font-extrabold text-slate-900 ${isLurah ? "text-xl" : "text-base"}`}>
                    {staff.name}
                  </h3>
                  <p className={`mt-0.5 font-bold ${isLurah ? "text-xs text-emerald-800" : "text-xs text-emerald-700 uppercase"}`}>
                    {staff.position}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* PRESTASI KELURAHAN */}
      <section className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 text-center">
          <Badge className="mb-2 bg-amber-100 text-amber-900 border border-amber-200 font-extrabold text-xs">
            <Award className="h-3.5 w-3.5 mr-1 text-amber-700" /> Penghargaan Resmi
          </Badge>
          <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
            Prestasi Kelurahan Bubulak
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {achievementsList.map((ach) => (
            <BentoCard
              key={ach.id}
              colSpan="col-span-1"
              icon={<Award className="h-5 w-5 text-amber-700" />}
              title={ach.title}
              subtitle={`Tahun ${ach.year}`}
            >
              <p className="text-xs text-slate-600 leading-relaxed mt-2 font-medium">
                {ach.description}
              </p>
            </BentoCard>
          ))}
        </div>
      </section>
    </div>
  );
}
