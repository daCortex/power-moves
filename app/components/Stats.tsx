"use client";

import Counter from "./Counter";
import Reveal from "./Reveal";

const STATS = [
  { to: 33, suffix: " kV", label: "Switchgear voltage class", note: "Medium voltage" },
  { to: 250, suffix: "+", label: "Projects supplied & supported", note: "And counting" },
  { to: 5, suffix: "", label: "Core product families", note: "Single source" },
  { to: 100, suffix: "%", label: "Procurement-ready delivery", note: "Documented" },
];

export default function Stats() {
  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-[82rem] px-6 py-6">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4 elev-lg">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="bg-ink">
              <div className="group relative px-6 py-9 transition-colors hover:bg-graphite/30">
                <span className="absolute left-0 top-0 h-0.5 w-0 bg-amber transition-all duration-500 group-hover:w-full" />
                <div className="tech-label text-amber">{String(i + 1).padStart(2, "0")}</div>
                <div className="mt-3 font-display text-4xl font-extrabold text-paper md:text-5xl">
                  <Counter to={s.to} suffix={s.suffix} />
                </div>
                <div className="mt-2 text-sm text-paper/80">{s.label}</div>
                <div className="mt-1 tech-label text-paper/40">{s.note}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
