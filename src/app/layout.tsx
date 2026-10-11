import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Hectro One — Cahaya, Tanpa Tabir",
  description: "Maison kamera heritage. Hectro One adalah kamera mirrorless full-frame mewah berbodi brushed titanium dengan tali kulit cokelat tua.",
  openGraph: {
    title: "Hectro One — Cahaya, Tanpa Tabir",
    description: "Kamera mirrorless full-frame mewah berbodi brushed titanium. Dirakit satu teknisi ahli dari awal sampai akhir.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${fraunces.variable} ${plusJakartaSans.variable}`}>
      <body className="bg-canvas text-parchment antialiased selection:bg-brass selection:text-canvas">
        {children}
      </body>
    </html>
  );
}
