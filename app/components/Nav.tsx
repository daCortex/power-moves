"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { defaultContent, type SiteContent } from "@/app/lib/cms/schema";

function Bolt({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
      <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" fill="currentColor" />
    </svg>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export default function Nav({ nav, brand }: { nav?: SiteContent["nav"]; brand?: SiteContent["brand"] }) {
  const n = nav ?? defaultContent.nav;
  const b = brand ?? defaultContent.brand;
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState<string | null>(null);
  const [mGroup, setMGroup] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) setMenu(null);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenu(null);
    window.addEventListener("click", onClick);
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("click", onClick); window.removeEventListener("keydown", onKey); };
  }, []);

  return (
    <motion.header
      ref={headerRef}
      initial={{ y: -90, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div className={`border-b transition-all duration-300 ${scrolled || menu ? "border-line bg-surface/90 backdrop-blur-md" : "border-transparent bg-paper/60 backdrop-blur-sm"}`}>
        <nav className="mx-auto flex h-16 max-w-[88rem] items-center justify-between px-5 md:px-6">
          <a href="#top" className="group flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-md bg-red text-white shadow-sm">
              <Bolt className="h-5 w-5" />
            </span>
            <span className="leading-none">
              <span className="block font-display text-lg font-extrabold uppercase tracking-tight text-ink">
                {b.name1}<span className="text-red">{b.name2}</span>
              </span>
              <span className="block tech-label text-[0.55rem] text-steel">{b.eyebrow}</span>
            </span>
          </a>

          {/* Desktop dropdowns */}
          <div className="hidden items-center gap-1 xl:flex">
            {n.groups.map((g) => {
              const isOpen = menu === g.label;
              return (
                <div key={g.label} className="relative" onMouseEnter={() => setMenu(g.label)} onMouseLeave={() => setMenu(null)}>
                  <button onClick={() => setMenu(isOpen ? null : g.label)} aria-expanded={isOpen}
                    className={`inline-flex items-center gap-1.5 rounded-md px-3.5 py-2 tech-label transition-colors ${isOpen ? "text-red" : "text-graphite hover:text-ink"}`}>
                    {g.label}<Chevron open={isOpen} />
                  </button>
                  <div className={`absolute left-0 top-full w-72 pt-2 transition-all duration-200 ${isOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"}`}>
                    <div className="overflow-hidden rounded-lg border border-line bg-surface p-2 elev">
                      {g.items.map((it) => (
                        <a key={it.href + it.label} href={it.href} {...(it.external ? { target: "_blank", rel: "noreferrer" } : {})}
                          className="block rounded-md px-3 py-2.5 transition-colors hover:bg-paper">
                          <span className="block text-sm font-semibold text-ink">{it.label}</span>
                          <span className="block text-xs text-steel">{it.desc}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
            {n.flat.map((l) => (
              <a key={l.href + l.label} href={l.href} {...(l.external ? { target: "_blank", rel: "noreferrer" } : {})}
                className="rounded-md px-3.5 py-2 tech-label text-graphite transition-colors hover:text-ink">{l.label}</a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a href={n.cta.href} className="hidden items-center gap-2 rounded-full bg-ink px-5 py-3 tech-label text-paper transition-all hover:bg-red sm:inline-flex">
              {n.cta.label}<span aria-hidden>→</span>
            </a>
            <button onClick={() => setOpen((v) => !v)} aria-label="Toggle menu" className="grid h-11 w-11 place-items-center rounded-md border border-line-strong/20 bg-surface text-ink xl:hidden">
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
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}
            className="overflow-hidden border-b border-line bg-surface xl:hidden">
            <div className="mx-auto flex max-w-[88rem] flex-col px-5 py-3">
              {n.groups.map((g) => {
                const gOpen = mGroup === g.label;
                return (
                  <div key={g.label} className="border-b border-line pb-1">
                    <button onClick={() => setMGroup(gOpen ? null : g.label)} className="flex w-full items-center justify-between py-3 tech-label text-ink">
                      {g.label}<Chevron open={gOpen} />
                    </button>
                    {gOpen && (
                      <div className="pb-2 pl-3">
                        {g.items.map((it) => (
                          <a key={it.href + it.label} href={it.href} onClick={() => setOpen(false)} className="block py-2.5 text-sm text-graphite hover:text-red">{it.label}</a>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
              <a href={n.cta.href} onClick={() => setOpen(false)} className="mt-3 inline-flex justify-center rounded-full bg-ink px-5 py-3 tech-label text-paper">{n.cta.label}</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
