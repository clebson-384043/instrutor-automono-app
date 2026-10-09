"use client";

import { CalendarPlus, History, LayoutDashboard } from "lucide-react";
import { BottomNav } from "@/components/booking/ui/BottomNav";

export function StudentBottomNav() {
  return (
    <BottomNav
      items={[
        { href: "/agendamento/aluno", label: "Início", icon: LayoutDashboard },
        { href: "/agendamento/aluno/agendar", label: "Agendar", icon: CalendarPlus },
        { href: "/agendamento/aluno/historico", label: "Histórico", icon: History },
      ]}
    />
  );
}
