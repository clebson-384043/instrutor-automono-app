import type { Lesson } from "@/types/booking";

export function parseDateKey(dateKey: string): Date {
  const [y, m, d] = dateKey.split("-").map(Number);
  return new Date(y, m - 1, d);
}

/** Ex: "qua., 08 out." (curto) ou "quarta-feira, 8 de outubro" (longo). */
export function formatDateLabel(dateKey: string, long = false): string {
  const date = parseDateKey(dateKey);
  return long
    ? date.toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" })
    : date.toLocaleDateString("pt-BR", { weekday: "short", day: "2-digit", month: "short" });
}

export function lessonDateTime(lesson: Pick<Lesson, "date" | "time">): Date {
  const [h, m] = lesson.time.split(":").map(Number);
  const d = parseDateKey(lesson.date);
  d.setHours(h, m, 0, 0);
  return d;
}

/** Aula ainda por vir (ou em andamento há menos de 1h) e não encerrada. */
export function isUpcoming(lesson: Lesson): boolean {
  if (lesson.status !== "pendente" && lesson.status !== "confirmada") return false;
  return lessonDateTime(lesson).getTime() >= Date.now() - 60 * 60 * 1000;
}

export function compareLessons(a: Lesson, b: Lesson): number {
  return lessonDateTime(a).getTime() - lessonDateTime(b).getTime();
}

export function mapsUrl(address: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}

export function firstName(fullName: string): string {
  return fullName.trim().split(/\s+/)[0] ?? fullName;
}

export function initials(fullName: string): string {
  const parts = fullName.trim().split(/\s+/);
  return ((parts[0]?.[0] ?? "") + (parts.length > 1 ? parts[parts.length - 1][0] : "")).toUpperCase();
}
