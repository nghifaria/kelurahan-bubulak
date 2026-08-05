import {
  Landmark,
  MapPin,
  Mail,
  Globe,
  MessageSquare,
  ExternalLink,
  PhoneCall,
  Clock,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { siteSettings } from "@/lib/data";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-200">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Branding & Address */}
          <div className="lg:col-span-2">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-700 text-white shadow-sm ring-1 ring-emerald-600">
                <Landmark className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-white tracking-tight">
                  {siteSettings.villageName}
                </h3>
                <p className="text-xs font-semibold text-emerald-400">
                  Kecamatan Bogor Barat · Kota Bogor, Jawa Barat
                </p>
              </div>
            </div>

            <p className="mb-4 text-sm leading-relaxed text-slate-400 max-w-lg">
              {siteSettings.overviewText}
            </p>

            <div className="mb-6 flex items-start gap-2.5 text-sm text-slate-300">
              <MapPin className="mt-1 h-4 w-4 shrink-0 text-emerald-500" />
              <p>{siteSettings.officeAddress}</p>
            </div>

            {/* Google Maps Embed */}
            <div className="overflow-hidden rounded-2xl border border-slate-800 shadow-sm">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.279534855508!2d106.77264231432858!3d-6.619856095233186!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69c5d23b9f2b2d%3A0x4027a76e3530d40!2sKelurahan%20Bubulak!5e0!3m2!1sid!2sid!4v1690000000000!5m2!1sid!2sid"
                width="100%"
                height="160"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Peta Lokasi Kantor Kelurahan Bubulak"
                className="grayscale opacity-80 hover:opacity-100 transition-opacity"
              />
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="mb-4 text-base font-extrabold text-white uppercase tracking-wider">
              Navigasi Layanan
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "Beranda Utama", href: "/" },
                { label: "Syarat Surat Kependudukan", href: "/layanan" },
                { label: "Ajukan Surat Online", href: "/ajukan" },
                { label: "Cek Status Resi Ticket", href: "/cek-resi" },
                { label: "Berita & Pengumuman", href: "/berita" },
                { label: "Direktori UMKM Bubulak", href: "/umkm" },
                { label: "Profil & Aparatur Kelurahan", href: "/profil" },
                { label: "Form Pengaduan Warga", href: "/laporan" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-sm text-slate-300 transition-colors hover:text-emerald-400"
                  >
                    <ExternalLink className="h-3.5 w-3.5 text-slate-500" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact & Emergency */}
          <div>
            <h4 className="mb-4 text-base font-extrabold text-white uppercase tracking-wider">
              Jam Kerja & Kontak Darurat
            </h4>

            {/* Operational Hours */}
            <div className="mb-4 rounded-xl border border-slate-800 bg-slate-900/80 p-3">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 mb-1">
                <Clock className="h-4 w-4" />
                <span>Pelayanan Kantor (WIB)</span>
              </div>
              <p className="text-xs text-slate-300">
                Senin - Jumat: 08.00 - 15.00 WIB
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Sabtu, Minggu & Hari Libur: Tutup
              </p>
            </div>

            {/* Emergency Contacts */}
            <div className="space-y-2.5">
              <a
                href={`https://wa.me/${siteSettings.contactWhatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900 p-2.5 text-slate-200 transition-colors hover:border-emerald-700 hover:text-white"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-700 text-white shrink-0">
                  <MessageSquare className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[11px] font-medium text-slate-400">WhatsApp Resmi</p>
                  <p className="text-xs font-bold font-mono">0812-3456-7890</p>
                </div>
              </a>

              <a
                href="tel:112"
                className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900 p-2.5 text-slate-200 transition-colors hover:border-red-600 hover:text-white"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-600 text-white shrink-0">
                  <PhoneCall className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[11px] font-medium text-slate-400">Panggilan Darurat Kota Bogor</p>
                  <p className="text-xs font-bold font-mono">Call Center 112</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="border-t border-slate-900 bg-black">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-slate-400 sm:flex-row sm:px-6 lg:px-8">
          <p>
            &copy; {currentYear} {siteSettings.villageName} · Pemerintah Kota Bogor
          </p>
          <div className="flex items-center gap-4 text-slate-500">
            <span>Standar Aksesibilitas WCAG AA</span>
            <span>·</span>
            <Link href="/admin/login" className="hover:text-emerald-400 font-semibold">
              CMS Admin Workspace
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
