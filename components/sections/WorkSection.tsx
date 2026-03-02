"use client";

import { useState } from "react";
import type { ProjectCategory } from "@/re/types";
import { CloseButton } from "@/components/ui/CloseButton";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { SectionHeadingClickable } from "@/components/ui/SectionHeadingClickable";

const FILTERS = ["AI", "作品集", "实际项目", "摄影"] as const;
type Filter = (typeof FILTERS)[number] | null;

type WorkSectionProps = {
  data: ProjectCategory[];
  onExpand?: () => void;
  isExpanded?: boolean;
};

export function WorkSection({
  data,
  onExpand,
  isExpanded = false,
}: WorkSectionProps) {
  const [activeFilter, setActiveFilter] = useState<Filter>(null);

  const handleFilter = (filter: (typeof FILTERS)[number]) => {
    setActiveFilter((prev) => (prev === filter ? null : filter));
  };

  const filteredData = activeFilter
    ? data.filter((g) => g.category === activeFilter)
    : data;

  return (
    <div className="relative h-full">
      <div className="flex items-center justify-between">
        <SectionHeadingClickable onClick={onExpand}>
          Work
        </SectionHeadingClickable>
      </div>

      {/* Filter buttons */}
      <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
        {FILTERS.map((filter) => {
          const isActive = activeFilter === filter;
          return (
            <button
              key={filter}
              onClick={() => handleFilter(filter)}
              className="group relative inline-block cursor-pointer overflow-hidden px-0.5 py-0.5 text-sm tracking-widest transition-all duration-300 ease-out hover:scale-105"
            >
              <span
                className={`absolute inset-0 origin-left bg-black transition-transform duration-300 ease-out ${
                  isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                }`}
              />
              <span
                className={`relative z-10 transition-colors duration-300 ${
                  isActive ? "text-white" : "group-hover:text-white"
                }`}
              >
                {filter}
              </span>
            </button>
          );
        })}
      </div>

      {isExpanded && <CloseButton onClick={onExpand} />}

      {filteredData.map((group) => (
        <div key={group.category} className="mb-4">
          <div
            className={`mt-4 ${isExpanded ? "grid grid-cols-2 gap-6" : "space-y-4"}`}
          >
            {group.projects.map((project) => (
              <ProjectCard
                key={project.title}
                title={project.title}
                image={project.image}
                techStack={project.techStack}
                href={project.href}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
