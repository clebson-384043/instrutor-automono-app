"use client";

import { toDateKey } from "@/mocks/booking";
import { useBookingStore } from "@/store/useBookingStore";
import { PACKAGE_LABELS, PACKAGE_TOTALS } from "@/types/booking";
import { supabase } from "../supabase/client";
import type { AuthUser, PackageType, Student } from "@/types/booking";

/**
 * Camada de dados de alunos. Hoje lê/escreve no Zustand store (mock).
 * Na integração real: `supabase.from("students").select(...)`, com
 * `usedLessons` incrementado via trigger ou RPC ao confirmar uma aula.
 */

export function listStudents(): Student[] {
  return useBookingStore.getState().students;
}

export function getStudent(studentId: string): Student | undefined {
  return useBookingStore.getState().students.find((s) => s.id === studentId);
}

export function remainingLessons(student: Student): number {
  return Math.max(0, student.package.totalLessons - student.package.usedLessons);
}

/**
 * Garante que um usuário aluno autenticado tenha registro de aluno.
 * Mock: alunos recém-cadastrados ganham uma aula avulsa de cortesia para
 * poderem testar o fluxo. Real: seria criado por trigger no signup.
 */
export function ensureStudent(user: AuthUser): Student {
  const existing = getStudent(user.id);
  if (existing) return existing;

  const student: Student = {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: "",
    package: {
      type: "avulsa",
      label: PACKAGE_LABELS.avulsa,
      totalLessons: PACKAGE_TOTALS.avulsa,
      usedLessons: 0,
      purchasedAt: toDateKey(new Date()),
    },
    active: true,
  };
  useBookingStore.getState().addStudent(student);
  return student;
}

/** Soma (ou subtrai) aulas ao total do pacote atual, sem passar de 0 nem abaixo do já usado. */
export async function adjustPackageBalance(studentId: string, delta: number): Promise<void> {
  const student = getStudent(studentId);
  if (!student) return;
  const total = Math.max(student.package.usedLessons, student.package.totalLessons + delta);
  
  const { error } = await supabase.from("students").update({ package_total_lessons: total }).eq("id", studentId);
  if (error) throw new Error("Erro ao ajustar saldo: " + error.message);

  useBookingStore
    .getState()
    .updateStudent(studentId, { package: { ...student.package, totalLessons: total } });
}

/** Troca por um pacote novo (zera o uso). Real: insert em `student_packages`. */
export async function renewPackage(studentId: string, type: PackageType): Promise<void> {
  const updates = {
    package_type: type,
    package_total_lessons: PACKAGE_TOTALS[type],
    package_used_lessons: 0,
    package_purchased_at: new Date().toISOString(),
    active: true
  };

  const { error } = await supabase.from("students").update(updates).eq("id", studentId);
  if (error) throw new Error("Erro ao renovar pacote: " + error.message);

  useBookingStore.getState().updateStudent(studentId, {
    package: {
      type,
      label: PACKAGE_LABELS[type],
      totalLessons: PACKAGE_TOTALS[type],
      usedLessons: 0,
      purchasedAt: toDateKey(new Date()),
    },
    active: true,
  });
}

export async function setStudentActive(studentId: string, active: boolean): Promise<void> {
  const { error } = await supabase.from("students").update({ active }).eq("id", studentId);
  if (error) throw new Error("Erro ao atualizar status: " + error.message);

  useBookingStore.getState().updateStudent(studentId, { active });
}
