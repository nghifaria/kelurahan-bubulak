import { insforge } from "./insforge";
import {
  serviceTypes as fallbackServiceTypes,
  latestNews as fallbackNews,
  umkmList as fallbackUmkm,
  publicPlacesList as fallbackPlaces,
  staffMembersList as fallbackStaff,
  achievementsList as fallbackAchievements,
  siteSettings as fallbackSiteSettings,
  dummySubmissions as fallbackSubmissions,
  dummyComplaints as fallbackComplaints,
  ServiceType,
  NewsItem,
  UmkmItem,
  PublicPlaceItem,
  StaffMember,
  AchievementItem,
  SubmissionTicket,
  ComplaintTicket,
} from "./data";
import {
  Heart,
  FileText,
  Skull,
  Baby,
  Home,
  Users,
  MapPin,
  ShieldCheck,
  Briefcase,
  type LucideIcon,
} from "lucide-react";

// Helper to map string icon_name to LucideIcon component
const iconMap: Record<string, LucideIcon> = {
  Heart,
  FileText,
  Skull,
  Baby,
  Home,
  Users,
  MapPin,
  ShieldCheck,
  Briefcase,
};

export async function fetchSiteSettings() {
  try {
    const { data, error } = await insforge.database
      .from("site_settings")
      .select("*")
      .limit(1)
      .single();

    if (error || !data) return fallbackSiteSettings;

    return {
      villageName: data.village_name || fallbackSiteSettings.villageName,
      lurahName: data.lurah_name || fallbackSiteSettings.lurahName,
      officeAddress: data.office_address || fallbackSiteSettings.officeAddress,
      contactEmail: data.contact_email || fallbackSiteSettings.contactEmail,
      contactWhatsapp: data.contact_whatsapp || fallbackSiteSettings.contactWhatsapp,
      googleMapsUrl: data.google_maps_url || fallbackSiteSettings.googleMapsUrl,
      instagramUrl: data.instagram_url || fallbackSiteSettings.instagramUrl,
    };
  } catch {
    return fallbackSiteSettings;
  }
}

export async function fetchServiceTypes(): Promise<ServiceType[]> {
  try {
    const { data, error } = await insforge.database
      .from("service_types")
      .select("*")
      .order("display_order", { ascending: true });

    if (error || !data || data.length === 0) return fallbackServiceTypes;

    return data.map((item) => ({
      id: item.id,
      title: item.title,
      category: item.category || "Layanan Kependudukan",
      iconName: item.icon_name || "FileText",
      icon: iconMap[item.icon_name] || FileText,
      requirements: Array.isArray(item.requirements) ? item.requirements : [],
      description: item.description || "",
      displayOrder: item.display_order || 0,
    }));
  } catch {
    return fallbackServiceTypes;
  }
}

export async function fetchNews(): Promise<NewsItem[]> {
  try {
    const { data, error } = await insforge.database
      .from("news")
      .select("*")
      .eq("is_published", true)
      .order("published_at", { ascending: false });

    if (error || !data || data.length === 0) return fallbackNews;

    return data.map((item) => ({
      id: item.id,
      title: item.title,
      slug: item.slug,
      category: item.category || "Pengumuman",
      summary: item.summary || "",
      content: item.content || "",
      coverImageUrl: item.cover_image_url || "/placeholder-news-1.jpg",
      documentationUrls: Array.isArray(item.documentation_urls)
        ? item.documentation_urls
        : [],
      publishedAt: item.published_at ? item.published_at.slice(0, 10) : "",
      author: item.author || "Admin Kelurahan",
    }));
  } catch {
    return fallbackNews;
  }
}

export async function fetchNewsBySlug(slug: string): Promise<NewsItem | null> {
  try {
    const { data, error } = await insforge.database
      .from("news")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error || !data) {
      return fallbackNews.find((n) => n.slug === slug) || null;
    }

    return {
      id: data.id,
      title: data.title,
      slug: data.slug,
      category: data.category || "Pengumuman",
      summary: data.summary || "",
      content: data.content || "",
      coverImageUrl: data.cover_image_url || "/placeholder-news-1.jpg",
      documentationUrls: Array.isArray(data.documentation_urls)
        ? data.documentation_urls
        : [],
      publishedAt: data.published_at ? data.published_at.slice(0, 10) : "",
      author: data.author || "Admin Kelurahan",
    };
  } catch {
    return fallbackNews.find((n) => n.slug === slug) || null;
  }
}

export async function fetchUmkm(): Promise<UmkmItem[]> {
  try {
    const { data, error } = await insforge.database
      .from("umkm")
      .select("*")
      .eq("is_verified", true);

    if (error || !data || data.length === 0) return fallbackUmkm;

    return data.map((item) => ({
      id: item.id,
      businessName: item.business_name,
      category: item.category as UmkmItem["category"],
      ownerName: item.owner_name || "",
      description: item.description || "",
      photoUrl: item.photo_url || "/placeholder-umkm-1.jpg",
      whatsappContact: item.whatsapp_contact,
      address: item.address || "",
      googleMapsUrl: item.google_maps_url || undefined,
      isVerified: item.is_verified ?? true,
    }));
  } catch {
    return fallbackUmkm;
  }
}

export async function fetchPublicPlaces(): Promise<PublicPlaceItem[]> {
  try {
    const { data, error } = await insforge.database
      .from("public_places")
      .select("*");

    if (error || !data || data.length === 0) return fallbackPlaces;

    return data.map((item) => ({
      id: item.id,
      name: item.name,
      category: item.category as PublicPlaceItem["category"],
      address: item.address || "",
      googleMapsUrl: item.google_maps_url || "",
      description: item.description || undefined,
    }));
  } catch {
    return fallbackPlaces;
  }
}

export async function fetchStaffMembers(): Promise<StaffMember[]> {
  try {
    const { data, error } = await insforge.database
      .from("staff_members")
      .select("*")
      .order("display_order", { ascending: true });

    if (error || !data || data.length === 0) return fallbackStaff;

    return data.map((item) => ({
      id: item.id,
      name: item.name,
      position: item.position,
      photoUrl: item.photo_url || "/placeholder-staff-1.jpg",
      displayOrder: item.display_order || 1,
    }));
  } catch {
    return fallbackStaff;
  }
}

export async function fetchAchievements(): Promise<AchievementItem[]> {
  try {
    const { data, error } = await insforge.database
      .from("achievements")
      .select("*")
      .order("year", { ascending: false });

    if (error || !data || data.length === 0) return fallbackAchievements;

    return data.map((item) => ({
      id: item.id,
      title: item.title,
      year: item.year,
      description: item.description || "",
      photoUrl: item.photo_url || undefined,
    }));
  } catch {
    return fallbackAchievements;
  }
}

export async function createSubmissionInDb(submission: {
  ticketNumber: string;
  citizenName: string;
  citizenNik: string;
  citizenWhatsapp: string;
  citizenEmail?: string;
  serviceTypeId?: string;
  notes?: string;
}) {
  try {
    const { data, error } = await insforge.database.from("submissions").insert([
      {
        ticket_number: submission.ticketNumber,
        citizen_name: submission.citizenName,
        citizen_nik: submission.citizenNik,
        citizen_whatsapp: submission.citizenWhatsapp,
        citizen_email: submission.citizenEmail || null,
        service_type_id: submission.serviceTypeId || null,
        notes: submission.notes || null,
        status: "PENDING",
      },
    ]);

    return { data, error };
  } catch (err) {
    return { data: null, error: err };
  }
}

export async function createComplaintInDb(complaint: {
  ticketNumber: string;
  title: string;
  rtRwLocation: string;
  description: string;
  reporterName?: string;
  reporterWhatsapp?: string;
}) {
  try {
    const { data, error } = await insforge.database.from("complaints").insert([
      {
        ticket_number: complaint.ticketNumber,
        title: complaint.title,
        rt_rw_location: complaint.rtRwLocation,
        description: complaint.description,
        reporter_name: complaint.reporterName || null,
        reporter_whatsapp: complaint.reporterWhatsapp || null,
        status: "PENDING",
      },
    ]);

    return { data, error };
  } catch (err) {
    return { data: null, error: err };
  }
}

export async function fetchSubmissionByTicketOrNik(
  query: string
): Promise<SubmissionTicket | null> {
  try {
    const q = query.trim();
    const { data, error } = await insforge.database
      .from("submissions")
      .select("*")
      .or(`ticket_number.eq.${q},citizen_nik.eq.${q}`)
      .limit(1)
      .maybeSingle();

    if (error || !data) {
      return (
        fallbackSubmissions.find(
          (s) =>
            s.ticketNumber.toLowerCase() === q.toLowerCase() ||
            s.citizenNik.toLowerCase() === q.toLowerCase()
        ) || null
      );
    }

    return {
      ticketNumber: data.ticket_number,
      citizenName: data.citizen_name,
      citizenNik: data.citizen_nik,
      citizenWhatsapp: data.citizen_whatsapp,
      serviceTitle: "Surat Pengantar (Dokumen Kependudukan)",
      status: data.status as SubmissionTicket["status"],
      createdDate: data.created_at ? data.created_at.slice(0, 10) : "",
      adminNotes: data.admin_notes || undefined,
    };
  } catch {
    return (
      fallbackSubmissions.find(
        (s) =>
          s.ticketNumber.toLowerCase() === query.toLowerCase() ||
          s.citizenNik.toLowerCase() === query.toLowerCase()
      ) || null
    );
  }
}

export async function fetchComplaintByTicket(
  ticket: string
): Promise<ComplaintTicket | null> {
  try {
    const q = ticket.trim();
    const { data, error } = await insforge.database
      .from("complaints")
      .select("*")
      .eq("ticket_number", q)
      .limit(1)
      .maybeSingle();

    if (error || !data) {
      return (
        fallbackComplaints.find(
          (c) => c.ticketNumber.toLowerCase() === q.toLowerCase()
        ) || null
      );
    }

    return {
      ticketNumber: data.ticket_number,
      title: data.title,
      rtRwLocation: data.rt_rw_location,
      description: data.description,
      reporterName: data.reporter_name || "Anonim",
      reporterWhatsapp: data.reporter_whatsapp || "",
      status: data.status as ComplaintTicket["status"],
      createdDate: data.created_at ? data.created_at.slice(0, 10) : "",
    };
  } catch {
    return (
      fallbackComplaints.find(
        (c) => c.ticketNumber.toLowerCase() === ticket.toLowerCase()
      ) || null
    );
  }
}

// ===================================================
// INSFORGE STORAGE & ADMIN SERVICE HELPERS
// ===================================================

export async function uploadImageToInsForge(
  file: File
): Promise<{ url: string | null; error: any }> {
  try {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
    const filePath = `news/${fileName}`;

    const { data, error } = await insforge.storage
      .from("kelurahan-assets")
      .upload(filePath, file);

    if (error || !data) {
      console.error("Storage upload error:", error);
      return { url: null, error };
    }

    return { url: data.url, error: null };
  } catch (err) {
    return { url: null, error: err };
  }
}

export async function createNewsInDb(newsData: {
  title: string;
  category: string;
  summary: string;
  content: string;
  coverImageUrl: string;
  author?: string;
}) {
  try {
    const slug =
      newsData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "") +
      "-" +
      Math.floor(100 + Math.random() * 900);

    const { data, error } = await insforge.database.from("news").insert([
      {
        title: newsData.title,
        slug,
        category: newsData.category,
        summary: newsData.summary,
        content: newsData.content,
        cover_image_url: newsData.coverImageUrl,
        author: newsData.author || "Admin Kelurahan",
        is_published: true,
      },
    ]);
    return { data, error };
  } catch (err) {
    return { data: null, error: err };
  }
}

export async function updateNewsInDb(
  id: string,
  newsData: {
    title: string;
    category: string;
    summary: string;
    content: string;
    coverImageUrl?: string;
  }
) {
  try {
    const payload: any = {
      title: newsData.title,
      category: newsData.category,
      summary: newsData.summary,
      content: newsData.content,
      is_published: true,
    };
    if (newsData.coverImageUrl) {
      payload.cover_image_url = newsData.coverImageUrl;
    }

    const { data, error } = await insforge.database
      .from("news")
      .update(payload)
      .eq("id", id);
    return { data, error };
  } catch (err) {
    return { data: null, error: err };
  }
}

export async function deleteNewsInDb(id: string) {
  try {
    const { data, error } = await insforge.database
      .from("news")
      .delete()
      .eq("id", id);
    return { data, error };
  } catch (err) {
    return { data: null, error: err };
  }
}

export async function fetchDashboardStats() {
  try {
    const { data: subData } = await insforge.database.from("submissions").select("status");
    const { data: compData } = await insforge.database.from("complaints").select("status");
    const { data: newsData } = await insforge.database.from("news").select("id");

    const totalSubmissions = subData ? subData.length : 1;
    const pendingSubmissions = subData ? subData.filter((s) => s.status === "PENDING").length : 0;
    const totalComplaints = compData ? compData.length : 1;
    const pendingComplaints = compData ? compData.filter((c) => c.status === "PENDING").length : 0;
    const totalNews = newsData ? newsData.length : 3;

    return {
      totalSubmissions,
      pendingSubmissions,
      totalComplaints,
      pendingComplaints,
      totalNews,
    };
  } catch {
    return {
      totalSubmissions: 1,
      pendingSubmissions: 0,
      totalComplaints: 1,
      pendingComplaints: 0,
      totalNews: 3,
    };
  }
}

export interface DbSubmission {
  id: string;
  ticketNumber: string;
  citizenName: string;
  citizenNik: string;
  citizenWhatsapp: string;
  citizenEmail?: string;
  serviceTitle: string;
  notes?: string;
  attachmentUrls?: string[];
  status: "PENDING" | "PROCESSED" | "COMPLETED" | "REJECTED";
  adminNotes?: string;
  createdAt: string;
}

export async function fetchAllSubmissionsFromDb(): Promise<DbSubmission[]> {
  try {
    const { data, error } = await insforge.database
      .from("submissions")
      .select("*, service_types(title)")
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) {
      return fallbackSubmissions.map((s) => ({
        id: s.ticketNumber,
        ticketNumber: s.ticketNumber,
        citizenName: s.citizenName,
        citizenNik: s.citizenNik,
        citizenWhatsapp: s.citizenWhatsapp,
        serviceTitle: s.serviceTitle,
        status: s.status,
        adminNotes: s.adminNotes,
        createdAt: s.createdDate,
      }));
    }

    return data.map((item: any) => ({
      id: item.id,
      ticketNumber: item.ticket_number,
      citizenName: item.citizen_name,
      citizenNik: item.citizen_nik,
      citizenWhatsapp: item.citizen_whatsapp,
      citizenEmail: item.citizen_email || undefined,
      serviceTitle: item.service_types?.title || "Surat Pengantar / Administrasi",
      notes: item.notes || undefined,
      attachmentUrls: Array.isArray(item.attachment_urls) ? item.attachment_urls : [],
      status: item.status as DbSubmission["status"],
      adminNotes: item.admin_notes || undefined,
      createdAt: item.created_at ? item.created_at.slice(0, 10) : "",
    }));
  } catch {
    return fallbackSubmissions.map((s) => ({
      id: s.ticketNumber,
      ticketNumber: s.ticketNumber,
      citizenName: s.citizenName,
      citizenNik: s.citizenNik,
      citizenWhatsapp: s.citizenWhatsapp,
      serviceTitle: s.serviceTitle,
      status: s.status,
      adminNotes: s.adminNotes,
      createdAt: s.createdDate,
    }));
  }
}

export async function updateSubmissionStatusInDb(
  id: string,
  status: "PENDING" | "PROCESSED" | "COMPLETED" | "REJECTED",
  adminNotes: string
) {
  try {
    const { data, error } = await insforge.database
      .from("submissions")
      .update({
        status,
        admin_notes: adminNotes || null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);
    return { data, error };
  } catch (err) {
    return { data: null, error: err };
  }
}

export interface DbComplaint {
  id: string;
  ticketNumber: string;
  title: string;
  rtRwLocation: string;
  description: string;
  photoUrl?: string;
  reporterName: string;
  reporterWhatsapp?: string;
  status: "PENDING" | "IN_PROGRESS" | "RESOLVED";
  isPublic: boolean;
  createdAt: string;
}

export async function fetchAllComplaintsFromDb(): Promise<DbComplaint[]> {
  try {
    const { data, error } = await insforge.database
      .from("complaints")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) {
      return fallbackComplaints.map((c) => ({
        id: c.ticketNumber,
        ticketNumber: c.ticketNumber,
        title: c.title,
        rtRwLocation: c.rtRwLocation,
        description: c.description,
        reporterName: c.reporterName,
        reporterWhatsapp: c.reporterWhatsapp,
        status: c.status,
        isPublic: true,
        createdAt: c.createdDate,
      }));
    }

    return data.map((item: any) => ({
      id: item.id,
      ticketNumber: item.ticket_number,
      title: item.title,
      rtRwLocation: item.rt_rw_location,
      description: item.description,
      photoUrl: item.photo_url || undefined,
      reporterName: item.reporter_name || "Anonim",
      reporterWhatsapp: item.reporter_whatsapp || undefined,
      status: item.status as DbComplaint["status"],
      isPublic: item.is_public ?? false,
      createdAt: item.created_at ? item.created_at.slice(0, 10) : "",
    }));
  } catch {
    return fallbackComplaints.map((c) => ({
      id: c.ticketNumber,
      ticketNumber: c.ticketNumber,
      title: c.title,
      rtRwLocation: c.rtRwLocation,
      description: c.description,
      reporterName: c.reporterName,
      reporterWhatsapp: c.reporterWhatsapp,
      status: c.status,
      isPublic: true,
      createdAt: c.createdDate,
    }));
  }
}

export async function updateComplaintStatusInDb(
  id: string,
  status: "PENDING" | "IN_PROGRESS" | "RESOLVED",
  isPublic: boolean
) {
  try {
    const { data, error } = await insforge.database
      .from("complaints")
      .update({
        status,
        is_public: isPublic,
      })
      .eq("id", id);
    return { data, error };
  } catch (err) {
    return { data: null, error: err };
  }
}

// ===================================================
// UMKM & PUBLIC PLACES SERVICES
// ===================================================

export async function createUmkmInDb(umkmData: {
  businessName: string;
  category: string;
  ownerName: string;
  description: string;
  photoUrl: string;
  whatsappContact: string;
  address: string;
  googleMapsUrl?: string;
  isVerified: boolean;
}) {
  try {
    const { data, error } = await insforge.database.from("umkm").insert([
      {
        business_name: umkmData.businessName,
        category: umkmData.category,
        owner_name: umkmData.ownerName,
        description: umkmData.description,
        photo_url: umkmData.photoUrl,
        whatsapp_contact: umkmData.whatsappContact,
        address: umkmData.address,
        google_maps_url: umkmData.googleMapsUrl || null,
        is_verified: umkmData.isVerified,
      },
    ]);
    return { data, error };
  } catch (err) {
    return { data: null, error: err };
  }
}

export async function updateUmkmInDb(
  id: string,
  umkmData: {
    businessName: string;
    category: string;
    ownerName: string;
    description: string;
    photoUrl?: string;
    whatsappContact: string;
    address: string;
    googleMapsUrl?: string;
    isVerified: boolean;
  }
) {
  try {
    const payload: any = {
      business_name: umkmData.businessName,
      category: umkmData.category,
      owner_name: umkmData.ownerName,
      description: umkmData.description,
      whatsapp_contact: umkmData.whatsappContact,
      address: umkmData.address,
      google_maps_url: umkmData.googleMapsUrl || null,
      is_verified: umkmData.isVerified,
    };
    if (umkmData.photoUrl) {
      payload.photo_url = umkmData.photoUrl;
    }

    const { data, error } = await insforge.database
      .from("umkm")
      .update(payload)
      .eq("id", id);
    return { data, error };
  } catch (err) {
    return { data: null, error: err };
  }
}

export async function deleteUmkmInDb(id: string) {
  try {
    const { data, error } = await insforge.database
      .from("umkm")
      .delete()
      .eq("id", id);
    return { data, error };
  } catch (err) {
    return { data: null, error: err };
  }
}

export async function createPublicPlaceInDb(placeData: {
  name: string;
  category: string;
  address: string;
  googleMapsUrl: string;
  description?: string;
}) {
  try {
    const { data, error } = await insforge.database.from("public_places").insert([
      {
        name: placeData.name,
        category: placeData.category,
        address: placeData.address,
        google_maps_url: placeData.googleMapsUrl,
        description: placeData.description || null,
      },
    ]);
    return { data, error };
  } catch (err) {
    return { data: null, error: err };
  }
}

export async function updatePublicPlaceInDb(
  id: string,
  placeData: {
    name: string;
    category: string;
    address: string;
    googleMapsUrl: string;
    description?: string;
  }
) {
  try {
    const { data, error } = await insforge.database
      .from("public_places")
      .update({
        name: placeData.name,
        category: placeData.category,
        address: placeData.address,
        google_maps_url: placeData.googleMapsUrl,
        description: placeData.description || null,
      })
      .eq("id", id);
    return { data, error };
  } catch (err) {
    return { data: null, error: err };
  }
}

export async function deletePublicPlaceInDb(id: string) {
  try {
    const { data, error } = await insforge.database
      .from("public_places")
      .delete()
      .eq("id", id);
    return { data, error };
  } catch (err) {
    return { data: null, error: err };
  }
}

// ===================================================
// STAFF MEMBERS SERVICES
// ===================================================

export async function createStaffMemberInDb(staffData: {
  name: string;
  position: string;
  photoUrl: string;
  displayOrder: number;
}) {
  try {
    const { data, error } = await insforge.database.from("staff_members").insert([
      {
        name: staffData.name,
        position: staffData.position,
        photo_url: staffData.photoUrl,
        display_order: staffData.displayOrder,
      },
    ]);
    return { data, error };
  } catch (err) {
    return { data: null, error: err };
  }
}

export async function updateStaffMemberInDb(
  id: string,
  staffData: {
    name: string;
    position: string;
    photoUrl?: string;
    displayOrder: number;
  }
) {
  try {
    const payload: any = {
      name: staffData.name,
      position: staffData.position,
      display_order: staffData.displayOrder,
    };
    if (staffData.photoUrl) {
      payload.photo_url = staffData.photoUrl;
    }

    const { data, error } = await insforge.database
      .from("staff_members")
      .update(payload)
      .eq("id", id);
    return { data, error };
  } catch (err) {
    return { data: null, error: err };
  }
}

export async function deleteStaffMemberInDb(id: string) {
  try {
    const { data, error } = await insforge.database
      .from("staff_members")
      .delete()
      .eq("id", id);
    return { data, error };
  } catch (err) {
    return { data: null, error: err };
  }
}

// ===================================================
// SITE SETTINGS SERVICES
// ===================================================

export async function updateSiteSettingsInDb(settingsData: {
  villageName?: string;
  lurahName: string;
  officeAddress: string;
  contactEmail: string;
  contactWhatsapp: string;
  googleMapsUrl: string;
  instagramUrl?: string;
  tiktokUrl?: string;
}) {
  try {
    // Check if site_settings row exists
    const { data: existing } = await insforge.database
      .from("site_settings")
      .select("id")
      .limit(1)
      .maybeSingle();

    const payload = {
      village_name: settingsData.villageName || "Kelurahan Bubulak",
      lurah_name: settingsData.lurahName,
      office_address: settingsData.officeAddress,
      contact_email: settingsData.contactEmail,
      contact_whatsapp: settingsData.contactWhatsapp,
      google_maps_url: settingsData.googleMapsUrl,
      instagram_url: settingsData.instagramUrl || null,
      tiktok_url: settingsData.tiktokUrl || null,
      updated_at: new Date().toISOString(),
    };

    if (existing) {
      const { data, error } = await insforge.database
        .from("site_settings")
        .update(payload)
        .eq("id", existing.id);
      return { data, error };
    } else {
      const { data, error } = await insforge.database
        .from("site_settings")
        .insert([payload]);
      return { data, error };
    }
  } catch (err) {
    return { data: null, error: err };
  }
}

// ===================================================
// ACHIEVEMENTS SERVICES
// ===================================================

export async function createAchievementInDb(achievementData: {
  title: string;
  year: number;
  description: string;
  photoUrl?: string;
}) {
  try {
    const { data, error } = await insforge.database.from("achievements").insert([
      {
        title: achievementData.title,
        year: achievementData.year,
        description: achievementData.description,
        photo_url: achievementData.photoUrl || null,
      },
    ]);
    return { data, error };
  } catch (err) {
    return { data: null, error: err };
  }
}

export async function updateAchievementInDb(
  id: string,
  achievementData: {
    title: string;
    year: number;
    description: string;
    photoUrl?: string;
  }
) {
  try {
    const payload: any = {
      title: achievementData.title,
      year: achievementData.year,
      description: achievementData.description,
    };
    if (achievementData.photoUrl) {
      payload.photo_url = achievementData.photoUrl;
    }

    const { data, error } = await insforge.database
      .from("achievements")
      .update(payload)
      .eq("id", id);
    return { data, error };
  } catch (err) {
    return { data: null, error: err };
  }
}

export async function deleteAchievementInDb(id: string) {
  try {
    const { data, error } = await insforge.database
      .from("achievements")
      .delete()
      .eq("id", id);
    return { data, error };
  } catch (err) {
    return { data: null, error: err };
  }
}




