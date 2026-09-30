import { useEffect, useState } from "react";
import { Shell } from "./primitives";

const messages = [
  "Designed with curiosity.",
  "Built with intention.",
  "Still asking questions.",
  "Iteration 47.",
];

export function Footer() {
  const [time, setTime] = useState("");
  const [msg, setMsg] = useState(0);

  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
      );
    tick();
    const t = window.setInterval(tick, 1000);
    const m = window.setInterval(() => setMsg((v) => (v + 1) % messages.length), 4000);
    return () => {
      window.clearInterval(t);
      window.clearInterval(m);
    };
  }, []);

  return (
    <footer data-tone="dark" className="bg-void py-10 text-void-foreground">
      <Shell className="flex flex-wrap items-center justify-between gap-4">
        <span className="label-mono opacity-70">© 2026 Joseph Jennifer</span>
        <span className="label-mono text-accent">{messages[msg]}</span>
        <span className="label-mono opacity-70">Local {time || "--:--:--"}</span>
      </Shell>
    </footer>
  );
}
