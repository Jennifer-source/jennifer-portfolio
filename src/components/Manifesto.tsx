import { motion, useReducedMotion } from "framer-motion";
import { Reveal, StaggerWords, Rule } from "@/components/core";
import { Arrow } from "@/components/core";

const STATEMENT = ["GOOD DESIGN", "IS NOT", "DECORATION."];
const STATEMENT2 = ["IT IS A", "DECISION."];

/**
 * MANIFESTO — magazine-spread statement with overlapping type, a short
 * philosophy paragraph, and three operating principles.
 */
export function Manifesto() {
  const reduce = useReducedMotion();
  return (
    <section id="manifesto" aria-label="Manifesto" className="relative">
      <Rule index="01" label="MANIFESTO" />

      <div className="edge grid gap-10 pb-24 md:pb-36 md:grid-cols-12">
        <div className="md:col-span-8">
          <h2 className="display-lg">
            {STATEMENT.map((w, i) => (
              <span key={i} className="block overflow-hidden pb-[0.06em] -mb-[0.06em]">
                <motion.span
                  className="block"
                  initial={reduce ? undefined : { y: "110%" }}
                  whileInView={reduce ? undefined : { y: "0%" }}
                  viewport={{ once: true, margin: "-10% 0px" }}
                  transition={{ duration: 1, ease: [0.19, 1, 0.22, 1], delay: i * 0.08 }}
                >
                  {w}
                </motion.span>
              </span>
            ))}
          </h2>
          <p className="display-lg font-narrow italic text-muted-foreground" style={{ fontVariationSettings: '"wdth" 74', fontStyle: "italic" }}>
            {STATEMENT2.map((w, i) => (
              <span key={i} className="block overflow-hidden pb-[0.06em] -mb-[0.06em]">
                <motion.span
                  className="block"
                  initial={reduce ? undefined : { y: "110%" }}
                  whileInView={reduce ? undefined : { y: "0%" }}
                  viewport={{ once: true, margin: "-10% 0px" }}
                  transition={{ duration: 1, ease: [0.19, 1, 0.22, 1], delay: 0.3 + i * 0.08 }}
                >
                  {w}
                </motion.span>
              </span>
            ))}
          </p>
        </div>

        <div className="md:col-span-4 md:pt-24">
          <Reveal delay={0.2}>
            <div className="rule pt-6">
              <p className="body-lg">
                I design the way editors write: cut until only the essential
                remains, then make that essential impossible to misunderstand.
              </p>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                Curiosity, observation, and systems thinking — applied to
                screens, stories, and the space between people and software.
                Accessibility isn't a checklist I keep; it's a constraint I
                design inside.
              </p>
            </div>
          </Reveal>
        </div>

        {/* overlapping metadata band */}
        <div className="relative md:col-span-12">
          <Reveal>
            <div className="mt-14 flex flex-wrap items-baseline gap-x-10 gap-y-4 border-t border-border pt-6">
              {["CURIOSITY", "OBSERVATION", "SYSTEMS", "STORYTELLING", "ACCESS"].map((w, i) => (
                <span
                  key={w}
                  className={`font-wide text-lg md:text-2xl font-extrabold tracking-tight ${
                    i === 0 ? "text-cobalt" : i === 2 ? "text-amber" : i === 4 ? "text-verdant" : "text-ink/85"
                  }`}
                >
                  {w}
                </span>
              ))}
              <span className="label-mono text-muted-foreground ml-auto">PRINCIPLES, NOT MOODBOARD WORDS</span>
            </div>
          </Reveal>
        </div>
      </div>

      <Rule index="02" label="SELECTED WORK — 2025 / 2026" />
    </section>
    );
}export function ManifestoQuote() {
  return (
    <Reveal className="edge pb-24 md:pb-36">
      <blockquote className="max-w-4xl">
        <p className="display-md font-narrow">
          “<StaggerWords text="Every screen is an argument about what deserves attention." />”
        </p>
        <footer className="mt-6 label-mono text-muted-foreground">
          — HOW I BRIEF MYSELF BEFORE EVERY PROJECT
        </footer>
      </blockquote>
      <div className="mt-16 flex items-center gap-4">
        <Arrow className="h-5 w-5 text-signal" />
        <span className="label-mono text-muted-foreground">SELECTED WORK FOLLOWS</span>
      </div>
    </Reveal>
  );
}
