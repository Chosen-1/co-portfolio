"use client";

import {  useState } from "react";
import { StoredFile } from "@/types/portfolio";
import SectionHeader from "@/components/shared/SectionHeader";
import { getPortfolio, savePortfolio } from "@/lib/portfolio";
import { fileToStoredFile } from "@/lib/fileUtils";

export default function DocumentsForm() {
  const [cv, setCv] = useState<StoredFile | undefined>();
  const [other, setOther] = useState<StoredFile[]>([]);



  function saveDocuments(
    newCv: StoredFile | undefined,
    newOther: StoredFile[]
  ) {
    setCv(newCv);
    setOther(newOther);

    const data = getPortfolio();

    savePortfolio({
      ...data,
      documents: {
        cv: newCv,
        other: newOther,
      },
    });
  }

  async function handleCvUpload(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Please upload your CV as a PDF.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("Please keep the CV below 2MB.");
      return;
    }

    try {
      const storedFile = await fileToStoredFile(file);

      saveDocuments(storedFile, other);
    } catch {
      alert("Something went wrong while uploading the CV.");
    }
  }

  async function handleOtherUpload(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const files = Array.from(event.target.files || []);

    if (files.length === 0) return;

    try {
      const storedFiles = await Promise.all(
        files.map((file) => fileToStoredFile(file))
      );

      saveDocuments(cv, [...other, ...storedFiles]);
    } catch {
      alert("Something went wrong while uploading the files.");
    }
  }

  function removeOtherFile(index: number) {
    const updated = other.filter((_, i) => i !== index);

    saveDocuments(cv, updated);
  }

  function removeCv() {
    saveDocuments(undefined, other);
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <SectionHeader
        title="Documents"
        description="Upload your CV and other professional documents."
      />

      {/* CV */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-slate-900">
          Curriculum Vitae
        </h3>

        {!cv ? (
          <label className="mt-4 block cursor-pointer rounded-xl border-2 border-dashed border-slate-300 p-8 text-center transition hover:border-blue-500 hover:bg-blue-50">
            <span className="text-sm font-medium text-slate-700">
              Click to upload your CV
            </span>

            <p className="mt-2 text-xs text-slate-500">
              PDF only · Maximum 2MB
            </p>

            <input
              type="file"
              accept="application/pdf"
              onChange={handleCvUpload}
              className="hidden"
            />
          </label>
        ) : (
          <div className="mt-4 rounded-xl border border-slate-200 p-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-medium text-slate-900">
                  📄 {cv.name}
                </p>

                <p className="text-sm text-slate-500">
                  Your CV is uploaded.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <a
                  href={cv.data}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                  Preview
                </a>

                <label className="cursor-pointer rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
                  Replace
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={handleCvUpload}
                    className="hidden"
                  />
                </label>

                <button
                  type="button"
                  onClick={removeCv}
                  className="rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Other documents */}
      <div className="mt-10">
        <h3 className="text-lg font-semibold text-slate-900">
          Other Documents
        </h3>

        <label className="mt-4 block cursor-pointer rounded-xl border-2 border-dashed border-slate-300 p-6 text-center transition hover:border-blue-500 hover:bg-blue-50">
          <span className="text-sm font-medium text-slate-700">
            Add professional documents
          </span>

          <p className="mt-2 text-xs text-slate-500">
            Certificates, recommendation letters, licenses, etc.
          </p>

          <input
            type="file"
            multiple
            onChange={handleOtherUpload}
            className="hidden"
          />
        </label>

        {other.length > 0 && (
          <div className="mt-4 space-y-3">
            {other.map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                className="flex flex-col gap-3 rounded-xl border border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <p className="font-medium text-slate-800">
                  📎 {file.name}
                </p>

                <div className="flex gap-2">
                  <a
                    href={file.data}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg bg-slate-900 px-3 py-2 text-sm text-white"
                  >
                    Open
                  </a>

                  <button
                    type="button"
                    onClick={() => removeOtherFile(index)}
                    className="rounded-lg border border-red-200 px-3 py-2 text-sm text-red-600"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}