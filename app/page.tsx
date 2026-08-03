"use client";

import Link from "next/link";
import {
  Landmark,
  Clock,
  CheckCircle,
  XCircle,
  ChevronRight,
  Calendar,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  operationalHours,
  quickActions,
  latestNews,
  siteSettings,
} from "@/lib/data";

function getIsOpen(): { isOpen: boolean; currentDay: string; todayHours: (typeof operationalHours)[0] | null } {
  const now = new Date();
  const dayIndex = now.getDay();
  const dayNames = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const currentDay = dayNames[dayIndex];
  const todayHours = operationalHours.find((h) => h.day === currentDay) || null;

  if (!todayHours || !todayHours.open || !todayHours.close) {
    return { isOpen: false, currentDay, todayHours };
  }

  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentTime = currentHour * 60 + currentMinute;

  const [openH, openM] = todayHours.open.split(":").map(Number);
  const [closeH, closeM] = todayHours.close.split(":").map(Number);
  const openTime = openH * 60 + openM;
  const closeTime = closeH * 60 + closeM;

  return {
    isOpen: currentTime >= openTime && currentTime < closeTime,
    currentDay,
    todayHours,
  };
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function HomePage() {
  const { isOpen, currentDay, todayHours } = getIsOpen();

  return (
    <div className="flex flex-col">
      {/* ============================================ */}
      {/* HERO SECTION */}
      {/* ============================================ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-800 via-emerald-700 to-emerald-900">
        {/* Decorative Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 h-[500px] w-[500px] rounded-full bg-emerald-400/20 blur-3xl" />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.08) 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-3xl text-center">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/20 px-4 py-2 text-sm font-medium text-emerald-100 backdrop-blur-sm">
              <Sparkles className="h-4 w-4" />
              Portal Layanan Digital Resmi
            </div>

            {/* Headline */}
            <h1 className="mb-4 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
              Selamat Datang di{" "}
              <span className="bg-gradient-to-r from-emerald-200 to-amber-200 bg-clip-text text-transparent">
                Kelurahan Bubulak
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mx-auto mb-8 max-w-2xl text-lg text-emerald-100/90 sm:text-xl">
              Akses informasi layanan kelurahan, cek syarat surat, dan ajukan
              dokumen administrasi dari rumah — tanpa harus antri.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <Link
                href="/layanan"
                className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-white px-8 text-lg font-bold text-emerald-800 shadow-xl transition-all hover:bg-emerald-50 hover:shadow-2xl sm:w-auto"
              >
                Cek Syarat Surat
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/ajukan"
                className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-2xl border-2 border-emerald-300/40 bg-transparent px-8 text-lg font-bold text-white transition-all hover:bg-emerald-600/50 sm:w-auto"
              >
                Ajukan Surat Online
                <ChevronRight className="h-5 w-5" />
              </Link>
            </div>

            {/* Lurah Name */}
            <div className="mt-10 inline-flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-800/50 px-5 py-3 backdrop-blur-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600">
                <Landmark className="h-5 w-5 text-white" />
              </div>
              <div className="text-left">
                <p className="text-xs font-medium uppercase tracking-wider text-emerald-300">
                  Lurah Bubulak
                </p>
                <p className="text-base font-semibold text-white">
                  {siteSettings.lurahName}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Wave SVG Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
            preserveAspectRatio="none"
          >
            <path
              d="M0 32L60 37.3C120 43 240 53 360 53.3C480 53 600 43 720 42.7C840 43 960 53 1080 56C1200 59 1320 53 1380 50.7L1440 48V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0V32Z"
              className="fill-background"
            />
          </svg>
        </div>
      </section>

      {/* ============================================ */}
      {/* JAM OPERASIONAL WIDGET */}
      {/* ============================================ */}
      <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Card className="overflow-hidden border-2 border-emerald-200/60 shadow-lg">
          <CardContent className="p-0">
            <div className="flex flex-col lg:flex-row">
              {/* Status Box */}
              <div
                className={`flex flex-col items-center justify-center gap-3 px-8 py-8 text-center lg:min-w-[280px] ${
                  isOpen
                    ? "bg-gradient-to-br from-emerald-600 to-emerald-700"
                    : "bg-gradient-to-br from-red-500 to-red-600"
                }`}
              >
                {isOpen ? (
                  <CheckCircle className="h-12 w-12 text-white" />
                ) : (
                  <XCircle className="h-12 w-12 text-white" />
                )}
                <div>
                  <p className="text-2xl font-extrabold text-white">
                    {isOpen ? "BUKA" : "TUTUP"}
                  </p>
                  <p className="text-base text-white/80">
                    {currentDay},{" "}
                    {todayHours?.open
                      ? `${todayHours.open} - ${todayHours.close}`
                      : "Libur"}
                  </p>
                </div>
              </div>

              {/* Schedule Table */}
              <div className="flex-1 p-6 lg:p-8">
                <div className="mb-4 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-emerald-700" />
                  <h2 className="text-xl font-bold text-slate-900">
                    Jadwal Pelayanan Kantor
                  </h2>
                </div>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                  {operationalHours
                    .filter((h) => h.open)
                    .map((h) => (
                      <div
                        key={h.day}
                        className={`flex items-center justify-between rounded-xl px-4 py-3 text-base transition-colors ${
                          h.day === currentDay
                            ? "bg-emerald-100 font-bold text-emerald-900 ring-2 ring-emerald-500"
                            : "bg-slate-50 text-slate-700"
                        }`}
                      >
                        <span className="font-medium">{h.day}</span>
                        <span className="font-semibold">
                          {h.open} - {h.close}
                        </span>
                      </div>
                    ))}
                </div>
                <p className="mt-3 text-sm text-slate-500">
                  * Sabtu, Minggu & Hari Libur Nasional: Kantor Tutup
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* ============================================ */}
      {/* QUICK ACTION GRID (Pintas Menu) */}
      {/* ============================================ */}
      <section className="mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Apa yang Anda Butuhkan?
          </h2>
          <p className="mt-2 text-lg text-slate-600">
            Pilih menu di bawah untuk akses cepat
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {quickActions.map((action) => (
            <Link key={action.href} href={action.href} className="group">
              <Card className="h-full border-2 border-transparent transition-all duration-300 hover:border-emerald-300 hover:shadow-xl hover:-translate-y-1">
                <CardContent className="flex flex-col items-center gap-4 p-6 text-center sm:p-8">
                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-2xl ${action.color} text-white shadow-lg transition-transform group-hover:scale-110 sm:h-20 sm:w-20`}
                  >
                    <action.icon className="h-8 w-8 sm:h-10 sm:w-10" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 sm:text-lg">
                      {action.label}
                    </h3>
                    <p className="mt-1 hidden text-sm text-slate-500 sm:block">
                      {action.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* ============================================ */}
      {/* BERITA & PENGUMUMAN TERBARU */}
      {/* ============================================ */}
      <section className="bg-slate-50 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                Berita & Pengumuman
              </h2>
              <p className="mt-1 text-lg text-slate-600">
                Informasi terbaru dari kelurahan
              </p>
            </div>
            <Link
              href="/berita"
              className="hidden h-12 items-center gap-2 rounded-xl border-2 border-emerald-300 px-5 text-base font-semibold text-emerald-800 transition-colors hover:bg-emerald-50 sm:inline-flex"
            >
              Lihat Semua
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latestNews.map((news) => (
              <Card
                key={news.id}
                className="group overflow-hidden border-2 border-transparent transition-all duration-300 hover:border-emerald-200 hover:shadow-xl hover:-translate-y-1"
              >
                {/* Placeholder Image */}
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-emerald-200 to-emerald-400">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Landmark className="h-16 w-16 text-emerald-600/40" />
                  </div>
                  <div className="absolute left-3 top-3">
                    <Badge
                      className={`text-sm font-semibold ${
                        news.category === "Pengumuman"
                          ? "bg-amber-500 text-white hover:bg-amber-600"
                          : news.category === "Kesehatan"
                          ? "bg-blue-500 text-white hover:bg-blue-600"
                          : "bg-emerald-600 text-white hover:bg-emerald-700"
                      }`}
                    >
                      {news.category}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-5">
                  <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
                    <Calendar className="h-4 w-4" />
                    {formatDate(news.publishedAt)}
                  </div>
                  <h3 className="mb-2 line-clamp-2 text-lg font-bold text-slate-900 transition-colors group-hover:text-emerald-700">
                    {news.title}
                  </h3>
                  <p className="line-clamp-3 text-base text-slate-600">
                    {news.summary}
                  </p>
                  <div className="mt-4">
                    <span className="inline-flex items-center gap-1 text-base font-semibold text-emerald-700 transition-colors group-hover:text-emerald-800">
                      Baca selengkapnya
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Mobile: View All button */}
          <div className="mt-6 text-center sm:hidden">
            <Link
              href="/berita"
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 text-base font-semibold text-white shadow-md transition-colors hover:bg-emerald-800"
            >
              Lihat Semua Berita
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* CTA SECTION */}
      {/* ============================================ */}
      <section className="relative overflow-hidden bg-gradient-to-r from-emerald-700 to-emerald-800 py-12 sm:py-16">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)",
              backgroundSize: "32px 32px",
            }}
          />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 text-2xl font-extrabold text-white sm:text-3xl lg:text-4xl">
            Butuh Mengurus Surat?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-emerald-100/90">
            Cek dulu syarat berkasnya, lalu ajukan surat secara online. Mudah,
            cepat, dan tanpa harus antri lama di kantor kelurahan.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Link
              href="/layanan"
              className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-white px-8 text-lg font-bold text-emerald-800 shadow-xl transition-all hover:bg-emerald-50 sm:w-auto"
            >
              Lihat Syarat Berkas
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/ajukan"
              className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-2xl border-2 border-emerald-300/40 bg-transparent px-8 text-lg font-bold text-white transition-all hover:bg-emerald-600/50 sm:w-auto"
            >
              Ajukan Surat Online
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
