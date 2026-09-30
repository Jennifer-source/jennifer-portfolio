import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { site } from "@/data/site";
import { HeroArt } from "@/components/art";
import { ArrowDown } from "@/components/core";

/**
 * HERO — full-screen visual statement. Oversized stacked typography over a
 * generative "designer's world" plate, with parallax exit and a scroll hint.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yText = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -60]);
  const yArt = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 90]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  const line = (text: string, i: number) => (
    <span key={i} className="block overflow-hidden pb-[0.06em] -mb-[0.06em]">
      <motion.span
        className="block"
        initial={{ y: "110%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1.1, ease: [0.19, 1, 0.22, 1], delay: 0.25 + i * 0.09 }}
      >
        {text}
      </motion.span>
    </span>
  );

  return (
    <section ref={ref} aria-label="Introduction" className="relative flex min-h-[100svh] flex-col overflow-hidden">
      {/* generative world */}
      <motion.div style={{ y: yArt }} className="absolute inset-0">
        <HeroArt />
        <div className="absolute inset-0 grain opacity-60" />
      </motion.div>

      {/* top meta */}
      <div className="edge relative z-10 flex items-start justify-between pt-24">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="label-mono text-muted-foreground"
        >
          {site.name} — {site.role}
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="label-mono hidden text-muted-foreground sm:block"
        >
          PORTFOLIO / {site.year}
        </motion.p>
      </div>

      {/* headline */}
      <motion.div style={{ y: yText, opacity: fade }} className="edge relative z-10 mt-auto mb-auto pt-16">
        <h1 className="display-xl">
          {line("DESIGNING", 0)}
          {line("DIGITAL", 1)}
          {line("EXPERIENCES", 2)}
        </h1>
        <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
          {line2()}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
            className="max-w-md body-lg text-muted-foreground"
          >
            {site.positioning} <span className="text-ink">{site.subPositioning}</span>
          </motion.p>
        </div>
      </motion.div>

      {/* scroll hint */}
      <motion.div
        style={{ opacity: fade }}
        className="edge relative z-10 pb-8"
      >
        <motion.a
          href="#manifesto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="group inline-flex items-center gap-3 label-mono text-muted-foreground hover:text-ink"
          aria-label="Scroll to explore"
        >
          <motion.span
            animate={reduce ? undefined : { y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="inline-flex"
          >
            <ArrowDown className="h-4 w-4" />
          </motion.span>
          SCROLL TO EXPLORE
        </motion.a>
      </motion.div>
    </section>
  );
}

function line2() {
  return (
    <span className="block overflow-hidden pb-[0.06em] -mb-[0.06em]">
      <motion.span
        className="display-xl block text-signal"
        initial={{ y: "110%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1.1, ease: [0.19, 1, 0.22, 1], delay: 0.52 }}
      >
        THAT MOVE.
      </motion.span>
    </span>
  );
}
