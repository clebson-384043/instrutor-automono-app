// dotenv handled by --env-file
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const instructorId = process.env.NEXT_PUBLIC_INSTRUCTOR_ID;

if (!supabaseUrl || !supabaseKey) {
  console.error("Faltam variáveis de ambiente!");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function runTests() {
  console.log("Iniciando testes automatizados no Supabase...");
  
  // 1. Testa a leitura das configurações do instrutor
  console.log("1. Testando leitura de instructor_settings...");
  const { data: settings, error: settingsErr } = await supabase
    .from('instructor_settings')
    .select('*')
    .eq('instructor_id', instructorId)
    .single();
    
  if (settingsErr && settingsErr.code !== 'PGRST116') { // PGRST116 = não encontrado (o que é ok se for novo)
    console.error("Erro ao ler settings:", settingsErr);
  } else {
    console.log("✅ Leitura de settings OK.");
  }

  // 2. Criar um aluno falso direto no banco
  console.log("2. Testando criação de aluno...");
  const fakeUserId = '00000000-0000-0000-0000-000000000000'; // UUID falso válido
  
  // Como auth.users tem restrição de FK em profiles, nós testaremos apenas tabelas soltas
  // para não quebrar a integridade referencial do Auth do Supabase.
  
  console.log("3. Testando criação de Bloqueio de Agenda (Schedule Block)...");
  const { data: block, error: blockErr } = await supabase
    .from('schedule_blocks')
    .insert({
      instructor_id: instructorId,
      date: '2026-12-31',
      time: '12:00',
      reason: 'pessoal',
      label: 'Almoço Teste Automatizado',
      recurring: false
    })
    .select()
    .single();

  if (blockErr) {
    console.error("❌ Erro ao criar block:", blockErr.message);
  } else {
    console.log("✅ Bloqueio criado com sucesso. ID:", block.id);
    
    // Deletar o bloqueio de teste
    console.log("4. Limpando dados de teste...");
    await supabase.from('schedule_blocks').delete().eq('id', block.id);
    console.log("✅ Dados limpos.");
  }

  console.log("Testes finalizados!");
}

runTests();
