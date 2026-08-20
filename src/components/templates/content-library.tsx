"use client";

import { useMemo } from "react";
import { generateIllustrationSync } from "@/lib/illustrations";
import {
  ALPHABET_ID,
  ANIMAL_POOL,
  BODY_POOL,
  COLOR_POOL,
  COUNTABLE_SUBJECTS,
  FOOD_POOL,
  FRUIT_POOL,
  NUMBER_WORDS_ID,
  PROFESSION_POOL,
  RAMADAN_POOL,
  SHAPE_POOL,
  SPACE_POOL,
  VEHICLE_POOL,
  WEATHER_POOL,
  pick,
} from "@/lib/ai/content-pools";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

interface LibraryItem {
  label: string;
  subject: string;
  swatch?: string;
}

interface LibraryGroup {
  heading?: string;
  items: LibraryItem[];
}

function titleCase(subject: string): string {
  return subject.charAt(0).toUpperCase() + subject.slice(1);
}

function dedupeBySubject(subjects: string[]): string[] {
  return Array.from(new Set(subjects));
}

function Chip({ item }: { item: LibraryItem }) {
  const { url } = useMemo(() => generateIllustrationSync(item.subject, "cute-cartoon", item.subject), [item.subject]);
  return (
    <div className="flex flex-col items-center gap-1.5 text-center">
      <div
        className="flex aspect-square w-14 items-center justify-center rounded-2xl sm:w-16"
        style={{ background: item.swatch ? `${item.swatch}26` : "var(--muted)" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={url} alt={item.label} className="h-[74%] w-[74%] object-contain" draggable={false} />
      </div>
      <span className="max-w-[4.75rem] truncate text-[0.7rem] font-semibold text-muted-foreground" title={item.label}>
        {item.label}
      </span>
    </div>
  );
}

function ChipGroup({ group }: { group: LibraryGroup }) {
  return (
    <div>
      {group.heading && <p className="mb-3 font-display text-sm font-bold text-foreground">{group.heading}</p>}
      <div className="flex flex-wrap gap-3 sm:gap-4">
        {group.items.map((item) => (
          <Chip key={`${group.heading ?? ""}-${item.subject}-${item.label}`} item={item} />
        ))}
      </div>
    </div>
  );
}

function LibraryTab({ description, count, groups }: { description: string; count: number; groups: LibraryGroup[] }) {
  return (
    <div className="flex flex-col gap-6 rounded-2xl border border-border/70 bg-card p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm text-muted-foreground">{description}</p>
        <Badge variant="outline">{count} item</Badge>
      </div>
      <div className="flex flex-col gap-6">
        {groups.map((g, i) => (
          <ChipGroup key={g.heading ?? i} group={g} />
        ))}
      </div>
    </div>
  );
}

export function ContentLibrary() {
  const alphabetItems: LibraryItem[] = ALPHABET_ID.map((e) => ({ label: `${e.letter} — ${e.word}`, subject: e.subject }));

  const numberItems: LibraryItem[] = NUMBER_WORDS_ID.map((word, i) => ({
    label: `${i} — ${word}`,
    subject: pick(COUNTABLE_SUBJECTS, i),
  }));

  const shapeItems: LibraryItem[] = SHAPE_POOL.map((s) => ({ label: s.label, subject: s.shape }));

  const animalCategories = Array.from(new Set(ANIMAL_POOL.map((a) => a.category)));
  const animalGroups: LibraryGroup[] = animalCategories.map((cat) => ({
    heading: cat,
    items: ANIMAL_POOL.filter((a) => a.category === cat).map((a) => ({ label: a.label, subject: a.subject })),
  }));

  const colorItems: LibraryItem[] = COLOR_POOL.map((c) => ({ label: c.name, subject: c.subject, swatch: c.hex }));

  const ramadanItems: LibraryItem[] = RAMADAN_POOL.map((r) => ({ label: r.label, subject: r.subject }));

  const foodSubjects = dedupeBySubject([...FRUIT_POOL, ...FOOD_POOL]);
  const otherGroups: LibraryGroup[] = [
    { heading: "Buah & Makanan", items: foodSubjects.map((s) => ({ label: titleCase(s), subject: s })) },
    { heading: "Kendaraan", items: VEHICLE_POOL.map((s) => ({ label: titleCase(s), subject: s })) },
    { heading: "Luar Angkasa", items: SPACE_POOL.map((s) => ({ label: titleCase(s), subject: s })) },
    { heading: "Profesi", items: PROFESSION_POOL.map((s) => ({ label: titleCase(s), subject: s })) },
    { heading: "Cuaca", items: WEATHER_POOL.map((s) => ({ label: titleCase(s), subject: s })) },
    { heading: "Anggota Tubuh", items: BODY_POOL.map((s) => ({ label: titleCase(s), subject: s })) },
  ];
  const otherCount = otherGroups.reduce((sum, g) => sum + g.items.length, 0);
  const animalCount = ANIMAL_POOL.length;

  return (
    <div className="mb-10">
      <h2 className="mb-1 font-display text-lg font-bold">Konten yang Didukung</h2>
      <p className="mb-4 text-sm text-muted-foreground">
        Semua huruf, angka, bentuk, dan topik di bawah ini sudah punya ilustrasi siap pakai — pilih topik ini saat membuat
        buku agar gambarnya pasti sesuai.
      </p>
      <Tabs defaultValue="huruf">
        <TabsList className="mb-4 flex-wrap">
          <TabsTrigger value="huruf">Huruf</TabsTrigger>
          <TabsTrigger value="angka">Angka</TabsTrigger>
          <TabsTrigger value="bentuk">Bentuk</TabsTrigger>
          <TabsTrigger value="hewan">Hewan</TabsTrigger>
          <TabsTrigger value="warna">Warna</TabsTrigger>
          <TabsTrigger value="ramadan">Ramadan</TabsTrigger>
          <TabsTrigger value="lainnya">Lainnya</TabsTrigger>
        </TabsList>

        <TabsContent value="huruf">
          <LibraryTab
            description="26 huruf A–Z lengkap dengan contoh kata dan ilustrasi — dipakai di halaman Letter Tracing."
            count={alphabetItems.length}
            groups={[{ items: alphabetItems }]}
          />
        </TabsContent>
        <TabsContent value="angka">
          <LibraryTab
            description="Angka 0–10 dengan kata bilangan dan objek untuk dihitung — dipakai di Number Tracing & Count and Circle."
            count={numberItems.length}
            groups={[{ items: numberItems }]}
          />
        </TabsContent>
        <TabsContent value="bentuk">
          <LibraryTab
            description="8 bentuk dasar dengan nama Indonesia — dipakai di halaman Shape Recognition."
            count={shapeItems.length}
            groups={[{ items: shapeItems }]}
          />
        </TabsContent>
        <TabsContent value="hewan">
          <LibraryTab
            description="Dikelompokkan berdasarkan tempat tinggal — dipakai di Animal Classification, Matching, dan Find & Circle."
            count={animalCount}
            groups={animalGroups}
          />
        </TabsContent>
        <TabsContent value="warna">
          <LibraryTab
            description="8 warna dasar, masing-masing dengan contoh benda."
            count={colorItems.length}
            groups={[{ items: colorItems }]}
          />
        </TabsContent>
        <TabsContent value="ramadan">
          <LibraryTab
            description="Tema spesial untuk buku bertema Ramadan atau Islami."
            count={ramadanItems.length}
            groups={[{ items: ramadanItems }]}
          />
        </TabsContent>
        <TabsContent value="lainnya">
          <LibraryTab
            description="Topik tambahan yang bisa dipakai di halaman Matching, Find & Circle, Cut & Paste, dan Count and Circle."
            count={otherCount}
            groups={otherGroups}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
