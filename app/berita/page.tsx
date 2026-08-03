export const dynamic = "force-dynamic";
export const revalidate = 0;

import Link from "next/link";
import {
  Calendar,
  Sparkles,
  Newspaper,
  ArrowRight,
  Landmark,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
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
    <div className="flex flex-col">
      {/* PAGE HEADER */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-700 via-emerald-600 to-emerald-800 py-16 text-white sm:py-20">
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/20 px-4 py-1.5 text-sm font-medium text-emerald-100 backdrop-blur-sm">
            <Newspaper className="h-4 w-4" />
            Pusat Informasi & Kabar Kelurahan
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            Berita & Pengumuman Resmi
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-emerald-100/90">
            Dapatkan berita terkini, pengumuman posyandu, dan agenda kegiatan masyarakat Kelurahan Bubulak.
          </p>
        </div>
      </section>

      {/* NEWS LISTING GRID */}
      <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {newsList.length === 0 ? (
          <div className="py-16 text-center text-slate-500 font-medium">
            Belum ada berita yang diterbitkan.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {newsList.map((news) => (
              <Card
                key={news.id}
                className="group flex flex-col overflow-hidden border-2 border-slate-200 transition-all duration-200 hover:-translate-y-1 hover:border-emerald-500 hover:shadow-xl"
              >
                <div className="relative h-52 w-full overflow-hidden bg-emerald-800 flex items-center justify-center text-white">
                  <Landmark className="h-20 w-20 text-white/30" />
                  <div className="absolute top-3 left-3">
                    <Badge
                      className={`text-xs font-semibold ${
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

                <CardContent className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <div className="mb-3 flex items-center gap-2 text-sm text-slate-500 font-medium">
                      <Calendar className="h-4 w-4 text-emerald-600" />
                      {formatDate(news.publishedAt)}
                    </div>
                    <h2 className="mb-3 line-clamp-2 text-xl font-bold text-slate-900 transition-colors group-hover:text-emerald-700">
                      {news.title}
                    </h2>
                    <p className="line-clamp-3 text-base text-slate-600 leading-relaxed">
                      {news.summary}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <Link
                      href={`/berita/${news.slug}`}
                      className="inline-flex items-center gap-2 text-base font-bold text-emerald-700 transition-colors group-hover:text-emerald-800"
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
