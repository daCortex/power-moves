"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Reveal from "./Reveal";
import { SectionHead } from "./Capabilities";

type Product = {
  code: string;
  name: string;
  tag: string;
  blurb: string;
  specs: { l: string; v: string }[];
};

const PRODUCTS: Product[] = [
  {
    code: "PM-TX",
    name: "Power Transformers",
    tag: "Distribution & power class",
    blurb: "In-house manufacturing capability for dependable step-up and step-down power, built and tested to specification.",
    specs: [
      { l: "Type", v: "Oil-immersed / Dry" },
      { l: "Rating", v: "Up to 33 kV class" },
      { l: "Cooling", v: "ONAN / ONAF" },
      { l: "Standard", v: "IEC 60076" },
      { l: "Lead time", v: "Quoted per order" },
    ],
  },
  {
    code: "PM-MV",
    name: "Medium-Voltage Switchgear",
    tag: "Up to 33 kV",
    blurb: "Protection and control for substation and primary distribution networks, with metal-clad and metal-enclosed options.",
    specs: [
      { l: "Voltage", v: "12 / 24 / 33 kV" },
      { l: "Construction", v: "Metal-clad" },
      { l: "Breaker", v: "Vacuum / SF6" },
      { l: "Standard", v: "IEC 62271" },
      { l: "Supply", v: "Licensed (ABB)" },
    ],
  },
  {
    code: "PM-LV",
    name: "Low-Voltage Switchgear",
    tag: "Distribution & motor control",
    blurb: "Robust LV assemblies for industrial and commercial installations — distribution boards through full MCC line-ups.",
    specs: [
      { l: "Voltage", v: "≤ 1000 V" },
      { l: "Form", v: "Form 1–4b" },
      { l: "Rating", v: "Up to 6300 A" },
      { l: "Standard", v: "IEC 61439" },
      { l: "Build", v: "Custom assembly" },
    ],
  },
  {
    code: "PM-PB",
    name: "Panels & Distribution Boards",
    tag: "Custom-built assemblies",
    blurb: "Engineered panelboards and distribution boards built to your specification, schedule and standard.",
    specs: [
      { l: "Type", v: "DB / MDB / SMDB" },
      { l: "Enclosure", v: "IP31–IP54" },
      { l: "Busbar", v: "Copper / Tinned" },
      { l: "Finish", v: "Powder-coated" },
      { l: "Build", v: "Made to order" },
    ],
  },
  {
    code: "PM-PS",
    name: "Package Substations",
    tag: "Compact & ready-to-install",
    blurb: "Pre-engineered, factory-built units for fast, dependable deployment — transformer, MV and LV in one enclosure.",
    specs: [
      { l: "Config", v: "TX + MV + LV" },
      { l: "Rating", v: "Up to 33 kV" },
      { l: "Install", v: "Outdoor / indoor" },
      { l: "Delivery", v: "Skid-mounted" },
      { l: "Standard", v: "IEC 62271-202" },
    ],
  },
  {
    code: "PM-PR",
    name: "Protection Equipment",
    tag: "Relays, breakers & cables",
    blurb: "The components that keep every network safe, selective and supplied — protection relays, breakers, CTs/VTs and cable.",
    specs: [
      { l: "Relays", v: "Numerical / digital" },
      { l: "Breakers", v: "ACB / MCCB / VCB" },
      { l: "Instr.", v: "CT / VT" },
      { l: "Cable", v: "LV & MV grades" },
      { l: "Standard", v: "IEC compliant" },
    ],
  },
];

export default function Products() {
  const [active, setActive] = useState(0);
  const p = PRODUCTS[active];

  return (
    <section id="products" className="scroll-mt-28 border-b border-line-strong/15 bg-paper">
      <div className="mx-auto max-w-[88rem] px-6 py-20 md:py-28">
        <Reveal>
          <SectionHead index="04" kicker="Product range" title="Datasheet Explorer" sub="Tap a product · read the spec" />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-12 grid gap-4 lg:grid-cols-[1.3fr_1fr]">
            {/* Product selector grid */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {PRODUCTS.map((prod, i) => {
                const on = i === active;
                return (
                  <button
                    key={prod.code}
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    className={`group flex flex-col justify-between rounded-xl border p-5 text-left transition-all ${
                      on ? "border-ink bg-ink elev" : "border-line bg-surface hover:border-line-strong/30 hover:shadow-md"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`font-mono-tech text-xs ${on ? "text-amber" : "text-mute"}`}>{prod.code}</span>
                      <span className={`h-2 w-2 rotate-45 ${on ? "bg-amber" : "bg-line-strong/30 group-hover:bg-red"}`} />
                    </div>
                    <span className={`mt-8 block font-display text-base font-bold leading-tight ${on ? "text-paper" : "text-ink"}`}>
                      {prod.name}
                    </span>
                    <span className={`mt-1 block text-[0.7rem] ${on ? "text-paper/60" : "text-steel"}`}>{prod.tag}</span>
                  </button>
                );
              })}
            </div>

            {/* Datasheet */}
            <div className="relative overflow-hidden rounded-2xl border border-line bg-surface elev">
                <motion.div
                  key={p.code}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                  className="flex h-full flex-col p-7 md:p-8"
                >
                  <div className="flex items-center justify-between border-b border-line pb-4">
                    <span className="tech-label text-ink">Datasheet</span>
                    <span className="font-mono-tech text-sm text-red">{p.code}</span>
                  </div>
                  <h3 className="mt-5 font-display text-2xl font-extrabold uppercase text-ink">{p.name}</h3>
                  <p className="mt-3 text-sm text-graphite">{p.blurb}</p>

                  <dl className="mt-6 border-t border-line">
                    {p.specs.map((s) => (
                      <div key={s.l} className="flex items-center justify-between border-b border-line py-2.5">
                        <dt className="tech-label text-steel">{s.l}</dt>
                        <dd className="font-mono-tech text-sm text-ink">{s.v}</dd>
                      </div>
                    ))}
                  </dl>

                  <a
                    href="#contact"
                    className="group mt-auto inline-flex items-center justify-center gap-3 rounded-md bg-red px-6 py-3.5 tech-label text-white transition-all hover:bg-ink hover:shadow-md"
                  >
                    Enquire about {p.code}
                    <span className="transition-transform group-hover:translate-x-1" aria-hidden>→</span>
                  </a>
                </motion.div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
