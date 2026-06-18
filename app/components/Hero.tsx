"use client";

import { motion } from "framer-motion";

const HEAD_1 = ["Power", "that", "moves"];
const HEAD_2 = ["industry", "forward."];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};
const word = {
  hidden: { opacity: 0, y: "115%" },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] as const } },
};

const KEYSPECS = [
  { k: "≤ 33", u: "kV", l: "MV switchgear" },
  { k: "250", u: "+", l: "Projects" },
  { k: "24/7", u: "", l: "Support" },
  { k: "ISO", u: "★", l: "Certified" },
];

export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-line-strong/15 bg-paper pt-[6.5rem] md:pt-[7.5rem]"
    >
      {/* background detailing */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-grid bg-grid-fade" />
        <div className="absolute right-0 top-0 h-full w-px bg-line-strong/10" />
        <div className="absolute left-1/2 top-0 hidden h-full w-px bg-line-strong/10 lg:block" />
      </div>

      {/* top measurement rule */}
      <div className="relative mx-auto flex max-w-[88rem] items-center justify-between px-6 tech-label text-mute">
        <span>[ 01 — POWER SYSTEMS ]</span>
        <span className="hidden md:inline">EST. ASIA GENERAL HOLDING</span>
        <span>N 16.8°  E 96.1°</span>
      </div>

      <div className="relative mx-auto grid max-w-[88rem] gap-10 px-6 pb-16 pt-8 lg:grid-cols-[1.15fr_0.85fr] lg:pb-24 lg:pt-12">
        {/* LEFT */}
        <div>
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mb-6 inline-flex items-center gap-3 border border-line-strong/20 bg-surface px-3 py-2"
          >
            <span className="hazard-red h-4 w-8" />
            <span className="tech-label text-ink">Electrical Engineering · Product Supply · EPC Turnkey</span>
          </motion.div>

          <motion.h1
            variants={container}
            initial="hidden"
            animate="show"
            className="heading-mega text-[clamp(2.75rem,8.5vw,7rem)] text-ink"
          >
            <span className="block overflow-hidden">
              {HEAD_1.map((w, i) => (
                <span key={i} className="mr-[0.2em] inline-block overflow-hidden align-top">
                  <motion.span variants={word} className="inline-block">{w}</motion.span>
                </span>
              ))}
            </span>
            <span className="block overflow-hidden">
              {HEAD_2.map((w, i) => (
                <span key={i} className="mr-[0.2em] inline-block overflow-hidden align-top">
                  <motion.span variants={word} className={`inline-block ${i === 1 ? "text-red" : ""}`}>{w}</motion.span>
                </span>
              ))}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-7 max-w-xl text-pretty text-lg leading-relaxed text-graphite"
          >
            We supply the equipment, engineer the systems, and deliver them
            commissioned and ready — from a single transformer to a complete
            substation, built to standard and backed by real manufacturing.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.72 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <a
              href="#contact"
              className="group inline-flex items-center justify-center gap-3 bg-red px-7 py-4 tech-label text-white transition-all hover:bg-ink"
            >
              Request a Quote
              <span className="transition-transform group-hover:translate-x-1" aria-hidden>→</span>
            </a>
            <a
              href="#capabilities"
              className="group inline-flex items-center justify-center gap-3 border border-line-strong/25 bg-surface px-7 py-4 tech-label text-ink transition-all hover:border-ink"
            >
              View Capabilities
            </a>
          </motion.div>

          {/* key specs */}
          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-11 grid max-w-xl grid-cols-2 border-l border-t border-line-strong/15 sm:grid-cols-4"
          >
            {KEYSPECS.map((s) => (
              <div key={s.l} className="border-b border-r border-line-strong/15 bg-surface/50 px-4 py-4">
                <dd className="font-display text-3xl font-extrabold text-ink">
                  {s.k}<span className="text-red">{s.u}</span>
                </dd>
                <dt className="mt-1 tech-label text-steel">{s.l}</dt>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* RIGHT — equipment nameplate / live panel */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <div className="ticks relative border border-line-strong/25 bg-surface p-5 shadow-[12px_12px_0_0_rgba(21,22,26,0.06)]">
            {/* header bar */}
            <div className="flex items-center justify-between border-b border-line-strong/15 pb-3">
              <span className="tech-label text-ink">PM // SYSTEM-PANEL</span>
              <span className="flex items-center gap-2 tech-label text-steel">
                <span className="h-2 w-2 rounded-full bg-red animate-blink" /> LIVE
              </span>
            </div>

            {/* schematic */}
            <div className="relative mt-4 aspect-[4/3] w-full overflow-hidden bg-paper bg-grid-fine">
              <svg viewBox="0 0 320 240" className="h-full w-full" fill="none" aria-hidden>
                <g stroke="#15161a" strokeOpacity="0.35" strokeWidth="1.5">
                  <path d="M30 40h90v60h170" />
                  <path d="M30 120h60v80h200" />
                  <path d="M280 40v160" />
                  <rect x="110" y="86" width="28" height="28" fill="#fff" />
                  <rect x="80" y="186" width="28" height="28" fill="#fff" />
                  <rect x="266" y="86" width="28" height="28" fill="#fff" />
                </g>
                <path
                  d="M30 40h90v60h170v100"
                  stroke="#d81e26"
                  strokeWidth="2.5"
                  strokeDasharray="10 8"
                  className="animate-dash"
                />
                {[[30,40],[120,40],[280,40],[124,100],[280,200],[90,120],[90,200]].map(([x,y],i)=>(
                  <circle key={i} cx={x} cy={y} r="4" fill="#fff" stroke="#15161a" strokeWidth="2" />
                ))}
                <circle cx="280" cy="100" r="7" fill="none" stroke="#d81e26" strokeWidth="2" className="animate-blink" />
              </svg>
              <span className="absolute left-3 top-2 tech-label text-mute">SCHEMATIC · DIST-01</span>
            </div>

            {/* readouts */}
            <div className="mt-4 grid grid-cols-3 divide-x divide-line border border-line">
              {[
                { l: "VOLTAGE", v: "33.0", u: "kV" },
                { l: "LOAD", v: "98.6", u: "%" },
                { l: "UPTIME", v: "100", u: "%" },
              ].map((r) => (
                <div key={r.l} className="px-3 py-3">
                  <div className="tech-label text-steel">{r.l}</div>
                  <div className="font-mono-tech text-xl font-semibold text-ink">
                    {r.v}<span className="text-sm text-red">{r.u}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* nameplate footer */}
            <div className="mt-4 flex items-center justify-between bg-ink px-4 py-3">
              <span className="tech-label text-paper/70">RATING PLATE</span>
              <span className="font-mono-tech text-sm text-paper">PM-SWGR-33/AB</span>
            </div>
          </div>

          {/* floating cert tag */}
          <div className="absolute -bottom-5 -left-5 hidden items-center gap-2 border border-line-strong/25 bg-amber px-4 py-3 sm:flex">
            <span className="font-display text-lg font-extrabold text-ink">ABB</span>
            <span className="tech-label text-ink/80">Licensed<br />Supplier</span>
          </div>
        </motion.div>
      </div>

      {/* bottom hazard rule */}
      <div className="hazard h-2.5 w-full" />
    </section>
  );
}
