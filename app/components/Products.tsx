"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Reveal from "./Reveal";
import { SectionHead } from "./Capabilities";
import { defaultContent, type SiteContent } from "@/app/lib/cms/schema";

export default function Products({ data }: { data?: SiteContent["products"] }) {
  const d = data ?? defaultContent.products;
  const [active, setActive] = useState(0);
  const p = d.items[active] ?? d.items[0];

  return (
    <section id="products" className="scroll-mt-28 border-b border-line bg-paper">
      <div className="mx-auto max-w-[88rem] px-6 py-20 md:py-28">
        <Reveal><SectionHead index={d.index} kicker={d.kicker} title={d.title} sub={d.sub} /></Reveal>

        <Reveal delay={0.1}>
          <div className="mt-12 grid gap-4 lg:grid-cols-[1.3fr_1fr]">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {d.items.map((prod, i) => {
                const on = i === active;
                return (
                  <button key={prod.code} onClick={() => setActive(i)} onMouseEnter={() => setActive(i)}
                    className={`group flex flex-col justify-between rounded-xl border p-5 text-left transition-all ${on ? "border-ink bg-ink elev" : "border-line bg-surface hover:border-line-strong/30 hover:shadow-md"}`}>
                    <div className="flex items-center justify-between">
                      <span className={`font-mono-tech text-xs ${on ? "text-amber" : "text-mute"}`}>{prod.code}</span>
                      <span className={`h-2 w-2 rotate-45 ${on ? "bg-amber" : "bg-line-strong/30 group-hover:bg-red"}`} />
                    </div>
                    <span className={`mt-8 block font-display text-base font-bold leading-tight ${on ? "text-paper" : "text-ink"}`}>{prod.name}</span>
                    <span className={`mt-1 block text-[0.7rem] ${on ? "text-paper/60" : "text-steel"}`}>{prod.tag}</span>
                  </button>
                );
              })}
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-line bg-surface elev">
              <motion.div key={p.code} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="flex h-full flex-col p-7 md:p-8">
                <div className="flex items-center justify-between border-b border-line pb-4">
                  <span className="tech-label text-ink">Datasheet</span>
                  <span className="font-mono-tech text-sm text-red">{p.code}</span>
                </div>
                <h3 className="mt-5 font-display text-2xl font-extrabold uppercase text-ink">{p.name}</h3>
                <p className="mt-3 text-sm text-graphite">{p.blurb}</p>
                <dl className="mt-6 border-t border-line">
                  {p.specs.map((s) => (
                    <div key={s.l} className="flex items-center justify-between border-b border-line py-2.5">
                      <dt className="tech-label text-steel">{s.l}</dt>
                      <dd className="font-mono-tech text-sm text-ink">{s.v}</dd>
                    </div>
                  ))}
                </dl>
                <a href="#contact" className="group mt-auto inline-flex items-center justify-center gap-3 rounded-md bg-red px-6 py-3.5 tech-label text-white transition-all hover:bg-ink hover:shadow-md">
                  Enquire about {p.code}<span className="transition-transform group-hover:translate-x-1" aria-hidden>→</span>
                </a>
              </motion.div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
