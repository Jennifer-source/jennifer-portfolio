import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Arrow } from "@/components/core";

const STAGES = [
  {
    k: "01 — REVEAL",
    t: "Masked type rises into place.",
    d: "Entrances borrow from cinema: nothing fades in softly, everything arrives with intent.",
  },
  {
    k: "02 — PARALLAX",
    t: "Depth without decoration.",
    d: "Layers move at different speeds so the eye understands what sits in front.",
  },
  {
    k: "03 — COLOR AS SIGNAL",
    t: "A hue means something.",
    d: "Cobalt, verdant, amber, signal red — each tracks a different kind of information: focus, success, craft, action.",
  },
  {
    k: "04 — SETTLE",
    t: "Motion ends still.",
    d: "Every choreography resolves into a calm, readable layout. Movement serves the message.",
  },
];

/**
 * DESIGN IN MOTION — full-screen dark cinematic section. Scroll drives a
 * four-stage sequence with a progress rail; typography and plates choreograph
 * as the visitor moves through. Fully static under reduced motion.
 */
export function MotionShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const stage = useTransform(scrollYProgress, [0.1, 0.9], [0, STAGES.length - 1]);
  const yPlate = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 60, reduce ? 0 : -60]);

  return (
    <section
      id="motion"
      ref={ref}
      aria-label="Design in motion — motion showcase"
      className="relative overflow-hidden bg-night text-night-fg"
    >
      <div className="grain absolute inset-0" aria-hidden />
      <div className="edge relative py-28 md:py-40">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="display-lg">
            DESIGN
            <br />
            IN <span className="text-signal">MOTION.</span>
          </h2>
          <p className="label-mono max-w-[18ch] text-right text-night-muted">
            MOTION IS NOT DECORATION. IT EXPLAINS CHANGE.
          </p>
        </div>

        <div className="mt-16 grid gap-12 md:mt-24 md:grid-cols-12">
          {/* cinematic plate */}
          <motion.div style={{ y: yPlate }} className="md:col-span-7">
            <div className="relative aspect-[16/10] overflow-hidden border border-night-border bg-night-soft">
              <motion.div
                className="absolute inset-0"
                initial={reduce ? undefined : { scale: 1.12 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 1.6, ease: [0.19, 1, 0.22, 1] }}
              >
                <MotionStagePlate />
              </motion.div>
              <div className="absolute bottom-4 left-4 label-mono text-night-muted">
                LOOP — KINETIC TYPE LAB, INSTRUMENT 01
              </div>
            </div>
          </motion.div>

          {/* scroll-driven stage list */}
          <div className="md:col-span-5">
            <ol className="space-y-0">
              {STAGES.map((s, i) => (
                <StageItem key={s.k} s={s} i={i} progress={scrollYProgress} reduce={!!reduce} />
              ))}
            </ol>
            <motion.p style={{ opacity: stage }} className="sr-only" aria-hidden>
              Scroll progress through motion stages
            </motion.p>
          </div>
        </div>

        <div className="mt-16 flex items-center gap-4 border-t border-night-border pt-6">
          <Arrow className="h-4 w-4 text-signal" />
          <p className="label-mono text-night-muted">
            EVERY TECHNIQUE ON THIS PAGE IS USED IN THE CASE STUDIES
          </p>
        </div>
      </div>
    </section>
  );
}

function StageItem({
  s,
  i,
  progress,
  reduce,
}: {
  s: (typeof STAGES)[number];
  i: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  reduce: boolean;
}) {
  const start = i / STAGES.length;
  const end = (i + 1) / STAGES.length;
  const opacity = useTransform(progress, [start, start + 0.06, end - 0.06, end], [0.25, 1, 1, 0.25]);
  return (
    <motion.li
      style={{ opacity: reduce ? 1 : opacity }}
      className="border-t border-night-border py-6 first:border-t-0 first:pt-0"
    >
      <p className="label-mono text-signal">{s.k}</p>
      <p className="mt-2 font-display text-xl font-bold tracking-tight">{s.t}</p>
      <p className="mt-2 max-w-[44ch] text-sm leading-relaxed text-night-muted">{s.d}</p>
    </motion.li>
  );
}

function MotionStagePlate() {
  return (
    <div className="h-full w-full" aria-hidden>
      <svg viewBox="0 0 160 100" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
        {Array.from({ length: 10 }, (_, i) => (
          <rect
            key={i}
            x={12 + i * 14}
            y={38 - i * 2.2}
            width={9 - i * 0.55}
            height={24 + i * 4.4}
            fill={i % 5 === 2 ? "#3B5BDB" : i % 5 === 4 ? "#2B9D77" : "#F2EFE9"}
            fillOpacity={0.16 + i * 0.05}
          />
        ))}
        <rect x="12" y="20" width="52" height="3.4" fill="#E4572E" />
        <rect x="12" y="86" width="136" height="0.4" fill="#F2EFE9" fillOpacity="0.25" />
        {Array.from({ length: 5 }, (_, i) => (
          <circle
            key={`d${i}`}
            cx={118 + i * 7}
            cy="30"
            r="1.6"
            fill={i === 3 ? "#D9A13B" : "#F2EFE9"}
            fillOpacity={0.3 + i * 0.1}
          />
        ))}
        <rect x="118" y="46" width="30" height="0.4" fill="#F2EFE9" fillOpacity="0.3" />
        <rect x="118" y="52" width="22" height="0.4" fill="#F2EFE9" fillOpacity="0.2" />
      </svg>
    </div>
  );
}
