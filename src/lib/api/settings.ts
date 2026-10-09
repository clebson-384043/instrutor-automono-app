import { useBookingStore } from "@/store/useBookingStore";
import { currentInstructorId, supabase } from "../supabase/client";
import type { InstructorSettings } from "@/types/booking";

export async function updateInstructorSettings(settings: InstructorSettings): Promise<void> {
  const { error } = await supabase
    .from("instructor_settings")
    .upsert({
      instructor_id: currentInstructorId,
      settings: settings as any,
      updated_at: new Date().toISOString()
    });

  if (error) throw new Error("Erro ao salvar configurações: " + error.message);

  useBookingStore.getState().updateSettings(settings);
}
