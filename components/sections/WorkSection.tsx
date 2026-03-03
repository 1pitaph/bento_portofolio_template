"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import type { ProjectCategory } from "@/re/types";
import { CloseButton } from "@/components/ui/CloseButton";
import { WorkCard } from "@/components/ui/WorkCard";
import { SectionHeadingClickable } from "@/components/ui/SectionHeadingClickable";

const FILTERS = ["AI", "作品集", "实际项目", "摄影"] as const;
type Filter = (typeof FILTERS)[number] | null;

type WorkSectionProps = {
  data: ProjectCategory[];
  onExpand?: () => void;
  isExpanded?: boolean;
};

function flattenProjects(data: ProjectCategory[]) {
  return data.flatMap((cat) =>
    cat.projects.map((p) => ({ ...p, category: cat.category }))
  );
}

// Card = 60% of container width; 12px gap between cards
const CARD_RATIO = 0.6;
const GAP = 12;

/** Filter button — shared between collapsed and expanded views */
function FilterBar({
  activeFilter,
  onFilter,
}: {
  activeFilter: Filter;
  onFilter: (f: (typeof FILTERS)[number]) => void;
}) {
  return (
    <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1">
      {FILTERS.map((filter) => {
        const isActive = activeFilter === filter;
        return (
          <button
            key={filter}
            onClick={() => onFilter(filter)}
            className="group relative inline-block cursor-pointer overflow-hidden px-0.5 py-0.5 text-sm tracking-widest transition-all duration-300 ease-out hover:scale-105"
          >
            <span
              className={`absolute inset-0 origin-left bg-foreground transition-transform duration-300 ease-out ${
                isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
              }`}
            />
            <span
              className={`relative z-10 transition-colors duration-300 ${
                isActive ? "text-background" : "group-hover:text-background"
              }`}
            >
              {filter}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export function WorkSection({
  data,
  onExpand,
  isExpanded = false,
}: WorkSectionProps) {
  const [activeFilter, setActiveFilter] = useState<Filter>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollAccum = useRef(0);
  const outerRef = useRef<HTMLDivElement>(null);
  const trackContainerRef = useRef<HTMLDivElement>(null);
  const [containerW, setContainerW] = useState(0);

  /* Filter logic — shared between views */
  const filteredData = activeFilter
    ? data.filter((g) => g.category === activeFilter)
    : data;

  const filteredProjects = flattenProjects(filteredData);

  const handleFilter = (filter: (typeof FILTERS)[number]) => {
    setActiveFilter((prev) => (prev === filter ? null : filter));
    setCurrentIndex(0); // reset carousel position on filter change
  };

  /* Measure container width */
  useEffect(() => {
    const el = trackContainerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setContainerW(el.offsetWidth));
    ro.observe(el);
    setContainerW(el.offsetWidth);
    return () => ro.disconnect();
  }, []);

  const navigate = useCallback(
    (dir: number) => {
      if (filteredProjects.length === 0) return;
      setCurrentIndex((i) => {
        const next = i + dir;
        if (next < 0) return filteredProjects.length - 1;
        if (next >= filteredProjects.length) return 0;
        return next;
      });
    },
    [filteredProjects.length]
  );

  /* Wheel — prefer horizontal delta, fall back to vertical */
  useEffect(() => {
    if (isExpanded) return;
    const el = outerRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const delta = Math.abs(e.deltaX) > 5 ? e.deltaX : e.deltaY;
      scrollAccum.current += delta;
      if (Math.abs(scrollAccum.current) >= 60) {
        navigate(scrollAccum.current > 0 ? 1 : -1);
        scrollAccum.current = 0;
      }
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [isExpanded, navigate]);

  /* Sliding track position */
  const cardW = containerW * CARD_RATIO;
  const centerOffset = (containerW - cardW) / 2;
  const trackX = containerW > 0
    ? -(currentIndex * (cardW + GAP)) + centerOffset
    : 0;

  /* ─────────────────────────────────────────────────────── */
  /* Collapsed view                                          */
  /* ─────────────────────────────────────────────────────── */
  if (!isExpanded) {
    return (
      <div
        ref={outerRef}
        className="relative flex h-full flex-col select-none"
      >
        {/* Heading */}
        <div className="flex-none">
          <SectionHeadingClickable onClick={onExpand}>
            Work
          </SectionHeadingClickable>
        </div>

        {/* Next-card button — top-right, same style as theme toggle */}
        <button
          onClick={() => navigate(1)}
          className="group absolute top-0 right-0 cursor-pointer overflow-hidden p-1 transition-all duration-300 ease-out hover:scale-110"
          aria-label="Next project"
        >
          <span className="absolute inset-0 origin-left scale-x-0 bg-foreground transition-transform duration-300 ease-out group-hover:scale-x-100" />
          <span className="relative z-10 flex items-center transition-colors duration-300 group-hover:text-background">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </span>
        </button>

        {/* Filter buttons */}
        <div className="flex-none">
          <FilterBar activeFilter={activeFilter} onFilter={handleFilter} />
        </div>

        {/* Sliding track */}
        <div
          ref={trackContainerRef}
          className="relative flex flex-1 overflow-hidden"
        >
          {filteredProjects.length === 0 ? (
            <div className="flex w-full items-center justify-center">
              <p className="text-sm text-gray-400" style={{ fontFamily: "monospace" }}>
                No projects yet.
              </p>
            </div>
          ) : (
            <motion.div
              className="flex h-full items-center"
              animate={{ x: trackX }}
              transition={{ type: "spring", stiffness: 280, damping: 30 }}
              style={{ gap: GAP }}
            >
              {filteredProjects.map((project, i) => {
                const dist = Math.abs(i - currentIndex);
                return (
                  <div
                    key={project.title + i}
                    style={{
                      width: cardW,
                      flexShrink: 0,
                      opacity: dist === 0 ? 1 : dist === 1 ? 0.45 : 0,
                      filter: dist === 0 ? "none" : "blur(3px)",
                      transition: "opacity 0.3s ease, filter 0.3s ease",
                      pointerEvents: dist === 0 ? "auto" : "none",
                    }}
                  >
                    <WorkCard {...project} />
                  </div>
                );
              })}
            </motion.div>
          )}
        </div>

        {/* Square indicator — always rendered to keep card position stable */}
        <div className="flex-none flex h-6 items-center justify-center gap-1.5">
          {filteredProjects.length > 1 &&
            filteredProjects.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`transition-all duration-300 bg-foreground/25 hover:bg-foreground/50 ${
                  i === currentIndex
                    ? "w-2.5 h-2.5 bg-foreground! opacity-100"
                    : "w-1.5 h-1.5"
                }`}
                aria-label={`Go to project ${i + 1}`}
              />
            ))}
        </div>
      </div>
    );
  }

  /* ─────────────────────────────────────────────────────── */
  /* Expanded view                                           */
  /* ─────────────────────────────────────────────────────── */
  return (
    <div className="relative h-full overflow-auto">
      <div className="flex items-center justify-between">
        <SectionHeadingClickable onClick={onExpand}>
          Work
        </SectionHeadingClickable>
      </div>

      <FilterBar activeFilter={activeFilter} onFilter={handleFilter} />

      <CloseButton onClick={onExpand} />

      {filteredData.map((group) => (
        <div key={group.category} className="mb-4">
          <p className="mt-4 mb-2 text-xs tracking-widest text-foreground/40 uppercase">
            {group.category}
          </p>
          <div className="grid grid-cols-2 gap-6">
            {group.projects.map((project) => (
              <WorkCard key={project.title} {...project} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
