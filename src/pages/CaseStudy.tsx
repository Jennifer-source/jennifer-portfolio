import { Link, useParams } from "react-router";
import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect } from "react";
import { getProject, projects } from "@/data/projects";
import { Cursor } from "@/components/portfolio/Cursor";
import { Footer } from "@/components/portfolio/Footer";
import { BelongCaseStudy } from "@/components/portfolio/BelongCaseStudy";
import { QuietInterfaceCaseStudy } from "@/components/portfolio/QuietInterfaceCaseStudy";
import { HandsOfGraceCaseStudy } from "@/components/portfolio/HandsOfGraceCaseStudy";
import {
  Reveal,
  RevealWords,
  SectionHeader,
  Shell,
} from "@/components/portfolio/primitives";

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-t border-hairline pt-3">
      <p className="label-mono text-muted-foreground">{label}</p>
      <p className="mt-1.5 text-sm font-mono leading-relaxed">{value}</p>
    </div>
  );
}

export default function CaseStudy() {
  const { slug } = useParams();
  const project = getProject(slug ?? "");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="max-w-md text-center">
          <h1 className="display-xl text-7xl">404</h1>
          <p className="mt-4 text-sm font-mono text-muted-foreground">
            The case study you're looking for doesn't exist or has been moved.
          </p>
          <Link to="/" className="label-mono link-underline mt-6 inline-block">
            ← Go home
          </Link>
        </div>
      </div>
    );
  }

  const next =
    projects[(projects.findIndex((p) => p.id === project.id) + 1) % projects.length]!;

  if (project.id === "belong") return <BelongCaseStudy project={project} next={next} />;
  if (project.id === "quiet") return <QuietInterfaceCaseStudy project={project} next={next} />;
  if (project.id === "grace") return <HandsOfGraceCaseStudy project={project} next={next} />;

  return <GenericCaseStudy projectId={project.id} />;
}

function GenericCaseStudy({ projectId }: { projectId: string }) {
  const project = getProjectById(projectId);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  const next =
    projects[(projects.findIndex((p) => p.id === project.id) + 1) % projects.length]!;

  return (
    <>
      <Cursor />
      <motion.div
        aria-hidden
        style={{ scaleX: progress, originX: 0 }}
        className="fixed inset-x-0 top-0 z-50 h-0.5 bg-accent"
      />
      <header className="fixed inset-x-0 top-0 z-40">
        <Shell className="flex items-center justify-between py-5">
          <Link to="/" className="label-mono link-underline">
            ← Index
          </Link>
          <span className="label-mono text-muted-foreground">
            {project.index} / {project.year}
          </span>
        </Shell>
      </header>
      <main>
        {/* HERO */}
        <section className="grain bg-paper pb-16 pt-28">
          <Shell>
            <p className="label-mono text-accent">{project.category}</p>
            <h1 className="display-xl mt-6 text-[clamp(2.6rem,10vw,10rem)]">
              <RevealWords text={project.title} />
            </h1>
            <p className="mt-8 max-w-2xl text-xl font-mono leading-snug sm:text-2xl">{project.positioning}</p>
          </Shell>
          <div className="mt-12 overflow-hidden">
            <motion.img
              src={project.heroImage}
              alt={`${project.title} hero visual`}
              width={1400}
              height={1000}
              className="h-[42vh] w-full object-cover sm:h-[68vh]"
              initial={{ scale: 1.12 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        </section>

        {/* OVERVIEW */}
        <section className="bg-paper py-20">
          <Shell>
            <SectionHeader index="01" label="Overview" title="Context" />
            <div className="mt-10 grid gap-12 lg:grid-cols-12">
              <Reveal className="lg:col-span-7">
                <h2 className="display-lg text-2xl uppercase">The challenge</h2>
                <p className="mt-4 text-lg font-mono leading-relaxed">{project.challenge}</p>
                <h2 className="display-lg mt-10 text-2xl uppercase">The context</h2>
                <p className="mt-4 font-mono leading-relaxed text-muted-foreground">{project.context}</p>
              </Reveal>
              <div className="grid gap-6 self-start lg:col-span-4 lg:col-start-9">
                <Meta label="My role" value={project.role} />
                <Meta label="Timeline" value={project.timeline} />
                <Meta label="Team" value={project.team} />
                <Meta label="Tools" value={project.tools.join(" · ")} />
              </div>
            </div>
          </Shell>
        </section>

        {/* RESEARCH */}
        <section className="bg-paper pb-20">
          <Shell>
            <SectionHeader index="02" label="Research" title="Methods" />
            <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {project.research.map((r, i) => (
                <Reveal key={r.method} delay={i * 0.06}>
                  <div className="h-full border border-hairline p-5">
                    <p className="label-mono text-accent">{String(i + 1).padStart(2, "0")}</p>
                    <h3 className="display-lg mt-3 text-lg">{r.method}</h3>
                    <p className="mt-2 text-sm font-mono text-muted-foreground">{r.detail}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Shell>
        </section>

        {/* INSIGHTS */}
        <section data-tone="dark" className="grain-light bg-void py-24 text-void-foreground">
          <Shell>
            <SectionHeader index="03" label="Insights" title="What I discovered" invert />
            <div className="mt-12 divide-y divide-white/15 border-y border-white/15">
              {project.insights.map((ins) => (
                <Reveal key={ins.n}>
                  <div className="grid gap-4 py-10 lg:grid-cols-12">
                    <span className="label-mono text-accent lg:col-span-1">{ins.n}</span>
                    <h3 className="display-lg text-[clamp(1.5rem,3.4vw,2.6rem)] lg:col-span-6">
                      {ins.title}
                    </h3>
                    <p className="text-white/60 lg:col-span-4 lg:col-start-9">{ins.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Shell>
        </section>

        {/* DEFINE */}
        <section className="bg-paper py-20">
          <Shell>
            <SectionHeader index="04" label="Define" title="Framing" />
            <div className="mt-10 grid gap-12 lg:grid-cols-12">
              <Reveal className="lg:col-span-6">
                <h2 className="display-lg text-2xl uppercase">How might we</h2>
                <ul className="mt-6 space-y-5">
                  {project.hmw.map((h) => (
                    <li key={h} className="border-l-2 border-accent pl-5 text-lg font-mono leading-snug">
                      {h}
                    </li>
                  ))}
                </ul>
              </Reveal>
              <div className="lg:col-span-5 lg:col-start-8">
                <h2 className="display-lg text-2xl uppercase">Design principles</h2>
                <ul className="mt-6 border-t border-hairline">
                  {project.principles.map((p, i) => (
                    <Reveal key={p.title} delay={i * 0.05}>
                      <li className="border-b border-hairline py-4">
                        <p className="display-lg text-lg">{p.title}</p>
                        <p className="mt-1 text-sm font-mono text-muted-foreground">{p.body}</p>
                      </li>
                    </Reveal>
                  ))}
                </ul>
              </div>
            </div>
          </Shell>
        </section>

        {/* IDEATION */}
        <section className="bg-paper pb-20">
          <Shell>
            <SectionHeader index="05" label="Ideation" title="Including what failed" />
            <div className="mt-10 space-y-px">
              {project.process.map((step, i) => (
                <Reveal key={step.title} delay={i * 0.05}>
                  <div className="grid gap-6 border-t border-hairline py-8 lg:grid-cols-12">
                    <span className="label-mono text-muted-foreground lg:col-span-1">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="lg:col-span-5">
                      <h3 className="display-lg text-xl">{step.title}</h3>
                      <p className="mt-2 text-sm font-mono text-muted-foreground">{step.caption}</p>
                    </div>
                    <p className="font-mono leading-relaxed lg:col-span-5 lg:col-start-8">{step.learned}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Shell>
        </section>

        {/* DESIGN SYSTEM */}
        <section className="bg-paper pb-20">
          <Shell>
            <SectionHeader index="06" label="Design system" title="Rules that scale" />
            <div className="mt-10 grid gap-px border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-3">
              {project.designSystem.map((d) => (
                <div key={d.label} className="bg-paper p-6">
                  <p className="label-mono text-accent">{d.label}</p>
                  <p className="mt-3 font-mono leading-relaxed">{d.value}</p>
                </div>
              ))}
            </div>
          </Shell>
        </section>

        {/* FINAL */}
        <section data-tone="dark" className="grain-light bg-void py-24 text-void-foreground">
          <Shell>
            <SectionHeader index="07" label="Final experience" title="The build" invert />
            <div className="mt-12 space-y-16">
              {project.finalScreens.map((s, i) => (
                <Reveal key={s.title} delay={i * 0.05}>
                  <figure className="grid gap-6 lg:grid-cols-12 lg:items-end">
                    <div className={`lg:col-span-8 ${i % 2 ? "lg:order-2 lg:col-start-5" : ""}`}>
                      <div className="overflow-hidden border border-white/10">
                        <img
                          src={project.heroImage}
                          alt={`${project.title} — ${s.title}`}
                          loading="lazy"
                          width={1400}
                          height={1000}
                          className="aspect-16/10 w-full object-cover"
                        />
                      </div>
                    </div>
                    <figcaption className="lg:col-span-3">
                      <p className="label-mono text-accent">{String(i + 1).padStart(2, "0")}</p>
                      <h3 className="display-lg mt-2 text-xl uppercase">{s.title}</h3>
                      <p className="mt-2 text-sm font-mono text-white/60">{s.caption}</p>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </Shell>
        </section>

        {/* OUTCOME */}
        <section className="bg-paper py-20">
          <Shell>
            <SectionHeader index="08" label="Outcome" title="Honest reporting" />
            <div className="mt-10 grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <ul className="border-t border-hairline">
                  {project.outcome.map((o) => (
                    <Reveal key={o.label}>
                      <li className="border-b border-hairline py-6">
                        <p className="label-mono text-accent">{o.label}</p>
                        <p className="mt-2 text-lg font-mono leading-relaxed">{o.body}</p>
                      </li>
                    </Reveal>
                  ))}
                </ul>
              </div>
              <Reveal className="lg:col-span-4 lg:col-start-9">
                <blockquote className="border-l-2 border-accent pl-5 text-lg italic font-mono leading-snug">
                  {project.reflection}
                </blockquote>
                <div className="mt-8 space-y-6">
                  <div>
                    <p className="label-mono text-muted-foreground">Limitations</p>
                    <p className="mt-2 text-sm font-mono leading-relaxed">{project.limitations}</p>
                  </div>
                  <div>
                    <p className="label-mono text-muted-foreground">Next steps</p>
                    <p className="mt-2 text-sm font-mono leading-relaxed">{project.nextSteps}</p>
                  </div>
                </div>
              </Reveal>
            </div>
          </Shell>
        </section>

        {/* NEXT */}
        <section className="bg-paper pb-24">
          <Shell>
            <Link
              to={`/work/${next.slug}`}
              data-cursor="Next"
              className="group block border-t border-hairline pt-8"
            >
              <span className="label-mono text-muted-foreground">Next case study</span>
              <span className="display-xl mt-3 block text-[clamp(2.2rem,8vw,7rem)] transition-colors group-hover:text-accent">
                {next.title} →
              </span>
            </Link>
          </Shell>
        </section>
      </main>
      <Footer />
    </>
  );
}

function getProjectById(id: string) {
  return projects.find((p) => p.id === id)!;
}
