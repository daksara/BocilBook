import type { BookStyle, LetterTracingPageData } from "@/types";
import { IllustrationTile, InstructionBanner, useStylePalette, WorksheetFrame } from "./worksheet-frame";

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
          <span
            className="font-trace text-[5.5rem] leading-none font-bold sm:text-[8rem]"
            style={{ color: "transparent", WebkitTextStroke: `5px ${p.ink}` }}
          >
            {data.uppercase}
          </span>
          <span
            className="font-trace text-[3.4rem] leading-none font-bold sm:text-[5rem]"
            style={{ color: "transparent", WebkitTextStroke: `4px ${p.ink}` }}
          >
            {data.lowercase}
          </span>
        </div>

        <div className="flex w-full flex-wrap items-center justify-center gap-2 border-b-4 border-dashed pb-3 sm:gap-4" style={{ borderColor: p.accent }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className="font-trace text-2xl font-bold sm:text-4xl"
              style={{ color: "transparent", WebkitTextStroke: `2.5px ${p.accent}`, opacity: 0.8 }}
            >
              {i % 2 === 0 ? data.uppercase : data.lowercase}
            </span>
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
