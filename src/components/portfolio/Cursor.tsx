import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

/** Desktop-only custom cursor. Reads data-cursor="LABEL" from hovered elements. */
export function Cursor() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [active, setActive] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 700, damping: 45, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 700, damping: 45, mass: 0.4 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    setEnabled(true);
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-cursor]");
      if (el) {
        setLabel(el.dataset["cursor"] || "");
        setActive(true);
      } else {
        const interactive = (e.target as HTMLElement | null)?.closest("a,button");
        setLabel(null);
        setActive(Boolean(interactive));
      }
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);

  if (!enabled || reduce) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden mix-blend-difference lg:block"
      style={{ x: sx, y: sy }}
    >
      <motion.div
        className="flex items-center justify-center rounded-full bg-white"
        animate={{
          width: label ? 92 : active ? 40 : 12,
          height: label ? 92 : active ? 40 : 12,
          x: label ? -46 : active ? -20 : -6,
          y: label ? -46 : active ? -20 : -6,
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        {label ? <span className="label-mono text-[9px] text-black">{label}</span> : null}
      </motion.div>
    </motion.div>
  );
}
