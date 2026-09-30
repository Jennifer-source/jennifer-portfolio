import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { processStages } from "@/data/site";
import { Rule, EASE } from "@/components/core";

/**
 * HOW I THINK — six-stage interactive methodology. Each stage expands on
 * selection, showing the question I ask, methods used, and outputs created.
 * Built so a professor or committee can read the thinking, not just the work.
 */
export function Process() {
  const [openId, setOpenId] = useState<string>(processStages[0].id);

  return (
    <section id="process" aria-label="How I think — design process" className="pb-24 md:pb-36">
      <div className="edge pb-12">
        <p className="label-mono text-verdant">HOW I THINK</p>
        <h2 className="display-lg mt-4">
          A PROCESS YOU
          <br />
          CAN AUDIT.
        </h2>
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground">
          Six stages, each with the question I ask, the methods I use, and the
          outputs I create. Select a stage to open it.
        </p>
      </div>

      <ol className="border-t border-border">
        {processStages.map((s) => {
          const open = openId === s.id;
          return (
            <li key={s.id} className="border-b border-border">
              <button
                type="button"
                aria-expanded={open}
                onClick={() => setOpenId(open ? "" : s.id)}
                className="group flex w-full items-center gap-5 px-[var(--gutter)] py-6 text-left transition-colors hover:bg-secondary/60 md:py-7"
              >
                <span className="label-mono text-muted-foreground">{s.index}</span>
                <motion.span
                  animate={{ rotate: open ? 45 : 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-colors ${
                    open ? "border-signal bg-signal text-signal-ink" : "border-border text-ink"
                  }`}
                >
                  <svg viewBox="0 0 12 12" className="h-3 w-3" aria-hidden>
                    <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.4" />
                  </svg>
                </motion.span>
                <span className="font-display text-2xl font-extrabold uppercase tracking-tight md:text-4xl">
                  {s.title}
                </span>
                <span className="ml-auto hidden max-w-[24ch] text-right text-xs leading-snug text-muted-foreground md:block">
                  {s.question}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    key="panel"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <div className="grid gap-8 border-t border-border/70 bg-secondary/40 px-[var(--gutter)] py-8 md:grid-cols-3 md:py-10">
                      <div>
                        <p className="body-lg font-medium leading-snug">{s.question}</p>
                        <p className="mt-4 max-w-[40ch] text-sm leading-relaxed text-muted-foreground">{s.blurb}</p>
                      </div>
                      <div>
                        <p className="label-mono text-muted-foreground">METHODS I USE</p>
                        <ul className="mt-3 space-y-2 text-sm">
                          {s.methods.map((m) => (
                            <li key={m} className="border-t border-border pt-2 first:border-0 first:pt-0">
                              {m}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="label-mono text-muted-foreground">OUTPUT I CREATE</p>
                        <ul className="mt-3 space-y-2 text-sm">
                          {s.outputs.map((o) => (
                            <li key={o} className="border-t border-border pt-2 first:border-0 first:pt-0">
                              {o}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
