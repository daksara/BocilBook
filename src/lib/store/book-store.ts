"use client";

import { create } from "zustand";
import type { Book, Page } from "@/types";
import { generateFullBook } from "@/lib/ai/generate-book";
import { getSampleBook } from "@/lib/data/sample-book";
import { deleteBookFromSupabase, fetchBooksFromSupabase, upsertBookToSupabase } from "@/lib/supabase/books-repo";
import { isSupabaseConfigured } from "@/lib/supabase/config";

const DEMO_OWNER_ID = "demo-user";

function persistBook(book: Book | undefined) {
  if (book) void upsertBookToSupabase(book);
}

function persistDelete(id: string) {
  void deleteBookFromSupabase(id);
}

// Fixed anchor (not Date.now()) so seeded timestamps are identical on server
// and client renders — avoids SSR/hydration mismatches in relative-time labels.
const SEED_ANCHOR = new Date("2026-08-17T09:00:00.000Z");

function daysAgo(n: number) {
  const d = new Date(SEED_ANCHOR);
  d.setDate(d.getDate() - n);
  return d.toISOString();
}

function seedBooks(): Book[] {
  const abc = getSampleBook();
  abc.createdAt = daysAgo(0);
  abc.updatedAt = daysAgo(0);

  const numbers = generateFullBook(
    {
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
    "demo-user"
  );
  numbers.id = "sample-belajar-angka";
  numbers.updatedAt = daysAgo(1);

  const animals = generateFullBook(
    {
      bookType: "activity-book",
      topic: "Mengenal berbagai macam hewan di darat, air, dan udara",
      ageRange: "5-7",
      language: "id",
      numPages: 20,
      difficulty: "medium",
      style: "soft-pastel",
      activities: ["animal-classification", "find-circle", "maze", "coloring", "matching"],
      aiSelectActivities: false,
    },
    "demo-user"
  );
  animals.id = "sample-mengenal-hewan";
  animals.updatedAt = daysAgo(3);

  const shapes = generateFullBook(
    {
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
    "demo-user"
  );
  shapes.id = "sample-bentuk-warna";
  shapes.status = "draft";
  shapes.updatedAt = daysAgo(6);

  return [abc, numbers, animals, shapes];
}

let seeded: Book[] | null = null;
function getSeeded() {
  if (!seeded) seeded = seedBooks();
  return seeded;
}

interface BookStore {
  books: Record<string, Book>;
  getBook: (id: string) => Book | undefined;
  addBook: (book: Book) => void;
  updateBook: (id: string, updater: (book: Book) => Book) => void;
  deleteBook: (id: string) => void;
  duplicateBook: (id: string) => Book | undefined;
  updatePage: (bookId: string, pageId: string, updater: (page: Page) => Page) => void;
  replacePage: (bookId: string, pageId: string, page: Page) => void;
  setPages: (bookId: string, pages: Page[]) => void;
  renameBook: (bookId: string, title: string) => void;
  addPage: (bookId: string, page: Page, atIndex?: number) => void;
  deletePage: (bookId: string, pageId: string) => void;
  duplicatePage: (bookId: string, pageId: string) => void;
  reorderPages: (bookId: string, fromIndex: number, toIndex: number) => void;
}

function renumber(pages: Page[]): Page[] {
  return pages.map((p, i) => ({ ...p, pageNumber: i + 1 }));
}

function initialBooks(): Record<string, Book> {
  const map: Record<string, Book> = {};
  for (const b of getSeeded()) map[b.id] = b;
  return map;
}

export const useBookStore = create<BookStore>((set, get) => ({
  books: initialBooks(),
  getBook: (id) => get().books[id],
  addBook: (book) => {
    set((s) => ({ books: { ...s.books, [book.id]: book } }));
    persistBook(get().books[book.id]);
  },
  updateBook: (id, updater) => {
    set((s) => {
      const book = s.books[id];
      if (!book) return s;
      return { books: { ...s.books, [id]: { ...updater(book), updatedAt: new Date().toISOString() } } };
    });
    persistBook(get().books[id]);
  },
  deleteBook: (id) => {
    set((s) => {
      const next = { ...s.books };
      delete next[id];
      return { books: next };
    });
    persistDelete(id);
  },
  duplicateBook: (id) => {
    const book = get().books[id];
    if (!book) return undefined;
    const copy: Book = {
      ...book,
      id: `book-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
      title: `${book.title} (Salinan)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    set((s) => ({ books: { ...s.books, [copy.id]: copy } }));
    persistBook(copy);
    return copy;
  },
  updatePage: (bookId, pageId, updater) => {
    set((s) => {
      const book = s.books[bookId];
      if (!book) return s;
      const pages = book.pages.map((p) => (p.id === pageId ? updater(p) : p));
      return { books: { ...s.books, [bookId]: { ...book, pages, updatedAt: new Date().toISOString() } } };
    });
    persistBook(get().books[bookId]);
  },
  replacePage: (bookId, pageId, page) => {
    set((s) => {
      const book = s.books[bookId];
      if (!book) return s;
      const pages = book.pages.map((p) => (p.id === pageId ? page : p));
      return { books: { ...s.books, [bookId]: { ...book, pages, updatedAt: new Date().toISOString() } } };
    });
    persistBook(get().books[bookId]);
  },
  setPages: (bookId, pages) => {
    set((s) => {
      const book = s.books[bookId];
      if (!book) return s;
      return { books: { ...s.books, [bookId]: { ...book, pages, updatedAt: new Date().toISOString() } } };
    });
    persistBook(get().books[bookId]);
  },
  renameBook: (bookId, title) => {
    set((s) => {
      const book = s.books[bookId];
      if (!book) return s;
      return { books: { ...s.books, [bookId]: { ...book, title, updatedAt: new Date().toISOString() } } };
    });
    persistBook(get().books[bookId]);
  },
  addPage: (bookId, page, atIndex) => {
    set((s) => {
      const book = s.books[bookId];
      if (!book) return s;
      const pages = [...book.pages];
      const idx = atIndex ?? pages.length;
      pages.splice(idx, 0, page);
      return { books: { ...s.books, [bookId]: { ...book, pages: renumber(pages), updatedAt: new Date().toISOString() } } };
    });
    persistBook(get().books[bookId]);
  },
  deletePage: (bookId, pageId) => {
    set((s) => {
      const book = s.books[bookId];
      if (!book) return s;
      const pages = book.pages.filter((p) => p.id !== pageId);
      return { books: { ...s.books, [bookId]: { ...book, pages: renumber(pages), updatedAt: new Date().toISOString() } } };
    });
    persistBook(get().books[bookId]);
  },
  duplicatePage: (bookId, pageId) => {
    set((s) => {
      const book = s.books[bookId];
      if (!book) return s;
      const idx = book.pages.findIndex((p) => p.id === pageId);
      if (idx === -1) return s;
      const copy: Page = {
        ...book.pages[idx],
        id: `page-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
      };
      const pages = [...book.pages];
      pages.splice(idx + 1, 0, copy);
      return { books: { ...s.books, [bookId]: { ...book, pages: renumber(pages), updatedAt: new Date().toISOString() } } };
    });
    persistBook(get().books[bookId]);
  },
  reorderPages: (bookId, fromIndex, toIndex) => {
    set((s) => {
      const book = s.books[bookId];
      if (!book) return s;
      const pages = [...book.pages];
      const [moved] = pages.splice(fromIndex, 1);
      pages.splice(toIndex, 0, moved);
      return { books: { ...s.books, [bookId]: { ...book, pages: renumber(pages), updatedAt: new Date().toISOString() } } };
    });
    persistBook(get().books[bookId]);
  },
}));

if (typeof window !== "undefined" && isSupabaseConfigured()) {
  fetchBooksFromSupabase(DEMO_OWNER_ID)
    .then((remoteBooks) => {
      if (!remoteBooks.length) return;
      useBookStore.setState((s) => {
        const books = { ...s.books };
        for (const book of remoteBooks) books[book.id] = book;
        return { books };
      });
    })
    .catch((err) => console.warn("[supabase] hydrate failed:", err));
}
