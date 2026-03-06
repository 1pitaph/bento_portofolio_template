/**
 * Per-video playback configuration.
 *
 * Key = video src path (must match exactly, e.g. "/works/mochi/3.mp4")
 *
 * controls: false (default) — autoplay, loop, muted, no UI controls (short clips)
 * controls: true            — muted, Plyr player controls, no autoplay (long videos)
 */
export const workVideoConfig: Record<string, { controls: boolean }> = {
  "/works/node-image-framework/2.mp4": { controls: false },
  "/works/mochi/3.mp4": { controls: false },
  "/works/sketch-mcp/3.mp4": { controls: false },
  "/works/sketch-mcp/4.mp4": { controls: true },
  "/works/sketchup-plugin/10.mp4": { controls: true },
  "/works/aichuang-bridge/3.mp4": { controls: false },
};
