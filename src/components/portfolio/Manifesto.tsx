import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal, RevealWords, SectionHeader, Shell } from "./primitives";

const beliefs = [
  { n: "01", t: "Curiosity", b: "Every project starts with a question I can't answer yet." },
  { n: "02", t: "Observation", b: "What people do is more honest than what they say they do." },
  { n: "03", t: "Systems", b: "A screen is an instance. A system is a decision that scales." },
  { n: "04", t: "Access", b: "If it excludes someone, it is unfinished — not minimal." },
];

export function Manifesto() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const drift = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);

  return (
    <section ref={ref} id="manifesto" className="relative bg-paper py-24 sm:py-32">
      <Shell>
        <SectionHeader index="02" label="How I think" title="Manifesto" />
        <div className="relative mt-16">
          <motion.span
            aria-hidden
            style={{ y: drift }}
            className="pointer-events-none absolute -top-10 right-0 select-none font-mono text-[18vw] leading-none text-accent/10"
          >
            ✳
          </motion.span>
          <h2 className="display-xl relative z-10 max-w-[16ch] text-[clamp(2.4rem,7.6vw,7.5rem)]">
            <RevealWords text="Good design is not decoration." />
            <span className="block text-accent">
              <RevealWords text="It is a decision." delay={0.25} />
            </span>
          </h2>
        </div>
        <div className="mt-20 grid gap-x-10 gap-y-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-5 lg:col-start-1">
            <p className="text-lg leading-relaxed sm:text-xl">
              I design the reasoning first and the interface second. Research is not a phase I
              perform before the real work — it is what makes the real work defensible.
            </p>
            <p className="mt-6 max-w-prose leading-relaxed text-muted-foreground">
              I care about the moment a person understands something they didn't understand a second
              ago. Typography, hierarchy, motion and restraint are the instruments I use to engineer
              that moment — and I'd rather remove a feature than decorate a confusion.
            </p>
          </Reveal>
          <div className="lg:col-span-6 lg:col-start-7">
            <ul className="divide-y divide-hairline border-y border-hairline">
              {beliefs.map((b, i) => (
                <Reveal key={b.n} delay={i * 0.08}>
                  <li className="group grid grid-cols-[auto_1fr] gap-6 py-6 sm:grid-cols-[3rem_10rem_1fr]">
                    <span className="label-mono pt-1 text-accent">{b.n}</span>
                    <span className="display-lg text-2xl">{b.t}</span>
                    <span className="col-span-2 text-muted-foreground sm:col-span-1">{b.b}</span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </Shell>
    </section>
  );
}
