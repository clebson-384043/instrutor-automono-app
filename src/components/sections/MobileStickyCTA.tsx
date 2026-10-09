"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BOOKING_ROUTE, site } from "@/config/site";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/Icons";

/**
 * Barra fixa no rodapé (só mobile) que aparece depois que o usuário
 * passa do Hero. Mantém o CTA sempre ao alcance do polegar.
 */
export function MobileStickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", stiffness: 400, damping: 35 }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-8px_30px_rgba(15,23,42,0.08)] backdrop-blur md:hidden"
        >
          <div className="flex gap-3">
            <ButtonLink
              href={site.contact.whatsappUrl}
              external
              variant="whatsapp"
              size="md"
              className="shrink-0 px-4"
            >
              <WhatsAppIcon className="size-5" />
              <span className="sr-only">Falar no WhatsApp</span>
            </ButtonLink>
            <ButtonLink href={BOOKING_ROUTE} size="md" className="flex-1 text-base">
              Agendar Minha Primeira Aula
            </ButtonLink>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
