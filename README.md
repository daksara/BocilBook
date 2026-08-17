# BocilBook

**Bikin buku anak dengan AI.** BocilBook is an AI-powered platform that generates children's workbooks, activity books, coloring pages, and learning books — structured content in, printable pages out.

## Stack

Next.js (App Router) · React 19 · TypeScript · Tailwind CSS v4 · shadcn/ui-style components (hand-built on Radix primitives) · Lucide Icons · Zustand

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). No API keys are required — the app runs entirely on a mock AI provider so the full product experience (generation, editing, export) works out of the box.

## How it's structured

- **`src/lib/ai/`** — the AI provider abstraction (`AIProvider` interface + a deterministic mock implementation). Swap `getAIProvider()` for a real LLM-backed provider without touching any caller.
- **`src/lib/illustrations/` + `src/lib/ai/image-provider.ts`** — the image generation abstraction. The mock provider renders on-brand SVG illustrations deterministically from a subject + style, returned as `{ url, palette }`, so callers don't care whether the image came from a real model or not.
- **`src/types/`** — the book/page/AI data model. The AI produces structured JSON per page (`BookStructure` → `Page[]`); templates render that JSON. AI writes the content, templates own the layout.
- **`src/components/templates/`** — the 10 worksheet templates (letter tracing, number tracing, count & circle, match objects, find & circle, coloring page, maze, cut & paste, shape recognition, animal classification) plus the cover template.
- **`src/lib/store/book-store.ts`** — a Zustand store holding books in memory for the session, seeded with a full 30-page "ABC Workbook" demo book plus a few others.
- **`src/app/`** — routes: `/`, `/dashboard`, `/create` (wizard), `/books`, `/books/[id]` (preview), `/books/[id]/edit` (editor), `/books/[id]/print` (print/PDF view), `/templates`, `/settings`.

## Export

PDF export opens a print-optimized view and uses the browser's native print-to-PDF (fully functional, no backend needed). PNG/ZIP export are wired through the same `lib/export` abstraction as clearly-labeled mock flows, ready to swap for a real rendering service.
