import type { Metadata } from "next";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";
import CTA from "../components/CTA";
import Reveal from "../components/Reveal";
import { getContent } from "../lib/cms/store";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Downloads — Power Moves" };

const GROUPS = [
  { group: "Data Sheets", docs: ["Power Transformer — Technical Data Sheet", "Distribution Transformer — Catalog", "Cast-Resin Dry-Type — Specification", "ABB-Licensed Switchgear — Lineup Brochure"] },
  { group: "Certificates", docs: ["DEKRA Type-Test Certificate", "KERI Short-Circuit Report", "Tecnalia Compliance Certificate", "ISO 9001 / 14001 / 45001 Registrations"] },
  { group: "Corporate", docs: ["Company Profile 2025"] },
];

function DownloadIcon() {
  return <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" /></svg>;
}

export default async function DownloadsPage() {
  const c = await getContent();
  return (
    <>
      <Nav nav={c.nav} brand={c.brand} />
      <main>
        <PageHeader eyebrow="Downloads" title="Data sheets & documentation." intro="Technical specifications, third-party certificates and corporate documentation for procurement and engineering review." />
        <section className="bg-paper">
          <div className="mx-auto max-w-[88rem] px-6 py-20">
            <div className="space-y-10">
              {GROUPS.map((g) => (
                <Reveal key={g.group}>
                  <div>
                    <div className="flex items-center gap-3 tech-label text-red"><span className="h-px w-8 bg-red" />{g.group}</div>
                    <div className="mt-5 overflow-hidden rounded-lg border border-line bg-surface">
                      {g.docs.map((d) => (
                        <a key={d} href="#" className="group flex items-center justify-between gap-4 border-b border-line px-5 py-4 transition-colors last:border-b-0 hover:bg-paper">
                          <span className="flex items-center gap-3">
                            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-ink text-paper"><DownloadIcon /></span>
                            <span className="text-sm font-medium text-ink">{d}</span>
                          </span>
                          <span className="font-mono-tech text-xs text-steel transition-colors group-hover:text-red">PDF →</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
            <p className="mt-8 text-xs text-mute">Document links are placeholders pending final asset upload.</p>
          </div>
        </section>
        <CTA data={c.cta} />
      </main>
      <Footer footer={c.footer} contact={c.contact} brand={c.brand} />
    </>
  );
}
