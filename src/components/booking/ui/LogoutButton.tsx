"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { signOut } from "@/lib/api/auth";

export function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await signOut();
    router.replace("/agendamento/login");
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      aria-label="Sair"
      className="grid size-11 place-items-center rounded-full text-slate-500 hover:bg-slate-100 active:scale-95"
    >
      <LogOut className="size-5" />
    </button>
  );
}
