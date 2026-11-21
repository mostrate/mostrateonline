import type { Metadata } from "next";
import { demoMetadata } from "@/lib/seo";
import ThemeProvider from "@/components/templates/ThemeProvider";
import { resolveDesign } from "@/components/templates/design";
import {
  profesionalDesigns,
  profesionalFonts,
  profesionalPrimaries,
  profesionalThemes,
} from "@/lib/templates/profesional";
import DisenoClasico from "@/components/templates/profesional/DisenoClasico";
import DisenoTecnico from "@/components/templates/profesional/DisenoTecnico";
import DisenoBoutique from "@/components/templates/profesional/DisenoBoutique";

export const metadata: Metadata = demoMetadata("profesionales", "profesional");

// Cada diseño lee el mismo contenido (lib/templates/profesional.ts).
const designComponents = {
  "1": DisenoClasico,
  "2": DisenoTecnico,
  "3": DisenoBoutique,
} as const;

export default async function ProfesionalTemplatePage({
  searchParams,
}: {
  searchParams: Promise<{ diseno?: string | string[] }>;
}) {
  const { diseno } = await searchParams;
  const design = resolveDesign(profesionalDesigns, diseno);
  const Design = designComponents[design.id as keyof typeof designComponents];

  return (
    <ThemeProvider
      key={design.id}
      primaries={profesionalPrimaries}
      themes={profesionalThemes}
      fonts={profesionalFonts}
      designs={profesionalDesigns}
      design={design}
    >
      <Design />
    </ThemeProvider>
  );
}
