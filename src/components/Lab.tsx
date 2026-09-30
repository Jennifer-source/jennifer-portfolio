import { motion } from "framer-motion";
import { experiments } from "@/data/site";
import { ExperimentArt } from "@/components/art";
import { Rule } from "@/components/core";

/**
 * LAB / 001 — where curiosity lives. Asymmetric grid, varied plate sizes,
 * hover activates the preview. Deliberately more experimental than the
 * case studies.
 */
export function ExperimentGrid() {
  return (
    <section id="lab" aria-label="Design experiments lab" className="pb-24 md:pb-36">
      <Rule index="03" label="LAB / 001 — EXPERIMENTS" />
      <div className="edge">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="display-md max-w-xl">
            WHAT HAPPENS WHEN I'M CURIOUS.
          </h2>
          <p className="label-mono max-w-[22ch] text-right text-muted-foreground">
            NOT PORTFOLIO PIECES — RESEARCH IN PUBLIC
          </p>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4 md:grid-rows-2">
          {experiments.map((x, i) => (
            <motion.article
              key={x.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1], delay: (i % 4) * 0.06 }}
              className={`group relative border border-border bg-paper ${
                x.tall ? "row-span-2" : ""
              } ${i === 2 ? "md:col-span-2" : ""}`}
            >
              <div className={`relative ${x.tall ? "aspect-[3/4]" : "aspect-square md:aspect-auto md:h-full md:min-h-[220px]"}`}>
                <motion.div
                  className="absolute inset-0"
                  initial={false}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                >
                  <ExperimentArt art={x.art} index={x.index} />
                </motion.div>
                <span className="absolute left-3 top-3 label-mono text-[9px] text-muted-foreground">
                  EXP/{x.index}
                </span>
              </div>
              <div className="border-t border-border p-4">
                <p className="font-display text-sm font-extrabold uppercase tracking-tight">{x.title}</p>
                <p className="mt-0.5 label-mono text-muted-foreground">{x.kind}</p>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-within:opacity-100">
                  {x.blurb}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
