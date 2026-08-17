"use client";

import { useState } from "react";
import { CheckCircle2, FileArchive, FileText, ImageIcon, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { exportBook, type ExportFormat, type ExportResult } from "@/lib/export";
import type { Book } from "@/types";

const FORMATS: { id: ExportFormat; label: string; description: string; icon: typeof FileText }[] = [
  { id: "pdf", label: "PDF", description: "Ready for printing", icon: FileText },
  { id: "png", label: "PNG", description: "Export individual pages", icon: ImageIcon },
  { id: "zip", label: "ZIP", description: "Download all pages", icon: FileArchive },
];

export function ExportModal({
  open,
  onOpenChange,
  book,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  book: Book;
}) {
  const [format, setFormat] = useState<ExportFormat>("pdf");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ExportResult | null>(null);

  async function handleExport() {
    setLoading(true);
    setResult(null);
    try {
      const res = await exportBook(book, format);
      setResult(res);
    } finally {
      setLoading(false);
    }
  }

  function handleOpenChange(next: boolean) {
    if (!next) setResult(null);
    onOpenChange(next);
  }

  const primaryLabel = { pdf: "Download PDF", png: "Export PNG", zip: "Download ZIP" }[format];

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Export Buku</DialogTitle>
          <DialogDescription>{book.title} &middot; {book.pages.length} halaman</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-3 gap-3">
          {FORMATS.map((f) => (
            <button
              key={f.id}
              onClick={() => {
                setFormat(f.id);
                setResult(null);
              }}
              className={cn(
                "flex flex-col items-center gap-2 rounded-2xl border-2 p-4 text-center transition-colors",
                format === f.id ? "border-primary bg-primary/5" : "border-border/70 hover:border-primary/40"
              )}
            >
              <span className={cn("flex size-10 items-center justify-center rounded-xl", format === f.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")}>
                <f.icon className="size-5" />
              </span>
              <span className="font-display text-sm font-bold">{f.label}</span>
              <span className="text-[0.65rem] leading-tight text-muted-foreground">{f.description}</span>
            </button>
          ))}
        </div>

        {result && (
          <div className="flex items-start gap-2.5 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-800">
            <CheckCircle2 className="mt-0.5 size-4 shrink-0" />
            <p>{result.message}</p>
          </div>
        )}

        <DialogFooter>
          <Button size="lg" onClick={handleExport} disabled={loading} className="w-full sm:w-auto">
            {loading ? <Loader2 className="animate-spin" /> : null}
            {loading ? "Menyiapkan file..." : primaryLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
