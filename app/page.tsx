import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Capabilities from "./components/Capabilities";
import Stats from "./components/Stats";
import Products from "./components/Products";
import Process from "./components/Process";
import Industries from "./components/Industries";
import Standards from "./components/Standards";
import FAQ from "./components/FAQ";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Capabilities />
        <Stats />
        <Products />
        <Process />
        <Industries />
        <Standards />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
