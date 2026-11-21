type Props = {
  children: string;
  href?: string;
  target?: "_blank";
  type?: "button" | "submit";
  onClick?: () => void;
  variant?: "primary" | "outline";
  size?: "md" | "sm";
  full?: boolean;
  className?: string;
};

/** Acciones de la landing: color, profundidad suave y texto centrado. */
export default function Button({
  children, href, target, type = "button", onClick, variant = "primary",
  size = "md", full = false, className = "",
}: Props) {
  const classes = [
    "landing-button inline-flex items-center justify-center border text-center font-syne font-bold leading-snug tracking-[-0.02em]",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent",
    size === "sm" ? "min-h-11 px-6 py-2.5 text-sm" : "min-h-[60px] px-7 py-4 text-base",
    variant === "primary"
      ? "landing-button-blue text-white"
      : "landing-button-light text-bg",
    full ? "w-full" : "",
    className,
  ].join(" ");

  return href ? (
    <a href={href} target={target} rel={target === "_blank" ? "noopener noreferrer" : undefined} onClick={onClick} className={classes}>{children}</a>
  ) : (
    <button type={type} onClick={onClick} className={classes}>{children}</button>
  );
}
