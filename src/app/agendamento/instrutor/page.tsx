"use client";

import Link from "next/link";
import { useMemo } from "react";
import { BellRing, CalendarOff } from "lucide-react";
import { InstructorLessonCard } from "@/components/booking/instructor/InstructorLessonCard";
import { AppHeader } from "@/components/booking/ui/AppHeader";
import { EmptyState } from "@/components/booking/ui/EmptyState";
import { LogoutButton } from "@/components/booking/ui/LogoutButton";
import { useLessons, useStudents } from "@/lib/api/hooks";
import { compareLessons, formatDateLabel } from "@/lib/booking-utils";
import { toDateKey } from "@/mocks/booking";
import { useAuthStore } from "@/store/useAuthStore";

export default function InstrutorHomePage() {
  const user = useAuthStore((s) => s.user);
  const lessons = useLessons();
  const students = useStudents();
  const today = toDateKey(new Date());

  const { todayLessons, pendingCount } = useMemo(() => {
    const key = toDateKey(new Date());
    return {
      todayLessons: lessons.filter((l) => l.date === key && l.status !== "cancelada").sort(compareLessons),
      pendingCount: lessons.filter((l) => l.status === "pendente").length,
    };
  }, [lessons]);

  const done = todayLessons.filter((l) => l.status === "concluida").length;

  return (
    <>
      <AppHeader title="Hoje" right={<LogoutButton />} />
      <main className="flex flex-col gap-5 px-4 py-5">
        <div>
          <p className="text-sm text-slate-500">Olá, {user?.name.split(" ")[0]}</p>
          <h2 className="text-2xl font-extrabold text-slate-900 capitalize">{formatDateLabel(today, true)}</h2>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {[
            ["Aulas hoje", todayLessons.length],
            ["Concluídas", done],
            ["Pendentes", pendingCount],
          ].map(([label, value]) => (
            <div key={label} className="rounded-2xl bg-brand-50 p-3 text-center">
              <p className="text-2xl font-extrabold text-brand-700">{value}</p>
              <p className="text-xs font-medium text-slate-600">{label}</p>
            </div>
          ))}
        </div>

        {pendingCount > 0 && (
          <Link
            href="/agendamento/instrutor/agenda"
            className="flex min-h-14 items-center gap-3 rounded-2xl bg-amber-50 px-4 text-sm font-semibold text-amber-800 ring-1 ring-amber-200 active:scale-[0.98]"
          >
            <BellRing className="size-5" />
            {pendingCount} {pendingCount === 1 ? "solicitação aguardando" : "solicitações aguardando"} sua aprovação
          </Link>
        )}

        <section aria-labelledby="today-lessons" className="flex flex-col gap-3">
          <h3 id="today-lessons" className="text-base font-bold text-slate-900">
            Aulas de hoje
          </h3>
          {todayLessons.length === 0 ? (
            <EmptyState icon={CalendarOff} title="Nenhuma aula hoje" description="Aproveite o dia livre." />
          ) : (
            todayLessons.map((lesson) => (
              <InstructorLessonCard
                key={lesson.id}
                lesson={lesson}
                student={students.find((s) => s.id === lesson.studentId)}
              />
            ))
          )}
        </section>
      </main>
    </>
  );
}
