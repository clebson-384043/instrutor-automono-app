"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useBookingStore } from "@/store/useBookingStore";
import { ensureStudent } from "./students";
import type { InstructorSettings, Lesson, ScheduleBlock, Student } from "@/types/booking";

/**
 * Hooks de leitura reativa. As funções de `lessons.ts`/`students.ts` leem o
 * estado de forma pontual (getState); estes hooks fazem a tela re-renderizar
 * quando os dados mudam. Na integração real viram hooks de data-fetching
 * (React Query / SWR / Supabase realtime) com o mesmo retorno.
 */

export function useLessons(): Lesson[] {
  return useBookingStore((s) => s.lessons);
}

export function useBlocks(): ScheduleBlock[] {
  return useBookingStore((s) => s.blocks);
}

export function useStudents(): Student[] {
  return useBookingStore((s) => s.students);
}

/** Registro de aluno do usuário logado (cria um se for cadastro novo). */
export function useCurrentStudent(): Student | undefined {
  const user = useAuthStore((s) => s.user);
  const students = useBookingStore((s) => s.students);
  const student = user ? students.find((st) => st.id === user.id) : undefined;

  useEffect(() => {
    if (user && user.role === "aluno" && !student) ensureStudent(user);
  }, [user, student]);

  return student;
}

export function useInstructorSettings(): InstructorSettings {
  return useBookingStore((s) => s.settings);
}
