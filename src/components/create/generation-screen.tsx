"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { generateFullBook } from "@/lib/ai/generate-book";
import { useStylePalette } from "@/components/templates/worksheet-frame";
import { pageThumbIllustrationUrl } from "@/lib/templates/page-thumb";
import type { Book, BookConfig, GenerationStepKey } from "@/types";

const STEPS: { key: GenerationStepKey; label: string }[] = [
  { key: "analyze_theme", label: "Menganalisis tema" },
  { key: "structure", label: "Membuat struktur buku" },
  { key: "activities", label: "Menentukan aktivitas" },
  { key: "content", label: "Membuat konten halaman" },
  { key: "illustrations", label: "Membuat ilustrasi" },
  { key: "layout", label: "Menyusun layout" },
  { key: "qa", label: "Final quality check" },
];

const TOTAL_DURATION_MS = 5200;

export function GenerationScreen({ config, onComplete }: { config: BookConfig; onComplete: (book: Book) => void }) {
  const [progress, setProgress] = useState(0);
  const book = useMemo(() => generateFullBook(config), [config]);
  const palette = useStylePalette(config.style);
  const doneRef = useRef(false);

  useEffect(() => {
    const start = performance.now();
    let raf: number;

    function tick(now: number) {
      const elapsed = now - start;
      const pct = Math.min(100, Math.round((elapsed / TOTAL_DURATION_MS) * 100));
      setProgress(pct);
      if (pct < 100) {
        raf = requestAnimationFrame(tick);
      } else if (!doneRef.current) {
        doneRef.current = true;
        setTimeout(() => onComplete(book), 500);
      }
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [book]);

  const activeStepIndex = Math.min(STEPS.length - 1, Math.floor((progress / 100) * STEPS.length));
  const revealedCount = Math.floor((progress / 100) * book.pages.length);

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-background px-4 py-12">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background: `radial-gradient(50% 40% at 20% 10%, ${palette.accentSoft}, transparent), radial-gradient(45% 35% at 85% 90%, ${palette.accentSoft}, transparent)`,
        }}
      />

      <div className="mb-8 flex flex-col items-center text-center">
        <span className="mb-4 flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Sparkles className="size-7 animate-pulse" />
        </span>
        <h1 className="font-display text-2xl font-extrabold sm:text-3xl">Sedang membuat buku kamu ✨</h1>
        <p className="mt-2 text-muted-foreground">AI sedang menyusun aktivitas dan ilustrasi.</p>
      </div>

      <div className="mb-8 flex flex-col items-center">
        <div className="relative flex size-32 items-center justify-center">
          <svg viewBox="0 0 120 120" className="absolute inset-0 -rotate-90">
            <circle cx="60" cy="60" r="52" fill="none" stroke="var(--color-muted)" strokeWidth="10" />
            <circle
              cx="60"
              cy="60"
              r="52"
              fill="none"
              stroke="var(--color-primary)"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 52}
              strokeDashoffset={2 * Math.PI * 52 * (1 - progress / 100)}
              style={{ transition: "stroke-dashoffset 120ms linear" }}
            />
          </svg>
          <span className="font-display text-3xl font-extrabold">{progress}%</span>
        </div>
      </div>

      <div className="mb-10 w-full max-w-sm rounded-2xl border border-border/70 bg-card p-5">
        <ul className="flex flex-col gap-3">
          {STEPS.map((step, i) => {
            const status = i < activeStepIndex ? "done" : i === activeStepIndex ? "active" : "pending";
            return (
              <li key={step.key} className="flex items-center gap-3">
                <span
                  className={cn(
                    "flex size-6 shrink-0 items-center justify-center rounded-full border-2",
                    status === "done" && "border-primary bg-primary text-primary-foreground",
                    status === "active" && "border-primary text-primary",
                    status === "pending" && "border-border text-transparent"
                  )}
                >
                  {status === "done" && <Check className="size-3.5" strokeWidth={3} />}
                  {status === "active" && <Loader2 className="size-3.5 animate-spin" />}
                </span>
                <span
                  className={cn(
                    "text-sm font-medium",
                    status === "pending" ? "text-muted-foreground" : "text-foreground"
                  )}
                >
                  {step.label}
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="grid w-full max-w-2xl grid-cols-4 gap-3 sm:grid-cols-6">
        <AnimatePresence>
          {book.pages.slice(0, revealedCount).map((page) => {
            const url = pageThumbIllustrationUrl(page);
            return (
              <motion.div
                key={page.id}
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="flex aspect-[3/4] items-center justify-center rounded-lg border border-border/60 bg-card shadow-sm"
                style={{ background: palette.accentSoft }}
              >
                {url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={url} alt="" className="h-[60%] w-[60%] object-contain" />
                ) : (
                  <Sparkles className="size-4 text-muted-foreground" />
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
