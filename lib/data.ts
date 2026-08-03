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
  content: string;
  coverImageUrl: string;
  documentationUrls?: string[];
  publishedAt: string;
  author?: string;
}

export const latestNews: NewsItem[] = [
  {
    id: "1",
    title: "Jadwal Posyandu Balita dan Lansia Bulan Agustus 2026",
    slug: "jadwal-posyandu-agustus-2026",
    category: "Kesehatan",
    summary:
      "Posyandu balita dan lansia akan dilaksanakan serentak di wilayah Kelurahan Bubulak. Warga diimbau membawa KMS dan buku kesehatan.",
    content: `
Pemerintah Kelurahan Bubulak bekerja sama dengan Puskesmas Bogor Barat kembali menyelenggarakan kegiatan **Posyandu Balita dan Lansia** rutin untuk bulan Agustus 2026.

### Jadwal Pelaksanaan:
- **Posyandu Balita (RW 01 - RW 04):** Rabu, 12 Agustus 2026 | Pukul 08.00 - 11.30 WIB | Lokasi: Posyandu Dahlia RW 03.
- **Posyandu Balita (RW 05 - RW 08):** Kamis, 13 Agustus 2026 | Pukul 08.00 - 11.30 WIB | Lokasi: Posyandu Melati RW 06.
- **Posyandu Lansia (Seluruh RW):** Sabtu, 15 Agustus 2026 | Pukul 07.30 - 10.30 WIB | Lokasi: Balai Kelurahan Bubulak.

### Layanan yang Disediakan:
1. Penimbangan berat badan dan pengukuran tinggi badan balita.
2. Pemberian Imunisasi dasar dan Vitamin A gratis.
3. Pemeriksaan tekanan darah, gula darah, dan kolesterol untuk lansia.
4. Konsultasi gizi dan kesehatan keluarga secara langsung dengan tenaga medis.

Dimohon kepada seluruh warga masyarakat Kelurahan Bubulak yang memiliki anak balita atau anggota keluarga lansia untuk menghadiri kegiatan ini demi menjaga kesehatan lingkungan masyarakat kita.
    `,
    coverImageUrl: "/placeholder-news-1.jpg",
    publishedAt: "2026-08-01",
    author: "Seksi Kesejahteraan Masyarakat",
    documentationUrls: [
      "/placeholder-doc-1.jpg",
      "/placeholder-doc-2.jpg",
    ],
  },
  {
    id: "2",
    title: "Gotong Royong Bersih Lingkungan Serentak di RW 05",
    slug: "gotong-royong-rw05",
    category: "Kegiatan",
    summary:
      "Warga RW 05 diundang bergotong royong membersihkan saluran air dan lingkungan sekitar untuk mengantisipasi musim hujan.",
    content: `
Dalam rangka menjaga kebersihan lingkungan dan mengantisipasi potensi genangan air menjelang musim penghujan, pengurus RT/RW 05 bersama pihak Kelurahan Bubulak mengimbau seluruh warga untuk mengikuti **Kegiatan Gotong Royong Kerja Bakti Lingkungan**.

### Rincian Kegiatan:
- **Hari/Tanggal:** Sabtu, 9 Agustus 2026
- **Waktu:** Pukul 07.00 WIB s.d. Selesai
- **Titik Kumpul:** Lapangan Bulutangkis RW 05
- **Fokus Kerja Bakti:** Pembersihan selokan air utama, pangkas dahan pohon yang membahayakan kabel listrik, dan pemilahan sampah organik/anorganik.

Pihak Kelurahan menyediakan peralatan tambahan seperti cangkul, garpu sampah, dan kantong sampah besar. Mari kita sukseskan gerakan lingkungan bersih demi kesehatan bersama!
    `,
    coverImageUrl: "/placeholder-news-2.jpg",
    publishedAt: "2026-07-30",
    author: "Pengurus RW 05 & Seksi Pembangunan",
  },
  {
    id: "3",
    title: "Pendaftaran Bantuan Sosial Tahap II Dibuka Resmi",
    slug: "pendaftaran-bansos-tahap-2",
    category: "Pengumuman",
    summary:
      "Bagi warga yang belum menerima bantuan sosial tahap I, dapat mendaftar di kantor kelurahan dengan membawa SKTM dan KTP.",
    content: `
Pemerintah Kelurahan Bubulak mengumumkan bahwa pendaftaran usulan penerima **Bantuan Sosial (Bansos) Tahap II Tahun 2026** resmi dibuka mulai tanggal 3 hingga 20 Agustus 2026.

### Syarat dan Ketentuan Pendaftaran:
1. Terdaftar sebagai warga ber-KTP dan KK Kelurahan Bubulak.
2. Tidak sedang menerima bantuan PKH atau BPNT aktif.
3. Membawa Fotokopi KTP dan Kartu Keluarga (KK).
4. Membawa Surat Keterangan Tidak Mampu (SKTM) dari RT/RW setempat.
5. Mengisi formulir usulan bansos di loket 2 Kantor Kelurahan Bubulak.

Verifikasi lapangan akan dilakukan oleh tim verifikator independen untuk memastikan bantuan tepat sasaran kepada warga yang membutuhkan.
    `,
    coverImageUrl: "/placeholder-news-3.jpg",
    publishedAt: "2026-07-28",
    author: "Staf Layanan Sosial",
  },
  {
    id: "4",
    title: "Sosialisasi Pemilahan Sampah Rumah Tangga & Bank Sampah",
    slug: "sosialisasi-bank-sampah-bubulak",
    category: "Pembangunan",
    summary:
      "Program edukasi pengelolaan sampah organik dan anorganik dari rumah tangga menuju kelurahan bebas sampah plastik.",
    content: `
Dinas Lingkungan Hidup Kota Bogor bersama Kelurahan Bubulak meluncurkan program pelatihan **Bank Sampah Mandiri**. Pelatihan ini bertujuan untuk mengedukasi warga agar mampu memilah sampah organik dan anorganik dari dapur masing-masing.

Sampah plastik yang terpilah nantinya dapat ditabungkan ke Bank Sampah Unit Bubulak dan dikonversi menjadi saldo tabungan warga.
    `,
    coverImageUrl: "/placeholder-news-4.jpg",
    publishedAt: "2026-07-22",
    author: "Tim Lingkungan Hidup",
  },
  {
    id: "5",
    title: "Pemeriksaan Kesehatan dan Pengobatan Gratis Warga Lansia",
    slug: "pengobatan-gratis-lansia",
    category: "Kesehatan",
    summary:
      "Kegiatan bakti sosial pemeriksaan kesehatan gratis bagi lansia di atas 60 tahun di aula kelurahan.",
    content: `
Bakti sosial kesehatan meliputi cek gula darah, kolesterol, asam urat, serta pemberian obat-obatan dan vitamin secara gratis bagi warga lansia Bubulak. Dihadiri oleh dokter umum dari Puskesmas Bogor Barat.
    `,
    coverImageUrl: "/placeholder-news-5.jpg",
    publishedAt: "2026-07-15",
    author: "Kader PKK Kelurahan Bubulak",
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

export interface UmkmItem {
  id: string;
  businessName: string;
  category: "Kuliner" | "Jasa" | "Kerajinan" | "Toko";
  ownerName: string;
  description: string;
  photoUrl: string;
  whatsappContact: string;
  address: string;
  googleMapsUrl?: string;
  isVerified: boolean;
}

export const umkmList: UmkmItem[] = [
  {
    id: "1",
    businessName: "Dapur Mamah Euis (Soto Mie Bogor)",
    category: "Kuliner",
    ownerName: "Ibu Euis Nurhayati",
    description:
      "Soto Mie khas Bogor lezat dengan risoles renyah, daging empuk, dan kuah rempah kaya rasa. Menerima pesanan katering acara.",
    photoUrl: "/placeholder-umkm-1.jpg",
    whatsappContact: "6281298765432",
    address: "Jl. Raya Bubulak No. 42 (Dekat Gang Masjid)",
    googleMapsUrl: "https://maps.google.com",
    isVerified: true,
  },
  {
    id: "2",
    businessName: "Kerajinan Bambu Bubulak Creative",
    category: "Kerajinan",
    ownerName: "Pak Supriatna",
    description:
      "Produk anyaman bambu ramah lingkungan seperti tempat buah, tudung saji, dan hiasan dinding buatan tangan pengrajin lokal.",
    photoUrl: "/placeholder-umkm-2.jpg",
    whatsappContact: "6285712345678",
    address: "Kampung Bubulak RT 03 / RW 02",
    googleMapsUrl: "https://maps.google.com",
    isVerified: true,
  },
  {
    id: "3",
    businessName: "Servis Elektronik & AC Berkah",
    category: "Jasa",
    ownerName: "Kang Deni",
    description:
      "Jasa perbaikan AC, mesin cuci, kulkas, dan peralatan elektronik rumah tangga. Panggilan langsung ke rumah warga.",
    photoUrl: "/placeholder-umkm-3.jpg",
    whatsappContact: "6287811223344",
    address: "Jl. KH. Ahmad Syayani RT 01 / RW 04",
    isVerified: true,
  },
  {
    id: "4",
    businessName: "Toko Sembako Berkah Jaya",
    category: "Toko",
    ownerName: "Hj. Ratna",
    description:
      "Menyediakan beras kualitas super, minyak goreng, gula, telur, dan kebutuhan pokok sehari-hari dengan harga terjangkau.",
    photoUrl: "/placeholder-umkm-4.jpg",
    whatsappContact: "6281355667788",
    address: "Jl. Raya Bubulak No. 15",
    isVerified: true,
  },
  {
    id: "5",
    businessName: "Kue Kering & Snack Ibu Lina",
    category: "Kuliner",
    ownerName: "Ibu Lina Marlina",
    description:
      "Aneka kue kering nastar, kastengel, putri salju, serta keripik singkong pedas manis asli olahan warga RT 02.",
    photoUrl: "/placeholder-umkm-5.jpg",
    whatsappContact: "6282199887766",
    address: "Perumahan Bubulak Indah Blok B1 No. 8",
    isVerified: true,
  },
  {
    id: "6",
    businessName: "Tailor & Penjahit Pakaian Pak Jaka",
    category: "Jasa",
    ownerName: "Pak Jaka Kusuma",
    description:
      "Melayani jahit seragam sekolah, batik, kebaya, permak jeans, dan ganti resleting dengan pengerjaan rapi dan tepat waktu.",
    photoUrl: "/placeholder-umkm-6.jpg",
    whatsappContact: "6285644332211",
    address: "Gang Sawo RT 04 / RW 03",
    isVerified: true,
  },
];

export interface PublicPlaceItem {
  id: string;
  name: string;
  category: "Pemerintahan" | "Masjid" | "Sekolah" | "Fasilitas Kesehatan" | "Lainnya";
  address: string;
  googleMapsUrl: string;
  description?: string;
}

export const publicPlacesList: PublicPlaceItem[] = [
  {
    id: "1",
    name: "Kantor Kelurahan Bubulak",
    category: "Pemerintahan",
    address: "Jl. Raya Bubulak No. 1, Kec. Bogor Barat",
    googleMapsUrl: "https://maps.app.goo.gl/example",
    description: "Pusat pelayanan administrasi publik warga Bubulak.",
  },
  {
    id: "2",
    name: "Puskesmas Pembantu Bubulak",
    category: "Fasilitas Kesehatan",
    address: "Jl. Raya Bubulak No. 10",
    googleMapsUrl: "https://maps.app.goo.gl/example",
    description: "Pelayanan kesehatan dasar dan pengobatan berobat jalan.",
  },
  {
    id: "3",
    name: "Masjid Jami Al-Ikhlas Bubulak",
    category: "Masjid",
    address: "Jl. KH. Ahmad Syayani No. 25",
    googleMapsUrl: "https://maps.app.goo.gl/example",
    description: "Masjid utama kegiatan keagamaan dan ibadah Jumat warga.",
  },
  {
    id: "4",
    name: "SD Negeri Bubulak 1",
    category: "Sekolah",
    address: "Jl. Raya Bubulak No. 5",
    googleMapsUrl: "https://maps.app.goo.gl/example",
    description: "Sekolah Dasar Negeri akreditasi A.",
  },
  {
    id: "5",
    name: "Balai Warga & Posyandu Dahlia RW 03",
    category: "Lainnya",
    address: "Kampung Bubulak RT 02 / RW 03",
    googleMapsUrl: "https://maps.app.goo.gl/example",
    description: "Tempat kegiatan musyawarah warga dan posyandu bulanan.",
  },
];

export interface StaffMember {
  id: string;
  name: string;
  position: string;
  photoUrl: string;
  displayOrder: number;
}

export const staffMembersList: StaffMember[] = [
  {
    id: "1",
    name: "H. Ahmad Supriyadi, S.Sos., M.Si.",
    position: "Lurah Bubulak",
    photoUrl: "/placeholder-staff-1.jpg",
    displayOrder: 1,
  },
  {
    id: "2",
    name: "Dra. Hj. Siti Rahmah",
    position: "Sekretaris Kelurahan",
    photoUrl: "/placeholder-staff-2.jpg",
    displayOrder: 2,
  },
  {
    id: "3",
    name: "Bambang Hermawan, S.IP.",
    position: "Kasi Pemerintahan & Ketertiban",
    photoUrl: "/placeholder-staff-3.jpg",
    displayOrder: 3,
  },
  {
    id: "4",
    name: "Sri Mulyani, S.E.",
    position: "Kasi Kesejahteraan Masyarakat",
    photoUrl: "/placeholder-staff-4.jpg",
    displayOrder: 4,
  },
  {
    id: "5",
    name: "Ahmad Fauzi, A.Md.",
    position: "Kasi Pembangunan & Lingkungan",
    photoUrl: "/placeholder-staff-5.jpg",
    displayOrder: 5,
  },
  {
    id: "6",
    name: "Rina Kusumatuti",
    position: "Staf Pelayanan Kependudukan",
    photoUrl: "/placeholder-staff-6.jpg",
    displayOrder: 6,
  },
];

export interface AchievementItem {
  id: string;
  title: string;
  year: number;
  description: string;
  photoUrl?: string;
}

export const achievementsList: AchievementItem[] = [
  {
    id: "1",
    title: "Juara 1 Kelurahan Terbersih & Sehat Tingkat Kota Bogor",
    year: 2025,
    description:
      "Penghargaan dari Walikota Bogor atas keberhasilan program pemilahan sampah mandiri dan posyandu integrasi.",
  },
  {
    id: "2",
    title: "Penghargaan Pelayanan Publik Digital Terbaik",
    year: 2024,
    description:
      "Apresiasi atas inovasi percepatan pengurusan dokumen kependudukan secara transparan dan akuntabel.",
  },
  {
    id: "3",
    title: "Kelurahan Pelopor Pembinaan UMKM Lokal",
    year: 2023,
    description:
      "Penghargaan atas pendampingan sertifikasi halal dan legalitas usaha bagi 50+ UMKM warga Bubulak.",
  },
];

export const villageStats = {
  areaKm2: 2.85,
  rwCount: 8,
  rtCount: 36,
  population: 14250,
  familyCount: 3820,
};

export interface SubmissionTicket {
  ticketNumber: string;
  citizenName: string;
  citizenNik: string;
  citizenWhatsapp: string;
  serviceTitle: string;
  status: "PENDING" | "PROCESSED" | "COMPLETED" | "REJECTED";
  createdDate: string;
  adminNotes?: string;
}

export const dummySubmissions: SubmissionTicket[] = [
  {
    ticketNumber: "BBL-20260803-89X2",
    citizenName: "Budi Santoso",
    citizenNik: "3271011508790001",
    citizenWhatsapp: "6281234567890",
    serviceTitle: "Surat Pengantar Nikah (N1, N2, N4)",
    status: "PROCESSED",
    createdDate: "2026-08-03",
    adminNotes: "Berkas fisik sedang diverifikasi oleh staf pelayanan. Estimasi selesai besok.",
  },
  {
    ticketNumber: "BBL-20260802-12A4",
    citizenName: "Siti Aminah",
    citizenNik: "3271015204650003",
    citizenWhatsapp: "6281399887766",
    serviceTitle: "Surat Keterangan Kematian",
    status: "COMPLETED",
    createdDate: "2026-08-02",
    adminNotes: "Surat sudah selesai dicetak dan dapat diambil di Loket 1 dengan membawa KTP Asli.",
  },
  {
    ticketNumber: "BBL-20260801-99B7",
    citizenName: "Rian Hidayat",
    citizenNik: "3271012211990005",
    citizenWhatsapp: "6285711223344",
    serviceTitle: "Surat Keterangan Tidak Mampu (SKTM)",
    status: "REJECTED",
    createdDate: "2026-08-01",
    adminNotes: "Foto KTP buram dan Surat Pengantar RT belum ditandatangani RW. Harap ajukan ulang.",
  },
];

export interface ComplaintTicket {
  ticketNumber: string;
  title: string;
  rtRwLocation: string;
  description: string;
  reporterName: string;
  reporterWhatsapp: string;
  status: "PENDING" | "IN_PROGRESS" | "RESOLVED";
  createdDate: string;
}

export const dummyComplaints: ComplaintTicket[] = [
  {
    ticketNumber: "LAP-20260803-31A9",
    title: "Lampu Penerangan Jalan Umum (PJU) Padam",
    rtRwLocation: "RT 02 / RW 05",
    description: "Lampu jalan di dekat pertigaan masjid mati sejak 3 hari lalu, jalanan gelap saat malam.",
    reporterName: "Anonim / Warga RW 05",
    reporterWhatsapp: "6281200001111",
    status: "IN_PROGRESS",
    createdDate: "2026-08-03",
  },
  {
    ticketNumber: "LAP-20260731-55K2",
    title: "Saluran Air Tersumbat Sampah",
    rtRwLocation: "RT 01 / RW 03",
    description: "Drainase di depan lapangan volly tersumbat tanah dan sampah plastik.",
    reporterName: "Pak Ridwan",
    reporterWhatsapp: "6281344556677",
    status: "RESOLVED",
    createdDate: "2026-07-31",
  },
];



