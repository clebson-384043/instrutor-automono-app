"use client";

import { useMemo, useState } from "react";
import { CalendarClock, History } from "lucide-react";
import { CancelLessonButton } from "@/components/booking/student/CancelLessonButton";
import { LessonCard } from "@/components/booking/student/LessonCard";
import { AppHeader } from "@/components/booking/ui/AppHeader";
import { EmptyState } from "@/components/booking/ui/EmptyState";
import { useCurrentStudent, useLessons } from "@/lib/api/hooks";
import { compareLessons, isUpcoming } from "@/lib/booking-utils";

type Tab = "proximas" | "anteriores";

export default function HistoricoPage() {
  const student = useCurrentStudent();
  const lessons = useLessons();
  const [tab, setTab] = useState<Tab>("proximas");

  const { upcoming, past } = useMemo(() => {
    const mine = student ? lessons.filter((l) => l.studentId === student.id) : [];
    return {
      upcoming: mine.filter(isUpcoming).sort(compareLessons),
      past: mine.filter((l) => !isUpcoming(l)).sort((a, b) => compareLessons(b, a)),
    };
  }, [lessons, student]);

  const list = tab === "proximas" ? upcoming : past;

  return (
    <>
      <AppHeader title="Histórico" backHref="/agendamento/aluno" />
      <main className="flex flex-col gap-4 px-4 py-5">
        <div role="tablist" aria-label="Filtro de aulas" className="grid grid-cols-2 gap-1 rounded-2xl bg-slate-100 p-1">
          {(
            [
              ["proximas", `Próximas (${upcoming.length})`],
              ["anteriores", `Anteriores (${past.length})`],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={tab === key}
              onClick={() => setTab(key)}
              className={`min-h-11 rounded-xl text-sm font-semibold transition-all ${
                tab === key ? "bg-white text-brand-700 shadow-sm" : "text-slate-500"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {list.length === 0 ? (
          <EmptyState
            icon={tab === "proximas" ? CalendarClock : History}
            title={tab === "proximas" ? "Nenhuma aula futura" : "Nenhuma aula anterior"}
            description={tab === "proximas" ? "Agende sua próxima aula pela aba Agendar." : undefined}
          />
        ) : (
          <div className="flex flex-col gap-3">
            {list.map((lesson) => (
              <LessonCard
                key={lesson.id}
                lesson={lesson}
                footer={tab === "proximas" ? <CancelLessonButton lessonId={lesson.id} /> : undefined}
              />
            ))}
          </div>
        )}
      </main>
    </>
  );
}
