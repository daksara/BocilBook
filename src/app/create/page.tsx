"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { WizardShell } from "@/components/create/wizard-shell";
import { WizardFooter } from "@/components/create/wizard-footer";
import { StepBookType } from "@/components/create/step-book-type";
import { StepConfig } from "@/components/create/step-config";
import { StepActivities } from "@/components/create/step-activities";
import { StepAdvanced } from "@/components/create/step-advanced";
import { StepSummary } from "@/components/create/step-summary";
import { GenerationScreen } from "@/components/create/generation-screen";
import { useBookStore } from "@/lib/store/book-store";
import type { ActivityType, BookConfig } from "@/types";

const DEFAULT_CONFIG: BookConfig = {
  bookType: "workbook",
  topic: "",
  ageRange: "3-5",
  language: "id",
  numPages: 20,
  difficulty: "easy",
  style: "cute-cartoon",
  activities: [],
  aiSelectActivities: true,
  additionalInstructions: "",
};

const TOTAL_STEPS = 5;

export default function CreateBookPage() {
  const router = useRouter();
  const addBook = useBookStore((s) => s.addBook);
  const [phase, setPhase] = useState<"wizard" | "generating">("wizard");
  const [step, setStep] = useState(1);
  const [config, setConfig] = useState<BookConfig>(DEFAULT_CONFIG);

  function patchConfig(patch: Partial<BookConfig>) {
    setConfig((prev) => ({ ...prev, ...patch }));
  }

  function toggleActivity(id: ActivityType) {
    setConfig((prev) => ({
      ...prev,
      activities: prev.activities.includes(id)
        ? prev.activities.filter((a) => a !== id)
        : [...prev.activities, id],
    }));
  }

  const canProceed =
    step === 2 ? config.topic.trim().length > 0 : true;

  function handleNext() {
    if (step < TOTAL_STEPS) {
      setStep((s) => s + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setPhase("generating");
    }
  }

  function handleBack() {
    if (step > 1) {
      setStep((s) => s - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  if (phase === "generating") {
    return (
      <GenerationScreen
        config={config}
        onComplete={(book) => {
          addBook(book);
          router.push(`/books/${book.id}/edit`);
        }}
      />
    );
  }

  return (
    <WizardShell step={step}>
      {step === 1 && <StepBookType value={config.bookType} onChange={(v) => patchConfig({ bookType: v })} />}
      {step === 2 && <StepConfig config={config} onChange={patchConfig} />}
      {step === 3 && (
        <StepActivities
          selected={config.activities}
          aiSelect={config.aiSelectActivities}
          onToggleActivity={toggleActivity}
          onToggleAiSelect={(v) => patchConfig({ aiSelectActivities: v })}
        />
      )}
      {step === 4 && (
        <StepAdvanced
          value={config.additionalInstructions ?? ""}
          onChange={(v) => patchConfig({ additionalInstructions: v })}
          config={config}
        />
      )}
      {step === 5 && <StepSummary config={config} />}

      <WizardFooter step={step} totalSteps={TOTAL_STEPS} onBack={handleBack} onNext={handleNext} nextDisabled={!canProceed} />
    </WizardShell>
  );
}
