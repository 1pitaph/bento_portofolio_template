/**
 * Converts a `DOMRect` into a CSS `inset()` clip-path string that exactly
 * covers the same screen region as the source element.
 *
 * Used as the `initial` and `exit` clip-path value for `ExpandedOverlay`,
 * creating the visual illusion that the overlay expands out of the panel
 * that was clicked.
 *
 * Returns `"inset(0px 0px 0px 0px)"` (full screen, no clipping) when
 * `sourceRect` is `null` or when called during server-side rendering.
 *
 * @param sourceRect - Bounding rect of the panel that triggered the overlay,
 *   obtained via `element.getBoundingClientRect()`.
 * @returns A CSS `inset(top right bottom left)` string in pixels.
 *
 * @example
 * const clipFrom = getClipFrom(panelRef.current?.getBoundingClientRect() ?? null);
 * // e.g. "inset(120px 400px 600px 0px)"
 */
export const getClipFrom = (sourceRect: DOMRect | null) => {
  if (!sourceRect || typeof window === "undefined")
    return "inset(0px 0px 0px 0px)";
  const top = Math.round(sourceRect.top);
  const right = Math.round(window.innerWidth - sourceRect.right);
  const bottom = Math.round(window.innerHeight - sourceRect.bottom);
  const left = Math.round(sourceRect.left);
  return `inset(${top}px ${right}px ${bottom}px ${left}px)`;
};
