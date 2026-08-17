"use client";

import { useState } from "react";
import { Copy, GripVertical, Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useStylePalette } from "@/components/templates/worksheet-frame";
import { pageThumbIllustrationUrl } from "@/lib/templates/page-thumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { BookStyle, Page } from "@/types";
import { Sparkles } from "lucide-react";

export function PageThumbnailsRail({
  pages,
  style,
  selectedId,
  onSelect,
  onReorder,
  onDuplicate,
  onDelete,
  onAddPage,
}: {
  pages: Page[];
  style: BookStyle;
  selectedId: string;
  onSelect: (id: string) => void;
  onReorder: (from: number, to: number) => void;
  onDuplicate: (id: string) => void;
  onDelete: (id: string) => void;
  onAddPage: () => void;
}) {
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);

  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="flex flex-col gap-2.5">
          {pages.map((page, index) => (
            <li
              key={page.id}
              draggable
              onDragStart={() => setDragIndex(index)}
              onDragOver={(e) => {
                e.preventDefault();
                if (overIndex !== index) setOverIndex(index);
              }}
              onDrop={() => {
                if (dragIndex !== null && dragIndex !== index) onReorder(dragIndex, index);
                setDragIndex(null);
                setOverIndex(null);
              }}
              onDragEnd={() => {
                setDragIndex(null);
                setOverIndex(null);
              }}
              className={cn(
                "group relative rounded-xl transition-opacity",
                dragIndex === index && "opacity-40",
                overIndex === index && dragIndex !== null && dragIndex !== index && "outline-2 outline-dashed outline-primary"
              )}
            >
              <PageThumb
                page={page}
                style={style}
                selected={page.id === selectedId}
                onClick={() => onSelect(page.id)}
                onDuplicate={() => onDuplicate(page.id)}
                onDelete={() => onDelete(page.id)}
                deletable={pages.length > 1}
              />
            </li>
          ))}
        </ul>
      </div>
      <div className="border-t border-border/70 p-3">
        <button
          onClick={onAddPage}
          className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border py-2.5 text-sm font-semibold text-muted-foreground transition-colors hover:border-primary hover:text-primary"
        >
          <Plus className="size-4" /> Add Page
        </button>
      </div>
    </div>
  );
}

function PageThumb({
  page,
  style,
  selected,
  onClick,
  onDuplicate,
  onDelete,
  deletable,
}: {
  page: Page;
  style: BookStyle;
  selected: boolean;
  onClick: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
  deletable: boolean;
}) {
  const palette = useStylePalette(style);
  const url = pageThumbIllustrationUrl(page);

  return (
    <div
      onClick={onClick}
      className={cn(
        "flex cursor-pointer items-center gap-2.5 rounded-xl border-2 p-2 transition-colors",
        selected ? "border-primary bg-primary/5" : "border-transparent hover:bg-muted"
      )}
    >
      <GripVertical className="size-3.5 shrink-0 cursor-grab text-muted-foreground/50" />
      <div
        className="flex aspect-[3/4] w-11 shrink-0 items-center justify-center rounded-md"
        style={{ background: palette.accentSoft }}
      >
        {url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={url} alt="" className="h-[60%] w-[60%] object-contain" draggable={false} />
        ) : (
          <Sparkles className="size-3.5 text-muted-foreground" />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[0.7rem] font-semibold text-muted-foreground">Page {page.pageNumber}</p>
        <p className="truncate text-xs font-bold">{page.title}</p>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            onClick={(e) => e.stopPropagation()}
            className="rounded-md p-1 text-muted-foreground opacity-0 hover:bg-muted group-hover:opacity-100"
            aria-label="Menu halaman"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="5" r="1.6" fill="currentColor" />
              <circle cx="12" cy="12" r="1.6" fill="currentColor" />
              <circle cx="12" cy="19" r="1.6" fill="currentColor" />
            </svg>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
          <DropdownMenuItem onSelect={onDuplicate}>
            <Copy /> Duplikat
          </DropdownMenuItem>
          <DropdownMenuItem variant="destructive" onSelect={onDelete} disabled={!deletable}>
            <Trash2 /> Hapus
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
