"use client";

import { defaultContent, type SiteContent } from "@/app/lib/cms/schema";

export default function CertStrip({ data }: { data?: SiteContent["certStrip"] }) {
  const items = data?.items?.length ? data.items : defaultContent.certStrip.items;
  return (
    <div id="certs" className="scroll-mt-20 border-y border-line bg-surface py-5">
      <div className="mx-auto mb-3 max-w-[88rem] px-6">
        <span className="tech-label text-steel">Independently type-tested &amp; certified</span>
      </div>
      <div className="relative overflow-hidden">
        <div className="flex w-max animate-marquee">
          {[0, 1].map((dup) => (
            <ul key={dup} className="flex shrink-0 items-center" aria-hidden={dup === 1}>
              {items.map((item) => (
                <li key={item} className="flex items-center gap-3 whitespace-nowrap px-7">
                  <span className="text-red">●</span>
                  <span className="font-display text-base font-semibold text-ink">{item}</span>
                </li>
              ))}
            </ul>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-surface to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-surface to-transparent" />
      </div>
    </div>
  );
}
