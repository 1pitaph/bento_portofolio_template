"use client";

import { useState, useRef } from "react";
import type { SiteData } from "@/re/types";
import {
  HeroSection,
  SkillsSection,
  WorkSection,
  AboutSection,
  ContactSection,
} from "@/components/sections";
import { SectionHeadingClickable } from "@/components/ui/SectionHeadingClickable";
import { getClipFrom } from "@/lib/animation";
import ExpandedOverlay from "@/components/ui/ExpandedOverlay";

type MobileLayoutProps = {
  siteData: SiteData;
  expandedSection: "work" | "about" | null;
  setExpandedSection: (section: "work" | "about" | null) => void;
};

export default function MobileLayout({
  siteData,
  expandedSection,
  setExpandedSection,
}: MobileLayoutProps) {
  const [sourceRect, setSourceRect] = useState<DOMRect | null>(null);

  const workRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleWorkExpand = () => {
    if (expandedSection === "work") {
      setExpandedSection(null);
    } else {
      const rect = workRef.current?.getBoundingClientRect();
      if (rect) setSourceRect(rect);
      setExpandedSection("work");
    }
  };

  const handleAboutExpand = () => {
    if (expandedSection === "about") {
      setExpandedSection(null);
    } else {
      const rect = aboutRef.current?.getBoundingClientRect();
      if (rect) setSourceRect(rect);
      setExpandedSection("about");
    }
  };

  const clipFrom = getClipFrom(sourceRect);

  return (
    <div ref={containerRef} className="relative h-dvh overflow-hidden">
      {/* Mobile column layout */}
      <div
        className="grid h-full"
        style={{
          gridTemplateRows:
            "minmax(0, 2.5fr) minmax(0, 2.5fr) minmax(0, 0.7fr) minmax(0, 0.7fr) minmax(0, 1.5fr)",
        }}
      >
        {/* Hero Section */}
        <div className="overflow-hidden border-b border-foreground px-6 py-6">
          <HeroSection data={siteData.hero} />
        </div>

        {/* Skills Section */}
        <div className="overflow-hidden border-b border-foreground px-6 py-6">
          <SkillsSection data={siteData.skills} />
        </div>

        {/* Work Section */}
        <div
          ref={workRef}
          className="flex cursor-pointer items-center justify-between overflow-hidden border-b border-foreground bg-background px-6 transition-colors duration-200 hover:bg-muted"
        >
          <SectionHeadingClickable onClick={handleWorkExpand}>
            Work
          </SectionHeadingClickable>
          <div onClick={handleWorkExpand} className="text-xl">
            +
          </div>
        </div>

        {/* About Section */}
        <div
          ref={aboutRef}
          className="flex cursor-pointer items-center justify-between overflow-hidden border-b border-foreground bg-background px-6 transition-colors duration-200 hover:bg-muted"
        >
          <SectionHeadingClickable onClick={handleAboutExpand}>
            About Me
          </SectionHeadingClickable>
          <div onClick={handleAboutExpand} className="text-xl">
            +
          </div>
        </div>

        {/* Contact Section */}
        <div className="overflow-hidden bg-background px-6 py-6 relative flex flex-col min-h-[150px]">
          <ContactSection data={siteData.contact} />
        </div>
      </div>

      {/* Expanded overlays */}
      <ExpandedOverlay
        isOpen={expandedSection === "work"}
        clipFrom={clipFrom}
        uniqueKey="work-expanded"
      >
        <WorkSection
          data={siteData.projectCategories}
          onExpand={handleWorkExpand}
          isExpanded={true}
        />
      </ExpandedOverlay>

      <ExpandedOverlay
        isOpen={expandedSection === "about"}
        clipFrom={clipFrom}
        uniqueKey="about-expanded"
      >
        <AboutSection
          data={siteData.about}
          onExpand={handleAboutExpand}
          isExpanded={true}
        />
      </ExpandedOverlay>
    </div>
  );
}
