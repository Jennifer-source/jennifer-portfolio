import { useState } from "react";
import { Link } from "react-router";
import { motion, useScroll, useSpring } from "framer-motion";
import type { Project } from "@/data/projects";
import { Cursor } from "./Cursor";
import { Footer } from "./Footer";
import {
  CaseStudyNav,
  CaseStudyOverview,
  Reveal,
  RevealWords,
  SectionHeader,
  Shell,
} from "./primitives";

const QUESTION =
  "How might interaction design help international students feel oriented, connected, and confident during their first weeks in a new country?";

const hypotheses = [
  ["H1", "Students may hesitate to ask basic questions, fearing the question reveals them as uninformed."],
  ["H2", "Social events can feel intimidating when social expectations are unknown in advance."],
  ["H3", "Bureaucratic language can amplify uncertainty."],
  ["H4", "Information overload in week one can exceed working memory."],
  ["H5", "Self-service can fail silently when students do not know when to stop reading and ask for help."],
  ["H6", "Not knowing what feels uncertain can itself be stressful."],
  ["H7", "Empty results can feel like personal failure when confidence is already low."],
];

const responses = [
  ["“Explain this” progressive disclosure", "Depth of information is chosen by the user, not imposed."],
  ["Five-level explanations", "Meaning, relevance, action, expectation, escalation."],
  ["Context labels", "Plain-language tags that say what kind of thing something is."],
  ["Private uncertainty check-in", "Name what feels hard without anyone else seeing it."],
  ["Personalised recommendations", "Guidance shaped by the check-in, not a generic feed."],
  ["Social comfort filters", "Filter events by group size, activity and conversation level."],
  ["Reversible expression of interest", "Say “maybe” without committing to attend."],
  ["Support escalation ladder", "A visible path from self-service to people."],
  ["Human fallback", "Every guidance page ends with who to ask."],
  ["Narrative empty states", "No results explained as a situation, not a failure."],
];

const levels = [
  ["What is this?", "A residence permit appointment is a meeting where your identity documents are checked and your permit is issued."],
  ["Why does it matter?", "It confirms your legal right to stay and study, and other services may depend on it."],
  ["What do I need to do?", "Book a slot, bring your passport, admission letter and proof of address."],
  ["What usually happens?", "A short check of your documents and a photo. Most appointments are brief."],
  ["When should I ask someone?", "If a document is missing or the date is close to your deadline, contact the international office."],
];

const journey = [
  "Uncertainty",
  "Name what feels hard",
  "Find context",
  "Understand",
  "Take a next step",
  "Ask a human when needed",
];

const ladder = [
  ["Self-service", "Guides, “Explain this”, checklists"],
  ["Peer", "Student buddies and community"],
  ["University", "International office, advisors"],
  ["Urgent", "Emergency and wellbeing contacts"],
];

const a11y = [
  "Semantic landmarks",
  "Keyboard operability",
  "Focus management",
  "Focus trapping in dialogs",
  "ARIA labelling",
  "Reduced-motion support",
  "44px minimum touch targets",
  "Responsive layouts",
  "WCAG AA contrast considerations",
];

const traceability = [
  {
    h: "H1 — hesitation to ask basic questions",
    o: "Make basic questions answerable privately",
    d: "“Explain this” five-level disclosure",
    i: "Inline explain control on unfamiliar terms",
    e: "Task 01 — comprehension of an unfamiliar document",
  },
  {
    h: "H2 — unknown social expectations",
    o: "Reveal what an event will feel like before joining",
    d: "Social comfort attributes + reversible interest",
    i: "Event cards with size, activity, conversation level",
    e: "Task 02 — find a low-pressure social event",
  },
  {
    h: "H5 — self-service fails silently",
    o: "Signal when it is time to ask a person",
    d: "Support escalation ladder + human fallback",
    i: "Help screen with four tiers",
    e: "Task 03 — choose the appropriate support pathway",
  },
];

const screens = ["Welcome", "Onboarding", "Home", "Explore", "Community", "Help", "Research"];

/** Level 1 — the whole project story, recomposed from the sections below. */
const overviewSteps = [
  {
    label: "Project",
    headline: "An HCI concept that treats uncertainty as the design problem.",
    body: "A research-driven interaction design concept helping international students navigate their first weeks in a new country.",
  },
  {
    label: "Problem",
    headline: "Unfamiliar systems and social rules arrive all at once.",
    body: "Not simply “finding information” — a problem of understanding: what something means, why it matters, and what to do next.",
  },
  {
    label: "Role",
    headline: "UX/UI design and HCI research, end to end.",
    body: "One designer-researcher framing the problem, deriving the hypotheses, and designing every response.",
  },
  {
    label: "Approach",
    headline: "Seven hypotheses, stated before pixels.",
    body: "A planned research path — interviews, affinity and journey mapping, moderated usability testing — with each response traceable to a hypothesis.",
  },
  {
    label: "Solution",
    headline: "“Explain this” — five levels of user-controlled depth.",
    body: "Progressive disclosure plus visible social expectations, a private uncertainty check-in, and a designed path from self-service to human help.",
  },
  {
    label: "Outcome",
    headline: "A working concept prototype — evaluation still to come.",
    body: "“Testing results have not yet been collected.” What it demonstrates now is the traceability of every decision.",
  },
] as const;

const navItems = [
  { id: "cs-overview", label: "Overview" },
  { id: "cs-context", label: "Context" },
  { id: "cs-question", label: "Question" },
  { id: "cs-research", label: "Research" },
  { id: "cs-signature", label: "Signature" },
  { id: "cs-prototype", label: "Prototype" },
  { id: "cs-reflection", label: "Reflection" },
] as const;

function Phone({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <figure className="mx-auto w-full max-w-[300px]">
      <div className="rounded-[2.2rem] border border-foreground/80 bg-background p-3 shadow-[0_30px_60px_-30px_oklch(0.155_0.006_60/0.4)]">
        <div className="min-h-[520px] rounded-[1.6rem] border border-hairline bg-paper p-5">{children}</div>
      </div>
      <figcaption className="label-mono mt-4 text-center text-muted-foreground">{label}</figcaption>
    </figure>
  );
}

function ExplainThis() {
  const [open, setOpen] = useState(0);
  return (
    <div>
      <p className="label-mono text-muted-foreground">Document · Official letter</p>
      <p className="display-lg mt-3 text-xl leading-tight">Residence permit appointment</p>
      <p className="label-mono mt-5 text-accent">Explain this</p>
      <ol className="mt-3 divide-y divide-hairline border-y border-hairline">
        {levels.map(([q, a], i) => (
          <li key={q}>
            <button
              type="button"
              onClick={() => setOpen(i)}
              aria-expanded={open === i}
              className="flex min-h-11 w-full items-center gap-3 py-2 text-left text-sm"
            >
              <span className={`label-mono ${open === i ? "text-accent" : "text-muted-foreground"}`}>
                {i + 1}
              </span>
              <span className={open === i ? "font-semibold" : ""}>{q}</span>
            </button>
            {open === i && <p className="pb-3 pl-6 text-xs font-mono leading-relaxed text-muted-foreground">{a}</p>}
          </li>
        ))}
      </ol>
    </div>
  );
}

function EventCard() {
  const [interested, setInterested] = useState(false);
  const attrs = [
    ["Group size", "6–8 people"],
    ["Activity", "Board games"],
    ["Conversation", "Low — activity-led"],
    ["Duration", "90 min"],
    ["Location", "Student union, room 2"],
    ["Access", "Step-free entrance"],
  ];
  return (
    <div>
      <p className="label-mono text-muted-foreground">Community</p>
      <p className="display-lg mt-3 text-xl leading-tight">Quiet games evening</p>
      <dl className="mt-5 space-y-2 text-xs">
        {attrs.map(([k, v]) => (
          <div key={k} className="flex justify-between gap-3 border-b border-hairline pb-2">
            <dt className="label-mono text-muted-foreground">{k}</dt>
            <dd className="text-right">{v}</dd>
          </div>
        ))}
      </dl>
      <button
        type="button"
        onClick={() => setInterested((v) => !v)}
        aria-pressed={interested}
        className={`mt-6 min-h-11 w-full border text-sm transition-colors ${
          interested ? "border-accent bg-accent text-accent-foreground" : "border-foreground"
        }`}
      >
        {interested ? "Interested · tap to undo" : "I might go"}
      </button>
      <p className="mt-2 text-center text-[11px] text-muted-foreground">Interest is private and reversible.</p>
    </div>
  );
}

function HelpLadder() {
  return (
    <div>
      <p className="label-mono text-muted-foreground">Help</p>
      <p className="display-lg mt-3 text-xl leading-tight">Who can help with this?</p>
      <ol className="mt-5 space-y-2">
        {ladder.map(([t, d], i) => (
          <li key={t} className={`border p-3 ${i === 3 ? "border-accent" : "border-hairline"}`}>
            <p className="label-mono text-accent">0{i + 1}</p>
            <p className="mt-1 text-sm font-semibold">{t}</p>
            <p className="text-xs text-muted-foreground">{d}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="label-mono inline-block border border-accent px-2 py-1 text-accent">{children}</span>
  );
}

export function BelongCaseStudy({ project, next }: { project: Project; next: Project }) {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

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
          <span className="label-mono text-muted-foreground">02 / {project.year}</span>
        </Shell>
      </header>
      <main>
        {/* 1 HERO */}
        <section className="grain bg-paper pb-16 pt-28">
          <Shell>
            <p className="label-mono text-accent">02 — Belong · {project.category}</p>
            <h1 className="display-xl mt-6 text-[clamp(3rem,13vw,12rem)] uppercase leading-[0.85]">
              <RevealWords text="Belong" />
            </h1>
            <div className="mt-8 grid gap-8 lg:grid-cols-12">
              <p className="display-lg text-[clamp(1.5rem,3vw,2.6rem)] leading-tight lg:col-span-7">
                Designing for the uncertainty of belonging.
              </p>
              <p className="text-lg font-mono leading-relaxed text-muted-foreground lg:col-span-4 lg:col-start-9">
                A research-driven interaction design concept for international students navigating
                their first weeks in a new country.
              </p>
            </div>
            <Reveal className="mt-14">
              <div className="overflow-hidden bg-muted">
                <img
                  src={project.heroImage}
                  alt="Belong app screens: the Explain this panel and community events"
                  width={1600}
                  height={1008}
                  className="aspect-16/9 w-full object-cover"
                />
              </div>
            </Reveal>
          </Shell>
        </section>

        {/* 2 OVERVIEW */}
        <section id="cs-overview" className="bg-paper py-20">
          <Shell>
            <SectionHeader index="01" label="Overview" title="Project" />
            <CaseStudyNav items={navItems} className="mt-6" />
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["Role", "UX/UI Designer · HCI Researcher"],
                ["Focus", "HCI · UX Research · Interaction Design"],
                ["Platform", "Responsive digital experience"],
                ["Status", "Research-driven prototype"],
              ].map(([k, v]) => (
                <div key={k} className="border-t border-hairline pt-3">
                  <p className="label-mono text-muted-foreground">{k}</p>
                  <p className="mt-1.5 text-sm font-mono leading-relaxed">{v}</p>
                </div>
              ))}
            </div>
            <CaseStudyOverview steps={overviewSteps} className="mt-14" />
          </Shell>
        </section>

        {/* 3 CONTEXT */}
        <section id="cs-context" className="bg-paper pb-24">
          <Shell>
            <SectionHeader index="02" label="The context" title="Problem space" />
            <div className="mt-10 grid gap-12 lg:grid-cols-12">
              <Reveal className="lg:col-span-6">
                <p className="text-xl font-mono leading-relaxed">
                  International students often encounter unfamiliar administrative systems, cultural
                  expectations, social situations and everyday decisions at the same time.
                </p>
                <p className="mt-6 font-mono leading-relaxed text-muted-foreground">
                  The challenge explored by Belong is not simply “finding information.” It is a UX
                  and HCI problem of understanding — framed here as a design space, not a claim about
                  every international student.
                </p>
              </Reveal>
              <ol className="lg:col-span-5 lg:col-start-8">
                {[
                  "what something means",
                  "why it matters",
                  "what to do next",
                  "what usually happens",
                  "when to ask a person for help",
                ].map((t, i) => (
                  <Reveal key={t} delay={i * 0.05}>
                    <li className="flex items-baseline gap-5 border-t border-hairline py-4">
                      <span className="label-mono text-accent">0{i + 1}</span>
                      <span className="display-lg text-xl">{t}</span>
                    </li>
                  </Reveal>
                ))}
              </ol>
            </div>
          </Shell>
        </section>

        {/* 4 QUESTION */}
        <section id="cs-question" data-tone="dark" className="grain-light bg-void py-28 text-void-foreground">
          <Shell>
            <SectionHeader index="03" label="The design question" invert />
            <Reveal>
              <p className="display-lg mt-12 max-w-[26ch] text-[clamp(1.8rem,4.4vw,4rem)] leading-[1.05]">
                “{QUESTION}”
              </p>
            </Reveal>
          </Shell>
        </section>

        {/* 5 RESEARCH PLAN */}
        <section id="cs-research" className="bg-paper py-24">
          <Shell>
            <SectionHeader index="04" label="Research approach" title="Research plan" />
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Label>Research plan</Label>
              <p className="text-sm font-mono text-muted-foreground">
                Planned methods. These studies have not yet been conducted.
              </p>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {[
                "Semi-structured interviews",
                "Affinity mapping",
                "Journey mapping",
                "Thematic analysis",
                "Opportunity statements",
                "Prototype evaluation",
                "Moderated usability testing",
              ].map((m, i) => (
                <Reveal key={m} delay={i * 0.04}>
                  <div className="h-full border border-dashed border-hairline p-5">
                    <p className="label-mono text-muted-foreground">Planned · 0{i + 1}</p>
                    <h3 className="display-lg mt-3 text-lg">{m}</h3>
                  </div>
                </Reveal>
              ))}
            </div>
          </Shell>
        </section>

        {/* 6 HYPOTHESES */}
        <section data-tone="dark" className="grain-light bg-void py-24 text-void-foreground">
          <Shell>
            <SectionHeader index="05" label="Hypotheses" title="Not findings" invert />
            <p className="label-mono mt-8 text-accent">
              Design hypotheses — to be tested, not validated research findings
            </p>
            <div className="mt-10 divide-y divide-white/15 border-y border-white/15">
              {hypotheses.map(([n, t]) => (
                <Reveal key={n}>
                  <div className="grid gap-4 py-8 lg:grid-cols-12">
                    <span className="display-lg text-3xl text-accent lg:col-span-1">{n}</span>
                    <p className="display-lg text-[clamp(1.2rem,2.2vw,1.9rem)] leading-snug lg:col-span-10 lg:col-start-3">
                      {t}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Shell>
        </section>

        {/* 7 DESIGN RESPONSE */}
        <section className="bg-paper py-24">
          <Shell>
            <SectionHeader index="06" label="The design response" title="Hypotheses → interaction" />
            <div className="mt-10 grid gap-x-10 sm:grid-cols-2">
              {responses.map(([t, d], i) => (
                <Reveal key={t} delay={(i % 2) * 0.05}>
                  <div className="flex gap-5 border-t border-hairline py-5">
                    <span className="label-mono text-accent">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <h3 className="display-lg text-lg">{t}</h3>
                      <p className="mt-1 text-sm font-mono text-muted-foreground">{d}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </Shell>
        </section>

        {/* 8 SIGNATURE */}
        <section id="cs-signature" className="bg-background py-24">
          <Shell>
            <SectionHeader index="07" label="Signature interaction" title="Explain this" />
            <div className="mt-12 grid items-center gap-14 lg:grid-cols-12">
              <div className="lg:col-span-6">
                <h2 className="display-xl text-[clamp(2.4rem,6vw,5.5rem)] uppercase leading-[0.9]">
                  Explain this.
                </h2>
                <ol className="mt-10">
                  {levels.map(([q], i) => (
                    <li key={q} className="flex items-baseline gap-5 border-t border-hairline py-3">
                      <span className="label-mono text-accent">{i + 1}</span>
                      <span className="display-lg text-lg">{q}</span>
                    </li>
                  ))}
                </ol>
                <p className="mt-8 max-w-md font-mono leading-relaxed text-muted-foreground">
                  Progressive disclosure allows the user to control the depth of information rather
                  than presenting one large wall of text.
                </p>
              </div>
              <div className="lg:col-span-5 lg:col-start-8">
                <Phone label="Try it — tap a level">
                  <ExplainThis />
                </Phone>
              </div>
            </div>
          </Shell>
        </section>

        {/* 9 JOURNEY */}
        <section className="bg-paper py-24">
          <Shell>
            <SectionHeader index="08" label="Journey / IA" title="Conceptual journey" />
            <ol className="mt-12">
              {journey.map((j, i) => (
                <Reveal key={j} delay={i * 0.05}>
                  <li
                    className="flex items-baseline gap-6 border-t border-hairline py-5"
                    style={{ paddingLeft: `${i * 4}%` }}
                  >
                    <span className="label-mono text-accent">0{i + 1}</span>
                    <span
                      className={`display-lg uppercase text-[clamp(1.4rem,3.6vw,3.2rem)] leading-none ${
                        i === journey.length - 1 ? "text-accent" : ""
                      }`}
                    >
                      {j}
                    </span>
                  </li>
                </Reveal>
              ))}
            </ol>
          </Shell>
        </section>

        {/* 10 COMMUNITY + 11 SUPPORT */}
        <section className="bg-background py-24">
          <Shell>
            <SectionHeader index="09" label="Community & support" title="Visible expectations" />
            <div className="mt-12 grid gap-16 lg:grid-cols-2">
              <div>
                <h2 className="display-lg text-2xl uppercase">Community experience</h2>
                <p className="mt-4 max-w-md font-mono leading-relaxed text-muted-foreground">
                  Events expose group size, activity type, conversation level, duration, location
                  and access notes. The intention: make social expectations visible before
                  participation and keep interest reversible. This has not yet been validated.
                </p>
                <div className="mt-10">
                  <Phone label="Community event">
                    <EventCard />
                  </Phone>
                </div>
              </div>
              <div>
                <h2 className="display-lg text-2xl uppercase">Support / escalation</h2>
                <p className="mt-4 max-w-md font-mono leading-relaxed text-muted-foreground">
                  The design does not treat self-service as the end point. It deliberately helps the
                  user recognise when human support is appropriate.
                </p>
                <div className="mt-10">
                  <Phone label="Help ladder">
                    <HelpLadder />
                  </Phone>
                </div>
              </div>
            </div>
          </Shell>
        </section>

        {/* 12 ACCESSIBILITY */}
        <section className="bg-paper py-24">
          <Shell>
            <SectionHeader index="10" label="Accessibility" title="As implemented in the prototype" />
            <ul className="mt-10 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
              {a11y.map((a) => (
                <li key={a} className="border-t border-hairline py-4 text-lg">
                  {a}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm font-mono text-muted-foreground">
              No formal accessibility audit or compliance certification has been carried out.
            </p>
          </Shell>
        </section>

        {/* 13 PROTOTYPE */}
        <section id="cs-prototype" data-tone="dark" className="grain-light bg-void py-24 text-void-foreground">
          <Shell>
            <SectionHeader index="11" label="Prototype" title="Screens" invert />
            <div className="mt-12 grid grid-cols-2 gap-px border border-white/15 bg-white/15 sm:grid-cols-4 lg:grid-cols-7">
              {screens.map((s, i) => (
                <div key={s} className="bg-void p-5">
                  <p className="label-mono text-accent">0{i + 1}</p>
                  <p className="display-lg mt-8 text-lg">{s}</p>
                </div>
              ))}
            </div>
            <p className="label-mono mt-8 text-white/50">Prototype link — to be added</p>
          </Shell>
        </section>

        {/* 14 TRACEABILITY */}
        <section className="bg-paper py-24">
          <Shell>
            <SectionHeader index="12" label="Research traceability" title="Hypothesis → evaluation" />
            <div className="mt-10 hidden grid-cols-5 gap-4 lg:grid">
              {["Research hypothesis", "Opportunity", "Design response", "Implementation", "Planned evaluation"].map(
                (h) => (
                  <p key={h} className="label-mono text-muted-foreground">
                    {h} →
                  </p>
                ),
              )}
            </div>
            <div className="mt-4 space-y-4">
              {traceability.map((t) => (
                <Reveal key={t.h}>
                  <div className="grid gap-px border border-hairline bg-hairline lg:grid-cols-5">
                    {[t.h, t.o, t.d, t.i, t.e].map((c, i) => (
                      <p
                        key={c}
                        className={`bg-paper p-4 text-sm font-mono leading-relaxed ${i === 0 ? "font-semibold" : ""} ${
                          i === 4 ? "text-accent" : ""
                        }`}
                      >
                        {c}
                      </p>
                    ))}
                  </div>
                </Reveal>
              ))}
            </div>
          </Shell>
        </section>

        {/* 15 EVALUATION */}
        <section className="bg-background py-24">
          <Shell>
            <SectionHeader index="13" label="Planned evaluation" title="Not yet run" />
            <p className="display-lg mt-10 text-2xl text-accent">“Testing results have not yet been collected.”</p>
            <div className="mt-12 grid gap-14 lg:grid-cols-2">
              <div>
                <p className="label-mono text-muted-foreground">Planned measures</p>
                <ul className="mt-4">
                  {[
                    "Comprehension",
                    "Perceived confidence",
                    "Task completion",
                    "Time to find next action",
                    "Willingness to ask for help",
                    "Perceived cultural / contextual clarity",
                  ].map((m) => (
                    <li key={m} className="border-t border-hairline py-3">
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="label-mono text-muted-foreground">Planned usability tasks</p>
                <ul className="mt-4">
                  {[
                    "Understand an unfamiliar document",
                    "Find a low-pressure social event",
                    "Choose the appropriate support pathway",
                  ].map((t, i) => (
                    <li key={t} className="flex gap-5 border-t border-hairline py-4">
                      <span className="label-mono text-accent">Task 0{i + 1}</span>
                      <span className="display-lg text-lg">{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Shell>
        </section>

        {/* 16 REFLECTION */}
        <section id="cs-reflection" className="bg-paper py-24">
          <Shell>
            <SectionHeader index="14" label="Reflection" title="Design learnings, not participant findings" />
            <ol className="mt-10">
              {[
                "Context can be more useful than information volume.",
                "Progressive disclosure can give users control over cognitive load.",
                "The handoff to human support should be designed, not treated as failure.",
                "Research traceability makes design decisions more accountable.",
                "A prototype should make its evidence boundaries visible.",
              ].map((r, i) => (
                <Reveal key={r}>
                  <li className="grid gap-4 border-t border-hairline py-6 lg:grid-cols-12">
                    <span className="label-mono text-accent lg:col-span-1">0{i + 1}</span>
                    <span className="display-lg text-[clamp(1.2rem,2.2vw,1.9rem)] leading-snug lg:col-span-10 lg:col-start-3">
                      {r}
                    </span>
                  </li>
                </Reveal>
              ))}
            </ol>
          </Shell>
        </section>

        {/* 17 FINAL */}
        <section data-tone="dark" className="grain-light bg-void py-28 text-void-foreground">
          <Shell>
            <Reveal>
              <p className="display-lg max-w-[24ch] text-[clamp(1.8rem,4.4vw,4rem)] leading-[1.05]">
                Belong is an exploration of how interaction design can turn unfamiliarity into a
                sequence of understandable next steps.
              </p>
            </Reveal>
            <div className="mt-14 flex flex-wrap gap-8">
              <Link to={{ pathname: "/", hash: "work" }} className="label-mono link-underline">
                ← Back to work
              </Link>
              <Link
                to={`/work/${next.slug}`}
                data-cursor="Next"
                className="label-mono link-underline"
              >
                Next case study: {next.title} →
              </Link>
            </div>
          </Shell>
        </section>
      </main>
      <Footer />
    </>
  );
}
