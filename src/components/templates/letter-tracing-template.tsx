import type { BookStyle, LetterTracingPageData } from "@/types";
import { IllustrationTile, InstructionBanner, TraceGlyph, useStylePalette, WorksheetFrame } from "./worksheet-frame";

export function LetterTracingTemplate({
  data,
  style,
  pageNumber,
  totalPages,
}: {
  data: LetterTracingPageData;
  style: BookStyle;
  pageNumber: number;
  totalPages: number;
}) {
  const p = useStylePalette(style);
  return (
    <WorksheetFrame style={style} pageNumber={pageNumber} totalPages={totalPages} eyebrow="Letter Tracing">
      <InstructionBanner palette={p}>{data.instruction}</InstructionBanner>

      <div className="flex flex-1 flex-col items-center justify-center gap-4">
        <div className="flex items-end gap-4 sm:gap-6">
          <TraceGlyph color={p.ink} strokeWidth={7} className="h-[5.5rem] w-[5.5rem] sm:h-[8rem] sm:w-[8rem]">
            {data.uppercase}
          </TraceGlyph>
          <TraceGlyph color={p.ink} strokeWidth={6} className="h-[3.4rem] w-[3.4rem] sm:h-[5rem] sm:w-[5rem]">
            {data.lowercase}
          </TraceGlyph>
        </div>

        <div className="flex w-full flex-wrap items-center justify-center gap-2 border-b-4 border-dashed pb-3 sm:gap-4" style={{ borderColor: p.accent }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <TraceGlyph key={i} color={p.accent} strokeWidth={5} className="h-8 w-8 opacity-80 sm:h-12 sm:w-12">
              {i % 2 === 0 ? data.uppercase : data.lowercase}
            </TraceGlyph>
          ))}
        </div>

        <div className="mt-2 flex items-center gap-4 sm:gap-6">
          <IllustrationTile src={data.illustration.url} alt={data.exampleWord} palette={p} size="md" />
          <span className="font-display text-xl font-bold sm:text-2xl" style={{ color: p.ink }}>
            {data.exampleWord}
          </span>
        </div>
      </div>
    </WorksheetFrame>
  );
}
