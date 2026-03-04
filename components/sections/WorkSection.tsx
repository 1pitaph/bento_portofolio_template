"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import type { ProjectCategory, Project } from "@/re/types";
import { CloseButton } from "@/components/ui/CloseButton";
import { WorkCard } from "@/components/ui/WorkCard";
import { WorkCardModal } from "@/components/ui/WorkCardModal";
import { SectionHeadingClickable } from "@/components/ui/SectionHeadingClickable";

const FILTERS = ["AI", "作品集", "实际项目", "摄影"] as const;
type Filter = (typeof FILTERS)[number] | null;

type WorkSectionProps = {
  data: ProjectCategory[];
  onExpand?: () => void;
  isExpanded?: boolean;
  compact?: boolean;
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
  compact = false,
}: WorkSectionProps) {
  const [activeFilter, setActiveFilter] = useState<Filter>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollAccum = useRef(0);
  const outerRef = useRef<HTMLDivElement>(null);
  const trackContainerRef = useRef<HTMLDivElement>(null);
  const [containerW, setContainerW] = useState(0);
  const [trackH, setTrackH] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!selectedProject) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setSelectedProject(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedProject]);

  // Expanded view: wheel-driven spring scroll
  const expandedContainerRef = useRef<HTMLDivElement>(null);
  const expandedContentRef = useRef<HTMLDivElement>(null);
  const expandedScrollPos = useRef(0);
  const [expandedAnimY, setExpandedAnimY] = useState(0);

  /* Filter logic — shared between views */
  const filteredData = activeFilter
    ? data.filter((g) => g.category === activeFilter)
    : data;

  const filteredProjects = flattenProjects(filteredData);

  const handleFilter = (filter: (typeof FILTERS)[number]) => {
    setActiveFilter((prev) => (prev === filter ? null : filter));
    setCurrentIndex(0);
    // reset expanded scroll on filter change
    expandedScrollPos.current = 0;
    setExpandedAnimY(0);
  };

  /* Measure container width */
  useEffect(() => {
    const el = trackContainerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      setContainerW(el.offsetWidth);
      setTrackH(el.offsetHeight);
    });
    ro.observe(el);
    setContainerW(el.offsetWidth);
    setTrackH(el.offsetHeight);
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

  /* Expanded view: wheel-driven spring scroll */
  useEffect(() => {
    if (!isExpanded) {
      expandedScrollPos.current = 0;
      setExpandedAnimY(0);
      return;
    }
    const container = expandedContainerRef.current;
    if (!container) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const content = expandedContentRef.current;
      const maxScroll = content
        ? Math.max(0, content.scrollHeight - container.clientHeight)
        : 0;
      expandedScrollPos.current = Math.max(
        0,
        Math.min(expandedScrollPos.current + e.deltaY, maxScroll)
      );
      setExpandedAnimY(expandedScrollPos.current);
    };

    container.addEventListener("wheel", onWheel, { passive: false });
    return () => container.removeEventListener("wheel", onWheel);
  }, [isExpanded]);

  /* Sliding track position */
  // Cap card width so the card (aspect-[4/3]) never exceeds ~88% of track height
  const maxByHeight = trackH > 0 ? (trackH * (4 / 3) * 0.88) : Infinity;
  const cardW = Math.min(containerW * (compact ? 0.48 : CARD_RATIO), maxByHeight);
  const centerOffset = (containerW - cardW) / 2;
  const trackX = containerW > 0
    ? -(currentIndex * (cardW + GAP)) + centerOffset
    : 0;

  /* ─────────────────────────────────────────────────────── */
  /* Project detail modal (portal)                           */
  /* ─────────────────────────────────────────────────────── */
  const modal = (
    <WorkCardModal
      project={selectedProject}
      onClose={() => setSelectedProject(null)}
      compact={compact}
      mounted={mounted}
    />
  );

  /* ─────────────────────────────────────────────────────── */
  /* Collapsed view                                          */
  /* ─────────────────────────────────────────────────────── */
  if (!isExpanded) {
    return (
      <>
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
                    <WorkCard
                      {...project}
                      compact={compact}
                      onCardClick={() => setSelectedProject(project)}
                    />
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
      {modal}
      </>
    );
  }

  /* ─────────────────────────────────────────────────────── */
  /* Expanded view                                           */
  /* ─────────────────────────────────────────────────────── */

  const expandedContent = (
    <>
      <div className="flex items-center justify-between">
        <SectionHeadingClickable onClick={onExpand}>
          Work
        </SectionHeadingClickable>
      </div>

      <FilterBar activeFilter={activeFilter} onFilter={handleFilter} />

      {filteredData.map((group) => (
        <div key={group.category} className="mb-4">
          <p className="mt-4 mb-2 text-xs tracking-widest text-foreground/40 uppercase">
            {group.category}
          </p>
          <div className={`grid gap-4 ${compact ? "[grid-template-columns:repeat(auto-fill,minmax(140px,1fr))]" : "[grid-template-columns:repeat(auto-fill,minmax(260px,1fr))]"}`}>
            {group.projects.map((project) => (
              <WorkCard
                key={project.title}
                {...project}
                compact={compact}
                onCardClick={() => setSelectedProject(project)}
              />
            ))}
          </div>
        </div>
      ))}
    </>
  );

  /* Mobile: let ExpandedOverlay's overflow-auto handle scrolling */
  if (compact) {
    return (
      <>
      <div className="relative">
        <CloseButton onClick={onExpand} />
        {expandedContent}
      </div>
      {modal}
      </>
    );
  }

  /* Desktop: wheel-driven spring scroll */
  return (
    <>
    <div ref={expandedContainerRef} className="relative h-full overflow-hidden">
      <CloseButton onClick={onExpand} />
      <motion.div
        ref={expandedContentRef}
        animate={{ y: -expandedAnimY }}
        transition={{ type: "spring", stiffness: 300, damping: 35 }}
      >
        {expandedContent}
      </motion.div>
    </div>
    {modal}
    </>
  );
}
