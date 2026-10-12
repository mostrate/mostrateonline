import Image from "next/image";
import { hero } from "@/lib/config";

/** Composición visual de la portada a partir de previews reales de Mostrate. */
export default function HeroPreview() {
  return (
    <aside className="relative hidden min-h-[440px] lg:block" aria-label="Vista previa de una página creada con Mostrate">
      <div aria-hidden="true" className="absolute left-[18%] top-[12%] h-[58%] w-[58%] rounded-full bg-accent/20 blur-[90px] motion-safe:animate-hero-glow" />

      <div className="relative mx-auto h-[440px] max-w-[570px] xl:h-[500px]">
        <div className="absolute inset-x-[5%] top-[5%] overflow-hidden rounded-2xl border border-white/15 bg-surface p-2 shadow-[0_35px_100px_-32px_rgba(0,0,0,0.95)] motion-safe:animate-hero-float">
          <div className="flex items-center gap-2 border-b border-line px-2 pb-2.5 pt-0.5">
            <span className="h-2 w-2 rounded-full bg-[#FF5F57]/80" />
            <span className="h-2 w-2 rounded-full bg-[#FEBC2E]/80" />
            <span className="h-2 w-2 rounded-full bg-[#28C840]/80" />
            <span className="ml-2 flex-1 rounded-full bg-bg px-3 py-1 text-center text-[0.6rem] text-muted">
              {hero.preview.label.toLowerCase()}
            </span>
          </div>
          <div className="relative aspect-[1.34] overflow-hidden rounded-[0.7rem]">
            <Image
              src="/previews/profesional.webp"
              alt="Vista previa de una página profesional"
              fill
              sizes="(min-width: 1280px) 480px, 42vw"
              className="object-cover object-top"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-tr from-bg/40 via-transparent to-accent/10" />
          </div>
        </div>

        <div className="absolute -left-[2%] bottom-[8%] z-10 w-[43%] rounded-xl border border-white/15 bg-bg/90 p-4 shadow-[0_22px_55px_-24px_rgba(0,0,0,0.95)] backdrop-blur motion-safe:animate-hero-drift">
          <span className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-accent">{hero.preview.detail}</span>
          <div className="mt-4 h-px w-full bg-line" />
          <div className="mt-3 flex items-end justify-between">
            <span className="font-syne text-[clamp(1.1rem,1.8vw,1.5rem)] font-bold leading-none tracking-[-0.04em]">{hero.preview.identity}</span>
            <span className="h-2 w-2 rounded-full bg-accent shadow-[0_0_14px_rgba(79,127,255,1)]" />
          </div>
        </div>

        <div className="absolute -right-[2%] bottom-[1%] z-20 w-[28%] overflow-hidden rounded-[1.6rem] border-[5px] border-[#090B10] bg-[#090B10] shadow-[0_28px_60px_-24px_rgba(0,0,0,1)] motion-safe:animate-hero-float-delayed">
          <div className="relative aspect-[0.54] overflow-hidden rounded-[1.25rem]">
            <Image
              src="/previews/comercio.webp"
              alt="Vista mobile de una página de comercio"
              fill
              sizes="(min-width: 1280px) 160px, 15vw"
              className="object-cover object-top"
            />
          </div>
        </div>

        <div className="absolute right-[7%] top-[1%] z-20 rounded-full border border-accent/40 bg-accent/15 px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-[#B7C8FF] backdrop-blur motion-safe:animate-hero-drift">
          {hero.preview.label}
        </div>
      </div>
    </aside>
  );
}
