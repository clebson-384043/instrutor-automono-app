"use client";

import { create } from "zustand";
import { buildMockBlocks, buildMockLessons, buildMockStudents } from "@/mocks/booking";
import type { InstructorSettings, Lesson, LessonStatus, ScheduleBlock, Student } from "@/types/booking";

/**
 * Fonte da verdade mockada do sistema de agendamento (em memória, por aba).
 * Representa o que, com o Supabase ligado, viveria nas tabelas `lessons`,
 * `students` e `schedule_blocks`. Os componentes NUNCA devem importar este
 * store diretamente — sempre através de `lib/api/*`, que é a camada que
 * será trocada na integração real.
 */
type BookingState = {
  loaded: boolean;
  students: Student[];
  lessons: Lesson[];
  blocks: ScheduleBlock[];
  settings: InstructorSettings;

  setAllData: (data: { students: Student[]; lessons: Lesson[]; blocks: ScheduleBlock[]; settings: InstructorSettings }) => void;
  addLesson: (lesson: Lesson) => void;
  updateLessonStatus: (lessonId: string, status: LessonStatus) => void;
  addBlock: (block: ScheduleBlock) => void;
  removeBlock: (blockId: string) => void;
  incrementStudentUsage: (studentId: string) => void;
  addStudent: (student: Student) => void;
  updateStudent: (studentId: string, patch: Partial<Student>) => void;
  updateSettings: (settings: InstructorSettings) => void;
};

export const useBookingStore = create<BookingState>()((set) => {
  return {
    loaded: false,
    students: [],
    lessons: [],
    blocks: [],
    settings: {
      weekDays: {
        0: { active: false, slots: [] },
        1: { active: true, slots: ["08:00", "10:00", "14:00", "16:00"] },
        2: { active: true, slots: ["08:00", "10:00", "14:00", "16:00"] },
        3: { active: true, slots: ["08:00", "10:00", "14:00", "16:00"] },
        4: { active: true, slots: ["08:00", "10:00", "14:00", "16:00"] },
        5: { active: true, slots: ["08:00", "10:00", "14:00", "16:00"] },
        6: { active: true, slots: ["08:00", "10:00"] },
      },
      overrides: [],
    },

    updateSettings: (settings) => set({ settings }),

    setAllData: (data) => set({ ...data, loaded: true }),

    addLesson: (lesson) => set((s) => ({ lessons: [...s.lessons, lesson] })),

    updateLessonStatus: (lessonId, status) =>
      set((s) => ({
        lessons: s.lessons.map((l) => (l.id === lessonId ? { ...l, status } : l)),
      })),

    addBlock: (block) => set((s) => ({ blocks: [...s.blocks, block] })),

    removeBlock: (blockId) => set((s) => ({ blocks: s.blocks.filter((b) => b.id !== blockId) })),

    addStudent: (student) => set((s) => ({ students: [...s.students, student] })),

    updateStudent: (studentId, patch) =>
      set((s) => ({
        students: s.students.map((st) => (st.id === studentId ? { ...st, ...patch } : st)),
      })),

    incrementStudentUsage: (studentId) =>
      set((s) => ({
        students: s.students.map((st) =>
          st.id === studentId
            ? { ...st, package: { ...st.package, usedLessons: st.package.usedLessons + 1 } }
            : st,
        ),
      })),
  };
});
