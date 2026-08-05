# 04. Roadmap Execution & Sprint Plan

Dokumen ini memuat tahapan rencana eksekusi renovasi UI/UX website Kelurahan Bubulak secara terstruktur dan terukur.

---

## 🚀 Tahapan Rencana Eksekusi Rombak UI (Sprint Roadmap)

```
[Tahap 1: Setup & Diagnosa] ➔ [Tahap 2: Rombak Beranda & Layout Publik] ➔ [Tahap 3: Rombak Layanan & Pengajuan] ➔ [Tahap 4: Rombak Berita & UMKM] ➔ [Tahap 5: Rombak Admin CMS] ➔ [Tahap 6: Verification & Production Deploy]
```

---

### 📌 TAHAP 1: Diagnosa & Pembuatan Dokumentasi Sistem (SELESAI)
- Inspection struktur folder, skema database, dan komponen UI.
- Identifikasi bottlenecks performa HP Kentang & keterbacaan teks.
- Pembuatan direktori `/docs` lengkap (`01_project_brief.md`, `02_srs_requirements.md`, `03_ui_design_system.md`, `04_roadmap_sprint.md`).
- Pembaruan `AGENTS.md` dengan instruksi baku perombakan UI.

---

### 📌 TAHAP 2: Rombak Layout Publik Utama & Beranda (`app/page.tsx`, `components/navbar.tsx`, `components/footer.tsx`)
- Implementasi `Plus Jakarta Sans` / `Inter` font stack & token warna modern di `globals.css` / `layout.tsx`.
- Rombak **Navbar Publik**: Tambahkan penanda aktif yang jelas, tombol cepat *Cek Resi*, dan mobile drawer menu yang responsif & bebas lag.
- Rombak **Beranda (`app/page.tsx`)**:
  - Hero Section dengan konsep **Modern Linear/Bento Grid**.
  - Integrasi **Live WIB Clock Widget** dengan visualisasi lencana Buka/Tutup kantor yang tajam.
  - Bento Grid untuk **Aksi Cepat Layanan Warga** (Cek Syarat, Ajukan Surat, Cek Resi, Pengaduan).
  - Seksi Berita Terbaru & FAQ Accordion berdesain sleek & high-contrast.
- Rombak **Footer Publik**: Tata letak alamat, kontak WA resmi, jam pelayanan, dan tautan sosial media yang rapi & ramah keterbacaan.

---

### 📌 TAHAP 3: Rombak Halaman Layanan, Pengajuan Surat, & Cek Resi (`app/layanan`, `app/ajukan`, `app/cek-resi`, `app/laporan`)
- **Halaman Layanan (`app/layanan/page.tsx`)**: Filter kategori layanan kependudukan, pencarian instan, dan kartu syarat surat berbentuk Bento Grid.
- **Form Pengajuan Surat (`app/ajukan/page.tsx`)**: Form wizard multi-step dengan input yang jelas, indikator berkas, dan dialog sukses generator nomor resi.
- **Cek Resi & Pengaduan (`app/cek-resi/page.tsx` & `app/laporan/page.tsx`)**: Timeline visual status ticket (`PENDING` -> `DIPROSES` -> `SELESAI`) dengan lencana status kontras tinggi.

---

### 📌 TAHAP 4: Rombak Halaman Profil, Berita, & UMKM Lokal (`app/profil`, `app/berita`, `app/umkm`)
- **Profil Kelurahan (`app/profil/page.tsx`)**: Grid Statistik Demografi Penduduk, Cards Batas Wilayah, Visi/Misi, & Grid 9 Aparatur Pegawai Resmi dengan badge Pimpinan Utama.
- **Berita & Artikel (`app/berita/page.tsx` & `app/berita/[slug]/page.tsx`)**: Card berita dengan aspect ratio teratur dan typography artikel publik yang nyaman dibaca (*Smart Rich Text*).
- **Direktori UMKM & Tempat Umum (`app/umkm/page.tsx`)**: Directory cards dengan pencarian instan, filter kategori, badge terverifikasi, dan tombol kontak WhatsApp pemesanan langsung.

---

### 📌 TAHAP 5: Rombak Admin CMS Workspace (`app/admin/*`)
- **Admin Workspace Layout (`app/admin/layout.tsx`)**: Modern admin sidebar & topbar dengan status koneksi INSForge DB.
- **Admin Inbox Pengajuan & Pengaduan (`app/admin/pengajuan` & `app/admin/laporan`)**: Tabel data bersih, modal detail warga, dan tombol pintas notifikasi WA.
- **Admin CMS Berita, UMKM, Pegawai, & Pengaturan**: Form editor dengan live preview & photo uploader ke INSForge Storage (`kelurahan-assets`).

---

### 📌 TAHAP 6: Verifikasi Performa, Testing, & Deploy Produksi
- Menjalankan `npm run build` untuk memastikan zero TypeScript/Lint error.
- Pengujian performa HP kentang & audit keterbacaan teks.
- Deployment final ke **InsForge Production Hosting** (`npx @insforge/cli deployments deploy .`).
