"use client";

const ITEMS = [
  "Licensed ABB Switchgear Supplier",
  "ISO-Certified Operations",
  "Power Transformer Manufacturing",
  "EPC Turnkey Engineering",
  "Medium-Voltage up to 33 kV",
  "Substation & Distribution Support",
];

export default function Marquee() {
  return (
    <div className="relative overflow-hidden border-y border-line bg-coal py-5">
      <div className="flex w-max animate-marquee">
        {[0, 1].map((dup) => (
          <ul
            key={dup}
            className="flex shrink-0 items-center"
            aria-hidden={dup === 1}
          >
            {ITEMS.map((item) => (
              <li
                key={item}
                className="flex items-center gap-6 whitespace-nowrap px-8 text-sm font-medium uppercase tracking-[0.2em] text-mute"
              >
                {item}
                <span className="h-1.5 w-1.5 rotate-45 bg-red" />
              </li>
            ))}
          </ul>
        ))}
      </div>
      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-coal to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-coal to-transparent" />
    </div>
  );
}
