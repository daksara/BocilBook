import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Baloo_2 } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const baloo = Baloo_2({
  variable: "--font-baloo",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "BocilBook — Bikin buku anak dengan AI",
  description:
    "BocilBook membantu kamu membuat workbook dan activity book anak secara otomatis dalam hitungan menit. Tracing, matching, counting, coloring, dan lainnya — dibuat AI, siap dicetak.",
  keywords: [
    "BocilBook",
    "AI kids book generator",
    "workbook anak",
    "activity book anak",
    "worksheet anak",
    "lembar belajar anak",
  ],
};

export const viewport = {
  themeColor: "#f2f0ec",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${plusJakarta.variable} ${baloo.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
