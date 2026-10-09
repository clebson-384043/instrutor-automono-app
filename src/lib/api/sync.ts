"use client";

import { useEffect } from "react";
import { currentInstructorId, supabase } from "../supabase/client";
import { useBookingStore } from "@/store/useBookingStore";
import type { InstructorSettings, Lesson, ScheduleBlock, Student } from "@/types/booking";

export function useSyncData() {
  const loaded = useBookingStore((s) => s.loaded);
  const setAllData = useBookingStore((s) => s.setAllData);

  useEffect(() => {
    if (loaded) return;

    async function loadData() {
      const [
        { data: studentsData },
        { data: lessonsData },
        { data: blocksData },
        { data: settingsData }
      ] = await Promise.all([
        supabase.from("students").select("*, profiles(name, email)").eq("instructor_id", currentInstructorId),
        supabase.from("lessons").select("*").eq("instructor_id", currentInstructorId),
        supabase.from("schedule_blocks").select("*").eq("instructor_id", currentInstructorId),
        supabase.from("instructor_settings").select("*").eq("instructor_id", currentInstructorId).single()
      ]);

      const students: Student[] = (studentsData || []).map((s: any) => ({
        id: s.id,
        name: s.profiles?.name || "Desconhecido",
        email: s.profiles?.email || "",
        phone: s.phone,
        active: s.active,
        package: {
          type: s.package_type,
          label: s.package_type === "avulsa" ? "Aula Avulsa" : s.package_type === "destrava" ? "Pacote Destrava" : "Pacote Domínio",
          totalLessons: s.package_total_lessons,
          usedLessons: s.package_used_lessons,
          purchasedAt: s.package_purchased_at
        }
      }));

      const lessons: Lesson[] = (lessonsData || []).map((l: any) => ({
        id: l.id,
        studentId: l.student_id,
        date: l.date,
        time: l.time,
        status: l.status,
        meetingPoint: l.meeting_point,
        notes: l.notes,
        createdAt: l.created_at
      }));

      const blocks: ScheduleBlock[] = (blocksData || []).map((b: any) => ({
        id: b.id,
        date: b.date,
        time: b.time,
        reason: b.reason,
        label: b.label,
        recurring: b.recurring
      }));

      let settings: InstructorSettings;
      if (settingsData && settingsData.settings) {
        settings = settingsData.settings;
      } else {
        // Fallback default
        settings = {
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
        };
      }

      setAllData({ students, lessons, blocks, settings });
    }

    loadData();
  }, [loaded, setAllData]);
}
