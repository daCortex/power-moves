import type { Metadata } from "next";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";
import CTA from "../components/CTA";
import Reveal from "../components/Reveal";
import { getContent } from "../lib/cms/store";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "News — Power Moves" };

const NEWS = [
  { date: "May 2026", tag: "Project", title: "150 MVA transformer energized at Shwe Sar Yan", excerpt: "Our largest transmission-class unit to date enters service on the 230 / 33 / 11 kV substation in the Mandalay region." },
  { date: "Mar 2026", tag: "Certification", title: "DEKRA type-test certificate renewed", excerpt: "Independent type testing reconfirms our power transformers against the latest IEC 60076 requirements." },
  { date: "Feb 2026", tag: "Facility", title: "New cast-resin dry-type line commissioned", excerpt: "Added capacity for dry-type distribution transformers expands our catalog for indoor and commercial applications." },
  { date: "Jan 2026", tag: "Partnership", title: "ABB switchgear license extended", excerpt: "Continued licensed manufacture of medium- and low-voltage switchgear up to 40.5 kV, 31.5 kA." },
];

export default async function NewsPage() {
  const c = await getContent();
  return (
    <>
      <Nav nav={c.nav} brand={c.brand} />
      <main>
        <PageHeader eyebrow="News" title="News & insight." intro="Announcements, project milestones and engineering perspectives from the Power Moves team." />
        <section className="bg-paper">
          <div className="mx-auto max-w-[88rem] px-6 py-20">
            <div className="grid gap-5 md:grid-cols-2">
              {NEWS.map((n, i) => (
                <Reveal key={n.title} delay={(i % 2) * 0.06}>
                  <article className="group flex h-full flex-col rounded-lg border border-line bg-surface p-7 transition-colors hover:border-line-strong/30">
                    <div className="flex items-center gap-3 tech-label text-steel">
                      <span className="rounded bg-red/10 px-2 py-0.5 text-red">{n.tag}</span>{n.date}
                    </div>
                    <h3 className="mt-4 font-display text-xl font-bold text-ink">{n.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-graphite">{n.excerpt}</p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-red transition-transform group-hover:translate-x-0.5">Read more <span aria-hidden>→</span></span>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
        <CTA data={c.cta} />
      </main>
      <Footer footer={c.footer} contact={c.contact} brand={c.brand} />
    </>
  );
}
