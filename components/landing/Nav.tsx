"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { nav } from "@/lib/config";
import Logo from "./Logo";
import Button from "./Button";

export default function Nav() {
  const [open, setOpen] = useState(false);

  // Bloquear scroll del body cuando el menú mobile está abierto
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-[100] border-b border-line bg-bg/75 backdrop-blur-md">
        <div className="mx-auto flex max-w-shell items-center justify-between px-[clamp(20px,4vw,60px)] py-4">
          <Link href="/#hero" onClick={close}>
            <Logo className="text-[clamp(1.15rem,1.6vw,1.35rem)]" />
          </Link>

          {/* Links desktop */}
          <ul className="hidden list-none items-center gap-[clamp(12px,1.5vw,24px)] lg:flex">
            {nav.links.map((link, i) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="group text-[0.92rem] font-medium text-muted transition-colors hover:text-content"
                >
                  <span className="mr-1 text-[0.7rem] text-accent/70 transition-colors group-hover:text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <Button href={nav.cta.href} size="sm" className="max-lg:!hidden">
            {nav.cta.label}
          </Button>

          {/* Hamburger */}
          <button
            type="button"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 flex-col items-center justify-center gap-[6px] p-1 lg:hidden"
          >
            <span
              className={`block h-0.5 w-[22px] bg-content transition-transform duration-300 ${
                open ? "translate-y-[4px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-[22px] bg-content transition-transform duration-300 ${
                open ? "-translate-y-[4px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Overlay menú mobile. Va debajo del nav (z-90) para que el logo y el
          botón de cerrar sigan visibles. */}
      <div
        className={`fixed inset-0 z-[90] flex flex-col justify-center bg-bg px-[clamp(20px,6vw,48px)] transition-opacity duration-300 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <ul className="list-none">
          {nav.links.map((link, i) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={close}
                className="flex items-baseline gap-4 py-3 font-syne text-[clamp(2.6rem,12vw,3.6rem)] font-extrabold leading-none tracking-[-0.04em] text-content transition-colors hover:text-accent"
              >
                <span className="w-6 flex-shrink-0 font-inter text-[0.75rem] font-medium tracking-normal text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <Button href={nav.cta.href} onClick={close} full className="mt-10">
          {nav.cta.label}
        </Button>
      </div>
    </>
  );
}
