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
    <div className="flex flex-col space-y-8 pb-12 bg-slate-50">
      {/* ============================================ */}
      {/* PAGE HEADER SLEEK LINEAR DARK */}
      {/* ============================================ */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-900 via-emerald-800 to-slate-900 text-white pt-12 pb-16">
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <nav className="mb-4 flex items-center justify-center gap-2 text-xs font-semibold text-emerald-200">
            <Link href="/" className="hover:text-white">
              Beranda
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-white">Katalog Syarat Surat</span>
          </nav>

          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/20 px-4 py-1.5 text-xs font-bold text-emerald-200">
            <Sparkles className="h-3.5 w-3.5 text-amber-300" />
            Panduan Lengkap Persyaratan
          </div>

          <h1 className="mb-3 text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl tracking-tight">
            Syarat Pelayanan Surat
          </h1>
          <p className="mx-auto max-w-2xl text-base text-emerald-100/90 leading-relaxed font-medium">
            Temukan daftar berkas & persyaratan lengkap setiap surat kependudukan. Siapkan dokumen dari rumah sebelum mengajukan!
          </p>
        </div>
      </section>

      {/* ============================================ */}
      {/* SEARCH BAR PINTAR */}
      {/* ============================================ */}
      <section className="mx-auto w-full max-w-4xl px-4 -mt-8 sm:px-6 lg:px-8 z-10">
        <Card className="border border-slate-200 shadow-md rounded-3xl bg-white">
          <CardContent className="p-4 sm:p-5">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <Input
                type="search"
                placeholder='Cari jenis surat... (contoh: "nikah", "kematian", "domisili")'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-14 rounded-2xl border-2 border-slate-200 pl-12 pr-4 text-base font-bold text-slate-900 placeholder:text-slate-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 transition-all min-h-[48px]"
              />
            </div>
            {searchQuery && (
              <p className="mt-2.5 text-xs font-bold text-slate-600">
                Ditemukan{" "}
                <span className="text-emerald-700">
                  {filteredServices.length}
                </span>{" "}
                layanan
                {filteredServices.length === 0 && (
                  <span>
                    . Coba kata kunci lain atau{" "}
                    <button
                      onClick={() => setSearchQuery("")}
                      className="text-emerald-700 underline"
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
      <section className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
        {filteredServices.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-xs">
            <FileText className="mx-auto mb-3 h-12 w-12 text-slate-400" />
            <h3 className="mb-1 text-lg font-bold text-slate-800">
              Layanan Tidak Ditemukan
            </h3>
            <p className="text-sm text-slate-500">
              Kata kunci &ldquo;{searchQuery}&rdquo; tidak cocok dengan jenis surat manapun.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {categories.map((category) => (
              <div key={category}>
                {/* Category Header */}
                <div className="mb-3 flex items-center gap-2.5">
                  <div className="h-2 w-2 rounded-full bg-emerald-600" />
                  <h2 className="text-lg font-extrabold text-slate-900 sm:text-xl">
                    {category}
                  </h2>
                  <Badge
                    variant="secondary"
                    className="bg-emerald-50 text-emerald-800 border border-emerald-200/60 text-xs font-bold"
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
                        className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xs transition-all data-[open]:border-emerald-300 data-[open]:shadow-sm"
                      >
                        <AccordionTrigger className="cursor-pointer px-5 py-4 text-left hover:no-underline [&[data-open]>div>.icon-wrap]:bg-emerald-700 [&[data-open]>div>.icon-wrap]:text-white">
                          <div className="flex w-full items-center gap-4">
                            <div className="icon-wrap flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100/80 text-emerald-800 transition-colors">
                              <service.icon className="h-5 w-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="text-base font-extrabold text-slate-900">
                                {service.title}
                              </h3>
                              <p className="mt-0.5 text-xs font-semibold text-slate-500">
                                {service.requirements.length} berkas persyaratan
                              </p>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-5 pb-5 pt-1">
                          {/* Description */}
                          <div className="mb-4 flex items-start gap-3 rounded-xl bg-emerald-50/70 p-3.5 border border-emerald-200/60 text-sm font-medium text-emerald-900">
                            <Info className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
                            <p>{service.description}</p>
                          </div>

                          {/* Checklist */}
                          <h4 className="mb-2.5 flex items-center gap-2 text-sm font-extrabold text-slate-900">
                            <CheckSquare className="h-4 w-4 text-emerald-600" />
                            Checklist Berkas Persyaratan:
                          </h4>
                          <ul className="mb-5 space-y-2">
                            {service.requirements.map((req, reqIdx) => (
                              <li
                                key={reqIdx}
                                className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 py-2.5 text-sm font-medium text-slate-800"
                              >
                                <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-emerald-700 text-[11px] font-bold text-white">
                                  {reqIdx + 1}
                                </div>
                                <span>{req}</span>
                              </li>
                            ))}
                          </ul>

                          {/* Action Buttons (Touch Target min 44px) */}
                          <div className="flex flex-col gap-2.5 sm:flex-row">
                            <Button
                              onClick={() => handlePrint(service)}
                              variant="outline"
                              className="h-12 flex-1 gap-2 rounded-xl border-2 border-slate-200 font-bold text-slate-800 hover:bg-slate-50 min-h-[44px]"
                            >
                              <Printer className="h-4 w-4" />
                              Cetak Checklist
                            </Button>
                            <Button
                              onClick={() => handleWhatsApp(service)}
                              className="h-12 flex-1 gap-2 rounded-xl bg-emerald-700 font-bold text-white hover:bg-emerald-800 min-h-[44px]"
                            >
                              <MessageSquare className="h-4 w-4" />
                              Tanya Staf WA
                            </Button>
                            <Link
                              href="/ajukan"
                              className="h-12 flex-1 gap-2 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-300 font-bold flex items-center justify-center hover:bg-emerald-100 min-h-[44px]"
                            >
                              Ajukan Surat <ArrowRight className="h-4 w-4" />
                            </Link>
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
      {/* BOTTOM CTA CARD */}
      {/* ============================================ */}
      <section className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
        <Card className="overflow-hidden border border-slate-200 bg-gradient-to-br from-emerald-900 to-slate-900 text-white rounded-3xl shadow-sm">
          <CardContent className="p-6 sm:p-10 text-center">
            <h2 className="mb-2 text-2xl font-extrabold text-white">
              Sudah Lengkap Berkasnya?
            </h2>
            <p className="mx-auto mb-6 max-w-xl text-sm text-emerald-100/90 font-medium">
              Langsung ajukan surat secara online tanpa harus antre di kantor kelurahan. Anda akan mendapatkan Nomor Resi Ticket untuk melacak progresnya.
            </p>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/ajukan"
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 text-sm font-extrabold text-slate-950 shadow-sm transition-all hover:bg-emerald-400 sm:w-auto min-h-[48px]"
              >
                Ajukan Surat Online Sekarang
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/cek-resi"
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-emerald-400/40 bg-white/10 px-6 text-sm font-extrabold text-white hover:bg-white/20 sm:w-auto min-h-[48px]"
              >
                Cek Status Resi
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
