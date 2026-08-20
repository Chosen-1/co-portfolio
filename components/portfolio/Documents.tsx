import type { StoredFile } from "@/types/portfolio";
import SectionHeader from "@/components/shared/SectionHeader";

type DocumentsProps = {
  documents: {
    cv?: StoredFile;
    other: StoredFile[];
  };
};

export default function Documents({
  documents,
}: DocumentsProps) {
  const hasDocuments =
    Boolean(documents.cv) || documents.other.length > 0;

  if (!hasDocuments) {
    return null;
  }

  return (
    <section
      id="documents"
      className="scroll-mt-24 border-t border-slate-200 py-12 sm:py-16"
    >
      <SectionHeader
        eyebrow="Professional Documents"
        title="Documents"
        description="Professional documents and supporting materials available for review."
      />

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {/* CV */}
        {documents.cv && (
          <a
            href={documents.cv.data}
            download={documents.cv.name}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                📄
              </div>

              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wider text-blue-700">
                  Curriculum Vitae
                </p>

                <h3 className="mt-1 truncate font-semibold text-slate-900 group-hover:text-blue-700">
                  {documents.cv.name}
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  View or download CV
                </p>
              </div>
            </div>
          </a>
        )}

        {/* Other documents */}
        {documents.other.map((file) => (
          <a
            key={`${file.name}-${file.data}`}
            href={file.data}
            download={file.name}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                📎
              </div>

              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Supporting Document
                </p>

                <h3 className="mt-1 truncate font-semibold text-slate-900 group-hover:text-blue-700">
                  {file.name}
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  View or download document
                </p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}