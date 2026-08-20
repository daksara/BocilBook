"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import type { BookStyle, MatchObjectsPageData } from "@/types";
import { InstructionBanner, useStylePalette, WorksheetFrame } from "@/components/templates/worksheet-frame";
import { GameCompleteOverlay } from "./game-complete-overlay";

export function MatchObjectsGame({
  data,
  style,
  pageNumber,
  totalPages,
  onNext,
  levelLabel,
  onExit,
}: {
  data: MatchObjectsPageData;
  style: BookStyle;
  pageNumber: number;
  totalPages: number;
  onNext?: () => void;
  levelLabel?: string;
  onExit?: () => void;
}) {
  const p = useStylePalette(style);
  const rightOrder = [...data.pairs].reverse();
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [matchedIds, setMatchedIds] = useState<Set<string>>(new Set());
  const [wrongIds, setWrongIds] = useState<{ left: string; right: string } | null>(null);

  const done = matchedIds.size >= data.pairs.length;

  function tapLeft(pairId: string) {
    if (done || matchedIds.has(pairId) || wrongIds) return;
    setSelectedLeft(pairId === selectedLeft ? null : pairId);
  }

  function tapRight(pairId: string) {
    if (done || matchedIds.has(pairId) || wrongIds || !selectedLeft) return;
    if (pairId === selectedLeft) {
      setMatchedIds((prev) => new Set(prev).add(pairId));
      setSelectedLeft(null);
    } else {
      setWrongIds({ left: selectedLeft, right: pairId });
      setTimeout(() => {
        setWrongIds(null);
        setSelectedLeft(null);
      }, 450);
    }
  }

  function reset() {
    setSelectedLeft(null);
    setMatchedIds(new Set());
    setWrongIds(null);
  }

  return (
    <WorksheetFrame style={style} pageNumber={pageNumber} totalPages={totalPages} eyebrow="Matching">
      <InstructionBanner palette={p}>{data.instruction}</InstructionBanner>

      <div className="flex flex-1 items-stretch justify-between gap-6 py-2">
        <div className="flex flex-1 flex-col justify-between">
          {data.pairs.map((pair) => (
            <div key={pair.id} className="flex justify-start">
              <Tile
                src={pair.illustrationLeft.url}
                alt={pair.left}
                palette={p}
                matched={matchedIds.has(pair.id)}
                selected={selectedLeft === pair.id}
                wrong={wrongIds?.left === pair.id}
                onClick={() => tapLeft(pair.id)}
              />
            </div>
          ))}
        </div>
        <div className="flex w-16 flex-col items-stretch justify-between opacity-40 sm:w-24">
          {data.pairs.map((pair) => (
            <div key={pair.id} className="flex flex-1 items-center">
              <div className="h-0.5 w-full border-t-4 border-dotted" style={{ borderColor: p.ink }} />
            </div>
          ))}
        </div>
        <div className="flex flex-1 flex-col justify-between">
          {rightOrder.map((pair) => (
            <div key={pair.id} className="flex justify-end">
              <Tile
                src={pair.illustrationRight.url}
                alt={pair.right}
                palette={p}
                matched={matchedIds.has(pair.id)}
                selected={false}
                wrong={wrongIds?.right === pair.id}
                onClick={() => tapRight(pair.id)}
              />
            </div>
          ))}
        </div>
      </div>

      <GameCompleteOverlay show={done} palette={p} onReplay={reset} onNext={onNext} levelLabel={levelLabel} onExit={onExit} />
    </WorksheetFrame>
  );
}

function Tile({
  src,
  alt,
  palette,
  matched,
  selected,
  wrong,
  onClick,
}: {
  src: string;
  alt: string;
  palette: { accent: string; accentSoft: string; ink: string };
  matched: boolean;
  selected: boolean;
  wrong: boolean;
  onClick: () => void;
}) {
  const ringColor = matched ? palette.accent : selected ? palette.ink : wrong ? "#E14C4C" : "transparent";
  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={matched}
      animate={wrong ? { x: [0, -5, 5, -5, 5, 0] } : {}}
      transition={{ duration: 0.4 }}
      className="relative flex aspect-square w-16 items-center justify-center rounded-[28%] border-4 sm:w-20"
      style={{ background: palette.accentSoft, borderColor: ringColor, opacity: matched ? 0.55 : 1 }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="h-[82%] w-[82%] object-contain" draggable={false} />
      {matched && (
        <span className="absolute top-0.5 right-0.5 flex size-5 items-center justify-center rounded-full text-white" style={{ background: palette.accent }}>
          <Check className="size-3" strokeWidth={3} />
        </span>
      )}
    </motion.button>
  );
}
