import { site } from "@/config/site";
import { PhotoSlot } from "@/components/ui/PhotoSlot";
import { Reveal } from "@/components/ui/Reveal";
import { HeartIcon, MapPinIcon, ShieldIcon } from "@/components/ui/Icons";

const values = [
  { icon: HeartIcon, title: "Paciência de verdade", text: "Nada de gritos ou pressa. Erros fazem parte do aprendizado." },
  { icon: ShieldIcon, title: "Segurança em 1º lugar", text: "Carro com duplo comando e evolução gradual de dificuldade." },
];

export function About() {
  const { instructor } = site;

  return (
    <section id="sobre" aria-labelledby="about-title" className="bg-brand-50/60 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="grid overflow-hidden rounded-[2rem] bg-white shadow-xl shadow-brand-900/5 ring-1 ring-brand-100 lg:grid-cols-5">
            <div className="relative lg:col-span-2">
              <PhotoSlot
                src={instructor.profilePhoto}
                alt={`Foto de ${instructor.name}`}
                placeholderLabel="Foto do instrutor"
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="aspect-square h-full w-full lg:aspect-auto"
              />
              <div className="absolute top-4 left-4 rounded-2xl bg-brand-700 px-4 py-3 text-white shadow-lg">
                <p className="text-3xl leading-none font-extrabold">{instructor.yearsOfExperience}</p>
                <p className="text-xs font-medium text-brand-100">anos ensinando</p>
              </div>
            </div>

            <div className="p-6 sm:p-10 lg:col-span-3 lg:p-12">
              <p className="text-sm font-semibold tracking-wider text-brand-600 uppercase">
                Sobre o instrutor
              </p>
              <h2 id="about-title" className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                Olá, eu sou o {instructor.firstName}
              </h2>
              <p className="mt-2 flex items-center gap-1.5 text-sm text-slate-500">
                <MapPinIcon className="size-4" />
                Instrutor credenciado · {instructor.city}
              </p>

              <div className="mt-6 space-y-4 text-lg text-slate-600">
                <p>
                  Sei que o medo de dirigir é real, e que muitas vezes ele vem
                  de experiências ruins com instrutores apressados. Por isso
                  minhas aulas começam pelo que importa: fazer você se sentir
                  seguro.
                </p>
                <p>
                  Cada aluno tem seu tempo. Meu trabalho é respeitar esse tempo
                  e transformar cada pequena conquista em confiança para o
                  próximo passo.
                </p>
              </div>

              <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                {values.map(({ icon: Icon, title, text }) => (
                  <li key={title} className="flex gap-3 rounded-2xl bg-slate-50 p-4">
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-100 text-brand-700">
                      <Icon className="size-5" />
                    </span>
                    <div>
                      <p className="font-semibold text-slate-900">{title}</p>
                      <p className="mt-1 text-sm text-slate-600">{text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
