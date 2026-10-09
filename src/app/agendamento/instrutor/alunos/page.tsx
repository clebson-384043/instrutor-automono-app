"use client";

import { useState } from "react";
import { Users } from "lucide-react";
import { StudentAdminCard } from "@/components/booking/instructor/StudentAdminCard";
import { AppHeader } from "@/components/booking/ui/AppHeader";
import { EmptyState } from "@/components/booking/ui/EmptyState";
import { LogoutButton } from "@/components/booking/ui/LogoutButton";
import { useStudents } from "@/lib/api/hooks";

type Filter = "ativos" | "todos";

export default function AlunosPage() {
  const students = useStudents();
  const [filter, setFilter] = useState<Filter>("ativos");

  const activeCount = students.filter((s) => s.active).length;
  const list = filter === "ativos" ? students.filter((s) => s.active) : students;

  return (
    <>
      <AppHeader title="Alunos" right={<LogoutButton />} />
      <main className="flex flex-col gap-4 px-4 py-5">
        <div role="tablist" aria-label="Filtro de alunos" className="grid grid-cols-2 gap-1 rounded-2xl bg-slate-100 p-1">
          {(
            [
              ["ativos", `Ativos (${activeCount})`],
              ["todos", `Todos (${students.length})`],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={filter === key}
              onClick={() => setFilter(key)}
              className={`min-h-11 rounded-xl text-sm font-semibold transition-all ${
                filter === key ? "bg-white text-brand-700 shadow-sm" : "text-slate-500"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {list.length === 0 ? (
          <EmptyState icon={Users} title="Nenhum aluno" description="Os alunos aparecem aqui após o cadastro." />
        ) : (
          <div className="flex flex-col gap-3">
            {list.map((student) => (
              <StudentAdminCard key={student.id} student={student} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}
