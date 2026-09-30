/**
 * PROJECT DATA — ported 1:1 from the Design Alchemy repository
 * (github.com/Jennifer-source/design-alchemy — src/data/projects.ts).
 * Images are the original repo assets, vendored into src/assets.
 */
import fleetopsImg from "@/assets/work-fleetops.jpg";
import mobileImg from "@/assets/work-mobile.jpg";
import typoImg from "@/assets/work-typo.jpg";
import labImg from "@/assets/work-lab.jpg";
import belongImg from "@/assets/work-belong.jpg";

export type Insight = { n: string; title: string; body: string };
export type ProcessStep = { title: string; caption: string; learned: string };

export type Project = {
  id: string;
  index: string;
  title: string;
  slug: string;
  year: string;
  category: string;
  description: string;
  positioning: string;
  role: string;
  timeline: string;
  team: string;
  tools: string[];
  heroImage: string;
  thumbnail: string;
  tone: "light" | "dark";
  challenge: string;
  context: string;
  research: { method: string; detail: string }[];
  insights: Insight[];
  hmw: string[];
  principles: { title: string; body: string }[];
  process: ProcessStep[];
  designSystem: { label: string; value: string }[];
  finalScreens: { title: string; caption: string }[];
  outcome: { label: string; body: string }[];
  reflection: string;
  limitations: string;
  nextSteps: string;
};

export const projects: Project[] = [
  {
    id: "fleetops",
    index: "01",
    title: "FleetOps",
    slug: "fleetops",
    year: "2026",
    category: "UX Research / Product Design / UI Design",
    description:
      "Simplifying complex fleet operations into a clear decision-making system.",
    positioning:
      "A control room for people who need to know what matters now — not everything at once.",
    role: "Lead Product Designer (research, IA, UI, prototyping)",
    timeline: "14 weeks · self-directed",
    team: "Individual project, reviewed with two operations practitioners",
    tools: ["Figma", "FigJam", "Maze", "React", "Motion"],
    heroImage: fleetopsImg,
    thumbnail: fleetopsImg,
    tone: "dark",
    challenge:
      "Dispatchers monitor dozens of live vehicles across screens that were designed for data completeness rather than decisions. Critical exceptions get buried inside dense tables.",
    context:
      "Regional logistics operators running 40–200 vehicles, with dispatchers working 10-hour shifts and switching between four disconnected tools.",
    research: [
      { method: "Contextual interviews", detail: "6 dispatchers observed during live shifts" },
      { method: "Task analysis", detail: "Mapped 3 recurring exception-handling flows end to end" },
      { method: "Competitive teardown", detail: "5 fleet platforms audited on information hierarchy" },
      { method: "Diary study", detail: "2 weeks of end-of-shift friction notes" },
    ],
    insights: [
      {
        n: "01",
        title: "Users don't struggle with information.",
        body: "They struggle with knowing what matters now. Everything on screen carried the same visual weight, so priority became a memory task.",
      },
      {
        n: "02",
        title: "Complex dashboards create cognitive overload.",
        body: "Dispatchers rebuilt the same mental filter dozens of times per shift because the interface never remembered their intent.",
      },
      {
        n: "03",
        title: "Users need confidence before speed.",
        body: "Every fast action was undone by a slow second-guess: people re-opened records to confirm what they had just done.",
      },
      {
        n: "04",
        title: "Exceptions are the real product.",
        body: "Routine trips need no interface at all. The value lives entirely in the 4% of events that break the plan.",
      },
    ],
    hmw: [
      "How might we surface the smallest set of events that actually require a human decision?",
      "How might we let dispatchers act without losing the context they built up?",
      "How might we make an action feel confirmed without a second confirmation screen?",
    ],
    principles: [
      { title: "Priority is a design decision", body: "The interface, not the operator, carries the ranking logic." },
      { title: "Context travels with the task", body: "Acting on an event never costs you your place." },
      { title: "Calm by default", body: "Colour and motion are reserved for state change only." },
      { title: "Legible under pressure", body: "Readable at arm's length, on a dim shift, at hour nine." },
    ],
    process: [
      {
        title: "Sketch round 01 — the mega-dashboard",
        caption: "Nine live modules on a single canvas, everything visible at once.",
        learned:
          "Why this didn't work: it optimised for the manager's overview, not the dispatcher's decision. Density replaced hierarchy.",
      },
      {
        title: "Sketch round 02 — the queue",
        caption: "A single prioritised stream of exceptions with inline actions.",
        learned:
          "What changed: the map became supporting evidence instead of the main object. Time-to-first-action dropped in the walkthrough.",
      },
      {
        title: "Wireframe round 03 — split focus",
        caption: "Queue on the left, live context panel on the right, persistent state.",
        learned:
          "What I learned: people trust a system that keeps their place. Preserving scroll and filter state removed most re-checking behaviour.",
      },
      {
        title: "Prototype round 04 — motion as explanation",
        caption: "Resolved items animate out of the queue into a collapsed history rail.",
        learned:
          "Motion earned its place here: it explains where the item went, which removed the need for a confirmation toast.",
      },
    ],
    designSystem: [
      { label: "Type", value: "Archivo — 4 sizes, 2 weights, tabular numerals for all data" },
      { label: "Colour", value: "Neutral base, single vermilion accent reserved for state change" },
      { label: "Spacing", value: "4pt base scale, 8pt rhythm for layout blocks" },
      { label: "Grid", value: "12 columns, 24px gutters, fixed rail widths" },
      { label: "Components", value: "Event row, context panel, action bar, status pill, filter chip" },
      { label: "States", value: "Every component specified for idle, hover, focus, loading, error, empty" },
      { label: "Accessibility", value: "AA contrast minimum, full keyboard queue traversal, no colour-only status" },
    ],
    finalScreens: [
      { title: "Exception queue", caption: "Priority-ranked stream with inline resolution." },
      { title: "Live context", caption: "Vehicle, route and history in one uninterrupted panel." },
      { title: "Shift handover", caption: "An auto-composed summary of what the next person inherits." },
    ],
    outcome: [
      { label: "What changed", body: "The dashboard became a queue. Decisions replaced monitoring as the core interaction." },
      { label: "Validated", body: "In moderated walkthroughs with 4 dispatchers, every participant located and resolved the top-priority exception without guidance." },
      { label: "Feedback", body: "\"This is the first version where I'd know what to do in the first two seconds.\" — dispatcher, 9 years experience" },
    ],
    reflection:
      "I spent the first three weeks designing for completeness because completeness is easy to justify. The project improved the moment I accepted that most of the data should never be on screen.",
    limitations:
      "No production deployment, so there are no operational metrics. Findings come from a small qualitative sample and should be treated as directional.",
    nextSteps:
      "Instrument a pilot to measure time-to-resolution, and test the handover summary across a full shift rotation.",
  },
  {
    id: "belong",
    index: "02",
    title: "Belong",
    slug: "belong",
    year: "2026",
    category: "HCI / UX Research / Interaction Design",
    description: "Designing for the uncertainty of belonging.",
    positioning:
      "A research-driven HCI concept helping international students navigate unfamiliar systems, social situations, and everyday uncertainty.",
    role: "UX/UI Designer · HCI Researcher · Product Designer",
    timeline: "Conceptual prototype",
    team: "Individual project",
    tools: ["React", "TypeScript", "Figma"],
    heroImage: belongImg,
    thumbnail: belongImg,
    tone: "light",
    challenge: "",
    context: "",
    research: [],
    insights: [],
    hmw: [],
    principles: [],
    process: [],
    designSystem: [],
    finalScreens: [],
    outcome: [],
    reflection: "",
    limitations: "",
    nextSteps: "",
  },
  {
    id: "mira",
    index: "03",
    title: "Mira Health",
    slug: "mira-health",
    year: "2025",
    category: "Research / Mobile Product Design",
    description:
      "A research-driven companion for people managing long-term conditions between appointments.",
    positioning: "Care doesn't happen in the clinic. It happens in the 363 days in between.",
    role: "UX Researcher & Product Designer",
    timeline: "10 weeks",
    team: "Individual, with clinician feedback sessions",
    tools: ["Figma", "Dovetail", "Protopie"],
    heroImage: mobileImg,
    thumbnail: mobileImg,
    tone: "light",
    challenge:
      "Tracking apps ask patients to log constantly and give almost nothing back, so people abandon them within two weeks.",
    context: "Adults managing a chronic condition with quarterly specialist appointments.",
    research: [
      { method: "In-depth interviews", detail: "7 participants across 3 conditions" },
      { method: "Artefact analysis", detail: "Reviewed personal notebooks, notes apps and photos used instead of trackers" },
      { method: "Clinician sessions", detail: "2 conversations on what data is actually usable in consultation" },
    ],
    insights: [
      { n: "01", title: "Logging is a cost, not a habit.", body: "People tracked willingly only when the record was useful to someone else." },
      { n: "02", title: "The appointment is the deadline.", body: "Motivation spikes in the week before a visit and collapses after it." },
      { n: "03", title: "Patients narrate; apps tabulate.", body: "People remember episodes and stories, not numeric scales." },
    ],
    hmw: [
      "How might we turn scattered notes into something a clinician can read in 60 seconds?",
      "How might we make logging feel like preparing, not reporting?",
    ],
    principles: [
      { title: "Ask less, infer more", body: "Every field must justify its existence." },
      { title: "Give something back", body: "Each entry visibly improves the appointment summary." },
      { title: "Respect the bad days", body: "Streaks and guilt mechanics are excluded by design." },
    ],
    process: [
      { title: "Concept 01 — daily score", caption: "A single wellbeing number logged each morning.", learned: "Why this didn't work: it flattened experiences people described as complex and episodic." },
      { title: "Concept 02 — episode capture", caption: "Log only when something notable happens, in your own words.", learned: "What changed: entry volume dropped and usefulness rose. Voice notes became the primary input." },
      { title: "Concept 03 — appointment brief", caption: "The app assembles a one-page brief before each visit.", learned: "What I learned: the artefact, not the app, is the product." },
    ],
    designSystem: [
      { label: "Type", value: "Large body sizes, 17px minimum, generous line height" },
      { label: "Colour", value: "Warm neutrals only; no red/green health-status coding" },
      { label: "Components", value: "Episode card, voice capture, timeline, brief composer" },
      { label: "Accessibility", value: "Dynamic type support, 48px touch targets, full VoiceOver labelling" },
    ],
    finalScreens: [
      { title: "Episode capture", caption: "Voice-first, thirty seconds, no forms." },
      { title: "Timeline", caption: "Episodes grouped into patterns rather than daily rows." },
      { title: "Appointment brief", caption: "One page, printable, written for the clinician." },
    ],
    outcome: [
      { label: "What changed", body: "The product goal moved from daily tracking to appointment preparation." },
      { label: "Feedback", body: "Both clinicians said the one-page brief was the first patient-generated document they'd realistically read." },
    ],
    reflection: "I designed a tracker before I understood that nobody wanted to track. The interviews were clear about this in week two; I heard it properly in week six.",
    limitations: "No longitudinal testing, and no participants with low digital confidence were recruited — a significant gap.",
    nextSteps: "Recruit a broader sample and test the brief inside a real consultation.",
  },
  {
    id: "kinetic",
    index: "04",
    title: "Kinetic Type",
    slug: "kinetic-type",
    year: "2025",
    category: "Graphic Design / Motion / Typography",
    description: "A typographic system that behaves — letterforms as an interface for rhythm and emphasis.",
    positioning: "What if type responded to reading rather than sitting still?",
    role: "Designer & Creative Technologist",
    timeline: "6 weeks",
    team: "Individual",
    tools: ["Figma", "After Effects", "Canvas API", "Variable fonts"],
    heroImage: typoImg,
    thumbnail: typoImg,
    tone: "light",
    challenge: "Motion in typography is usually decorative. I wanted to test whether it can carry meaning.",
    context: "A self-initiated studio project exploring variable font axes as an expressive channel.",
    research: [
      { method: "Reference study", detail: "40 Swiss and Japanese editorial spreads catalogued for emphasis strategies" },
      { method: "Reading tests", detail: "Informal comparison of static vs. responsive emphasis with 8 readers" },
    ],
    insights: [
      { n: "01", title: "Weight reads faster than colour.", body: "Readers located emphasised terms more reliably through weight shifts than through hue." },
      { n: "02", title: "Motion has a budget.", body: "Beyond roughly two moving elements, comprehension dropped and irritation rose." },
    ],
    hmw: ["How might a variable axis express hierarchy the way a voice expresses stress?"],
    principles: [
      { title: "One thing moves", body: "Never more than a single element in motion per viewport." },
      { title: "Motion follows meaning", body: "Every animated axis maps to a semantic property." },
    ],
    process: [
      { title: "Study 01 — everything animates", caption: "Full-page continuous weight oscillation.", learned: "Why this didn't work: unreadable within seconds. Motion without hierarchy is noise." },
      { title: "Study 02 — scroll-linked weight", caption: "Weight tied to scroll velocity.", learned: "What changed: motion became a consequence of the reader's own action, which made it feel intentional." },
    ],
    designSystem: [
      { label: "Axes", value: "Weight 200–900, width 75–125, optical size linked to viewport" },
      { label: "Grid", value: "Asymmetric 7-column editorial grid" },
      { label: "Accessibility", value: "All motion disabled under prefers-reduced-motion, with static emphasis retained" },
    ],
    finalScreens: [
      { title: "Poster set", caption: "Six posters generated from the same type engine." },
      { title: "Reader", caption: "A long-form reading view with scroll-linked emphasis." },
    ],
    outcome: [
      { label: "What changed", body: "Motion moved from ornament to a legitimate hierarchy tool in my own practice." },
      { label: "Validated", body: "Readers preferred the restrained version 7 out of 8 times." },
    ],
    reflection: "The best version of this project was the one with the least movement in it.",
    limitations: "Tested informally, on desktop only, with a small and design-literate group.",
    nextSteps: "Package the engine as an open component and test comprehension properly.",
  },
  {
    id: "signal",
    index: "05",
    title: "Signal Field",
    slug: "signal-field",
    year: "2024",
    category: "Creative Technology / Interaction",
    description: "An experimental interface where data becomes a landscape you navigate by feel.",
    positioning: "Reading a chart is analysis. Walking through data is intuition.",
    role: "Designer & Developer",
    timeline: "4 weeks",
    team: "Individual",
    tools: ["Canvas", "WebGL", "TypeScript"],
    heroImage: labImg,
    thumbnail: labImg,
    tone: "dark",
    challenge: "Conventional dashboards ask you to already know which question to ask.",
    context: "An experiment in exploratory data interfaces, built as a public sketch.",
    research: [
      { method: "Precedent study", detail: "Reviewed spatial and ambient data interfaces from research literature" },
      { method: "Play testing", detail: "9 people explored the sketch without instructions" },
    ],
    insights: [
      { n: "01", title: "Exploration needs a floor.", body: "Without a stable reference plane, people lost orientation within twenty seconds." },
      { n: "02", title: "Ambiguity invites questions.", body: "Testers asked more questions of the field than of an equivalent bar chart." },
    ],
    hmw: ["How might a spatial interface support wondering rather than reporting?"],
    principles: [
      { title: "Always recoverable", body: "One gesture returns you to the origin." },
      { title: "Precision on demand", body: "Ambient by default, exact when asked." },
    ],
    process: [
      { title: "Build 01 — free camera", caption: "Full 6-degree navigation of the point field.", learned: "Why this didn't work: freedom without landmarks produced disorientation, not insight." },
      { title: "Build 02 — constrained orbit", caption: "Orbit plus a fixed ground grid.", learned: "What changed: constraint made exploration legible. Testers stayed engaged three times longer." },
    ],
    designSystem: [
      { label: "Palette", value: "Near-black field, white point mesh, vermilion for selection only" },
      { label: "Interaction", value: "Orbit, hover-inspect, reset — three verbs total" },
      { label: "Accessibility", value: "Full keyboard alternative and a tabular data fallback view" },
    ],
    finalScreens: [
      { title: "The field", caption: "Ambient overview of the full dataset." },
      { title: "Inspect", caption: "Precise values surfaced on focus." },
    ],
    outcome: [
      { label: "What changed", body: "Confirmed that spatial data interfaces need conventional fallbacks, not replacements." },
      { label: "Limitation", body: "Performance degrades past roughly 50k points on mid-range hardware." },
    ],
    reflection: "It's the most technically ambitious thing I've built and the least useful — and both facts taught me something worth keeping.",
    limitations: "No accessibility testing with screen reader users yet; the fallback view is untested.",
    nextSteps: "Test the tabular fallback properly and profile rendering performance.",
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
