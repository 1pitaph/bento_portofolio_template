/**
 * Panel layout constraints for the resizable desktop bento grid.
 * All values are percentages of the container's width or height.
 */
export const PANEL_CONSTRAINTS = {
  /** Minimum % of viewport height for the top (Hero/Skills) row */
  minTopHeight: 15,
  /** Maximum % of viewport height for the top (Hero/Skills) row */
  maxTopHeight: 40,
  /** Minimum % of viewport width for any left panel column */
  minLeftWidth: 30,
  /** Maximum % of viewport width for any left panel column */
  maxLeftWidth: 70,
  /** Minimum % of the bottom-right column height for the About panel */
  minAboutHeight: 30,
  /** Maximum % of the bottom-right column height for the About panel */
  maxAboutHeight: 70,
} as const;

/**
 * Default initial sizes for the four resizable panels (all in %).
 * These are the values used on first render before any dragging occurs.
 */
export const DEFAULT_PANEL_SIZES = {
  topHeight: 25,
  topLeftWidth: 55,
  bottomLeftWidth: 40,
  bottomRightTopHeight: 60,
} as const;

/**
 * Linear interpolation factor used for LERP-damped panel dragging.
 * A value of 0.15 produces a smooth, slightly lagged tracking effect.
 * Lower values = smoother but slower; higher values = snappier.
 */
export const PANEL_LERP_FACTOR = 0.15;
