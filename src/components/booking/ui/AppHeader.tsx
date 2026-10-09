"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

type AppHeaderProps = {
  title: string;
  /** Mostra seta de voltar que navega para esta rota (ou router.back() se omitido). */
  backHref?: string;
  right?: React.ReactNode;
};

/** Cabeçalho fixo do app de agendamento, com botão de voltar opcional. */
export function AppHeader({ title, backHref, right }: AppHeaderProps) {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-2 border-b border-border bg-background/95 px-3 backdrop-blur safe-top">
      {backHref !== undefined ? (
        <button
          type="button"
          onClick={() => (backHref ? router.push(backHref) : router.back())}
          aria-label="Voltar"
          className="grid size-11 shrink-0 place-items-center rounded-full text-muted-foreground hover:bg-muted active:scale-95"
        >
          <ChevronLeft className="size-6" />
        </button>
      ) : (
        <div className="w-2" />
      )}
      <h1 className="flex-1 truncate text-center text-base font-bold text-foreground">{title}</h1>
      <div className="flex shrink-0 items-center gap-1 justify-end">
        <ThemeToggle />
        {right}
      </div>
    </header>
  );
}
