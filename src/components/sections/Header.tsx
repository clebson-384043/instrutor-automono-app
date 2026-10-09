"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BOOKING_ROUTE, LOGIN_ROUTE, navLinks, site } from "@/config/site";
import { ButtonLink } from "@/components/ui/Button";
import { CarIcon, MenuIcon, XIcon } from "@/components/ui/Icons";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fecha o menu com Esc
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "bg-background/90 shadow-sm border-b border-border backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav
        aria-label="Principal"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6"
      >
        <Link
          href="/"
          className="flex min-h-11 items-center gap-2 rounded-md font-bold text-foreground focus-visible:outline-2 focus-visible:outline-primary"
        >
          <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground">
            <CarIcon className="size-5" />
          </span>
          <span className="leading-tight">
            Instrutor {site.instructor.firstName}
          </span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <ButtonLink href={LOGIN_ROUTE} variant="ghost" size="md">
            Entrar
          </ButtonLink>
          <ButtonLink href={BOOKING_ROUTE} size="md">
            Agendar aula
          </ButtonLink>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          className="grid size-11 place-items-center rounded-full text-foreground transition-colors hover:bg-muted md:hidden"
        >
          {open ? <XIcon className="size-6" /> : <MenuIcon className="size-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden border-t border-border bg-background md:hidden"
          >
            <ul className="flex flex-col gap-1 px-4 py-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-4 py-3 text-base font-medium text-foreground hover:bg-muted"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="flex flex-col gap-2 pt-2 border-t border-border mt-2">
                <div className="flex items-center justify-between px-4 py-2">
                  <span className="text-sm font-medium text-foreground">Tema</span>
                  <ThemeToggle />
                </div>
                <ButtonLink href={BOOKING_ROUTE} size="lg" className="w-full" onClick={() => setOpen(false)}>
                  Agendar Minha Primeira Aula
                </ButtonLink>
                <ButtonLink
                  href={LOGIN_ROUTE}
                  variant="secondary"
                  size="lg"
                  className="w-full"
                  onClick={() => setOpen(false)}
                >
                  Entrar
                </ButtonLink>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
