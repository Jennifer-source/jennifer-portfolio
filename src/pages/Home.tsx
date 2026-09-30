import { Cursor } from "@/components/portfolio/Cursor";
import { Navigation } from "@/components/portfolio/Navigation";
import { Hero } from "@/components/portfolio/Hero";
import { Manifesto } from "@/components/portfolio/Manifesto";
import { SelectedWork } from "@/components/portfolio/SelectedWork";
import { HowIThink } from "@/components/portfolio/HowIThink";
import { MotionShowcase } from "@/components/portfolio/MotionShowcase";
import { Lab } from "@/components/portfolio/Lab";
import { About } from "@/components/portfolio/About";
import { Skills } from "@/components/portfolio/Skills";
import { Achievements } from "@/components/portfolio/Achievements";
import { Future } from "@/components/portfolio/Future";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";

/**
 * HOME — Design Alchemy composition, in the reference's exact section order:
 * Hero → Manifesto → SelectedWork → HowIThink → MotionShowcase → Lab →
 * About → Skills → Achievements → Future → Contact → Footer.
 */
export default function Home() {
  return (
    <>
      <Cursor />
      <Navigation />
      <main>
        <Hero />
        <Manifesto />
        <SelectedWork />
        <HowIThink />
        <MotionShowcase />
        <Lab />
        <About />
        <Skills />
        <Achievements />
        <Future />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
