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
