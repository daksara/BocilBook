import type { AIProvider, BookConfig, BookStructure, BookStructurePage, Page } from "@/types";
import { MockAIProvider } from "./mock-provider";
import { buildPageData, illustrationPrompt, pageTitleFor } from "./content-builder";
import { deriveBookTitle } from "./generate-book";
import { completeJSON, completeText } from "./llm";
import { setInstruction, simplifyPage, swapIllustrations } from "./page-transforms";

/**
 * Server-only, real LLM-backed AIProvider: Groq first, Gemini as fallback
 * (handled inside `llm/index.ts`), and the deterministic MockAIProvider as
 * the final fallback whenever both LLM calls fail (missing keys, network
 * error, malformed output). Never import this from a "use client" file —
 * it reads GROQ_API_KEY / GEMINI_API_KEY, which must stay server-side.
 *
 * The LLM's role is scoped to *text* (titles, instructions, phrasing).
 * Structural fields (tracing letters, counts, matching pairs, illustration
 * subjects) stay deterministic via content-builder, since they're tied to
 * the fixed template/illustration engine, not something a model should
 * invent freely.
 */
export class LLMAIProvider implements AIProvider {
  name = "llm-ai-writer";
  private mock = new MockAIProvider();

  async generateBookStructure(config: BookConfig): Promise<BookStructure> {
    let title: string;
    try {
      const { text } = await completeText(
        [
          {
            role: "system",
            content:
              "You write short, catchy titles for children's activity workbooks. Reply with the title only, no quotes, no explanation.",
          },
          {
            role: "user",
            content: `Book type: ${config.bookType}. Topic: "${config.topic}". Age range: ${config.ageRange}. Language: ${config.language === "en" ? "English" : "Indonesian"}. Give one title, under 6 words.`,
          },
        ],
        { temperature: 0.9, maxTokens: 40 }
      );
      title = text.trim().replace(/^["']|["']$/g, "") || deriveBookTitle(config);
    } catch {
      title = deriveBookTitle(config);
    }

    const structure = await this.mock.generateBookStructure(config);
    return { ...structure, bookTitle: title };
  }

  async generatePageContent(structurePage: BookStructurePage, config: BookConfig): Promise<Page> {
    return this.mock.generatePageContent(structurePage, config);
  }

  async generateIllustrationPrompt(subject: string, style: string): Promise<string> {
    try {
      const { text } = await completeText(
        [
          {
            role: "system",
            content: "You write concise image-generation prompts for children's book illustrations. Reply with the prompt only.",
          },
          { role: "user", content: `Subject: "${subject}". Art style: "${style}". One sentence, no preamble.` },
        ],
        { temperature: 0.8, maxTokens: 120 }
      );
      return text.trim() || illustrationPrompt(subject, style);
    } catch {
      return illustrationPrompt(subject, style);
    }
  }

  async improvePage(page: Page, instruction: string, config: BookConfig): Promise<Page> {
    try {
      return await this.improvePageWithLLM(page, instruction, config);
    } catch {
      return this.mock.improvePage(page, instruction, config);
    }
  }

  private async improvePageWithLLM(page: Page, instruction: string, config: BookConfig): Promise<Page> {
    const currentInstruction = (page.data as unknown as { instruction?: string }).instruction ?? "";
    const directive = await completeJSON<{
      action: "simplify" | "new_image" | "simpler_instruction" | "theme" | "engaging" | "rewrite";
      instruction?: string;
      title?: string;
    }>(
      [
        {
          role: "system",
          content:
            "You edit children's workbook pages based on a parent/teacher's free-form request. " +
            'Classify the request into one action: "simplify" (make it easier), "new_image" (swap the picture), ' +
            '"simpler_instruction" (shorter instruction wording), "theme" (change the theme/subject entirely), ' +
            '"engaging" (make the wording more fun/motivating), or "rewrite" (anything else — just rewrite the instruction text). ' +
            "Always also return a rewritten `instruction` (and `title` if it should change) in the SAME language as the input, " +
            "phrased warmly for young children. Reply with strict JSON: " +
            '{"action": "...", "instruction": "...", "title": "..."}.',
        },
        {
          role: "user",
          content: `Page type: ${page.type}. Page title: "${page.title}". Current instruction: "${currentInstruction}". Language: ${config.language === "en" ? "English" : "Indonesian"}. Request: "${instruction}"`,
        },
      ],
      { temperature: 0.6, maxTokens: 300 }
    );

    // Delegate the structural transform to the same deterministic helpers
    // the mock provider uses, then layer the LLM's phrasing on top.
    const next: Page = structuredClone(page);
    const seed = Date.now() % 10000;

    switch (directive.action) {
      case "new_image":
        swapIllustrations(next.data, config, seed);
        break;
      case "theme": {
        next.data = buildPageData(next.type, { config, seed: seed + 1, letterIndex: seed % 26, numberIndex: seed % 10 });
        next.title = directive.title || pageTitleFor(next.type, next.data, config);
        break;
      }
      case "simplify":
        simplifyPage(next.data, config.difficulty);
        break;
      default:
        break;
    }

    if (directive.instruction) setInstruction(next.data, directive.instruction);
    if (directive.title && next.type !== "cover") next.title = directive.title;

    return next;
  }

  async generateActivity(topic: string, config: BookConfig): Promise<Page> {
    const page = await this.mock.generateActivity(topic, config);
    try {
      const { text } = await completeText(
        [
          {
            role: "system",
            content:
              "You write a single short, warm instruction line for a children's workbook activity page. Reply with the instruction only, in the requested language.",
          },
          {
            role: "user",
            content: `Activity type: ${page.type}. Topic: "${topic || config.topic}". Language: ${config.language === "en" ? "English" : "Indonesian"}. Age range: ${config.ageRange}.`,
          },
        ],
        { temperature: 0.8, maxTokens: 60 }
      );
      if (text.trim()) setInstruction(page.data, text.trim());
    } catch {
      // Keep the mock-generated instruction.
    }
    return page;
  }

  async enhanceInstructions(rawInstruction: string, config: Partial<BookConfig>): Promise<string> {
    const trimmed = rawInstruction.trim();
    if (!trimmed) return trimmed;
    try {
      const { text } = await completeText(
        [
          {
            role: "system",
            content:
              "You refine a parent/teacher's brief for a children's workbook generator. Expand it into one clear, warm paragraph " +
              "that keeps their original intent, matches the target age and difficulty, and reads naturally in the SAME language as the input. " +
              "Reply with the refined instructions only, no preamble.",
          },
          {
            role: "user",
            content: `Age range: ${config.ageRange ?? "unspecified"}. Difficulty: ${config.difficulty ?? "medium"}. Original brief: "${trimmed}"`,
          },
        ],
        { temperature: 0.7, maxTokens: 300 }
      );
      return text.trim() || (await this.mock.enhanceInstructions(rawInstruction, config));
    } catch {
      return this.mock.enhanceInstructions(rawInstruction, config);
    }
  }
}
