"use client";

import { useState } from "react";
import { Loader2, RefreshCw } from "lucide-react";
import type { BookStyle, Illustration } from "@/types";
import { generateIllustrationSync } from "@/lib/illustrations";
import { OBJECT_POOL } from "@/lib/ai/content-pools";
import { illustrationPrompt } from "@/lib/ai/content-builder";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export function regenerateIllustration(current: Illustration, style: BookStyle): Illustration {
  const pool = OBJECT_POOL.filter((s) => s !== current.subject);
  const subject = pool[Math.floor(Math.random() * pool.length)] ?? current.subject;
  const seed = `${subject}-${Date.now()}`;
  const { url, palette } = generateIllustrationSync(subject, style, seed);
  return {
    id: `ill-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 5)}`,
    subject,
    prompt: illustrationPrompt(subject, style),
    url,
    palette,
    status: "ready",
  };
}

export function IllustrationField({
  label = "Ilustrasi",
  illustration,
  style,
  onChange,
}: {
  label?: string;
  illustration: Illustration;
  style: BookStyle;
  onChange: (next: Illustration) => void;
}) {
  const [loading, setLoading] = useState(false);

  function handleSwap() {
    setLoading(true);
    setTimeout(() => {
      onChange(regenerateIllustration(illustration, style));
      setLoading(false);
    }, 350);
  }

  return (
    <div className="flex flex-col gap-2">
      <Label>{label}</Label>
      <div className="flex items-center gap-3 rounded-xl border border-border/70 p-2.5">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-muted">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={illustration.url} alt={illustration.subject} className="h-[75%] w-[75%] object-contain" />
        </div>
        <span className="flex-1 truncate text-sm text-muted-foreground capitalize">{illustration.subject}</span>
        <Button size="sm" variant="outline" onClick={handleSwap} disabled={loading}>
          {loading ? <Loader2 className="animate-spin" /> : <RefreshCw />}
          Ganti
        </Button>
      </div>
    </div>
  );
}
