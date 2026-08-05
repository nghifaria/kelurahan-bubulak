# 02. Software Requirements Specification (SRS)

## 🎯 Kebutuhan Fungsional (Functional Requirements - FR)

### 1. Modul Beranda & Informasi Utama (Public Home)
- **FR-01.1**: Menampilkan Banner Utama / Hero Section yang mengedepankan tombol aksi cepat (*Quick Action*).
- **FR-01.2**: Widget Jam Realtime Waktu Indonesia Barat (WIB) dengan kalkulasi otomatis status Kantor Buka/Tutup.
- **FR-01.3**: Menu Pintas Layanan Terpopuler (Cek Syarat, Ajukan Surat, Cek Resi, Pengaduan).
- **FR-01.4**: Widget Berita Terbaru & Pengumuman Kelurahan secara dynamic dari database INSForge.
- **FR-01.5**: FAQ Accordion Interaktif untuk pertanyaan yang sering ditanyakan warga.

### 2. Modul Layanan & Pengajuan Surat Online (Citizen Services)
- **FR-02.1**: Katalog Jenis Layanan Surat lengkap dengan persyaratan, estimasi waktu, dan kategori.
- **FR-02.2**: Form Pengajuan Surat Online dengan input NIK, Nama, WhatsApp, Jenis Surat, Catatan, & Unggah Berkas (KTP/KK).
- **FR-02.3**: Generator Nomor Resi Unik (contoh: `REQ-20260805-XXXX`) setelah berhasil mengajukan.
- **FR-02.4**: Pelacakan Resi (Cek Resi) dengan timeline visual status pengajuan (`PENDING` -> `DIPROSES` -> `SELESAI` / `DITOLAK`).

### 3. Modul Pengaduan & Aspirasi Warga (Public Complaints)
- **FR-03.1**: Form Input Laporan/Pengaduan warga dengan lokasi RT/RW, judul laporan, isi deskripsi, dan info pelapor.
- **FR-03.2**: Pelacakan Status Pengaduan menggunakan Nomor Resi Aduan (`LAP-20260805-XXXX`).

### 4. Modul Berita & Informasi Publik (News & Articles)
- **FR-04.1**: Listing berita publik dengan pencarian, filter kategori, dan pagination responsif.
- **FR-04.2**: Halaman Detail Berita dengan Smart Rich Text Renderer (# Header, **Tebal**, - Poin, > Quote).

### 5. Modul Profil Kelurahan & UMKM (Village Profile & Business Directory)
- **FR-05.1**: Halaman Profil berisi Gambaran Umum, Batas Wilayah, Statistik Penduduk, Visi/Misi, 9 Aparatur Pegawai Resmi, & Prestasi.
- **FR-05.2**: Direktori UMKM Lokal dengan pencarian, filter kategori, badge terverifikasi, & tombol kontak WhatsApp langsung ke pemilik usaha.
- **FR-05.3**: Direktori Tempat Umum & Fasilitas Publik lengkap dengan kategori dan link Google Maps.

### 6. Modul Admin CMS (Backoffice Workspace)
- **FR-06.1**: Autentikasi Admin & Dashboard Ringkasan Metrik.
- **FR-06.2**: Inbox Pengajuan Surat dengan filter status, modal detail NIK/berkas, form ubah status, dan tombol pintas WhatsApp draf notifikasi warga.
- **FR-06.3**: Inbox Pengaduan Warga dengan status & draf notifikasi WhatsApp.
- **FR-06.4**: CMS Berita dengan Rich Text Formatting Toolbar & Live Preview Tampilan Publik.
- **FR-06.5**: CMS UMKM & Tempat Umum (Upload foto storage, verifikasi toggle).
- **FR-06.6**: CMS Pegawai & Struktur Organisasi (Display order, upload foto profil storage).
- **FR-06.7**: CMS Pengaturan Utama & Profil (Informasi Lurah, Gambaran Umum, Batas Wilayah, & Statistik Demografi Penduduk).

---

## ⚡ Kebutuhan Non-Fungsional (Non-Functional Requirements - NFR)

1. **Kecepatan & Performa HP Kentang**:
   - Skor Google Lighthouse Performance minimal **90+** di perangkat mobile.
   - First Contentful Paint (FCP) < 1.5s pada koneksi 3G/4G hemat kuota.
2. **Aksesibilitas & Keterbacaan**:
   - Rasio kontras warna teks dan background memenuhi WCAG 2.1 AA.
   - Font sans-serif legible (`Plus Jakarta Sans` / `Inter`) dengan ukuran min 14px untuk bodi teks.
3. **Responsif & Mobile First**:
   - Kompatibilitas sempurna mulai dari resolusi layar smartphone 320px hingga monitor desktop 4K.
4. **Keamanan Data & RLS (Row Level Security)**:
   - Kebijakan RLS INSForge yang terkonfigurasi dengan aman untuk tabel `submissions`, `complaints`, `site_settings`, `news`, `umkm`, dll.
