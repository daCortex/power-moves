"use client";

import Reveal from "./Reveal";
import { SectionHead } from "./Capabilities";

const CERTS = [
  { code: "ABB", title: "Licensed Switchgear Supplier", note: "Genuine, warranted equipment" },
  { code: "ISO", title: "ISO-Certified Operations", note: "Quality management system" },
  { code: "IEC", title: "IEC-Compliant Engineering", note: "60076 · 61439 · 62271" },
  { code: "AGH", title: "Asia General Holding Group", note: "Backed manufacturing strength" },
];

const STANDARDS = [
  "IEC 60076 — Power Transformers",
  "IEC 62271 — HV Switchgear",
  "IEC 61439 — LV Assemblies",
  "IEC 62271-202 — Package Substations",
];

export default function Standards() {
  return (
    <section id="standards" className="scroll-mt-28 border-b border-line-strong/15 bg-surface">
      <div className="mx-auto max-w-[88rem] px-6 py-20 md:py-28">
        <Reveal>
          <SectionHead index="06" kicker="Credentials" title="Standards & Trust" sub="Built to spec, by the book" />
        </Reveal>

        <div className="mt-12 grid gap-px border border-line-strong/15 bg-line-strong/15 md:grid-cols-4">
          {CERTS.map((c, i) => (
            <Reveal key={c.code} delay={i * 0.07}>
              <div className="group flex h-full flex-col bg-surface p-7 transition-colors hover:bg-paper">
                <div className="ticks relative flex h-20 w-20 items-center justify-center border-2 border-ink bg-paper">
                  <span className="font-display text-2xl font-extrabold text-ink">{c.code}</span>
                </div>
                <h3 className="mt-6 font-display text-lg font-bold text-ink">{c.title}</h3>
                <p className="mt-2 text-sm text-steel">{c.note}</p>
                <span className="mt-4 h-1 w-0 bg-red transition-all duration-500 group-hover:w-12" />
              </div>
            </Reveal>
          ))}
        </div>

        {/* standards ticker strip */}
        <Reveal delay={0.2}>
          <div className="mt-px flex flex-wrap items-center gap-x-8 gap-y-3 border border-line-strong/15 bg-ink px-6 py-5">
            <span className="tech-label text-amber">REFERENCED STANDARDS //</span>
            {STANDARDS.map((s) => (
              <span key={s} className="font-mono-tech text-xs text-paper/80">{s}</span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
