import { CalendarPlus } from "lucide-react";
import Link from "next/link";
import { ProgressBar } from "@/components/booking/ui/ProgressBar";
import { remainingLessons } from "@/lib/api/students";
import type { Student } from "@/types/booking";

export function PackageCard({ student }: { student: Student }) {
  const remaining = remainingLessons(student);
  const exhausted = remaining === 0;

  return (
    <div className="rounded-3xl bg-linear-to-br from-brand-700 to-brand-900 p-6 text-white shadow-xl shadow-brand-900/20">
      <p className="text-sm font-medium text-brand-100">Seu pacote atual</p>
      <p className="mt-1 text-2xl font-extrabold">{student.package.label}</p>

      <div className="mt-5">
        <div className="flex items-baseline justify-between text-sm">
          <span className="font-semibold">
            {student.package.usedLessons}/{student.package.totalLessons} aulas concluídas
          </span>
          <span className="text-brand-100">{remaining} restantes</span>
        </div>
        <ProgressBar value={student.package.usedLessons} max={student.package.totalLessons} className="mt-2" />
      </div>

      {exhausted ? (
        <p className="mt-5 rounded-2xl bg-white/10 px-4 py-3 text-sm">
          Pacote esgotado. Fale com o instrutor para renovar e continuar agendando.
        </p>
      ) : (
        <Link
          href="/agendamento/aluno/agendar"
          className="mt-5 flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-white text-base font-bold text-brand-700 shadow-md transition-all hover:bg-brand-50 active:scale-[0.98]"
        >
          <CalendarPlus className="size-5" />
          Agendar Nova Aula
        </Link>
      )}
    </div>
  );
}
