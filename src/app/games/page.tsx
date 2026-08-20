"use client";

import { useMemo } from "react";
import Link from "next/link";
import { CircleDot, GitCompareArrows, Play, SearchCheck, SquarePlus, type LucideIcon } from "lucide-react";
import { AppShell } from "@/components/dashboard/app-shell";
import { Button } from "@/components/ui/button";
import { useBookStore } from "@/lib/store/book-store";
import { isPlayablePage } from "@/components/games/playable-page";
import { pageThumbIllustrationUrl } from "@/lib/templates/page-thumb";
import { useStylePalette } from "@/components/templates/worksheet-frame";
import type { Book, Page, PageType } from "@/types";

const GAME_TYPES: { type: PageType; label: string; description: string; icon: LucideIcon }[] = [
  { type: "match_objects", label: "Matching", description: "Tap gambar kiri lalu pasangannya di kanan.", icon: GitCompareArrows },
  { type: "find_and_circle", label: "Find & Circle", description: "Temukan semua gambar yang sesuai.", icon: SearchCheck },
  { type: "count_and_circle", label: "Count & Circle", description: "Hitung gambar lalu tap angka yang tepat.", icon: CircleDot },
];

export default function GamesPage() {
  const booksMap = useBookStore((s) => s.books);
  const books = useMemo(() => Object.values(booksMap), [booksMap]);

  const entriesByType = useMemo(() => {
    const map = new Map<PageType, { book: Book; page: Page }[]>();
    for (const book of books) {
      for (const page of book.pages) {
        if (!isPlayablePage(page.data.type)) continue;
        const list = map.get(page.data.type) ?? [];
        list.push({ book, page });
        map.set(page.data.type, list);
      }
    }
    return map;
  }, [books]);

  const totalGames = Array.from(entriesByType.values()).reduce((sum, list) => sum + list.length, 0);

  return (
    <AppShell>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="font-display text-2xl font-extrabold sm:text-3xl">Main Game</h1>
          <p className="mt-1 text-muted-foreground">
            Mainkan halaman aktivitas dari bukumu langsung di browser — tap gambar, cocokkan, dan hitung.
          </p>
        </div>

        {totalGames === 0 ? (
          <EmptyState hasBooks={books.length > 0} />
        ) : (
          <div className="flex flex-col gap-10">
            {GAME_TYPES.map((gameType) => {
              const entries = entriesByType.get(gameType.type);
              if (!entries || entries.length === 0) return null;
              return (
                <section key={gameType.type}>
                  <div className="mb-4 flex items-center gap-3">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <gameType.icon className="size-5" />
                    </span>
                    <div>
                      <p className="font-display font-bold">{gameType.label}</p>
                      <p className="text-xs text-muted-foreground">{gameType.description}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                    {entries.map(({ book, page }) => (
                      <GameCard key={page.id} book={book} page={page} />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </div>
    </AppShell>
  );
}

function GameCard({ book, page }: { book: Book; page: Page }) {
  const palette = useStylePalette(book.config.style);
  const url = pageThumbIllustrationUrl(page);

  return (
    <Link
      href={`/books/${book.id}?play=1&page=${page.pageNumber}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm shadow-black/[0.02] transition-all hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="relative flex aspect-[4/3] items-center justify-center" style={{ background: palette.accentSoft }}>
        {url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={url} alt="" className="h-[55%] w-[55%] object-contain" />
        )}
        <span className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all group-hover:bg-black/20 group-hover:opacity-100">
          <span className="flex size-11 items-center justify-center rounded-full bg-white text-primary shadow-md">
            <Play className="size-5 fill-current" />
          </span>
        </span>
      </div>
      <div className="flex flex-col gap-0.5 p-3">
        <p className="truncate font-display text-sm font-bold">{page.title}</p>
        <p className="truncate text-xs text-muted-foreground">{book.title}</p>
      </div>
    </Link>
  );
}

function EmptyState({ hasBooks }: { hasBooks: boolean }) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-3xl border-2 border-dashed border-border/70 px-6 py-16 text-center">
      <span className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
        <GitCompareArrows className="size-6" />
      </span>
      <div>
        <p className="font-display text-lg font-bold">
          {hasBooks ? "Belum ada halaman yang bisa dimainkan" : "Belum ada buku"}
        </p>
        <p className="mt-1 max-w-sm text-sm text-muted-foreground">
          {hasBooks
            ? "Tambahkan halaman Matching, Find & Circle, atau Count & Circle ke salah satu bukumu supaya bisa dimainkan di sini."
            : "Buat buku dulu, lalu halaman Matching, Find & Circle, dan Count & Circle-nya otomatis bisa dimainkan di sini."}
        </p>
      </div>
      <Button asChild>
        <Link href="/create">
          <SquarePlus /> Buat Buku Baru
        </Link>
      </Button>
    </div>
  );
}
