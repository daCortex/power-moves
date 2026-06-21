import Reveal from "./Reveal";
import { SectionHead } from "./Capabilities";
import { defaultContent, type SiteContent } from "@/app/lib/cms/schema";

export default function Specs({ data }: { data?: SiteContent["specs"] }) {
  const d = data ?? defaultContent.specs;
  return (
    <section id="specs" className="scroll-mt-28 border-b border-line bg-surface">
      <div className="mx-auto max-w-[82rem] px-6 py-20 md:py-28">
        <Reveal><SectionHead index={d.index} kicker={d.kicker} title={d.title} sub={d.sub} /></Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <Reveal>
            <p className="max-w-md text-lg leading-relaxed text-graphite">{d.statement}</p>
            <dl className="mt-8 grid grid-cols-3 gap-px overflow-hidden rounded-lg border border-line bg-line">
              {d.figures.map((s) => (
                <div key={s.l} className="bg-surface px-4 py-5">
                  <dt className="font-display text-3xl font-extrabold text-ink">{s.k}</dt>
                  <dd className="mt-1 tech-label text-steel">{s.l}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {d.tables.map((col) => (
                <div key={col.group} className="rounded-lg border border-line bg-paper/40">
                  <div className="border-b border-line px-4 py-3"><span className="tech-label text-red">{col.group}</span></div>
                  <dl className="divide-y divide-line">
                    {col.rows.map(([l, v]) => (
                      <div key={l} className="flex items-baseline justify-between gap-3 px-4 py-3">
                        <dt className="text-sm text-graphite">{l}</dt>
                        <dd className="font-mono-tech text-right text-xs text-ink">{v}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
