import type { Metadata } from "next";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";
import CTA from "../components/CTA";
import Reveal from "../components/Reveal";
import { getContent } from "../lib/cms/store";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Careers — Power Moves" };

const ROLES = [
  { title: "Transformer Design Engineer", type: "Full-time · Yangon", desc: "Electromagnetic and mechanical design of power and distribution transformers to IEC 60076." },
  { title: "Switchgear Assembly Technician", type: "Full-time · Yangon", desc: "Assembly and routine testing of ABB-licensed MV/LV switchgear." },
  { title: "Field Commissioning Engineer", type: "Full-time · Nationwide", desc: "On-site installation supervision, oil processing and high-voltage commissioning." },
];

export default async function CareersPage() {
  const c = await getContent();
  return (
    <>
      <Nav nav={c.nav} brand={c.brand} />
      <main>
        <PageHeader eyebrow="Careers" title="Build the grid with us." intro="We're a team of engineers building the equipment that keeps the country powered. If you care about doing it to standard, we'd like to meet you." />
        <section className="bg-paper">
          <div className="mx-auto max-w-[88rem] px-6 py-20">
            <div className="flex items-center gap-3 tech-label text-red"><span className="h-px w-8 bg-red" />Open roles</div>
            <div className="mt-6 overflow-hidden rounded-lg border border-line bg-surface">
              {ROLES.map((r) => (
                <div key={r.title} className="flex flex-col gap-3 border-b border-line px-6 py-6 last:border-b-0 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="font-display text-lg font-bold text-ink">{r.title}</h3>
                    <p className="mt-1 text-sm text-graphite">{r.desc}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="tech-label text-steel">{r.type}</span>
                    <a href="/contact" className="rounded-full bg-ink px-4 py-2 tech-label text-paper transition-colors hover:bg-red">Apply</a>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-8 max-w-xl text-graphite">Don&apos;t see your role? We&apos;re always glad to hear from talented engineers and technicians — send your CV to <a href={`mailto:${c.contact.emails[0] ?? ""}`} className="font-semibold text-red">{c.contact.emails[0]}</a>.</p>
          </div>
        </section>
        <CTA data={c.cta} />
      </main>
      <Footer footer={c.footer} contact={c.contact} brand={c.brand} />
    </>
  );
}
