"use client";

import { useEffect, useMemo, useRef } from "react";
import { toDateKey } from "@/mocks/booking";

type DayStripCalendarProps = {
  /** Quantos dias a partir de hoje mostrar (inclui hoje). */
  daysAhead?: number;
  selectedDate: string;
  onSelect: (dateKey: string) => void;
  /** Datas sem nenhum horário livre, exibidas esmaecidas mas ainda clicáveis. */
  unavailableDates?: Set<string>;
};

const WEEKDAY_LABELS = ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"];
const MONTH_LABELS = [
  "jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez",
];

type DayInfo = {
  key: string;
  dayNumber: number;
  weekday: string;
  isToday: boolean;
  isNewMonth: boolean;
  monthLabel: string;
};

/**
 * Calendário em faixa horizontal rolável, pensado para toque: cada dia é um
 * cartão largo (min 56px) que ocupa a tela inteira em "páginas" de ~5 dias.
 * Substitui o grid de mês tradicional, pequeno demais para o dedo no celular.
 */
export function DayStripCalendar({
  daysAhead = 21,
  selectedDate,
  onSelect,
  unavailableDates,
}: DayStripCalendarProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const selectedRef = useRef<HTMLButtonElement>(null);

  const days = useMemo<DayInfo[]>(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return Array.from({ length: daysAhead }, (_, i) => {
      const d = new Date(today);
      d.setDate(d.getDate() + i);
      const isNewMonth = i === 0 || d.getDate() === 1;
      return {
        key: toDateKey(d),
        dayNumber: d.getDate(),
        weekday: WEEKDAY_LABELS[d.getDay()],
        isToday: i === 0,
        isNewMonth,
        monthLabel: MONTH_LABELS[d.getMonth()],
      };
    });
  }, [daysAhead]);

  // Centraliza o dia selecionado ao montar e sempre que ele mudar por fora (ex: ao abrir a tela)
  useEffect(() => {
    selectedRef.current?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [selectedDate]);

  return (
    <div
      ref={trackRef}
      className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto scroll-smooth px-4 pb-1"
      role="listbox"
      aria-label="Selecionar data"
    >
      {days.map((day) => {
        const isSelected = day.key === selectedDate;
        const isUnavailable = unavailableDates?.has(day.key) ?? false;
        return (
          <button
            key={day.key}
            ref={isSelected ? selectedRef : undefined}
            type="button"
            role="option"
            aria-selected={isSelected}
            onClick={() => onSelect(day.key)}
            className={`flex min-h-18 w-16 shrink-0 flex-col items-center justify-center gap-0.5 rounded-2xl border transition-all active:scale-95 ${
              isSelected
                ? "border-brand-700 bg-brand-700 text-white shadow-md shadow-brand-700/25"
                : isUnavailable
                  ? "border-slate-100 bg-slate-50 text-slate-300"
                  : "border-slate-200 bg-white text-slate-700 hover:border-brand-300"
            }`}
          >
            <span className={`text-[11px] font-medium uppercase ${isSelected ? "text-brand-100" : "text-slate-400"}`}>
              {day.isToday ? "Hoje" : day.weekday}
            </span>
            <span className="text-xl font-bold leading-none">{day.dayNumber}</span>
            {day.isNewMonth && !day.isToday && (
              <span className={`text-[10px] font-medium ${isSelected ? "text-brand-100" : "text-slate-400"}`}>
                {day.monthLabel}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
