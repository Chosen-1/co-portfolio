"use client";

import { useState } from "react";
import { GalleryItem } from "@/types/portfolio";
import SectionHeader from "@/components/shared/SectionHeader";
import { getPortfolio, savePortfolio } from "@/lib/portfolio";
import { fileToStoredFile } from "@/lib/fileUtils";

export default function GalleryForm() {
  const [items, setItems] = useState<GalleryItem[]>([]);

  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState("");


  function saveItems(newItems: GalleryItem[]) {
    setItems(newItems);

    const data = getPortfolio();

    savePortfolio({
      ...data,
      gallery: newItems,
    });
  }

  async function handleImageUpload(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image.");
      return;
    }

    if (file.size > 1 * 1024 * 1024) {
      alert("Please keep gallery images below 1MB.");
      return;
    }

    try {
      const storedFile = await fileToStoredFile(file);

      setImage(storedFile.data);
    } catch {
      alert("Could not upload the image.");
    }
  }

  function addGalleryItem() {
    if (!title.trim()) {
      alert("Please enter a title.");
      return;
    }

    if (!image) {
      alert("Please select an image.");
      return;
    }

    const newItem: GalleryItem = {
      id: crypto.randomUUID(),
      title: title.trim(),
      caption: caption.trim(),
      image,
    };

    saveItems([...items, newItem]);

    setTitle("");
    setCaption("");
    setImage("");
  }

  function removeGalleryItem(id: string) {
    const updated = items.filter((item) => item.id !== id);

    saveItems(updated);
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <SectionHeader
        title="Gallery"
        description="Add professional photographs from your clinical journey, training, events and activities."
      />

      {/* Form */}
      <div className="mt-8 space-y-5">
        <div>
          <label className="text-sm font-medium text-slate-700">
            Photo title
          </label>

          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Community Health Outreach"
            className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">
            Caption
          </label>

          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            rows={3}
            placeholder="Describe the photograph..."
            className="mt-2 w-full resize-none rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">
            Photograph
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="mt-2 block w-full rounded-lg border border-slate-300 p-3 text-sm"
          />
        </div>

        {/* Preview */}
        {image && (
          <div className="overflow-hidden rounded-xl border border-slate-200">
            <img
              src={image}
              alt="Gallery preview"
              className="h-64 w-full object-cover"
            />

            <div className="p-3">
              <button
                type="button"
                onClick={() => setImage("")}
                className="text-sm font-medium text-red-600 hover:underline"
              >
                Remove selected image
              </button>
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={addGalleryItem}
          className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
        >
          Add to Gallery
        </button>
      </div>

      {/* Existing gallery */}
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.length === 0 ? (
          <p className="text-sm text-slate-500">
            No photographs added yet.
          </p>
        ) : (
          items.map((item) => (
            <article
              key={item.id}
              className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
            >
              <div className="aspect-square">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-slate-900">
                  {item.title}
                </h3>

                {item.caption && (
                  <p className="mt-2 text-sm leading-5 text-slate-600">
                    {item.caption}
                  </p>
                )}

                <button
                  type="button"
                  onClick={() => removeGalleryItem(item.id)}
                  className="mt-4 rounded-lg border border-red-200 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  Remove
                </button>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
}