import type { ArtPalette } from "./palette";
import { hashString } from "./palette";

const fillOrNone = (p: ArtPalette, c: string) => (p.outlineOnly ? "none" : c);

/** A friendly rounded "blob mascot" used whenever no specific illustration matches the subject. */
export function mascotArt(seedKey: string, p: ArtPalette): string {
  const seed = hashString(seedKey);
  const earType = seed % 3;
  const bodyType = Math.floor(seed / 3) % 2;

  const body =
    bodyType === 0
      ? `<circle cx="100" cy="112" r="52" fill="${fillOrNone(p, p.fill)}" stroke="${p.line}" stroke-width="5"/>`
      : `<path d="M100 56 C 148 56 156 108 148 138 C 140 168 60 168 52 138 C 44 108 52 56 100 56 Z" fill="${fillOrNone(p, p.fill)}" stroke="${p.line}" stroke-width="5" stroke-linejoin="round"/>`;

  const ears =
    earType === 0
      ? `<circle cx="62" cy="66" r="16" fill="${fillOrNone(p, p.accent)}" stroke="${p.line}" stroke-width="4"/><circle cx="138" cy="66" r="16" fill="${fillOrNone(p, p.accent)}" stroke="${p.line}" stroke-width="4"/>`
      : earType === 1
      ? `<path d="M 66 68 L 52 30 L 88 56 Z" fill="${fillOrNone(p, p.accent)}" stroke="${p.line}" stroke-width="4" stroke-linejoin="round"/><path d="M 134 68 L 148 30 L 112 56 Z" fill="${fillOrNone(p, p.accent)}" stroke="${p.line}" stroke-width="4" stroke-linejoin="round"/>`
      : `<path d="M 70 62 Q 60 34 84 26" stroke="${p.line}" stroke-width="5" fill="none" stroke-linecap="round"/><circle cx="84" cy="26" r="7" fill="${fillOrNone(p, p.accent)}" stroke="${p.line}" stroke-width="3.5"/><path d="M 130 62 Q 140 34 116 26" stroke="${p.line}" stroke-width="5" fill="none" stroke-linecap="round"/><circle cx="116" cy="26" r="7" fill="${fillOrNone(p, p.accent)}" stroke="${p.line}" stroke-width="3.5"/>`;

  const cheeks = p.outlineOnly
    ? ""
    : `<circle cx="70" cy="122" r="9" fill="${p.accent}" opacity="0.55"/><circle cx="130" cy="122" r="9" fill="${p.accent}" opacity="0.55"/>`;

  return `
    ${ears}
    ${body}
    ${cheeks}
    <circle cx="84" cy="106" r="5" fill="${p.line}"/>
    <circle cx="116" cy="106" r="5" fill="${p.line}"/>
    <path d="M 84 124 Q 100 136 116 124" stroke="${p.line}" stroke-width="4" fill="none" stroke-linecap="round"/>
  `;
}
