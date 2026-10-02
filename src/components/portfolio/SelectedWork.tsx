import { useRef } from "react";
import { Link } from "react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { projects } from "@/data/projects";
import { Reveal, SectionHeader, Shell } from "./primitives";

function WorkRow({ project, i }: { project: (typeof projects)[number]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const wide = i % 3 === 0;

  return (
    <article ref={ref} className="border-t border-hairline py-10 lg:py-16">
      <Link
        to={`/work/${project.slug}`}
        data-cursor="View case"
        className="group block"
      >
        <div
          className={`grid gap-6 lg:grid-cols-12 lg:items-end ${
            i % 2 === 1 ? "lg:[direction:rtl]" : ""
          }`}
        >
          <div className={`lg:[direction:ltr] ${wide ? "lg:col-span-8" : "lg:col-span-6"}`}>
            <div className="relative overflow-hidden bg-muted">
              <motion.img
                src={project.thumbnail}
                alt={`${project.title} — ${project.description}`}
                width={1400}
                height={1000}
                loading="lazy"
                style={{ y }}
                className="aspect-16/10 w-full scale-110 object-cover transition-[filter,transform] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.16]"
              />
              <span className="pointer-events-none absolute inset-0 bg-accent/0 transition-colors duration-700 group-hover:bg-accent/10" />
            </div>
          </div>
          <div
            className={`lg:[direction:ltr] ${wide ? "lg:col-span-4" : "lg:col-span-5 lg:col-start-8"}`}
          >
            <div className="flex items-baseline gap-4">
              <span className="label-mono text-accent">{project.index}</span>
              <span className="label-mono text-muted-foreground">{project.year}</span>
            </div>
            <h3 className="display-lg mt-3 text-[clamp(2rem,4.6vw,4rem)] uppercase leading-[0.9]">
              {project.title}
            </h3>
            <p className="mt-4 max-w-sm font-mono text-muted-foreground">{project.description}</p>
            <p className="label-mono mt-6 text-muted-foreground">{project.category}</p>
            <span className="label-mono mt-6 inline-flex items-center gap-2 text-foreground">
              <span className="link-underline">Read case study</span>
              <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

/**
 * The three projects, listed in the gap that already existed beside the
 * headline. On lg+ the list is placed inside that gap so the section's
 * original geometry — headline size, position and spacing — is untouched.
 */
function ProjectList() {
  return (
    <ul className="border-t border-hairline">
      {projects.map((p) => (
        <li key={p.id} className="border-b border-hairline">
          <Link
            to={`/work/${p.slug}`}
            data-cursor="View case"
            className="flex items-baseline gap-5 py-3"
          >
            <span className="label-mono text-accent">{p.index}</span>
            <div className="min-w-0">
              <h3 className="display-lg text-xl uppercase">{p.title}</h3>
              <p className="label-mono mt-1 text-muted-foreground">{p.category}</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function SelectedWork() {
  return (
    <section id="work" className="relative bg-paper py-24 sm:py-32">
      <Shell>
        <SectionHeader index="03" label="What I create" title="Selected work" />
        <div className="relative">
          <Reveal>
            <h2 className="display-xl mt-10 max-w-[14ch] text-[clamp(2.2rem,6vw,5.5rem)]">
              Three projects, three different problems.
            </h2>
          </Reveal>
          <Reveal
            delay={0.12}
            className="mt-10 lg:absolute lg:right-0 lg:top-0 lg:mt-0 lg:w-[40%]"
          >
            <ProjectList />
          </Reveal>
        </div>
        <div className="mt-16">
          {projects.map((p, i) => (
            <WorkRow key={p.id} project={p} i={i} />
          ))}
        </div>
      </Shell>
    </section>
  );
}
