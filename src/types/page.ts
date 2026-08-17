export type PageType =
  | "cover"
  | "letter_tracing"
  | "number_tracing"
  | "count_and_circle"
  | "match_objects"
  | "find_and_circle"
  | "coloring_page"
  | "maze"
  | "cut_and_paste"
  | "shape_recognition"
  | "animal_classification";

export interface Illustration {
  id: string;
  subject: string;
  prompt: string;
  url: string;
  palette: string;
  status: "pending" | "generating" | "ready" | "error";
}

/** Freeform, editor-added element layered on top of a template render. */
export interface PageElement {
  id: string;
  type: "text" | "image" | "shape" | "sticker";
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  zIndex: number;
  locked?: boolean;
  content?: string;
  fontSize?: number;
  fontFamily?: "display" | "sans";
  color?: string;
  imageUrl?: string;
  shape?: "circle" | "star" | "heart" | "cloud";
  fill?: string;
}

export interface CoverPageData {
  subtitle?: string;
  illustration: Illustration;
}

export interface LetterTracingPageData {
  letter: string;
  uppercase: string;
  lowercase: string;
  exampleWord: string;
  instruction: string;
  illustration: Illustration;
}

export interface NumberTracingPageData {
  number: number;
  word: string;
  instruction: string;
  illustration: Illustration;
}

export interface CountAndCirclePageData {
  targetCount: number;
  itemLabel: string;
  illustration: Illustration;
  options: number[];
  instruction: string;
}

export interface MatchPair {
  id: string;
  left: string;
  right: string;
  illustrationLeft: Illustration;
  illustrationRight: Illustration;
}

export interface MatchObjectsPageData {
  pairs: MatchPair[];
  instruction: string;
}

export interface FindItem {
  id: string;
  label: string;
  illustration: Illustration;
  isTarget: boolean;
}

export interface FindAndCirclePageData {
  targetLabel: string;
  items: FindItem[];
  instruction: string;
}

export interface ColoringPagePageData {
  title: string;
  illustration: Illustration;
  instruction: string;
}

export interface MazePageData {
  theme: string;
  startLabel: string;
  endLabel: string;
  difficulty: "easy" | "medium" | "advanced";
  instruction: string;
  seed: number;
}

export interface CutAndPastePageData {
  targetLabel: string;
  pieces: { id: string; label: string; illustration: Illustration; belongs: boolean }[];
  instruction: string;
}

export interface ShapeItem {
  id: string;
  shape: "circle" | "square" | "triangle" | "rectangle" | "star" | "heart" | "oval" | "diamond";
  label: string;
}

export interface ShapeRecognitionPageData {
  shapes: ShapeItem[];
  instruction: string;
}

export interface AnimalItem {
  id: string;
  label: string;
  category: string;
  illustration: Illustration;
}

export interface AnimalClassificationPageData {
  categories: string[];
  animals: AnimalItem[];
  instruction: string;
}

export type PageData =
  | ({ type: "cover" } & CoverPageData)
  | ({ type: "letter_tracing" } & LetterTracingPageData)
  | ({ type: "number_tracing" } & NumberTracingPageData)
  | ({ type: "count_and_circle" } & CountAndCirclePageData)
  | ({ type: "match_objects" } & MatchObjectsPageData)
  | ({ type: "find_and_circle" } & FindAndCirclePageData)
  | ({ type: "coloring_page" } & ColoringPagePageData)
  | ({ type: "maze" } & MazePageData)
  | ({ type: "cut_and_paste" } & CutAndPastePageData)
  | ({ type: "shape_recognition" } & ShapeRecognitionPageData)
  | ({ type: "animal_classification" } & AnimalClassificationPageData);

export interface Page {
  id: string;
  pageNumber: number;
  type: PageType;
  title: string;
  data: PageData;
  elements: PageElement[];
  notes?: string;
}
