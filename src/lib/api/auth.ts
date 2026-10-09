"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { currentInstructorId, supabase } from "../supabase/client";
import type { AuthUser, UserRole } from "@/types/booking";

export async function signInWithPassword(email: string, password: string): Promise<AuthUser> {
  const { data: authData, error: authErr } = await supabase.auth.signInWithPassword({ email, password });
  if (authErr) throw new Error(authErr.message);
  if (!authData.user) throw new Error("Erro desconhecido ao logar.");

  const { data: profile, error: profErr } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", authData.user.id)
    .single();

  if (profErr || !profile) throw new Error("Perfil não encontrado.");

  const user: AuthUser = {
    id: profile.id,
    name: profile.name,
    email: profile.email,
    role: profile.role as UserRole,
  };
  useAuthStore.getState().setUser(user);
  return user;
}

export async function signUpWithPassword(name: string, email: string, password: string): Promise<AuthUser> {
  const { data: authData, error: authErr } = await supabase.auth.signUp({ 
    email, 
    password,
    options: {
      data: { name, role: "aluno" }
    }
  });
  if (authErr) throw new Error(authErr.message);
  if (!authData.user) throw new Error("Erro desconhecido ao cadastrar.");

  // Força criação do profile e student
  const { data: profile, error: profErr } = await supabase
    .from("profiles")
    .insert({
      id: authData.user.id,
      name: name,
      email: email,
      role: "aluno",
      instructor_id: currentInstructorId
    })
    .select()
    .single();

  if (profErr || !profile) throw new Error("Erro ao criar perfil.");

  // Como é aluno novo, também cria registro na tabela students com aula avulsa grátis
  await supabase.from("students").insert({
    id: profile.id,
    instructor_id: currentInstructorId,
    phone: "", // A ser preenchido
    package_type: "avulsa",
    package_total_lessons: 1,
    package_used_lessons: 0,
    active: true
  });

  const user: AuthUser = {
    id: profile.id,
    name: profile.name,
    email: profile.email,
    role: "aluno",
  };
  useAuthStore.getState().setUser(user);
  return user;
}

export async function signInWithGoogle(role: UserRole = "aluno"): Promise<void> {
  // Redireciona a página para o Google. O salvamento do AuthUser será feito via onAuthStateChange no root do app.
  const { error } = await supabase.auth.signInWithOAuth({ 
    provider: "google",
    options: {
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
      redirectTo: `${window.location.origin}/agendamento`
    }
  });
  if (error) throw new Error(error.message);
}

export async function signOut(): Promise<void> {
  await supabase.auth.signOut();
  useAuthStore.getState().signOut();
}

export function getCurrentUser(): AuthUser | null {
  return useAuthStore.getState().user;
}

