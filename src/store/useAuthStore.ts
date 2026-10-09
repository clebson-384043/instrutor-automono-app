"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthUser } from "@/types/booking";

type AuthState = {
  user: AuthUser | null;
  /** Mantém a sessão entre reloads enquanto não há Supabase Auth real. */
  setUser: (user: AuthUser | null) => void;
  signOut: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      signOut: () => set({ user: null }),
    }),
    { name: "booking-auth" },
  ),
);
