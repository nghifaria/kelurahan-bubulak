# 01. Project Brief: Website Kelurahan Bubulak

## 📌 Ringkasan Eksekutif
Website **Kelurahan Bubulak** (Kecamatan Bogor Barat, Kota Bogor) adalah portal pelayanan publik dan pusat informasi digital kelurahan. Portal ini memfasilitasi kebutuhan administrasi warga (pengajuan surat online, cek resi, panduan syarat surat, aduan warga) serta pemberdayaan UMKM lokal dan publikasi berita resmi kelurahan.

Tujuan utama dari proyek **Rombak Total UI/UX** ini adalah mentransformasi tampilan website menjadi **Super Modern, Sleek, Intuitif, dan Ultra-Cepat**, dengan fokus khusus pada warga yang mengakses menggunakan smartphone spesifikasi rendah ("HP Kentang").

---

## 🎨 Identitas Desain & Brand Voice

- **Visual Style**: Modern Minimalist / Linear-Style + Bento Grid Architecture.
- **Brand Voice**: Transparan, Mengayomi, Responsif, Profesional, dan Mudah Dipahami.
- **Warna Utama**: Deep Emerald Slate (Identitas Kelurahan yang Bersih & Hijau) dipadukan dengan High-Contrast Dark Slate & Pure White.
- **Tipografi Utama**: `Plus Jakarta Sans` / `Inter` (Font sans-serif modern dengan pembacaan angka & teks bahasa Indonesia yang sangat jernih).

---

## ⚡ Batasan Performa & HP Kentang Optimization Guidelines

1. **Zero Heavy Blurs**: Hindari penggunaan `backdrop-blur-xl` atau blur bertumpuk yang membebankan GPU smartphone kelas bawah.
2. **Zero Heavy 3D & Infinite Loop JS Animations**: Gunakan CSS transition murni berbasis hardware acceleration (`transform`, `opacity`).
3. **High Contrast First**: Seluruh teks harus memenuhi standar kontras WCAG AA agar mudah dibaca di bawah sinar matahari langsung.
4. **Touch Target Size**: Ukuran area sentuh tombol utama di mobile minimal 44x44px.
5. **Lightweight DOM & Bento Grid Layout**: Susunan layout yang terstruktur rapi tanpa pembungkusan div berlebihan (*div soup*).

---

## 🧭 Referensi Arsitektur Dokumentasi Proyek
- [01_project_brief.md](file:///home/gif/kkn/kelurahan-bubulak/docs/01_project_brief.md) - Brief & Panduan Filosofi Desain
- [02_srs_requirements.md](file:///home/gif/kkn/kelurahan-bubulak/docs/02_srs_requirements.md) - Spesifikasi Kebutuhan Sistem (FR & NFR)
- [03_ui_design_system.md](file:///home/gif/kkn/kelurahan-bubulak/docs/03_ui_design_system.md) - Design System & Komponen Bento Grid
- [04_roadmap_sprint.md](file:///home/gif/kkn/kelurahan-bubulak/docs/04_roadmap_sprint.md) - Tahapan Rencana Eksekusi Rombak UI
