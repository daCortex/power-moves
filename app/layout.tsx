import type { Metadata } from "next";
import { Inter, Sora, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Display face — premium geometric grotesque (variable: full weight range)
const sora = Sora({
  variable: "--font-display-face",
  subsets: ["latin"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-mono-tech",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
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
      className={`${inter.variable} ${sora.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-paper text-graphite">{children}</body>
    </html>
  );
}
