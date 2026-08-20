import type { BookStyle, FindAndCirclePageData } from "@/types";
import { cn } from "@/lib/utils";
import { InstructionBanner, useStylePalette, WorksheetFrame } from "./worksheet-frame";

export function FindAndCircleTemplate({
  data,
  style,
  pageNumber,
  totalPages,
}: {
  data: FindAndCirclePageData;
  style: BookStyle;
  pageNumber: number;
  totalPages: number;
}) {
  const p = useStylePalette(style);
  return (
    <WorksheetFrame style={style} pageNumber={pageNumber} totalPages={totalPages} eyebrow="Find & Circle">
      <InstructionBanner palette={p}>{data.instruction}</InstructionBanner>

      <div className="grid flex-1 grid-cols-3 content-evenly gap-4 sm:gap-5">
        {data.items.map((item) => (
          <div
            key={item.id}
            className={cn(
              "flex aspect-square items-center justify-center rounded-full border-3",
              item.isTarget ? "border-dashed" : "border-transparent"
            )}
            style={{ background: p.accentSoft, borderColor: item.isTarget ? p.accent : "transparent" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.illustration.url} alt={item.label} className="h-[70%] w-[70%] object-contain" draggable={false} />
          </div>
        ))}
      </div>
    </WorksheetFrame>
  );
}
