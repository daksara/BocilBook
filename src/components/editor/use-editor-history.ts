"use client";

import { useCallback, useState } from "react";
import { useBookStore } from "@/lib/store/book-store";
import type { Page } from "@/types";

export function useEditorHistory(bookId: string) {
  const pages = useBookStore((s) => s.books[bookId]?.pages);
  const setPages = useBookStore((s) => s.setPages);
  const [past, setPast] = useState<Page[][]>([]);
  const [future, setFuture] = useState<Page[][]>([]);

  const commit = useCallback(
    (nextPages: Page[]) => {
      if (pages) setPast((p) => [...p.slice(-49), pages]);
      setFuture([]);
      setPages(bookId, nextPages);
    },
    [pages, bookId, setPages]
  );

  const undo = useCallback(() => {
    if (!pages) return;
    setPast((p) => {
      if (p.length === 0) return p;
      const prev = p[p.length - 1];
      setFuture((f) => [...f, pages]);
      setPages(bookId, prev);
      return p.slice(0, -1);
    });
  }, [pages, bookId, setPages]);

  const redo = useCallback(() => {
    if (!pages) return;
    setFuture((f) => {
      if (f.length === 0) return f;
      const next = f[f.length - 1];
      setPast((p) => [...p, pages]);
      setPages(bookId, next);
      return f.slice(0, -1);
    });
  }, [pages, bookId, setPages]);

  return { pages, commit, undo, redo, canUndo: past.length > 0, canRedo: future.length > 0 };
}
