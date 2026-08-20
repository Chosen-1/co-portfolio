import { Experience as ExperienceType } from "@/types/portfolio";

type ExperienceProps = {
  items: ExperienceType[];
};

export default function Experience({
  items,
}: ExperienceProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section 
    id="experience"
    className=" scroll-mt-24 border-t border-slate-200 py-12 sm:py-16">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
        Clinical Experience
      </p>

      <h2 className="mt-2 text-3xl font-bold text-slate-900">
        Professional Journey
      </h2>

      <div className="mt-10 space-y-10 ">
        {items.map((experience) => (
          <article
            key={experience.id}
            className="relative border-l-2 border-blue-100 pl-6"
          >
            <div className="absolute -left-1.75 top-1 h-3 w-3 rounded-full bg-blue-600" />

            <h3 className="text-xl font-semibold text-slate-900 sm:text-xl">
              {experience.position}
            </h3>

            <p className="mt-1 font-medium text-blue-700">
              {experience.facility}
            </p>

            {experience.department && (
              <p className="mt-1 text-sm text-slate-500">
                {experience.department}
              </p>
            )}

            <p className="mt-2 text-sm text-slate-500">
              {experience.startDate} —{" "}
              {experience.endDate || "Present"}
            </p>

            {experience.description && (
              <p className="mt-4 max-w-3xl whitespace-pre-line leading-7 text-slate-600 sm:text-base">
                {experience.description}
              </p>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}