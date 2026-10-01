import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import heroPortrait from "@/assets/hero-portrait.jpg";
import { EASE, Shell } from "./primitives";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "14%"]);
  const typeY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-30%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const lines = ["Designing", "digital", "experiences", "that move."];

  return (
    <section
      ref={ref}
      className="grain relative min-h-[100svh] overflow-hidden bg-paper pt-28"
      aria-label="Introduction"
    >
      {/* fine grid lines */}
      <div aria-hidden className="grid-lines pointer-events-none absolute inset-0 opacity-60" />
      <Shell className="relative grid min-h-[calc(100svh-7rem)] grid-cols-1 items-end gap-8 pb-14 lg:grid-cols-12">
        <motion.div style={{ y: typeY }} className="relative z-10 lg:col-span-7">
          <motion.p
            className="label-mono mb-8 text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            01 — Who I am
          </motion.p>
          <h1 className="display-xl text-[clamp(2.4rem,7vw,7.2rem)]">
            {lines.map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.08em]">
                <motion.span
                  className="block"
                  initial={reduce ? { y: 0 } : { y: "108%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.15, delay: 0.15 + i * 0.09, ease: EASE }}
                >
                  {i === 3 ? (
                    <>
                      that <span className="text-accent">move.</span>
                    </>
                  ) : (
                    line
                  )}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p
            className="mt-9 max-w-md text-balance text-base leading-relaxed text-muted-foreground sm:text-lg"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 1, ease: EASE }}
          >
            I turn complex problems into experiences people want to explore — through research,
            systems, typography and motion.
          </motion.p>
        </motion.div>
        <div className="relative lg:col-span-5">
          <motion.div
            className="relative aspect-4/5 w-full overflow-hidden"
            initial={reduce ? { clipPath: "inset(0% 0 0 0)" } : { clipPath: "inset(100% 0 0 0)" }}
            animate={{ clipPath: "inset(0% 0 0 0)" }}
            transition={{ duration: 1.4, delay: 0.35, ease: EASE }}
          >
            <motion.img
              src={heroPortrait}
              alt="Illustrated portrait of the designer framing one eye with a hand"
              width={1200}
              height={1504}
              style={{ y: imgY }}
              className="h-[114%] w-full object-cover"
            />
          </motion.div>
          <span className="label-mono absolute -left-1 -top-6 text-muted-foreground lg:-left-8">
            Fig. 01 / Point of view
          </span>
        </div>
      </Shell>
      <motion.div
        style={{ opacity: fade }}
        className="pointer-events-none absolute inset-x-0 bottom-5 z-10"
      >
        <Shell className="flex items-end justify-between">
          <span className="label-mono text-muted-foreground">Scroll to explore ↓</span>
          <span className="label-mono hidden text-muted-foreground sm:block">
            UI/UX · Creative Technology
          </span>
        </Shell>
      </motion.div>
    </section>
  );
}
