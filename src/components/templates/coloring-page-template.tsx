import type { BookStyle, ColoringPagePageData } from "@/types";
import { InstructionBanner, useStylePalette, WorksheetFrame } from "./worksheet-frame";

export function ColoringPageTemplate({
  data,
  style,
  pageNumber,
  totalPages,
}: {
  data: ColoringPagePageData;
  style: BookStyle;
  pageNumber: number;
  totalPages: number;
}) {
  const p = useStylePalette(style);
  return (
    <WorksheetFrame style={style} pageNumber={pageNumber} totalPages={totalPages} eyebrow="Coloring">
      <InstructionBanner palette={p}>{data.instruction}</InstructionBanner>
      <div className="flex flex-1 items-center justify-center">
        <div className="flex aspect-square w-[80%] items-center justify-center rounded-[10%] border-2 border-dashed" style={{ borderColor: "#D9D3CC" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={data.illustration.url} alt={data.title} className="h-[86%] w-[86%] object-contain" draggable={false} />
        </div>
      </div>
      <p className="pt-2 text-center font-display text-sm font-bold capitalize" style={{ color: p.accent }}>
        {data.title}
      </p>
    </WorksheetFrame>
  );
}
