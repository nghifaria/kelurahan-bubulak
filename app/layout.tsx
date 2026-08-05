import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Kelurahan Bubulak · Portal Informasi & Layanan Digital Resmi",
    template: "%s · Kelurahan Bubulak",
  },
  description:
    "Portal resmi pelayanan publik digital Kelurahan Bubulak, Kecamatan Bogor Barat, Kota Bogor. Cek syarat surat, ajukan layanan online tanpa antre, dan cek status resi ticket secara real-time.",
  keywords: [
    "Kelurahan Bubulak",
    "Bogor Barat",
    "Kota Bogor",
    "layanan kelurahan",
    "syarat surat",
    "pengajuan surat online",
    "administrasi kependudukan",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${plusJakartaSans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-slate-50 font-sans text-slate-900 selection:bg-emerald-100 selection:text-emerald-900">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
