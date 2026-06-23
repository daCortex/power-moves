"use client";

import Image from "next/image";
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
          <div className="mt-12 grid gap-5 lg:grid-cols-[1.25fr_1fr]">
            {/* image-led product selector */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {d.items.map((prod, i) => {
                const on = i === active;
                return (
                  <button
                    key={prod.code}
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    className={`group relative aspect-[4/5] overflow-hidden rounded-xl border text-left transition-all ${on ? "border-red ring-2 ring-red/30 elev" : "border-line hover:shadow-md"}`}
                  >
                    <Image src={prod.img} alt={prod.name} fill sizes="(min-width:1024px) 18vw, 40vw" className={`object-cover transition-transform duration-700 ${on ? "scale-105" : "group-hover:scale-105"}`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-transparent" />
                    <span className="absolute left-3 top-3 rounded bg-ink/70 px-2 py-0.5 font-mono-tech text-[0.6rem] text-amber backdrop-blur">{prod.code}</span>
                    <div className="absolute inset-x-0 bottom-0 p-3.5">
                      <span className="block font-display text-sm font-bold leading-tight text-white">{prod.name}</span>
                      <span className="mt-0.5 block text-[0.68rem] text-white/70">{prod.tag}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* datasheet with hero image */}
            <div className="overflow-hidden rounded-2xl border border-line bg-surface elev">
              <motion.div key={p.code} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }} className="flex h-full flex-col">
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-ink">
                  <Image src={p.img} alt={p.name} fill sizes="(min-width:1024px) 36vw, 100vw" className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
                    <div>
                      <span className="font-mono-tech text-xs text-amber">{p.code}</span>
                      <h3 className="font-display text-2xl font-bold text-white">{p.name}</h3>
                    </div>
                    <span className="rounded-full bg-white/15 px-3 py-1 text-[0.7rem] text-white backdrop-blur">{p.tag}</span>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <p className="text-sm text-graphite">{p.blurb}</p>
                  <dl className="mt-5 border-t border-line">
                    {p.specs.map((s) => (
                      <div key={s.l} className="flex items-center justify-between border-b border-line py-2.5">
                        <dt className="tech-label text-steel">{s.l}</dt>
                        <dd className="font-mono-tech text-sm text-ink">{s.v}</dd>
                      </div>
                    ))}
                  </dl>
                  <a href="/contact" className="group mt-6 inline-flex items-center justify-center gap-3 rounded-full bg-red px-6 py-3.5 tech-label text-white transition-all hover:-translate-y-0.5 hover:bg-ink">
                    Enquire about {p.code}<span className="transition-transform group-hover:translate-x-1" aria-hidden>→</span>
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
