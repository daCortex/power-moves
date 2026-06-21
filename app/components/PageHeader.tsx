import Reveal from "./Reveal";

export default function PageHeader({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-soft pt-28 pb-14 md:pt-32 md:pb-20">
      <div className="pointer-events-none absolute inset-0"><div className="absolute inset-0 bg-grid bg-grid-fade" /></div>
      <div className="relative mx-auto max-w-[88rem] px-6">
        <Reveal>
          <div className="flex items-center gap-3 tech-label text-red">
            <span className="h-px w-8 bg-red" />{eyebrow}
          </div>
          <h1 className="mt-4 max-w-3xl heading-mega text-[clamp(2.25rem,5.5vw,4rem)] text-ink">{title}</h1>
          {intro && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-graphite">{intro}</p>}
        </Reveal>
      </div>
    </section>
  );
}
