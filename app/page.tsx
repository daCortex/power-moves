import Nav from "./components/Nav";
import Hero from "./components/Hero";
import CertStrip from "./components/CertStrip";
import Welcome from "./components/Welcome";
import EpcPanel from "./components/EpcPanel";
import Specs from "./components/Specs";
import Projects from "./components/Projects";
import MD from "./components/MD";
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
        <Hero data={c.hero} />
        <CertStrip data={c.certStrip} />
        <Welcome data={c.welcome} />
        <EpcPanel data={c.epc} />
        <Specs data={c.specs} />
        <Projects data={c.projects} />
        <MD data={c.md} />
        <CTA data={c.cta} />
      </main>
      <Footer footer={c.footer} contact={c.contact} brand={c.brand} />
    </>
  );
}
