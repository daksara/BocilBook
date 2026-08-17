"use client";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useStylePalette } from "@/components/templates/worksheet-frame";
import type { AgeRange, BookConfig, BookStyle, Difficulty, Language } from "@/types";
import { AGE_OPTIONS, DIFFICULTY_OPTIONS, LANGUAGE_OPTIONS, PAGE_OPTIONS, STYLE_OPTIONS } from "./wizard-options";
import { StepHeading } from "./step-heading";

export function StepConfig({
  config,
  onChange,
}: {
  config: BookConfig;
  onChange: (patch: Partial<BookConfig>) => void;
}) {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <StepHeading title="Konfigurasi Buku" subtitle="Sesuaikan topik, usia, dan gaya visual bukumu." />

      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <Label htmlFor="topic">Apa yang ingin dipelajari?</Label>
          <Textarea
            id="topic"
            value={config.topic}
            onChange={(e) => onChange({ topic: e.target.value })}
            placeholder="Contoh: Mengenal huruf A-Z untuk anak usia 3-5 tahun"
            className="min-h-28"
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label>Usia</Label>
            <Select value={config.ageRange} onValueChange={(v) => onChange({ ageRange: v as AgeRange })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {AGE_OPTIONS.map((o) => (
                  <SelectItem key={o.id} value={o.id}>{o.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label>Bahasa</Label>
            <Select value={config.language} onValueChange={(v) => onChange({ language: v as Language })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {LANGUAGE_OPTIONS.map((o) => (
                  <SelectItem key={o.id} value={o.id}>{o.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Label>Jumlah Halaman</Label>
          <div className="flex flex-wrap gap-2.5">
            {PAGE_OPTIONS.map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => onChange({ numPages: n })}
                className={cn(
                  "flex h-12 min-w-16 items-center justify-center rounded-xl border-2 px-4 font-display font-bold transition-colors",
                  config.numPages === n
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border/70 text-muted-foreground hover:border-primary/40"
                )}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Label>Tingkat Kesulitan</Label>
          <div className="grid grid-cols-3 gap-2.5">
            {DIFFICULTY_OPTIONS.map((o) => (
              <button
                key={o.id}
                type="button"
                onClick={() => onChange({ difficulty: o.id as Difficulty })}
                className={cn(
                  "flex flex-col items-center gap-0.5 rounded-xl border-2 px-3 py-2.5 text-center transition-colors",
                  config.difficulty === o.id
                    ? "border-primary bg-primary/5"
                    : "border-border/70 hover:border-primary/40"
                )}
              >
                <span className="font-display text-sm font-bold">{o.label}</span>
                <span className="hidden text-[0.65rem] text-muted-foreground sm:block">{o.description}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Label>Gaya Visual</Label>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {STYLE_OPTIONS.map((o) => (
              <StyleSwatch key={o.id} styleId={o.id} label={o.label} selected={config.style === o.id} onClick={() => onChange({ style: o.id })} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StyleSwatch({
  styleId,
  label,
  selected,
  onClick,
}: {
  styleId: BookStyle;
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  const p = useStylePalette(styleId);
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex flex-col items-center gap-2 rounded-2xl border-2 p-3 transition-all",
        selected ? "border-primary shadow-sm shadow-primary/10" : "border-border/70 hover:border-primary/40"
      )}
    >
      <span
        className="flex h-12 w-full items-center justify-center gap-1.5 rounded-lg"
        style={{ background: p.accentSoft }}
      >
        <span className="size-4 rounded-full" style={{ background: p.accent }} />
        <span className="size-4 rounded-full" style={{ background: p.ink, opacity: 0.7 }} />
      </span>
      <span className="text-xs font-semibold">{label}</span>
    </button>
  );
}
