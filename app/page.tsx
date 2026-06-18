import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Stats from "./components/Stats";
import Services from "./components/Services";
import Products from "./components/Products";
import Industries from "./components/Industries";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Stats />
        <Services />
        <Products />
        <Industries />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
