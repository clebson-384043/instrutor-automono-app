import { BOOKING_ROUTE, site } from "@/config/site";
import { ButtonLink } from "@/components/ui/Button";
import { PhotoSlot } from "@/components/ui/PhotoSlot";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRightIcon, ShieldIcon, StarIcon, WhatsAppIcon } from "@/components/ui/Icons";

export function Hero() {
  const { instructor, contact } = site;

  return (
    <section
      aria-labelledby="hero-title"
      className="relative overflow-hidden bg-background pt-20 pb-16 min-[360px]:pt-24 sm:pt-32 sm:pb-24"
    >
      {/* Formas decorativas */}
      <div aria-hidden className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-primary/10 blur-3xl sm:size-96" />
      <div aria-hidden className="pointer-events-none absolute top-1/2 -left-32 size-72 rounded-full bg-accent/20 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
        <div className="text-center lg:text-left">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-card px-4 py-1.5 text-sm font-medium text-primary shadow-sm ring-1 ring-border">
              <ShieldIcon className="size-4" />
              Carro com duplo comando
            </span>
          </Reveal>

          <Reveal delay={0.08}>
            <h1
              id="hero-title"
              className="mt-5 text-[2rem] leading-[1.1] min-[360px]:mt-6 min-[360px]:text-4xl font-extrabold tracking-tight text-balance text-foreground sm:text-5xl lg:text-6xl"
            >
              Perca o Medo de Dirigir e{" "}
              <span className="text-primary">Conquiste Sua Independência</span>
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mx-auto mt-5 max-w-xl text-base min-[360px]:mt-6 min-[360px]:text-lg text-pretty text-muted-foreground lg:mx-0">
              Aulas particulares com quem entende o seu tempo. Sem pressa, sem
              julgamentos: você evolui no seu ritmo até se sentir seguro no
              volante, com busca no seu endereço.
            </p>
          </Reveal>

          <Reveal delay={0.24} className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <ButtonLink href={BOOKING_ROUTE} size="lg" className="group px-5 min-[360px]:px-7">
              Agendar Minha Primeira Aula
              <ArrowRightIcon className="size-5 shrink-0 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" />
            </ButtonLink>
            <ButtonLink href={contact.whatsappUrl} external variant="secondary" size="lg">
              <WhatsAppIcon className="size-5 text-[#25D366]" />
              Tirar dúvidas
            </ButtonLink>
          </Reveal>

          <Reveal delay={0.32}>
            <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-border pt-8 text-center lg:text-left">
              <div className="flex flex-col">
                <dt className="text-xs text-muted-foreground sm:text-sm">Experiência</dt>
                <dd className="order-first text-2xl font-extrabold text-foreground sm:text-3xl">
                  {instructor.yearsOfExperience}+ anos
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="text-xs text-muted-foreground sm:text-sm">Alunos</dt>
                <dd className="order-first text-2xl font-extrabold text-foreground sm:text-3xl">
                  {instructor.studentsTaught}+
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="text-xs text-muted-foreground sm:text-sm">Aprovação</dt>
                <dd className="order-first text-2xl font-extrabold text-foreground sm:text-3xl">
                  {instructor.approvalRate}%
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>

        <Reveal delay={0.15} y={32} className="relative mx-auto w-full max-w-md lg:max-w-none">
          <PhotoSlot
            src={instructor.heroPhoto}
            alt={`${instructor.name}, instrutor de direção, ao lado do carro de aulas`}
            placeholderLabel="Foto do instrutor com o carro"
            icon="car"
            preload
            className="aspect-4/5 rounded-[2rem] shadow-2xl shadow-primary/5 ring-1 ring-border sm:aspect-square lg:aspect-4/5"
          />

          {/* Card flutuante de avaliação */}
          <div className="absolute -bottom-5 left-4 flex items-center gap-3 rounded-2xl bg-card px-4 py-3 shadow-xl ring-1 ring-border sm:left-[-1.5rem]">
            <div className="flex text-star" aria-hidden>
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon key={i} className="size-4" />
              ))}
            </div>
            <p className="text-sm font-semibold text-foreground">
              5,0 <span className="font-normal text-muted-foreground">no Google</span>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
