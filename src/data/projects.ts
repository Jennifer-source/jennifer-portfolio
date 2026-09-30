/**
 * PROJECT DATA — the single source of truth for the work section and case studies.
 * Replace or extend entries here; the UI renders whatever lives in this file.
 * Artwork is generative (see src/components/art.tsx) keyed by the art names below,
 * so real images/screens can later replace `heroArt`/`thumbArt` strings.
 */

export type Project = {
  id: string;
  number: string;
  title: string;
  slug: string;
  year: string;
  category: string;
  description: string;
  role: string;
  timeline: string;
  tools: string[];
  team: string;
  heroArt: string;
  thumbArt: string;
  overview: string;
  challenge: {
    context: string;
    problem: string;
    stats: { value: string; label: string; note: string }[];
    quote: string;
  };
  research: {
    approaches: { name: string; detail: string }[];
    insights: { title: string; body: string }[];
  };
  define: {
    statement: string;
    hmws: string[];
    principles: { title: string; body: string }[];
    personas: { name: string; meta: string; goal: string; friction: string }[];
  };
  ideation: {
    explorations: { caption: string; verdict: string; note: string }[];
    rejections: { title: string; why: string; learned: string }[];
  };
  designSystem: {
    intro: string;
    type: { name: string; spec: string }[];
    colors: { name: string; token: string; dark: boolean }[];
    components: string[];
    a11y: string[];
  };
  finalScreens: {
    caption: string;
    note: string;
    variant: "fleet" | "meds" | "studio";
    aspect: "wide" | "tall" | "square";
  }[];
  outcome: {
    summary: string;
    validations: { title: string; body: string }[];
    limitations: string;
    next: string[];
  };
  reflection: string;
};

export const projects: Project[] = [
  {
    id: "fleetops",
    number: "01",
    title: "FleetOps",
    slug: "fleetops",
    year: "2026",
    category: "Product Design",
    description:
      "Simplifying complex fleet operations into a clear decision-making system.",
    role: "UX Research / Product Design / UI Design",
    timeline: "12 weeks — 2026",
    tools: ["Figma", "Maze", "Google Sheets", "After Effects"],
    team: "Solo designer, mentored by an operations lead",
    heroArt: "fleet",
    thumbArt: "fleet",
    overview:
      "FleetOps is a concept product exploring how a logistics operator's morning changes when one screen answers “what matters now?” instead of showing everything at once.",
    challenge: {
      context:
        "Small fleet operators run their business from spreadsheets, WhatsApp threads, and one overwhelmed dashboard. Dispatchers juggle vehicles, drivers, fuel, and maintenance with no single view of risk.",
      problem:
        "Operators don't struggle with information. They struggle with knowing what matters now — current tools show everything equally, so attention is rationed by luck.",
      stats: [
        {
          value: "9 tools",
          label: "checked before 8am",
          note: "Reported across 5 dispatcher interviews",
        },
        {
          value: "0",
          label: "of them ranked by urgency",
          note: "Every tool surfaces data, none surface priority",
        },
        {
          value: "2×",
          label: "time re-finding the same number",
          note: "Observed during contextual inquiry sessions",
        },
      ],
      quote:
        "By the time I've checked everything, the day has already decided itself without me.",
    },
    research: {
      approaches: [
        {
          name: "Contextual inquiry",
          detail: "5 shadowing sessions with dispatchers during real morning shifts.",
        },
        {
          name: "Interviews",
          detail: "9 semi-structured interviews across operators, drivers, owners.",
        },
        {
          name: "Competitive teardown",
          detail: "6 fleet tools audited for information density and default views.",
        },
      ],
      insights: [
        {
          title: "Users don't struggle with information. They struggle with knowing what matters now.",
          body: "Every participant could find data eventually. What they lacked was a shared, trustworthy sense of order — what to act on first.",
        },
        {
          title: "Complex dashboards create cognitive overload.",
          body: "The average first screen showed 30+ data points. Participants described the feeling as “scanning a page of exam answers”.",
        },
        {
          title: "Users need confidence before speed.",
          body: "Dispatchers wouldn't act on a suggestion they couldn't verify in one step. Trust was the bottleneck, not latency.",
        },
      ],
    },
    define: {
      statement:
        "How might we give a fleet operator a trustworthy starting point for the day — one screen that says what matters now, and lets everything else wait its turn?",
      hmws: [
        "How might we rank the day before the operator has to?",
        "How might we make every number verifiable in one step?",
        "How might we let a glance carry the weight of a report?",
      ],
      principles: [
        {
          title: "Signal first",
          body: "The screen opens on what changed and what's at risk. Everything else is one deliberate click away.",
        },
        {
          title: "Verifiable by design",
          body: "Every alert links to its source row. No black-box numbers — trust is a feature.",
        },
        {
          title: "Calm under load",
          body: "Color is reserved for risk. A quiet screen is a usable screen at 7am.",
        },
      ],
      personas: [
        {
          name: "Amara, dispatcher",
          meta: "Runs 40 vehicles, mornings only",
          goal: "Leave for the yard knowing nothing will surprise her",
          friction: "Checks nine tools; still misses one overdue inspection",
        },
        {
          name: "Tunde, owner-operator",
          meta: "5 trucks, does everything himself",
          goal: "Spot a money problem before it becomes a breakdown",
          friction: "Numbers live in his head and three notebooks",
        },
      ],
    },
    ideation: {
      explorations: [
        {
          caption: "Sketch A — “The Wall”: every vehicle as an equal card",
          verdict: "Rejected",
          note: "Reproduced the dashboard problem at card scale. Equal cards still mean equal noise.",
        },
        {
          caption: "Sketch B — “The Queue”: a ranked list of actions",
          verdict: "Promising",
          note: "Ranking felt right, but lists hide spatial context — where a truck is matters as much as what it needs.",
        },
        {
          caption: "Sketch C — “The Morning Map”: ranked actions over a status map",
          verdict: "Developed",
          note: "Order plus geography. This direction became the final experience.",
        },
      ],
      rejections: [
        {
          title: "A chat-style AI assistant",
          why: "Testers loved the demo, then ignored it. Typing to a bot was slower than glancing at a ranked list.",
          learned:
            "Conversation is not always lower friction. For time-pressured work, glanceability beats dialogue.",
        },
        {
          title: "Dark-mode-first “control room” aesthetic",
          why: "Looked authoritative in mocks but read as alarming in daylight use.",
          learned:
            "Emotional tone is a usability variable. A calm surface outperforms an impressive one under stress.",
        },
      ],
    },
    designSystem: {
      intro:
        "A restrained system built for early mornings: one accent for risk, monochrome everything else, and typography that reads at arm's length.",
      type: [
        { name: "Display / numbers", spec: "Archivo Expanded · 800 · tracking −3.5%" },
        { name: "Section titles", spec: "Archivo · 700 · uppercase" },
        { name: "Data / labels", spec: "IBM Plex Mono · 400 · +14% tracking" },
      ],
      colors: [
        { name: "Paper", token: "bg / cards", dark: false },
        { name: "Ink", token: "text / structure", dark: true },
        { name: "Signal", token: "risk · action · focus", dark: true },
        { name: "Grid", token: "hairlines / dividers", dark: false },
      ],
      components: [
        "Alert row — risk, source, one-tap verify",
        "Status map — vehicles as live tiles",
        "Queue card — ranked action with confidence score",
        "Verify drawer — the receipt behind every number",
      ],
      a11y: [
        "Signal red passes 4.6:1 on paper — safe for text",
        "Color never carries meaning alone; each risk state pairs icon + label",
        "All actions reachable by keyboard; focus ring uses the signal color",
      ],
    },
    finalScreens: [
      {
        caption: "01 — The Morning Brief",
        note: "Ranked actions replace the unsorted dashboard.",
        variant: "fleet",
        aspect: "wide",
      },
      {
        caption: "02 — Verify drawer",
        note: "Every number opens its receipt in one tap.",
        variant: "fleet",
        aspect: "square",
      },
      {
        caption: "03 — Status map",
        note: "Where things are, and what they need, at a glance.",
        variant: "fleet",
        aspect: "wide",
      },
    ],
    outcome: {
      summary:
        "Concept stage, tested as a clickable prototype with the same dispatchers from research.",
      validations: [
        {
          title: "Expected outcome",
          body: "Dispatchers find the day's first action without scanning — measured by first-click success in tests.",
        },
        {
          title: "Usability signal",
          body: "5 of 5 testers completed the “plan my morning” task unaided on the second iteration.",
        },
        {
          title: "Validated decisions",
          body: "Ranked queue over equal cards; verify drawer over tooltips. Both chosen by testers, not by taste.",
        },
      ],
      limitations:
        "This is a concept validated on prototype, not in production. No business metrics exist yet, and none are claimed. Testers were from two depots in one city.",
      next: [
        "Pilot with one depot's live data",
        "Test the confidence model with edge-case vehicles",
        "Explore driver-side counterpart experience",
      ],
    },
    reflection:
      "The biggest shift for me was learning that ranking information is a design act. Removing nothing, adding nothing — just deciding an order — changed how testers felt about the same data.",
  },
  {
    id: "medmate",
    number: "02",
    title: "MedMate",
    slug: "medmate",
    year: "2025",
    category: "Mobile / Health",
    description:
      "A research-driven companion app that treats medication adherence as a memory problem, not a discipline problem.",
    role: "UX Research / Interaction Design / Mobile UI",
    timeline: "10 weeks — 2025",
    tools: ["Figma", "Protopie", "Notion", "Optimal Workshop"],
    team: "Pair project — one researcher, one designer (me)",
    heroArt: "meds",
    thumbArt: "meds",
    overview:
      "MedMate reframes adherence around context: what to take, with what, and what just happened — designed with, not for, people managing multiple prescriptions.",
    challenge: {
      context:
        "People managing three or more daily medications don't fail from forgetfulness alone — they fail from ambiguity: which pill, with food or without, and did that already happen today?",
      problem:
        "Reminder apps treat adherence as an alarm problem. Users described a different problem: knowing what to do now, and being certain it's safe.",
      stats: [
        {
          value: "3+",
          label: "daily medications per participant",
          note: "Screening criterion across all 8 interviews",
        },
        {
          value: "62%",
          label: "of missed doses were “unsure, not forgot”",
          note: "Diary study, two weeks, 8 participants",
        },
        {
          value: "1",
          label: "question asked more than any other",
          note: "“Is it safe to take this with what I just had?”",
        },
      ],
      quote:
        "I don't need a louder alarm. I need to be sure I'm doing the right thing.",
    },
    research: {
      approaches: [
        {
          name: "Diary study",
          detail: "8 participants, 14 days, daily photo + voice logs of doses.",
        },
        {
          name: "Interviews",
          detail: "8 depth interviews including 3 caregivers.",
        },
        {
          name: "Card sort",
          detail: "Open sort with 12 participants to name medication contexts.",
        },
      ],
      insights: [
        {
          title: "Adherence is a certainty problem, not a memory problem.",
          body: "Most missed doses weren't forgotten — they were skipped because the person wasn't sure. Certainty, not alarm, drives the next dose.",
        },
        {
          title: "Context beats time.",
          body: "People anchor doses to events (“after breakfast”), not clock times. Rigid alarms fought their real routines.",
        },
        {
          title: "Caregivers are silent second users.",
          body: "Three participants shared accounts with family. Designs that serve only the patient leave half the system out.",
        },
      ],
    },
    define: {
      statement:
        "How might we make the next dose feel certain — safe in context, confirmed in one glance, and visible to the people who help?",
      hmws: [
        "How might we anchor doses to routines instead of clocks?",
        "How might we answer “is this safe?” before it's asked?",
        "How might we make a caregiver's help feel invited, not surveilling?",
      ],
      principles: [
        {
          title: "Certainty over urgency",
          body: "No red badges. The next dose is presented as done-or-not, never as a failure countdown.",
        },
        {
          title: "Routine anchors",
          body: "Scheduling flows from meals and rituals, with time as support — not the spine.",
        },
        {
          title: "Designed with, not for",
          body: "Every flow was reviewed by participants before it was built.",
        },
      ],
      personas: [
        {
          name: "Grace, 67",
          meta: "4 medications, lives alone",
          goal: "Feel sure each dose is right and safe",
          friction: "Checks and re-checks the leaflet; fears double-dosing",
        },
        {
          name: "Daniel, caregiver son",
          meta: "Checks in remotely, twice a week",
          goal: "Help without hovering",
          friction: "No way to see yesterday without calling",
        },
      ],
    },
    ideation: {
      explorations: [
        {
          caption: "Exploration 1 — classic alarm list with checkboxes",
          verdict: "Rejected",
          note: "Familiar, but it reproduced the exact “discipline” framing participants pushed back on.",
        },
        {
          caption: "Exploration 2 — “Now” card with safety context",
          verdict: "Developed",
          note: "One card answers: what, with what, and what just happened. Became the core interaction.",
        },
        {
          caption: "Exploration 3 — photo-first check-in",
          verdict: "Adapted",
          note: "Great for confirmation, heavy as a default. Kept as an optional confirmation ritual.",
        },
      ],
      rejections: [
        {
          title: "Streaks and gamification",
          why: "Participants read streaks as a record of failure. One broken chain outweighed ten good days.",
          learned:
            "In health contexts, gamified history can become emotional debt. Progress must forgive.",
        },
        {
          title: "Full family dashboard with alerts",
          why: "Early reviews felt like surveillance. Caregivers themselves rejected the alert tone.",
          learned:
            "Support needs consent surfaces. Visibility must be something the patient grants, not loses.",
        },
      ],
    },
    designSystem: {
      intro:
        "A system tuned for low-stress use: large type, high contrast, and a single green signal — because nothing in this product should ever feel like an alarm.",
      type: [
        { name: "Primary", spec: "Archivo · 600–700 · 17–21px body sizes" },
        { name: "Numerals", spec: "Archivo Expanded · tabular figures" },
        { name: "Meta", spec: "IBM Plex Mono · 400 · labels + timestamps" },
      ],
      colors: [
        { name: "Paper", token: "base surfaces", dark: false },
        { name: "Ink", token: "primary text", dark: true },
        { name: "Signal", token: "confirm · focus · care", dark: true },
        { name: "Hush", token: "completed states", dark: false },
      ],
      components: [
        "Now card — next dose with safety context",
        "Routine rail — meal-anchored schedule",
        "Confirm flow — one-thumb, two-eyes confirmation",
        "Care link — consent-first sharing sheet",
      ],
      a11y: [
        "Body text ≥ 17px, minimum target size 48px",
        "Dynamic type respected to 130% without layout loss",
        "Color-blind safe: confirm state pairs icon + label + position",
      ],
    },
    finalScreens: [
      {
        caption: "01 — The Now card",
        note: "What to take, with what, and what just happened.",
        variant: "meds",
        aspect: "tall",
      },
      {
        caption: "02 — Routine rail",
        note: "Anchored to breakfast, not to 8:00 AM.",
        variant: "meds",
        aspect: "tall",
      },
      {
        caption: "03 — Care link",
        note: "Sharing designed as an invitation.",
        variant: "meds",
        aspect: "square",
      },
    ],
    outcome: {
      summary:
        "Prototype tested in two rounds with 6 participants from the original research group.",
      validations: [
        {
          title: "Expected outcome",
          body: "Participants confirm doses with fewer re-checks — second round needed no leaflet lookups.",
        },
        {
          title: "Usability signal",
          body: "6 of 6 completed the full “confirm today's doses” flow unaided; 5 called the Now card “calming”.",
        },
        {
          title: "Validated decisions",
          body: "Routine anchoring and consent-first care link both kept through testing; streaks stayed rejected.",
        },
      ],
      limitations:
        "Adherence itself wasn't measured — only task confidence and comprehension. Real-world effect needs a longitudinal study with clinical oversight.",
      next: [
        "Longitudinal diary pilot with the Now card",
        "Co-design sessions for the caregiver view",
        "Accessibility audit with low-vision participants",
      ],
    },
    reflection:
      "This project taught me to design the feeling, not just the flow. The moment we removed red from the interface, participants stopped describing it as “managing” and started describing it as “checking in”.",
  },
  {
    id: "kinetic",
    number: "03",
    title: "Kinetic Type Lab",
    slug: "kinetic-type-lab",
    year: "2025",
    category: "Creative Technology",
    description:
      "An experimental interaction project where typography is the interface — motion explains the content.",
    role: "Concept / Design / Creative Coding",
    timeline: "6 weeks — 2025",
    tools: ["React", "TypeScript", "Framer Motion", "Canvas API"],
    team: "Solo — design and code",
    heroArt: "type",
    thumbArt: "type",
    overview:
      "A series of live typographic instruments where weight, width, and position respond to scroll and cursor — built to answer one question: can motion carry meaning without decoration?",
    challenge: {
      context:
        "Motion on the web is usually garnish: easing curves applied after the content exists. I wanted to build the opposite — pieces where the motion is the content.",
      problem:
        "Most “animated typography” decorates words without changing what they say. Could variable-font motion make meaning legible — and do it accessibly?",
      stats: [
        {
          value: "5",
          label: "instruments built and shipped",
          note: "From 11 sketches — rejection was part of the spec",
        },
        {
          value: "0",
          label: "images used across the lab",
          note: "Type and motion only; the interface is the artwork",
        },
        {
          value: "100%",
          label: "functionality under reduced-motion",
          note: "Motion is enhancement, never the message's only carrier",
        },
      ],
      quote: "If the motion disappears and the meaning survives, the motion was honest.",
    },
    research: {
      approaches: [
        {
          name: "Benchmark study",
          detail: "Collected 30 animated-type references, coded by what the motion explains.",
        },
        {
          name: "Guerrilla testing",
          detail: "12 viewers described each piece's meaning before reading any copy.",
        },
        {
          name: "Reduced-motion audit",
          detail: "Every instrument rebuilt to a static equivalent, then compared for meaning.",
        },
      ],
      insights: [
        {
          title: "Motion explains change — or it's noise.",
          body: "Viewers described weight shifts as “emphasis growing”, not “text moving”. When motion encodes state, people read it as meaning.",
        },
        {
          title: "Easing has a personality.",
          body: "The same 300ms move read confident, playful, or nervous depending on the curve alone. Curves are a design material.",
        },
        {
          title: "Accessibility is a creative constraint.",
          body: "Static fallbacks forced sharper compositions. The reduced-motion versions are, embarrassingly, better design.",
        },
      ],
    },
    define: {
      statement:
        "How might we build typographic pieces where motion carries meaning — and where turning motion off loses polish, never information?",
      hmws: [
        "How might we map one state change to one motion verb?",
        "How might we make a font's own axes do the animating?",
        "How might we keep every piece complete at zero motion?",
      ],
      principles: [
        {
          title: "One verb per piece",
          body: "Each instrument explains exactly one change: grow, tilt, drift, compress. Two verbs is noise.",
        },
        {
          title: "The font is the engine",
          body: "Variable axes do the work — no transforms where a weight axis will do.",
        },
        {
          title: "Motion is an enhancement",
          body: "prefers-reduced-motion swaps choreography for typography, never for nothing.",
        },
      ],
      personas: [
        {
          name: "The reviewer",
          meta: "Design educator, 2-minute attention budget",
          goal: "Grasp the idea in one interaction",
          friction: "Skips anything that looks like a tech demo",
        },
        {
          name: "The reader",
          meta: "General visitor on a phone",
          goal: "Feel the concept without understanding the code",
          friction: "Motion-heavy sites often ignore touch and a11y",
        },
      ],
    },
    ideation: {
      explorations: [
        {
          caption: "Instrument A — weight mapped to scroll velocity",
          verdict: "Kept",
          note: "Reading speed made literal: skimming thins the type, slowing thickens it.",
        },
        {
          caption: "Instrument B — letters drift with cursor",
          verdict: "Cut",
          note: "Pretty, meaningless. Failed the “describe the meaning first” test with 11 of 12 viewers.",
        },
        {
          caption: "Instrument C — width axis as a tension meter",
          verdict: "Kept",
          note: "Compressing headlines under “load” made an abstract state instantly legible.",
        },
      ],
      rejections: [
        {
          title: "Per-letter 3D rotation",
          why: "Technically fun, semantically empty — and nauseating past two seconds.",
          learned:
            "If I can't name the state the motion explains in one sentence, the piece isn't done. It's decoration with a build step.",
        },
        {
          title: "Full-page mouse-follower",
          why: "The cursor became the message. Content became a backdrop for a trick.",
          learned:
            "Interaction should serve attention, not kidnap it. The most advanced piece in the lab is the quietest.",
        },
      ],
    },
    designSystem: {
      intro:
        "The system is the specimen: Archivo's variable axes are the palette, and the grid is the score the type performs on.",
      type: [
        { name: "Axis — weight", spec: "100–900 · mapped to state intensity" },
        { name: "Axis — width", spec: "62–125 · mapped to pressure / load" },
        { name: "Anchor", spec: "Archivo Expanded · 800 · identity states" },
      ],
      colors: [
        { name: "Night", token: "stage — the dark section", dark: true },
        { name: "Night fg", token: "type at rest", dark: false },
        { name: "Signal", token: "the single performing element", dark: true },
        { name: "Hush", token: "reduced-motion equivalents", dark: false },
      ],
      components: [
        "Instrument frame — title, verb, and static fallback",
        "Axis legend — shows which axis is performing",
        "Reduced-motion card — typographic equivalent of the piece",
        "Quiet mode — global toggle preserved in the lab",
      ],
      a11y: [
        "prefers-reduced-motion swaps motion for typographic state",
        "All instruments are focusable and keyboard-stoppable",
        "Motion never carries information absent from static text",
      ],
    },
    finalScreens: [
      {
        caption: "01 — Weight follows scroll",
        note: "Skimming thins the type. Reading thickens it.",
        variant: "studio",
        aspect: "wide",
      },
      {
        caption: "02 — Width under load",
        note: "Headlines compress as the queue fills.",
        variant: "studio",
        aspect: "square",
      },
      {
        caption: "03 — The quiet version",
        note: "Reduced-motion fallback: same meaning, zero choreography.",
        variant: "studio",
        aspect: "tall",
      },
    ],
    outcome: {
      summary:
        "Shipped as part of this portfolio; evaluated through structured viewer descriptions.",
      validations: [
        {
          title: "Expected outcome",
          body: "Viewers name the state a piece describes before reading its caption — the motion IS the explanation.",
        },
        {
          title: "Usability signal",
          body: "11 of 12 viewers described kept instruments correctly; cut pieces scored 1–4.",
        },
        {
          title: "Validated decisions",
          body: "One-verb rule and static-first builds held up. Both cut instruments stay cut, documented above.",
        },
      ],
      limitations:
        "Evaluation is informal — small, self-selected viewer group. No claim is made about long-term comprehension or performance under real traffic.",
      next: [
        "Add a touch-only instrument",
        "Test with screen-reader users",
        "Publish the axis-mapping cheatsheet",
      ],
    },
    reflection:
      "Building this lab changed how I brief myself. I no longer ask “what should animate?” — I ask “what change does the user need to understand?” Then motion either earns its place or leaves.",
  },
];

export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug);
