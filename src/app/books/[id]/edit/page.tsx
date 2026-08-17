"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { LayoutGrid, Redo2, SlidersHorizontal, Undo2 } from "lucide-react";
import { EditorTopbar } from "@/components/editor/editor-topbar";
import { PageThumbnailsRail } from "@/components/editor/page-thumbnails-rail";
import { EditorCanvas } from "@/components/editor/editor-canvas";
import { PropertiesPanel } from "@/components/editor/properties-panel";
import { AddPageSheet } from "@/components/editor/add-page-sheet";
import { ExportModal } from "@/components/editor/export-modal";
import { useEditorHistory } from "@/components/editor/use-editor-history";
import { useBookStore } from "@/lib/store/book-store";
import {
  deletePageFromList,
  duplicatePageInList,
  insertPageInList,
  reorderPagesInList,
  updatePageInList,
} from "@/lib/store/page-ops";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import type { Page } from "@/types";

export default function BookEditorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const book = useBookStore((s) => s.books[id]);
  const renameBook = useBookStore((s) => s.renameBook);
  const { pages, commit, undo, redo, canUndo, canRedo } = useEditorHistory(id);

  const [selectedId, setSelectedId] = useState<string | undefined>(() => book?.pages[0]?.id);
  const [pagesSheetOpen, setPagesSheetOpen] = useState(false);
  const [propsSheetOpen, setPropsSheetOpen] = useState(false);
  const [addPageOpen, setAddPageOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);

  if (!book || !pages) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center gap-3 text-center">
        <p className="font-display text-xl font-bold">Buku tidak ditemukan</p>
        <Button onClick={() => router.push("/books")}>Kembali ke My Books</Button>
      </div>
    );
  }

  const selectedPage = pages.find((p) => p.id === selectedId) ?? pages[0];

  function updatePage(pageId: string, updater: (page: Page) => Page) {
    commit(updatePageInList(pages!, pageId, updater));
  }

  function handleInsertPage(page: Page) {
    const index = pages!.findIndex((p) => p.id === selectedPage.id);
    const nextPages = insertPageInList(pages!, page, index + 1);
    commit(nextPages);
    setSelectedId(page.id);
  }

  return (
    <div className="flex h-dvh flex-col overflow-hidden">
      <EditorTopbar
        title={book.title}
        onTitleChange={(title) => renameBook(id, title)}
        onUndo={undo}
        onRedo={redo}
        canUndo={canUndo}
        canRedo={canRedo}
        onPreview={() => router.push(`/books/${id}`)}
        onExport={() => setExportOpen(true)}
      />

      <div className="flex min-h-0 flex-1">
        <div className="hidden w-64 shrink-0 border-r border-border/70 lg:block">
          <PageThumbnailsRail
            pages={pages}
            style={book.config.style}
            selectedId={selectedPage.id}
            onSelect={setSelectedId}
            onReorder={(from, to) => commit(reorderPagesInList(pages, from, to))}
            onDuplicate={(pageId) => commit(duplicatePageInList(pages, pageId))}
            onDelete={(pageId) => {
              if (pageId === selectedPage.id) {
                const idx = pages.findIndex((p) => p.id === pageId);
                const fallback = pages[idx + 1] ?? pages[idx - 1];
                if (fallback) setSelectedId(fallback.id);
              }
              commit(deletePageFromList(pages, pageId));
            }}
            onAddPage={() => setAddPageOpen(true)}
          />
        </div>

        <EditorCanvas page={selectedPage} style={book.config.style} totalPages={pages.length} />

        <div className="hidden w-80 shrink-0 border-l border-border/70 lg:block">
          <PropertiesPanel
            page={selectedPage}
            config={book.config}
            onUpdate={(updater) => updatePage(selectedPage.id, updater)}
            onAddActivity={() => setAddPageOpen(true)}
          />
        </div>
      </div>

      {/* Mobile / tablet toolbar */}
      <div className="flex items-center justify-around border-t border-border/70 bg-background py-2 lg:hidden">
        <Button variant="ghost" size="sm" onClick={() => setPagesSheetOpen(true)}>
          <LayoutGrid /> Pages
        </Button>
        <Button variant="ghost" size="icon-sm" onClick={undo} disabled={!canUndo} aria-label="Undo">
          <Undo2 className="size-4" />
        </Button>
        <Button variant="ghost" size="icon-sm" onClick={redo} disabled={!canRedo} aria-label="Redo">
          <Redo2 className="size-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => setPropsSheetOpen(true)}>
          <SlidersHorizontal /> Edit
        </Button>
      </div>

      <Sheet open={pagesSheetOpen} onOpenChange={setPagesSheetOpen}>
        <SheetContent side="left" className="w-72 p-0">
          <SheetTitle className="sr-only">Halaman</SheetTitle>
          <PageThumbnailsRail
            pages={pages}
            style={book.config.style}
            selectedId={selectedPage.id}
            onSelect={(id) => {
              setSelectedId(id);
              setPagesSheetOpen(false);
            }}
            onReorder={(from, to) => commit(reorderPagesInList(pages, from, to))}
            onDuplicate={(pageId) => commit(duplicatePageInList(pages, pageId))}
            onDelete={(pageId) => {
              if (pageId === selectedPage.id) {
                const idx = pages.findIndex((p) => p.id === pageId);
                const fallback = pages[idx + 1] ?? pages[idx - 1];
                if (fallback) setSelectedId(fallback.id);
              }
              commit(deletePageFromList(pages, pageId));
            }}
            onAddPage={() => {
              setPagesSheetOpen(false);
              setAddPageOpen(true);
            }}
          />
        </SheetContent>
      </Sheet>

      <Sheet open={propsSheetOpen} onOpenChange={setPropsSheetOpen}>
        <SheetContent side="right" className="w-80 p-0 sm:max-w-sm">
          <SheetTitle className="sr-only">Edit Halaman</SheetTitle>
          <PropertiesPanel
            page={selectedPage}
            config={book.config}
            onUpdate={(updater) => updatePage(selectedPage.id, updater)}
            onAddActivity={() => {
              setPropsSheetOpen(false);
              setAddPageOpen(true);
            }}
          />
        </SheetContent>
      </Sheet>

      <AddPageSheet open={addPageOpen} onOpenChange={setAddPageOpen} config={book.config} onInsert={handleInsertPage} />
      <ExportModal open={exportOpen} onOpenChange={setExportOpen} book={book} />
    </div>
  );
}
