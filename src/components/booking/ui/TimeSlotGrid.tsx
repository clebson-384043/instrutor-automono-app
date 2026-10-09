"use client";

import { Clock } from "lucide-react";
import { EmptyState } from "./EmptyState";

type TimeSlotGridProps = {
  slots: string[];
  selectedTime: string | null;
  onSelect: (time: string) => void;
};

/** Grid de horários como chips grandes (toque fácil), 2 colunas no mobile. */
export function TimeSlotGrid({ slots, selectedTime, onSelect }: TimeSlotGridProps) {
  if (slots.length === 0) {
    return (
      <EmptyState
        icon={Clock}
        title="Sem horários livres"
        description="Todos os horários desse dia já estão ocupados ou bloqueados. Escolha outra data."
      />
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {slots.map((time) => {
        const isSelected = time === selectedTime;
        return (
          <button
            key={time}
            type="button"
            onClick={() => onSelect(time)}
            aria-pressed={isSelected}
            className={`min-h-14 rounded-2xl border text-base font-semibold transition-all active:scale-95 ${
              isSelected
                ? "border-brand-700 bg-brand-700 text-white shadow-md shadow-brand-700/25"
                : "border-slate-200 bg-white text-slate-700 hover:border-brand-300"
            }`}
          >
            {time}
          </button>
        );
      })}
    </div>
  );
}
