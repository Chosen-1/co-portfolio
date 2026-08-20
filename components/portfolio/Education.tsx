import Image from "next/image";
import type { Education as EducationItem } from "@/types/portfolio";

type EducationProps = {
  items: EducationItem[];
};

export default function Education({ items }: EducationProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section
      id="education"
      className="scroll-mt-24 border-t border-slate-200 py-12 sm:py-16"
    >
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
        Academic Background
      </p>

      <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
        Education
      </h2>

      <p className="mt-3 max-w-2xl text-slate-600">
        Academic qualifications and professional training that have shaped my
        career.
      </p>

      <div className="mt-10 space-y-6">
        {items.map((item) => (
          <article
            key={item.id}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-blue-700">
                  {item.startYear}
                  {item.endYear && ` — ${item.endYear}`}
                </p>

                <h3 className="mt-2 text-xl font-bold text-slate-900">
                  {item.qualification}
                </h3>

                <p className="mt-1 text-base font-medium text-slate-600">
                  {item.institution}
                </p>

                {item.description && (
                  <p className="mt-4 max-w-3xl leading-7 text-slate-600">
                    {item.description}
                  </p>
                )}
              </div>

              {item.certificate && (
                <div className="shrink-0">
                  <div className="relative h-32 w-24 overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
                    <Image
                      src={item.certificate.data}
                      alt={`${item.qualification} certificate`}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}