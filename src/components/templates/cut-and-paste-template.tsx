import type { BookStyle, CutAndPastePageData } from "@/types";
import { InstructionBanner, useStylePalette, WorksheetFrame } from "./worksheet-frame";
import { Scissors } from "lucide-react";

export function CutAndPasteTemplate({
  data,
  style,
  pageNumber,
  totalPages,
}: {
  data: CutAndPastePageData;
  style: BookStyle;
  pageNumber: number;
  totalPages: number;
}) {
  const p = useStylePalette(style);
  return (
    <WorksheetFrame style={style} pageNumber={pageNumber} totalPages={totalPages} eyebrow="Cut & Paste">
      <InstructionBanner palette={p}>{data.instruction}</InstructionBanner>

      <div className="flex flex-1 flex-col gap-4">
        <div className="flex items-center gap-2 text-xs font-bold" style={{ color: p.accent }}>
          <Scissors className="size-3.5" />
          <span>potong garis putus-putus</span>
        </div>
        <div className="flex flex-wrap justify-center gap-4 rounded-2xl border-2 border-dashed p-4" style={{ borderColor: p.accent }}>
          {data.pieces.map((piece) => (
            <div key={piece.id} className="flex aspect-square w-16 items-center justify-center rounded-xl border-2 border-dashed sm:w-20" style={{ borderColor: "#D9D3CC", background: p.accentSoft }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={piece.illustration.url} alt={piece.label} className="h-[72%] w-[72%] object-contain" draggable={false} />
            </div>
          ))}
        </div>

        <div
          className="flex flex-1 items-center justify-center rounded-2xl border-4 border-dashed"
          style={{ borderColor: p.accent, background: "white" }}
        >
          <span className="font-display text-base font-bold capitalize sm:text-lg" style={{ color: p.accent }}>
            tempel {data.targetLabel}
          </span>
        </div>
      </div>
    </WorksheetFrame>
  );
}
