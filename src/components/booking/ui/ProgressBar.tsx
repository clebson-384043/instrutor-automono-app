type ProgressBarProps = {
  value: number;
  max: number;
  className?: string;
  /** "dark" para fundos escuros (padrão); "light" para cards brancos. */
  tone?: "dark" | "light";
};

export function ProgressBar({ value, max, className = "", tone = "dark" }: ProgressBarProps) {
  const pct = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0;
  const light = tone === "light";

  return (
    <div
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      className={`h-2.5 w-full overflow-hidden rounded-full ${light ? "bg-slate-100" : "bg-white/20"} ${className}`}
    >
      <div
        className={`h-full rounded-full transition-[width] duration-500 ease-out ${light ? "bg-brand-600" : "bg-white"}`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
