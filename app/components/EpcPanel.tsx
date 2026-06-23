"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion, useInView } from "framer-motion";
import Reveal from "./Reveal";
import { SectionHead } from "./Capabilities";
import { defaultContent, type SiteContent } from "@/app/lib/cms/schema";

const EpcPanel3D = dynamic(() => import("./EpcPanel3D"), {
  ssr: false,
  loading: () => <div className="grid h-full place-items-center tech-label text-steel">Loading model…</div>,
});

export default function EpcPanel({ data }: { data?: SiteContent["epc"] }) {
  const d = data ?? defaultContent.epc;
  const layers = d.layers;
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-25%" });

  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => setOpen(true), 650);
    return () => clearTimeout(t);
  }, [inView]);

  const sel = layers[selected] ?? layers[0];
  const handleSelect = (i: number) => { if (!open) setOpen(true); setSelected(i); };

  return (
    <section ref={sectionRef} id="anatomy" className="scroll-mt-28 overflow-hidden border-b border-line bg-soft">
      <div className="mx-auto max-w-[82rem] px-6 py-20 md:py-28">
        <Reveal><SectionHead index={d.index} kicker={d.kicker} title={d.title} sub={open ? "Drag to rotate · tap a layer" : "Watch it deconstruct"} /></Reveal>

        <div className="mt-12 grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <Reveal className="w-full">
            <div className="relative h-[440px] w-full overflow-hidden rounded-2xl border border-line bg-grid-fine md:h-[560px]">
              <EpcPanel3D open={open} selected={selected} onSelect={handleSelect} count={layers.length} />
              <div className="pointer-events-none absolute left-4 top-4 tech-label text-steel">EPC // ASSEMBLY-3D</div>
              <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2">
                <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/80 px-4 py-2 tech-label text-ink backdrop-blur">
                  <span className="h-1.5 w-1.5 rounded-full bg-red" />{open ? "Drag · tap a layer" : "Deconstructing…"}
                </span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.18}>
            <div>
              <p className="max-w-md text-lg text-graphite">
                {d.intro} {open ? "Drag the model to inspect it, and tap any layer for the detail." : "It pulls itself apart as you scroll."}
              </p>
              <button onClick={() => setOpen((v) => !v)} className="group mt-7 inline-flex items-center gap-3 rounded-full bg-ink px-7 py-4 tech-label text-paper transition-all hover:bg-red hover:shadow-md">
                <span className="relative grid h-5 w-5 place-items-center">
                  <span className="absolute h-0.5 w-3.5 bg-current" />
                  <span className={`absolute h-0.5 w-3.5 bg-current transition-transform ${open ? "rotate-0" : "rotate-90"}`} />
                </span>
                {open ? "Reassemble panel" : "Deconstruct panel"}
              </button>

              <div className="mt-9">
                {!open ? (
                  <dl className="grid grid-cols-2 gap-3">
                    {d.stats.map((s) => (
                      <div key={s.l} className="rounded-xl border border-line bg-surface/70 px-4 py-4">
                        <div className="font-display text-2xl font-extrabold text-ink">{s.k}</div>
                        <div className="mt-1 tech-label text-steel">{s.l}</div>
                      </div>
                    ))}
                  </dl>
                ) : (
                  <motion.div key={sel.no} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="rounded-2xl border border-line bg-surface p-6 elev">
                    <div className="flex items-center justify-between border-b border-line pb-4">
                      <span className="flex items-center gap-2 tech-label text-red"><span className="h-1.5 w-1.5 rounded-full bg-red" /> Layer {sel.no}</span>
                      <span className="font-mono-tech text-xs text-steel">{selected + 1} / {layers.length}</span>
                    </div>
                    <h3 className="mt-4 font-display text-2xl font-extrabold uppercase text-ink">{sel.name}</h3>
                    <p className="mt-2 text-sm text-graphite">{sel.desc}</p>
                    <ul className="mt-5 space-y-2">
                      {sel.detail.map((x) => (
                        <li key={x} className="flex items-start gap-3 text-sm text-graphite"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-red" />{x}</li>
                      ))}
                    </ul>
                    <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
                      <span className="tech-label text-steel">{sel.spec}</span>
                      <button onClick={() => setSelected((selected + 1) % layers.length)} className="group inline-flex items-center gap-2 tech-label text-ink hover:text-red">
                        Next layer<span className="transition-transform group-hover:translate-x-1" aria-hidden>→</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
