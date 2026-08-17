"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { useBookStore } from "@/lib/store/book-store";
import { PreviewView } from "@/components/editor/preview-view";
import { ExportModal } from "@/components/editor/export-modal";
import { Button } from "@/components/ui/button";

export default function BookPreviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const book = useBookStore((s) => s.books[id]);
  const [exportOpen, setExportOpen] = useState(false);

  if (!book) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center gap-3 text-center">
        <p className="font-display text-xl font-bold">Buku tidak ditemukan</p>
        <Button onClick={() => router.push("/books")}>Kembali ke My Books</Button>
      </div>
    );
  }

  return (
    <>
      <PreviewView book={book} onExport={() => setExportOpen(true)} />
      <ExportModal open={exportOpen} onOpenChange={setExportOpen} book={book} />
    </>
  );
}
