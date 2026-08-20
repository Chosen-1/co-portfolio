type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export default function SectionHeader({
  eyebrow,
  title,
  description,
}: SectionHeaderProps) {
  return (
    <div className="mb-8">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-600">
        {eyebrow}
      </p>

      <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
        {title}
      </h1>

      {description && (
        <p className="mt-3 max-w-2xl text-slate-500">
          {description}
        </p>
      )}
    </div>
  );
}