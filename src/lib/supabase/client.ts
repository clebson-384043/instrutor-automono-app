import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const instructorId = process.env.NEXT_PUBLIC_INSTRUCTOR_ID;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("As variáveis do Supabase (URL e KEY) não estão configuradas no .env.local.");
}

if (!instructorId) {
  throw new Error("A variável NEXT_PUBLIC_INSTRUCTOR_ID não está configurada no .env.local.");
}

// Cliente padrão para usar no Client-side (React) e chamadas normais
export const supabase = createClient(supabaseUrl, supabaseKey);

// Utilitário para sempre pegar o ID do instrutor atual do ambiente
export const currentInstructorId = instructorId;
