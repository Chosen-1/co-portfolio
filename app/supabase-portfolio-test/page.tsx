import { getUserPortfolio } from "@/lib/supabase/portfolio";

export default async function SupabasePortfolioTestPage() {
  let portfolio = null;
  let errorMessage = "";

  try {
    portfolio = await getUserPortfolio();
  } catch (error) {
    errorMessage =
      error instanceof Error
        ? error.message
        : "Something went wrong while loading the portfolio.";
  }

  if (errorMessage) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 p-8">
        <div className="w-full max-w-lg rounded-2xl border border-red-200 bg-white p-8 shadow-sm">
          <h1 className="text-xl font-bold text-red-600">
            Supabase Error
          </h1>

          <p className="mt-4 text-slate-700">
            {errorMessage}
          </p>
        </div>
      </main>
    );
  }

  if (!portfolio) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 p-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-xl font-bold text-slate-900">
            No Portfolio
          </h1>

          <p className="mt-4 text-slate-600">
            No portfolio data was returned.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">
          Supabase Portfolio Test
        </h1>

        <p className="mt-2 text-slate-500">
          Your portfolio was successfully loaded from Supabase.
        </p>

        <div className="mt-8 space-y-4">
          <div>
            <p className="font-semibold text-slate-900">
              Username
            </p>

            <p className="text-slate-600">
              {portfolio.username}
            </p>
          </div>

          <div>
            <p className="font-semibold text-slate-900">
              About
            </p>

            <p className="text-slate-600">
              {portfolio.about || "No about information yet."}
            </p>
          </div>

          <div>
            <p className="font-semibold text-slate-900">
              Experiences
            </p>

            <p className="text-slate-600">
              {portfolio.experiences.length}
            </p>
          </div>

          <div>
            <p className="font-semibold text-slate-900">
              Education
            </p>

            <p className="text-slate-600">
              {portfolio.education.length}
            </p>
          </div>

          <div>
            <p className="font-semibold text-slate-900">
              Skills
            </p>

            <p className="text-slate-600">
              {portfolio.skills.length}
            </p>
          </div>

          <div>
            <p className="font-semibold text-slate-900">
              Certifications
            </p>

            <p className="text-slate-600">
              {portfolio.certifications.length}
            </p>
          </div>

          <div>
            <p className="font-semibold text-slate-900">
              Achievements
            </p>

            <p className="text-slate-600">
              {portfolio.achievements.length}
            </p>
          </div>

          <div>
            <p className="font-semibold text-slate-900">
              Gallery
            </p>

            <p className="text-slate-600">
              {portfolio.gallery.length}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}