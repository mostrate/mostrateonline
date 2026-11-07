/**
 * Íconos de línea de la landing (trazo 1.5px, heredan el color con currentColor).
 * Inline para no sumar dependencias; reemplazan a los emojis del diseño anterior.
 */
import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function Base({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export function PaletteIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 3a9 9 0 1 0 0 18c1.1 0 1.8-.8 1.8-1.8 0-.5-.2-.9-.5-1.2-.3-.3-.5-.8-.5-1.2 0-1 .8-1.8 1.8-1.8H17a4 4 0 0 0 4-4C21 6.6 17 3 12 3Z" />
      <circle cx="7.5" cy="11" r="1" />
      <circle cx="10" cy="7" r="1" />
      <circle cx="15" cy="7.5" r="1" />
    </Base>
  );
}

export function GlobeIcon(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3Z" />
    </Base>
  );
}

export function DevicesIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M4 16V6a1 1 0 0 1 1-1h13a1 1 0 0 1 1 1v2" />
      <path d="M2 19h11" />
      <rect x="15" y="10" width="7" height="10" rx="1" />
      <path d="M18 17.5h1" />
    </Base>
  );
}

export function ShieldIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 3 5 6v5c0 4.4 2.9 8.3 7 10 4.1-1.7 7-5.6 7-10V6l-7-3Z" />
    </Base>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </Base>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="m6 9 6 6 6-6" />
    </Base>
  );
}

/** Íconos de servicios, indexados por la clave `icon` de lib/config.ts. */
export const serviceIcons = {
  diseno: PaletteIcon,
  hosting: GlobeIcon,
  responsive: DevicesIcon,
  mantenimiento: ShieldIcon,
} as const;

export type ServiceIconKey = keyof typeof serviceIcons;
