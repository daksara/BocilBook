import type { Book } from "@/types";

export type ExportFormat = "pdf" | "png" | "zip";

export interface ExportResult {
  format: ExportFormat;
  fileCount: number;
  mock: boolean;
  message: string;
}

/**
 * Export service abstraction. `pdf` opens a real print-ready view (via the
 * browser's native print-to-PDF), which works today with zero backend.
 * `png`/`zip` are structured the same way but return a mock result — swap
 * their bodies for real calls to a rendering/export service later without
 * touching any caller.
 */
export async function exportBook(book: Book, format: ExportFormat): Promise<ExportResult> {
  await new Promise((resolve) => setTimeout(resolve, 900 + Math.random() * 500));

  if (format === "pdf") {
    if (typeof window !== "undefined") {
      window.open(`/books/${book.id}/print`, "_blank", "noopener,noreferrer");
    }
    return {
      format,
      fileCount: book.pages.length,
      mock: false,
      message: "Halaman cetak dibuka di tab baru. Gunakan dialog Print browser untuk menyimpan sebagai PDF.",
    };
  }

  return {
    format,
    fileCount: book.pages.length,
    mock: true,
    message:
      format === "png"
        ? `${book.pages.length} halaman siap diexport sebagai PNG. (Mode demo — hubungkan layanan render untuk file sungguhan.)`
        : `File ZIP berisi ${book.pages.length} halaman siap diunduh. (Mode demo — hubungkan layanan export untuk file sungguhan.)`,
  };
}
