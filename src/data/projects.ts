/**
 * PROJECT DATA — portfolio case studies.
 * Three projects, in order:
 *   01 Quiet Interface — github.com/Jennifer-source/quiet-interface-main
 *   02 Belong          — original Design Alchemy case study (BelongCaseStudy)
 *   03 Hands of Grace  — github.com/Jennifer-source/hands-of-Grace
 * Images are the original project assets, vendored into src/assets.
 */
import belongImg from "@/assets/work-belong.jpg";
import quietImg from "@/assets/quiet-interface.svg";
import graceImg from "@/assets/hands-of-grace-hero.svg";

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
    // Quiet Interface — github.com/Jennifer-source/quiet-interface-main.
    // Rendered by the dedicated QuietInterfaceCaseStudy component (Belong
    // pattern), so the generic case-study fields stay empty.
    id: "quiet",
    index: "01",
    title: "Quiet Interface",
    slug: "quiet-interface",
    year: "2026",
    category: "HCI / Interaction Design Research",
    description:
      "An experimental study of interface complexity: one standardized focus task, run inside two interface conditions.",
    positioning: "Investigating how interface complexity affects focused digital work.",
    role: "Designer, researcher & developer",
    timeline: "Personal research prototype · stage one",
    team: "Individual research prototype",
    tools: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    heroImage: quietImg,
    thumbnail: quietImg,
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
    // Belong — rendered by the dedicated BelongCaseStudy component.
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
    // Hands of Grace — github.com/Jennifer-source/hands-of-Grace.
    // Rendered by the dedicated HandsOfGraceCaseStudy component (Belong/Quiet
    // pattern), so the generic case-study fields stay empty.
    id: "grace",
    index: "03",
    title: "Hands of Grace",
    slug: "hands-of-grace",
    year: "2026",
    category: "Web Design / Front-end Development / Non-profit",
    description:
      "A responsive static website prototype for Hands of Grace International Ministries Trust, a charitable trust serving vulnerable communities.",
    positioning:
      "Serving humanity with grace, dignity, and hope — a trust website built around practical compassion.",
    role: "Designer & developer",
    timeline: "Responsive static prototype · PWA",
    team: "Individual project",
    tools: ["HTML", "CSS", "JavaScript", "PWA"],
    heroImage: graceImg,
    thumbnail: graceImg,
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
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
