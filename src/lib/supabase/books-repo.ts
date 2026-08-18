import type { Book } from "@/types";
import { getSupabaseBrowserClient } from "./client";
import { isSupabaseConfigured } from "./config";

const TABLE = "books";

/**
 * Thin persistence layer over the `books` table (see supabase/schema.sql).
 * Every function is a no-op when Supabase isn't configured, and failures
 * are swallowed (logged) rather than thrown — book-store.ts stays the
 * source of truth for the running session; Supabase is best-effort sync,
 * never a blocking dependency for the UI.
 */

export async function fetchBooksFromSupabase(ownerId: string): Promise<Book[]> {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) return [];
  const { data, error } = await supabase.from(TABLE).select("data").eq("owner_id", ownerId);
  if (error) {
    console.warn("[supabase] fetchBooks failed:", error.message);
    return [];
  }
  return (data ?? []).map((row) => row.data as Book);
}

export async function upsertBookToSupabase(book: Book): Promise<void> {
  if (!isSupabaseConfigured()) return;
  const supabase = getSupabaseBrowserClient();
  if (!supabase) return;
  const { error } = await supabase.from(TABLE).upsert({
    id: book.id,
    owner_id: book.ownerId,
    title: book.title,
    status: book.status,
    updated_at: book.updatedAt,
    data: book,
  });
  if (error) console.warn("[supabase] upsertBook failed:", error.message);
}

export async function deleteBookFromSupabase(id: string): Promise<void> {
  if (!isSupabaseConfigured()) return;
  const supabase = getSupabaseBrowserClient();
  if (!supabase) return;
  const { error } = await supabase.from(TABLE).delete().eq("id", id);
  if (error) console.warn("[supabase] deleteBook failed:", error.message);
}
