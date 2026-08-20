import type { BookStyle, Page, PageType } from "@/types";
import { PageRenderer } from "@/components/templates";
import { FindAndCircleGame } from "./find-and-circle-game";
import { MatchObjectsGame } from "./match-objects-game";
import { CountAndCircleGame } from "./count-and-circle-game";

const PLAYABLE_TYPES: PageType[] = ["find_and_circle", "match_objects", "count_and_circle"];

export function isPlayablePage(type: PageType): boolean {
  return PLAYABLE_TYPES.includes(type);
}

export function PlayablePage({ page, style, totalPages }: { page: Page; style: BookStyle; totalPages: number }) {
  const props = { style, pageNumber: page.pageNumber, totalPages };

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
