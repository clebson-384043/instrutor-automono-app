"use client";

import { toDateKey } from "@/mocks/booking";
import { useBookingStore } from "@/store/useBookingStore";
import { DAILY_SLOTS } from "@/types/booking";
import { currentInstructorId, supabase } from "../supabase/client";
import type { Lesson, LessonStatus, ScheduleBlock } from "@/types/booking";

/**
 * Camada de aulas e agenda. Hoje lê/escreve no Zustand store (mock).
 * Na integração real:
 *
 *   getAvailableSlots -> query em `lessons` + `schedule_blocks` do dia
 *   createBooking     -> insert em `lessons` (status "pendente") + RPC
 *                        para decrementar saldo do pacote
 *   updateLessonStatus-> update em `lessons`, idealmente via RPC que also
 *                        valida transições de status no servidor
 */

function fakeDelay<T>(value: T, ms = 350): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

export function listLessonsByStudent(studentId: string): Lesson[] {
  return useBookingStore
    .getState()
    .lessons.filter((l) => l.studentId === studentId)
    .sort((a, b) => `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`));
}

export function listAllLessons(): Lesson[] {
  return useBookingStore.getState().lessons;
}

export function listLessonsByDate(dateKey: string): Lesson[] {
  return useBookingStore.getState().lessons.filter((l) => l.date === dateKey);
}

export function listBlocks(): ScheduleBlock[] {
  return useBookingStore.getState().blocks;
}

/** Horários livres em um dia: todos os slots-base menos ocupados/bloqueados. */
export function getAvailableSlots(dateKey: string): string[] {
  const { lessons, blocks, settings } = useBookingStore.getState();

  const taken = new Set(
    lessons
      .filter((l) => l.date === dateKey && l.status !== "cancelada")
      .map((l) => l.time),
  );

  const blocked = new Set(
    blocks.filter((b) => b.date === dateKey || b.recurring).map((b) => b.time),
  );

  // Não oferece horários do passado no dia de hoje.
  const now = new Date();
  const isToday = dateKey === toDateKey(now);
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const [y, m, d] = dateKey.split("-").map(Number);
  const dateObj = new Date(y, m - 1, d);
  const weekDay = dateObj.getDay();

  const override = settings.overrides.find((o) => o.date === dateKey);
  let baseSlots: string[] = [];

  if (override) {
    if (override.active) baseSlots = override.slots;
  } else {
    const wDay = settings.weekDays[weekDay];
    if (wDay?.active) baseSlots = wDay.slots;
  }

  return baseSlots.filter((slot) => {
    if (taken.has(slot) || blocked.has(slot)) return false;
    if (isToday) {
      const [h, m] = slot.split(":").map(Number);
      if (h * 60 + m <= currentMinutes) return false;
    }
    return true;
  });
}

type CreateBookingInput = {
  studentId: string;
  date: string;
  time: string;
  meetingPoint: string;
  notes?: string;
};

export async function createBooking(input: CreateBookingInput): Promise<Lesson> {
  const lessonData = {
    instructor_id: currentInstructorId,
    student_id: input.studentId,
    date: input.date,
    time: input.time,
    status: "pendente",
    meeting_point: input.meetingPoint,
    notes: input.notes,
  };

  const { data, error } = await supabase.from("lessons").insert(lessonData).select().single();
  if (error || !data) throw new Error("Erro ao criar agendamento no banco: " + error?.message);

  const lesson: Lesson = {
    id: data.id,
    studentId: data.student_id,
    date: data.date,
    time: data.time,
    status: data.status as LessonStatus,
    meetingPoint: data.meeting_point,
    notes: data.notes,
    createdAt: data.created_at,
  };

  useBookingStore.getState().addLesson(lesson);
  return lesson;
}

export async function updateLessonStatus(lessonId: string, status: LessonStatus): Promise<void> {
  const { error } = await supabase.from("lessons").update({ status }).eq("id", lessonId);
  if (error) throw new Error("Erro ao atualizar aula: " + error.message);

  useBookingStore.getState().updateLessonStatus(lessonId, status);
  if (status === "concluida") {
    const lesson = useBookingStore.getState().lessons.find((l) => l.id === lessonId);
    if (lesson) {
      // Também atualiza o saldo de aulas usadas no banco real
      const student = useBookingStore.getState().students.find(s => s.id === lesson.studentId);
      if (student) {
        await supabase.from("students").update({ package_used_lessons: student.package.usedLessons + 1 }).eq("id", student.id);
      }
      useBookingStore.getState().incrementStudentUsage(lesson.studentId);
    }
  }
}

export async function cancelLesson(lessonId: string): Promise<void> {
  return updateLessonStatus(lessonId, "cancelada");
}

type CreateBlockInput = {
  date: string;
  time: string;
  reason: ScheduleBlock["reason"];
  label: string;
};

export async function createBlock(input: CreateBlockInput): Promise<ScheduleBlock> {
  const blockData = {
    instructor_id: currentInstructorId,
    date: input.date,
    time: input.time,
    reason: input.reason,
    label: input.label,
    recurring: false,
  };

  const { data, error } = await supabase.from("schedule_blocks").insert(blockData).select().single();
  if (error || !data) throw new Error("Erro ao criar bloqueio: " + error?.message);

  const block: ScheduleBlock = { 
    id: data.id, 
    date: data.date,
    time: data.time,
    reason: data.reason as any,
    label: data.label,
    recurring: data.recurring
  };
  useBookingStore.getState().addBlock(block);
  return block;
}

export async function removeBlock(blockId: string): Promise<void> {
  const { error } = await supabase.from("schedule_blocks").delete().eq("id", blockId);
  if (error) throw new Error("Erro ao remover bloqueio: " + error.message);
  useBookingStore.getState().removeBlock(blockId);
}
