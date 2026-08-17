"use client";

import Link from "next/link";
import { ChevronsUpDown, LogOut, Settings, User as UserIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MOCK_USER } from "@/lib/data/mock-user";

const initials = MOCK_USER.name
  .split(" ")
  .map((p) => p[0])
  .slice(0, 2)
  .join("");

export function UserMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="flex items-center justify-center gap-2.5 rounded-xl p-2 text-left transition-colors hover:bg-muted lg:w-full lg:justify-start"
          aria-label="Menu profil"
        >
          <Avatar className="size-9 shrink-0">
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <span className="hidden min-w-0 flex-1 flex-col lg:flex">
            <span className="truncate text-sm font-semibold">{MOCK_USER.name}</span>
            <span className="truncate text-xs text-muted-foreground capitalize">{MOCK_USER.plan} plan</span>
          </span>
          <ChevronsUpDown className="hidden size-4 shrink-0 text-muted-foreground lg:block" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="top" className="w-56">
        <div className="px-2 py-1.5">
          <p className="truncate text-sm font-semibold">{MOCK_USER.name}</p>
          <p className="truncate text-xs text-muted-foreground">{MOCK_USER.email}</p>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/settings">
            <UserIcon /> Profil Saya
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/settings">
            <Settings /> Pengaturan
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <LogOut /> Keluar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
