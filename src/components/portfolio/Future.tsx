import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { RevealWords, SectionHeader, Shell } from "./primitives";

export function Future() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const line = useTransform(scrollYProgress, [0.1, 0.6], [0, 1]);
  const shift = useTransform(scrollYProgress, [0, 1], reduce ? ["0vw", "0vw"] : ["6vw", "-6vw"]);

  return (
    <section
      ref={ref}
      data-tone="dark"
      className="grain-light relative overflow-hidden bg-void py-28 text-void-foreground sm:py-40"
    >
      <Shell className="relative">
        <SectionHeader index="10" label="What I want to change" title="Future" invert />
        <h2 className="display-xl mt-16 text-[clamp(2.2rem,7.4vw,7rem)]">
          <span className="block">
            <RevealWords text="I'm not trying" />
          </span>
          <span className="block">
            <RevealWords text="to design" delay={0.1} />
          </span>
          <span className="block text-white/40">
            <RevealWords text="what already exists." delay={0.2} />
          </span>
        </h2>
        <motion.div
          aria-hidden
          style={{ scaleX: line, originX: 0 }}
          className="my-12 h-px w-full bg-accent"
        />
        <motion.h3 style={{ x: shift }} className="display-xl text-[clamp(2.2rem,7.4vw,7rem)]">
          <span className="block">
            <RevealWords text="I want to explore" />
          </span>
          <span className="block text-accent">
            <RevealWords text="what could exist next." delay={0.1} />
          </span>
        </motion.h3>
      </Shell>
    </section>
  );
}
