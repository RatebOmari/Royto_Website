import { ButtonLink } from "@/components/ui/Button";
import { notFound } from "@/content/pages";

export default function NotFound() {
  return (
    <div className="container-royto flex min-h-[70vh] flex-col justify-center pb-24 pt-[144px]">
      <p className="mono-label text-slate">Error 404</p>
      <h1 className="mt-5 max-w-[16ch] text-hero font-extrabold text-ink">
        {notFound.title}
      </h1>
      <p className="mt-6 measure-lede text-lede text-ink-soft">
        {notFound.body}
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <ButtonLink href={notFound.primary.href} arrow>
          {notFound.primary.label}
        </ButtonLink>
        <ButtonLink href={notFound.secondary.href} variant="ghost">
          {notFound.secondary.label}
        </ButtonLink>
      </div>
    </div>
  );
}
