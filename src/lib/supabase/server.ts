import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { SUPABASE_ANON_KEY, SUPABASE_URL, isSupabaseConfigured } from "./config";

/**
 * Server-side Supabase client for API routes / server components. Prefers
 * SUPABASE_SERVICE_ROLE_KEY (bypasses RLS) when set, falling back to the
 * anon key. Never import this from a "use client" file.
 */
export function getSupabaseServerClient(): SupabaseClient | null {
  if (!isSupabaseConfigured()) return null;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || (SUPABASE_ANON_KEY as string);
  return createClient(SUPABASE_URL as string, key, { auth: { persistSession: false } });
}
