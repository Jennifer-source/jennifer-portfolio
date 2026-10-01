import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import labImg from "@/assets/work-lab.jpg";
import { Reveal, SectionHeader, Shell } from "./primitives";

const sequences = [
  { n: "01", t: "State change", d: "An item leaves the queue and lands in history — no toast required." },
  { n: "02", t: "Spatial continuity", d: "A card expands into its own detail view, keeping the object identity." },
  { n: "03", t: "Typographic stress", d: "Weight responds to reading speed instead of blinking for attention." },
  { n: "04", t: "Loading as narration", d: "Progress explains what is being assembled, not merely that time passes." },
];

export function MotionShowcase() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.18, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.35, 0.8, 1], [0.15, 0.45, 0.45, 0.12]);

  return (
    <section
      ref={ref}
      data-tone="dark"
      className="grain-light relative overflow-hidden bg-void py-24 text-void-foreground sm:py-32"
    >
      <motion.img
        aria-hidden
        src={labImg}
        alt=""
        style={{ scale, opacity }}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      />
      <Shell className="relative">
        <SectionHeader index="05" label="Motion" title="Design in motion" invert />
        <h2 className="display-xl mt-14 text-[clamp(3rem,13vw,12rem)]">
          <span className="block">Design</span>
          <span className="block pl-[8vw] text-accent">in</span>
          <span className="block pl-[16vw]">Motion.</span>
        </h2>
        <div className="mt-20 grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="text-2xl leading-tight sm:text-3xl">
              Motion is not decoration.
              <br />
              <span className="text-white/55">It explains change.</span>
            </p>
          </Reveal>
          <div className="lg:col-span-6 lg:col-start-7">
            <ul className="border-t border-white/15">
              {sequences.map((s, i) => (
                <Reveal key={s.n} delay={i * 0.07}>
                  <li className="group flex items-start gap-6 border-b border-white/15 py-6">
                    <span className="label-mono text-accent">{s.n}</span>
                    <div className="min-w-0">
                      <p className="display-lg text-xl uppercase sm:text-2xl">{s.t}</p>
                      <p className="mt-2 text-sm body-editorial text-white/55">{s.d}</p>
                    </div>
                    <motion.span
                      aria-hidden
                      className="ml-auto mt-2 h-px w-10 shrink-0 bg-accent"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.2 + i * 0.07 }}
                      style={{ originX: 0 }}
                    />
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
