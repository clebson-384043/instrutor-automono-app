"use client";

import { useState } from "react";
import { XCircle } from "lucide-react";
import { BookingButton } from "@/components/booking/ui/BookingButton";
import { cancelLesson } from "@/lib/api/lessons";

/** Cancelamento em 2 toques (evita cancelar sem querer no celular). */
export function CancelLessonButton({ lessonId }: { lessonId: string }) {
  const [confirming, setConfirming] = useState(false);
  const [busy, setBusy] = useState(false);

  async function handleCancel() {
    setBusy(true);
    await cancelLesson(lessonId);
    setBusy(false);
  }

  if (!confirming) {
    return (
      <BookingButton variant="danger" className="w-full" onClick={() => setConfirming(true)}>
        <XCircle className="size-4" />
        Cancelar aula
      </BookingButton>
    );
  }

  return (
    <div className="flex gap-2">
      <BookingButton variant="secondary" className="flex-1" onClick={() => setConfirming(false)} disabled={busy}>
        Manter
      </BookingButton>
      <BookingButton variant="danger" className="flex-1" onClick={handleCancel} disabled={busy}>
        {busy ? "Cancelando..." : "Sim, cancelar"}
      </BookingButton>
    </div>
  );
}
