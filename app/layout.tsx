import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Kelurahan Bubulak · Portal Informasi & Layanan Digital",
    template: "%s · Kelurahan Bubulak",
  },
  description:
    "Portal resmi informasi dan layanan digital Kelurahan Bubulak, Kecamatan Bogor Barat, Kota Bogor. Cek syarat surat, ajukan layanan online, dan temukan UMKM lokal.",
  keywords: [
    "Kelurahan Bubulak",
    "Bogor",
    "layanan kelurahan",
    "syarat surat",
    "administrasi kependudukan",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
