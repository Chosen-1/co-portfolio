"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import {
  getPortfolio,
  savePortfolio,
} from "@/lib/portfolio";
import { Skill } from "@/types/portfolio";
import SectionHeader from "@/components/shared/SectionHeader";

export default function SkillsForm() {
  const [items, setItems] = useState<Skill[]>(
    () => getPortfolio().skills
  );

  function save(updated: Skill[]) {
    setItems(updated);

    void savePortfolio({
      ...getPortfolio(),
      skills: updated,
    }).catch((error) => {
      console.error("Failed to save skills:", error);
    });
  }

  function add() {
    save([
      ...items,
      {
        id: crypto.randomUUID(),
        name: "",
        category: "Clinical",
        description: "",
      },
    ]);
  }

  function update(
    id: string,
    field: keyof Skill,
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
        eyebrow="Professional Competencies"
        title="Clinical Skills"
        description="Showcase the competencies you have developed."
      />

      <button
        onClick={add}
        className="mb-6 inline-flex items-center gap-2 rounded-xl bg-teal-600 px-5 py-3 font-semibold text-white"
      >
        <Plus size={18} />
        Add Competency
      </button>

      <div className="grid gap-5 md:grid-cols-2">
        {items.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="flex justify-end">
              <button
                onClick={() => remove(item.id)}
                className="text-red-500"
              >
                <Trash2 size={18} />
              </button>
            </div>

            <input
              value={item.name}
              onChange={(e) =>
                update(item.id, "name", e.target.value)
              }
              placeholder="Competency name"
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3"
            />

            <input
              value={item.category}
              onChange={(e) =>
                update(item.id, "category", e.target.value)
              }
              placeholder="Category"
              className="mt-4 w-full rounded-xl border border-slate-200 px-4 py-3"
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
              placeholder="Describe this competency"
              rows={4}
              className="mt-4 w-full rounded-xl border border-slate-200 px-4 py-3"
            />
          </div>
        ))}
      </div>
    </div>
  );
}