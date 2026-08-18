import type { ArtPalette } from "./palette";

type Builder = (p: ArtPalette) => string;

const S = 5; // stroke width
const face = (p: ArtPalette, cx: number, cy: number, gap = 14) =>
  `<circle cx="${cx - gap}" cy="${cy}" r="4.5" fill="${p.line}"/>
   <circle cx="${cx + gap}" cy="${cy}" r="4.5" fill="${p.line}"/>
   <path d="M ${cx - 8} ${cy + 12} Q ${cx} ${cy + 18} ${cx + 8} ${cy + 12}" stroke="${p.line}" stroke-width="3.5" fill="none" stroke-linecap="round"/>`;

const fillOrNone = (p: ArtPalette, c: string) => (p.outlineOnly ? "none" : c);

export const ART: Record<string, Builder> = {
  cat: (p) => `
    <circle cx="100" cy="112" r="52" fill="${fillOrNone(p, p.fill)}" stroke="${p.line}" stroke-width="${S}"/>
    <path d="M 62 76 L 50 40 L 86 66 Z" fill="${fillOrNone(p, p.fill)}" stroke="${p.line}" stroke-width="${S}" stroke-linejoin="round"/>
    <path d="M 138 76 L 150 40 L 114 66 Z" fill="${fillOrNone(p, p.fill)}" stroke="${p.line}" stroke-width="${S}" stroke-linejoin="round"/>
    <path d="M 78 68 L 70 46 L 88 62 Z" fill="${fillOrNone(p, p.accent)}"/>
    <path d="M 122 68 L 130 46 L 112 62 Z" fill="${fillOrNone(p, p.accent)}"/>
    ${face(p, 100, 112, 16)}
    <path d="M 100 128 L 60 122 M 100 128 L 60 134 M 100 128 L 140 122 M 100 128 L 140 134" stroke="${p.line}" stroke-width="2.5" stroke-linecap="round"/>
  `,
  dog: (p) => `
    <ellipse cx="100" cy="118" rx="50" ry="44" fill="${fillOrNone(p, p.fill)}" stroke="${p.line}" stroke-width="${S}"/>
    <path d="M 56 92 Q 34 96 38 138 Q 60 132 66 104 Z" fill="${fillOrNone(p, p.accent)}" stroke="${p.line}" stroke-width="${S}" stroke-linejoin="round"/>
    <path d="M 144 92 Q 166 96 162 138 Q 140 132 134 104 Z" fill="${fillOrNone(p, p.accent)}" stroke="${p.line}" stroke-width="${S}" stroke-linejoin="round"/>
    ${face(p, 100, 116, 16)}
    <ellipse cx="100" cy="138" rx="10" ry="7" fill="${p.line}"/>
  `,
  rabbit: (p) => `
    <ellipse cx="100" cy="132" rx="42" ry="38" fill="${fillOrNone(p, p.fill)}" stroke="${p.line}" stroke-width="${S}"/>
    <path d="M 78 90 Q 66 30 84 24 Q 92 60 92 96 Z" fill="${fillOrNone(p, p.fill)}" stroke="${p.line}" stroke-width="${S}" stroke-linejoin="round"/>
    <path d="M 122 90 Q 134 30 116 24 Q 108 60 108 96 Z" fill="${fillOrNone(p, p.fill)}" stroke="${p.line}" stroke-width="${S}" stroke-linejoin="round"/>
    ${face(p, 100, 126, 14)}
    <path d="M 92 142 Q 100 148 108 142" stroke="${p.line}" stroke-width="3" fill="none" stroke-linecap="round"/>
  `,
  fish: (p) => `
    <ellipse cx="92" cy="110" rx="52" ry="34" fill="${fillOrNone(p, p.fill)}" stroke="${p.line}" stroke-width="${S}"/>
    <path d="M 144 96 L 176 76 L 168 110 L 176 144 L 144 124 Z" fill="${fillOrNone(p, p.accent)}" stroke="${p.line}" stroke-width="${S * 0.8}" stroke-linejoin="round"/>
    <path d="M 70 92 Q 84 80 100 90" fill="${fillOrNone(p, p.accent)}" stroke="${p.line}" stroke-width="3" stroke-linejoin="round"/>
    <circle cx="60" cy="104" r="5" fill="${p.line}"/>
  `,
  bird: (p) => `
    <circle cx="100" cy="118" r="42" fill="${fillOrNone(p, p.fill)}" stroke="${p.line}" stroke-width="${S}"/>
    <circle cx="100" cy="76" r="26" fill="${fillOrNone(p, p.fill)}" stroke="${p.line}" stroke-width="${S}"/>
    <path d="M 122 76 L 146 82 L 122 88 Z" fill="${fillOrNone(p, p.accent)}" stroke="${p.line}" stroke-width="${S * 0.7}" stroke-linejoin="round"/>
    <circle cx="108" cy="72" r="4" fill="${p.line}"/>
    <path d="M 70 130 Q 40 128 44 110" fill="none" stroke="${p.line}" stroke-width="${S}" stroke-linecap="round"/>
  `,
  butterfly: (p) => `
    <path d="M 100 60 C 60 20 20 50 40 90 C 55 112 85 100 100 80 Z" fill="${fillOrNone(p, p.fill)}" stroke="${p.line}" stroke-width="${S}" stroke-linejoin="round"/>
    <path d="M 100 60 C 140 20 180 50 160 90 C 145 112 115 100 100 80 Z" fill="${fillOrNone(p, p.accent)}" stroke="${p.line}" stroke-width="${S}" stroke-linejoin="round"/>
    <path d="M 100 80 C 60 120 20 130 40 160 C 55 178 85 160 100 130 Z" fill="${fillOrNone(p, p.accent)}" stroke="${p.line}" stroke-width="${S}" stroke-linejoin="round"/>
    <path d="M 100 80 C 140 120 180 130 160 160 C 145 178 115 160 100 130 Z" fill="${fillOrNone(p, p.fill)}" stroke="${p.line}" stroke-width="${S}" stroke-linejoin="round"/>
    <rect x="96" y="55" width="8" height="90" rx="4" fill="${p.line}"/>
  `,
  frog: (p) => `
    <ellipse cx="100" cy="128" rx="48" ry="36" fill="${fillOrNone(p, p.fill)}" stroke="${p.line}" stroke-width="${S}"/>
    <circle cx="72" cy="82" r="18" fill="${fillOrNone(p, p.fill)}" stroke="${p.line}" stroke-width="${S}"/>
    <circle cx="128" cy="82" r="18" fill="${fillOrNone(p, p.fill)}" stroke="${p.line}" stroke-width="${S}"/>
    <circle cx="72" cy="82" r="6" fill="${p.line}"/>
    <circle cx="128" cy="82" r="6" fill="${p.line}"/>
    <path d="M 76 138 Q 100 152 124 138" stroke="${p.line}" stroke-width="3.5" fill="none" stroke-linecap="round"/>
  `,
  monkey: (p) => `
    <circle cx="100" cy="116" r="44" fill="${fillOrNone(p, p.fill)}" stroke="${p.line}" stroke-width="${S}"/>
    <circle cx="60" cy="98" r="16" fill="${fillOrNone(p, p.fill)}" stroke="${p.line}" stroke-width="${S}"/>
    <circle cx="140" cy="98" r="16" fill="${fillOrNone(p, p.fill)}" stroke="${p.line}" stroke-width="${S}"/>
    <ellipse cx="100" cy="122" rx="26" ry="20" fill="${fillOrNone(p, p.accent)}" stroke="${p.line}" stroke-width="3.5"/>
    ${face(p, 100, 112, 15)}
  `,
  cow: (p) => `
    <ellipse cx="100" cy="120" rx="50" ry="40" fill="${fillOrNone(p, "#fff")}" stroke="${p.line}" stroke-width="${S}"/>
    <path d="M 70 100 Q 60 84 76 78 Q 82 92 84 104 Z" fill="${fillOrNone(p, p.fill)}" stroke="${p.line}" stroke-width="3.5" stroke-linejoin="round"/>
    <path d="M 130 100 Q 140 84 124 78 Q 118 92 116 104 Z" fill="${fillOrNone(p, p.fill)}" stroke="${p.line}" stroke-width="3.5" stroke-linejoin="round"/>
    <path d="M 76 78 L 62 52 M 124 78 L 138 52" stroke="${p.line}" stroke-width="${S}" stroke-linecap="round"/>
    ${face(p, 100, 118, 16)}
    <ellipse cx="100" cy="140" rx="14" ry="9" fill="${fillOrNone(p, "#fff")}" stroke="${p.line}" stroke-width="3"/>
  `,
  chicken: (p) => `
    <ellipse cx="100" cy="126" rx="40" ry="36" fill="${fillOrNone(p, "#fff")}" stroke="${p.line}" stroke-width="${S}"/>
    <circle cx="100" cy="82" r="24" fill="${fillOrNone(p, "#fff")}" stroke="${p.line}" stroke-width="${S}"/>
    <path d="M 88 62 Q 92 46 100 60 Q 108 46 112 62" fill="${fillOrNone(p, p.fill)}" stroke="${p.line}" stroke-width="3.5" stroke-linejoin="round"/>
    <path d="M 122 84 L 140 90 L 122 96 Z" fill="${fillOrNone(p, p.accent)}" stroke="${p.line}" stroke-width="3"/>
    <circle cx="108" cy="78" r="4" fill="${p.line}"/>
  `,
  bear: (p) => `
    <circle cx="100" cy="116" r="44" fill="${fillOrNone(p, p.fill)}" stroke="${p.line}" stroke-width="${S}"/>
    <circle cx="62" cy="78" r="16" fill="${fillOrNone(p, p.fill)}" stroke="${p.line}" stroke-width="${S}"/>
    <circle cx="138" cy="78" r="16" fill="${fillOrNone(p, p.fill)}" stroke="${p.line}" stroke-width="${S}"/>
    <ellipse cx="100" cy="122" rx="22" ry="16" fill="${fillOrNone(p, p.accent)}" stroke="${p.line}" stroke-width="3.5"/>
    ${face(p, 100, 110, 15)}
  `,
  apple: (p) => `
    <path d="M 100 70 C 60 70 46 108 58 138 C 66 158 88 168 100 158 C 112 168 134 158 142 138 C 154 108 140 70 100 70 Z" fill="${fillOrNone(p, "#FF6B6B")}" stroke="${p.line}" stroke-width="${S}" stroke-linejoin="round"/>
    <path d="M 100 70 C 96 56 104 44 116 40" stroke="${p.line}" stroke-width="4" fill="none" stroke-linecap="round"/>
    <path d="M 108 52 Q 128 46 132 62 Q 114 66 108 52 Z" fill="${fillOrNone(p, "#4FCB8E")}" stroke="${p.line}" stroke-width="3"/>
  `,
  banana: (p) => `
    <g transform="rotate(120 100 100)">
      <path d="M 78 32 C 128 42 162 78 158 114 C 154 146 122 166 76 168 C 92 146 100 118 94 96 C 89 74 82 52 78 32 Z" fill="${fillOrNone(p, "#FFD166")}" stroke="${p.line}" stroke-width="${S}" stroke-linejoin="round"/>
      <path d="M 82 70 C 76 96 78 128 90 150" fill="none" stroke="${p.line}" stroke-width="2.5" opacity="0.5" stroke-linecap="round"/>
      <path d="M 80 33 L 90 25 L 96 33 Z" fill="${fillOrNone(p, "#B5651D")}" stroke="${p.line}" stroke-width="2" stroke-linejoin="round"/>
      <path d="M 108 92 L 100 108" stroke="#fff" stroke-width="6" stroke-linecap="round" opacity="${p.outlineOnly ? 0 : 0.75}"/>
      <circle cx="118" cy="78" r="4" fill="#fff" opacity="${p.outlineOnly ? 0 : 0.75}"/>
      <path d="M 82 167 L 78 190 L 58 190 L 60 165 Z" fill="${fillOrNone(p, "#8BC34A")}" stroke="${p.line}" stroke-width="3.5" stroke-linejoin="round"/>
      <path d="M 62 178 L 76 176" stroke="${p.line}" stroke-width="2" opacity="0.45"/>
    </g>
  `,
  orange: (p) => `
    <circle cx="100" cy="112" r="52" fill="${fillOrNone(p, "#FFA630")}" stroke="${p.line}" stroke-width="${S}"/>
    <path d="M 100 60 L 100 46" stroke="${p.line}" stroke-width="4" stroke-linecap="round"/>
    <path d="M 100 46 Q 112 40 118 48" fill="${fillOrNone(p, "#4FCB8E")}" stroke="${p.line}" stroke-width="3"/>
  `,
  grape: (p) => `
    <circle cx="80" cy="90" r="18" fill="${fillOrNone(p, "#9B7DE0")}" stroke="${p.line}" stroke-width="4"/>
    <circle cx="118" cy="90" r="18" fill="${fillOrNone(p, "#9B7DE0")}" stroke="${p.line}" stroke-width="4"/>
    <circle cx="100" cy="118" r="18" fill="${fillOrNone(p, "#9B7DE0")}" stroke="${p.line}" stroke-width="4"/>
    <circle cx="70" cy="122" r="18" fill="${fillOrNone(p, "#9B7DE0")}" stroke="${p.line}" stroke-width="4"/>
    <circle cx="130" cy="122" r="18" fill="${fillOrNone(p, "#9B7DE0")}" stroke="${p.line}" stroke-width="4"/>
    <circle cx="100" cy="146" r="18" fill="${fillOrNone(p, "#9B7DE0")}" stroke="${p.line}" stroke-width="4"/>
    <path d="M 100 72 Q 108 56 122 56" stroke="${p.line}" stroke-width="4" fill="none" stroke-linecap="round"/>
  `,
  strawberry: (p) => `
    <path d="M 100 70 C 60 78 52 130 100 168 C 148 130 140 78 100 70 Z" fill="${fillOrNone(p, "#FF6B8A")}" stroke="${p.line}" stroke-width="${S}" stroke-linejoin="round"/>
    <path d="M 78 58 L 100 72 L 122 58 L 100 66 Z" fill="${fillOrNone(p, "#4FCB8E")}" stroke="${p.line}" stroke-width="3" stroke-linejoin="round"/>
    <circle cx="84" cy="104" r="3" fill="${p.line}"/>
    <circle cx="112" cy="112" r="3" fill="${p.line}"/>
    <circle cx="96" cy="134" r="3" fill="${p.line}"/>
    <circle cx="118" cy="140" r="3" fill="${p.line}"/>
  `,
  watermelon: (p) => `
    <path d="M 40 100 A 60 60 0 0 0 160 100 Z" fill="${fillOrNone(p, "#4FCB8E")}" stroke="${p.line}" stroke-width="${S}" stroke-linejoin="round"/>
    <path d="M 52 100 A 48 48 0 0 0 148 100 Z" fill="${fillOrNone(p, "#FF6B6B")}" stroke="${p.line}" stroke-width="3.5" stroke-linejoin="round"/>
    <circle cx="88" cy="112" r="3" fill="${p.line}"/>
    <circle cx="112" cy="112" r="3" fill="${p.line}"/>
    <circle cx="100" cy="128" r="3" fill="${p.line}"/>
  `,
  car: (p) => `
    <path d="M 34 128 L 44 96 Q 50 86 62 86 L 138 86 Q 150 86 156 96 L 166 128 Z" fill="${fillOrNone(p, p.fill)}" stroke="${p.line}" stroke-width="${S}" stroke-linejoin="round"/>
    <path d="M 60 88 L 70 108 L 130 108 L 140 88" fill="${fillOrNone(p, "#EAF6FF")}" stroke="${p.line}" stroke-width="3.5" stroke-linejoin="round"/>
    <circle cx="66" cy="132" r="16" fill="${fillOrNone(p, "#333")}" stroke="${p.line}" stroke-width="4"/>
    <circle cx="134" cy="132" r="16" fill="${fillOrNone(p, "#333")}" stroke="${p.line}" stroke-width="4"/>
  `,
  bus: (p) => `
    <rect x="34" y="70" width="132" height="70" rx="14" fill="${fillOrNone(p, p.fill)}" stroke="${p.line}" stroke-width="${S}"/>
    <rect x="46" y="82" width="34" height="26" rx="6" fill="${fillOrNone(p, "#EAF6FF")}" stroke="${p.line}" stroke-width="3"/>
    <rect x="88" y="82" width="34" height="26" rx="6" fill="${fillOrNone(p, "#EAF6FF")}" stroke="${p.line}" stroke-width="3"/>
    <rect x="130" y="82" width="26" height="26" rx="6" fill="${fillOrNone(p, "#EAF6FF")}" stroke="${p.line}" stroke-width="3"/>
    <circle cx="62" cy="146" r="14" fill="${fillOrNone(p, "#333")}" stroke="${p.line}" stroke-width="4"/>
    <circle cx="138" cy="146" r="14" fill="${fillOrNone(p, "#333")}" stroke="${p.line}" stroke-width="4"/>
  `,
  bicycle: (p) => `
    <circle cx="56" cy="130" r="30" fill="none" stroke="${p.line}" stroke-width="${S}"/>
    <circle cx="144" cy="130" r="30" fill="none" stroke="${p.line}" stroke-width="${S}"/>
    <path d="M 56 130 L 92 76 L 130 76 M 92 76 L 120 130 M 56 130 L 120 130 M 78 100 L 118 100" stroke="${p.line}" stroke-width="4.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M 130 76 L 144 130" stroke="${p.line}" stroke-width="4.5" fill="none" stroke-linecap="round"/>
  `,
  star: (p) => `
    <path d="M100 40 L118 82 L164 86 L128 116 L140 160 L100 136 L60 160 L72 116 L36 86 L82 82 Z" fill="${fillOrNone(p, "#FFD166")}" stroke="${p.line}" stroke-width="${S}" stroke-linejoin="round"/>
  `,
  sun: (p) => `
    <circle cx="100" cy="100" r="34" fill="${fillOrNone(p, "#FFD166")}" stroke="${p.line}" stroke-width="${S}"/>
    <g stroke="${p.line}" stroke-width="6" stroke-linecap="round">
      <path d="M100 40 L100 24 M100 176 L100 160 M40 100 L24 100 M176 100 L160 100 M58 58 L46 46 M142 58 L154 46 M58 142 L46 154 M142 142 L154 154"/>
    </g>
  `,
  moon: (p) => `
    <path d="M 120 40 A 60 60 0 1 0 120 160 A 46 46 0 1 1 120 40 Z" fill="${fillOrNone(p, "#F6DDA0")}" stroke="${p.line}" stroke-width="${S}" stroke-linejoin="round"/>
    <circle cx="150" cy="60" r="4" fill="${p.line}"/>
    <circle cx="164" cy="86" r="3" fill="${p.line}"/>
  `,
  cloud: (p) => `
    <path d="M 54 130 Q 34 130 34 110 Q 34 92 54 92 Q 58 68 86 68 Q 112 68 118 90 Q 146 88 148 112 Q 150 130 128 130 Z" fill="${fillOrNone(p, "#fff")}" stroke="${p.line}" stroke-width="${S}" stroke-linejoin="round"/>
  `,
  balloon: (p) => `
    <ellipse cx="100" cy="90" rx="38" ry="46" fill="${fillOrNone(p, p.fill)}" stroke="${p.line}" stroke-width="${S}"/>
    <path d="M 92 134 L 100 148 L 108 134" fill="${fillOrNone(p, p.fill)}" stroke="${p.line}" stroke-width="3"/>
    <path d="M 100 148 Q 90 168 100 180" fill="none" stroke="${p.line}" stroke-width="3" stroke-linecap="round"/>
    <ellipse cx="86" cy="72" rx="8" ry="14" fill="${fillOrNone(p, "#fff")}" opacity="${p.outlineOnly ? 0 : 0.5}"/>
  `,
  book: (p) => `
    <path d="M 40 60 Q 70 50 100 62 L 100 150 Q 70 138 40 148 Z" fill="${fillOrNone(p, p.fill)}" stroke="${p.line}" stroke-width="${S}" stroke-linejoin="round"/>
    <path d="M 160 60 Q 130 50 100 62 L 100 150 Q 130 138 160 148 Z" fill="${fillOrNone(p, p.accent)}" stroke="${p.line}" stroke-width="${S}" stroke-linejoin="round"/>
  `,
  ball: (p) => `
    <circle cx="100" cy="106" r="52" fill="${fillOrNone(p, "#fff")}" stroke="${p.line}" stroke-width="${S}"/>
    <path d="M 100 54 L 100 158 M 48 106 L 152 106 M 64 68 Q 100 106 64 144 M 136 68 Q 100 106 136 144" stroke="${p.line}" stroke-width="3.5" fill="none"/>
  `,
  flower: (p) => `
    <circle cx="70" cy="76" r="20" fill="${fillOrNone(p, p.accent)}" stroke="${p.line}" stroke-width="4"/>
    <circle cx="130" cy="76" r="20" fill="${fillOrNone(p, p.accent)}" stroke="${p.line}" stroke-width="4"/>
    <circle cx="70" cy="116" r="20" fill="${fillOrNone(p, p.accent)}" stroke="${p.line}" stroke-width="4"/>
    <circle cx="130" cy="116" r="20" fill="${fillOrNone(p, p.accent)}" stroke="${p.line}" stroke-width="4"/>
    <circle cx="100" cy="96" r="22" fill="${fillOrNone(p, "#FFD166")}" stroke="${p.line}" stroke-width="4"/>
    <path d="M 100 118 L 100 172" stroke="${p.line}" stroke-width="5" stroke-linecap="round"/>
    <path d="M 100 148 Q 118 140 126 154" stroke="${p.line}" stroke-width="4" fill="none" stroke-linecap="round"/>
  `,
  tree: (p) => `
    <rect x="90" y="120" width="20" height="50" rx="6" fill="${fillOrNone(p, "#B08159")}" stroke="${p.line}" stroke-width="4"/>
    <circle cx="70" cy="90" r="30" fill="${fillOrNone(p, p.fill)}" stroke="${p.line}" stroke-width="${S}"/>
    <circle cx="130" cy="90" r="30" fill="${fillOrNone(p, p.fill)}" stroke="${p.line}" stroke-width="${S}"/>
    <circle cx="100" cy="66" r="34" fill="${fillOrNone(p, p.fill)}" stroke="${p.line}" stroke-width="${S}"/>
  `,
  house: (p) => `
    <path d="M 40 100 L 100 54 L 160 100 L 160 160 L 40 160 Z" fill="${fillOrNone(p, p.accent)}" stroke="${p.line}" stroke-width="${S}" stroke-linejoin="round"/>
    <rect x="86" y="118" width="28" height="42" rx="4" fill="${fillOrNone(p, p.fill)}" stroke="${p.line}" stroke-width="3.5"/>
    <rect x="52" y="112" width="20" height="20" rx="3" fill="${fillOrNone(p, "#EAF6FF")}" stroke="${p.line}" stroke-width="3"/>
    <rect x="128" y="112" width="20" height="20" rx="3" fill="${fillOrNone(p, "#EAF6FF")}" stroke="${p.line}" stroke-width="3"/>
  `,
  umbrella: (p) => `
    <path d="M 32 100 Q 100 30 168 100 Z" fill="${fillOrNone(p, p.fill)}" stroke="${p.line}" stroke-width="${S}" stroke-linejoin="round"/>
    <path d="M 100 100 L 100 160 Q 100 174 86 172" fill="none" stroke="${p.line}" stroke-width="4.5" stroke-linecap="round"/>
    <path d="M 32 100 Q 66 116 100 100 Q 134 116 168 100" fill="none" stroke="${p.line}" stroke-width="3"/>
  `,
  heart: (p) => `
    <path d="M100 160 C 40 118 40 70 76 58 C 92 52 100 68 100 76 C 100 68 108 52 124 58 C 160 70 160 118 100 160 Z" fill="${fillOrNone(p, "#FF6B8A")}" stroke="${p.line}" stroke-width="${S}" stroke-linejoin="round"/>
  `,
  gift: (p) => `
    <rect x="46" y="94" width="108" height="70" rx="8" fill="${fillOrNone(p, p.fill)}" stroke="${p.line}" stroke-width="${S}"/>
    <rect x="46" y="94" width="108" height="22" fill="${fillOrNone(p, p.accent)}" stroke="${p.line}" stroke-width="3.5"/>
    <rect x="92" y="94" width="16" height="70" fill="${fillOrNone(p, p.accent)}" stroke="${p.line}" stroke-width="3"/>
    <path d="M 100 94 Q 76 66 60 78 Q 68 96 100 94 Z" fill="${fillOrNone(p, p.accent)}" stroke="${p.line}" stroke-width="3" stroke-linejoin="round"/>
    <path d="M 100 94 Q 124 66 140 78 Q 132 96 100 94 Z" fill="${fillOrNone(p, p.accent)}" stroke="${p.line}" stroke-width="3" stroke-linejoin="round"/>
  `,
  kite: (p) => `
    <path d="M 100 34 L 150 90 L 100 172 L 50 90 Z" fill="${fillOrNone(p, p.fill)}" stroke="${p.line}" stroke-width="${S}" stroke-linejoin="round"/>
    <path d="M 50 90 L 150 90 M 100 34 L 100 172" stroke="${p.line}" stroke-width="3"/>
    <path d="M 100 172 Q 92 186 100 196 Q 108 206 100 216" fill="none" stroke="${p.line}" stroke-width="3" stroke-linecap="round"/>
  `,
  gecko: (p) => `
    <path d="M 60 130 Q 40 130 36 110 Q 34 96 48 90" fill="none" stroke="${p.line}" stroke-width="${S}" stroke-linecap="round"/>
    <ellipse cx="100" cy="120" rx="44" ry="26" fill="${fillOrNone(p, p.fill)}" stroke="${p.line}" stroke-width="${S}"/>
    <circle cx="146" cy="106" r="20" fill="${fillOrNone(p, p.fill)}" stroke="${p.line}" stroke-width="${S}"/>
    <circle cx="152" cy="100" r="3.5" fill="${p.line}"/>
    <path d="M 76 138 L 66 154 M 92 144 L 86 160 M 112 144 L 118 160" stroke="${p.line}" stroke-width="4" stroke-linecap="round"/>
  `,
  tiger: (p) => `
    <circle cx="100" cy="112" r="50" fill="${fillOrNone(p, "#FFA630")}" stroke="${p.line}" stroke-width="${S}"/>
    <path d="M 58 76 L 48 44 L 82 64 Z" fill="${fillOrNone(p, "#FFA630")}" stroke="${p.line}" stroke-width="${S}" stroke-linejoin="round"/>
    <path d="M 142 76 L 152 44 L 118 64 Z" fill="${fillOrNone(p, "#FFA630")}" stroke="${p.line}" stroke-width="${S}" stroke-linejoin="round"/>
    <path d="M 66 92 L 60 82 M 80 84 L 76 72 M 120 84 L 124 72 M 134 92 L 140 82" stroke="${p.line}" stroke-width="4" stroke-linecap="round"/>
    ${face(p, 100, 114, 16)}
    <path d="M 100 130 L 60 124 M 100 130 L 60 136 M 100 130 L 140 124 M 100 130 L 140 136" stroke="${p.line}" stroke-width="2.5" stroke-linecap="round"/>
  `,
  caterpillar: (p) => `
    <circle cx="46" cy="130" r="18" fill="${fillOrNone(p, "#8BC98A")}" stroke="${p.line}" stroke-width="4.5"/>
    <circle cx="80" cy="122" r="18" fill="${fillOrNone(p, "#8BC98A")}" stroke="${p.line}" stroke-width="4.5"/>
    <circle cx="114" cy="122" r="18" fill="${fillOrNone(p, "#8BC98A")}" stroke="${p.line}" stroke-width="4.5"/>
    <circle cx="148" cy="130" r="18" fill="${fillOrNone(p, "#8BC98A")}" stroke="${p.line}" stroke-width="4.5"/>
    <path d="M 34 108 Q 28 92 38 88 M 46 106 Q 44 90 54 86" stroke="${p.line}" stroke-width="3.5" fill="none" stroke-linecap="round"/>
    <circle cx="40" cy="126" r="3" fill="${p.line}"/>
    <circle cx="52" cy="126" r="3" fill="${p.line}"/>
  `,
  zebra: (p) => `
    <ellipse cx="100" cy="122" rx="46" ry="34" fill="${fillOrNone(p, "#fff")}" stroke="${p.line}" stroke-width="${S}"/>
    <circle cx="146" cy="98" r="22" fill="${fillOrNone(p, "#fff")}" stroke="${p.line}" stroke-width="${S}"/>
    <path d="M 70 100 L 78 112 M 84 96 L 92 110 M 98 94 L 106 108 M 112 96 L 120 110" stroke="${p.line}" stroke-width="4" stroke-linecap="round"/>
    <path d="M 132 84 L 140 92 M 142 82 L 150 90" stroke="${p.line}" stroke-width="3.5" stroke-linecap="round"/>
    <path d="M 130 78 L 118 56 M 146 76 L 148 52" stroke="${p.line}" stroke-width="4.5" fill="none" stroke-linecap="round"/>
    <circle cx="154" cy="92" r="3.5" fill="${p.line}"/>
  `,
  penguin: (p) => `
    <path d="M100 54 C 66 54 54 96 58 132 C 62 162 138 162 142 132 C 146 96 134 54 100 54 Z" fill="${fillOrNone(p, "#2B2B2B")}" stroke="${p.line}" stroke-width="${S}" stroke-linejoin="round"/>
    <path d="M100 74 C 80 74 74 104 76 128 C 78 148 122 148 124 128 C 126 104 120 74 100 74 Z" fill="${fillOrNone(p, "#fff")}" stroke="${p.line}" stroke-width="3.5" stroke-linejoin="round"/>
    <circle cx="90" cy="90" r="4" fill="${p.line}"/>
    <circle cx="110" cy="90" r="4" fill="${p.line}"/>
    <path d="M 94 98 L 100 106 L 106 98 Z" fill="${fillOrNone(p, "#FFA630")}" stroke="${p.line}" stroke-width="2.5"/>
    <path d="M 96 152 L 90 162 M 104 152 L 110 162" stroke="${p.line}" stroke-width="4" stroke-linecap="round"/>
  `,
  fox: (p) => `
    <path d="M 100 130 C 60 130 54 96 66 78 C 76 92 88 96 100 96 C 112 96 124 92 134 78 C 146 96 140 130 100 130 Z" fill="${fillOrNone(p, "#FF8A4C")}" stroke="${p.line}" stroke-width="${S}" stroke-linejoin="round"/>
    <path d="M 66 78 L 52 44 L 84 66 Z" fill="${fillOrNone(p, "#FF8A4C")}" stroke="${p.line}" stroke-width="4" stroke-linejoin="round"/>
    <path d="M 134 78 L 148 44 L 116 66 Z" fill="${fillOrNone(p, "#FF8A4C")}" stroke="${p.line}" stroke-width="4" stroke-linejoin="round"/>
    <path d="M 92 116 L 100 126 L 108 116 Z" fill="${p.line}"/>
    <circle cx="82" cy="102" r="4" fill="${p.line}"/>
    <circle cx="118" cy="102" r="4" fill="${p.line}"/>
    <path d="M 82 96 Q 100 92 118 96" fill="${fillOrNone(p, "#fff")}" stroke="none"/>
  `,
  pig: (p) => `
    <ellipse cx="100" cy="118" rx="46" ry="38" fill="${fillOrNone(p, "#FFB6C9")}" stroke="${p.line}" stroke-width="${S}"/>
    <path d="M 66 88 L 58 68 L 82 80 Z" fill="${fillOrNone(p, "#FFB6C9")}" stroke="${p.line}" stroke-width="4" stroke-linejoin="round"/>
    <path d="M 134 88 L 142 68 L 118 80 Z" fill="${fillOrNone(p, "#FFB6C9")}" stroke="${p.line}" stroke-width="4" stroke-linejoin="round"/>
    <ellipse cx="100" cy="126" rx="18" ry="12" fill="${fillOrNone(p, "#FF8FA8")}" stroke="${p.line}" stroke-width="3.5"/>
    <circle cx="94" cy="126" r="2.5" fill="${p.line}"/>
    <circle cx="106" cy="126" r="2.5" fill="${p.line}"/>
    <circle cx="80" cy="104" r="4" fill="${p.line}"/>
    <circle cx="120" cy="104" r="4" fill="${p.line}"/>
  `,
  mouse: (p) => `
    <circle cx="100" cy="122" r="34" fill="${fillOrNone(p, "#B7B7C0")}" stroke="${p.line}" stroke-width="${S}"/>
    <circle cx="72" cy="90" r="18" fill="${fillOrNone(p, "#B7B7C0")}" stroke="${p.line}" stroke-width="4"/>
    <circle cx="128" cy="90" r="18" fill="${fillOrNone(p, "#B7B7C0")}" stroke="${p.line}" stroke-width="4"/>
    <circle cx="72" cy="90" r="7" fill="${fillOrNone(p, "#FFB6C9")}"/>
    <circle cx="128" cy="90" r="7" fill="${fillOrNone(p, "#FFB6C9")}"/>
    ${face(p, 100, 120, 12)}
    <ellipse cx="100" cy="134" rx="6" ry="4" fill="${p.line}"/>
  `,
  snail: (p) => `
    <circle cx="130" cy="96" r="30" fill="none" stroke="${p.line}" stroke-width="${S}"/>
    <path d="M 130 96 m -18 0 a 18 18 0 1 1 36 0 a 12 12 0 1 1 -24 0 a 7 7 0 1 1 14 0" fill="${fillOrNone(p, p.accent)}" stroke="${p.line}" stroke-width="3.5"/>
    <path d="M 100 140 Q 60 140 56 122 Q 54 110 70 112 Q 100 112 112 96" fill="${fillOrNone(p, p.fill)}" stroke="${p.line}" stroke-width="${S}" stroke-linejoin="round"/>
    <path d="M 58 118 L 50 106 M 66 116 L 62 102" stroke="${p.line}" stroke-width="3" stroke-linecap="round"/>
    <circle cx="50" cy="105" r="2.5" fill="${p.line}"/>
    <circle cx="62" cy="101" r="2.5" fill="${p.line}"/>
  `,
  ladybug: (p) => `
    <path d="M100 60 C 60 60 46 96 46 116 C 46 148 70 160 100 160 C 130 160 154 148 154 116 C 154 96 140 60 100 60 Z" fill="${fillOrNone(p, "#FF6B6B")}" stroke="${p.line}" stroke-width="${S}" stroke-linejoin="round"/>
    <path d="M 100 60 L 100 160" stroke="${p.line}" stroke-width="4"/>
    <circle cx="76" cy="100" r="7" fill="${p.line}"/>
    <circle cx="120" cy="106" r="7" fill="${p.line}"/>
    <circle cx="84" cy="136" r="7" fill="${p.line}"/>
    <circle cx="122" cy="140" r="6" fill="${p.line}"/>
    <circle cx="88" cy="56" r="10" fill="${fillOrNone(p, "#2B2B2B")}" stroke="${p.line}" stroke-width="3.5"/>
    <circle cx="112" cy="56" r="10" fill="${fillOrNone(p, "#2B2B2B")}" stroke="${p.line}" stroke-width="3.5"/>
  `,
  carrot: (p) => `
    <path d="M 100 70 C 66 78 60 130 92 158 C 96 162 104 162 108 158 C 140 130 134 78 100 70 Z" fill="${fillOrNone(p, "#FFA630")}" stroke="${p.line}" stroke-width="${S}" stroke-linejoin="round"/>
    <path d="M 84 92 L 116 92 M 80 112 L 120 112 M 86 132 L 114 132" stroke="${p.line}" stroke-width="2.5" opacity="0.5"/>
    <path d="M 100 70 L 96 40 M 100 70 L 108 42 M 100 70 L 88 46" stroke="${p.line}" stroke-width="4" fill="none" stroke-linecap="round"/>
  `,
  icecream: (p) => `
    <path d="M 74 100 L 126 100 L 102 168 Q 100 174 98 168 Z" fill="${fillOrNone(p, "#E8B486")}" stroke="${p.line}" stroke-width="${S}" stroke-linejoin="round"/>
    <path d="M 70 100 Q 70 100 70 96 M 74 100 L 90 108 L 106 100 L 122 108 L 126 100" stroke="${p.line}" stroke-width="3" fill="none"/>
    <circle cx="100" cy="76" r="34" fill="${fillOrNone(p, "#FF8FA8")}" stroke="${p.line}" stroke-width="${S}"/>
    <circle cx="88" cy="66" r="7" fill="${fillOrNone(p, "#fff")}" opacity="${p.outlineOnly ? 0 : 0.6}"/>
  `,
  pizza: (p) => `
    <path d="M100 40 L 166 158 L 34 158 Z" fill="${fillOrNone(p, "#FFD166")}" stroke="${p.line}" stroke-width="${S}" stroke-linejoin="round"/>
    <path d="M 60 128 L 140 128" stroke="${p.line}" stroke-width="3" opacity="0.4"/>
    <circle cx="100" cy="90" r="9" fill="${fillOrNone(p, "#FF6B6B")}" stroke="${p.line}" stroke-width="2.5"/>
    <circle cx="76" cy="118" r="8" fill="${fillOrNone(p, "#FF6B6B")}" stroke="${p.line}" stroke-width="2.5"/>
    <circle cx="122" cy="118" r="8" fill="${fillOrNone(p, "#FF6B6B")}" stroke="${p.line}" stroke-width="2.5"/>
    <circle cx="100" cy="130" r="6" fill="${fillOrNone(p, "#4FCB8E")}" stroke="${p.line}" stroke-width="2"/>
  `,
  cake: (p) => `
    <rect x="50" y="110" width="100" height="48" rx="8" fill="${fillOrNone(p, "#FFB6C9")}" stroke="${p.line}" stroke-width="${S}"/>
    <rect x="50" y="110" width="100" height="16" fill="${fillOrNone(p, "#fff")}" opacity="${p.outlineOnly ? 0 : 0.6}"/>
    <path d="M 50 110 Q 66 96 82 110 Q 98 96 114 110 Q 130 96 150 110" fill="none" stroke="${p.line}" stroke-width="3.5"/>
    <rect x="94" y="70" width="10" height="30" rx="3" fill="${fillOrNone(p, p.accent)}" stroke="${p.line}" stroke-width="3"/>
    <path d="M 99 70 Q 92 58 99 48" stroke="${fillOrNone(p, "#FFA630")}" stroke-width="4" fill="none" stroke-linecap="round"/>
  `,
  bread: (p) => `
    <path d="M40 130 C 40 90 66 66 100 66 C 134 66 160 90 160 130 Z" fill="${fillOrNone(p, "#E8B486")}" stroke="${p.line}" stroke-width="${S}" stroke-linejoin="round"/>
    <path d="M 66 100 Q 72 84 82 78 M 100 96 Q 100 78 100 70 M 134 100 Q 128 84 118 78" stroke="${p.line}" stroke-width="3" fill="none" stroke-linecap="round"/>
  `,
  egg: (p) => `
    <path d="M100 40 C 60 96 60 140 100 160 C 140 140 140 96 100 40 Z" fill="${fillOrNone(p, "#fff")}" stroke="${p.line}" stroke-width="${S}" stroke-linejoin="round"/>
    <circle cx="86" cy="112" r="6" fill="${fillOrNone(p, "#FFD166")}" opacity="${p.outlineOnly ? 0 : 1}"/>
  `,
  corn: (p) => `
    <path d="M100 42 C 132 42 144 80 140 120 C 138 148 118 166 100 166 C 82 166 62 148 60 120 C 56 80 68 42 100 42 Z" fill="${fillOrNone(p, "#FFD166")}" stroke="${p.line}" stroke-width="${S}" stroke-linejoin="round"/>
    <circle cx="82" cy="72" r="4" fill="${p.line}" opacity="0.5"/><circle cx="100" cy="68" r="4" fill="${p.line}" opacity="0.5"/><circle cx="118" cy="72" r="4" fill="${p.line}" opacity="0.5"/>
    <circle cx="76" cy="92" r="4" fill="${p.line}" opacity="0.5"/><circle cx="100" cy="90" r="4" fill="${p.line}" opacity="0.5"/><circle cx="124" cy="92" r="4" fill="${p.line}" opacity="0.5"/>
    <circle cx="78" cy="114" r="4" fill="${p.line}" opacity="0.5"/><circle cx="100" cy="112" r="4" fill="${p.line}" opacity="0.5"/><circle cx="122" cy="114" r="4" fill="${p.line}" opacity="0.5"/>
    <path d="M 70 50 Q 50 46 44 60 Q 62 66 70 50 Z" fill="${fillOrNone(p, "#4FCB8E")}" stroke="${p.line}" stroke-width="3" stroke-linejoin="round"/>
  `,
  pineapple: (p) => `
    <path d="M 76 40 L 100 60 L 124 40 M 88 36 L 100 56 L 112 36" stroke="${p.line}" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M100 62 C 66 62 56 96 60 126 C 64 152 80 166 100 166 C 120 166 136 152 140 126 C 144 96 134 62 100 62 Z" fill="${fillOrNone(p, "#FFD166")}" stroke="${p.line}" stroke-width="${S}" stroke-linejoin="round"/>
    <path d="M 70 90 L 130 90 M 66 112 L 134 112 M 70 134 L 130 134 M 88 68 L 78 150 M 112 68 L 122 150" stroke="${p.line}" stroke-width="2.5" opacity="0.5"/>
  `,
  mango: (p) => `
    <path d="M100 50 C 60 56 46 100 66 136 C 80 160 120 160 134 136 C 154 100 140 56 100 50 Z" fill="${fillOrNone(p, "#FFA630")}" stroke="${p.line}" stroke-width="${S}" stroke-linejoin="round"/>
    <path d="M 92 50 Q 100 36 116 38" stroke="${p.line}" stroke-width="3.5" fill="none" stroke-linecap="round"/>
    <path d="M 76 80 Q 100 90 124 76" stroke="${fillOrNone(p, "#FF6B6B")}" stroke-width="8" fill="none" stroke-linecap="round" opacity="${p.outlineOnly ? 0 : 0.6}"/>
  `,
  cherry: (p) => `
    <circle cx="76" cy="140" r="24" fill="${fillOrNone(p, "#FF6B6B")}" stroke="${p.line}" stroke-width="${S}"/>
    <circle cx="130" cy="146" r="24" fill="${fillOrNone(p, "#FF6B6B")}" stroke="${p.line}" stroke-width="${S}"/>
    <path d="M 76 116 Q 84 60 118 42 M 130 122 Q 128 76 118 42" stroke="${p.line}" stroke-width="4" fill="none" stroke-linecap="round"/>
    <path d="M 108 50 Q 122 42 132 50 Q 122 56 108 50 Z" fill="${fillOrNone(p, "#4FCB8E")}" stroke="${p.line}" stroke-width="2.5"/>
  `,
  train: (p) => `
    <rect x="40" y="80" width="120" height="60" rx="10" fill="${fillOrNone(p, p.fill)}" stroke="${p.line}" stroke-width="${S}"/>
    <rect x="52" y="92" width="30" height="24" rx="5" fill="${fillOrNone(p, "#EAF6FF")}" stroke="${p.line}" stroke-width="3"/>
    <rect x="92" y="92" width="30" height="24" rx="5" fill="${fillOrNone(p, "#EAF6FF")}" stroke="${p.line}" stroke-width="3"/>
    <rect x="130" y="60" width="20" height="20" rx="4" fill="${fillOrNone(p, p.accent)}" stroke="${p.line}" stroke-width="3"/>
    <circle cx="62" cy="152" r="14" fill="${fillOrNone(p, "#333")}" stroke="${p.line}" stroke-width="4"/>
    <circle cx="100" cy="152" r="14" fill="${fillOrNone(p, "#333")}" stroke="${p.line}" stroke-width="4"/>
    <circle cx="138" cy="152" r="14" fill="${fillOrNone(p, "#333")}" stroke="${p.line}" stroke-width="4"/>
  `,
  airplane: (p) => `
    <path d="M 100 30 L 112 90 L 168 112 L 168 124 L 112 108 L 108 148 L 128 164 L 128 172 L 100 164 L 72 172 L 72 164 L 92 148 L 88 108 L 32 124 L 32 112 L 88 90 Z" fill="${fillOrNone(p, p.fill)}" stroke="${p.line}" stroke-width="4" stroke-linejoin="round"/>
  `,
  boat: (p) => `
    <path d="M 34 128 L 166 128 L 148 160 L 52 160 Z" fill="${fillOrNone(p, p.fill)}" stroke="${p.line}" stroke-width="${S}" stroke-linejoin="round"/>
    <path d="M 100 128 L 100 46" stroke="${p.line}" stroke-width="4" stroke-linecap="round"/>
    <path d="M 100 50 L 148 100 L 100 100 Z" fill="${fillOrNone(p, "#fff")}" stroke="${p.line}" stroke-width="3.5" stroke-linejoin="round"/>
    <path d="M 100 60 L 60 100 L 100 100 Z" fill="${fillOrNone(p, p.accent)}" stroke="${p.line}" stroke-width="3.5" stroke-linejoin="round"/>
  `,
  leaf: (p) => `
    <path d="M100 160 C 40 150 34 70 100 40 C 166 70 160 150 100 160 Z" fill="${fillOrNone(p, "#4FCB8E")}" stroke="${p.line}" stroke-width="${S}" stroke-linejoin="round"/>
    <path d="M 100 160 L 100 60" stroke="${p.line}" stroke-width="3.5" fill="none"/>
    <path d="M 100 90 Q 78 96 70 84 M 100 120 Q 78 126 70 114 M 100 90 Q 122 96 130 84 M 100 120 Q 122 126 130 114" stroke="${p.line}" stroke-width="2.5" fill="none"/>
  `,
  mushroom: (p) => `
    <path d="M 44 100 C 44 62 156 62 156 100 Z" fill="${fillOrNone(p, "#FF6B6B")}" stroke="${p.line}" stroke-width="${S}" stroke-linejoin="round"/>
    <circle cx="72" cy="80" r="6" fill="${fillOrNone(p, "#fff")}" opacity="${p.outlineOnly ? 0 : 0.85}"/>
    <circle cx="112" cy="72" r="7" fill="${fillOrNone(p, "#fff")}" opacity="${p.outlineOnly ? 0 : 0.85}"/>
    <circle cx="134" cy="90" r="5" fill="${fillOrNone(p, "#fff")}" opacity="${p.outlineOnly ? 0 : 0.85}"/>
    <rect x="80" y="100" width="40" height="56" rx="14" fill="${fillOrNone(p, "#FFF3E4")}" stroke="${p.line}" stroke-width="${S}"/>
  `,
  clock: (p) => `
    <circle cx="100" cy="104" r="54" fill="${fillOrNone(p, "#fff")}" stroke="${p.line}" stroke-width="${S}"/>
    <path d="M 100 104 L 100 70 M 100 104 L 124 116" stroke="${p.line}" stroke-width="5" stroke-linecap="round"/>
    <circle cx="100" cy="104" r="4" fill="${p.line}"/>
    <path d="M 84 44 L 100 44 L 100 52 L 84 52 Z M 100 44 L 116 44" stroke="${p.line}" stroke-width="3.5" fill="${fillOrNone(p, p.accent)}"/>
  `,
  key: (p) => `
    <circle cx="60" cy="80" r="26" fill="none" stroke="${p.line}" stroke-width="${S}"/>
    <circle cx="60" cy="80" r="10" fill="${fillOrNone(p, p.accent)}"/>
    <path d="M 80 98 L 148 166 M 128 146 L 144 130 M 112 130 L 128 114" stroke="${p.line}" stroke-width="${S}" stroke-linecap="round" stroke-linejoin="round"/>
  `,
  hat: (p) => `
    <ellipse cx="100" cy="140" rx="66" ry="14" fill="${fillOrNone(p, p.fill)}" stroke="${p.line}" stroke-width="${S}"/>
    <path d="M 68 140 C 68 90 132 90 132 140 Z" fill="${fillOrNone(p, p.accent)}" stroke="${p.line}" stroke-width="${S}" stroke-linejoin="round"/>
    <rect x="68" y="118" width="64" height="12" fill="${fillOrNone(p, p.fill)}" stroke="${p.line}" stroke-width="3"/>
  `,
  shoe: (p) => `
    <path d="M 30 140 L 30 112 Q 30 100 44 100 L 80 100 L 116 78 Q 128 72 138 82 L 160 104 Q 170 114 170 128 L 170 140 Z" fill="${fillOrNone(p, p.fill)}" stroke="${p.line}" stroke-width="${S}" stroke-linejoin="round"/>
    <path d="M 30 140 L 170 140" stroke="${p.line}" stroke-width="4"/>
    <path d="M 80 100 L 108 100" stroke="${p.line}" stroke-width="3" opacity="0.6"/>
  `,
  vas: (p) => `
    <path d="M 78 70 Q 70 100 78 120 Q 60 132 62 152 Q 64 166 100 166 Q 136 166 138 152 Q 140 132 122 120 Q 130 100 122 70 Z" fill="${fillOrNone(p, p.fill)}" stroke="${p.line}" stroke-width="${S}" stroke-linejoin="round"/>
    <path d="M 100 70 L 100 40 M 100 46 Q 84 34 74 44 M 100 46 Q 116 34 126 44" stroke="${p.line}" stroke-width="4" fill="none" stroke-linecap="round"/>
    <circle cx="80" cy="52" r="8" fill="${fillOrNone(p, "#FF6B8A")}" stroke="${p.line}" stroke-width="3"/>
    <circle cx="120" cy="52" r="8" fill="${fillOrNone(p, "#FFD166")}" stroke="${p.line}" stroke-width="3"/>
  `,
  xilofon: (p) => `
    <rect x="34" y="66" width="20" height="70" rx="4" fill="${fillOrNone(p, "#FF6B6B")}" stroke="${p.line}" stroke-width="4"/>
    <rect x="60" y="70" width="20" height="62" rx="4" fill="${fillOrNone(p, "#FFA630")}" stroke="${p.line}" stroke-width="4"/>
    <rect x="86" y="74" width="20" height="54" rx="4" fill="${fillOrNone(p, "#FFD166")}" stroke="${p.line}" stroke-width="4"/>
    <rect x="112" y="78" width="20" height="46" rx="4" fill="${fillOrNone(p, "#4FCB8E")}" stroke="${p.line}" stroke-width="4"/>
    <rect x="138" y="82" width="20" height="38" rx="4" fill="${fillOrNone(p, "#4FB6E8")}" stroke="${p.line}" stroke-width="4"/>
  `,
  yoyo: (p) => `
    <circle cx="100" cy="90" r="38" fill="${fillOrNone(p, p.fill)}" stroke="${p.line}" stroke-width="${S}"/>
    <circle cx="100" cy="90" r="10" fill="${fillOrNone(p, p.accent)}" stroke="${p.line}" stroke-width="3.5"/>
    <path d="M 100 128 Q 96 148 100 166" stroke="${p.line}" stroke-width="3.5" fill="none" stroke-linecap="round"/>
  `,
  quokka: (p) => `
    <circle cx="100" cy="118" r="42" fill="${fillOrNone(p, "#B8A088")}" stroke="${p.line}" stroke-width="${S}"/>
    <circle cx="66" cy="86" r="15" fill="${fillOrNone(p, "#B8A088")}" stroke="${p.line}" stroke-width="4"/>
    <circle cx="134" cy="86" r="15" fill="${fillOrNone(p, "#B8A088")}" stroke="${p.line}" stroke-width="4"/>
    ${face(p, 100, 116, 15)}
    <path d="M 84 132 Q 100 144 116 132" stroke="${p.line}" stroke-width="4" fill="none" stroke-linecap="round"/>
  `,
  circle: (p) => `<circle cx="100" cy="100" r="56" fill="${fillOrNone(p, p.fill)}" stroke="${p.line}" stroke-width="${S}"/>`,
  square: (p) => `<rect x="48" y="48" width="104" height="104" rx="10" fill="${fillOrNone(p, p.fill)}" stroke="${p.line}" stroke-width="${S}"/>`,
  triangle: (p) => `<path d="M 100 44 L 160 156 L 40 156 Z" fill="${fillOrNone(p, p.fill)}" stroke="${p.line}" stroke-width="${S}" stroke-linejoin="round"/>`,
  rectangle: (p) => `<rect x="34" y="64" width="132" height="72" rx="10" fill="${fillOrNone(p, p.fill)}" stroke="${p.line}" stroke-width="${S}"/>`,
  oval: (p) => `<ellipse cx="100" cy="100" rx="62" ry="42" fill="${fillOrNone(p, p.fill)}" stroke="${p.line}" stroke-width="${S}"/>`,
  diamond: (p) => `<path d="M 100 38 L 158 100 L 100 162 L 42 100 Z" fill="${fillOrNone(p, p.fill)}" stroke="${p.line}" stroke-width="${S}" stroke-linejoin="round"/>`,
};

export const ART_KEYS = Object.keys(ART);

export function findArtKey(text: string): string | null {
  const slug = text.toLowerCase();
  for (const key of ART_KEYS) {
    if (slug.includes(key)) return key;
  }
  return null;
}
