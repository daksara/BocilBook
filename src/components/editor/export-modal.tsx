"use client";

import { useState } from "react";
import { CheckCircle2, FileText, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { exportBook, type ExportResult } from "@/lib/export";
import type { Book } from "@/types";

export function ExportModal({
  open,
  onOpenChange,
  book,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  book: Book;
}) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ExportResult | null>(null);

  async function handleExport() {
    setLoading(true);
    setResult(null);
    try {
      const res = await exportBook(book);
      setResult(res);
    } finally {
      setLoading(false);
    }
  }

  function handleOpenChange(next: boolean) {
    if (!next) setResult(null);
    onOpenChange(next);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Export Buku</DialogTitle>
          <DialogDescription>{book.title} &middot; {book.pages.length} halaman</DialogDescription>
        </DialogHeader>

        <div className="flex items-center gap-3 rounded-2xl border-2 border-primary bg-primary/5 p-4">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <FileText className="size-5" />
          </span>
          <div>
            <p className="font-display text-sm font-bold">PDF</p>
            <p className="text-xs text-muted-foreground">Siap dicetak lewat dialog Print browser</p>
          </div>
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
            {loading ? "Menyiapkan file..." : "Download PDF"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
