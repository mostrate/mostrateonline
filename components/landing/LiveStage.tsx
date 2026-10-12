"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { contact, demos, templates } from "@/lib/config";
import { ArrowRightIcon } from "./Icons";

const ROTATE_MS = 7000;
// Dominio del sitio (derivado del email de contacto) para la barra del browser.
const domain = contact.email.split("@")[1];

/**
 * Iframe de un template renderizado a tamaño real (baseWidth × baseHeight) y
 * escalado para entrar en su contenedor. Mientras carga, un boceto en gris
 * lo tapa: el sitio "se arma" delante del visitante.
 */
function ScaledFrame({
  src,
  baseWidth,
  baseHeight,
  title,
}: {
  src: string;
  baseWidth: number;
  baseHeight: number;
  title: string;
}) {
  const box = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setScale(entry.contentRect.width / baseWidth);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [baseWidth]);

  // Cada cambio de template vuelve a mostrar el boceto hasta que carga.
  useEffect(() => setLoaded(false), [src]);

  return (
    <div
      ref={box}
      className="relative w-full overflow-hidden bg-white"
      style={{ aspectRatio: `${baseWidth} / ${baseHeight}` }}
    >
      {scale > 0 && (
        <iframe
          key={src}
          src={src}
          title={title}
          onLoad={() => setLoaded(true)}
          className="absolute left-0 top-0 origin-top-left border-0"
          style={{ width: baseWidth, height: baseHeight, transform: `scale(${scale})` }}
        />
      )}
      <Sketch visible={!loaded} />
    </div>
  );
}

/** Boceto de wireframe que tapa el iframe mientras carga. */
function Sketch({ visible }: { visible: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 flex flex-col gap-[6%] bg-[#E9E7E2] p-[7%] transition-opacity duration-700 ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="h-[1.2em] w-[18%] bg-black/15" />
        <span className="h-[0.8em] w-[34%] bg-black/10" />
      </div>
      <div className="flex flex-1 gap-[6%]">
        <div className="flex flex-1 flex-col justify-center gap-[0.9em]">
          <span className="h-[0.6em] w-[30%] bg-black/15" />
          <span className="h-[2.2em] w-[90%] bg-black/20" />
          <span className="h-[2.2em] w-[70%] bg-black/20" />
          <span className="mt-2 h-[0.7em] w-[80%] bg-black/10" />
          <span className="h-[0.7em] w-[60%] bg-black/10" />
          <span className="mt-3 h-[2em] w-[35%] bg-black/25" />
        </div>
        <div className="hidden flex-1 border-2 border-dashed border-black/15 sm:block" />
      </div>
    </div>
  );
}

export default function LiveStage() {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const tpl = templates.items[active];
  const src = `/templates/${tpl.slug}`;

  // Rota solo hasta que el visitante elige un rubro (y nunca con reduced-motion).
  useEffect(() => {
    if (!auto) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(
      () => setActive((i) => (i + 1) % templates.items.length),
      ROTATE_MS
    );
    return () => clearInterval(id);
  }, [auto]);

  const pick = useCallback((i: number) => {
    setAuto(false);
    setActive(i);
  }, []);

  return (
    <div>
      {/* Selector de rubro */}
      <div className="mb-5">
        <div role="tablist" aria-label="Rubros" className="flex flex-wrap gap-x-1 gap-y-2">
          {templates.items.map((item, i) => (
            <button
              key={item.slug}
              type="button"
              role="tab"
              aria-selected={i === active}
              onClick={() => pick(i)}
              className={`group relative px-3 py-2 font-syne text-[0.95rem] font-bold transition-colors ${
                i === active ? "text-content" : "text-muted hover:text-content"
              }`}
            >
              <span className="mr-1.5 font-inter text-[0.65rem] font-medium text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              {item.name}
              <span
                className={`absolute inset-x-3 -bottom-px h-px origin-left bg-accent transition-transform duration-500 ${
                  i === active ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Escenario: compu + celular superpuestos */}
      <div className="relative pb-[6%] md:pr-[12%]">
        {/* Compu (desde tablet) */}
        <div className="hidden overflow-hidden rounded-lg border border-line bg-surface shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)] md:block">
          <div className="flex items-center gap-3 border-b border-line px-4 py-2.5">
            <div className="flex gap-1.5" aria-hidden="true">
              <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]/80" />
            </div>
            <span className="flex-1 truncate rounded bg-bg/60 px-3 py-1 text-center text-[0.72rem] text-muted">
              {`${domain}${src}`}
            </span>
            <a
              href="/biblioteca-templates"
              className="rounded bg-accent px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-white shadow-[0_6px_16px_-7px_rgba(79,127,255,0.9)] transition-[background-color,box-shadow,transform] duration-300 hover:bg-[#6690FF] hover:shadow-[0_8px_20px_-7px_rgba(79,127,255,1)] hover:-translate-y-px"
            >
              {demos.library}
            </a>
          </div>
          <ScaledFrame src={src} baseWidth={1440} baseHeight={860} title={`Template ${tpl.name}`} />
        </div>

        {/* Celular: superpuesto en desktop, protagonista en mobile */}
        <div className="mx-auto w-[min(78vw,300px)] md:absolute md:bottom-0 md:right-0 md:w-[22%] md:min-w-[190px]">
          <div className="rounded-[2rem] border border-white/15 bg-[#07080B] p-2 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)]">
            <div className="overflow-hidden rounded-[1.5rem]">
              <ScaledFrame src={src} baseWidth={390} baseHeight={800} title={`Template ${tpl.name} en celular`} />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
        <a
          href={src}
          className="group inline-flex items-center gap-2 text-[0.8rem] font-semibold text-content transition-colors hover:text-accent"
        >
          {demos.openDemo} {tpl.name}
          <ArrowRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </a>
        <a
          href="/biblioteca-templates"
          className="group inline-flex items-center gap-2 text-[0.8rem] font-semibold text-content transition-colors hover:text-accent"
        >
          {demos.library}
          <ArrowRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </a>
      </div>

    </div>
  );
}
