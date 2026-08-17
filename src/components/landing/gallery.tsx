import { generateFullBook } from "@/lib/ai/generate-book";
import { PageRenderer } from "@/components/templates";
import type { BookConfig } from "@/types";

const GALLERY_TOPICS: { label: string; config: BookConfig; pickIndex: number }[] = [
  {
    label: "Mengenal Huruf",
    config: { bookType: "workbook", topic: "huruf abc", ageRange: "3-5", language: "id", numPages: 10, difficulty: "easy", style: "cute-cartoon", activities: ["tracing"], aiSelectActivities: false },
    pickIndex: 1,
  },
  {
    label: "Belajar Angka",
    config: { bookType: "workbook", topic: "angka berhitung", ageRange: "3-5", language: "id", numPages: 10, difficulty: "easy", style: "colorful", activities: ["counting"], aiSelectActivities: false },
    pickIndex: 1,
  },
  {
    label: "Hewan",
    config: { bookType: "activity-book", topic: "hewan", ageRange: "5-7", language: "id", numPages: 10, difficulty: "medium", style: "soft-pastel", activities: ["animal-classification"], aiSelectActivities: false },
    pickIndex: 1,
  },
  {
    label: "Warna",
    config: { bookType: "coloring-book", topic: "warna", ageRange: "3-5", language: "id", numPages: 10, difficulty: "easy", style: "colorful", activities: ["coloring"], aiSelectActivities: false },
    pickIndex: 1,
  },
  {
    label: "Bentuk",
    config: { bookType: "learning-book", topic: "bentuk", ageRange: "3-5", language: "id", numPages: 10, difficulty: "easy", style: "minimal", activities: ["puzzle"], aiSelectActivities: false },
    pickIndex: 1,
  },
  {
    label: "Ramadan",
    config: { bookType: "activity-book", topic: "ramadan puasa", ageRange: "5-7", language: "id", numPages: 10, difficulty: "medium", style: "islamic-kids", activities: ["find-circle"], aiSelectActivities: false },
    pickIndex: 1,
  },
  {
    label: "Kendaraan",
    config: { bookType: "workbook", topic: "kendaraan transportasi", ageRange: "3-5", language: "id", numPages: 10, difficulty: "easy", style: "educational", activities: ["matching"], aiSelectActivities: false },
    pickIndex: 1,
  },
  {
    label: "Bahasa Inggris",
    config: { bookType: "workbook", topic: "english alphabet", ageRange: "5-7", language: "en", numPages: 10, difficulty: "medium", style: "cute-cartoon", activities: ["tracing"], aiSelectActivities: false },
    pickIndex: 1,
  },
];

export function Gallery() {
  const items = GALLERY_TOPICS.map((t) => {
    const book = generateFullBook(t.config, "gallery");
    const page = book.pages[t.pickIndex] ?? book.pages[0];
    return { label: t.label, page, style: t.config.style, total: book.pages.length };
  });

  return (
    <section id="gallery" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <h2 className="font-display text-3xl font-extrabold sm:text-4xl">Contoh halaman yang bisa AI buatkan</h2>
        <p className="mt-3 text-muted-foreground">
          Setiap halaman dibuat dari struktur JSON dan dirender lewat template — rapi, konsisten, dan siap cetak.
        </p>
      </div>

      <div className="columns-2 gap-4 sm:columns-3 lg:columns-4 [&>*]:mb-4 [&>*]:break-inside-avoid">
        {items.map((item) => (
          <div
            key={item.label}
            className="group relative overflow-hidden rounded-2xl shadow-md shadow-black/5 ring-1 ring-black/5 transition-transform hover:-translate-y-1 hover:shadow-lg"
          >
            <PageRenderer page={item.page} style={item.style} totalPages={item.total} />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-3 pt-8 pb-2.5">
              <span className="font-display text-xs font-bold text-white">{item.label}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
