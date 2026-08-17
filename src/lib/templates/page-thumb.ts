import type { Page } from "@/types";

/** Best-effort extraction of a representative illustration URL for a page, used in thumbnails. */
export function pageThumbIllustrationUrl(page: Page): string | undefined {
  const data = page.data as unknown as Record<string, unknown>;
  if ("illustration" in data) return (data.illustration as { url: string }).url;
  if (Array.isArray(data.items) && data.items.length) return (data.items[0] as { illustration: { url: string } }).illustration.url;
  if (Array.isArray(data.animals) && data.animals.length) return (data.animals[0] as { illustration: { url: string } }).illustration.url;
  if (Array.isArray(data.pieces) && data.pieces.length) return (data.pieces[0] as { illustration: { url: string } }).illustration.url;
  if (Array.isArray(data.pairs) && data.pairs.length) return (data.pairs[0] as { illustrationLeft: { url: string } }).illustrationLeft.url;
  return undefined;
}
