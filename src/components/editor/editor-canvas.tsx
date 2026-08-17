"use client";

import { PageRenderer } from "@/components/templates";
import type { BookStyle, Page } from "@/types";

export function EditorCanvas({ page, style, totalPages }: { page: Page; style: BookStyle; totalPages: number }) {
  return (
    <div className="flex h-full flex-1 items-center justify-center overflow-auto bg-muted/40 p-4 sm:p-8">
      <div className="w-full max-w-md shrink-0 overflow-hidden rounded-2xl shadow-xl ring-1 ring-black/5 sm:max-w-lg">
        <PageRenderer page={page} style={style} totalPages={totalPages} />
      </div>
    </div>
  );
}
