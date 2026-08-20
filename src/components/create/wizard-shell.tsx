"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { cn } from "@/lib/utils";

const STEPS = ["Jenis Buku", "Konfigurasi", "Aktivitas", "Instruksi AI", "Ringkasan"];

export function WizardShell({
  step,
  children,
}: {
  step: number | null;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <header className="sticky top-0 z-30 border-b border-border/70 bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-4 sm:px-6">
          <Logo />
          <Link
            href="/dashboard"
            className="flex size-9 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
            aria-label="Batal"
          >
            <X className="size-5" />
          </Link>
        </div>
        {step !== null && (
          <div className="mx-auto max-w-4xl px-4 pb-4 sm:px-6">
            <div className="flex items-center gap-1.5 sm:gap-2">
              {STEPS.map((label, i) => {
                const idx = i + 1;
                const active = idx === step;
                const done = idx < step;
                return (
                  <div key={label} className="flex flex-1 flex-col gap-1.5">
                    <div
                      className={cn(
                        "h-1.5 rounded-full transition-colors",
                        done || active ? "bg-primary" : "bg-muted"
                      )}
                    />
                    <span
                      className={cn(
                        "hidden text-[0.65rem] font-semibold sm:block",
                        active ? "text-primary" : "text-muted-foreground"
                      )}
                    >
                      {label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </header>
      <main className="flex-1 pb-28">{children}</main>
    </div>
  );
}
