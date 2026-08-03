"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Search,
  ChevronRight,
  Sparkles,
  Clock,
  CheckCircle2,
  XCircle,
  FileText,
  AlertCircle,
  MessageSquare,
  Copy,
  Check,
  Building,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  dummySubmissions,
  dummyComplaints,
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
        return <Badge className="bg-amber-500 text-white font-bold text-sm px-3 py-1">🟡 DITERIMA / PENDING</Badge>;
      case "PROCESSED":
        return <Badge className="bg-blue-600 text-white font-bold text-sm px-3 py-1">🔵 SEDANG DIPROSES</Badge>;
      case "COMPLETED":
        return <Badge className="bg-emerald-600 text-white font-bold text-sm px-3 py-1">🟢 SELESAI / SIAP DIAMBIL</Badge>;
      case "REJECTED":
        return <Badge className="bg-red-600 text-white font-bold text-sm px-3 py-1">🔴 PERLU PERBAIKAN</Badge>;
    }
  };

  const getComplaintStatusBadge = (status: ComplaintTicket["status"]) => {
    switch (status) {
      case "PENDING":
        return <Badge className="bg-amber-500 text-white font-bold text-sm px-3 py-1">🟡 MENUNGGU</Badge>;
      case "IN_PROGRESS":
        return <Badge className="bg-blue-600 text-white font-bold text-sm px-3 py-1">🔵 TINDAK LANJUT</Badge>;
      case "RESOLVED":
        return <Badge className="bg-emerald-600 text-white font-bold text-sm px-3 py-1">🟢 TERAN GANI / SELESAI</Badge>;
    }
  };

  return (
    <div className="space-y-10">
      {/* SEARCH BOX */}
      <section className="mx-auto w-full max-w-3xl px-4 -mt-2 sm:px-6 lg:px-8">
        <Card className="border-2 border-emerald-200/60 shadow-xl">
          <CardContent className="p-6">
            <form onSubmit={handleSearchSubmit} className="space-y-4">
              <label className="block text-base font-bold text-slate-800">
                Masukkan Kode Resi atau NIK Anda:
              </label>
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 h-6 w-6 -translate-y-1/2 text-emerald-600" />
                  <Input
                    type="search"
                    placeholder="Contoh: BBL-20260803-89X2 atau 32710115..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="h-14 rounded-xl border-2 border-emerald-200 pl-14 pr-4 text-lg font-mono placeholder:text-slate-400 focus:border-emerald-500 focus:ring-emerald-500"
                  />
                </div>
                <Button
                  type="submit"
                  className="h-14 rounded-xl bg-emerald-700 px-8 text-lg font-bold text-white shadow-md hover:bg-emerald-800"
                >
                  Cek Resi
                </Button>
              </div>
            </form>

            {/* Quick Test Ticket Chips */}
            <div className="mt-4 pt-4 border-t border-slate-100">
              <p className="text-xs font-bold text-slate-500 mb-2">
                Uji Coba Kode Resi Sample (Klik untuk langsung cek):
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
                      className="rounded-lg border border-emerald-300 bg-emerald-50 px-3 py-1.5 font-mono text-xs font-bold text-emerald-800 hover:bg-emerald-100"
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
          <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-12 text-center">
            <Search className="mx-auto mb-4 h-16 w-16 text-slate-300" />
            <h3 className="mb-2 text-xl font-bold text-slate-700">
              Cek Status Surat atau Laporan
            </h3>
            <p className="text-lg text-slate-500">
              Masukkan Nomor Resi atau 16 digit NIK pada kolom pencarian di atas.
            </p>
          </div>
        ) : foundSubmission ? (
          /* SUBMISSION RESULT CARD */
          <Card className="overflow-hidden border-2 border-emerald-300 bg-white shadow-xl">
            <div className="bg-emerald-800 p-6 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase font-bold text-emerald-300">
                  Resi Pengajuan Surat
                </p>
                <h2 className="font-mono text-2xl font-extrabold tracking-wider">
                  {foundSubmission.ticketNumber}
                </h2>
              </div>
              <div>{getSubmissionStatusBadge(foundSubmission.status)}</div>
            </div>

            <CardContent className="p-6 sm:p-8 space-y-6">
              {/* Info Details */}
              <div className="grid gap-4 sm:grid-cols-2 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase">Nama Pemohon</p>
                  <p className="text-lg font-bold text-slate-900">{foundSubmission.citizenName}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase">NIK Pemohon</p>
                  <p className="text-lg font-mono font-bold text-slate-900">{foundSubmission.citizenNik}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase">Jenis Layanan Surat</p>
                  <p className="text-base font-bold text-emerald-800">{foundSubmission.serviceTitle}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase">Tanggal Pengajuan</p>
                  <p className="text-base font-bold text-slate-800">{foundSubmission.createdDate}</p>
                </div>
              </div>

              {/* TIMELINE STATUS VISUAL */}
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-emerald-700" />
                  Timeline Perkembangan Dokumen:
                </h3>

                <div className="relative border-l-4 border-emerald-200 ml-4 pl-6 space-y-8">
                  {/* Step 1 */}
                  <div className="relative">
                    <div className="absolute -left-[35px] top-0 flex h-7 w-7 items-center justify-center rounded-full bg-emerald-600 text-white font-bold text-xs">
                      ✓
                    </div>
                    <p className="text-base font-bold text-slate-900">1. Pengajuan Berkas Diterima</p>
                    <p className="text-sm text-slate-500">
                      Dokumen digital masuk ke sistem loket Kelurahan Bubulak pada {foundSubmission.createdDate}.
                    </p>
                  </div>

                  {/* Step 2 */}
                  <div className="relative">
                    <div
                      className={`absolute -left-[35px] top-0 flex h-7 w-7 items-center justify-center rounded-full font-bold text-xs ${
                        foundSubmission.status === "PROCESSED" ||
                        foundSubmission.status === "COMPLETED"
                          ? "bg-emerald-600 text-white"
                          : foundSubmission.status === "REJECTED"
                          ? "bg-red-600 text-white"
                          : "bg-slate-300 text-slate-600"
                      }`}
                    >
                      {foundSubmission.status === "REJECTED" ? "✕" : "2"}
                    </div>
                    <p className="text-base font-bold text-slate-900">2. Verifikasi Staf & Pembuatan Surat</p>
                    <p className="text-sm text-slate-500">
                      Pegawai kelurahan memeriksa keabsahan syarat fisik KTP/KK dan menyiapkan draf surat.
                    </p>
                  </div>

                  {/* Step 3 */}
                  <div className="relative">
                    <div
                      className={`absolute -left-[35px] top-0 flex h-7 w-7 items-center justify-center rounded-full font-bold text-xs ${
                        foundSubmission.status === "COMPLETED"
                          ? "bg-emerald-600 text-white"
                          : "bg-slate-300 text-slate-600"
                      }`}
                    >
                      3
                    </div>
                    <p className="text-base font-bold text-slate-900">3. Surat Selesai Ditandatangani & Siap Diambil</p>
                    <p className="text-sm text-slate-500">
                      Surat resmi telah ditandatangani Lurah dan siap diambil di kantor kelurahan.
                    </p>
                  </div>
                </div>
              </div>

              {/* Admin Notes */}
              {foundSubmission.adminNotes && (
                <div className="rounded-xl border-2 border-emerald-200 bg-emerald-50 p-4">
                  <p className="text-sm font-bold uppercase tracking-wider text-emerald-900 mb-1">
                    Catatan dari Petugas Kelurahan:
                  </p>
                  <p className="text-base text-emerald-950 font-medium leading-relaxed">
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
                  className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 text-base font-bold text-white hover:bg-emerald-800"
                >
                  <MessageSquare className="h-5 w-5" />
                  Konfirmasi via WhatsApp Kelurahan
                </a>
              </div>
            </CardContent>
          </Card>
        ) : foundComplaint ? (
          /* COMPLAINT RESULT CARD */
          <Card className="overflow-hidden border-2 border-emerald-300 bg-white shadow-xl">
            <div className="bg-emerald-900 p-6 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase font-bold text-emerald-300">
                  Tiket Laporan Warga
                </p>
                <h2 className="font-mono text-2xl font-extrabold tracking-wider">
                  {foundComplaint.ticketNumber}
                </h2>
              </div>
              <div>{getComplaintStatusBadge(foundComplaint.status)}</div>
            </div>

            <CardContent className="p-6 sm:p-8 space-y-6">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase">Judul Masalah</p>
                  <p className="text-xl font-bold text-slate-900">{foundComplaint.title}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase">Lokasi RT/RW</p>
                  <p className="text-base font-bold text-emerald-800">{foundComplaint.rtRwLocation}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase">Deskripsi Laporan</p>
                  <p className="text-base text-slate-700">{foundComplaint.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          /* NOT FOUND CARD */
          <div className="rounded-2xl border-2 border-red-200 bg-red-50 p-8 text-center">
            <AlertCircle className="mx-auto mb-3 h-12 w-12 text-red-500" />
            <h3 className="text-xl font-bold text-red-900">
              Resi &ldquo;{activeSearch}&rdquo; Tidak Ditemukan
            </h3>
            <p className="mt-1 text-base text-red-700">
              Pastikan Anda memasukkan kode resi yang tepat (contoh: BBL-20260803-89X2) atau 16 digit NIK yang benar.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

export default function CekResiPage() {
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
            <span className="font-medium text-white">Cek Resi</span>
          </nav>

          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/20 px-4 py-2 text-sm font-medium text-emerald-100 backdrop-blur-sm">
            <Sparkles className="h-4 w-4" />
            Pelacakan Transparan
          </div>

          <h1 className="mb-4 text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
            Portal Cek Status Pengajuan & Laporan
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-emerald-100/90">
            Pantau sejauh mana proses permohonan surat atau penanganan pengaduan lingkungan Anda secara real-time.
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
              d="M0 24L80 28C160 32 320 40 480 42C640 44 800 40 960 34C1120 28 1280 20 1360 16L1440 12V60H1360C1280 60 1120 60 960 60C320 60 160 60 80 60H0V24Z"
              className="fill-background"
            />
          </svg>
        </div>
      </section>

      <div className="py-10">
        <Suspense fallback={<div className="text-center py-12 text-slate-500">Memuat portal cek resi...</div>}>
          <CekResiContent />
        </Suspense>
      </div>
    </div>
  );
}
