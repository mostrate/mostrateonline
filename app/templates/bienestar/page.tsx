import type { Metadata } from "next";
import { demoMetadata } from "@/lib/seo";
import ThemeProvider from "@/components/templates/ThemeProvider";
import { resolveDesign } from "@/components/templates/design";
import {
  bienestarDesigns,
  bienestarFonts,
  bienestarPrimaries,
  bienestarThemes,
} from "@/lib/templates/bienestar";
import DisenoNucleo from "@/components/templates/bienestar/DisenoNucleo";
import DisenoCalma from "@/components/templates/bienestar/DisenoCalma";
import DisenoDeportivo from "@/components/templates/bienestar/DisenoDeportivo";

export const metadata: Metadata = demoMetadata("bienestar", "bienestar");

// Cada diseño lee el mismo contenido (lib/templates/bienestar.ts).
const designComponents = {
  "1": DisenoNucleo,
  "2": DisenoCalma,
  "3": DisenoDeportivo,
} as const;

export default async function BienestarTemplatePage({
  searchParams,
}: {
  searchParams: Promise<{ diseno?: string | string[] }>;
}) {
  const { diseno } = await searchParams;
  const design = resolveDesign(bienestarDesigns, diseno);
  const Design = designComponents[design.id as keyof typeof designComponents];
  return (
    <ThemeProvider
      key={design.id}
      primaries={bienestarPrimaries}
      themes={bienestarThemes}
      fonts={bienestarFonts}
      designs={bienestarDesigns}
      design={design}
    >
      <Design />
    </ThemeProvider>
  );
}
