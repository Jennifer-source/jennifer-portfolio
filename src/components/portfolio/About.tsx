import aboutImage from "@/assets/work-mobile.jpg";
import { Reveal, RevealWords, SectionHeader, Shell } from "./primitives";

const chapters = [
  {
    n: "01",
    t: "Where I started",
    b: "With posters, not products. I learned hierarchy by trying to make a single sheet of paper say one thing clearly — then discovered software rarely tries that hard.",
  },
  {
    n: "02",
    t: "What I learned",
    b: "That taste without evidence is guessing, and evidence without taste is a spreadsheet. The work I'm proud of holds both at once.",
  },
  {
    n: "03",
    t: "What I care about",
    b: "Interfaces that respect attention. Systems that outlive the person who drew them. Accessibility treated as craft rather than compliance.",
  },
  {
    n: "04",
    t: "What I'm exploring",
    b: "Generative tools as collaborators, motion as a hierarchy channel, and what an interface becomes when it no longer needs a screen.",
  },
];

export function About() {
  return (
    <section id="about" className="relative bg-paper py-24 sm:py-32">
      <Shell>
        <SectionHeader index="07" label="About" title="Curious by default" />
        <div className="mt-14 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="display-xl text-[clamp(2.4rem,8vw,7rem)]">
              <RevealWords text="Curious" />
              <br />
              <RevealWords text="by default." delay={0.12} />
            </h2>
            <Reveal delay={0.2}>
              <p className="mt-8 max-w-xl text-lg font-mono leading-relaxed">
                I'm Joseph Jennifer — a UI/UX designer and creative technologist who treats research,
                typography and code as one continuous material.
              </p>
            </Reveal>
            <div className="mt-14 grid gap-y-10 sm:grid-cols-2 sm:gap-x-10">
              {chapters.map((c, i) => (
                <Reveal key={c.n} delay={i * 0.07}>
                  <div className="border-t border-hairline pt-5">
                    <span className="label-mono text-accent">{c.n}</span>
                    <h3 className="display-lg mt-2 text-xl uppercase">{c.t}</h3>
                    <p className="mt-3 text-sm font-mono leading-relaxed text-muted-foreground">{c.b}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <Reveal>
              <figure className="sticky top-28">
                <div className="overflow-hidden bg-muted">
                  <img
                    src={aboutImage}
                    alt="Mobile interface study on a warm paper backdrop"
                    loading="lazy"
                    width={1400}
                    height={1000}
                    className="aspect-4/5 w-full object-cover"
                  />
                </div>
                <figcaption className="label-mono mt-3 text-muted-foreground">
                  Joseph Jennifer — Designer, Creative Technologist
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </Shell>
    </section>
  );
}
