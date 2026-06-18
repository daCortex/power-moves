"use client";

const ITEMS = [
  "Licensed ABB Switchgear Supplier",
  "ISO-Certified Operations",
  "Power Transformer Manufacturing",
  "EPC Turnkey Engineering",
  "Medium-Voltage up to 33 kV",
  "Substation & Distribution Support",
  "Procurement-Ready Supply",
];

export default function Marquee() {
  return (
    <div className="relative overflow-hidden border-b border-line-strong/15 bg-ink py-4">
      <div className="flex w-max animate-marquee">
        {[0, 1].map((dup) => (
          <ul key={dup} className="flex shrink-0 items-center" aria-hidden={dup === 1}>
            {ITEMS.map((item) => (
              <li
                key={item}
                className="flex items-center gap-5 whitespace-nowrap px-7 tech-label text-paper/80"
              >
                <span className="text-amber">◆</span>
                {item}
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
