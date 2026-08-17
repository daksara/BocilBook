"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/shared/logo";
import { NAV_ITEMS } from "./nav-config";
import { CreditsWidget } from "./credits-widget";
import { UserMenu } from "./user-menu";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 hidden h-dvh w-20 shrink-0 flex-col border-r border-border/70 bg-sidebar px-2.5 py-5 md:flex lg:w-64 lg:px-4">
      <Link href="/dashboard" className="mb-6 flex justify-center px-0 lg:justify-start lg:px-1">
        <span className="lg:hidden">
          <Logo iconOnly />
        </span>
        <span className="hidden lg:inline">
          <Logo />
        </span>
      </Link>

      <nav className="flex flex-1 flex-col gap-1">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.label}
              href={item.href}
              title={item.label}
              className={cn(
                "flex items-center justify-center gap-3 rounded-xl px-0 py-2.5 text-sm font-medium transition-colors lg:justify-start lg:px-3",
                active
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="size-[1.15rem] shrink-0" />
              <span className="hidden lg:inline">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="flex flex-col items-center gap-3 lg:items-stretch">
        <span className="lg:hidden">
          <CreditsWidget compact />
        </span>
        <span className="hidden w-full lg:block">
          <CreditsWidget />
        </span>
        <UserMenu />
      </div>
    </aside>
  );
}
