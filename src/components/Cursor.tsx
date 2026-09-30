import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

type CursorLabel = "VIEW CASE STUDY" | "VIEW" | "PLAY" | "DRAG" | "OPEN";

/**
 * Custom cursor — desktop only (pointer: fine), disabled under reduced motion.
 * Sits still by default; springs toward a "next interaction" marker that pages
 * publish via data-cursor attributes. Grows + labels on interactive hover.
 */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState<CursorLabel | null>(null);
  const reduce = useReducedMotion();

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.6 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    setEnabled(true);
    document.documentElement.classList.add("cursor-none-desktop");

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement;
      const interactive = t.closest("a, button, [role='button'], input, textarea, select");
      setHovering(Boolean(interactive));
      const tagged = t.closest<HTMLElement>("[data-cursor]");
      if (tagged?.dataset.cursor === "hidden") setLabel(null);
      else if (tagged?.dataset.cursor) setLabel(tagged.dataset.cursor as CursorLabel);
      else setLabel(null);
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.classList.remove("cursor-none-desktop");
    };
  }, [x, y]);

  if (!enabled || reduce) return null;

  return (
    <>
      {/* the actual pointer */}
      <motion.div
        aria-hidden
        className="fixed z-[90] pointer-events-none"
        style={{ x, y, left: 0, top: 0 }}
      >
        <motion.div
          className="rounded-full bg-signal"
          animate={{
            width: hovering ? 10 : 6,
            height: hovering ? 10 : 6,
            x: -3,
            y: -3,
          }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        />
      </motion.div>
      {/* trailing ring / label puck */}
      <motion.div
        aria-hidden
        className="fixed z-[89] pointer-events-none"
        style={{ x: sx, y: sy, left: 0, top: 0 }}
      >
        <motion.div
          className="flex items-center justify-center rounded-full border border-signal text-signal label-mono bg-paper/80 backdrop-blur-[2px]"
          animate={{
            width: label ? 108 : hovering ? 34 : 26,
            height: label ? 108 : hovering ? 34 : 26,
            x: label ? -54 : -13,
            y: label ? -54 : -13,
            backgroundColor: label ? "var(--signal)" : "rgba(0,0,0,0)",
            color: label ? "var(--signal-ink)" : "var(--signal)",
          }}
          transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
        >
          {label && <span className="text-[9px] tracking-[0.14em] text-center leading-tight">{label}</span>}
        </motion.div>
      </motion.div>
    </>
  );
}
