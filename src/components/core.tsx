import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

/* ------------------------------------------------------------------ */
/* MOTION SYSTEM — cinematic ease, reduced-motion aware                */
/* ------------------------------------------------------------------ */

export const EASE = [0.19, 1, 0.22, 1] as const; // "expo out"
export const EASE_INOUT = [0.83, 0, 0.17, 1] as const;

export const rise: Variants = {
  hidden: { y: 28, opacity: 0 },
  show: (i: number = 0) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.9, ease: EASE, delay: i * 0.08 },
  }),
};

export const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

export const lineGrow: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 1.2, ease: EASE } },
};

/* ------------------------------------------------------------------ */
/* REVEAL — one element rising into view                               */
/* ------------------------------------------------------------------ */

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ y, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once, margin: "-8% 0px" }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* STAGGER — word/line level reveal for display type                   */
/* ------------------------------------------------------------------ */

export function StaggerWords({
  text,
  className,
  wordClassName,
  delay = 0,
  as: Tag = "span",
  slice,
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  slice?: number;
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  if (reduce) {
    return (
      <Tag className={className} aria-label={text}>
        {words.map((w, i) => (
          <span key={i} className={wordClassName}>
            {w}
            {i < words.length - 1 ? " " : ""}
          </span>
        ))}
      </Tag>
    );
  }
  return (
    <Tag className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom pb-[0.08em] -mb-[0.08em]">
          <motion.span
            className={`inline-block ${wordClassName ?? ""}`}
            initial={{ y: "112%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true, margin: "-6% 0px" }}
            transition={{ duration: 0.9, ease: EASE, delay: delay + i * 0.055 }}
          >
            {w}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
      {slice !== undefined && (
        <span className="label-mono align-top text-signal" aria-hidden>
          {slice}
        </span>
      )}
    </Tag>
  );
}

/* ------------------------------------------------------------------ */
/* RULE — numbered section divider                                     */
/* ------------------------------------------------------------------ */

export function Rule({
  index,
  label,
  dark = false,
}: {
  index: string;
  label: string;
  dark?: boolean;
}) {
  const reduce = useReducedMotion();
  return (
    <div className="edge">
      <div
        className={`flex items-baseline gap-4 pt-4 pb-10 border-t ${
          dark ? "border-night-border" : "border-border"
        }`}
      >
        <span className="label-mono text-signal">{index}</span>
        <span className={`label-mono ${dark ? "text-night-muted" : "text-muted-foreground"}`}>
          {label}
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* ARROW                                                               */
/* ------------------------------------------------------------------ */

export function Arrow({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
      aria-hidden
    >
      <path d="M7 17L17 7M17 7H8M17 7v9" strokeLinecap="square" />
    </svg>
  );
}

export function ArrowDown({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
      aria-hidden
    >
      <path d="M12 4v16m0 0l-6-6m6 6l6-6" strokeLinecap="square" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* SECTION SHELL — consistent vertical rhythm                          */
/* ------------------------------------------------------------------ */

export function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`relative py-24 md:py-36 ${className}`}>
      {children}
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* METADATA ROW — role / year / category columns                       */
/* ------------------------------------------------------------------ */

export function MetaRow({
  items,
  dark = false,
  className = "",
}: {
  items: { k: string; v: string }[];
  dark?: boolean;
  className?: string;
}) {
  return (
    <dl className={`grid grid-cols-2 md:grid-cols-4 gap-6 ${className}`}>
      {items.map((it) => (
        <div key={it.k}>
          <dt className={`label-mono ${dark ? "text-night-muted" : "text-muted-foreground"}`}>
            {it.k}
          </dt>
          <dd className={`mt-2 text-sm ${dark ? "text-night-fg" : "text-ink"}`}>{it.v}</dd>
        </div>
      ))}
    </dl>
  );
}
