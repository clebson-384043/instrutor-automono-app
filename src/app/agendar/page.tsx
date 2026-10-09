import { redirect } from "next/navigation";

/**
 * A rota /agendar (usada pelos CTAs da landing) leva ao sistema de agendamento.
 * Obs: o parâmetro ?pacote=<n> enviado pelos CTAs de pacote ainda não é
 * repassado (ler searchParams aqui exigiria Suspense com Cache Components).
 */
export default function AgendarPage() {
  redirect("/agendamento");
}
