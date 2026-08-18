import type { AIProvider, BookConfig, BookStructure, BookStructurePage, Page } from "@/types";
import { MockAIProvider } from "./mock-provider";

/**
 * Client-side AIProvider. Calls the /api/ai route, which runs the real
 * Groq -> Gemini fallback chain server-side (API keys never reach the
 * browser). If that request fails for any reason — offline, route error,
 * no keys configured anywhere — this falls back to the local MockAIProvider
 * so every caller keeps working with zero configuration, same as before.
 */
export class RemoteAIProvider implements AIProvider {
  name = "remote-ai-writer";
  private mock = new MockAIProvider();

  private async call<T>(body: Record<string, unknown>): Promise<T> {
    const res = await fetch("/api/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`AI request failed: ${res.status}`);
    return res.json() as Promise<T>;
  }

  async generateBookStructure(config: BookConfig): Promise<BookStructure> {
    try {
      return await this.call<BookStructure>({ method: "generateBookStructure", config });
    } catch {
      return this.mock.generateBookStructure(config);
    }
  }

  async generatePageContent(structurePage: BookStructurePage, config: BookConfig): Promise<Page> {
    try {
      return await this.call<Page>({ method: "generatePageContent", structurePage, config });
    } catch {
      return this.mock.generatePageContent(structurePage, config);
    }
  }

  async generateIllustrationPrompt(subject: string, style: string): Promise<string> {
    try {
      return await this.call<string>({ method: "generateIllustrationPrompt", subject, style });
    } catch {
      return this.mock.generateIllustrationPrompt(subject, style);
    }
  }

  async improvePage(page: Page, instruction: string, config: BookConfig): Promise<Page> {
    try {
      return await this.call<Page>({ method: "improvePage", page, instruction, config });
    } catch {
      return this.mock.improvePage(page, instruction, config);
    }
  }

  async generateActivity(topic: string, config: BookConfig): Promise<Page> {
    try {
      return await this.call<Page>({ method: "generateActivity", topic, config });
    } catch {
      return this.mock.generateActivity(topic, config);
    }
  }

  async enhanceInstructions(rawInstruction: string, config: Partial<BookConfig>): Promise<string> {
    try {
      return await this.call<string>({ method: "enhanceInstructions", rawInstruction, config });
    } catch {
      return this.mock.enhanceInstructions(rawInstruction, config);
    }
  }
}
