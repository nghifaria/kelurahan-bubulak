# 05. Blueprint Teknis Tahap 2: Layout Utama & Rombak Beranda (Clean Vertical Layout)

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
- **Struktur Footer**: Dark Slate Neutral (`bg-slate-950 text-slate-200 border-t border-slate-800`).
- **Informasi Kontak Darurat**: Nomor telepon darurat kelurahan (Bhabinkamtibmas, Babinsa, Ambulans) dengan tombol panggilan sekali sentuh.
- **Link Navigasi & Jam Kerja**: Menyajikan jam kerja WIB, alamat resmi kantor, dan tautan sosial media resmi.

---

## 📦 2. Rancangan Layout Vertikal Minimalis Beranda (`app/page.tsx`)

Bento Grid pada Beranda telah dibongkar dan digantikan dengan **Layout Vertikal Lapang (Scroll Ke Bawah)** ber-spacing lega (`space-y-12`):

```
1. [HERO SECTION & SAMBUTAN LURAH]
   - Banner Selamat Datang di Kelurahan Bubulak
   - Kartu Sambutan & Profil Lurah ANJAR APRIYANA, S.Sos., M.Si

2. [AKSES PINTAS LAYANAN (QUICK ACCESS)]
   - 4 Kartu Pintas: Ajukan Surat, Cek Resi, Syarat Berkas, Pengaduan

3. [JADWAL & STATUS OPERASIONAL WIB]
   - Container khusus Jam Realtime WIB (HH:mm WIB - TANPA DETIK!)
   - Lencana Status BUKA / TUTUP

4. [DEMOGRAFI & STATISTIK PENDUDUK]
   - Grid 4-kolom: 18.724 Jiwa, 5.732 KK, 50 RT / 13 RW, 157,085 Ha

5. [BERITA & PENGUMUMAN TERKINI]
   - Live Feed 3 Berita Terbaru + Tombol "Lihat Semua Berita"

6. [DIREKTORI UNGGULAN UMKM LOKAL]
   - Highlight produk warga terverifikasi + Kontak WA langsung

7. [BANNER PANGGIL PENGADUAN & KONTAK DARURAT]
   - Banner Dark Slate penutup sebelum Footer
```

### Rincian Perbaikan Komponen Operasional Jam WIB:
- **Jam Realtime WIB**: Menggunakan format `HH:mm WIB` (contoh: `14:48 WIB`), **TANPA MENAMPILKAN DETIK** sesuai permintaan standar kenyamanan mata warga.

---

## ⚡ 3. Performance & Accessibility Guardrails

1. **Aturan Kontras Warna (WCAG AA)**:
   - Teks Utama: `text-slate-900` (`#0f172a`) di atas background `bg-white` atau `bg-slate-50`.
   - Teks Secondary: `text-slate-700` (`#334155`) untuk body paragraph.
   - Status Text: `text-emerald-800` (Buka/Selesai), `text-amber-800` (Pending/Tutup), `text-red-800` (Ditolak).
2. **Eliminasi Blur Heavy Effects**:
   - Menggantikan `backdrop-blur-xl` dengan subtle border 1px `border-slate-200` atau `border-emerald-200/80`.
