import type { AuthUser, Lesson, ScheduleBlock, Student } from "@/types/booking";

/** Formata uma data local como YYYY-MM-DD sem passar por UTC (evita off-by-one). */
export function toDateKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/** Soma dias a hoje e devolve a chave YYYY-MM-DD. Negativo = passado. */
function dayOffset(offset: number): string {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return toDateKey(d);
}

export const MOCK_INSTRUCTOR: AuthUser = {
  id: "instructor-1",
  name: "Carlos Silva",
  email: "carlos@instrutorcarlos.com.br",
  role: "instrutor",
};

export const MOCK_STUDENT_USER: AuthUser = {
  id: "student-1",
  name: "Mariana Alves",
  email: "mariana@email.com",
  role: "aluno",
};

/** Alunos ativos do instrutor, com saldo de pacote variado para testar os estados. */
export function buildMockStudents(): Student[] {
  return [
    {
      id: "student-1",
      name: "Mariana Alves",
      email: "mariana@email.com",
      phone: "(11) 98888-1111",
      package: {
        type: "destrava",
        label: "Pacote Destrava",
        totalLessons: 5,
        usedLessons: 3,
        purchasedAt: dayOffset(-20),
      },
      active: true,
    },
    {
      id: "student-2",
      name: "Rafael Torres",
      email: "rafael@email.com",
      phone: "(11) 97777-2222",
      package: {
        type: "dominio",
        label: "Pacote Domínio",
        totalLessons: 10,
        usedLessons: 10,
        purchasedAt: dayOffset(-45),
      },
      active: false,
    },
    {
      id: "student-3",
      name: "Juliana Mendes",
      email: "juliana@email.com",
      phone: "(11) 96666-3333",
      package: {
        type: "avulsa",
        label: "Aula Avulsa",
        totalLessons: 1,
        usedLessons: 0,
        purchasedAt: dayOffset(-2),
      },
      active: true,
    },
    {
      id: "student-4",
      name: "Pedro Henrique",
      email: "pedro@email.com",
      phone: "(11) 95555-4444",
      package: {
        type: "destrava",
        label: "Pacote Destrava",
        totalLessons: 5,
        usedLessons: 1,
        purchasedAt: dayOffset(-5),
      },
      active: true,
    },
  ];
}

/** Aulas passadas, futuras e uma cancelada, cobrindo os 4 status possíveis. */
export function buildMockLessons(): Lesson[] {
  return [
    {
      id: "lesson-1",
      studentId: "student-1",
      date: dayOffset(-10),
      time: "08:00",
      status: "concluida",
      meetingPoint: "Rua das Flores, 123 - Jardim Primavera",
      createdAt: new Date(0).toISOString(),
    },
    {
      id: "lesson-2",
      studentId: "student-1",
      date: dayOffset(-5),
      time: "10:00",
      status: "concluida",
      meetingPoint: "Rua das Flores, 123 - Jardim Primavera",
      createdAt: new Date(0).toISOString(),
    },
    {
      id: "lesson-3",
      studentId: "student-1",
      date: dayOffset(-2),
      time: "14:00",
      status: "concluida",
      meetingPoint: "Av. Paulista, 900 - Bela Vista",
      createdAt: new Date(0).toISOString(),
    },
    {
      id: "lesson-4",
      studentId: "student-1",
      date: dayOffset(2),
      time: "10:00",
      status: "confirmada",
      meetingPoint: "Rua das Flores, 123 - Jardim Primavera",
      notes: "Treinar baliza antes do exame.",
      createdAt: new Date(0).toISOString(),
    },
    {
      id: "lesson-5",
      studentId: "student-1",
      date: dayOffset(6),
      time: "16:00",
      status: "pendente",
      meetingPoint: "Shopping Vila Lobos, Portão 3",
      createdAt: new Date(0).toISOString(),
    },
    {
      id: "lesson-6",
      studentId: "student-1",
      date: dayOffset(-7),
      time: "16:00",
      status: "cancelada",
      meetingPoint: "Rua das Flores, 123 - Jardim Primavera",
      createdAt: new Date(0).toISOString(),
    },
    // Aulas de hoje para o dashboard do instrutor ter o que mostrar
    {
      id: "lesson-7",
      studentId: "student-3",
      date: dayOffset(0),
      time: "08:00",
      status: "confirmada",
      meetingPoint: "Rua Augusta, 500 - Consolação",
      createdAt: new Date(0).toISOString(),
    },
    {
      id: "lesson-8",
      studentId: "student-4",
      date: dayOffset(0),
      time: "14:00",
      status: "pendente",
      meetingPoint: "Av. Rebouças, 300 - Pinheiros",
      notes: "Primeira aula, muito ansioso.",
      createdAt: new Date(0).toISOString(),
    },
    {
      id: "lesson-9",
      studentId: "student-4",
      date: dayOffset(1),
      time: "08:00",
      status: "confirmada",
      meetingPoint: "Av. Rebouças, 300 - Pinheiros",
      createdAt: new Date(0).toISOString(),
    },
  ];
}

/** Bloqueios de agenda: almoço recorrente + um bloqueio pontual de manutenção. */
export function buildMockBlocks(): ScheduleBlock[] {
  return [
    {
      id: "block-lunch",
      date: dayOffset(0),
      time: "12:00",
      reason: "almoco",
      label: "Almoço",
      recurring: true,
    },
    {
      id: "block-maintenance",
      date: dayOffset(3),
      time: "08:00",
      reason: "manutencao",
      label: "Revisão do carro na concessionária",
    },
    {
      id: "block-maintenance-2",
      date: dayOffset(3),
      time: "10:00",
      reason: "manutencao",
      label: "Revisão do carro na concessionária",
    },
  ];
}
