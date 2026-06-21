import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Capabilities from "./components/Capabilities";
import EpcPanel from "./components/EpcPanel";
import Products from "./components/Products";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import { getContent } from "./lib/cms/store";

export const dynamic = "force-dynamic";

export default async function Home() {
  const c = await getContent();
  return (
    <>
      <Nav nav={c.nav} brand={c.brand} />
      <main>
        {/* Home: 5 sections — Hero · Capabilities · EPC Anatomy · Products · CTA */}
        <Hero data={c.hero} />
        <Marquee items={c.marquee} />
        <Capabilities data={c.capabilities} />
        <EpcPanel data={c.epc} />
        <Products data={c.products} />
        <CTA data={c.cta} />
      </main>
      <Footer footer={c.footer} contact={c.contact} brand={c.brand} />
    </>
  );
}
