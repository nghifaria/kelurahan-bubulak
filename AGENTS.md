<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- INSFORGE:START -->
## InsForge backend

This project uses [InsForge](https://insforge.dev): an all-in-one, open-source Postgres-based backend (BaaS) that gives this app a database, authentication, file storage, edge functions, realtime, an AI model gateway, and payments through one platform.

- **Project:** **kelurahan-bubulak** (API base `https://f2cgcd9x.ap-southeast.insforge.app`)
- **Skills:** these InsForge skills are installed for supported coding agents. Reach for them before implementing any InsForge feature instead of guessing the API:
  - `insforge`: app code with the `@insforge/sdk` client (database CRUD, auth, storage, edge functions, realtime, AI, email, and Stripe payments).
  - `insforge-cli`: backend and infrastructure via the `insforge` CLI (projects, SQL, migrations, RLS policies, storage buckets, functions, secrets, payment setup, schedules, deploys).
  - `insforge-debug`: diagnosing failures (SDK/HTTP errors, RLS denials, auth and OAuth issues) and running security or performance audits.
  - `insforge-integrations`: wiring external auth providers (Clerk, Auth0, WorkOS, Better Auth, etc.) for JWT-based RLS, or the OKX x402 payment facilitator.
  - `find-skills`: discovering additional skills on demand.
- **Credentials:** app code reads keys from `.env.local`; the CLI reads `.insforge/project.json`. Never hardcode or commit keys.

Key patterns:

- Database inserts take an array: `insert([{ ... }])`.
- Reference users with `auth.users(id)`; use `auth.uid()` in RLS policies.
- For storage uploads, persist both the returned `url` and `key`.
<!-- INSFORGE:END -->

## 📚 DOKUMENTASI PROYEK & ATURAN PENGODINGAN UI/UX

Setiap kali merombak, membuat, atau memperbaiki komponen UI/UX dan halaman pada website Kelurahan Bubulak, **AGENT WAJIB MEMBACA & MEMATUHI SELURUH ATURAN** yang tertulis dalam folder `/docs`:

1. [01_project_brief.md](file:///home/gif/kkn/kelurahan-bubulak/docs/01_project_brief.md) - Ringkasan Eksekutif & Identitas Desain Modern Minimalist / Bento Grid.
2. [02_srs_requirements.md](file:///home/gif/kkn/kelurahan-bubulak/docs/02_srs_requirements.md) - Kebutuhan Fungsional & Non-Fungsional (Performance HP Kentang, WCAG AA, Lighthouse 90+).
3. [03_ui_design_system.md](file:///home/gif/kkn/kelurahan-bubulak/docs/03_ui_design_system.md) - **PANDUAN WAKTU UTAMA UI DESIGN SYSTEM** (Palette Warna, Tipografi, Bento Grid, Tactile Buttons, & Low-End GPU Transition).
4. [04_roadmap_sprint.md](file:///home/gif/kkn/kelurahan-bubulak/docs/04_roadmap_sprint.md) - Rencana Tahapan Eksekusi Rombak UI Per Halaman.
5. [05_phase2_beranda_blueprint.md](file:///home/gif/kkn/kelurahan-bubulak/docs/05_phase2_beranda_blueprint.md) - **BLUEPRINT TEKNIS TAHAP 2**: Perombakan Layout Utama, Navbar, Footer, & Beranda Publik.
6. [06_phase3_layanan_publik_blueprint.md](file:///home/gif/kkn/kelurahan-bubulak/docs/06_phase3_layanan_publik_blueprint.md) - **BLUEPRINT TEKNIS TAHAP 3**: Perombakan Seluruh Halaman Publik (/layanan, /ajukan, /cek-resi, /laporan, /profil, /berita, /umkm).

### ⚠️ PERATURAN MUTLAK KODING UI:
- **WAJIB CEK UI DESIGN SYSTEM & BLUEPRINT**: Sebelum membuat atau mengedit komponen UI baru, agent **HARUS SELALU MENGECEK** [`docs/03_ui_design_system.md`](file:///home/gif/kkn/kelurahan-bubulak/docs/03_ui_design_system.md), [`docs/05_phase2_beranda_blueprint.md`](file:///home/gif/kkn/kelurahan-bubulak/docs/05_phase2_beranda_blueprint.md), dan [`docs/06_phase3_layanan_publik_blueprint.md`](file:///home/gif/kkn/kelurahan-bubulak/docs/06_phase3_layanan_publik_blueprint.md).
- **EKSEKUSI TAHAP 3 KONSISTEN**: Saat kodingan Tahap 3 dimulai, agent WAJIB mengikuti urutan blueprint secara bertahap dan terstruktur.
- **OPTIMASI HP KENTANG**: Dilarang menggunakan backdrop-blur bertumpuk/berat (`backdrop-blur-xl`), efek 3D berat, atau JS infinite animation yang membebankan HP spesifikasi rendah.
- **KONTRAST TINGGI**: Pastikan semua teks mudah dibaca oleh warga (WCAG AA).
- **TOUCH TARGET**: Tombol mobile minimal memiliki area sentuh 44x44px.
