import { Link } from "react-router";
import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { projects } from "@/data/projects";
import { ProjectArt } from "@/components/art";
import { Arrow } from "@/components/core";

/**
 * SELECTED WORK — editorial gallery. Each project is an individual story:
 * alternating asymmetric compositions, oversized index numerals, hover
 * metadata reveal, "VIEW CASE STUDY" cursor label.
 */
export function WorkGallery() {
  return (
    <section id="work" aria-label="Selected work" className="pb-24 md:pb-36">
      <div className="edge pb-14">
        <div className="flex items-end justify-between gap-6">
          <h2 className="display-lg">
            SELECTED
            <br />
            <span className="text-muted-foreground">WORK</span>
          </h2>
          <p className="label-mono max-w-[16ch] text-right text-muted-foreground">
            THREE STORIES, NOT A GRID
          </p>
        </div>
      </div>

      <div className="space-y-24 md:space-y-36">
        {projects.map((p, i) => (
          <ProjectRow key={p.id} p={p} flip={i % 2 === 1} />
        ))}
      </div>
    </section>
  );
}

function ProjectRow({ p, flip }: { p: (typeof projects)[number]; flip: boolean }) {
  const reduce = useReducedMotion();
  const [hover, setHover] = useState(false);

  return (
    <article className="edge">
      <Link
        to={`/work/${p.slug}`}
        data-cursor="VIEW CASE STUDY"
        className="group block"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onFocus={() => setHover(true)}
        onBlur={() => setHover(false)}
        aria-label={`${p.title} — ${p.description} View case study.`}
      >
        <div className={`grid items-end gap-8 md:grid-cols-12`}>
          {/* oversized number + meta */}
          <div className={`md:col-span-3 ${flip ? "md:order-2" : ""}`}>
            <RevealNumber n={p.number} />
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1], delay: 0.15 }}
              className="mt-6 space-y-3"
            >
              <p className="label-mono text-signal">{p.category}</p>
              <dl className="space-y-2 text-sm text-muted-foreground">
                <div className="flex justify-between gap-4 border-t border-border pt-2">
                  <dt>ROLE</dt>
                  <dd className="text-right">{p.role}</dd>
                </div>
                <div className="flex justify-between gap-4 border-t border-border pt-2">
                  <dt>YEAR</dt>
                  <dd className="text-right">{p.year}</dd>
                </div>
                <div className="flex justify-between gap-4 border-t border-border pt-2">
                  <dt>CATEGORY</dt>
                  <dd className="text-right">{p.category}</dd>
                </div>
              </dl>
            </motion.div>
          </div>

          {/* visual */}
          <div className={`md:col-span-6 ${flip ? "md:order-1" : ""}`}>
            <motion.div
              className="relative overflow-hidden"
              initial={{ clipPath: "inset(8% 4% 8% 4%)", opacity: 0 }}
              whileInView={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 1.1, ease: [0.19, 1, 0.22, 1] }}
            >
              <motion.div
                animate={reduce ? undefined : { scale: hover ? 1.04 : 1 }}
                transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
                className="aspect-[4/3]"
              >
                <ProjectArt
                  art={p.thumbArt}
                  spec={{ variant: p.id as "fleet" | "meds" | "studio", kind: "thumb" }}
                  seedSuffix={p.id}
                />
              </motion.div>
              {/* hover metadata plate */}
              <motion.div
                className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-4 bg-ink/90 px-5 py-4 text-paper"
                initial={false}
                animate={{ y: hover ? 0 : 101 }}
                transition={{ duration: 0.45, ease: [0.19, 1, 0.22, 1] }}
              >
                <span className="label-mono">{p.tools.slice(0, 3).join(" · ")}</span>
                <span className="flex items-center gap-2 label-mono text-signal-ink">
                  VIEW CASE STUDY <Arrow className="h-3.5 w-3.5" />
                </span>
              </motion.div>
            </motion.div>
          </div>

          {/* title block */}
          <div className={`md:col-span-3 ${flip ? "md:order-3" : ""}`}>
            <motion.h3
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1], delay: 0.1 }}
              className="display-md"
            >
              {p.title}
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1], delay: 0.18 }}
              className="mt-4 text-sm leading-relaxed text-muted-foreground"
            >
              {p.description}
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-6 inline-flex items-center gap-2 label-mono text-ink"
            >
              OPEN
              <motion.span animate={reduce || !hover ? undefined : { x: 4 }}>
                <Arrow className="h-3.5 w-3.5" />
              </motion.span>
            </motion.p>
          </div>
        </div>
      </Link>
    </article>
  );
}

function RevealNumber({ n }: { n: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.span
      aria-hidden
      initial={reduce ? undefined : { y: 60, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
      className="font-wide block text-7xl font-black leading-none tracking-tighter text-ink/15 md:text-8xl"
    >
      {n}
    </motion.span>
  );
}
