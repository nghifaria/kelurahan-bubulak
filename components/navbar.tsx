"use client";

import Link from "next/link";
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
  { href: "/berita", label: "Berita", icon: Newspaper },
  { href: "/umkm", label: "UMKM", icon: ShoppingBag },
  { href: "/profil", label: "Profil", icon: Users },
  { href: "/ajukan", label: "Ajukan Surat", icon: FileText },
  { href: "/cek-resi", label: "Cek Resi", icon: Search },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-emerald-200 bg-white/95 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo / Branding */}
        <Link
          href="/"
          className="flex items-center gap-3 transition-transform hover:scale-[1.02]"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-700 text-white shadow-md">
            <Landmark className="h-6 w-6" />
          </div>
          <div className="hidden sm:block">
            <p className="text-lg font-bold leading-tight text-slate-900">
              Kelurahan Bubulak
            </p>
            <p className="text-xs font-medium text-emerald-700">
              Kota Bogor · Jawa Barat
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-[15px] font-medium text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-800"
            >
              <link.icon className="h-4 w-4" />
              {link.label}
            </Link>
          ))}
        </div>

        {/* WhatsApp CTA - Desktop */}
        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="https://wa.me/6281234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center gap-2 rounded-xl bg-emerald-700 px-5 text-base font-semibold text-white shadow-md transition-all hover:bg-emerald-800 hover:shadow-lg"
          >
            <MessageSquare className="h-4 w-4" />
            Hubungi Kami
          </a>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="h-12 w-12 lg:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Tutup menu" : "Buka menu"}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
      </nav>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-emerald-100 bg-white lg:hidden">
          <div className="mx-auto max-w-7xl space-y-1 px-4 pb-4 pt-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-3 rounded-xl px-4 py-3.5 text-base font-medium text-slate-800 transition-colors hover:bg-emerald-50 hover:text-emerald-800"
                onClick={() => setMobileMenuOpen(false)}
              >
                <link.icon className="h-5 w-5 text-emerald-700" />
                {link.label}
              </Link>
            ))}
            <div className="pt-2">
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 text-base font-semibold text-white shadow-md"
              >
                <MessageSquare className="h-5 w-5" />
                Hubungi via WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
