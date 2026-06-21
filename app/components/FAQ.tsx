"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "./Reveal";
import { SectionHead } from "./Capabilities";
import { defaultContent, type SiteContent } from "@/app/lib/cms/schema";

export default function FAQ({ data }: { data?: SiteContent["faq"] }) {
  const d = data ?? defaultContent.faq;
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-28 border-b border-line bg-paper">
      <div className="mx-auto max-w-[88rem] px-6 py-20 md:py-28">
        <Reveal><SectionHead index={d.index} kicker={d.kicker} title={d.title} sub={d.sub} /></Reveal>

        <div className="mt-12 space-y-3">
          {d.items.map((f, i) => {
            const on = open === i;
            return (
              <Reveal key={f.q} delay={Math.min(i, 3) * 0.05}>
                <div className={`overflow-hidden rounded-xl border bg-surface px-5 transition-all ${on ? "border-line-strong/30 elev" : "border-line hover:border-line-strong/25"}`}>
                  <button onClick={() => setOpen(on ? null : i)} className="group flex w-full items-center gap-5 py-5 text-left">
                    <span className={`font-mono-tech text-sm ${on ? "text-red" : "text-mute"}`}>{String(i + 1).padStart(2, "0")}</span>
                    <span className={`flex-1 font-display text-lg font-bold transition-colors md:text-xl ${on ? "text-red" : "text-ink group-hover:text-red"}`}>{f.q}</span>
                    <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg border transition-all ${on ? "rotate-45 border-red bg-red text-white" : "border-line-strong/25 text-ink group-hover:border-ink"}`} aria-hidden>+</span>
                  </button>
                  <AnimatePresence initial={false}>
                    {on && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden">
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
