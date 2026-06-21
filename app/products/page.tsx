import type { Metadata } from "next";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";
import Products from "../components/Products";
import Specs from "../components/Specs";
import CTA from "../components/CTA";
import { getContent } from "../lib/cms/store";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Products — Power Moves" };

export default async function ProductsPage() {
  const c = await getContent();
  return (
    <>
      <Nav nav={c.nav} brand={c.brand} />
      <main>
        <PageHeader eyebrow="Products" title="The complete equipment catalog." intro="Transformers, ABB-licensed panels and ancillary apparatus — request specifications inline from any unit." />
        <Products data={c.products} />
        <Specs data={c.specs} />
        <CTA data={c.cta} />
      </main>
      <Footer footer={c.footer} contact={c.contact} brand={c.brand} />
    </>
  );
}
