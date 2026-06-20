import Reveal from "./Reveal";
import { SectionHead } from "./Capabilities";

const SPECS: { group: string; rows: [string, string][] }[] = [
  {
    group: "Voltage & ratings",
    rows: [
      ["MV switchgear", "up to 33 kV"],
      ["LV systems", "≤ 1000 V"],
      ["Busbar rating", "up to 6300 A"],
      ["Transformers", "distribution & power class"],
    ],
  },
  {
    group: "Build & standards",
    rows: [
      ["Switchgear forms", "Form 1–4b"],
      ["Enclosure rating", "IP31 – IP54"],
      ["MV / LV standards", "IEC 62271 · 61439"],
      ["Transformer standard", "IEC 60076"],
    ],
  },
  {
    group: "Delivery & support",
    rows: [
      ["Engagement", "EPC turnkey or supply-only"],
      ["Lead time", "quoted per order"],
      ["Documentation", "full test & compliance"],
      ["Support", "24/7"],
    ],
  },
];

export default function Specs() {
  return (
    <section id="specs" className="scroll-mt-28 border-b border-line bg-surface">
      <div className="mx-auto max-w-[82rem] px-6 py-20 md:py-28">
        <Reveal>
          <SectionHead index="05" kicker="Technical" title="Specifications" sub="Built to standard" />
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          {/* Statement + headline figures */}
          <Reveal>
            <p className="max-w-md text-lg leading-relaxed text-graphite">
              Every panel, board and substation we supply is engineered to the
              relevant IEC standards and delivered with full test and compliance
              documentation — so what you specify is exactly what arrives on site.
            </p>
            <dl className="mt-8 grid grid-cols-3 gap-px overflow-hidden rounded-lg border border-line bg-line">
              {[
                ["33", "kV class"],
                ["6300", "A busbar"],
                ["IEC", "compliant"],
              ].map(([k, l]) => (
                <div key={l} className="bg-surface px-4 py-5">
                  <dt className="font-display text-3xl font-extrabold text-ink">{k}</dt>
                  <dd className="mt-1 tech-label text-steel">{l}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          {/* Spec tables */}
          <Reveal delay={0.1}>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {SPECS.map((col) => (
                <div key={col.group} className="rounded-lg border border-line bg-paper/40">
                  <div className="border-b border-line px-4 py-3">
                    <span className="tech-label text-red">{col.group}</span>
                  </div>
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
