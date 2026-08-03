import {
  Heart,
  FileText,
  Skull,
  Baby,
  Home,
  Users,
  FileCheck,
  MapPin,
  ClipboardList,
  ShieldCheck,
  Briefcase,
  type LucideIcon,
} from "lucide-react";

export interface ServiceType {
  id: string;
  title: string;
  category: string;
  iconName: string;
  icon: LucideIcon;
  requirements: string[];
  description: string;
  displayOrder: number;
}

export const serviceTypes: ServiceType[] = [
  {
    id: "1",
    title: "Surat Pengantar Nikah (N1, N2, N4)",
    category: "Layanan Kependudukan",
    iconName: "Heart",
    icon: Heart,
    requirements: [
      "Fotokopi KTP pemohon (suami & istri)",
      "Fotokopi Kartu Keluarga (KK) terbaru",
      "Surat Pengantar RT/RW setempat",
      "Pas foto berwarna 2x3 (4 lembar) & 3x4 (2 lembar)",
      "Akta Kelahiran asli + fotokopi",
      "Surat keterangan belum pernah menikah dari kelurahan (jika perlu)",
      "Ijazah terakhir (fotokopi)",
      "Surat persetujuan orang tua (jika di bawah 21 tahun)",
    ],
    description:
      "Surat pengantar pernikahan untuk didaftarkan ke KUA. Proses estimasi 1-2 hari kerja.",
    displayOrder: 1,
  },
  {
    id: "2",
    title: "Surat Keterangan Kematian",
    category: "Layanan Kependudukan",
    iconName: "Skull",
    icon: Skull,
    requirements: [
      "Fotokopi KTP almarhum/almarhumah",
      "Fotokopi Kartu Keluarga (KK)",
      "Surat Pengantar RT/RW setempat",
      "Surat keterangan dari rumah sakit / dokter / bidan (jika ada)",
      "Fotokopi KTP pelapor (ahli waris / keluarga)",
      "2 orang saksi dengan fotokopi KTP masing-masing",
    ],
    description:
      "Surat keterangan kematian untuk pencatatan sipil dan pengurusan warisan. Proses estimasi 1 hari kerja.",
    displayOrder: 2,
  },
  {
    id: "3",
    title: "Surat Keterangan Domisili",
    category: "Layanan Kependudukan",
    iconName: "Home",
    icon: Home,
    requirements: [
      "Fotokopi KTP pemohon",
      "Fotokopi Kartu Keluarga (KK)",
      "Surat Pengantar RT/RW setempat",
      "Pas foto berwarna 3x4 (2 lembar)",
      "Surat keterangan pindah (jika pendatang baru)",
    ],
    description:
      "Keterangan domisili untuk berbagai keperluan administratif. Proses estimasi 1 hari kerja.",
    displayOrder: 3,
  },
  {
    id: "4",
    title: "Surat Keterangan Tidak Mampu (SKTM)",
    category: "Layanan Sosial",
    iconName: "Users",
    icon: Users,
    requirements: [
      "Fotokopi KTP pemohon",
      "Fotokopi Kartu Keluarga (KK)",
      "Surat Pengantar RT/RW setempat",
      "Surat pernyataan tidak mampu bermaterai",
      "Fotokopi rekening listrik / bukti tagihan terakhir",
    ],
    description:
      "Surat keterangan bagi keluarga kurang mampu untuk keperluan bantuan sosial, pendidikan, atau kesehatan. Proses estimasi 1 hari kerja.",
    displayOrder: 4,
  },
  {
    id: "5",
    title: "Surat Keterangan Kelahiran",
    category: "Layanan Kependudukan",
    iconName: "Baby",
    icon: Baby,
    requirements: [
      "Fotokopi KTP kedua orang tua",
      "Fotokopi Kartu Keluarga (KK)",
      "Fotokopi Buku Nikah / Akta Nikah orang tua",
      "Surat keterangan lahir dari rumah sakit / bidan",
      "Surat Pengantar RT/RW setempat",
      "2 orang saksi dengan fotokopi KTP masing-masing",
    ],
    description:
      "Surat keterangan kelahiran sebagai dasar pembuatan akta kelahiran di Disdukcapil. Proses estimasi 1-2 hari kerja.",
    displayOrder: 5,
  },
  {
    id: "6",
    title: "Surat Keterangan Usaha (SKU)",
    category: "Layanan Perizinan",
    iconName: "Briefcase",
    icon: Briefcase,
    requirements: [
      "Fotokopi KTP pemohon",
      "Fotokopi Kartu Keluarga (KK)",
      "Surat Pengantar RT/RW setempat",
      "Pas foto berwarna 3x4 (2 lembar)",
      "Surat pernyataan usaha bermaterai",
      "Foto lokasi usaha (tampak depan)",
    ],
    description:
      "Surat keterangan usaha untuk keperluan perbankan atau perizinan usaha kecil. Proses estimasi 1-2 hari kerja.",
    displayOrder: 6,
  },
  {
    id: "7",
    title: "Surat Keterangan Pindah",
    category: "Layanan Kependudukan",
    iconName: "MapPin",
    icon: MapPin,
    requirements: [
      "Fotokopi KTP semua anggota keluarga yang pindah",
      "Kartu Keluarga (KK) asli",
      "Surat Pengantar RT/RW setempat",
      "Alasan kepindahan (tertulis)",
      "Surat pernyataan pindah bermaterai",
    ],
    description:
      "Surat keterangan pindah domisili antar kelurahan/kecamatan/kota. Proses estimasi 2-3 hari kerja.",
    displayOrder: 7,
  },
  {
    id: "8",
    title: "Surat Pengantar SKCK",
    category: "Layanan Kependudukan",
    iconName: "ShieldCheck",
    icon: ShieldCheck,
    requirements: [
      "Fotokopi KTP pemohon",
      "Fotokopi Kartu Keluarga (KK)",
      "Surat Pengantar RT/RW setempat",
      "Pas foto berwarna 4x6 (6 lembar, latar merah)",
      "Fotokopi ijazah terakhir",
    ],
    description:
      "Surat pengantar untuk pembuatan SKCK di Kepolisian. Proses estimasi 1 hari kerja.",
    displayOrder: 8,
  },
  {
    id: "9",
    title: "Surat Keterangan Umum / Lainnya",
    category: "Layanan Umum",
    iconName: "FileText",
    icon: FileText,
    requirements: [
      "Fotokopi KTP pemohon",
      "Fotokopi Kartu Keluarga (KK)",
      "Surat Pengantar RT/RW setempat",
      "Dokumen pendukung sesuai keperluan",
    ],
    description:
      "Surat keterangan umum untuk berbagai keperluan yang tidak termasuk kategori di atas. Silakan konsultasi langsung ke petugas kelurahan.",
    displayOrder: 9,
  },
];

export interface NewsItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  summary: string;
  coverImageUrl: string;
  publishedAt: string;
}

export const latestNews: NewsItem[] = [
  {
    id: "1",
    title: "Jadwal Posyandu Balita Bulan Agustus 2026",
    slug: "jadwal-posyandu-agustus-2026",
    category: "Kesehatan",
    summary:
      "Posyandu balita akan dilaksanakan setiap hari Rabu minggu ke-2 dan ke-4 di Balai RW 03. Bawa KMS dan buku kesehatan anak.",
    coverImageUrl: "/placeholder-news-1.jpg",
    publishedAt: "2026-08-01",
  },
  {
    id: "2",
    title: "Gotong Royong Bersih Lingkungan RW 05",
    slug: "gotong-royong-rw05",
    category: "Kegiatan",
    summary:
      "Warga RW 05 diundang bergotong royong membersihkan saluran air dan lingkungan sekitar pada Sabtu, 9 Agustus 2026.",
    coverImageUrl: "/placeholder-news-2.jpg",
    publishedAt: "2026-07-30",
  },
  {
    id: "3",
    title: "Pendaftaran Bantuan Sosial Tahap II Dibuka",
    slug: "pendaftaran-bansos-tahap-2",
    category: "Pengumuman",
    summary:
      "Bagi warga yang belum menerima bantuan sosial tahap I, dapat mendaftar di kantor kelurahan dengan membawa SKTM dan KTP.",
    coverImageUrl: "/placeholder-news-3.jpg",
    publishedAt: "2026-07-28",
  },
];

export const operationalHours = [
  { day: "Senin", open: "08:00", close: "16:00" },
  { day: "Selasa", open: "08:00", close: "16:00" },
  { day: "Rabu", open: "08:00", close: "16:00" },
  { day: "Kamis", open: "08:00", close: "16:00" },
  { day: "Jumat", open: "08:00", close: "15:00" },
  { day: "Sabtu", open: null, close: null },
  { day: "Minggu", open: null, close: null },
];

export const quickActions = [
  {
    label: "Cari Syarat Surat",
    href: "/layanan",
    icon: ClipboardList,
    color: "bg-emerald-600",
    description: "Lihat daftar berkas yang dibutuhkan",
  },
  {
    label: "Pengumuman",
    href: "/berita",
    icon: FileCheck,
    color: "bg-blue-600",
    description: "Baca berita & info terbaru",
  },
  {
    label: "Peta UMKM",
    href: "/umkm",
    icon: MapPin,
    color: "bg-amber-600",
    description: "Temukan usaha warga sekitar",
  },
  {
    label: "Profil Kelurahan",
    href: "/profil",
    icon: Users,
    color: "bg-slate-700",
    description: "Struktur organisasi & visi misi",
  },
];

export const siteSettings = {
  villageName: "Kelurahan Bubulak",
  lurahName: "H. Ahmad Supriyadi, S.Sos., M.Si.",
  officeAddress:
    "Jl. Raya Bubulak No. 1, Kel. Bubulak, Kec. Bogor Barat, Kota Bogor, Jawa Barat 16115",
  contactEmail: "kelurahan.bubulak@kotabogor.go.id",
  contactWhatsapp: "6281234567890",
  googleMapsUrl: "https://maps.app.goo.gl/example",
  instagramUrl: "https://instagram.com/kel.bubulak",
};
