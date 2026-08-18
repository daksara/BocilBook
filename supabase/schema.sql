-- BocilBook Supabase schema.
-- Run this in the Supabase SQL editor (or via the CLI) for the project
-- referenced by NEXT_PUBLIC_SUPABASE_URL. Entirely optional — the app runs
-- fully in-memory when Supabase env vars are not set.

create table if not exists public.books (
  id text primary key,
  owner_id text not null,
  title text not null,
  status text not null,
  data jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists books_owner_id_idx on public.books (owner_id);

alter table public.books enable row level security;

-- Demo-friendly policies: any holder of the anon key can read/write.
-- Once real auth is wired up, scope these to `auth.uid()::text = owner_id`.
drop policy if exists "books_select_all" on public.books;
create policy "books_select_all" on public.books for select using (true);

drop policy if exists "books_insert_all" on public.books;
create policy "books_insert_all" on public.books for insert with check (true);

drop policy if exists "books_update_all" on public.books;
create policy "books_update_all" on public.books for update using (true);

drop policy if exists "books_delete_all" on public.books;
create policy "books_delete_all" on public.books for delete using (true);
