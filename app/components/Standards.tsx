"use client";

import Reveal from "./Reveal";
import { SectionHead } from "./Capabilities";
import { defaultContent, type SiteContent } from "@/app/lib/cms/schema";

export default function Standards({ data }: { data?: SiteContent["standards"] }) {
  const d = data ?? defaultContent.standards;
  return (
    <section id="standards" className="scroll-mt-28 border-b border-line bg-surface">
      <div className="mx-auto max-w-[88rem] px-6 py-20 md:py-28">
        <Reveal><SectionHead index={d.index} kicker={d.kicker} title={d.title} sub={d.sub} /></Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-4">
          {d.certs.map((c, i) => (
            <Reveal key={c.code} delay={i * 0.07}>
              <div className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-7 transition-all hover:-translate-y-1 hover:shadow-md hover:elev">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl border-2 border-ink bg-paper transition-colors group-hover:bg-ink">
                  <span className="font-display text-2xl font-extrabold text-ink transition-colors group-hover:text-paper">{c.code}</span>
                </div>
                <h3 className="mt-6 font-display text-lg font-bold text-ink">{c.title}</h3>
                <p className="mt-2 text-sm text-steel">{c.note}</p>
                <span className="mt-4 h-1 w-0 bg-red transition-all duration-500 group-hover:w-12" />
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-4 flex flex-wrap items-center gap-x-8 gap-y-3 rounded-2xl bg-ink px-6 py-5 elev">
            <span className="tech-label text-amber">Referenced standards //</span>
            {d.standards.map((s) => (<span key={s} className="font-mono-tech text-xs text-paper/80">{s}</span>))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
