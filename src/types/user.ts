export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  plan: "free" | "pro" | "studio";
}

export interface Credit {
  balance: number;
  monthlyAllowance: number;
  usedThisMonth: number;
  resetsAt: string;
}

export interface Template {
  id: string;
  type: import("./page").PageType;
  name: string;
  description: string;
  category: "tracing" | "recognition" | "logic" | "creative" | "cover";
  icon: string;
}
