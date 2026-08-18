import * as React from "react";
import { cn } from "@/lib/utils";
import type { BookStyle } from "@/types";

export interface StylePalette {
  accent: string;
  accentSoft: string;
  ink: string;
}

const STYLE_PALETTES: Record<BookStyle, StylePalette> = {
  "cute-cartoon": { accent: "#FF8A65", accentSoft: "#FFF3EC", ink: "#3A2E2A" },
  colorful: { accent: "#FF6B6B", accentSoft: "#FFF6E9", ink: "#2B2B2B" },
  "soft-pastel": { accent: "#C9B6E4", accentSoft: "#F8F5FF", ink: "#4A4457" },
  minimal: { accent: "#7C8B94", accentSoft: "#FAFAF8", ink: "#2C2C2C" },
  educational: { accent: "#3E7CB1", accentSoft: "#F4FAFF", ink: "#20303D" },
  "islamic-kids": { accent: "#1E9E6B", accentSoft: "#F1FBF6", ink: "#1F3A2D" },
  "bw-printable": { accent: "#1A1A1A", accentSoft: "#FFFFFF", ink: "#1A1A1A" },
};

export function useStylePalette(style: BookStyle): StylePalette {
  return STYLE_PALETTES[style] ?? STYLE_PALETTES["cute-cartoon"];
}

export function WorksheetFrame({
  style,
  pageNumber,
  totalPages,
  eyebrow,
  className,
  children,
  bare,
}: {
  style: BookStyle;
  pageNumber: number;
  totalPages: number;
  eyebrow?: string;
  className?: string;
  children: React.ReactNode;
  bare?: boolean;
}) {
  const p = useStylePalette(style);
  return (
    <div
      className={cn(
        "relative flex h-full w-full flex-col overflow-hidden bg-white text-[#2B2B2B]",
        className
      )}
      style={{ aspectRatio: "210 / 297" }}
    >
      <div className="absolute inset-x-0 top-0 h-3" style={{ background: p.accent }} />
      {!bare && eyebrow && (
        <div className="flex items-center justify-between px-[6%] pt-[5%] pb-1">
          <span
            className="rounded-full px-3 py-1 text-[0.6rem] font-bold tracking-wide uppercase font-display"
            style={{ background: p.accentSoft, color: p.accent }}
          >
            {eyebrow}
          </span>
          <span className="font-display text-[0.6rem] font-bold text-black/25">BocilBook</span>
        </div>
      )}
      <div className={cn("flex flex-1 flex-col", bare ? "px-[6%] pt-[6%]" : "px-[6%] pb-[4%]")}>{children}</div>
      <div className="flex items-center justify-between px-[6%] pb-[3%] pt-1 text-[0.6rem] font-semibold text-black/30 font-display">
        <span>bocilbook.ai</span>
        <span>
          {pageNumber} / {totalPages}
        </span>
      </div>
    </div>
  );
}

export function InstructionBanner({ children, palette }: { children: React.ReactNode; palette: StylePalette }) {
  return (
    <div
      className="mb-4 rounded-2xl px-4 py-2.5 text-center font-display text-[1.05rem] font-semibold leading-snug sm:text-[1.15rem]"
      style={{ background: palette.accentSoft, color: palette.ink }}
    >
      {children}
    </div>
  );
}

export function IllustrationTile({
  src,
  alt,
  palette,
  size = "md",
  className,
}: {
  src: string;
  alt: string;
  palette: StylePalette;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const sizes = { sm: "w-16 sm:w-20", md: "w-28 sm:w-36", lg: "w-44 sm:w-56" };
  return (
    <div
      className={cn("relative flex aspect-square items-center justify-center rounded-[28%]", sizes[size], className)}
      style={{ background: palette.accentSoft }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="h-[82%] w-[82%] object-contain" draggable={false} />
    </div>
  );
}

/**
 * A letter/digit for tracing or coloring, rendered as SVG text with a white
 * fill and the outline stroke painted underneath (paintOrder="stroke").
 * This is what makes an enclosed counter (e.g. the crossbar gap in "A")
 * read as a clean blank hole instead of a second nested outline — plain
 * CSS `-webkit-text-stroke` (fill: transparent, stroke only) draws both the
 * outer silhouette AND the inner counter as separate black lines, which
 * looks like two overlapping letters.
 */
export function TraceGlyph({
  children,
  color,
  strokeWidth = 6,
  className,
}: {
  children: string | number;
  color: string;
  strokeWidth?: number;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <text
        x="50"
        y="74"
        textAnchor="middle"
        fontSize="76"
        className="font-trace font-bold"
        fill="#fff"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        strokeLinecap="round"
        paintOrder="stroke"
      >
        {children}
      </text>
    </svg>
  );
}
