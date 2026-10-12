import type { Metadata } from "next";
import Link from "next/link";
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
        <div className="mx-auto max-w-shell px-[clamp(20px,4vw,60px)] pt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[0.85rem] font-semibold text-muted transition-colors hover:text-accent"
          >
            <span aria-hidden="true">←</span>
            {library.backToHome}
          </Link>
        </div>
        <Templates />
      </main>
      <Footer />
    </>
  );
}
