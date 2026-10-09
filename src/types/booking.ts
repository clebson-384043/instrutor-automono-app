/**
 * Tipos de domínio do sistema de agendamento.
 * Mantidos independentes do Supabase: quando a integração real entrar,
 * estes tipos devem bater com as linhas das tabelas (lessons, students, blocks).
 */

export type WeekDaySchedule = {
  active: boolean;
  slots: string[];
};

export type DateOverride = {
  date: string; // YYYY-MM-DD
  active: boolean;
  slots: string[];
};

export type InstructorSettings = {
  weekDays: Record<number, WeekDaySchedule>;
  overrides: DateOverride[];
};

export type UserRole = "aluno" | "instrutor";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string | null;
};

export type PackageType = "avulsa" | "destrava" | "dominio";

export type StudentPackage = {
  type: PackageType;
  label: string;
  totalLessons: number;
  usedLessons: number;
  purchasedAt: string; // ISO date
};

export type Student = {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatarUrl?: string | null;
  package: StudentPackage;
  active: boolean;
};

export type LessonStatus = "pendente" | "confirmada" | "concluida" | "cancelada";

export type Lesson = {
  id: string;
  studentId: string;
  /** Data no formato YYYY-MM-DD (fuso local, sem hora). */
  date: string;
  /** Horário no formato HH:mm, 24h. */
  time: string;
  status: LessonStatus;
  meetingPoint: string;
  notes?: string;
  createdAt: string; // ISO datetime
};

export type BlockReason = "almoco" | "manutencao" | "pessoal" | "outro";

/** Horário bloqueado pelo instrutor — não aparece como slot disponível. */
export type ScheduleBlock = {
  id: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  reason: BlockReason;
  label: string;
  /** Bloqueio recorrente todo dia (ex: horário de almoço). */
  recurring?: boolean;
};

/** Horários-base oferecidos em um dia normal de trabalho. */
export const DAILY_SLOTS = ["08:00", "10:00", "14:00", "16:00"] as const;
export type DailySlot = (typeof DAILY_SLOTS)[number];

export const PACKAGE_LABELS: Record<PackageType, string> = {
  avulsa: "Aula Avulsa",
  destrava: "Pacote Destrava",
  dominio: "Pacote Domínio",
};

export const PACKAGE_TOTALS: Record<PackageType, number> = {
  avulsa: 1,
  destrava: 5,
  dominio: 10,
};

export const LESSON_STATUS_LABELS: Record<LessonStatus, string> = {
  pendente: "Pendente",
  confirmada: "Confirmada",
  concluida: "Concluída",
  cancelada: "Cancelada",
};

export const BLOCK_REASON_LABELS: Record<BlockReason, string> = {
  almoco: "Almoço",
  manutencao: "Manutenção do carro",
  pessoal: "Compromisso pessoal",
  outro: "Outro",
};
