type AboutProps = {
  about: string;
};

export default function About({ about }: AboutProps) {
  if (!about.trim()) {
    return null;
  }

  return (
    <section 
    id="about"
    className="scroll-mt-24 py-12 sm:py-16">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
          Professional Profile
        </p>

        <h2 className="mt-2 text-3xl font-bold text-slate-900">
          About Me
        </h2>

        <p className="mt-6 whitespace-pre-line text-lg leading-8 text-slate-600">
          {about}
        </p>
      </div>
    </section>
  );
}