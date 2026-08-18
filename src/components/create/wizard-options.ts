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

export const TOPIC_PRESETS: Record<BookType, { id: string; label: string; topic: string }[]> = {
  workbook: [
    { id: "letters-az", label: "Mengenal Huruf A-Z", topic: "Mengenal huruf A-Z untuk anak usia 3-5 tahun" },
    { id: "counting-1-20", label: "Berhitung 1-20", topic: "Belajar berhitung angka 1-20 dengan cara yang menyenangkan" },
    { id: "tracing-letters-numbers", label: "Tracing Huruf & Angka", topic: "Tracing huruf dan angka untuk melatih motorik halus anak" },
    { id: "syllables", label: "Membaca Suku Kata", topic: "Belajar membaca suku kata sederhana untuk persiapan membaca" },
    { id: "school-readiness", label: "Persiapan Masuk TK/SD", topic: "Persiapan masuk TK/SD: mengenal huruf, angka, dan bentuk dasar" },
    { id: "shapes-colors", label: "Bentuk & Warna", topic: "Mengenal bentuk dan warna dasar untuk anak usia dini" },
  ],
  "coloring-book": [
    { id: "cute-animals", label: "Hewan Lucu", topic: "Halaman mewarnai hewan-hewan lucu untuk anak" },
    { id: "dinosaurs", label: "Dinosaurus", topic: "Halaman mewarnai berbagai jenis dinosaurus" },
    { id: "vehicles", label: "Kendaraan", topic: "Halaman mewarnai kendaraan seperti mobil, pesawat, dan kapal" },
    { id: "princess-fairies", label: "Putri & Peri", topic: "Halaman mewarnai putri dan peri untuk anak perempuan" },
    { id: "outer-space", label: "Luar Angkasa", topic: "Halaman mewarnai tema luar angkasa: roket, planet, dan astronot" },
    { id: "ocean-animals", label: "Hewan Laut", topic: "Halaman mewarnai hewan-hewan yang hidup di laut" },
  ],
  "activity-book": [
    { id: "mazes-puzzles", label: "Maze & Puzzle Seru", topic: "Kumpulan maze dan puzzle seru untuk melatih logika anak" },
    { id: "find-match", label: "Cari & Cocokkan", topic: "Aktivitas mencari dan mencocokkan gambar untuk anak" },
    { id: "cut-paste", label: "Gunting Tempel", topic: "Aktivitas gunting dan tempel untuk melatih motorik anak" },
    { id: "holiday-activities", label: "Aktivitas Liburan", topic: "Kumpulan aktivitas seru bertema liburan sekolah" },
    { id: "birthday-activities", label: "Aktivitas Ulang Tahun", topic: "Kumpulan aktivitas bertema pesta ulang tahun anak" },
    { id: "brain-games", label: "Asah Otak", topic: "Kumpulan aktivitas asah otak dan konsentrasi untuk anak" },
  ],
  "learning-book": [
    { id: "numbers-1-10", label: "Mengenal Angka 1-10", topic: "Mengenal angka 1-10 beserta jumlah bendanya" },
    { id: "colors-shapes", label: "Warna & Bentuk", topic: "Mengenal warna dan bentuk dasar di sekitar kita" },
    { id: "body-parts", label: "Anggota Tubuh", topic: "Mengenal nama-nama anggota tubuh dan fungsinya" },
    { id: "hijaiyah-letters", label: "Huruf Hijaiyah", topic: "Mengenal huruf hijaiyah untuk anak usia dini" },
    { id: "fruits-vegetables", label: "Buah & Sayur", topic: "Mengenal berbagai macam buah dan sayur" },
    { id: "professions", label: "Profesi & Cita-cita", topic: "Mengenal berbagai profesi dan cita-cita" },
  ],
  "story-book": [
    { id: "good-habits", label: "Kebiasaan Baik", topic: "Cerita tentang membangun kebiasaan baik sehari-hari" },
    { id: "toilet-training", label: "Toilet Training", topic: "Cerita untuk membantu anak belajar toilet training" },
    { id: "overcoming-fear", label: "Mengatasi Rasa Takut", topic: "Cerita tentang anak yang belajar mengatasi rasa takut" },
    { id: "sharing-friends", label: "Berbagi dengan Teman", topic: "Cerita tentang pentingnya berbagi dengan teman" },
    { id: "prophet-stories", label: "Kisah Nabi untuk Anak", topic: "Kisah nabi yang diceritakan dengan bahasa sederhana untuk anak" },
    { id: "daily-manners", label: "Adab Sehari-hari", topic: "Cerita tentang adab dan sopan santun sehari-hari" },
  ],
};

export const ADDITIONAL_INSTRUCTION_PRESETS: { id: string; label: string; text: string }[] = [
  { id: "cute-animal-characters", label: "Karakter hewan lucu", text: "Gunakan karakter hewan yang lucu dan ramah." },
  { id: "simple-language", label: "Bahasa sangat sederhana", text: "Gunakan bahasa yang sangat sederhana dan mudah dipahami anak." },
  { id: "islamic-touch", label: "Sentuhan islami", text: "Tambahkan sentuhan islami seperti doa atau adab di beberapa halaman." },
  { id: "thicker-tracing", label: "Garis tracing lebih tebal", text: "Buat garis tracing lebih tebal dan besar agar mudah diikuti anak." },
  { id: "pastel-theme", label: "Tema pastel lembut", text: "Gunakan tema warna pastel yang lembut di seluruh halaman." },
  { id: "engaging-cover", label: "Cover menarik", text: "Sertakan halaman cover yang menarik dan penuh warna." },
  { id: "avoid-scary", label: "Hindari elemen menakutkan", text: "Hindari elemen yang menakutkan atau membingungkan untuk anak." },
  { id: "add-humor", label: "Sedikit humor", text: "Tambahkan sedikit humor ringan di setiap halaman." },
];

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
