import Image from "next/image";
import { CarIcon, UserIcon } from "./Icons";

type PhotoSlotProps = {
  src: string | null;
  alt: string;
  /** Texto exibido no placeholder enquanto não há foto. */
  placeholderLabel: string;
  icon?: "car" | "user";
  className?: string;
  sizes?: string;
  preload?: boolean;
};

/**
 * Exibe a foto quando `src` existe; caso contrário mostra um placeholder
 * elegante indicando onde a imagem vai entrar.
 */
export function PhotoSlot({
  src,
  alt,
  placeholderLabel,
  icon = "user",
  className = "",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  preload = false,
}: PhotoSlotProps) {
  if (src) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image src={src} alt={alt} fill sizes={sizes} preload={preload} className="object-cover" />
      </div>
    );
  }

  const Icon = icon === "car" ? CarIcon : UserIcon;

  return (
    <div
      role="img"
      aria-label={alt}
      className={`relative flex flex-col items-center justify-center gap-3 overflow-hidden bg-linear-to-br from-brand-100 via-brand-50 to-white ${className}`}
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,var(--color-brand-200),transparent_60%)] opacity-60"
      />
      <Icon className="relative size-16 text-brand-300 sm:size-20" strokeWidth={1.25} />
      <span className="relative rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-brand-700 backdrop-blur">
        {placeholderLabel}
      </span>
    </div>
  );
}
