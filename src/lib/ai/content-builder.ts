import type {
  AnimalClassificationPageData,
  BookConfig,
  ColoringPagePageData,
  CountAndCirclePageData,
  CutAndPastePageData,
  FindAndCirclePageData,
  Illustration,
  LetterTracingPageData,
  MatchObjectsPageData,
  MazePageData,
  NumberTracingPageData,
  PageData,
  PageType,
  ShapeRecognitionPageData,
} from "@/types";
import { generateIllustrationSync } from "@/lib/illustrations";
import {
  ALPHABET_EN,
  ALPHABET_ID,
  ANIMAL_POOL,
  COUNTABLE_SUBJECTS,
  NUMBER_WORDS_EN,
  NUMBER_WORDS_ID,
  SHAPE_POOL,
  pick,
  resolveTopicSubjects,
  shuffle,
} from "./content-pools";

let illustrationCounter = 0;

export function makeIllustration(subject: string, config: BookConfig, variant = ""): Illustration {
  illustrationCounter += 1;
  const { url, palette } = generateIllustrationSync(subject, config.style, `${subject}-${variant}-${config.style}`);
  return {
    id: `ill-${illustrationCounter}-${Date.now().toString(36)}`,
    subject,
    prompt: illustrationPrompt(subject, config.style),
    url,
    palette,
    status: "ready",
  };
}

export function illustrationPrompt(subject: string, style: string): string {
  const styleDescriptor: Record<string, string> = {
    "cute-cartoon": "cute friendly cartoon style, rounded shapes, thick outlines",
    minimal: "minimal flat vector style, simple geometric shapes",
    colorful: "bold vibrant colors, playful cartoon style",
    "soft-pastel": "soft pastel color palette, gentle rounded illustration",
    educational: "clean educational textbook illustration style",
    "islamic-kids": "warm friendly illustration with islamic-inspired ornamental colors",
    "bw-printable": "black and white line art, clean outlines, no fill, coloring-book style",
  };
  const descriptor = styleDescriptor[style] ?? styleDescriptor["cute-cartoon"];
  return `cute friendly cartoon ${subject} for a preschool worksheet, simple clean vector illustration, ${descriptor}, white background`;
}

const isEn = (config: BookConfig) => config.language === "en";

function instr(id: string, en: string, config: BookConfig) {
  return isEn(config) ? en : id;
}

export interface BuildContext {
  config: BookConfig;
  seed: number;
  letterIndex?: number;
  numberIndex?: number;
}

export function buildCover(config: BookConfig, title: string) {
  const subjects = resolveTopicSubjects(config.topic);
  const subject = pick(subjects, hashSeed(title));
  return {
    subtitle: ageLabel(config),
    illustration: makeIllustration(subject, config, "cover"),
  };
}

function ageLabel(config: BookConfig) {
  return isEn(config) ? `Ages ${config.ageRange.replace("-", "–")} years` : `Usia ${config.ageRange} tahun`;
}

function hashSeed(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h << 5) - h + s.charCodeAt(i);
  return Math.abs(h);
}

export function buildLetterTracing(ctx: BuildContext): LetterTracingPageData {
  const alphabet = isEn(ctx.config) ? ALPHABET_EN : ALPHABET_ID;
  const entry = alphabet[(ctx.letterIndex ?? 0) % alphabet.length];
  return {
    letter: entry.letter,
    uppercase: entry.letter.toUpperCase(),
    lowercase: entry.letter.toLowerCase(),
    exampleWord: entry.word,
    instruction: instr(`Tebalkan huruf ${entry.letter}`, `Trace the letter ${entry.letter}`, ctx.config),
    illustration: makeIllustration(entry.subject, ctx.config, entry.letter),
  };
}

export function buildNumberTracing(ctx: BuildContext): NumberTracingPageData {
  const words = isEn(ctx.config) ? NUMBER_WORDS_EN : NUMBER_WORDS_ID;
  const idx = ((ctx.numberIndex ?? 0) % 10) + 1;
  const subject = pick(COUNTABLE_SUBJECTS, ctx.seed + idx);
  return {
    number: idx,
    word: words[idx],
    instruction: instr(`Tebalkan angka ${idx}`, `Trace the number ${idx}`, ctx.config),
    illustration: makeIllustration(subject, ctx.config, `num-${idx}`),
  };
}

export function buildCountAndCircle(ctx: BuildContext): CountAndCirclePageData {
  const maxCount = ctx.config.difficulty === "easy" ? 5 : ctx.config.difficulty === "medium" ? 8 : 10;
  const targetCount = 2 + (ctx.seed % (maxCount - 1));
  const subject = pick(resolveTopicSubjects(ctx.config.topic), ctx.seed);
  const distractors = shuffle(
    [targetCount, Math.max(1, targetCount - 1), Math.min(maxCount + 2, targetCount + 1), Math.min(maxCount + 3, targetCount + 2)],
    ctx.seed
  );
  const options = Array.from(new Set(distractors)).slice(0, 3);
  if (!options.includes(targetCount)) options[0] = targetCount;
  return {
    targetCount,
    itemLabel: subject,
    illustration: makeIllustration(subject, ctx.config, `count-${targetCount}`),
    options: shuffle(options, ctx.seed + 1),
    instruction: instr("Hitung gambar lalu lingkari angka yang tepat", "Count the pictures and circle the right number", ctx.config),
  };
}

export function buildMatchObjects(ctx: BuildContext): MatchObjectsPageData {
  const subjects = shuffle(resolveTopicSubjects(ctx.config.topic), ctx.seed);
  const count = ctx.config.difficulty === "advanced" ? 5 : 4;
  const chosen = subjects.slice(0, count);
  return {
    pairs: chosen.map((subject, i) => ({
      id: `pair-${i}`,
      left: subject,
      right: subject,
      illustrationLeft: makeIllustration(subject, ctx.config, `matchL-${i}`),
      illustrationRight: makeIllustration(subject, ctx.config, `matchR-${i}`),
    })),
    instruction: instr("Tarik garis untuk memasangkan gambar yang sama", "Draw a line to match the same pictures", ctx.config),
  };
}

export function buildFindAndCircle(ctx: BuildContext): FindAndCirclePageData {
  const subjects = resolveTopicSubjects(ctx.config.topic);
  const target = pick(subjects, ctx.seed);
  const others = subjects.filter((s) => s !== target);
  const total = ctx.config.difficulty === "easy" ? 9 : ctx.config.difficulty === "medium" ? 12 : 15;
  const targetCount = Math.max(3, Math.round(total * 0.3));
  const items = [];
  for (let i = 0; i < targetCount; i++) {
    items.push({ id: `find-t-${i}`, label: target, illustration: makeIllustration(target, ctx.config, `find-${i}`), isTarget: true });
  }
  for (let i = 0; i < total - targetCount; i++) {
    const other = pick(others, ctx.seed + i * 3);
    items.push({ id: `find-o-${i}`, label: other, illustration: makeIllustration(other, ctx.config, `find-o-${i}`), isTarget: false });
  }
  return {
    targetLabel: target,
    items: shuffle(items, ctx.seed + 7),
    instruction: instr(`Temukan dan lingkari semua gambar ${target}`, `Find and circle every ${target}`, ctx.config),
  };
}

export function buildColoringPage(ctx: BuildContext): ColoringPagePageData {
  const subject = pick(resolveTopicSubjects(ctx.config.topic), ctx.seed);
  return {
    title: subject,
    illustration: makeIllustration(subject, { ...ctx.config, style: "bw-printable" }, `color-${ctx.seed}`),
    instruction: instr("Warnai gambar ini dengan warna favoritmu!", "Color this picture with your favorite colors!", ctx.config),
  };
}

export function buildMaze(ctx: BuildContext): MazePageData {
  const subjects = resolveTopicSubjects(ctx.config.topic);
  const start = pick(subjects, ctx.seed);
  const end = pick(subjects, ctx.seed + 11);
  return {
    theme: ctx.config.topic || "petualangan",
    startLabel: start,
    endLabel: end === start ? "rumah" : end,
    difficulty: ctx.config.difficulty,
    instruction: instr("Bantu temukan jalan melalui labirin!", "Help find the way through the maze!", ctx.config),
    seed: ctx.seed,
  };
}

export function buildCutAndPaste(ctx: BuildContext): CutAndPastePageData {
  const subjects = resolveTopicSubjects(ctx.config.topic);
  const target = pick(subjects, ctx.seed);
  const others = subjects.filter((s) => s !== target);
  const pieces = [target, pick(others, ctx.seed + 1), pick(others, ctx.seed + 2), pick(others, ctx.seed + 3)];
  return {
    targetLabel: target,
    pieces: shuffle(pieces, ctx.seed + 5).map((s, i) => ({
      id: `piece-${i}`,
      label: s,
      illustration: makeIllustration(s, ctx.config, `piece-${i}`),
      belongs: s === target,
    })),
    instruction: instr(`Gunting gambar ${target} lalu tempel di kotak`, `Cut out the ${target} picture and paste it in the box`, ctx.config),
  };
}

export function buildShapeRecognition(ctx: BuildContext): ShapeRecognitionPageData {
  const count = ctx.config.difficulty === "advanced" ? 8 : 6;
  const shapes = shuffle(SHAPE_POOL, ctx.seed).slice(0, count);
  return {
    shapes: shapes.map((s, i) => ({ id: `shape-${i}`, shape: s.shape as ShapeRecognitionPageData["shapes"][number]["shape"], label: s.label })),
    instruction: instr("Sebutkan dan warnai setiap bentuk di bawah ini", "Name and color each shape below", ctx.config),
  };
}

export function buildAnimalClassification(ctx: BuildContext): AnimalClassificationPageData {
  const categories = Array.from(new Set(ANIMAL_POOL.map((a) => a.category)));
  const animals = shuffle(ANIMAL_POOL, ctx.seed).slice(0, 6);
  return {
    categories,
    animals: animals.map((a, i) => ({
      id: `animal-${i}`,
      label: a.label,
      category: a.category,
      illustration: makeIllustration(a.subject, ctx.config, `animal-${i}`),
    })),
    instruction: instr("Kelompokkan setiap hewan sesuai tempat tinggalnya", "Sort each animal into its correct group", ctx.config),
  };
}

export function buildPageData(type: PageType, ctx: BuildContext): PageData {
  switch (type) {
    case "letter_tracing":
      return { type, ...buildLetterTracing(ctx) };
    case "number_tracing":
      return { type, ...buildNumberTracing(ctx) };
    case "count_and_circle":
      return { type, ...buildCountAndCircle(ctx) };
    case "match_objects":
      return { type, ...buildMatchObjects(ctx) };
    case "find_and_circle":
      return { type, ...buildFindAndCircle(ctx) };
    case "coloring_page":
      return { type, ...buildColoringPage(ctx) };
    case "maze":
      return { type, ...buildMaze(ctx) };
    case "cut_and_paste":
      return { type, ...buildCutAndPaste(ctx) };
    case "shape_recognition":
      return { type, ...buildShapeRecognition(ctx) };
    case "animal_classification":
      return { type, ...buildAnimalClassification(ctx) };
    case "cover":
    default:
      return { type: "cover", ...buildCover(ctx.config, ctx.config.topic) };
  }
}

export function pageTitleFor(type: PageType, data: PageData, config: BookConfig): string {
  switch (data.type) {
    case "letter_tracing":
      return isEn(config) ? `Letter ${data.letter}` : `Huruf ${data.letter}`;
    case "number_tracing":
      return isEn(config) ? `Number ${data.number}` : `Angka ${data.number}`;
    case "count_and_circle":
      return isEn(config) ? "Count & Circle" : "Hitung & Lingkari";
    case "match_objects":
      return isEn(config) ? "Match the Pictures" : "Mencocokkan Gambar";
    case "find_and_circle":
      return isEn(config) ? "Find & Circle" : "Cari & Lingkari";
    case "coloring_page":
      return isEn(config) ? "Coloring Page" : "Halaman Mewarnai";
    case "maze":
      return isEn(config) ? "Maze" : "Labirin";
    case "cut_and_paste":
      return isEn(config) ? "Cut & Paste" : "Gunting & Tempel";
    case "shape_recognition":
      return isEn(config) ? "Shapes" : "Mengenal Bentuk";
    case "animal_classification":
      return isEn(config) ? "Animal Groups" : "Klasifikasi Hewan";
    case "cover":
    default:
      return config.topic;
  }
}
