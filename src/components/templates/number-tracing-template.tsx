import type { BookStyle, NumberTracingPageData } from "@/types";
import { IllustrationTile, InstructionBanner, useStylePalette, WorksheetFrame } from "./worksheet-frame";

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
        <span
          className="font-display text-[6rem] leading-none font-extrabold sm:text-[8rem]"
          style={{ color: "transparent", WebkitTextStroke: `3.5px ${p.ink}` }}
        >
          {data.number}
        </span>
        <span className="font-display text-lg font-bold sm:text-xl" style={{ color: p.accent }}>
          {data.word}
        </span>

        <div className="flex w-full flex-wrap items-center justify-center gap-2 border-b-4 border-dashed pb-3 sm:gap-4" style={{ borderColor: p.accent }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <span
              key={i}
              className="font-display text-2xl font-bold sm:text-3xl"
              style={{ color: "transparent", WebkitTextStroke: `1.5px ${p.accent}`, opacity: 0.8 }}
            >
              {data.number}
            </span>
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
