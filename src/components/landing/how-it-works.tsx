import { Sparkles, Download, ListChecks } from "lucide-react";

const STEPS = [
  {
    number: "01",
    icon: ListChecks,
    title: "Pilih tema",
    description: "Ceritakan topik, usia anak, dan gaya visual yang kamu inginkan.",
  },
  {
    number: "02",
    icon: Sparkles,
    title: "Generate dengan AI",
    description: "AI menyusun struktur buku, aktivitas, dan ilustrasi secara otomatis.",
  },
  {
    number: "03",
    icon: Download,
    title: "Download buku",
    description: "Edit jika perlu, lalu ekspor sebagai PDF siap cetak.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-muted/40 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2 className="font-display text-3xl font-extrabold sm:text-4xl">Cara kerjanya simpel</h2>
          <p className="mt-3 text-muted-foreground">Tiga langkah, buku anak kamu siap dalam hitungan menit.</p>
        </div>

        <div className="relative grid gap-8 sm:grid-cols-3">
          <div className="absolute top-8 right-0 left-0 hidden h-px bg-border sm:block" aria-hidden />
          {STEPS.map((step) => (
            <div key={step.number} className="relative flex flex-col items-center text-center">
              <div className="relative z-10 mb-5 flex size-16 items-center justify-center rounded-full border-4 border-background bg-primary text-primary-foreground shadow-md shadow-primary/20">
                <step.icon className="size-6" />
              </div>
              <span className="font-display text-sm font-bold text-primary">{step.number}</span>
              <h3 className="mt-1 font-display text-xl font-bold">{step.title}</h3>
              <p className="mt-2 max-w-xs text-sm text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
