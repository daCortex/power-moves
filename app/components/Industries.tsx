"use client";

import { motion } from "framer-motion";
import Reveal from "./Reveal";

const INDUSTRIES = [
  "Utility Substations",
  "Industrial Factories",
  "Commercial Buildings",
  "Energy Infrastructure",
  "Distribution Network Upgrades",
  "Infrastructure Developments",
];

function CircuitGraphic() {
  return (
    <svg viewBox="0 0 400 360" className="h-full w-full" fill="none" aria-hidden>
      <defs>
        <linearGradient id="pmline" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ff2630" />
          <stop offset="1" stopColor="#ffb020" />
        </linearGradient>
      </defs>
      {/* base traces */}
      <g stroke="#23262e" strokeWidth="2">
        <path d="M40 60h120v80h160" />
        <path d="M40 180h80v120h240" />
        <path d="M360 60V300" />
        <path d="M40 300h80" />
        <path d="M200 60v80" />
      </g>
      {/* animated energy trace */}
      <path
        d="M40 60h120v80h160V300"
        stroke="url(#pmline)"
        strokeWidth="2.5"
        strokeDasharray="14 10"
        className="animate-dash"
      />
      {/* nodes */}
      {[
        [40, 60],
        [160, 60],
        [200, 60],
        [320, 140],
        [360, 60],
        [120, 180],
        [120, 300],
        [360, 300],
        [40, 180],
      ].map(([cx, cy], i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r="5" fill="#0e1014" stroke="#ff2630" strokeWidth="2" />
          {i % 3 === 0 && (
            <circle cx={cx} cy={cy} r="5" fill="none" stroke="#ff2630" strokeWidth="1.5" className="animate-pulse-slow" />
          )}
        </g>
      ))}
    </svg>
  );
}

export default function Industries() {
  return (
    <section id="industries" className="relative scroll-mt-20 bg-ink py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 md:px-8 lg:grid-cols-2">
        <Reveal>
          <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.3em] text-red">
            <span className="h-px w-8 bg-red" />
            Industries we serve
          </div>
          <h2 className="mt-5 heading-mega text-[clamp(2rem,5vw,3.5rem)] text-white">
            Built for the places power can&apos;t fail
          </h2>
          <p className="mt-5 max-w-xl text-lg text-mute">
            From the grid to the factory floor, we keep critical systems
            energized — engineering reliability into every connection.
          </p>

          <ul className="mt-8 grid gap-px border border-line bg-line sm:grid-cols-2">
            {INDUSTRIES.map((ind) => (
              <li
                key={ind}
                className="group flex items-center gap-3 bg-ink px-5 py-4 transition-colors hover:bg-coal"
              >
                <span className="h-2 w-2 rotate-45 bg-red transition-transform group-hover:scale-150" />
                <span className="text-sm font-medium text-white">{ind}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.15}>
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-square w-full overflow-hidden border border-line bg-coal p-8"
          >
            <div className="absolute inset-0 bg-grid opacity-50" />
            <div className="relative h-full w-full">
              <CircuitGraphic />
            </div>
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
              <div>
                <div className="font-display text-4xl font-extrabold text-white">
                  24/7
                </div>
                <div className="text-xs uppercase tracking-wide text-mute">
                  Power you can build on
                </div>
              </div>
              <span className="h-3 w-3 bg-red animate-pulse-slow" />
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
