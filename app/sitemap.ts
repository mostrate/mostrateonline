import type { MetadataRoute } from "next";
import { site, templates } from "@/lib/config";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${site.url}/` },
    { url: `${site.url}/biblioteca-templates` },
    ...templates.items.map(({ slug }) => ({ url: `${site.url}/templates/${slug}` })),
  ];
}
