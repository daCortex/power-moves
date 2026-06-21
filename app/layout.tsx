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
  title: "Power Moves — High-Voltage Transformers & ABB-Licensed Switchgear",
  description:
    "Power Moves manufactures power transformers up to 230 kV / 150 MVA and ABB-licensed switchgear — type-tested by DEKRA, KERI and Tecnalia, built and supported from Yangon.",
  keywords: [
    "power transformers",
    "230 kV transformer",
    "ABB switchgear",
    "DEKRA type test",
    "substations",
    "EPC turnkey",
    "Yangon",
    "Asia General Holding",
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
