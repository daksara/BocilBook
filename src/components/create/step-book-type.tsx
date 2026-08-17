"use client";

import type { BookType } from "@/types";
import { BOOK_TYPE_OPTIONS } from "./wizard-options";
import { OptionCard } from "./option-card";
import { StepHeading } from "./step-heading";

export function StepBookType({ value, onChange }: { value: BookType; onChange: (v: BookType) => void }) {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <StepHeading title="✨ Buat Buku Baru" subtitle="Ceritakan buku yang ingin kamu buat. Biarkan AI mengurus sisanya." />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {BOOK_TYPE_OPTIONS.map((opt) => (
          <OptionCard
            key={opt.id}
            label={opt.label}
            description={opt.description}
            icon={opt.icon}
            selected={value === opt.id}
            onClick={() => onChange(opt.id)}
          />
        ))}
      </div>
    </div>
  );
}
