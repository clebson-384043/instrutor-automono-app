import { niches, type NicheIcon } from "@/config/site";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CheckIcon, ClipboardIcon, KeyIcon, SmartphoneIcon } from "@/components/ui/Icons";

const icons: Record<NicheIcon, typeof KeyIcon> = {
  key: KeyIcon,
  phone: SmartphoneIcon,
  clipboard: ClipboardIcon,
};

export function Niches() {
  return (
    <section id="para-quem" aria-labelledby="niches-title" className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          id="niches-title"
          eyebrow="Para quem são as aulas"
          title="Cada aluno tem um desafio. Eu tenho um plano para o seu."
          description="Identifique-se com uma das situações abaixo e veja como vamos trabalhar juntos."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {niches.map((niche, i) => {
            const Icon = icons[niche.icon];
            return (
              <Reveal key={niche.title} delay={i * 0.1}>
                <article className="group flex h-full flex-col rounded-3xl bg-white p-6 ring-1 ring-slate-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-900/5 hover:ring-brand-200 motion-reduce:hover:translate-y-0 sm:p-8">
                  <span className="grid size-12 place-items-center rounded-2xl bg-brand-50 text-brand-700 transition-colors group-hover:bg-brand-700 group-hover:text-white">
                    <Icon className="size-6" />
                  </span>
                  <h3 className="mt-5 text-xl font-bold text-slate-900">{niche.title}</h3>

                  <p className="mt-3 text-slate-600">{niche.problem}</p>

                  <div className="mt-auto pt-6">
                    <div className="flex gap-3 rounded-2xl bg-cta-light/60 p-4">
                      <CheckIcon className="mt-0.5 size-5 shrink-0 text-cta" />
                      <p className="text-sm font-medium text-slate-800">{niche.solution}</p>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
