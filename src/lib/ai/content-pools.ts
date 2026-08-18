export interface AlphabetEntry {
  letter: string;
  word: string;
  subject: string;
}

export const ALPHABET_ID: AlphabetEntry[] = [
  { letter: "A", word: "Ayam", subject: "ayam" },
  { letter: "B", word: "Beruang", subject: "beruang" },
  { letter: "C", word: "Cicak", subject: "cicak" },
  { letter: "D", word: "Daun", subject: "daun" },
  { letter: "E", word: "Eskrim", subject: "eskrim" },
  { letter: "F", word: "Flamingo", subject: "flamingo" },
  { letter: "G", word: "Gajah", subject: "gajah" },
  { letter: "H", word: "Harimau", subject: "harimau" },
  { letter: "I", word: "Ikan", subject: "ikan" },
  { letter: "J", word: "Jeruk", subject: "jeruk" },
  { letter: "K", word: "Kucing", subject: "kucing" },
  { letter: "L", word: "Layangan", subject: "layangan" },
  { letter: "M", word: "Monyet", subject: "monyet" },
  { letter: "N", word: "Nanas", subject: "nanas" },
  { letter: "O", word: "Oval", subject: "oval" },
  { letter: "P", word: "Pisang", subject: "pisang" },
  { letter: "Q", word: "Quokka", subject: "quokka" },
  { letter: "R", word: "Roti", subject: "roti" },
  { letter: "S", word: "Sepatu", subject: "sepatu" },
  { letter: "T", word: "Topi", subject: "topi" },
  { letter: "U", word: "Ulat", subject: "ulat" },
  { letter: "V", word: "Vas Bunga", subject: "vas" },
  { letter: "W", word: "Wortel", subject: "wortel" },
  { letter: "X", word: "Xilofon", subject: "xilofon" },
  { letter: "Y", word: "Yoyo", subject: "yoyo" },
  { letter: "Z", word: "Zebra", subject: "zebra" },
];

export const ALPHABET_EN: AlphabetEntry[] = [
  { letter: "A", word: "Apple", subject: "apple" },
  { letter: "B", word: "Bear", subject: "bear" },
  { letter: "C", word: "Cat", subject: "cat" },
  { letter: "D", word: "Dog", subject: "dog" },
  { letter: "E", word: "Elephant", subject: "elephant" },
  { letter: "F", word: "Fish", subject: "fish" },
  { letter: "G", word: "Gecko", subject: "gecko" },
  { letter: "H", word: "House", subject: "house" },
  { letter: "I", word: "Ice Cream", subject: "icecream" },
  { letter: "J", word: "Jelly", subject: "jelly" },
  { letter: "K", word: "Kite", subject: "kite" },
  { letter: "L", word: "Leaf", subject: "leaf" },
  { letter: "M", word: "Monkey", subject: "monkey" },
  { letter: "N", word: "Nest", subject: "nest" },
  { letter: "O", word: "Orange", subject: "orange" },
  { letter: "P", word: "Penguin", subject: "penguin" },
  { letter: "Q", word: "Quokka", subject: "quokka" },
  { letter: "R", word: "Rabbit", subject: "rabbit" },
  { letter: "S", word: "Sun", subject: "sun" },
  { letter: "T", word: "Tiger", subject: "tiger" },
  { letter: "U", word: "Umbrella", subject: "umbrella" },
  { letter: "V", word: "Van", subject: "car" },
  { letter: "W", word: "Watermelon", subject: "watermelon" },
  { letter: "X", word: "Xylophone", subject: "xilofon" },
  { letter: "Y", word: "Yoyo", subject: "yoyo" },
  { letter: "Z", word: "Zebra", subject: "zebra" },
];

export const NUMBER_WORDS_ID = [
  "Nol", "Satu", "Dua", "Tiga", "Empat", "Lima", "Enam", "Tujuh", "Delapan", "Sembilan", "Sepuluh",
];
export const NUMBER_WORDS_EN = [
  "Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten",
];

export const COUNTABLE_SUBJECTS = [
  "apple", "star", "balloon", "flower", "fish", "butterfly", "ball", "grape", "banana", "heart",
  "pineapple", "cherry", "egg", "mushroom", "ladybug",
];

export const OBJECT_POOL = [
  "cat", "dog", "elephant", "rabbit", "fish", "bird", "butterfly", "frog",
  "monkey", "cow", "chicken", "bear",
  "tiger", "zebra", "fox", "pig", "mouse", "penguin", "snail",
  "ladybug", "gecko",
  "apple", "banana", "orange", "grape", "strawberry", "watermelon",
  "carrot", "corn", "pineapple", "mango", "cherry", "bread", "egg", "pizza", "cake", "icecream",
  "car", "bus", "bicycle", "train", "airplane", "boat",
  "star", "sun", "moon", "cloud", "balloon", "book", "ball", "clock", "key", "hat", "shoe",
  "flower", "tree", "leaf", "mushroom", "house", "umbrella", "heart", "gift", "kite",
];

export const VEHICLE_POOL = ["car", "bus", "bicycle", "train", "airplane", "boat", "kite"];

export const FRUIT_POOL = [
  "apple", "banana", "orange", "grape", "strawberry", "watermelon", "pineapple", "mango", "cherry",
];

export const FOOD_POOL = [
  "apple", "banana", "bread", "egg", "corn", "carrot", "pizza", "cake", "icecream", "pineapple", "mango", "cherry",
];

export const ANIMAL_POOL: { label: string; subject: string; category: string }[] = [
  { label: "Kucing", subject: "cat", category: "Hewan Darat" },
  { label: "Anjing", subject: "dog", category: "Hewan Darat" },
  { label: "Gajah", subject: "elephant", category: "Hewan Darat" },
  { label: "Kelinci", subject: "rabbit", category: "Hewan Darat" },
  { label: "Sapi", subject: "cow", category: "Hewan Darat" },
  { label: "Beruang", subject: "bear", category: "Hewan Darat" },
  { label: "Harimau", subject: "tiger", category: "Hewan Darat" },
  { label: "Zebra", subject: "zebra", category: "Hewan Darat" },
  { label: "Rubah", subject: "fox", category: "Hewan Darat" },
  { label: "Babi", subject: "pig", category: "Hewan Darat" },
  { label: "Tikus", subject: "mouse", category: "Hewan Darat" },
  { label: "Cicak", subject: "gecko", category: "Hewan Darat" },
  { label: "Siput", subject: "snail", category: "Hewan Darat" },
  { label: "Ikan", subject: "fish", category: "Hewan Air" },
  { label: "Katak", subject: "frog", category: "Hewan Air" },
  { label: "Penguin", subject: "penguin", category: "Hewan Air" },
  { label: "Burung", subject: "bird", category: "Hewan Udara" },
  { label: "Kupu-kupu", subject: "butterfly", category: "Hewan Udara" },
  { label: "Kepik", subject: "ladybug", category: "Hewan Udara" },
];

export const SHAPE_POOL: { shape: string; label: string }[] = [
  { shape: "circle", label: "Lingkaran" },
  { shape: "square", label: "Persegi" },
  { shape: "triangle", label: "Segitiga" },
  { shape: "rectangle", label: "Persegi Panjang" },
  { shape: "star", label: "Bintang" },
  { shape: "heart", label: "Hati" },
  { shape: "oval", label: "Oval" },
  { shape: "diamond", label: "Wajik" },
];

export const COLOR_POOL: { name: string; hex: string; subject: string }[] = [
  { name: "Merah", hex: "#FF6B6B", subject: "apple" },
  { name: "Jingga", hex: "#FFA630", subject: "orange" },
  { name: "Kuning", hex: "#FFD166", subject: "banana" },
  { name: "Hijau", hex: "#4FCB8E", subject: "tree" },
  { name: "Biru", hex: "#4FB6E8", subject: "cloud" },
  { name: "Ungu", hex: "#9B7DE0", subject: "grape" },
  { name: "Merah Muda", hex: "#FF6B8A", subject: "heart" },
  { name: "Cokelat", hex: "#B08159", subject: "bear" },
];

export const RAMADAN_POOL = [
  { label: "Bulan Sabit", subject: "moon" },
  { label: "Bintang", subject: "star" },
  { label: "Kurma", subject: "gift" },
  { label: "Lentera", subject: "balloon" },
  { label: "Masjid", subject: "house" },
];

export const TOPIC_IDEA_SUBJECTS: { id: string; en: string }[] = [
  { id: "hewan ternak", en: "farm animals" },
  { id: "kendaraan roda", en: "wheeled vehicles" },
  { id: "buah tropis", en: "tropical fruits" },
  { id: "cuaca dan musim", en: "weather and seasons" },
  { id: "profesi impian", en: "dream professions" },
  { id: "luar angkasa", en: "outer space" },
  { id: "dunia bawah laut", en: "the underwater world" },
  { id: "kebun binatang", en: "the zoo" },
  { id: "serangga kecil", en: "tiny insects" },
  { id: "hutan hujan", en: "the rainforest" },
];

export const TOPIC_IDEA_TEMPLATES: Record<
  "workbook" | "coloring-book" | "activity-book" | "learning-book" | "story-book",
  { id: string; en: string }[]
> = {
  workbook: [
    { id: "Mengenal {subject} untuk anak usia {age} tahun", en: "Learning about {subject} for kids aged {age}" },
    { id: "Latihan menulis dan berhitung bertema {subject}", en: "Writing and counting practice themed around {subject}" },
  ],
  "coloring-book": [
    { id: "Halaman mewarnai bertema {subject}", en: "Coloring pages themed around {subject}" },
    { id: "Buku mewarnai {subject} untuk anak", en: "A {subject} coloring book for kids" },
  ],
  "activity-book": [
    { id: "Kumpulan aktivitas seru bertema {subject}", en: "A collection of fun activities themed around {subject}" },
    { id: "Aktivitas mencari, mencocokkan, dan bermain dengan {subject}", en: "Find, match, and play activities featuring {subject}" },
  ],
  "learning-book": [
    { id: "Mengenal {subject} secara sederhana", en: "A simple introduction to {subject}" },
    { id: "Belajar tentang {subject} untuk usia {age} tahun", en: "Learning about {subject} for ages {age}" },
  ],
  "story-book": [
    { id: "Cerita bergambar bertema {subject}", en: "An illustrated story themed around {subject}" },
    { id: "Petualangan seru seputar {subject}", en: "A fun adventure around {subject}" },
  ],
};

interface TopicPool {
  keywords: string[];
  subjects: string[];
}

const TOPIC_POOLS: TopicPool[] = [
  { keywords: ["huruf", "alphabet", "abc", "letter"], subjects: OBJECT_POOL },
  { keywords: ["angka", "number", "berhitung", "matematika"], subjects: COUNTABLE_SUBJECTS },
  { keywords: ["hewan", "animal", "binatang"], subjects: ANIMAL_POOL.map((a) => a.subject) },
  { keywords: ["warna", "color", "colour"], subjects: COLOR_POOL.map((c) => c.subject) },
  { keywords: ["bentuk", "shape"], subjects: SHAPE_POOL.map((s) => s.shape) },
  { keywords: ["ramadan", "puasa", "islam", "lebaran", "hijaiyah"], subjects: RAMADAN_POOL.map((r) => r.subject) },
  { keywords: ["kendaraan", "transportasi", "vehicle"], subjects: VEHICLE_POOL },
  { keywords: ["buah", "fruit"], subjects: FRUIT_POOL },
  { keywords: ["makanan", "food", "kuliner"], subjects: FOOD_POOL },
  { keywords: ["inggris", "english"], subjects: OBJECT_POOL },
];

export function resolveTopicSubjects(topic: string): string[] {
  const slug = topic.toLowerCase();
  for (const pool of TOPIC_POOLS) {
    if (pool.keywords.some((k) => slug.includes(k))) return pool.subjects;
  }
  return OBJECT_POOL;
}

export function pick<T>(arr: T[], seed: number): T {
  return arr[((seed % arr.length) + arr.length) % arr.length];
}

export function shuffle<T>(arr: T[], seed: number): T[] {
  const copy = [...arr];
  let s = seed || 1;
  for (let i = copy.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280;
    const j = Math.floor((s / 233280) * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
