import { useEffect, useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Manifesto, ManifestoQuote } from "@/components/Manifesto";
import { WorkGallery } from "@/components/WorkGallery";
import { Process } from "@/components/Process";
import { ExperimentGrid } from "@/components/Lab";
import { MotionShowcase } from "@/components/MotionShowcase";
import { About } from "@/components/About";
import { Achievements, Future } from "@/components/Future";
import { Contact, Footer } from "@/components/Contact";
import { Cursor } from "@/components/Cursor";

/**
 * HOME — the full narrative:
 * hero → manifesto → work → process → motion → about → achievements →
 * future → contact → footer. Tracks when the viewport is over a dark section
 * so the floating navigation can adapt.
 */
export default function Home() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const darkIds = ["motion", "future"];
    const observers: IntersectionObserver[] = [];
    const visible = new Set<string>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.add(e.target.id);
          else visible.delete(e.target.id);
        }
        setDark(visible.size > 0);
      },
      { threshold: 0.25 },
    );
    for (const id of darkIds) {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    }
    observers.push(io);
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1));
      if (el) requestAnimationFrame(() => el.scrollIntoView({ behavior: "auto" }));
    }
  }, []);

  return (
    <div className="min-h-screen">
      <Cursor />
      <Navigation dark={dark} />
      <main>
        <Hero />
        <Manifesto />
        <ManifestoQuote />
        <WorkGallery />
        <ExperimentGrid />
        <Process />
        <MotionShowcase />
        <About />
        <Achievements />
        <Future />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
