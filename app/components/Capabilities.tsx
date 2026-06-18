"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Reveal from "./Reveal";

type Cap = {
  no: string;
  title: string;
  tag: string;
  desc: string;
  points: string[];
  metric: { k: string; l: string };
  icon: React.ReactNode;
};

const S = "h-6 w-6";
const CAPS: Cap[] = [
  {
    no: "01",
    title: "Product Trading",
    tag: "SUPPLY",
    desc: "Procurement-ready supply of the components that build a network — sourced, stocked and delivered with manufacturing strength behind every quotation.",
    points: [
      "Transformers, switchgear, panels, cables & protection",
      "Direct, licensed supply lines (incl. ABB)",
      "Quotation to delivery, fully coordinated",
      "Genuine equipment, documented & warranted",
    ],
    metric: { k: "5", l: "Product families" },
    icon: (
      <svg viewBox="0 0 24 24" className={S} fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M3 7l9-4 9 4-9 4-9-4Z" /><path d="M3 12l9 4 9-4M3 17l9 4 9-4" />
      </svg>
    ),
  },
  {
    no: "02",
    title: "EPC Turnkey",
    tag: "ENGINEER · BUILD",
    desc: "One accountable partner from requirement review to commissioning — engineering, procurement and construction handed over ready to energize.",
    points: [
      "Requirement review & system design",
      "Sourcing, delivery & site coordination",
      "Installation supervision & commissioning",
      "Single point of responsibility",
    ],
    metric: { k: "E→C", l: "End to end" },
    icon: (
      <svg viewBox="0 0 24 24" className={S} fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" />
        <circle cx="12" cy="12" r="3.4" />
      </svg>
    ),
  },
  {
    no: "03",
    title: "Substations",
    tag: "GRID",
    desc: "Equipment supply and engineering coordination for utility networks and distribution upgrades — built to keep the grid stable, safe and online.",
    points: [
      "Package & conventional substations",
      "Primary & secondary distribution",
      "Protection & control coordination",
      "Network upgrade support",
    ],
    metric: { k: "≤33", l: "kV class" },
    icon: (
      <svg viewBox="0 0 24 24" className={S} fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M5 21V8l4-3 4 3M13 21V11l3-2 3 2v10" /><path d="M3 21h18M8.5 11h1M16 14h1" />
      </svg>
    ),
  },
  {
    no: "04",
    title: "Industrial Power",
    tag: "FACILITY",
    desc: "Distribution, control and protection systems for factories and infrastructure — engineered for uptime, safety and the loads of real operations.",
    points: [
      "LV & MV distribution systems",
      "Motor control & protection",
      "Power factor & energy efficiency",
      "Commercial & infrastructure builds",
    ],
    metric: { k: "24/7", l: "For uptime" },
    icon: (
      <svg viewBox="0 0 24 24" className={S} fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />
      </svg>
    ),
  },
];

export default function Capabilities() {
  const [active, setActive] = useState(0);
  const cap = CAPS[active];

  return (
    <section id="capabilities" className="scroll-mt-28 border-b border-line-strong/15 bg-surface">
      <div className="mx-auto max-w-[88rem] px-6 py-20 md:py-28">
        <Reveal>
          <SectionHead index="02" kicker="What we do" title="Capabilities" sub="Select a discipline" />
        </Reveal>

        <div className="mt-12 grid gap-px border border-line-strong/15 bg-line-strong/15 lg:grid-cols-[0.9fr_1.4fr]">
          {/* Tab list */}
          <div className="bg-surface">
            {CAPS.map((c, i) => {
              const on = i === active;
              return (
                <button
                  key={c.no}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className={`group flex w-full items-center gap-5 border-b border-line px-6 py-6 text-left transition-colors last:border-b-0 ${
                    on ? "bg-ink text-paper" : "hover:bg-paper"
                  }`}
                >
                  <span className={`font-mono-tech text-sm ${on ? "text-amber" : "text-mute"}`}>{c.no}</span>
                  <span className={`grid h-11 w-11 shrink-0 place-items-center border transition-colors ${
                    on ? "border-paper/30 bg-red text-white" : "border-line-strong/20 bg-paper text-ink"
                  }`}>
                    {c.icon}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className={`block font-display text-xl font-bold ${on ? "text-paper" : "text-ink"}`}>
                      {c.title}
                    </span>
                    <span className={`tech-label ${on ? "text-paper/60" : "text-steel"}`}>{c.tag}</span>
                  </span>
                  <span className={`text-xl transition-transform ${on ? "translate-x-0 text-amber" : "-translate-x-1 text-mute group-hover:translate-x-0"}`} aria-hidden>→</span>
                </button>
              );
            })}
          </div>

          {/* Panel */}
          <div className="relative min-h-[26rem] overflow-hidden bg-paper bg-grid-fine">
              <motion.div
                key={cap.no}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="flex h-full flex-col p-8 md:p-10"
              >
                <div className="flex items-start justify-between">
                  <span className="font-display text-7xl font-extrabold text-line-strong/15 md:text-8xl">{cap.no}</span>
                  <span className="hazard-red h-5 w-16" />
                </div>
                <h3 className="mt-4 font-display text-3xl font-extrabold uppercase text-ink md:text-4xl">{cap.title}</h3>
                <p className="mt-4 max-w-lg text-graphite">{cap.desc}</p>

                <ul className="mt-7 grid gap-px border-l border-t border-line-strong/15 sm:grid-cols-2">
                  {cap.points.map((p) => (
                    <li key={p} className="flex items-start gap-3 border-b border-r border-line-strong/15 bg-surface/60 px-4 py-3.5 text-sm text-graphite">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rotate-45 bg-red" />
                      {p}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex items-end justify-between pt-8">
                  <div>
                    <div className="font-display text-4xl font-extrabold text-ink">{cap.metric.k}</div>
                    <div className="tech-label text-steel">{cap.metric.l}</div>
                  </div>
                  <a href="#contact" className="group inline-flex items-center gap-2 border-b-2 border-red pb-1 tech-label text-ink">
                    Discuss a project
                    <span className="transition-transform group-hover:translate-x-1" aria-hidden>→</span>
                  </a>
                </div>
              </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SectionHead({
  index, kicker, title, sub,
}: { index: string; kicker: string; title: string; sub?: string }) {
  return (
    <div className="flex flex-col gap-4 border-b border-line-strong/15 pb-6 md:flex-row md:items-end md:justify-between">
      <div>
        <div className="flex items-center gap-3 tech-label text-red">
          <span className="font-mono-tech">[ {index} ]</span>
          <span className="h-px w-8 bg-red" />
          {kicker}
        </div>
        <h2 className="mt-3 heading-mega text-[clamp(2rem,5vw,3.5rem)] text-ink">{title}</h2>
      </div>
      {sub && <div className="tech-label text-steel">{sub}</div>}
    </div>
  );
}
