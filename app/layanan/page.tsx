"use client";

export const dynamic = "force-dynamic";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  CheckSquare,
  Printer,
  MessageSquare,
  ArrowRight,
  FileText,
  ChevronRight,
  Info,
  Sparkles,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { serviceTypes, siteSettings } from "@/lib/data";

export default function LayananPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openItems, setOpenItems] = useState<number[]>([]);

  const filteredServices = useMemo(() => {
    if (!searchQuery.trim()) return serviceTypes;

    const query = searchQuery.toLowerCase();
    return serviceTypes.filter(
      (service) =>
        service.title.toLowerCase().includes(query) ||
        service.category.toLowerCase().includes(query) ||
        service.requirements.some((req) =>
          req.toLowerCase().includes(query)
        ) ||
        service.description.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const categories = useMemo(() => {
    const cats = [...new Set(filteredServices.map((s) => s.category))];
    return cats;
  }, [filteredServices]);

  const handlePrint = (service: (typeof serviceTypes)[0]) => {
    const printContent = `
      <!DOCTYPE html>
      <html lang="id">
      <head>
        <meta charset="UTF-8">
        <title>Syarat ${service.title} - Kelurahan Bubulak</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 40px; color: #1e293b; }
          h1 { color: #047857; font-size: 24px; margin-bottom: 8px; }
          h2 { color: #334155; font-size: 18px; margin-bottom: 16px; }
          .header { border-bottom: 2px solid #059669; padding-bottom: 16px; margin-bottom: 24px; }
          .subtitle { color: #64748b; font-size: 14px; }
          ul { padding-left: 20px; }
          li { margin-bottom: 10px; font-size: 15px; padding: 6px 0; border-bottom: 1px dashed #e2e8f0; }
          .note { background: #f0fdf4; padding: 12px 16px; border-radius: 8px; margin-top: 20px; font-size: 14px; color: #065f46; border: 1px solid #a7f3d0; }
          .footer { margin-top: 32px; padding-top: 16px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8; }
          .checkbox { display: inline-block; width: 14px; height: 14px; border: 2px solid #94a3b8; border-radius: 3px; margin-right: 8px; vertical-align: middle; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Kelurahan Bubulak</h1>
          <p class="subtitle">Kecamatan Bogor Barat · Kota Bogor</p>
        </div>
        <h2>Checklist Syarat: ${service.title}</h2>
        <ul>
          ${service.requirements.map((req) => `<li><span class="checkbox"></span>${req}</li>`).join("")}
        </ul>
        <div class="note">
          <strong>Catatan:</strong> ${service.description}
        </div>
        <div class="footer">
          Dicetak dari portal digital ${siteSettings.villageName} · ${new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
        </div>
      </body>
      </html>
    `;
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const handleWhatsApp = (service: (typeof serviceTypes)[0]) => {
    const message = encodeURIComponent(
      `Halo, saya ingin bertanya mengenai syarat *${service.title}* di Kelurahan Bubulak.\n\nTerima kasih.`
    );
    window.open(
      `https://wa.me/${siteSettings.contactWhatsapp}?text=${message}`,
      "_blank"
    );
  };

  return (
    <div className="flex flex-col">
      {/* ============================================ */}
      {/* PAGE HEADER */}
      {/* ============================================ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-700 via-emerald-600 to-emerald-800">
        {/* Decorative */}
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
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center justify-center gap-2 text-sm text-emerald-200">
            <Link href="/" className="transition-colors hover:text-white">
              Beranda
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="font-medium text-white">Syarat Pelayanan</span>
          </nav>

          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/20 px-4 py-2 text-sm font-medium text-emerald-100 backdrop-blur-sm">
            <Sparkles className="h-4 w-4" />
            Katalog Lengkap
          </div>

          <h1 className="mb-4 text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
            Syarat Pelayanan Surat
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-emerald-100/90">
            Cari dan temukan daftar berkas yang dibutuhkan untuk setiap jenis
            surat administrasi kelurahan. Tidak perlu lagi datang hanya untuk
            bertanya!
          </p>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
            preserveAspectRatio="none"
          >
            <path
              d="M0 24L80 28C160 32 320 40 480 42C640 44 800 40 960 34C1120 28 1280 20 1360 16L1440 12V60H1360C1280 60 1120 60 960 60C800 60 640 60 480 60C320 60 160 60 80 60H0V24Z"
              className="fill-background"
            />
          </svg>
        </div>
      </section>

      {/* ============================================ */}
      {/* SEARCH BAR */}
      {/* ============================================ */}
      <section className="mx-auto w-full max-w-4xl px-4 -mt-2 sm:px-6 lg:px-8">
        <Card className="border-2 border-emerald-200/60 shadow-xl">
          <CardContent className="p-4 sm:p-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-6 w-6 -translate-y-1/2 text-emerald-600" />
              <Input
                type="search"
                placeholder='Cari jenis surat... (contoh: "nikah", "kematian", "domisili")'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-14 rounded-xl border-2 border-emerald-200 pl-14 pr-4 text-lg placeholder:text-slate-400 focus:border-emerald-500 focus:ring-emerald-500 sm:h-16 sm:text-xl"
              />
            </div>
            {searchQuery && (
              <p className="mt-3 text-base text-slate-600">
                Ditemukan{" "}
                <span className="font-bold text-emerald-700">
                  {filteredServices.length}
                </span>{" "}
                layanan
                {filteredServices.length === 0 && (
                  <span>
                    . Coba kata kunci lain atau{" "}
                    <button
                      onClick={() => setSearchQuery("")}
                      className="font-semibold text-emerald-700 underline"
                    >
                      reset pencarian
                    </button>
                  </span>
                )}
              </p>
            )}
          </CardContent>
        </Card>
      </section>

      {/* ============================================ */}
      {/* ACCORDION FAQ SECTION */}
      {/* ============================================ */}
      <section className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        {filteredServices.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-12 text-center">
            <FileText className="mx-auto mb-4 h-16 w-16 text-slate-300" />
            <h3 className="mb-2 text-xl font-bold text-slate-700">
              Tidak Ada Hasil
            </h3>
            <p className="text-lg text-slate-500">
              Layanan dengan kata kunci &ldquo;{searchQuery}&rdquo; tidak
              ditemukan. Silakan coba kata kunci lain.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {categories.map((category) => (
              <div key={category}>
                {/* Category Header */}
                <div className="mb-4 flex items-center gap-3">
                  <div className="h-1 w-6 rounded-full bg-emerald-600" />
                  <h2 className="text-xl font-bold text-slate-800 sm:text-2xl">
                    {category}
                  </h2>
                  <Badge
                    variant="secondary"
                    className="bg-emerald-100 text-emerald-800 text-sm"
                  >
                    {
                      filteredServices.filter((s) => s.category === category)
                        .length
                    }{" "}
                    layanan
                  </Badge>
                </div>

                <Accordion
                  value={openItems}
                  onValueChange={setOpenItems}
                  className="space-y-3"
                >
                  {filteredServices
                    .filter((s) => s.category === category)
                    .sort((a, b) => a.displayOrder - b.displayOrder)
                    .map((service, idx) => (
                      <AccordionItem
                        key={service.id}
                        value={idx}
                        className="overflow-hidden rounded-xl border-2 border-slate-200 bg-white shadow-sm transition-all data-[open]:border-emerald-300 data-[open]:shadow-lg"
                      >
                        <AccordionTrigger className="cursor-pointer px-5 py-5 text-left hover:no-underline sm:px-6 [&[data-open]>div>.icon-wrap]:bg-emerald-700 [&[data-open]>div>.icon-wrap]:text-white">
                          <div className="flex w-full items-center gap-4">
                            <div className="icon-wrap flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 transition-colors sm:h-14 sm:w-14">
                              <service.icon className="h-6 w-6 sm:h-7 sm:w-7" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="text-base font-bold text-slate-900 sm:text-lg">
                                {service.title}
                              </h3>
                              <p className="mt-0.5 text-sm text-slate-500">
                                {service.requirements.length} berkas diperlukan
                              </p>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-5 pb-6 sm:px-6">
                          {/* Description */}
                          <div className="mb-5 flex items-start gap-3 rounded-xl bg-emerald-50 p-4 text-base text-emerald-800">
                            <Info className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                            <p>{service.description}</p>
                          </div>

                          {/* Checklist */}
                          <h4 className="mb-3 flex items-center gap-2 text-base font-bold text-slate-800">
                            <CheckSquare className="h-5 w-5 text-emerald-600" />
                            Checklist Berkas yang Diperlukan:
                          </h4>
                          <ul className="mb-6 space-y-2">
                            {service.requirements.map((req, reqIdx) => (
                              <li
                                key={reqIdx}
                                className="flex items-start gap-3 rounded-lg border border-slate-100 bg-slate-50 px-4 py-3 text-base text-slate-800 transition-colors hover:border-emerald-200 hover:bg-emerald-50"
                              >
                                <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 border-emerald-400 bg-white text-xs font-bold text-emerald-700">
                                  {reqIdx + 1}
                                </div>
                                <span>{req}</span>
                              </li>
                            ))}
                          </ul>

                          {/* Action Buttons */}
                          <div className="flex flex-col gap-3 sm:flex-row">
                            <Button
                              onClick={() => handlePrint(service)}
                              variant="outline"
                              className="h-12 flex-1 gap-2 rounded-xl border-2 border-emerald-300 text-base font-semibold text-emerald-800 hover:bg-emerald-50"
                            >
                              <Printer className="h-5 w-5" />
                              Cetak Ringkasan Syarat
                            </Button>
                            <Button
                              onClick={() => handleWhatsApp(service)}
                              className="h-12 flex-1 gap-2 rounded-xl bg-emerald-700 text-base font-semibold text-white hover:bg-emerald-800"
                            >
                              <MessageSquare className="h-5 w-5" />
                              Tanya via WhatsApp
                            </Button>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                </Accordion>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ============================================ */}
      {/* CTA BOTTOM */}
      {/* ============================================ */}
      <section className="bg-slate-50 py-12">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <Card className="overflow-hidden border-2 border-emerald-200/60 bg-gradient-to-br from-emerald-50 to-white shadow-lg">
            <CardContent className="p-8 sm:p-12">
              <h2 className="mb-3 text-2xl font-bold text-slate-900 sm:text-3xl">
                Sudah Tahu Syaratnya?
              </h2>
              <p className="mx-auto mb-6 max-w-xl text-lg text-slate-600">
                Langsung ajukan surat secara online tanpa harus datang ke kantor
                kelurahan. Dokumen Anda akan diproses dan Anda bisa memantau
                statusnya secara real-time.
              </p>
              <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
                <Link
                  href="/ajukan"
                  className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-emerald-700 px-8 text-lg font-bold text-white shadow-lg transition-all hover:bg-emerald-800 sm:w-auto"
                >
                  Ajukan Surat Online
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  href="/cek-resi"
                  className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-2xl border-2 border-emerald-300 px-8 text-lg font-bold text-emerald-800 transition-all hover:bg-emerald-50 sm:w-auto"
                >
                  Cek Status Pengajuan
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
