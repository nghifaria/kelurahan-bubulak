# 06. Blueprint Teknis Tahap 3: Perombakan Seluruh Halaman Publik

Dokumen ini memuat rancangan teknis detail untuk eksekusi **Tahap 3: Perombakan Seluruh Halaman Publik Kelurahan Bubulak** (`/layanan`, `/ajukan`, `/cek-resi`, `/laporan`, `/profil`, `/berita`, `/umkm`) agar memiliki tampilan konsisten dengan arsitektur **Linear-Style Minimalist, Bento Grid, dan High-Contrast Typography**.

---

## 🎨 1. Panduan Desain Halaman Publik (Design Guardrails)

1. **Aturan Header Halaman (Page Banner Header)**:
   - Menggantikan header gradient pekat lama dengan desain **Linear Sleek Dark Slate Banner** (`bg-gradient-to-b from-emerald-900 via-emerald-800 to-slate-900 text-white`).
   - Bebas dari `backdrop-blur` bertumpuk / efek 3D berat.
   - Menyajikan breadcrumb navigasi yang jelas dan lencana identitas halaman.
2. **Aturan Kartu & Form Input (Tactile & Accessible)**:
   - Komponen kartu menggunakan 1px subtle border (`border-slate-200 bg-white rounded-3xl p-6 shadow-xs`).
   - Ukuran tinggi tombol dan input field minimal **44px hingga 48px** (`min-h-[44px]` / `h-12 sm:h-14`) agar ramah digunakan di smartphone.
3. **Keterbacaan & Kontras Teks (WCAG AA)**:
   - Teks judul `text-slate-900` font-extrabold.
   - Paragraf `text-slate-700` / `text-slate-600` font-medium leading-relaxed.

---

## 📑 2. Rancangan Teknis Per Halaman Publik

### A. Modul Layanan Surat & Form Pengajuan Online (`/layanan` & `/ajukan`)
- **`/layanan` (Katalog Syarat Surat)**:
  - Header pencarian instan jenis surat kependudukan.
  - Kartu katalog surat berbasis Bento Grid dengan list persyaratan berpoin jelas, badge estimasi waktu, dan tombol langsung *Ajukan Surat Ini*.
- **`/ajukan` (Form Pengajuan Online)**:
  - Form Wizard/Single-card berdesain bersih dengan input NIK (16 digit), Nama, WhatsApp, Pilihan Jenis Surat, Catatan Warga, dan Komponen Upload Berkas/Lampiran.
  - Modal/Alert sukses yang menampilkan **Nomor Resi Ticket** unik dan tombol pintas ke *Lacak Resi*.

### B. Modul Cek Resi & Pengaduan Warga (`/cek-resi` & `/laporan`)
- **`/cek-resi` (Lacak Ticket Resi)**:
  - Search box nomor resi (`REQ-***` / `LAP-***`).
  - Timeline visual status pengajuan (Pending -> Diproses -> Selesai / Ditolak) dengan badge status kontras tinggi.
- **`/laporan` (Portal Pengaduan Warga)**:
  - Form input aduan bersih dengan pilihan RT/RW, judul laporan, isi deskripsi, dan info pelapor.

### C. Modul Profil Kelurahan (`/profil`)
- **Grid Demografi Penduduk**: Card 6-kolom (Total Penduduk 18.724, KK 5.732, Laki-laki 9.519, Perempuan 9.205, RT 50, RW 13).
- **Gambaran Umum & Batas Wilayah**: Teks narasi resmi dan 4 kartu batas wilayah (Utara, Selatan, Barat, Timur).
- **Struktur Organisasi Pegawai Resmi (2026)**: Grid 9 aparatur pegawai dengan foto/placeholder, nama lengkap, jabatan resmi, dan lencana Lurah Bubulak Pimpinan Utama.

### D. Modul Berita & Artikel (`/berita` & `/berita/[slug]`)
- **`/berita` (Listing Berita)**: Grid berita 3-kolom dengan filter kategori (Pengumuman, Kegiatan, Kesehatan, Pembangunan) dan pencarian judul.
- **`/berita/[slug]` (Detail Berita)**: Tampilan artikel publik berformat **Smart Rich Text** (# Header 1, ## Header 2, **Tebal**, - Poin, > Quote).

### E. Modul Direktori UMKM Lokal & Tempat Umum (`/umkm`)
- **Katalog UMKM**: Filter kategori (Kuliner, Jasa, Kerajinan, Toko), pencarian nama usaha/pemilik, lencana terverifikasi, dan tombol kontak WhatsApp pemesanan langsung.
- **Fasilitas Umum**: List tempat umum (Kantor, Puskesmas, Masjid, Sekolah) lengkap dengan link Google Maps.

---

## ⚡ 3. Target Performa & Build Verification

- **Build Check**: Dipastikan `npm run build` lulus dengan **0 errors** (TypeCheck & JSX Clean).
- **Hosting Production**: Deployed live ke InsForge Cloud Hosting (`https://f2cgcd9x.insforge.site`).
