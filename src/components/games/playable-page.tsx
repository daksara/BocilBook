import type { BookStyle, Page, PageType } from "@/types";
import { PageRenderer } from "@/components/templates";
import { FindAndCircleGame } from "./find-and-circle-game";
import { MatchObjectsGame } from "./match-objects-game";
import { CountAndCircleGame } from "./count-and-circle-game";

const PLAYABLE_TYPES: PageType[] = ["find_and_circle", "match_objects", "count_and_circle"];

export function isPlayablePage(type: PageType): boolean {
  return PLAYABLE_TYPES.includes(type);
}

export function PlayablePage({
  page,
  style,
  totalPages,
  onNext,
  levelLabel,
  onExit,
}: {
  page: Page;
  style: BookStyle;
  totalPages: number;
  /** Advances to the next level when the current one is completed. Omit to just replay. */
  onNext?: () => void;
  /** e.g. "Level 2 dari 5" — shown on the completion overlay when part of a level sequence. */
  levelLabel?: string;
  /** Called when the player wants to leave after finishing the last level. */
  onExit?: () => void;
}) {
  const props = { style, pageNumber: page.pageNumber, totalPages, onNext, levelLabel, onExit };

  switch (page.data.type) {
    case "find_and_circle":
      return <FindAndCircleGame data={page.data} {...props} />;
    case "match_objects":
      return <MatchObjectsGame data={page.data} {...props} />;
    case "count_and_circle":
      return <CountAndCircleGame data={page.data} {...props} />;
    default:
      return <PageRenderer page={page} style={style} totalPages={totalPages} />;
  }
}
