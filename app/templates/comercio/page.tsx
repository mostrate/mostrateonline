import type { Metadata } from "next";
import { demoMetadata } from "@/lib/seo";
import ThemeProvider from "@/components/templates/ThemeProvider";
import { resolveDesign } from "@/components/templates/design";
import {
  comercioDesigns,
  comercioFonts,
  comercioPrimaries,
  comercioThemes,
} from "@/lib/templates/comercio";
import DisenoEditorial from "@/components/templates/comercio/DisenoEditorial";
import DisenoPop from "@/components/templates/comercio/DisenoPop";
import DisenoGaleria from "@/components/templates/comercio/DisenoGaleria";

export const metadata: Metadata = demoMetadata("comercios", "comercio");

// Cada diseño lee el mismo contenido (lib/templates/comercio.ts).
const designComponents = {
  "1": DisenoEditorial,
  "2": DisenoPop,
  "3": DisenoGaleria,
} as const;

export default async function ComercioTemplatePage({
  searchParams,
}: {
  searchParams: Promise<{ diseno?: string | string[] }>;
}) {
  const { diseno } = await searchParams;
  const design = resolveDesign(comercioDesigns, diseno);
  const Design = designComponents[design.id as keyof typeof designComponents];
  return (
    <ThemeProvider
      key={design.id}
      primaries={comercioPrimaries}
      themes={comercioThemes}
      fonts={comercioFonts}
      designs={comercioDesigns}
      design={design}
    >
      <Design />
    </ThemeProvider>
  );
}
