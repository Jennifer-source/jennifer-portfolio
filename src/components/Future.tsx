import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { Reveal, Rule } from "@/components/core";
import { achievements } from "@/data/site";

/**
 * THE WORK BEYOND THE WORK — achievements structured for scholarship review.
 */
export function Achievements() {
  return (
    <section aria-label="Recognition and achievements" className="pb-24 md:pb-36">
      <Rule index="05" label="RECOGNITION" />
      <div className="edge">
        <Reveal>
          <h2 className="display-md max-w-3xl">
            THE WORK BEYOND THE WORK.
          </h2>
        </Reveal>
        <ul className="mt-12 border-t border-border">
          {achievements.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.04}>
              <li className="group grid gap-2 border-b border-border py-5 md:grid-cols-12 md:items-baseline">
                <span className="label-mono text-muted-foreground md:col-span-2">{a.label}</span>
                <span className="font-display text-lg font-bold tracking-tight md:col-span-6">
                  {a.title}
                </span>
                <span className="text-sm text-muted-foreground md:col-span-3">{a.note}</span>
                <span className="label-mono text-signal md:col-span-1 md:text-right">{a.year}</span>
              </li>
            </Reveal>
          ))}
        </ul>
        <Reveal>
          <p className="mt-6 label-mono text-muted-foreground">
            PLACEHOLDER STRUCTURE — REAL AWARDS, PUBLICATIONS AND LINKS SLOT IN HERE
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/**
 * WHAT COULD EXIST NEXT — emotional cinematic close. Sticky headline that
 * transforms as you scroll through it.
 */
export function Future() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const line1 = useTransform(scrollYProgress, [0, 0.35], ["0%", "-12%"]);
  const line2 = useTransform(scrollYProgress, [0.15, 0.5], ["0%", "-10%"]);
  const bg = useTransform(scrollYProgress, [0, 1], ["#1A1917", "#141311"]);
  const scale = useTransform(scrollYProgress, [0.6, 1], [1, reduce ? 1 : 1.06]);

  const lines = ["I'M NOT TRYING TO DESIGN", "WHAT ALREADY EXISTS."];
  const lines2 = ["I WANT TO EXPLORE", "WHAT COULD EXIST NEXT."];

  return (
    <section ref={ref} id="future" aria-label="What I want to change" className="relative bg-night text-night-fg">
      <motion.div style={{ background: bg }} className="grain">
        <div className="h-[160vh] md:h-[180vh]">
          <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
            <motion.div style={{ scale }} className="edge">
              <p className="label-mono text-signal">06 — WHAT I WANT TO CHANGE</p>
              <motion.h2 className="display-lg mt-6">
                <motion.span style={{ y: reduce ? 0 : line1 }} className="block">
                  {lines[0]}
                  <br />
                  {lines[1]}
                </motion.span>
                <motion.span style={{ y: reduce ? 0 : line2 }} className="mt-2 block text-amber">
                  {lines2[0]}
                  <br />
                  {lines2[1]}
                </motion.span>
              </motion.h2>
              <Reveal>
                <p className="mt-10 max-w-xl body-lg text-night-muted">
                  Ambition, not arrogance. Curiosity, not ego. I want to spend
                  the next decade learning how interfaces can explain
                  themselves — and bring that craft back to the people who need
                  it most.
                </p>
              </Reveal>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
