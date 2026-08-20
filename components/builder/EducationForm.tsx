"use client";

import {  useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import {
  getPortfolio,
  savePortfolio,
} from "@/lib/portfolio";
import { Education } from "@/types/portfolio";
import SectionHeader from "@/components/shared/SectionHeader";

export default function EducationForm() {
  const [items, setItems] = useState<Education[]>(
    ()=> getPortfolio().education
  );


  function save(itemsToSave: Education[]) {
    setItems(itemsToSave);

    savePortfolio({
      ...getPortfolio(),
      education: itemsToSave,
    });
  }

  function addEducation() {
    save([
      ...items,
      {
        id: crypto.randomUUID(),
        institution: "",
        qualification: "",
        startYear: "",
        endYear: "",
        description: "",
      },
    ]);
  }

  function update(
    id: string,
    field: keyof Education,
    value: string
  ) {
    save(
      items.map((item) =>
        item.id === id
          ? { ...item, [field]: value }
          : item
      )
    );
  }

  function remove(id: string) {
    save(items.filter((item) => item.id !== id));
  }

  return (
    <div>

      <SectionHeader
        eyebrow="Academic Background"
        title="Education"
        description="Add your academic qualifications and training."
      />

      <button
        onClick={addEducation}
        className="mb-6 inline-flex items-center gap-2 rounded-xl bg-teal-600 px-5 py-3 font-semibold text-white"
      >
        <Plus size={18} />
        Add Education
      </button>

      <div className="space-y-6">

        {items.map((item, index) => (
          <div
            key={item.id}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >

            <div className="mb-6 flex justify-between">

              <h2 className="font-bold">
                Qualification {index + 1}
              </h2>

              <button
                onClick={() => remove(item.id)}
                className="text-red-500"
              >
                <Trash2 size={18} />
              </button>

            </div>

            <div className="grid gap-5 sm:grid-cols-2">

              <input
                value={item.qualification}
                onChange={(e) =>
                  update(
                    item.id,
                    "qualification",
                    e.target.value
                  )
                }
                placeholder="Qualification"
                className="rounded-xl border border-slate-200 px-4 py-3"
              />

              <input
                value={item.institution}
                onChange={(e) =>
                  update(
                    item.id,
                    "institution",
                    e.target.value
                  )
                }
                placeholder="Institution"
                className="rounded-xl border border-slate-200 px-4 py-3"
              />

              <input
                value={item.startYear}
                onChange={(e) =>
                  update(
                    item.id,
                    "startYear",
                    e.target.value
                  )
                }
                placeholder="Start year"
                className="rounded-xl border border-slate-200 px-4 py-3"
              />

              <input
                value={item.endYear}
                onChange={(e) =>
                  update(
                    item.id,
                    "endYear",
                    e.target.value
                  )
                }
                placeholder="Completion year"
                className="rounded-xl border border-slate-200 px-4 py-3"
              />

              <textarea
                value={item.description}
                onChange={(e) =>
                  update(
                    item.id,
                    "description",
                    e.target.value
                  )
                }
                placeholder="Description"
                rows={4}
                className="rounded-xl border border-slate-200 px-4 py-3 sm:col-span-2"
              />

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}