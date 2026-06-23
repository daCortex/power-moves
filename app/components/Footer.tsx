"use client";

import Reveal from "./Reveal";
import { defaultContent, type SiteContent } from "@/app/lib/cms/schema";

function Bolt({ className = "" }: { className?: string }) {
  return (<svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden><path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" /></svg>);
}

export default function Footer({
  footer, contact, brand,
}: {
  footer?: SiteContent["footer"];
  contact?: SiteContent["contact"];
  brand?: SiteContent["brand"];
}) {
  const f = footer ?? defaultContent.footer;
  const c = contact ?? defaultContent.contact;
  const b = brand ?? defaultContent.brand;

  return (
    <footer id="contact" className="scroll-mt-28 bg-paper">
      <div className="mx-auto max-w-[88rem] px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <div className="flex items-center gap-3 tech-label text-red">
              <span className="h-px w-7 bg-red" /> Get in touch
            </div>
            <h2 className="mt-5 max-w-xl heading-mega text-[clamp(1.75rem,4.5vw,3.25rem)] text-ink">Let&apos;s engineer your next power system</h2>
            <p className="mt-5 max-w-md text-graphite">Tell us what you&apos;re building — load, voltage, site and scope. We&apos;ll bring the equipment, the engineering and the delivery.</p>
            <a href={`mailto:${c.emails[0] ?? ""}`} className="group mt-8 inline-flex items-center gap-3 rounded-full bg-ink px-7 py-4 tech-label text-paper transition-all hover:bg-red hover:shadow-md">
              Request a Quote<span className="transition-transform group-hover:translate-x-1" aria-hidden>→</span>
            </a>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-line bg-surface p-6">
                <div className="tech-label text-steel">Call</div>
                <div className="mt-2 space-y-1 font-mono-tech text-sm text-ink">{c.phones.map((p) => <div key={p}>{p}</div>)}</div>
              </div>
              <div className="rounded-xl border border-line bg-surface p-6">
                <div className="tech-label text-steel">Email</div>
                <div className="mt-2 space-y-1 break-all font-mono-tech text-xs text-ink">{c.emails.map((e) => <div key={e}>{e}</div>)}</div>
              </div>
              <div className="rounded-xl border border-line bg-surface p-6 sm:col-span-2">
                <div className="tech-label text-steel">Showroom · {c.location}</div>
                <div className="mt-2 text-sm leading-relaxed text-ink">{c.address}</div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto grid max-w-[88rem] gap-10 px-6 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <a href="/" aria-label="Power Moves — home" className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-md bg-red text-white shadow-sm"><Bolt className="h-5 w-5" /></span>
              <span className="font-display text-lg font-extrabold uppercase tracking-tight text-ink">{b.name1}<span className="text-red">{b.name2}</span></span>
            </a>
            <p className="mt-5 max-w-xs text-sm text-steel">{f.blurb}</p>
            <div className="mt-5 flex items-center gap-2 tech-label text-steel"><span className="h-2 w-2 bg-red animate-blink" /> Engineered for uptime</div>
          </div>
          {f.columns.map((col) => (
            <div key={col.title}>
              <div className="tech-label text-ink">{col.title}</div>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (<li key={l.label}><a href={l.href} className="text-sm text-steel transition-colors hover:text-red">{l.label}</a></li>))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-ink">
        <div className="mx-auto flex max-w-[88rem] flex-col items-center justify-between gap-3 px-6 py-6 tech-label text-paper/50 md:flex-row">
          <div>{f.copyright}</div>
          <span>{f.location}</span>
        </div>
      </div>
    </footer>
  );
}
