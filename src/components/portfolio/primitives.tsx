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
