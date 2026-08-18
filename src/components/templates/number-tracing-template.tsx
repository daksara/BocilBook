import type { BookStyle, NumberTracingPageData } from "@/types";
import { IllustrationTile, InstructionBanner, TraceGlyph, useStylePalette, WorksheetFrame } from "./worksheet-frame";

export function NumberTracingTemplate({
  data,
  style,
  pageNumber,
  totalPages,
}: {
  data: NumberTracingPageData;
  style: BookStyle;
  pageNumber: number;
  totalPages: number;
}) {
  const p = useStylePalette(style);
  return (
    <WorksheetFrame style={style} pageNumber={pageNumber} totalPages={totalPages} eyebrow="Number Tracing">
      <InstructionBanner palette={p}>{data.instruction}</InstructionBanner>

      <div className="flex flex-1 flex-col items-center justify-center gap-4">
        <TraceGlyph color={p.ink} strokeWidth={7} className="h-[6rem] w-[6rem] sm:h-[8rem] sm:w-[8rem]">
          {data.number}
        </TraceGlyph>
        <span className="font-display text-lg font-bold sm:text-xl" style={{ color: p.accent }}>
          {data.word}
        </span>

        <div className="flex w-full flex-wrap items-center justify-center gap-2 border-b-4 border-dashed pb-3 sm:gap-4" style={{ borderColor: p.accent }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <TraceGlyph key={i} color={p.accent} strokeWidth={5} className="h-8 w-8 opacity-80 sm:h-10 sm:w-10">
              {data.number}
            </TraceGlyph>
          ))}
        </div>

        <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
          {Array.from({ length: data.number || 1 }).map((_, i) => (
            <IllustrationTile key={i} src={data.illustration.url} alt={data.word} palette={p} size="sm" />
          ))}
        </div>
      </div>
    </WorksheetFrame>
  );
}
