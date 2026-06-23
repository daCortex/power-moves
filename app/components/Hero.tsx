"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Counter from "./Counter";
import { defaultContent, type SiteContent } from "@/app/lib/cms/schema";

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } };
const word = { hidden: { opacity: 0, y: "115%" }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } } };

function StatNum({ k, u }: { k: string; u: string }) {
  const n = parseFloat(k);
  if (isNaN(n)) return <>{k}<span className="text-red">{u}</span></>;
  return <><Counter to={n} decimals={k.includes(".") ? 1 : 0} /><span className="text-red">{u}</span></>;
}

export default function Hero({ data }: { data?: SiteContent["hero"] }) {
  const d = data ?? defaultContent.hero;
  const lines = d.titleLines.map((l) => l.split(" "));

  // pointer parallax for the system panel
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), { stiffness: 120, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-9, 9]), { stiffness: 120, damping: 18 });

  return (
    <section
      id="top"
      className="relative overflow-hidden bg-soft pt-28 md:pt-32"
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onMouseLeave={() => { mx.set(0); my.set(0); }}
    >
      {/* aurora + grid */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="aurora-1 absolute -right-32 -top-40 h-[42rem] w-[42rem] rounded-full bg-red/10 blur-[120px]" />
        <div className="aurora-2 absolute -left-40 top-1/3 h-[36rem] w-[36rem] rounded-full bg-amber/15 blur-[120px]" />
        <div className="absolute inset-0 bg-grid bg-grid-fade" />
      </div>

      <div className="relative mx-auto grid max-w-[82rem] gap-12 px-6 pb-20 lg:grid-cols-[1.1fr_0.9fr] lg:pb-28">
        <div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05 }}
            className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/70 py-2 pl-2.5 pr-4 backdrop-blur elev">
            <span className="h-2 w-2 rounded-full bg-red animate-blink" />
            <span className="tech-label text-ink">{d.eyebrow}</span>
          </motion.div>

          <motion.h1 variants={container} initial="hidden" animate="show" className="heading-mega text-[clamp(2.75rem,8vw,6.5rem)] text-ink">
            {lines.map((words, li) => (
              <span key={li} className="block overflow-hidden">
                {words.map((w, i) => (
                  <span key={i} className="mr-[0.2em] inline-block overflow-hidden align-top">
                    <motion.span variants={word} className={`inline-block ${w === d.redWord ? "text-red" : ""}`}>{w}</motion.span>
                  </span>
                ))}
              </span>
            ))}
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.65 }}
            className="mt-7 max-w-xl text-pretty text-lg leading-relaxed text-graphite">{d.sub}</motion.p>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.78 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            {d.ctas.map((c, i) => (
              <a key={i} href={c.href}
                className={i === 0
                  ? "btn-shine group inline-flex items-center justify-center gap-3 rounded-full bg-red px-7 py-4 tech-label text-white shadow-lg shadow-red/20 transition-all hover:-translate-y-0.5 hover:bg-ink"
                  : "group inline-flex items-center justify-center gap-3 rounded-full border border-line-strong/20 bg-surface/70 px-7 py-4 tech-label text-ink backdrop-blur transition-all hover:-translate-y-0.5 hover:border-ink"}>
                {c.label}
                {i === 0 && <span className="transition-transform group-hover:translate-x-1" aria-hidden>→</span>}
              </a>
            ))}
          </motion.div>

          <motion.dl initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.95 }}
            className="mt-12 grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-4">
            {d.keyspecs.map((s) => (
              <div key={s.l} className="group rounded-xl border border-line bg-surface/60 px-4 py-4 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-red/30 hover:elev">
                <dd className="font-display text-3xl font-extrabold text-ink"><StatNum k={s.k} u={s.u} /></dd>
                <dt className="mt-1 tech-label text-steel">{s.l}</dt>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* system panel with parallax tilt */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
          className="relative [transform-style:preserve-3d]"
        >
          <div className="relative overflow-hidden rounded-2xl border border-line bg-surface p-5 elev-lg">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <span className="tech-label text-ink">System Panel</span>
              <span className="flex items-center gap-2 tech-label text-steel"><span className="h-2 w-2 rounded-full bg-red animate-blink" /> LIVE</span>
            </div>
            <div className="relative mt-4 aspect-[4/3] w-full overflow-hidden rounded-xl bg-paper bg-grid-fine">
              <svg viewBox="0 0 320 240" className="h-full w-full" fill="none" aria-hidden>
                <g stroke="#1a160f" strokeOpacity="0.28" strokeWidth="1.5">
                  <path d="M30 40h90v60h170" /><path d="M30 120h60v80h200" /><path d="M280 40v160" />
                  <rect x="110" y="86" width="28" height="28" rx="4" fill="#fff" /><rect x="80" y="186" width="28" height="28" rx="4" fill="#fff" /><rect x="266" y="86" width="28" height="28" rx="4" fill="#fff" />
                </g>
                <path d="M30 40h90v60h170v100" stroke="#d81e26" strokeWidth="2.5" strokeDasharray="10 8" className="animate-dash" />
                {[[30,40],[120,40],[280,40],[124,100],[280,200],[90,120],[90,200]].map(([x,y],i)=>(<circle key={i} cx={x} cy={y} r="4" fill="#fff" stroke="#1a160f" strokeWidth="2" />))}
                <circle cx="280" cy="100" r="7" fill="none" stroke="#d81e26" strokeWidth="2" className="animate-blink" />
              </svg>
              <span className="absolute left-3 top-2 tech-label text-mute">DIST-01</span>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {[{ l: "VOLTAGE", v: "230", u: "kV" }, { l: "LOAD", v: "98.6", u: "%" }, { l: "UPTIME", v: "100", u: "%" }].map((r) => (
                <div key={r.l} className="rounded-lg border border-line bg-paper px-3 py-3">
                  <div className="tech-label text-steel">{r.l}</div>
                  <div className="font-mono-tech text-xl font-semibold text-ink">{r.v}<span className="text-sm text-red">{r.u}</span></div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between rounded-lg bg-ink px-4 py-3">
              <span className="tech-label text-paper/70">Rating plate</span>
              <span className="font-mono-tech text-sm text-paper">PM-TX-230/AB</span>
            </div>
          </div>
          <div className="absolute -bottom-5 -left-5 hidden items-center gap-3 rounded-xl border border-line bg-surface px-4 py-3 elev sm:flex">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-ink font-display text-sm font-extrabold text-paper">AB</span>
            <span className="tech-label text-ink/80">Licensed<br />ABB Supplier</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
