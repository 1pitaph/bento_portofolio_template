"use client";

import Image from "next/image";
import type { Project } from "@/re/types";

type WorkCardProps = Project;

/** Dot-grid background for text-only cards */
const DOT_GRID: React.CSSProperties = {
  backgroundImage: "radial-gradient(circle, var(--dot-grid-color) 1px, transparent 1px)",
  backgroundSize: "18px 18px",
};

export function WorkCard({
  title,
  tagline,
  logo,
  image,
  images,
  href,
}: WorkCardProps) {
  // Use first image from either images[] or image
  const coverSrc = images?.[0] ?? image ?? null;

  const inner = (
    // outer group wrapper — pr/pb reserves 6px space so shadow never overflows
    <div className="group relative w-full pb-1.5 pr-1.5">
      {/* Hard shadow layer: offset 6px from card, contained within wrapper */}
      <div
        className="absolute top-1.5 left-1.5 right-0 bottom-0 border border-foreground bg-foreground transition-colors duration-300 group-hover:bg-background"
        aria-hidden="true"
      />

      {/* Main card */}
      <div
        className="relative z-10 aspect-[4/3] w-full overflow-hidden border border-foreground bg-background transition-colors duration-300 group-hover:bg-foreground"
        style={coverSrc ? undefined : DOT_GRID}
      >
        {/* Photo background */}
        {coverSrc && (
          <>
            <Image
              src={coverSrc}
              alt={title}
              fill
              className="object-cover"
            />
            {/* Hover overlay darkens the photo */}
            <div className="absolute inset-0 bg-transparent transition-colors duration-300 group-hover:bg-black/60" />
          </>
        )}

        {/* Content */}
        <div className="relative z-10 flex h-full flex-col justify-between p-5">
          {/* Top-left logo */}
          <div>
            {logo && (
              <span
                className="text-2xl leading-none text-foreground transition-colors duration-300 group-hover:text-background"
                style={{ fontFamily: "monospace" }}
                aria-hidden="true"
              >
                {logo}
              </span>
            )}
          </div>

          {/* Center headline */}
          <div className="flex flex-1 items-center">
            <h3
              className="whitespace-pre-line text-2xl font-bold leading-tight text-foreground transition-colors duration-300 group-hover:text-background"
              style={{ fontFamily: "monospace" }}
            >
              {title}
            </h3>
          </div>

          {/* Bottom tagline */}
          {tagline && (
            <div>
              <span
                className="text-xs tracking-widest text-foreground/70 transition-colors duration-300 group-hover:text-background/60"
                style={{ fontFamily: "monospace" }}
              >
                {tagline}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="block w-full">
        {inner}
      </a>
    );
  }

  return inner;
}
