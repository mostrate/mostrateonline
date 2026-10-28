type Props = {
  children: string;
  href?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  variant?: "primary" | "outline";
  size?: "md" | "sm";
  full?: boolean;
  className?: string;
};

/** Acciones de la landing: superficies sólidas y texto centrado. */
export default function Button({
  children, href, type = "button", onClick, variant = "primary",
  size = "md", full = false, className = "",
}: Props) {
  const classes = [
    "inline-flex items-center justify-center rounded-lg border text-center font-semibold leading-snug tracking-[0.01em]",
    "transition-colors duration-200 motion-reduce:transition-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent",
    size === "sm" ? "min-h-11 px-5 py-2.5 text-sm" : "min-h-14 px-7 py-3.5 text-[0.95rem]",
    variant === "primary"
      ? "border-transparent bg-accent text-white hover:bg-[#608CFF] active:bg-[#416CE0]"
      : "border-content bg-content text-bg hover:border-white hover:bg-white active:border-[#D8D6D0] active:bg-[#D8D6D0]",
    full ? "w-full" : "",
    className,
  ].join(" ");

  return href ? (
    <a href={href} onClick={onClick} className={classes}>{children}</a>
  ) : (
    <button type={type} onClick={onClick} className={classes}>{children}</button>
  );
}
