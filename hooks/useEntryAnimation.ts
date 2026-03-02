"use client";

import { useEffect, RefObject } from "react";
import gsap from "gsap";

type AnimationRefs = {
  lines: {
    mainHLine: RefObject<HTMLDivElement | null>;
    topVLine: RefObject<HTMLDivElement | null>;
    bottomVLine: RefObject<HTMLDivElement | null>;
    bottomRightHLine: RefObject<HTMLDivElement | null>;
    bottomRightContactVLine: RefObject<HTMLDivElement | null>;
  };
  content: {
    hero: RefObject<HTMLDivElement | null>;
    skills: RefObject<HTMLDivElement | null>;
    work: RefObject<HTMLDivElement | null>;
    about: RefObject<HTMLDivElement | null>;
    contact: RefObject<HTMLDivElement | null>;
    notes: RefObject<HTMLDivElement | null>;
  };
};

/**
 * Runs a one-shot GSAP entrance animation on mount of `LaptopLayout`.
 *
 * Animation sequence:
 * 1. Main horizontal divider line scales in from left (0.6 s).
 * 2. Top and bottom vertical divider lines scale in from top (0.6 s, -0.2 s overlap).
 * 3. Bottom-right horizontal divider line scales in from left (0.6 s, -0.2 s overlap).
 * 4. All five content regions fade up from y+20 with a 0.1 s stagger (-0.3 s overlap).
 *
 * The GSAP context is cleaned up via `ctx.revert()` on component unmount,
 * preventing memory leaks when the layout is unmounted.
 *
 * @param refs - Refs to the four divider `<div>` elements (`lines`) and the
 *   five section content wrapper `<div>` elements (`content`).
 */
export function useEntryAnimation(refs: AnimationRefs) {
  useEffect(() => {
    const { lines, content } = refs;

    // 检查所有 refs 是否都已挂载
    if (
      !lines.mainHLine.current ||
      !lines.topVLine.current ||
      !lines.bottomVLine.current ||
      !lines.bottomRightHLine.current ||
      !lines.bottomRightContactVLine.current ||
      !content.hero.current ||
      !content.skills.current ||
      !content.work.current ||
      !content.about.current ||
      !content.contact.current ||
      !content.notes.current
    ) {
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Set initial states for lines
      gsap.set(lines.mainHLine.current, { scaleX: 0, scaleY: 1 });
      gsap.set(lines.bottomRightHLine.current, { scaleX: 0, scaleY: 1 });
      gsap.set([lines.topVLine.current, lines.bottomVLine.current, lines.bottomRightContactVLine.current], {
        scaleY: 0,
        scaleX: 1,
      });

      // Set initial states for content
      gsap.set(
        [
          content.hero.current,
          content.skills.current,
          content.work.current,
          content.about.current,
          content.contact.current,
          content.notes.current,
        ],
        { opacity: 0, y: 20 },
      );

      // Animation sequence
      tl.to(lines.mainHLine.current, {
        scaleX: 1,
        duration: 0.6,
        ease: "power2.out",
      })
        .to(
          [lines.topVLine.current, lines.bottomVLine.current],
          {
            scaleY: 1,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.2",
        )
        .to(
          [lines.bottomRightHLine.current],
          {
            scaleX: 1,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.2",
        )
        .to(
          [lines.bottomRightContactVLine.current],
          {
            scaleY: 1,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.2",
        )
        .to(
          [
            content.hero.current,
            content.skills.current,
            content.work.current,
            content.about.current,
            content.contact.current,
            content.notes.current,
          ],
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out",
          },
          "-=0.3",
        );
    });

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run only once on mount - refs are stable
}
