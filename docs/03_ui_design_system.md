# 03. UI Design System & Component Guidelines

Dokumen ini adalah **panduan baku desain UI/UX** untuk renovasi website Kelurahan Bubulak. Seluruh agent dan developer **wajib merujuk pada panduan ini** sebelum membuat atau merombak komponen UI.

---

## 🎨 1. Palette Warna (Clean, Sleek & High-Contrast)

Desain menggunakan warna dasar **Emerald Kelurahan** yang dipadukan dengan **Dark Slate Neutral** dan **Tactile Borders** berisikan kontras tinggi agar ramah dibaca oleh seluruh lapisan warga.

| Token Warna | Class Tailwind | Nilai Hex / Color | Kegunaan Utama |
| :--- | :--- | :--- | :--- |
| **Brand Primary** | `bg-emerald-700`, `text-emerald-800` | `#047857` | Header, Tombol Utama, Badge Aktif, Brand Accent |
| **Brand Dark** | `bg-emerald-900`, `text-emerald-950` | `#064e3b` | Footer, Hero Dark Accent, Sidebar Admin |
| **Brand Surface** | `bg-emerald-50`, `border-emerald-200` | `#ecfdf5` | Highlight Bento Card, Banner Notifikasi |
| **Neutral Background**| `bg-slate-50`, `bg-white` | `#f8fafc` / `#ffffff` | Background Halaman & Kartu Utama |
| **Neutral Text** | `text-slate-900`, `text-slate-700` | `#0f172a` / `#334155` | Teks Utama, Judul, & Paragraf |
| **Neutral Subtext** | `text-slate-500` | `#64748b` | Keterangan Tambahan, Timestamp, Label |
| **Accent Status** | `emerald-600` (Buka/Selesai), `amber-500` (Pending/Tutup), `blue-600` (Diproses), `red-600` (Ditolak) | Standard Tailwind Status | Badge Status Resi, Tag Kategori, Alert Status |

---

## 📐 2. Tipografi & Font Stack

- **Font Family**: `Plus Jakarta Sans` / `Inter` (Font Sans-serif Modern dengan Pembacaan Angka & Huruf yang Jernih).
- **H1 (Judul Utama Halaman)**: `text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900`
- **H2 (Judul Sub-Seksi)**: `text-2xl sm:text-3xl font-extrabold text-slate-900`
- **H3 (Judul Kartu/Komponen)**: `text-lg sm:text-xl font-bold text-slate-900`
- **Body Regular**: `text-base font-normal leading-relaxed text-slate-700`
- **Caption / Subtext**: `text-xs sm:text-sm font-semibold text-slate-500`

---

## 📦 3. Panduan Komponen UI (Bento Grid & Tactile Cards)

### A. Bento Grid Architecture
Gunakan susunan **Bento Grid** untuk mengelompokkan informasi secara visual tanpa terlihat monoton:
- **Hero Bento Card**: Kartu berukuran besar dengan batas warna aksen (`border-2 border-emerald-200 bg-white shadow-sm rounded-3xl`).
- **Feature Cards**: Grid responsif 2 s/d 4 kolom (`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4`).
- **Compact Badges**: Penanda informasi berbentuk kapsul (`rounded-full px-3 py-1 text-xs font-bold`).

### B. Tactile Buttons (Tombol Ramah Sentuhan Mobile)
- **Tombol Utama (Primary)**:
  `className="h-12 sm:h-14 px-6 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-base shadow-md active:scale-[0.98] transition-all flex items-center justify-center gap-2 min-h-[44px] min-w-[44px]"`
- **Tombol Sekunder (Outline)**:
  `className="h-12 sm:h-14 px-6 rounded-2xl border-2 border-slate-200 bg-white hover:bg-slate-50 text-slate-800 font-bold text-base shadow-sm active:scale-[0.98] transition-all flex items-center justify-center gap-2 min-h-[44px] min-w-[44px]"`

### C. Form Inputs & Control (shadcn/ui based)
- **Input Text / Select**:
  `className="h-12 sm:h-14 rounded-2xl border-2 border-slate-200 bg-white px-4 text-base font-medium text-slate-900 placeholder:text-slate-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 transition-all"`
- **Textarea**:
  `className="rounded-2xl border-2 border-slate-200 bg-white p-4 text-base font-medium text-slate-900 placeholder:text-slate-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 transition-all leading-relaxed"`

---

## ⚡ 4. Aturan Performa HP Kentang (Zero-Lag Policy)

1. **No Hardware-Intensive Effects**:
   - Dilarang keras menggunakan `backdrop-blur-xl`, `backdrop-blur-2xl`, atau animasi 3D CSS `transform-style: preserve-3d` pada halaman publik.
   - Gunakan solid background atau translucent background sederhana (`bg-emerald-900/90` atau `bg-white`).
2. **Fast GPU Transitions**:
   - Hanya gunakan properti Tailwind transition yang aman untuk hardware acceleration: `transition-colors`, `transition-transform`, `opacity-***`, `scale-***`.
3. **Clean Media Assets**:
   - Semua gambar produk UMKM, foto pegawai, dan sampul berita harus di-load dengan `loading="lazy"` dan batas rasio aspek yang pas.

## 🧩 5. Allowed Stack & Component Patterns

- **Allowed Stack**: Tailwind CSS + shadcn UI + class-variance-authority (`cva`) + `clsx` (+ `@radix-ui` for accessible primitives).
- **Rationale**: minimal migration, small bundles, predictable utility-driven styling, accessible primitives from Radix when needed.

### Component Variant Pattern (cva)
Use `cva` to define style variants for primitives. Example `Button` pattern:

```
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva('inline-flex items-center justify-center rounded-2xl font-bold', {
  variants: {
    variant: { default: 'bg-emerald-700 text-white', outline: 'border border-slate-200 bg-white' },
    size: { default: 'h-12 px-6', sm: 'h-10 px-4' },
  },
  defaultVariants: { variant: 'default', size: 'default' },
})

export function Button({ className, variant, size, ...props }: VariantProps<typeof buttonVariants> & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />
}
```

### Image Policy
- Use `next/image` for hero and list thumbnails. Provide `width`/`height` or `fill`.
- `loading="lazy"` for non-critical images. `priority` only for above-the-fold hero.

### Accessibility Checklist (must pass before PR merge)
- All images: `alt` present and descriptive.
- Interactive elements: keyboard focusable, visible focus ring, ARIA roles where needed.
- Color contrast: WCAG AA for text and UI elements.
- Touch targets: >= 44x44px on mobile for buttons and primary controls.

### Forbidden
- Do not use stacked heavy blur effects (e.g., `backdrop-blur-xl`, `backdrop-blur-2xl`) on public pages.
- Do not import large global animation libraries (e.g., `tw-animate-css`) globally.
- Avoid inline `style={{}}` for layout-critical rules; prefer utility classes or component props.

### Allowed Blur Pattern (controlled use)
- Allowed only: small blur `backdrop-blur-sm` or CSS `backdrop-filter: blur(4px)`.
- Apply blur only on modal/dialog overlays or transient, non-critical surfaces where blur improves focus.
- Always provide solid/semi-opaque fallback background (e.g., `bg-white/70` or `bg-slate-800/60`) for devices that do not support `backdrop-filter`.
- Do not stack blur layers; only one backdrop blur layer permitted per stacking context.
- Ensure foreground text and icons on blurred surfaces meet contrast ratio >= 4.5:1.
- Prefer opacity + subtle border as alternative on low-end devices. Test on low-end Android emulation.

#### Example: Tailwind overlay pattern
```
/* Tailwind classes */
<div className="fixed inset-0 flex items-center justify-center">
  <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" aria-hidden="true" />
  <div className="relative z-10 w-full max-w-md p-6 bg-white rounded-2xl shadow-lg">
    <!-- modal content -->
  </div>
</div>
```

Notes:
- Use `backdrop-blur-sm` only when modal background needs visual separation.
- If blur used, increase text/icon weight or add subtle text-shadow for legibility when necessary.

### Migration Note
- Start with `components/BentoCard.tsx` and `app/page.tsx` as migration examples: convert images to `next/image`, remove inline styles, and adopt `cva` variants for controls.

End of UI Design System additions.
