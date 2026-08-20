import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import PrintButton from "@/components/portfolio/PrintButton";

type Props = {
  params: Promise<{
    username: string;
  }>;
};

export default async function PrintPortfolioPage({
  params,
}: Props) {
  const { username } = await params;

  const supabase = await createClient();

  const { data } = await supabase
    .from("portfolios")
    .select("*")
    .eq("username", username)
    .maybeSingle();

  if (!data) {
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
        }
      : {};

  return (
    <main className="min-h-screen bg-white text-black">
      <article className="mx-auto max-w-4xl px-10 py-12 print:max-w-none">
        <header className="border-b pb-6">
          <h1 className="text-4xl font-bold">
            {profile.fullName || "Clinical Officer"}
          </h1>

          <p className="mt-2 text-lg">
            {profile.professionalTitle || "Clinical Officer"}
          </p>

          <div className="mt-3 text-sm text-slate-600">
            {profile.location && <span>{profile.location}</span>}
            {profile.email && (
              <span className="ml-4">{profile.email}</span>
            )}
            {profile.phone && (
              <span className="ml-4">{profile.phone}</span>
            )}
          </div>
        </header>

        {data.about && (
          <section className="mt-8">
            <h2 className="text-xl font-bold">About</h2>
            <p className="mt-3 whitespace-pre-line leading-7">
              {data.about}
            </p>
          </section>
        )}

        <section className="mt-10">
          <h2 className="text-xl font-bold">
            Professional Experience
          </h2>

          <div className="mt-4">
            {Array.isArray(data.experiences) &&
              data.experiences.map(
                (
                  item: Record<string, unknown>,
                  index: number
                ) => (
                  <div
                    key={String(item.id ?? index)}
                    className="mb-5"
                  >
                    <h3 className="font-bold">
                      {String(
                        item.title ??
                          item.position ??
                          item.role ??
                          "Experience"
                      )}
                    </h3>

                    <p>
                      {String(
                        item.organization ??
                          item.company ??
                          ""
                      )}
                    </p>

                    <p className="mt-1 text-sm text-slate-600">
                      {String(item.description ?? "")}
                    </p>
                  </div>
                )
              )}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-bold">
            Education
          </h2>

          <div className="mt-4">
            {Array.isArray(data.education) &&
              data.education.map(
                (
                  item: Record<string, unknown>,
                  index: number
                ) => (
                  <div
                    key={String(item.id ?? index)}
                    className="mb-5"
                  >
                    <h3 className="font-bold">
                      {String(
                        item.institution ??
                          item.school ??
                          "Education"
                      )}
                    </h3>

                    <p>
                      {String(
                        item.course ??
                          item.program ??
                          item.degree ??
                          ""
                      )}
                    </p>
                  </div>
                )
              )}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-bold">
            Competencies
          </h2>

          <div className="mt-4">
            {Array.isArray(data.skills) &&
              data.skills.map(
                (
                  item: Record<string, unknown> | string,
                  index: number
                ) => (
                  <span
                    key={index}
                    className="mr-3 inline-block"
                  >
                    {typeof item === "string"
                      ? item
                      : String(
                          item.name ??
                            item.skill ??
                            item.title ??
                            ""
                        )}
                  </span>
                )
              )}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-bold">
            Certifications
          </h2>

          <div className="mt-4">
            {Array.isArray(data.certifications) &&
              data.certifications.map(
                (
                  item: Record<string, unknown>,
                  index: number
                ) => (
                  <div
                    key={String(item.id ?? index)}
                    className="mb-4"
                  >
                    <strong>
                      {String(
                        item.name ??
                          item.title ??
                          "Certification"
                      )}
                    </strong>

                    <p>
                      {String(
                        item.issuer ??
                          item.organization ??
                          ""
                      )}
                    </p>
                  </div>
                )
              )}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-bold">
            Achievements
          </h2>

          <div className="mt-4">
            {Array.isArray(data.achievements) &&
              data.achievements.map(
                (
                  item: Record<string, unknown>,
                  index: number
                ) => (
                  <div
                    key={String(item.id ?? index)}
                    className="mb-4"
                  >
                    <strong>
                      {String(
                        item.title ??
                          item.name ??
                          "Achievement"
                      )}
                    </strong>

                    <p>
                      {String(item.description ?? "")}
                    </p>
                  </div>
                )
              )}
          </div>
        </section>
      </article>

      <div className="fixed bottom-6 right-6 print:hidden">
        <PrintButton />
      </div>
    </main>
  );
}