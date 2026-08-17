"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, Download, Eye, Redo2, Undo2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/shared/logo";

export function EditorTopbar({
  title,
  onTitleChange,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  onPreview,
  onExport,
}: {
  title: string;
  onTitleChange: (title: string) => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  onPreview: () => void;
  onExport: () => void;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(title);
  const [savedPulse, setSavedPulse] = useState(false);

  function commitTitle() {
    setEditing(false);
    const trimmed = draft.trim();
    if (trimmed && trimmed !== title) {
      onTitleChange(trimmed);
      pulseSaved();
    }
  }

  function pulseSaved() {
    setSavedPulse(true);
    setTimeout(() => setSavedPulse(false), 1500);
  }

  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-3 border-b border-border/70 bg-background px-3 sm:px-4">
      <div className="flex min-w-0 items-center gap-2">
        <Link
          href="/books"
          className="flex size-9 shrink-0 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
          aria-label="Kembali"
        >
          <ArrowLeft className="size-4.5" />
        </Link>
        <span className="hidden sm:block">
          <Logo iconOnly />
        </span>
        {editing ? (
          <Input
            autoFocus
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={commitTitle}
            onKeyDown={(e) => e.key === "Enter" && commitTitle()}
            className="h-9 w-40 font-display font-bold sm:w-64"
          />
        ) : (
          <button
            onClick={() => {
              setDraft(title);
              setEditing(true);
            }}
            className="max-w-40 truncate rounded-lg px-2 py-1 text-left font-display font-bold hover:bg-muted sm:max-w-64"
            title="Ubah judul"
          >
            {title}
          </button>
        )}
        <div className="hidden items-center gap-0.5 border-l border-border pl-2 sm:flex">
          <Button variant="ghost" size="icon-sm" onClick={onUndo} disabled={!canUndo} aria-label="Undo">
            <Undo2 className="size-4" />
          </Button>
          <Button variant="ghost" size="icon-sm" onClick={onRedo} disabled={!canRedo} aria-label="Redo">
            <Redo2 className="size-4" />
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {savedPulse && (
          <span className="hidden items-center gap-1 text-xs font-medium text-emerald-600 sm:flex">
            <Check className="size-3.5" /> Tersimpan
          </span>
        )}
        <Button variant="outline" size="sm" onClick={onPreview} className="hidden sm:inline-flex">
          <Eye /> Preview
        </Button>
        <Button size="sm" onClick={onExport}>
          <Download /> Export
        </Button>
      </div>
    </header>
  );
}
