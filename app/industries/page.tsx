import type { Metadata } from "next";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Industries from "../components/Industries";
import CTA from "../components/CTA";
import { getContent } from "../lib/cms/store";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Industries — Power Moves" };

export default async function IndustriesPage() {
  const c = await getContent();
  return (
    <>
      <Nav nav={c.nav} brand={c.brand} />
      <main className="pt-20">
        <Industries data={c.industries} />
        <CTA data={c.cta} />
      </main>
      <Footer footer={c.footer} contact={c.contact} brand={c.brand} />
    </>
  );
}
