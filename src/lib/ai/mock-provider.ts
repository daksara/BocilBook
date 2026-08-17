import type {
  AIProvider,
  BookConfig,
  BookStructure,
  BookStructurePage,
  Page,
  PageType,
} from "@/types";
import { buildPageData, illustrationPrompt, makeIllustration, pageTitleFor } from "./content-builder";
import { deriveBookTitle, generateFullBook } from "./generate-book";
import { resolveTopicSubjects, pick } from "./content-pools";

let regenPageIdCounter = 0;
function nextId(prefix: string) {
  regenPageIdCounter += 1;
  return `${prefix}-${regenPageIdCounter}-${Date.now().toString(36)}`;
}

function toStructurePage(page: Page): BookStructurePage {
  return {
    pageNumber: page.pageNumber,
    title: page.title,
    ...page.data,
  };
}

function simplerInstruction(type: PageType, config: BookConfig): string {
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

/**
 * Mock AI provider. Implements the full `AIProvider` contract with
 * deterministic, template-driven content generation so the app works
 * end-to-end without any external LLM API key. Swap `getAIProvider()`'s
 * implementation for a real LLM-backed provider later — every caller only
 * depends on this interface.
 */
class MockAIProvider implements AIProvider {
  name = "mock-ai-writer";

  private async delay(ms = 200) {
    await new Promise((resolve) => setTimeout(resolve, ms));
  }

  async generateBookStructure(config: BookConfig): Promise<BookStructure> {
    await this.delay(300);
    const book = generateFullBook(config);
    return {
      bookTitle: book.title,
      ageRange: config.ageRange,
      language: config.language,
      style: config.style,
      pages: book.pages.map(toStructurePage),
    };
  }

  async generatePageContent(structurePage: BookStructurePage, config: BookConfig): Promise<Page> {
    await this.delay(150);
    const seed = structurePage.pageNumber * 31 + config.topic.length;
    const type = structurePage.type;
    if (type === "cover") {
      const title = (structurePage.title as string) || deriveBookTitle(config);
      const subject = pick(resolveTopicSubjects(config.topic), seed);
      return {
        id: nextId("page"),
        pageNumber: structurePage.pageNumber,
        type: "cover",
        title,
        data: { type: "cover", subtitle: `Usia ${config.ageRange} tahun`, illustration: makeIllustration(subject, config, "cover") },
        elements: [],
      };
    }
    const data = buildPageData(type, { config, seed, letterIndex: seed % 26, numberIndex: seed % 10 });
    return {
      id: nextId("page"),
      pageNumber: structurePage.pageNumber,
      type,
      title: pageTitleFor(type, data, config),
      data,
      elements: [],
    };
  }

  async generateIllustrationPrompt(subject: string, style: string): Promise<string> {
    await this.delay(80);
    return illustrationPrompt(subject, style);
  }

  async improvePage(page: Page, instruction: string, config: BookConfig): Promise<Page> {
    await this.delay(500);
    const text = instruction.toLowerCase();
    const next: Page = structuredClone(page);
    const seed = Date.now() % 10000;

    const wantsEasier = /mudah|simpel|easier|simple/.test(text);
    const wantsNewImage = /ganti gambar|ganti ilustrasi|ubah gambar|change image|new picture/.test(text);
    const wantsSimplerInstruction = /instruksi.*sederhana|instruksi.*mudah|simpler instruction/.test(text);
    const wantsTheme = /ubah tema|ganti tema|change theme/.test(text);
    const wantsEngaging = /menarik|seru|engaging|fun/.test(text);

    if (wantsNewImage || wantsTheme) {
      const subjects = resolveTopicSubjects(config.topic).filter((s) => {
        const current = JSON.stringify(next.data);
        return !current.includes(`"subject":"${s}"`);
      });
      const newSubject = pick(subjects.length ? subjects : resolveTopicSubjects(config.topic), seed);
      if (wantsTheme) {
        next.data = buildPageData(next.type, { config, seed: seed + 1, letterIndex: seed % 26, numberIndex: seed % 10 });
        next.title = pageTitleFor(next.type, next.data, config);
      } else {
        applyToIllustrations(next.data, () => makeIllustration(newSubject, config, `swap-${seed}`));
      }
    }

    if (wantsEasier) {
      simplifyPage(next.data, config.difficulty);
    }

    if (wantsSimplerInstruction) {
      const simpler = simplerInstruction(next.type, config);
      if (simpler) setInstruction(next.data, simpler);
    }

    if (wantsEngaging) {
      const current = getInstruction(next.data);
      const suffix = config.language === "en" ? " You can do it!" : " Ayo, pasti seru!";
      if (current && !current.endsWith(suffix)) setInstruction(next.data, current + suffix);
    }

    if (!wantsNewImage && !wantsTheme && !wantsEasier && !wantsSimplerInstruction && !wantsEngaging) {
      // Unrecognized instruction: do a gentle content refresh so the action still visibly does something.
      next.data = buildPageData(next.type, { config, seed: seed + 2, letterIndex: seed % 26, numberIndex: seed % 10 });
      next.title = pageTitleFor(next.type, next.data, config);
    }

    return next;
  }

  async generateActivity(topic: string, config: BookConfig): Promise<Page> {
    await this.delay(400);
    const types: PageType[] = [
      "letter_tracing",
      "count_and_circle",
      "match_objects",
      "find_and_circle",
      "coloring_page",
      "maze",
      "cut_and_paste",
      "shape_recognition",
      "animal_classification",
    ];
    const scopedConfig: BookConfig = { ...config, topic: topic || config.topic };
    const seed = Date.now() % 5000;
    const type = pick(types, seed);
    const data = buildPageData(type, { config: scopedConfig, seed, letterIndex: seed % 26, numberIndex: seed % 10 });
    return {
      id: nextId("page"),
      pageNumber: 0,
      type,
      title: pageTitleFor(type, data, scopedConfig),
      data,
      elements: [],
    };
  }

  async enhanceInstructions(rawInstruction: string, config: Partial<BookConfig>): Promise<string> {
    await this.delay(350);
    const trimmed = rawInstruction.trim();
    if (!trimmed) return trimmed;
    const age = config.ageRange ? `usia ${config.ageRange} tahun` : "usia target";
    const difficulty = config.difficulty ?? "medium";
    const difficultyLabel = { easy: "mudah", medium: "menengah", advanced: "menantang" }[difficulty];
    return `${trimmed} Gunakan bahasa yang hangat dan ramah anak, sesuaikan dengan ${age}, jaga tingkat kesulitan tetap ${difficultyLabel}, dan pastikan setiap instruksi aktivitas singkat serta mudah dipahami.`;
  }
}

function applyToIllustrations(data: Page["data"], factory: () => ReturnType<typeof makeIllustration>) {
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

function simplifyPage(data: Page["data"], difficulty: BookConfig["difficulty"]) {
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

function getInstruction(data: Page["data"]): string | null {
  const anyData = data as unknown as Record<string, unknown>;
  return typeof anyData.instruction === "string" ? anyData.instruction : null;
}

function setInstruction(data: Page["data"], value: string) {
  (data as unknown as Record<string, unknown>).instruction = value;
}

let provider: AIProvider | null = null;

export function getAIProvider(): AIProvider {
  if (!provider) {
    // Provider selection would branch on an env var (e.g. AI_PROVIDER=openai)
    // once a real LLM backend is connected. Mock mode is always the fallback
    // so the product works with zero configuration.
    provider = new MockAIProvider();
  }
  return provider;
}
