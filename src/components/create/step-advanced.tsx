"use client";

import { useState } from "react";
import { Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { getAIProvider } from "@/lib/ai";
import { cn } from "@/lib/utils";
import type { BookConfig } from "@/types";
import { ADDITIONAL_INSTRUCTION_PRESETS } from "./wizard-options";
import { StepHeading } from "./step-heading";

export function StepAdvanced({
  value,
  onChange,
  config,
}: {
  value: string;
  onChange: (v: string) => void;
  config: BookConfig;
}) {
  const [enhancing, setEnhancing] = useState(false);

  async function handleEnhance() {
    if (!value.trim() || enhancing) return;
    setEnhancing(true);
    try {
      const result = await getAIProvider().enhanceInstructions(value, config);
      onChange(result);
    } finally {
      setEnhancing(false);
    }
  }

  function togglePreset(text: string) {
    if (value.includes(text)) {
      const next = value
        .split(text)
        .join("")
        .replace(/\s{2,}/g, " ")
        .trim();
      onChange(next);
      return;
    }
    onChange(value.trim() ? `${value.trim()} ${text}` : text);
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <StepHeading title="Instruksi Tambahan" subtitle="Opsional — tambahkan detail spesifik untuk hasil yang lebih sesuai." />

      <div className="flex flex-col gap-3">
        <Label htmlFor="advanced">Instruksi tambahan</Label>
        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-muted-foreground">
            Saran instruksi — klik untuk menambahkan tanpa perlu mengetik
          </span>
          <div className="flex flex-wrap gap-2">
            {ADDITIONAL_INSTRUCTION_PRESETS.map((preset) => {
              const active = value.includes(preset.text);
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => togglePreset(preset.text)}
                  className={cn(
                    "rounded-full border-2 px-3 py-1.5 text-xs font-semibold transition-colors",
                    active
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-border/70 text-muted-foreground hover:border-primary/40 hover:text-foreground"
                  )}
                >
                  {preset.label}
                </button>
              );
            })}
          </div>
        </div>
        <Textarea
          id="advanced"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Contoh: Gunakan karakter hewan yang lucu, gunakan bahasa sederhana, dan buat aktivitas yang tidak terlalu sulit."
          className="min-h-40"
        />
        <div>
          <Button type="button" variant="soft" onClick={handleEnhance} disabled={!value.trim() || enhancing}>
            {enhancing ? <Loader2 className="animate-spin" /> : <Sparkles />}
            Enhance with AI
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          AI akan mengubah instruksimu menjadi spesifikasi buku yang lebih terstruktur.
        </p>
      </div>
    </div>
  );
}
