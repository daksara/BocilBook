import { Sparkles, Printer, Puzzle, SlidersHorizontal } from "lucide-react";

const FEATURES = [
  {
    icon: Sparkles,
    title: "AI Generated",
    description: "AI membuat ide, aktivitas, dan konten halaman.",
    color: "text-brand-coral",
    bg: "bg-brand-coral/10",
  },
  {
    icon: Printer,
    title: "Ready to Print",
    description: "Buat worksheet dengan layout yang rapi dan siap dicetak.",
    color: "text-brand-sky",
    bg: "bg-brand-sky/15",
  },
  {
    icon: Puzzle,
    title: "Banyak Aktivitas",
    description: "Tracing, matching, counting, coloring, maze, dan lainnya.",
    color: "text-emerald-600",
    bg: "bg-brand-mint/20",
  },
  {
    icon: SlidersHorizontal,
    title: "Customizable",
    description: "Edit hasil AI sebelum download.",
    color: "text-brand-violet",
    bg: "bg-brand-violet/10",
  },
];

export function Features() {
  return (
    <section id="features" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <h2 className="font-display text-3xl font-extrabold text-balance sm:text-4xl">
          Semua yang kamu butuhkan untuk membuat buku anak
        </h2>
        <p className="mt-3 text-muted-foreground">
          Dari ide sampai file siap cetak — BocilBook mengurus prosesnya, kamu tinggal sesuaikan hasilnya.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((f) => (
          <div
            key={f.title}
            className="group rounded-2xl border border-border/70 bg-card p-6 shadow-sm shadow-black/[0.02] transition-all hover:-translate-y-1 hover:shadow-md"
          >
            <div className={`mb-4 flex size-12 items-center justify-center rounded-2xl ${f.bg}`}>
              <f.icon className={`size-6 ${f.color}`} strokeWidth={2.2} />
            </div>
            <h3 className="font-display text-lg font-bold">{f.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{f.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
