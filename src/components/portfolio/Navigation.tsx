import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import { EASE } from "./primitives";

const links = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export function Navigation() {
  const [dark, setDark] = useState(false);
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<string>("");
  const location = useLocation();

  useEffect(() => {
    const sections = links
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => Boolean(el));
    const darkSections = Array.from(document.querySelectorAll<HTMLElement>("[data-tone='dark']"));
    const onScroll = () => {
      const probe = 40;
      setDark(
        darkSections.some((el) => {
          const r = el.getBoundingClientRect();
          return r.top <= probe && r.bottom >= probe;
        }),
      );
      let active = "";
      for (const s of sections) {
        if (s.getBoundingClientRect().top <= window.innerHeight * 0.4) active = s.id;
      }
      setCurrent(active);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [location.pathname]);

  // Anchor navigation is used on the home route; keep off-route links inert.
  const onHome = location.pathname === "/";

  const tone = dark ? "text-white" : "text-foreground";

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${tone}`}>
        <nav
          aria-label="Primary"
          className="mx-auto flex max-w-[1600px] items-center justify-between px-5 py-5 sm:px-8 lg:px-14"
        >
          <Link to="/" className="label-mono leading-tight tracking-[0.18em] hover:opacity-70">
            Joseph
            <br />
            Jennifer
          </Link>
          <div className="hidden items-center gap-8 rounded-full border border-current/15 bg-current/[0.04] px-6 py-2.5 backdrop-blur-md md:flex">
            {links.map((l) => (
              <a
                key={l.id}
                href={onHome ? `#${l.id}` : `/#${l.id}`}
                className={`label-mono link-underline transition-opacity ${
                  onHome && current === l.id ? "opacity-100" : "opacity-55 hover:opacity-100"
                }`}
              >
                {l.label}
              </a>
            ))}
          </div>
          <span className="label-mono hidden opacity-55 md:block">Portfolio / 2026</span>
          <button
            type="button"
            className="label-mono md:hidden"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </nav>
      </header>
      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-40 bg-void text-void-foreground md:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <div className="flex h-full flex-col justify-center gap-2 px-6">
              {links.map((l, i) => (
                <motion.a
                  key={l.id}
                  href={onHome ? `#${l.id}` : `/#${l.id}`}
                  onClick={() => setOpen(false)}
                  className="display-xl text-[13vw]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.6, ease: EASE }}
                >
                  {l.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
