import type { BookStyle, CoverPageData } from "@/types";
import { useStylePalette } from "./worksheet-frame";

export function CoverTemplate({
  title,
  data,
  style,
}: {
  title: string;
  data: CoverPageData;
  style: BookStyle;
}) {
  const p = useStylePalette(style);
  return (
    <div
      className="relative flex h-full w-full flex-col items-center justify-between overflow-hidden text-center"
      style={{ aspectRatio: "210 / 297", background: p.accentSoft }}
    >
      <div
        className="absolute -top-16 -left-16 h-56 w-56 rounded-full opacity-40"
        style={{ background: p.accent }}
      />
      <div
        className="absolute -bottom-20 -right-10 h-64 w-64 rounded-full opacity-30"
        style={{ background: p.accent }}
      />
      <div className="relative z-10 pt-[9%] font-display text-xs font-bold tracking-[0.3em] uppercase" style={{ color: p.accent }}>
        BocilBook
      </div>

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center gap-6 px-[10%]">
        <div
          className="flex aspect-square w-[52%] items-center justify-center rounded-[36%] shadow-lg"
          style={{ background: "white" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={data.illustration.url} alt={title} className="h-[78%] w-[78%] object-contain" draggable={false} />
        </div>
        <h1 className="font-display text-[2rem] leading-tight font-extrabold text-balance sm:text-[2.3rem]" style={{ color: p.ink }}>
          {title}
        </h1>
        {data.subtitle && (
          <span
            className="rounded-full px-4 py-1.5 font-display text-sm font-bold"
            style={{ background: p.accent, color: "white" }}
          >
            {data.subtitle}
          </span>
        )}
      </div>

      <div className="relative z-10 pb-[6%] font-display text-[0.65rem] font-semibold text-black/35">
        dibuat dengan BocilBook AI
      </div>
    </div>
  );
}
