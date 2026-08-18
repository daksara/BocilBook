import type { BookConfig, Page, PageType } from "@/types";
import { makeIllustration } from "./content-builder";
import { resolveTopicSubjects, pick } from "./content-pools";

/**
 * Structural page-editing transforms shared by every AIProvider
 * implementation (mock and LLM-backed alike). AI providers only decide
 * *which* of these to apply and how to phrase the resulting text — the
 * transforms themselves stay deterministic since they touch the
 * illustration/layout engine, not free-form text.
 */

export function simplerInstruction(type: PageType, config: BookConfig): string {
  const en = config.language === "en";
  const map: Record<PageType, [string, string]> = {
    cover: ["", ""],
    letter_tracing: ["Ikuti garis putus-putus", "Follow the dotted line"],
    number_tracing: ["Ikuti garis putus-putus", "Follow the dotted line"],
    count_and_circle: ["Hitung, lalu lingkari", "Count, then circle"],
    match_objects: ["Tarik garis ke gambar yang sama", "Draw a line to match"],
    find_and_circle: ["Cari dan lingkari", "Find and circle"],
    coloring_page: ["Warnai gambar ini", "Color this picture"],
    maze: ["Ikuti jalan sampai selesai", "Follow the path"],
    cut_and_paste: ["Gunting lalu tempel", "Cut, then paste"],
    shape_recognition: ["Sebutkan nama bentuknya", "Name the shape"],
    animal_classification: ["Kelompokkan hewannya", "Sort the animals"],
  };
  return map[type][en ? 1 : 0];
}

export function applyToIllustrations(data: Page["data"], factory: () => ReturnType<typeof makeIllustration>) {
  const anyData = data as unknown as Record<string, unknown>;
  if ("illustration" in anyData) anyData.illustration = factory();
  if ("items" in anyData && Array.isArray(anyData.items)) {
    anyData.items = (anyData.items as Record<string, unknown>[]).map((item) => ({ ...item, illustration: factory() }));
  }
  if ("pieces" in anyData && Array.isArray(anyData.pieces)) {
    anyData.pieces = (anyData.pieces as Record<string, unknown>[]).map((item) => ({ ...item, illustration: factory() }));
  }
  if ("animals" in anyData && Array.isArray(anyData.animals)) {
    anyData.animals = (anyData.animals as Record<string, unknown>[]).map((item) => ({ ...item, illustration: factory() }));
  }
  if ("pairs" in anyData && Array.isArray(anyData.pairs)) {
    anyData.pairs = (anyData.pairs as Record<string, unknown>[]).map((item) => ({
      ...item,
      illustrationLeft: factory(),
      illustrationRight: factory(),
    }));
  }
}

export function swapIllustrations(data: Page["data"], config: BookConfig, seed: number) {
  const subjects = resolveTopicSubjects(config.topic).filter((s) => {
    const current = JSON.stringify(data);
    return !current.includes(`"subject":"${s}"`);
  });
  const newSubject = pick(subjects.length ? subjects : resolveTopicSubjects(config.topic), seed);
  applyToIllustrations(data, () => makeIllustration(newSubject, config, `swap-${seed}`));
}

export function simplifyPage(data: Page["data"], difficulty: BookConfig["difficulty"]) {
  const anyData = data as unknown as Record<string, unknown>;
  if (data.type === "count_and_circle") {
    anyData.targetCount = Math.max(1, Math.min(3, (anyData.targetCount as number) - 2));
  }
  if (data.type === "find_and_circle" && Array.isArray(anyData.items)) {
    anyData.items = (anyData.items as unknown[]).slice(0, Math.max(6, Math.floor((anyData.items as unknown[]).length * 0.6)));
  }
  if (data.type === "shape_recognition" && Array.isArray(anyData.shapes)) {
    anyData.shapes = (anyData.shapes as unknown[]).slice(0, 4);
  }
  if (data.type === "maze") {
    anyData.difficulty = "easy";
  }
  if (data.type === "match_objects" && Array.isArray(anyData.pairs)) {
    anyData.pairs = (anyData.pairs as unknown[]).slice(0, 3);
  }
  void difficulty;
}

export function getInstruction(data: Page["data"]): string | null {
  const anyData = data as unknown as Record<string, unknown>;
  return typeof anyData.instruction === "string" ? anyData.instruction : null;
}

export function setInstruction(data: Page["data"], value: string) {
  (data as unknown as Record<string, unknown>).instruction = value;
}
