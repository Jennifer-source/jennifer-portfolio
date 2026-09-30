import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion, AnimatePresence } from "framer-motion";
import { site } from "@/data/site";
import { Arrow, Reveal } from "@/components/core";

/**
 * LET'S MAKE SOMETHING WORTH REMEMBERING — contact with an interactive email
 * button (magnetic pull + play microinteraction), followed by a minimal footer
 * with live local time and a rotating message.
 */
export function Contact() {
  return (
    <section id="contact" aria-label="Contact" className="relative pb-28 md:pb-40">
      <div className="edge pt-24 md:pt-36">
        <p className="label-mono text-signal">07 — LET'S CREATE WHAT'S NEXT</p>
        <Reveal>
          <h2 className="display-lg mt-6">
            LET'S MAKE
            <br />
            SOMETHING
            <br />
            <span className="text-cobalt">WORTH REMEMBERING.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <MagneticEmail />
          </div>
          <div className="md:col-span-5">
            <Reveal delay={0.15}>
              <ul className="space-y-0 border-t border-border">
                {[
                  { k: "EMAIL", v: site.email, href: `mailto:${site.email}` },
                  { k: "LINKEDIN", v: "in/josephjennifer", href: site.links.linkedin },
                  { k: "BEHANCE", v: "josephjennifer", href: site.links.behance },
                  { k: "INSTAGRAM", v: "@josephjennifer.design", href: site.links.instagram },
                  { k: "GITHUB", v: "josephjennifer", href: site.links.github },
                ].map((l) => (
                  <li key={l.k} className="border-b border-border">
                    <a
                      href={l.href}
                      target={l.href.startsWith("mailto") ? undefined : "_blank"}
                      rel={l.href.startsWith("mailto") ? undefined : "noreferrer"}
                      className="group flex items-baseline justify-between gap-4 py-4"
                    >
                      <span className="label-mono text-muted-foreground">{l.k}</span>
                      <span className="link-underline text-sm">{l.v}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function MagneticEmail() {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 18 });
  const sy = useSpring(y, { stiffness: 180, damping: 18 });
  const [copied, setCopied] = useState(false);

  const onMove = (e: React.MouseEvent) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.18);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.18);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${site.email}`;
    }
  };

  return (
    <div>
      <motion.a
        href={`mailto:${site.email}`}
        onClick={(e) => {
          if (!reduce) e.preventDefault();
          copy();
        }}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        data-cursor="OPEN"
        className="group relative inline-flex items-center gap-4 border border-ink bg-paper px-7 py-5 transition-colors hover:bg-ink hover:text-paper"
        style={{ x: sx, y: sy }}
        aria-label={`Start a conversation — copy ${site.email} to clipboard`}
      >
        <AnimatePresence mode="wait" initial={false}>
          {copied ? (
            <motion.span
              key="copied"
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -8, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="label-mono"
            >
              COPIED TO CLIPBOARD ✓
            </motion.span>
          ) : (
            <motion.span
              key="idle"
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -8, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="label-mono text-base tracking-[0.18em]"
            >
              START A CONVERSATION
            </motion.span>
          )}
        </AnimatePresence>
        <Arrow className="h-5 w-5 transition-transform group-hover:translate-x-1" />
      </motion.a>
      <p className="mt-4 label-mono text-muted-foreground">
        {site.email} — CLICK TO COPY
      </p>
    </div>
  );
}

export function Footer() {
  const [time, setTime] = useState("");
  const [msgIndex, setMsgIndex] = useState(0);
  const messages = [
    "Designed with curiosity.",
    "Built with intention.",
    "Motion explains change.",
    "Thanks for scrolling all the way.",
  ];

  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      );
    tick();
    const t = setInterval(tick, 30000);
    const m = setInterval(() => setMsgIndex((i) => (i + 1) % messages.length), 4000);
    return () => {
      clearInterval(t);
      clearInterval(m);
    };
  }, []);

  return (
    <footer className="edge border-t border-border pb-10 pt-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="label-mono text-muted-foreground">
          © {site.year} {site.name}
        </p>
        <AnimatePresence mode="wait">
          <motion.p
            key={msgIndex}
            initial={{ y: 6, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -6, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="label-mono text-muted-foreground"
          >
            {messages[msgIndex]}
          </motion.p>
        </AnimatePresence>
        <p className="label-mono text-muted-foreground">LOCAL TIME — {time}</p>
      </div>
    </footer>
  );
}
