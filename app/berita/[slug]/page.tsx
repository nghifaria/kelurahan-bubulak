export const dynamic = "force-dynamic";
export const revalidate = 0;

import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Calendar,
  ChevronRight,
  User,
  ArrowLeft,
  Landmark,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { fetchNewsBySlug } from "@/lib/services";
import { RichTextRenderer } from "@/components/RichTextRenderer";

function formatDate(dateString: string): string {
  if (!dateString) return "";
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
  const news = await fetchNewsBySlug(slug);

  if (!news) {
    notFound();
  }

  return (
    <div className="flex flex-col space-y-8 pb-12 bg-slate-50">
      {/* HEADER & BREADCRUMB LINEAR DARK */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-900 via-emerald-800 to-slate-900 text-white pt-10 pb-14">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <nav className="mb-4 flex items-center gap-2 text-xs font-semibold text-emerald-200">
            <Link href="/" className="hover:text-white">
              Beranda
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/berita" className="hover:text-white">
              Berita
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
            <span className="truncate max-w-[180px] text-white sm:max-w-xs">
              {news.title}
            </span>
          </nav>

          <Badge
            className={`mb-3 text-xs font-bold ${
              news.category === "Pengumuman"
                ? "bg-amber-500 text-white"
                : news.category === "Kesehatan"
                ? "bg-blue-600 text-white"
                : "bg-emerald-700 text-white"
            }`}
          >
            {news.category}
          </Badge>

          <h1 className="mb-3 text-2xl font-extrabold leading-tight sm:text-3xl lg:text-4xl text-white tracking-tight">
            {news.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-emerald-100 font-semibold">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-emerald-400" />
              {formatDate(news.publishedAt)}
            </span>
            {news.author && (
              <span className="flex items-center gap-1.5">
                <User className="h-3.5 w-3.5 text-emerald-400" />
                {news.author}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* MAIN ARTICLE CONTENT */}
      <section className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 z-10 -mt-6">
        <div className="mb-6 overflow-hidden rounded-3xl border border-slate-200 bg-slate-900 shadow-sm relative min-h-[220px] flex items-center justify-center text-center">
          {news.coverImageUrl && (news.coverImageUrl.startsWith("http") || news.coverImageUrl.startsWith("/")) ? (
            <img
              src={news.coverImageUrl}
              alt={news.title}
              className="w-full max-h-[450px] object-cover"
            />
          ) : (
            <div className="p-10 text-center">
              <Landmark className="mx-auto mb-3 h-20 w-20 text-emerald-300/40" />
              <p className="text-lg font-bold text-white">{news.title}</p>
            </div>
          )}
        </div>

        {/* Article Body Container */}
        <article className="rounded-3xl bg-white p-6 sm:p-10 border border-slate-200 shadow-xs text-base text-slate-800 leading-relaxed font-medium">
          <RichTextRenderer content={news.content} />
        </article>

        {/* Navigation Back */}
        <div className="mt-8 pt-4 border-t border-slate-200">
          <Link
            href="/berita"
            className="inline-flex items-center gap-2 font-bold text-emerald-700 hover:text-emerald-800 text-sm min-h-[44px]"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Daftar Berita & Pengumuman
          </Link>
        </div>
      </section>
    </div>
  );
}
