"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Landmark,
  LayoutDashboard,
  Newspaper,
  FileCheck,
  ShoppingBag,
  Users,
  Settings,
  LogOut,
  MessageSquareWarning,
  ExternalLink,
  Menu,
  X,
  Database,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const adminNavLinks = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/berita", label: "CMS Berita", icon: Newspaper },
  { href: "/admin/pengajuan", label: "Inbox Surat & Resi", icon: FileCheck },
  { href: "/admin/laporan", label: "Laporan Warga", icon: MessageSquareWarning },
  { href: "/admin/umkm-tempat", label: "UMKM & Tempat", icon: ShoppingBag },
  { href: "/admin/pegawai", label: "Aparatur Kelurahan", icon: Users },
  { href: "/admin/pengaturan", label: "Pengaturan Web", icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [adminEmail, setAdminEmail] = useState("admin@bubulak.go.id");

  // Skip layout framing for login page
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  useEffect(() => {
    const savedEmail = localStorage.getItem("admin_email");
    if (savedEmail) {
      setAdminEmail(savedEmail);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("admin_logged_in");
    localStorage.removeItem("admin_email");
    router.push("/admin/login");
  };

  return (
    <div className="flex min-h-screen bg-slate-100 font-sans text-slate-900">
      {/* ============================================ */}
      {/* DESKTOP SIDEBAR */}
      {/* ============================================ */}
      <aside className="hidden w-64 shrink-0 border-r border-slate-800 bg-slate-900 text-white lg:flex lg:flex-col">
        {/* Brand Header */}
        <div className="flex h-16 items-center gap-3 border-b border-slate-800 px-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 font-bold text-white shadow-md">
            <Landmark className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-base font-bold leading-tight text-white">
              Admin Bubulak
            </h1>
            <p className="text-xs text-emerald-400">Ruang Kerja Staf</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 space-y-1 p-4">
          {adminNavLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-base font-medium transition-all ${
                  isActive
                    ? "bg-emerald-600 text-white font-bold shadow-md"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <link.icon className="h-5 w-5" />
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Link to Public Web & Logout */}
        <div className="border-t border-slate-800 p-4 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            <ExternalLink className="h-4 w-4" />
            Lihat Web Publik
          </Link>
          <button
            onClick={handleLogout}
            className="flex h-11 w-full items-center gap-2 rounded-xl bg-red-950/60 px-4 text-sm font-bold text-red-300 transition-colors hover:bg-red-900 hover:text-white"
          >
            <LogOut className="h-4 w-4" />
            Keluar (Logout)
          </button>
        </div>
      </aside>

      {/* ============================================ */}
      {/* MAIN CONTENT AREA */}
      {/* ============================================ */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* Top Header */}
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6 shadow-sm">
          {/* Mobile Sidebar Toggle */}
          <div className="flex items-center gap-3 lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            >
              {mobileSidebarOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
            <span className="font-bold text-slate-900 text-base">
              Ruang Kerja Admin
            </span>
          </div>

          {/* Backend Status Indicator */}
          <div className="hidden items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800 border border-emerald-200 sm:flex">
            <Database className="h-3.5 w-3.5 text-emerald-600" />
            INSForge PostgreSQL Cloud Connected
          </div>

          {/* Right User Info */}
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-xs text-slate-400 font-semibold">Staf Aktif</p>
              <p className="text-sm font-bold text-slate-900 truncate max-w-[150px] sm:max-w-xs">
                {adminEmail}
              </p>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-white font-bold text-xs">
              <ShieldCheck className="h-5 w-5 text-emerald-400" />
            </div>
          </div>
        </header>

        {/* Mobile Navigation Sidebar Drawer */}
        {mobileSidebarOpen && (
          <div className="border-b border-slate-800 bg-slate-900 p-4 lg:hidden text-white space-y-1">
            {adminNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileSidebarOpen(false)}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-base font-medium ${
                  pathname === link.href
                    ? "bg-emerald-600 text-white font-bold"
                    : "text-slate-300 hover:bg-slate-800"
                }`}
              >
                <link.icon className="h-5 w-5" />
                {link.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-slate-800">
              <button
                onClick={handleLogout}
                className="flex h-11 w-full items-center gap-2 rounded-xl bg-red-900 px-4 text-sm font-bold text-white"
              >
                <LogOut className="h-4 w-4" />
                Keluar (Logout)
              </button>
            </div>
          </div>
        )}

        {/* Main Content View */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
