import { BOOKING_ROUTE, navLinks, site } from "@/config/site";
import { ButtonLink } from "@/components/ui/Button";
import {
  CarIcon,
  FacebookIcon,
  InstagramIcon,
  MailIcon,
  WhatsAppIcon,
  YoutubeIcon,
} from "@/components/ui/Icons";

export function Footer() {
  const { contact, instructor } = site;

  const socials = [
    { href: contact.instagram, label: "Instagram", icon: InstagramIcon },
    { href: contact.facebook, label: "Facebook", icon: FacebookIcon },
    { href: contact.youtube, label: "YouTube", icon: YoutubeIcon },
  ];

  return (
    <footer className="bg-slate-950 text-slate-400">
      {/* Faixa final de conversão */}
      <div className="border-b border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-14 text-center sm:px-6 md:flex-row md:justify-between md:text-left">
          <div>
            <p className="text-2xl font-extrabold text-white sm:text-3xl">
              Pronto para dar o primeiro passo?
            </p>
            <p className="mt-2 text-slate-400">A primeira aula já começa com uma avaliação do seu nível.</p>
          </div>
          <ButtonLink href={BOOKING_ROUTE} size="lg" className="w-full sm:w-auto">
            Agendar Minha Primeira Aula
          </ButtonLink>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <p className="flex items-center gap-2 font-bold text-white">
            <span className="grid size-9 place-items-center rounded-xl bg-brand-700">
              <CarIcon className="size-5" />
            </span>
            Instrutor {instructor.firstName}
          </p>
          <p className="mt-4 text-sm">
            Aulas de direção particulares com paciência e segurança em {instructor.city}.
          </p>
        </div>

        <nav aria-label="Rodapé">
          <p className="text-sm font-semibold tracking-wider text-white uppercase">Navegação</p>
          <ul className="mt-2 grid grid-cols-2 gap-x-2 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="inline-flex min-h-11 items-center transition-colors hover:text-white">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-sm font-semibold tracking-wider text-white uppercase">Contato</p>
          <ul className="mt-2 text-sm">
            <li>
              <a
                href={contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-11 items-center gap-2 transition-colors hover:text-white"
              >
                <WhatsAppIcon className="size-4 text-[#25D366]" />
                {contact.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${contact.email}`} className="flex min-h-11 items-center gap-2 break-all transition-colors hover:text-white">
                <MailIcon className="size-4 shrink-0" />
                {contact.email}
              </a>
            </li>
          </ul>
          <ul className="mt-6 flex gap-3">
            {socials.map(({ href, label, icon: Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid size-11 place-items-center rounded-full bg-white/5 transition-all hover:-translate-y-0.5 hover:bg-brand-700 hover:text-white"
                >
                  <Icon className="size-5" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* pb extra no mobile para não ficar atrás da barra fixa de CTA */}
      <div className="border-t border-white/10 px-4 pt-6 pb-28 text-center text-xs md:pb-6">
        © {site.copyrightYear} {instructor.name}. Todos os direitos reservados.
      </div>
    </footer>
  );
}
