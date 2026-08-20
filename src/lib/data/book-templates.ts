import type { BookConfig } from "@/types";

export interface BookTemplate {
  id: string;
  name: string;
  tagline: string;
  marketplaceNote: string;
  config: BookConfig;
}

/**
 * Curated, fully pre-configured book presets — topic, activities, style, and
 * page count already tuned to produce a clean, cohesive PDF worth selling.
 * Only uses book types with real page templates (see page-renderer.tsx);
 * "story-book" is intentionally excluded since it has no dedicated
 * narrative template yet and would just fall back to generic activity
 * pages, which isn't something we want to present as sell-ready.
 */
export const BOOK_TEMPLATES: BookTemplate[] = [
  {
    id: "abc-tracing-starter",
    name: "ABC Tracing Starter Pack",
    tagline: "Format paling dicari di kategori Alphabet & Handwriting — rapi dan familiar untuk pembeli.",
    marketplaceNote: "Gumroad · Payhip · Etsy Digital Download",
    config: {
      bookType: "workbook",
      topic: "Mengenal huruf A-Z untuk anak usia 3-5 tahun",
      ageRange: "3-5",
      language: "id",
      numPages: 30,
      difficulty: "easy",
      style: "cute-cartoon",
      activities: ["tracing", "letter-recognition", "coloring", "matching"],
      aiSelectActivities: false,
      additionalInstructions: "Gunakan karakter hewan yang lucu dan bahasa yang sederhana untuk anak prasekolah.",
    },
  },
  {
    id: "number-mastery",
    name: "Number Mastery 1-10",
    tagline: "Paket berhitung klasik yang selalu dicari orang tua dan guru TK/PAUD.",
    marketplaceNote: "Gumroad · Payhip · TPT",
    config: {
      bookType: "workbook",
      topic: "Belajar berhitung angka 1 sampai 10",
      ageRange: "3-5",
      language: "id",
      numPages: 20,
      difficulty: "easy",
      style: "colorful",
      activities: ["counting", "tracing", "matching", "coloring"],
      aiSelectActivities: false,
    },
  },
  {
    id: "busy-book-bundle",
    name: "Busy Book Activity Bundle",
    tagline: "Campuran aktivitas variatif — favorit kategori Quiet Time / Busy Book.",
    marketplaceNote: "Gumroad · Etsy Digital Download",
    config: {
      bookType: "activity-book",
      topic: "Kumpulan aktivitas seru: mencari gambar, mencocokkan, gunting tempel, dan labirin",
      ageRange: "5-7",
      language: "id",
      numPages: 30,
      difficulty: "medium",
      style: "educational",
      activities: ["find-circle", "matching", "cut-paste", "maze"],
      aiSelectActivities: false,
    },
  },
  {
    id: "animal-kingdom-coloring",
    name: "Animal Kingdom Coloring Book",
    tagline: "Tema hewan itu evergreen — laris di semua marketplace digital download.",
    marketplaceNote: "Gumroad · Payhip · Etsy",
    config: {
      bookType: "coloring-book",
      topic: "Halaman mewarnai hewan-hewan lucu dari darat, air, dan udara",
      ageRange: "3-5",
      language: "id",
      numPages: 20,
      difficulty: "easy",
      style: "soft-pastel",
      activities: ["coloring"],
      aiSelectActivities: false,
    },
  },
  {
    id: "preschool-readiness",
    name: "Preschool Readiness Pack",
    tagline: "Paket persiapan TK yang komprehensif — ramai dicari menjelang tahun ajaran baru.",
    marketplaceNote: "Gumroad · Payhip · TPT",
    config: {
      bookType: "learning-book",
      topic: "Persiapan masuk TK: mengenal huruf, angka, bentuk, dan warna dasar",
      ageRange: "2-3",
      language: "id",
      numPages: 20,
      difficulty: "easy",
      style: "minimal",
      activities: ["letter-recognition", "counting", "matching", "coloring"],
      aiSelectActivities: false,
    },
  },
  {
    id: "ramadan-activity",
    name: "Ramadan Fun Activity Book",
    tagline: "Konten musiman bertema Ramadan — permintaan tinggi setiap tahun.",
    marketplaceNote: "Gumroad · Payhip",
    config: {
      bookType: "activity-book",
      topic: "Aktivitas seru bertema Ramadan untuk anak",
      ageRange: "5-7",
      language: "id",
      numPages: 20,
      difficulty: "medium",
      style: "islamic-kids",
      activities: ["tracing", "coloring", "matching", "find-circle"],
      aiSelectActivities: false,
      additionalInstructions: "Tambahkan sentuhan islami seperti doa atau adab di beberapa halaman.",
    },
  },
  {
    id: "shapes-colors-mini",
    name: "Shapes & Colors Mini Book",
    tagline: "Buku ringkas untuk balita — harga terjangkau, cocok jadi produk entry-point.",
    marketplaceNote: "Gumroad · Etsy Digital Download",
    config: {
      bookType: "learning-book",
      topic: "Mengenal bentuk dan warna dasar",
      ageRange: "2-3",
      language: "id",
      numPages: 10,
      difficulty: "easy",
      style: "cute-cartoon",
      activities: ["coloring", "matching", "find-circle"],
      aiSelectActivities: false,
    },
  },
  {
    id: "homeschool-mega-bundle",
    name: "Homeschool Mega Bundle",
    tagline: "Bundle 50 halaman lengkap — cocok dijual dengan harga premium.",
    marketplaceNote: "Gumroad · Payhip · TPT",
    config: {
      bookType: "workbook",
      topic: "Paket lengkap belajar huruf, angka, dan bentuk untuk homeschooling",
      ageRange: "3-5",
      language: "id",
      numPages: 50,
      difficulty: "medium",
      style: "educational",
      activities: ["tracing", "counting", "letter-recognition", "matching", "coloring", "find-circle"],
      aiSelectActivities: false,
    },
  },
];
