import type { AIProvider } from "@/types";
import { MockAIProvider } from "./mock-provider";
import { RemoteAIProvider } from "./remote-provider";

let provider: AIProvider | null = null;

/**
 * Resolves the AIProvider callers should use. In the browser this is a
 * RemoteAIProvider (calls /api/ai, which runs Groq -> Gemini server-side);
 * on the server it's the deterministic MockAIProvider directly, since
 * server code should call LLMAIProvider explicitly instead of round
 * tripping through its own API route.
 */
export function getAIProvider(): AIProvider {
  if (!provider) {
    provider = typeof window !== "undefined" ? new RemoteAIProvider() : new MockAIProvider();
  }
  return provider;
}
