"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { defaultContent, type SiteContent } from "@/app/lib/cms/schema";

const HOLD = 5000;

export default function Hero({ data }: { data?: SiteContent["hero"] }) {
  const d = data ?? defaultContent.hero;
  const slides = d.slides.length ? d.slides : defaultContent.hero.slides;
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % slides.length), HOLD);
    return () => clearInterval(id);
  }, [slides.length]);

  return (
    <section id="top" className="relative isolate flex min-h-[88vh] items-center overflow-hidden pt-16">
      {/* full-bleed photography */}
      <div className="absolute inset-0 -z-10 bg-ink">
        {slides.map((s, i) => (
          <div key={s.src} className="absolute inset-0 transition-opacity duration-[1200ms] ease-out" style={{ opacity: i === active ? 1 : 0 }} aria-hidden={i !== active}>
            <Image src={s.src} alt={s.alt} fill priority={i === 0} sizes="100vw" className="object-cover" style={{ transform: i === active ? "scale(1)" : "scale(1.06)", transition: "transform 6s ease-out" }} />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-ink/75 via-ink/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
      </div>

      <div className="mx-auto w-full max-w-[88rem] px-6 py-16">
        <div className="max-w-2xl rounded-xl border border-white/40 bg-white/75 p-7 shadow-[0_20px_60px_-25px_rgba(14,17,22,0.5)] backdrop-blur-md sm:p-10">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-white/70 px-3 py-1.5 tech-label text-graphite">
            <span className="h-1.5 w-1.5 rounded-full bg-red" />{d.eyebrow}
          </p>
          <h1 className="max-w-[18ch] font-display text-4xl font-bold leading-[1.04] tracking-tight text-ink sm:text-5xl lg:text-6xl">{d.title}</h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-graphite">{d.sub}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            {d.ctas.map((c, i) => (
              <a key={i} href={c.href}
                className={i === 0
                  ? "group inline-flex items-center gap-2 rounded-md bg-red px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-red-deep"
                  : "inline-flex items-center gap-2 rounded-md border border-line-strong/25 bg-white/60 px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-ink"}>
                {c.label}{i === 0 && <span className="transition-transform group-hover:translate-x-1" aria-hidden>→</span>}
              </a>
            ))}
          </div>

          <dl className="mt-9 grid max-w-lg grid-cols-3 divide-x divide-line border-t border-line pt-5">
            {d.stats.map((s) => (
              <div key={s.l} className="px-3 first:pl-0">
                <dd className="font-display text-2xl font-bold text-ink">{s.v}<span className="text-red">{s.suffix}</span></dd>
                <dt className="mt-1 tech-label text-steel">{s.l}</dt>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* caption + dots */}
      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-4 sm:left-auto sm:right-8 sm:translate-x-0">
        <span className="hidden font-mono-tech text-[0.66rem] uppercase tracking-[0.16em] text-white/90 [text-shadow:0_1px_4px_rgb(0_0_0/0.5)] sm:inline">{slides[active].caption}</span>
        <div className="flex items-center gap-2">
          {slides.map((_, i) => (
            <button key={i} aria-label={`Slide ${i + 1}`} onClick={() => setActive(i)}
              className={`h-1.5 rounded-full transition-all ${i === active ? "w-8 bg-white" : "w-2.5 bg-white/50 hover:bg-white/80"}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
