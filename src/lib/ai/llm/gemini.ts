import { LLMError, type ChatMessage, type ChatOptions } from "./types";

const DEFAULT_MODEL = "gemini-2.0-flash";

/** Text completion via Google's Gemini generateContent endpoint. Used as the fallback when Groq is unavailable. */
export async function completeWithGemini(messages: ChatMessage[], opts: ChatOptions = {}): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new LLMError("gemini", "GEMINI_API_KEY is not configured");

  const model = process.env.GEMINI_MODEL || DEFAULT_MODEL;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const systemMessages = messages.filter((m) => m.role === "system").map((m) => m.content);
  const userMessages = messages.filter((m) => m.role === "user");

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  let res: Response;
  try {
    res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...(systemMessages.length ? { systemInstruction: { parts: [{ text: systemMessages.join("\n\n") }] } } : {}),
        contents: userMessages.map((m) => ({ role: "user", parts: [{ text: m.content }] })),
        generationConfig: {
          temperature: opts.temperature ?? 0.7,
          maxOutputTokens: opts.maxTokens ?? 1024,
          ...(opts.jsonMode ? { responseMimeType: "application/json" } : {}),
        },
      }),
      signal: controller.signal,
    });
  } catch (err) {
    throw new LLMError("gemini", "request failed", err);
  } finally {
    clearTimeout(timeout);
  }

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new LLMError("gemini", `HTTP ${res.status}: ${body.slice(0, 300)}`);
  }

  const json = await res.json();
  const text = json?.candidates?.[0]?.content?.parts?.map((p: { text?: string }) => p.text ?? "").join("");
  if (typeof text !== "string" || !text.trim()) {
    throw new LLMError("gemini", "empty completion");
  }
  return text;
}
