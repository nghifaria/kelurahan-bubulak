# Product Requirements Document (PRD)

## Website Portal Informasi & Layanan Digital Kelurahan Bubulak

* **Versi Document:** 1.0.0
* **Status Proyek:** Draft Ready for AI Agent Development
* **Target Stack:** Next.js (App Router), INSForge (BaaS/PostgreSQL/Auth/Storage), Tailwind CSS, Shadcn UI, Lucide Icons

---

## BAGIAN 1 DARI 3: Visi, Arsitektur, Tech Stack, & Fitur Publik

---

### 1. Overview & Visi Produk

#### 1.1 Problem Statement

Warga Kelurahan Bubulak sering mengalami kendala akses informasi operasional kelurahan. Masalah utama meliputi:

* Harus datang langsung ke kantor kelurahan hanya untuk menanyakan daftar syarat berkas administrasi (seperti Pengantar Nikah, Surat Kematian, Keterangan Domisili).
* Informasi berita, pengumuman, dan agenda kelurahan sering tertimbun di grup chat RT/RW.
* Potensi UMKM lokal warga kurang terekspos karena tidak adanya wadah promosi resmi kelurahan.

#### 1.2 Tujuan Utama (Product Goals)

1. Memindahkan katalog persyaratan surat-menyurat ke platform digital yang dapat diakses 24/7 dari rumah.
2. Menyediakan tampilan antarmuka (UI) yang *sleek*, modern, namun ramah pengguna lansia (font jelas, navigasi sederhana).
3. Memisahkan secara tegas antara **Website Publik** (tanpa login) dan **Ruang Kerja Admin** (`/admin`) untuk menjaga keamanan dan kemudahan pengelolaan konten oleh staf kelurahan.

#### 1.3 Persona Pengguna Target

1. **Pak Budi (45 Th - Warga Pekerja):** Membutuhkan informasi syarat berkas dengan cepat tanpa harus izin kerja.
2. **Ibu Siti (60 Th - Warga Lansia):** Membutuhkan teks ukuran besar, kontras tinggi, dan navigasi yang tidak membingungkan.
3. **Rian (22 Th - Pemuda/Pengusaha UMKM):** Ingin daftarkan usaha kulinernya di direktori UMKM kelurahan.
4. **Staf Kelurahan (Admin):** Menginginkan tempat input berita dan pemroses laporan yang simpel tanpa kerumitan teknis.

---

### 2. Arsitektur Sistem & Batasan Akses

#### 2.1 Pemisahan Lingkungan (Public vs Admin Workspace)

* **Website Publik (`/`):**
* Akses penuh tanpa tombol/fitur login untuk warga.
* Hanya membaca data (*Read-Only*) dari database, kecuali pada form pengajuan surat/laporan warga.
* Dioptimalkan untuk performa cepat (*Mobile-First*) dan SEO-friendly via Next.js App Router.


* **Ruang Kerja Admin (`/admin`):**
* Halaman terisolasi yang mewajibkan otentikasi (INSForge Auth).
* Digunakan khusus oleh staf/pegawai kelurahan yang diberi hak akses.
* Tempat pengelolaan seluruh konten website (CMS) dan pemrosesan surat masuk.



#### 2.2 Keamanan & Otentikasi

* Menggunakan **INSForge Auth** untuk login staf admin (dukungan Google Provider / Email-Password).
* Seluruh endpoint API penulisan data (*Create/Update/Delete*) dilindungi oleh middleware verifikasi session/token INSForge.

---

### 3. Spesifikasi Stack Teknologi

* **Frontend Framework:** Next.js (App Router) dengan TypeScript.
* **Styling & UI Kit:** Tailwind CSS + Shadcn UI (Accordion, Card, Button, Input, Modal, Toast).
* **Iconography:** Lucide React Icons (Gaya garis minimalis, modern, dan ringan).
* **Backend as a Service (BaaS):** INSForge
* **Database:** Managed PostgreSQL (INSForge Database).
* **Authentication:** INSForge Auth (khusus rute `/admin`).
* **File/Asset Storage:** INSForge S3 Storage (penyimpanan foto berita, logo, dan dokumen syarat).
* **Serverless Functions:** INSForge Edge Functions (pemicu email notifikasi / webhooks).


* **Deployment & Public Tunneling:** INSForge Cloud / Vercel.

---

### 4. Rincian Modul Fitur & Sub-Fitur (Area Website Publik)

#### 4.1 Module: Halaman Utama (Landing Page Publik)

* **Sub-fitur 4.1.1: Hero Section & Banner Kantor**
* Menampilkan foto/video utama Kantor Kelurahan Bubulak dengan *headline* sambutan resmi.


* **Sub-fitur 4.1.2: Panel Informasi Cepat & Jam Operasional**
* Kotak informasi jadwal pelayanan kantor (Senin - Jumat, Jam Buka/Tutup) dan status indikator *"Buka"* / *"Tutup"* secara otomatis berbasis jam lokal.


* **Sub-fitur 4.1.3: Quick Action Grid (Pintas Menu)**
* Tombol pintas berikon besar menuju: *Cari Syarat Surat*, *Pengumuman*, *Peta UMKM*, dan *Profil Kelurahan*.


* **Sub-fitur 4.1.4: Highlight Berita & Pengumuman Terbaru**
* Menampilkan 3 kartu berita/pengumuman paling gress yang diterbitkan admin.


* **Sub-fitur 4.1.5: Footer Terpadu**
* Alamat lengkap kantor, Google Maps embed, tautan media sosial (Instagram, YouTube), nomor WhatsApp resmi, dan hak cipta.



#### 4.2 Module: Katalog Syarat Pelayanan (FAQ Accordion & Instant Search)

* **Sub-fitur 4.2.1: Real-time Search Bar**
* Input pencarian cepat di bagian atas. Saat warga mengetik (contoh: *"nikah"*, *"mati"*, *"domisili"*), daftar kotak di bawahnya otomatis terfilter secara langsung.


* **Sub-fitur 4.2.2: Komponen Accordion Interaktif (Shadcn UI)**
* Kotak syarat yang dapat dimekarkan/ditutup saat diklik.
* Setiap judul layanan dilengkapi ikon Lucide yang relevan (misal: 💍 untuk Pengantar Nikah, 🕊️ untuk Surat Kematian, 📄 untuk Keterangan Umum).


* **Sub-fitur 4.2.3: Checklist Berkas & Panduan Syarat**
* Di dalam accordion yang dimekarkan, daftar berkas ditampilkan dalam bentuk *bullet checklist* yang mudah dibaca.


* **Sub-fitur 4.2.4: Tombol Action (Cetak / WhatsApp Info)**
* Tombol *"Cetak Ringkasan Syarat"* untuk mencetak daftar berkas ke PDF/Kertas, atau tombol *"Tanya via WhatsApp"* jika ada berkas yang membingungkan.



#### 4.3 Module: Berita, Pengumuman, & Kegiatan

* **Sub-fitur 4.3.1: Listing Berita dengan Filter Kategori**
* Daftar kartu berita lengkap dengan gambar sampul, tanggal publikasi, dan kategori (Pengumuman, Kegiatan, Health/Posyandu).


* **Sub-fitur 4.3.2: Halaman Detail Berita**
* Tampilan baca artikel dengan dukungan format teks (Rich Text), gambar utama, serta galeri foto dokumentasi di bagian bawah.



#### 4.4 Module: Direktori UMKM Warga & Peta Tempat Umum

* **Sub-fitur 4.4.1: Katalog UMKM Bubulak**
* Tampilan kartu usaha lokal berisi foto produk/toko, nama usaha, deskripsi singkat, kategori (Kuliner, Jasa, Kerajinan), dan tombol langsung ke WhatsApp Penjual.


* **Sub-fitur 4.4.2: Peta & Direktori Fasilitas Publik**
* Daftar tempat penting di Kelurahan Bubulak (Masjid, Sekolah, Posyandu, Kantor RW) terbagi berdasarkan kategori ikon, dilengkapi tombol *"Buka di Google Maps"*.



#### 4.5 Module: Profil Kelurahan & Organisasi

* **Sub-fitur 4.5.1: Visi & Misi Kelurahan**
* Teks resmi visi dan misi kelurahan dengan tata letak yang bersih.


* **Sub-fitur 4.5.2: Bagan Struktur Organisasi & Anggota**
* Tampilan daftar foto pegawai/staf kelurahan beserta nama, jabatan, dan urutan hierarki jabatan (Lurah di posisi pertama).


* **Sub-fitur 4.5.3: Wilayah RT/RW & Data Statistik Sederhana**
* Ringkasan peta wilayah administratif Kelurahan Bubulak beserta kontak pengurus RT/RW lokal.

```python
content = """# BAGIAN 2 DARI 3: Form Layanan Warga, Ruang Kerja Admin (`/admin`), & Workflow Sistem

---

### 4. Rincian Modul Fitur & Sub-Fitur (Lanjutan Area Publik)

#### 4.6 Module: Form Pengajuan Surat & Aspirasi/Laporan Warga Online

* **Sub-fitur 4.6.1: Form Pengajuan Surat Digital**
* Form input simpel berisi: Nama Lengkap, NIK, Nomor WhatsApp, Email, Jenis Surat yang Diminta (Dropdown), Keterangan/Alasan, serta Slot Upload File (KTP/KK/Surat Pengantar RT/RW).
* Upload dokumen ditangani langsung oleh **INSForge Storage** dengan batasan tipe file (`.pdf`, `.jpg`, `.png`) dan ukuran maksimal 5 MB.


* **Sub-fitur 4.6.2: Generator Nomor Resi / Tiket Pelacakan Unik**
* Setelah form dikirim, sistem otomatis memunculkan pop-up kode resi unik (contoh: `BBL-20260803-89X2`) dan tombol *"Salin Resi"* atau *"Simpan Bukti (PDF/Screenshot)"*.


* **Sub-fitur 4.6.3: Portal Cek Status Pengajuan & Laporan**
* Kolom pencarian status sederhana di mana warga cukup memasukkan Nomor Resi atau NIK.
* Menampilkan *timeline* status visual yang mudah dipahami warga lansia:
* 🟡 **Diterima / Pending:** Berkas telah masuk ke sistem kelurahan.
* 🔵 **Diproses:** Pegawai kelurahan sedang memeriksa/membuatkan surat.
* 🟢 **Selesai / Siap Diambil:** Surat sudah jadi, warga dapat mengambil ke kantor kelurahan dengan membawa berkas fisik asli (atau mengunduh jika berupa PDF).
* 🔴 **Ditolak / Perlu Perbaikan:** Disertai catatan dari admin (misal: *"Foto KTP buram, harap ajukan ulang"*).




* **Sub-fitur 4.6.4: Form Laporan & Aspirasi Warga**
* Form khusus pengaduan masalah fisik/sosial di lingkungan Kelurahan Bubulak (misal: jalan rusak, sampah menumpuk, penerangan jalan mati).
* Field: Judul Laporan, Lokasi RT/RW, Deskripsi Masalah, Upload Foto Bukti, dan Nama Pelapor (opsional: Anonim).



---

### 5. Rincian Modul Fitur & Sub-Fitur (Ruang Kerja Admin `/admin`)

#### 5.1 Module: Otentikasi Staf & Dashboard Utama Admin

* **Sub-fitur 5.1.1: Halaman Login Khusus Staf (`/admin/login`)**
* Tampilan login minimalis terpisah dari website publik, menggunakan **INSForge Auth**.
* Tidak ada tombol registrasi publik (akun admin dibuat secara khusus oleh Administrator Utama).


* **Sub-fitur 5.1.2: Summary Dashboard & Statistik**
* Kartu statistik ringkas saat admin pertama kali masuk:
* Total Surat Masuk (Pending / Hari Ini).
* Total Laporan Warga Belum Diproses.
* Berita Diterbitkan.
* Indikator Kapasitas Penyimpanan INSForge Storage (Jatah foto/dokumen).





#### 5.2 Module: CMS Pengelolaan Konten Website (Content Management)

* **Sub-fitur 5.2.1: Kelola Pengaturan Utama Website (Site Settings)**
* Form terpusat untuk mengubah data umum yang muncul di seluruh halaman publik: Nama Kelurahan, Nama Lurah, Video Beranda (URL YouTube), Foto Utama Kantor Kelurahan, Email Kontak, Nomor WhatsApp Resmi (Format: `628xxx`), Tautan Google Maps Kantor, dan Akun Medsos (Instagram/TikTok).


* **Sub-fitur 5.2.2: Kelola Berita & Pengumuman (CRUD Berita)**
* Tabel daftar berita dilengkapi tombol *Tambah (+)*, *Edit*, dan *Hapus*.
* Editor Berita: Judul, Kategori, Tanggal Publikasi, Isi Lengkap (Rich Text Editor/Markdown), Gambar Sampul Utama (di-upload via tombol *Select File*), serta Galeri Foto Dokumentasi Tambahan.
* Fitur Status: *Draft* (Tersimpan otomatis tapi belum tampil di publik) vs *Published* (Langsung tayang di website publik).


* **Sub-fitur 5.2.3: Kelola Prestasi Kelurahan**
* Input data penghargaan/capaian kelurahan: Judul Prestasi, Tahun (diambil otomatis dari Tanggal Publikasi), Deskripsi, dan Foto Piala/Sertifikat.


* **Sub-fitur 5.2.4: Kelola Direktori UMKM & Tempat Umum**
* **UMKM:** Input Nama Usaha, Deskripsi Produk, Foto Toko, Nomor WhatsApp Pemilik, dan Tautan Google Maps Lokasi Usaha.
* **Tempat Umum:** Input Nama Tempat, Kategori (Pemerintahan, Masjid, Sekolah, Fasilitas Kesehatan, Toko), dan Tautan Google Maps.


* **Sub-fitur 5.2.5: Kelola Pegawai & Anggota Kelurahan**
* Input Nama Pegawai, Jabatan, Foto Profil, dan **Urutan Tampilan** (Input angka: 1 untuk Lurah agar tampil paling atas, 2 untuk Sekretaris, dst).



#### 5.3 Module: Manajemen Inbox Layanan & Pengaduan Warga

* **Sub-fitur 5.3.1: Tabel Inbox Pengajuan Surat**
* Daftar seluruh surat yang masuk dari warga secara *real-time*.
* Filter berdasarkan status: *Semua*, *Pending*, *Diproses*, *Selesai*, *Ditolak*.
* Modal Detail: Admin dapat melihat detail NIK, mengunduh file lampiran warga (KTP/KK), serta mengubah status pengajuan.


* **Sub-fitur 5.3.2: Modal Update Status & Catatan Admin**
* Saat admin mengubah status (misal dari *Diproses* menjadi *Selesai*), admin dapat memberikan catatan pengambilannya.
* Fitur Tombol Pintas: *"Kirim Notifikasi via WhatsApp"* yang otomatis membuka WhatsApp Web dengan draf pesan siap kirim berisi nomor resi dan status surat warga.


* **Sub-fitur 5.3.3: Tabel Inbox Laporan / Aspirasi Warga**
* Kelola pengaduan warga, ubah status penanganan (*Pending* -> *Tindak Lanjut* -> *Selesai*), dan opsi untuk menampilkan laporan tertentu di halaman publik (jika laporan ingin dijadikan transparansi publik).



---

### 6. Alur Kerja Sistem (Workflow & User Flow)

#### 6.1 Alur Warga Mengajukan Surat & Melacak Status

```text
[Warga Buka Web Publik] 
       │
       ▼
[Pilih Menu "Syarat Surat"] ──► [Baca Checklist Syarat via Accordion]
       │
       ▼
[Klik "Ajukan Surat Online"]
       │
       ▼
[Isi Form & Upload Berkas (KTP/KK)] ──► [File Tersimpan di INSForge Storage]
       │
       ▼
[Sistem Generate Nomor Resi] ──► [Warga Simpan Kode Resi]
       │
       ▼
[Warga Cek Status berkala di Menu "Cek Resi"] ──► [Melihat Timeline Status]


```

#### 6.2 Alur Admin Memproses Pengajuan Surat Masuk

```text
[Staf Kelurahan Login di /admin]
       │
       ▼
[Buka Menu "Inbox Pengajuan Surat"]
       │
       ▼
[Pilih Surat Status "Pending"] ──► [Periksa Kelengkapan Berkas Lampiran]
       │
       ├─► [Berkas Lengkap] ──► Ubah Status ke "Diproses" / "Selesai"
       │                         │
       │                         └─► [Klik "Kirim WA"] -> Kirim Pesan ke Warga
       │
       └─► [Berkas Kurang]  ──► Ubah Status ke "Ditolak" + Isi Catatan Alasan


```

#### 6.3 Alur Admin Mempublikasikan Berita / Pengumuman Baru

```text
[Admin Masuk /admin/berita] ──► [Klik "+ Tambah Berita"]
       │
       ▼
[Isi Judul, Kategori, & Teks Berita]
       │
       ▼
[Upload Gambar Sampul via Tombol "Select"] ──► [Gambar Dioptimasi di INSForge Storage]
       │
       ▼
[Klik Tombol "Publish"]
       │
       ▼
[Berita Otomatis Muncul di Halaman Depan Web Publik]

```
## BAGIAN 2 DARI 3: Form Layanan Warga, Ruang Kerja Admin (`/admin`), & Workflow Sistem

---

### 4. Rincian Modul Fitur & Sub-Fitur (Lanjutan Area Publik)

#### 4.6 Module: Form Pengajuan Surat & Aspirasi/Laporan Warga Online

* **Sub-fitur 4.6.1: Form Pengajuan Surat Digital**
* Form input simpel berisi: Nama Lengkap, NIK, Nomor WhatsApp, Email, Jenis Surat yang Diminta (Dropdown), Keterangan/Alasan, serta Slot Upload File (KTP/KK/Surat Pengantar RT/RW).
* Upload dokumen ditangani langsung oleh **INSForge Storage** dengan batasan tipe file (`.pdf`, `.jpg`, `.png`) dan ukuran maksimal 5 MB.


* **Sub-fitur 4.6.2: Generator Nomor Resi / Tiket Pelacakan Unik**
* Setelah form dikirim, sistem otomatis memunculkan pop-up kode resi unik (contoh: `BBL-20260803-89X2`) dan tombol *"Salin Resi"* atau *"Simpan Bukti (PDF/Screenshot)"*.


* **Sub-fitur 4.6.3: Portal Cek Status Pengajuan & Laporan**
* Kolom pencarian status sederhana di mana warga cukup memasukkan Nomor Resi atau NIK.
* Menampilkan *timeline* status visual yang mudah dipahami warga lansia:
* 🟡 **Diterima / Pending:** Berkas telah masuk ke sistem kelurahan.
* 🔵 **Diproses:** Pegawai kelurahan sedang memeriksa/membuatkan surat.
* 🟢 **Selesai / Siap Diambil:** Surat sudah jadi, warga dapat mengambil ke kantor kelurahan dengan membawa berkas fisik asli (atau mengunduh jika berupa PDF).
* 🔴 **Ditolak / Perlu Perbaikan:** Disertai catatan dari admin (misal: *"Foto KTP buram, harap ajukan ulang"*).




* **Sub-fitur 4.6.4: Form Laporan & Aspirasi Warga**
* Form khusus pengaduan masalah fisik/sosial di lingkungan Kelurahan Bubulak (misal: jalan rusak, sampah menumpuk, penerangan jalan mati).
* Field: Judul Laporan, Lokasi RT/RW, Deskripsi Masalah, Upload Foto Bukti, dan Nama Pelapor (opsional: Anonim).



---

### 5. Rincian Modul Fitur & Sub-Fitur (Ruang Kerja Admin `/admin`)

#### 5.1 Module: Otentikasi Staf & Dashboard Utama Admin

* **Sub-fitur 5.1.1: Halaman Login Khusus Staf (`/admin/login`)**
* Tampilan login minimalis terpisah dari website publik, menggunakan **INSForge Auth**.
* Tidak ada tombol registrasi publik (akun admin dibuat secara khusus oleh Administrator Utama).


* **Sub-fitur 5.1.2: Summary Dashboard & Statistik**
* Kartu statistik ringkas saat admin pertama kali masuk:
* Total Surat Masuk (Pending / Hari Ini).
* Total Laporan Warga Belum Diproses.
* Berita Diterbitkan.
* Indikator Kapasitas Penyimpanan INSForge Storage (Jatah foto/dokumen).





#### 5.2 Module: CMS Pengelolaan Konten Website (Content Management)

* **Sub-fitur 5.2.1: Kelola Pengaturan Utama Website (Site Settings)**
* Form terpusat untuk mengubah data umum yang muncul di seluruh halaman publik: Nama Kelurahan, Nama Lurah, Video Beranda (URL YouTube), Foto Utama Kantor Kelurahan, Email Kontak, Nomor WhatsApp Resmi (Format: `628xxx`), Tautan Google Maps Kantor, dan Akun Medsos (Instagram/TikTok).


* **Sub-fitur 5.2.2: Kelola Berita & Pengumuman (CRUD Berita)**
* Tabel daftar berita dilengkapi tombol *Tambah (+)*, *Edit*, dan *Hapus*.
* Editor Berita: Judul, Kategori, Tanggal Publikasi, Isi Lengkap (Rich Text Editor/Markdown), Gambar Sampul Utama (di-upload via tombol *Select File*), serta Galeri Foto Dokumentasi Tambahan.
* Fitur Status: *Draft* (Tersimpan otomatis tapi belum tampil di publik) vs *Published* (Langsung tayang di website publik).


* **Sub-fitur 5.2.3: Kelola Prestasi Kelurahan**
* Input data penghargaan/capaian kelurahan: Judul Prestasi, Tahun (diambil otomatis dari Tanggal Publikasi), Deskripsi, dan Foto Piala/Sertifikat.


* **Sub-fitur 5.2.4: Kelola Direktori UMKM & Tempat Umum**
* **UMKM:** Input Nama Usaha, Deskripsi Produk, Foto Toko, Nomor WhatsApp Pemilik, dan Tautan Google Maps Lokasi Usaha.
* **Tempat Umum:** Input Nama Tempat, Kategori (Pemerintahan, Masjid, Sekolah, Fasilitas Kesehatan, Toko), dan Tautan Google Maps.


* **Sub-fitur 5.2.5: Kelola Pegawai & Anggota Kelurahan**
* Input Nama Pegawai, Jabatan, Foto Profil, dan **Urutan Tampilan** (Input angka: 1 untuk Lurah agar tampil paling atas, 2 untuk Sekretaris, dst).



#### 5.3 Module: Manajemen Inbox Layanan & Pengaduan Warga

* **Sub-fitur 5.3.1: Tabel Inbox Pengajuan Surat**
* Daftar seluruh surat yang masuk dari warga secara *real-time*.
* Filter berdasarkan status: *Semua*, *Pending*, *Diproses*, *Selesai*, *Ditolak*.
* Modal Detail: Admin dapat melihat detail NIK, mengunduh file lampiran warga (KTP/KK), serta mengubah status pengajuan.


* **Sub-fitur 5.3.2: Modal Update Status & Catatan Admin**
* Saat admin mengubah status (misal dari *Diproses* menjadi *Selesai*), admin dapat memberikan catatan pengambilannya.
* Fitur Tombol Pintas: *"Kirim Notifikasi via WhatsApp"* yang otomatis membuka WhatsApp Web dengan draf pesan siap kirim berisi nomor resi dan status surat warga.


* **Sub-fitur 5.3.3: Tabel Inbox Laporan / Aspirasi Warga**
* Kelola pengaduan warga, ubah status penanganan (*Pending* -> *Tindak Lanjut* -> *Selesai*), dan opsi untuk menampilkan laporan tertentu di halaman publik (jika laporan ingin dijadikan transparansi publik).



---

### 6. Alur Kerja Sistem (Workflow & User Flow)

#### 6.1 Alur Warga Mengajukan Surat & Melacak Status

```text
[Warga Buka Web Publik] 
       │
       ▼
[Pilih Menu "Syarat Surat"] ──► [Baca Checklist Syarat via Accordion]
       │
       ▼
[Klik "Ajukan Surat Online"]
       │
       ▼
[Isi Form & Upload Berkas (KTP/KK)] ──► [File Tersimpan di INSForge Storage]
       │
       ▼
[Sistem Generate Nomor Resi] ──► [Warga Simpan Kode Resi]
       │
       ▼
[Warga Cek Status berkala di Menu "Cek Resi"] ──► [Melihat Timeline Status]


```

#### 6.2 Alur Admin Memproses Pengajuan Surat Masuk

```text
[Staf Kelurahan Login di /admin]
       │
       ▼
[Buka Menu "Inbox Pengajuan Surat"]
       │
       ▼
[Pilih Surat Status "Pending"] ──► [Periksa Kelengkapan Berkas Lampiran]
       │
       ├─► [Berkas Lengkap] ──► Ubah Status ke "Diproses" / "Selesai"
       │                         │
       │                         └─► [Klik "Kirim WA"] -> Kirim Pesan ke Warga
       │
       └─► [Berkas Kurang]  ──► Ubah Status ke "Ditolak" + Isi Catatan Alasan


```

#### 6.3 Alur Admin Mempublikasikan Berita / Pengumuman Baru

```text
[Admin Masuk /admin/berita] ──► [Klik "+ Tambah Berita"]
       │
       ▼
[Isi Judul, Kategori, & Teks Berita]
       │
       ▼
[Upload Gambar Sampul via Tombol "Select"] ──► [Gambar Dioptimasi di INSForge Storage]
       │
       ▼
[Klik Tombol "Publish"]
       │
       ▼
[Berita Otomatis Muncul di Halaman Depan Web Publik]


```

---


# BAGIAN 3 DARI 3: Skema Database, Komponen UI, API Endpoint, & Standards

---

### 7. Skema Database (INSForge Managed PostgreSQL)

Berikut adalah struktur tabel database relational yang dirancang tanpa gambar diagram, menggunakan daftar kolom, tipe data, dan deskripsi secara presisi:

#### 7.1 Tabel `site_settings` (Pengaturan Umum Website)

Tabel *singleton* (hanya berisi 1 baris data) untuk informasi umum kelurahan.

* `id` (UUID, Primary Key, Default: `gen_random_uuid()`)
* `village_name` (VARCHAR(100), Default: `"Kelurahan Bubulak"`)
* `lurah_name` (VARCHAR(150), Nullable)
* `office_address` (TEXT)
* `office_photo_url` (TEXT, Nullable) - *Link file di INSForge Storage*
* `hero_video_youtube_url` (TEXT, Nullable)
* `contact_email` (VARCHAR(100))
* `contact_whatsapp` (VARCHAR(20)) - *Format: 628xxx tanpa spasi/plus*
* `google_maps_url` (TEXT, Nullable)
* `instagram_url` (TEXT, Nullable)
* `tiktok_url` (TEXT, Nullable)
* `updated_at` (TIMESTAMP WITH TIME ZONE, Default: `NOW()`)

#### 7.2 Tabel `news` (Berita & Pengumuman)

* `id` (UUID, Primary Key)
* `title` (VARCHAR(255), NOT NULL)
* `slug` (VARCHAR(255), UNIQUE, NOT NULL) - *URL friendly*
* `category` (VARCHAR(50), Default: `"Pengumuman"`) - *Opsus: Pengumuman, Kegiatan, Kesehatan, Pembangunan*
* `content` (TEXT, NOT NULL) - *Format Rich Text / Markdown*
* `summary` (TEXT, Nullable) - *Deskripsi singkat untuk kartu berita*
* `cover_image_url` (TEXT, NOT NULL) - *Gambar utama*
* `documentation_urls` (JSONB / TEXT[], Nullable) - *Array foto galeri tambahan*
* `published_at` (TIMESTAMP WITH TIME ZONE, Default: `NOW()`)
* `is_published` (BOOLEAN, Default: `true`)
* `created_by` (UUID, Foreign Key ke `auth.users`)

#### 7.3 Tabel `service_types` (Katalog Jenis Layanan & Syarat Accordion)

* `id` (UUID, Primary Key)
* `title` (VARCHAR(150), NOT NULL) - *Contoh: "PENGANTAR NIKAH ( N1 )"*
* `category` (VARCHAR(100), Default: `"Layanan Kependudukan"`)
* `icon_name` (VARCHAR(50), Default: `"FileText"`) - *Nama Ikon Lucide*
* `requirements` (JSONB, NOT NULL) - *Array string checklist syarat (contoh: ["Fc KK", "Fc KTP", "Surat Pengantar RT/RW"])*
* `description` (TEXT, Nullable) - *Catatan tambahan atau jam pemrosesan*
* `display_order` (INTEGER, Default: `0`)

#### 7.4 Tabel `submissions` (Inbox Pengajuan Surat Warga)

* `id` (UUID, Primary Key)
* `ticket_number` (VARCHAR(50), UNIQUE, NOT NULL) - *Nomor resi (Contoh: BBL-20260803-89X2)*
* `service_type_id` (UUID, Foreign Key ke `service_types.id`)
* `citizen_name` (VARCHAR(150), NOT NULL)
* `citizen_nik` (VARCHAR(16), NOT NULL)
* `citizen_whatsapp` (VARCHAR(20), NOT NULL)
* `citizen_email` (VARCHAR(100), Nullable)
* `notes` (TEXT, Nullable) - *Keterangan tambahan dari warga*
* `attachment_urls` (JSONB, NOT NULL) - *Array link berkas upload KTP/KK/Pengantar RT*
* `status` (VARCHAR(30), Default: `"PENDING"`) - *Enum: PENDING, PROCESSED, COMPLETED, REJECTED*
* `admin_notes` (TEXT, Nullable) - *Catatan perbaikan/pengambilan dari admin*
* `created_at` (TIMESTAMP WITH TIME ZONE, Default: `NOW()`)
* `updated_at` (TIMESTAMP WITH TIME ZONE, Default: `NOW()`)

#### 7.5 Tabel `complaints` (Laporan & Aspirasi Warga)

* `id` (UUID, Primary Key)
* `ticket_number` (VARCHAR(50), UNIQUE, NOT NULL)
* `title` (VARCHAR(200), NOT NULL)
* `rt_rw_location` (VARCHAR(50), NOT NULL) - *Contoh: "RT 02 / RW 05"*
* `description` (TEXT, NOT NULL)
* `photo_url` (TEXT, Nullable)
* `reporter_name` (VARCHAR(150), Nullable) - *Kosong jika Anonim*
* `reporter_whatsapp` (VARCHAR(20), Nullable)
* `status` (VARCHAR(30), Default: `"PENDING"`) - *Enum: PENDING, IN_PROGRESS, RESOLVED*
* `is_public` (BOOLEAN, Default: `false`) - *Jika true, tampil di transparansi publik*
* `created_at` (TIMESTAMP WITH TIME ZONE, Default: `NOW()`)

#### 7.6 Tabel `achievements` (Prestasi Kelurahan)

* `id` (UUID, Primary Key)
* `title` (VARCHAR(255), NOT NULL)
* `year` (INTEGER, NOT NULL) - *Format: 2023, 2024, 2025, 2026*
* `description` (TEXT, Nullable)
* `photo_url` (TEXT, Nullable)
* `published_at` (TIMESTAMP WITH TIME ZONE, Default: `NOW()`)

#### 7.7 Tabel `umkm` (Katalog Usaha Warga)

* `id` (UUID, Primary Key)
* `business_name` (VARCHAR(150), NOT NULL)
* `category` (VARCHAR(50), Default: `"Kuliner"`) - *Kuliner, Jasa, Kerajinan, Toko*
* `owner_name` (VARCHAR(150), Nullable)
* `description` (TEXT, Nullable)
* `photo_url` (TEXT, Nullable)
* `whatsapp_contact` (VARCHAR(20), NOT NULL)
* `google_maps_url` (TEXT, Nullable)
* `is_verified` (BOOLEAN, Default: `true`)

#### 7.8 Tabel `public_places` (Tempat Umum & Peta)

* `id` (UUID, Primary Key)
* `name` (VARCHAR(150), NOT NULL)
* `category` (VARCHAR(50), Default: `"Pemerintahan"`) - *Pemerintahan, Masjid, Sekolah, Fasilitas Kesehatan, Lainnya*
* `google_maps_url` (TEXT, NOT NULL)

#### 7.9 Tabel `staff_members` (Anggota & Struktur Kelurahan)

* `id` (UUID, Primary Key)
* `name` (VARCHAR(150), NOT NULL)
* `position` (VARCHAR(100), NOT NULL) - *Contoh: "Lurah Bubulak", "Sekretaris"*
* `photo_url` (TEXT, Nullable)
* `display_order` (INTEGER, Default: `1`) - *1 untuk Lurah, 2 untuk Sekretaris, dst.*

---

### 8. Pemetaan Komponen UI (Shadcn UI & Lucide Icons)

#### 8.1 Komponen Shadcn UI yang Wajib Di-install

* **`Accordion`** ➔ Digunakan untuk Katalog Syarat Pelayanan (FAQ).
* **`Card`** ➔ Digunakan untuk kartu berita, kartu UMKM, statistik admin, dan pengumuman.
* **`Button`** ➔ Tombol aksi utama (CTA) dengan *variant* `default`, `outline`, dan `destructive`.
* **`Input` & `Textarea**` ➔ Field form pencarian, form pengajuan surat, dan CMS admin.
* **`Select`** ➔ Dropdown pilihan kategori berita, jenis layanan, dan status surat.
* **`Dialog / Modal`** ➔ Pop-up detail surat masuk di admin, pop-up resi warga, dan konfirmasi hapus.
* **`Table`** ➔ Tabel inbox pengajuan surat, tabel berita, dan tabel UMKM di admin.
* **`Badge`** ➔ Label status visual (`Pending` = Kuning, `Diproses` = Biru, `Selesai` = Hijau, `Ditolak` = Merah).
* **`Tabs`** ➔ Navigasi kategori di halaman berita, UMKM, dan prestasi.
* **`Toast / Sonner`** ➔ Notifikasi pemberitahuan saat form berhasil dikirim atau data tersimpan.

#### 8.2 Koleksi Ikon Lucide React yang Digunakan

* `Search` ➔ Search bar syarat surat & berita.
* `FileText`, `FileCheck`, `ClipboardList` ➔ Ikon syarat surat & administrasi.
* `HeartHandshake`, `Rings` (atau `Users`) ➔ Ikon Pengantar Nikah.
* `Cross` / `Dove` / `FileX` ➔ Ikon Surat Kematian.
* `Building2`, `Landmark` ➔ Ikon Kantor Kelurahan & Fasilitas Umum.
* `MapPin` ➔ Tombol tautan Google Maps.
* `Phone`, `MessageSquare` ➔ Tombol kontak WhatsApp.
* `Calendar` ➔ Tanggal berita & jadwal operasional.
* `Award` ➔ Menu Prestasi Kelurahan.
* `ShoppingBag` ➔ Menu UMKM.
* `CheckCircle2`, `Clock`, `AlertCircle` ➔ Timeline status pelacakan resi.
* `UploadCloud` ➔ Tombol upload berkas lampiran.
* `Lock` ➔ Indikator halaman khusus admin.

---

### 9. Struktur Rute & Directory Next.js (App Router)

```text
app/
 ├── (public)/                      # Grouping Layout Website Publik (Tanpa Login)
 │    ├── page.tsx                  # Beranda Utama
 │    ├── layanan/                  # Page Katalog Syarat Surat & Accordion FAQ
 │    │    └── page.tsx
 │    ├── ajukan/                   # Form Pengajuan Surat Online
 │    │    └── page.tsx
 │    ├── cek-resi/                 # Halaman Cek Status Surat / Laporan
 │    │    └── page.tsx
 │    ├── berita/                   # Listing Berita & Pengumuman
 │    │    ├── page.tsx
 │    │    └── [slug]/page.tsx      # Detail Artikel Berita
 │    ├── umkm/                     # Katalog UMKM & Peta
 │    │    └── page.tsx
 │    ├── profil/                   # Profil, Struktur Organisasi, & Prestasi
 │    │    └── page.tsx
 │    └── laporan/                  # Form Pengaduan / Aspirasi Warga
 │         └── page.tsx
 │
 ├── admin/                         # Grouping Layout Ruang Kerja Admin (Protected)
 │    ├── login/                    # Page Login Staf (INSForge Auth)
 │    │    └── page.tsx
 │    ├── dashboard/                # Summary Dashboard Staf
 │    │    └── page.tsx
 │    ├── pengajuan/                # Inbox Pengelolaan Surat Warga & Resi
 │    │    └── page.tsx
 │    ├── berita/                   # CMS Berita (Tambah, Edit, Hapus)
 │    │    └── page.tsx
 │    ├── umkm-tempat/              # Kelola Data UMKM & Tempat Umum
 │    │    └── page.tsx
 │    ├── pegawai/                  # Kelola Anggota & Urutan Tampilan
 │    │    └── page.tsx
 │    └── pengaturan/               # Kelola Informasi Umum Website
 │         └── page.tsx
 │
 └── api/                           # Serverless API Routes
      ├── upload/route.ts           # Upload File Handler (INSForge Storage)
      ├── submissions/route.ts      # Endpoint Pengajuan & Cek Resi
      └── admin/...                 # Protected API Endpoints via Middleware Session

```

---

### 10. Batasan Teknis, Aksesibilitas, & Standar Desain

#### 10.1 Aturan Aksesibilitas Lansia-Friendly (Elderly-Friendly UI)

1. **Aturan Ukuran Font Minimum:**
* Teks Isi Paragraf: Minimal `16px` (`text-base` di Tailwind).
* Judul Section/Headings: Minimal `24px` (`text-2xl` sampai `text-4xl`).


2. **Kontras Warna Tinggi:**
* Menggunakan kombinasi teks gelap (`text-slate-900`) di atas latar terang (`bg-white` / `bg-slate-50`), mematuhi standar WCAG AAA.


3. **Ukuran Target Sentuh (Touch Target Size):**
* Seluruh tombol (Button) dan input di HP wajib memiliki tinggi minimal `48px` (`h-12`) agar mudah ditekan jari warga lansia.


4. **Navigasi Sederhana:**
* Hindari menu tersembunyi yang rumit. Menu utama publik ditampilkan secara lugas dengan teks dan ikon yang jelas.



#### 10.2 Aturan Optimasi Upload Gambar & Penyimpanan

1. **Penggunaan Tombol "Select File" (Bukan Drag & Drop):**
* Di area Admin, sediakan tombol khusus **`Select File`** untuk mengunggah foto berita/dokumen.


2. **Kompresi Otomatis di Client/Server:**
* Sebelum file foto terkirim ke INSForge Storage, sistem wajib melakukan *resize* dan kompresi otomatis (maksimal lebar `1200px`, ukuran file target < `300 KB`) untuk menghemat jatah kuota penyimpanan storage dan mempercepat *loading* warga.



#### 10.3 Aturan Format Nomor WhatsApp

* Semua input nomor WhatsApp di Admin wajib dibersihkan (*sanitized*) oleh sistem menjadi format internasional tanpa karakter khusus: `628xxxxxxxxxx` (Menghapus `08`, `+62`, spasi, atau tanda strip `-`).

---

