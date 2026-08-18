import Link from "next/link";
import { Zap } from "lucide-react";
import { AI_LIMITS } from "@/lib/data/ai-limits";

export function AILimitsWidget({ compact }: { compact?: boolean }) {
  const summary = AI_LIMITS.map((p) => `${p.name} ${p.requestsPerMinute} req/menit`).join(" · ");

  if (compact) {
    return (
      <Link
        href="/settings"
        className="flex items-center justify-center rounded-xl bg-primary/10 p-2.5 text-primary hover:bg-primary/15"
        title={`Limit AI: ${summary}`}
      >
        <Zap className="size-4" />
      </Link>
    );
  }

  return (
    <Link
      href="/settings"
      className="flex flex-col gap-2 rounded-2xl border border-border/70 bg-muted/50 p-3.5 transition-colors hover:bg-muted"
    >
      <span className="inline-flex items-center gap-1.5 text-sm font-semibold">
        <Zap className="size-3.5 text-primary" />
        Limit AI
      </span>
      <div className="flex flex-col gap-1">
        {AI_LIMITS.map((p) => (
          <div key={p.id} className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">{p.name}</span>
            <span className="font-semibold">{p.requestsPerMinute} req/menit</span>
          </div>
        ))}
      </div>
    </Link>
  );
}
