import Image from "next/image";
import Reveal from "./Reveal";
import { SectionHead } from "./Capabilities";
import { defaultContent, type SiteContent } from "@/app/lib/cms/schema";

export default function Projects({ data }: { data?: SiteContent["projects"] }) {
  const d = data ?? defaultContent.projects;
  return (
    <section id="projects" className="scroll-mt-24 border-b border-line bg-surface">
      <div className="mx-auto max-w-[88rem] px-6 py-20 md:py-28">
        <Reveal><SectionHead index={d.index} kicker={d.kicker} title={d.title} sub={d.sub} /></Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {d.items.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.08}>
              <article className="group overflow-hidden rounded-lg border border-line bg-paper">
                <div className="relative aspect-[4/3] overflow-hidden bg-ink">
                  <Image src={p.img} alt={p.name} fill sizes="(min-width:768px) 33vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  <span className="absolute left-3 top-3 rounded bg-ink/80 px-2 py-1 font-mono-tech text-[0.6rem] uppercase tracking-wider text-white backdrop-blur">{p.status}</span>
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/70 to-transparent p-4">
                    <div className="flex items-baseline gap-2 font-display text-white">
                      <span className="text-2xl font-bold">{p.rating}</span>
                      <span className="text-sm text-white/80">{p.voltage}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between px-5 py-4">
                  <div>
                    <h3 className="font-display text-base font-bold text-ink">{p.name}</h3>
                    <p className="tech-label text-steel">{p.location}</p>
                  </div>
                  <span className="text-red" aria-hidden>→</span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
