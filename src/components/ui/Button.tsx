import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "cta" | "secondary" | "whatsapp" | "ghost";
type Size = "md" | "lg";

const variants: Record<Variant, string> = {
  cta: "bg-cta text-white shadow-lg shadow-cta/25 hover:bg-cta-hover hover:shadow-xl hover:shadow-cta/30",
  secondary:
    "bg-white text-brand-700 ring-1 ring-brand-200 hover:bg-brand-50 hover:ring-brand-300",
  whatsapp: "bg-[#25D366] text-slate-900 shadow-lg shadow-[#25D366]/25 hover:bg-[#1ebe5b]",
  ghost: "text-brand-700 hover:bg-brand-50",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-3 text-sm",
  lg: "px-7 py-4 text-base sm:text-lg",
};

type ButtonLinkProps = Omit<ComponentProps<typeof Link>, "className"> & {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  /** Abre em nova aba (links externos como WhatsApp e redes sociais). */
  external?: boolean;
};

/**
 * Botão-link. Para rotas internas usa next/link (ex: /agendar);
 * com `external` vira um <a> com target="_blank".
 */
export function ButtonLink({
  variant = "cta",
  size = "md",
  className = "",
  external = false,
  children,
  href,
  ...props
}: ButtonLinkProps) {
  const classes = [
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold",
    "transition-all duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600",
    "motion-reduce:transition-none motion-reduce:hover:translate-y-0",
    variants[variant],
    sizes[size],
    className,
  ].join(" ");

  if (external) {
    return (
      <a
        href={href.toString()}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  );
}
