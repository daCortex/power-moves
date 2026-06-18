"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "./Reveal";
import { SectionHead } from "./Capabilities";

const FAQS = [
  {
    q: "What exactly does Power Moves do?",
    a: "Three things, under one roof: we supply electrical equipment, we engineer the systems around it, and we deliver complete EPC turnkey projects — commissioned and ready to run. You can engage us for a single transformer or a full substation.",
  },
  {
    q: "Are you a genuine ABB supplier?",
    a: "Yes. We are a licensed ABB switchgear supplier, so the equipment we quote is genuine, documented and warranted — not grey-market stock.",
  },
  {
    q: "What voltage levels do you handle?",
    a: "We work across low voltage (≤ 1000 V) through medium voltage up to the 33 kV class, covering distribution boards, LV/MV switchgear, transformers and package substations.",
  },
  {
    q: "Can you handle the whole project, start to finish?",
    a: "That's our EPC turnkey model. From requirement review and system design through sourcing, delivery, installation supervision and commissioning — one accountable partner, one point of responsibility.",
  },
  {
    q: "Which standards do you build to?",
    a: "Our equipment and engineering follow the relevant IEC standards — IEC 60076 (transformers), IEC 62271 (HV switchgear), IEC 61439 (LV assemblies) and IEC 62271-202 (package substations) — backed by ISO-certified operations.",
  },
  {
    q: "How do I get a quotation?",
    a: "Send us your requirement — load, voltage, site and scope. We'll review it and come back with a clear, itemized quotation. Use the Request a Quote button or contact our Yangon commercial team directly.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-28 border-b border-line-strong/15 bg-paper">
      <div className="mx-auto max-w-[88rem] px-6 py-20 md:py-28">
        <Reveal>
          <SectionHead index="07" kicker="Questions" title="Frequently Asked" sub="Straight answers" />
        </Reveal>

        <div className="mt-12 space-y-3">
          {FAQS.map((f, i) => {
            const on = open === i;
            return (
              <Reveal key={f.q} delay={Math.min(i, 3) * 0.05}>
                <div className={`overflow-hidden rounded-xl border bg-surface px-5 transition-all ${on ? "border-line-strong/30 elev" : "border-line hover:border-line-strong/25"}`}>
                  <button
                    onClick={() => setOpen(on ? null : i)}
                    className="group flex w-full items-center gap-5 py-5 text-left"
                  >
                    <span className={`font-mono-tech text-sm ${on ? "text-red" : "text-mute"}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className={`flex-1 font-display text-lg font-bold transition-colors md:text-xl ${on ? "text-red" : "text-ink group-hover:text-red"}`}>
                      {f.q}
                    </span>
                    <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg border transition-all ${on ? "rotate-45 border-red bg-red text-white" : "border-line-strong/25 text-ink group-hover:border-ink"}`} aria-hidden>
                      +
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {on && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-3xl pb-7 pl-12 text-graphite">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
