"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import type { BookStyle, FindAndCirclePageData } from "@/types";
import { InstructionBanner, useStylePalette, WorksheetFrame } from "@/components/templates/worksheet-frame";
import { GameCompleteOverlay } from "./game-complete-overlay";

export function FindAndCircleGame({
  data,
  style,
  pageNumber,
  totalPages,
  onNext,
  levelLabel,
  onExit,
}: {
  data: FindAndCirclePageData;
  style: BookStyle;
  pageNumber: number;
  totalPages: number;
  onNext?: () => void;
  levelLabel?: string;
  onExit?: () => void;
}) {
  const p = useStylePalette(style);
  const [foundIds, setFoundIds] = useState<Set<string>>(new Set());
  const [shakeId, setShakeId] = useState<string | null>(null);
  const targetTotal = useMemo(() => data.items.filter((i) => i.isTarget).length, [data.items]);
  const done = foundIds.size >= targetTotal;

  function handleTap(id: string, isTarget: boolean) {
    if (done || foundIds.has(id)) return;
    if (isTarget) {
      setFoundIds((prev) => new Set(prev).add(id));
    } else {
      setShakeId(id);
      setTimeout(() => setShakeId(null), 400);
    }
  }

  function reset() {
    setFoundIds(new Set());
    setShakeId(null);
  }

  return (
    <WorksheetFrame style={style} pageNumber={pageNumber} totalPages={totalPages} eyebrow="Find & Circle">
      <InstructionBanner palette={p}>{data.instruction}</InstructionBanner>

      <div className="grid flex-1 grid-cols-3 content-evenly gap-4 sm:gap-5">
        {data.items.map((item) => {
          const found = foundIds.has(item.id);
          return (
            <motion.button
              key={item.id}
              type="button"
              onClick={() => handleTap(item.id, item.isTarget)}
              animate={shakeId === item.id ? { x: [0, -6, 6, -6, 6, 0] } : {}}
              transition={{ duration: 0.4 }}
              className="relative flex aspect-square items-center justify-center rounded-full border-4"
              style={{
                background: p.accentSoft,
                borderColor: found ? p.accent : "transparent",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.illustration.url} alt={item.label} className="h-[70%] w-[70%] object-contain" draggable={false} />
              {found && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-1 right-1 flex size-6 items-center justify-center rounded-full text-white"
                  style={{ background: p.accent }}
                >
                  <Check className="size-3.5" strokeWidth={3} />
                </motion.span>
              )}
            </motion.button>
          );
        })}
      </div>

      <GameCompleteOverlay show={done} palette={p} onReplay={reset} onNext={onNext} levelLabel={levelLabel} onExit={onExit} />
    </WorksheetFrame>
  );
}
