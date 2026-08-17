import type { Page } from "@/types";

export function renumber(pages: Page[]): Page[] {
  return pages.map((p, i) => ({ ...p, pageNumber: i + 1 }));
}

export function updatePageInList(pages: Page[], pageId: string, updater: (page: Page) => Page): Page[] {
  return pages.map((p) => (p.id === pageId ? updater(p) : p));
}

export function replacePageInList(pages: Page[], pageId: string, next: Page): Page[] {
  return pages.map((p) => (p.id === pageId ? next : p));
}

export function deletePageFromList(pages: Page[], pageId: string): Page[] {
  return renumber(pages.filter((p) => p.id !== pageId));
}

export function duplicatePageInList(pages: Page[], pageId: string): Page[] {
  const idx = pages.findIndex((p) => p.id === pageId);
  if (idx === -1) return pages;
  const copy: Page = { ...pages[idx], id: `page-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}` };
  const next = [...pages];
  next.splice(idx + 1, 0, copy);
  return renumber(next);
}

export function reorderPagesInList(pages: Page[], fromIndex: number, toIndex: number): Page[] {
  const next = [...pages];
  const [moved] = next.splice(fromIndex, 1);
  next.splice(toIndex, 0, moved);
  return renumber(next);
}

export function insertPageInList(pages: Page[], page: Page, atIndex?: number): Page[] {
  const next = [...pages];
  next.splice(atIndex ?? next.length, 0, page);
  return renumber(next);
}
