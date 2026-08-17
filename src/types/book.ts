export type BookType =
  | "workbook"
  | "coloring-book"
  | "activity-book"
  | "learning-book"
  | "story-book";

export type AgeRange = "2-3" | "3-5" | "5-7" | "7-9";

export type Language = "id" | "en";

export type Difficulty = "easy" | "medium" | "advanced";

export type BookStyle =
  | "cute-cartoon"
  | "minimal"
  | "colorful"
  | "soft-pastel"
  | "educational"
  | "islamic-kids"
  | "bw-printable";

export type ActivityType =
  | "tracing"
  | "letter-recognition"
  | "counting"
  | "coloring"
  | "matching"
  | "find-circle"
  | "cut-paste"
  | "puzzle"
  | "maze"
  | "memory"
  | "drawing"
  | "number-sequence"
  | "animal-classification"
  | "size-comparison";

export type BookStatus = "draft" | "generating" | "ready" | "error";

export interface BookConfig {
  bookType: BookType;
  topic: string;
  ageRange: AgeRange;
  language: Language;
  numPages: 10 | 20 | 30 | 50;
  difficulty: Difficulty;
  style: BookStyle;
  activities: ActivityType[];
  aiSelectActivities: boolean;
  additionalInstructions?: string;
}

export interface Book {
  id: string;
  title: string;
  config: BookConfig;
  pages: import("./page").Page[];
  coverThumbnail?: string;
  status: BookStatus;
  createdAt: string;
  updatedAt: string;
  ownerId: string;
}

export interface BookSummary {
  id: string;
  title: string;
  bookType: BookType;
  numPages: number;
  status: BookStatus;
  style: BookStyle;
  coverThumbnail?: string;
  updatedAt: string;
}
