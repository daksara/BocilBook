import type { ReactNode } from "react";
import { Flag, Target } from "lucide-react";
import type { BookStyle, MazePageData } from "@/types";
import { generateMaze, mazeSizeForDifficulty } from "@/lib/templates/maze-gen";
import { InstructionBanner, useStylePalette, WorksheetFrame } from "./worksheet-frame";

export function MazeTemplate({
  data,
  style,
  pageNumber,
  totalPages,
}: {
  data: MazePageData;
  style: BookStyle;
  pageNumber: number;
  totalPages: number;
}) {
  const p = useStylePalette(style);
  const { cols, rows } = mazeSizeForDifficulty(data.difficulty);
  const maze = generateMaze(cols, rows, data.seed);
  const cell = 32;
  const w = cols * cell;
  const h = rows * cell;

  const lines: ReactNode[] = [];
  maze.cells.flat().forEach((c) => {
    const x = c.col * cell;
    const y = c.row * cell;
    if (c.walls.top) lines.push(<line key={`t-${c.row}-${c.col}`} x1={x} y1={y} x2={x + cell} y2={y} />);
    if (c.walls.left) lines.push(<line key={`l-${c.row}-${c.col}`} x1={x} y1={y} x2={x} y2={y + cell} />);
  });

  return (
    <WorksheetFrame style={style} pageNumber={pageNumber} totalPages={totalPages} eyebrow="Maze">
      <InstructionBanner palette={p}>{data.instruction}</InstructionBanner>

      <div className="flex flex-1 flex-col items-center justify-center gap-3">
        <div className="flex w-full items-center justify-between px-2 font-display text-xs font-bold capitalize sm:text-sm" style={{ color: p.ink }}>
          <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1" style={{ background: p.accentSoft }}>
            <Flag className="size-3.5" /> {data.startLabel}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1" style={{ background: p.accentSoft }}>
            {data.endLabel} <Target className="size-3.5" />
          </span>
        </div>
        <svg viewBox={`-4 -4 ${w + 8} ${h + 8}`} className="w-full max-w-full" style={{ aspectRatio: `${w} / ${h}` }}>
          <rect x={-2} y={-2} width={w + 4} height={h + 4} fill="none" stroke={p.ink} strokeWidth={5} strokeLinejoin="round" />
          <g stroke={p.ink} strokeWidth={3} strokeLinecap="round">
            {lines}
          </g>
          <circle cx={cell / 2} cy={cell / 2} r={cell * 0.28} fill={p.accent} />
          <circle cx={w - cell / 2} cy={h - cell / 2} r={cell * 0.28} fill={p.accent} opacity={0.5} />
        </svg>
      </div>
    </WorksheetFrame>
  );
}
