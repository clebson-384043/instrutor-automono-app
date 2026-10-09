"use client";

import { useEffect, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { useSyncData } from "@/lib/api/sync";
import type { UserRole } from "@/types/booking";

type AuthGateProps = {
  /** Se definido, exige esse papel específico (ex: bloqueia aluno em tela de instrutor). */
  requireRole?: UserRole;
  children: React.ReactNode;
};

/**
 * Protege rotas client-side enquanto não há middleware de auth real (Supabase).
 * Lê o usuário do Zustand (persistido em localStorage) e redireciona para o
 * login se não houver sessão, ou para o dashboard correto se o papel não bate.
 */
export function AuthGate({ requireRole, children }: AuthGateProps) {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  // false no servidor/hidratação, true depois no cliente: evita flash de
  // redirecionamento antes do localStorage ser lido.
  const hydrated = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  useSyncData();

  useEffect(() => {
    if (!hydrated) return;
    if (!user) {
      router.replace("/agendamento/login");
      return;
    }
    if (requireRole && user.role !== requireRole) {
      router.replace(user.role === "instrutor" ? "/agendamento/instrutor" : "/agendamento/aluno");
    }
  }, [hydrated, user, requireRole, router]);

  if (!hydrated || !user || (requireRole && user.role !== requireRole)) {
    return (
      <div className="flex flex-1 items-center justify-center py-24">
        <div className="size-8 animate-spin rounded-full border-3 border-brand-200 border-t-brand-700" />
      </div>
    );
  }

  return <>{children}</>;
}
