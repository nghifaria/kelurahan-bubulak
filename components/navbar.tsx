"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Landmark,
  Menu,
  X,
  ClipboardList,
  Newspaper,
  ShoppingBag,
  Users,
  FileText,
  MessageSquare,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/layanan", label: "Syarat Surat", icon: ClipboardList },
  { href: "/ajukan", label: "Ajukan Surat", icon: FileText },
  { href: "/cek-resi", label: "Cek Resi", icon: Search },
  { href: "/berita", label: "Berita", icon: Newspaper },
  { href: "/umkm", label: "UMKM", icon: ShoppingBag },
  { href: "/profil", label: "Profil", icon: Users },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo / Branding */}
        <Link
          href="/"
          className="flex items-center gap-3 transition-transform hover:scale-[1.01]"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-700 text-white shadow-sm ring-1 ring-emerald-800">
            <Landmark className="h-6 w-6" />
          </div>
          <div>
            <p className="text-lg font-extrabold leading-tight text-slate-900 tracking-tight">
              Kelurahan Bubulak
            </p>
            <p className="text-xs font-semibold text-emerald-700">
              Kec. Bogor Barat · Kota Bogor
            </p>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden items-center gap-1.5 lg:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-sm font-bold transition-all min-h-[44px] ${
                  isActive
                    ? "bg-emerald-50 text-emerald-800 border border-emerald-200/80 shadow-xs"
                    : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <link.icon className={`h-4 w-4 ${isActive ? "text-emerald-700" : "text-slate-500"}`} />
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* WhatsApp CTA - Desktop */}
        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="https://wa.me/6281234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center gap-2 rounded-xl bg-emerald-700 px-5 text-sm font-bold text-white shadow-sm transition-all hover:bg-emerald-800 min-h-[44px]"
          >
            <MessageSquare className="h-4 w-4" />
            Kontak Kelurahan
          </a>
        </div>

        {/* Mobile Menu Button (44x44px minimum touch target) */}
        <Button
          variant="ghost"
          size="icon"
          className="h-12 w-12 rounded-xl border border-slate-200 lg:hidden min-h-[44px] min-w-[44px]"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Tutup menu" : "Buka menu"}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6 text-slate-800" />
          ) : (
            <Menu className="h-6 w-6 text-slate-800" />
          )}
        </Button>
      </nav>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="border-t border-slate-200 bg-white lg:hidden">
          <div className="mx-auto max-w-7xl space-y-1.5 px-4 pb-5 pt-3">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-3.5 rounded-xl px-4 py-3 text-base font-bold transition-colors min-h-[48px] ${
                    isActive
                      ? "bg-emerald-50 text-emerald-900 border border-emerald-200/80"
                      : "text-slate-800 hover:bg-slate-50"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <link.icon className={`h-5 w-5 ${isActive ? "text-emerald-700" : "text-slate-500"}`} />
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-2">
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 text-base font-bold text-white shadow-sm min-h-[48px]"
              >
                <MessageSquare className="h-5 w-5" />
                Kontak WhatsApp Kelurahan
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
