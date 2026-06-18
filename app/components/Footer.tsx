"use client";

import Reveal from "./Reveal";

function Bolt({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />
    </svg>
  );
}

const NAV = {
  Capabilities: ["Product Trading", "EPC Turnkey", "Substations", "Industrial Power"],
  Products: ["Transformers", "MV Switchgear", "LV Switchgear", "Package Substations"],
  Company: ["Process", "Industries", "Standards", "FAQ"],
};

export default function Footer() {
  return (
    <footer id="contact" className="scroll-mt-28 bg-paper">
      {/* contact band */}
      <div className="mx-auto max-w-[88rem] px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <div className="flex items-center gap-3 tech-label text-red">
              <span className="font-mono-tech">[ 09 ]</span>
              <span className="h-px w-8 bg-red" /> Get in touch
            </div>
            <h2 className="mt-5 max-w-xl heading-mega text-[clamp(1.75rem,4.5vw,3.25rem)] text-ink">
              Let&apos;s engineer your next power system
            </h2>
            <p className="mt-5 max-w-md text-graphite">
              Tell us what you&apos;re building — load, voltage, site and scope.
              We&apos;ll bring the equipment, the engineering and the delivery.
            </p>
            <a
              href="mailto:commercial.agh@agholding.com"
              className="group mt-8 inline-flex items-center gap-3 bg-ink px-7 py-4 tech-label text-paper transition-colors hover:bg-red"
            >
              Request a Quote
              <span className="transition-transform group-hover:translate-x-1" aria-hidden>→</span>
            </a>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="grid gap-px border border-line-strong/15 bg-line-strong/15 sm:grid-cols-2">
              <div className="bg-surface p-6">
                <div className="tech-label text-steel">Call</div>
                <div className="mt-2 space-y-1 font-mono-tech text-sm text-ink">
                  <div>09-5506709</div>
                  <div>09-5506710</div>
                  <div>09-425751831</div>
                </div>
              </div>
              <div className="bg-surface p-6">
                <div className="tech-label text-steel">Email</div>
                <div className="mt-2 space-y-1 break-all font-mono-tech text-xs text-ink">
                  <div>commercial.agh@agholding.com</div>
                  <div>showroom.sales.agh@agholding.com</div>
                </div>
              </div>
              <div className="bg-surface p-6 sm:col-span-2">
                <div className="tech-label text-steel">Showroom · Yangon</div>
                <div className="mt-2 text-sm leading-relaxed text-ink">
                  No. 501/503, Pyay Road (Corner of Pyi Yeik Thar Street),
                  Kamaryut Township, Yangon, Myanmar
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* link columns */}
      <div className="border-t border-line-strong/15">
        <div className="mx-auto grid max-w-[88rem] gap-10 px-6 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <a href="#top" className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center bg-red text-white">
                <Bolt className="h-5 w-5" />
              </span>
              <span className="font-display text-lg font-extrabold uppercase tracking-tight text-ink">
                Power<span className="text-red">Moves</span>
              </span>
            </a>
            <p className="mt-5 max-w-xs text-sm text-steel">
              Electrical engineering, product supply and EPC turnkey solutions
              for modern power infrastructure.
            </p>
            <div className="mt-5 flex items-center gap-2 tech-label text-steel">
              <span className="h-2 w-2 bg-red animate-blink" /> Engineered for uptime
            </div>
          </div>

          {Object.entries(NAV).map(([heading, items]) => (
            <div key={heading}>
              <div className="tech-label text-ink">{heading}</div>
              <ul className="mt-4 space-y-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-steel transition-colors hover:text-red">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* bottom bar */}
      <div className="hazard h-2.5 w-full" />
      <div className="bg-ink">
        <div className="mx-auto flex max-w-[88rem] flex-col items-center justify-between gap-3 px-6 py-6 tech-label text-paper/50 md:flex-row">
          <div>© 2026 Power Moves · Asia General Holding</div>
          <div className="flex items-center gap-6">
            <span>YANGON · MYANMAR</span>
            <span className="hidden sm:inline">N 16.8° E 96.1°</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
