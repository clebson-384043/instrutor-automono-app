import { BOOKING_ROUTE, packages } from "@/config/site";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CheckIcon } from "@/components/ui/Icons";

const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

export function Packages() {
  return (
    <section id="pacotes" aria-labelledby="packages-title" className="py-16 sm:py-24 bg-background">
      <div className="mx-auto max-w-[1000px] px-4 sm:px-6">
        
        {/* Main White Container exactly like the image */}
        <div className="rounded-[2rem] bg-card border border-border p-6 sm:p-12 shadow-sm">
          
          <div className="text-center mb-10">
            <h2 id="packages-title" className="text-3xl font-bold text-foreground">
              Escolha seu Pacote
            </h2>
            <p className="mt-2 text-muted-foreground">
              Todas as aulas incluem busca no seu endereço e carro com duplo comando.
            </p>
          </div>

          <div className="grid items-stretch gap-6 md:grid-cols-3">
            {packages.map((pkg, i) => {
              const perLesson = Math.round(pkg.price / pkg.lessons);
              return (
                <Reveal key={pkg.name} delay={i * 0.1}>
                  <article
                    className={`relative flex h-full flex-col rounded-3xl p-6 border ${
                      pkg.featured
                        ? "border-border bg-muted/30"
                        : "border-border bg-card"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-semibold text-foreground">
                        {pkg.name}
                      </h3>
                      {pkg.featured && (
                        <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                          Mais Popular
                        </span>
                      )}
                    </div>
                    
                    <p className="mt-2 text-sm text-muted-foreground min-h-[40px]">
                      {pkg.description}
                    </p>

                    <div className="mt-4 mb-6">
                      {pkg.oldPrice && (
                        <p className="text-sm line-through text-muted-foreground/70">
                          {brl.format(pkg.oldPrice)}
                        </p>
                      )}
                      <p className="flex items-baseline gap-1">
                        <span className="text-4xl font-bold text-foreground">
                          {brl.format(pkg.price)}
                        </span>
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground font-medium">
                        {pkg.lessons > 1
                          ? `${pkg.lessons} aulas · ${brl.format(perLesson)}/aula`
                          : "1 aula"}
                      </p>
                    </div>

                    <ButtonLink
                      href={{ pathname: BOOKING_ROUTE, query: { pacote: pkg.lessons } }}
                      variant="secondary"
                      className={`w-full rounded-full font-semibold transition-all ${
                        pkg.featured
                          ? "bg-primary text-primary-foreground border-transparent hover:opacity-90"
                          : "bg-transparent border border-border text-foreground hover:bg-muted"
                      }`}
                    >
                      {pkg.featured ? `Escolher ${pkg.name}` : `Escolher ${pkg.name}`}
                    </ButtonLink>

                    <ul className="mt-8 space-y-3">
                      {pkg.features.map((feature) => (
                        <li key={feature} className="flex gap-3 text-sm text-muted-foreground items-start">
                          <CheckIcon className="mt-0.5 size-4 shrink-0 text-primary" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                </Reveal>
              );
            })}
          </div>

          <p className="mt-10 text-center text-sm font-medium text-muted-foreground">
            Pagamento via Pix ou cartão. Pacotes parcelados sem juros.
          </p>
        </div>

      </div>
    </section>
  );
}
