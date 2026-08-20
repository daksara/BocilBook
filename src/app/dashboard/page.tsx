"use client";

import Link from "next/link";
import { Gamepad2, Plus, Sparkles } from "lucide-react";
import { AppShell } from "@/components/dashboard/app-shell";
import { BookCard } from "@/components/dashboard/book-card";
import { Button } from "@/components/ui/button";
import { useMemo } from "react";
import { useBookStore } from "@/lib/store/book-store";
import { MOCK_USER } from "@/lib/data/mock-user";
import { AI_LIMITS } from "@/lib/data/ai-limits";

export default function DashboardPage() {
  const booksMap = useBookStore((s) => s.books);
  const books = useMemo(() => Object.values(booksMap), [booksMap]);
  const recent = useMemo(
    () => [...books].sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1)).slice(0, 8),
    [books]
  );
  const firstName = MOCK_USER.name.split(" ")[0];

  return (
    <AppShell>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col items-start justify-between gap-6 rounded-3xl bg-gradient-to-br from-primary/10 via-accent/40 to-transparent p-6 sm:flex-row sm:items-center sm:p-8">
          <div>
            <h1 className="font-display text-2xl font-extrabold sm:text-3xl">Halo, {firstName}</h1>
            <p className="mt-1 text-muted-foreground">Siap bikin buku baru?</p>
          </div>
          <div className="flex w-full flex-col gap-2.5 sm:w-auto sm:flex-row">
            <Button size="lg" variant="outline" asChild>
              <Link href="/games">
                <Gamepad2 />
                Main Game
              </Link>
            </Button>
            <Button size="lg" asChild>
              <Link href="/create">
                <Plus />
                Buat Buku Baru
              </Link>
            </Button>
          </div>
        </div>

        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <StatCard label="Total Buku" value={books.length} />
          <StatCard label="Halaman Dibuat" value={books.reduce((acc, b) => acc + b.pages.length, 0)} />
          <StatCard label="Limit Groq (req/menit)" value={AI_LIMITS[0].requestsPerMinute} icon />
        </div>

        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-xl font-bold">Recent Books</h2>
          <Link href="/books" className="text-sm font-semibold text-primary hover:underline">
            Lihat Semua
          </Link>
        </div>

        {recent.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {recent.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}

function StatCard({ label, value, icon }: { label: string; value: number; icon?: boolean }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-border/70 bg-card p-5 shadow-sm shadow-black/[0.02]">
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="font-display text-2xl font-extrabold">{value}</p>
      </div>
      {icon && (
        <span className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Sparkles className="size-5" />
        </span>
      )}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-border py-16 text-center">
      <span className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Sparkles className="size-6" />
      </span>
      <p className="font-display font-bold">Belum ada buku</p>
      <p className="max-w-xs text-sm text-muted-foreground">Mulai buat buku pertamamu dan biarkan AI yang bekerja.</p>
      <Button asChild>
        <Link href="/create">
          <Plus /> Buat Buku Baru
        </Link>
      </Button>
    </div>
  );
}
