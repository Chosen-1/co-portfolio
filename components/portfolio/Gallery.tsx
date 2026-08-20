import Image from "next/image";
import type { GalleryItem } from "@/types/portfolio";
import SectionHeader from "@/components/shared/SectionHeader";

type GalleryProps = {
  items: GalleryItem[];
};

export default function Gallery({ items }: GalleryProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section
      id="gallery"
      className="scroll-mt-24 border-t border-slate-200 py-12 sm:py-16"
    >
      <SectionHeader
        eyebrow="Professional Moments"
        title="Gallery"
        description="A selection of professional experiences, training, community activities and milestones."
      />

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <article
            key={item.id}
            className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="relative aspect-square overflow-hidden bg-slate-100">
              <Image
                src={item.image}
                alt={item.title}
                fill
                unoptimized
                className="object-cover transition duration-500 group-hover:scale-105"
              />
            </div>

            <div className="p-5">
              <h3 className="font-semibold text-slate-900">
                {item.title}
              </h3>

              {item.caption && (
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {item.caption}
                </p>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}