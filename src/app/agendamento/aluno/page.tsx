"use client";

import Link from "next/link";
import { useMemo } from "react";
import { CalendarCheck } from "lucide-react";
import { LessonCard } from "@/components/booking/student/LessonCard";
import { PackageCard } from "@/components/booking/student/PackageCard";
import { AppHeader } from "@/components/booking/ui/AppHeader";
import { EmptyState } from "@/components/booking/ui/EmptyState";
import { LogoutButton } from "@/components/booking/ui/LogoutButton";
import { useCurrentStudent, useLessons } from "@/lib/api/hooks";
import { compareLessons, firstName, isUpcoming } from "@/lib/booking-utils";

export default function AlunoDashboardPage() {
  const student = useCurrentStudent();
  const lessons = useLessons();

  const nextLessons = useMemo(() => {
    if (!student) return [];
    return lessons
      .filter((l) => l.studentId === student.id && isUpcoming(l))
      .sort(compareLessons)
      .slice(0, 2);
  }, [lessons, student]);

  if (!student) {
    return (
      <div className="flex flex-1 items-center justify-center py-24">
        <div className="size-8 animate-spin rounded-full border-3 border-brand-200 border-t-brand-700" />
      </div>
    );
  }

  return (
    <>
      <AppHeader title="Início" right={<LogoutButton />} />
      <main className="flex flex-col gap-6 px-4 py-5">
        <div>
          <p className="text-sm text-slate-500">Bem-vindo(a) de volta,</p>
          <h2 className="text-2xl font-extrabold text-slate-900">{firstName(student.name)}</h2>
        </div>

        <PackageCard student={student} />

        <section aria-labelledby="next-lessons" className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h3 id="next-lessons" className="text-base font-bold text-slate-900">
              Próximas aulas
            </h3>
            <Link
              href="/agendamento/aluno/historico"
              className="flex min-h-11 items-center text-sm font-semibold text-brand-700"
            >
              Ver histórico
            </Link>
          </div>

          {nextLessons.length === 0 ? (
            <EmptyState
              icon={CalendarCheck}
              title="Nenhuma aula agendada"
              description="Toque em “Agendar Nova Aula” para escolher data e horário."
            />
          ) : (
            nextLessons.map((lesson) => <LessonCard key={lesson.id} lesson={lesson} />)
          )}
        </section>
      </main>
    </>
  );
}
