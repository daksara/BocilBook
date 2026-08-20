"use client";

import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function WizardFooter({
  step,
  totalSteps,
  onBack,
  onNext,
  nextDisabled,
  nextLabel,
}: {
  step: number;
  totalSteps: number;
  onBack: () => void;
  onNext: () => void;
  nextDisabled?: boolean;
  nextLabel?: string;
}) {
  const isLast = step === totalSteps;

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border/70 bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-4xl items-center justify-between gap-3 px-4 py-4 sm:px-6">
        <Button variant="outline" size="lg" onClick={onBack}>
          <ArrowLeft /> Kembali
        </Button>
        <Button size="lg" onClick={onNext} disabled={nextDisabled}>
          {nextLabel ?? (isLast ? "Generate BocilBook" : "Lanjut")}
          {isLast ? <Sparkles /> : <ArrowRight />}
        </Button>
      </div>
    </div>
  );
}
