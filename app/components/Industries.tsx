"use client";

import Reveal from "./Reveal";
import { SectionHead } from "./Capabilities";
import { defaultContent, type SiteContent } from "@/app/lib/cms/schema";

function CircuitGraphic() {
  return (
    <svg viewBox="0 0 400 360" className="h-full w-full" fill="none" aria-hidden>
      <defs><linearGradient id="pmline2" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#d81e26" /><stop offset="1" stopColor="#f4a400" /></linearGradient></defs>
      <g stroke="#15161a" strokeOpacity="0.25" strokeWidth="2">
        <path d="M40 60h120v80h160" /><path d="M40 180h80v120h240" /><path d="M360 60V300" /><path d="M40 300h80" /><path d="M200 60v80" />
      </g>
      <path d="M40 60h120v80h160V300" stroke="url(#pmline2)" strokeWidth="3" strokeDasharray="14 10" className="animate-dash" />
      {[[40,60],[160,60],[200,60],[320,140],[360,60],[120,180],[120,300],[360,300],[40,180]].map(([cx,cy],i)=>(
        <g key={i}><circle cx={cx} cy={cy} r="5" fill="#fff" stroke="#15161a" strokeWidth="2" />{i % 3 === 0 && <circle cx={cx} cy={cy} r="5" fill="none" stroke="#d81e26" strokeWidth="1.5" className="animate-blink" />}</g>
      ))}
    </svg>
  );
}

export default function Industries({ data }: { data?: SiteContent["industries"] }) {
  const d = data ?? defaultContent.industries;
  return (
    <section id="industries" className="scroll-mt-28 border-b border-line bg-paper">
      <div className="mx-auto max-w-[88rem] px-6 py-20 md:py-28">
        <Reveal><SectionHead index={d.index} kicker={d.kicker} title={d.title} sub={d.sub} /></Reveal>

        <div className="mt-12 grid items-stretch gap-4 lg:grid-cols-2">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {d.items.map((ind, i) => (
              <Reveal key={ind.name} delay={(i % 2) * 0.06}>
                <div className="group flex h-full items-center justify-between rounded-xl border border-line bg-surface px-6 py-7 transition-all hover:border-ink hover:bg-ink hover:shadow-md">
                  <div>
                    <div className="font-display text-xl font-bold text-ink transition-colors group-hover:text-paper">{ind.name}</div>
                    <div className="tech-label text-steel transition-colors group-hover:text-paper/60">{ind.note}</div>
                  </div>
                  <span className="h-3 w-3 rotate-45 bg-red transition-transform group-hover:scale-150" />
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.15}>
            <div className="relative flex h-full flex-col rounded-2xl bg-ink p-8 elev-lg">
              <div className="flex items-center justify-between tech-label text-paper/60">
                <span>Network · Coverage</span>
                <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-amber animate-blink" /> ONLINE</span>
              </div>
              <div className="relative my-4 flex-1 bg-grid-fine"><CircuitGraphic /></div>
              <div className="flex items-end justify-between border-t border-paper/15 pt-5">
                <div><div className="font-display text-5xl font-extrabold text-paper">24/7</div><div className="tech-label text-paper/60">Power you can build on</div></div>
                <span className="accent-bar h-1.5 w-24 rounded-full" />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
