import Image from "next/image";
import Reveal from "./Reveal";
import { defaultContent, type SiteContent } from "@/app/lib/cms/schema";

export default function MD({ data }: { data?: SiteContent["md"] }) {
  const d = data ?? defaultContent.md;
  return (
    <section id="md" className="scroll-mt-24 border-b border-line bg-ink text-white">
      <div className="mx-auto max-w-[88rem] px-6 py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.4fr] lg:items-start">
          <Reveal>
            <div className="flex items-center gap-3 tech-label text-red">
              <span className="font-mono-tech">[ {d.index} ]</span><span className="h-px w-8 bg-red" />{d.kicker}
            </div>
            <div className="mt-6 overflow-hidden rounded-lg border border-white/10 bg-white/5">
              <div className="relative aspect-[4/5] w-full max-w-xs">
                <Image src={d.photo} alt={d.name} fill sizes="320px" className="object-cover object-top" />
              </div>
            </div>
            <div className="mt-5">
              <div className="font-display text-xl font-bold text-white">{d.name}</div>
              <div className="tech-label text-white/50">{d.role}</div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">{d.title}</h2>
            <div className="mt-6 space-y-5">
              {d.paragraphs.map((p, i) => (
                <p key={i} className={`leading-relaxed ${i === 0 ? "text-lg text-white/90" : "text-white/70"}`}>{p}</p>
              ))}
            </div>
            <div className="mt-8 inline-flex items-center gap-3 border-t border-white/15 pt-5 tech-label text-white/50">
              <span className="h-px w-8 bg-red" /> The key to smart power
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
