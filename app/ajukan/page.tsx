"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronRight,
  Sparkles,
  FileText,
  UploadCloud,
  CheckCircle2,
  Copy,
  Check,
  Search,
  AlertCircle,
  ArrowRight,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { serviceTypes } from "@/lib/data";

export default function AjukanSuratPage() {
  const [formData, setFormData] = useState({
    citizenName: "",
    citizenNik: "",
    citizenWhatsapp: "",
    citizenEmail: "",
    serviceTypeId: serviceTypes[0]?.id || "",
    notes: "",
    fileName: "",
  });

  const [submittedResi, setSubmittedResi] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const selectedService = serviceTypes.find((s) => s.id === formData.serviceTypeId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.citizenName || !formData.citizenNik || !formData.citizenWhatsapp) {
      setErrorMessage("Mohon lengkapi Nama Lengkap, NIK, dan Nomor WhatsApp Anda.");
      return;
    }

    if (formData.citizenNik.length !== 16) {
      setErrorMessage("NIK harus berjumlah 16 digit angka.");
      return;
    }

    setIsSubmitting(true);

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const generatedResi = `BBL-${dateStr}-${randomNum}X`;

    // Persist to INSForge DB
    const { createSubmissionInDb } = await import("@/lib/services");
    await createSubmissionInDb({
      ticketNumber: generatedResi,
      citizenName: formData.citizenName,
      citizenNik: formData.citizenNik,
      citizenWhatsapp: formData.citizenWhatsapp,
      citizenEmail: formData.citizenEmail,
      serviceTypeId: formData.serviceTypeId,
      notes: formData.notes,
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
      {/* ============================================ */}
      {/* PAGE HEADER LINEAR DARK */}
      {/* ============================================ */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-900 via-emerald-800 to-slate-900 text-white pt-12 pb-16">
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <nav className="mb-4 flex items-center justify-center gap-2 text-xs font-semibold text-emerald-200">
            <Link href="/" className="hover:text-white">
              Beranda
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-white">Form Pengajuan Surat</span>
          </nav>

          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/20 px-4 py-1.5 text-xs font-bold text-emerald-200">
            <Sparkles className="h-3.5 w-3.5 text-amber-300" />
            Layanan Mandiri Warga 24/7
          </div>

          <h1 className="mb-3 text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl tracking-tight">
            Form Permohonan Surat Online
          </h1>
          <p className="mx-auto max-w-2xl text-base text-emerald-100/90 leading-relaxed font-medium">
            Isi formulir dan unggah berkas Anda secara mandiri dari HP. Nomor resi otomatis diterbitkan setelah form dikirim.
          </p>
        </div>
      </section>

      {/* ============================================ */}
      {/* FORM SECTION */}
      {/* ============================================ */}
      <section className="mx-auto w-full max-w-3xl px-4 -mt-8 sm:px-6 lg:px-8 z-10">
        {submittedResi ? (
          /* POP-UP RESI SUCCESS CARD */
          <Card className="border border-emerald-300 bg-white rounded-3xl shadow-md overflow-hidden">
            <CardContent className="p-8 text-center sm:p-12">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-700 text-white shadow-sm">
                <CheckCircle2 className="h-10 w-10" />
              </div>

              <h2 className="mb-2 text-2xl font-extrabold text-slate-900">
                Pengajuan Surat Berhasil Terkirim!
              </h2>
              <p className="mx-auto mb-6 max-w-lg text-sm text-slate-600 font-medium">
                Simpan **Nomor Resi Ticket** di bawah ini untuk mengecek status permohonan surat Anda kapan saja secara real-time.
              </p>

              {/* RESI DISPLAY BOX */}
              <div className="mx-auto mb-6 max-w-md rounded-2xl border-2 border-emerald-200 bg-emerald-50/60 p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-emerald-900">
                  Nomor Resi Ticket Anda
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
                        Salin Nomor Resi
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
                  Lacak Status Resi Ini
                </Link>

                <button
                  onClick={() => {
                    setSubmittedResi(null);
                    setFormData({
                      citizenName: "",
                      citizenNik: "",
                      citizenWhatsapp: "",
                      citizenEmail: "",
                      serviceTypeId: serviceTypes[0]?.id || "",
                      notes: "",
                      fileName: "",
                    });
                  }}
                  className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-slate-300 px-6 text-sm font-bold text-slate-800 hover:bg-slate-50 sm:w-auto min-h-[48px]"
                >
                  Buat Pengajuan Baru
                </button>
              </div>
            </CardContent>
          </Card>
        ) : (
          /* INPUT FORM */
          <Card className="border border-slate-200 bg-white rounded-3xl shadow-sm">
            <CardContent className="p-6 sm:p-10">
              <h2 className="mb-6 flex items-center gap-2.5 text-xl font-extrabold text-slate-900 border-b border-slate-100 pb-4">
                <FileText className="h-6 w-6 text-emerald-700" />
                Formulir Permohonan Dokumen
              </h2>

              {errorMessage && (
                <div className="mb-6 flex items-center gap-3 rounded-2xl bg-red-50 p-4 border border-red-200 text-red-800 font-semibold text-sm">
                  <AlertCircle className="h-5 w-5 shrink-0 text-red-600" />
                  <p>{errorMessage}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Jenis Surat */}
                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-900">
                    Jenis Surat yang Diminta <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.serviceTypeId}
                    onChange={(e) =>
                      setFormData({ ...formData, serviceTypeId: e.target.value })
                    }
                    className="w-full h-14 rounded-2xl border-2 border-slate-200 px-4 text-base font-bold text-slate-900 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 bg-white min-h-[48px]"
                  >
                    {serviceTypes.map((service) => (
                      <option key={service.id} value={service.id}>
                        {service.title} ({service.category})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Info Berkas Layanan */}
                {selectedService && (
                  <div className="rounded-2xl bg-emerald-50/70 p-4 border border-emerald-200/80 text-sm font-medium text-emerald-900">
                    <p className="text-xs font-bold text-emerald-900 uppercase tracking-wider mb-1">
                      Persyaratan Berkas:
                    </p>
                    <ul className="list-disc list-inside text-xs text-emerald-800 space-y-1 font-semibold">
                      {selectedService.requirements.map((req, idx) => (
                        <li key={idx}>{req}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Nama Lengkap */}
                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-900">
                    Nama Lengkap Pemohon <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    placeholder="Sesuai KTP (contoh: Budi Santoso)"
                    value={formData.citizenName}
                    onChange={(e) =>
                      setFormData({ ...formData, citizenName: e.target.value })
                    }
                    className="h-14 rounded-2xl border-2 border-slate-200 text-base font-medium placeholder:text-slate-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 min-h-[48px]"
                    required
                  />
                </div>

                {/* NIK */}
                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-900">
                    Nomor Induk Kependudukan (NIK - 16 Digit) <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    maxLength={16}
                    placeholder="Contoh: 3271011508790001"
                    value={formData.citizenNik}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        citizenNik: e.target.value.replace(/\D/g, ""),
                      })
                    }
                    className="h-14 rounded-2xl border-2 border-slate-200 text-base font-mono font-bold placeholder:text-slate-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 min-h-[48px]"
                    required
                  />
                  <p className="mt-1 text-xs font-semibold text-slate-500">
                    {formData.citizenNik.length}/16 Digit
                  </p>
                </div>

                {/* WhatsApp */}
                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-900">
                    Nomor WhatsApp Aktif <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="tel"
                    placeholder="Contoh: 081234567890"
                    value={formData.citizenWhatsapp}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        citizenWhatsapp: e.target.value,
                      })
                    }
                    className="h-14 rounded-2xl border-2 border-slate-200 text-base font-mono font-bold placeholder:text-slate-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 min-h-[48px]"
                    required
                  />
                  <p className="mt-1 text-xs text-slate-500">
                    Nomor ini akan menerima update notifikasi status permohonan surat.
                  </p>
                </div>

                {/* Email (Opsional) */}
                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-900">
                    Alamat Email (Opsional)
                  </label>
                  <Input
                    type="email"
                    placeholder="Contoh: budi@gmail.com"
                    value={formData.citizenEmail}
                    onChange={(e) =>
                      setFormData({ ...formData, citizenEmail: e.target.value })
                    }
                    className="h-14 rounded-2xl border-2 border-slate-200 text-base font-medium placeholder:text-slate-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 min-h-[48px]"
                  />
                </div>

                {/* Keterangan */}
                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-900">
                    Keterangan / Alasan Permohonan
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tuliskan alasan permohonan surat..."
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData({ ...formData, notes: e.target.value })
                    }
                    className="w-full rounded-2xl border-2 border-slate-200 p-4 text-base font-medium text-slate-900 placeholder:text-slate-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 leading-relaxed"
                  />
                </div>

                {/* Upload File Attachment */}
                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-900">
                    Unggah Lampiran Berkas (KTP / KK / Surat RT)
                  </label>
                  <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-emerald-300 bg-emerald-50/40 p-6 text-center transition-colors hover:bg-emerald-50">
                    <UploadCloud className="mb-2 h-10 w-10 text-emerald-600" />
                    <p className="text-sm font-bold text-slate-800">
                      Pilih berkas dari perangkat Anda
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      Format: PDF, JPG, PNG (Maks 5 MB)
                    </p>
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
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
                        File Terpilih: {formData.fileName}
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
                    "Mengirimkan Pengajuan..."
                  ) : (
                    <>
                      Kirimkan Permohonan Surat
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
