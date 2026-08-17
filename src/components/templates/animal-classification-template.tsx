import type { AnimalClassificationPageData, BookStyle } from "@/types";
import { InstructionBanner, useStylePalette, WorksheetFrame } from "./worksheet-frame";

export function AnimalClassificationTemplate({
  data,
  style,
  pageNumber,
  totalPages,
}: {
  data: AnimalClassificationPageData;
  style: BookStyle;
  pageNumber: number;
  totalPages: number;
}) {
  const p = useStylePalette(style);
  return (
    <WorksheetFrame style={style} pageNumber={pageNumber} totalPages={totalPages} eyebrow="Classification">
      <InstructionBanner palette={p}>{data.instruction}</InstructionBanner>

      <div className="mb-3 flex flex-wrap justify-center gap-3">
        {data.animals.map((a) => (
          <div key={a.id} className="flex aspect-square w-12 items-center justify-center rounded-xl sm:w-14" style={{ background: p.accentSoft }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={a.illustration.url} alt={a.label} className="h-[74%] w-[74%] object-contain" draggable={false} />
          </div>
        ))}
      </div>

      <div className="grid flex-1 gap-3" style={{ gridTemplateColumns: `repeat(${data.categories.length}, minmax(0, 1fr))` }}>
        {data.categories.map((cat) => (
          <div key={cat} className="flex flex-col gap-2 rounded-2xl border-2 border-dashed p-3" style={{ borderColor: p.accent }}>
            <span className="text-center font-display text-xs font-bold sm:text-sm" style={{ color: p.accent }}>
              {cat}
            </span>
            <div className="flex flex-1 flex-wrap content-start justify-center gap-2">
              {data.animals
                .filter((a) => a.category === cat)
                .map((a) => (
                  <div key={a.id} className="h-3 w-8 rounded-full" style={{ background: p.accentSoft }} />
                ))}
            </div>
          </div>
        ))}
      </div>
    </WorksheetFrame>
  );
}
