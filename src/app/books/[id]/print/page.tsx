"use client";

import { use, useEffect } from "react";
import { useBookStore } from "@/lib/store/book-store";
import { PageRenderer } from "@/components/templates";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";

export default function PrintBookPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const book = useBookStore((s) => s.books[id]);

  useEffect(() => {
    if (!book) return;
    const t = setTimeout(() => window.print(), 700);
    return () => clearTimeout(t);
  }, [book]);

  if (!book) {
    return (
      <div className="flex min-h-dvh items-center justify-center">
        <p className="text-muted-foreground">Buku tidak ditemukan.</p>
      </div>
    );
  }

  return (
    <div className="bg-neutral-200">
      <div className="no-print sticky top-0 z-10 flex items-center justify-between border-b bg-background px-6 py-3">
        <div>
          <p className="font-display font-bold">{book.title}</p>
          <p className="text-xs text-muted-foreground">{book.pages.length} halaman &middot; siap dicetak</p>
        </div>
        <Button onClick={() => window.print()}>
          <Printer /> Print / Save as PDF
        </Button>
      </div>

      <div className="flex flex-col items-center gap-6 py-6">
        {book.pages.map((page) => (
          <div key={page.id} className="print-page bg-white shadow-lg" style={{ width: "210mm", aspectRatio: "210 / 297" }}>
            <PageRenderer page={page} style={book.config.style} totalPages={book.pages.length} />
          </div>
        ))}
      </div>

      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white; }
          .print-page {
            width: 210mm !important;
            height: 297mm !important;
            box-shadow: none !important;
            page-break-after: always;
            break-after: page;
          }
          @page { size: A4; margin: 0; }
        }
      `}</style>
    </div>
  );
}
