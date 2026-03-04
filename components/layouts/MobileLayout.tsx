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
    <div className="relative min-h-dvh bg-background">
      {/* Scrollable page */}
      <div className="overflow-y-auto">

        {/* Hero */}
        <div className="border-b border-foreground px-6 py-6">
          <HeroSection data={siteData.hero} />
        </div>

        {/* Skills */}
        <div className="border-b border-foreground px-6 py-6">
          <SkillsSection data={siteData.skills} />
        </div>

        {/* Work — carousel, fixed height so WorkSection's h-full works */}
        <div
          ref={workRef}
          className="border-b border-foreground px-6 py-4"
          style={{ height: "46vh" }}
        >
          <WorkSection
            data={siteData.projectCategories}
            onExpand={handleWorkExpand}
            isExpanded={false}
            compact
          />
        </div>

        {/* About Me + Contact — side by side */}
        <div className="flex">
          <div
            ref={aboutRef}
            className="flex w-2/5 cursor-pointer items-end justify-between overflow-hidden border-r border-foreground bg-background px-4 pb-5 pt-5"
          >
            <SectionHeadingClickable onClick={handleAboutExpand}>
              About Me
            </SectionHeadingClickable>
            <div className="relative h-9 w-9 flex-shrink-0 overflow-hidden rounded-full border border-foreground/20 pointer-events-none">
              <Image
                src={siteData.about.image}
                alt={siteData.about.imageAlt}
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="flex flex-1 flex-col overflow-hidden bg-background px-5 py-5 relative">
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
