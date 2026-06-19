"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const LINKS = [
  { label: "Capabilities", href: "#capabilities" },
  { label: "Anatomy", href: "#anatomy" },
  { label: "Products", href: "#products" },
  { label: "Process", href: "#process" },
  { label: "Industries", href: "#industries" },
  { label: "Standards", href: "#standards" },
  { label: "FAQ", href: "#faq" },
];

function Bolt({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
      <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" fill="currentColor" />
    </svg>
  );
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      {/* Utility strip */}
      <div className="hidden bg-ink text-paper md:block">
        <div className="mx-auto flex h-9 max-w-[88rem] items-center justify-between px-6 tech-label text-paper/70">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 bg-amber animate-blink" />
              Yangon · Myanmar
            </span>
            <span className="hidden lg:inline">Licensed ABB Switchgear Supplier</span>
            <span className="hidden lg:inline">ISO-Certified Operations</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="tel:095506709" className="transition-colors hover:text-amber">
              T · 09-5506709
            </a>
            <a href="mailto:commercial.agh@agholding.com" className="transition-colors hover:text-amber">
              commercial.agh@agholding.com
            </a>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div
        className={`border-b transition-all duration-300 ${
          scrolled
            ? "border-line-strong/15 bg-surface/90 backdrop-blur-md"
            : "border-transparent bg-paper/60 backdrop-blur-sm"
        }`}
      >
        <nav className="mx-auto flex h-16 max-w-[88rem] items-center justify-between px-5 md:px-6">
          <a href="#top" className="group flex items-center gap-3">
            <span className="relative grid h-10 w-10 place-items-center rounded-xl bg-red text-white shadow-sm">
              <Bolt className="h-5 w-5" />
            </span>
            <span className="leading-none">
              <span className="block font-display text-lg font-extrabold uppercase tracking-tight text-ink">
                Power<span className="text-red">Moves</span>
              </span>
              <span className="block tech-label text-[0.55rem] text-steel">
                Electrical · EPC · Supply
              </span>
            </span>
          </a>

          <ul className="hidden items-center gap-7 xl:flex">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="group relative tech-label text-graphite transition-colors hover:text-red"
                >
                  {l.label}
                  <span className="absolute -bottom-1.5 left-0 h-0.5 w-0 bg-red transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="group hidden items-center gap-2 rounded-full bg-ink px-5 py-3 tech-label text-paper transition-all hover:bg-red hover:shadow-md sm:inline-flex"
            >
              Request a Quote
              <span className="transition-transform group-hover:translate-x-0.5" aria-hidden>→</span>
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              className="grid h-11 w-11 place-items-center rounded-xl border border-line-strong/20 bg-surface text-ink xl:hidden"
            >
              <div className="space-y-1.5">
                <span className={`block h-0.5 w-5 bg-current transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
                <span className={`block h-0.5 w-5 bg-current transition-opacity ${open ? "opacity-0" : ""}`} />
                <span className={`block h-0.5 w-5 bg-current transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
              </div>
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-b border-line-strong/15 bg-surface xl:hidden"
          >
            <ul className="mx-auto flex max-w-[88rem] flex-col px-5 py-3">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between border-b border-line py-3.5 tech-label text-graphite hover:text-red"
                  >
                    {l.label}
                    <span aria-hidden className="text-mute">→</span>
                  </a>
                </li>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-4 inline-flex justify-center bg-ink px-5 py-3.5 tech-label text-paper"
              >
                Request a Quote
              </a>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
