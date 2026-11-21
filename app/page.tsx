import type { Metadata } from "next";
import Ambient from "@/components/landing/Ambient";
import Nav from "@/components/landing/Nav";
import Hero from "@/components/landing/Hero";
import Servicios from "@/components/landing/Servicios";
import ComoTrabajamos from "@/components/landing/ComoTrabajamos";
import Precios from "@/components/landing/Precios";
import FAQ from "@/components/landing/FAQ";
import Contacto from "@/components/landing/Contacto";
import Footer from "@/components/landing/Footer";
import { site } from "@/lib/config";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization).replace(/</g, "\\u003c") }}
      />
      <Ambient />
      <Nav />
      <main>
        <Hero />
        <Servicios />
        <ComoTrabajamos />
        <Precios />
        <FAQ />
        <Contacto />
      </main>
      <Footer />
    </>
  );
}
