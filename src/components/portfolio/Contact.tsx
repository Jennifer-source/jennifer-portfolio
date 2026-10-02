import { useState } from "react";
import { motion } from "framer-motion";
import { Reveal, SectionHeader, Shell } from "./primitives";

const socials = [
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "GitHub", href: "https://github.com" },
];

const EMAIL = "josephjenniferpari@gmail.com";

export function Contact() {
  const [copied, setCopied] = useState(false);

  return (
    <section id="contact" className="relative bg-paper py-24 sm:py-32">
      <Shell>
        <SectionHeader index="11" label="Let's create what's next" title="Contact" />
        <h2 className="display-xl mt-14 text-[clamp(2.4rem,9vw,8rem)]">
          <span className="block">Let's make</span>
          <span className="block pl-[6vw]">something</span>
          <span className="block text-accent">worth remembering.</span>
        </h2>
        <div className="mt-16 grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <motion.a
              href={`mailto:${EMAIL}`}
              data-cursor="Write"
              className="group inline-flex items-center gap-5 border border-foreground px-7 py-5 transition-colors duration-500 hover:bg-foreground hover:text-background"
              whileHover={{ x: 6 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="display-lg text-xl uppercase sm:text-2xl">Start a conversation</span>
              <span className="text-2xl transition-transform duration-500 group-hover:translate-x-2">
                →
              </span>
            </motion.a>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <a
                href={`mailto:${EMAIL}`}
                className="font-mono text-sm text-muted-foreground"
              >
                {EMAIL}
              </a>
              <button
                type="button"
                className="label-mono link-underline"
                onClick={() => {
                  void navigator.clipboard?.writeText(EMAIL);
                  setCopied(true);
                  window.setTimeout(() => setCopied(false), 1800);
                }}
              >
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          </Reveal>
          <div className="lg:col-span-5 lg:col-start-8">
            <ul className="border-t border-hairline">
              {socials.map((s, i) => (
                <Reveal key={s.label} delay={i * 0.06}>
                  <li className="border-b border-hairline">
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="group flex items-baseline justify-between py-4"
                    >
                      <span className="display-lg text-xl uppercase">{s.label}</span>
                      <span className="label-mono text-muted-foreground transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-1">
                        ↗
                      </span>
                    </a>
                  </li>
                </Reveal>
              ))}
            </ul>
            <p className="mt-6 text-sm font-mono text-muted-foreground">
              Open to internships, design programmes, research collaborations and studio work.
            </p>
          </div>
        </div>
      </Shell>
    </section>
  );
}
