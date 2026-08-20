import type { Skill } from "@/types/portfolio";
import SectionHeader from "@/components/shared/SectionHeader";

type SkillsProps = {
  items: Skill[];
};

export default function Skills({ items }: SkillsProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section
      id="skills"
      className="scroll-mt-24 border-t border-slate-200 py-12 sm:py-16"
    >
      <SectionHeader
        eyebrow="Professional Competencies"
        title="Skills"
        description="Key competencies and professional strengths developed through education, training and practical experience."
      />

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <article
            key={item.id}
            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  {item.name}
                </h3>

                {item.category && (
                  <p className="mt-1 text-sm font-medium text-blue-700">
                    {item.category}
                  </p>
                )}
              </div>

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-bold text-blue-700 transition group-hover:bg-blue-600 group-hover:text-white">
                ✓
              </div>
            </div>

            {item.description && (
              <p className="mt-4 text-sm leading-6 text-slate-600">
                {item.description}
              </p>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}