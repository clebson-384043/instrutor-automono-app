"use client";

import { useId, useState } from "react";
import { faqs, site } from "@/config/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { ChevronDownIcon, WhatsAppIcon } from "@/components/ui/Icons";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const baseId = useId();

  return (
    <section id="faq" aria-labelledby="faq-title" className="py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionHeading id="faq-title" eyebrow="Dúvidas frequentes" title="Perguntas que todo aluno faz" />

        <div className="divide-y divide-slate-200 rounded-3xl bg-white ring-1 ring-slate-200">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            const buttonId = `${baseId}-q-${i}`;
            const panelId = `${baseId}-a-${i}`;
            return (
              <div key={faq.question}>
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left font-semibold text-slate-900 transition-colors hover:text-brand-700 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-600 sm:px-6"
                  >
                    {faq.question}
                    <span
                      className={`grid size-8 shrink-0 place-items-center rounded-full transition-all duration-300 motion-reduce:transition-none ${
                        isOpen ? "rotate-180 bg-brand-700 text-white" : "bg-brand-50 text-brand-700"
                      }`}
                    >
                      <ChevronDownIcon className="size-4" />
                    </span>
                  </button>
                </h3>
                {/* grid-rows 0fr -> 1fr anima a altura de forma suave só com CSS */}
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden" inert={!isOpen}>
                    <p className="px-5 pb-5 text-slate-600 sm:px-6">{faq.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <p className="text-slate-600">Ficou com alguma dúvida?</p>
          <ButtonLink href={site.contact.whatsappUrl} external variant="whatsapp" size="md" className="mt-4">
            <WhatsAppIcon className="size-5" />
            Fale comigo no WhatsApp
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
