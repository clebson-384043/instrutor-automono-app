import type { ComponentProps } from "react";

type Variant = "primary" | "secondary" | "danger" | "success";
type Size = "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-cta text-white shadow-md shadow-cta/25 hover:bg-cta-hover",
  secondary: "bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50",
  danger: "bg-red-50 text-red-700 ring-1 ring-red-200 hover:bg-red-100",
  success: "bg-emerald-600 text-white shadow-md shadow-emerald-600/20 hover:bg-emerald-700",
};

const sizes: Record<Size, string> = {
  md: "min-h-12 px-4 text-sm",
  lg: "min-h-14 px-5 text-base",
};

type BookingButtonProps = ComponentProps<"button"> & {
  variant?: Variant;
  size?: Size;
};

export function BookingButton({
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  ...props
}: BookingButtonProps) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-2 rounded-2xl font-bold transition-all active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    />
  );
}
