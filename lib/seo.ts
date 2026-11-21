import type { Metadata } from "next";

export function demoMetadata(audience: string, slug: string): Metadata {
  const title = `Modelo de página web para ${audience} | Mostrate`;
  const description = `Explorá una demostración de página web para ${audience}. Conocé los diseños personalizables de Mostrate.`;
  const url = `/templates/${slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      locale: "es_AR",
      type: "website",
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Mostrate: páginas web para negocios" }],
    },
  };
}
