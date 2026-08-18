import type { BookConfig } from "./book";
import type { Page, PageType } from "./page";

export type GenerationStepKey =
  | "analyze_theme"
  | "structure"
  | "activities"
  | "content"
  | "illustrations"
  | "layout"
  | "qa";

export interface GenerationStep {
  key: GenerationStepKey;
  label: string;
  status: "pending" | "active" | "done" | "error";
}

export type GenerationJobStatus =
  | "queued"
  | "running"
  | "done"
  | "error";

export interface GenerationJob {
  id: string;
  bookId: string;
  status: GenerationJobStatus;
  progress: number;
  steps: GenerationStep[];
  pagesReady: Page[];
  totalPages: number;
  startedAt: string;
  completedAt?: string;
  error?: string;
}

/** The structured JSON the AI produces before any layout/rendering happens. */
export interface BookStructure {
  bookTitle: string;
  ageRange: string;
  language: string;
  style: string;
  pages: BookStructurePage[];
}

export interface BookStructurePage {
  pageNumber: number;
  type: PageType;
  title: string;
  [key: string]: unknown;
}

export interface AIProvider {
  name: string;
  generateBookStructure(config: BookConfig): Promise<BookStructure>;
  generatePageContent(
    structurePage: BookStructurePage,
    config: BookConfig
  ): Promise<Page>;
  generateIllustrationPrompt(subject: string, style: string): Promise<string>;
  improvePage(page: Page, instruction: string, config: BookConfig): Promise<Page>;
  generateActivity(topic: string, config: BookConfig): Promise<Page>;
  enhanceInstructions(rawInstruction: string, config: Partial<BookConfig>): Promise<string>;
  suggestTopics(config: Partial<BookConfig>): Promise<string[]>;
}

export interface ImageProvider {
  name: string;
  generateIllustration(prompt: string, style: string): Promise<{ url: string; palette: string }>;
}
