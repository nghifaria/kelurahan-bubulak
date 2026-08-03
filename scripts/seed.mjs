import { createClient } from "@insforge/sdk";

const baseUrl = process.env.NEXT_PUBLIC_INSFORGE_URL || "https://f2cgcd9x.ap-southeast.insforge.app";
const anonKey = process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY || "ik_8889277939d681a3aaa80f80c3cd1bc7";

const insforge = createClient({ baseUrl, anonKey });

async function seed() {
  console.log("🌱 Seeding INSForge Database via SDK (.mjs)...");

  // 1. site_settings
  await insforge.database.from("site_settings").insert([
    {
      village_name: "Kelurahan Bubulak",
      lurah_name: "H. Ahmad Supriyadi, S.Sos., M.Si.",
      office_address: "Jl. Raya Bubulak No. 1, Kel. Bubulak, Kec. Bogor Barat, Kota Bogor, Jawa Barat 16115",
      contact_email: "kelurahan.bubulak@kotabogor.go.id",
      contact_whatsapp: "6281234567890",
      google_maps_url: "https://maps.app.goo.gl/example",
      instagram_url: "https://instagram.com/kel.bubulak",
    },
  ]);

  // 2. service_types
  const serviceTypes = [
    {
      title: "Surat Pengantar Nikah (N1, N2, N4)",
      category: "Layanan Kependudukan",
      icon_name: "Heart",
      requirements: [
        "Fotokopi KTP pemohon (suami & istri)",
        "Fotokopi Kartu Keluarga (KK) terbaru",
        "Surat Pengantar RT/RW setempat",
        "Pas foto berwarna 2x3 (4 lembar) & 3x4 (2 lembar)",
        "Akta Kelahiran asli + fotokopi",
      ],
      description: "Surat pengantar pernikahan untuk didaftarkan ke KUA.",
      display_order: 1,
    },
    {
      title: "Surat Keterangan Kematian",
      category: "Layanan Kependudukan",
      icon_name: "Skull",
      requirements: [
        "Fotokopi KTP almarhum/almarhumah",
        "Fotokopi Kartu Keluarga (KK)",
        "Surat Pengantar RT/RW setempat",
      ],
      description: "Surat keterangan kematian untuk pencatatan sipil.",
      display_order: 2,
    },
    {
      title: "Surat Keterangan Domisili",
      category: "Layanan Kependudukan",
      icon_name: "Home",
      requirements: [
        "Fotokopi KTP pemohon",
        "Fotokopi Kartu Keluarga (KK)",
        "Surat Pengantar RT/RW setempat",
      ],
      description: "Keterangan domisili untuk keperluan administratif.",
      display_order: 3,
    },
    {
      title: "Surat Keterangan Tidak Mampu (SKTM)",
      category: "Layanan Sosial",
      icon_name: "Users",
      requirements: [
        "Fotokopi KTP pemohon",
        "Fotokopi Kartu Keluarga (KK)",
        "Surat Pengantar RT/RW setempat",
      ],
      description: "Surat keterangan bagi keluarga kurang mampu.",
      display_order: 4,
    },
  ];
  const { data: insertedServices } = await insforge.database.from("service_types").insert(serviceTypes).select();

  // 3. news
  const newsList = [
    {
      title: "Jadwal Posyandu Balita dan Lansia Bulan Agustus 2026",
      slug: "jadwal-posyandu-agustus-2026",
      category: "Kesehatan",
      summary: "Posyandu balita dan lansia akan dilaksanakan serentak di wilayah Kelurahan Bubulak.",
      content: "Pemerintah Kelurahan Bubulak bekerja sama dengan Puskesmas Bogor Barat menyelenggarakan kegiatan Posyandu.",
      cover_image_url: "/placeholder-news-1.jpg",
      published_at: "2026-08-01",
      author: "Seksi Kesejahteraan Masyarakat",
      is_published: true,
    },
    {
      title: "Gotong Royong Bersih Lingkungan Serentak di RW 05",
      slug: "gotong-royong-rw05",
      category: "Kegiatan",
      summary: "Warga RW 05 diundang bergotong royong membersihkan saluran air dan lingkungan sekitar.",
      content: "Dalam rangka menjaga kebersihan lingkungan dan mengantisipasi potensi genangan air menjelang musim hujan.",
      cover_image_url: "/placeholder-news-2.jpg",
      published_at: "2026-07-30",
      author: "Pengurus RW 05 & Seksi Pembangunan",
      is_published: true,
    },
    {
      title: "Pendaftaran Bantuan Sosial Tahap II Dibuka Resmi",
      slug: "pendaftaran-bansos-tahap-2",
      category: "Pengumuman",
      summary: "Bagi warga yang belum menerima bantuan sosial tahap I, dapat mendaftar di kantor kelurahan.",
      content: "Pemerintah Kelurahan Bubulak mengumumkan bahwa pendaftaran usulan penerima Bantuan Sosial Tahap II resmi dibuka.",
      cover_image_url: "/placeholder-news-3.jpg",
      published_at: "2026-07-28",
      author: "Staf Layanan Sosial",
      is_published: true,
    },
  ];
  await insforge.database.from("news").insert(newsList);

  // 4. umkm
  const umkmList = [
    {
      business_name: "Dapur Mamah Euis (Soto Mie Bogor)",
      category: "Kuliner",
      owner_name: "Ibu Euis Nurhayati",
      description: "Soto Mie khas Bogor lezat dengan risoles renyah, daging empuk, dan kuah rempah kaya rasa.",
      photo_url: "/placeholder-umkm-1.jpg",
      whatsapp_contact: "6281298765432",
      address: "Jl. Raya Bubulak No. 42",
      google_maps_url: "https://maps.google.com",
      is_verified: true,
    },
    {
      business_name: "Kerajinan Bambu Bubulak Creative",
      category: "Kerajinan",
      owner_name: "Pak Supriatna",
      description: "Produk anyaman bambu ramah lingkungan seperti tempat buah dan tudung saji.",
      photo_url: "/placeholder-umkm-2.jpg",
      whatsapp_contact: "6285712345678",
      address: "Kampung Bubulak RT 03 / RW 02",
      is_verified: true,
    },
  ];
  await insforge.database.from("umkm").insert(umkmList);

  // 5. public_places
  const places = [
    {
      name: "Kantor Kelurahan Bubulak",
      category: "Pemerintahan",
      address: "Jl. Raya Bubulak No. 1, Kec. Bogor Barat",
      google_maps_url: "https://maps.app.goo.gl/example",
      description: "Pusat pelayanan administrasi publik warga Bubulak.",
    },
    {
      name: "Puskesmas Pembantu Bubulak",
      category: "Fasilitas Kesehatan",
      address: "Jl. Raya Bubulak No. 10",
      google_maps_url: "https://maps.app.goo.gl/example",
      description: "Pelayanan kesehatan dasar dan pengobatan berobat jalan.",
    },
  ];
  await insforge.database.from("public_places").insert(places);

  // 6. staff_members
  const staff = [
    {
      name: "H. Ahmad Supriyadi, S.Sos., M.Si.",
      position: "Lurah Bubulak",
      photo_url: "/placeholder-staff-1.jpg",
      display_order: 1,
    },
    {
      name: "Dra. Hj. Siti Rahmah",
      position: "Sekretaris Kelurahan",
      photo_url: "/placeholder-staff-2.jpg",
      display_order: 2,
    },
    {
      name: "Bambang Hermawan, S.IP.",
      position: "Kasi Pemerintahan & Ketertiban",
      photo_url: "/placeholder-staff-3.jpg",
      display_order: 3,
    },
  ];
  await insforge.database.from("staff_members").insert(staff);

  // 7. achievements
  const achievements = [
    {
      title: "Juara 1 Kelurahan Terbersih & Sehat Tingkat Kota Bogor",
      year: 2025,
      description: "Penghargaan dari Walikota Bogor atas keberhasilan program pemilahan sampah mandiri.",
    },
    {
      title: "Penghargaan Pelayanan Publik Digital Terbaik",
      year: 2024,
      description: "Apresiasi atas inovasi percepatan pengurusan dokumen kependudukan.",
    },
  ];
  await insforge.database.from("achievements").insert(achievements);

  // 8. submissions & complaints
  const defaultServiceId = insertedServices?.[0]?.id || null;
  await insforge.database.from("submissions").insert([
    {
      ticket_number: "BBL-20260803-89X2",
      service_type_id: defaultServiceId,
      citizen_name: "Budi Santoso",
      citizen_nik: "3271011508790001",
      citizen_whatsapp: "6281234567890",
      status: "PROCESSED",
      admin_notes: "Berkas fisik sedang diverifikasi oleh staf pelayanan.",
    },
  ]);

  await insforge.database.from("complaints").insert([
    {
      ticket_number: "LAP-20260803-31A9",
      title: "Lampu Penerangan Jalan Umum (PJU) Padam",
      rt_rw_location: "RT 02 / RW 05",
      description: "Lampu jalan di dekat pertigaan masjid mati sejak 3 hari lalu.",
      reporter_name: "Anonim / Warga RW 05",
      reporter_whatsapp: "6281200001111",
      status: "IN_PROGRESS",
    },
  ]);

  console.log("🎉 Seed completed successfully!");
}

seed().catch(console.error);
