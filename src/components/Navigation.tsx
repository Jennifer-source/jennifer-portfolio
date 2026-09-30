import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { site } from "@/data/site";

const NAV = [
  { label: "WORK", href: "/#work" },
  { label: "PROCESS", href: "/#process" },
  { label: "ABOUT", href: "/#about" },
  { label: "CONTACT", href: "/#contact" },
];

/**
 * Floating pill navigation. Light/blur over light sections, inked over dark
 * ones (via a body-level flag set by dark sections' IntersectionObserver in
 * Home). Active item tracked with a scroll spy.
 */
export function Navigation({ dark }: { dark: boolean }) {
  const [active, setActive] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 40));

  useEffect(() => {
    if (location.pathname !== "/") return;
    const ids = ["work", "process", "about", "contact"];
    const observers: IntersectionObserver[] = [];
    const visible = new Map<string, number>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.set(e.target.id, e.intersectionRatio);
          else visible.delete(e.target.id);
        }
        let best = "";
        let max = 0;
        for (const [id, ratio] of visible) {
          if (ratio > max) {
            max = ratio;
            best = id;
          }
        }
        setActive(best);
      },
      { threshold: [0.2, 0.5] },
    );
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    }
    observers.push(io);
    return () => observers.forEach((o) => o.disconnect());
  }, [location.pathname]);

  const onHome = location.pathname === "/";

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1], delay: 0.2 }}
      className="fixed top-4 inset-x-0 z-50 edge"
    >
      <nav
        aria-label="Primary"
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-full border px-5 py-2.5 transition-colors duration-500 ${
          dark
            ? "border-night-border bg-night/70 text-night-fg backdrop-blur-md"
            : "border-border bg-paper/80 text-ink backdrop-blur-md"
        } ${scrolled ? "shadow-[0_8px_30px_rgba(0,0,0,0.06)]" : ""}`}
      >
        <Link to="/" className="flex items-baseline gap-2" aria-label="Home">
          <span className="font-wide text-sm font-extrabold tracking-tight">JJ</span>
          <span className="label-mono opacity-50 hidden sm:inline">— Portfolio / 2026</span>
        </Link>

        <ul className="hidden md:flex items-center gap-1">
          {NAV.map((item) => {
            const id = item.href.replace("/#", "");
            const isActive = onHome && active === id;
            return (
              <li key={item.label}>
                <a
                  href={item.href}
                  className={`relative block rounded-full px-3 py-1.5 label-mono transition-colors ${
                    isActive
                      ? "text-ink"
                      : dark
                        ? "text-night-muted hover:text-night-fg"
                        : "text-muted-foreground hover:text-ink"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full"
                      style={{ background: dark ? "rgba(255,255,255,0.08)" : "var(--secondary)" }}
                      transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
                    />
                  )}
                  <span className="relative">{item.label}</span>
                </a>
              </li>
            );
          })}
          <li>
            <a
              href="/#contact"
              className="ml-2 rounded-full bg-ink px-4 py-1.5 label-mono text-paper transition-transform hover:-translate-y-px"
            >
              START →
            </a>
          </li>
        </ul>

        <button
          type="button"
          className="md:hidden label-mono px-3 py-1.5"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "CLOSE" : "MENU"}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`md:hidden mx-auto mt-2 max-w-6xl rounded-2xl border p-4 ${
              dark ? "border-night-border bg-night/95 text-night-fg" : "border-border bg-paper/95 text-ink"
            } backdrop-blur-md`}
          >
            {onHome
              ? NAV.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-border/60 py-3 font-display text-lg font-bold tracking-tight last:border-0"
                  >
                    {item.label}
                  </a>
                ))
              : (
                <Link to="/" onClick={() => setOpen(false)} className="block py-3 font-display text-lg font-bold">
                  ← BACK TO HOME
                </Link>
              )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
