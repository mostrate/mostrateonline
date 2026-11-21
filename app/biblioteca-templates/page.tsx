import type { Metadata } from "next";
import Ambient from "@/components/landing/Ambient";
import Footer from "@/components/landing/Footer";
import Nav from "@/components/landing/Nav";
import Templates from "@/components/landing/Templates";

export const metadata: Metadata = {
  title: "Biblioteca de plantillas | Mostrate",
  description: "Explorá los puntos de partida disponibles para tu página web.",
  alternates: { canonical: "/biblioteca-templates" },
  openGraph: {
    title: "Biblioteca de plantillas | Mostrate",
    description: "Explorá los puntos de partida disponibles para tu página web.",
    url: "/biblioteca-templates",
    locale: "es_AR",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Mostrate: páginas web para negocios" }],
  },
};

export default function BibliotecaTemplatesPage() {
  return (
    <>
      <Ambient />
      <Nav />
      <main className="pt-16">
        <Templates />
      </main>
      <Footer />
    </>
  );
}
