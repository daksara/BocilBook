"use client";

import { Shuffle, Waypoints } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { IllustrationField } from "./illustration-field";
import { AskAiPanel } from "./ask-ai-panel";
import { buildPageData } from "@/lib/ai/content-builder";
import type { BookConfig, Page } from "@/types";

export function PropertiesPanel({
  page,
  config,
  onUpdate,
  onAddActivity,
}: {
  page: Page;
  config: BookConfig;
  onUpdate: (updater: (page: Page) => Page) => void;
  onAddActivity?: () => void;
}) {
  const style = config.style;

  function setTitle(title: string) {
    onUpdate((p) => ({ ...p, title }));
  }

  function setData<T extends Page["data"]>(patch: Partial<T>) {
    onUpdate((p) => ({ ...p, data: { ...p.data, ...patch } as Page["data"] }));
  }

  function regenerateContent() {
    onUpdate((p) => {
      const seed = Date.now() % 100000;
      const data = buildPageData(p.type, { config, seed, letterIndex: seed % 26, numberIndex: seed % 10 });
      return { ...p, data };
    });
  }

  return (
    <div className="flex h-full w-full flex-col overflow-y-auto">
      <div className="border-b border-border/70 p-4">
        <AskAiPanel page={page} config={config} onUpdate={onUpdate} onAddActivity={onAddActivity} />
      </div>

      <div className="flex flex-col gap-5 p-4">
        <div className="flex flex-col gap-2">
          <Label>Judul Halaman</Label>
          <Input value={page.title} onChange={(e) => setTitle(e.target.value)} />
        </div>

        <Separator />

        <PageTypeFields page={page} style={style} setData={setData} onRegenerate={regenerateContent} />
      </div>
    </div>
  );
}

function PageTypeFields({
  page,
  style,
  setData,
  onRegenerate,
}: {
  page: Page;
  style: BookConfig["style"];
  setData: <T extends Page["data"]>(patch: Partial<T>) => void;
  onRegenerate: () => void;
}) {
  const data = page.data;

  switch (data.type) {
    case "cover":
      return (
        <>
          <TextField label="Subjudul" value={data.subtitle ?? ""} onChange={(v) => setData({ subtitle: v })} />
          <IllustrationField illustration={data.illustration} style={style} onChange={(v) => setData({ illustration: v })} />
        </>
      );

    case "letter_tracing":
      return (
        <>
          <TextField
            label="Huruf"
            value={data.letter}
            maxLength={1}
            onChange={(v) => {
              const letter = (v || data.letter).slice(0, 1).toUpperCase();
              setData({ letter, uppercase: letter, lowercase: letter.toLowerCase() });
            }}
          />
          <TextField label="Contoh Kata" value={data.exampleWord} onChange={(v) => setData({ exampleWord: v })} />
          <TextAreaField label="Instruksi" value={data.instruction} onChange={(v) => setData({ instruction: v })} />
          <IllustrationField illustration={data.illustration} style={style} onChange={(v) => setData({ illustration: v })} />
        </>
      );

    case "number_tracing":
      return (
        <>
          <TextField
            label="Angka"
            type="number"
            value={String(data.number)}
            onChange={(v) => setData({ number: Math.max(0, Math.min(20, Number(v) || 0)) })}
          />
          <TextField label="Kata" value={data.word} onChange={(v) => setData({ word: v })} />
          <TextAreaField label="Instruksi" value={data.instruction} onChange={(v) => setData({ instruction: v })} />
          <IllustrationField illustration={data.illustration} style={style} onChange={(v) => setData({ illustration: v })} />
        </>
      );

    case "count_and_circle":
      return (
        <>
          <TextField label="Nama Objek" value={data.itemLabel} onChange={(v) => setData({ itemLabel: v })} />
          <TextField
            label="Jumlah Target"
            type="number"
            value={String(data.targetCount)}
            onChange={(v) => {
              const target = Math.max(1, Math.min(12, Number(v) || 1));
              const options = Array.from(new Set([target, Math.max(1, target - 1), target + 1])).slice(0, 3);
              setData({ targetCount: target, options });
            }}
          />
          <TextAreaField label="Instruksi" value={data.instruction} onChange={(v) => setData({ instruction: v })} />
          <IllustrationField illustration={data.illustration} style={style} onChange={(v) => setData({ illustration: v })} />
        </>
      );

    case "match_objects":
      return (
        <>
          <TextAreaField label="Instruksi" value={data.instruction} onChange={(v) => setData({ instruction: v })} />
          <div className="flex flex-col gap-3">
            <Label>Pasangan ({data.pairs.length})</Label>
            {data.pairs.map((pair, i) => (
              <div key={pair.id} className="flex flex-col gap-2 rounded-xl border border-border/70 p-3">
                <TextField
                  label={`Pasangan ${i + 1}`}
                  value={pair.left}
                  onChange={(v) =>
                    setData({
                      pairs: data.pairs.map((p, idx) => (idx === i ? { ...p, left: v, right: v } : p)),
                    })
                  }
                />
              </div>
            ))}
          </div>
        </>
      );

    case "find_and_circle":
      return (
        <>
          <TextField label="Target Objek" value={data.targetLabel} onChange={(v) => setData({ targetLabel: v })} />
          <TextAreaField label="Instruksi" value={data.instruction} onChange={(v) => setData({ instruction: v })} />
          <RegenerateButton label="Acak Ulang Gambar" onClick={onRegenerate} />
        </>
      );

    case "coloring_page":
      return (
        <>
          <TextField label="Judul" value={data.title} onChange={(v) => setData({ title: v })} />
          <TextAreaField label="Instruksi" value={data.instruction} onChange={(v) => setData({ instruction: v })} />
          <IllustrationField illustration={data.illustration} style={style} onChange={(v) => setData({ illustration: v })} />
        </>
      );

    case "maze":
      return (
        <>
          <TextField label="Tema" value={data.theme} onChange={(v) => setData({ theme: v })} />
          <TextField label="Label Mulai" value={data.startLabel} onChange={(v) => setData({ startLabel: v })} />
          <TextField label="Label Selesai" value={data.endLabel} onChange={(v) => setData({ endLabel: v })} />
          <div className="flex flex-col gap-2">
            <Label>Kesulitan</Label>
            <Select value={data.difficulty} onValueChange={(v) => setData({ difficulty: v as typeof data.difficulty })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <TextAreaField label="Instruksi" value={data.instruction} onChange={(v) => setData({ instruction: v })} />
          <Button variant="outline" onClick={() => setData({ seed: Date.now() % 100000 })}>
            <Waypoints /> Buat Ulang Labirin
          </Button>
        </>
      );

    case "cut_and_paste":
      return (
        <>
          <TextField label="Target Objek" value={data.targetLabel} onChange={(v) => setData({ targetLabel: v })} />
          <TextAreaField label="Instruksi" value={data.instruction} onChange={(v) => setData({ instruction: v })} />
          <RegenerateButton label="Acak Ulang Potongan" onClick={onRegenerate} />
        </>
      );

    case "shape_recognition":
      return (
        <>
          <TextAreaField label="Instruksi" value={data.instruction} onChange={(v) => setData({ instruction: v })} />
          <RegenerateButton label="Acak Ulang Bentuk" onClick={onRegenerate} />
        </>
      );

    case "animal_classification":
      return (
        <>
          <TextAreaField label="Instruksi" value={data.instruction} onChange={(v) => setData({ instruction: v })} />
          <RegenerateButton label="Acak Ulang Hewan" onClick={onRegenerate} />
        </>
      );

    default:
      return null;
  }
}

function TextField({
  label,
  value,
  onChange,
  type = "text",
  maxLength,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  maxLength?: number;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label>{label}</Label>
      <Input type={type} value={value} maxLength={maxLength} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

function TextAreaField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-col gap-2">
      <Label>{label}</Label>
      <Textarea value={value} onChange={(e) => onChange(e.target.value)} className="min-h-20" />
    </div>
  );
}

function RegenerateButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <Button variant="outline" onClick={onClick}>
      <Shuffle /> {label}
    </Button>
  );
}
