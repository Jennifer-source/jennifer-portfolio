import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export const EASE = [0.16, 1, 0.3, 1] as const;

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** Word-by-word staggered reveal for large display type. */
export function RevealWords({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((w, i) => (
        <span key={`${w}-${i}`} className="inline-block overflow-hidden pb-[0.1em] align-bottom">
          <motion.span
            className="inline-block"
            initial={reduce ? { y: 0 } : { y: "110%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 1, delay: delay + i * 0.06, ease: EASE }}
          >
            {w}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export function SectionHeader({
  index,
  label,
  title,
  invert,
}: {
  index: string;
  label: string;
  title?: string;
  invert?: boolean;
}) {
  return (
    <div
      className={`flex items-baseline justify-between gap-6 border-t pt-4 ${
        invert ? "border-white/15" : "border-hairline"
      }`}
    >
      <span className={`label-mono ${invert ? "text-white/50" : "text-muted-foreground"}`}>
        {index} — {label}
      </span>
      {title ? (
        <span className={`label-mono ${invert ? "text-white/40" : "text-muted-foreground"}`}>
          {title}
        </span>
      ) : null}
    </div>
  );
}

export function Shell({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`mx-auto w-full max-w-[1600px] px-5 sm:px-8 lg:px-14 ${className}`}>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Case-study helpers — Level 1 overview + section jump nav.           */
/* Both reuse the existing token system (label-mono, display-lg,       */
/* hairline gap-px grids, link-underline); no new CSS is introduced.   */
/* ------------------------------------------------------------------ */

export type CaseStudyStep = { label: string; headline: string; body?: string };

/** Level 1 — the whole project story in six scannable cells. */
export function CaseStudyOverview({
  steps,
  invert,
  className = "",
}: {
  steps: readonly CaseStudyStep[];
  invert?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <p className="label-mono text-accent">The short version</p>
        <p className={`label-mono ${invert ? "text-white/40" : "text-muted-foreground"}`}>
          Six answers before the deep dive
        </p>
      </div>
      <div
        className={`mt-6 grid gap-px border sm:grid-cols-2 lg:grid-cols-3 ${
          invert ? "border-white/15 bg-white/15" : "border-hairline bg-hairline"
        }`}
      >
        {steps.map((step) => (
          <div key={step.label} className={invert ? "bg-void p-6" : "bg-paper p-6"}>
            <p className="label-mono text-accent">{step.label}</p>
            <p className="display-lg mt-3 text-lg leading-snug">{step.headline}</p>
            {step.body ? (
              <p
                className={`mt-2 text-sm leading-relaxed ${
                  invert ? "text-white/60" : "text-muted-foreground"
                }`}
              >
                {step.body}
              </p>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

/** Lightweight jump row — where am I in this case study? */
export function CaseStudyNav({
  items,
  invert,
  className = "",
}: {
  items: readonly { id: string; label: string }[];
  invert?: boolean;
  className?: string;
}) {
  return (
    <nav
      aria-label="Case study sections"
      className={`flex flex-wrap gap-x-7 gap-y-2.5 border-t pt-4 ${
        invert ? "border-white/15" : "border-hairline"
      } ${className}`}
    >
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className={`label-mono link-underline transition-colors ${
            invert ? "text-white/60 hover:text-white" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}
