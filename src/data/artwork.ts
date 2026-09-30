/**
 * ARTWORK TOKENS — deterministic generative palettes/shape recipes keyed by name.
 * The renderer in src/components/art.tsx interprets these into compositions,
 * so each project gets a distinct, reproducible identity without binary assets.
 */

export type Palette = {
  bg: string;
  fg: string;
  muted: string;
  accent: string;
};

export const palettes: Record<string, Palette> = {
  fleet: {
    bg: "#201E1B",
    fg: "#F2EFE9",
    muted: "#8A867E",
    accent: "#E4572E",
  },
  meds: {
    bg: "#EFE9E1",
    fg: "#23211D",
    muted: "#7C766C",
    accent: "#E4572E",
  },
  type: {
    bg: "#191817",
    fg: "#F2EFE9",
    muted: "#7A7670",
    accent: "#E4572E",
  },
};

export type ArtSpec = {
  variant: "fleet" | "meds" | "studio";
  kind: "hero" | "thumb" | "screen";
  aspect?: "wide" | "tall" | "square";
};

export type Swatch = {
  x: number;
  y: number;
  w: number;
  h: number;
  fill: string;
  opacity: number;
};

/** Simple hash → deterministic pseudo-random sequence per seed. */
export function rng(seed: string) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return () => {
    h ^= h << 13;
    h ^= h >>> 17;
    h ^= h << 5;
    h |= 0;
    return ((h >>> 0) % 100000) / 100000;
  };
}
