"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { MOBILE_NAV_ITEMS } from "./nav-config";

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 flex items-stretch justify-around border-t border-border/70 bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md md:hidden">
      {MOBILE_NAV_ITEMS.map((item) => {
        const active = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
        const isCreate = item.label === "Buat";
        return (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              "flex flex-1 flex-col items-center justify-center gap-0.5 py-2 text-[0.65rem] font-medium",
              active ? "text-primary" : "text-muted-foreground"
            )}
          >
            {isCreate ? (
              <span className="-mt-5 mb-0.5 flex size-11 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md shadow-primary/30">
                <item.icon className="size-5" />
              </span>
            ) : (
              <item.icon className="size-5" />
            )}
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
