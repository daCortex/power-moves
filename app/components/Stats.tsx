"use client";

import Counter from "./Counter";
import Reveal from "./Reveal";

const STATS = [
  { to: 33, suffix: " kV", label: "Switchgear voltage class" },
  { to: 250, suffix: "+", label: "Projects supplied & supported" },
  { to: 5, label: "Core capability areas", prefix: "" },
  { to: 100, suffix: "%", label: "Procurement-ready delivery" },
];

export default function Stats() {
  return (
    <section className="border-b border-line bg-ink py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid grid-cols-2 gap-px border border-line bg-line md:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="bg-ink">
              <div className="group relative px-6 py-10 transition-colors hover:bg-coal">
                <span className="absolute left-0 top-0 h-0 w-px bg-red transition-all duration-500 group-hover:h-full" />
                <div className="font-display text-4xl font-extrabold text-white md:text-5xl">
                  <Counter to={s.to} suffix={s.suffix} prefix={s.prefix} />
                </div>
                <div className="mt-3 text-xs uppercase tracking-wide text-mute md:text-sm">
                  {s.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
