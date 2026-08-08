"use client";

import { useState, useEffect } from "react";
import {
  Trophy,
  Plus,
  Edit,
  Trash2,
  UploadCloud,
  CheckCircle2,
  AlertCircle,
  X,
  Award,
  Calendar,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  fetchAchievements,
  createAchievementInDb,
  updateAchievementInDb,
  deleteAchievementInDb,
  uploadImageToInsForge,
} from "@/lib/services";
import { AchievementItem } from "@/lib/data";

export default function AdminPrestasiPage() {
  const [achievements, setAchievements] = useState<AchievementItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<AchievementItem | null>(null);

  // Form State
  const [title, setTitle] = useState("");
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [description, setDescription] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");

  // Feedback State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    loadAchievements();
  }, []);

  async function loadAchievements() {
    setIsLoading(true);
    const data = await fetchAchievements();
    setAchievements(data);
    setIsLoading(false);
  }

  const openAddModal = () => {
    setEditingItem(null);
    setTitle("");
    setYear(new Date().getFullYear());
    setDescription("");
    setPhotoUrl("");
    setFeedback(null);
    setIsModalOpen(true);
  };

  const openEditModal = (item: AchievementItem) => {
    setEditingItem(item);
    setTitle(item.title);
    setYear(item.year);
    setDescription(item.description);
    setPhotoUrl(item.photoUrl || "");
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
        setFeedback({ type: "success", text: "Foto penghargaan berhasil diunggah!" });
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !year) {
      setFeedback({ type: "error", text: "Judul Prestasi & Tahun wajib diisi." });
      return;
    }

    setIsSubmitting(true);
    setFeedback(null);

    if (editingItem) {
      const { error } = await updateAchievementInDb(editingItem.id, {
        title,
        year,
        description,
        photoUrl,
      });

      if (error) {
        setFeedback({ type: "error", text: "Gagal memperbarui data prestasi." });
      } else {
        setIsModalOpen(false);
        loadAchievements();
      }
    } else {
      const { error } = await createAchievementInDb({
        title,
        year,
        description,
        photoUrl,
      });

      if (error) {
        setFeedback({ type: "error", text: "Gagal menambahkan prestasi baru." });
      } else {
        setIsModalOpen(false);
        loadAchievements();
      }
    }
    setIsSubmitting(false);
  };

  const handleDelete = async (id: string, itemTitle: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus prestasi "${itemTitle}"?`)) {
      await deleteAchievementInDb(id);
      loadAchievements();
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-3">
            <Trophy className="h-8 w-8 text-amber-500" />
            CMS Prestasi & Penghargaan Kelurahan
          </h1>
          <p className="mt-1 text-base text-slate-600">
            Publikasikan capaian prestasi resmi Kelurahan Bubulak yang tampil pada profil kelurahan
          </p>
        </div>

        <Button
          onClick={openAddModal}
          className="h-12 gap-2 rounded-xl bg-amber-600 px-6 font-bold text-white shadow-md hover:bg-amber-700"
        >
          <Plus className="h-5 w-5" />
          Tambah Prestasi Baru
        </Button>
      </div>

      {/* TABLE ACHIEVEMENTS LISTING */}
      <Card className="overflow-hidden border-2 border-slate-200 shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-base text-slate-800">
            <thead className="bg-slate-900 text-xs font-bold uppercase tracking-wider text-slate-300">
              <tr>
                <th className="px-6 py-4">Tahun</th>
                <th className="px-6 py-4">Judul Capaian Prestasi</th>
                <th className="px-6 py-4">Deskripsi Rincian</th>
                <th className="px-6 py-4 text-right">Aksi Management</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                    Memuat data prestasi dari INSForge...
                  </td>
                </tr>
              ) : achievements.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                    Belum ada data prestasi kelurahan.
                  </td>
                </tr>
              ) : (
                achievements.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <Badge className="bg-amber-500 font-extrabold text-white text-sm">
                        {item.year}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 font-bold text-slate-900">
                      {item.title}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 max-w-md">
                      {item.description}
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openEditModal(item)}
                        className="gap-1 border-slate-300 font-semibold"
                      >
                        <Edit className="h-4 w-4 text-emerald-700" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(item.id, item.title)}
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

      {/* MODAL FORM PRESTASI */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm" aria-hidden="true" />
          <div className="relative z-10 max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white p-6 sm:p-8 shadow-2xl border-2 border-amber-400">
            <div className="mb-6 flex items-center justify-between border-b border-slate-100 pb-4">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <Trophy className="h-6 w-6 text-amber-500" />
                {editingItem ? "Edit Data Prestasi" : "Tambah Prestasi Baru"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {feedback && (
              <div className="mb-6 rounded-xl bg-amber-50 p-4 border border-amber-300 text-amber-900 text-sm font-semibold">
                <p>{feedback.text}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-bold text-slate-800">Judul Prestasi / Penghargaan *</label>
                <Input
                  type="text"
                  placeholder="Contoh: Juara 1 Lomba Kelurahan Sehat Kota Bogor"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="h-12 rounded-xl text-base"
                  required
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-bold text-slate-800">Tahun Penghargaan *</label>
                <Input
                  type="number"
                  placeholder="2026"
                  value={year}
                  onChange={(e) => setYear(Number(e.target.value))}
                  className="h-12 rounded-xl font-bold text-base"
                  required
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-bold text-slate-800">Deskripsi Ringkas</label>
                <textarea
                  rows={4}
                  placeholder="Jelaskan mengenai penghargaan atau apresiasi yang diterima..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full rounded-xl border-2 border-slate-200 p-3 text-sm"
                />
              </div>

              {/* Upload Foto */}
              <div className="rounded-xl border-2 border-dashed border-amber-300 bg-amber-50/50 p-4">
                <label className="mb-1 block text-sm font-bold text-slate-800">Foto Sertifikat / Piala (INSForge Storage)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="text-sm text-slate-600"
                />
                {isUploading && <p className="text-xs font-bold text-amber-700 mt-1">Mengunggah foto...</p>}
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Batal</Button>
                <Button type="submit" disabled={isSubmitting} className="bg-amber-600 font-bold text-white">Simpan Prestasi</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
