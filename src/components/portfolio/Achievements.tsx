import { Reveal, SectionHeader, Shell } from "./primitives";

const rows = [
  { year: "2026", cat: "Competition", title: "National UX Design Challenge — Finalist", note: "Shortlisted from open entry · placeholder, update with final result" },
  { year: "2025", cat: "Certification", title: "Interaction Design Foundation — UX Research", note: "Course completion" },
  { year: "2025", cat: "Hackathon", title: "48h Civic Tech Build — Design Lead", note: "Led research and interface for an accessibility-focused entry" },
  { year: "2025", cat: "Community", title: "Design mentoring circle — Facilitator", note: "Weekly critique sessions for first-year design students" },
  { year: "2024", cat: "Writing", title: "Essay series: interfaces that explain themselves", note: "Self-published, ongoing" },
  { year: "2024", cat: "Volunteer", title: "Pro-bono identity & site for a local nonprofit", note: "Brand, IA and build" },
];

export function Achievements() {
  return (
    <section className="relative bg-paper pb-24 sm:pb-32">
      <Shell>
        <SectionHeader index="09" label="Recognition" title="Beyond the work" />
        <Reveal>
          <h2 className="display-xl mt-10 max-w-[18ch] text-[clamp(2rem,5.4vw,5rem)]">
            The work beyond the work.
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-6 max-w-md text-muted-foreground">
            Competitions, certifications, community work and writing. Entries marked as placeholders
            are structured to be replaced with verified records.
          </p>
        </Reveal>
        <div className="mt-14 border-t border-hairline">
          {rows.map((r, i) => (
            <Reveal key={r.title} delay={i * 0.05}>
              <div className="grid grid-cols-[4rem_1fr] items-baseline gap-x-6 gap-y-1 border-b border-hairline py-6 sm:grid-cols-[6rem_9rem_1fr_auto]">
                <span className="label-mono text-accent">{r.year}</span>
                <span className="label-mono text-muted-foreground">{r.cat}</span>
                <h3 className="col-span-2 text-lg sm:col-span-1 sm:text-xl">{r.title}</h3>
                <span className="col-span-2 text-sm font-mono text-muted-foreground sm:col-span-1 sm:text-right">
                  {r.note}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </Shell>
    </section>
  );
}
