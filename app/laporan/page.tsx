"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronRight,
  Sparkles,
  MessageSquareWarning,
  UploadCloud,
  CheckCircle2,
  Copy,
  Check,
  Search,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function LaporanPage() {
  const [formData, setFormData] = useState({
    title: "",
    rtRwLocation: "",
    description: "",
    reporterName: "",
    reporterWhatsapp: "",
    isAnonymous: false,
    fileName: "",
  });

  const [submittedResi, setSubmittedResi] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.title || !formData.rtRwLocation || !formData.description) {
      setErrorMessage("Mohon isi Judul Laporan, Lokasi RT/RW, dan Deskripsi Masalah.");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
      const generatedResi = `LAP-${dateStr}-${randomNum}A`;
      setSubmittedResi(generatedResi);
      setIsSubmitting(false);
    }, 800);
  };

  const handleCopyResi = () => {
    if (submittedResi) {
      navigator.clipboard.writeText(submittedResi);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

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
            <span className="font-medium text-white">Laporan & Aspirasi</span>
          </nav>

          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/20 px-4 py-2 text-sm font-medium text-emerald-100 backdrop-blur-sm">
            <Sparkles className="h-4 w-4" />
            Pengaduan Warga Online
          </div>

          <h1 className="mb-4 text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
            Laporan & Aspirasi Warga
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-emerald-100/90">
            Laporkan masalah lingkungan di wilayah Kelurahan Bubulak (seperti jalan rusak, penerangan umum mati, atau saluran tersumbat). Anda dapat melapor secara anonim.
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

      {/* ============================================ */}
      {/* FORM SECTION */}
      {/* ============================================ */}
      <section className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        {submittedResi ? (
          /* SUCCESS RESI CARD */
          <Card className="border-2 border-emerald-500 bg-gradient-to-br from-emerald-50 via-white to-emerald-50 shadow-2xl">
            <CardContent className="p-8 text-center sm:p-12">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-600 text-white shadow-xl">
                <CheckCircle2 className="h-12 w-12" />
              </div>

              <h2 className="mb-2 text-2xl font-extrabold text-slate-900 sm:text-3xl">
                Laporan Berhasil Diterima!
              </h2>
              <p className="mx-auto mb-6 max-w-lg text-lg text-slate-600">
                Terima kasih atas kepedulian Anda terhadap lingkungan Kelurahan Bubulak. Laporan Anda telah masuk ke sistem kami.
              </p>

              {/* RESI DISPLAY */}
              <div className="mx-auto mb-8 max-w-md rounded-2xl border-2 border-emerald-300 bg-white p-6 shadow-inner">
                <p className="text-sm font-semibold uppercase tracking-wider text-emerald-800">
                  Nomor Tiket Laporan Anda
                </p>
                <p className="mt-2 font-mono text-3xl font-extrabold text-emerald-700 tracking-wider">
                  {submittedResi}
                </p>

                <div className="mt-4 flex justify-center">
                  <Button
                    onClick={handleCopyResi}
                    variant="outline"
                    className="gap-2 border-2 border-emerald-300 font-bold text-emerald-800 hover:bg-emerald-50"
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4 text-emerald-600" />
                        Tersalin!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        Salin Nomor Tiket
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href={`/cek-resi?resi=${submittedResi}`}
                  className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-emerald-700 px-8 text-lg font-bold text-white shadow-lg hover:bg-emerald-800 sm:w-auto"
                >
                  <Search className="h-5 w-5" />
                  Cek Status Laporan Ini
                </Link>

                <button
                  onClick={() => {
                    setSubmittedResi(null);
                    setFormData({
                      title: "",
                      rtRwLocation: "",
                      description: "",
                      reporterName: "",
                      reporterWhatsapp: "",
                      isAnonymous: false,
                      fileName: "",
                    });
                  }}
                  className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-2xl border-2 border-slate-300 px-8 text-lg font-bold text-slate-700 hover:bg-slate-100 sm:w-auto"
                >
                  Kirim Laporan Lain
                </button>
              </div>
            </CardContent>
          </Card>
        ) : (
          /* FORM INPUT */
          <Card className="border-2 border-emerald-200/80 bg-white shadow-xl">
            <CardContent className="p-6 sm:p-10">
              <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold text-slate-900 border-b border-slate-100 pb-4">
                <MessageSquareWarning className="h-7 w-7 text-emerald-700" />
                Form Pengaduan & Aspirasi
              </h2>

              {errorMessage && (
                <div className="mb-6 flex items-center gap-3 rounded-xl bg-red-50 p-4 border border-red-200 text-red-700 font-semibold text-base">
                  <AlertCircle className="h-5 w-5 shrink-0" />
                  <p>{errorMessage}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Judul Laporan */}
                <div>
                  <label className="mb-2 block text-base font-bold text-slate-800">
                    Judul Masalah / Laporan <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    placeholder="Contoh: Lampu PJU Mati di Jalan Utama RW 05"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="h-14 rounded-xl border-2 border-slate-200 text-lg placeholder:text-slate-400"
                    required
                  />
                </div>

                {/* Lokasi RT / RW */}
                <div>
                  <label className="mb-2 block text-base font-bold text-slate-800">
                    Lokasi Wilayah (RT / RW) <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    placeholder="Contoh: RT 02 / RW 05 (Dekat Lapangan Volly)"
                    value={formData.rtRwLocation}
                    onChange={(e) =>
                      setFormData({ ...formData, rtRwLocation: e.target.value })
                    }
                    className="h-14 rounded-xl border-2 border-slate-200 text-lg placeholder:text-slate-400"
                    required
                  />
                </div>

                {/* Deskripsi Masalah */}
                <div>
                  <label className="mb-2 block text-base font-bold text-slate-800">
                    Deskripsi Lengkap Masalah <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Jelaskan secara rinci kronologi atau kondisi masalah fisik/sosial di lapangan..."
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full rounded-xl border-2 border-slate-200 p-4 text-base placeholder:text-slate-400 focus:border-emerald-500 focus:ring-emerald-500"
                    required
                  />
                </div>

                {/* Opsi Anonim */}
                <div className="rounded-xl bg-slate-50 p-4 border border-slate-200">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isAnonymous}
                      onChange={(e) =>
                        setFormData({ ...formData, isAnonymous: e.target.checked })
                      }
                      className="h-6 w-6 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                    />
                    <div>
                      <p className="text-base font-bold text-slate-900 flex items-center gap-1.5">
                        <ShieldCheck className="h-5 w-5 text-emerald-600" />
                        Kirim Laporan Secara Anonim (Rahasiakan Nama Saya)
                      </p>
                      <p className="text-sm text-slate-500">
                        Nama Anda tidak akan ditampilkan ke publik.
                      </p>
                    </div>
                  </label>
                </div>

                {/* Identitas Pelapor (Jika tidak anonim) */}
                {!formData.isAnonymous && (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-base font-bold text-slate-800">
                        Nama Pelapor
                      </label>
                      <Input
                        type="text"
                        placeholder="Contoh: Pak Ridwan"
                        value={formData.reporterName}
                        onChange={(e) =>
                          setFormData({ ...formData, reporterName: e.target.value })
                        }
                        className="h-14 rounded-xl border-2 border-slate-200 text-lg placeholder:text-slate-400"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-base font-bold text-slate-800">
                        No. WhatsApp (Opsional)
                      </label>
                      <Input
                        type="tel"
                        placeholder="Contoh: 081234567890"
                        value={formData.reporterWhatsapp}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            reporterWhatsapp: e.target.value,
                          })
                        }
                        className="h-14 rounded-xl border-2 border-slate-200 text-lg placeholder:text-slate-400"
                      />
                    </div>
                  </div>
                )}

                {/* Upload Foto Bukti */}
                <div>
                  <label className="mb-2 block text-base font-bold text-slate-800">
                    Upload Foto Bukti Masalah (Opsional)
                  </label>
                  <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-emerald-300 bg-emerald-50/50 p-6 text-center transition-colors hover:bg-emerald-50">
                    <UploadCloud className="mb-2 h-10 w-10 text-emerald-600" />
                    <p className="text-base font-semibold text-slate-700">
                      Ambil foto atau pilih dari galeri
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      Format: JPG, PNG (Maks 5 MB)
                    </p>
                    <input
                      type="file"
                      accept=".jpg,.jpeg,.png"
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          setFormData({
                            ...formData,
                            fileName: e.target.files[0].name,
                          });
                        }
                      }}
                      className="mt-3 text-sm text-slate-600"
                    />
                    {formData.fileName && (
                      <p className="mt-2 text-sm font-bold text-emerald-800">
                        Foto Terpilih: {formData.fileName}
                      </p>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-16 w-full gap-2 rounded-2xl bg-emerald-700 text-xl font-bold text-white shadow-xl hover:bg-emerald-800"
                >
                  {isSubmitting ? (
                    "Mengirimkan Laporan..."
                  ) : (
                    <>
                      Kirim Laporan Warga
                      <ArrowRight className="h-6 w-6" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
      </section>
    </div>
  );
}
