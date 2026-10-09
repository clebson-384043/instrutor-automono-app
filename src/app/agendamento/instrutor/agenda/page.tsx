"use client";

import { useMemo, useState } from "react";
import { CalendarCheck, Lock, LockOpen, UserRound } from "lucide-react";
import { InstructorLessonCard } from "@/components/booking/instructor/InstructorLessonCard";
import { AppHeader } from "@/components/booking/ui/AppHeader";
import { BookingButton } from "@/components/booking/ui/BookingButton";
import { DayStripCalendar } from "@/components/booking/ui/DayStripCalendar";
import { EmptyState } from "@/components/booking/ui/EmptyState";
import { LogoutButton } from "@/components/booking/ui/LogoutButton";
import { useBlocks, useInstructorSettings, useLessons, useStudents } from "@/lib/api/hooks";
import { createBlock, removeBlock } from "@/lib/api/lessons";
import { compareLessons, formatDateLabel } from "@/lib/booking-utils";
import { toDateKey } from "@/mocks/booking";
import { BLOCK_REASON_LABELS, DAILY_SLOTS } from "@/types/booking";
import type { BlockReason } from "@/types/booking";

const REASONS = Object.keys(BLOCK_REASON_LABELS) as BlockReason[];

export default function AgendaPage() {
  const lessons = useLessons();
  const blocks = useBlocks();
  const students = useStudents();
  const settings = useInstructorSettings();

  const [date, setDate] = useState(() => toDateKey(new Date()));
  const [reason, setReason] = useState<BlockReason>("almoco");
  const [busySlot, setBusySlot] = useState<string | null>(null);

  const pending = useMemo(() => lessons.filter((l) => l.status === "pendente").sort(compareLessons), [lessons]);

  const dayBlocks = useMemo(() => blocks.filter((b) => b.date === date || b.recurring), [blocks, date]);
  const dayLessons = useMemo(
    () => lessons.filter((l) => l.date === date && l.status !== "cancelada"),
    [lessons, date],
  );

  async function toggleBlock(time: string, existingId?: string) {
    setBusySlot(time);
    if (existingId) {
      await removeBlock(existingId);
    } else {
      await createBlock({ date, time, reason, label: BLOCK_REASON_LABELS[reason] });
    }
    setBusySlot(null);
  }

  const [y, m, d] = date.split("-").map(Number);
  const weekDay = new Date(y, m - 1, d).getDay();
  const override = settings.overrides.find((o) => o.date === date);
  let baseSlots: string[] = [];
  if (override) {
    if (override.active) baseSlots = override.slots;
  } else {
    const wDay = settings.weekDays[weekDay];
    if (wDay?.active) baseSlots = wDay.slots;
  }

  // Bloqueios em horários fora dos slots-base (ex: almoço recorrente às 12:00).
  const extraBlocks = dayBlocks.filter((b) => !baseSlots.includes(b.time));

  return (
    <>
      <AppHeader title="Agenda" right={<LogoutButton />} />
      <main className="flex flex-col gap-8 px-4 py-5">
        <section aria-labelledby="pending-title" className="flex flex-col gap-3">
          <h2 id="pending-title" className="text-lg font-bold text-slate-900">
            Solicitações pendentes
            {pending.length > 0 && (
              <span className="ml-2 rounded-full bg-amber-100 px-2 py-0.5 text-sm font-bold text-amber-800">
                {pending.length}
              </span>
            )}
          </h2>
          {pending.length === 0 ? (
            <EmptyState icon={CalendarCheck} title="Tudo em dia" description="Nenhuma solicitação aguardando aprovação." />
          ) : (
            pending.map((lesson) => (
              <InstructorLessonCard
                key={lesson.id}
                lesson={lesson}
                student={students.find((s) => s.id === lesson.studentId)}
                showDate
              />
            ))
          )}
        </section>

        <section aria-labelledby="block-title" className="flex flex-col gap-4">
          <div>
            <h2 id="block-title" className="text-lg font-bold text-slate-900">
              Bloquear horários
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Horários bloqueados não aparecem para os alunos. Escolha o dia e o motivo.
            </p>
          </div>

          <DayStripCalendar daysAhead={21} selectedDate={date} onSelect={setDate} />

          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold tracking-wide text-slate-500 uppercase">Motivo</span>
            <div className="flex flex-wrap gap-2">
              {REASONS.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setReason(r)}
                  aria-pressed={reason === r}
                  className={`min-h-11 rounded-full px-4 text-sm font-semibold transition-all active:scale-95 ${
                    reason === r ? "bg-brand-700 text-white" : "bg-white text-slate-600 ring-1 ring-slate-200"
                  }`}
                >
                  {BLOCK_REASON_LABELS[r]}
                </button>
              ))}
            </div>
          </div>

          <h3 className="text-sm font-bold text-slate-900 capitalize">{formatDateLabel(date, true)}</h3>
          {baseSlots.length === 0 ? (
            <p className="text-sm text-slate-500 py-4">Nenhum horário de trabalho definido para este dia.</p>
          ) : (
            <ul className="flex flex-col gap-2">
              {baseSlots.map((slot) => {
                const lesson = dayLessons.find((l) => l.time === slot);
              const block = dayBlocks.find((b) => b.time === slot);
              const student = lesson ? students.find((s) => s.id === lesson.studentId) : undefined;

              return (
                <li
                  key={slot}
                  className="flex min-h-16 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-2"
                >
                  <span className="w-14 text-lg font-extrabold text-slate-900">{slot}</span>
                  <div className="min-w-0 flex-1 text-sm">
                    {lesson ? (
                      <p className="flex items-center gap-1.5 truncate font-medium text-brand-700">
                        <UserRound className="size-4 shrink-0" />
                        {student?.name ?? "Aula"}
                      </p>
                    ) : block ? (
                      <p className="truncate font-medium text-slate-600">
                        <span className="text-slate-400">Bloqueado · </span>
                        {block.label}
                      </p>
                    ) : (
                      <p className="text-emerald-700">Livre</p>
                    )}
                  </div>
                  {!lesson &&
                    (block ? (
                      <BookingButton
                        variant="secondary"
                        disabled={busySlot === slot}
                        onClick={() => toggleBlock(slot, block.id)}
                      >
                        <LockOpen className="size-4" />
                        Liberar
                      </BookingButton>
                    ) : (
                      <BookingButton variant="danger" disabled={busySlot === slot} onClick={() => toggleBlock(slot)}>
                        <Lock className="size-4" />
                        Bloquear
                      </BookingButton>
                    ))}
                </li>
              );
            })}
          </ul>
          )}

          {extraBlocks.length > 0 && (
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-bold text-slate-900">Outros bloqueios do dia</h3>
              {extraBlocks.map((b) => (
                <div
                  key={b.id}
                  className="flex min-h-14 items-center gap-3 rounded-2xl bg-slate-50 px-4 py-2 text-sm text-slate-600"
                >
                  <span className="font-bold text-slate-900">{b.time}</span>
                  <span className="flex-1 truncate">
                    {b.label}
                    {b.recurring && " (todos os dias)"}
                  </span>
                  <BookingButton variant="secondary" onClick={() => removeBlock(b.id)}>
                    Remover
                  </BookingButton>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  );
}
