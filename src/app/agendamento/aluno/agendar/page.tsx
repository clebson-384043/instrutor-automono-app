"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarCheck, Check, MapPin } from "lucide-react";
import { AppHeader } from "@/components/booking/ui/AppHeader";
import { BookingButton } from "@/components/booking/ui/BookingButton";
import { DayStripCalendar } from "@/components/booking/ui/DayStripCalendar";
import { EmptyState } from "@/components/booking/ui/EmptyState";
import { TimeSlotGrid } from "@/components/booking/ui/TimeSlotGrid";
import { useBlocks, useCurrentStudent, useLessons } from "@/lib/api/hooks";
import { createBooking, getAvailableSlots } from "@/lib/api/lessons";
import { remainingLessons } from "@/lib/api/students";
import { formatDateLabel } from "@/lib/booking-utils";
import { toDateKey } from "@/mocks/booking";

const DAYS_AHEAD = 21;
const STEPS = ["Data e horário", "Ponto de encontro", "Confirmação"];

/** Wizard de 3 passos: (1) data + horário, (2) ponto de encontro, (3) resumo. */
export default function AgendarPage() {
  const router = useRouter();
  const student = useCurrentStudent();
  const lessons = useLessons();
  const blocks = useBlocks();

  const [step, setStep] = useState(0);
  const [date, setDate] = useState(() => toDateKey(new Date()));
  const [time, setTime] = useState<string | null>(null);
  const [meetingPoint, setMeetingPoint] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  // lessons/blocks nas dependências: recalcula assim que algo muda no store.
  const slots = useMemo(() => getAvailableSlots(date), [date, lessons, blocks]); // eslint-disable-line react-hooks/exhaustive-deps

  const unavailableDates = useMemo(() => {
    const set = new Set<string>();
    const base = new Date();
    for (let i = 0; i < DAYS_AHEAD; i++) {
      const d = new Date(base);
      d.setDate(d.getDate() + i);
      const key = toDateKey(d);
      if (getAvailableSlots(key).length === 0) set.add(key);
    }
    return set;
  }, [lessons, blocks]); // eslint-disable-line react-hooks/exhaustive-deps

  // Sugestões: endereços já usados em aulas anteriores do aluno.
  const pastPoints = useMemo(() => {
    if (!student) return [];
    const unique = new Set(lessons.filter((l) => l.studentId === student.id).map((l) => l.meetingPoint));
    return [...unique].slice(0, 3);
  }, [lessons, student]);

  if (!student) {
    return (
      <div className="flex flex-1 items-center justify-center py-24">
        <div className="size-8 animate-spin rounded-full border-3 border-brand-200 border-t-brand-700" />
      </div>
    );
  }

  const exhausted = remainingLessons(student) === 0;

  function selectDate(key: string) {
    setDate(key);
    setTime(null);
    setError(null);
  }

  async function confirm() {
    if (!student || !time) return;
    setSubmitting(true);
    setError(null);

    // Revalida: outro agendamento/bloqueio pode ter ocupado o horário.
    if (!getAvailableSlots(date).includes(time)) {
      setError("Esse horário acabou de ficar indisponível. Escolha outro.");
      setTime(null);
      setStep(0);
      setSubmitting(false);
      return;
    }

    await createBooking({
      studentId: student.id,
      date,
      time,
      meetingPoint: meetingPoint.trim(),
      notes: notes.trim() || undefined,
    });
    setSubmitting(false);
    setDone(true);
  }

  if (done) {
    return (
      <>
        <AppHeader title="Agendar aula" />
        <main className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-10 text-center">
          <span className="grid size-20 place-items-center rounded-full bg-emerald-50 text-emerald-600">
            <Check className="size-10" strokeWidth={3} />
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900">Aula solicitada!</h2>
          <p className="max-w-xs text-slate-600">
            <span className="capitalize">{formatDateLabel(date, true)}</span> às {time}. O instrutor vai confirmar em breve.
          </p>
          <div className="mt-4 flex w-full max-w-xs flex-col gap-3">
            <BookingButton size="lg" onClick={() => router.push("/agendamento/aluno/historico")}>
              Ver minhas aulas
            </BookingButton>
            <BookingButton variant="secondary" size="lg" onClick={() => router.push("/agendamento/aluno")}>
              Voltar ao início
            </BookingButton>
          </div>
        </main>
      </>
    );
  }

  if (exhausted) {
    return (
      <>
        <AppHeader title="Agendar aula" backHref="/agendamento/aluno" />
        <main className="px-4 py-6">
          <EmptyState
            icon={CalendarCheck}
            title="Pacote esgotado"
            description="Você já usou todas as aulas do seu pacote. Fale com o instrutor para renovar."
          />
          <Link
            href="/agendamento/aluno"
            className="mt-4 flex min-h-12 items-center justify-center text-sm font-semibold text-brand-700"
          >
            Voltar ao início
          </Link>
        </main>
      </>
    );
  }

  const canContinue = step === 0 ? time !== null : step === 1 ? meetingPoint.trim().length >= 5 : true;

  return (
    <>
      <AppHeader title="Agendar aula" backHref="/agendamento/aluno" />

      <div className="px-4 pt-4">
        <div className="flex gap-1.5" aria-hidden>
          {STEPS.map((label, i) => (
            <span key={label} className={`h-1.5 flex-1 rounded-full ${i <= step ? "bg-brand-600" : "bg-slate-200"}`} />
          ))}
        </div>
        <p className="mt-2 text-xs font-semibold tracking-wide text-slate-500 uppercase">
          Passo {step + 1} de {STEPS.length} · {STEPS[step]}
        </p>
      </div>

      <main className="flex flex-1 flex-col gap-5 px-4 py-4">
        {error && (
          <p role="alert" className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {error}
          </p>
        )}

        {step === 0 && (
          <>
            <section aria-labelledby="date-title" className="flex flex-col gap-3">
              <h2 id="date-title" className="text-lg font-bold text-slate-900">
                Escolha o dia
              </h2>
              <DayStripCalendar
                daysAhead={DAYS_AHEAD}
                selectedDate={date}
                onSelect={selectDate}
                unavailableDates={unavailableDates}
              />
            </section>
            <section aria-labelledby="time-title" className="flex flex-col gap-3">
              <h2 id="time-title" className="text-lg font-bold text-slate-900">
                Horários livres
                <span className="ml-2 text-sm font-medium text-slate-500 capitalize">{formatDateLabel(date)}</span>
              </h2>
              <TimeSlotGrid slots={slots} selectedTime={time} onSelect={setTime} />
            </section>
          </>
        )}

        {step === 1 && (
          <section aria-labelledby="place-title" className="flex flex-col gap-4">
            <div>
              <h2 id="place-title" className="text-lg font-bold text-slate-900">
                Onde o instrutor busca você?
              </h2>
              <p className="mt-1 text-sm text-slate-500">Informe rua, número e bairro (ou um ponto de referência).</p>
            </div>

            <label className="flex flex-col gap-2">
              <span className="text-sm font-semibold text-slate-700">Endereço de busca</span>
              <div className="relative">
                <MapPin className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={meetingPoint}
                  onChange={(e) => setMeetingPoint(e.target.value)}
                  placeholder="Ex: Rua das Flores, 123 - Centro"
                  autoComplete="street-address"
                  enterKeyHint="next"
                  className="h-14 w-full rounded-2xl border border-slate-200 bg-white pr-4 pl-12 text-base text-slate-900 placeholder:text-slate-400 focus:border-brand-600 focus:ring-4 focus:ring-brand-100 focus:outline-none"
                />
              </div>
            </label>

            {pastPoints.length > 0 && (
              <div className="flex flex-col gap-2">
                <span className="text-xs font-semibold tracking-wide text-slate-500 uppercase">Usados antes</span>
                <div className="flex flex-col gap-2">
                  {pastPoints.map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setMeetingPoint(p)}
                      className="min-h-12 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left text-sm text-slate-700 active:scale-[0.98]"
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <label className="flex flex-col gap-2">
              <span className="text-sm font-semibold text-slate-700">
                Observações <span className="font-normal text-slate-400">(opcional)</span>
              </span>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                placeholder="Ex: quero treinar baliza"
                className="w-full rounded-2xl border border-slate-200 bg-white p-4 text-base text-slate-900 placeholder:text-slate-400 focus:border-brand-600 focus:ring-4 focus:ring-brand-100 focus:outline-none"
              />
            </label>
          </section>
        )}

        {step === 2 && time && (
          <section aria-labelledby="summary-title" className="flex flex-col gap-4">
            <h2 id="summary-title" className="text-lg font-bold text-slate-900">
              Confira os dados
            </h2>
            <dl className="divide-y divide-slate-100 rounded-2xl border border-slate-200 bg-white">
              {[
                ["Data", <span key="d" className="capitalize">{formatDateLabel(date, true)}</span>],
                ["Horário", time],
                ["Ponto de encontro", meetingPoint.trim()],
                ...(notes.trim() ? [["Observações", notes.trim()] as const] : []),
                ["Pacote", `${student.package.label} (${remainingLessons(student)} aulas restantes)`],
              ].map(([label, value]) => (
                <div key={String(label)} className="flex flex-col gap-0.5 px-4 py-3">
                  <dt className="text-xs font-semibold tracking-wide text-slate-500 uppercase">{label}</dt>
                  <dd className="text-base font-medium text-slate-900">{value}</dd>
                </div>
              ))}
            </dl>
            <p className="text-sm text-slate-500">
              A aula fica como <strong>Pendente</strong> até o instrutor confirmar. O saldo do pacote só é descontado
              quando a aula é concluída.
            </p>
          </section>
        )}

        <div className="sticky bottom-[calc(4.5rem+env(safe-area-inset-bottom))] -mx-4 mt-auto flex gap-3 border-t border-slate-100 bg-white/95 px-4 py-3 backdrop-blur">
          {step > 0 && (
            <BookingButton variant="secondary" size="lg" onClick={() => setStep(step - 1)} disabled={submitting}>
              Voltar
            </BookingButton>
          )}
          {step < 2 ? (
            <BookingButton size="lg" className="flex-1" disabled={!canContinue} onClick={() => setStep(step + 1)}>
              Continuar
            </BookingButton>
          ) : (
            <BookingButton variant="success" size="lg" className="flex-1" disabled={submitting} onClick={confirm}>
              {submitting ? "Agendando..." : "Confirmar agendamento"}
            </BookingButton>
          )}
        </div>
      </main>
    </>
  );
}
