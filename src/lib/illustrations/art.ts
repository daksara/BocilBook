import type { ArtPalette } from "./palette";

type Builder = (p: ArtPalette) => string;

const S = 5; // stroke width
const face = (p: ArtPalette, cx: number, cy: number, gap = 14) =>
  `<circle cx="${cx - gap}" cy="${cy}" r="4.5" fill="${p.line}"/>
   <circle cx="${cx + gap}" cy="${cy}" r="4.5" fill="${p.line}"/>
   <path d="M ${cx - 8} ${cy + 12} Q ${cx} ${cy + 18} ${cx + 8} ${cy + 12}" stroke="${p.line}" stroke-width="3.5" fill="none" stroke-linecap="round"/>`;

const fillOrNone = (p: ArtPalette, c: string) => (p.outlineOnly ? "none" : c);

export const ART: Record<string, Builder> = {
  goose: (p) => `
    <ellipse cx="100" cy="128" rx="46" ry="38" fill="${fillOrNone(p, "#fff")}" stroke="${p.line}" stroke-width="${S}"/>
    <path d="M 92 96 C 84 60 60 48 46 52" fill="none" stroke="${p.line}" stroke-width="${S}" stroke-linecap="round"/>
    <circle cx="46" cy="52" r="18" fill="${fillOrNone(p, "#fff")}" stroke="${p.line}" stroke-width="${S}"/>
    <path d="M 30 52 L 14 48 L 30 60 Z" fill="${fillOrNone(p, p.accent)}" stroke="${p.line}" stroke-width="${S * 0.7}" stroke-linejoin="round"/>
    <circle cx="40" cy="46" r="3.5" fill="${p.line}"/>
    <path d="M 66 150 L 66 168 M 92 154 L 92 170" stroke="${p.line}" stroke-width="${S}" stroke-linecap="round"/>
  `,
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
  elephant: (p) => `
    <ellipse cx="104" cy="110" rx="54" ry="46" fill="${fillOrNone(p, p.fill)}" stroke="${p.line}" stroke-width="${S}"/>
    <circle cx="52" cy="86" r="26" fill="${fillOrNone(p, p.fill)}" stroke="${p.line}" stroke-width="${S}"/>
    <path d="M 92 120 Q 80 160 96 172" fill="none" stroke="${p.line}" stroke-width="${S}" stroke-linecap="round"/>
    <path d="M 148 100 Q 176 108 172 132 Q 156 132 150 116 Z" fill="${fillOrNone(p, p.accent)}" stroke="${p.line}" stroke-width="${S * 0.8}" stroke-linejoin="round"/>
    <circle cx="118" cy="102" r="4.5" fill="${p.line}"/>
    <circle cx="146" cy="102" r="4.5" fill="${p.line}"/>
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
  bee: (p) => `
    <ellipse cx="100" cy="120" rx="40" ry="30" fill="${fillOrNone(p, "#FFD166")}" stroke="${p.line}" stroke-width="${S}"/>
    <path d="M 70 104 L 130 104 M 68 120 L 132 120 M 72 136 L 128 136" stroke="${p.line}" stroke-width="6"/>
    <ellipse cx="70" cy="90" rx="26" ry="18" fill="${fillOrNone(p, "#fff")}" stroke="${p.line}" stroke-width="3" opacity="${p.outlineOnly ? 0 : 0.85}" transform="rotate(-20 70 90)"/>
    <ellipse cx="130" cy="90" rx="26" ry="18" fill="${fillOrNone(p, "#fff")}" stroke="${p.line}" stroke-width="3" opacity="${p.outlineOnly ? 0 : 0.85}" transform="rotate(20 130 90)"/>
    <circle cx="88" cy="112" r="4" fill="${p.line}"/>
    <circle cx="112" cy="112" r="4" fill="${p.line}"/>
  `,
  frog: (p) => `
    <ellipse cx="100" cy="128" rx="48" ry="36" fill="${fillOrNone(p, p.fill)}" stroke="${p.line}" stroke-width="${S}"/>
    <circle cx="72" cy="82" r="18" fill="${fillOrNone(p, p.fill)}" stroke="${p.line}" stroke-width="${S}"/>
    <circle cx="128" cy="82" r="18" fill="${fillOrNone(p, p.fill)}" stroke="${p.line}" stroke-width="${S}"/>
    <circle cx="72" cy="82" r="6" fill="${p.line}"/>
    <circle cx="128" cy="82" r="6" fill="${p.line}"/>
    <path d="M 76 138 Q 100 152 124 138" stroke="${p.line}" stroke-width="3.5" fill="none" stroke-linecap="round"/>
  `,
  lion: (p) => `
    <circle cx="100" cy="110" r="36" fill="${fillOrNone(p, p.accent)}" stroke="${p.line}" stroke-width="${S}"/>
    <circle cx="100" cy="110" r="58" fill="none" stroke="${p.line}" stroke-width="${S}"/>
    <circle cx="100" cy="110" r="58" fill="${fillOrNone(p, p.fill)}" opacity="0.001"/>
    ${face(p, 100, 108, 16)}
    <path d="M 92 124 Q 100 130 108 124" stroke="${p.line}" stroke-width="3" fill="none" stroke-linecap="round"/>
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
    <path d="M 54 84 L 44 66 M 146 84 L 156 66" stroke="${p.line}" stroke-width="${S}" stroke-linecap="round"/>
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
  duck: (p) => `
    <ellipse cx="98" cy="128" rx="46" ry="36" fill="${fillOrNone(p, p.accent)}" stroke="${p.line}" stroke-width="${S}"/>
    <circle cx="70" cy="86" r="24" fill="${fillOrNone(p, p.accent)}" stroke="${p.line}" stroke-width="${S}"/>
    <path d="M 48 88 L 26 84 L 48 98 Z" fill="${fillOrNone(p, "#FFA630")}" stroke="${p.line}" stroke-width="3"/>
    <circle cx="78" cy="80" r="4" fill="${p.line}"/>
  `,
  turtle: (p) => `
    <ellipse cx="100" cy="120" rx="50" ry="38" fill="${fillOrNone(p, p.accent)}" stroke="${p.line}" stroke-width="${S}"/>
    <path d="M 70 108 L 100 96 L 130 108 L 116 132 L 84 132 Z" fill="${fillOrNone(p, p.fill)}" stroke="${p.line}" stroke-width="3.5" stroke-linejoin="round"/>
    <circle cx="146" cy="112" r="16" fill="${fillOrNone(p, p.fill)}" stroke="${p.line}" stroke-width="${S}"/>
    <circle cx="152" cy="108" r="3.5" fill="${p.line}"/>
  `,
  bear: (p) => `
    <circle cx="100" cy="116" r="44" fill="${fillOrNone(p, p.fill)}" stroke="${p.line}" stroke-width="${S}"/>
    <circle cx="62" cy="78" r="16" fill="${fillOrNone(p, p.fill)}" stroke="${p.line}" stroke-width="${S}"/>
    <circle cx="138" cy="78" r="16" fill="${fillOrNone(p, p.fill)}" stroke="${p.line}" stroke-width="${S}"/>
    <ellipse cx="100" cy="122" rx="22" ry="16" fill="${fillOrNone(p, p.accent)}" stroke="${p.line}" stroke-width="3.5"/>
    ${face(p, 100, 110, 15)}
  `,
  owl: (p) => `
    <ellipse cx="100" cy="112" rx="46" ry="50" fill="${fillOrNone(p, p.fill)}" stroke="${p.line}" stroke-width="${S}"/>
    <circle cx="78" cy="100" r="18" fill="${fillOrNone(p, "#fff")}" stroke="${p.line}" stroke-width="3.5"/>
    <circle cx="122" cy="100" r="18" fill="${fillOrNone(p, "#fff")}" stroke="${p.line}" stroke-width="3.5"/>
    <circle cx="78" cy="100" r="6" fill="${p.line}"/>
    <circle cx="122" cy="100" r="6" fill="${p.line}"/>
    <path d="M 92 118 L 100 130 L 108 118 Z" fill="${fillOrNone(p, p.accent)}" stroke="${p.line}" stroke-width="3"/>
    <path d="M 70 66 L 82 84 M 130 66 L 118 84" stroke="${p.line}" stroke-width="${S}" stroke-linecap="round"/>
  `,
  sheep: (p) => `
    <circle cx="80" cy="120" r="22" fill="${fillOrNone(p, "#fff")}" stroke="${p.line}" stroke-width="4"/>
    <circle cx="112" cy="106" r="26" fill="${fillOrNone(p, "#fff")}" stroke="${p.line}" stroke-width="4"/>
    <circle cx="130" cy="130" r="20" fill="${fillOrNone(p, "#fff")}" stroke="${p.line}" stroke-width="4"/>
    <circle cx="96" cy="132" r="24" fill="${fillOrNone(p, "#fff")}" stroke="${p.line}" stroke-width="4"/>
    <ellipse cx="150" cy="126" rx="18" ry="14" fill="${fillOrNone(p, p.fill)}" stroke="${p.line}" stroke-width="3.5"/>
    <circle cx="156" cy="120" r="3.5" fill="${p.line}"/>
  `,
  apple: (p) => `
    <path d="M 100 70 C 60 70 46 108 58 138 C 66 158 88 168 100 158 C 112 168 134 158 142 138 C 154 108 140 70 100 70 Z" fill="${fillOrNone(p, "#FF6B6B")}" stroke="${p.line}" stroke-width="${S}" stroke-linejoin="round"/>
    <path d="M 100 70 C 96 56 104 44 116 40" stroke="${p.line}" stroke-width="4" fill="none" stroke-linecap="round"/>
    <path d="M 108 52 Q 128 46 132 62 Q 114 66 108 52 Z" fill="${fillOrNone(p, "#4FCB8E")}" stroke="${p.line}" stroke-width="3"/>
  `,
  banana: (p) => `
    <path d="M 60 150 C 40 110 60 60 110 46 C 108 56 100 62 100 62 C 130 60 148 88 140 118 C 128 156 90 172 60 150 Z" fill="${fillOrNone(p, "#FFD166")}" stroke="${p.line}" stroke-width="${S}" stroke-linejoin="round"/>
    <circle cx="112" cy="48" r="6" fill="${fillOrNone(p, "#8a6a3a")}" stroke="${p.line}" stroke-width="2.5"/>
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
