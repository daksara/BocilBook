import { NextResponse } from "next/server";
import { LLMAIProvider } from "@/lib/ai/llm-provider";
import type { AIProvider, BookConfig, BookStructurePage, Page } from "@/types";

export const runtime = "nodejs";

const provider: AIProvider = new LLMAIProvider();

type Body =
  | { method: "generateBookStructure"; config: BookConfig }
  | { method: "generatePageContent"; structurePage: BookStructurePage; config: BookConfig }
  | { method: "generateIllustrationPrompt"; subject: string; style: string }
  | { method: "improvePage"; page: Page; instruction: string; config: BookConfig }
  | { method: "generateActivity"; topic: string; config: BookConfig }
  | { method: "enhanceInstructions"; rawInstruction: string; config: Partial<BookConfig> }
  | { method: "suggestTopics"; config: Partial<BookConfig> };

/**
 * Single dispatch endpoint for the AIProvider interface, so API keys
 * (GROQ_API_KEY, GEMINI_API_KEY) never reach the browser bundle. Mirrors
 * RemoteAIProvider's method calls 1:1 — see src/lib/ai/remote-provider.ts.
 */
export async function POST(req: Request) {
  let body: Body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid JSON body" }, { status: 400 });
  }

  try {
    switch (body.method) {
      case "generateBookStructure":
        return NextResponse.json(await provider.generateBookStructure(body.config));
      case "generatePageContent":
        return NextResponse.json(await provider.generatePageContent(body.structurePage, body.config));
      case "generateIllustrationPrompt":
        return NextResponse.json(await provider.generateIllustrationPrompt(body.subject, body.style));
      case "improvePage":
        return NextResponse.json(await provider.improvePage(body.page, body.instruction, body.config));
      case "generateActivity":
        return NextResponse.json(await provider.generateActivity(body.topic, body.config));
      case "enhanceInstructions":
        return NextResponse.json(await provider.enhanceInstructions(body.rawInstruction, body.config));
      case "suggestTopics":
        return NextResponse.json(await provider.suggestTopics(body.config));
      default:
        return NextResponse.json({ error: "unknown method" }, { status: 400 });
    }
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "generation failed" }, { status: 502 });
  }
}
