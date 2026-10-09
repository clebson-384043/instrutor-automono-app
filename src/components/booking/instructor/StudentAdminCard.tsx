"use client";

import { useState } from "react";
import { Minus, Phone, Plus, RefreshCw } from "lucide-react";
import { BookingButton } from "@/components/booking/ui/BookingButton";
import { ProgressBar } from "@/components/booking/ui/ProgressBar";
import { adjustPackageBalance, remainingLessons, renewPackage, setStudentActive } from "@/lib/api/students";
import { initials } from "@/lib/booking-utils";
import { PACKAGE_LABELS, PACKAGE_TOTALS } from "@/types/booking";
import type { PackageType, Student } from "@/types/booking";

const PACKAGE_TYPES = Object.keys(PACKAGE_LABELS) as PackageType[];

/** Cartão de aluno com controle de saldo, renovação de pacote e ativação. */
export function StudentAdminCard({ student }: { student: Student }) {
  const [renewing, setRenewing] = useState(false);
  const remaining = remainingLessons(student);
  const { package: pkg } = student;

  return (
    <article className={`rounded-2xl border bg-white p-4 ${student.active ? "border-slate-200" : "border-slate-200 opacity-75"}`}>
      <div className="flex items-center gap-3">
        <span className="grid size-12 shrink-0 place-items-center rounded-full bg-brand-100 text-base font-bold text-brand-700">
          {initials(student.name)}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-base font-bold text-slate-900">{student.name}</p>
          <p className="truncate text-sm text-slate-500">{student.email}</p>
        </div>
        {student.phone && (
          <a
            href={`tel:${student.phone.replace(/\D/g, "")}`}
            aria-label={`Ligar para ${student.name}`}
            className="grid size-11 shrink-0 place-items-center rounded-full text-slate-600 ring-1 ring-slate-200 active:scale-95"
          >
            <Phone className="size-5" />
          </a>
        )}
      </div>

      <div className="mt-4 rounded-xl bg-slate-50 p-3">
        <div className="flex items-baseline justify-between text-sm">
          <span className="font-semibold text-slate-800">{pkg.label}</span>
          <span className={remaining === 0 ? "font-bold text-red-600" : "text-slate-500"}>
            {remaining === 0 ? "Esgotado" : `${remaining} restantes`}
          </span>
        </div>
        <ProgressBar tone="light" value={pkg.usedLessons} max={pkg.totalLessons} className="mt-2" />
        <div className="mt-2 flex items-center justify-between">
          <span className="text-sm text-slate-600">
            {pkg.usedLessons}/{pkg.totalLessons} aulas concluídas
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Remover uma aula do saldo"
              onClick={() => adjustPackageBalance(student.id, -1)}
              disabled={pkg.totalLessons <= pkg.usedLessons}
              className="grid size-11 place-items-center rounded-full bg-white text-slate-700 ring-1 ring-slate-200 active:scale-95 disabled:opacity-40"
            >
              <Minus className="size-5" />
            </button>
            <button
              type="button"
              aria-label="Adicionar uma aula ao saldo"
              onClick={() => adjustPackageBalance(student.id, 1)}
              className="grid size-11 place-items-center rounded-full bg-white text-slate-700 ring-1 ring-slate-200 active:scale-95"
            >
              <Plus className="size-5" />
            </button>
          </div>
        </div>
      </div>

      {renewing ? (
        <div className="mt-3 flex flex-col gap-2">
          <p className="text-xs font-semibold tracking-wide text-slate-500 uppercase">Novo pacote (zera o saldo)</p>
          {PACKAGE_TYPES.map((type) => (
            <BookingButton
              key={type}
              variant="secondary"
              className="justify-between"
              onClick={async () => {
                await renewPackage(student.id, type);
                setRenewing(false);
              }}
            >
              {PACKAGE_LABELS[type]}
              <span className="text-slate-500">{PACKAGE_TOTALS[type]} aulas</span>
            </BookingButton>
          ))}
          <BookingButton variant="secondary" onClick={() => setRenewing(false)}>
            Cancelar
          </BookingButton>
        </div>
      ) : (
        <div className="mt-3 flex gap-2">
          <BookingButton variant="secondary" className="flex-1" onClick={() => setRenewing(true)}>
            <RefreshCw className="size-4" />
            Renovar pacote
          </BookingButton>
          <BookingButton
            variant={student.active ? "danger" : "success"}
            onClick={() => setStudentActive(student.id, !student.active)}
          >
            {student.active ? "Desativar" : "Reativar"}
          </BookingButton>
        </div>
      )}
    </article>
  );
}
