import Link from "next/link";
import { Sparkles } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { MOCK_CREDIT } from "@/lib/data/mock-user";

export function CreditsWidget({ compact }: { compact?: boolean }) {
  const pct = Math.round((MOCK_CREDIT.balance / MOCK_CREDIT.monthlyAllowance) * 100);

  if (compact) {
    return (
      <Link
        href="/settings"
        className="flex items-center justify-center rounded-xl bg-primary/10 p-2.5 text-primary hover:bg-primary/15"
        title={`${MOCK_CREDIT.balance} kredit AI tersisa`}
      >
        <Sparkles className="size-4" />
      </Link>
    );
  }

  return (
    <Link
      href="/settings"
      className="flex flex-col gap-2 rounded-2xl border border-border/70 bg-muted/50 p-3.5 transition-colors hover:bg-muted"
    >
      <div className="flex items-center justify-between text-sm">
        <span className="inline-flex items-center gap-1.5 font-semibold">
          <Sparkles className="size-3.5 text-primary" />
          AI Credits
        </span>
        <span className="font-display font-bold text-primary">{MOCK_CREDIT.balance}</span>
      </div>
      <Progress value={pct} className="h-1.5" />
      <span className="text-xs text-muted-foreground">Reset setiap tanggal 1</span>
    </Link>
  );
}
