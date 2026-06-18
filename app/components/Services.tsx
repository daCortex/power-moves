"use client";

import { motion } from "framer-motion";
import Reveal from "./Reveal";

type Service = {
  no: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
};

const I = "h-7 w-7";

const SERVICES: Service[] = [
  {
    no: "01",
    title: "Product Trading",
    desc: "Procurement-ready supply of transformers, switchgear, panels, cables and protection equipment — sourced and delivered with manufacturing strength behind every quotation.",
    icon: (
      <svg viewBox="0 0 24 24" className={I} fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M3 7l9-4 9 4-9 4-9-4Z" />
        <path d="M3 12l9 4 9-4M3 17l9 4 9-4" />
      </svg>
    ),
  },
  {
    no: "02",
    title: "EPC Turnkey",
    desc: "End-to-end engineering — from requirement review and sourcing through delivery and commissioning coordination, handed over ready to run.",
    icon: (
      <svg viewBox="0 0 24 24" className={I} fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" />
        <circle cx="12" cy="12" r="3.4" />
      </svg>
    ),
  },
  {
    no: "03",
    title: "Substations",
    desc: "Equipment supply and engineering coordination for utility networks and distribution upgrades — built to keep the grid stable and online.",
    icon: (
      <svg viewBox="0 0 24 24" className={I} fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M5 21V8l4-3 4 3M13 21V11l3-2 3 2v10" />
        <path d="M3 21h18M8.5 11h1M16 14h1" />
      </svg>
    ),
  },
  {
    no: "04",
    title: "Industrial Power",
    desc: "Distribution, control and protection systems for factories and infrastructure — engineered for uptime, safety and scale.",
    icon: (
      <svg viewBox="0 0 24 24" className={I} fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />
      </svg>
    ),
  },
];

export default function Services() {
  return (
    <section id="solutions" className="relative scroll-mt-20 bg-ink py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.3em] text-red">
            <span className="h-px w-8 bg-red" />
            What we do
          </div>
          <h2 className="mt-5 max-w-3xl heading-mega text-[clamp(2rem,5vw,3.75rem)] text-white">
            Four ways we power your project
          </h2>
          <p className="mt-5 max-w-2xl text-lg text-mute">
            One partner across the full electrical lifecycle — supply,
            engineering, build and commissioning.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-px border border-line bg-line sm:grid-cols-2">
          {SERVICES.map((s, i) => (
            <Reveal key={s.no} delay={(i % 2) * 0.1}>
              <motion.article
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                className="group relative h-full overflow-hidden bg-coal p-8 md:p-10"
              >
                <span className="absolute right-6 top-6 font-display text-5xl font-extrabold text-line transition-colors group-hover:text-red/30">
                  {s.no}
                </span>
                <div className="grid h-12 w-12 place-items-center bg-ink text-red ring-1 ring-line transition-colors group-hover:bg-red group-hover:text-white">
                  {s.icon}
                </div>
                <h3 className="mt-6 font-display text-2xl font-bold text-white">
                  {s.title}
                </h3>
                <p className="mt-3 max-w-md text-mute">{s.desc}</p>
                <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-white">
                  <span className="h-px w-6 bg-red transition-all duration-300 group-hover:w-10" />
                  Learn more
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
