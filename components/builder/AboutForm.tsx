"use client";

import { useState } from "react";
import { Save } from "lucide-react";
import {
  getPortfolio,
  savePortfolio,
} from "@/lib/portfolio";
import SectionHeader from "@/components/shared/SectionHeader";

export default function AboutForm() {
  const [about, setAbout] = useState(()=>getPortfolio().about
);
  const [saved, setSaved] = useState(false);


  function save() {
    const data = getPortfolio();

    savePortfolio({
      ...data,
      about,
    });

    setSaved(true);
  }

  return (
    <div>

      <SectionHeader
        eyebrow="Personal Story"
        title="About Me"
        description="Tell visitors about your professional journey, values and passion for healthcare."
      />

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <label className="block">

          <span className="text-sm font-medium text-slate-700">
            Your story
          </span>

          <textarea
            value={about}
            onChange={(e) => {
              setAbout(e.target.value);
              setSaved(false);
            }}
            rows={12}
            placeholder="Write your professional story here..."
            className="mt-3 w-full resize-y rounded-xl border border-slate-200 p-4 leading-7 outline-none focus:border-teal-500"
          />

        </label>

        <div className="mt-4 flex items-center justify-between">

          <p className="text-xs text-slate-400">
            {about.length} characters
          </p>

          <button
            onClick={save}
            className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-5 py-3 font-semibold text-white"
          >
            <Save size={18} />

            {saved ? "Saved!" : "Save Changes"}
          </button>

        </div>

      </div>

    </div>
  );
}