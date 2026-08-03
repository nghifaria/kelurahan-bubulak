"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  Calendar,
  ChevronRight,
  Sparkles,
  Newspaper,
  User,
  ArrowRight,
  Filter,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Landmark } from "lucide-react";
import { latestNews, NewsItem } from "@/lib/data";

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BeritaListingPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");

  const categories = useMemo(() => {
    const cats = Array.from(new Set(latestNews.map((item) => item.category)));
    return ["Semua", ...cats];
  }, []);

  const filteredNews = useMemo(() => {
    return latestNews.filter((news) => {
      const matchesCategory =
        selectedCategory === "Semua" || news.category === selectedCategory;
      const matchesSearch =
        news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        news.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        news.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

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
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center justify-center gap-2 text-sm text-emerald-200">
            <Link href="/" className="transition-colors hover:text-white">
              Beranda
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="font-medium text-white">Berita & Pengumuman</span>
          </nav>

          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/20 px-4 py-2 text-sm font-medium text-emerald-100 backdrop-blur-sm">
            <Sparkles className="h-4 w-4" />
            Kabar Terkini
          </div>

          <h1 className="mb-4 text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
            Berita & Pengumuman Kelurahan
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-emerald-100/90">
            Dapatkan informasi terbaru mengenai pengumuman resmi, kegiatan masyarakat, agenda posyandu, dan program pembangunan di Kelurahan Bubulak.
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
      {/* SEARCH & CATEGORY FILTER */}
      {/* ============================================ */}
      <section className="mx-auto w-full max-w-5xl px-4 -mt-2 sm:px-6 lg:px-8">
        <Card className="border-2 border-emerald-200/60 shadow-xl">
          <CardContent className="space-y-4 p-4 sm:p-6">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-6 w-6 -translate-y-1/2 text-emerald-600" />
              <Input
                type="search"
                placeholder='Cari berita atau pengumuman... (contoh: "posyandu", "bansos", "gotong royong")'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-14 rounded-xl border-2 border-emerald-200 pl-14 pr-4 text-lg placeholder:text-slate-400 focus:border-emerald-500 focus:ring-emerald-500 sm:h-16 sm:text-xl"
              />
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="flex items-center gap-1 text-sm font-semibold text-slate-600 mr-2">
                <Filter className="h-4 w-4" /> Kategori:
              </span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-xl px-4 py-2.5 text-base font-semibold transition-all ${
                    selectedCategory === cat
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

      {/* ============================================ */}
      {/* NEWS LISTING GRID */}
      {/* ============================================ */}
      <section className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        {filteredNews.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-12 text-center">
            <Newspaper className="mx-auto mb-4 h-16 w-16 text-slate-300" />
            <h3 className="mb-2 text-xl font-bold text-slate-700">
              Berita Tidak Ditemukan
            </h3>
            <p className="text-lg text-slate-500">
              Tidak ada berita yang sesuai dengan kata kunci atau kategori yang Anda pilih.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("Semua");
              }}
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 text-base font-semibold text-white hover:bg-emerald-800"
            >
              Reset Filter
            </button>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredNews.map((news) => (
              <Card
                key={news.id}
                className="group flex flex-col overflow-hidden border-2 border-slate-200 transition-all duration-300 hover:border-emerald-300 hover:shadow-xl hover:-translate-y-1"
              >
                {/* Visual Cover Header */}
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-emerald-700 via-emerald-600 to-emerald-800">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Landmark className="h-16 w-16 text-white/30" />
                  </div>
                  <div className="absolute left-3 top-3">
                    <Badge
                      className={`text-sm font-semibold shadow-md ${
                        news.category === "Pengumuman"
                          ? "bg-amber-500 text-white"
                          : news.category === "Kesehatan"
                          ? "bg-blue-500 text-white"
                          : "bg-emerald-600 text-white"
                      }`}
                    >
                      {news.category}
                    </Badge>
                  </div>
                </div>

                <CardContent className="flex flex-1 flex-col p-6">
                  <div className="mb-3 flex items-center justify-between text-sm text-slate-500">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Calendar className="h-4 w-4 text-emerald-600" />
                      {formatDate(news.publishedAt)}
                    </span>
                    {news.author && (
                      <span className="flex items-center gap-1 text-xs text-slate-400">
                        <User className="h-3.5 w-3.5" />
                        {news.author}
                      </span>
                    )}
                  </div>

                  <h3 className="mb-3 line-clamp-2 text-xl font-bold leading-snug text-slate-900 transition-colors group-hover:text-emerald-700">
                    {news.title}
                  </h3>

                  <p className="mb-6 line-clamp-3 text-base text-slate-600">
                    {news.summary}
                  </p>

                  <div className="mt-auto pt-4 border-t border-slate-100">
                    <Link
                      href={`/berita/${news.slug}`}
                      className="inline-flex items-center gap-2 text-base font-bold text-emerald-700 transition-colors hover:text-emerald-800"
                    >
                      Baca Selengkapnya
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
