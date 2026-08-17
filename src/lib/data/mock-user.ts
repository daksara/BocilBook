import type { Credit, User } from "@/types";

export const MOCK_USER: User = {
  id: "demo-user",
  name: "Sarah Wijaya",
  email: "sarah.wijaya@gmail.com",
  plan: "pro",
};

export const MOCK_CREDIT: Credit = {
  balance: 68,
  monthlyAllowance: 100,
  usedThisMonth: 32,
  resetsAt: "2026-09-01",
};
