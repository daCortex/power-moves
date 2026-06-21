import type { Metadata } from "next";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import FAQ from "../components/FAQ";
import CTA from "../components/CTA";
import { getContent } from "../lib/cms/store";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "FAQ — Power Moves" };

export default async function FaqPage() {
  const c = await getContent();
  return (
    <>
      <Nav nav={c.nav} brand={c.brand} />
      <main className="pt-20">
        <FAQ data={c.faq} />
        <CTA data={c.cta} />
      </main>
      <Footer footer={c.footer} contact={c.contact} brand={c.brand} />
    </>
  );
}
