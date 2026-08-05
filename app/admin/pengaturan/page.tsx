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
  Building,
  Compass,
  Users,
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

  // Profil & Demografi Fields
  const [overviewText, setOverviewText] = useState("");
  const [boundaryNorth, setBoundaryNorth] = useState("");
  const [boundarySouth, setBoundarySouth] = useState("");
  const [boundaryWest, setBoundaryWest] = useState("");
  const [boundaryEast, setBoundaryEast] = useState("");
  const [totalPopulation, setTotalPopulation] = useState(18724);
  const [totalKK, setTotalKK] = useState(5732);
  const [malePopulation, setMalePopulation] = useState(9519);
  const [femalePopulation, setFemalePopulation] = useState(9205);
  const [rtCount, setRtCount] = useState(50);
  const [rwCount, setRwCount] = useState(13);
  const [areaSize, setAreaSize] = useState("157,085 Ha");
  const [altitude, setAltitude] = useState("368 mdpl");

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
    setOverviewText(data.overviewText || "");
    setBoundaryNorth(data.boundaries?.north || "");
    setBoundarySouth(data.boundaries?.south || "");
    setBoundaryWest(data.boundaries?.west || "");
    setBoundaryEast(data.boundaries?.east || "");
    setTotalPopulation(data.demographics?.totalPopulation || 18724);
    setTotalKK(data.demographics?.totalKK || 5732);
    setMalePopulation(data.demographics?.malePopulation || 9519);
    setFemalePopulation(data.demographics?.femalePopulation || 9205);
    setRtCount(data.demographics?.rtCount || 50);
    setRwCount(data.demographics?.rwCount || 13);
    setAreaSize(data.demographics?.areaSize || "157,085 Ha");
    setAltitude(data.demographics?.altitude || "368 mdpl");
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
      overviewText,
      boundaryNorth,
      boundarySouth,
      boundaryWest,
      boundaryEast,
      totalPopulation: Number(totalPopulation),
      totalKK: Number(totalKK),
      malePopulation: Number(malePopulation),
      femalePopulation: Number(femalePopulation),
      rtCount: Number(rtCount),
      rwCount: Number(rwCount),
      areaSize,
      altitude,
    });

    setIsSubmitting(false);

    if (error) {
      setMessage({ type: "error", text: "Gagal menyimpan pengaturan ke INSForge Database." });
    } else {
      setMessage({
        type: "success",
        text: "Pengaturan umum & data statistik profil kelurahan berhasil diperbarui secara live di database!",
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
          CMS Pengaturan Utama & Data Profil Kelurahan
        </h1>
        <p className="mt-1 text-base text-slate-600">
          Kelola informasi Lurah, statistik penduduk, gambaran umum, batas wilayah, dan kontak resmi kelurahan.
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
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* BAGIAN 1: INFORMASI UTAMA & LURAH */}
              <div>
                <h2 className="text-xl font-bold text-slate-900 border-b border-slate-200 pb-3 mb-4 flex items-center gap-2">
                  <Landmark className="h-5 w-5 text-emerald-700" /> 1. Informasi Kelurahan & Pimpinan
                </h2>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-base font-bold text-slate-800">
                      Nama Kelurahan / Instansi *
                    </label>
                    <Input
                      type="text"
                      value={villageName}
                      onChange={(e) => setVillageName(e.target.value)}
                      className="h-14 rounded-xl border-2 border-slate-200 text-lg font-bold"
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-base font-bold text-slate-800">
                      Nama Lurah Lengkap & Gelar *
                    </label>
                    <Input
                      type="text"
                      placeholder="ANJAR APRIYANA, S.Sos., M.Si"
                      value={lurahName}
                      onChange={(e) => setLurahName(e.target.value)}
                      className="h-14 rounded-xl border-2 border-slate-200 text-lg font-bold text-emerald-900"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* BAGIAN 2: GAMBARAN UMUM & BATAS WILAYAH */}
              <div>
                <h2 className="text-xl font-bold text-slate-900 border-b border-slate-200 pb-3 mb-4 flex items-center gap-2">
                  <Building className="h-5 w-5 text-emerald-700" /> 2. Gambaran Umum & Batas Wilayah
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-base font-bold text-slate-800">
                      Teks Gambaran Umum Kelurahan *
                    </label>
                    <textarea
                      rows={4}
                      value={overviewText}
                      onChange={(e) => setOverviewText(e.target.value)}
                      className="w-full rounded-xl border-2 border-slate-200 p-4 text-base leading-relaxed"
                      required
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div>
                      <label className="mb-1 block text-sm font-bold text-slate-700">
                        Batas Utara
                      </label>
                      <Input
                        type="text"
                        value={boundaryNorth}
                        onChange={(e) => setBoundaryNorth(e.target.value)}
                        className="h-12 rounded-xl border-2 border-slate-200 text-base"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-bold text-slate-700">
                        Batas Selatan
                      </label>
                      <Input
                        type="text"
                        value={boundarySouth}
                        onChange={(e) => setBoundarySouth(e.target.value)}
                        className="h-12 rounded-xl border-2 border-slate-200 text-base"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-bold text-slate-700">
                        Batas Barat
                      </label>
                      <Input
                        type="text"
                        value={boundaryWest}
                        onChange={(e) => setBoundaryWest(e.target.value)}
                        className="h-12 rounded-xl border-2 border-slate-200 text-base"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-bold text-slate-700">
                        Batas Timur
                      </label>
                      <Input
                        type="text"
                        value={boundaryEast}
                        onChange={(e) => setBoundaryEast(e.target.value)}
                        className="h-12 rounded-xl border-2 border-slate-200 text-base"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* BAGIAN 3: STATISTIK DEMOGRAFI PENDUDUK */}
              <div>
                <h2 className="text-xl font-bold text-slate-900 border-b border-slate-200 pb-3 mb-4 flex items-center gap-2">
                  <Users className="h-5 w-5 text-emerald-700" /> 3. Data Statistik Penduduk & Wilayah
                </h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <div>
                    <label className="mb-1 block text-sm font-bold text-slate-700">
                      Total Penduduk (Jiwa)
                    </label>
                    <Input
                      type="number"
                      value={totalPopulation}
                      onChange={(e) => setTotalPopulation(Number(e.target.value))}
                      className="h-12 rounded-xl border-2 border-slate-200 text-lg font-mono font-bold"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-bold text-slate-700">
                      Jumlah KK (Kepala Keluarga)
                    </label>
                    <Input
                      type="number"
                      value={totalKK}
                      onChange={(e) => setTotalKK(Number(e.target.value))}
                      className="h-12 rounded-xl border-2 border-slate-200 text-lg font-mono font-bold"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-bold text-slate-700">
                      Jumlah Laki-laki (Jiwa)
                    </label>
                    <Input
                      type="number"
                      value={malePopulation}
                      onChange={(e) => setMalePopulation(Number(e.target.value))}
                      className="h-12 rounded-xl border-2 border-slate-200 text-lg font-mono font-bold"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-bold text-slate-700">
                      Jumlah Perempuan (Jiwa)
                    </label>
                    <Input
                      type="number"
                      value={femalePopulation}
                      onChange={(e) => setFemalePopulation(Number(e.target.value))}
                      className="h-12 rounded-xl border-2 border-slate-200 text-lg font-mono font-bold"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-bold text-slate-700">
                      Jumlah RT
                    </label>
                    <Input
                      type="number"
                      value={rtCount}
                      onChange={(e) => setRtCount(Number(e.target.value))}
                      className="h-12 rounded-xl border-2 border-slate-200 text-lg font-mono font-bold"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-bold text-slate-700">
                      Jumlah RW
                    </label>
                    <Input
                      type="number"
                      value={rwCount}
                      onChange={(e) => setRwCount(Number(e.target.value))}
                      className="h-12 rounded-xl border-2 border-slate-200 text-lg font-mono font-bold"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-bold text-slate-700">
                      Luas Wilayah (Ha)
                    </label>
                    <Input
                      type="text"
                      value={areaSize}
                      onChange={(e) => setAreaSize(e.target.value)}
                      className="h-12 rounded-xl border-2 border-slate-200 text-base font-bold"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-bold text-slate-700">
                      Ketinggian (mdpl)
                    </label>
                    <Input
                      type="text"
                      value={altitude}
                      onChange={(e) => setAltitude(e.target.value)}
                      className="h-12 rounded-xl border-2 border-slate-200 text-base font-bold"
                    />
                  </div>
                </div>
              </div>

              {/* BAGIAN 4: KONTAK RESMI & SOSMED */}
              <div>
                <h2 className="text-xl font-bold text-slate-900 border-b border-slate-200 pb-3 mb-4 flex items-center gap-2">
                  <Phone className="h-5 w-5 text-emerald-700" /> 4. Alamat, Kontak & Media Sosial
                </h2>

                <div className="space-y-4">
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

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-base font-bold text-slate-800">
                        Nomor WhatsApp Resmi Kelurahan * (Auto 628xxx)
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
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6 border-t border-slate-200 flex justify-end">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-14 gap-2 rounded-xl bg-emerald-700 px-8 text-lg font-bold text-white shadow-lg hover:bg-emerald-800"
                >
                  <Save className="h-5 w-5" />
                  {isSubmitting ? "Menyimpan Ke INSForge Database..." : "Simpan Seluruh Pengaturan & Data Profil"}
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
