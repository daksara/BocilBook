import Link from "next/link";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FinalCta() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-16 text-center sm:px-16">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(40% 60% at 15% 20%, oklch(1 0 0 / 0.18), transparent), radial-gradient(35% 50% at 85% 85%, oklch(1 0 0 / 0.15), transparent)",
          }}
        />
        <div className="relative z-10 mx-auto flex max-w-xl flex-col items-center gap-5">
          <h2 className="font-display text-3xl font-extrabold text-primary-foreground sm:text-4xl">
            Siap bikin buku pertama?
          </h2>
          <p className="text-primary-foreground/85">
            Coba BocilBook sekarang — tanpa perlu keahlian desain, tanpa kartu kredit.
          </p>
          <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90" asChild>
            <Link href="/create">
              <Sparkles />
              Mulai Gratis
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
