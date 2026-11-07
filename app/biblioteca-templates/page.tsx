import type { Metadata } from "next";
import Ambient from "@/components/landing/Ambient";
import Footer from "@/components/landing/Footer";
import Nav from "@/components/landing/Nav";
import Templates from "@/components/landing/Templates";
import { library } from "@/lib/config";

export const metadata: Metadata = {
  title: "Biblioteca de templates | Mostrate",
  description: "Explorá los puntos de partida disponibles para tu página web.",
};

export default function BibliotecaTemplatesPage() {
  return (
    <>
      <Ambient />
      <Nav />
      <main className="pt-16">
        <Templates backLabel={library.backToHome} />
      </main>
      <Footer />
    </>
  );
}
