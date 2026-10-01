import { useState } from "react";
import { Link } from "react-router";
import { motion, useScroll, useSpring } from "framer-motion";
import type { Project } from "@/data/projects";
import graceImg from "@/assets/hands-of-grace-hero.svg";
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
 * HANDS OF GRACE — github.com/Jennifer-source/hands-of-Grace
 *
 * Every fact below is taken from the project's own source of truth: the
 * mission and hero copy (index.html), the journey timeline, the impact
 * counters (index.html + the counter animation in script.js), the featured
 * event and countdown, the trust badges, the mission/vision/values band,
 * the resource cards (script.js resourceItems), FAQ answers, donation
 * details, the three founder profile cards, the volunteer/prayer/contact/
 * newsletter forms, and the feature list in README.md (lightbox, dark mode,
 * PWA, service worker). No verified trust information exists in the
 * repository, so placeholder names, contact details and bank details are
 * described as placeholders — exactly as the README itself instructs.
 * No metrics are claimed beyond the site's own impact counters.
 */

const REPO_URL = "https://github.com/Jennifer-source/hands-of-Grace";

const MISSION =
  "“Serving humanity with grace, dignity, and hope — Hands of Grace International Ministries Trust supports families, children, elders, and villages through practical care, prayer, relief, and community service.”";

const trustBadges = [
  "Transparent giving",
  "Community-first service",
  "Volunteer-led outreach",
];

const journey = [
  {
    index: "01",
    title: "The Vision",
    body: "A small circle began praying for a trust that would meet spiritual and practical needs together.",
  },
  {
    index: "02",
    title: "Early Service",
    body: "Family visits, children's support, and prayer gatherings became the first visible signs of that calling.",
  },
  {
    index: "03",
    title: "Village Outreach",
    body: "Food distribution, blanket support, and community visits grew through volunteer service.",
  },
  {
    index: "04",
    title: "Future Mission",
    body: "The trust continues building transparent, scalable programs for long-term community care.",
  },
] as const;

const missionVision = [
  {
    label: "Mission",
    body: "Provide compassionate relief, prayer, education support, food assistance, and family care.",
  },
  {
    label: "Vision",
    body: "See communities strengthened through sustainable service and trustworthy partnerships.",
  },
  {
    label: "Core values",
    body: "Faith, compassion, transparency, service, dignity, hope, and unity.",
  },
] as const;

const impactCounters = [
  ["5,000+", "Families helped"],
  ["200+", "Events conducted"],
  ["1,000+", "Children supported"],
  ["25+", "Villages reached"],
  ["100+", "Volunteers"],
] as const;

const programs = [
  "Food distribution",
  "Blanket support",
  "Village outreach",
  "Elderly care",
  "Children's support",
  "Prayer gatherings",
  "Volunteer-led community service",
] as const;

const workSections = [
  {
    name: "Homepage / Hero",
    body: "Full-screen hero with the outreach image, dark overlay, and a floating panel that puts one impact highlight — “5,000+ families reached” — directly into the first view.",
  },
  {
    name: "About & journey",
    body: "Trust storytelling with badge chips, an image frame, and a numbered journey timeline from vision to future mission.",
  },
  {
    name: "Mission band & impact",
    body: "Mission / vision / core values grid, then five animated counters that count up on scroll using IntersectionObserver.",
  },
  {
    name: "Events",
    body: "A featured event with an “Upcoming” pill, program details and a live countdown, plus a list of past events.",
  },
  {
    name: "Resources",
    body: "Filterable resource cards — annual report, trust profile, donation guide, volunteer guide — with All / Reports / Guides / Trust Profile filters.",
  },
  {
    name: "Gallery, lightbox & team",
    body: "Masonry gallery buttons that open an accessible modal lightbox, and three founder profile cards.",
  },
  {
    name: "Donation details",
    body: "A donation card with actions and a full bank/UPI details list (placeholders, to be verified before launch).",
  },
  {
    name: "Forms & contact",
    body: "Volunteer, prayer, contact and newsletter forms with modal success states, plus contact details and socials.",
  },
] as const;

const resourceItems = [
  {
    type: "report",
    meta: "Impact & accountability",
    title: "Annual Report",
    body: "A clear yearly summary of programs, community reach, donor use, and future priorities.",
  },
  {
    type: "profile",
    meta: "Organization overview",
    title: "Trust Profile",
    body: "A concise profile for donors, partners, churches, and organizations that want to understand the trust.",
  },
  {
    type: "guide",
    meta: "Giving with confidence",
    title: "Donation Guide",
    body: "Helpful giving instructions, donation channels, receipt steps, and international donor notes.",
  },
  {
    type: "guide",
    meta: "Serve with us",
    title: "Volunteer Guide",
    body: "A practical guide for volunteers who want to support events, village outreach, logistics, and care visits.",
  },
] as const;

const faq = [
  [
    "How can I donate?",
    "Use the bank or UPI details on the site, or contact the trust for the latest giving options.",
  ],
  [
    "Can I volunteer for one event?",
    "Yes. Submit the volunteer form and the coordination team can match your availability.",
  ],
  [
    "Can organizations partner with Hands of Grace?",
    "Yes. Partners can support programs through donations, supplies, volunteering, events, and long-term outreach collaboration.",
  ],
] as const;

const forms = [
  ["Volunteer registration", "Name, email, skills, availability"],
  ["Prayer request", "Name, email, anonymous option, request"],
  ["Contact message", "Name, email, message"],
  ["Newsletter signup", "Email, footer form"],
] as const;

const designLanguage = [
  ["Type", "Inter for body, Poppins for headings"],
  ["Color", "Navy, blue, teal, green, and gold on mist/paper surfaces"],
  ["Effects", "Turbulence noise-displaced gradient hero art (SVG filters)"],
  ["Backdrop", "Fixed world-map SVG wash behind the whole site"],
  [
    "Components",
    "Badges, timeline, counters, countdown, filter chips, lightbox modal, cards, forms",
  ],
  [
    "Accessibility",
    "Skip link, semantic landmarks, aria labels, keyboard-dismissible modal, lazy images",
  ],
] as const;

const buildFeatures = [
  "Cinematic homepage",
  "Trust storytelling",
  "Impact counters",
  "Events & countdown",
  "Trust resources",
  "Gallery lightbox",
  "Founder profile cards",
  "Volunteer & prayer forms",
  "FAQ",
  "Contact & newsletter",
  "Dark mode",
  "PWA service worker",
] as const;

const reflections = [
  "A trust website is an accountability surface before it is a marketing surface. Every section was placed to make the work verifiable, not just visible.",
  "The site ships as a working PWA with a service worker and dark mode — a prototype that behaves like a product from the first commit.",
  "Repeatable content is centralized in script.js (resourceItems), so the trust's team can update documents without touching markup.",
  "The README's own rule is respected throughout: donation, contact, founder and image details are placeholders that must be replaced with verified trust information before launch.",
] as const;

/** Level 1 — the whole project story, recomposed from the sections below. */
const overviewSteps = [
  {
    label: "Project",
    headline: "A trust website for Hands of Grace International Ministries Trust.",
    body: "A responsive static prototype: cinematic homepage, storytelling, impact counters, events, resources, forms, dark mode, PWA.",
  },
  {
    label: "Problem",
    headline: "A charity's work must be verifiable, not just visible.",
    body: "Donors, volunteers and partners need one trustworthy place that shows the programs, documents and giving paths.",
  },
  {
    label: "Role",
    headline: "Designer & developer of the full prototype.",
    body: "Individual project — structure, interface, interactions and the PWA build.",
  },
  {
    label: "Approach",
    headline: "Accountability surface before marketing surface.",
    body: "Every section placed to make the work checkable — programs, events, resources, FAQ, and giving details in one flow.",
  },
  {
    label: "Solution",
    headline: "A working site — installable, themed, filterable.",
    body: "Resource cards rendered from one data array with filters, plus lightbox gallery, countdown, dark mode and a service worker.",
  },
  {
    label: "Outcome",
    headline: "A functional prototype with honest placeholders.",
    body: "Every interaction works locally; trust details are placeholders pending verified information before launch.",
  },
] as const;

const navItems = [
  { id: "cs-overview", label: "Overview" },
  { id: "cs-mission", label: "Mission" },
  { id: "cs-journey", label: "Journey" },
  { id: "cs-impact", label: "Impact" },
  { id: "cs-build", label: "Build" },
  { id: "cs-signature", label: "Signature" },
  { id: "cs-language", label: "Language" },
  { id: "cs-reflection", label: "Reflection" },
] as const;

/* ------------------------------------------------------------------ */
/* Interactive recreation of the site's filterable resources section:  */
/* the same four cards, rendered from the same shape of data, with the */
/* same All / Reports / Guides / Trust Profile filters.                */
/* ------------------------------------------------------------------ */

function ResourceFilterDemo() {
  const [filter, setFilter] = useState("all");
  const filters = ["all", "report", "guide", "profile"] as const;
  const items =
    filter === "all"
      ? resourceItems
      : resourceItems.filter((item) => item.type === filter);

  return (
    <div>
      <p className="label-mono text-muted-foreground">Interactive recreation · Resources section</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
            className={`label-mono border px-3 py-1.5 transition-colors ${
              filter === f
                ? "border-accent text-accent"
                : "border-hairline text-muted-foreground hover:text-foreground"
            }`}
          >
            {f === "all" ? "All" : f === "report" ? "Reports" : f === "guide" ? "Guides" : "Trust profile"}
          </button>
        ))}
      </div>
      <div className="mt-5 grid gap-px border border-hairline bg-hairline sm:grid-cols-2">
        {items.map((item) => (
          <div key={item.title} className="bg-paper p-5">
            <p className="label-mono text-accent">{item.meta}</p>
            <h3 className="display-lg mt-2 text-lg">{item.title}</h3>
            <p className="mt-2 text-sm font-mono text-muted-foreground">{item.body}</p>
            <p className="label-mono mt-4 text-muted-foreground">Read ↗</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

export function HandsOfGraceCaseStudy({
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
              {project.index} — Hands of Grace · {project.category}
            </p>
            <h1 className="display-xl mt-6 text-[clamp(3rem,13vw,12rem)] uppercase leading-[0.85]">
              <RevealWords text="Hands of Grace" />
            </h1>
            <div className="mt-8 grid gap-8 lg:grid-cols-12">
              <p className="display-lg text-[clamp(1.5rem,3vw,2.6rem)] leading-tight lg:col-span-7">
                {project.positioning}
              </p>
              <p className="text-lg font-mono leading-relaxed text-muted-foreground lg:col-span-4 lg:col-start-9">
                A responsive static website prototype for Hands of Grace International Ministries
                Trust: cinematic homepage, trust storytelling, impact counters, events, resources,
                gallery lightbox, founder profiles, forms, dark mode and a PWA service worker.
              </p>
            </div>
            <Reveal className="mt-14">
              <div className="overflow-hidden bg-muted">
                <img
                  src={graceImg}
                  alt="Hands of Grace — community outreach hero art from the trust website"
                  width={1920}
                  height={1080}
                  className="aspect-video w-full object-cover"
                />
              </div>
            </Reveal>
          </Shell>
        </section>

        {/* 01 OVERVIEW */}
        <section id="cs-overview" className="bg-paper py-20">
          <Shell>
            <SectionHeader index="01" label="Overview" title="Project" />
            <CaseStudyNav items={navItems} className="mt-6" />
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["Role", project.role],
                ["Format", "Responsive static website · PWA"],
                ["Built with", project.tools.join(" · ")],
                ["Source", REPO_URL.replace("https://", "")],
              ].map(([k, v]) => (
                <div key={k} className="border-t border-hairline pt-3">
                  <p className="label-mono text-muted-foreground">{k}</p>
                  <p className="mt-1.5 text-sm font-mono leading-relaxed">{v}</p>
                </div>
              ))}
            </div>
            <dl className="mt-12 grid gap-6 border-t border-hairline pt-6 sm:grid-cols-3 sm:gap-10">
              {[
                ["Client", "Hands of Grace International Ministries Trust"],
                ["Purpose", "A trust website that makes the charity's work visible and verifiable"],
                [
                  "Status",
                  "Prototype — placeholders to be replaced with verified details before launch",
                ],
              ].map(([term, detail]) => (
                <div key={term}>
                  <dt className="label-mono text-muted-foreground">{term}</dt>
                  <dd className="mt-3 text-[15px] font-mono leading-relaxed">{detail}</dd>
                </div>
              ))}
            </dl>
            <CaseStudyOverview steps={overviewSteps} className="mt-14" />
          </Shell>
        </section>

        {/* 02 MISSION QUOTE (dark) */}
        <section id="cs-mission" data-tone="dark" className="grain-light bg-void py-28 text-void-foreground">
          <Shell>
            <SectionHeader index="02" label="The mission" invert />
            <Reveal>
              <p className="display-lg mt-12 max-w-[26ch] text-[clamp(1.8rem,4.4vw,4rem)] leading-[1.05]">
                {MISSION}
              </p>
            </Reveal>
            <p className="mt-10 max-w-2xl border-t border-white/15 pt-6 font-mono leading-relaxed text-white/60">
              The trust's own hero copy, verbatim from the site.
            </p>
            <div className="mt-12 flex flex-wrap gap-3">
              {trustBadges.map((badge) => (
                <span
                  key={badge}
                  className="border border-white/15 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-white/60"
                >
                  {badge}
                </span>
              ))}
            </div>
          </Shell>
        </section>

        {/* 03 THE TRUST */}
        <section className="bg-paper py-24">
          <Shell>
            <SectionHeader index="03" label="About the trust" title="What the site presents" />
            <div className="mt-10 grid gap-12 lg:grid-cols-12">
              <Reveal className="lg:col-span-6">
                <p className="text-xl font-mono leading-relaxed">
                  The trust serves vulnerable communities through food support, village outreach,
                  elderly care, education support, prayer, and compassionate relief.
                </p>
                <p className="mt-6 font-mono leading-relaxed text-muted-foreground">
                  The website's job is to present that work with steady care, transparent service,
                  and a deep respect for every person's dignity — the trust's own words, reused as
                  the site's design brief.
                </p>
              </Reveal>
              <ul className="lg:col-span-5 lg:col-start-8">
                {programs.map((program, i) => (
                  <Reveal key={program} delay={i * 0.04}>
                    <li className="flex items-baseline gap-5 border-t border-hairline py-4">
                      <span className="label-mono text-accent">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="display-lg text-xl">{program}</span>
                    </li>
                  </Reveal>
                ))}
              </ul>
            </div>
            <Reveal className="mt-12">
              <div className="grid gap-px border border-hairline bg-hairline sm:grid-cols-3">
                {missionVision.map((item) => (
                  <div key={item.label} className="bg-paper p-6">
                    <p className="label-mono text-accent">{item.label}</p>
                    <p className="mt-3 text-sm font-mono leading-relaxed">{item.body}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </Shell>
        </section>

        {/* 04 JOURNEY */}
        <section id="cs-journey" className="bg-paper pb-24">
          <Shell>
            <SectionHeader index="04" label="Our journey" title="A story of grace becoming service" />
            <ol className="mt-10">
              {journey.map((step, i) => (
                <Reveal key={step.index} delay={i * 0.05}>
                  <li
                    className="flex items-baseline gap-6 border-t border-hairline py-5"
                    style={{ paddingLeft: `${i * 4}%` }}
                  >
                    <span className="label-mono text-accent">{step.index}</span>
                    <span
                      className={`display-lg uppercase text-[clamp(1.2rem,2.8vw,2.4rem)] leading-tight ${
                        i === journey.length - 1 ? "text-accent" : ""
                      }`}
                    >
                      {step.title}
                    </span>
                  </li>
                </Reveal>
              ))}
            </ol>
            <div className="mt-10 grid gap-6 lg:grid-cols-2 lg:gap-10">
              {journey.map((step) => (
                <Reveal key={step.title}>
                  <div className="border-t border-hairline pt-4">
                    <p className="label-mono text-muted-foreground">{step.title}</p>
                    <p className="mt-2 text-sm font-mono leading-relaxed text-muted-foreground">{step.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Shell>
        </section>

        {/* 05 IMPACT (dark) */}
        <section id="cs-impact" data-tone="dark" className="grain-light bg-void py-24 text-void-foreground">
          <Shell>
            <SectionHeader index="05" label="Trust impact" title="Compassion you can count" invert />
            <p className="mt-8 max-w-2xl font-mono leading-relaxed text-white/60">
              The site's own impact counters, animated on scroll with IntersectionObserver in the
              original build. Presented here exactly as the site states them.
            </p>
            <Reveal className="mt-12">
              <div className="grid gap-px border border-white/15 bg-white/15 sm:grid-cols-3 lg:grid-cols-5">
                {impactCounters.map(([value, label]) => (
                  <div key={label} className="bg-void p-6">
                    <p className="display-lg text-3xl">{value}</p>
                    <p className="label-mono mt-2 text-white/60">{label}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </Shell>
        </section>

        {/* 06 SITE SECTIONS */}
        <section id="cs-build" className="bg-paper pb-24">
          <Shell>
            <SectionHeader index="06" label="The build" title="Site sections" />
            <div className="mt-10 space-y-px">
              {workSections.map((section, i) => (
                <Reveal key={section.name} delay={i * 0.04}>
                  <div className="grid gap-6 border-t border-hairline py-8 lg:grid-cols-12">
                    <span className="label-mono text-muted-foreground lg:col-span-1">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="lg:col-span-5">
                      <h3 className="display-lg text-xl">{section.name}</h3>
                    </div>
                    <p className="font-mono leading-relaxed text-muted-foreground lg:col-span-5 lg:col-start-8">
                      {section.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Shell>
        </section>

        {/* 07 SIGNATURE INTERACTION */}
        <section id="cs-signature" className="bg-paper pb-24">
          <Shell>
            <SectionHeader index="07" label="Interaction / prototype" title="Resources, filterable" />
            <div className="mt-12 grid gap-14 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <h2 className="display-xl text-[clamp(2.4rem,6vw,5.5rem)] uppercase leading-[0.9]">
                  Filter & read.
                </h2>
                <p className="mt-8 max-w-md font-mono leading-relaxed text-muted-foreground">
                  The resources section is rendered from a single data array in script.js —
                  resourceItems — with filter chips for All / Reports / Guides / Trust Profile. The
                  trust's team can update the documents by editing one array, not the markup. Try
                  the recreation below.
                </p>
                <p className="label-mono mt-8 text-muted-foreground">
                  Static recreation — the live site renders the same cards from script.js.
                </p>
              </div>
              <div className="lg:col-span-6 lg:col-start-7">
                <Reveal>
                  <ResourceFilterDemo />
                </Reveal>
              </div>
            </div>
          </Shell>
        </section>

        {/* 08 EVENT & FORMS */}
        <section className="bg-paper pb-24">
          <Shell>
            <SectionHeader index="08" label="Events & engagement" title="Gather, serve, respond" />
            <div className="mt-10 grid gap-12 lg:grid-cols-12">
              <div className="lg:col-span-6">
                <p className="label-mono text-accent">Featured event</p>
                <h3 className="display-lg mt-3 text-2xl leading-tight">
                  Community Health & Prayer Camp
                </h3>
                <p className="mt-3 text-sm font-mono leading-relaxed text-muted-foreground">
                  August 16, 2026 · 9:00 AM · Ministry Community Hall. Free wellness checks, prayer
                  support, family counseling, food assistance, and community lunch — with a live
                  countdown rendered by the site itself.
                </p>
                <dl className="mt-6 divide-y divide-hairline border-t border-hairline">
                  {forms.map(([form, fields]) => (
                    <div key={form} className="flex items-baseline justify-between gap-4 py-3.5">
                      <dt className="label-mono text-muted-foreground">{form}</dt>
                      <dd className="text-right text-sm font-mono">{fields}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div className="lg:col-span-5 lg:col-start-8">
                <p className="label-mono text-muted-foreground">Frequently asked</p>
                <div className="mt-4 border border-hairline">
                  {faq.map(([q, a], i) => (
                    <Reveal key={q} delay={i * 0.05}>
                      <details className="group border-b border-hairline last:border-b-0">
                        <summary className="flex cursor-pointer items-center justify-between gap-4 py-4 pl-4 pr-3 text-sm">
                          {q}
                          <span className="label-mono text-accent transition-transform group-open:rotate-45">
                            +
                          </span>
                        </summary>
                        <p className="pb-4 pl-4 pr-4 text-sm font-mono leading-relaxed text-muted-foreground">
                          {a}
                        </p>
                      </details>
                    </Reveal>
                  ))}
                </div>
                <p className="label-mono mt-4 text-muted-foreground">
                  Forms show modal success states; a production build would deliver submissions
                  securely to the trust team.
                </p>
              </div>
            </div>
          </Shell>
        </section>

        {/* 09 DESIGN LANGUAGE (dark) */}
        <section id="cs-language" data-tone="dark" className="grain-light bg-void py-24 text-void-foreground">
          <Shell>
            <SectionHeader index="09" label="Design language" title="The site's own system" invert />
            <div className="mt-10 grid gap-px border border-white/15 bg-white/15 sm:grid-cols-2 lg:grid-cols-3">
              {designLanguage.map(([label, value]) => (
                <div key={label} className="bg-void p-6">
                  <p className="label-mono text-accent">{label}</p>
                  <p className="mt-3 text-sm font-mono leading-relaxed text-white/70">{value}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 max-w-2xl font-mono leading-relaxed text-white/60">
              The site's visual language is its own — navy, teal and gold on mist surfaces, with a
              fixed world-map backdrop. This case study re-presents it with the portfolio's paper
              and ink; the trust site itself keeps its own palette.
            </p>
          </Shell>
        </section>

        {/* 10 BUILD FEATURES */}
        <section className="bg-paper py-24">
          <Shell>
            <SectionHeader index="10" label="Build" title="What the prototype includes" />
            <div className="mt-10 grid gap-px border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-4">
              {buildFeatures.map((feature) => (
                <div key={feature} className="bg-paper p-5">
                  <p className="display-lg text-lg">{feature}</p>
                </div>
              ))}
            </div>
            <p className="label-mono mt-8 inline-flex items-start gap-3 border border-hairline bg-muted px-4 py-3.5 text-muted-foreground">
              <span className="mt-[6px] size-1.5 shrink-0 bg-accent" aria-hidden="true" />
              Placeholder trust details are labelled as such on the site itself.
            </p>
          </Shell>
        </section>

        {/* 11 OUTCOME / STATUS */}
        <section className="bg-paper pb-24">
          <Shell>
            <SectionHeader index="11" label="Outcome" title="Honest reporting" />
            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {[
                "Responsive static prototype",
                "Working PWA with service worker",
                "Placeholders pending verified details",
              ].map((line) => (
                <div key={line} className="border-t border-hairline pt-4">
                  <p className="display-lg text-xl leading-snug">{line}</p>
                </div>
              ))}
            </div>
            <p className="mt-10 max-w-2xl font-mono leading-relaxed text-muted-foreground">
              The site is fully functional as a prototype — every interaction works locally, and the
              forms' success states are demos. No real donations, volunteer sign-ups or submissions
              have been processed through it.
            </p>
          </Shell>
        </section>

        {/* 12 REFLECTION */}
        <section id="cs-reflection" className="bg-paper pb-24">
          <Shell>
            <SectionHeader index="12" label="Reflection" title="Design learnings" />
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
                <p className="mt-3 text-sm font-mono leading-relaxed text-muted-foreground">
                  A static prototype with no backend: form submissions are demonstrated in modals
                  rather than delivered, and donation, contact, founder and image details are
                  placeholders that the README requires to be replaced with verified trust
                  information before launch.
                </p>
              </div>
              <div className="lg:col-span-5 lg:col-start-8">
                <p className="label-mono text-muted-foreground">Next steps</p>
                <p className="mt-3 text-sm font-mono leading-relaxed text-muted-foreground">
                  Replace placeholders with verified trust details, wire the forms to a secure
                  delivery channel, and deploy with the service worker verified over HTTPS.
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
                Serving humanity with grace, dignity, and hope.
              </p>
            </Reveal>
            <p className="mt-8 max-w-xl font-mono leading-relaxed text-white/60">
              Hands of Grace is a trust website that treats compassion as something to be shown and
              verified — every program, event, document and giving path in one responsive,
              installable prototype.
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
