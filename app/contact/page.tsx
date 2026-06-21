import type { Metadata } from "next";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";
import ContactForm from "../components/ContactForm";
import Reveal from "../components/Reveal";
import { getContent } from "../lib/cms/store";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Contact — Power Moves" };

export default async function ContactPage() {
  const c = await getContent();
  const { contact } = c;
  return (
    <>
      <Nav nav={c.nav} brand={c.brand} />
      <main>
        <PageHeader eyebrow="Contact" title="Get in touch." intro="Reach our commercial desk, request a quotation, or arrange a showroom visit. We respond within two business days." />
        <section id="address" className="scroll-mt-24 bg-paper">
          <div className="mx-auto grid max-w-[88rem] gap-10 px-6 py-20 lg:grid-cols-[0.9fr_1.1fr]">
            <Reveal>
              <div className="space-y-4">
                <div className="rounded-lg border border-line bg-surface p-6">
                  <div className="tech-label text-steel">Address</div>
                  <div className="mt-2 text-sm leading-relaxed text-ink">{contact.address}</div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-lg border border-line bg-surface p-6">
                    <div className="tech-label text-steel">Phone</div>
                    <div className="mt-2 space-y-1 font-mono-tech text-sm text-ink">{contact.phones.map((p) => <div key={p}>{p}</div>)}</div>
                  </div>
                  <div className="rounded-lg border border-line bg-surface p-6">
                    <div className="tech-label text-steel">E-mail</div>
                    <div className="mt-2 space-y-1 break-all font-mono-tech text-xs text-ink">{contact.emails.map((e) => <div key={e}>{e}</div>)}</div>
                  </div>
                </div>
                <div className="rounded-lg border border-line bg-ink p-6 text-paper">
                  <div className="tech-label text-paper/60">Hours</div>
                  <div className="mt-2 text-sm">Mon–Sat · 9:00–17:00 · {contact.location}</div>
                  <div className="mt-1 tech-label text-red">24 / 7 emergency desk</div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <ContactForm to={contact.emails[0] ?? ""} />
            </Reveal>
          </div>
        </section>
      </main>
      <Footer footer={c.footer} contact={c.contact} brand={c.brand} />
    </>
  );
}
