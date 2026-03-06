import Image from "next/image";
import type { AboutData } from "@/re/types";
import { CloseButton } from "@/components/ui/CloseButton";
import { SectionHeadingClickable } from "@/components/ui/SectionHeadingClickable";

type AboutSectionProps = {
  data: AboutData;
  onExpand?: () => void;
  isExpanded?: boolean;
};

// Text to show in collapsed state (truncated)
const PREVIEW_TEXT = "工具的演进，其实总是指向一个不断后退的边界。我一直觉得未经理性的直觉是漫无目的的...";

export function AboutSection({
  data,
  onExpand,
  isExpanded = false,
}: AboutSectionProps) {
  if (isExpanded) {
    return (
      <div className="relative h-full overflow-auto">
        <CloseButton onClick={onExpand} />

        {/* Mobile: stacked layout / Desktop: side-by-side, vertically centered */}
        <div className="flex min-h-full flex-col md:flex-row md:items-center md:justify-center md:gap-12 lg:gap-16 p-12">
          {/* Left: Avatar */}
          <div className="flex-shrink-0">
            <SectionHeadingClickable onClick={onExpand}>
              {`About Me`}
            </SectionHeadingClickable>
            <div className="mt-8">
              <Image
                src={data.image}
                alt={data.imageAlt}
                width={120}
                height={120}
                className="rounded-full object-cover"
              />
            </div>
          </div>

          {/* Right: Full text content */}
          <div className="flex-1 md:max-w-2xl">
            <p 
              className="text-base leading-relaxed text-foreground/90 whitespace-pre-line"
              style={{ fontFamily: "var(--font-oppo-sans)" }}
            >
              {data.text}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="self-start">
        <SectionHeadingClickable onClick={onExpand}>
          {`About Me`}
        </SectionHeadingClickable>
      </div>
      <div className="flex-1 flex items-center gap-4 overflow-hidden">
        <Image
          src={data.image}
          alt={data.imageAlt}
          width={80}
          height={80}
          className="rounded-full object-cover flex-shrink-0"
        />
        <p 
          className="text-sm leading-relaxed text-foreground/80 line-clamp-3"
          style={{ fontFamily: "var(--font-oppo-sans)" }}
        >
          {PREVIEW_TEXT}
        </p>
      </div>
    </div>
  );
}
