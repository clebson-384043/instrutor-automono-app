import { LESSON_STATUS_LABELS, type LessonStatus } from "@/types/booking";

const styles: Record<LessonStatus, string> = {
  pendente: "bg-amber-50 text-amber-700 ring-amber-200",
  confirmada: "bg-brand-50 text-brand-700 ring-brand-200",
  concluida: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  cancelada: "bg-slate-100 text-slate-500 ring-slate-200",
};

export function StatusBadge({ status }: { status: LessonStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${styles[status]}`}
    >
      {LESSON_STATUS_LABELS[status]}
    </span>
  );
}
