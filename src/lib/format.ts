export function formatRelativeTime(iso: string): string {
  const then = new Date(iso).getTime();
  const now = Date.now();
  const diffSec = Math.max(0, Math.floor((now - then) / 1000));

  if (diffSec < 60) return "Baru saja";
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin} menit lalu`;
  const diffHour = Math.floor(diffMin / 60);
  if (diffHour < 24) return `${diffHour} jam lalu`;
  const diffDay = Math.floor(diffHour / 24);
  if (diffDay < 7) return `${diffDay} hari lalu`;
  const diffWeek = Math.floor(diffDay / 7);
  if (diffWeek < 4) return `${diffWeek} minggu lalu`;
  const diffMonth = Math.floor(diffDay / 30);
  return `${diffMonth} bulan lalu`;
}

export const BOOK_TYPE_LABEL: Record<string, string> = {
  workbook: "Workbook",
  "coloring-book": "Coloring Book",
  "activity-book": "Activity Book",
  "learning-book": "Learning Book",
  "story-book": "Story Book",
};

export const BOOK_STYLE_LABEL: Record<string, string> = {
  "cute-cartoon": "Cute Cartoon",
  minimal: "Minimal",
  colorful: "Colorful",
  "soft-pastel": "Soft Pastel",
  educational: "Educational",
  "islamic-kids": "Islamic Kids",
  "bw-printable": "Black & White",
};
