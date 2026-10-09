/**
 * Conteúdo central da landing page.
 * Edite aqui textos, preços e contatos sem mexer nos componentes.
 */

/** Rota do futuro sistema de agendamento. Todos os CTAs principais apontam para cá. */
export const BOOKING_ROUTE = "/agendar";
export const LOGIN_ROUTE = "/agendamento/login";

const whatsappNumber = "5511999999999"; // DDI + DDD + número, só dígitos

export const site = {
  instructor: {
    name: "Carlos Silva",
    firstName: "Carlos",
    yearsOfExperience: 12,
    studentsTaught: 800,
    approvalRate: 95,
    city: "São Paulo - SP",
    // Coloque as fotos em /public e informe o caminho, ex: "/instrutor-carro.jpg"
    heroPhoto: null as string | null,
    profilePhoto: null as string | null,
  },
  contact: {
    whatsappNumber,
    whatsappUrl: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      "Olá! Vim pelo site e gostaria de saber mais sobre as aulas de direção.",
    )}`,
    phoneDisplay: "(11) 99999-9999",
    email: "contato@instrutorcarlos.com.br",
    instagram: "https://instagram.com/",
    facebook: "https://facebook.com/",
    youtube: "https://youtube.com/",
  },
  copyrightYear: 2025,
};

export const navLinks = [
  { href: "#para-quem", label: "Para quem" },
  { href: "#sobre", label: "Sobre" },
  { href: "#pacotes", label: "Pacotes" },
  { href: "#depoimentos", label: "Depoimentos" },
  { href: "#faq", label: "Dúvidas" },
];

export type NicheIcon = "key" | "phone" | "clipboard";

export const niches: {
  icon: NicheIcon;
  title: string;
  problem: string;
  solution: string;
}[] = [
  {
    icon: "key",
    title: "Tem CNH, mas não dirige",
    problem:
      "A carteira está na gaveta há anos e só de pensar em pegar o volante bate aquela insegurança.",
    solution:
      "Aulas no seu ritmo, começando em ruas tranquilas até você se sentir confiante no trânsito do dia a dia.",
  },
  {
    icon: "phone",
    title: "Motorista de aplicativo iniciante",
    problem:
      "Quer começar a rodar, mas trava em avenidas movimentadas, baliza em vagas apertadas e embarques rápidos.",
    solution:
      "Treino focado em rotas reais, direção defensiva, economia de combustível e manobras do dia a dia de app.",
  },
  {
    icon: "clipboard",
    title: "Preparação para o exame prático",
    problem:
      "O nervosismo na hora da prova faz você errar o que já sabe e ter que pagar a taxa de novo.",
    solution:
      "Simulados no percurso do exame, baliza sem estresse e técnicas para controlar a ansiedade no dia.",
  },
];

export const packages = [
  {
    name: "Aula Avulsa",
    description: "Ideal para testar o método ou revisar um ponto específico.",
    lessons: 1,
    price: 120,
    oldPrice: null as number | null,
    featured: false,
    features: [
      "50 minutos de aula prática",
      "Busca no seu endereço",
      "Avaliação inicial do seu nível",
    ],
  },
  {
    name: "Pacote Destrava",
    description: "Para quem precisa perder o medo e ganhar confiança.",
    lessons: 5,
    price: 540,
    oldPrice: 600,
    featured: true,
    features: [
      "5 aulas de 50 minutos",
      "Busca no seu endereço",
      "Plano de aulas personalizado",
      "Suporte por WhatsApp entre as aulas",
    ],
  },
  {
    name: "Pacote Domínio",
    description: "Evolução completa, do básico ao trânsito pesado.",
    lessons: 10,
    price: 1020,
    oldPrice: 1200,
    featured: false,
    features: [
      "10 aulas de 50 minutos",
      "Busca no seu endereço",
      "Treino em vias rápidas e rodovia",
      "Simulado do exame prático",
      "Suporte por WhatsApp entre as aulas",
    ],
  },
];

export const testimonials = [
  {
    name: "Mariana A.",
    context: "Tinha CNH há 6 anos sem dirigir",
    rating: 5,
    text: "Eu chorava só de pensar em dirigir. Com muita paciência o Carlos me fez acreditar que eu conseguia. Hoje levo meus filhos na escola todo dia.",
  },
  {
    name: "Rafael T.",
    context: "Motorista de aplicativo",
    rating: 5,
    text: "Em 5 aulas aprendi a rodar no centro sem travar. As dicas de rota e de baliza fizeram toda a diferença no meu faturamento.",
  },
  {
    name: "Juliana M.",
    context: "Aprovada no exame prático",
    rating: 5,
    text: "Reprovei duas vezes por nervosismo. Os simulados no percurso real me deixaram tranquila e passei de primeira com ele.",
  },
  {
    name: "Pedro H.",
    context: "Voltou a dirigir após acidente",
    rating: 5,
    text: "Depois de um susto no trânsito eu não conseguia mais dirigir. O Carlos respeitou meu tempo e nunca me apressou.",
  },
];

export const faqs = [
  {
    question: "As aulas são em carro com duplo comando?",
    answer:
      "Sim. O carro é equipado com pedal de freio duplo, o que garante total segurança para você treinar sem medo de errar.",
  },
  {
    question: "Posso fazer aula no meu próprio carro?",
    answer:
      "Pode, sim. Para quem já tem CNH, treinar no próprio carro ajuda a se acostumar com o veículo do dia a dia. Combinamos os detalhes antes da primeira aula.",
  },
  {
    question: "Você busca em casa?",
    answer:
      "Sim, a busca e o retorno estão inclusos dentro da região atendida. Para outras regiões, consulte pelo WhatsApp.",
  },
  {
    question: "Quantas aulas vou precisar?",
    answer:
      "Depende do seu ponto de partida. Na primeira aula faço uma avaliação e indico o caminho mais rápido. Em média, quem tem CNH e não dirige ganha confiança entre 5 e 10 aulas.",
  },
  {
    question: "Como funciona o pagamento?",
    answer:
      "Aceito Pix, cartão de crédito e débito. Os pacotes podem ser parcelados no cartão.",
  },
  {
    question: "E se eu precisar remarcar uma aula?",
    answer:
      "Sem problema. Basta avisar com pelo menos 24 horas de antecedência para remarcar sem custo.",
  },
];
