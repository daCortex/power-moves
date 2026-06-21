import type { Metadata } from "next";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";
import CTA from "../components/CTA";
import Reveal from "../components/Reveal";
import { getContent } from "../lib/cms/store";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "About — Power Moves" };

const STATS = [
  { k: "230 kV", l: "Highest rated voltage" },
  { k: "150 MVA", l: "Largest unit delivered" },
  { k: "27", l: "Active product lines" },
  { k: "3", l: "Third-party test labs" },
];
const VALUES = [
  { t: "Engineered locally", d: "A fully integrated plant in Yangon — from core lamination and winding to tanking, oil processing and high-voltage testing." },
  { t: "Internationally validated", d: "Type-tested by DEKRA, KERI and Tecnalia; registered to ISO 9001, 14001 and 45001." },
  { t: "Licensed technology", d: "Medium- and low-voltage switchgear assembled under an ABB license agreement." },
  { t: "Backed for decades", d: "After-sale field service, condition monitoring and a 24/7 emergency maintenance desk nationwide." },
];
const MD = [
  "Over the past decade we have grown from a regional workshop into a premier manufacturer of high-voltage power transformers and ABB-licensed switchgear — supplying the substations that carry electricity from generation to community.",
  "Our purpose is simple: to be the key to smart power. Every transformer that leaves our Yangon facility, from a compact distribution unit to a 230 kV / 150 MVA transmission machine, is engineered to the same international standards that govern the world's leading energy companies, and independently type-tested by DEKRA, KERI and Tecnalia.",
  "We believe local manufacturing should never mean local compromise. By combining licensed technology, rigorous in-house testing and a team of dedicated engineers, we deliver equipment that utilities, industries and partners can rely on for decades of continuous service.",
];

export default async function AboutPage() {
  const c = await getContent();
  return (
    <>
      <Nav nav={c.nav} brand={c.brand} />
      <main>
        <PageHeader eyebrow="About" title="The key to smart power." intro="Power Moves is a premier manufacturer of high-voltage power transformers and ABB-licensed switchgear — engineered, type-tested and supported from our Yangon facility under Asia General Holding." />

        {/* stats */}
        <section className="border-b border-line bg-paper">
          <div className="mx-auto max-w-[88rem] px-6 py-14">
            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-4">
              {STATS.map((s) => (
                <div key={s.l} className="bg-paper px-6 py-7">
                  <dt className="font-display text-3xl font-extrabold text-ink md:text-4xl">{s.k}</dt>
                  <dd className="mt-1 tech-label text-steel">{s.l}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* values */}
        <section className="border-b border-line bg-surface">
          <div className="mx-auto max-w-[88rem] px-6 py-20 md:py-24">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {VALUES.map((v, i) => (
                <Reveal key={v.t} delay={(i % 4) * 0.06}>
                  <div className="h-full rounded-lg border border-line bg-paper p-7">
                    <span className="font-mono-tech text-sm text-red">0{i + 1}</span>
                    <h3 className="mt-3 font-display text-lg font-bold text-ink">{v.t}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-graphite">{v.d}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* MD message */}
        <section id="md" className="scroll-mt-24 border-b border-line bg-ink text-white">
          <div className="mx-auto grid max-w-[88rem] gap-12 px-6 py-20 md:py-28 lg:grid-cols-[0.8fr_1.4fr] lg:items-start">
            <Reveal>
              <div className="flex items-center gap-3 tech-label text-red"><span className="h-px w-8 bg-red" />Leadership</div>
              <div className="mt-6 overflow-hidden rounded-lg border border-white/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/team/kmm.png" alt="Managing Director" className="aspect-[4/5] w-full max-w-xs object-cover object-top" />
              </div>
              <div className="mt-5"><div className="font-display text-xl font-bold">Khin Maung Myat</div><div className="tech-label text-white/50">Managing Director</div></div>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">A message from our Managing Director</h2>
              <div className="mt-6 space-y-5">
                {MD.map((p, i) => <p key={i} className={`leading-relaxed ${i === 0 ? "text-lg text-white/90" : "text-white/70"}`}>{p}</p>)}
              </div>
            </Reveal>
          </div>
        </section>

        {/* governance */}
        <section id="governance" className="scroll-mt-24 border-b border-line bg-paper">
          <div className="mx-auto max-w-[88rem] px-6 py-20">
            <div className="flex items-center gap-3 tech-label text-red"><span className="h-px w-8 bg-red" />Corporate governance</div>
            <h2 className="mt-4 max-w-2xl heading-mega text-[clamp(1.75rem,4vw,2.75rem)] text-ink">Standards we hold ourselves to.</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {[["Quality", "ISO 9001 quality management across manufacturing and testing."], ["Environment", "ISO 14001 environmental management throughout the plant."], ["Safety", "ISO 45001 occupational health & safety for every operation."]].map(([t, dd]) => (
                <div key={t} className="rounded-lg border border-line bg-surface p-7">
                  <h3 className="font-display text-lg font-bold text-ink">{t}</h3>
                  <p className="mt-2 text-sm text-graphite">{dd}</p>
                </div>
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
