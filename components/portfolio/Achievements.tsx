import Image from "next/image";
import type { Achievement } from "@/types/portfolio";
import SectionHeader from "@/components/shared/SectionHeader";

type AchievementsProps = {
  items: Achievement[];
};

export default function Achievements({
  items,
}: AchievementsProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section
      id="achievements"
      className="scroll-mt-24 border-t border-slate-200 py-12 sm:py-16"
    >
      <SectionHeader
        eyebrow="Professional Milestones"
        title="Achievements"
        description="Selected achievements, recognitions and milestones from my academic and professional journey."
      />

      <div className="mt-10 space-y-6">
        {items.map((item) => (
          <article
            key={item.id}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              {/* Achievement information */}
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                    Achievement
                  </span>

                  {item.date && (
                    <span className="text-sm text-slate-500">
                      {item.date}
                    </span>
                  )}
                </div>

                <h3 className="mt-4 text-xl font-bold text-slate-900">
                  {item.title}
                </h3>

                {item.organization && (
                  <p className="mt-1 text-sm font-medium text-slate-600">
                    {item.organization}
                  </p>
                )}

                {item.description && (
                  <p className="mt-4 max-w-3xl leading-7 text-slate-600">
                    {item.description}
                  </p>
                )}
              </div>

              {/* Evidence */}
              {item.evidence && (
                <div className="shrink-0">
                  <div className="relative h-32 w-24 overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
                    <Image
                      src={item.evidence.data}
                      alt={`${item.title} evidence`}
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