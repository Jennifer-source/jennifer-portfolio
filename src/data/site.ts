export const site = {
  name: "Joseph Jennifer",
  shortName: "JJ",
  year: "2026",
  role: "UI/UX Designer & Creative Technologist",
  positioning:
    "I turn complex problems into experiences people want to explore.",
  subPositioning:
    "Designing systems, stories, and interfaces for humans.",
  location: "Lagos, NG — open to remote",
  email: "hello@josephjennifer.design",
  links: {
    linkedin: "https://linkedin.com/in/josephjennifer",
    behance: "https://behance.net/josephjennifer",
    instagram: "https://instagram.com/josephjennifer.design",
    github: "https://github.com/josephjennifer",
  },
  manifest: ["WORK", "PROCESS", "ABOUT", "CONTACT"] as const,
} as const;

export const skills = [
  {
    group: "THINKING",
    items: [
      { name: "UX Research", note: "Interviews, synthesis, usability testing" },
      { name: "Information Architecture", note: "Structures that scale with content" },
      { name: "Interaction Design", note: "State, feedback, and affordance" },
      { name: "Systems Thinking", note: "Decisions that compound across screens" },
    ],
  },
  {
    group: "DESIGNING",
    items: [
      { name: "UI Design", note: "Typography-first, grid-disciplined interfaces" },
      { name: "Design Systems", note: "Tokens, components, documentation" },
      { name: "Visual Design", note: "Editorial layouts and art direction" },
      { name: "Prototyping", note: "High-fidelity, motion-aware flows" },
    ],
  },
  {
    group: "MAKING",
    items: [
      { name: "Figma", note: "Auto-layout rigor and variable-driven design" },
      { name: "Framer", note: "Production-feel interactive prototypes" },
      { name: "React + Tailwind", note: "This site is hand-coded, not templated" },
      { name: "Motion Design", note: "Easing, choreography, scroll narrative" },
    ],
  },
  {
    group: "EXPLORING",
    items: [
      { name: "AI + Design", note: "Interfaces for ambiguous machine output" },
      { name: "Creative Coding", note: "Canvas, SVG, generative systems" },
      { name: "Future Interfaces", note: "Voice, spatial, adaptive UI" },
    ],
  },
] as const;

export const processStages = [
  {
    id: "observe",
    index: "01",
    title: "OBSERVE",
    question: "“What is actually happening?”",
    methods: ["User interviews", "Field observation", "Competitive teardown"],
    outputs: ["Insight notes", "Behavior patterns", "Opportunity map"],
    blurb:
      "Before opinions, evidence. I watch people work, not just click through prototypes.",
  },
  {
    id: "understand",
    index: "02",
    title: "UNDERSTAND",
    question: "“Why does the current way fail?”",
    methods: ["Journey mapping", "Affinity synthesis", "Mental model diagrams"],
    outputs: ["Persona hypotheses", "Pain-point hierarchy", "Research wall"],
    blurb:
      "Raw data is noise. I cluster, name, and rank until the real constraint is visible.",
  },
  {
    id: "define",
    index: "03",
    title: "DEFINE",
    question: "“What are we actually solving?”",
    methods: ["Problem framing", "How-might-we writing", "Design principles"],
    outputs: ["Problem statement", "Design principles", "Success signals"],
    blurb:
      "A sharp problem is half the solution. I write principles short enough to argue with.",
  },
  {
    id: "explore",
    index: "04",
    title: "EXPLORE",
    question: "“What could this become?”",
    methods: ["Sketch sprints", "Wireframe systems", "Motion studies"],
    outputs: ["Three divergent directions", "Flow maps", "Interaction specs"],
    blurb:
      "Volume before polish. I sketch flows wide, then narrow with evidence — not taste.",
  },
  {
    id: "test",
    index: "05",
    title: "TEST",
    question: "“Where does it break for people?”",
    methods: ["Usability tests", "First-click testing", "A/B probes"],
    outputs: ["Task success notes", "Friction log", "Iteration list"],
    blurb:
      "I test the ugly version early. Every failure found here is cheaper than one shipped.",
  },
  {
    id: "refine",
    index: "06",
    title: "REFINE",
    question: "“Is every pixel a decision?”",
    methods: ["Design QA", "Systemization", "Motion pass"],
    outputs: ["Component library", "Handoff spec", "Retro + learnings"],
    blurb:
      "Refinement is where taste meets discipline. The last 5% is the part people feel.",
  },
] as const;

export const achievements = [
  {
    label: "RECOGNITION",
    year: "2025",
    title: "National Design Hackathon — Finalist",
    note: "Team lead, 48-hour product sprint on accessible transit.",
    status: "awarded",
  },
  {
    label: "CERTIFICATION",
    year: "2025",
    title: "Google UX Design Certificate",
    note: "Seven-course specialization — foundations to testing.",
    status: "complete",
  },
  {
    label: "COMMUNITY",
    year: "2024",
    title: "Design Peer-Mentor, Campus Collective",
    note: "Weekly critiques for 20+ first-year design students.",
    status: "ongoing",
  },
  {
    label: "RESEARCH",
    year: "2024",
    title: "Independent Study — Dashboards & Cognitive Load",
    note: "Literature review + comparative interface audit.",
    status: "in progress",
  },
  {
    label: "PUBLICATION",
    year: "2026",
    title: "Essay — “Interfaces That Explain Themselves”",
    note: "Drafting for Medium. Placeholder slot — real link coming.",
    status: "drafting",
  },
] as const;

export const experiments = [
  {
    id: "grid-drift",
    index: "001",
    title: "GRID DRIFT",
    kind: "Typography",
    blurb: "A type specimen that reflows as you scroll — order loosening, then snapping back.",
    art: "typeGrid" as const,
    tall: true,
  },
  {
    id: "pulse",
    index: "002",
    title: "PULSE",
    kind: "Creative coding",
    blurb: "Cursor-reactive dot field. Distance maps to scale, not color — restraint as a constraint.",
    art: "dots" as const,
    tall: false,
  },
  {
    id: "swiss-variants",
    index: "003",
    title: "SWISS VARIANTS",
    kind: "Poster series",
    blurb: "Twelve posters, one grid, zero new elements. Constraint as a design method.",
    art: "posters" as const,
    tall: false,
  },
  {
    id: "arc",
    index: "004",
    title: "ARC",
    kind: "Motion study",
    blurb: "Study of a single easing curve, looped until its personality became obvious.",
    art: "arc" as const,
    tall: false,
  },
  {
    id: "tokens",
    index: "005",
    title: "TOKEN, NOT COLOR",
    kind: "Interface exploration",
    blurb: "An interface skinned entirely by tokens — swap five values, keep every relationship.",
    art: "tokens" as const,
    tall: true,
  },
] as const;
