"use client";

import { useState, useCallback, useRef, useEffect, RefObject } from "react";
import {
  PANEL_CONSTRAINTS,
  DEFAULT_PANEL_SIZES,
  PANEL_LERP_FACTOR,
} from "@/lib/constants";

/**
 * Current rendered sizes of the four resizable panels (all values are
 * percentages of the container's width or height).
 */
export type PanelSizes = {
  /** Height of the top row (Hero/Skills) as % of total container height */
  topHeight: number;
  /** Width of the Hero panel as % of total container width */
  topLeftWidth: number;
  /** Width of the Work panel as % of total container width */
  bottomLeftWidth: number;
  /** Height of the top-right empty panel as % of the bottom-right column height */
  bottomRightTopHeight: number;
  /** Width of the About panel in the bottom-right row as % of its container width */
  aboutLeftWidth: number;
};

type DividerType =
  | "horizontal-main"
  | "vertical-top"
  | "vertical-bottom"
  | "horizontal-bottom-right"
  | "vertical-bottom-right-contact"
  | null;

/**
 * Manages drag state and LERP-animated sizes for the four resizable panels
 * in `LaptopLayout`.
 *
 * When a user drags a divider, the target size updates immediately and the
 * displayed size lerps toward it on each animation frame, producing a smooth
 * damped-follow effect. Panel constraints are defined in `@/lib/constants`.
 *
 * @param containerRef - Ref to the outer container `<div>` used to convert
 *   absolute mouse coordinates to percentages.
 * @returns
 *   - `sizes` — current rendered panel sizes
 *   - `isDragging` — which divider is active, or `null`
 *   - `handleMouseDown` — factory that returns a `mousedown` handler for a
 *     given divider type
 */
export function useResizablePanels(
  containerRef: RefObject<HTMLDivElement | null>,
) {
  const [sizes, setSizes] = useState<PanelSizes>({ ...DEFAULT_PANEL_SIZES });
  const targetSizes = useRef<PanelSizes>({ ...DEFAULT_PANEL_SIZES });
  const rafId = useRef<number | null>(null);
  const [isDragging, setIsDragging] = useState<DividerType>(null);

  const handleMouseDown = useCallback((divider: NonNullable<DividerType>) => {
    return (e: React.MouseEvent) => {
      e.preventDefault();
      setIsDragging(divider);
    };
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();

      if (isDragging === "horizontal-main") {
        const newTopHeight = ((e.clientY - rect.top) / rect.height) * 100;
        targetSizes.current.topHeight = Math.min(
          PANEL_CONSTRAINTS.maxTopHeight,
          Math.max(PANEL_CONSTRAINTS.minTopHeight, newTopHeight),
        );
      } else if (isDragging === "vertical-top") {
        const newLeftWidth = ((e.clientX - rect.left) / rect.width) * 100;
        targetSizes.current.topLeftWidth = Math.min(
          PANEL_CONSTRAINTS.maxLeftWidth,
          Math.max(PANEL_CONSTRAINTS.minLeftWidth, newLeftWidth),
        );
      } else if (isDragging === "vertical-bottom") {
        const newLeftWidth = ((e.clientX - rect.left) / rect.width) * 100;
        targetSizes.current.bottomLeftWidth = Math.min(
          PANEL_CONSTRAINTS.maxLeftWidth,
          Math.max(PANEL_CONSTRAINTS.minLeftWidth, newLeftWidth),
        );
      } else if (isDragging === "horizontal-bottom-right") {
        const topOffset = (targetSizes.current.topHeight / 100) * rect.height;
        const bottomHeight = rect.height - topOffset;
        const mouseY = e.clientY - rect.top - topOffset;
        const newAboutHeight = (mouseY / bottomHeight) * 100;
        targetSizes.current.bottomRightTopHeight = Math.min(
          PANEL_CONSTRAINTS.maxTopRightHeight,
          Math.max(PANEL_CONSTRAINTS.minTopRightHeight, newAboutHeight),
        );
      } else if (isDragging === "vertical-bottom-right-contact") {
        const leftOffset = (targetSizes.current.bottomLeftWidth / 100) * rect.width;
        const contactWidth = rect.width - leftOffset;
        const mouseX = e.clientX - rect.left - leftOffset;
        const newContactWidth = (mouseX / contactWidth) * 100;
        targetSizes.current.aboutLeftWidth = Math.min(
          PANEL_CONSTRAINTS.maxAboutLeftWidth,
          Math.max(PANEL_CONSTRAINTS.minAboutLeftWidth, newContactWidth),
        );
      }
    },
    [isDragging, containerRef],
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(null);
  }, []);

  // Animation loop: lerp sizes toward target for damping effect
  useEffect(() => {
    if (!isDragging) {
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
        rafId.current = null;
      }
      setSizes({ ...targetSizes.current });
      return;
    }

    const animate = () => {
      setSizes((prev) => {
        const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
        return {
          topHeight: lerp(
            prev.topHeight,
            targetSizes.current.topHeight,
            PANEL_LERP_FACTOR,
          ),
          topLeftWidth: lerp(
            prev.topLeftWidth,
            targetSizes.current.topLeftWidth,
            PANEL_LERP_FACTOR,
          ),
          bottomLeftWidth: lerp(
            prev.bottomLeftWidth,
            targetSizes.current.bottomLeftWidth,
            PANEL_LERP_FACTOR,
          ),
          bottomRightTopHeight: lerp(
            prev.bottomRightTopHeight,
            targetSizes.current.bottomRightTopHeight,
            PANEL_LERP_FACTOR,
          ),
          aboutLeftWidth: lerp(
            prev.aboutLeftWidth,
            targetSizes.current.aboutLeftWidth,
            PANEL_LERP_FACTOR,
          ),
        };
      });
      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);

    return () => {
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
        rafId.current = null;
      }
    };
  }, [isDragging]);

  // Global mouse event listeners
  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "grabbing";
      document.body.style.userSelect = "none";
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return {
    sizes,
    isDragging,
    handleMouseDown,
  };
}
