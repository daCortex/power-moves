import type { Metadata } from "next";
import { Inter, Archivo } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Power Moves — Electrical Engineering, Supply & EPC Turnkey Solutions",
  description:
    "Power Moves engineers, supplies and delivers the electrical backbone of modern industry — transformers, switchgear, substations and full EPC turnkey power systems.",
  keywords: [
    "electrical engineering",
    "EPC turnkey",
    "switchgear",
    "transformers",
    "substations",
    "power distribution",
    "industrial power",
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
      className={`${inter.variable} ${archivo.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-ink text-foreground">{children}</body>
    </html>
  );
}
