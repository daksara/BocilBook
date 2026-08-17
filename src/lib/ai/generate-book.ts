import type { Book, BookConfig, Page } from "@/types";
import { buildActivityPlan } from "./activity-plan";
import { buildCover, buildPageData, pageTitleFor } from "./content-builder";

let pageIdCounter = 0;
function nextPageId() {
  pageIdCounter += 1;
  return `page-${pageIdCounter}-${Date.now().toString(36)}`;
}

const TOPIC_TITLES: { keywords: string[]; id: string; en: string }[] = [
  { keywords: ["huruf", "alphabet", "abc"], id: "Mengenal Huruf", en: "Alphabet Fun" },
  { keywords: ["angka", "number", "berhitung"], id: "Belajar Angka", en: "Learning Numbers" },
  { keywords: ["hewan", "animal", "binatang"], id: "Mengenal Hewan", en: "Animal World" },
  { keywords: ["warna", "color", "colour"], id: "Mengenal Warna", en: "Colorful World" },
  { keywords: ["bentuk", "shape"], id: "Mengenal Bentuk", en: "Shapes Around Us" },
  { keywords: ["ramadan", "puasa", "lebaran"], id: "Ramadan Ceria", en: "Joyful Ramadan" },
  { keywords: ["kendaraan", "transportasi", "vehicle"], id: "Mengenal Kendaraan", en: "Busy Vehicles" },
  { keywords: ["inggris", "english"], id: "Fun English", en: "Fun English" },
];

const BOOK_TYPE_SUFFIX: Record<BookConfig["bookType"], { id: string; en: string }> = {
  workbook: { id: "Workbook", en: "Workbook" },
  "coloring-book": { id: "Buku Mewarnai", en: "Coloring Book" },
  "activity-book": { id: "Activity Book", en: "Activity Book" },
  "learning-book": { id: "Buku Belajar", en: "Learning Book" },
  "story-book": { id: "Buku Cerita", en: "Story Book" },
};

export function deriveBookTitle(config: BookConfig): string {
  const en = config.language === "en";
  const slug = config.topic.toLowerCase();
  const suffix = BOOK_TYPE_SUFFIX[config.bookType][en ? "en" : "id"];

  const match = TOPIC_TITLES.find((t) => t.keywords.some((k) => slug.includes(k)));
  if (match) return `${match[en ? "en" : "id"]} ${suffix}`;

  const words = config.topic
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 4)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return words ? `${words} ${suffix}` : `BocilBook ${suffix}`;
}

/**
 * Synchronously builds a complete, ready-to-render Book from a BookConfig.
 * This is the mock-mode equivalent of an end-to-end AI generation pipeline:
 * structure -> content -> illustrations -> layout, all in one deterministic
 * pass so the product experience works without any external AI API.
 */
export function generateFullBook(config: BookConfig, ownerId = "demo-user"): Book {
  const title = deriveBookTitle(config);
  const now = new Date().toISOString();

  const coverData = buildCover(config, title);
  const coverPage: Page = {
    id: nextPageId(),
    pageNumber: 1,
    type: "cover",
    title,
    data: { type: "cover", ...coverData },
    elements: [],
  };

  const contentPageCount = Math.max(0, config.numPages - 1);
  const plan = buildActivityPlan(config, contentPageCount);

  let letterIndex = 0;
  let numberIndex = 0;
  const pages: Page[] = [coverPage];

  plan.forEach((type, i) => {
    const seed = i * 17 + config.topic.length + 3;
    const data = buildPageData(type, { config, seed, letterIndex, numberIndex });
    if (type === "letter_tracing") letterIndex++;
    if (type === "number_tracing") numberIndex++;

    pages.push({
      id: nextPageId(),
      pageNumber: i + 2,
      type,
      title: pageTitleFor(type, data, config),
      data,
      elements: [],
    });
  });

  return {
    id: `book-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
    title,
    config,
    pages,
    coverThumbnail: coverData.illustration.url,
    status: "ready",
    createdAt: now,
    updatedAt: now,
    ownerId,
  };
}
