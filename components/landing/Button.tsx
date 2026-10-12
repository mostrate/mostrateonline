import type { ReactNode } from "react";
import { ArrowRightIcon } from "./Icons";

type Props = {
  children: string;
  /** Link (ancla o ruta). Si no se pasa, se renderiza un <button>. */
  href?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  variant?: "primary" | "outline";
  size?: "md" | "sm";
  /** Ocupa todo el ancho disponible (planes, formulario, menú mobile). */
  full?: boolean;
  /** Ícono de flecha al final de la acción. */
  arrow?: boolean;
  className?: string;
};

/**
 * Botón de la landing. Anatomía:
 * - Cuerpo redondeado y flecha contenida en un círculo para destacar la acción.
 * - Hover con elevación breve, brillo y movimiento de la flecha.
 * - Variante outline con el mismo peso visual, borde y halo azul.
 * Todo es CSS (group-hover); con reduced-motion no hay desplazamientos.
 */
export default function Button({
  children,
  href,
  type = "button",
  onClick,
  variant = "primary",
  size = "md",
  full = false,
  arrow = true,
  className = "",
}: Props) {
  const primary = variant === "primary";
  const pad = size === "sm" ? "min-h-10 px-4 text-[0.82rem]" : "min-h-[3.35rem] px-5 text-[0.92rem]";
  const icon = size === "sm" ? "h-6 w-6" : "h-7 w-7";
  const ease = "ease-[cubic-bezier(0.22,1,0.36,1)]";

  const classes = [
    "group relative isolate inline-flex items-center justify-center gap-3 overflow-hidden rounded-full font-semibold leading-none",
    `transition-[transform,background-color,border-color,box-shadow] duration-500 ${ease} hover:-translate-y-0.5`,
    primary
      ? "bg-accent text-white shadow-[0_12px_30px_-12px_rgba(79,127,255,0.8)] hover:bg-[#6690FF] hover:shadow-[0_18px_38px_-14px_rgba(79,127,255,1)]"
      : "border border-accent/65 bg-accent/[0.08] text-content shadow-[0_10px_26px_-16px_rgba(79,127,255,0.9)] hover:border-accent hover:bg-accent/[0.18] hover:shadow-[0_16px_34px_-16px_rgba(79,127,255,1)]",
    full ? "flex w-full" : "",
    className,
  ].join(" ");

  const inner: ReactNode = (
    <>
      {/* Brillo que cruza una sola vez (solo al entrar el mouse, no al salir) */}
      {primary && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 -z-10 w-1/2 -translate-x-full -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent transition-none group-hover:translate-x-[260%] group-hover:transition-transform group-hover:duration-[900ms] group-hover:ease-out motion-reduce:hidden"
        />
      )}

      <span className={`relative flex items-center justify-center ${pad}`}>{children}</span>

      {/* Ícono de dirección */}
      {arrow && (
        <span
          aria-hidden="true"
          className={`relative mr-1 flex flex-shrink-0 items-center justify-center rounded-full transition-[background-color,transform] duration-500 ${ease} ${icon} ${
            primary
              ? "bg-white/20 group-hover:translate-x-0.5 group-hover:bg-white/30"
              : "bg-accent text-white group-hover:translate-x-0.5 group-hover:bg-[#6690FF]"
          }`}
        >
          <ArrowRightIcon
            className={`h-3.5 w-3.5 transition-transform duration-500 ${ease} group-hover:translate-x-0.5 motion-reduce:transition-none`}
          />
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <a href={href} onClick={onClick} className={classes}>
        {inner}
      </a>
    );
  }
  return (
    <button type={type} onClick={onClick} className={classes}>
      {inner}
    </button>
  );
}
