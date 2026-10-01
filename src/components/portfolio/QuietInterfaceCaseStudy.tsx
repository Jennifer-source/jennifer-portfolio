import { useState } from "react";
import { Link } from "react-router";
import { motion, useScroll, useSpring } from "framer-motion";
import type { Project } from "@/data/projects";
import quietImg from "@/assets/quiet-interface.svg";
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

/**
 * QUIET INTERFACE — github.com/Jennifer-source/quiet-interface-main
 *
 * Every fact below is taken from the study's own source: the research
 * question and hypothesis (focus/ResearchQuestion.tsx, focus/Hypothesis.tsx),
 * the conditions and method (focus/Conditions.tsx, focus/Method.tsx), the
 * standardized task and its constants (lib/study.ts), the session flow
 * (pages/Experiment.tsx), the recorded measures and privacy design
 * (lib/research/*, pages/Research.tsx) and the two live task frames
 * (experiment/ConventionalTask.tsx, experiment/QuietTask.tsx).
 * No participant data exists in the repository, so none is presented.
 */

const REPO_URL = "https://github.com/Jennifer-source/quiet-interface-main";

const QUESTION =
  "“How might interface design reduce cognitive overload during focused digital tasks?”";

const HYPOTHESIS =
  "Reducing simultaneous visual information, choices and interruptions may improve perceived focus and reduce unnecessary interaction during focused tasks.";

const studyMeta = [
  ["Purpose", "Explore two interface conditions on one standardized task"],
  ["Task", "Read a short document, mark three statements, write one note"],
  ["Status", "Anonymous sessions · no identifying data collected"],
] as const;

const conditions = [
  {
    marker: "A",
    name: "Conventional",
    description:
      "An interface with persistent navigation, multiple visible controls and competing information.",
    attributes: ["Persistent navigation", "Multiple visible controls", "Competing information"],
  },
  {
    marker: "B",
    name: "Quiet",
    description:
      "A reduced interface using progressive disclosure, contextual controls and a single primary task.",
    attributes: ["Progressive disclosure", "Contextual controls", "A single primary task"],
  },
] as const;

const methodSteps = [
  {
    index: "01",
    title: "Participants",
    body: "A small exploratory usability study.",
  },
  {
    index: "02",
    title: "Task",
    body: "Participants read a short research document, mark the three statements they consider most important, add one short note and submit. The same task is performed in both interface conditions.",
  },
  {
    index: "03",
    title: "Measures",
    items: [
      "Task completion time",
      "Errors",
      "Interaction count",
      "Perceived workload",
      "Perceived focus",
      "Usability feedback",
    ],
  },
  {
    index: "04",
    title: "Analysis",
    body: "Compare quantitative observations and qualitative feedback. Observations are recorded per condition; no condition is designated in advance as the better one.",
  },
] as const;

const taskOutline = [
  {
    index: "01",
    title: "Read",
    detail:
      "Review a short research summary on a subject outside this study's question. The text is identical in both conditions.",
  },
  {
    index: "02",
    title: "Mark",
    detail:
      "Select the three statements you consider most important. A fourth is refused until you clear one.",
  },
  {
    index: "03",
    title: "Note",
    detail: "Write one short note of up to 280 characters on what you read.",
  },
  {
    index: "04",
    title: "Submit",
    detail: "Review both responses, submit the task and receive a confirmation.",
  },
] as const;

/** The task document, verbatim from lib/study.ts. */
const documentParagraphs = [
  {
    label: "Background",
    sentences: [
      "Daylight exposure has been associated with changes in daytime alertness in several workplace studies, although the reported effect sizes differ widely between settings.",
      "Much of the earlier literature relied on self-reported sleepiness, which correlates only loosely with behavioral measures of attention.",
    ],
  },
  {
    label: "Evidence",
    sentences: [
      "More recent designs administer a short attention task at the desk, so alertness can be sampled during a normal working day without removing people from their environment.",
      "Sample sizes in this literature are frequently fewer than twenty participants.",
      "Reported improvements are generally small, and most of them disappear once time of day and prior sleep are entered into the model.",
    ],
  },
  {
    label: "Conclusion",
    sentences: [
      "Where an effect is found, it is usually described as short-lived, decaying within about an hour of the change in light.",
      "The pragmatic reading is that daylight is a plausible but weak lever, and that variation within a day should be modeled rather than assumed constant.",
    ],
  },
] as const;

const allSentences = documentParagraphs.flatMap((p) => p.sentences);
const MAX_MARKS = 3;

const flows = [
  {
    index: "01",
    title: "Brief",
    body: "The experiment route opens with the task outline, the fixed session order and the anonymity notice.",
  },
  {
    index: "02",
    title: "Condition one — Document → Note → Review",
    body: "Three task steps inside the first interface frame. Steps can be revisited until submission.",
  },
  {
    index: "03",
    title: "Condition two — Document → Note → Review",
    body: "The identical controller runs inside the second interface frame. Nothing about the task changes.",
  },
  {
    index: "04",
    title: "Session complete",
    body: "A confirmation reads both responses back exactly as entered, then returns to the study overview.",
  },
] as const;

const counterbalance = [
  ["Order A", "Conventional → Quiet"],
  ["Order B", "Quiet → Conventional"],
] as const;

const recordedMeasures = [
  "Overall duration",
  "Document duration",
  "Note duration",
  "Review duration",
  "Correct selections",
  "Incorrect selections",
  "Missed targets",
  "Total selected",
  "Interaction count",
  "Navigation count",
  "Error count",
  "Note length (chars)",
] as const;

const recordedEvents = [
  "task_started",
  "condition_started",
  "document_opened",
  "statement_selected",
  "statement_deselected",
  "note_started",
  "note_updated",
  "review_opened",
  "navigation_next",
  "navigation_previous",
  "task_submitted",
  "task_completed",
] as const;

const frameAnatomy = [
  {
    marker: "A",
    name: "Conventional frame",
    intro:
      "Persistent navigation, several toolbars, side panels and duplicated controls. Every control is real — the difference from the quiet frame is density, not capability.",
    items: [
      "Persistent workspace navigation with step links and a Help toggle",
      "Toolbar: clear marks, previous, next — plus marks, note and step counters",
      "Left rail: steps, instructions and document outline",
      "Right rail: condition label, marks used, note length",
      "Sticky bottom action bar with a contextual continue hint",
    ],
  },
  {
    marker: "B",
    name: "Quiet frame",
    intro:
      "A single column, one primary action at a time, and controls that appear only when they are needed. Capability is identical to the conventional frame — only the surrounding interface differs.",
    items: [
      "One 760px column on paper, no side panels",
      "Step counter in the header — nothing else competes with the task",
      "Instructions hidden behind a disclosure until asked for",
      "One primary button; back and leave as quiet text links",
      "Continue hint stays available on small screens",
    ],
  },
] as const;

const studyDesignSystem = [
  ["Type", "Serif display for reading surfaces; mono labels with wide tracking for metadata"],
  ["Color", "Paper and ink only, with one status accent — no decorative color"],
  ["Layout", "Hairline rules throughout; 12-column editorial grid for the overview, one narrow column for the task"],
  ["Components", "Two task frames around one shared controller; condition previews; confirmation readback"],
  ["States", "Reachable and unreachable steps, refusal notice, marks counter, disabled continue"],
] as const;

const studyA11y = [
  "aria-current marks the active task step",
  "Unreachable steps are aria-disabled and non-interactive",
  "Disclosures expose aria-expanded state",
  "Confirmation moves focus to its heading",
  "In-page navigation respects prefers-reduced-motion",
  "The prototype records no identifying data",
] as const;

/** Level 1 — the whole study story, recomposed from the sections below. */
const overviewSteps = [
  {
    label: "Project",
    headline: "An experimental study of interface complexity.",
    body: "One standardized focus task — read, mark, note, submit — run inside two interface conditions.",
  },
  {
    label: "Problem",
    headline: "Interfaces can overload the very work they are meant to support.",
    body: "“How might interface design reduce cognitive overload during focused digital tasks?” — the framing question for stage one.",
  },
  {
    label: "Role",
    headline: "Designer, researcher & developer.",
    body: "An individual research prototype — the study's instrument built end to end.",
  },
  {
    label: "Approach",
    headline: "One constant task, two honestly different interfaces.",
    body: "Conventional and Quiet frames around an identical controller, with counterbalanced orders and anonymity by design.",
  },
  {
    label: "Solution",
    headline: "A working instrument, not a claim.",
    body: "The signature constraint — three marks, a fourth refused — plus anonymous per-condition observation recording.",
  },
  {
    label: "Outcome",
    headline: "Built and running — no participant data yet.",
    body: "“Participant data has not yet been collected.” No findings are reported; what exists is the instrument itself.",
  },
] as const;

const navItems = [
  { id: "cs-overview", label: "Overview" },
  { id: "cs-question", label: "Question" },
  { id: "cs-conditions", label: "Conditions" },
  { id: "cs-method", label: "Method" },
  { id: "cs-task", label: "Task" },
  { id: "cs-signature", label: "Signature" },
  { id: "cs-instrumentation", label: "Instrumentation" },
  { id: "cs-reflection", label: "Reflection" },
] as const;

const reflections = [
  "A study that refuses to claim anything is harder to design than one that does. Every label had to survive the question: is this a finding, or is this a hypothesis?",
  "The answer key never reaches the interface. Three target statements exist in a separate file the task UI never reads — measurement stays separated from experience.",
  "One controller, two frames. Holding the task constant is what makes the comparison meaningful; the interface is the only variable.",
  "The quiet condition earns its name by what it removes, not by what it adds. Restraint here is a research decision, not a style.",
] as const;

/* ------------------------------------------------------------------ */
/* Condition previews — faithful ports of the study's own static mock  */
/* frames (focus/ConditionPreview.tsx), re-skinned with the portfolio  */
/* tokens. Structure and 16/10 proportions are unchanged.              */
/* ------------------------------------------------------------------ */

function ConventionalMock() {
  const topNav = ["File", "Edit", "View", "Insert", "Format", "Tools", "Help"];
  const toolsOne = ["B", "I", "U", "H1", "H2", "Link", "List", "Find"];
  const toolsTwo = ["Undo", "Redo", "Share", "Comment", "Export", "Sync"];
  const sideBars = ["w-5/6", "w-full", "w-4/6", "w-5/6", "w-3/6", "w-full", "w-4/6"];
  const sideTags = ["w-8", "w-6", "w-7", "w-5"];
  const activity = ["w-full", "w-5/6", "w-2/3", "w-4/5", "w-3/5", "w-11/12"];
  return (
    <div className="flex h-full flex-col text-[8px] leading-[1.4] text-muted-foreground sm:text-[9px]">
      <div className="flex items-center justify-between gap-2 border-b border-hairline px-3 py-2">
        <div className="flex items-center gap-2">
          <span className="size-1.5 bg-foreground" />
          <span className="font-medium uppercase tracking-[0.16em] text-foreground">Workspace</span>
        </div>
        <div className="hidden gap-3 sm:flex">
          {topNav.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
        <div className="flex shrink-0 gap-1">
          <span className="size-2 border border-hairline" />
          <span className="size-2 border border-hairline" />
          <span className="size-2 border border-hairline" />
        </div>
      </div>
      <div className="flex min-h-0 flex-1">
        <aside className="flex w-[18%] shrink-0 flex-col gap-2 border-r border-hairline p-2 sm:w-[20%] sm:p-2.5">
          <span className="uppercase tracking-[0.14em] text-muted-foreground/60">Library</span>
          <div className="space-y-1.5">
            {sideBars.map((width, i) => (
              <span key={i} className={`block h-1.5 bg-muted-foreground/40 ${width}`} />
            ))}
          </div>
          <span className="mt-1 uppercase tracking-[0.14em] text-muted-foreground/60">Tags</span>
          <div className="flex flex-wrap gap-1">
            {sideTags.map((width, i) => (
              <span key={i} className={`block h-2 border border-hairline ${width}`} />
            ))}
          </div>
        </aside>
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex flex-wrap items-center gap-1 border-b border-hairline px-2 py-1.5">
            {toolsOne.map((tool) => (
              <span
                key={tool}
                className="flex h-4 items-center justify-center border border-hairline px-1 text-[7px]"
              >
                {tool}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-1 border-b border-hairline px-2 py-1.5">
            {toolsTwo.map((tool) => (
              <span
                key={tool}
                className="flex h-4 items-center justify-center border border-hairline px-1 text-[7px]"
              >
                {tool}
              </span>
            ))}
          </div>
          <div className="min-h-0 flex-1 space-y-2 overflow-hidden p-3">
            <div className="h-2 w-1/2 bg-foreground" />
            <div className="h-1.5 w-full bg-muted-foreground/50" />
            <div className="h-1.5 w-11/12 bg-muted-foreground/50" />
            <div className="h-1.5 w-10/12 bg-muted-foreground/50" />
            <div className="flex items-center gap-2">
              <span className="h-1.5 flex-1 bg-accent/50" />
              <span className="shrink-0 border border-accent px-1 py-px text-[6px] uppercase tracking-[0.1em] text-foreground">
                Marked
              </span>
            </div>
            <div className="h-1.5 w-full bg-muted-foreground/50" />
            <div className="h-1.5 w-9/12 bg-muted-foreground/50" />
            <div className="h-1.5 w-11/12 bg-muted-foreground/50" />
            <div className="h-1.5 w-8/12 bg-muted-foreground/50" />
          </div>
        </div>
        <aside className="hidden w-[24%] shrink-0 flex-col gap-2 border-l border-hairline p-2 sm:flex sm:p-2.5">
          <span className="uppercase tracking-[0.14em] text-muted-foreground/60">Activity</span>
          <div className="space-y-1.5">
            {activity.map((width, i) => (
              <span key={i} className="flex items-center gap-1.5">
                <span className="size-1.5 shrink-0 bg-hairline" />
                <span className={`block h-1.5 bg-muted-foreground/40 ${width}`} />
              </span>
            ))}
          </div>
          <span className="mt-1 uppercase tracking-[0.14em] text-muted-foreground/60">Outline</span>
          <div className="space-y-1.5">
            <span className="block h-1.5 w-full bg-muted-foreground/40" />
            <span className="block h-1.5 w-4/6 bg-muted-foreground/40" />
            <span className="block h-1.5 w-5/6 bg-muted-foreground/40" />
          </div>
        </aside>
      </div>
      <div className="flex items-center justify-between gap-2 border-t border-hairline px-3 py-1.5 text-[7px] uppercase tracking-[0.14em] text-muted-foreground/60">
        <span>Editing · Autosync · Outline · Comments · History</span>
        <span className="shrink-0">Ready</span>
      </div>
    </div>
  );
}

function QuietMock() {
  return (
    <div className="flex h-full flex-col text-[8px] leading-[1.4] text-muted-foreground sm:text-[9px]">
      <div className="flex items-center justify-between border-b border-hairline px-4 py-2.5">
        <span className="font-medium uppercase tracking-[0.24em] text-foreground">
          Quiet Interface
        </span>
        <span className="size-1.5 bg-accent" />
      </div>
      <div className="flex min-h-0 flex-1 flex-col justify-center px-5 sm:px-10">
        <div className="mx-auto w-full max-w-[72%] space-y-3">
          <span className="block h-px w-6 bg-accent" />
          <span className="block h-2 w-2/3 bg-foreground" />
          <span className="block h-1.5 w-full bg-muted-foreground/50" />
          <span className="block h-1.5 w-11/12 bg-muted-foreground/50" />
          <span className="block h-1.5 w-full bg-accent/50" />
          <span className="block h-1.5 w-9/12 bg-muted-foreground/50" />
        </div>
        <div className="mx-auto mt-6 w-full max-w-[72%]">
          <span className="inline-flex h-5 items-center border border-hairline px-3 text-[7px] uppercase tracking-[0.16em] text-foreground sm:text-[8px]">
            Mark statement
          </span>
        </div>
      </div>
      <div className="border-t border-hairline px-4 py-2 text-[7px] uppercase tracking-[0.14em] text-muted-foreground/60 sm:text-[8px]">
        One task at a time
      </div>
    </div>
  );
}

function ConditionFrame({
  variant,
  children,
  className = "",
}: {
  variant: "conventional" | "quiet";
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`relative aspect-16/10 w-full overflow-hidden border border-hairline bg-card ${className}`}
    >
      {variant === "conventional" ? <ConventionalMock /> : <QuietMock />}
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Interactive recreation of the task's signature constraint:          */
/* three marks, a fourth is refused until one is cleared.              */
/* ------------------------------------------------------------------ */

function MarkDemo() {
  const [marks, setMarks] = useState<string[]>([]);
  const [refused, setRefused] = useState(false);

  function toggle(sentence: string) {
    setRefused(false);
    setMarks((current) => {
      if (current.includes(sentence)) return current.filter((s) => s !== sentence);
      if (current.length >= MAX_MARKS) {
        setRefused(true);
        return current;
      }
      return [...current, sentence];
    });
  }

  return (
    <div>
      <p className="label-mono text-muted-foreground">Interactive recreation · Document step</p>
      <div className="mt-4 flex items-baseline justify-between gap-4 border-b border-hairline pb-3">
        <p className="label-mono text-foreground">Marks {marks.length}/{MAX_MARKS}</p>
        {refused ? (
          <p className="label-mono text-accent">A fourth is refused until you clear one.</p>
        ) : (
          <p className="label-mono text-muted-foreground">Task instructions</p>
        )}
      </div>
      <p className="mt-4 max-w-[60ch] text-sm leading-relaxed text-muted-foreground">
        Read the document, mark the three statements you consider most important, then add one
        short note.
      </p>
      <ol className="mt-6 border-t border-hairline">
        {allSentences.map((sentence, i) => {
          const marked = marks.includes(sentence);
          return (
            <li key={sentence}>
              <button
                type="button"
                onClick={() => toggle(sentence)}
                aria-pressed={marked}
                className={`flex w-full items-start gap-4 border-b border-hairline py-4 text-left transition-colors ${
                  marked ? "bg-accent/10" : "hover:bg-muted/60"
                }`}
              >
                <span className="label-mono mt-1 shrink-0 text-muted-foreground tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1 text-sm leading-relaxed">{sentence}</span>
                <span
                  className={`label-mono mt-1 shrink-0 border px-1.5 py-0.5 text-[9px] ${
                    marked ? "border-accent text-accent" : "border-hairline text-muted-foreground/60"
                  }`}
                >
                  {marked ? "Marked" : "Mark"}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
      <p className="label-mono mt-5 text-muted-foreground">
        Three of the seven statements are predetermined targets; the other four are plausible
        distractors. The key never reaches the task interface — and is not shown here.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */

export function QuietInterfaceCaseStudy({
  project,
  next,
}: {
  project: Project;
  next: Project;
}) {
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
          <span className="label-mono text-muted-foreground">
            {project.index} / {project.year}
          </span>
        </Shell>
      </header>
      <main>
        {/* HERO */}
        <section className="grain bg-paper pb-16 pt-28">
          <Shell>
            <p className="label-mono text-accent">
              {project.index} — Quiet Interface · {project.category}
            </p>
            <h1 className="display-xl mt-6 text-[clamp(3rem,13vw,12rem)] uppercase leading-[0.85]">
              <RevealWords text="Quiet Interface" />
            </h1>
            <div className="mt-8 grid gap-8 lg:grid-cols-12">
              <p className="display-lg text-[clamp(1.5rem,3vw,2.6rem)] leading-tight lg:col-span-7">
                {project.positioning}
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground lg:col-span-4 lg:col-start-9">
                An experimental interaction-design study exploring whether reducing visual
                competition, simultaneous choices and unnecessary interaction can change the
                experience of focused work. The prototype records observations only — it does not
                claim results.
              </p>
            </div>
            <Reveal className="mt-14">
              <div className="overflow-hidden bg-muted">
                <img
                  src={quietImg}
                  alt="Quiet Interface — preview of the quiet condition: one column, one primary control"
                  width={1600}
                  height={1000}
                  className="aspect-16/10 w-full object-cover"
                />
              </div>
            </Reveal>
          </Shell>
        </section>

        {/* 01 OVERVIEW */}
        <section id="cs-overview" className="bg-paper py-20">
          <Shell>
            <SectionHeader index="01" label="Overview" title="Study" />
            <CaseStudyNav items={navItems} className="mt-6" />
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["Role", project.role],
                ["Format", "Personal research prototype · two conditions"],
                ["Built with", project.tools.join(" · ")],
                ["Source", REPO_URL.replace("https://", "")],
              ].map(([k, v]) => (
                <div key={k} className="border-t border-hairline pt-3">
                  <p className="label-mono text-muted-foreground">{k}</p>
                  <p className="mt-1.5 text-sm leading-relaxed">{v}</p>
                </div>
              ))}
            </div>
            <dl className="mt-12 grid gap-6 border-t border-hairline pt-6 sm:grid-cols-3 sm:gap-10">
              {studyMeta.map(([term, detail]) => (
                <div key={term}>
                  <dt className="label-mono text-muted-foreground">{term}</dt>
                  <dd className="mt-3 text-[15px] leading-relaxed">{detail}</dd>
                </div>
              ))}
            </dl>
            <CaseStudyOverview steps={overviewSteps} className="mt-14" />
          </Shell>
        </section>

        {/* 02 RESEARCH QUESTION */}
        <section id="cs-question" data-tone="dark" className="grain-light bg-void py-28 text-void-foreground">
          <Shell>
            <SectionHeader index="02" label="The research question" invert />
            <Reveal>
              <p className="display-lg mt-12 max-w-[26ch] text-[clamp(1.8rem,4.4vw,4rem)] leading-[1.05]">
                {QUESTION}
              </p>
            </Reveal>
            <p className="mt-10 max-w-2xl border-t border-white/15 pt-6 leading-relaxed text-white/60">
              A framing question for stage one, open by design. The study is built to explore it,
              not to settle it.
            </p>
          </Shell>
        </section>

        {/* 03 HYPOTHESIS */}
        <section className="bg-paper py-24">
          <Shell>
            <SectionHeader index="03" label="Hypothesis" title="Untested proposition" />
            <Reveal className="mt-10">
              <p className="label-mono inline-flex items-center gap-2.5 border border-hairline px-3 py-2 text-muted-foreground">
                <span className="size-1.5 bg-accent" aria-hidden="true" />
                Untested proposition
              </p>
            </Reveal>
            <Reveal>
              <h2 className="display-lg mt-8 max-w-[44rem] text-[clamp(1.5rem,3vw,2.4rem)] leading-[1.3]">
                {HYPOTHESIS}
              </h2>
            </Reveal>
            <p className="mt-8 max-w-2xl border-t border-hairline pt-6 leading-relaxed text-muted-foreground">
              Stated as a hypothesis, not as a finding. The prototype is designed to explore
              whether differences in interface complexity are associated with differences in task
              performance and perceived experience — no effect is claimed.
            </p>
          </Shell>
        </section>

        {/* 04 CONDITIONS */}
        <section id="cs-conditions" className="bg-paper pb-24">
          <Shell>
            <SectionHeader index="04" label="Two interface conditions" title="Same task" />
            <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:gap-10">
              {conditions.map((condition, i) => (
                <Reveal key={condition.marker} delay={i * 0.08}>
                  <figure className="flex flex-col">
                    <ConditionFrame variant={i === 0 ? "conventional" : "quiet"} />
                    <figcaption className="mt-5 border-t border-hairline pt-4">
                      <p className="label-mono text-foreground">
                        {condition.marker} — {condition.name}
                      </p>
                      <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
                        {condition.description}
                      </p>
                      <ul className="mt-4 max-w-md border-t border-hairline pt-3">
                        {condition.attributes.map((attribute) => (
                          <li
                            key={attribute}
                            className="label-mono flex items-baseline gap-3 py-2 text-muted-foreground"
                          >
                            <span aria-hidden="true" className="text-muted-foreground/50">
                              —
                            </span>
                            {attribute}
                          </li>
                        ))}
                      </ul>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
            <p className="label-mono mt-10 border-t border-hairline pt-5 text-muted-foreground">
              The document, the steps and the required responses stay identical — only the
              interface around them changes.
            </p>
          </Shell>
        </section>

        {/* 05 METHOD */}
        <section id="cs-method" className="bg-paper pb-24">
          <Shell>
            <SectionHeader index="05" label="Method" title="How the study is structured" />
            <ol className="mt-10 grid border-t border-hairline lg:grid-cols-2">
              {methodSteps.map((step) => (
                <li
                  key={step.index}
                  className="border-b border-hairline py-8 lg:odd:pr-10 lg:even:border-l lg:even:border-hairline lg:even:pl-10 lg:py-10"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="label-mono text-muted-foreground tabular-nums">
                      {step.index}
                    </span>
                    <h3 className="display-lg text-2xl">{step.title}</h3>
                  </div>
                  {"body" in step && step.body ? (
                    <p className="mt-5 max-w-md leading-relaxed text-muted-foreground">
                      {step.body}
                    </p>
                  ) : null}
                  {"items" in step && step.items ? (
                    <ul className="mt-5 max-w-md divide-y divide-hairline border-t border-hairline">
                      {step.items.map((item) => (
                        <li key={item} className="flex items-baseline gap-3 py-2.5 text-sm text-muted-foreground">
                          <span aria-hidden="true" className="text-muted-foreground/50">
                            —
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              ))}
            </ol>
            <p className="label-mono mt-8 inline-flex items-start gap-3 border border-hairline bg-muted px-4 py-3.5 text-muted-foreground">
              <span className="mt-[6px] size-1.5 shrink-0 bg-accent" aria-hidden="true" />
              Participant data has not yet been collected.
            </p>
          </Shell>
        </section>

        {/* 06 THE STANDARDIZED TASK */}
        <section id="cs-task" className="bg-paper pb-24">
          <Shell>
            <SectionHeader index="06" label="The standardized task" title="Read · Mark · Note · Submit" />
            <div className="mt-10 grid gap-12 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <Reveal>
                  <div className="border border-hairline bg-card p-6">
                    <p className="label-mono text-accent">The document</p>
                    <h3 className="display-lg mt-3 text-2xl leading-tight">
                      Daylight and Alertness at Work
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      A short review, prepared for this study
                    </p>
                    <div className="mt-6 space-y-5">
                      {documentParagraphs.map((paragraph) => (
                        <div key={paragraph.label}>
                          <p className="label-mono text-muted-foreground">{paragraph.label}</p>
                          <ul className="mt-2 space-y-2">
                            {paragraph.sentences.map((sentence) => (
                              <li key={sentence} className="text-[13px] leading-relaxed text-muted-foreground">
                                {sentence}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    <p className="mt-6 border-t border-hairline pt-4 text-xs leading-relaxed text-muted-foreground">
                      Seven statements, deliberately about a subject outside the study's own
                      research question.
                    </p>
                  </div>
                </Reveal>
              </div>
              <ol className="lg:col-span-6 lg:col-start-7">
                {taskOutline.map((item) => (
                  <Reveal key={item.index}>
                    <li className="border-t border-hairline py-6">
                      <div className="flex items-baseline gap-4">
                        <span className="label-mono text-muted-foreground tabular-nums">
                          {item.index}
                        </span>
                        <h3 className="display-lg text-2xl">{item.title}</h3>
                      </div>
                      <p className="mt-3 max-w-md leading-relaxed text-muted-foreground">
                        {item.detail}
                      </p>
                    </li>
                  </Reveal>
                ))}
              </ol>
            </div>
          </Shell>
        </section>

        {/* 07 SESSION FLOW */}
        <section className="bg-paper pb-24">
          <Shell>
            <SectionHeader index="07" label="Session flow" title="One task, twice" />
            <ol className="mt-10">
              {flows.map((f, i) => (
                <Reveal key={f.index}>
                  <li
                    className="flex items-baseline gap-6 border-t border-hairline py-5"
                    style={{ paddingLeft: `${i * 4}%` }}
                  >
                    <span className="label-mono text-accent">{f.index}</span>
                    <span
                      className={`display-lg uppercase text-[clamp(1.2rem,2.8vw,2.4rem)] leading-tight ${
                        i === flows.length - 1 ? "text-accent" : ""
                      }`}
                    >
                      {f.title}
                    </span>
                  </li>
                </Reveal>
              ))}
            </ol>
            <div className="mt-10 grid gap-10 lg:grid-cols-2">
              <div>
                <p className="label-mono text-muted-foreground">Counterbalanced presentation</p>
                <ul className="mt-4 divide-y divide-hairline border-y border-hairline">
                  {counterbalance.map(([order, sequence]) => (
                    <li key={order} className="flex items-baseline justify-between gap-4 py-3.5">
                      <span className="label-mono text-muted-foreground">{order}</span>
                      <span className="display-lg text-lg">{sequence}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
                  The order of the two conditions is set in advance rather than chosen —
                  participants are never asked to pick.
                </p>
              </div>
              <div>
                <p className="label-mono text-muted-foreground">Anonymity</p>
                <ul className="mt-4 divide-y divide-hairline border-y border-hairline">
                  {[
                    "Random, non-identifying session ids",
                    "Responses stay in the browser session",
                    "No accounts and no analytics",
                  ].map((line) => (
                    <li key={line} className="py-3.5 text-sm leading-relaxed text-muted-foreground">
                      {line}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
                  Completing each condition once, on the same document, is what produces the
                  comparison.
                </p>
              </div>
            </div>
          </Shell>
        </section>

        {/* 08 SIGNATURE INTERACTION */}
        <section id="cs-signature" className="bg-paper pb-24">
          <Shell>
            <SectionHeader index="08" label="Interaction / prototype" title="Three marks, not four" />
            <div className="mt-12 grid gap-14 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <h2 className="display-xl text-[clamp(2.4rem,6vw,5.5rem)] uppercase leading-[0.9]">
                  Three marks.
                  <br />
                  Not four.
                </h2>
                <p className="mt-8 max-w-md leading-relaxed text-muted-foreground">
                  The task's signature constraint: exactly three statements may be marked, and a
                  fourth attempt is refused until one is cleared. The constraint is identical in
                  both interface conditions — try it below, on the study's actual document.
                </p>
                <p className="label-mono mt-8 text-muted-foreground">
                  Static recreation — the live prototype records observations; this demo records
                  nothing.
                </p>
              </div>
              <div className="lg:col-span-6 lg:col-start-7">
                <Reveal>
                  <MarkDemo />
                </Reveal>
              </div>
            </div>
          </Shell>
        </section>

        {/* 09 INSTRUMENTATION */}
        <section id="cs-instrumentation" data-tone="dark" className="grain-light bg-void py-24 text-void-foreground">
          <Shell>
            <SectionHeader index="09" label="Instrumentation" title="What is recorded" invert />
            <p className="mt-8 max-w-2xl leading-relaxed text-white/60">
              Anonymous measurement runs underneath the task. Per condition, the recorder keeps
              step timings, response scoring against the hidden answer key and interaction
              counts.
            </p>
            <div className="mt-12 grid gap-12 lg:grid-cols-2">
              <div>
                <p className="label-mono text-accent">Measures kept per condition</p>
                <ul className="mt-4 grid gap-x-8 sm:grid-cols-2">
                  {recordedMeasures.map((measure) => (
                    <li key={measure} className="border-t border-white/15 py-3 text-sm text-white/70">
                      {measure}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="label-mono text-accent">Event stream</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {recordedEvents.map((event) => (
                    <span
                      key={event}
                      className="border border-white/15 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-white/60"
                    >
                      {event}
                    </span>
                  ))}
                </div>
                <p className="mt-6 max-w-md border-t border-white/15 pt-5 text-sm leading-relaxed text-white/60">
                  Note contents are never recorded. Sessions are held in memory and tab storage
                  only — nothing is sent anywhere, and no identifying information is collected.
                </p>
              </div>
            </div>
            <p className="label-mono mt-12 inline-flex items-start gap-3 border border-white/15 px-4 py-3.5 text-white/60">
              <span className="mt-[6px] size-1.5 shrink-0 bg-accent" aria-hidden="true" />
              Observations only — no comparisons or conclusions are drawn here.
            </p>
          </Shell>
        </section>

        {/* 10 THE TWO INTERFACES */}
        <section className="bg-paper py-24">
          <Shell>
            <SectionHeader index="10" label="The two interfaces" title="Frame anatomy" />
            <p className="mt-8 max-w-2xl leading-relaxed text-muted-foreground">
              Both frames receive the identical controller, so the task itself never differs
              between conditions — only the interface wrapped around it.
            </p>
            <div className="mt-12 grid gap-16 lg:grid-cols-2">
              {frameAnatomy.map((frame, i) => (
                <div key={frame.marker}>
                  <ConditionFrame variant={i === 0 ? "conventional" : "quiet"} />
                  <div className="mt-6 flex items-baseline gap-4">
                    <span className="label-mono text-accent">{frame.marker}</span>
                    <h3 className="display-lg text-2xl uppercase">{frame.name}</h3>
                  </div>
                  <p className="mt-4 max-w-md leading-relaxed text-muted-foreground">{frame.intro}</p>
                  <ul className="mt-6 max-w-md divide-y divide-hairline border-t border-hairline">
                    {frame.items.map((item) => (
                      <li key={item} className="flex items-baseline gap-3 py-2.5 text-sm text-muted-foreground">
                        <span aria-hidden="true" className="text-muted-foreground/50">
                          —
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Shell>
        </section>

        {/* 11 STUDY DESIGN SYSTEM */}
        <section className="bg-paper pb-24">
          <Shell>
            <SectionHeader index="11" label="Study design system" title="The prototype's own language" />
            <div className="mt-10 grid gap-px border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-3">
              {studyDesignSystem.map(([label, value]) => (
                <div key={label} className="bg-paper p-6">
                  <p className="label-mono text-accent">{label}</p>
                  <p className="mt-3 text-sm leading-relaxed">{value}</p>
                </div>
              ))}
            </div>
            <div className="mt-12 grid gap-12 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <p className="label-mono text-muted-foreground">Accessibility, as implemented</p>
                <ul className="mt-4 grid gap-x-10 sm:grid-cols-2">
                  {studyA11y.map((item) => (
                    <li key={item} className="border-t border-hairline py-3 text-sm">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground lg:col-span-4 lg:col-start-9">
                No formal accessibility audit or compliance certification has been carried out —
                the list above describes what the prototype itself implements.
              </p>
            </div>
          </Shell>
        </section>

        {/* 12 TESTING / VALIDATION */}
        <section className="bg-paper pb-24">
          <Shell>
            <SectionHeader index="12" label="Testing / validation" title="Built, not yet run" />
            <p className="display-lg mt-10 max-w-3xl text-2xl text-accent">
              “Participant data has not yet been collected.”
            </p>
            <div className="mt-12 grid gap-14 lg:grid-cols-2">
              <div>
                <p className="label-mono text-muted-foreground">What exists</p>
                <ul className="mt-4">
                  {[
                    "The complete focus task, working end to end in both conditions",
                    "Anonymous, per-condition observation recording",
                    "A researcher development view for inspecting the instrumentation",
                    "Counterbalanced, researcher-controlled session orders",
                  ].map((line) => (
                    <li key={line} className="border-t border-hairline py-3.5 text-sm leading-relaxed">
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="label-mono text-muted-foreground">What is deliberately missing</p>
                <ul className="mt-4">
                  {[
                    "Participants and sessions — none have been run",
                    "Comparisons between conditions — none are drawn",
                    "Usability scores or outcomes — none are reported",
                  ].map((line) => (
                    <li key={line} className="border-t border-hairline py-3.5 text-sm leading-relaxed">
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Shell>
        </section>

        {/* 13 OUTCOME / STATUS */}
        <section className="bg-paper pb-24">
          <Shell>
            <SectionHeader index="13" label="Outcome" title="Honest reporting" />
            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {["Personal research prototype", "Two interface conditions", "No participant data recorded"].map(
                (line) => (
                  <div key={line} className="border-t border-hairline pt-4">
                    <p className="display-lg text-xl leading-snug">{line}</p>
                  </div>
                ),
              )}
            </div>
            <p className="mt-10 max-w-2xl leading-relaxed text-muted-foreground">
              Because no sessions have been collected, this project reports no metrics — no
              completion times, no error rates, no preference results. What it demonstrates is a
              working experimental instrument: two honestly different interfaces, one constant
              task, and measurement designed to stay out of the participant's way.
            </p>
          </Shell>
        </section>

        {/* 14 REFLECTION */}
        <section id="cs-reflection" className="bg-paper pb-24">
          <Shell>
            <SectionHeader index="14" label="Reflection" title="Design learnings, not findings" />
            <ol className="mt-10">
              {reflections.map((r, i) => (
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
            <div className="mt-12 grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-6">
                <p className="label-mono text-muted-foreground">Limitations</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  A small exploratory design, run locally: sessions live in memory and tab
                  storage, and stage one has no remote persistence. Nothing here has been tested
                  with participants, so nothing here is a finding.
                </p>
              </div>
              <div className="lg:col-span-5 lg:col-start-8">
                <p className="label-mono text-muted-foreground">Next steps</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Run the task with participants, alternate the counterbalanced order between
                  sessions, and register a remote sink for sessions — the recorder is built so
                  persistence can be swapped in without touching the interface.
                </p>
              </div>
            </div>
          </Shell>
        </section>

        {/* FINAL */}
        <section data-tone="dark" className="grain-light bg-void py-28 text-void-foreground">
          <Shell>
            <Reveal>
              <p className="display-lg max-w-[24ch] text-[clamp(1.8rem,4.4vw,4rem)] leading-[1.05]">
                Two interfaces. One task. No conclusions — yet.
              </p>
            </Reveal>
            <p className="mt-8 max-w-xl leading-relaxed text-white/60">
              Quiet Interface is a research instrument first and a portfolio piece second: it
              demonstrates how a study can be built to explore a question without ever being
              allowed to answer it prematurely.
            </p>
            <div className="mt-14 flex flex-wrap gap-8">
              <Link to={{ pathname: "/", hash: "work" }} className="label-mono link-underline">
                ← Back to work
              </Link>
              <a
                href={REPO_URL}
                target="_blank"
                rel="noreferrer"
                className="label-mono link-underline"
              >
                View the source repository ↗
              </a>
              <Link to={`/work/${next.slug}`} data-cursor="Next" className="label-mono link-underline">
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
