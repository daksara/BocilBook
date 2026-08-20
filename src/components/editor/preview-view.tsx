"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Gamepad2,
  Maximize,
  Minimize,
  Pencil,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageRenderer } from "@/components/templates";
import { isPlayablePage, PlayablePage } from "@/components/games/playable-page";
import { pageThumbIllustrationUrl } from "@/lib/templates/page-thumb";
import { useStylePalette } from "@/components/templates/worksheet-frame";
import { cn } from "@/lib/utils";
import type { Book } from "@/types";

export function PreviewView({ book, onExport }: { book: Book; onExport: () => void }) {
  const [index, setIndex] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [fullscreen, setFullscreen] = useState(false);
  const [playMode, setPlayMode] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const palette = useStylePalette(book.config.style);

  const page = book.pages[index];
  const total = book.pages.length;
  const playable = isPlayablePage(page.data.type);

  function goTo(i: number) {
    setIndex(Math.max(0, Math.min(total - 1, i)));
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight") goTo(index + 1);
      if (e.key === "ArrowLeft") goTo(index - 1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  async function toggleFullscreen() {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      await containerRef.current.requestFullscreen();
      setFullscreen(true);
    } else {
      await document.exitFullscreen();
      setFullscreen(false);
    }
  }

  return (
    <div ref={containerRef} className="flex h-dvh flex-col bg-neutral-900">
      <header className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
        <div className="flex items-center gap-2 text-white">
          <Link href="/books" className="flex size-9 items-center justify-center rounded-full hover:bg-white/10" aria-label="Tutup">
            <X className="size-4.5" />
          </Link>
          <span className="hidden font-display text-sm font-bold sm:inline">{book.title}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Button
            variant={playMode ? "default" : "ghost"}
            size="sm"
            className={cn(!playMode && "text-white hover:bg-white/10 hover:text-white")}
            onClick={() => setPlayMode((v) => !v)}
          >
            <Gamepad2 /> <span className="hidden sm:inline">Main</span>
          </Button>
          <Button variant="ghost" size="icon-sm" className="text-white hover:bg-white/10 hover:text-white" onClick={() => setZoom((z) => Math.max(0.6, z - 0.15))} aria-label="Zoom out">
            <ZoomOut className="size-4" />
          </Button>
          <span className="w-10 text-center text-xs font-semibold text-white/70">{Math.round(zoom * 100)}%</span>
          <Button variant="ghost" size="icon-sm" className="text-white hover:bg-white/10 hover:text-white" onClick={() => setZoom((z) => Math.min(2, z + 0.15))} aria-label="Zoom in">
            <ZoomIn className="size-4" />
          </Button>
          <Button variant="ghost" size="icon-sm" className="text-white hover:bg-white/10 hover:text-white" onClick={toggleFullscreen} aria-label="Fullscreen">
            {fullscreen ? <Minimize className="size-4" /> : <Maximize className="size-4" />}
          </Button>
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 hover:text-white" asChild>
            <Link href={`/books/${book.id}/edit`}>
              <Pencil /> <span className="hidden sm:inline">Edit</span>
            </Link>
          </Button>
          <Button size="sm" onClick={onExport}>
            <Download /> <span className="hidden sm:inline">Export</span>
          </Button>
        </div>
      </header>

      <div className="relative flex flex-1 items-center justify-center overflow-hidden px-4">
        <button
          onClick={() => goTo(index - 1)}
          disabled={index === 0}
          className="absolute left-2 z-10 flex size-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 disabled:opacity-20 sm:left-6"
          aria-label="Sebelumnya"
        >
          <ChevronLeft className="size-5" />
        </button>

        <div className="flex max-h-full w-full max-w-md flex-col items-center gap-2 sm:max-w-lg">
          <div
            className="w-full overflow-hidden rounded-xl shadow-2xl transition-transform duration-200"
            style={{ transform: `scale(${zoom})` }}
          >
            {playMode && playable ? (
              <PlayablePage key={page.id} page={page} style={book.config.style} totalPages={total} />
            ) : (
              <PageRenderer page={page} style={book.config.style} totalPages={total} />
            )}
          </div>
          {playMode && !playable && (
            <p className="rounded-full bg-white/10 px-3 py-1 text-center text-xs font-medium text-white/70">
              Halaman ini belum bisa dimainkan — coba halaman Matching, Cari &amp; Lingkari, atau Hitung &amp; Lingkari.
            </p>
          )}
        </div>

        <button
          onClick={() => goTo(index + 1)}
          disabled={index === total - 1}
          className="absolute right-2 z-10 flex size-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 disabled:opacity-20 sm:right-6"
          aria-label="Selanjutnya"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>

      <footer className="flex flex-col gap-3 border-t border-white/10 px-4 py-3">
        <p className="text-center text-sm font-medium text-white/70">
          Page {index + 1} / {total}
        </p>
        <div className="scrollbar-none flex gap-2 overflow-x-auto pb-1">
          {book.pages.map((p, i) => {
            const url = pageThumbIllustrationUrl(p);
            return (
              <button
                key={p.id}
                onClick={() => goTo(i)}
                className={cn(
                  "relative flex aspect-[3/4] w-10 shrink-0 items-center justify-center rounded-md border-2 transition-colors",
                  i === index ? "border-primary" : "border-transparent opacity-60 hover:opacity-100"
                )}
                style={{ background: palette.accentSoft }}
              >
                {url && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={url} alt="" className="h-[60%] w-[60%] object-contain" />
                )}
                {isPlayablePage(p.data.type) && (
                  <span className="absolute top-0.5 right-0.5 flex size-3.5 items-center justify-center rounded-full bg-primary text-white">
                    <Gamepad2 className="size-2.5" />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </footer>
    </div>
  );
}
