"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { BookStyle, CountAndCirclePageData } from "@/types";
import { InstructionBanner, useStylePalette, WorksheetFrame } from "@/components/templates/worksheet-frame";
import { GameCompleteOverlay } from "./game-complete-overlay";

export function CountAndCircleGame({
  data,
  style,
  pageNumber,
  totalPages,
}: {
  data: CountAndCirclePageData;
  style: BookStyle;
  pageNumber: number;
  totalPages: number;
}) {
  const p = useStylePalette(style);
  const [correct, setCorrect] = useState(false);
  const [wrong, setWrong] = useState<number | null>(null);

  function tapOption(n: number) {
    if (correct) return;
    if (n === data.targetCount) {
      setCorrect(true);
    } else {
      setWrong(n);
      setTimeout(() => setWrong(null), 400);
    }
  }

  function reset() {
    setCorrect(false);
    setWrong(null);
  }

  return (
    <WorksheetFrame style={style} pageNumber={pageNumber} totalPages={totalPages} eyebrow="Count & Circle">
      <InstructionBanner palette={p}>{data.instruction}</InstructionBanner>

      <div className="flex flex-1 flex-col gap-4">
        <div className="flex flex-1 flex-wrap items-center justify-center gap-4 rounded-2xl p-5 sm:gap-6" style={{ background: p.accentSoft }}>
          {Array.from({ length: data.targetCount }).map((_, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={i} src={data.illustration.url} alt={data.itemLabel} className="h-16 w-16 object-contain sm:h-24 sm:w-24" draggable={false} />
          ))}
        </div>

        <div className="flex items-center justify-center gap-6 py-2 sm:gap-10">
          {data.options.map((n) => (
            <motion.button
              key={n}
              type="button"
              onClick={() => tapOption(n)}
              animate={wrong === n ? { x: [0, -6, 6, -6, 6, 0] } : {}}
              transition={{ duration: 0.4 }}
              className="flex h-16 w-16 items-center justify-center rounded-full border-4 font-display text-2xl font-extrabold sm:h-20 sm:w-20 sm:text-3xl"
              style={{
                borderColor: correct && n === data.targetCount ? p.accent : "#D9D3CC",
                background: correct && n === data.targetCount ? p.accentSoft : "transparent",
                color: p.ink,
              }}
            >
              {n}
            </motion.button>
          ))}
        </div>
      </div>

      <GameCompleteOverlay show={correct} palette={p} onReplay={reset} />
    </WorksheetFrame>
  );
}
