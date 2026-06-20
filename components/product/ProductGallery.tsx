"use client";
import { useState } from "react";

export function ProductGallery({
  images,
  name,
  emoji,
}: {
  images: string[];
  name: string;
  emoji?: string;
}) {
  const safe = images && images.length > 0 ? images : [];
  const [active, setActive] = useState(0);

  if (safe.length === 0) {
    return (
      <div className="aspect-square overflow-hidden rounded-2xl bg-secondary/50 shadow-sm flex items-center justify-center">
        <span className="text-9xl">{emoji || "📦"}</span>
      </div>
    );
  }

  return (
    <div>
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-secondary/50 shadow-sm">
        <img
          src={safe[active]}
          alt={name}
          className="h-full w-full object-cover"
        />
      </div>
      {safe.length > 1 && (
        <div className="mt-3 grid grid-cols-5 gap-2">
          {safe.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              className={`relative aspect-square overflow-hidden rounded-lg border-2 transition-all ${
                active === i ? "border-primary" : "border-transparent hover:border-border"
              }`}
            >
              <img src={img} alt={`${name} ${i + 1}`} className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}