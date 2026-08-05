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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.title || !formData.rtRwLocation || !formData.description) {
      setErrorMessage("Mohon isi Judul Laporan, Lokasi RT/RW, dan Deskripsi Masalah.");
      return;
    }

    setIsSubmitting(true);

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const generatedResi = `LAP-${dateStr}-${randomNum}A`;

    // Persist to INSForge DB
    const { createComplaintInDb } = await import("@/lib/services");
    await createComplaintInDb({
      ticketNumber: generatedResi,
      title: formData.title,
      rtRwLocation: formData.rtRwLocation,
      description: formData.description,
      reporterName: formData.isAnonymous ? "Anonim" : formData.reporterName,
      reporterWhatsapp: formData.reporterWhatsapp,
    });

    setSubmittedResi(generatedResi);
    setIsSubmitting(false);
  };

  const handleCopyResi = () => {
    if (submittedResi) {
      navigator.clipboard.writeText(submittedResi);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

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
            <span className="text-white">Pengaduan Warga</span>
          </nav>

          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/20 px-4 py-1.5 text-xs font-bold text-emerald-200">
            <Sparkles className="h-3.5 w-3.5 text-amber-300" />
            Kanal Aspirasi Lingkungan Warga
          </div>

          <h1 className="mb-3 text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl tracking-tight">
            Portal Pengaduan Warga
          </h1>
          <p className="mx-auto max-w-2xl text-base text-emerald-100/90 leading-relaxed font-medium">
            Laporkan masalah lingkungan (seperti jalan rusak, penerangan mati, atau saluran tersumbat). Laporan dapat dikirim secara anonim.
          </p>
        </div>
      </section>

      {/* FORM SECTION */}
      <section className="mx-auto w-full max-w-3xl px-4 -mt-8 sm:px-6 lg:px-8 z-10">
        {submittedResi ? (
          /* SUCCESS RESI CARD */
          <Card className="border border-emerald-300 bg-white rounded-3xl shadow-md overflow-hidden">
            <CardContent className="p-8 text-center sm:p-12">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-700 text-white shadow-sm">
                <CheckCircle2 className="h-10 w-10" />
              </div>

              <h2 className="mb-2 text-2xl font-extrabold text-slate-900">
                Laporan Warga Berhasil Terkirim!
              </h2>
              <p className="mx-auto mb-6 max-w-lg text-sm text-slate-600 font-medium">
                Terima kasih atas kepedulian Anda terhadap lingkungan Kelurahan Bubulak. Simpan nomor resi di bawah ini untuk memantau respons staf.
              </p>

              {/* RESI DISPLAY */}
              <div className="mx-auto mb-6 max-w-md rounded-2xl border-2 border-emerald-200 bg-emerald-50/60 p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-emerald-900">
                  Nomor Tiket Laporan Anda
                </p>
                <p className="mt-1 font-mono text-2xl sm:text-3xl font-extrabold text-emerald-800 tracking-wider">
                  {submittedResi}
                </p>

                <div className="mt-4 flex justify-center">
                  <Button
                    onClick={handleCopyResi}
                    variant="outline"
                    className="gap-2 border-2 border-emerald-300 font-bold text-emerald-900 hover:bg-emerald-100 min-h-[44px]"
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4 text-emerald-700" />
                        Kode Resi Tersalin!
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
                  className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-6 text-sm font-extrabold text-white shadow-sm hover:bg-emerald-800 sm:w-auto min-h-[48px]"
                >
                  <Search className="h-4 w-4" />
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
                  className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-slate-300 px-6 text-sm font-bold text-slate-800 hover:bg-slate-50 sm:w-auto min-h-[48px]"
                >
                  Kirim Laporan Lain
                </button>
              </div>
            </CardContent>
          </Card>
        ) : (
          /* FORM INPUT */
          <Card className="border border-slate-200 bg-white rounded-3xl shadow-sm">
            <CardContent className="p-6 sm:p-10">
              <h2 className="mb-6 flex items-center gap-2.5 text-xl font-extrabold text-slate-900 border-b border-slate-100 pb-4">
                <MessageSquareWarning className="h-6 w-6 text-emerald-700" />
                Form Pengaduan & Aspirasi Lingkungan
              </h2>

              {errorMessage && (
                <div className="mb-6 flex items-center gap-3 rounded-2xl bg-red-50 p-4 border border-red-200 text-red-800 font-semibold text-sm">
                  <AlertCircle className="h-5 w-5 shrink-0 text-red-600" />
                  <p>{errorMessage}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Judul Laporan */}
                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-900">
                    Judul Laporan Masalah <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    placeholder="Contoh: Lampu PJU Mati di Jalan Utama RW 05"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="h-14 rounded-2xl border-2 border-slate-200 text-base font-medium placeholder:text-slate-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 min-h-[48px]"
                    required
                  />
                </div>

                {/* Lokasi RT / RW */}
                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-900">
                    Lokasi Kejadian (RT / RW) <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    placeholder="Contoh: RT 02 / RW 05 (Dekat Lapangan Volly)"
                    value={formData.rtRwLocation}
                    onChange={(e) =>
                      setFormData({ ...formData, rtRwLocation: e.target.value })
                    }
                    className="h-14 rounded-2xl border-2 border-slate-200 text-base font-medium placeholder:text-slate-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 min-h-[48px]"
                    required
                  />
                </div>

                {/* Deskripsi Masalah */}
                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-900">
                    Deskripsi Lengkap Masalah <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Jelaskan secara rinci kronologi atau kondisi masalah fisik/sosial di lapangan..."
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full rounded-2xl border-2 border-slate-200 p-4 text-base font-medium text-slate-900 placeholder:text-slate-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 leading-relaxed"
                    required
                  />
                </div>

                {/* Opsi Anonim */}
                <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isAnonymous}
                      onChange={(e) =>
                        setFormData({ ...formData, isAnonymous: e.target.checked })
                      }
                      className="h-5 w-5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                    />
                    <div>
                      <p className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                        <ShieldCheck className="h-4 w-4 text-emerald-700" />
                        Kirim Secara Anonim (Rahasiakan Nama Saya)
                      </p>
                      <p className="text-xs text-slate-500">
                        Identitas Anda tidak akan ditampilkan di laporan publik.
                      </p>
                    </div>
                  </label>
                </div>

                {/* Identitas Pelapor (Jika tidak anonim) */}
                {!formData.isAnonymous && (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-bold text-slate-900">
                        Nama Pelapor
                      </label>
                      <Input
                        type="text"
                        placeholder="Contoh: Pak Ridwan"
                        value={formData.reporterName}
                        onChange={(e) =>
                          setFormData({ ...formData, reporterName: e.target.value })
                        }
                        className="h-14 rounded-2xl border-2 border-slate-200 text-base font-medium placeholder:text-slate-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 min-h-[48px]"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-bold text-slate-900">
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
                        className="h-14 rounded-2xl border-2 border-slate-200 text-base font-mono font-bold placeholder:text-slate-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 min-h-[48px]"
                      />
                    </div>
                  </div>
                )}

                {/* Upload Foto Bukti */}
                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-900">
                    Upload Foto Bukti Masalah (Opsional)
                  </label>
                  <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-emerald-300 bg-emerald-50/40 p-6 text-center transition-colors hover:bg-emerald-50">
                    <UploadCloud className="mb-2 h-10 w-10 text-emerald-600" />
                    <p className="text-sm font-bold text-slate-800">
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
                      className="mt-3 text-xs text-slate-600"
                    />
                    {formData.fileName && (
                      <p className="mt-2 text-xs font-bold text-emerald-800">
                        Foto Terpilih: {formData.fileName}
                      </p>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-14 w-full gap-2 rounded-2xl bg-emerald-700 text-lg font-extrabold text-white shadow-sm hover:bg-emerald-800 active:scale-[0.98] min-h-[48px]"
                >
                  {isSubmitting ? (
                    "Mengirimkan Laporan..."
                  ) : (
                    <>
                      Kirimkan Laporan Warga
                      <ArrowRight className="h-5 w-5" />
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
