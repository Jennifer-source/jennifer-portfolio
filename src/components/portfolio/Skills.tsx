import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal, SectionHeader, Shell } from "./primitives";

const groups = [
  {
    title: "Thinking",
    items: [
      ["UX Research", "Interviews, diary studies, usability testing, synthesis."],
      ["Information Architecture", "Structuring content so navigation feels obvious."],
      ["Interaction Design", "Designing the verbs, not only the surfaces."],
      ["Systems Thinking", "Designing rules that keep holding at scale."],
    ],
  },
  {
    title: "Designing",
    items: [
      ["UI Design", "Grid, type, contrast, state — down to the pixel."],
      ["Visual Design", "Editorial composition and art direction."],
      ["Design Systems", "Tokens, components, documentation, governance."],
      ["Prototyping", "From paper to production-fidelity interaction."],
    ],
  },
  {
    title: "Making",
    items: [
      ["Figma", "Auto-layout, variables, component APIs."],
      ["Framer / Protopie", "High-fidelity interaction prototypes."],
      ["React + TypeScript", "Building the thing, not only the mockup."],
      ["Motion Design", "After Effects, Motion, scroll-driven sequences."],
      ["Creative Coding", "Canvas, WebGL, generative systems."],
    ],
  },
  {
    title: "Exploring",
    items: [
      ["AI + Design", "Where generative tools help — and where they flatten."],
      ["Generative Design", "Rule-based visual systems."],
      ["Future Interfaces", "Spatial, ambient and screenless interaction."],
    ],
  },
] as const;

export function Skills() {
  const [hover, setHover] = useState<string | null>(null);

  return (
    <section className="relative bg-paper pb-24 sm:pb-32">
      <Shell>
        <SectionHeader index="08" label="Toolkit" title="How I work" />
        <Reveal>
          <h2 className="display-xl mt-10 max-w-[16ch] text-[clamp(2rem,5vw,4.5rem)]">
            A toolkit, not a scoreboard.
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-10 md:grid-cols-2 xl:grid-cols-4">
          {groups.map((g, gi) => (
            <Reveal key={g.title} delay={gi * 0.06}>
              <div className="border-t border-hairline pt-5">
                <h3 className="label-mono mb-5 text-accent">{g.title}</h3>
                <ul className="space-y-3">
                  {g.items.map(([name, desc]) => (
                    <li
                      key={name}
                      onMouseEnter={() => setHover(name)}
                      onMouseLeave={() => setHover(null)}
                      onFocus={() => setHover(name)}
                      onBlur={() => setHover(null)}
                      tabIndex={0}
                      className="cursor-default outline-none"
                    >
                      <span className="display-lg text-lg">{name}</span>
                      <AnimatePresence initial={false}>
                        {hover === name ? (
                          <motion.p
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden text-sm text-muted-foreground"
                          >
                            <span className="block pt-1">{desc}</span>
                          </motion.p>
                        ) : null}
                      </AnimatePresence>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Shell>
    </section>
  );
}
