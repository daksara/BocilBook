import { cn } from "@/lib/utils";
import { BookOpen } from "lucide-react";

export function Logo({ className, iconOnly }: { className?: string; iconOnly?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2 font-display font-extrabold", className)}>
      <span className="flex size-8 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm shadow-primary/30">
        <BookOpen className="size-4.5" strokeWidth={2.5} />
      </span>
      {!iconOnly && <span className="text-lg tracking-tight">BocilBook</span>}
    </span>
  );
}
