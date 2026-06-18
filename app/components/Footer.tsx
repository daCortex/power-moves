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
  Solutions: ["Product Trading", "EPC Turnkey", "Substations", "Industrial Power"],
  Products: ["Transformers", "MV Switchgear", "LV Switchgear", "Package Substations"],
  Company: ["About", "Industries", "Credentials", "Contact"],
};

export default function Footer() {
  return (
    <footer id="contact" className="scroll-mt-20 border-t border-line bg-ink">
      {/* contact band */}
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <div className="text-xs font-medium uppercase tracking-[0.3em] text-red">
              Get in touch
            </div>
            <h2 className="mt-5 max-w-xl heading-mega text-[clamp(1.75rem,4vw,3rem)] text-white">
              Let&apos;s engineer your next power system
            </h2>
            <p className="mt-5 max-w-md text-mute">
              Tell us what you&apos;re building. We&apos;ll bring the equipment,
              the engineering and the delivery.
            </p>
            <a
              href="mailto:commercial.agh@agholding.com"
              className="group mt-8 inline-flex items-center gap-2 bg-red px-7 py-4 text-sm font-semibold uppercase tracking-wide text-white transition-all hover:bg-white hover:text-ink"
            >
              Request a Quote
              <span className="transition-transform group-hover:translate-x-1" aria-hidden>
                →
              </span>
            </a>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="grid gap-px border border-line bg-line sm:grid-cols-2">
              <div className="bg-coal p-6">
                <div className="text-xs uppercase tracking-wide text-mute">Call</div>
                <div className="mt-2 space-y-1 text-sm text-white">
                  <div>09-5506709</div>
                  <div>09-5506710</div>
                  <div>09-425751831</div>
                </div>
              </div>
              <div className="bg-coal p-6">
                <div className="text-xs uppercase tracking-wide text-mute">Email</div>
                <div className="mt-2 space-y-1 break-all text-sm text-white">
                  <div>commercial.agh@agholding.com</div>
                  <div>showroom.sales.agh@agholding.com</div>
                </div>
              </div>
              <div className="bg-coal p-6 sm:col-span-2">
                <div className="text-xs uppercase tracking-wide text-mute">
                  Showroom · Yangon
                </div>
                <div className="mt-2 text-sm leading-relaxed text-white">
                  No. 501/503, Pyay Road (Corner of Pyi Yeik Thar Street),
                  Kamaryut Township, Yangon, Myanmar
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* link columns */}
      <div className="border-t border-line">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:px-8">
          <div>
            <a href="#top" className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center bg-red text-white">
                <Bolt className="h-4 w-4" />
              </span>
              <span className="font-display text-lg font-extrabold uppercase tracking-tight text-white">
                Power<span className="text-red">Moves</span>
              </span>
            </a>
            <p className="mt-5 max-w-xs text-sm text-mute">
              Electrical engineering, product supply and EPC turnkey solutions
              for modern power infrastructure.
            </p>
          </div>

          {Object.entries(NAV).map(([heading, items]) => (
            <div key={heading}>
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-white">
                {heading}
              </div>
              <ul className="mt-4 space-y-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm text-mute transition-colors hover:text-red"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* bottom bar */}
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-6 text-xs text-mute md:flex-row md:px-8">
          <div>© {2026} Power Moves. All rights reserved.</div>
          <div className="flex items-center gap-2 uppercase tracking-[0.2em]">
            <span className="h-1.5 w-1.5 bg-red animate-pulse-slow" />
            Engineered for uptime
          </div>
        </div>
      </div>
    </footer>
  );
}
