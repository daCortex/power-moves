import Reveal from "./Reveal";
import { SectionHead } from "./Capabilities";
import { defaultContent, type SiteContent } from "@/app/lib/cms/schema";

export default function Welcome({ data }: { data?: SiteContent["welcome"] }) {
  const d = data ?? defaultContent.welcome;
  return (
    <section id="products" className="scroll-mt-24 border-b border-line bg-paper">
      <div className="mx-auto max-w-[88rem] px-6 py-20 md:py-28">
        <Reveal><SectionHead index={d.index} kicker={d.kicker} title={d.title} sub={d.sub} /></Reveal>

        <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-3">
          {d.columns.map((c, i) => (
            <Reveal key={c.no} delay={i * 0.08}>
              <div className="group flex h-full flex-col bg-paper p-8 transition-colors hover:bg-surface">
                <span className="font-mono-tech text-sm text-steel">{c.no}</span>
                <h3 className="mt-3 font-display text-2xl font-bold text-ink">{c.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-graphite">{c.desc}</p>
                <ul className="mt-6 space-y-2">
                  {c.points.map((p) => (
                    <li key={p} className="flex items-start gap-2.5 font-mono-tech text-[0.8rem] text-graphite">
                      <span className="mt-1.5 inline-block h-1 w-3 shrink-0 bg-red" />{p}
                    </li>
                  ))}
                </ul>
                <a href="#contact" className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-red transition-transform group-hover:translate-x-0.5">
                  Enquire <span aria-hidden>→</span>
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
