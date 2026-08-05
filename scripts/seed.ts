import { insforge } from "../lib/insforge";
import {
  siteSettings,
  serviceTypes,
  latestNews,
  umkmList,
  publicPlacesList,
  staffMembersList,
  achievementsList,
  dummySubmissions,
  dummyComplaints,
} from "../lib/data";

async function seed() {
  console.log("🌱 Starting INSForge Database Seed...");

  // 1. site_settings
  console.log("Seeding site_settings...");
  const { error: err1 } = await insforge.database.from("site_settings").insert([
    {
      village_name: siteSettings.villageName,
      lurah_name: siteSettings.lurahName,
      office_address: siteSettings.officeAddress,
      contact_email: siteSettings.contactEmail,
      contact_whatsapp: siteSettings.contactWhatsapp,
      google_maps_url: siteSettings.googleMapsUrl,
      instagram_url: siteSettings.instagramUrl,
      overview_text: siteSettings.overviewText,
      boundary_north: siteSettings.boundaries.north,
      boundary_south: siteSettings.boundaries.south,
      boundary_west: siteSettings.boundaries.west,
      boundary_east: siteSettings.boundaries.east,
      total_population: siteSettings.demographics.totalPopulation,
      total_kk: siteSettings.demographics.totalKK,
      male_population: siteSettings.demographics.malePopulation,
      female_population: siteSettings.demographics.femalePopulation,
      rt_count: siteSettings.demographics.rtCount,
      rw_count: siteSettings.demographics.rwCount,
      area_size: siteSettings.demographics.areaSize,
      altitude: siteSettings.demographics.altitude,
    },
  ]);
  if (err1) console.error("Error site_settings:", err1);

  // 2. service_types
  console.log("Seeding service_types...");
  const serviceInserts = serviceTypes.map((s) => ({
    title: s.title,
    category: s.category,
    icon_name: s.iconName,
    requirements: s.requirements,
    description: s.description,
    display_order: s.displayOrder,
  }));
  const { data: insertedServices, error: err2 } = await insforge.database
    .from("service_types")
    .insert(serviceInserts)
    .select();
  if (err2) console.error("Error service_types:", err2);

  // 3. news
  console.log("Seeding news...");
  const newsInserts = latestNews.map((n) => ({
    title: n.title,
    slug: n.slug,
    category: n.category,
    summary: n.summary,
    content: n.content,
    cover_image_url: n.coverImageUrl,
    documentation_urls: n.documentationUrls || [],
    published_at: n.publishedAt,
    author: n.author || "Admin Kelurahan",
    is_published: true,
  }));
  const { error: err3 } = await insforge.database.from("news").insert(newsInserts);
  if (err3) console.error("Error news:", err3);

  // 4. umkm
  console.log("Seeding umkm...");
  const umkmInserts = umkmList.map((u) => ({
    business_name: u.businessName,
    category: u.category,
    owner_name: u.ownerName,
    description: u.description,
    photo_url: u.photoUrl,
    whatsapp_contact: u.whatsappContact,
    address: u.address,
    google_maps_url: u.googleMapsUrl || null,
    is_verified: u.isVerified,
  }));
  const { error: err4 } = await insforge.database.from("umkm").insert(umkmInserts);
  if (err4) console.error("Error umkm:", err4);

  // 5. public_places
  console.log("Seeding public_places...");
  const placeInserts = publicPlacesList.map((p) => ({
    name: p.name,
    category: p.category,
    address: p.address,
    google_maps_url: p.googleMapsUrl,
    description: p.description || null,
  }));
  const { error: err5 } = await insforge.database.from("public_places").insert(placeInserts);
  if (err5) console.error("Error public_places:", err5);

  // 6. staff_members
  console.log("Seeding staff_members...");
  const staffInserts = staffMembersList.map((st) => ({
    name: st.name,
    position: st.position,
    photo_url: st.photoUrl,
    display_order: st.displayOrder,
  }));
  const { error: err6 } = await insforge.database.from("staff_members").insert(staffInserts);
  if (err6) console.error("Error staff_members:", err6);

  // 7. achievements
  console.log("Seeding achievements...");
  const achInserts = achievementsList.map((a) => ({
    title: a.title,
    year: a.year,
    description: a.description,
  }));
  const { error: err7 } = await insforge.database.from("achievements").insert(achInserts);
  if (err7) console.error("Error achievements:", err7);

  // 8. submissions
  console.log("Seeding submissions...");
  const defaultServiceId = insertedServices?.[0]?.id || null;
  const subInserts = dummySubmissions.map((sub) => ({
    ticket_number: sub.ticketNumber,
    service_type_id: defaultServiceId,
    citizen_name: sub.citizenName,
    citizen_nik: sub.citizenNik,
    citizen_whatsapp: sub.citizenWhatsapp,
    status: sub.status,
    admin_notes: sub.adminNotes || null,
  }));
  const { error: err8 } = await insforge.database.from("submissions").insert(subInserts);
  if (err8) console.error("Error submissions:", err8);

  // 9. complaints
  console.log("Seeding complaints...");
  const compInserts = dummyComplaints.map((c) => ({
    ticket_number: c.ticketNumber,
    title: c.title,
    rt_rw_location: c.rtRwLocation,
    description: c.description,
    reporter_name: c.reporterName,
    reporter_whatsapp: c.reporterWhatsapp,
    status: c.status,
  }));
  const { error: err9 } = await insforge.database.from("complaints").insert(compInserts);
  if (err9) console.error("Error complaints:", err9);

  console.log("✅ INSForge Database Seeding Finished Successfully!");
}

seed().catch(console.error);
