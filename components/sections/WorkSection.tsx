import type { ProjectCategory } from "@/types";
import { CloseButton } from "@/components/ui/CloseButton";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { SectionHeadingClickable } from "@/components/ui/SectionHeadingClickable";

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
  return (
    <div className="relative h-full">
      <div className="flex items-center justify-between">
        <SectionHeadingClickable onClick={onExpand}>
          Work
        </SectionHeadingClickable>
      </div>
      {isExpanded && <CloseButton onClick={onExpand} />}
      {data.map((group) => (
        <div key={group.category} className="mb-4">
          <p className="mt-2 text-meta">{group.category}</p>
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
