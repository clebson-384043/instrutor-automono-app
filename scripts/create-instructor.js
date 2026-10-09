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

async function createInstructor() {
  const email = 'carlos@instrutor.com';
  const password = 'senha-segura';
  const name = 'Carlos Silva (Instrutor)';

  console.log(`1. Criando usuário de autenticação para ${email}...`);
  const { data: authData, error: authErr } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { name } }
  });

  if (authErr) {
    if (authErr.message.includes('already registered')) {
      console.log('Usuário já existe na autenticação. Buscando ID...');
      // Tentando fazer login para pegar o ID
      const { data: loginData } = await supabase.auth.signInWithPassword({ email, password });
      if (loginData.user) {
        await upsertProfile(loginData.user.id, name, email);
      } else {
        console.error("Falha ao logar com usuário existente para atualizar o perfil.");
      }
    } else {
      console.error("Erro no Auth:", authErr.message);
    }
    return;
  }

  if (authData.user) {
    await upsertProfile(authData.user.id, name, email);
  }
}

async function upsertProfile(userId, name, email) {
  console.log(`2. Inserindo/Atualizando tabela profiles com role 'instrutor'...`);
  
  const { error: profErr } = await supabase
    .from('profiles')
    .upsert({
      id: userId,
      role: 'instrutor', // O segredo está aqui!
      instructor_id: instructorId,
      name,
      email
    });

  if (profErr) {
    console.error("Erro ao criar profile:", profErr.message);
  } else {
    console.log("✅ Conta de Instrutor criada com sucesso!");
    console.log("-----------------------------------------");
    console.log(`Email: ${email}`);
    console.log(`Senha: senha-segura`);
    console.log("-----------------------------------------");
  }
}

createInstructor();
