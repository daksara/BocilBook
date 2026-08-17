"use client";

import { useState } from "react";
import { ArrowUp, Loader2, Plus, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { getAIProvider } from "@/lib/ai";
import type { BookConfig, Page } from "@/types";

const QUICK_ACTIONS = [
  "Buat lebih mudah",
  "Ganti gambar",
  "Buat instruksi lebih sederhana",
  "Ubah tema",
  "Buat halaman ini lebih menarik",
];

export function AskAiPanel({
  page,
  config,
  onUpdate,
  onAddActivity,
}: {
  page: Page;
  config: BookConfig;
  onUpdate: (updater: (page: Page) => Page) => void;
  onAddActivity?: () => void;
}) {
  const [loading, setLoading] = useState<string | null>(null);
  const [prompt, setPrompt] = useState("");

  async function runInstruction(instruction: string) {
    setLoading(instruction);
    try {
      const next = await getAIProvider().improvePage(page, instruction, config);
      onUpdate(() => next);
      if (instruction === prompt) setPrompt("");
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-primary/20 bg-primary/[0.04] p-3.5">
      <div className="flex items-center gap-2">
        <span className="flex size-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Sparkles className="size-3.5" />
        </span>
        <span className="font-display text-sm font-bold">Ask AI</span>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {QUICK_ACTIONS.map((action) => (
          <button
            key={action}
            onClick={() => runInstruction(action)}
            disabled={loading !== null}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-2.5 py-1.5 text-xs font-medium transition-colors hover:border-primary hover:text-primary disabled:opacity-50"
            )}
          >
            {loading === action && <Loader2 className="size-3 animate-spin" />}
            {action}
          </button>
        ))}
        {onAddActivity && (
          <button
            onClick={onAddActivity}
            disabled={loading !== null}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-2.5 py-1.5 text-xs font-medium transition-colors hover:border-primary hover:text-primary disabled:opacity-50"
          >
            <Plus className="size-3" /> Tambah aktivitas
          </button>
        )}
      </div>

      <form
        className="flex items-center gap-1.5"
        onSubmit={(e) => {
          e.preventDefault();
          if (prompt.trim()) runInstruction(prompt.trim());
        }}
      >
        <Input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Minta AI mengubah halaman ini..."
          className="h-9 bg-card text-sm"
          disabled={loading !== null}
        />
        <Button type="submit" size="icon-sm" disabled={!prompt.trim() || loading !== null}>
          {loading === prompt ? <Loader2 className="size-3.5 animate-spin" /> : <ArrowUp className="size-3.5" />}
        </Button>
      </form>
    </div>
  );
}
