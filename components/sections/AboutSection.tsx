import Image from "next/image";
import type { AboutData } from "@/re/types";
import { CloseButton } from "@/components/ui/CloseButton";
import { SectionHeadingClickable } from "@/components/ui/SectionHeadingClickable";

type AboutSectionProps = {
  data: AboutData;
  onExpand?: () => void;
  isExpanded?: boolean;
};

export function AboutSection({
  data,
  onExpand,
  isExpanded = false,
}: AboutSectionProps) {
  if (isExpanded) {
    return (
      <div className="relative h-full">
        <CloseButton onClick={onExpand} />

        {/* Mobile: stacked layout / Desktop: side-by-side */}
        <div className="flex h-full flex-col md:flex-row md:items-center md:gap-12 lg:gap-12 m-12">
          <div className="md:w-3/5">
            <SectionHeadingClickable onClick={onExpand}>
              {`About Me`}
            </SectionHeadingClickable>
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
      <div className="flex-1 flex items-center">
        <Image
          src={data.image}
          alt={data.imageAlt}
          width={80}
          height={80}
          className="rounded-full object-cover"
        />
      </div>
    </div>
  );
}
