import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE, Reveal, SectionHeader, Shell } from "./primitives";

const stages = [
  {
    id: "observe",
    title: "Observe",
    question: "What is actually happening?",
    methods: ["Contextual interviews", "Field observation", "Competitive research"],
    output: ["Raw notes", "Patterns", "Opportunity areas"],
  },
  {
    id: "understand",
    title: "Understand",
    question: "Why does it happen this way?",
    methods: ["Affinity mapping", "Journey mapping", "Jobs-to-be-done framing"],
    output: ["Insight set", "Journey map", "Personas grounded in evidence"],
  },
  {
    id: "define",
    title: "Define",
    question: "What is the real problem worth solving?",
    methods: ["Problem statements", "How-might-we framing", "Prioritisation"],
    output: ["Design principles", "Scope", "Success criteria"],
  },
  {
    id: "explore",
    title: "Explore",
    question: "What else could this be?",
    methods: ["Sketching", "Divergent concepts", "Information architecture"],
    output: ["Concepts", "Wireframes", "Rejected directions, documented"],
  },
  {
    id: "test",
    title: "Test",
    question: "Where does it break?",
    methods: ["Usability testing", "Prototype walkthroughs", "Comparative tasks"],
    output: ["Findings", "Severity ranking", "Revised flows"],
  },
  {
    id: "refine",
    title: "Refine",
    question: "Is it consistent, accessible and buildable?",
    methods: ["Design system work", "Accessibility audit", "Developer handoff"],
    output: ["Component specs", "State documentation", "Shipped design"],
  },
];

export function HowIThink() {
  const [active, setActive] = useState(0);
  const stage = stages[active]!;

  return (
    <section id="process" className="relative bg-paper py-24 sm:py-32">
      <Shell>
        <SectionHeader index="04" label="How I solve problems" title="Process" />
        <div className="mt-14 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <h2 className="display-xl text-[clamp(2.2rem,5.6vw,5rem)]">
                A process,
                <br />
                not a<span className="text-accent"> ritual.</span>
              </h2>
              <p className="mt-6 max-w-sm body-editorial text-muted-foreground">
                These stages overlap, repeat and occasionally run backwards. Select one to see the
                question I ask, the methods I use, and what I hand over.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <ul className="border-t border-hairline">
              {stages.map((s, i) => (
                <li key={s.id} className="border-b border-hairline">
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-expanded={active === i}
                    className="group flex w-full items-center justify-between gap-6 py-5 text-left"
                  >
                    <span className="flex items-baseline gap-5">
                      <span
                        className={`label-mono ${active === i ? "text-accent" : "text-muted-foreground"}`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={`display-lg text-2xl uppercase transition-opacity sm:text-3xl ${
                          active === i ? "opacity-100" : "opacity-45 group-hover:opacity-80"
                        }`}
                      >
                        {s.title}
                      </span>
                    </span>
                    <span className="label-mono text-muted-foreground">{active === i ? "—" : "+"}</span>
                  </button>
                  <AnimatePresence initial={false}>
                    {active === i ? (
                      <motion.div
                        key="panel"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.55, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <div className="grid gap-8 pb-8 sm:grid-cols-3">
                          <p className="text-lg italic body-editorial sm:col-span-3">
                            “{stage.question}”
                          </p>
                          <div>
                            <p className="label-mono mb-3 text-muted-foreground">Methods</p>
                            <ul className="space-y-1.5 text-sm">
                              {stage.methods.map((m) => (
                                <li key={m}>{m}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <p className="label-mono mb-3 text-muted-foreground">Output</p>
                            <ul className="space-y-1.5 text-sm">
                              {stage.output.map((o) => (
                                <li key={o}>{o}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Shell>
    </section>
  );
}
