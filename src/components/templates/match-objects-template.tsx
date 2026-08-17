import type { BookStyle, MatchObjectsPageData } from "@/types";
import { IllustrationTile, InstructionBanner, useStylePalette, WorksheetFrame } from "./worksheet-frame";

export function MatchObjectsTemplate({
  data,
  style,
  pageNumber,
  totalPages,
}: {
  data: MatchObjectsPageData;
  style: BookStyle;
  pageNumber: number;
  totalPages: number;
}) {
  const p = useStylePalette(style);
  const rightOrder = [...data.pairs].reverse();

  return (
    <WorksheetFrame style={style} pageNumber={pageNumber} totalPages={totalPages} eyebrow="Matching">
      <InstructionBanner palette={p}>{data.instruction}</InstructionBanner>

      <div className="flex flex-1 items-center justify-between gap-6 py-2">
        <div className="flex flex-1 flex-col gap-5">
          {data.pairs.map((pair) => (
            <div key={pair.id} className="flex justify-start">
              <IllustrationTile src={pair.illustrationLeft.url} alt={pair.left} palette={p} size="sm" />
            </div>
          ))}
        </div>
        <div className="flex flex-col items-stretch gap-5 self-stretch justify-around opacity-20">
          {data.pairs.map((pair) => (
            <div key={pair.id} className="h-px flex-1 border-t-2 border-dashed" style={{ borderColor: p.ink }} />
          ))}
        </div>
        <div className="flex flex-1 flex-col gap-5">
          {rightOrder.map((pair) => (
            <div key={pair.id} className="flex justify-end">
              <IllustrationTile src={pair.illustrationRight.url} alt={pair.right} palette={p} size="sm" />
            </div>
          ))}
        </div>
      </div>
    </WorksheetFrame>
  );
}
