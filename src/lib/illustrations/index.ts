import type { BookStyle } from "@/types";
import { ART, findArtKey } from "./art";
import { mascotArt } from "./mascot";
import { pickPalette, type ArtPalette } from "./palette";

/** Indonesian / colloquial synonyms mapped to the canonical art dictionary keys. */
const SYNONYMS: Record<string, string> = {
  kucing: "cat",
  anjing: "dog",
  kelinci: "rabbit",
  ikan: "fish",
  burung: "bird",
  "kupu-kupu": "butterfly",
  kupu: "butterfly",
  katak: "frog",
  kodok: "frog",
  monyet: "monkey",
  kera: "monkey",
  sapi: "cow",
  ayam: "chicken",
  beruang: "bear",
  gajah: "elephant",
  apel: "apple",
  pisang: "banana",
  jeruk: "orange",
  anggur: "grape",
  stroberi: "strawberry",
  arbei: "strawberry",
  semangka: "watermelon",
  mobil: "car",
  bis: "bus",
  sepeda: "bicycle",
  bintang: "star",
  matahari: "sun",
  bulan: "moon",
  awan: "cloud",
  balon: "balloon",
  buku: "book",
  bola: "ball",
  bunga: "flower",
  pohon: "tree",
  rumah: "house",
  payung: "umbrella",
  hati: "heart",
  hadiah: "gift",
  kado: "gift",
  "layang-layang": "kite",
  layangan: "kite",
  lingkaran: "circle",
  persegi: "square",
  kotak: "square",
  segitiga: "triangle",
  persegipanjang: "rectangle",
  wajik: "diamond",
  berlian: "diamond",
  cicak: "gecko",
  cecak: "gecko",
  harimau: "tiger",
  ulat: "caterpillar",
  wortel: "carrot",
  pinguin: "penguin",
  rubah: "fox",
  babi: "pig",
  tikus: "mouse",
  siput: "snail",
  kepik: "ladybug",
  kereta: "train",
  "kereta api": "train",
  pesawat: "airplane",
  perahu: "boat",
  kapal: "boat",
  daun: "leaf",
  jamur: "mushroom",
  jam: "clock",
  kunci: "key",
  topi: "hat",
  sepatu: "shoe",
  "es krim": "icecream",
  eskrim: "icecream",
  roti: "bread",
  telur: "egg",
  jagung: "corn",
  nanas: "pineapple",
  mangga: "mango",
  ceri: "cherry",
  kue: "cake",
};

function resolveArtKey(subject: string): string | null {
  const slug = subject.toLowerCase().trim();
  if (ART[slug]) return slug;
  const direct = findArtKey(slug);
  if (direct) return direct;
  for (const [alias, key] of Object.entries(SYNONYMS)) {
    if (slug.includes(alias) && ART[key]) return key;
  }
  return null;
}

function wrapSvg(inner: string, p: ArtPalette): string {
  const bg = p.outlineOnly ? "#ffffff" : p.bg;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
    <rect x="0" y="0" width="200" height="200" rx="28" fill="${bg}"/>
    ${inner}
  </svg>`;
}

function svgToDataUri(svg: string): string {
  const encoded = encodeURIComponent(svg).replace(/'/g, "%27").replace(/"/g, "%22");
  return `data:image/svg+xml,${encoded}`;
}

export interface GeneratedIllustration {
  url: string;
  palette: string;
}

/**
 * Mock image generation provider. Produces deterministic, on-brand SVG
 * illustrations so the whole product experience works with zero API keys.
 * Swap `imageProvider` for a real implementation (DALL-E, SDXL, etc.) later —
 * callers only depend on generateIllustration()'s { url, palette } shape.
 */
export function generateIllustrationSync(
  subject: string,
  style: BookStyle,
  variantSeed = subject
): GeneratedIllustration {
  const palette = pickPalette(style, variantSeed);
  const key = resolveArtKey(subject);
  const inner = key ? ART[key](palette) : mascotArt(subject, palette);
  const svg = wrapSvg(inner, palette);
  return { url: svgToDataUri(svg), palette: palette.name };
}

export { resolveArtKey };
