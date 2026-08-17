import {
  BookOpen,
  Palette,
  PenTool,
  GraduationCap,
  BookText,
  PenLine,
  Type,
  Hash,
  GitCompareArrows,
  SearchCheck,
  Scissors,
  Puzzle,
  Waypoints,
  Brain,
  Pencil,
  ListOrdered,
  PawPrint,
  Ruler,
  type LucideIcon,
} from "lucide-react";
import type { ActivityType, AgeRange, BookStyle, BookType, Difficulty, Language } from "@/types";

export const BOOK_TYPE_OPTIONS: { id: BookType; label: string; description: string; icon: LucideIcon }[] = [
  { id: "workbook", label: "Workbook", description: "Lembar kerja terstruktur dengan berbagai aktivitas belajar.", icon: BookOpen },
  { id: "coloring-book", label: "Coloring Book", description: "Kumpulan halaman mewarnai bertema untuk anak.", icon: Palette },
  { id: "activity-book", label: "Activity Book", description: "Campuran tracing, matching, puzzle, dan lainnya.", icon: PenTool },
  { id: "learning-book", label: "Learning Book", description: "Mengenalkan konsep dasar secara sederhana.", icon: GraduationCap },
  { id: "story-book", label: "Story Book", description: "Buku cerita bergambar dengan pesan sederhana.", icon: BookText },
];

export const AGE_OPTIONS: { id: AgeRange; label: string }[] = [
  { id: "2-3", label: "2-3 tahun" },
  { id: "3-5", label: "3-5 tahun" },
  { id: "5-7", label: "5-7 tahun" },
  { id: "7-9", label: "7-9 tahun" },
];

export const LANGUAGE_OPTIONS: { id: Language; label: string }[] = [
  { id: "id", label: "Bahasa Indonesia" },
  { id: "en", label: "English" },
];

export const PAGE_OPTIONS: (10 | 20 | 30 | 50)[] = [10, 20, 30, 50];

export const DIFFICULTY_OPTIONS: { id: Difficulty; label: string; description: string }[] = [
  { id: "easy", label: "Easy", description: "Aktivitas sederhana untuk pemula" },
  { id: "medium", label: "Medium", description: "Tingkat menengah, sedikit tantangan" },
  { id: "advanced", label: "Advanced", description: "Lebih menantang untuk anak yang sudah terbiasa" },
];

export const STYLE_OPTIONS: { id: BookStyle; label: string }[] = [
  { id: "cute-cartoon", label: "Cute Cartoon" },
  { id: "minimal", label: "Minimal" },
  { id: "colorful", label: "Colorful" },
  { id: "soft-pastel", label: "Soft Pastel" },
  { id: "educational", label: "Educational" },
  { id: "islamic-kids", label: "Islamic Kids" },
  { id: "bw-printable", label: "Black & White Printable" },
];

export const ACTIVITY_OPTIONS: { id: ActivityType; label: string; icon: LucideIcon }[] = [
  { id: "tracing", label: "Tracing", icon: PenLine },
  { id: "letter-recognition", label: "Letter Recognition", icon: Type },
  { id: "counting", label: "Counting", icon: Hash },
  { id: "coloring", label: "Coloring", icon: Palette },
  { id: "matching", label: "Matching", icon: GitCompareArrows },
  { id: "find-circle", label: "Find & Circle", icon: SearchCheck },
  { id: "cut-paste", label: "Cut & Paste", icon: Scissors },
  { id: "puzzle", label: "Puzzle", icon: Puzzle },
  { id: "maze", label: "Maze", icon: Waypoints },
  { id: "memory", label: "Memory", icon: Brain },
  { id: "drawing", label: "Drawing", icon: Pencil },
  { id: "number-sequence", label: "Number Sequence", icon: ListOrdered },
  { id: "animal-classification", label: "Animal Classification", icon: PawPrint },
  { id: "size-comparison", label: "Size Comparison", icon: Ruler },
];
