export const dynamic = "force-dynamic";
export const revalidate = 0;

import Link from "next/link";
import {
  Calendar,
  Sparkles,
  Newspaper,
  ArrowRight,
  Landmark,
  ChevronRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { BentoGrid } from "@/components/BentoGrid";
import { BentoCard } from "@/components/BentoCard";
import { fetchNews } from "@/lib/services";

function formatDate(dateString: string): string {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BeritaListingPage() {
  const newsList = await fetchNews();

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
            <span className="text-white">Berita & Pengumuman</span>
          </nav>

          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/20 px-4 py-1.5 text-xs font-bold text-emerald-200">
            <Newspaper className="h-3.5 w-3.5 text-amber-300" />
            Kabar Resmi Kelurahan Bubulak
          </div>

          <h1 className="mb-3 text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl tracking-tight">
            Berita & Pengumuman Publik
          </h1>
          <p className="mx-auto max-w-2xl text-base text-emerald-100/90 leading-relaxed font-medium">
            Informasi terkini kegiatan posyandu, pengumuman jadwal pelayanan, dan berita penting warga.
          </p>
        </div>
      </section>

      {/* NEWS LISTING GRID */}
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {newsList.length === 0 ? (
          <div className="py-16 text-center text-slate-500 font-semibold bg-white rounded-3xl border border-dashed border-slate-300">
            Belum ada artikel berita yang diterbitkan.
          </div>
        ) : (
          <BentoGrid className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {newsList.map((news) => (
              <div
                key={news.id}
                className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xs hover:border-emerald-300 hover:shadow-md transition-all duration-200"
              >
                <div className="relative h-48 w-full overflow-hidden bg-slate-900 flex items-center justify-center text-white">
                  {news.coverImageUrl && (news.coverImageUrl.startsWith("http") || news.coverImageUrl.startsWith("/")) ? (
                    <img
                      src={news.coverImageUrl}
                      alt={news.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
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
                    <div className="mb-2 flex items-center gap-1.5 text-xs font-bold text-slate-500">
                      <Calendar className="h-3.5 w-3.5 text-emerald-600" />
                      {formatDate(news.publishedAt)}
                    </div>
                    <h2 className="mb-2 line-clamp-2 text-lg font-extrabold text-slate-900 group-hover:text-emerald-700 transition-colors">
                      {news.title}
                    </h2>
                    <p className="line-clamp-3 text-xs text-slate-600 leading-relaxed font-medium">
                      {news.summary}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <Link
                      href={`/berita/${news.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-extrabold text-emerald-700 group-hover:text-emerald-800 transition-colors min-h-[44px]"
                    >
                      Baca Artikel Lengkap
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </BentoGrid>
        )}
      </section>
    </div>
  );
}
