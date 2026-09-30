import { motion, useReducedMotion } from "framer-motion";
import { Reveal, Rule } from "@/components/core";
import { site, skills } from "@/data/site";
import { useState } from "react";

/**
 * ABOUT — "CURIOUS BY DEFAULT." Editorial story told in four chapters with a
 * generative portrait plate, followed by the toolkit (skills as four
 * disciplines, hover to reveal how each is actually used).
 */
export function About() {
  return (
    <section id="about" aria-label="About Joseph Jennifer" className="pb-24 md:pb-36">
      <Rule index="04" label="ABOUT" />

      <div className="edge grid gap-12 md:grid-cols-12">
        <div className="md:col-span-7">
          <h2 className="display-lg">
            CURIOUS
            <br />
            BY <span className="text-signal">DEFAULT.</span>
          </h2>
          <div className="mt-10 space-y-10">
            <Chapter n="01" t="WHERE I STARTED">
              Taking apart interfaces before I knew the word for it — remapping
              game menus, rebuilding band posters, asking why one button felt
              right and another didn't.
            </Chapter>
            <Chapter n="02" t="WHAT I LEARNED">
              That design is decisions made visible. The best interfaces I've
              studied all argue for something — an order, a priority, a person
              they refuse to leave behind.
            </Chapter>
            <Chapter n="03" t="WHAT I CARE ABOUT">
              Systems that hold under pressure, research that survives contact
              with real users, and craft precise enough that a reviewer stops
              scrolling and looks again.
            </Chapter>
            <Chapter n="04" t="WHAT I'M EXPLORING">
              Where motion becomes meaning: variable fonts as instruments,
              interfaces that explain themselves, and AI as a design material.
            </Chapter>
          </div>
        </div>

        <div className="md:col-span-5">
          <Reveal delay={0.1}>
            <PortraitPlate />
          </Reveal>
          <Reveal delay={0.2}>
            <dl className="mt-8 space-y-3 border-t border-border pt-6 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="label-mono text-muted-foreground">BASED</dt>
                <dd>{site.location}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="label-mono text-muted-foreground">FOCUS</dt>
                <dd>Product · Interaction · Motion</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="label-mono text-muted-foreground">STATUS</dt>
                <dd className="text-signal">Open to programs & internships</dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </div>

      {/* toolkit */}
      <div className="edge mt-24 md:mt-32">
        <Reveal>
          <div className="flex items-end justify-between gap-6">
            <h3 className="display-md">THE TOOLKIT</h3>
            <p className="label-mono text-muted-foreground">HOVER / FOCUS TO SEE HOW IT'S USED</p>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((g, gi) => (
            <Reveal key={g.group} delay={gi * 0.06}>
              <div>
                <p className="label-mono text-signal">{g.group}</p>
                <ul className="mt-4 border-t border-border">
                  {g.items.map((s) => (
                    <SkillRow key={s.name} name={s.name} note={s.note} />
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Chapter({ n, t, children }: { n: string; t: string; children: React.ReactNode }) {
  return (
    <Reveal>
      <div className="grid grid-cols-[3rem_1fr] gap-4 border-t border-border pt-5">
        <span className="label-mono text-muted-foreground">{n}</span>
        <div>
          <h3 className="font-display text-lg font-extrabold uppercase tracking-tight">{t}</h3>
          <p className="mt-2 max-w-[52ch] text-sm leading-relaxed text-muted-foreground">{children}</p>
        </div>
      </div>
    </Reveal>
  );
}

function PortraitPlate() {
  return (
    <div className="relative aspect-[4/5] overflow-hidden border border-border bg-night-soft">
      <div className="grain absolute inset-0" aria-hidden />
      <svg viewBox="0 0 80 100" className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
        {Array.from({ length: 9 }, (_, i) => (
          <line key={`v${i}`} x1={i * 10} y1="0" x2={i * 10} y2="100" stroke="#F2EFE9" strokeOpacity="0.06" strokeWidth="0.3" />
        ))}
        <circle cx="40" cy="42" r="14" fill="none" stroke="#F2EFE9" strokeOpacity="0.3" strokeWidth="0.5" />
        <path d="M18 96 C 20 66, 60 66, 62 96" fill="none" stroke="#F2EFE9" strokeOpacity="0.3" strokeWidth="0.5" />
        <rect x="36" y="58" width="8" height="2" fill="#E4572E" />
        <rect x="0" y="72" width="80" height="0.4" fill="#F2EFE9" strokeOpacity="0.2" stroke="#F2EFE9" fillOpacity="0.2" />
        <text x="6" y="12" fill="#F2EFE9" fillOpacity="0.5" fontSize="4" fontFamily="IBM Plex Mono, monospace">
          J.JENNIFER — FIG.01
        </text>
        <text x="6" y="94" fill="#E4572E" fontSize="3.2" fontFamily="IBM Plex Mono, monospace">
          CURIOUS BY DEFAULT
        </text>
      </svg>
    </div>
  );
}

function SkillRow({ name, note }: { name: string; note: string }) {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  return (
    <li
      className="border-b border-border"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        className="flex w-full items-center justify-between gap-3 py-3 text-left"
      >
        <span className="font-medium">{name}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0, opacity: open ? 1 : 0.4 }}
          className="text-signal"
          aria-hidden
        >
          <svg viewBox="0 0 10 10" className="h-2.5 w-2.5">
            <path d="M5 0v10M0 5h10" stroke="currentColor" strokeWidth="1.4" />
          </svg>
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.19, 1, 0.22, 1] }}
        className="overflow-hidden"
      >
        <p className="pb-3 pr-4 text-xs leading-relaxed text-muted-foreground">{note}</p>
      </motion.div>
    </li>
  );
}
