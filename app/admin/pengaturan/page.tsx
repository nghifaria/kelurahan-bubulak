"use client";

import { useState, useEffect } from "react";
import {
  Settings,
  Landmark,
  Save,
  CheckCircle2,
  AlertCircle,
  Phone,
  Mail,
  MapPin,
  Globe,
  Video,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { fetchSiteSettings, updateSiteSettingsInDb } from "@/lib/services";

export default function AdminPengaturanPage() {
  const [villageName, setVillageName] = useState("Kelurahan Bubulak");
  const [lurahName, setLurahName] = useState("");
  const [officeAddress, setOfficeAddress] = useState("");
  const [contactWhatsapp, setContactWhatsapp] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [googleMapsUrl, setGoogleMapsUrl] = useState("");
  const [instagramUrl, setInstagramUrl] = useState("");
  const [tiktokUrl, setTiktokUrl] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    setIsLoading(true);
    const data = await fetchSiteSettings();
    setVillageName(data.villageName);
    setLurahName(data.lurahName);
    setOfficeAddress(data.officeAddress);
    setContactWhatsapp(data.contactWhatsapp);
    setContactEmail(data.contactEmail);
    setGoogleMapsUrl(data.googleMapsUrl);
    setInstagramUrl(data.instagramUrl || "");
    setIsLoading(false);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    // Auto sanitize WhatsApp phone format (convert 08xxx to 628xxx)
    const cleanWa = contactWhatsapp.replace(/\D/g, "");
    const formattedWa = cleanWa.startsWith("0") ? "62" + cleanWa.slice(1) : cleanWa;

    const { error } = await updateSiteSettingsInDb({
      villageName,
      lurahName,
      officeAddress,
      contactEmail,
      contactWhatsapp: formattedWa,
      googleMapsUrl,
      instagramUrl,
      tiktokUrl,
    });

    setIsSubmitting(false);

    if (error) {
      setMessage({ type: "error", text: "Gagal menyimpan pengaturan ke INSForge Database." });
    } else {
      setMessage({
        type: "success",
        text: "Pengaturan umum website berhasil diperbarui secara live di database!",
      });
      loadSettings();
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-3">
          <Settings className="h-8 w-8 text-emerald-700" />
          CMS Pengaturan Utama Website
        </h1>
        <p className="mt-1 text-base text-slate-600">
          Kelola informasi nama Lurah, alamat kantor, kontak WhatsApp resmi, email, dan link sosmed kelurahan
        </p>
      </div>

      {message && (
        <div
          className={`rounded-2xl p-4 text-base font-semibold border flex items-center gap-3 ${
            message.type === "success"
              ? "bg-emerald-50 text-emerald-800 border-emerald-300"
              : "bg-red-50 text-red-800 border-red-300"
          }`}
        >
          {message.type === "success" ? (
            <CheckCircle2 className="h-6 w-6 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="h-6 w-6 text-red-600 shrink-0" />
          )}
          <p>{message.text}</p>
        </div>
      )}

      {/* FORM CARD */}
      <Card className="border-2 border-slate-200 shadow-md">
        <CardContent className="p-6 sm:p-10">
          {isLoading ? (
            <div className="py-12 text-center text-slate-500 font-medium">
              Memuat pengaturan dari INSForge Database...
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nama Kelurahan & Nama Lurah */}
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-base font-bold text-slate-800">
                    Nama Kelurahan / Instansi *
                  </label>
                  <div className="relative">
                    <Landmark className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                    <Input
                      type="text"
                      value={villageName}
                      onChange={(e) => setVillageName(e.target.value)}
                      className="h-14 rounded-xl border-2 border-slate-200 pl-12 text-lg font-bold"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-base font-bold text-slate-800">
                    Nama Lurah Lengkap & Gelar *
                  </label>
                  <Input
                    type="text"
                    placeholder="Contoh: H. Ahmad Supriyadi, S.Sos., M.Si."
                    value={lurahName}
                    onChange={(e) => setLurahName(e.target.value)}
                    className="h-14 rounded-xl border-2 border-slate-200 text-lg font-bold"
                    required
                  />
                </div>
              </div>

              {/* Alamat Kantor */}
              <div>
                <label className="mb-2 block text-base font-bold text-slate-800">
                  Alamat Kantor Kelurahan *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <Input
                    type="text"
                    value={officeAddress}
                    onChange={(e) => setOfficeAddress(e.target.value)}
                    className="h-14 rounded-xl border-2 border-slate-200 pl-12 text-base"
                    required
                  />
                </div>
              </div>

              {/* Kontak WA & Email */}
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-base font-bold text-slate-800">
                    Nomor WhatsApp Resmi Kelurahan * (Auto Format 628xxx)
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                    <Input
                      type="tel"
                      placeholder="081234567890"
                      value={contactWhatsapp}
                      onChange={(e) => setContactWhatsapp(e.target.value)}
                      className="h-14 rounded-xl border-2 border-slate-200 pl-12 text-lg font-mono"
                      required
                    />
                  </div>
                  <p className="mt-1 text-xs text-slate-500">
                    Digunakan untuk pengiriman notifikasi & tombol WhatsApp warga.
                  </p>
                </div>

                <div>
                  <label className="mb-2 block text-base font-bold text-slate-800">
                    Alamat Email Resmi *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                    <Input
                      type="email"
                      placeholder="kelurahan.bubulak@kotabogor.go.id"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="h-14 rounded-xl border-2 border-slate-200 pl-12 text-base"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Google Maps Link */}
              <div>
                <label className="mb-2 block text-base font-bold text-slate-800">
                  Tautan Google Maps Kantor Kelurahan *
                </label>
                <div className="relative">
                  <Globe className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <Input
                    type="url"
                    placeholder="https://maps.app.goo.gl/..."
                    value={googleMapsUrl}
                    onChange={(e) => setGoogleMapsUrl(e.target.value)}
                    className="h-14 rounded-xl border-2 border-slate-200 pl-12 text-sm font-mono"
                    required
                  />
                </div>
              </div>

              {/* Social Media Links */}
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-base font-bold text-slate-800">
                    Tautan Profil Instagram Kelurahan
                  </label>
                  <Input
                    type="url"
                    placeholder="https://instagram.com/kel.bubulak"
                    value={instagramUrl}
                    onChange={(e) => setInstagramUrl(e.target.value)}
                    className="h-14 rounded-xl border-2 border-slate-200 text-sm font-mono"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-base font-bold text-slate-800">
                    Tautan TikTok Kelurahan (Opsional)
                  </label>
                  <Input
                    type="url"
                    placeholder="https://tiktok.com/@kel.bubulak"
                    value={tiktokUrl}
                    onChange={(e) => setTiktokUrl(e.target.value)}
                    className="h-14 rounded-xl border-2 border-slate-200 text-sm font-mono"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-14 gap-2 rounded-xl bg-emerald-700 px-8 text-lg font-bold text-white shadow-lg hover:bg-emerald-800"
                >
                  <Save className="h-5 w-5" />
                  {isSubmitting ? "Menyimpan Pengaturan..." : "Simpan Pengaturan Utama"}
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
