import type { Metadata } from "next";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";
import CTA from "../components/CTA";
import Reveal from "../components/Reveal";
import { getContent } from "../lib/cms/store";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Support — Power Moves" };

const METRICS = [
  { v: "24 / 7", l: "Emergency desk" },
  { v: "< 2 days", l: "RFQ response" },
  { v: "Nationwide", l: "Field coverage" },
  { v: "10 yr", l: "Standard warranty" },
];

export default async function SupportPage() {
  const c = await getContent();
  return (
    <>
      <Nav nav={c.nav} brand={c.brand} />
      <main>
        <PageHeader eyebrow="Support" title="After-sales you can rely on." intro="Reach our commercial desk, request a quotation, or arrange a showroom visit. We respond within two business days." />
        <section className="border-b border-line bg-paper">
          <div className="mx-auto max-w-[88rem] px-6 py-14">
            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-4">
              {METRICS.map((m) => (
                <div key={m.l} className="bg-paper px-6 py-7">
                  <dt className="font-display text-3xl font-extrabold text-ink">{m.v}</dt>
                  <dd className="mt-1 tech-label text-steel">{m.l}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
        <section className="bg-surface">
          <div className="mx-auto max-w-[88rem] px-6 py-20">
            <div className="grid gap-5 sm:grid-cols-3">
              {[
                ["On-site field service", "Commissioning, oil filtration and condition monitoring at your site."],
                ["Emergency maintenance", "A 24/7 desk for unplanned events, with nationwide field coverage."],
                ["Spares & warranty", "Genuine spares and a standard 10-year warranty on manufactured units."],
              ].map(([t, d]) => (
                <Reveal key={t}><div className="h-full rounded-lg border border-line bg-paper p-7"><h3 className="font-display text-lg font-bold text-ink">{t}</h3><p className="mt-2 text-sm text-graphite">{d}</p></div></Reveal>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              <a href={`tel:${c.contact.phones[0] ?? ""}`} className="rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-paper transition-colors hover:bg-red">Call the desk · {c.contact.phones[0]}</a>
              <a href="/contact" className="rounded-full border border-line-strong/25 px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-ink">Contact form →</a>
            </div>
          </div>
        </section>
        <CTA data={c.cta} />
      </main>
      <Footer footer={c.footer} contact={c.contact} brand={c.brand} />
    </>
  );
}
