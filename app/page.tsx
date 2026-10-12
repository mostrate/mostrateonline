import Ambient from "@/components/landing/Ambient";
import Nav from "@/components/landing/Nav";
import Hero from "@/components/landing/Hero";
import Servicios from "@/components/landing/Servicios";
import ComoTrabajamos from "@/components/landing/ComoTrabajamos";
import Precios from "@/components/landing/Precios";
import Demos from "@/components/landing/Demos";
import FAQ from "@/components/landing/FAQ";
import Contacto from "@/components/landing/Contacto";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <>
      <Ambient />
      <Nav />
      <main>
        <Hero />
        <Servicios />
        <Demos />
        <ComoTrabajamos />
        <Precios />
        <FAQ />
        <Contacto />
      </main>
      <Footer />
    </>
  );
}
