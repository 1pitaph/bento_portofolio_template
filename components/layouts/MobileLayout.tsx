"use client";

import { useState, useRef } from "react";
import Image from "next/image";
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
            "minmax(0, 1.8fr) minmax(0, 1.8fr) minmax(0, 2.8fr) minmax(0, 1.2fr)",
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

        {/* Work Section — collapsed carousel, same as PC */}
        <div
          ref={workRef}
          className="overflow-hidden border-b border-foreground px-6 py-4"
        >
          <WorkSection
            data={siteData.projectCategories}
            onExpand={handleWorkExpand}
            isExpanded={false}
            compact
          />
        </div>

        {/* About Me + Contact Me — side by side */}
        <div className="flex overflow-hidden">
          {/* About Me */}
          <div
            ref={aboutRef}
            className="flex w-2/5 cursor-pointer items-end justify-between overflow-hidden border-r border-foreground bg-background px-4 pb-5"
          >
            <SectionHeadingClickable onClick={handleAboutExpand}>
              About Me
            </SectionHeadingClickable>
            <div className="flex-shrink-0 w-9 h-9 relative overflow-hidden rounded-full border border-foreground/20 pointer-events-none">
              <Image
                src={siteData.about.image}
                alt={siteData.about.imageAlt}
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Contact Section */}
          <div className="flex-1 overflow-hidden bg-background px-5 py-5 relative flex flex-col">
            <ContactSection data={siteData.contact} />
          </div>
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
          compact
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
