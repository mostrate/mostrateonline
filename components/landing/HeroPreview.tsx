"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { hero, templates } from "@/lib/config";

export default function HeroPreview() {
  const [active, setActive] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(true);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const timer = setInterval(() => setActive((value) => (value + 1) % templates.items.length), 6000);
    return () => clearInterval(timer);
  }, [reducedMotion]);

  return (
    <aside className="hero-preview relative hidden min-w-0 lg:block" aria-label={hero.preview.label}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-[15%] rounded-full bg-accent/15 blur-[90px]" />
      <div className="hero-preview-stage relative ml-auto">
        <div className="hero-preview-desktop overflow-hidden rounded-xl border border-white/20 bg-[#202124] shadow-[0_24px_60px_-20px_rgba(0,0,0,0.7)]">
          <div className="flex items-end gap-0.5 px-2 pt-2" role="group" aria-label={hero.preview.selector}>
            <div className="mr-2 hidden h-11 shrink-0 items-center gap-1 xl:flex" aria-hidden="true">
              <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
              <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
              <span className="h-2 w-2 rounded-full bg-[#28c840]" />
            </div>
            {templates.items.map((item, index) => (
              <button
                key={item.slug}
                type="button"
                aria-pressed={active === index}
                onClick={() => setActive(index)}
                className={`relative flex min-h-11 min-w-0 flex-1 items-center justify-center gap-1.5 rounded-t-xl px-1.5 text-[clamp(0.6rem,0.8vw,0.75rem)] font-medium transition-colors focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent ${active === index ? "bg-[#35363a] text-white" : "text-white/60 hover:bg-white/5 hover:text-white"}`}
              >
                <span aria-hidden="true" className={`hidden h-2 w-2 shrink-0 rounded-sm xl:block ${active === index ? "bg-accent" : "bg-white/30"}`} />
                {item.name}
              </button>
            ))}
          </div>
          <div className="flex h-10 items-center gap-3 bg-[#35363a] px-3">
            <svg aria-hidden="true" viewBox="0 0 52 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-12 shrink-0 text-white/45">
              <path d="m7 3-5 5 5 5M2 8h12m8-5 5 5-5 5m5-5H15m34-2a5 5 0 1 0 0 5M49 2v4h-4" />
            </svg>
            <div className="flex h-7 min-w-0 flex-1 items-center gap-2 rounded-full bg-[#202124] px-3 text-[0.6rem] text-white/65">
              <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" className="h-3 w-3 shrink-0">
                <rect x="4" y="7" width="8" height="6" rx="1.5" /><path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" />
              </svg>
              <span className="truncate">{hero.preview.address}</span>
            </div>
            <svg aria-hidden="true" viewBox="0 0 4 16" fill="currentColor" className="h-4 w-1 text-white/60">
              <circle cx="2" cy="3" r="1" /><circle cx="2" cy="8" r="1" /><circle cx="2" cy="13" r="1" />
            </svg>
          </div>
          <div className="relative aspect-[1440/900] overflow-hidden bg-white">
            {templates.items.map((item, index) => (
              <Image
                key={item.slug}
                src={`/previews/${item.slug}.webp?v=20261028`}
                alt=""
                aria-hidden="true"
                fill
                quality={95}
                sizes="(min-width: 1440px) 800px, 55vw"
                priority={index === 0}
                className={`object-contain transition-opacity duration-700 motion-reduce:transition-none ${active === index ? "opacity-100" : "opacity-0"}`}
              />
            ))}
          </div>
        </div>
        <div className="hero-preview-phone absolute bottom-[7%] right-2 w-[26%] overflow-hidden rounded-[1.65rem] border-[5px] border-[#272C38] bg-[#272C38] shadow-[0_18px_40px_-12px_rgba(0,0,0,0.8)] ring-1 ring-white/20">
          <div className="relative aspect-[390/844] overflow-hidden rounded-[1.3rem] bg-white">
            {templates.items.map((item, index) => (
              <Image
                key={item.slug}
                src={`/previews/${item.slug}-mobile.webp?v=20261028`}
                alt=""
                aria-hidden="true"
                fill
                quality={95}
                sizes="(min-width: 1440px) 250px, 16vw"
                priority={index === 0}
                className={`object-contain transition-opacity duration-700 motion-reduce:transition-none ${active === index ? "opacity-100" : "opacity-0"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
