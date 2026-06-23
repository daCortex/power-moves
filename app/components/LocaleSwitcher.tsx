"use client";

import { useEffect, useState } from "react";

const LOCALES = [
  { code: "en", label: "EN" },
  { code: "zh", label: "中文" },
  { code: "my", label: "မြန်မာ" },
];

function read(): string {
  if (typeof document === "undefined") return "en";
  const m = document.cookie.match(/(?:^|;\s*)pm_locale=([^;]+)/);
  return m ? m[1] : "en";
}

export default function LocaleSwitcher({ className = "" }: { className?: string }) {
  const [active, setActive] = useState("en");
  useEffect(() => setActive(read()), []);

  function set(code: string) {
    document.cookie = `pm_locale=${code};path=/;max-age=31536000;samesite=lax`;
    setActive(code);
    location.reload();
  }

  return (
    <div className={`inline-flex items-center rounded-full border border-line bg-surface/70 p-0.5 backdrop-blur ${className}`}>
      {LOCALES.map((l) => (
        <button
          key={l.code}
          onClick={() => set(l.code)}
          aria-pressed={active === l.code}
          className={`rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${
            active === l.code ? "bg-ink text-paper" : "text-steel hover:text-ink"
          }`}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
