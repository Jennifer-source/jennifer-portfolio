import { motion } from "framer-motion";
import typoImg from "@/assets/work-typo.jpg";
import labImg from "@/assets/work-lab.jpg";
import fleetImg from "@/assets/work-fleetops.jpg";
import { Reveal, SectionHeader, Shell } from "./primitives";

type Item = {
  n: string;
  title: string;
  tag: string;
  span: string;
  img?: string;
  note?: string;
};

const items: Item[] = [
  { n: "001", title: "Weight as voice", tag: "Variable type", span: "lg:col-span-7 lg:row-span-2", img: typoImg },
  { n: "002", title: "Point field", tag: "Creative coding", span: "lg:col-span-5", img: labImg },
  { n: "003", title: "Grid violations", tag: "Poster series", span: "lg:col-span-5", note: "Twelve posters that each break exactly one grid rule." },
  { n: "004", title: "Interface autopsy", tag: "UI teardown", span: "lg:col-span-4", note: "Weekly dissection of one interface decision I disagree with." },
  { n: "005", title: "Latency studies", tag: "Micro-interaction", span: "lg:col-span-4", img: fleetImg },
  { n: "006", title: "Prompt → surface", tag: "AI + design", span: "lg:col-span-4", note: "Testing where generative tools help and where they flatten judgement." },
];

export function Lab() {
  return (
    <section id="lab" className="relative bg-paper py-24 sm:py-32">
      <Shell>
        <SectionHeader index="06" label="Experiments" title="Lab / 001" />
        <div className="mt-12 flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <h2 className="display-xl text-[clamp(2.2rem,7vw,6rem)]">
              Lab <span className="text-accent">/ 001</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-xs text-muted-foreground">
              Here is what happens when I am curious and nobody has asked me for anything.
            </p>
          </Reveal>
        </div>
        <div className="mt-14 grid auto-rows-[minmax(180px,auto)] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12">
          {items.map((it, i) => (
            <motion.article
              key={it.n}
              data-cursor="Peek"
              className={`group relative overflow-hidden border border-hairline bg-card ${it.span}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.8, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              {it.img ? (
                <img
                  src={it.img}
                  alt={it.title}
                  loading="lazy"
                  width={1400}
                  height={1000}
                  className="absolute inset-0 h-full w-full object-cover opacity-90 transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                />
              ) : null}
              <div
                className={`relative flex h-full min-h-44 flex-col justify-between p-5 ${
                  it.img ? "bg-gradient-to-t from-black/70 via-black/10 to-transparent text-white" : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="label-mono opacity-70">{it.n}</span>
                  <span className="label-mono opacity-70">{it.tag}</span>
                </div>
                <div>
                  <h3 className="display-lg text-xl uppercase sm:text-2xl">{it.title}</h3>
                  {it.note ? (
                    <p className="mt-2 max-w-[40ch] text-sm body-editorial text-muted-foreground">{it.note}</p>
                  ) : null}
                  <span className="label-mono mt-4 block translate-y-2 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    In progress →
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </Shell>
    </section>
  );
}
