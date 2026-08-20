"use client";

import { Suspense, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { CircleDot, GitCompareArrows, SearchCheck, X, type LucideIcon } from "lucide-react";
import { useBookStore } from "@/lib/store/book-store";
import { getPlayableEntriesByType } from "@/lib/games/playable-entries";
import { PlayablePage } from "@/components/games/playable-page";
import type { PageType } from "@/types";

const GAME_LABELS: Partial<Record<PageType, { label: string; icon: LucideIcon }>> = {
  match_objects: { label: "Matching", icon: GitCompareArrows },
  find_and_circle: { label: "Find & Circle", icon: SearchCheck },
  count_and_circle: { label: "Count & Circle", icon: CircleDot },
};

export default function GamesPlayPage() {
  return (
    <Suspense fallback={<div className="h-dvh bg-neutral-900" />}>
      <GamesPlayContent />
    </Suspense>
  );
}

function GamesPlayContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams.get("type") as PageType | null;
  const startBookId = searchParams.get("book");
  const startPageNumber = Number(searchParams.get("page"));

  const booksMap = useBookStore((s) => s.books);
  const books = useMemo(() => Object.values(booksMap), [booksMap]);
  const entries = useMemo(() => (type ? (getPlayableEntriesByType(books).get(type) ?? []) : []), [books, type]);

  const startIndex = useMemo(() => {
    if (!startBookId || !startPageNumber) return 0;
    const i = entries.findIndex((e) => e.book.id === startBookId && e.page.pageNumber === startPageNumber);
    return i >= 0 ? i : 0;
  }, [entries, startBookId, startPageNumber]);

  const [index, setIndex] = useState(startIndex);
  const [syncedStartIndex, setSyncedStartIndex] = useState(startIndex);
  if (startIndex !== syncedStartIndex) {
    setSyncedStartIndex(startIndex);
    setIndex(startIndex);
  }

  if (!type || entries.length === 0) {
    return (
      <div className="flex h-dvh flex-col items-center justify-center gap-3 bg-neutral-900 px-4 text-center text-white">
        <p className="font-display text-lg font-bold">Game tidak ditemukan</p>
        <Link href="/games" className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold hover:bg-white/20">
          Kembali ke Main Game
        </Link>
      </div>
    );
  }

  const clampedIndex = Math.min(index, entries.length - 1);
  const entry = entries[clampedIndex];
  const hasNext = clampedIndex < entries.length - 1;
  const meta = GAME_LABELS[type];
  const Icon = meta?.icon ?? GitCompareArrows;

  return (
    <div className="flex h-dvh flex-col bg-neutral-900">
      <header className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3 text-white">
        <Link href="/games" className="flex size-9 items-center justify-center rounded-full hover:bg-white/10" aria-label="Tutup">
          <X className="size-4.5" />
        </Link>
        <div className="flex items-center gap-2 text-center">
          <Icon className="size-4 opacity-70" />
          <div>
            <p className="font-display text-sm font-bold">{meta?.label ?? "Game"}</p>
            <p className="text-xs text-white/60">
              Level {clampedIndex + 1} / {entries.length}
            </p>
          </div>
        </div>
        <div className="size-9" />
      </header>

      <div className="relative flex flex-1 items-center justify-center overflow-hidden px-4">
        <div className="w-full max-w-md overflow-hidden rounded-xl shadow-2xl sm:max-w-lg">
          <PlayablePage
            key={`${entry.book.id}-${entry.page.pageNumber}`}
            page={entry.page}
            style={entry.book.config.style}
            totalPages={entry.book.pages.length}
            onNext={hasNext ? () => setIndex((i) => i + 1) : undefined}
            levelLabel={`Level ${clampedIndex + 1} dari ${entries.length}`}
            onExit={() => router.push("/games")}
          />
        </div>
      </div>
    </div>
  );
}
