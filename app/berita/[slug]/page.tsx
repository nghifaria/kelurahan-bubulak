import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Calendar,
  ChevronRight,
  User,
  ArrowLeft,
  Share2,
  Landmark,
  Image as ImageIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { latestNews } from "@/lib/data";

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BeritaDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const news = latestNews.find((item) => item.slug === slug);

  if (!news) {
    notFound();
  }

  const relatedNews = latestNews
    .filter((item) => item.id !== news.id)
    .slice(0, 3);

  return (
    <div className="flex flex-col">
      {/* ============================================ */}
      {/* HEADER & BREADCRUMB */}
      {/* ============================================ */}
      <section className="bg-slate-900 py-10 text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <nav className="mb-6 flex items-center gap-2 text-sm text-slate-300">
            <Link href="/" className="hover:text-emerald-400">
              Beranda
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/berita" className="hover:text-emerald-400">
              Berita
            </Link>
            <ChevronRight className="h-4 w-4 text-slate-500" />
            <span className="truncate max-w-[200px] text-emerald-400 sm:max-w-xs font-medium">
              {news.title}
            </span>
          </nav>

          <Badge
            className={`mb-4 text-sm font-semibold ${
              news.category === "Pengumuman"
                ? "bg-amber-500 text-white"
                : news.category === "Kesehatan"
                ? "bg-blue-500 text-white"
                : "bg-emerald-600 text-white"
            }`}
          >
            {news.category}
          </Badge>

          <h1 className="mb-4 text-2xl font-extrabold leading-tight sm:text-3xl lg:text-4xl">
            {news.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-300">
            <span className="flex items-center gap-1.5 font-medium">
              <Calendar className="h-4 w-4 text-emerald-400" />
              {formatDate(news.publishedAt)}
            </span>
            {news.author && (
              <span className="flex items-center gap-1.5 font-medium">
                <User className="h-4 w-4 text-emerald-400" />
                {news.author}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* MAIN ARTICLE CONTENT */}
      {/* ============================================ */}
      <section className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Cover Image Placeholder Container */}
        <div className="mb-8 overflow-hidden rounded-2xl border-2 border-emerald-200 bg-gradient-to-br from-emerald-800 via-emerald-700 to-emerald-900 p-12 text-center shadow-lg">
          <Landmark className="mx-auto mb-4 h-24 w-24 text-emerald-300/40" />
          <p className="text-xl font-bold text-white">{news.title}</p>
          <p className="mt-1 text-sm text-emerald-200">Foto Utama Artikel</p>
        </div>

        {/* Article Body */}
        <article className="prose prose-slate max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-p:text-slate-800 prose-p:text-lg prose-p:leading-relaxed prose-li:text-lg prose-strong:text-slate-900">
          <div className="rounded-2xl bg-white p-6 sm:p-10 border-2 border-slate-200 shadow-sm leading-relaxed whitespace-pre-line text-lg text-slate-800">
            {news.content}
          </div>
        </article>

        {/* Documentation Gallery (If available) */}
        {news.documentationUrls && news.documentationUrls.length > 0 && (
          <div className="mt-10 rounded-2xl border-2 border-emerald-200 bg-emerald-50/50 p-6 sm:p-8">
            <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-slate-900">
              <ImageIcon className="h-5 w-5 text-emerald-700" />
              Galeri Dokumentasi Kegiatan
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {news.documentationUrls.map((url, index) => (
                <div
                  key={index}
                  className="flex h-40 items-center justify-center rounded-xl bg-emerald-800 text-white shadow-md p-4 text-center"
                >
                  <span className="font-semibold text-sm">
                    Dokumentasi {index + 1} ({news.title})
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Bar / Back Button */}
        <div className="mt-10 flex flex-col gap-4 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/berita"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border-2 border-emerald-300 px-6 text-base font-bold text-emerald-800 transition-colors hover:bg-emerald-50"
          >
            <ArrowLeft className="h-5 w-5" />
            Kembali ke Daftar Berita
          </Link>
        </div>
      </section>

      {/* ============================================ */}
      {/* RELATED NEWS SECTION */}
      {/* ============================================ */}
      {relatedNews.length > 0 && (
        <section className="bg-slate-50 py-12 border-t border-slate-200">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-6 text-2xl font-bold text-slate-900">
              Berita Lainnya
            </h2>
            <div className="grid gap-6 sm:grid-cols-3">
              {relatedNews.map((item) => (
                <Card
                  key={item.id}
                  className="group flex flex-col overflow-hidden border-2 border-slate-200 transition-all hover:border-emerald-300 hover:shadow-lg"
                >
                  <CardContent className="flex flex-1 flex-col p-5">
                    <span className="mb-2 text-xs font-semibold text-emerald-700">
                      {item.category}
                    </span>
                    <h3 className="mb-2 line-clamp-2 text-base font-bold text-slate-900 group-hover:text-emerald-700">
                      {item.title}
                    </h3>
                    <p className="mb-4 line-clamp-2 text-xs text-slate-600">
                      {item.summary}
                    </p>
                    <div className="mt-auto">
                      <Link
                        href={`/berita/${item.slug}`}
                        className="text-xs font-bold text-emerald-700 hover:underline"
                      >
                        Baca →
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
