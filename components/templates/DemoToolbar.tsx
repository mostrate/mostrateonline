"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { TemplatePrimary, TemplateTheme } from "./theme";
import type { TemplateFont } from "./font";
import type { TemplateDesign } from "./design";

type Props = {
  primaries: TemplatePrimary[];
  activePrimaryId: string;
  onPrimary: (primary: TemplatePrimary) => void;
  themes: TemplateTheme[];
  activeThemeId: string;
  onTheme: (theme: TemplateTheme) => void;
  fonts: TemplateFont[];
  activeFontId: string;
  onFont: (font: TemplateFont) => void;
  designs?: TemplateDesign[];
  activeDesignId?: string;
};

/**
 * Barra de demo de Mostrate: flota sobre el template y agrupa todo lo que no
 * es del sitio del cliente — volver a Mostrate, diseño, tipografía, colores
 * (primario + secundario, combinables) y el llamado a contratar. Usa la identidad de la landing (oscuro + azul) para
 * que se lea como herramienta de Mostrate sobre cualquier template.
 * Desktop: barra abajo al centro, minimizable. Mobile: píldora que abre un
 * panel inferior.
 */
export default function DemoToolbar(props: Props) {
  const [open, setOpen] = useState(true); // desktop: barra expandida
  const [sheet, setSheet] = useState(false); // mobile: panel inferior
  const router = useRouter();
  const pathname = usePathname();

  const pickDesign = (id: string) => router.replace(`${pathname}?diseno=${id}`, { scroll: false });
  const hasDesigns = !!props.designs && props.designs.length > 1;

  const Wordmark = () => (
    <span className="font-[family-name:var(--font-syne)] text-[15px] font-extrabold tracking-[-0.03em] text-[#F0EEE9]">
      mos<span className="text-[#4F7FFF]">trate</span>
    </span>
  );

  /* ── Grupos de controles (se reutilizan en desktop y mobile) ── */
  const designs = hasDesigns && (
    <div className="flex items-center gap-1" role="group" aria-label="Diseño">
      {props.designs!.map((d) => {
        const active = d.id === props.activeDesignId;
        return (
          <button
            key={d.id}
            type="button"
            aria-pressed={active}
            onClick={() => pickDesign(d.id)}
            className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors ${
              active ? "bg-[#F0EEE9] text-[#0F1117]" : "text-[#F0EEE9]/70 hover:bg-white/10 hover:text-[#F0EEE9]"
            }`}
          >
            <span className={`text-[10px] font-bold ${active ? "text-[#4F7FFF]" : "text-[#F0EEE9]/40"}`}>{d.id}</span>
            {d.name}
          </button>
        );
      })}
    </div>
  );

  const fonts = (
    <div className="flex items-center gap-1" role="group" aria-label="Tipografía">
      {props.fonts.map((f) => {
        const active = f.id === props.activeFontId;
        return (
          <button
            key={f.id}
            type="button"
            title={f.name}
            aria-label={`Tipografía ${f.name}`}
            aria-pressed={active}
            onClick={() => props.onFont(f)}
            style={{ fontFamily: f.heading }}
            className={`h-8 w-8 rounded-lg text-[13px] transition-colors ${
              active ? "bg-[#F0EEE9] text-[#0F1117]" : "text-[#F0EEE9]/80 hover:bg-white/10"
            }`}
          >
            Aa
          </button>
        );
      })}
    </div>
  );

  const swatches = <T extends { id: string; name: string }>(
    items: T[],
    activeId: string,
    color: (item: T) => string,
    onPick: (item: T) => void,
    kind: string
  ) => (
    <div className="flex h-8 items-center gap-2 px-1" role="group" aria-label={kind}>
      {items.map((item) => {
        const active = item.id === activeId;
        return (
          <button
            key={item.id}
            type="button"
            title={`${kind}: ${item.name}`}
            aria-label={`${kind} ${item.name}`}
            aria-pressed={active}
            onClick={() => onPick(item)}
            style={{ backgroundColor: color(item) }}
            className={`h-5 w-5 rounded-full border border-white/25 transition-transform hover:scale-110 ${
              active ? "ring-2 ring-[#F0EEE9] ring-offset-2 ring-offset-[#0F1117]" : ""
            }`}
          />
        );
      })}
    </div>
  );

  const primaryColors = swatches(props.primaries, props.activePrimaryId, (p) => p.color, props.onPrimary, "Color primario");
  const secondaryColors = swatches(props.themes, props.activeThemeId, (t) => t.accent, props.onTheme, "Color secundario");

  const label = "text-[10px] font-semibold uppercase tracking-[0.14em] text-[#F0EEE9]/40";
  const divider = <span aria-hidden className="h-8 w-px bg-white/10" />;
  // Salir de la demo con recarga completa para descartar su estado.
  const cta = (
    // eslint-disable-next-line @next/next/no-html-link-for-pages
    <a
      href="/#contacto"
      className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg bg-[#4F7FFF] px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#6690FF]"
    >
      Quiero este template
      <span aria-hidden>→</span>
    </a>
  );
  const back = (
    <a href="/biblioteca-templates" className="group flex items-center gap-2 rounded-lg px-1.5 py-1 transition-colors hover:bg-white/5" title="Volver a la biblioteca de diseños" aria-label="Volver a la biblioteca de diseños">
      <span aria-hidden className="text-[#F0EEE9]/60 transition-transform group-hover:-translate-x-0.5">←</span>
      <Wordmark />
    </a>
  );
  const shell =
    "border border-white/10 bg-[#0F1117]/90 text-[#F0EEE9] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.6)] backdrop-blur-xl font-[family-name:var(--font-inter)]";

  return (
    <>
      {/* ── Desktop ── */}
      <div className="fixed bottom-4 left-1/2 z-[120] hidden -translate-x-1/2 md:block">
        {open ? (
          <div className={`${shell} flex items-center gap-3 rounded-2xl py-2 pl-2 pr-2`}>
            {back}
            {divider}
            {hasDesigns && (
              <>
                <div className="flex flex-col gap-0.5">
                  <span className={`${label} pl-1`}>Diseño</span>
                  {designs}
                </div>
                {divider}
              </>
            )}
            <div className="flex flex-col gap-0.5">
              <span className={`${label} pl-1`}>Tipografía</span>
              {fonts}
            </div>
            {divider}
            <div className="flex flex-col gap-0.5">
              <span className={`${label} pl-1`}>Primario</span>
              {primaryColors}
            </div>
            <div className="flex flex-col gap-0.5">
              <span className={`${label} pl-1`}>Secundario</span>
              {secondaryColors}
            </div>
            {divider}
            <span className="hidden lg:inline-flex">{cta}</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Minimizar barra de demo"
              title="Minimizar"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-[#F0EEE9]/60 transition-colors hover:bg-white/10 hover:text-[#F0EEE9]"
            >
              <span aria-hidden className="text-lg leading-none">–</span>
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setOpen(true)}
            className={`${shell} flex items-center gap-2.5 rounded-full py-2 pl-4 pr-3 text-xs`}
          >
            <Wordmark />
            <span className="text-[#F0EEE9]/70">Personalizar demo</span>
            <span aria-hidden className="text-[#4F7FFF]">＋</span>
          </button>
        )}
      </div>

      {/* ── Mobile ── */}
      <div className="md:hidden">
        {!sheet && (
          <button
            type="button"
            onClick={() => setSheet(true)}
            className={`${shell} fixed bottom-4 left-1/2 z-[120] flex -translate-x-1/2 items-center gap-2.5 rounded-full py-2.5 pl-4 pr-3.5 text-xs`}
          >
            <Wordmark />
            <span className="text-[#F0EEE9]/70">Personalizar demo</span>
            <span aria-hidden className="text-[#4F7FFF]">＋</span>
          </button>
        )}
        {sheet && (
          <>
            <button type="button" aria-label="Cerrar" onClick={() => setSheet(false)} className="fixed inset-0 z-[119] bg-black/40" />
            <div className={`${shell} fixed inset-x-2 bottom-2 z-[120] rounded-2xl p-4`}>
              <div className="mb-4 flex items-center justify-between">
                {back}
                <button type="button" onClick={() => setSheet(false)} aria-label="Cerrar panel" className="h-8 w-8 rounded-lg text-[#F0EEE9]/60 hover:bg-white/10">
                  ✕
                </button>
              </div>
              <div className="space-y-4">
                {hasDesigns && (
                  <div>
                    <span className={`${label} mb-1.5 block`}>Diseño</span>
                    <div className="flex flex-wrap">{designs}</div>
                  </div>
                )}
                <div>
                  <span className={`${label} mb-1.5 block`}>Tipografía</span>
                  {fonts}
                </div>
                <div className="flex gap-8">
                  <div>
                    <span className={`${label} mb-1 block`}>Primario</span>
                    {primaryColors}
                  </div>
                  <div>
                    <span className={`${label} mb-1 block`}>Secundario</span>
                    {secondaryColors}
                  </div>
                </div>
                <div className="[&>a]:flex [&>a]:w-full [&>a]:justify-center [&>a]:py-3">{cta}</div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
