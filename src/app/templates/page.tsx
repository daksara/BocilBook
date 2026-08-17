"use client";

import Link from "next/link";
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
  type LucideIcon,
} from "lucide-react";
import { AppShell } from "@/components/dashboard/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageRenderer } from "@/components/templates";
import { TEMPLATE_CATALOG } from "@/lib/data/templates-catalog";
import { buildPageData, pageTitleFor } from "@/lib/ai/content-builder";
import type { BookConfig } from "@/types";

const ICONS: Record<string, LucideIcon> = {
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
};

const CATEGORY_LABEL: Record<string, string> = {
  tracing: "Tracing",
  recognition: "Recognition",
  logic: "Logic & Matching",
  creative: "Creative",
  cover: "Cover",
};

const PREVIEW_CONFIG: BookConfig = {
  bookType: "workbook",
  topic: "huruf, angka, hewan, dan bentuk",
  ageRange: "3-5",
  language: "id",
  numPages: 10,
  difficulty: "easy",
  style: "cute-cartoon",
  activities: [],
  aiSelectActivities: true,
};

export default function TemplatesPage() {
  const categories = Array.from(new Set(TEMPLATE_CATALOG.map((t) => t.category)));

  return (
    <AppShell>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="font-display text-2xl font-extrabold sm:text-3xl">Templates</h1>
          <p className="mt-1 text-muted-foreground">
            10 layout aktivitas siap pakai. AI mengisi kontennya, kamu tinggal generate.
          </p>
        </div>

        {categories.map((cat) => (
          <div key={cat} className="mb-10">
            <h2 className="mb-4 font-display text-lg font-bold">{CATEGORY_LABEL[cat] ?? cat}</h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {TEMPLATE_CATALOG.filter((t) => t.category === cat).map((tpl, i) => {
                const Icon = ICONS[tpl.icon] ?? Shapes;
                const data = buildPageData(tpl.type, { config: PREVIEW_CONFIG, seed: i * 13 + 5, letterIndex: i, numberIndex: i });
                const page = {
                  id: tpl.id,
                  pageNumber: 1,
                  type: tpl.type,
                  title: pageTitleFor(tpl.type, data, PREVIEW_CONFIG),
                  data,
                  elements: [],
                };
                return (
                  <div
                    key={tpl.id}
                    className="group overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm shadow-black/[0.02] transition-all hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <div className="max-h-64 overflow-hidden">
                      <PageRenderer page={page} style={PREVIEW_CONFIG.style} totalPages={1} />
                    </div>
                    <div className="flex flex-col gap-2 p-4">
                      <div className="flex items-center gap-2">
                        <span className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <Icon className="size-4" />
                        </span>
                        <span className="font-display font-bold">{tpl.name}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{tpl.description}</p>
                      <div className="mt-1 flex items-center justify-between">
                        <Badge variant="outline">{CATEGORY_LABEL[tpl.category] ?? tpl.category}</Badge>
                        <Button size="sm" variant="soft" asChild>
                          <Link href="/create">Gunakan</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
