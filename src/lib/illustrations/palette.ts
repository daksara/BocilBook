import type { BookStyle } from "@/types";

export interface ArtPalette {
  name: string;
  bg: string;
  fill: string;
  accent: string;
  line: string;
  outlineOnly: boolean;
}

const PALETTES: Record<BookStyle, ArtPalette[]> = {
  "cute-cartoon": [
    { name: "coral", bg: "#FFF3EC", fill: "#FF8A65", accent: "#FFD166", line: "#3A2E2A", outlineOnly: false },
    { name: "sky", bg: "#EAF6FF", fill: "#4FB6E8", accent: "#FFE08A", line: "#233A45", outlineOnly: false },
    { name: "mint", bg: "#EEFBF3", fill: "#4FCB8E", accent: "#FFAFC3", line: "#233A2E", outlineOnly: false },
    { name: "violet", bg: "#F4EEFF", fill: "#9B7DE0", accent: "#FFD166", line: "#2C2340", outlineOnly: false },
  ],
  colorful: [
    { name: "sunset", bg: "#FFF6E9", fill: "#FF6B6B", accent: "#4ECDC4", line: "#2B2B2B", outlineOnly: false },
    { name: "tropic", bg: "#EFFBF5", fill: "#22B573", accent: "#FFC94A", line: "#2B2B2B", outlineOnly: false },
    { name: "candy", bg: "#FDF0FA", fill: "#E85D9C", accent: "#5FC9F3", line: "#2B2B2B", outlineOnly: false },
    { name: "citrus", bg: "#FFF9E6", fill: "#FFA630", accent: "#4FB6E8", line: "#2B2B2B", outlineOnly: false },
  ],
  "soft-pastel": [
    { name: "blush", bg: "#FFF7F5", fill: "#F4B8B0", accent: "#BEE3D4", line: "#5C4A47", outlineOnly: false },
    { name: "lilac", bg: "#F8F5FF", fill: "#C9B6E4", accent: "#FFE1B8", line: "#4A4457", outlineOnly: false },
    { name: "butter", bg: "#FFFCF2", fill: "#F6DDA0", accent: "#AEDCE0", line: "#57503f", outlineOnly: false },
    { name: "seafoam", bg: "#F2FBF8", fill: "#A9DDD0", accent: "#F5C6D6", line: "#38504a", outlineOnly: false },
  ],
  minimal: [
    { name: "slate", bg: "#FAFAF8", fill: "#7C8B94", accent: "#D8CBB4", line: "#2C2C2C", outlineOnly: false },
    { name: "sand", bg: "#FAFAF8", fill: "#C9A277", accent: "#8CA9A3", line: "#2C2C2C", outlineOnly: false },
  ],
  educational: [
    { name: "classroom", bg: "#F4FAFF", fill: "#3E7CB1", accent: "#F2B84B", line: "#20303D", outlineOnly: false },
    { name: "chalk", bg: "#F6FFF7", fill: "#3E9B6B", accent: "#E8A33D", line: "#203D2B", outlineOnly: false },
  ],
  "islamic-kids": [
    { name: "zamrud", bg: "#F1FBF6", fill: "#1E9E6B", accent: "#E8B84B", line: "#1F3A2D", outlineOnly: false },
    { name: "langit", bg: "#F1F8FB", fill: "#2E8FAE", accent: "#E8B84B", line: "#1F333A", outlineOnly: false },
  ],
  "bw-printable": [
    { name: "outline", bg: "#FFFFFF", fill: "#FFFFFF", accent: "#FFFFFF", line: "#1A1A1A", outlineOnly: true },
  ],
};

export function hashString(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function pickPalette(style: BookStyle, seedKey: string): ArtPalette {
  const set = PALETTES[style] ?? PALETTES["cute-cartoon"];
  const idx = hashString(seedKey) % set.length;
  return set[idx];
}
