/**
 * ART SYSTEM — deterministic generative compositions standing in for
 * project imagery. Each project renders a distinct visual world:
 *   fleet  → dark control-room: status map, ranked tiles, signal markers
 *   meds   → warm paper: routine rail, Now card, soft dosage geometry
 *   type   → night stage: variable-font instrument, axis glyphs
 * Swap any piece for real screenshots by replacing its component with an
 * <img> — the layout stays identical.
 */
import { motion, useReducedMotion } from "framer-motion";
import { palettes, rng, type ArtSpec } from "@/data/artwork";

/* ------------------------------------------------------------------ */
/* SHARED FRAME — clip + scale on view, grain overlay                  */
/* ------------------------------------------------------------------ */

function Frame({
  children,
  className = "",
  label,
  tone = "light",
}: {
  children: React.ReactNode;
  className?: string;
  label?: string;
  tone?: "light" | "dark";
}) {
  const reduce = useReducedMotion();
  return (
    <div
      role="img"
      aria-label={label}
      className={`relative overflow-hidden ${tone === "dark" ? "grain" : ""} ${className}`}
    >
      <motion.div
        className="absolute inset-0"
        initial={reduce ? false : { scale: 1.08 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: [0.19, 1, 0.22, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}

function Cross({ x, y, size = 10, color }: { x: string; y: string; size?: number; color: string }) {
  return (
    <svg
      aria-hidden
      className="absolute"
      style={{ left: x, top: y, width: size, height: size }}
      viewBox="0 0 10 10"
    >
      <path d="M5 0v10M0 5h10" stroke={color} strokeWidth="1" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* FLEET — control room                                                */
/* ------------------------------------------------------------------ */

function FleetArt({ spec, seed }: { spec: ArtSpec; seed: string }) {
  const p = palettes.fleet;
  const r = rng(seed);
  const wide = spec.aspect !== "tall" && spec.aspect !== "square";
  const tiles = Array.from({ length: wide ? 14 : 8 }, (_, i) => ({
    x: 6 + (i % 7) * 13.5,
    y: wide ? 24 + Math.floor(i / 7) * 30 : 20 + i * 10,
    alert: r() > 0.72,
  }));
  return (
    <Frame
      tone="dark"
      label="FleetOps control-room composition: a ranked status map of vehicles with highlighted risk tiles"
      className="h-full w-full"
    >
      <div className="h-full w-full" style={{ background: p.bg }}>
        <svg className="h-full w-full" viewBox="0 0 100 62" preserveAspectRatio="xMidYMid slice">
          {Array.from({ length: 9 }, (_, i) => (
            <line key={`v${i}`} x1={i * 12.5} y1="0" x2={i * 12.5} y2="62" stroke={p.fg} strokeOpacity="0.07" strokeWidth="0.3" />
          ))}
          {Array.from({ length: 5 }, (_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 15.5} x2="100" y2={i * 15.5} stroke={p.fg} strokeOpacity="0.07" strokeWidth="0.3" />
          ))}
          {tiles.map((t, i) => (
            <g key={i}>
              <rect x={t.x} y={t.y} width="10" height="10" fill={t.alert ? p.accent : p.fg} fillOpacity={t.alert ? 0.9 : 0.14} />
              <rect x={t.x} y={t.y} width="10" height="10" fill="none" stroke={p.fg} strokeOpacity="0.25" strokeWidth="0.3" />
            </g>
          ))}
          <rect x="6" y="6" width="26" height="0.8" fill={p.accent} />
          <rect x="6" y="10" width="14" height="0.6" fill={p.fg} fillOpacity="0.5" />
          <rect x="6" y="12" width="20" height="0.6" fill={p.fg} fillOpacity="0.3" />
          {Array.from({ length: wide ? 3 : 2 }, (_, i) => (
            <rect key={i} x={64 + i * 11} y={wide ? 46 : 52} width="9" height={wide ? 12 : 8} fill={p.fg} fillOpacity="0.1" stroke={p.fg} strokeOpacity="0.3" strokeWidth="0.3" />
          ))}
        </svg>
      </div>
    </Frame>
  );
}

/* ------------------------------------------------------------------ */
/* MEDS — paper routine                                                */
/* ------------------------------------------------------------------ */

function MedsArt({ spec, seed }: { spec: ArtSpec; seed: string }) {
  const p = palettes.meds;
  const r = rng(seed);
  const tall = spec.aspect === "tall";
  return (
    <Frame
      tone="dark"
      label="MedMate composition: a calm routine rail with dose markers on warm paper"
      className="h-full w-full"
    >
      <div className="h-full w-full" style={{ background: p.bg }}>
        <svg className="h-full w-full" viewBox="0 0 100 62" preserveAspectRatio="xMidYMid slice">
          {tall ? (
            <g>
              <rect x="30" y="8" width="40" height="30" fill="#FFFFFF" stroke={p.fg} strokeOpacity="0.2" strokeWidth="0.4" />
              <rect x="35" y="13" width="18" height="3" fill={p.fg} fillOpacity="0.75" />
              <rect x="35" y="19" width="26" height="2" fill={p.fg} fillOpacity="0.35" />
              <rect x="35" y="23" width="22" height="2" fill={p.fg} fillOpacity="0.25" />
              <circle cx="60" cy="31" r="2.2" fill={p.accent} />
              <rect x="30" y="42" width="40" height="0.5" fill={p.fg} fillOpacity="0.2" />
              {[0, 1, 2, 3].map((i) => (
                <g key={i}>
                  <circle cx={34 + i * 10} cy="49" r="1.6" fill={i < 2 ? p.accent : "none"} stroke={p.fg} strokeOpacity={i < 2 ? 0 : 0.4} strokeWidth="0.5" />
                </g>
              ))}
            </g>
          ) : (
            <g>
              <rect x="8" y="14" width="50" height="34" fill="#FFFFFF" stroke={p.fg} strokeOpacity="0.2" strokeWidth="0.4" />
              <rect x="13" y="20" width="24" height="3.5" fill={p.fg} fillOpacity="0.75" />
              <rect x="13" y="27" width="34" height="2" fill={p.fg} fillOpacity="0.3" />
              <rect x="13" y="31" width="30" height="2" fill={p.fg} fillOpacity="0.22" />
              <circle cx="49" cy="41" r="2.4" fill={p.accent} />
              {[0, 1, 2, 3, 4].map((i) => (
                <circle key={i} cx={66 + i * 6} cy={20 + (r() > 0.5 ? 0 : 22)} r="1.4" fill={p.fg} fillOpacity="0.4" />
              ))}
              <rect x="64" y="14" width="0.4" height="34" fill={p.fg} fillOpacity="0.25" />
            </g>
          )}
          <rect x="0" y="0" width="100" height="62" fill="none" stroke={p.fg} strokeOpacity="0.1" strokeWidth="0.4" />
        </svg>
      </div>
    </Frame>
  );
}

/* ------------------------------------------------------------------ */
/* TYPE — variable-font instrument on the night stage                  */
/* ------------------------------------------------------------------ */

function TypeArt({ spec, seed }: { spec: ArtSpec; seed: string }) {
  const p = palettes.type;
  const r = rng(seed);
  const bars = Array.from({ length: 9 }, (_, i) => ({
    w: 8 + r() * 26,
    y: 10 + i * 5.4,
  }));
  return (
    <Frame
      tone="dark"
      label="Kinetic Type Lab composition: typographic bars on a dark stage with one signal element"
      className="h-full w-full"
    >
      <div className="h-full w-full" style={{ background: p.bg }}>
        <svg className="h-full w-full" viewBox="0 0 100 62" preserveAspectRatio="xMidYMid slice">
          {bars.map((b, i) => (
            <rect
              key={i}
              x={6 + (i % 3) * 2}
              y={b.y}
              width={b.w}
              height={i === 4 ? 2.6 : 1.4}
              fill={i === 4 ? p.accent : p.fg}
              fillOpacity={i === 4 ? 1 : 0.28 + r() * 0.3}
            />
          ))}
          <rect x="62" y="10" width="0.35" height="42" fill={p.fg} fillOpacity="0.3" />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <circle key={i} cx="62" cy={10 + i * 8.4} r="0.9" fill={p.fg} fillOpacity="0.5" />
          ))}
          <rect x="68" y="44" width="24" height="6" fill="none" stroke={p.accent} strokeWidth="0.5" />
          <rect x="71" y="46.5" width="10" height="1" fill={p.accent} />
        </svg>
      </div>
    </Frame>
  );
}

/* ------------------------------------------------------------------ */
/* EXPERIMENT ARTS (lab grid)                                          */
/* ------------------------------------------------------------------ */

export function ExperimentArt({ art, index }: { art: string; index: string }) {
  const r = rng(art + index);
  if (art === "dots") {
    return (
      <svg viewBox="0 0 100 62" className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
        {Array.from({ length: 60 }, (_, i) => (
          <circle
            key={i}
            cx={8 + (i % 10) * 9.4}
            cy={8 + Math.floor(i / 10) * 11.5}
            r={1 + r() * 2.6}
            fill={i === 33 ? "#E4572E" : "#1A1917"}
            fillOpacity={i === 33 ? 1 : 0.25 + r() * 0.3}
          />
        ))}
      </svg>
    );
  }
  if (art === "posters") {
    return (
      <svg viewBox="0 0 100 62" className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect x={8 + i * 30} y="10" width="24" height="42" fill="#FFFFFF" stroke="#1A1917" strokeOpacity="0.25" strokeWidth="0.4" />
            <rect x={11 + i * 30} y={14 + i * 4} width={18 - i * 2} height="3" fill="#1A1917" fillOpacity="0.8" />
            <rect x={11 + i * 30} y={21 + i * 2} width="12" height="1.6" fill="#1A1917" fillOpacity="0.4" />
            <circle cx={14 + i * 30} cy={44} r={4 - i * 0.8} fill={i === 1 ? "#E4572E" : "#1A1917"} fillOpacity={i === 1 ? 1 : 0.7} />
          </g>
        ))}
      </svg>
    );
  }
  if (art === "arc") {
    return (
      <svg viewBox="0 0 100 62" className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
        <path d="M10 52 C 30 52, 40 10, 90 10" stroke="#1A1917" strokeWidth="1.2" fill="none" />
        <circle cx="10" cy="52" r="2" fill="#E4572E" />
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 1) / 8;
          const x = 10 + t * 80;
          const y = 52 - (1 - Math.pow(1 - t, 3)) * 42;
          return <circle key={i} cx={x} cy={y} r="0.9" fill="#1A1917" fillOpacity="0.5" />;
        })}
      </svg>
    );
  }
  if (art === "tokens") {
    return (
      <svg viewBox="0 0 100 62" className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
        <rect x="10" y="12" width="80" height="38" fill="#FFFFFF" stroke="#1A1917" strokeOpacity="0.25" strokeWidth="0.4" />
        <rect x="10" y="12" width="80" height="7" fill="#1A1917" fillOpacity="0.85" />
        <rect x="14" y="23" width="30" height="3" fill="#1A1917" fillOpacity="0.6" />
        <rect x="14" y="30" width="46" height="2" fill="#1A1917" fillOpacity="0.3" />
        <rect x="14" y="36" width="38" height="2" fill="#1A1917" fillOpacity="0.3" />
        <rect x="66" y="23" width="20" height="14" fill="#E4572E" fillOpacity="0.9" />
      </svg>
    );
  }
  // typeGrid (default)
  return (
    <svg viewBox="0 0 100 62" className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
      {Array.from({ length: 6 }, (_, i) => (
        <rect
          key={i}
          x={8 + i * 4}
          y={10 + i * 3}
          width={60 - i * 7}
          height={5 - i * 0.5}
          fill={i === 2 ? "#E4572E" : "#1A1917"}
          fillOpacity={i === 2 ? 1 : 0.7 - i * 0.08}
        />
      ))}
      {Array.from({ length: 6 }, (_, i) => (
        <line key={`g${i}`} x1={8} y1={12 + i * 7} x2={92} y2={12 + i * 7} stroke="#1A1917" strokeOpacity="0.12" strokeWidth="0.3" />
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* DISPATCH — project key → component                                  */
/* ------------------------------------------------------------------ */

export function ProjectArt({
  art,
  spec,
  seedSuffix = "",
  className = "",
}: {
  art: string;
  spec: ArtSpec;
  seedSuffix?: string;
  className?: string;
}) {
  const seed = art + spec.kind + spec.aspect + seedSuffix;
  if (art === "fleet") return <FleetArt spec={spec} seed={seed} />;
  if (art === "meds") return <MedsArt spec={spec} seed={seed} />;
  return <TypeArt spec={spec} seed={seed} />;
}

/* ------------------------------------------------------------------ */
/* HERO COMPOSITION — the designer's world                             */
/* ------------------------------------------------------------------ */

export function HeroArt() {
  const p = palettes.fleet;
  return (
    <div className="absolute inset-0" aria-hidden>
      <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
        {Array.from({ length: 12 }, (_, i) => (
          <line key={`v${i}`} x1={i * (100 / 11)} y1="0" x2={i * (100 / 11)} y2="100" stroke={p.fg} strokeOpacity="0.05" strokeWidth="0.25" />
        ))}
        <circle cx="50" cy="46" r="26" fill="none" stroke={p.fg} strokeOpacity="0.16" strokeWidth="0.35" />
        <circle cx="50" cy="46" r="18" fill="none" stroke={p.fg} strokeOpacity="0.12" strokeWidth="0.35" />
        <circle cx="50" cy="46" r="4.5" fill="#E4572E" fillOpacity="0.9" />
        <rect x="50" y="0" width="0.3" height="100" fill={p.fg} fillOpacity="0.08" />
        <rect x="0" y="46" width="100" height="0.3" fill={p.fg} fillOpacity="0.08" />
        {[0, 60, 120].map((deg) => (
          <g key={deg} transform={`rotate(${deg} 50 46)`}>
            <rect x="49.85" y="8" width="0.3" height="10" fill={p.fg} fillOpacity="0.3" />
          </g>
        ))}
        <Cross x="8%" y="12%" color={p.fg} />
        <Cross x="88%" y="80%" color={p.fg} />
      </svg>
    </div>
  );
}
