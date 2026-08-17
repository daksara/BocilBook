"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Copy, Download, Eye, MoreVertical, Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useStylePalette } from "@/components/templates/worksheet-frame";
import { useBookStore } from "@/lib/store/book-store";
import { RelativeTime } from "@/components/shared/relative-time";
import { BOOK_TYPE_LABEL } from "@/lib/format";
import type { Book } from "@/types";

const STATUS_CONFIG: Record<Book["status"], { label: string; variant: "success" | "warning" | "secondary" | "destructive" }> = {
  ready: { label: "Siap", variant: "success" },
  draft: { label: "Draft", variant: "secondary" },
  generating: { label: "Generating...", variant: "warning" },
  error: { label: "Error", variant: "destructive" },
};

export function BookCard({ book }: { book: Book }) {
  const palette = useStylePalette(book.config.style);
  const router = useRouter();
  const duplicateBook = useBookStore((s) => s.duplicateBook);
  const deleteBook = useBookStore((s) => s.deleteBook);
  const status = STATUS_CONFIG[book.status];
  const coverIllustration = book.pages[0]?.data.type === "cover" ? book.pages[0].data.illustration : undefined;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm shadow-black/[0.02] transition-all hover:-translate-y-0.5 hover:shadow-md">
      <Link href={`/books/${book.id}/edit`} className="relative flex aspect-[4/3] items-center justify-center overflow-hidden" style={{ background: palette.accentSoft }}>
        <div
          className="absolute -top-8 -right-8 h-28 w-28 rounded-full opacity-40"
          style={{ background: palette.accent }}
        />
        {coverIllustration && (
          <div className="relative flex aspect-square w-[42%] items-center justify-center rounded-[28%] bg-white shadow-md">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={coverIllustration.url} alt={book.title} className="h-[78%] w-[78%] object-contain" draggable={false} />
          </div>
        )}
        <Badge variant={status.variant} className="absolute top-2.5 left-2.5">
          {status.label}
        </Badge>
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <Link href={`/books/${book.id}/edit`} className="line-clamp-1 font-display font-bold hover:text-primary">
              {book.title}
            </Link>
            <p className="text-xs text-muted-foreground">{BOOK_TYPE_LABEL[book.config.bookType]} · {book.pages.length} halaman</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground" aria-label="Menu buku">
                <MoreVertical className="size-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onSelect={() => router.push(`/books/${book.id}/edit`)}>
                <Pencil /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => router.push(`/books/${book.id}`)}>
                <Eye /> Preview
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => duplicateBook(book.id)}>
                <Copy /> Duplikat
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => router.push(`/books/${book.id}`)}>
                <Download /> Export
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive" onSelect={() => deleteBook(book.id)}>
                <Trash2 /> Hapus
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <p className="text-xs text-muted-foreground">
          Edited <RelativeTime iso={book.updatedAt} />
        </p>
      </div>
    </div>
  );
}
