import { jsPDF } from "jspdf";
import html2canvas from "html2canvas-pro";

/** Rasterizes each page element (A4, 210x297mm) into one downloadable PDF, client-side, no backend. */
export async function renderPagesToPdf(
  pageEls: HTMLElement[],
  onProgress?: (done: number, total: number) => void
): Promise<jsPDF> {
  await document.fonts.ready;
  const doc = new jsPDF({ unit: "mm", format: "a4", compress: true });
  for (let i = 0; i < pageEls.length; i++) {
    const canvas = await html2canvas(pageEls[i], { scale: 2, backgroundColor: "#ffffff" });
    const imgData = canvas.toDataURL("image/jpeg", 0.92);
    if (i > 0) doc.addPage();
    doc.addImage(imgData, "JPEG", 0, 0, 210, 297);
    onProgress?.(i + 1, pageEls.length);
  }
  return doc;
}

/** Rasterizes a single element (e.g. a listing mockup) into a downloadable PNG. */
export async function downloadElementAsPng(el: HTMLElement, filename: string): Promise<void> {
  await document.fonts.ready;
  const canvas = await html2canvas(el, { scale: 2, backgroundColor: "#ffffff" });
  const a = document.createElement("a");
  a.href = canvas.toDataURL("image/png");
  a.download = filename;
  a.click();
}

export function sanitizeFilename(name: string): string {
  const cleaned = name
    .trim()
    .replace(/[^\p{L}\p{N}\-_ ]/gu, "")
    .replace(/\s+/g, "-")
    .slice(0, 80);
  return cleaned || "bocilbook";
}
