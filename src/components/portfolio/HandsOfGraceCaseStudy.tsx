import { useState } from "react";
import { Link } from "react-router";
import { motion, useScroll, useSpring } from "framer-motion";
import type { Project } from "@/data/projects";
import graceHero from "@/assets/grace-hero-design.png";
import graceFounder1 from "@/assets/grace-founder-1.jpg";
import graceFounder2 from "@/assets/grace-founder-2.jpg";
import graceCofounder from "@/assets/grace-cofounder.jpg";
import graceFrag from "@/assets/grace-frag.jpg";
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
 * HANDS OF GRACE — github.com/Jennifer-source/ngo-website
 *
 * Every fact below is taken from the project's own source of truth:
 * src/content/site.ts (single source for all visible content), the
 * component map in PROJECT_MASTER_DOCUMENT.md and the DESIGN_SYSTEM.md.
 * The ministry's own hero artwork (marked verified in site.ts), the four
 * recorded impact figures, three named founders, seven serve pathways,
 * the documentary film and the donation flow are used as-is. Journey
 * dates, impact stories and bank details are honest editable
 * placeholders in the site itself — described here as placeholders,
 * never as facts. No research, testing or invented metrics.
 * No Three.js claim: the repo lists it, the code never uses it.
 */

const REPO_URL = "https://github.com/Jennifer-source/ngo-website";

const HERO_LINES = ["Where faith", "becomes action."];
const HERO_SUB =
  "Serving communities. Restoring dignity. Carrying hope forward.";

const chapters = [
  ["01", "Hero", "Full-bleed duotone ministry artwork, masked H1 lines, parallax on scroll-away and a two-CTA path into the story."],
  ["02", "Our Journey", "Counter-drifting statements, then a scroll-driven horizontal filmstrip of five milestones — with a vertical editorial stack for mobile and reduced motion."],
  ["03", "Impact", "A generated dot-grid world map with pulsing region markers and the trust's four recorded figures."],
  ["04", "Journey Film", "A cinematic documentary stage with scroll-linked scaling and an honest play state."],
  ["05", "Social Handles", "Kinetic marquee words and channel cards that link the trust's real YouTube, Facebook and Instagram."],
  ["06", "The Founders", "Chaptered founder portraits with parallax, ghost numerals and story / vision / contribution fields."],
  ["07", "Serve", "A radial orbit of seven pathways — volunteer, pray, give, partner, serve, share, connect — each aimed at its own CTA."],
  ["08", "Impact Stories", "Human accounts told in five beats — person, moment, need, response, change — placeholder text by design."],
  ["09", "Fragments", "A mixed-span documentary photo archive with duotone treatment and hover detail plates."],
  ["10", "Talk to Us", "Pathway-chip contact form writing straight into the Convex conversations table."],
  ["11", "Donate", "One-time or monthly giving: Stripe Checkout in INR when keys exist, otherwise a recorded donation intent with a reference code."],
  ["12", "The Story Isn't Over", "Word-by-word blur-reveal climax over a scroll-linked glow, aimed at three participation CTAs."],
  ["13", "Footer", "Serif wordmark, linked channels, contact block and the closing line: “The journey continues.”"],
] as const;

const impactFields = [
  ["25+", "Communities reached"],
  ["10,000+", "People served"],
  ["100+", "Outreaches"],
  ["20+", "Years of service"],
] as const;

const founders = [
  {
    img: graceFounder1,
    name: "PS. Joshua Nayanapogula",
    role: "Founder",
  },
  {
    img: graceFounder2,
    name: "PS. Joffy Nayanapogula",
    role: "Founder",
  },
  {
    img: graceCofounder,
    name: "Mr. Shalom Joshua Nayanapogula",
    role: "Co-Founder",
  },
] as const;

const pathways = [
  "Volunteer",
  "Pray",
  "Give",
  "Partner",
  "Serve",
  "Share",
  "Connect",
] as const;

const designLanguage = [
  ["Palette", "Seven sunrise oranges against warm neutrals — mist, ivory, cream, sand, smoke, charcoal, ink."],
  ["Type", "Playfair Display for emotional headlines, Inter for metadata, body and UI."],
  ["Motion", "One easing curve — cubic-bezier(0.22, 1, 0.36, 1) — shared by all 47 animation sites."],
  ["Imagery", "A duotone treatment unifies every photograph: two gradient layers over grayscale."],
  ["Atmosphere", "Film-grain overlay, scroll progress thread, and a desktop chapter cursor."],
  ["Accessibility", "Reduced-motion fallbacks throughout, semantic landmarks, radiogroup states, honest empty states."],
] as const;

const buildFeatures = [
  "13-chapter cinematic homepage",
  "Convex-backed contact form",
  "Stripe checkout · intent fallback",
  "Scroll-linked journey filmstrip",
  "Generated dot-grid impact map",
  "Radial serve pathway orbit",
  "Documentary film stage",
  "Kinetic social marquees",
  "Fragment photo archive",
  "Founder storytelling chapters",
  "Word-by-word climax reveal",
  "Reduced-motion throughout",
] as const;

const reflections = [
  "The hardest problem was sequencing trust. Thirteen chapters were ordered so a stranger meets the story before the ask — understanding first, participation second.",
  "Motion was treated as tone, not decoration. One shared easing curve keeps the whole site calm; reduced-motion users receive a complete vertical edition instead of a stripped one.",
  "Honesty became a design material. Empty impact values, editable milestones and a “being prepared” film state are structured visibly — the site never invents the ministry's facts.",
  "A single content file as source of truth (641 lines of site.ts) meant every section, label and CTA stayed consistent — and the ministry can edit its own story in one place.",
] as const;

/** Level 1 — the whole project story, recomposed from the sections below. */
const overviewSteps = [
  {
    label: "Project",
    headline: "A story-driven digital experience for a nonprofit trust.",
    body: "Hands of Grace International Ministries Trust — thirteen chapters from hero to footer, built as one continuous React experience.",
  },
  {
    label: "Problem",
    headline: "Translating an organization's story into trust and participation.",
    body: "The mission needed to feel human and emotionally engaging while keeping every action — talk, serve, give — easy to discover.",
  },
  {
    label: "Role",
    headline: "UI/UX design + frontend development.",
    body: "Individual project — experience structure, visual direction, interface, interaction, responsive implementation and build.",
  },
  {
    label: "Approach",
    headline: "Story → trust → understanding → participation.",
    body: "Chapter sequencing leads a visitor from the journey, through founders and impact, to serve pathways and donation.",
  },
  {
    label: "Solution",
    headline: "A cinematic single-page experience with a working backend.",
    body: "Framer Motion storytelling over Convex: contact submissions persist, donations run through Stripe or a recorded intent.",
  },
  {
    label: "Outcome",
    headline: "A complete experience with honest placeholders.",
    body: "The ministry's own artwork and figures ship verified; dates, stories and bank details stay clearly editable until confirmed.",
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
/* Interactive recreation of the site's Serve chapter: the same seven  */
/* pathways from site.ts, aimed at the same CTA targets.               */
/* ------------------------------------------------------------------ */

function ServePathwaysDemo() {
  const [selected, setSelected] = useState("Volunteer");
  const details: Record<string, string> = {
    Volunteer: "Give your time. Use your skills. Stand with communities.",
    Pray: "Carry the work. Lift the people. Believe with us.",
    Give: "Sow generously. Sustain the journey. Change a next step.",
    Partner: "Bring your organization. Share resources. Multiply reach.",
    Serve: "Go where needed. Do the quiet work. Lead by serving.",
    Share: "Tell the story. Amplify hope. Bring others along.",
    Connect: "Ask questions. Meet the team. Begin a conversation.",
  };

  return (
    <div>
      <p className="label-mono text-muted-foreground">
        Interactive recreation · Serve chapter
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {pathways.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setSelected(p)}
            aria-pressed={selected === p}
            className={`label-mono border px-3 py-1.5 transition-colors ${
              selected === p
                ? "border-accent text-accent"
                : "border-hairline text-muted-foreground hover:text-foreground"
            }`}
          >
            {p}
          </button>
        ))}
      </div>
      <div className="mt-5 border border-hairline bg-paper p-6">
        <p className="label-mono text-accent">{selected}</p>
        <p className="display-lg mt-3 text-2xl leading-tight">{details[selected]}</p>
        <p className="label-mono mt-6 text-muted-foreground">
          {selected === "Give"
            ? "Leads to the Donate chapter ↗"
            : selected === "Share"
              ? "Leads to the Social chapter ↗"
              : "Leads to Talk to Us ↗"}
        </p>
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
        {/* HERO — the first viewport: what, why, what I did */}
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
                How can a nonprofit's story, mission and impact become a digital
                experience that feels trustworthy, human and emotionally engaging —
                while keeping every action easy to discover? A story-driven website
                for Hands of Grace International Ministries Trust: thirteen chapters,
                designed and built end to end.
              </p>
            </div>
            <Reveal className="mt-14">
              <div className="overflow-hidden bg-muted">
                <img
                  src={graceHero}
                  alt="Hands of Grace — ministry hero artwork: “By His power, with His love, for His glory” — Romans 11:36"
                  width={1920}
                  height={1080}
                  className="aspect-video w-full object-cover"
                />
              </div>
              <p className="label-mono mt-3 text-muted-foreground">
                The ministry's own hero artwork — shipped verified in the site.
              </p>
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
                ["Type", "Nonprofit digital experience"],
                ["Role", project.role],
                ["Focus", "Storytelling · Trust · Participation"],
                ["Built with", project.tools.join(" · ")],
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
                [
                  "What I made",
                  "A single-page cinematic experience — 13 chapters, from hero to footer",
                ],
                [
                  "Status",
                  "Complete build — ministry artwork and figures verified; dates and stories clearly editable placeholders",
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

        {/* 02 THE MISSION (dark) */}
        <section id="cs-mission" data-tone="dark" className="grain-light bg-void py-28 text-void-foreground">
          <Shell>
            <SectionHeader index="02" label="The mission" invert />
            <Reveal>
              <p className="display-lg mt-12 max-w-[26ch] text-[clamp(1.8rem,4.4vw,4rem)] leading-[1.05]">
                {HERO_LINES[0]} <span className="italic">{HERO_LINES[1]}</span>
              </p>
            </Reveal>
            <p className="mt-10 max-w-2xl border-t border-white/15 pt-6 font-mono leading-relaxed text-white/60">
              The site's opening words — {HERO_SUB} The whole experience was
              sequenced so a stranger can move from this first line to real
              participation: story, then trust, then understanding, then action.
            </p>
            <div className="mt-12 flex flex-wrap gap-3">
              {["Understand the mission", "Meet the people", "See the impact", "Join the journey"].map(
                (badge) => (
                  <span
                    key={badge}
                    className="border border-white/15 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-white/60"
                  >
                    {badge}
                  </span>
                ),
              )}
            </div>
          </Shell>
        </section>

        {/* 03 UNDERSTANDING THE ORGANIZATION */}
        <section id="cs-journey" className="bg-paper py-24">
          <Shell>
            <SectionHeader index="03" label="Understanding the organization" title="From prayer to presence to action" />
            <div className="mt-10 grid gap-12 lg:grid-cols-12">
              <Reveal className="lg:col-span-6">
                <p className="text-xl font-mono leading-relaxed">
                  The trust serves communities through practical care — food
                  distribution, outreach, support for children, families and elders.
                  The design problem was to make that story legible without
                  inventing it.
                </p>
                <p className="mt-6 font-mono leading-relaxed text-muted-foreground">
                  The site's own content model made that possible: journey
                  milestones, founder stories and impact figures each carry an
                  “editable” flag. Verified facts — the ministry's artwork, its
                  recorded figures — render as fact. Unwritten chapters render as
                  clearly-labelled structure, never fiction. I structured the
                  experience around the organization's story so visitors move from
                  understanding the mission to exploring its impact.
                </p>
              </Reveal>
              <div className="lg:col-span-5 lg:col-start-8">
                <p className="label-mono text-muted-foreground">The journey chapters</p>
                <ol className="mt-4">
                  {[
                    "A prayer becomes a promise",
                    "Presence before programs",
                    "The first act of service",
                    "Grace multiplies",
                    "The journey continues",
                  ].map((moment, i) => (
                    <Reveal key={moment} delay={i * 0.04}>
                      <li className="flex items-baseline gap-5 border-t border-hairline py-4">
                        <span className="label-mono text-accent">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="display-lg text-xl">{moment}</span>
                      </li>
                    </Reveal>
                  ))}
                </ol>
                <p className="label-mono mt-4 text-muted-foreground">
                  Moments from site.ts — dates and locations are editable
                  placeholders, honestly labelled on the site itself.
                </p>
              </div>
            </div>
          </Shell>
        </section>

        {/* 04 EXPERIENCE / INFORMATION ARCHITECTURE */}
        <section id="cs-impact" className="bg-paper pb-24">
          <Shell>
            <SectionHeader index="04" label="Experience design" title="Information architecture" />
            <p className="mt-8 max-w-2xl font-mono leading-relaxed text-muted-foreground">
              The homepage is sequenced as thirteen chapters, rendered in order.
              Each chapter has one job; together they walk a visitor from story to
              participation. The order is the argument: see the journey, meet the
              people, read the impact — then choose how to respond.
            </p>
            <div className="mt-10 space-y-px">
              {chapters.map(([num, name, body], i) => (
                <Reveal key={num} delay={i * 0.03}>
                  <div className="grid gap-6 border-t border-hairline py-8 lg:grid-cols-12">
                    <span className="label-mono text-muted-foreground lg:col-span-1">{num}</span>
                    <div className="lg:col-span-4">
                      <h3 className="display-lg text-xl">{name}</h3>
                    </div>
                    <p className="font-mono leading-relaxed text-muted-foreground lg:col-span-6 lg:col-start-7">
                      {body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Shell>
        </section>

        {/* 05 IMPACT (dark) */}
        <section id="cs-build" data-tone="dark" className="grain-light bg-void py-24 text-void-foreground">
          <Shell>
            <SectionHeader index="05" label="Impact" title="Figures the trust has recorded" invert />
            <p className="mt-8 max-w-2xl font-mono leading-relaxed text-white/60">
              Presented on a generated dot-grid world map with pulsing region
              markers. These four figures are the trust's own recorded values —
              used exactly as the site states them.
            </p>
            <Reveal className="mt-12">
              <div className="grid gap-px border border-white/15 bg-white/15 sm:grid-cols-2 lg:grid-cols-4">
                {impactFields.map(([value, label]) => (
                  <div key={label} className="bg-void p-6">
                    <p className="display-lg text-3xl">{value}</p>
                    <p className="label-mono mt-2 text-white/60">{label}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </Shell>
        </section>

        {/* 06 KEY EXPERIENCE SECTIONS — visuals */}
        <section className="bg-paper py-24">
          <Shell>
            <SectionHeader index="06" label="Key experience sections" title="The people, the work, the field" />
            <div className="mt-10 grid gap-6 lg:grid-cols-12">
              <Reveal className="lg:col-span-6">
                <p className="label-mono text-muted-foreground">The founders</p>
                <h3 className="display-lg mt-3 text-2xl leading-tight">
                  Chaptered portraits with parallax and story fields
                </h3>
                <p className="mt-3 text-sm font-mono leading-relaxed text-muted-foreground">
                  The founders chapter alternates portrait and text, with ghost
                  numerals and story / vision / contribution fields for each person.
                </p>
              </Reveal>
              <Reveal className="lg:col-span-6" delay={0.05}>
                <div className="grid gap-px border border-hairline bg-hairline sm:grid-cols-3">
                  {founders.map((f) => (
                    <div key={f.name} className="bg-paper">
                      <div className="overflow-hidden bg-muted">
                        <img
                          src={f.img}
                          alt={`Portrait of ${f.name}, ${f.role}`}
                          width={360}
                          height={480}
                          className="aspect-[3/4] w-full object-cover"
                        />
                      </div>
                      <p className="label-mono mt-2 px-1 text-muted-foreground">{f.role}</p>
                      <p className="display-lg mt-1 px-1 text-base">{f.name}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
            <Reveal className="mt-16">
              <div className="grid gap-6 border-t border-hairline pt-8 lg:grid-cols-12">
                <div className="lg:col-span-5">
                  <p className="label-mono text-muted-foreground">Fragments</p>
                  <h3 className="display-lg mt-3 text-2xl leading-tight">
                    A documentary photo archive
                  </h3>
                  <p className="mt-3 text-sm font-mono leading-relaxed text-muted-foreground">
                    Twelve field photographs in mixed spans, unified by a duotone
                    treatment, with caption plates and an honest “small moments,
                    kept carefully” brief.
                  </p>
                </div>
                <div className="lg:col-span-7">
                  <div className="overflow-hidden bg-muted">
                    <img
                      src={graceFrag}
                      alt="Field photograph from the Fragments archive — an evening gathering"
                      width={1200}
                      height={800}
                      className="aspect-[3/2] w-full object-cover"
                    />
                  </div>
                  <p className="label-mono mt-3 text-muted-foreground">
                    Fragment / 009 — from the site's own archive.
                  </p>
                </div>
              </div>
            </Reveal>
          </Shell>
        </section>

        {/* 07 SIGNATURE INTERACTION */}
        <section id="cs-signature" className="bg-paper pb-24">
          <Shell>
            <SectionHeader index="07" label="Interaction / prototype" title="Serve — seven ways in" />
            <div className="mt-12 grid gap-14 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <h2 className="display-xl text-[clamp(2.4rem,6vw,5.5rem)] uppercase leading-[0.9]">
                  Choose how to help.
                </h2>
                <p className="mt-8 max-w-md font-mono leading-relaxed text-muted-foreground">
                  The serve chapter presents seven pathways on a radial orbit on
                  desktop — each pathway carries three short lines and its own call
                  to action. Give leads to Donate, Share leads to the social
                  channels, everything else leads to Talk to Us. A responsive grid
                  picker replaces the orbit below desktop. Try the recreation.
                </p>
                <p className="label-mono mt-8 text-muted-foreground">
                  Static recreation — the live site renders an animated orbit from
                  the same seven pathways.
                </p>
              </div>
              <div className="lg:col-span-6 lg:col-start-7">
                <Reveal>
                  <ServePathwaysDemo />
                </Reveal>
              </div>
            </div>
          </Shell>
        </section>

        {/* 08 BUILDING THE EXPERIENCE */}
        <section className="bg-paper pb-24">
          <Shell>
            <SectionHeader index="08" label="Building the experience" title="Under the hood" />
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["Stack", "React 19 + TypeScript + Vite + Tailwind v4"],
                ["Backend", "Convex — contact conversations and donation records"],
                ["Motion", "Framer Motion, one shared easing curve, reduced-motion aware"],
                ["Giving", "Stripe Checkout in INR when configured, otherwise recorded intent"],
              ].map(([k, v]) => (
                <div key={k} className="border-t border-hairline pt-3">
                  <p className="label-mono text-muted-foreground">{k}</p>
                  <p className="mt-1.5 text-sm font-mono leading-relaxed">{v}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 grid gap-px border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-4">
              {buildFeatures.map((feature) => (
                <div key={feature} className="bg-paper p-5">
                  <p className="display-lg text-lg">{feature}</p>
                </div>
              ))}
            </div>
            <p className="label-mono mt-8 inline-flex items-start gap-3 border border-hairline bg-muted px-4 py-3.5 text-muted-foreground">
              <span className="mt-[6px] size-1.5 shrink-0 bg-accent" aria-hidden="true" />
              Bank details, contact details and story texts are honest placeholders
              in the site itself — labelled, not faked.
            </p>
          </Shell>
        </section>

        {/* 09 DESIGN LANGUAGE (dark) */}
        <section id="cs-language" data-tone="dark" className="grain-light bg-void py-24 text-void-foreground">
          <Shell>
            <SectionHeader index="09" label="Design direction" title="The site's own system" invert />
            <div className="mt-10 grid gap-px border border-white/15 bg-white/15 sm:grid-cols-2 lg:grid-cols-3">
              {designLanguage.map(([label, value]) => (
                <div key={label} className="bg-void p-6">
                  <p className="label-mono text-accent">{label}</p>
                  <p className="mt-3 text-sm font-mono leading-relaxed text-white/70">{value}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 max-w-2xl font-mono leading-relaxed text-white/60">
              Sunrise warmth over near-black ink — a palette that reads as hope
              without becoming sentimental. This case study re-presents that
              language with the portfolio's paper and ink; the trust site keeps its
              own sunrise palette.
            </p>
          </Shell>
        </section>

        {/* 10 RESPONSIVE + OUTCOME / STATUS */}
        <section className="bg-paper py-24">
          <Shell>
            <SectionHeader index="10" label="Responsive experience" title="One story, every screen" />
            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {[
                "Horizontal filmstrip becomes a vertical edition on small screens and reduced motion",
                "Orbit becomes a grid picker; form grids collapse to a single column",
                "Everything clamps — display type scales from 8.5rem to 3rem",
              ].map((line) => (
                <div key={line} className="border-t border-hairline pt-4">
                  <p className="text-sm font-mono leading-relaxed text-muted-foreground">{line}</p>
                </div>
              ))}
            </div>
            <p className="mt-10 max-w-2xl font-mono leading-relaxed text-muted-foreground">
              Outcome: a complete, working experience — contact submissions persist
              to Convex, donations run through Stripe or record an intent with a
              reference code, and every interaction works on desktop and mobile. No
              real donations or enquiries have been processed during development.
            </p>
          </Shell>
        </section>

        {/* 11 REFLECTION */}
        <section id="cs-reflection" className="bg-paper pb-24">
          <Shell>
            <SectionHeader index="11" label="Reflection" title="What I learned" />
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
          </Shell>
        </section>

        {/* FINAL */}
        <section data-tone="dark" className="grain-light bg-void py-28 text-void-foreground">
          <Shell>
            <Reveal>
              <p className="display-lg max-w-[24ch] text-[clamp(1.8rem,4.4vw,4rem)] leading-[1.05]">
                The story isn't over.
              </p>
            </Reveal>
            <p className="mt-8 max-w-xl font-mono leading-relaxed text-white/60">
              Hands of Grace turns an organization's story and impact into a clear,
              human digital experience — story first, trust throughout,
              participation one tap away.
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
