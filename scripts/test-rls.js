// dotenv handled by --env-file
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const instructorId = process.env.NEXT_PUBLIC_INSTRUCTOR_ID;

const supabase = createClient(supabaseUrl, supabaseKey);

async function runRlsTests() {
  console.log("=== INICIANDO TESTES DE SEGURANÇA (RLS) ===");

  // 1. Logar como Instrutor
  console.log("\n[1] Logando como Instrutor (carlos@instrutor.com)...");
  const { data: instrData, error: instrErr } = await supabase.auth.signInWithPassword({
    email: 'carlos@instrutor.com',
    password: 'senha-segura'
  });

  if (instrErr) {
    console.error("❌ Falha no login do instrutor:", instrErr.message);
    return;
  }
  console.log("✅ Login de instrutor OK. ID:", instrData.user.id);

  // 2. Testar acesso do Instrutor: Ler Configurações
  const { data: settings, error: setErr } = await supabase
    .from('instructor_settings')
    .select('*')
    .eq('instructor_id', instructorId);
  
  if (setErr) console.error("❌ Instrutor falhou ao ler configurações:", setErr);
  else console.log("✅ Instrutor consegue ler configurações (RLS OK).");

  // 3. Testar acesso do Instrutor: Inserir Bloqueio
  const { data: block, error: blockErr } = await supabase
    .from('schedule_blocks')
    .insert({
      instructor_id: instructorId,
      date: '2026-12-25',
      time: '08:00',
      reason: 'pessoal',
      label: 'Natal',
      recurring: false
    })
    .select()
    .single();

  if (blockErr) {
    console.error("❌ Instrutor falhou ao criar bloqueio:", blockErr);
  } else {
    console.log("✅ Instrutor consegue criar bloqueio (RLS OK).");
    await supabase.from('schedule_blocks').delete().eq('id', block.id);
  }

  // 4. Deslogar
  await supabase.auth.signOut();
  console.log("\n[2] Instrutor deslogado. Tentando operações anônimas...");

  // 5. Testar RLS Anônimo (Deveria falhar ao tentar escrever, mas conseguir ler configs)
  const { data: anonSet, error: anonSetErr } = await supabase.from('instructor_settings').select('*');
  if (anonSetErr) {
    console.error("❌ Erro ao ler configs anonimamente:", anonSetErr);
  } else {
    console.log("✅ Usuário anônimo consegue ler configurações (RLS OK - Necessário para aluno ver agenda antes de logar/agendar).");
  }

  const { error: anonBlockErr } = await supabase.from('schedule_blocks').insert({
    instructor_id: instructorId,
    date: '2026-10-10',
    time: '08:00',
    reason: 'outro',
    label: 'Hacker',
    recurring: false
  });

  if (anonBlockErr) {
    console.log("✅ Segurança RLS funcionou! Usuário anônimo foi BLOQUEADO de criar agenda.");
  } else {
    console.error("❌ FALHA DE SEGURANÇA: Usuário anônimo conseguiu criar um bloqueio!");
  }

  console.log("\n=== TESTES FINALIZADOS COM SUCESSO ===");
}

runRlsTests();
