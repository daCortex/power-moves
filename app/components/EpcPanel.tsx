"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Reveal from "./Reveal";
import { SectionHead } from "./Capabilities";

type Layer = {
  no: string;
  name: string;
  spec: string;
  desc: string;
  detail: string[];
  tone: "dark" | "red" | "light";
  glyph: React.ReactNode;
};

const G = "h-5 w-5";

// front (top of stack) → back (bottom)
const LAYERS: Layer[] = [
  {
    no: "01",
    name: "Control Fascia",
    spec: "IP54 door · HMI & indicators",
    desc: "The operator-facing door — instrumentation, controls and status at a glance.",
    detail: ["IP54-rated lockable door", "HMI / mimic & indicator lamps", "Push-buttons & selector switches", "Door-mounted metering"],
    tone: "red",
    glyph: (
      <svg viewBox="0 0 24 24" className={G} fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="4" y="3" width="16" height="18" rx="1.5" /><circle cx="9" cy="8" r="1.4" /><circle cx="15" cy="8" r="1.4" /><path d="M7 14h10M7 17h6" />
      </svg>
    ),
  },
  {
    no: "02",
    name: "Metering & Protection",
    spec: "Numerical relays · CT / VT",
    desc: "The brain — relays that watch every circuit and trip in milliseconds.",
    detail: ["Numerical protection relays", "Current & voltage transformers", "Energy & power metering", "Selective trip coordination"],
    tone: "dark",
    glyph: (
      <svg viewBox="0 0 24 24" className={G} fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="12" cy="12" r="8" /><path d="M12 12l4-3M12 6v1M18 12h-1" />
      </svg>
    ),
  },
  {
    no: "03",
    name: "Breaker Array",
    spec: "MCCB / ACB · selective",
    desc: "The muscle — breakers that make, carry and break fault current safely.",
    detail: ["MCCB / ACB / VCB devices", "Withdrawable or fixed pattern", "Mechanically interlocked", "Short-circuit rated"],
    tone: "light",
    glyph: (
      <svg viewBox="0 0 24 24" className={G} fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M6 4v6M6 10l5 4M18 4v16M12 20v-6" /><circle cx="6" cy="11" r="1" />
      </svg>
    ),
  },
  {
    no: "04",
    name: "Busbar System",
    spec: "Tinned copper · up to 6300 A",
    desc: "The spine — copper bars distributing power across the whole assembly.",
    detail: ["Tinned copper busbars", "Rated up to 6300 A", "Insulated & shrouded", "Fault-withstand braced"],
    tone: "dark",
    glyph: (
      <svg viewBox="0 0 24 24" className={G} fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M3 8h18M3 12h18M3 16h18" />
      </svg>
    ),
  },
  {
    no: "05",
    name: "Transformer Module",
    spec: "Step-down · ≤ 33 kV",
    desc: "The converter — stepping voltage to the level your site actually needs.",
    detail: ["Step-down to LV / MV", "Oil-immersed or dry-type", "Built to IEC 60076", "Temperature monitored"],
    tone: "light",
    glyph: (
      <svg viewBox="0 0 24 24" className={G} fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="8" cy="12" r="4" /><circle cx="16" cy="12" r="4" />
      </svg>
    ),
  },
  {
    no: "06",
    name: "Form-4 Enclosure",
    spec: "Compartmented steel frame",
    desc: "The shell — a compartmented steel frame that holds and segregates it all.",
    detail: ["Form-4 segregation", "Powder-coated steel", "Cable entry & gland plates", "Floor or wall mounting"],
    tone: "dark",
    glyph: (
      <svg viewBox="0 0 24 24" className={G} fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="3" y="3" width="18" height="18" rx="1.5" /><path d="M3 9h18M9 9v12" />
      </svg>
    ),
  },
];

const PLATE = 76;
const MID = (LAYERS.length - 1) / 2;
const OPEN_GAP = 104;
const CLOSED_GAP = 9;

const toneClass: Record<Layer["tone"], string> = {
  red: "bg-red text-white border-red",
  dark: "bg-ink text-paper border-ink",
  light: "bg-surface text-ink border-line",
};

export default function EpcPanel() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-25%" });

  // Autoplay: deconstruct itself once it scrolls into view
  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => setOpen(true), 550);
    return () => clearTimeout(t);
  }, [inView]);

  const sel = LAYERS[selected];

  const handleLayer = (i: number) => {
    if (!open) setOpen(true);
    setSelected(i);
  };

  return (
    <section ref={sectionRef} id="anatomy" className="scroll-mt-28 overflow-hidden border-b border-line bg-soft">
      <div className="mx-auto max-w-[82rem] px-6 py-20 md:py-28">
        <Reveal>
          <SectionHead
            index="03"
            kicker="Anatomy"
            title="Inside an EPC Panel"
            sub={open ? "Select a layer" : "Watch it deconstruct"}
          />
        </Reveal>

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          {/* STAGE */}
          <Reveal delay={0.1}>
            <div
              className="relative"
              style={{ perspective: "1400px" }}
              role="button"
              tabIndex={0}
              aria-label="Toggle exploded view"
              onClick={() => setOpen((v) => !v)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setOpen((v) => !v);
                }
              }}
            >
              <motion.div
                className="relative mx-auto h-[460px] w-full max-w-[560px] cursor-pointer select-none md:h-[520px]"
                animate={{ rotateX: open ? 18 : 0, rotateZ: open ? -4 : 0 }}
                transition={{ type: "spring", stiffness: 90, damping: 18 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <motion.span
                  className="pointer-events-none absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-line-strong/15"
                  animate={{ opacity: open ? 1 : 0 }}
                  transition={{ duration: 0.4 }}
                />

                {LAYERS.map((l, i) => ({ l, i })).reverse().map(({ l, i }) => {
                  const targetY = (i - MID) * (open ? OPEN_GAP : CLOSED_GAP);
                  const targetZ = open ? (LAYERS.length - 1 - i) * 26 : 0;
                  const isSel = open && selected === i;
                  return (
                    <motion.div
                      key={l.no}
                      className="absolute inset-x-0 mx-auto w-[300px] cursor-pointer sm:w-[420px]"
                      style={{ top: "50%", marginTop: -PLATE / 2, transformStyle: "preserve-3d" }}
                      initial={false}
                      animate={{
                        y: targetY,
                        z: targetZ + (isSel ? 30 : 0),
                        rotateZ: open ? (i % 2 === 0 ? -1.5 : 1.5) : 0,
                        scale: isSel ? 1.05 : 1,
                        opacity: open && !isSel ? 0.55 : 1,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 120,
                        damping: 16,
                        delay: open ? i * 0.06 : (LAYERS.length - 1 - i) * 0.04,
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLayer(i);
                      }}
                    >
                      <div
                        className={`flex h-[76px] items-center gap-4 rounded-xl border px-5 transition-shadow ${toneClass[l.tone]} ${
                          isSel ? "ring-2 ring-amber ring-offset-2 ring-offset-paper" : ""
                        } ${open ? "shadow-[0_24px_40px_-20px_rgba(21,22,26,0.5)]" : "shadow-sm"}`}
                      >
                        <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg ${l.tone === "light" ? "bg-paper text-red" : "bg-white/15"}`}>
                          {l.glyph}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block font-display text-base font-bold leading-tight">{l.name}</span>
                          <motion.span
                            className="block text-[0.72rem] opacity-70"
                            animate={{ opacity: open ? 0.75 : 0, height: open ? "auto" : 0 }}
                            transition={{ duration: 0.3, delay: open ? 0.1 + i * 0.06 : 0 }}
                          >
                            {l.spec}
                          </motion.span>
                        </span>
                        <span className="font-mono-tech text-xs opacity-50">{l.no}</span>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>

              <motion.div
                className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2"
                animate={{ opacity: open ? 0 : 1, y: open ? 8 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/80 px-4 py-2 tech-label text-ink backdrop-blur">
                  <span className="h-1.5 w-1.5 rounded-full bg-red animate-blink" />
                  Tap the panel
                </span>
              </motion.div>
            </div>
          </Reveal>

          {/* CONTROLS + DETAIL */}
          <Reveal delay={0.18}>
            <div>
              <p className="max-w-md text-lg text-graphite">
                Every Power Moves turnkey build is engineered as a complete
                assembly. {open ? "Select any layer to see what we integrate, source and commission." : "It deconstructs itself as you scroll — or tap to open."}
              </p>

              <button
                onClick={() => setOpen((v) => !v)}
                className="group mt-7 inline-flex items-center gap-3 rounded-full bg-ink px-7 py-4 tech-label text-paper transition-all hover:bg-red hover:shadow-md"
              >
                <span className="relative grid h-5 w-5 place-items-center">
                  <span className="absolute h-0.5 w-3.5 bg-current" />
                  <span className={`absolute h-0.5 w-3.5 bg-current transition-transform ${open ? "rotate-0" : "rotate-90"}`} />
                </span>
                {open ? "Reassemble panel" : "Deconstruct panel"}
              </button>

              {/* swap: stats (closed) ↔ layer detail (open) */}
              <div className="mt-9">
                {!open ? (
                  <dl className="grid grid-cols-2 gap-3">
                    {[
                      { k: "06", l: "Integrated layers" },
                      { k: "≤33 kV", l: "Voltage class" },
                      { k: "Form 4", l: "Switchboard" },
                      { k: "1", l: "Accountable partner" },
                    ].map((s) => (
                      <div key={s.l} className="rounded-xl border border-line bg-surface/70 px-4 py-4">
                        <div className="font-display text-2xl font-extrabold text-ink">{s.k}</div>
                        <div className="mt-1 tech-label text-steel">{s.l}</div>
                      </div>
                    ))}
                  </dl>
                ) : (
                  <motion.div
                    key={sel.no}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    className="rounded-2xl border border-line bg-surface p-6 elev"
                  >
                    <div className="flex items-center justify-between border-b border-line pb-4">
                      <span className="flex items-center gap-2 tech-label text-red">
                        <span className="h-1.5 w-1.5 rounded-full bg-red" /> Layer {sel.no}
                      </span>
                      <span className="font-mono-tech text-xs text-steel">{selected + 1} / {LAYERS.length}</span>
                    </div>
                    <h3 className="mt-4 font-display text-2xl font-extrabold uppercase text-ink">{sel.name}</h3>
                    <p className="mt-2 text-sm text-graphite">{sel.desc}</p>
                    <ul className="mt-5 space-y-2">
                      {sel.detail.map((d) => (
                        <li key={d} className="flex items-start gap-3 text-sm text-graphite">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-red" />
                          {d}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
                      <span className="tech-label text-steel">{sel.spec}</span>
                      <button
                        onClick={() => setSelected((selected + 1) % LAYERS.length)}
                        className="group inline-flex items-center gap-2 tech-label text-ink hover:text-red"
                      >
                        Next layer
                        <span className="transition-transform group-hover:translate-x-1" aria-hidden>→</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
