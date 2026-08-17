"use client";

import { useState } from "react";
import {
  PenLine,
  Hash,
  CircleDot,
  GitCompareArrows,
  SearchCheck,
  Palette,
  Waypoints,
  Scissors,
  Shapes,
  PawPrint,
  Loader2,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getAIProvider } from "@/lib/ai";
import { buildPageData, pageTitleFor } from "@/lib/ai/content-builder";
import type { BookConfig, Page, PageType } from "@/types";

const TYPE_OPTIONS: { type: PageType; label: string; icon: LucideIcon }[] = [
  { type: "letter_tracing", label: "Letter Tracing", icon: PenLine },
  { type: "number_tracing", label: "Number Tracing", icon: Hash },
  { type: "count_and_circle", label: "Count & Circle", icon: CircleDot },
  { type: "match_objects", label: "Match Objects", icon: GitCompareArrows },
  { type: "find_and_circle", label: "Find & Circle", icon: SearchCheck },
  { type: "coloring_page", label: "Coloring Page", icon: Palette },
  { type: "maze", label: "Maze", icon: Waypoints },
  { type: "cut_and_paste", label: "Cut & Paste", icon: Scissors },
  { type: "shape_recognition", label: "Shape Recognition", icon: Shapes },
  { type: "animal_classification", label: "Animal Classification", icon: PawPrint },
];

function makePageId(): string {
  return `page-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

function buildTemplatePage(type: PageType, config: BookConfig): Page {
  const seed = Date.now() % 100000;
  const data = buildPageData(type, { config, seed, letterIndex: seed % 26, numberIndex: seed % 10 });
  return { id: makePageId(), pageNumber: 0, type, title: pageTitleFor(type, data, config), data, elements: [] };
}

export function AddPageSheet({
  open,
  onOpenChange,
  config,
  onInsert,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  config: BookConfig;
  onInsert: (page: Page) => void;
}) {
  const [loading, setLoading] = useState(false);

  function insertTemplate(type: PageType) {
    onInsert(buildTemplatePage(type, config));
    onOpenChange(false);
  }

  async function insertAiSelected() {
    setLoading(true);
    try {
      const page = await getAIProvider().generateActivity(config.topic, config);
      onInsert({ ...page, id: makePageId() });
      onOpenChange(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Tambah Halaman</DialogTitle>
          <DialogDescription>Pilih template aktivitas, atau biarkan AI yang memilih.</DialogDescription>
        </DialogHeader>

        <Button variant="soft" className="justify-center" onClick={insertAiSelected} disabled={loading}>
          {loading ? <Loader2 className="animate-spin" /> : <Sparkles />}
          Biarkan AI Memilih
        </Button>

        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
          {TYPE_OPTIONS.map((opt) => (
            <button
              key={opt.type}
              onClick={() => insertTemplate(opt.type)}
              disabled={loading}
              className={cn(
                "flex flex-col items-center gap-1.5 rounded-xl border-2 border-border/70 p-3 text-center transition-colors hover:border-primary hover:bg-primary/5"
              )}
            >
              <span className="flex size-8 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                <opt.icon className="size-4" />
              </span>
              <span className="text-xs font-semibold leading-tight">{opt.label}</span>
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
