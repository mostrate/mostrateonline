import Image from "next/image";
import { hero, templates } from "@/lib/config";

const previewItems = templates.items.slice(0, 3);
const delays = ["0s", "-6s", "-12s"];

/** Vidriera de portada: alterna previews reales sin sumar interacción ni peso de JS. */
export default function HeroPreview() {
  return (
    <aside
      className="relative hidden min-h-[440px] lg:block"
      aria-label="Previsualización de los diseños disponibles en Mostrate"
    >
      <div
        aria-hidden="true"
        className="absolute left-[12%] top-[4%] h-[68%] w-[68%] rounded-full bg-accent/20 blur-[100px] motion-safe:animate-hero-glow"
      />

      <div className="relative mx-auto h-[450px] max-w-[600px] xl:h-[510px]">
        <div className="absolute inset-x-[2%] top-[6%] overflow-hidden rounded-[1.25rem] border border-white/15 bg-surface p-2 shadow-[0_45px_120px_-38px_rgba(0,0,0,0.98)] motion-safe:animate-hero-float">
          <div className="flex items-center gap-2 border-b border-line px-2 pb-2.5 pt-0.5">
            <div className="flex gap-1.5" aria-hidden="true">
              <span className="h-2 w-2 rounded-full bg-[#FF5F57]/80" />
              <span className="h-2 w-2 rounded-full bg-[#FEBC2E]/80" />
              <span className="h-2 w-2 rounded-full bg-[#28C840]/80" />
            </div>
            <span className="ml-1 flex-1 truncate rounded-full bg-bg px-3 py-1 text-center text-[0.6rem] text-muted">
              {hero.preview.address}
            </span>
            <span className="h-2 w-2 rounded-full bg-accent shadow-[0_0_16px_rgba(79,127,255,1)] motion-safe:animate-pulse" />
          </div>

          <div className="relative aspect-[1.34] overflow-hidden rounded-[0.85rem] bg-bg">
            {previewItems.map((item, index) => (
              <div
                key={item.slug}
                aria-hidden="true"
                className="absolute inset-0 motion-safe:animate-hero-carousel"
                style={{ animationDelay: delays[index] }}
              >
                <Image
                  src={`/previews/${item.slug}.webp`}
                  alt=""
                  fill
                  sizes="(min-width: 1280px) 520px, 43vw"
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg/45 via-transparent to-transparent" />
              </div>
            ))}
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/60 motion-safe:animate-hero-scan" />
          </div>
        </div>

        <div className="absolute -left-[3%] bottom-[11%] z-20 overflow-hidden rounded-xl border border-white/15 bg-bg/90 px-4 py-3 shadow-[0_24px_58px_-24px_rgba(0,0,0,1)] backdrop-blur">
          <p className="text-[0.62rem] font-semibold uppercase tracking-[0.15em] text-accent">{hero.preview.label}</p>
          <div className="relative mt-1.5 h-5 min-w-[150px] overflow-hidden">
            {previewItems.map((item, index) => (
              <span
                key={item.slug}
                aria-hidden="true"
                className="absolute inset-0 font-syne text-[1.05rem] font-bold leading-5 tracking-[-0.03em] motion-safe:animate-hero-carousel"
                style={{ animationDelay: delays[index] }}
              >
                {item.name}
              </span>
            ))}
          </div>
        </div>

        <div className="absolute -right-[1%] bottom-[1%] z-20 w-[29%] overflow-hidden rounded-[1.8rem] border-[5px] border-[#090B10] bg-[#090B10] shadow-[0_32px_70px_-26px_rgba(0,0,0,1)] motion-safe:animate-hero-float-delayed">
          <div className="relative aspect-[0.54] overflow-hidden rounded-[1.4rem] bg-bg">
            {previewItems.map((item, index) => (
              <div
                key={item.slug}
                aria-hidden="true"
                className="absolute inset-0 motion-safe:animate-hero-carousel"
                style={{ animationDelay: delays[index] }}
              >
                <Image
                  src={`/previews/${item.slug}.webp`}
                  alt=""
                  fill
                  sizes="(min-width: 1280px) 175px, 15vw"
                  className="object-cover object-top"
                />
              </div>
            ))}
          </div>
        </div>

        <div aria-hidden="true" className="absolute right-[9%] top-[1%] z-20 flex gap-1.5 rounded-full border border-white/15 bg-bg/80 px-3 py-2 backdrop-blur">
          {previewItems.map((item, index) => (
            <span
              key={item.slug}
              className="h-1.5 w-1.5 rounded-full bg-accent motion-safe:animate-hero-dot"
              style={{ animationDelay: delays[index] }}
            />
          ))}
        </div>
      </div>
    </aside>
  );
}
