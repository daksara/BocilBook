import { BookOpenText, Clock3, Gauge, Layers, Palette, Sparkles } from "lucide-react";
import type { BookConfig } from "@/types";
import { AGE_OPTIONS, ACTIVITY_OPTIONS, BOOK_TYPE_OPTIONS, DIFFICULTY_OPTIONS, STYLE_OPTIONS } from "./wizard-options";
import { StepHeading } from "./step-heading";

export function StepSummary({ config }: { config: BookConfig }) {
  const bookType = BOOK_TYPE_OPTIONS.find((o) => o.id === config.bookType);
  const age = AGE_OPTIONS.find((o) => o.id === config.ageRange);
  const style = STYLE_OPTIONS.find((o) => o.id === config.style);
  const difficulty = DIFFICULTY_OPTIONS.find((o) => o.id === config.difficulty);
  const activityLabels = config.aiSelectActivities
    ? "AI Selected"
    : config.activities.map((a) => ACTIVITY_OPTIONS.find((o) => o.id === a)?.label ?? a).join(", ") || "AI Selected";

  const rows = [
    { icon: BookOpenText, label: "Topik", value: config.topic || "(belum diisi)" },
    { icon: Clock3, label: "Usia", value: age?.label ?? "-" },
    { icon: Layers, label: "Halaman", value: `${config.numPages} halaman` },
    { icon: Palette, label: "Gaya", value: style?.label ?? "-" },
    { icon: Gauge, label: "Kesulitan", value: difficulty?.label ?? "-" },
    { icon: Sparkles, label: "Aktivitas", value: activityLabels },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <StepHeading title="Ringkasan" subtitle="Periksa kembali sebelum AI mulai membuat bukumu." />

      <div className="mb-6 flex items-center gap-3 rounded-2xl border border-primary/20 bg-primary/5 p-4">
        {bookType && (
          <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <bookType.icon className="size-5" />
          </span>
        )}
        <div>
          <p className="font-display font-bold">{bookType?.label}</p>
          <p className="text-sm text-muted-foreground">{bookType?.description}</p>
        </div>
      </div>

      <div className="divide-y divide-border rounded-2xl border border-border/70 bg-card">
        {rows.map((row) => (
          <div key={row.label} className="flex items-start gap-3 p-4">
            <row.icon className="mt-0.5 size-4 shrink-0 text-primary" />
            <div className="min-w-0">
              <p className="text-xs font-semibold text-muted-foreground">{row.label}</p>
              <p className="text-sm font-medium text-balance">{row.value}</p>
            </div>
          </div>
        ))}
      </div>

      {config.additionalInstructions && (
        <div className="mt-4 rounded-2xl border border-dashed border-border p-4">
          <p className="mb-1 text-xs font-semibold text-muted-foreground">Instruksi Tambahan</p>
          <p className="text-sm">{config.additionalInstructions}</p>
        </div>
      )}
    </div>
  );
}
