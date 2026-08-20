"use client";

import { useState } from "react";
import { PortfolioData } from "@/types/portfolio";
import { getPortfolio, savePortfolio } from "@/lib/portfolio";
import { fileToStoredFile } from "@/lib/fileUtils";
import SectionHeader from "@/components/shared/SectionHeader";

export default function ProfileForm() {
  const [data, setData] = useState<PortfolioData>(
    () => getPortfolio()
  );

  const [saved, setSaved] = useState(false);

  function updateProfile(
    field: keyof PortfolioData["profile"],
    value: string
  ) {
    setData((current) => ({
      ...current,
      profile: {
        ...current.profile,
        [field]: value,
      },
    }));

    setSaved(false);
  }

  function saveChanges() {
    savePortfolio(data);
    setSaved(true);
  }

  async function handlePhotoUpload(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image.");
      return;
    }

    if (file.size > 1 * 1024 * 1024) {
      alert("Please keep the profile photo below 1MB.");
      return;
    }

    try {
      const storedFile = await fileToStoredFile(file);

      updateProfile("profilePhoto", storedFile.data);
    } catch {
      alert("Could not upload the profile photo.");
    }
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <SectionHeader
        title="Profile"
        description="Enter the professional information that will appear at the top of your portfolio."
      />

      <div className="mt-8 grid gap-5 md:grid-cols-2">

        {/* Full name */}
        <div>
          <label className="text-sm font-medium text-slate-700">
            Full name
          </label>

          <input
            value={data.profile.fullName}
            onChange={(e) =>
              updateProfile("fullName", e.target.value)
            }
            placeholder="Your full name"
            className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        {/* Professional title */}
        <div>
          <label className="text-sm font-medium text-slate-700">
            Professional title
          </label>

          <input
            value={data.profile.professionalTitle}
            onChange={(e) =>
              updateProfile(
                "professionalTitle",
                e.target.value
              )
            }
            placeholder="e.g. Clinical Officer"
            className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        {/* Location */}
        <div>
          <label className="text-sm font-medium text-slate-700">
            Location
          </label>

          <input
            value={data.profile.location}
            onChange={(e) =>
              updateProfile("location", e.target.value)
            }
            placeholder="Your location"
            className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        {/* Email */}
        <div>
          <label className="text-sm font-medium text-slate-700">
            Email
          </label>

          <input
            type="email"
            value={data.profile.email}
            onChange={(e) =>
              updateProfile("email", e.target.value)
            }
            placeholder="you@example.com"
            className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="text-sm font-medium text-slate-700">
            Phone
          </label>

          <input
            type="tel"
            value={data.profile.phone}
            onChange={(e) =>
              updateProfile("phone", e.target.value)
            }
            placeholder="+254..."
            className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        {/* Profile photo */}
        <div className="md:col-span-2">
          <label className="text-sm font-medium text-slate-700">
            Professional photograph
          </label>

          <div className="mt-3 flex flex-col gap-5 sm:flex-row sm:items-center">

            {/* Preview */}
            <div className="h-32 w-32 shrink-0 overflow-hidden rounded-full border-4 border-slate-100 bg-slate-100">
              {data.profile.profilePhoto ? (
                <img
                  src={data.profile.profilePhoto}
                  alt={
                    data.profile.fullName || "Profile"
                  }
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center px-3 text-center text-xs text-slate-500">
                  No photo
                </div>
              )}
            </div>

            {/* Upload */}
            <div>
              <label className="inline-block cursor-pointer rounded-lg border border-slate-300 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
                {data.profile.profilePhoto
                  ? "Change photograph"
                  : "Upload photograph"}

                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </label>

              <p className="mt-2 text-xs text-slate-500">
                JPG, PNG or other image · Maximum 1MB
              </p>
            </div>

          </div>
        </div>

      </div>

      {/* Save */}
      <div className="mt-8 flex flex-wrap items-center gap-4">

        <button
          type="button"
          onClick={saveChanges}
          className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
        >
          Save Profile
        </button>

        {saved && (
          <span className="text-sm font-medium text-green-600">
            ✓ Profile saved successfully
          </span>
        )}

      </div>
    </section>
  );
}