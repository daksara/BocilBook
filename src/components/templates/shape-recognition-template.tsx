import type { ReactNode } from "react";
import type { BookStyle, ShapeRecognitionPageData } from "@/types";
import { InstructionBanner, useStylePalette, WorksheetFrame } from "./worksheet-frame";

const SHAPE_SVG: Record<string, (color: string) => ReactNode> = {
  circle: (c) => <circle cx="50" cy="50" r="42" fill={c} />,
  square: (c) => <rect x="10" y="10" width="80" height="80" rx="8" fill={c} />,
  triangle: (c) => <path d="M50 10 L90 88 L10 88 Z" fill={c} strokeLinejoin="round" />,
  rectangle: (c) => <rect x="4" y="24" width="92" height="52" rx="8" fill={c} />,
  star: (c) => <path d="M50 8 L61 38 L94 38 L67 58 L77 90 L50 70 L23 90 L33 58 L6 38 L39 38 Z" fill={c} />,
  heart: (c) => <path d="M50 88 C10 62 10 30 32 22 C44 18 50 30 50 36 C50 30 56 18 68 22 C90 30 90 62 50 88 Z" fill={c} />,
  oval: (c) => <ellipse cx="50" cy="50" rx="46" ry="30" fill={c} />,
  diamond: (c) => <path d="M50 6 L92 50 L50 94 L8 50 Z" fill={c} />,
};

export function ShapeRecognitionTemplate({
  data,
  style,
  pageNumber,
  totalPages,
}: {
  data: ShapeRecognitionPageData;
  style: BookStyle;
  pageNumber: number;
  totalPages: number;
}) {
  const p = useStylePalette(style);
  const colors = [p.accent, "#4FB6E8", "#4FCB8E", "#9B7DE0", "#FFD166", "#FF6B8A"];
  return (
    <WorksheetFrame style={style} pageNumber={pageNumber} totalPages={totalPages} eyebrow="Shapes">
      <InstructionBanner palette={p}>{data.instruction}</InstructionBanner>

      <div className="grid flex-1 grid-cols-2 content-center gap-4 sm:gap-6">
        {data.shapes.map((s, i) => (
          <div key={s.id} className="flex flex-col items-center gap-2 rounded-2xl p-3" style={{ background: p.accentSoft }}>
            <svg viewBox="0 0 100 100" className="h-16 w-16 sm:h-20 sm:w-20">
              {SHAPE_SVG[s.shape]?.(colors[i % colors.length])}
            </svg>
            <span className="font-display text-sm font-bold sm:text-base" style={{ color: p.ink }}>
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </WorksheetFrame>
  );
}
