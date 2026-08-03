"use client";

import { useState, useEffect } from "react";
import {
  Users,
  Plus,
  Edit,
  Trash2,
  UploadCloud,
  CheckCircle2,
  AlertCircle,
  X,
  Landmark,
  Award,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  fetchStaffMembers,
  createStaffMemberInDb,
  updateStaffMemberInDb,
  deleteStaffMemberInDb,
  uploadImageToInsForge,
} from "@/lib/services";
import { StaffMember } from "@/lib/data";

export default function AdminPegawaiPage() {
  const [staffList, setStaffList] = useState<StaffMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<StaffMember | null>(null);

  // Form State
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [displayOrder, setDisplayOrder] = useState<number>(1);
  const [photoUrl, setPhotoUrl] = useState("");

  // UI Feedback State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    loadStaff();
  }, []);

  async function loadStaff() {
    setIsLoading(true);
    const data = await fetchStaffMembers();
    setStaffList(data);
    setIsLoading(false);
  }

  const openAddModal = () => {
    setEditingStaff(null);
    setName("");
    setPosition("");
    setDisplayOrder(staffList.length + 1);
    setPhotoUrl("/placeholder-staff-1.jpg");
    setFeedback(null);
    setIsModalOpen(true);
  };

  const openEditModal = (staff: StaffMember) => {
    setEditingStaff(staff);
    setName(staff.name);
    setPosition(staff.position);
    setDisplayOrder(staff.displayOrder);
    setPhotoUrl(staff.photoUrl);
    setFeedback(null);
    setIsModalOpen(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      setIsUploading(true);
      setFeedback(null);

      const { url, error } = await uploadImageToInsForge(file);
      setIsUploading(false);

      if (error || !url) {
        setFeedback({ type: "error", text: "Gagal mengunggah foto ke INSForge Storage." });
      } else {
        setPhotoUrl(url);
        setFeedback({ type: "success", text: "Foto aparatur berhasil diunggah ke Storage!" });
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !position) {
      setFeedback({ type: "error", text: "Nama Lengkap dan Jabatan wajib diisi." });
      return;
    }

    setIsSubmitting(true);
    setFeedback(null);

    if (editingStaff) {
      const { error } = await updateStaffMemberInDb(editingStaff.id, {
        name,
        position,
        displayOrder,
        photoUrl,
      });

      if (error) {
        setFeedback({ type: "error", text: "Gagal memperbarui data aparatur." });
      } else {
        setIsModalOpen(false);
        loadStaff();
      }
    } else {
      const { error } = await createStaffMemberInDb({
        name,
        position,
        photoUrl: photoUrl || "/placeholder-staff-1.jpg",
        displayOrder,
      });

      if (error) {
        setFeedback({ type: "error", text: "Gagal menambahkan aparatur baru." });
      } else {
        setIsModalOpen(false);
        loadStaff();
      }
    }
    setIsSubmitting(false);
  };

  const handleDelete = async (id: string, staffName: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus "${staffName}" dari daftar pegawai?`)) {
      await deleteStaffMemberInDb(id);
      loadStaff();
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-3">
            <Users className="h-8 w-8 text-emerald-700" />
            CMS Aparatur & Struktur Organisasi
          </h1>
          <p className="mt-1 text-base text-slate-600">
            Kelora jajaran pegawai kelurahan dan atur urutan hierarki pimpinan (Urutan 1 untuk Lurah)
          </p>
        </div>

        <Button
          onClick={openAddModal}
          className="h-12 gap-2 rounded-xl bg-emerald-700 px-6 font-bold text-white shadow-md hover:bg-emerald-800"
        >
          <Plus className="h-5 w-5" />
          Tambah Aparatur Baru
        </Button>
      </div>

      {/* TABLE STAFF LISTING */}
      <Card className="overflow-hidden border-2 border-slate-200 shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-base text-slate-800">
            <thead className="bg-slate-900 text-xs font-bold uppercase tracking-wider text-slate-300">
              <tr>
                <th className="px-6 py-4 text-center">Urutan</th>
                <th className="px-6 py-4">Foto Profil</th>
                <th className="px-6 py-4">Nama Lengkap & Gelar</th>
                <th className="px-6 py-4">Jabatan Kelurahan</th>
                <th className="px-6 py-4 text-right">Aksi Management</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                    Memuat data aparatur dari INSForge...
                  </td>
                </tr>
              ) : (
                staffList.map((staff) => (
                  <tr key={staff.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 text-center">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 font-extrabold text-slate-800 mx-auto border border-slate-300">
                        {staff.displayOrder}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-800 text-white font-bold shadow-md">
                        <Landmark className="h-6 w-6 text-white/50" />
                      </div>
                    </td>
                    <td className="px-6 py-4 font-bold text-slate-900">
                      {staff.name}
                      {staff.displayOrder === 1 && (
                        <Badge className="ml-2 bg-amber-500 text-white text-xs">Lurah</Badge>
                      )}
                    </td>
                    <td className="px-6 py-4 font-semibold text-emerald-800">
                      {staff.position}
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openEditModal(staff)}
                        className="gap-1 border-slate-300 font-semibold"
                      >
                        <Edit className="h-4 w-4 text-emerald-700" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(staff.id, staff.name)}
                        className="gap-1 bg-red-600 font-semibold"
                      >
                        <Trash2 className="h-4 w-4" />
                        Hapus
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
      {/* MODAL FORM STAFF */}
      {/* ============================================ */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white p-6 sm:p-8 shadow-2xl border-2 border-emerald-300">
            <div className="mb-6 flex items-center justify-between border-b border-slate-100 pb-4">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <Users className="h-6 w-6 text-emerald-700" />
                {editingStaff ? "Edit Data Aparatur" : "Tambah Aparatur Baru"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {feedback && (
              <div className="mb-6 rounded-xl bg-emerald-50 p-4 border border-emerald-300 text-emerald-900 text-sm font-semibold">
                <p>{feedback.text}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-bold text-slate-800">Nama Lengkap & Gelar *</label>
                <Input
                  type="text"
                  placeholder="Contoh: H. Ahmad Supriyadi, S.Sos., M.Si."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-12 rounded-xl text-base"
                  required
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-bold text-slate-800">Jabatan Resmi Kelurahan *</label>
                <Input
                  type="text"
                  placeholder="Contoh: Lurah Bubulak / Sekretaris Kelurahan"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  className="h-12 rounded-xl text-base"
                  required
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-bold text-slate-800">
                  Urutan Tampilan Struktur (1 = Lurah, 2 = Sekretaris, dst)
                </label>
                <Input
                  type="number"
                  min={1}
                  value={displayOrder}
                  onChange={(e) => setDisplayOrder(Number(e.target.value))}
                  className="h-12 rounded-xl font-bold text-lg"
                  required
                />
              </div>

              {/* Upload Foto */}
              <div className="rounded-xl border-2 border-dashed border-emerald-300 bg-emerald-50/50 p-4">
                <label className="mb-1 block text-sm font-bold text-slate-800">Foto Profil Aparatur (INSForge Storage)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="text-sm text-slate-600"
                />
                {isUploading && <p className="text-xs font-bold text-emerald-700 mt-1">Mengunggah foto...</p>}
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Batal</Button>
                <Button type="submit" disabled={isSubmitting} className="bg-emerald-700 font-bold text-white">Simpan Aparatur</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
