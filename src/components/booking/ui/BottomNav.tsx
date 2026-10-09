"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";

type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  /** Rota considerada "ativa" por prefixo, em vez de match exato (ex: /agendamento/aluno cobre /agendamento/aluno/agendar). */
  matchPrefix?: boolean;
};

/** Barra de navegação inferior fixa, estilo app nativo. */
export function BottomNav({ items }: { items: NavItem[] }) {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Navegação principal"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200 bg-white/95 pt-1 pb-[max(0.25rem,env(safe-area-inset-bottom))] backdrop-blur"
    >
      <ul className="mx-auto flex max-w-xl items-stretch justify-around">
        {items.map((item) => {
          const active = item.matchPrefix
            ? pathname === item.href || pathname.startsWith(`${item.href}/`)
            : pathname === item.href;
          const Icon = item.icon;
          return (
            <li key={item.href} className="flex-1">
              <Link
                href={item.href}
                className={`flex min-h-14 flex-col items-center justify-center gap-0.5 rounded-xl py-1.5 text-xs font-medium transition-colors ${
                  active ? "text-brand-700" : "text-slate-400 hover:text-slate-600"
                }`}
                aria-current={active ? "page" : undefined}
              >
                <Icon className="size-6" strokeWidth={active ? 2.5 : 2} />
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
