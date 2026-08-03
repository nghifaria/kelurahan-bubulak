"use client";

import { useState, useEffect, useMemo } from "react";
import {
  MessageSquareWarning,
  Search,
  Filter,
  Eye,
  CheckCircle2,
  Clock,
  XCircle,
  AlertCircle,
  X,
  MapPin,
  User,
  Phone,
  EyeOff,
  Send,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  fetchAllComplaintsFromDb,
  updateComplaintStatusInDb,
  DbComplaint,
} from "@/lib/services";

export default function AdminLaporanPage() {
  const [complaints, setComplaints] = useState<DbComplaint[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

  // Modal Detail State
  const [selectedComp, setSelectedComp] = useState<DbComplaint | null>(null);
  const [editStatus, setEditStatus] = useState<DbComplaint["status"]>("PENDING");
  const [editIsPublic, setEditIsPublic] = useState<boolean>(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  useEffect(() => {
    loadComplaints();
  }, []);

  async function loadComplaints() {
    setIsLoading(true);
    const data = await fetchAllComplaintsFromDb();
    setComplaints(data);
    setIsLoading(false);
  }

  const openDetailModal = (comp: DbComplaint) => {
    setSelectedComp(comp);
    setEditStatus(comp.status);
    setEditIsPublic(comp.isPublic);
    setFeedbackMsg(null);
  };

  const handleUpdateStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedComp) return;

    setIsUpdating(true);
    setFeedbackMsg(null);

    const { error } = await updateComplaintStatusInDb(
      selectedComp.id,
      editStatus,
      editIsPublic
    );

    setIsUpdating(false);

    if (error) {
      setFeedbackMsg("Gagal memperbarui status pengaduan di database.");
    } else {
      setFeedbackMsg("Status & transparansi laporan berhasil diperbarui!");
      setSelectedComp({
        ...selectedComp,
        status: editStatus,
        isPublic: editIsPublic,
      });
      loadComplaints();
    }
  };

  const getWhatsappDraftUrl = (comp: DbComplaint) => {
    if (!comp.reporterWhatsapp) return "#";
    const statusText =
      editStatus === "RESOLVED"
        ? "🟢 TERANGANI / SELESAI"
        : editStatus === "IN_PROGRESS"
        ? "🔵 SEDANG DITINDAK LANJUTI"
        : "🟡 MENUNGGU PENANGANAN";

    const text = `Halo *${comp.reporterName}*,\n\nInformasi dari Kelurahan Bubulak mengenai laporan warga: *${comp.title}* (No. Tiket: *${comp.ticketNumber}*):\n\nStatus Laporan: *${statusText}*\n\nTerima kasih atas kepedulian Anda terhadap lingkungan Bubulak.`;

    const cleanPhone = comp.reporterWhatsapp.replace(/\D/g, "");
    const formattedPhone = cleanPhone.startsWith("0")
      ? "62" + cleanPhone.slice(1)
      : cleanPhone;

    return `https://wa.me/${formattedPhone}?text=${encodeURIComponent(text)}`;
  };

  const filteredComplaints = useMemo(() => {
    return complaints.filter((c) => {
      const matchStatus =
        statusFilter === "ALL" || c.status === statusFilter;
      const matchQuery =
        c.ticketNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.rtRwLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.reporterName.toLowerCase().includes(searchQuery.toLowerCase());
      return matchStatus && matchQuery;
    });
  }, [complaints, statusFilter, searchQuery]);

  const getStatusBadge = (status: DbComplaint["status"]) => {
    switch (status) {
      case "PENDING":
        return <Badge className="bg-amber-500 text-white font-bold">🟡 MENUNGGU</Badge>;
      case "IN_PROGRESS":
        return <Badge className="bg-blue-600 text-white font-bold">🔵 TINDAK LANJUT</Badge>;
      case "RESOLVED":
        return <Badge className="bg-emerald-600 text-white font-bold">🟢 SELESAI</Badge>;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-3">
            <MessageSquareWarning className="h-8 w-8 text-emerald-700" />
            Inbox Laporan & Aspirasi Warga
          </h1>
          <p className="mt-1 text-base text-slate-600">
            Pantau pengaduan masalah lingkungan warga (jalan rusak, PJU, sampah) dan kelola transparansi publik
          </p>
        </div>

        <Button
          onClick={loadComplaints}
          variant="outline"
          className="h-12 border-slate-300 font-bold"
        >
          Refresh Data Live
        </Button>
      </div>

      {/* Filter Tabs & Search Bar */}
      <Card className="border-2 border-slate-200">
        <CardContent className="space-y-4 p-4 sm:p-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <Input
              type="search"
              placeholder="Cari berdasarkan No. Tiket, Judul Masalah, RT/RW, atau Nama Pelapor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-12 rounded-xl border-slate-200 pl-12 pr-4 text-base"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-2">
            <span className="flex items-center gap-1 text-sm font-semibold text-slate-600 mr-2">
              <Filter className="h-4 w-4" /> Filter Status:
            </span>
            {[
              { key: "ALL", label: "Semua" },
              { key: "PENDING", label: "🟡 Menunggu" },
              { key: "IN_PROGRESS", label: "🔵 Tindak Lanjut" },
              { key: "RESOLVED", label: "🟢 Selesai" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setStatusFilter(tab.key)}
                className={`rounded-xl px-4 py-2 text-sm font-bold transition-all ${
                  statusFilter === tab.key
                    ? "bg-slate-900 text-white shadow-md"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* TABLE LISTING */}
      <Card className="overflow-hidden border-2 border-slate-200 shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-base text-slate-800">
            <thead className="bg-slate-900 text-xs font-bold uppercase tracking-wider text-slate-300">
              <tr>
                <th className="px-6 py-4">No. Tiket</th>
                <th className="px-6 py-4">Judul Masalah</th>
                <th className="px-6 py-4">Lokasi Wilayah</th>
                <th className="px-6 py-4">Pelapor</th>
                <th className="px-6 py-4">Status Penanganan</th>
                <th className="px-6 py-4 text-right">Aksi & Detail</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                    Memuat data pengaduan warga dari INSForge PostgreSQL...
                  </td>
                </tr>
              ) : filteredComplaints.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                    Tidak ada laporan warga yang sesuai.
                  </td>
                </tr>
              ) : (
                filteredComplaints.map((comp) => (
                  <tr key={comp.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-mono font-extrabold text-emerald-800">
                      {comp.ticketNumber}
                    </td>
                    <td className="px-6 py-4 font-bold text-slate-900">
                      <p className="line-clamp-2 max-w-sm">{comp.title}</p>
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-700 flex items-center gap-1.5 mt-2">
                      <MapPin className="h-4 w-4 text-amber-600 shrink-0" />
                      {comp.rtRwLocation}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {comp.reporterName}
                    </td>
                    <td className="px-6 py-4">{getStatusBadge(comp.status)}</td>
                    <td className="px-6 py-4 text-right">
                      <Button
                        size="sm"
                        onClick={() => openDetailModal(comp)}
                        className="gap-1.5 rounded-xl bg-emerald-700 font-bold text-white hover:bg-emerald-800"
                      >
                        <Eye className="h-4 w-4" />
                        Proses Laporan
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* ============================================ */}
      {/* MODAL DETAIL & PROCESS COMPLAINT */}
      {/* ============================================ */}
      {selectedComp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 sm:p-8 shadow-2xl border-2 border-emerald-300">
            <div className="mb-6 flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <p className="text-xs uppercase font-bold text-emerald-700">Detail Laporan Warga</p>
                <h2 className="text-2xl font-mono font-extrabold text-slate-900">
                  {selectedComp.ticketNumber}
                </h2>
              </div>
              <button
                onClick={() => setSelectedComp(null)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {feedbackMsg && (
              <div className="mb-6 rounded-xl bg-emerald-50 p-4 border border-emerald-300 text-emerald-800 font-semibold text-sm flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                <p>{feedbackMsg}</p>
              </div>
            )}

            <div className="space-y-4 bg-slate-50 p-5 rounded-xl border border-slate-200 mb-6">
              <div>
                <p className="text-xs text-slate-400 font-bold uppercase">Judul Pengaduan</p>
                <p className="text-xl font-bold text-slate-900">{selectedComp.title}</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase">Lokasi Wilayah</p>
                  <p className="text-base font-bold text-amber-700 flex items-center gap-1">
                    <MapPin className="h-4 w-4" /> {selectedComp.rtRwLocation}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase">Pelapor</p>
                  <p className="text-base font-bold text-slate-800">{selectedComp.reporterName}</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-bold uppercase">Rincian Masalah</p>
                <p className="text-base text-slate-700 leading-relaxed mt-1">
                  {selectedComp.description}
                </p>
              </div>
            </div>

            {/* FORM UPDATE STATUS & VISIBILITY */}
            <form onSubmit={handleUpdateStatus} className="space-y-6 border-t border-slate-200 pt-6">
              <div>
                <label className="mb-2 block text-base font-bold text-slate-800">
                  Ubah Status Penanganan Laporan
                </label>
                <select
                  value={editStatus}
                  onChange={(e) =>
                    setEditStatus(e.target.value as DbComplaint["status"])
                  }
                  className="w-full h-14 rounded-xl border-2 border-slate-200 px-4 text-lg font-bold bg-white text-slate-900"
                >
                  <option value="PENDING">🟡 PENDING (Menunggu Penanganan)</option>
                  <option value="IN_PROGRESS">🔵 IN_PROGRESS (Sedang Ditindak Lanjuti)</option>
                  <option value="RESOLVED">🟢 RESOLVED (Masalah Teratasi / Selesai)</option>
                </select>
              </div>

              {/* TOGGLE VISIBILITY */}
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <label className="flex items-center justify-between cursor-pointer">
                  <div>
                    <p className="text-base font-bold text-slate-900 flex items-center gap-2">
                      {editIsPublic ? (
                        <Eye className="h-5 w-5 text-emerald-600" />
                      ) : (
                        <EyeOff className="h-5 w-5 text-slate-400" />
                      )}
                      Tampilkan Laporan Ini di Publik (Transparansi Warga)
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Jika diaktifkan, warga dapat melihat status penanganan laporan ini di portal cek resi.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={editIsPublic}
                    onChange={(e) => setEditIsPublic(e.target.checked)}
                    className="h-6 w-6 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                  />
                </label>
              </div>

              {/* WHATSAPP NOTIFICATION IF PHONE AVAILABLE */}
              {selectedComp.reporterWhatsapp && (
                <div>
                  <a
                    href={getWhatsappDraftUrl(selectedComp)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 font-bold text-white shadow-md hover:bg-emerald-800"
                  >
                    <Send className="h-4 w-4" />
                    Kirim Update Penanganan via WhatsApp Pelapor
                  </a>
                </div>
              )}

              <div className="flex justify-end gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setSelectedComp(null)}
                  className="h-12 rounded-xl font-bold"
                >
                  Tutup
                </Button>
                <Button
                  type="submit"
                  disabled={isUpdating}
                  className="h-12 gap-2 rounded-xl bg-emerald-700 px-6 font-bold text-white hover:bg-emerald-800"
                >
                  {isUpdating ? "Menyimpan..." : "Simpan Perubahan Penanganan"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
