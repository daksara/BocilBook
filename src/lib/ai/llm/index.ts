import { completeWithGroq } from "./groq";
import { completeWithGemini } from "./gemini";
import { LLMError, type ChatMessage, type ChatOptions } from "./types";

export type { ChatMessage, ChatOptions };
export { LLMError };

export interface CompletionResult {
  text: string;
  provider: "groq" | "gemini";
}

/**
 * Server-only LLM orchestration: Groq is the primary provider, Gemini is
 * the fallback used whenever Groq is unconfigured, errors, or times out.
 * Throws LLMError only when both providers fail — callers (LLMAIProvider)
 * catch that and fall back to the deterministic mock provider.
 */
export async function completeText(messages: ChatMessage[], opts: ChatOptions = {}): Promise<CompletionResult> {
  try {
    const text = await completeWithGroq(messages, opts);
    return { text, provider: "groq" };
  } catch (groqError) {
    try {
      const text = await completeWithGemini(messages, opts);
      return { text, provider: "gemini" };
    } catch (geminiError) {
      throw new LLMError(
        "groq+gemini",
        `both providers failed: groq(${(groqError as Error).message}), gemini(${(geminiError as Error).message})`
      );
    }
  }
}

/** Same as completeText, but parses the completion as JSON (stripping ```json fences if present). */
export async function completeJSON<T>(messages: ChatMessage[], opts: ChatOptions = {}): Promise<T> {
  const { text, provider } = await completeText(messages, { ...opts, jsonMode: true });
  const cleaned = text.trim().replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/, "");
  try {
    return JSON.parse(cleaned) as T;
  } catch (err) {
    throw new LLMError(provider, `failed to parse JSON completion: ${cleaned.slice(0, 200)}`, err);
  }
}
