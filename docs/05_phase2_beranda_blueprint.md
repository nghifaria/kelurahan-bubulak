# 05. Blueprint Teknis Tahap 2: Layout Utama & Rombak Beranda

Dokumen ini memuat arsitektur teknis detail dan blueprint komponen untuk eksekusi **Tahap 2 (Rombak Layout Utama, Navbar, Footer, & Beranda Publik)**.

---

## 🎨 1. Arsitektur Layout Utama (`app/layout.tsx`, `Navbar`, `Footer`)

### A. Komponen Navbar Modern Linear-Style (`components/navbar.tsx`)
- **Struktur Layout**: Sticky header dengan background solid/subtle opacity (`bg-white/95 border-b border-slate-200/80 shadow-xs`), **bebas dari `backdrop-blur-xl` berat**.
- **Indikator Navigasi Aktif**: Highlight link halaman dengan kapsul emerald halus (`bg-emerald-50 text-emerald-800 border border-emerald-200/60 font-bold`).
- **Touch Target Mobile (44x44px)**:
  - Tombol hamburger menu mobile & tombol pencarian cepat berukuran minimal `min-h-[44px] min-w-[44px]`.
- **Navigasi Cepat Mobile**: Mobile drawer menu slide-in ringan tanpa animasi JS bertumpuk.

### B. Komponen Footer Informatif & Respon Cepat (`components/footer.tsx`)
- **Struktur Footer**: Dark Slate Neutral (`bg-slate-900 text-slate-100 border-t border-slate-800`).
- **Informasi Kontak Darurat**: Nomor telepon darurat kelurahan (Bhabinkamtibmas, Babinsa, Ambulans) dengan tombol panggilan sekali sentuh.
- **Link Navigasi & Jam Kerja**: Menyajikan jam kerja WIB, alamat resmi kantor, dan tautan sosial media resmi.

---

## 📦 2. Rancangan Bento Grid & Komponen Beranda (`app/page.tsx`)

### A. Section 1: Hero Section Sleek & Search Bar Pintar
- **Headline**: High-contrast typography `Plus Jakarta Sans` / `Inter` (`text-4xl sm:text-5xl font-extrabold text-slate-900`).
- **Sub-headline**: Penjelasan tegas layanan digital tanpa antre.
- **Search Bar Pintar / Quick Action**: Form pencarian cepat jenis surat atau tombol sekali sentuh menuju katalog syarat surat & ajukan online.

### B. Section 2: Layout Bento Grid 6-Card Architecture
Halaman depan menggunakan susunan **Bento Grid 6 Kartu Utama** berdesain Linear-style:

```
+------------------------------------------+------------------------------------------+
| Card 1: Widget Status Jam Operasional    | Card 2: Akses Cepat Surat & Cek Resi     |
| (Live Clock WIB & Lencana Buka/Tutup)    | (Tombol Pintas Sekali Sentuh Warga)      |
+------------------------------------------+------------------------------------------+
| Card 3: Statistik Demografi Penduduk     | Card 4: Berita & Pengumuman Terkini      |
| (18.724 Jiwa, 5.732 KK, 50 RT / 13 RW)   | (Live Feed Berita Resmi Kelurahan)       |
+------------------------------------------+------------------------------------------+
| Card 5: Unggulan UMKM & Tempat Umum      | Card 6: Banner Panggil Pengaduan Warga   |
| (Direktori Usaha Lokal Terverifikasi)    | (Kanal Aspirasi & Aduan Warga Live)      |
+------------------------------------------+------------------------------------------+
```

1. **Card 1 (Widget Status & Live WIB Clock)**:
   - Menampilkan jam, menit, detik live WIB dengan lencana **BUKA** (hijau emerald) atau **TUTUP** (amber/dark).
2. **Card 2 (Akses Cepat Pengajuan Surat & Cek Resi)**:
   - Kartu taktil berisikan tombol pintas: *Ajukan Surat Online*, *Cek Syarat*, dan *Lacak Nomor Resi Ticket*.
3. **Card 3 (Statistik Ringkas Warga)**:
   - Menampilkan total penduduk (18.724), KK (5.732), serta jumlah RT (50) & RW (13) yang diambil live dari database INSForge `site_settings`.
4. **Card 4 (Berita & Pengumuman Terkini)**:
   - Ringkasan 3 berita terbaru dari database dengan badge kategori, tanggal terbit, dan cover image.
5. **Card 5 (Direktori Unggulan UMKM Lokal)**:
   - Highlight produk UMKM warga Bubulak terverifikasi lengkap dengan link kontak WhatsApp pemesanan langsung.
6. **Card 6 (Layanan Pengaduan & Aspirasi Warga)**:
   - Banner panggil aksi cepat untuk melaporkan kendala fasilitas atau lingkungan warga.

### C. Section 3: Sambutan Lurah & Profil Ringkas
- Menampilkan foto & narasi resmi Lurah Bubulak **ANJAR APRIYANA, S.Sos., M.Si**, beserta visualisasi gambaran umum wilayah kelurahan.

---

## ⚡ 3. Performance & Accessibility Guardrails

1. **Aturan Kontras Warna (WCAG AA)**:
   - Teks Utama: `text-slate-900` (`#0f172a`) di atas background `bg-white` atau `bg-slate-50`.
   - Teks Secondary: `text-slate-700` (`#334155`) untuk body paragraph.
   - Status Text: `text-emerald-800` (Buka/Selesai), `text-amber-800` (Pending/Tutup), `text-red-800` (Ditolak).
2. **Eliminasi Blur Heavy Effects**:
   - Menggantikan `backdrop-blur-xl` dengan subtle border 1px `border-slate-200` atau `border-emerald-200/80`.
3. **Modul Komponen Baru yang Akan Dibuat**:
   - `components/BentoGrid.tsx`: Container layout Bento Grid responsif.
   - `components/BentoCard.tsx`: Komponen wrapper kartu taktil dengan hover border.
   - `components/EmergencyBanner.tsx`: Widget banner nomor kontak darurat warga.
