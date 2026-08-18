export interface ChatMessage {
  role: "system" | "user";
  content: string;
}

export interface ChatOptions {
  temperature?: number;
  maxTokens?: number;
  /** Ask the backend to constrain output to a JSON object, when it supports it. */
  jsonMode?: boolean;
}

export class LLMError extends Error {
  constructor(
    public readonly provider: string,
    message: string,
    public readonly cause?: unknown
  ) {
    super(`[${provider}] ${message}`);
    this.name = "LLMError";
  }
}
