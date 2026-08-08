"use client";

import { useState, useEffect, useMemo } from "react";
import {
  FileCheck,
  Search,
  Filter,
  Eye,
  MessageSquare,
  CheckCircle2,
  Clock,
  XCircle,
  AlertCircle,
  X,
  FileText,
  User,
  Phone,
  Send,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  fetchAllSubmissionsFromDb,
  updateSubmissionStatusInDb,
  DbSubmission,
} from "@/lib/services";

export default function AdminPengajuanPage() {
  const [submissions, setSubmissions] = useState<DbSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

  // Modal State
  const [selectedSub, setSelectedSub] = useState<DbSubmission | null>(null);
  const [editStatus, setEditStatus] = useState<DbSubmission["status"]>("PENDING");
  const [adminNotes, setAdminNotes] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  useEffect(() => {
    loadSubmissions();
  }, []);

  async function loadSubmissions() {
    setIsLoading(true);
    const data = await fetchAllSubmissionsFromDb();
    setSubmissions(data);
    setIsLoading(false);
  }

  const openDetailModal = (sub: DbSubmission) => {
    setSelectedSub(sub);
    setEditStatus(sub.status);
    setAdminNotes(sub.adminNotes || "");
    setFeedbackMsg(null);
  };

  const handleUpdateStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSub) return;

    setIsUpdating(true);
    setFeedbackMsg(null);

    const { error } = await updateSubmissionStatusInDb(
      selectedSub.id,
      editStatus,
      adminNotes
    );

    setIsUpdating(false);

    if (error) {
      setFeedbackMsg("Gagal memperbarui status di database.");
    } else {
      setFeedbackMsg("Status & catatan admin berhasil diperbarui!");
      setSelectedSub({
        ...selectedSub,
        status: editStatus,
        adminNotes: adminNotes,
      });
      loadSubmissions();
    }
  };

  const getWhatsappDraftUrl = (sub: DbSubmission) => {
    const statusText =
      editStatus === "COMPLETED"
        ? "🟢 SELESAI / SIAP DIAMBIL"
        : editStatus === "PROCESSED"
        ? "🔵 SEDANG DIPROSES"
        : editStatus === "REJECTED"
        ? "🔴 PERLU PERBAIKAN / DITOLAK"
        : "🟡 DITERIMA";

    const text = `Halo Yth. *${sub.citizenName}*,\n\nInformasi dari Kantor Kelurahan Bubulak mengenai permohonan *${sub.serviceTitle}* (No. Resi: *${sub.ticketNumber}*):\n\nStatus Saat Ini: *${statusText}*\nCatatan Petugas: ${adminNotes || sub.adminNotes || "Mohon cek berkala di portal digital kelurahan."}\n\nTerima kasih.`;

    const cleanPhone = sub.citizenWhatsapp.replace(/\D/g, "");
    const formattedPhone = cleanPhone.startsWith("0")
      ? "62" + cleanPhone.slice(1)
      : cleanPhone;

    return `https://wa.me/${formattedPhone}?text=${encodeURIComponent(text)}`;
  };

  const filteredSubmissions = useMemo(() => {
    return submissions.filter((sub) => {
      const matchStatus =
        statusFilter === "ALL" || sub.status === statusFilter;
      const matchQuery =
        sub.ticketNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sub.citizenName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sub.citizenNik.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sub.serviceTitle.toLowerCase().includes(searchQuery.toLowerCase());
      return matchStatus && matchQuery;
    });
  }, [submissions, statusFilter, searchQuery]);

  const getStatusBadge = (status: DbSubmission["status"]) => {
    switch (status) {
      case "PENDING":
        return <Badge className="bg-amber-500 text-white font-bold">🟡 PENDING</Badge>;
      case "PROCESSED":
        return <Badge className="bg-blue-600 text-white font-bold">🔵 DIPROSES</Badge>;
      case "COMPLETED":
        return <Badge className="bg-emerald-600 text-white font-bold">🟢 SELESAI</Badge>;
      case "REJECTED":
        return <Badge className="bg-red-600 text-white font-bold">🔴 DITOLAK</Badge>;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-3">
            <FileCheck className="h-8 w-8 text-emerald-700" />
            Inbox Pengajuan Surat Digital
          </h1>
          <p className="mt-1 text-base text-slate-600">
            Kelola permohonan surat kependudukan warga, verifikasi berkas, dan kirim notifikasi WhatsApp
          </p>
        </div>

        <Button
          onClick={loadSubmissions}
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
              placeholder="Cari berdasarkan No. Resi, Nama Warga, NIK, atau Jenis Surat..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-12 rounded-xl border-slate-200 pl-12 pr-4 text-base font-mono"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-2">
            <span className="flex items-center gap-1 text-sm font-semibold text-slate-600 mr-2">
              <Filter className="h-4 w-4" /> Filter Status:
            </span>
            {[
              { key: "ALL", label: "Semua" },
              { key: "PENDING", label: "🟡 Pending" },
              { key: "PROCESSED", label: "🔵 Diproses" },
              { key: "COMPLETED", label: "🟢 Selesai" },
              { key: "REJECTED", label: "🔴 Ditolak" },
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

      {/* SUBMISSIONS TABLE */}
      <Card className="overflow-hidden border-2 border-slate-200 shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-base text-slate-800">
            <thead className="bg-slate-900 text-xs font-bold uppercase tracking-wider text-slate-300">
              <tr>
                <th className="px-6 py-4">No. Resi Tiket</th>
                <th className="px-6 py-4">Nama Pemohon & NIK</th>
                <th className="px-6 py-4">Jenis Surat</th>
                <th className="px-6 py-4">Tanggal Pengajuan</th>
                <th className="px-6 py-4">Status Saat Ini</th>
                <th className="px-6 py-4 text-right">Aksi Management</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                    Memuat data permohonan dari INSForge PostgreSQL...
                  </td>
                </tr>
              ) : filteredSubmissions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                    Tidak ada pengajuan surat yang sesuai dengan filter.
                  </td>
                </tr>
              ) : (
                filteredSubmissions.map((sub) => (
                  <tr key={sub.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-mono font-extrabold text-emerald-800">
                      {sub.ticketNumber}
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-slate-900">{sub.citizenName}</p>
                      <p className="text-xs font-mono text-slate-500">NIK: {sub.citizenNik}</p>
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-800">
                      {sub.serviceTitle}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {sub.createdAt}
                    </td>
                    <td className="px-6 py-4">{getStatusBadge(sub.status)}</td>
                    <td className="px-6 py-4 text-right">
                      <Button
                        size="sm"
                        onClick={() => openDetailModal(sub)}
                        className="gap-1.5 rounded-xl bg-emerald-700 font-bold text-white hover:bg-emerald-800"
                      >
                        <Eye className="h-4 w-4" />
                        Detail & Proses
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
      {/* MODAL DETAIL & UPDATE STATUS SUBMISSION */}
      {/* ============================================ */}
      {selectedSub && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm" aria-hidden="true" />
          <div className="relative z-10 max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white p-6 sm:p-8 shadow-2xl border-2 border-emerald-300">
            {/* Modal Header */}
            <div className="mb-6 flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <p className="text-xs uppercase font-bold text-emerald-700">Detail Permohonan Surat</p>
                <h2 className="text-2xl font-mono font-extrabold text-slate-900">
                  {selectedSub.ticketNumber}
                </h2>
              </div>
              <button
                onClick={() => setSelectedSub(null)}
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

            {/* Citizen Data Cards */}
            <div className="grid gap-4 sm:grid-cols-2 bg-slate-50 p-4 rounded-xl border border-slate-200 mb-6">
              <div>
                <p className="text-xs text-slate-400 font-bold uppercase">Nama Pemohon</p>
                <p className="text-lg font-bold text-slate-900">{selectedSub.citizenName}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-bold uppercase">NIK Pemohon</p>
                <p className="text-lg font-mono font-bold text-slate-900">{selectedSub.citizenNik}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-bold uppercase">No. WhatsApp</p>
                <p className="text-base font-bold text-emerald-800 flex items-center gap-1">
                  <Phone className="h-4 w-4" /> {selectedSub.citizenWhatsapp}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-bold uppercase">Jenis Surat</p>
                <p className="text-base font-bold text-slate-800">{selectedSub.serviceTitle}</p>
              </div>
            </div>

            {selectedSub.notes && (
              <div className="mb-6 rounded-xl bg-amber-50 p-4 border border-amber-200 text-amber-900 text-sm">
                <p className="font-bold mb-1">Keterangan / Alasan Warga:</p>
                <p>{selectedSub.notes}</p>
              </div>
            )}

            {/* UPDATE STATUS FORM */}
            <form onSubmit={handleUpdateStatus} className="space-y-6 border-t border-slate-200 pt-6">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <FileText className="h-5 w-5 text-emerald-700" />
                Ubah Status & Tambahkan Catatan Staf Admin
              </h3>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-800">
                    Pilih Status Surat Baru
                  </label>
                  <select
                    value={editStatus}
                    onChange={(e) =>
                      setEditStatus(e.target.value as DbSubmission["status"])
                    }
                    className="w-full h-12 rounded-xl border-2 border-slate-200 px-4 text-base font-bold bg-white text-slate-900"
                  >
                    <option value="PENDING">🟡 PENDING (Diterima)</option>
                    <option value="PROCESSED">🔵 PROCESSED (Sedang Diproses)</option>
                    <option value="COMPLETED">🟢 COMPLETED (Selesai & Siap Diambil)</option>
                    <option value="REJECTED">🔴 REJECTED (Ditolak / Perlu Perbaikan)</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-800">
                    Kirim Notifikasi via WhatsApp
                  </label>
                  <a
                    href={getWhatsappDraftUrl(selectedSub)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 font-bold text-white shadow-md hover:bg-emerald-800"
                  >
                    <Send className="h-4 w-4" />
                    Buka WhatsApp & Kirim Notifikasi
                  </a>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-800">
                  Catatan Admin / Loket Pengambilan
                </label>
                <textarea
                  rows={3}
                  placeholder="Contoh: Surat telah ditandatangani Lurah. Silakan ambil di Loket 1 dengan membawa KTP Asli..."
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  className="w-full rounded-xl border-2 border-slate-200 p-4 text-base"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setSelectedSub(null)}
                  className="h-12 rounded-xl font-bold"
                >
                  Tutup
                </Button>
                <Button
                  type="submit"
                  disabled={isUpdating}
                  className="h-12 gap-2 rounded-xl bg-emerald-700 px-6 font-bold text-white hover:bg-emerald-800"
                >
                  {isUpdating ? "Simpan Perubahan..." : "Simpan Perubahan Status"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
