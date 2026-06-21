import type { Metadata } from "next";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Specs from "../components/Specs";
import Standards from "../components/Standards";
import CTA from "../components/CTA";
import { getContent } from "../lib/cms/store";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Specifications & Standards — Power Moves" };

export default async function SpecificationsPage() {
  const c = await getContent();
  return (
    <>
      <Nav nav={c.nav} brand={c.brand} />
      <main className="pt-20">
        <Specs data={c.specs} />
        <Standards data={c.standards} />
        <CTA data={c.cta} />
      </main>
      <Footer footer={c.footer} contact={c.contact} brand={c.brand} />
    </>
  );
}
