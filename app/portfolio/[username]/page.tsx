import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    username: string;
  }>;
};

export default async function PublicPortfolioPage({
  params,
}: Props) {
  const { username } = await params;

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("portfolios")
    .select("*")
    .eq("username", username)
    .maybeSingle();

  if (error || !data) {
    notFound();
  }

  const profile =
    data.profile &&
    typeof data.profile === "object"
      ? data.profile as {
          fullName?: string;
          professionalTitle?: string;
          location?: string;
          email?: string;
          phone?: string;
          profilePhoto?: string;
        }
      : {};

  const experiences = Array.isArray(data.experiences)
    ? data.experiences
    : [];

  const education = Array.isArray(data.education)
    ? data.education
    : [];

  const skills = Array.isArray(data.skills)
    ? data.skills
    : [];

  const certifications = Array.isArray(data.certifications)
    ? data.certifications
    : [];

  const achievements = Array.isArray(data.achievements)
    ? data.achievements
    : [];

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <p className="font-semibold text-blue-700">
            Clinical Officer Portfolio
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-6xl">
            {profile.fullName || "Clinical Officer"}
          </h1>

          <p className="mt-4 text-xl text-slate-600">
            {profile.professionalTitle || "Clinical Officer"}
          </p>

          {profile.location && (
            <p className="mt-2 text-slate-500">
              {profile.location}
            </p>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-5xl space-y-12 px-6 py-12">
        {data.about && (
          <section>
            <h2 className="text-2xl font-bold">About</h2>
            <p className="mt-4 whitespace-pre-line leading-8 text-slate-600">
              {data.about}
            </p>
          </section>
        )}

        {experiences.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold">
              Professional Experience
            </h2>

            <div className="mt-6 space-y-5">
              {experiences.map(
                (item: Record<string, unknown>, index: number) => (
                  <article
                    key={String(item.id ?? index)}
                    className="rounded-2xl border border-slate-200 bg-white p-6"
                  >
                    <h3 className="font-bold">
                      {String(
                        item.title ??
                          item.position ??
                          item.role ??
                          "Experience"
                      )}
                    </h3>

                    <p className="mt-2 text-slate-600">
                      {String(
                        item.organization ??
                          item.company ??
                          ""
                      )}
                    </p>
                  </article>
                )
              )}
            </div>
          </section>
        )}

        {education.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold">Education</h2>

            <div className="mt-6 space-y-5">
              {education.map(
                (item: Record<string, unknown>, index: number) => (
                  <article
                    key={String(item.id ?? index)}
                    className="rounded-2xl border border-slate-200 bg-white p-6"
                  >
                    <h3 className="font-bold">
                      {String(
                        item.institution ??
                          item.school ??
                          "Education"
                      )}
                    </h3>

                    <p className="mt-2 text-slate-600">
                      {String(
                        item.course ??
                          item.program ??
                          item.degree ??
                          ""
                      )}
                    </p>
                  </article>
                )
              )}
            </div>
          </section>
        )}

        {skills.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold">
              Competencies
            </h2>

            <div className="mt-6 flex flex-wrap gap-3">
              {skills.map(
                (item: Record<string, unknown> | string, index: number) => (
                  <span
                    key={index}
                    className="rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700"
                  >
                    {typeof item === "string"
                      ? item
                      : String(
                          item.name ??
                            item.skill ??
                            item.title ??
                            "Skill"
                        )}
                  </span>
                )
              )}
            </div>
          </section>
        )}

        {certifications.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold">
              Certifications
            </h2>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {certifications.map(
                (item: Record<string, unknown>, index: number) => (
                  <article
                    key={String(item.id ?? index)}
                    className="rounded-2xl border border-slate-200 bg-white p-6"
                  >
                    <h3 className="font-bold">
                      {String(
                        item.name ??
                          item.title ??
                          "Certification"
                      )}
                    </h3>

                    <p className="mt-2 text-slate-600">
                      {String(
                        item.issuer ??
                          item.organization ??
                          ""
                      )}
                    </p>
                  </article>
                )
              )}
            </div>
          </section>
        )}

        {achievements.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold">
              Achievements
            </h2>

            <div className="mt-6 space-y-4">
              {achievements.map(
                (item: Record<string, unknown>, index: number) => (
                  <article
                    key={String(item.id ?? index)}
                    className="rounded-2xl border border-slate-200 bg-white p-6"
                  >
                    <h3 className="font-bold">
                      {String(
                        item.title ??
                          item.name ??
                          "Achievement"
                      )}
                    </h3>

                    <p className="mt-2 text-slate-600">
                      {String(item.description ?? "")}
                    </p>
                  </article>
                )
              )}
            </div>
          </section>
        )}
      </section>
    </main>
  );
}