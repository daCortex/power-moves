"use client";

import { motion } from "framer-motion";
import Reveal from "./Reveal";

export default function CTA() {
  return (
    <section
      id="about"
      className="relative scroll-mt-20 overflow-hidden border-y border-line bg-coal py-24 md:py-32"
    >
      {/* dramatic background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-grid bg-grid-fade opacity-60" />
        <div className="absolute left-1/2 top-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red/15 blur-[140px] animate-pulse-slow" />
      </div>

      <div className="relative mx-auto max-w-5xl px-5 text-center md:px-8">
        <Reveal>
          <div className="mx-auto flex w-fit items-center gap-3 text-xs font-medium uppercase tracking-[0.3em] text-red">
            <span className="h-px w-8 bg-red" />
            The Power Moves promise
            <span className="h-px w-8 bg-red" />
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="mx-auto mt-7 max-w-4xl heading-mega text-[clamp(2.25rem,6vw,5rem)] text-white">
            Manufacturing strength behind{" "}
            <span className="text-red">every quotation.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mx-auto mt-7 max-w-2xl text-lg text-mute">
            Backed by ISO-certified operations and a licensed ABB supply line,
            Power Moves pairs real manufacturing capability with hands-on
            engineering — so what we quote is exactly what we deliver.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="mt-11 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <a
              href="#contact"
              className="group inline-flex items-center justify-center gap-2 bg-red px-8 py-4 text-sm font-semibold uppercase tracking-wide text-white transition-all hover:bg-white hover:text-ink"
            >
              Start your project
              <span className="transition-transform group-hover:translate-x-1" aria-hidden>
                →
              </span>
            </a>
            <a
              href="#products"
              className="inline-flex items-center justify-center gap-2 border border-line px-8 py-4 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:border-white"
            >
              View product range
            </a>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
