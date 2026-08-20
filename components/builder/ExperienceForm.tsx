"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import {
  getPortfolio,
  savePortfolio,
} from "@/lib/portfolio";
import { Experience } from "@/types/portfolio";
import SectionHeader from "@/components/shared/SectionHeader";

const emptyExperience: Experience = {
  id: "",
  position: "",
  facility: "",
  department: "",
  startDate: "",
  endDate: "",
  description: "",
};

export default function ExperienceForm() {
  const [items, setItems] = useState<Experience[]>(
    ()=> getPortfolio().experiences
  );


  function save(itemsToSave: Experience[]) {
    setItems(itemsToSave);

    const data = getPortfolio();

    savePortfolio({
      ...data,
      experiences: itemsToSave,
    });
  }

  function addExperience() {
    save([
      ...items,
      {
        ...emptyExperience,
        id: crypto.randomUUID(),
      },
    ]);
  }

  function update(
    id: string,
    field: keyof Experience,
    value: string
  ) {
    save(
      items.map((item) =>
        item.id === id
          ? {
              ...item,
              [field]: value,
            }
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
        eyebrow="Professional Journey"
        title="Experience"
        description="Add your real clinical and professional experience."
      />

      <button
        onClick={addExperience}
        className="mb-6 inline-flex items-center gap-2 rounded-xl bg-teal-600 px-5 py-3 font-semibold text-white"
      >
        <Plus size={18} />
        Add Experience
      </button>

      <div className="space-y-6">

        {items.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-300 p-12 text-center">
            <p className="font-medium text-slate-600">
              No experience added yet.
            </p>
          </div>
        )}

        {items.map((item, index) => (
          <div
            key={item.id}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >

            <div className="mb-6 flex items-center justify-between">

              <h2 className="font-bold text-slate-900">
                Experience {index + 1}
              </h2>

              <button
                onClick={() => remove(item.id)}
                className="rounded-lg p-2 text-red-500 hover:bg-red-50"
              >
                <Trash2 size={18} />
              </button>

            </div>

            <div className="grid gap-5 sm:grid-cols-2">

              <input
                value={item.position}
                onChange={(e) =>
                  update(item.id, "position", e.target.value)
                }
                placeholder="Position / Job title"
                className="rounded-xl border border-slate-200 px-4 py-3"
              />

              <input
                value={item.facility}
                onChange={(e) =>
                  update(item.id, "facility", e.target.value)
                }
                placeholder="Facility / Hospital"
                className="rounded-xl border border-slate-200 px-4 py-3"
              />

              <input
                value={item.department}
                onChange={(e) =>
                  update(item.id, "department", e.target.value)
                }
                placeholder="Department"
                className="rounded-xl border border-slate-200 px-4 py-3"
              />

              <input
                type="date"
                value={item.startDate}
                onChange={(e) =>
                  update(item.id, "startDate", e.target.value)
                }
                className="rounded-xl border border-slate-200 px-4 py-3"
              />

              <input
                type="date"
                value={item.endDate}
                onChange={(e) =>
                  update(item.id, "endDate", e.target.value)
                }
                className="rounded-xl border border-slate-200 px-4 py-3"
              />

              <input
                value={item.description}
                onChange={(e) =>
                  update(
                    item.id,
                    "description",
                    e.target.value
                  )
                }
                placeholder="Brief description"
                className="rounded-xl border border-slate-200 px-4 py-3 sm:col-span-2"
              />

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}