import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { SUPABASE_ANON_KEY, SUPABASE_URL, isSupabaseConfigured } from "./config";

let client: SupabaseClient | null = null;

/** Singleton browser Supabase client, or null when Supabase isn't configured. */
export function getSupabaseBrowserClient(): SupabaseClient | null {
  if (!isSupabaseConfigured()) return null;
  if (!client) client = createClient(SUPABASE_URL as string, SUPABASE_ANON_KEY as string);
  return client;
}
