import type { Book } from "@/types";

export interface ExportResult {
  fileCount: number;
  message: string;
}

/**
 * Export service. Opens a real print-ready view (via the browser's native
 * print-to-PDF), which works today with zero backend. PNG/ZIP export isn't
 * implemented, so it's left out rather than faking a success message.
 */
export async function exportBook(book: Book): Promise<ExportResult> {
  await new Promise((resolve) => setTimeout(resolve, 400 + Math.random() * 300));

  if (typeof window !== "undefined") {
    window.open(`/books/${book.id}/print`, "_blank", "noopener,noreferrer");
  }
  return {
    fileCount: book.pages.length,
    message: "Halaman cetak dibuka di tab baru. Gunakan dialog Print browser untuk menyimpan sebagai PDF.",
  };
}
