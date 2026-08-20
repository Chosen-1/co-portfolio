import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  Images,
  Stethoscope,
} from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">

      {/* Navigation */}
      <header className="border-b border-slate-200 bg-white">

        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-600 text-white">
              <Stethoscope size={20} />
            </div>

            <div>
              <p className="font-bold">
                CO<span className="text-teal-600">.</span>
              </p>

              <p className="text-xs text-slate-400">
                Portfolio Builder
              </p>
            </div>

          </div>

          <Link
            href="/builder"
            className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-teal-600"
          >
            Start Building
          </Link>

        </nav>

      </header>

      {/* Hero */}
      <section className="bg-slate-50">

        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">

          <div className="max-w-4xl">

            <div className="inline-flex items-center gap-2 rounded-full border border-teal-100 bg-white px-4 py-2 text-sm font-medium text-teal-700">
              <CheckCircle2 size={17} />
              Built for Clinical Officers
            </div>

            <h1 className="mt-7 text-5xl font-bold tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
              Your clinical journey.
              <span className="block text-teal-600">
                Your professional story.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600">
              Create, manage and share a professional digital portfolio
              containing your education, clinical experience, competencies,
              certifications, achievements, photographs and documents.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">

              <Link
                href="/builder"
                className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-6 py-3.5 font-semibold text-white hover:bg-teal-700"
              >
                Build My Portfolio
                <ArrowRight size={18} />
              </Link>

              <Link
                href="/builder"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 font-semibold text-slate-700"
              >
                View Builder
              </Link>

            </div>

          </div>

        </div>

      </section>

      {/* Features */}
      <section className="px-6 py-24 lg:px-8">

        <div className="mx-auto max-w-7xl">

          <div className="grid gap-6 md:grid-cols-3">

            <div className="rounded-2xl border border-slate-200 p-7">

              <FileText className="text-teal-600" size={28} />

              <h2 className="mt-5 text-xl font-bold">
                Your Documents
              </h2>

              <p className="mt-3 leading-7 text-slate-500">
                Store your CV, certificates, awards and other professional
                documents in one place.
              </p>

            </div>

            <div className="rounded-2xl border border-slate-200 p-7">

              <Images className="text-teal-600" size={28} />

              <h2 className="mt-5 text-xl font-bold">
                Your Gallery
              </h2>

              <p className="mt-3 leading-7 text-slate-500">
                Take photographs from your phone or upload professional
                images directly into your portfolio.
              </p>

            </div>

            <div className="rounded-2xl border border-slate-200 p-7">

              <CheckCircle2 className="text-teal-600" size={28} />

              <h2 className="mt-5 text-xl font-bold">
                Track Your Progress
              </h2>

              <p className="mt-3 leading-7 text-slate-500">
                See exactly which sections of your professional portfolio
                are complete and what still needs attention.
              </p>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}