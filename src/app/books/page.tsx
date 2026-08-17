"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Plus, Search } from "lucide-react";
import { AppShell } from "@/components/dashboard/app-shell";
import { BookCard } from "@/components/dashboard/book-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useBookStore } from "@/lib/store/book-store";
import type { BookStatus } from "@/types";

const STATUS_FILTERS: { value: BookStatus | "all"; label: string }[] = [
  { value: "all", label: "Semua Status" },
  { value: "ready", label: "Siap" },
  { value: "draft", label: "Draft" },
  { value: "generating", label: "Generating" },
];

export default function BooksPage() {
  const booksMap = useBookStore((s) => s.books);
  const books = useMemo(() => Object.values(booksMap), [booksMap]);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<BookStatus | "all">("all");

  const filtered = useMemo(() => {
    return books
      .filter((b) => (status === "all" ? true : b.status === status))
      .filter((b) => b.title.toLowerCase().includes(query.toLowerCase()))
      .sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1));
  }, [books, query, status]);

  return (
    <AppShell>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="font-display text-2xl font-extrabold sm:text-3xl">My Books</h1>
            <p className="mt-1 text-muted-foreground">{books.length} buku telah kamu buat</p>
          </div>
          <Button asChild>
            <Link href="/create">
              <Plus /> Buat Buku Baru
            </Link>
          </Button>
        </div>

        <div className="mb-6 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Cari judul buku..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={status} onValueChange={(v) => setStatus(v as BookStatus | "all")}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {STATUS_FILTERS.map((f) => (
                <SelectItem key={f.value} value={f.value}>
                  {f.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border py-20 text-center">
            <p className="font-display font-bold">Tidak ada buku ditemukan</p>
            <p className="text-sm text-muted-foreground">Coba ubah kata kunci atau filter status.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
