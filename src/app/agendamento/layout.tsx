import type { Metadata } from "next";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: `Agendamento | Instrutor ${site.instructor.firstName}`,
  robots: { index: false, follow: false },
};

/**
 * Shell do "app" de agendamento: sem header/footer do site institucional.
 * Cada tela usa <AppHeader> e <BottomNav> próprios, dentro de um container
 * de largura máxima para ficar legível também em telas maiores.
 */
export default function AgendamentoLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-xl flex-1 flex-col bg-white">
      {children}
    </div>
  );
}
