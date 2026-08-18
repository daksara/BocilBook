export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  plan: "free" | "pro" | "studio";
}

export interface AIProviderLimit {
  id: "groq" | "gemini";
  name: string;
  model: string;
  role: "Utama" | "Fallback";
  requestsPerMinute: number;
  requestsPerDay: number;
  tokensPerMinute: number;
  docsUrl: string;
}

export interface Template {
  id: string;
  type: import("./page").PageType;
  name: string;
  description: string;
  category: "tracing" | "recognition" | "logic" | "creative" | "cover";
  icon: string;
}
