# BocilBook

**Bikin buku anak dengan AI.** BocilBook is an AI-powered platform that generates children's workbooks, activity books, coloring pages, and learning books — structured content in, printable pages out.

## Stack

Next.js (App Router) · React 19 · TypeScript · Tailwind CSS v4 · shadcn/ui-style components (hand-built on Radix primitives) · Lucide Icons · Zustand

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). No API keys are required — the app runs entirely on a mock AI provider and in-memory store so the full product experience (generation, editing, export) works out of the box.

## AI providers (Groq -> Gemini -> mock)

`getAIProvider()` (used by "Ask AI" editing, AI-picked activity pages, and instruction enhancement) resolves to a `RemoteAIProvider` in the browser, which calls the server-only `/api/ai` route. That route runs `LLMAIProvider`:

1. **Groq** (`GROQ_API_KEY`) is tried first.
2. **Gemini** (`GEMINI_API_KEY`) is the fallback if Groq is unconfigured, errors, or times out.
3. The deterministic **mock provider** is the final fallback if both LLM calls fail — so the app keeps working with zero keys configured, same as before.

The LLM's role is scoped to text (titles, instructions, phrasing); structural fields (tracing letters, counts, matching pairs, illustration subjects) stay deterministic via `content-builder.ts`, since they're tied to the fixed template/illustration engine rather than something a model should invent freely. Copy `.env.example` to `.env.local` and fill in `GROQ_API_KEY` and/or `GEMINI_API_KEY` to enable it.

## Supabase (optional persistence)

Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` (see `.env.example`) and run `supabase/schema.sql` against your project to persist books beyond the in-memory session. `src/lib/store/book-store.ts` hydrates from the `books` table on load and upserts on every mutation, best-effort — without those env vars the store behaves exactly as before (in-memory only, seeded with demo books).

## How it's structured

- **`src/lib/ai/`** — the AI provider abstraction (`AIProvider` interface, the mock implementation, and the Groq/Gemini-backed `LLMAIProvider`). `getAIProvider()` (`get-provider.ts`) picks the right one per environment.
- **`src/lib/supabase/`** — the optional Supabase client/server factories and the `books` persistence layer.
- **`src/lib/illustrations/` + `src/lib/ai/image-provider.ts`** — the image generation abstraction. The mock provider renders on-brand SVG illustrations deterministically from a subject + style, returned as `{ url, palette }`, so callers don't care whether the image came from a real model or not.
- **`src/types/`** — the book/page/AI data model. The AI produces structured JSON per page (`BookStructure` → `Page[]`); templates render that JSON. AI writes the content, templates own the layout.
- **`src/components/templates/`** — the 10 worksheet templates (letter tracing, number tracing, count & circle, match objects, find & circle, coloring page, maze, cut & paste, shape recognition, animal classification) plus the cover template.
- **`src/lib/store/book-store.ts`** — a Zustand store holding books in memory for the session, seeded with a full 30-page "ABC Workbook" demo book plus a few others.
- **`src/app/`** — routes: `/`, `/dashboard`, `/create` (wizard), `/books`, `/books/[id]` (preview), `/books/[id]/edit` (editor), `/books/[id]/print` (print/PDF view), `/templates`, `/settings`.

## Export

PDF export opens a print-optimized view and uses the browser's native print-to-PDF (fully functional, no backend needed). PNG/ZIP export are wired through the same `lib/export` abstraction as clearly-labeled mock flows, ready to swap for a real rendering service.
