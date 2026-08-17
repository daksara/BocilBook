"use client";

import type { LucideIcon } from "lucide-react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function OptionCard({
  label,
  description,
  icon: Icon,
  selected,
  onClick,
  compact,
}: {
  label: string;
  description?: string;
  icon?: LucideIcon;
  selected: boolean;
  onClick: () => void;
  compact?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "group relative flex flex-col items-start gap-2 rounded-2xl border-2 p-4 text-left transition-all",
        selected
          ? "border-primary bg-primary/5 shadow-sm shadow-primary/10"
          : "border-border/70 bg-card hover:border-primary/40 hover:bg-muted/40",
        compact && "items-center gap-2 p-3 text-center"
      )}
    >
      {selected && (
        <span className="absolute top-2.5 right-2.5 flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Check className="size-3" strokeWidth={3} />
        </span>
      )}
      {Icon && (
        <span
          className={cn(
            "flex size-10 items-center justify-center rounded-xl",
            selected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground group-hover:text-foreground"
          )}
        >
          <Icon className="size-5" />
        </span>
      )}
      <span className={cn("font-display font-bold", compact ? "text-sm" : "text-base")}>{label}</span>
      {description && !compact && <span className="text-xs leading-relaxed text-muted-foreground">{description}</span>}
    </button>
  );
}
