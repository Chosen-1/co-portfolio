import Image from "next/image";
import type { Certification } from "@/types/portfolio";
import SectionHeader from "@/components/shared/SectionHeader";

type CertificationsProps = {
  items: Certification[];
};

export default function Certifications({
  items,
}: CertificationsProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section
      id="certifications"
      className="scroll-mt-24 border-t border-slate-200 py-12 sm:py-16"
    >
      <SectionHeader
        eyebrow="Professional Development"
        title="Certifications"
        description="Professional certifications, courses and additional training that support my clinical practice."
      />

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {items.map((item) => (
          <article
            key={item.id}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-blue-700">
                  {item.issueDate}
                  {item.expiryDate && ` — ${item.expiryDate}`}
                </p>

                <h3 className="mt-2 text-xl font-bold text-slate-900">
                  {item.name}
                </h3>

                <p className="mt-1 text-sm font-medium text-slate-600">
                  {item.organization}
                </p>
              </div>

              {item.certificate && (
                <div className="shrink-0">
                  <div className="relative h-32 w-24 overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
                    <Image
                      src={item.certificate.data}
                      alt={`${item.name} certificate`}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                </div>
              )}
            </div>

            {item.expiryDate && (
              <div className="mt-5 border-t border-slate-100 pt-4">
                <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                  Validity
                </p>

                <p className="mt-1 text-sm text-slate-600">
                  Issued {item.issueDate} · Expires {item.expiryDate}
                </p>
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}