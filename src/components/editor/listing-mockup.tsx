import type { Book } from "@/types";
import { PageRenderer } from "@/components/templates";
import { useStylePalette } from "@/components/templates/worksheet-frame";

const CARD_ASPECT = 297 / 210;

export function ListingMockup({ book }: { book: Book }) {
  const palette = useStylePalette(book.config.style);
  const cover = book.pages[0];
  const samples = book.pages.slice(1, 4);
  const rotations = [2, -3, 4];

  return (
    <div
      className="relative flex flex-col items-center justify-center gap-10 overflow-hidden px-16 py-14"
      style={{ width: 1400, height: 1050, background: `linear-gradient(135deg, ${palette.accentSoft}, #ffffff)` }}
    >
      <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full opacity-25" style={{ background: palette.accent }} />
      <div className="absolute -right-20 -bottom-28 h-80 w-80 rounded-full opacity-15" style={{ background: palette.accent }} />

      <div className="relative z-10 text-center">
        <p className="font-display text-4xl font-extrabold" style={{ color: palette.ink }}>
          {book.title}
        </p>
        <p className="mt-2 font-display text-lg font-bold" style={{ color: palette.accent }}>
          {book.pages.length} Halaman &middot; Siap Cetak &middot; Digital Download
        </p>
      </div>

      <div className="relative z-10 flex items-center justify-center gap-6">
        {cover && (
          <div
            className="overflow-hidden rounded-2xl bg-white shadow-2xl"
            style={{ width: 260, height: 260 * CARD_ASPECT, transform: "rotate(-3deg)" }}
          >
            <PageRenderer page={cover} style={book.config.style} totalPages={book.pages.length} />
          </div>
        )}
        {samples.map((page, i) => (
          <div
            key={page.id}
            className="overflow-hidden rounded-2xl bg-white shadow-xl"
            style={{
              width: 190,
              height: 190 * CARD_ASPECT,
              transform: `rotate(${rotations[i]}deg)`,
              marginTop: i % 2 === 0 ? 28 : -16,
            }}
          >
            <PageRenderer page={page} style={book.config.style} totalPages={book.pages.length} />
          </div>
        ))}
      </div>

      <p className="relative z-10 font-display text-xs font-bold opacity-40" style={{ color: palette.ink }}>
        Dibuat dengan BocilBook
      </p>
    </div>
  );
}
