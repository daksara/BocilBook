import type { AIProviderLimit } from "@/types";

/**
 * Published free-tier rate limits for the LLM providers BocilBook actually
 * calls (see src/lib/ai/llm/index.ts: Groq first, Gemini as fallback).
 * Model names mirror the DEFAULT_MODEL constants in llm/groq.ts and
 * llm/gemini.ts. These limits are set by Groq/Google and change over time —
 * docsUrl always points at the live numbers for whichever account is
 * actually calling the API.
 */
export const AI_LIMITS: AIProviderLimit[] = [
  {
    id: "groq",
    name: "Groq",
    model: "llama-3.3-70b-versatile",
    role: "Utama",
    requestsPerMinute: 30,
    requestsPerDay: 1_000,
    tokensPerMinute: 12_000,
    docsUrl: "https://console.groq.com/docs/rate-limits",
  },
  {
    id: "gemini",
    name: "Gemini",
    model: "gemini-2.0-flash",
    role: "Fallback",
    requestsPerMinute: 15,
    requestsPerDay: 1_500,
    tokensPerMinute: 1_000_000,
    docsUrl: "https://ai.google.dev/gemini-api/docs/rate-limits",
  },
];
