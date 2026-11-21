import type { Metadata } from "next";
import { demoMetadata } from "@/lib/seo";
import ThemeProvider from "@/components/templates/ThemeProvider";
import { resolveDesign } from "@/components/templates/design";
import {
  gastronomiaDesigns,
  gastronomiaFonts,
  gastronomiaPrimaries,
  gastronomiaThemes,
} from "@/lib/templates/gastronomia";
import DisenoCarta from "@/components/templates/gastronomia/DisenoCarta";
import DisenoBodegon from "@/components/templates/gastronomia/DisenoBodegon";
import DisenoTaberna from "@/components/templates/gastronomia/DisenoTaberna";

export const metadata: Metadata = demoMetadata("gastronomía", "gastronomia");

// Cada diseño lee el mismo contenido (lib/templates/gastronomia.ts).
const designComponents = {
  "1": DisenoCarta,
  "2": DisenoBodegon,
  "3": DisenoTaberna,
} as const;

export default async function GastronomiaTemplatePage({
  searchParams,
}: {
  searchParams: Promise<{ diseno?: string | string[] }>;
}) {
  const { diseno } = await searchParams;
  const design = resolveDesign(gastronomiaDesigns, diseno);
  const Design = designComponents[design.id as keyof typeof designComponents];
  return (
    <ThemeProvider
      key={design.id}
      primaries={gastronomiaPrimaries}
      themes={gastronomiaThemes}
      fonts={gastronomiaFonts}
      designs={gastronomiaDesigns}
      design={design}
    >
      <Design />
    </ThemeProvider>
  );
}
