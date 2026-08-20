import { isPlayablePage } from "@/components/games/playable-page";
import type { Book, Page, PageType } from "@/types";

export interface PlayableEntry {
  book: Book;
  page: Page;
}

/** Groups every playable page across all books by its game type, in book/page order. */
export function getPlayableEntriesByType(books: Book[]): Map<PageType, PlayableEntry[]> {
  const map = new Map<PageType, PlayableEntry[]>();
  for (const book of books) {
    for (const page of book.pages) {
      if (!isPlayablePage(page.data.type)) continue;
      const list = map.get(page.data.type) ?? [];
      list.push({ book, page });
      map.set(page.data.type, list);
    }
  }
  return map;
}
