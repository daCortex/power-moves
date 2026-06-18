"use client";

import { motion } from "framer-motion";
import Reveal from "./Reveal";

const PRODUCTS = [
  {
    title: "Power Transformers",
    spec: "Distribution & power class",
    blurb: "In-house manufacturing capability for reliable step-up and step-down power.",
  },
  {
    title: "Medium-Voltage Switchgear",
    spec: "Up to 33 kV",
    blurb: "Protection and control for substation and primary distribution networks.",
  },
  {
    title: "Low-Voltage Switchgear",
    spec: "Distribution & motor control",
    blurb: "Robust LV assemblies for industrial and commercial installations.",
  },
  {
    title: "Panels & Distribution Boards",
    spec: "Custom-built assemblies",
    blurb: "Engineered panelboards built to specification and standard.",
  },
  {
    title: "Package Substations",
    spec: "Compact & ready-to-install",
    blurb: "Pre-engineered units for fast, dependable deployment on site.",
  },
  {
    title: "Protection Equipment",
    spec: "Relays, breakers & cables",
    blurb: "The components that keep every network safe, stable and supplied.",
  },
];

export default function Products() {
  return (
    <section
      id="products"
      className="relative scroll-mt-20 border-y border-line bg-coal py-20 md:py-28"
    >
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.3em] text-red">
            <span className="h-px w-8 bg-red" />
            Product range
          </div>
          <h2 className="mt-5 max-w-3xl heading-mega text-[clamp(2rem,5vw,3.75rem)] text-white">
            Equipment that carries the load
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-px border border-line bg-line md:grid-cols-3">
          {PRODUCTS.map((p, i) => (
            <Reveal key={p.title} delay={(i % 3) * 0.08}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                className="group relative h-full overflow-hidden bg-ink p-8"
              >
                <div className="absolute inset-x-0 bottom-0 h-0.5 w-0 bg-red transition-all duration-500 group-hover:w-full" />
                <div className="text-xs font-medium uppercase tracking-[0.2em] text-red">
                  {p.spec}
                </div>
                <h3 className="mt-3 font-display text-xl font-bold text-white">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm text-mute">{p.blurb}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
