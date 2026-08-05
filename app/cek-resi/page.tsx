"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Search,
  ChevronRight,
  Sparkles,
  Clock,
  AlertCircle,
  MessageSquare,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  SubmissionTicket,
  ComplaintTicket,
  siteSettings,
} from "@/lib/data";

function CekResiContent() {
  const searchParams = useSearchParams();
  const resiFromUrl = searchParams.get("resi") || "";

  const [query, setQuery] = useState(resiFromUrl);
  const [activeSearch, setActiveSearch] = useState(resiFromUrl);
  const [foundSubmission, setFoundSubmission] = useState<SubmissionTicket | null>(null);
  const [foundComplaint, setFoundComplaint] = useState<ComplaintTicket | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (resiFromUrl) {
      setQuery(resiFromUrl);
      setActiveSearch(resiFromUrl);
    }
  }, [resiFromUrl]);

  useEffect(() => {
    if (!activeSearch.trim()) {
      setFoundSubmission(null);
      setFoundComplaint(null);
      return;
    }

    let isMounted = true;
    setIsLoading(true);

    async function doSearch() {
      const { fetchSubmissionByTicketOrNik, fetchComplaintByTicket } = await import("@/lib/services");
      const sub = await fetchSubmissionByTicketOrNik(activeSearch);
      const comp = await fetchComplaintByTicket(activeSearch);

      if (isMounted) {
        setFoundSubmission(sub);
        setFoundComplaint(comp);
        setIsLoading(false);
      }
    }

    doSearch();

    return () => {
      isMounted = false;
    };
  }, [activeSearch]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveSearch(query);
  };

  const getSubmissionStatusBadge = (status: SubmissionTicket["status"]) => {
    switch (status) {
      case "PENDING":
        return <Badge className="bg-amber-500 text-white font-extrabold text-xs px-3 py-1 uppercase">DITERIMA / PENDING</Badge>;
      case "PROCESSED":
        return <Badge className="bg-blue-600 text-white font-extrabold text-xs px-3 py-1 uppercase">SEDANG DIPROSES</Badge>;
      case "COMPLETED":
        return <Badge className="bg-emerald-600 text-white font-extrabold text-xs px-3 py-1 uppercase">SELESAI / SIAP DIAMBIL</Badge>;
      case "REJECTED":
        return <Badge className="bg-red-600 text-white font-extrabold text-xs px-3 py-1 uppercase">PERLU PERBAIKAN</Badge>;
    }
  };

  const getComplaintStatusBadge = (status: ComplaintTicket["status"]) => {
    switch (status) {
      case "PENDING":
        return <Badge className="bg-amber-500 text-white font-extrabold text-xs px-3 py-1 uppercase">MENUNGGU</Badge>;
      case "IN_PROGRESS":
        return <Badge className="bg-blue-600 text-white font-extrabold text-xs px-3 py-1 uppercase">TINDAK LANJUT</Badge>;
      case "RESOLVED":
        return <Badge className="bg-emerald-600 text-white font-extrabold text-xs px-3 py-1 uppercase">TERAN GANI / SELESAI</Badge>;
    }
  };

  return (
    <div className="space-y-8">
      {/* SEARCH BOX */}
      <section className="mx-auto w-full max-w-3xl px-4 -mt-8 sm:px-6 lg:px-8 z-10">
        <Card className="border border-slate-200 bg-white rounded-3xl shadow-md">
          <CardContent className="p-5 sm:p-6">
            <form onSubmit={handleSearchSubmit} className="space-y-3">
              <label className="block text-sm font-bold text-slate-900">
                Masukkan Nomor Resi Ticket atau NIK Anda:
              </label>
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <Input
                    type="search"
                    placeholder="Contoh: BBL-20260803-89X2 atau 32710115..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="h-14 rounded-2xl border-2 border-slate-200 pl-12 pr-4 text-base font-mono font-bold text-slate-900 placeholder:text-slate-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 min-h-[48px]"
                  />
                </div>
                <Button
                  type="submit"
                  className="h-14 rounded-2xl bg-emerald-700 px-8 text-base font-extrabold text-white shadow-sm hover:bg-emerald-800 active:scale-[0.98] min-h-[48px]"
                >
                  Cek Resi
                </Button>
              </div>
            </form>

            {/* Quick Test Ticket Chips */}
            <div className="mt-4 pt-3 border-t border-slate-100">
              <p className="text-xs font-semibold text-slate-500 mb-2">
                Uji Coba Kode Resi Contoh (Klik langsung):
              </p>
              <div className="flex flex-wrap gap-2">
                {["BBL-20260803-89X2", "BBL-20260802-12A4", "BBL-20260801-99B7", "LAP-20260803-31A9"].map(
                  (code) => (
                    <button
                      key={code}
                      onClick={() => {
                        setQuery(code);
                        setActiveSearch(code);
                      }}
                      className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 font-mono text-xs font-bold text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 hover:border-emerald-300 transition-colors"
                    >
                      {code}
                    </button>
                  )
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* RESULT SECTION */}
      <section className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8">
        {!activeSearch ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-2xs">
            <Search className="mx-auto mb-3 h-12 w-12 text-slate-300" />
            <h3 className="mb-1 text-lg font-bold text-slate-800">
              Lacak Status Surat / Pengaduan
            </h3>
            <p className="text-sm text-slate-500">
              Ketikkan Nomor Resi Ticket (misal `BBL-***`) atau NIK 16 digit pada form di atas.
            </p>
          </div>
        ) : isLoading ? (
          <div className="py-12 text-center text-slate-500 font-semibold">
            Mencari status resi di INSForge Database...
          </div>
        ) : foundSubmission ? (
          /* SUBMISSION RESULT CARD */
          <Card className="overflow-hidden border border-slate-200 bg-white rounded-3xl shadow-sm">
            <div className="bg-slate-900 p-6 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase font-bold text-emerald-400 tracking-wider">
                  Resi Ticket Pengajuan Surat
                </p>
                <h2 className="font-mono text-2xl font-extrabold tracking-wider mt-0.5">
                  {foundSubmission.ticketNumber}
                </h2>
              </div>
              <div>{getSubmissionStatusBadge(foundSubmission.status)}</div>
            </div>

            <CardContent className="p-6 sm:p-8 space-y-6">
              {/* Info Details */}
              <div className="grid gap-3 sm:grid-cols-2 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div>
                  <p className="text-[11px] font-bold text-slate-500 uppercase">Nama Pemohon</p>
                  <p className="text-base font-bold text-slate-900">{foundSubmission.citizenName}</p>
                </div>
                <div>
                  <p className="text-[11px] font-bold text-slate-500 uppercase">NIK Pemohon</p>
                  <p className="text-base font-mono font-bold text-slate-900">{foundSubmission.citizenNik}</p>
                </div>
                <div>
                  <p className="text-[11px] font-bold text-slate-500 uppercase">Jenis Surat</p>
                  <p className="text-base font-bold text-emerald-800">{foundSubmission.serviceTitle}</p>
                </div>
                <div>
                  <p className="text-[11px] font-bold text-slate-500 uppercase">Tanggal Masuk</p>
                  <p className="text-base font-bold text-slate-800">{foundSubmission.createdDate}</p>
                </div>
              </div>

              {/* TIMELINE STATUS VISUAL */}
              <div>
                <h3 className="text-base font-extrabold text-slate-900 mb-4 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-emerald-700" />
                  Alur Perkembangan Dokumen:
                </h3>

                <div className="relative border-l-2 border-slate-200 ml-4 pl-6 space-y-6">
                  {/* Step 1 */}
                  <div className="relative">
                    <div className="absolute -left-[31px] top-0 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-white font-bold text-xs">
                      ✓
                    </div>
                    <p className="text-sm font-bold text-slate-900">1. Pengajuan Berkas Diterima</p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Dokumen digital masuk ke sistem loket Kelurahan Bubulak pada {foundSubmission.createdDate}.
                    </p>
                  </div>

                  {/* Step 2 */}
                  <div className="relative">
                    <div
                      className={`absolute -left-[31px] top-0 flex h-6 w-6 items-center justify-center rounded-full font-bold text-xs ${
                        foundSubmission.status === "PROCESSED" ||
                        foundSubmission.status === "COMPLETED"
                          ? "bg-emerald-600 text-white"
                          : foundSubmission.status === "REJECTED"
                          ? "bg-red-600 text-white"
                          : "bg-slate-200 text-slate-600"
                      }`}
                    >
                      {foundSubmission.status === "REJECTED" ? "✕" : "2"}
                    </div>
                    <p className="text-sm font-bold text-slate-900">2. Verifikasi Staf & Pembuatan Surat</p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Pegawai kelurahan memeriksa keabsahan syarat fisik KTP/KK dan menyiapkan draf surat.
                    </p>
                  </div>

                  {/* Step 3 */}
                  <div className="relative">
                    <div
                      className={`absolute -left-[31px] top-0 flex h-6 w-6 items-center justify-center rounded-full font-bold text-xs ${
                        foundSubmission.status === "COMPLETED"
                          ? "bg-emerald-600 text-white"
                          : "bg-slate-200 text-slate-600"
                      }`}
                    >
                      3
                    </div>
                    <p className="text-sm font-bold text-slate-900">3. Surat Selesai & Siap Diambil</p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Surat resmi telah ditandatangani Lurah dan siap diambil di kantor kelurahan.
                    </p>
                  </div>
                </div>
              </div>

              {/* Admin Notes */}
              {foundSubmission.adminNotes && (
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-emerald-900 mb-1">
                    Catatan dari Petugas Kelurahan:
                  </p>
                  <p className="text-sm text-emerald-950 font-medium leading-relaxed">
                    &ldquo;{foundSubmission.adminNotes}&rdquo;
                  </p>
                </div>
              )}

              {/* Action Button */}
              <div className="pt-2">
                <a
                  href={`https://wa.me/${siteSettings.contactWhatsapp}?text=${encodeURIComponent(
                    `Halo Kantor Kelurahan Bubulak, saya ingin konfirmasi nomor resi *${foundSubmission.ticketNumber}* an. ${foundSubmission.citizenName}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 text-sm font-bold text-white hover:bg-emerald-800 min-h-[44px]"
                >
                  <MessageSquare className="h-4 w-4" />
                  Konfirmasi via WhatsApp Kelurahan
                </a>
              </div>
            </CardContent>
          </Card>
        ) : foundComplaint ? (
          /* COMPLAINT RESULT CARD */
          <Card className="overflow-hidden border border-slate-200 bg-white rounded-3xl shadow-sm">
            <div className="bg-slate-900 p-6 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase font-bold text-emerald-400">
                  Tiket Laporan Warga
                </p>
                <h2 className="font-mono text-2xl font-extrabold tracking-wider mt-0.5">
                  {foundComplaint.ticketNumber}
                </h2>
              </div>
              <div>{getComplaintStatusBadge(foundComplaint.status)}</div>
            </div>

            <CardContent className="p-6 sm:p-8 space-y-4">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                <div>
                  <p className="text-[11px] text-slate-500 font-bold uppercase">Judul Masalah</p>
                  <p className="text-lg font-bold text-slate-900">{foundComplaint.title}</p>
                </div>
                <div>
                  <p className="text-[11px] text-slate-500 font-bold uppercase">Lokasi RT/RW</p>
                  <p className="text-sm font-bold text-emerald-800">{foundComplaint.rtRwLocation}</p>
                </div>
                <div>
                  <p className="text-[11px] text-slate-500 font-bold uppercase">Deskripsi Laporan</p>
                  <p className="text-sm text-slate-700 leading-relaxed">{foundComplaint.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          /* NOT FOUND CARD */
          <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-center">
            <AlertCircle className="mx-auto mb-2 h-10 w-10 text-red-600" />
            <h3 className="text-lg font-bold text-red-900">
              Resi &ldquo;{activeSearch}&rdquo; Tidak Ditemukan
            </h3>
            <p className="mt-1 text-sm font-medium text-red-700">
              Pastikan Anda memasukkan kode resi yang tepat (contoh: `BBL-20260803-89X2`) atau NIK 16 digit yang benar.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

export default function CekResiPage() {
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
            <span className="text-white">Cek Resi</span>
          </nav>

          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/20 px-4 py-1.5 text-xs font-bold text-emerald-200">
            <Sparkles className="h-3.5 w-3.5 text-amber-300" />
            Pelacakan Dokumen Transparan
          </div>

          <h1 className="mb-3 text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl tracking-tight">
            Portal Cek Resi Ticket
          </h1>
          <p className="mx-auto max-w-2xl text-base text-emerald-100/90 leading-relaxed font-medium">
            Pantau status permohonan surat atau laporan aduan lingkungan Anda secara real-time.
          </p>
        </div>
      </section>

      <Suspense fallback={<div className="text-center py-12 text-slate-500 font-semibold">Memuat portal cek resi...</div>}>
        <CekResiContent />
      </Suspense>
    </div>
  );
}
