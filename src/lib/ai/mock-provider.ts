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
import { resolveTopicSubjects, pick, shuffle, TOPIC_IDEA_SUBJECTS, TOPIC_IDEA_TEMPLATES } from "./content-pools";
import {
  applyToIllustrations,
  getInstruction,
  setInstruction,
  simplerInstruction,
  simplifyPage,
} from "./page-transforms";

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

/**
 * Mock AI provider. Implements the full `AIProvider` contract with
 * deterministic, template-driven content generation so the app works
 * end-to-end without any external LLM API key. Swap `getAIProvider()`'s
 * implementation for a real LLM-backed provider later — every caller only
 * depends on this interface.
 */
export class MockAIProvider implements AIProvider {
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

  async suggestTopics(config: Partial<BookConfig>): Promise<string[]> {
    await this.delay(300);
    const bookType = config.bookType ?? "workbook";
    const lang = config.language === "en" ? "en" : "id";
    const age = config.ageRange ?? "3-5";
    const seed = Date.now();

    const templates = TOPIC_IDEA_TEMPLATES[bookType];
    const subjects = shuffle(TOPIC_IDEA_SUBJECTS, seed).slice(0, 6);
    return subjects.map((subject, i) => {
      const template = pick(templates, seed + i);
      return template[lang].replace("{subject}", subject[lang]).replace("{age}", age);
    });
  }
}

