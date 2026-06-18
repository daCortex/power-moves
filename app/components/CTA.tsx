"use client";

import { motion } from "framer-motion";
import Reveal from "./Reveal";

export default function CTA() {
  return (
    <section id="about" className="relative scroll-mt-28 bg-paper px-4 py-6 md:px-6">
      <div className="relative mx-auto max-w-[82rem] overflow-hidden rounded-3xl bg-ink px-6 py-20 elev-lg md:px-16 md:py-28">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-grid opacity-[0.06]" />
          <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-red/20 blur-3xl" />
          <div className="absolute -bottom-24 -left-16 h-80 w-80 rounded-full bg-amber/10 blur-3xl" />
        </div>
        <div className="relative">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <Reveal>
            <div className="flex items-center gap-3 tech-label text-amber">
              <span className="font-mono-tech">[ 08 ]</span>
              <span className="h-px w-8 bg-amber" />
              The Power Moves promise
            </div>
            <h2 className="mt-5 max-w-3xl heading-mega text-[clamp(2.25rem,6vw,5rem)] text-paper">
              Manufacturing strength behind <span className="text-red">every quotation.</span>
            </h2>
            <p className="mt-6 max-w-2xl text-lg text-paper/70">
              Backed by ISO-certified operations and a licensed ABB supply line,
              we pair real manufacturing capability with hands-on engineering —
              so what we quote is exactly what we deliver.
            </p>
            <motion.div whileHover={{ scale: 1.005 }} className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href="#contact" className="group inline-flex items-center justify-center gap-3 rounded-full bg-red px-8 py-4 tech-label text-white transition-all hover:bg-amber hover:text-ink hover:shadow-lg">
                Start Your Project
                <span className="transition-transform group-hover:translate-x-1" aria-hidden>→</span>
              </a>
              <a href="#products" className="inline-flex items-center justify-center gap-3 rounded-full border border-paper/25 px-8 py-4 tech-label text-paper transition-colors hover:border-paper">
                View Product Range
              </a>
            </motion.div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-paper/15 bg-paper/15">
              {[
                { k: "≤33 kV", l: "Voltage class" },
                { k: "5", l: "Product families" },
                { k: "IEC", l: "Compliant" },
                { k: "24/7", l: "Support" },
              ].map((s) => (
                <div key={s.l} className="bg-ink px-6 py-7">
                  <div className="font-display text-3xl font-extrabold text-paper">{s.k}</div>
                  <div className="mt-1 tech-label text-paper/50">{s.l}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
        </div>
      </div>
    </section>
  );
}
