import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  id?: string;
  light?: boolean;
};

export function SectionHeading({ eyebrow, title, description, id, light = false }: SectionHeadingProps) {
  return (
    <Reveal className="mx-auto mb-10 max-w-2xl text-center sm:mb-14">
      <p
        className={`mb-3 text-sm font-semibold tracking-wider uppercase ${
          light ? "text-brand-200" : "text-brand-600"
        }`}
      >
        {eyebrow}
      </p>
      <h2
        id={id}
        className={`text-3xl font-extrabold tracking-tight text-balance sm:text-4xl ${
          light ? "text-white" : "text-slate-900"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-lg text-pretty ${light ? "text-brand-100" : "text-slate-600"}`}>
          {description}
        </p>
      )}
    </Reveal>
  );
}
