"use client";

import { useState } from "react";
import { Check, CheckCheck, MapPin, Phone, X } from "lucide-react";
import { BookingButton } from "@/components/booking/ui/BookingButton";
import { StatusBadge } from "@/components/booking/ui/StatusBadge";
import { updateLessonStatus } from "@/lib/api/lessons";
import { formatDateLabel, mapsUrl } from "@/lib/booking-utils";
import type { Lesson, LessonStatus, Student } from "@/types/booking";

type InstructorLessonCardProps = {
  lesson: Lesson;
  student?: Student;
  /** Mostra a data (na agenda); na home do dia só o horário. */
  showDate?: boolean;
};

/** Cartão de aula com ações de aprovar / recusar / concluir / cancelar. */
export function InstructorLessonCard({ lesson, student, showDate = false }: InstructorLessonCardProps) {
  const [busy, setBusy] = useState<LessonStatus | null>(null);

  async function change(status: LessonStatus) {
    setBusy(status);
    await updateLessonStatus(lesson.id, status);
    setBusy(null);
  }

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-2xl leading-none font-extrabold text-slate-900">{lesson.time}</p>
          {showDate && (
            <p className="mt-1 text-xs font-semibold tracking-wide text-slate-500 uppercase">
              {formatDateLabel(lesson.date)}
            </p>
          )}
        </div>
        <StatusBadge status={lesson.status} />
      </div>

      <p className="mt-3 text-base font-bold text-slate-900">{student?.name ?? "Aluno"}</p>

      <a
        href={mapsUrl(lesson.meetingPoint)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-1 flex items-start gap-2 text-sm text-brand-700 underline-offset-2 hover:underline"
      >
        <MapPin className="mt-0.5 size-4 shrink-0" />
        {lesson.meetingPoint}
      </a>

      {lesson.notes && <p className="mt-2 text-sm text-slate-500 italic">&ldquo;{lesson.notes}&rdquo;</p>}

      <div className="mt-4 flex flex-wrap gap-2 border-t border-slate-100 pt-3">
        {student?.phone && (
          <a
            href={`tel:${student.phone.replace(/\D/g, "")}`}
            aria-label={`Ligar para ${student.name}`}
            className="grid size-12 place-items-center rounded-2xl text-slate-600 ring-1 ring-slate-200 active:scale-95"
          >
            <Phone className="size-5" />
          </a>
        )}

        {lesson.status === "pendente" && (
          <>
            <BookingButton variant="success" className="flex-1" disabled={busy !== null} onClick={() => change("confirmada")}>
              <Check className="size-4" />
              {busy === "confirmada" ? "Aprovando..." : "Aprovar"}
            </BookingButton>
            <BookingButton variant="danger" className="flex-1" disabled={busy !== null} onClick={() => change("cancelada")}>
              <X className="size-4" />
              Recusar
            </BookingButton>
          </>
        )}

        {lesson.status === "confirmada" && (
          <>
            <BookingButton variant="success" className="flex-1" disabled={busy !== null} onClick={() => change("concluida")}>
              <CheckCheck className="size-4" />
              {busy === "concluida" ? "Salvando..." : "Concluir"}
            </BookingButton>
            <BookingButton variant="danger" disabled={busy !== null} onClick={() => change("cancelada")}>
              Cancelar
            </BookingButton>
          </>
        )}
      </div>
    </article>
  );
}
