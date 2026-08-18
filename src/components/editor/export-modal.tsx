"use client";

import { useRef, useState } from "react";
import { CheckCircle2, ExternalLink, FileText, Image as ImageIcon, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { PageRenderer } from "@/components/templates";
import { LicensePage } from "./license-page";
import { ListingMockup } from "./listing-mockup";
import { openPrintPreview } from "@/lib/export";
import { downloadElementAsPng, renderPagesToPdf, sanitizeFilename } from "@/lib/export/pdf";
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
  const [licenseIncluded, setLicenseIncluded] = useState(true);
  const [pdfState, setPdfState] = useState<{ loading: boolean; done: number; total: number }>({ loading: false, done: 0, total: 0 });
  const [mockupLoading, setMockupLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const pagesRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);

  async function handleDownloadPdf() {
    if (!pagesRef.current) return;
    setError(null);
    setResult(null);
    setPdfState({ loading: true, done: 0, total: 0 });
    try {
      const pageEls = Array.from(pagesRef.current.querySelectorAll<HTMLElement>(".pdf-page-capture"));
      const doc = await renderPagesToPdf(pageEls, (done, total) => setPdfState({ loading: true, done, total }));
      doc.save(`${sanitizeFilename(book.title)}.pdf`);
      setResult(`PDF berhasil dibuat — ${pageEls.length} halaman, siap diunggah ke Gumroad/Payhip.`);
    } catch {
      setError("Gagal membuat PDF. Coba lagi.");
    } finally {
      setPdfState({ loading: false, done: 0, total: 0 });
    }
  }

  async function handleDownloadMockup() {
    if (!mockupRef.current) return;
    setError(null);
    setResult(null);
    setMockupLoading(true);
    try {
      await downloadElementAsPng(mockupRef.current, `${sanitizeFilename(book.title)}-listing-preview.png`);
      setResult("Gambar preview listing berhasil diunduh.");
    } catch {
      setError("Gagal membuat gambar preview. Coba lagi.");
    } finally {
      setMockupLoading(false);
    }
  }

  function handleOpenChange(next: boolean) {
    if (!next) {
      setResult(null);
      setError(null);
    }
    onOpenChange(next);
  }

  const busy = pdfState.loading || mockupLoading;

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
            <p className="text-xs text-muted-foreground">File siap unduh &mdash; langsung bisa diunggah ke Gumroad, Payhip, dll.</p>
          </div>
        </div>

        <div className="flex items-start gap-2.5 rounded-xl border border-border/70 p-3">
          <Checkbox id="license" checked={licenseIncluded} onCheckedChange={(v) => setLicenseIncluded(v === true)} className="mt-0.5" />
          <div>
            <Label htmlFor="license" className="text-sm font-semibold">
              Sertakan halaman lisensi (Personal + Commercial Use)
            </Label>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Menambahkan 1 halaman yang menjelaskan pembeli boleh mencetak &amp; menjual hasil cetaknya, tapi tidak boleh membagikan ulang file digitalnya. Bukan nasihat hukum &mdash; sesuaikan sendiri jika perlu.
            </p>
          </div>
        </div>

        {result && (
          <div className="flex items-start gap-2.5 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-800">
            <CheckCircle2 className="mt-0.5 size-4 shrink-0" />
            <p>{result}</p>
          </div>
        )}
        {error && (
          <div className="rounded-xl bg-destructive/10 p-3 text-sm text-destructive">{error}</div>
        )}

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => openPrintPreview(book.id)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground"
          >
            <ExternalLink className="size-3.5" /> Buka pratinjau cetak
          </button>
          <span className="text-border">&middot;</span>
          <button
            type="button"
            onClick={handleDownloadMockup}
            disabled={busy}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground disabled:opacity-50"
          >
            {mockupLoading ? <Loader2 className="size-3.5 animate-spin" /> : <ImageIcon className="size-3.5" />}
            Unduh gambar preview untuk listing
          </button>
        </div>

        <DialogFooter>
          <Button size="lg" onClick={handleDownloadPdf} disabled={busy} className="w-full sm:w-auto">
            {pdfState.loading ? <Loader2 className="animate-spin" /> : null}
            {pdfState.loading
              ? pdfState.total
                ? `Membuat halaman ${pdfState.done}/${pdfState.total}...`
                : "Menyiapkan..."
              : "Download PDF"}
          </Button>
        </DialogFooter>
      </DialogContent>

      {open && (
        <div style={{ position: "fixed", top: 0, left: "-99999px", width: "210mm" }} aria-hidden="true">
          <div ref={pagesRef}>
            {book.pages.map((page) => (
              <div key={page.id} className="pdf-page-capture" style={{ width: "210mm", height: "297mm" }}>
                <PageRenderer page={page} style={book.config.style} totalPages={book.pages.length} />
              </div>
            ))}
            {licenseIncluded && (
              <div className="pdf-page-capture" style={{ width: "210mm", height: "297mm" }}>
                <LicensePage title={book.title} />
              </div>
            )}
          </div>
          <div ref={mockupRef} style={{ width: 1400 }}>
            <ListingMockup book={book} />
          </div>
        </div>
      )}
    </Dialog>
  );
}
