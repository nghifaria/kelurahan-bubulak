"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FileCheck,
  MessageSquareWarning,
  Newspaper,
  Database,
  ArrowRight,
  TrendingUp,
  Clock,
  Sparkles,
  PlusCircle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { fetchDashboardStats } from "@/lib/services";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalSubmissions: 1,
    pendingSubmissions: 0,
    totalComplaints: 1,
    pendingComplaints: 0,
    totalNews: 3,
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      const data = await fetchDashboardStats();
      setStats(data);
      setIsLoading(false);
    }
    loadStats();
  }, []);

  return (
    <div className="space-y-8">
      {/* Header Greeting */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800 mb-2">
            <Sparkles className="h-3.5 w-3.5" /> Dashboard Staf Kelurahan
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900">
            Selamat Datang di Ruang Kerja Admin
          </h1>
          <p className="text-base text-slate-600">
            Ringkasan statistik permohonan surat, pengaduan warga, dan publikasi konten
          </p>
        </div>

        <Link
          href="/admin/berita"
          className="inline-flex h-12 items-center gap-2 rounded-xl bg-emerald-700 px-5 text-base font-bold text-white shadow-md transition-colors hover:bg-emerald-800"
        >
          <PlusCircle className="h-5 w-5" />
          Tambah Berita Baru
        </Link>
      </div>

      {/* STAT CARDS GRID */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Card 1: Surat Masuk */}
        <Card className="border-2 border-emerald-200 bg-white shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold uppercase tracking-wider text-slate-500">
                Total Surat Masuk
              </span>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 font-bold">
                <FileCheck className="h-5 w-5" />
              </div>
            </div>
            <p className="mt-3 text-3xl font-extrabold text-slate-900">
              {isLoading ? "..." : stats.totalSubmissions}
            </p>
            <p className="mt-1 text-sm text-emerald-700 font-medium flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {stats.pendingSubmissions} Menunggu Diproses
            </p>
          </CardContent>
        </Card>

        {/* Card 2: Laporan Warga */}
        <Card className="border-2 border-amber-200 bg-white shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold uppercase tracking-wider text-slate-500">
                Laporan & Aspirasi
              </span>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-700 font-bold">
                <MessageSquareWarning className="h-5 w-5" />
              </div>
            </div>
            <p className="mt-3 text-3xl font-extrabold text-slate-900">
              {isLoading ? "..." : stats.totalComplaints}
            </p>
            <p className="mt-1 text-sm text-amber-700 font-medium flex items-center gap-1">
              <TrendingUp className="h-4 w-4" />
              {stats.pendingComplaints} Perlu Tindak Lanjut
            </p>
          </CardContent>
        </Card>

        {/* Card 3: Berita Diterbitkan */}
        <Card className="border-2 border-blue-200 bg-white shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold uppercase tracking-wider text-slate-500">
                Berita Tayang
              </span>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-700 font-bold">
                <Newspaper className="h-5 w-5" />
              </div>
            </div>
            <p className="mt-3 text-3xl font-extrabold text-slate-900">
              {isLoading ? "..." : stats.totalNews}
            </p>
            <p className="mt-1 text-sm text-blue-700 font-medium">
              Aktif di Web Publik
            </p>
          </CardContent>
        </Card>

        {/* Card 4: INSForge Storage Status */}
        <Card className="border-2 border-slate-200 bg-slate-900 text-white shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold uppercase tracking-wider text-slate-400">
                INSForge Storage
              </span>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white font-bold">
                <Database className="h-5 w-5" />
              </div>
            </div>
            <p className="mt-3 text-xl font-extrabold text-emerald-400">
              kelurahan-assets
            </p>
            <p className="mt-1 text-xs text-slate-400">
              Bucket Publik Aktif (Auto-Compress)
            </p>
          </CardContent>
        </Card>
      </div>

      {/* QUICK ACTIONS GRID */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-4">
          Akses Cepat Pengelolaan CMS
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Link href="/admin/berita" className="group">
            <Card className="border-2 border-slate-200 transition-all hover:border-emerald-500 hover:shadow-lg">
              <CardContent className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800">
                    <Newspaper className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700">
                      Kelola Berita & Pengumuman
                    </h3>
                    <p className="text-sm text-slate-500">
                      Tambah, Edit, Hapus artikel & upload foto sampul
                    </p>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-slate-400 group-hover:text-emerald-700 transition-transform group-hover:translate-x-1" />
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/pengajuan" className="group">
            <Card className="border-2 border-slate-200 transition-all hover:border-emerald-500 hover:shadow-lg">
              <CardContent className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-800">
                    <FileCheck className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700">
                      Inbox Surat Warga
                    </h3>
                    <p className="text-sm text-slate-500">
                      Update status resi & kirim notifikasi WhatsApp
                    </p>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-slate-400 group-hover:text-emerald-700 transition-transform group-hover:translate-x-1" />
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
