"use client";

import { Calendar, Settings, Plus, X, Trash2 } from "lucide-react";
import { useState } from "react";
import { AppHeader } from "@/components/booking/ui/AppHeader";
import { BookingButton } from "@/components/booking/ui/BookingButton";
import { useInstructorSettings } from "@/lib/api/hooks";
import { useBookingStore } from "@/store/useBookingStore";
import type { InstructorSettings, WeekDaySchedule, DateOverride } from "@/types/booking";

import { updateInstructorSettings } from "@/lib/api/settings";

const WEEK_DAYS = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];

export default function SettingsPage() {
  const settings = useInstructorSettings();
  const [newSlotDay, setNewSlotDay] = useState<number | null>(null);
  const [newSlotTime, setNewSlotTime] = useState("");

  const [overrideDate, setOverrideDate] = useState("");
  const [overrideSlots, setOverrideSlots] = useState<string[]>([]);
  const [newOverrideTime, setNewOverrideTime] = useState("");
  const [overrideActive, setOverrideActive] = useState(true);

  function toggleDay(dayIdx: number) {
    const next = { ...settings };
    const day = next.weekDays[dayIdx];
    day.active = !day.active;
    updateInstructorSettings(next);
  }

  function addSlotToDay(dayIdx: number) {
    if (!newSlotTime) return;
    const next = { ...settings };
    const day = next.weekDays[dayIdx];
    if (!day.slots.includes(newSlotTime)) {
      day.slots = [...day.slots, newSlotTime].sort();
    }
    updateInstructorSettings(next);
    setNewSlotTime("");
    setNewSlotDay(null);
  }

  function removeSlotFromDay(dayIdx: number, slot: string) {
    const next = { ...settings };
    const day = next.weekDays[dayIdx];
    day.slots = day.slots.filter(s => s !== slot);
    updateInstructorSettings(next);
  }

  function saveOverride() {
    if (!overrideDate) return;
    const next = { ...settings };
    const existingIdx = next.overrides.findIndex(o => o.date === overrideDate);
    const newOverride: DateOverride = {
      date: overrideDate,
      active: overrideActive,
      slots: overrideSlots,
    };
    
    if (existingIdx >= 0) {
      next.overrides[existingIdx] = newOverride;
    } else {
      next.overrides.push(newOverride);
    }
    
    updateInstructorSettings(next);
    setOverrideDate("");
    setOverrideSlots([]);
    setOverrideActive(true);
    setNewOverrideTime("");
  }

  function removeOverride(date: string) {
    const next = { ...settings };
    next.overrides = next.overrides.filter(o => o.date !== date);
    updateInstructorSettings(next);
  }

  function addSlotToOverride() {
    if (!newOverrideTime) return;
    if (!overrideSlots.includes(newOverrideTime)) {
      setOverrideSlots([...overrideSlots, newOverrideTime].sort());
    }
    setNewOverrideTime("");
  }

  return (
    <>
      <AppHeader title="Configurações" />
      <main className="flex flex-col gap-8 px-4 py-5 pb-24">
        <section aria-labelledby="weekly-title" className="flex flex-col gap-4">
          <div>
            <h2 id="weekly-title" className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Settings className="size-5" />
              Jornada de Trabalho (Semanal)
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Defina os dias que você trabalha na semana e os horários que atende.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {WEEK_DAYS.map((dayName, idx) => {
              const day = settings.weekDays[idx];
              if (!day) return null;
              
              return (
                <div key={idx} className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{dayName}</span>
                    <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={day.active} 
                        onChange={() => toggleDay(idx)}
                        className="size-5 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                      />
                      {day.active ? "Ativo" : "Folga"}
                    </label>
                  </div>

                  {day.active && (
                    <div className="flex flex-col gap-3 pt-2 border-t border-slate-100">
                      <div className="flex flex-wrap gap-2">
                        {day.slots.length === 0 && <span className="text-sm text-slate-400">Nenhum horário adicionado.</span>}
                        {day.slots.map((slot) => (
                          <div key={slot} className="flex items-center gap-2 bg-slate-50 ring-1 ring-slate-200 rounded-full px-3 py-1">
                            <span className="text-sm font-bold text-slate-700">{slot}</span>
                            <button 
                              onClick={() => removeSlotFromDay(idx, slot)}
                              className="text-slate-400 hover:text-red-500"
                            >
                              <X className="size-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>

                      {newSlotDay === idx ? (
                        <div className="flex items-center gap-2">
                          <input 
                            type="time" 
                            value={newSlotTime}
                            onChange={(e) => setNewSlotTime(e.target.value)}
                            className="h-10 flex-1 rounded-lg border border-slate-200 px-3 text-slate-900"
                          />
                          <BookingButton size="sm" onClick={() => addSlotToDay(idx)} disabled={!newSlotTime}>
                            OK
                          </BookingButton>
                          <BookingButton variant="secondary" size="sm" onClick={() => setNewSlotDay(null)}>
                            Cancelar
                          </BookingButton>
                        </div>
                      ) : (
                        <button 
                          onClick={() => setNewSlotDay(idx)}
                          className="flex items-center gap-1 text-sm font-semibold text-brand-600 hover:text-brand-700 self-start"
                        >
                          <Plus className="size-4" /> Adicionar horário
                        </button>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        <section aria-labelledby="overrides-title" className="flex flex-col gap-4">
          <div>
            <h2 id="overrides-title" className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Calendar className="size-5" />
              Exceções por Data
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Precisa mudar os horários em um dia específico (ex: feriado)? Adicione uma exceção. Ela vai substituir a jornada semanal nesse dia.
            </p>
          </div>

          {settings.overrides.map((override) => (
            <div key={override.date} className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900">{override.date.split("-").reverse().join("/")}</span>
                  <p className="text-xs text-slate-500">{override.active ? "Horários especiais" : "Dia bloqueado"}</p>
                </div>
                <button onClick={() => removeOverride(override.date)} className="text-red-500 p-2">
                  <Trash2 className="size-5" />
                </button>
              </div>
              {override.active && (
                <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
                  {override.slots.map(s => (
                    <span key={s} className="bg-slate-50 ring-1 ring-slate-200 rounded-full px-3 py-1 text-sm font-bold text-slate-700">
                      {s}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}

          <div className="flex flex-col gap-4 rounded-2xl border border-dashed border-slate-300 p-4 bg-slate-50/50">
            <h3 className="text-sm font-bold text-slate-700">Nova Exceção</h3>
            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold text-slate-500 uppercase">Data</span>
              <input 
                type="date" 
                value={overrideDate}
                onChange={(e) => setOverrideDate(e.target.value)}
                className="h-10 rounded-lg border border-slate-200 px-3 text-slate-900"
              />
            </label>
            
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <input 
                type="checkbox" 
                checked={!overrideActive} 
                onChange={(e) => setOverrideActive(!e.target.checked)}
                className="size-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
              />
              Folga o dia inteiro (Bloquear)
            </label>

            {overrideActive && (
              <div className="flex flex-col gap-2">
                <span className="text-xs font-semibold text-slate-500 uppercase">Horários da exceção</span>
                <div className="flex flex-wrap gap-2 mb-2">
                  {overrideSlots.map(s => (
                    <div key={s} className="flex items-center gap-1 bg-white ring-1 ring-slate-200 rounded-full pl-3 pr-1 py-1">
                      <span className="text-sm font-bold text-slate-700">{s}</span>
                      <button onClick={() => setOverrideSlots(overrideSlots.filter(os => os !== s))} className="text-slate-400 p-1"><X className="size-3" /></button>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <input 
                    type="time" 
                    value={newOverrideTime}
                    onChange={(e) => setNewOverrideTime(e.target.value)}
                    className="h-10 flex-1 rounded-lg border border-slate-200 px-3 text-slate-900"
                  />
                  <BookingButton size="sm" onClick={addSlotToOverride} disabled={!newOverrideTime}>
                    Adicionar
                  </BookingButton>
                </div>
              </div>
            )}

            <BookingButton onClick={saveOverride} disabled={!overrideDate || (overrideActive && overrideSlots.length === 0)}>
              Salvar Exceção
            </BookingButton>
          </div>
        </section>
      </main>
    </>
  );
}
