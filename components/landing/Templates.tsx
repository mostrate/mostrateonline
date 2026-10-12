import Image from "next/image";
import Link from "next/link";
import { templates } from "@/lib/config";
import SectionHeader from "./SectionHeader";
import Tilt from "./Tilt";
import { ArrowRightIcon } from "./Icons";

/**
 * Galería escalonada de los 4 templates. Las imágenes son capturas reales de
 * cada demo (public/previews/<slug>.webp, ver DOCS.md §5 para regenerarlas).
 */
export default function Templates() {
  return (
    <section id="templates" className="border-t border-line">
      <div className="mx-auto max-w-shell px-[clamp(20px,4vw,60px)] py-[clamp(64px,8vw,112px)]">
        <div className="mb-[clamp(40px,5vw,64px)] flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeader label={templates.label} title={templates.title} />
          <p className="max-w-[380px] text-[clamp(0.95rem,1.2vw,1.05rem)] leading-[1.7] text-muted lg:text-right">
            {templates.subtitle}
          </p>
        </div>

        <div className="grid gap-x-[clamp(24px,4vw,64px)] gap-y-[clamp(48px,6vw,80px)] md:grid-cols-2">
          {templates.items.map((tpl, i) => (
            <Link
              key={tpl.slug}
              href={`/templates/${tpl.slug}`}
              className={`group block ${i % 2 === 1 ? "md:mt-[clamp(80px,12vw,180px)]" : ""}`}
            >
              <Tilt>
                <div className="overflow-hidden rounded-lg border border-line bg-surface shadow-[0_40px_100px_-50px_rgba(0,0,0,0.9)] transition-colors group-hover:border-accent/60">
                  <div className="flex items-center gap-1.5 border-b border-line px-3.5 py-2.5" aria-hidden="true">
                    <span className="h-2 w-2 rounded-full bg-white/15" />
                    <span className="h-2 w-2 rounded-full bg-white/15" />
                    <span className="h-2 w-2 rounded-full bg-white/15" />
                  </div>
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={`/previews/${tpl.slug}.webp`}
                      alt={`Vista del template ${tpl.name}`}
                      fill
                      sizes="(min-width: 768px) 45vw, 92vw"
                      className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                  </div>
                </div>
              </Tilt>

              <div className="mt-6 flex items-start gap-5">
                <span className="font-dmsans text-[clamp(2.2rem,3.6vw,3rem)] font-medium italic leading-[0.8] text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="font-syne text-[clamp(1.5rem,2.4vw,2.2rem)] font-extrabold leading-none tracking-[-0.03em]">
                      {tpl.name}
                    </h3>
                    <span className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-muted">
                      {tpl.tag}
                    </span>
                  </div>
                  <p className="mt-2 text-[0.95rem] text-muted">{tpl.desc}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-[0.85rem] font-semibold text-content transition-colors group-hover:text-accent">
                    {templates.cta}
                    <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
