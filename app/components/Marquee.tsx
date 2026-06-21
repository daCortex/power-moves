"use client";

import { defaultContent } from "@/app/lib/cms/schema";

export default function Marquee({ items }: { items?: string[] }) {
  const list = items && items.length ? items : defaultContent.marquee;
  return (
    <div className="relative overflow-hidden border-b border-line bg-ink py-4">
      <div className="flex w-max animate-marquee">
        {[0, 1].map((dup) => (
          <ul key={dup} className="flex shrink-0 items-center" aria-hidden={dup === 1}>
            {list.map((item) => (
              <li key={item} className="flex items-center gap-5 whitespace-nowrap px-7 tech-label text-paper/80">
                <span className="text-amber">◆</span>{item}
              </li>
            ))}
          </ul>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-ink to-transparent" />
    </div>
  );
}
