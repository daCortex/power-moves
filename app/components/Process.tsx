"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Reveal from "./Reveal";
import { SectionHead } from "./Capabilities";

const STEPS = [
  { no: "01", title: "Consult", desc: "We review your requirement, load profile and site — and translate it into a clear electrical scope you can sign off on." },
  { no: "02", title: "Engineer", desc: "Our engineers design the system — ratings, protection, single-line diagrams and equipment selection to standard." },
  { no: "03", title: "Source", desc: "We procure genuine, documented equipment through our licensed supply lines, with quotation transparency throughout." },
  { no: "04", title: "Deliver", desc: "Equipment is delivered, installation supervised and the system commissioned and tested on site." },
  { no: "05", title: "Support", desc: "Handover, documentation and ongoing support — so what we deliver keeps running, 24/7." },
];

export default function Process() {
  const [active, setActive] = useState(0);

  return (
    <section id="process" className="scroll-mt-28 border-b border-line-strong/15 bg-surface">
      <div className="mx-auto max-w-[88rem] px-6 py-20 md:py-28">
        <Reveal>
          <SectionHead index="05" kicker="How we work" title="From Brief to Power" sub="Five stages · one partner" />
        </Reveal>

        {/* progress rail */}
        <Reveal delay={0.1}>
          <div className="mt-12 grid grid-cols-5 gap-2 md:gap-3">
            {STEPS.map((s, i) => {
              const on = i === active;
              const done = i < active;
              return (
                <button
                  key={s.no}
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  className={`relative overflow-hidden rounded-xl border px-3 py-5 text-center transition-all ${
                    on ? "border-ink bg-ink elev" : "border-line bg-surface hover:border-line-strong/30 hover:shadow-md"
                  }`}
                >
                  <span className={`font-mono-tech text-xs ${on ? "text-amber" : done ? "text-red" : "text-mute"}`}>{s.no}</span>
                  <span className={`mt-1 block font-display text-sm font-bold uppercase sm:text-base ${on ? "text-paper" : "text-ink"}`}>
                    {s.title}
                  </span>
                  {on && (
                    <motion.span layoutId="proc-underline" className="absolute inset-x-0 bottom-0 h-1 bg-amber" />
                  )}
                </button>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-4 grid overflow-hidden rounded-2xl border border-line bg-paper bg-grid-fine elev md:grid-cols-[auto_1fr]">
            {/* big step number */}
            <div className="hidden items-center justify-center border-r border-line px-12 md:flex">
                <motion.span
                  key={STEPS[active].no}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="font-display text-[10rem] font-extrabold leading-none text-line-strong/10"
                >
                  {STEPS[active].no}
                </motion.span>
            </div>
            <div className="p-8 md:p-12">
                <motion.div
                  key={STEPS[active].no}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35 }}
                >
                  <span className="accent-bar inline-block h-1.5 w-16 rounded-full" />
                  <h3 className="mt-5 font-display text-3xl font-extrabold uppercase text-ink md:text-5xl">
                    {STEPS[active].title}
                  </h3>
                  <p className="mt-4 max-w-xl text-lg text-graphite">{STEPS[active].desc}</p>
                  <div className="mt-8 flex items-center gap-4 tech-label text-steel">
                    <span>STAGE {STEPS[active].no} / 05</span>
                    <span className="h-px flex-1 bg-line-strong/20" />
                    {active < STEPS.length - 1 ? (
                      <button onClick={() => setActive(active + 1)} className="text-ink hover:text-red">NEXT →</button>
                    ) : (
                      <a href="#contact" className="text-red">START YOURS →</a>
                    )}
                  </div>
                </motion.div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
