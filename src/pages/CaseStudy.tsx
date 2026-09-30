import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router";
import { motion, useScroll, useTransform, useReducedMotion, AnimatePresence } from "framer-motion";
import { getProject, projects } from "@/data/projects";
import { ProjectArt, HeroArt } from "@/components/art";
import { Reveal, Rule, Arrow, ArrowDown, MetaRow, EASE } from "@/components/core";
import { Cursor } from "@/components/Cursor";
import { Footer } from "@/components/Contact";

/**
 * CASE STUDY — professionally documented design process. Structure:
 * overview → problem → research → define → ideation (with rejected work) →
 * design system → final experience → honest outcome → reflection → next.
 * Dark generative hero, sticky project index, scroll-driven screens.
 */
export default function CaseStudy() {
  const { slug } = useParams();
  const project = getProject(slug ?? "");
  const [dark, setDark] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 edge text-center">
        <p className="display-md">CASE STUDY NOT FOUND.</p>
        <Link to="/" className="label-mono text-signal link-underline">
          ← BACK TO HOME
        </Link>
      </div>
    );
  }

  const idx = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(idx + 1) % projects.length];

  return (
    <div className="min-h-screen bg-paper text-ink">
      <Cursor />

      {/* minimal case-study header */}
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
        className="fixed inset-x-0 top-4 z-50 edge"
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-night-border bg-night/70 px-5 py-2.5 text-night-fg backdrop-blur-md">
          <Link to="/" className="label-mono flex items-center gap-2">
            ← ALL WORK
          </Link>
          <span className="label-mono text-night-muted">
            {project.number} — {project.title}
          </span>
          <a href="#overview" className="label-mono hidden sm:inline text-signal">
            OVERVIEW ↓
          </a>
        </div>
      </motion.header>

      <main>
        <CaseHero project={project} />
        <Overview project={project} />
        <Problem project={project} />
        <Research project={project} />
        <Define project={project} />
        <Ideation project={project} />
        <SystemSection project={project} />
        <FinalExperience project={project} />
        <Outcome project={project} />
        <Reflection project={project} />
        <NextProject project={next} />
      </main>
      <Footer />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* HERO                                                                */
/* ------------------------------------------------------------------ */

function CaseHero({ project }: { project: (typeof projects)[number] }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yArt = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 110]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);

  return (
    <section ref={ref} aria-label={`${project.title} hero`} className="relative flex min-h-[92svh] flex-col bg-night text-night-fg">
      <motion.div style={{ y: yArt }} className="absolute inset-0 opacity-40">
        <HeroArt />
        <div className="grain absolute inset-0" aria-hidden />
      </motion.div>
      <motion.div style={{ opacity: fade }} className="edge relative z-10 mt-auto mb-auto pt-28">
        <p className="label-mono text-signal">
          CASE STUDY {project.number} — {project.category} — {project.year}
        </p>
        <h1 className="display-xl mt-6">{project.title}</h1>
        <p className="mt-8 max-w-2xl body-lg text-night-muted">{project.description}</p>
        <div className="mt-10">
          <MetaRow
            dark
            items={[
              { k: "ROLE", v: project.role },
              { k: "TIMELINE", v: project.timeline },
              { k: "TOOLS", v: project.tools.join(", ") },
              { k: "TEAM", v: project.team },
            ]}
          />
        </div>
      </motion.div>
      <motion.div style={{ opacity: fade }} className="edge relative z-10 pb-8">
        <a href="#overview" className="label-mono flex items-center gap-3 text-night-muted hover:text-night-fg">
          <motion.span animate={reduce ? undefined : { y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
            <ArrowDown className="h-4 w-4" />
          </motion.span>
          SCROLL — {project.timeline}
        </a>
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* OVERVIEW                                                            */
/* ------------------------------------------------------------------ */

function Overview({ project }: { project: (typeof projects)[number] }) {
  return (
    <section id="overview" aria-label="Project overview" className="py-24 md:py-36">
      <Rule index="00" label="OVERVIEW" />
      <div className="edge grid gap-10 pt-6 md:grid-cols-12">
        <div className="md:col-span-4">
          <Reveal>
            <p className="body-lg">{project.overview}</p>
          </Reveal>
        </div>
        <div className="md:col-span-8 md:pt-16">
          <Reveal delay={0.1}>
            <div className="relative aspect-[16/9] overflow-hidden border border-border">
              <ProjectArt
                art={project.heroArt}
                spec={{ variant: project.id as "fleet" | "meds" | "studio", kind: "hero" }}
                seedSuffix="hero"
              />
            </div>
            <p className="mt-3 label-mono text-muted-foreground">
              FIG. 01 — {project.title} hero composition (placeholder artwork; swap with real screens)
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* THE PROBLEM                                                         */
/* ------------------------------------------------------------------ */

function Problem({ project }: { project: (typeof projects)[number] }) {
  const c = project.challenge;
  return (
    <section aria-label="The problem" className="bg-night py-24 text-night-fg md:py-36">
      <div className="grain absolute inset-0" aria-hidden />
      <Rule index="01" label="THE PROBLEM" dark />
      <div className="edge relative grid gap-14 md:grid-cols-12">
        <div className="md:col-span-7">
          <Reveal>
            <h2 className="display-md">{c.problem}</h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-8 max-w-xl text-sm leading-relaxed text-night-muted">{c.context}</p>
          </Reveal>
        </div>
        <div className="md:col-span-5">
          <div className="space-y-0 border-t border-night-border">
            {c.stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08}>
                <div className="border-b border-night-border py-5">
                  <p className="font-wide text-4xl font-black tracking-tight md:text-5xl">
                    {s.value}
                  </p>
                  <p className="mt-1 text-sm">{s.label}</p>
                  <p className="mt-1 label-mono text-night-muted">{s.note}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <div className="md:col-span-10 md:col-start-2">
          <Reveal>
            <blockquote className="border-l-2 border-signal pl-6 md:pl-10">
              <p className="display-md font-narrow">“{c.quote}”</p>
            </blockquote>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* RESEARCH — WHAT I DISCOVERED                                        */
/* ------------------------------------------------------------------ */

function Research({ project }: { project: (typeof projects)[number] }) {
  return (
    <section aria-label="Research" className="py-24 md:py-36">
      <Rule index="02" label="RESEARCH" />
      <div className="edge grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <Reveal>
            <h2 className="display-md">WHAT I DID.</h2>
          </Reveal>
          <ul className="mt-8 border-t border-border">
            {project.research.approaches.map((a, i) => (
              <Reveal key={a.name} delay={i * 0.05}>
                <li className="border-b border-border py-4">
                  <p className="font-display font-bold tracking-tight">{a.name}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{a.detail}</p>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
        <div className="md:col-span-7">
          <Reveal>
            <h3 className="label-mono text-signal">WHAT I DISCOVERED</h3>
          </Reveal>
          <div className="mt-6 space-y-0 border-t border-border">
            {project.research.insights.map((ins, i) => (
              <Reveal key={ins.title} delay={i * 0.06}>
                <div className="grid gap-4 border-b border-border py-7 md:grid-cols-[4rem_1fr]">
                  <span className="font-wide text-3xl font-black text-ink/20">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h4 className="font-display text-xl font-bold leading-snug tracking-tight md:text-2xl">
                      {ins.title}
                    </h4>
                    <p className="mt-3 max-w-[56ch] text-sm leading-relaxed text-muted-foreground">{ins.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* DEFINE                                                              */
/* ------------------------------------------------------------------ */

function Define({ project }: { project: (typeof projects)[number] }) {
  return (
    <section aria-label="Define" className="bg-paper-deep py-24 md:py-36">
      <Rule index="03" label="DEFINE" />
      <div className="edge space-y-16">
        <Reveal>
          <div className="max-w-4xl">
            <h2 className="label-mono text-signal">PROBLEM STATEMENT</h2>
            <p className="mt-4 display-md font-narrow" style={{ textTransform: "none" }}>{project.define.statement}</p>
          </div>
        </Reveal>

        <div className="grid gap-12 md:grid-cols-2">
          <Reveal>
            <div>
              <h3 className="label-mono text-muted-foreground">HOW MIGHT WE</h3>
              <ul className="mt-4 border-t border-border">
                {project.define.hmws.map((h) => (
                  <li key={h} className="border-b border-border py-4 text-sm leading-relaxed">
                    <span className="text-signal">→</span> {h}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div>
              <h3 className="label-mono text-muted-foreground">DESIGN PRINCIPLES</h3>
              <ul className="mt-4 border-t border-border">
                {project.define.principles.map((p) => (
                  <li key={p.title} className="border-b border-border py-4">
                    <p className="font-display font-bold uppercase tracking-tight">{p.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{p.body}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <div>
          <Reveal>
            <h3 className="label-mono text-muted-foreground">WHO I DESIGNED FOR</h3>
          </Reveal>
          <div className="mt-4 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2">
            {project.define.personas.map((p) => (
              <Reveal key={p.name}>
                <div className="h-full bg-paper p-6">
                  <p className="font-display text-lg font-extrabold uppercase tracking-tight">{p.name}</p>
                  <p className="mt-1 label-mono text-muted-foreground">{p.meta}</p>
                  <dl className="mt-4 space-y-2 text-sm">
                    <div>
                      <dt className="label-mono text-signal">GOAL</dt>
                      <dd className="mt-0.5">{p.goal}</dd>
                    </div>
                    <div>
                      <dt className="label-mono text-signal">FRICTION</dt>
                      <dd className="mt-0.5">{p.friction}</dd>
                    </div>
                  </dl>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* IDEATION                                                            */
/* ------------------------------------------------------------------ */

function Ideation({ project }: { project: (typeof projects)[number] }) {
  return (
    <section aria-label="Ideation and iteration" className="py-24 md:py-36">
      <Rule index="04" label="IDEATION — INCLUDING THE MISTAKES" />
      <div className="edge">
        <Reveal>
          <h2 className="display-md max-w-3xl">
            POLISHED SCREENS EARN TRUST. UGLY SKETCHES SHOW THINKING. YOU NEED BOTH.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {project.ideation.explorations.map((e, i) => (
            <Reveal key={e.caption} delay={i * 0.06}>
              <figure>
                <div className="aspect-[4/3] border border-border">
                  <ExplorationArt i={i} seed={project.id + i} />
                </div>
                <figcaption className="mt-3 text-sm">
                  <p className="font-medium">{e.caption}</p>
                  <p className={`label-mono mt-1 ${e.verdict === "Rejected" ? "text-muted-foreground line-through decoration-signal/60" : "text-signal"}`}>
                    {e.verdict.toUpperCase()}
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{e.note}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <div className="mt-20 grid gap-10 md:grid-cols-2">
          <Reveal>
            <div>
              <h3 className="label-mono text-signal">WHY THIS DIDN'T WORK</h3>
              <ul className="mt-4 border-t border-border">
                {project.ideation.rejections.map((r) => (
                  <li key={r.title} className="border-b border-border py-5">
                    <p className="font-display font-bold uppercase tracking-tight">{r.title}</p>
                    <p className="mt-2 text-sm leading-relaxed">{r.why}</p>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                      <span className="label-mono text-signal">LEARNED —</span> {r.learned}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="border border-border bg-paper-deep p-6 md:p-10">
              <p className="display-md font-narrow">
                REJECTED IDEAS AREN'T FAILURES. THEY'RE TUITION.
              </p>
              <p className="mt-4 text-sm text-muted-foreground">
                Each rejection above changed a decision in the final design.
                Documented so the process is auditable — and so I don't pay the
                same tuition twice.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ExplorationArt({ i, seed }: { i: number; seed: string }) {
  const tones = ["#1A1917", "#EFE9E1", "#1A1917"];
  const bg = tones[i % 3];
  const fg = bg === "#1A1917" ? "#F2EFE9" : "#1A1917";
  return (
    <svg viewBox="0 0 100 75" className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <rect width="100" height="75" fill={bg} />
      {i === 0 && (
        <g>
          {Array.from({ length: 6 }, (_, r) =>
            Array.from({ length: 4 }, (_, c) => (
              <rect key={`${r}${c}`} x={10 + c * 21} y={10 + r * 10} width="16" height="6" fill={fg} fillOpacity="0.16" stroke={fg} strokeOpacity="0.2" strokeWidth="0.3" />
            )),
          )}
        </g>
      )}
      {i === 1 && (
        <g>
          {Array.from({ length: 5 }, (_, r) => (
            <g key={r}>
              <rect x="12" y={12 + r * 11} width="8" height="8" fill={r === 0 ? "#E4572E" : "none"} stroke={fg} strokeOpacity="0.4" strokeWidth="0.4" />
              <rect x="24" y={14 + r * 11} width={40 - r * 4} height="2.4" fill={fg} fillOpacity="0.5" />
            </g>
          ))}
        </g>
      )}
      {i === 2 && (
        <g>
          <rect x="10" y="10" width="80" height="34" fill={fg} fillOpacity="0.08" stroke={fg} strokeOpacity="0.3" strokeWidth="0.4" />
          {Array.from({ length: 8 }, (_, c) => (
            <rect key={c} x={13 + c * 9.4} y={26 + (c % 3) * -3} width="7" height={12 + (c % 3) * 3} fill={c === 5 ? "#E4572E" : fg} fillOpacity={c === 5 ? 1 : 0.35} />
          ))}
          <rect x="10" y="52" width="46" height="3" fill={fg} fillOpacity="0.4" />
          <rect x="10" y="59" width="30" height="3" fill={fg} fillOpacity="0.25" />
        </g>
      )}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* DESIGN SYSTEM                                                       */
/* ------------------------------------------------------------------ */

function SystemSection({ project }: { project: (typeof projects)[number] }) {
  const ds = project.designSystem;
  return (
    <section aria-label="Design system" className="bg-night py-24 text-night-fg md:py-36">
      <div className="grain absolute inset-0" aria-hidden />
      <Rule index="05" label="DESIGN SYSTEM" dark />
      <div className="edge relative">
        <Reveal>
          <h2 className="display-md max-w-3xl">{ds.intro}</h2>
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <div>
              <h3 className="label-mono text-night-muted">TYPOGRAPHY</h3>
              <div className="mt-4 border-t border-night-border">
                {ds.type.map((t) => (
                  <div key={t.name} className="border-b border-night-border py-4">
                    <p className="font-display text-2xl font-bold tracking-tight">{t.name}</p>
                    <p className="mt-1 label-mono text-night-muted">{t.spec}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-4">
            <div>
              <h3 className="label-mono text-night-muted">COLOR — ONE SIGNAL, RESTRAINT ELSEWHERE</h3>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {ds.colors.map((c) => (
                  <div key={c.name} className={`border border-night-border p-3 ${c.dark ? "bg-night-soft" : "bg-[#F2EFE9]"}`}>
                    <div
                      className="mb-3 h-10 w-full border border-night-border"
                      style={{ background: c.dark ? "#E4572E" : c.name === "Ink" ? "#1A1917" : "#F2EFE9" }}
                    />
                    <p className="text-sm font-medium">{c.name}</p>
                    <p className="label-mono text-night-muted">{c.token}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.14} className="lg:col-span-3">
            <div className="space-y-10">
              <div>
                <h3 className="label-mono text-night-muted">COMPONENTS</h3>
                <ul className="mt-4 border-t border-night-border">
                  {ds.components.map((c) => (
                    <li key={c} className="border-b border-night-border py-3 text-sm">{c}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="label-mono text-night-muted">ACCESSIBILITY DECISIONS</h3>
                <ul className="mt-4 border-t border-night-border">
                  {ds.a11y.map((a) => (
                    <li key={a} className="border-b border-night-border py-3 text-sm text-night-muted">{a}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* FINAL EXPERIENCE                                                    */
/* ------------------------------------------------------------------ */

function FinalExperience({ project }: { project: (typeof projects)[number] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 50, reduce ? 0 : -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : -30, reduce ? 0 : 30]);

  return (
    <section ref={ref} aria-label="Final experience" className="py-24 md:py-36">
      <Rule index="06" label="THE FINAL EXPERIENCE" />
      <div className="edge">
        <Reveal>
          <h2 className="display-md">
            SCREENS THAT
            <br />
            MOVE <span className="text-signal">TOGETHER.</span>
          </h2>
        </Reveal>
        <div className="mt-14 space-y-20 md:space-y-28">
          {project.finalScreens.map((s, i) => (
            <Reveal key={s.caption}>
              <figure className={i % 2 === 1 ? "md:ml-auto md:max-w-[70%]" : "md:max-w-[85%]"}>
                <motion.div
                  style={{ y: i % 2 === 1 ? y2 : y1 }}
                  className={`relative overflow-hidden border border-border ${
                    s.aspect === "tall" ? "aspect-[3/4] md:aspect-[16/10]" : s.aspect === "square" ? "aspect-[4/3]" : "aspect-[16/9]"
                  }`}
                >
                  <ProjectArt
                    art={project.heroArt}
                    spec={{ variant: project.id as "fleet" | "meds" | "studio", kind: "screen", aspect: s.aspect }}
                    seedSuffix={s.caption}
                  />
                </motion.div>
                <figcaption className="mt-4 flex flex-wrap items-baseline justify-between gap-3">
                  <span className="font-display font-bold uppercase tracking-tight">{s.caption}</span>
                  <span className="label-mono text-muted-foreground">{s.note}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* OUTCOME — honest, no invented metrics                               */
/* ------------------------------------------------------------------ */

function Outcome({ project }: { project: (typeof projects)[number] }) {
  return (
    <section aria-label="Outcome and reflection" className="bg-paper-deep py-24 md:py-36">
      <Rule index="07" label="IMPACT — STATED HONESTLY" />
      <div className="edge">
        <Reveal>
          <p className="label-mono text-muted-foreground">{project.outcome.summary}</p>
        </Reveal>
        <div className="mt-10 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-3">
          {project.outcome.validations.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.06}>
              <div className="h-full bg-paper p-6">
                <p className="label-mono text-signal">{v.title.toUpperCase()}</p>
                <p className="mt-3 text-sm leading-relaxed">{v.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 grid gap-10 md:grid-cols-2">
          <Reveal>
            <div className="border border-border p-6">
              <h3 className="label-mono text-muted-foreground">LIMITATIONS — WHAT THIS ISN'T</h3>
              <p className="mt-3 text-sm leading-relaxed">{project.outcome.limitations}</p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="border border-border p-6">
              <h3 className="label-mono text-muted-foreground">NEXT STEPS</h3>
              <ul className="mt-3 space-y-2 text-sm">
                {project.outcome.next.map((n) => (
                  <li key={n} className="flex gap-3">
                    <span className="text-signal">→</span> {n}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* REFLECTION + NEXT PROJECT                                           */
/* ------------------------------------------------------------------ */

function Reflection({ project }: { project: (typeof projects)[number] }) {
  return (
    <section aria-label="Reflection" className="edge py-24 md:py-36">
      <Rule index="08" label="WHAT I LEARNED" />
      <Reveal>
        <blockquote className="max-w-4xl">
          <p className="display-md font-narrow">“{project.reflection}”</p>
        </blockquote>
      </Reveal>
    </section>
  );
}

function NextProject({ project }: { project: (typeof projects)[number] }) {
  const reduce = useReducedMotion();
  return (
    <Link
      to={`/work/${project.slug}`}
      data-cursor="VIEW CASE STUDY"
      className="group block border-t border-border"
      aria-label={`Next case study: ${project.title}`}
    >
      <div className="edge flex flex-wrap items-baseline justify-between gap-4 py-16 md:py-24">
        <div>
          <p className="label-mono text-muted-foreground">NEXT CASE STUDY</p>
          <p className="display-md mt-3 transition-colors group-hover:text-signal">{project.title}</p>
        </div>
        <motion.span
          className="inline-flex items-center gap-3 label-mono text-signal"
          animate={reduce ? undefined : { x: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          {project.number} <Arrow className="h-5 w-5" />
        </motion.span>
      </div>
    </Link>
  );
}
