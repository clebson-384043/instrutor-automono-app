import { Calendar, Clock, MapPin } from "lucide-react";
import type { ReactNode } from "react";
import { StatusBadge } from "@/components/booking/ui/StatusBadge";
import { formatDateLabel } from "@/lib/booking-utils";
import type { Lesson } from "@/types/booking";

type LessonCardProps = {
  lesson: Lesson;
  /** Área de ações (ex: botão de cancelar) renderizada no rodapé do cartão. */
  footer?: ReactNode;
};

export function LessonCard({ lesson, footer }: LessonCardProps) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-semibold text-slate-900">
          <Calendar className="size-4 text-brand-600" />
          <span className="capitalize">{formatDateLabel(lesson.date)}</span>
          <span className="text-slate-300">•</span>
          <Clock className="size-4 text-brand-600" />
          {lesson.time}
        </div>
        <StatusBadge status={lesson.status} />
      </div>

      <p className="mt-3 flex items-start gap-2 text-sm text-slate-600">
        <MapPin className="mt-0.5 size-4 shrink-0 text-slate-400" />
        {lesson.meetingPoint}
      </p>

      {lesson.notes && <p className="mt-2 text-sm text-slate-500 italic">&ldquo;{lesson.notes}&rdquo;</p>}

      {footer && <div className="mt-4 border-t border-slate-100 pt-3">{footer}</div>}
    </article>
  );
}
