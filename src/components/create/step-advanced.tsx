"use client";

import { useState } from "react";
import { Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { getAIProvider } from "@/lib/ai";
import type { BookConfig } from "@/types";
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

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <StepHeading title="Instruksi Tambahan" subtitle="Opsional — tambahkan detail spesifik untuk hasil yang lebih sesuai." />

      <div className="flex flex-col gap-3">
        <Label htmlFor="advanced">Instruksi tambahan</Label>
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
