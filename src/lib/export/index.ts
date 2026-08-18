/** Opens the print-ready view in a new tab, for manual browser print-to-PDF as an alternative to the automatic PDF download. */
export function openPrintPreview(bookId: string): void {
  if (typeof window !== "undefined") {
    window.open(`/books/${bookId}/print`, "_blank", "noopener,noreferrer");
  }
}
