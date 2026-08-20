import type { LucideIcon } from "lucide-react";
import { Gamepad2, LayoutDashboard, Library, SquarePlus, LayoutTemplate, Settings } from "lucide-react";

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

export const NAV_ITEMS: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/books", label: "My Books", icon: Library },
  { href: "/create", label: "Create Book", icon: SquarePlus },
  { href: "/games", label: "Main Game", icon: Gamepad2 },
  { href: "/templates", label: "Templates", icon: LayoutTemplate },
  { href: "/settings", label: "Settings", icon: Settings },
];

export const MOBILE_NAV_ITEMS: NavItem[] = [
  { href: "/dashboard", label: "Home", icon: LayoutDashboard },
  { href: "/books", label: "Books", icon: Library },
  { href: "/create", label: "Buat", icon: SquarePlus },
  { href: "/games", label: "Main", icon: Gamepad2 },
  { href: "/templates", label: "Template", icon: LayoutTemplate },
];
