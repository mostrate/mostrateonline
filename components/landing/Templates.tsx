import Image from "next/image";
import Link from "next/link";
import { templates } from "@/lib/config";
import SectionHeader from "./SectionHeader";
import Tilt from "./Tilt";
import Button from "./Button";

/**
 * Galería escalonada de los 4 templates. Las imágenes son capturas reales de
 * cada demo (public/previews/<slug>.webp, ver DOCS.md §5 para regenerarlas).
 */
export default function Templates({ backLabel }: { backLabel: string }) {
  return (
    <section id="templates">
      <div className="mx-auto max-w-shell px-[clamp(20px,4vw,60px)] pb-[clamp(64px,8vw,112px)] pt-6">
        <div className="mb-[clamp(32px,4vw,48px)]">
          <Button href="/" variant="outline" size="sm" className="mb-7">{backLabel}</Button>
          <SectionHeader as="h1" label={templates.label} title={templates.title} subtitle={templates.subtitle} />
        </div>

        <div className="grid gap-x-[clamp(24px,4vw,64px)] gap-y-[clamp(48px,6vw,80px)] md:grid-cols-2">
          {templates.items.map((tpl, i) => (
            <Link
              key={tpl.slug}
              href={`/templates/${tpl.slug}`}
              className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
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
                    <h2 className="font-syne text-[clamp(1.5rem,2.4vw,2.2rem)] font-extrabold leading-none tracking-[-0.03em]">
                      {tpl.name}
                    </h2>
                    <span className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-muted">
                      {tpl.tag}
                    </span>
                  </div>
                  <p className="mt-2 text-[0.95rem] text-muted">{tpl.desc}</p>
                  <span className="mt-4 inline-flex min-h-11 items-center justify-center rounded-lg border border-line px-5 py-2.5 text-center text-sm font-semibold text-content transition-colors group-hover:border-content/30 group-hover:bg-white/[0.05]">
                    {templates.cta}
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
