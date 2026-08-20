"use client";

import { ChangeEvent, useState } from "react";
import Image from "next/image"

type ImageUploadProps = {
  value?: string;
  onChange: (image: string) => void;
  label?: string;
};

export default function ImageUpload({
  value,
  onChange,
  label = "Professional Photo",
}: ImageUploadProps) {
  const [error, setError] = useState("");

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select an image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Please choose an image smaller than 5MB.");
      return;
    }

    setError("");

    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        onChange(reader.result);
      }
    };

    reader.readAsDataURL(file);
  }

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-slate-700">
        {label}
      </label>

      <div className="flex flex-col items-center gap-5 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 sm:flex-row">
        <div className=" relative flex h-32 w-32 shrink-0 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-slate-200 shadow-sm">
          {value ? (
            <Image
              src={value}
              alt="Professional profile preview"
              fill
              unoptimized
              className="object-cover"
            />
          ) : (
            <div className="text-center text-sm text-slate-400">
              No photo
            </div>
          )}
        </div>

        <div className="flex-1 text-center sm:text-left">
          <p className="font-medium text-slate-800">
            Upload your professional photo
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Choose a photo from your device or take one with your camera.
          </p>

          <label className="mt-4 inline-flex cursor-pointer rounded-lg bg-blue-700 px-5 py-3 font-medium text-white transition hover:bg-blue-800">
            {value ? "Change Photo" : "Choose Photo"}

            <input
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>

          {error && (
            <p className="mt-3 text-sm text-red-600">
              {error}
            </p>
          )}

          <p className="mt-2 text-xs text-slate-400">
            JPG, PNG or other image formats • Maximum 5MB
          </p>
        </div>
      </div>
    </div>
  );
}