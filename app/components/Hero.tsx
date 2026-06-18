"use client";

import { motion } from "framer-motion";

const HEAD_LINE_1 = ["Power", "that", "moves"];
const HEAD_LINE_2 = ["industry", "forward."];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

const word = {
  hidden: { opacity: 0, y: "110%" },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-ink pt-16"
    >
      {/* Animated engineered background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-grid bg-grid-fade" />
        {/* radial energy glows */}
        <div className="absolute -left-40 top-1/4 h-[36rem] w-[36rem] rounded-full bg-red/20 blur-[120px] animate-pulse-slow" />
        <div className="absolute -right-32 bottom-0 h-[30rem] w-[30rem] rounded-full bg-amber/10 blur-[120px]" />
        {/* scanning line */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red to-transparent animate-scan" />
      </div>

      {/* vertical edge labels */}
      <div className="pointer-events-none absolute left-3 top-1/2 hidden -translate-y-1/2 -rotate-90 text-[10px] uppercase tracking-[0.4em] text-mute/25 2xl:block">
        Engineered Power Systems
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-7 inline-flex items-center gap-2 border border-line bg-coal/60 px-4 py-2 text-xs font-medium uppercase tracking-[0.25em] text-mute backdrop-blur"
        >
          <span className="h-1.5 w-1.5 bg-red" />
          Electrical Engineering · Supply · EPC Turnkey
        </motion.div>

        <motion.h1
          variants={container}
          initial="hidden"
          animate="show"
          className="heading-mega text-[clamp(2.75rem,9vw,7.5rem)] text-white"
        >
          <span className="block overflow-hidden">
            {HEAD_LINE_1.map((w, i) => (
              <span key={i} className="mr-[0.22em] inline-block overflow-hidden align-top">
                <motion.span variants={word} className="inline-block">
                  {w}
                </motion.span>
              </span>
            ))}
          </span>
          <span className="block overflow-hidden">
            {HEAD_LINE_2.map((w, i) => (
              <span key={i} className="mr-[0.22em] inline-block overflow-hidden align-top">
                <motion.span
                  variants={word}
                  className={`inline-block ${i === 1 ? "text-red" : ""}`}
                >
                  {w}
                </motion.span>
              </span>
            ))}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mt-7 max-w-2xl text-pretty text-lg leading-relaxed text-mute md:text-xl"
        >
          We supply, engineer and deliver the electrical backbone of modern
          industry — from transformers and switchgear to fully commissioned
          turnkey power systems.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85 }}
          className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
        >
          <a
            href="#contact"
            className="group inline-flex items-center justify-center gap-2 bg-red px-7 py-4 text-sm font-semibold uppercase tracking-wide text-white transition-all hover:bg-white hover:text-ink"
          >
            Request a Quote
            <span className="transition-transform group-hover:translate-x-1" aria-hidden>
              →
            </span>
          </a>
          <a
            href="#solutions"
            className="inline-flex items-center justify-center gap-2 border border-line px-7 py-4 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:border-white"
          >
            Explore Solutions
          </a>
        </motion.div>

        {/* floating capability chips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.05 }}
          className="mt-14 grid max-w-3xl grid-cols-2 gap-px border border-line bg-line sm:grid-cols-4"
        >
          {[
            { k: "33 kV", v: "Switchgear up to" },
            { k: "ISO", v: "Certified operations" },
            { k: "EPC", v: "Turnkey delivery" },
            { k: "ABB", v: "Licensed supplier" },
          ].map((c) => (
            <div key={c.k} className="bg-coal px-4 py-4">
              <div className="font-display text-2xl font-extrabold text-white">
                {c.k}
              </div>
              <div className="mt-1 text-[11px] uppercase tracking-wide text-mute">
                {c.v}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-mute md:flex"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <span className="relative h-10 w-px bg-line">
          <span className="absolute inset-x-0 top-0 h-3 bg-red animate-scan" />
        </span>
      </motion.div>
    </section>
  );
}
