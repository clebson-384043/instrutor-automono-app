"use client";

import { CalendarDays, LayoutDashboard, Users, Settings } from "lucide-react";
import { BottomNav } from "@/components/booking/ui/BottomNav";

export function InstructorBottomNav() {
  return (
    <BottomNav
      items={[
        { href: "/agendamento/instrutor", label: "Hoje", icon: LayoutDashboard },
        { href: "/agendamento/instrutor/agenda", label: "Agenda", icon: CalendarDays },
        { href: "/agendamento/instrutor/alunos", label: "Alunos", icon: Users },
        { href: "/agendamento/instrutor/configuracoes", label: "Config.", icon: Settings },
      ]}
    />
  );
}
