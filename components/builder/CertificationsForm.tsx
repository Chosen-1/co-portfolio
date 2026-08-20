"use client";

import { useState } from "react";
import { Certification, StoredFile } from "@/types/portfolio";
import SectionHeader from "@/components/shared/SectionHeader";
import { getPortfolio, savePortfolio } from "@/lib/portfolio";
import { fileToStoredFile } from "@/lib/fileUtils";


export default function CertificationForm() {
  const [items, setItems] = useState<Certification []>([]);
  const [name, setName] = useState("");
  const [organization, setOrganization] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [certificate, setCertificate] =
    useState<StoredFile | undefined>();



  function saveItems(newItems: Certification[]) {
    setItems(newItems);

    const data = getPortfolio();

    savePortfolio({
      ...data,
      certifications: newItems,
    });
  }

  async function handleCertificateUpload(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) return;

    if (
      !file.type.includes("pdf") &&
      !file.type.startsWith("image/")
    ) {
      alert("Please upload a PDF or image file.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("Please keep the certificate below 2MB.");
      return;
    }

    try {
      const storedFile = await fileToStoredFile(file);

      setCertificate(storedFile);
    } catch {
      alert("Could not upload the certificate.");
    }
  }

  function addCertification() {
    if (!name.trim() || !organization.trim()) {
      alert("Please enter the certification name and organization.");
      return;
    }

    const newCertification: Certification = {
      id: crypto.randomUUID(),
      name: name.trim(),
      organization: organization.trim(),
      issueDate,
      expiryDate,
      certificate,
    };

    saveItems([...items, newCertification]);

    setName("");
    setOrganization("");
    setIssueDate("");
    setExpiryDate("");
    setCertificate(undefined);
  }

  function removeCertification(id: string) {
    const updated = items.filter((item) => item.id !== id);
    saveItems(updated);
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <SectionHeader
        title="Certifications"
        description="Add professional certifications and upload supporting certificates."
      />

      {/* Form */}
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-slate-700">
            Certification name
          </label>

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Basic Life Support"
            className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">
            Organization
          </label>

          <input
            value={organization}
            onChange={(e) => setOrganization(e.target.value)}
            placeholder="e.g. Kenya Red Cross"
            className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">
            Issue date
          </label>

          <input
            type="date"
            value={issueDate}
            onChange={(e) => setIssueDate(e.target.value)}
            className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">
            Expiry date
          </label>

          <input
            type="date"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        {/* Certificate */}
        <div className="md:col-span-2">
          <label className="text-sm font-medium text-slate-700">
            Certificate
          </label>

          <input
            type="file"
            accept=".pdf,image/*"
            onChange={handleCertificateUpload}
            className="mt-2 block w-full rounded-lg border border-slate-300 p-3 text-sm"
          />

          {certificate && (
            <div className="mt-3 flex flex-wrap items-center gap-3 rounded-lg bg-slate-50 p-3">
              <span className="text-sm text-slate-700">
                📜 {certificate.name}
              </span>

              <button
                type="button"
                onClick={() => setCertificate(undefined)}
                className="text-sm font-medium text-red-600 hover:underline"
              >
                Remove
              </button>
            </div>
          )}
        </div>

        <div className="md:col-span-2">
          <button
            type="button"
            onClick={addCertification}
            className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
          >
            Add Certification
          </button>
        </div>
      </div>

      {/* Existing certifications */}
      <div className="mt-10 space-y-4">
        {items.length === 0 ? (
          <p className="text-sm text-slate-500">
            No certifications added yet.
          </p>
        ) : (
          items.map((item) => (
            <article
              key={item.id}
              className="rounded-xl border border-slate-200 p-5"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    {item.name}
                  </h3>

                  <p className="mt-1 text-blue-700">
                    {item.organization}
                  </p>

                  {item.issueDate && (
                    <p className="mt-2 text-sm text-slate-500">
                      Issued: {item.issueDate}
                    </p>
                  )}

                  {item.expiryDate && (
                    <p className="text-sm text-slate-500">
                      Expires: {item.expiryDate}
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => removeCertification(item.id)}
                  className="rounded-lg border border-red-200 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  Remove
                </button>
              </div>

              {item.certificate && (
                <div className="mt-4">
                  <a
                    href={item.certificate.data}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-blue-600 hover:underline"
                  >
                    📄 View certificate
                  </a>
                </div>
              )}
            </article>
          ))
        )}
      </div>
    </section>
  );
}