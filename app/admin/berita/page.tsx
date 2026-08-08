"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Newspaper,
  Plus,
  Edit,
  Trash2,
  UploadCloud,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  X,
  Search,
  Landmark,
  Image as ImageIcon,
} from "lucide-react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  fetchNews,
  createNewsInDb,
  updateNewsInDb,
  deleteNewsInDb,
  uploadImageToInsForge,
} from "@/lib/services";
import { NewsItem } from "@/lib/data";
import { RichTextRenderer } from "@/components/RichTextRenderer";

export default function AdminBeritaPage() {
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);

  // Form State
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Pengumuman");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // UI Feedback State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    loadNews();
  }, []);

  async function loadNews() {
    setIsLoading(true);
    const data = await fetchNews();
    setNewsList(data);
    setIsLoading(false);
  }

  const openAddModal = () => {
    setEditingNews(null);
    setTitle("");
    setCategory("Pengumuman");
    setSummary("");
    setContent("");
    setCoverImageUrl("/placeholder-news-1.jpg");
    setSelectedFile(null);
    setMessage(null);
    setIsModalOpen(true);
  };

  const openEditModal = (item: NewsItem) => {
    setEditingNews(item);
    setTitle(item.title);
    setCategory(item.category);
    setSummary(item.summary);
    setContent(item.content);
    setCoverImageUrl(item.coverImageUrl);
    setSelectedFile(null);
    setMessage(null);
    setIsModalOpen(true);
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setIsUploading(true);
      setMessage(null);

      // Upload file directly to INSForge Storage bucket "kelurahan-assets"
      const { url, error } = await uploadImageToInsForge(file);
      setIsUploading(false);

      if (error || !url) {
        setMessage({ type: "error", text: "Gagal mengunggah gambar ke INSForge Storage." });
      } else {
        setCoverImageUrl(url);
        setMessage({ type: "success", text: "Foto sampul berhasil diunggah ke INSForge Storage!" });
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) {
      setMessage({ type: "error", text: "Judul dan Isi Berita wajib diisi." });
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

    if (editingNews) {
      // Update existing news in INSForge DB
      const { error } = await updateNewsInDb(editingNews.id, {
        title,
        category,
        summary,
        content,
        coverImageUrl,
      });

      if (error) {
        setMessage({ type: "error", text: "Gagal memperbarui berita di database." });
      } else {
        setMessage({ type: "success", text: "Berita berhasil diperbarui!" });
        setIsModalOpen(false);
        loadNews();
      }
    } else {
      // Create new news in INSForge DB
      const { error } = await createNewsInDb({
        title,
        category,
        summary: summary || title,
        content,
        coverImageUrl: coverImageUrl || "/placeholder-news-1.jpg",
      });

      if (error) {
        setMessage({ type: "error", text: "Gagal mempublikasikan berita baru ke database." });
      } else {
        setMessage({ type: "success", text: "Berita baru berhasil dipublikasikan!" });
        setIsModalOpen(false);
        loadNews();
      }
    }

    setIsSubmitting(false);
  };

  const handleDelete = async (id: string, newsTitle: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus berita "${newsTitle}"?`)) {
      const { error } = await deleteNewsInDb(id);
      if (error) {
        alert("Gagal menghapus berita.");
      } else {
        loadNews();
      }
    }
  };

  const filteredNews = newsList.filter(
    (n) =>
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-3">
            <Newspaper className="h-8 w-8 text-emerald-700" />
            CMS Kelola Berita & Pengumuman
          </h1>
          <p className="mt-1 text-base text-slate-600">
            Publikasikan artikel berita dan pengumuman resmi ke halaman publik kelurahan
          </p>
        </div>

        <Button
          onClick={openAddModal}
          className="h-12 gap-2 rounded-xl bg-emerald-700 px-6 text-base font-bold text-white shadow-md hover:bg-emerald-800"
        >
          <Plus className="h-5 w-5" />
          Tambah Berita Baru
        </Button>
        <button
          onClick={async () => {
            if (!confirm("Buat 5 berita contoh ke database?")) return;
            setIsSubmitting(true);
            setMessage(null);
            const samples = [
              {
                title: "Festival Kuliner Bubulak: Rayakan Ragam Rasa Lokal",
                category: "Kegiatan",
                summary: "Festival menampilkan 30 stan UMKM kuliner warga Bubulak, musik lokal, dan edukasi kesehatan makanan.",
                content: `# Festival Kuliner Bubulak\n\nPemerintah kelurahan bersama pelaku UMKM menggelar Festival Kuliner Bubulak untuk memperkenalkan ragam makanan khas warga. Acara berlangsung selama dua hari dan menghadirkan stan-stan makanan, demo masak, serta panggung seni lokal.\n\n- Tanggal: Minggu, 14 Agustus 2026\n- Lokasi: Lapangan RW 05\n\nPengunjung diimbau membawa kantong belanja ramah lingkungan dan mematuhi protokol kesehatan.`,
                coverImageUrl: "https://images.unsplash.com/photo-1543352634-98f0b9b6f3b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=60",
              },
              {
                title: "Posyandu Kelurahan Bubulak: Layanan Kesehatan Publik Bulanan",
                category: "Kesehatan",
                summary: "Posyandu rutin menyediakan timbang bayi, imunisasi, dan konseling gizi untuk ibu dan balita.",
                content: `# Posyandu Bulanan\n\nPosyandu Kelurahan Bubulak kembali membuka layanan kesehatan untuk balita dan lansia. Tim kesehatan setempat melaksanakan penimbangan, pemantauan tumbuh-kembang, serta imunisasi dasar anak.\n\nLayanan bersifat gratis dan terbuka untuk seluruh warga Bubulak.`,
                coverImageUrl: "https://images.unsplash.com/photo-1584438786906-2ec6f5b3c9c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=60",
              },
              {
                title: "Pelatihan Kewirausahaan untuk UMKM Muda",
                category: "Kegiatan",
                summary: "Workshop pemasaran digital dan pengemasan produk untuk pelaku UMKM lokal di Bubulak.",
                content: `# Pelatihan UMKM\n\nDinas terkait bekerja sama dengan kelurahan menyelenggarakan pelatihan kewirausahaan untuk meningkatkan kemampuan pelaku UMKM. Materi meliputi branding sederhana, fotografi produk, dan pemasaran online.\n\nPeserta mendapatkan modul dan sesi konsultasi lanjutan.`,
                coverImageUrl: "https://images.unsplash.com/photo-1526056630195-40f4a5b5c5c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=60",
              },
              {
                title: "Pembangunan Jalan RT 03: Perbaikan Drainase & Akses",
                category: "Pembangunan",
                summary: "Pemerintah kelurahan melakukan perbaikan jalan dan pemasangan talang drainase untuk mengurangi genangan saat hujan.",
                content: `# Perbaikan Jalan\n\nTim pekerja lokal melakukan perbaikan jalan lingkungan dan pembenahan drainase di RT 03. Proyek ini diharapkan meningkatkan akses kendaraan ringan dan mengurangi banjir lokal pada musim hujan.\n\nProyek dibiayai dari anggaran kelurahan dan partisipasi warga.`,
                coverImageUrl: "https://images.unsplash.com/photo-1509395176047-4a66953fd231?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=60",
              },
              {
                title: "Penanaman Pohon Kota: Aksi Iklim dan Ruang Terbuka Hijau",
                category: "Pembangunan",
                summary: "Kegiatan penanaman pohon bersama warga untuk memperkuat ruang hijau dan pendinginan lingkungan.",
                content: `# Penanaman Pohon\n\nRelawan lingkungan dan perangkat kelurahan bersama-sama menanam puluhan pohon di beberapa titik strategis. Program ini mendukung peningkatan kualitas udara serta memperindah lingkungan permukiman.\n\nWarga diajak berpartisipasi untuk merawat pohon setelah penanaman.`,
                coverImageUrl: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=60",
              },
            ];

            let anyError = false;
            for (const s of samples) {
              // eslint-disable-next-line no-await-in-loop
              const { error } = await createNewsInDb({
                title: s.title,
                category: s.category,
                summary: s.summary,
                content: s.content,
                coverImageUrl: s.coverImageUrl,
              });
              if (error) {
                anyError = true;
                console.error("Seed error for", s.title, error);
                setMessage({ type: "error", text: `Gagal membuat contoh berita: ${s.title}` });
                break;
              }
            }

            setIsSubmitting(false);
            if (!anyError) {
              setMessage({ type: "success", text: "5 berita contoh berhasil dibuat dan dipublikasikan." });
              loadNews();
            }
          }}
          className="ml-3 inline-flex h-12 items-center gap-2 rounded-xl border-2 border-emerald-300 bg-white px-4 text-sm font-bold text-emerald-800 hover:bg-emerald-50"
        >
          Seed 5 Berita Contoh
        </button>
      </div>

      {/* Filter / Search Bar */}
      <Card className="border-2 border-slate-200">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <Input
                type="search"
                placeholder="Cari judul berita atau kategori..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-12 rounded-xl border-slate-200 pl-12 pr-4 text-base"
              />
            </div>
            <Link
              href="/berita"
              target="_blank"
              className="inline-flex h-12 items-center gap-2 rounded-xl border-2 border-emerald-300 px-4 text-sm font-bold text-emerald-800 hover:bg-emerald-50"
            >
              <ExternalLink className="h-4 w-4" />
              Pratinjau Halaman Berita Publik
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* TABLE LISTING */}
      <Card className="overflow-hidden border-2 border-slate-200 shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-base text-slate-800">
            <thead className="bg-slate-900 text-xs font-bold uppercase tracking-wider text-slate-300">
              <tr>
                <th className="px-6 py-4">Gambar Sampul</th>
                <th className="px-6 py-4">Judul Berita</th>
                <th className="px-6 py-4">Kategori</th>
                <th className="px-6 py-4">Tanggal Tayang</th>
                <th className="px-6 py-4 text-right">Aksi Management</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                    Memuat data berita dari INSForge PostgreSQL...
                  </td>
                </tr>
              ) : filteredNews.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                    Belum ada artikel berita yang ditemukan.
                  </td>
                </tr>
              ) : (
                filteredNews.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="h-14 w-20 overflow-hidden rounded-lg bg-emerald-800 flex items-center justify-center text-white border border-slate-200 relative">
                        {item.coverImageUrl && (item.coverImageUrl.startsWith("http") || item.coverImageUrl.startsWith("/")) ? (
                          <Image
                            src={item.coverImageUrl}
                            alt={item.title}
                            width={160}
                            height={112}
                            className="h-full w-full object-cover"
                            unoptimized
                          />
                        ) : (
                          <Landmark className="h-6 w-6 text-white/40" />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-bold text-slate-900">
                      <p className="line-clamp-2 max-w-md">{item.title}</p>
                      <p className="text-xs text-slate-400 font-normal truncate max-w-sm mt-0.5">
                        Slug: /{item.slug}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <Badge
                        className={`text-xs font-semibold ${
                          item.category === "Pengumuman"
                            ? "bg-amber-500 text-white"
                            : item.category === "Kesehatan"
                            ? "bg-blue-500 text-white"
                            : "bg-emerald-600 text-white"
                        }`}
                      >
                        {item.category}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-600">
                      {item.publishedAt}
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

      {/* ============================================ */}
      {/* MODAL FORM TAMBAH / EDIT BERITA */}
      {/* ============================================ */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm" aria-hidden="true" />
          <div className="relative z-10 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 sm:p-8 shadow-2xl border-2 border-emerald-300">
            <div className="mb-6 flex items-center justify-between border-b border-slate-100 pb-4">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <Newspaper className="h-6 w-6 text-emerald-700" />
                {editingNews ? "Edit Berita Artikel" : "Tambah Berita Publikasi Baru"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {message && (
              <div
                className={`mb-6 flex items-center gap-3 rounded-xl p-4 text-sm font-semibold border ${
                  message.type === "success"
                    ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                    : "bg-red-50 text-red-800 border-red-300"
                }`}
              >
                {message.type === "success" ? (
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
                ) : (
                  <AlertCircle className="h-5 w-5 shrink-0 text-red-600" />
                )}
                <p>{message.text}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Judul */}
              <div>
                <label className="mb-2 block text-base font-bold text-slate-800">
                  Judul Berita / Pengumuman <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  placeholder="Contoh: Jadwal Posyandu Balita dan Lansia Bulan Agustus 2026"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="h-14 rounded-xl border-2 border-slate-200 text-lg"
                  required
                />
              </div>

              {/* Kategori */}
              <div>
                <label className="mb-2 block text-base font-bold text-slate-800">
                  Kategori Berita <span className="text-red-500">*</span>
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full h-14 rounded-xl border-2 border-slate-200 px-4 text-lg font-medium bg-white text-slate-900"
                >
                  <option value="Pengumuman">Pengumuman</option>
                  <option value="Kegiatan">Kegiatan</option>
                  <option value="Kesehatan">Kesehatan</option>
                  <option value="Pembangunan">Pembangunan</option>
                </select>
              </div>

              {/* Summary */}
              <div>
                <label className="mb-2 block text-base font-bold text-slate-800">
                  Ringkasan Singkat (Summary untuk Kartu Berita)
                </label>
                <textarea
                  rows={2}
                  placeholder="Tuliskan 1-2 kalimat ringkasan artikel..."
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  className="w-full rounded-xl border-2 border-slate-200 p-4 text-base"
                />
              </div>

              {/* Content */}
              <div>
                <div className="mb-2 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <label className="text-base font-bold text-slate-800">
                    Isi Lengkap Berita / Artikel <span className="text-red-500">*</span>
                  </label>
                  <span className="text-xs font-semibold text-slate-500">
                    Format otomatis: AI / Markdown disupport (# Header, **Tebal**, - Poin)
                  </span>
                </div>

                {/* Formatting Toolbar Shortcuts */}
                <div className="mb-2 flex flex-wrap items-center gap-1.5 rounded-xl bg-slate-100 p-2 border border-slate-200">
                  <span className="text-xs font-bold text-slate-600 mr-1 px-1">Pintas Format:</span>
                  <button
                    type="button"
                    onClick={() => setContent((prev) => prev ? `${prev}\n# Header Utama` : "# Header Utama")}
                    className="rounded-lg bg-white px-2.5 py-1 text-xs font-bold text-slate-700 shadow-sm border border-slate-200 hover:bg-emerald-50 hover:text-emerald-800"
                  >
                    # Header 1
                  </button>
                  <button
                    type="button"
                    onClick={() => setContent((prev) => prev ? `${prev}\n## Sub Header` : "## Sub Header")}
                    className="rounded-lg bg-white px-2.5 py-1 text-xs font-bold text-slate-700 shadow-sm border border-slate-200 hover:bg-emerald-50 hover:text-emerald-800"
                  >
                    ## Header 2
                  </button>
                  <button
                    type="button"
                    onClick={() => setContent((prev) => prev ? `${prev} **Teks Tebal** ` : "**Teks Tebal**")}
                    className="rounded-lg bg-white px-2.5 py-1 text-xs font-bold text-slate-700 shadow-sm border border-slate-200 hover:bg-emerald-50 hover:text-emerald-800"
                  >
                    **Tebal**
                  </button>
                  <button
                    type="button"
                    onClick={() => setContent((prev) => prev ? `${prev}\n- Poin informasi 1\n- Poin informasi 2` : "- Poin informasi 1\n- Poin informasi 2")}
                    className="rounded-lg bg-white px-2.5 py-1 text-xs font-bold text-slate-700 shadow-sm border border-slate-200 hover:bg-emerald-50 hover:text-emerald-800"
                  >
                    - Poin Bullet
                  </button>
                  <button
                    type="button"
                    onClick={() => setContent((prev) => prev ? `${prev}\n1. Langkah 1\n2. Langkah 2` : "1. Langkah 1\n2. Langkah 2")}
                    className="rounded-lg bg-white px-2.5 py-1 text-xs font-bold text-slate-700 shadow-sm border border-slate-200 hover:bg-emerald-50 hover:text-emerald-800"
                  >
                    1. Poin Angka
                  </button>
                  <button
                    type="button"
                    onClick={() => setContent((prev) => prev ? `${prev}\n> Kutipan atau imbauan penting` : "> Kutipan atau imbauan penting")}
                    className="rounded-lg bg-white px-2.5 py-1 text-xs font-bold text-slate-700 shadow-sm border border-slate-200 hover:bg-emerald-50 hover:text-emerald-800"
                  >
                    &gt; Kutipan
                  </button>
                </div>

                <textarea
                  rows={7}
                  placeholder="Tulis atau tempel (paste) hasil teks AI / artikel di sini... (otomatis rapi)"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full rounded-xl border-2 border-slate-200 p-4 text-base leading-relaxed font-sans"
                  required
                />

                {/* LIVE FORMAT PREVIEW */}
                {content && (
                  <div className="mt-3 rounded-xl border-2 border-emerald-200 bg-emerald-50/40 p-4">
                    <p className="text-xs font-extrabold uppercase text-emerald-800 tracking-wider mb-2 flex items-center gap-1.5">
                      Pratinjau Tampilan Berita Publik (Live Preview):
                    </p>
                    <div className="bg-white p-5 rounded-lg border border-slate-200 text-slate-900 shadow-inner max-h-60 overflow-y-auto">
                      <RichTextRenderer content={content} />
                    </div>
                  </div>
                )}
              </div>

              {/* COMPONENT UPLOAD GAMBAR SAMPUL */}
              <div className="rounded-2xl border-2 border-dashed border-emerald-300 bg-emerald-50/50 p-6">
                <label className="mb-2 block text-base font-bold text-slate-800 flex items-center gap-2">
                  <ImageIcon className="h-5 w-5 text-emerald-700" />
                  Foto Sampul Utama (INSForge Storage: kelurahan-assets)
                </label>

                <div className="flex flex-col items-center justify-center text-center">
                  <UploadCloud className="mb-2 h-10 w-10 text-emerald-600" />
                  <p className="text-base font-semibold text-slate-700 mb-1">
                    Pilih File Foto Sampul untuk Diunggah
                  </p>

                  <div className="mt-2 flex items-center gap-3">
                    <label className="cursor-pointer rounded-xl bg-emerald-700 px-5 py-3 text-sm font-bold text-white shadow-md hover:bg-emerald-800 transition-colors">
                      {isUploading ? "Mengunggah..." : "Select File"}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        disabled={isUploading}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {coverImageUrl && (
                    <div className="mt-4 flex flex-col items-center rounded-xl bg-white p-3 border border-emerald-200 text-xs font-mono text-emerald-900 max-w-md">
                      <Image
                        src={coverImageUrl}
                        alt="Preview Sampul"
                        width={176}
                        height={112}
                        className="h-28 w-44 rounded-lg object-cover border border-slate-200 mb-2"
                        unoptimized
                      />
                      <p className="font-bold text-slate-700 text-left mb-0.5 w-full">Public Storage URL:</p>
                      <p className="truncate w-full">{coverImageUrl}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Modal Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsModalOpen(false)}
                  className="h-12 rounded-xl border-slate-300 font-bold"
                >
                  Batal
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting || isUploading}
                  className="h-12 gap-2 rounded-xl bg-emerald-700 px-6 font-bold text-white hover:bg-emerald-800"
                >
                  {isSubmitting
                    ? "Menyimpan..."
                    : editingNews
                    ? "Simpan Perubahan"
                    : "Publikasikan Berita"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
