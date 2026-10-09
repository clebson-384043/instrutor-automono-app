"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";

/** Decide para onde ir ao abrir /agendamento diretamente. */
export default function AgendamentoIndexPage() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);

  useEffect(() => {
    if (!user) {
      router.replace("/agendamento/login");
    } else if (user.role === "instrutor") {
      router.replace("/agendamento/instrutor");
    } else {
      router.replace("/agendamento/aluno");
    }
  }, [user, router]);

  return (
    <div className="flex flex-1 items-center justify-center py-24">
      <div className="size-8 animate-spin rounded-full border-3 border-brand-200 border-t-brand-700" />
    </div>
  );
}
