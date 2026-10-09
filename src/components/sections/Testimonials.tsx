"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { testimonials } from "@/config/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ChevronLeftIcon, ChevronRightIcon, StarIcon } from "@/components/ui/Icons";

/**
 * Carrossel com scroll-snap nativo: arrasta com o dedo no celular,
 * setas e indicadores no desktop. Sem dependências extras.
 */
export function Testimonials() {
  const trackRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);

  // Descobre o card mais próximo do início da trilha para atualizar os indicadores
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const cards = Array.from(track.children) as HTMLElement[];
      const left = track.scrollLeft;
      let closest = 0;
      cards.forEach((card, i) => {
        if (Math.abs(card.offsetLeft - track.offsetLeft - left) <
            Math.abs(cards[closest].offsetLeft - track.offsetLeft - left)) {
          closest = i;
        }
      });
      // No fim da trilha, marca o último
      if (left + track.clientWidth >= track.scrollWidth - 4) closest = cards.length - 1;
      setActive(closest);
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(index, testimonials.length - 1));
    const card = track.children[clamped] as HTMLElement;
    track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: "smooth" });
  }, []);

  return (
    <section
      id="depoimentos"
      aria-labelledby="testimonials-title"
      className="relative overflow-hidden bg-brand-900 py-16 sm:py-24"
    >
      <div aria-hidden className="pointer-events-none absolute -top-40 right-0 size-96 rounded-full bg-brand-600/30 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          id="testimonials-title"
          light
          eyebrow="Depoimentos"
          title="Quem já perdeu o medo conta como foi"
        />

        <ul
          ref={trackRef}
          aria-roledescription="carrossel"
          className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-4 pb-2 sm:-mx-6 sm:px-6 lg:gap-6"
        >
          {testimonials.map((t, i) => (
            <li
              key={t.name}
              aria-roledescription="slide"
              aria-label={`${i + 1} de ${testimonials.length}`}
              className="w-[85%] shrink-0 snap-start sm:w-[calc(50%-0.5rem)] lg:w-[calc((100%-3rem)/3)]"
            >
              <figure className="flex h-full flex-col rounded-3xl bg-white p-6 shadow-xl sm:p-8">
                <div className="flex gap-0.5 text-star" role="img" aria-label={`Nota ${t.rating} de 5`}>
                  {Array.from({ length: 5 }).map((_, s) => (
                    <StarIcon key={s} className={`size-5 ${s < t.rating ? "" : "text-slate-200"}`} />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-slate-700">
                  <p>&ldquo;{t.text}&rdquo;</p>
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5">
                  <span
                    aria-hidden
                    className="grid size-11 place-items-center rounded-full bg-brand-100 font-bold text-brand-700"
                  >
                    {t.name.charAt(0)}
                  </span>
                  <div>
                    <p className="font-semibold text-slate-900">{t.name}</p>
                    <p className="text-sm text-slate-500">{t.context}</p>
                  </div>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => scrollTo(active - 1)}
            disabled={active === 0}
            aria-label="Depoimento anterior"
            className="grid size-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 disabled:opacity-40"
          >
            <ChevronLeftIcon className="size-5" />
          </button>

          <div className="flex">
            {testimonials.map((t, i) => (
              <button
                key={t.name}
                type="button"
                onClick={() => scrollTo(i)}
                aria-label={`Ir para depoimento ${i + 1}`}
                aria-current={active === i}
                className="grid h-11 min-w-8 place-items-center"
              >
                <span
                  className={`block h-2 rounded-full transition-all duration-300 ${
                    active === i ? "w-6 bg-white" : "w-2 bg-white/40"
                  }`}
                />
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => scrollTo(active + 1)}
            disabled={active === testimonials.length - 1}
            aria-label="Próximo depoimento"
            className="grid size-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 disabled:opacity-40"
          >
            <ChevronRightIcon className="size-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
