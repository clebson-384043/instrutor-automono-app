"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Car, Loader2, Lock, Mail, User } from "lucide-react";
import { signInWithGoogle, signInWithPassword, signUpWithPassword } from "@/lib/api/auth";
import type { UserRole } from "@/types/booking";

type Mode = "login" | "cadastro";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function goToDashboard(destRole: UserRole) {
    router.replace(destRole === "instrutor" ? "/agendamento/instrutor" : "/agendamento/aluno");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (mode === "login") {
        const user = await signInWithPassword(email, password);
        goToDashboard(user.role);
      } else {
        const user = await signUpWithPassword(name, email, password);
        goToDashboard(user.role);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Algo deu errado.");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogle() {
    setError(null);
    setLoading(true);
    try {
      await signInWithGoogle();
      // O Supabase vai redirecionar a página para o Google e voltar.
    } catch (err) {
      setError(err instanceof Error ? err.message : "Algo deu errado.");
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-1 flex-col justify-center px-6 py-10">
      <div className="mx-auto mb-8 flex flex-col items-center text-center">
        <span className="grid size-14 place-items-center rounded-2xl bg-brand-700 text-white">
          <Car className="size-7" />
        </span>
        <h1 className="mt-4 text-2xl font-extrabold text-slate-900">
          {mode === "login" ? "Entrar na sua conta" : "Criar sua conta"}
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Agende e acompanhe suas aulas de direção.
        </p>
      </div>

      {/* As abas de Aluno/Instrutor foram removidas porque agora o banco de dados (Supabase) diz quem é quem pelo e-mail. */}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {mode === "cadastro" && (
          <div className="relative">
            <User className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Seu nome completo"
              autoComplete="name"
              className="min-h-14 w-full rounded-2xl border border-slate-200 bg-white pl-12 pr-4 text-base text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 focus:outline-none"
            />
          </div>
        )}

        <div className="relative">
          <Mail className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-400" />
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seu@email.com"
            autoComplete="email"
            inputMode="email"
            className="min-h-14 w-full rounded-2xl border border-slate-200 bg-white pl-12 pr-4 text-base text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 focus:outline-none"
          />
        </div>

        <div className="relative">
          <Lock className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-400" />
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
            autoComplete={mode === "login" ? "current-password" : "new-password"}
            className="min-h-14 w-full rounded-2xl border border-slate-200 bg-white pl-12 pr-4 text-base text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 focus:outline-none"
          />
        </div>

        {error && (
          <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-2 flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-brand-700 text-base font-bold text-white shadow-lg shadow-brand-700/25 transition-all hover:bg-brand-800 active:scale-[0.98] disabled:opacity-60"
        >
          {loading && <Loader2 className="size-5 animate-spin" />}
          {mode === "login" ? "Entrar" : "Criar conta"}
        </button>
      </form>

      <div className="my-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-slate-200" />
        <span className="text-xs font-medium text-slate-400">ou</span>
        <div className="h-px flex-1 bg-slate-200" />
      </div>

      <button
        type="button"
        onClick={handleGoogle}
        disabled={loading}
        className="flex min-h-14 items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white text-base font-semibold text-slate-700 transition-all hover:bg-slate-50 active:scale-[0.98] disabled:opacity-60"
      >
        <GoogleIcon className="size-5" />
        Continuar com Google
      </button>

      <button
        type="button"
        onClick={() => {
          setMode(mode === "login" ? "cadastro" : "login");
          setError(null);
        }}
        className="mt-6 min-h-11 text-sm font-medium text-brand-700"
      >
        {mode === "login" ? "Não tem conta? Cadastre-se" : "Já tem conta? Entrar"}
      </button>
    </div>
  );
}

function GoogleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path
        fill="#4285F4"
        d="M23.5 12.3c0-.8-.07-1.6-.2-2.3H12v4.5h6.5c-.3 1.4-1.1 2.6-2.4 3.4v2.8h3.9c2.3-2.1 3.5-5.2 3.5-8.4Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.2 0 5.9-1.1 7.9-2.9l-3.9-2.8c-1.1.7-2.4 1.1-4 1.1-3.1 0-5.7-2.1-6.6-4.9H1.4v3C3.3 21.3 7.3 24 12 24Z"
      />
      <path fill="#FBBC05" d="M5.4 14.5c-.2-.7-.4-1.4-.4-2.2s.1-1.5.4-2.2v-3H1.4A11.9 11.9 0 0 0 0 12.3c0 1.9.5 3.8 1.4 5.4Z" />
      <path
        fill="#EA4335"
        d="M12 4.8c1.7 0 3.3.6 4.5 1.7l3.4-3.4C17.9 1.2 15.2 0 12 0 7.3 0 3.3 2.7 1.4 6.6l4 3.1c.9-2.7 3.5-4.9 6.6-4.9Z"
      />
    </svg>
  );
}
