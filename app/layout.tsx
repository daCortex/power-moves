import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Premium, modern type system — Geist (UI + display) + Geist Mono (technical).
const geist = Geist({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-mono-tech",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Power Moves — Electrical Engineering, Supply & EPC Turnkey Solutions",
  description:
    "Power Moves engineers, supplies and delivers the electrical backbone of modern industry — transformers, switchgear, substations and full EPC turnkey power systems. Licensed ABB supplier, ISO-certified.",
  keywords: [
    "electrical engineering",
    "EPC turnkey",
    "switchgear",
    "transformers",
    "substations",
    "power distribution",
    "industrial power",
    "ABB supplier",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-paper text-graphite">{children}</body>
    </html>
  );
}
