"use client";

import { ArrowRight, Layers, Sparkles, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStylePalette } from "@/components/templates/worksheet-frame";
import { BOOK_TEMPLATES, type BookTemplate } from "@/lib/data/book-templates";
import { ACTIVITY_OPTIONS, AGE_OPTIONS, BOOK_TYPE_OPTIONS, DIFFICULTY_OPTIONS } from "./wizard-options";
import { StepHeading } from "./step-heading";

export function TemplateGallery({
  onSelectTemplate,
  onStartCustom,
}: {
  onSelectTemplate: (template: BookTemplate) => void;
  onStartCustom: () => void;
}) {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <StepHeading
        title="🚀 Mulai dengan Template Siap Jual"
        subtitle="Topik, aktivitas, dan gaya visual sudah diracik lengkap — tinggal pilih dan generate. Atau atur semuanya sendiri dari awal."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {BOOK_TEMPLATES.map((template) => (
          <TemplateCard key={template.id} template={template} onSelect={() => onSelectTemplate(template)} />
        ))}
      </div>

      <div className="mt-8 flex items-center gap-3 rounded-2xl border-2 border-dashed border-border/70 p-4">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-muted text-muted-foreground">
          <Wand2 className="size-5" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-display text-sm font-bold">Mau atur semuanya sendiri?</p>
          <p className="text-xs text-muted-foreground">Pilih topik, aktivitas, dan gaya visual dari awal lewat wizard biasa.</p>
        </div>
        <Button variant="outline" onClick={onStartCustom}>
          Buat Kustom <ArrowRight />
        </Button>
      </div>
    </div>
  );
}

function TemplateCard({ template, onSelect }: { template: BookTemplate; onSelect: () => void }) {
  const { config } = template;
  const palette = useStylePalette(config.style);
  const bookType = BOOK_TYPE_OPTIONS.find((o) => o.id === config.bookType);
  const age = AGE_OPTIONS.find((o) => o.id === config.ageRange);
  const difficulty = DIFFICULTY_OPTIONS.find((o) => o.id === config.difficulty);

  return (
    <button
      type="button"
      onClick={onSelect}
      className="group flex flex-col items-start gap-3 rounded-2xl border-2 border-border/70 bg-card p-4 text-left transition-all hover:border-primary/40 hover:shadow-sm hover:shadow-primary/10"
    >
      <div className="flex w-full items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          {bookType && (
            <span className="flex size-9 shrink-0 items-center justify-center rounded-xl" style={{ background: palette.accentSoft, color: palette.ink }}>
              <bookType.icon className="size-4.5" />
            </span>
          )}
          <div>
            <p className="font-display text-sm font-bold">{template.name}</p>
            <p className="text-[0.7rem] font-semibold text-muted-foreground">{bookType?.label}</p>
          </div>
        </div>
        <span className="rounded-full px-2 py-1 text-[0.65rem] font-bold" style={{ background: palette.accentSoft, color: palette.ink }}>
          {template.marketplaceNote}
        </span>
      </div>

      <p className="text-xs leading-relaxed text-muted-foreground">{template.tagline}</p>

      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.7rem] font-semibold text-muted-foreground">
        <span className="inline-flex items-center gap-1">
          <Layers className="size-3.5" /> {config.numPages} halaman
        </span>
        <span>&middot;</span>
        <span>{age?.label}</span>
        <span>&middot;</span>
        <span>{difficulty?.label}</span>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {config.activities.map((a) => {
          const opt = ACTIVITY_OPTIONS.find((o) => o.id === a);
          if (!opt) return null;
          return (
            <span key={a} className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-1 text-[0.65rem] font-semibold text-muted-foreground">
              <opt.icon className="size-3" /> {opt.label}
            </span>
          );
        })}
      </div>

      <span className="mt-1 inline-flex items-center gap-1 text-xs font-bold text-primary opacity-0 transition-opacity group-hover:opacity-100">
        <Sparkles className="size-3.5" /> Pakai Template Ini
      </span>
    </button>
  );
}
