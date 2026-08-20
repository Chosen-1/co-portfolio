/* eslint-diasable
@next/next/no-img-element */
import { PortfolioData } from "@/types/portfolio";

type HeroProps = {
  profile: PortfolioData["profile"];
};

export default function Hero({ profile }: HeroProps) {
  return (
    <section className="border-b border-slate-200 bg-white px-4 py-6 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-6xl px-6 py-16 lg:py-24">
        <div className="flex flex-col items-center gap-8 text-center md:flex-row md:items-center md:text-left md:gap-8">
          
          {/* Profile Photo */}
          <div className="h-32 w-32 shrink-0 overflow-hidden rounded-full border-4 border-white shadow-xl ring-1 ring-slate-200 sm:h-36 sm:w-36 md:h-40 md:w-40">
            {profile.profilePhoto ? (
              <img 
                src={profile.profilePhoto}
                alt={profile.fullName}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-slate-100 text-sm text-slate-400">
                No Photo
              </div>
            )}
          </div>

          {/* Profile Details */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
              Clinical Professional
            </p>

            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
              {profile.fullName || "Your Name"}
            </h1>

            <p className="mt-3 text-xl font-medium text-slate-600">
              {profile.professionalTitle || "Clinical Officer"}
            </p>

            {profile.location && (
              <p className="mt-2 text-sm text-slate-500">
                {profile.location}
              </p>
            )}

            <div className="mt-6 flex flex-wrap justify-center gap-3 md:justify-start">
              {profile.email && (
                <a
                  href={`mailto:${profile.email}`}
                  className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-blue-50 hover:text-blue-700"
                >
                  Email
                </a>
              )}

              {profile.phone && (
                <a
                  href={`tel:${profile.phone}`}
                  className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-blue-50 hover:text-blue-700"
                >
                  Call
                </a>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}