"use client";

import { useState } from "react";
import { Achievement, StoredFile } from "@/types/portfolio";
import SectionHeader from "@/components/shared/SectionHeader";
import { getPortfolio, savePortfolio } from "@/lib/portfolio";
import { fileToStoredFile } from "@/lib/fileUtils";

export default function AchievementForm() {
  const [items, setItems] = useState<Achievement[]>([]);

  const [title, setTitle] = useState("");
  const [organization, setOrganization] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [evidence, setEvidence] =
    useState<StoredFile | undefined>();



  function saveItems(newItems: Achievement[]) {
    setItems(newItems);

    const data = getPortfolio();

    savePortfolio({
      ...data,
      achievements: newItems,
    });
  }

  async function handleEvidenceUpload(
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
      alert("Please keep the evidence below 2MB.");
      return;
    }

    try {
      const storedFile = await fileToStoredFile(file);

      setEvidence(storedFile);
    } catch {
      alert("Could not upload the evidence.");
    }
  }

  function addAchievement() {
    if (!title.trim()) {
      alert("Please enter the achievement title.");
      return;
    }

    const newAchievement: Achievement = {
      id: crypto.randomUUID(),
      title: title.trim(),
      organization: organization.trim(),
      date,
      description: description.trim(),
      evidence,
    };

    saveItems([...items, newAchievement]);

    setTitle("");
    setOrganization("");
    setDate("");
    setDescription("");
    setEvidence(undefined);
  }

  function removeAchievement(id: string) {
    const updated = items.filter((item) => item.id !== id);
    saveItems(updated);
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <SectionHeader
        title="Achievements"
        description="Showcase awards, leadership roles, projects and other professional achievements."
      />

      {/* Form */}
      <div className="mt-8 space-y-5">
        <div>
          <label className="text-sm font-medium text-slate-700">
            Achievement title
          </label>

          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Hackathon First Runner-Up"
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
            placeholder="e.g. University / Organization"
            className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">
            Date
          </label>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">
            Description
          </label>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            placeholder="Describe the achievement..."
            className="mt-2 w-full resize-none rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        {/* Evidence */}
        <div>
          <label className="text-sm font-medium text-slate-700">
            Evidence
          </label>

          <input
            type="file"
            accept=".pdf,image/*"
            onChange={handleEvidenceUpload}
            className="mt-2 block w-full rounded-lg border border-slate-300 p-3 text-sm"
          />

          {evidence && (
            <div className="mt-3 flex flex-wrap items-center gap-3 rounded-lg bg-slate-50 p-3">
              <span className="text-sm text-slate-700">
                📎 {evidence.name}
              </span>

              <button
                type="button"
                onClick={() => setEvidence(undefined)}
                className="text-sm font-medium text-red-600 hover:underline"
              >
                Remove
              </button>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={addAchievement}
          className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
        >
          Add Achievement
        </button>
      </div>

      {/* Existing achievements */}
      <div className="mt-10 space-y-4">
        {items.length === 0 ? (
          <p className="text-sm text-slate-500">
            No achievements added yet.
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
                    {item.title}
                  </h3>

                  {item.organization && (
                    <p className="mt-1 text-blue-700">
                      {item.organization}
                    </p>
                  )}

                  {item.date && (
                    <p className="mt-1 text-sm text-slate-500">
                      {item.date}
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => removeAchievement(item.id)}
                  className="rounded-lg border border-red-200 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  Remove
                </button>
              </div>

              {item.description && (
                <p className="mt-4 text-sm leading-6 text-slate-600">
                  {item.description}
                </p>
              )}

              {item.evidence && (
                <div className="mt-4">
                  <a
                    href={item.evidence.data}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-blue-600 hover:underline"
                  >
                    📄 View evidence
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