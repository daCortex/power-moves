"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Reveal from "./Reveal";
import { SectionHead } from "./Capabilities";
import { defaultContent, type SiteContent } from "@/app/lib/cms/schema";

export default function Process({ data }: { data?: SiteContent["process"] }) {
  const d = data ?? defaultContent.process;
  const steps = d.steps;
  const [active, setActive] = useState(0);
  const step = steps[active] ?? steps[0];

  return (
    <section id="process" className="scroll-mt-28 border-b border-line bg-surface">
      <div className="mx-auto max-w-[88rem] px-6 py-20 md:py-28">
        <Reveal><SectionHead index={d.index} kicker={d.kicker} title={d.title} sub={d.sub} /></Reveal>

        <Reveal delay={0.1}>
          <div className="mt-12 grid gap-2 md:gap-3" style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0,1fr))` }}>
            {steps.map((s, i) => {
              const on = i === active;
              const done = i < active;
              return (
                <button key={s.no} onClick={() => setActive(i)} onMouseEnter={() => setActive(i)}
                  className={`relative overflow-hidden rounded-xl border px-3 py-5 text-center transition-all ${on ? "border-ink bg-ink elev" : "border-line bg-surface hover:border-line-strong/30 hover:shadow-md"}`}>
                  <span className={`font-mono-tech text-xs ${on ? "text-amber" : done ? "text-red" : "text-mute"}`}>{s.no}</span>
                  <span className={`mt-1 block font-display text-sm font-bold uppercase sm:text-base ${on ? "text-paper" : "text-ink"}`}>{s.title}</span>
                  {on && <motion.span layoutId="proc-underline" className="absolute inset-x-0 bottom-0 h-1 bg-amber" />}
                </button>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-4 grid overflow-hidden rounded-2xl border border-line bg-paper bg-grid-fine elev md:grid-cols-[auto_1fr]">
            <div className="hidden items-center justify-center border-r border-line px-12 md:flex">
              <motion.span key={step.no} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}
                className="font-display text-[10rem] font-extrabold leading-none text-line-strong/10">{step.no}</motion.span>
            </div>
            <div className="p-8 md:p-12">
              <motion.div key={step.no} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.35 }}>
                <span className="accent-bar inline-block h-1.5 w-16 rounded-full" />
                <h3 className="mt-5 font-display text-3xl font-extrabold uppercase text-ink md:text-5xl">{step.title}</h3>
                <p className="mt-4 max-w-xl text-lg text-graphite">{step.desc}</p>
                <div className="mt-8 flex items-center gap-4 tech-label text-steel">
                  <span>STAGE {step.no} / {String(steps.length).padStart(2, "0")}</span>
                  <span className="h-px flex-1 bg-line-strong/20" />
                  {active < steps.length - 1
                    ? <button onClick={() => setActive(active + 1)} className="text-ink hover:text-red">NEXT →</button>
                    : <a href="#contact" className="text-red">START YOURS →</a>}
                </div>
              </motion.div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
