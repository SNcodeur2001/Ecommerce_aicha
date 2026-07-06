"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { cn, normalizeImages } from "@/lib/utils";

export function ProductGallery({
  images,
  name,
}: {
  images: unknown;
  name: string;
}) {
  const safeImages = normalizeImages(images);
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const ref = useRef<HTMLDivElement>(null);

  function onMouseMove(e: React.MouseEvent) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPos({ x, y });
  }

  return (
    <div className="flex flex-col-reverse gap-4 md:flex-row">
      <div className="flex gap-3 md:flex-col">
        {safeImages.map((img, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={cn(
              "relative size-20 overflow-hidden rounded-md border bg-muted transition-colors",
              active === i ? "border-foreground" : "border-border",
            )}
          >
            <Image
              src={img || "/placeholder.svg"}
              alt={`${name} ${i + 1}`}
              fill
              sizes="80px"
              className="object-cover"
            />
          </button>
        ))}
      </div>

      <div
        ref={ref}
        onMouseEnter={() => setZoom(true)}
        onMouseLeave={() => setZoom(false)}
        onMouseMove={onMouseMove}
        className="relative aspect-[3/4] flex-1 cursor-zoom-in overflow-hidden rounded-lg bg-muted"
      >
        <Image
          src={safeImages[active] || "/placeholder.svg"}
          alt={name}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className={cn(
            "object-cover transition-transform duration-200",
            zoom && "scale-150",
          )}
          style={zoom ? { transformOrigin: `${pos.x}% ${pos.y}%` } : undefined}
        />
      </div>
    </div>
  );
}
