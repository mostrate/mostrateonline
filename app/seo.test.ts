import { describe, expect, it } from "vitest";
import robots from "./robots";
import sitemap from "./sitemap";
import { site, templates } from "@/lib/config";
import { demoMetadata } from "@/lib/seo";

describe("base de búsqueda", () => {
  it("incluye las páginas públicas y las demos en el sitemap", () => {
    const urls = sitemap().map(({ url }) => url);
    expect(urls).toEqual([
      `${site.url}/`,
      `${site.url}/biblioteca-templates`,
      ...templates.items.map(({ slug }) => `${site.url}/templates/${slug}`),
    ]);
  });

  it("distingue los rastreadores de entrenamiento y búsqueda", () => {
    expect(robots()).toEqual({
      rules: [
        { userAgent: "*", allow: "/" },
        { userAgent: "GPTBot", disallow: "/" },
        { userAgent: "OAI-SearchBot", allow: "/" },
        { userAgent: "ClaudeBot", disallow: "/" },
        { userAgent: "Claude-SearchBot", allow: "/" },
        { userAgent: "Claude-User", allow: "/" },
        { userAgent: "Google-Extended", allow: "/" },
      ],
      sitemap: `${site.url}/sitemap.xml`,
    });
  });

  it("identifica cada demo como modelo y consolida sus variantes de diseño", () => {
    const metadata = demoMetadata("comercios", "comercio");
    expect(metadata.title).toBe("Modelo de página web para comercios | Mostrate");
    expect(metadata.description).toContain("demostración");
    expect(metadata.alternates?.canonical).toBe("/templates/comercio");
    expect(metadata.openGraph).toMatchObject({
      url: "/templates/comercio",
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    });
  });
});
