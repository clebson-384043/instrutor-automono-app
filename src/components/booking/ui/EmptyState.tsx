import type { LucideIcon } from "lucide-react";

type EmptyStateProps = {
  icon: LucideIcon;
  title: string;
  description?: string;
};

export function EmptyState({ icon: Icon, title, description }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl bg-slate-50 px-6 py-12 text-center">
      <span className="grid size-14 place-items-center rounded-full bg-slate-100 text-slate-400">
        <Icon className="size-7" />
      </span>
      <p className="font-semibold text-slate-700">{title}</p>
      {description && <p className="max-w-xs text-sm text-slate-500">{description}</p>}
    </div>
  );
}
