import {
  Landmark,
  MapPin,
  Mail,
  Globe,
  MessageSquare,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { siteSettings } from "@/lib/data";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t-2 border-emerald-200 bg-slate-900 text-slate-200">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Branding & Address */}
          <div className="lg:col-span-2">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-lg">
                <Landmark className="h-7 w-7" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">
                  {siteSettings.villageName}
                </h3>
                <p className="text-sm text-emerald-400">
                  Kecamatan Bogor Barat · Kota Bogor
                </p>
              </div>
            </div>
            <div className="mb-6 flex items-start gap-2 text-base text-slate-300">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-emerald-500" />
              <p>{siteSettings.officeAddress}</p>
            </div>

            {/* Google Maps Embed */}
            <div className="overflow-hidden rounded-xl border border-slate-700 shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.279534855508!2d106.77264231432858!3d-6.619856095233186!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69c5d23b9f2b2d%3A0x4027a76e3530d40!2sKelurahan%20Bubulak!5e0!3m2!1sid!2sid!4v1690000000000!5m2!1sid!2sid"
                width="100%"
                height="180"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Peta Lokasi Kantor Kelurahan Bubulak"
                className="grayscale-[30%]"
              />
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="mb-4 text-lg font-bold text-white">Menu Cepat</h4>
            <ul className="space-y-3">
              {[
                { label: "Beranda", href: "/" },
                { label: "Syarat Surat", href: "/layanan" },
                { label: "Ajukan Surat Online", href: "/ajukan" },
                { label: "Cek Status Resi", href: "/cek-resi" },
                { label: "Berita & Pengumuman", href: "/berita" },
                { label: "Peta UMKM", href: "/umkm" },
                { label: "Profil Kelurahan", href: "/profil" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-base text-slate-300 transition-colors hover:text-emerald-400"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h4 className="mb-4 text-lg font-bold text-white">
              Hubungi Kami
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href={`https://wa.me/${siteSettings.contactWhatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-lg p-2 text-base text-slate-300 transition-colors hover:bg-slate-800 hover:text-emerald-400"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-700/50">
                    <MessageSquare className="h-5 w-5 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">WhatsApp</p>
                    <p className="font-medium">0812-3456-7890</p>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteSettings.contactEmail}`}
                  className="flex items-center gap-3 rounded-lg p-2 text-base text-slate-300 transition-colors hover:bg-slate-800 hover:text-emerald-400"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-700/50">
                    <Mail className="h-5 w-5 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Email</p>
                    <p className="font-medium text-sm">
                      {siteSettings.contactEmail}
                    </p>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href={siteSettings.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-lg p-2 text-base text-slate-300 transition-colors hover:bg-slate-800 hover:text-emerald-400"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-700/50">
                    <Globe className="h-5 w-5 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Instagram</p>
                    <p className="font-medium">@kel.bubulak</p>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-700/50 bg-slate-950">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-4 text-sm text-slate-400 sm:flex-row sm:px-6 lg:px-8">
          <p>
            &copy; {currentYear} {siteSettings.villageName} · Kota Bogor
          </p>
          <p className="text-slate-500">
            Dibangun dengan ❤️ oleh Tim KKN
          </p>
        </div>
      </div>
    </footer>
  );
}
