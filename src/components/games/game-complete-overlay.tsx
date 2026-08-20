"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, PartyPopper, RotateCcw } from "lucide-react";
import type { StylePalette } from "@/components/templates/worksheet-frame";

export function GameCompleteOverlay({
  show,
  palette,
  onReplay,
  onNext,
  levelLabel,
  onExit,
}: {
  show: boolean;
  palette: StylePalette;
  onReplay: () => void;
  /** When provided, shows a "next level" primary action instead of just replaying. */
  onNext?: () => void;
  /** e.g. "Level 2 dari 5" — shown above the title when part of a level sequence. */
  levelLabel?: string;
  /** Shown as a secondary action when there is no next level (end of the sequence). */
  onExit?: () => void;
}) {
  const inLevelFlow = Boolean(levelLabel);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 z-20 flex items-center justify-center bg-white/85 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.7, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
            className="flex flex-col items-center gap-3 rounded-3xl px-8 py-7 text-center shadow-xl"
            style={{ background: palette.accentSoft }}
          >
            <span className="flex size-14 items-center justify-center rounded-full" style={{ background: palette.accent, color: "white" }}>
              <PartyPopper className="size-7" />
            </span>
            {levelLabel && (
              <p className="text-xs font-semibold tracking-wide uppercase opacity-70" style={{ color: palette.ink }}>
                {levelLabel}
              </p>
            )}
            <p className="font-display text-xl font-extrabold" style={{ color: palette.ink }}>
              {onNext ? "Level selesai!" : inLevelFlow ? "Semua level tuntas!" : "Hebat, selesai!"}
            </p>

            {onNext ? (
              <button
                type="button"
                onClick={onNext}
                className="mt-1 inline-flex items-center gap-1.5 rounded-full px-4 py-2 font-display text-sm font-bold text-white"
                style={{ background: palette.accent }}
              >
                Level Berikutnya <ArrowRight className="size-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={onReplay}
                className="mt-1 inline-flex items-center gap-1.5 rounded-full px-4 py-2 font-display text-sm font-bold text-white"
                style={{ background: palette.accent }}
              >
                <RotateCcw className="size-4" /> Main Lagi
              </button>
            )}

            {onNext ? (
              <button type="button" onClick={onReplay} className="text-xs font-semibold underline opacity-70" style={{ color: palette.ink }}>
                Ulangi level ini
              </button>
            ) : (
              onExit && (
                <button type="button" onClick={onExit} className="text-xs font-semibold underline opacity-70" style={{ color: palette.ink }}>
                  Kembali ke Main Game
                </button>
              )
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
