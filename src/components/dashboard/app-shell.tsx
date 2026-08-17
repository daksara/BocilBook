import type { ReactNode } from "react";
import Link from "next/link";
import { Sidebar } from "./sidebar";
import { MobileNav } from "./mobile-nav";
import { Logo } from "@/components/shared/logo";
import { UserMenu } from "./user-menu";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh bg-background">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border/70 bg-background/90 px-4 py-3 backdrop-blur-md md:hidden">
          <Link href="/dashboard">
            <Logo />
          </Link>
          <UserMenu />
        </header>
        <main className="flex-1 pb-20 md:pb-0">{children}</main>
      </div>
      <MobileNav />
    </div>
  );
}
