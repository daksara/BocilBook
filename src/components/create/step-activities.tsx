"use client";

import { Sparkles } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import type { ActivityType } from "@/types";
import { ACTIVITY_OPTIONS } from "./wizard-options";
import { StepHeading } from "./step-heading";

export function StepActivities({
  selected,
  aiSelect,
  onToggleActivity,
  onToggleAiSelect,
}: {
  selected: ActivityType[];
  aiSelect: boolean;
  onToggleActivity: (id: ActivityType) => void;
  onToggleAiSelect: (v: boolean) => void;
}) {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <StepHeading title="Jenis Aktivitas" subtitle="Pilih aktivitas yang ingin dimasukkan ke dalam buku." />

      <div
        role="button"
        tabIndex={0}
        onClick={() => onToggleAiSelect(!aiSelect)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onToggleAiSelect(!aiSelect);
          }
        }}
        className={cn(
          "mb-6 flex w-full cursor-pointer items-center justify-between gap-4 rounded-2xl border-2 p-4 text-left transition-colors",
          aiSelect ? "border-primary bg-primary/5" : "border-border/70 bg-card"
        )}
      >
        <div className="flex items-start gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Sparkles className="size-5" />
          </span>
          <div>
            <p className="font-display font-bold">✨ Biarkan AI memilih</p>
            <p className="text-sm text-muted-foreground">
              AI akan membuat kombinasi aktivitas yang seimbang berdasarkan usia dan topik.
            </p>
          </div>
        </div>
        <Switch checked={aiSelect} onCheckedChange={onToggleAiSelect} onClick={(e) => e.stopPropagation()} />
      </div>

      <div
        className={cn(
          "grid grid-cols-2 gap-3 transition-opacity sm:grid-cols-3 lg:grid-cols-4",
          aiSelect && "pointer-events-none opacity-40"
        )}
      >
        {ACTIVITY_OPTIONS.map((opt) => {
          const active = selected.includes(opt.id);
          return (
            <button
              key={opt.id}
              type="button"
              disabled={aiSelect}
              onClick={() => onToggleActivity(opt.id)}
              className={cn(
                "flex flex-col items-center gap-2 rounded-2xl border-2 p-3.5 text-center transition-colors",
                active ? "border-primary bg-primary/5" : "border-border/70 hover:border-primary/40"
              )}
            >
              <span className={cn("flex size-9 items-center justify-center rounded-lg", active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")}>
                <opt.icon className="size-4.5" />
              </span>
              <span className="text-xs font-semibold leading-tight">{opt.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
