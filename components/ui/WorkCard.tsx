"use client";

import Image from "next/image";
import type { Project } from "@/re/types";
import { WorkIcon } from "@/re/icons";

type WorkCardProps = Project & { compact?: boolean; onCardClick?: () => void };

export function WorkCard({
  title,
  tagline,
  logo,
  image,
  href,
  techStack,
  compact = false,
  onCardClick,
}: WorkCardProps) {
  // Only `image` (singular) is used as card background.
  // `images[]` is for the modal gallery and does NOT appear on the card face.
  const coverSrc = image ?? null;
  const hasTech = !!techStack?.length;

  const inner = (
    // outer group wrapper — pr/pb reserves 6px space so shadow never overflows
    <div className="group relative w-full pb-1.5 pr-1.5 [container-type:inline-size]">
      {/* Hard shadow layer: offset 6px from card, contained within wrapper */}
      <div
        className="absolute top-1.5 left-1.5 right-0 bottom-0 border border-foreground bg-foreground transition-colors duration-300 group-hover:bg-background"
        aria-hidden="true"
      />

      {/* Main card */}
      <div
        className={`relative z-10 aspect-[4/3] w-full overflow-hidden border border-foreground bg-background transition-colors duration-300 work-card-main${coverSrc ? "" : " work-card-dot-grid"}`}
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
        <div className={`relative z-10 flex h-full flex-col justify-between ${compact ? "p-3" : "p-5"}`}>

          {/* TechStack hover tags — top-left, fade in on hover */}
          {hasTech && (
            <div className={`absolute top-0 left-0 z-10 flex flex-wrap gap-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none ${compact ? "p-3" : "p-5"}`}>
              {techStack!.map((tag) => (
                <span
                  key={tag}
                  className="work-card-tag border px-1.5 py-0.5 text-[10px] tracking-wider font-medium"
                  style={{ fontFamily: "var(--font-oppo-sans)" }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Top-left logo — fades out on hover if techStack exists */}
          <div>
            {logo && (
              <span
                className={`inline-flex leading-none text-foreground transition-all duration-300 work-card-hover-text${hasTech ? " group-hover:opacity-0" : ""}`}
                aria-hidden="true"
              >
                <WorkIcon name={logo} size={compact ? 16 : 20} />
              </span>
            )}
          </div>

          {/* Center headline */}
          <div className="flex flex-1 items-center">
            <h3
              className={`whitespace-pre-line ${compact ? "text-base" : "text-[clamp(14px,8cqw,24px)]"} font-bold leading-tight text-foreground transition-colors duration-300 work-card-hover-text`}
              style={{ fontFamily: "var(--font-oppo-sans)" }}
            >
              {title}
            </h3>
          </div>

          {/* Bottom tagline */}
          {tagline && (
            <div className="overflow-hidden">
              <span
                className={`${compact ? "text-[10px] tracking-wider truncate block" : "text-[clamp(9px,3.5cqw,12px)] tracking-widest"} font-medium text-foreground/85 transition-colors duration-300 work-card-hover-text-muted`}
                style={{ fontFamily: "var(--font-oppo-sans)" }}
              >
                {tagline}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  if (onCardClick) {
    return (
      <div onClick={onCardClick} className="block w-full cursor-pointer">
        {inner}
      </div>
    );
  }

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="block w-full">
        {inner}
      </a>
    );
  }

  return inner;
}
