"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import type { Project } from "@/re/types";
import { WorkIcon } from "@/re/icons";
import { workCaptions } from "@/data/works/captions";
import { workPageTexts } from "@/data/works/pageTexts";
import { workVideoConfig } from "@/data/works/videoConfig";
import { PlyrVideo } from "@/components/ui/PlyrVideo";

type WorkCardModalProps = {
  project: Project | null;
  onClose: () => void;
  compact?: boolean;
  mounted: boolean;
};

export function WorkCardModal({
  project,
  onClose,
  compact = false,
  mounted,
}: WorkCardModalProps) {
  const [currentPage, setCurrentPage] = useState(1);

  // Reset to page 1 whenever a different project is opened
  useEffect(() => {
    setCurrentPage(1);
  }, [project?.title]);

  if (!mounted) return null;

  const pageCount = project?.pages ?? 1;

  return createPortal(
    <AnimatePresence>
      {project && (() => {
        // Only `image` (singular) determines page-1 cover styling.
        // `images[]` is for gallery pages (2+) and does NOT affect page-1 appearance.
        const coverSrc = project.image ?? null;
        const hasImg = !!coverSrc;
        const isPage1 = currentPage === 1;

        // Shared button color classes
        const btnCls = hasImg
          ? "border-white/50 text-white hover:bg-white hover:text-black"
          : "border-foreground text-foreground hover:bg-foreground hover:text-background";

        /* ── Mobile: full-screen plain overlay ── */
        if (compact) {
          return (
            <motion.div
              key="work-card-modal-mobile"
              className="fixed inset-0 z-[200] flex flex-col bg-background"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 32 }}
            >
              {/* Cover image (top half) */}
              {coverSrc && (
                <div className="relative w-full" style={{ height: "45%" }}>
                  <Image src={coverSrc} alt={project.title} fill className="object-cover" />
                </div>
              )}

              {/* Content */}
              <div className="flex flex-1 flex-col justify-between p-8">
                <div>
                  {project.logo && (
                    <span className="inline-flex leading-none text-foreground">
                      <WorkIcon name={project.logo} size={28} />
                    </span>
                  )}
                </div>

                <h2
                  className="text-4xl font-bold leading-tight text-foreground"
                  style={{ fontFamily: "var(--font-oppo-sans)" }}
                >
                  {project.title}
                </h2>

                <div className="flex items-end justify-between">
                  <div>
                    {project.tagline && (
                      <span
                        className="text-xs font-medium tracking-widest text-foreground/85"
                        style={{ fontFamily: "var(--font-oppo-sans)" }}
                      >
                        {project.tagline}
                      </span>
                    )}
                  </div>
                  {project.href && (
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 border border-foreground px-5 py-2 text-sm text-foreground transition-colors hover:bg-foreground hover:text-background"
                      style={{ fontFamily: "var(--font-oppo-sans)" }}
                    >
                      Visit →
                    </a>
                  )}
                </div>
              </div>

              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-5 right-5 z-20 flex h-8 w-8 items-center justify-center border border-foreground text-foreground transition-colors hover:bg-foreground hover:text-background"
                aria-label="Close"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </motion.div>
          );
        }

        /* ── Desktop: 80% centered card with backdrop blur ── */
        return (
          <motion.div
            key="work-card-modal"
            className="fixed inset-0 z-[200] flex items-center justify-center"
            style={{ backdropFilter: "blur(12px)", backgroundColor: "rgba(0,0,0,0.25)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          >
            <motion.div
              className={`relative w-[80vw] h-[80vh] overflow-hidden border border-foreground bg-background${!hasImg && isPage1 ? " work-modal-dot-grid" : ""}`}
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }}
              transition={{ type: "spring", stiffness: 280, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Page 1: optional cover image with overlay */}
              {isPage1 && coverSrc && (
                <>
                  <Image src={coverSrc} alt={project.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/55" />
                </>
              )}

              {/* Pages 2+: text page OR image/video page */}
              {!isPage1 && (() => {
                const pageIdx = currentPage - 2;

                // Text page takes priority over images
                const textBlocks = workPageTexts[project.title]?.[pageIdx];
                if (textBlocks) {
                  return (
                    <div
                      className="absolute inset-x-16 inset-y-12 z-20 overflow-y-auto bg-background"
                      style={{ fontFamily: "var(--font-oppo-sans)" }}
                    >
                      {textBlocks.map((block, i) => {
                        if (block.type === "h") return (
                          <h3 key={i} className="mt-6 mb-2 text-base font-semibold tracking-widest text-foreground/80 first:mt-0">
                            {block.text}
                          </h3>
                        );
                        if (block.type === "arch") return (
                          <div key={i} className="my-4 flex flex-wrap items-center gap-y-2">
                            {block.nodes.map((node, ni) => (
                              <div key={ni} className="flex items-center">
                                <span className="border border-foreground/50 px-3 py-1.5 text-xs font-medium text-foreground/85">
                                  {node}
                                </span>
                                {ni < block.edges.length && (
                                  <div className="flex items-center gap-1 px-2 text-foreground/45">
                                    <svg width="8" height="8" viewBox="0 0 8 8" fill="currentColor"><polygon points="0,0 8,4 0,8"/></svg>
                                    <span className="text-[10px] font-mono tracking-wider">{block.edges[ni]}</span>
                                    <svg width="8" height="8" viewBox="0 0 8 8" fill="currentColor"><polygon points="8,0 0,4 8,8"/></svg>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        );
                        if (block.type === "tree") return (
                          <pre key={i} className="mt-2 mb-4 overflow-x-auto border-l-2 border-foreground/20 pl-4 text-[11px] leading-relaxed text-foreground/60 whitespace-pre" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>
                            {block.text}
                          </pre>
                        );
                        if (block.type === "li") return (
                          <p key={i} className="mb-2 flex gap-2 text-sm leading-relaxed text-foreground/65">
                            <span className="shrink-0 select-none">—</span>
                            <span>{block.text}</span>
                          </p>
                        );
                        return (
                          <p key={i} className="mb-4 text-sm leading-relaxed text-foreground">
                            {block.text}
                          </p>
                        );
                      })}
                    </div>
                  );
                }

                // imageGroups takes priority; otherwise fall back to images[] (one per page)
                const pageImages: string[] = project.imageGroups
                  ? (project.imageGroups[pageIdx] ?? [])
                  : project.images?.[pageIdx]
                  ? [project.images[pageIdx]]
                  : [];
                if (pageImages.length === 0) return null;
                const pageCaptions = workCaptions[project.title]?.[pageIdx];
                return (
                  <div className="absolute inset-x-16 inset-y-12 z-20 flex items-center justify-center gap-6 bg-background">
                    {pageImages.map((src, idx) => {
                      const caption = pageCaptions?.[idx];
                      const isVideo = /\.(mp4|webm)$/i.test(src);
                      const hasControls = isVideo && (workVideoConfig[src]?.controls ?? false);
                      return (
                        // Image/video + caption centered together as one unit
                        <div key={idx} className="flex flex-1 flex-col items-center justify-center min-w-0 h-full">
                          {isVideo ? (
                            hasControls ? (
                              <PlyrVideo
                                key={src}
                                src={src}
                                maxHeight={caption ? "calc(100% - 2rem)" : "100%"}
                              />
                            ) : (
                              <video
                                src={src}
                                muted
                                playsInline
                                autoPlay
                                loop
                                className="max-w-full w-auto h-auto object-contain transition-transform duration-300 ease-out hover:-translate-y-3 hover:drop-shadow-[0_16px_32px_rgba(0,0,0,0.22)]"
                                style={{ maxHeight: caption ? "calc(100% - 2rem)" : "100%" }}
                              />
                            )
                          ) : (
                            /* eslint-disable-next-line @next/next/no-img-element */
                            <img
                              src={src}
                              alt={`${project.title} ${currentPage - 1}${pageImages.length > 1 ? `-${idx + 1}` : ""}`}
                              className="max-w-full w-auto h-auto object-contain cursor-pointer transition-transform duration-300 ease-out hover:-translate-y-3 hover:drop-shadow-[0_16px_32px_rgba(0,0,0,0.22)]"
                              style={{ maxHeight: caption ? "calc(100% - 2rem)" : "100%" }}
                            />
                          )}
                          {caption && (
                            <p
                              className="shrink-0 mt-2 text-center text-sm font-medium text-foreground/55 tracking-wide"
                              style={{ fontFamily: "var(--font-oppo-sans)" }}
                            >
                              {caption}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                );
              })()}

              <div className={`relative z-10 flex h-full flex-col justify-between work-modal-page-content${!isPage1 ? " pointer-events-none" : ""}`}>
                {/* Top: logo (page 1 only) */}
                <div>
                  {isPage1 && project.logo && (
                    <span className={`inline-flex leading-none ${hasImg ? "text-white" : "text-foreground"}`}>
                      <WorkIcon name={project.logo} size={36} />
                    </span>
                  )}
                </div>

                {/* Middle: title (page 1 only) — flex-1 so it fills space and centers vertically */}
                <div className="flex flex-1 items-center">
                  {isPage1 && (
                    <h2
                      className={`text-5xl font-bold leading-tight ${hasImg ? "text-white" : "text-foreground"}`}
                      style={{ fontFamily: "var(--font-oppo-sans)" }}
                    >
                      {project.title}
                    </h2>
                  )}
                </div>

                {/* Bottom: tagline + visit button (page 1 only) */}
                <div className="flex items-end justify-between">
                  <div>
                    {isPage1 && project.tagline && (
                      <span
                        className={`text-sm font-medium tracking-widest ${hasImg ? "text-white/85" : "text-foreground/85"}`}
                        style={{ fontFamily: "var(--font-oppo-sans)" }}
                      >
                        {project.tagline}
                      </span>
                    )}
                  </div>
                  {isPage1 && pageCount === 1 && project.href && (
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 border px-5 py-2 text-sm transition-colors ${
                        hasImg
                          ? "border-white/60 text-white hover:bg-white hover:text-black"
                          : "border-foreground text-foreground hover:bg-foreground hover:text-background"
                      }`}
                      onClick={(e) => e.stopPropagation()}
                      style={{ fontFamily: "var(--font-oppo-sans)" }}
                    >
                      Visit →
                    </a>
                  )}
                </div>
              </div>

              {/* ── Close button (top-right) ── */}
              <button
                onClick={onClose}
                className={`absolute top-5 right-5 z-20 flex h-8 w-8 items-center justify-center border transition-colors ${btnCls}`}
                aria-label="Close"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>

              {/* ── Next-page arrow (below close button, only when pages > 1) ── */}
              {pageCount > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentPage((p) => (p % pageCount) + 1);
                  }}
                  className={`absolute top-16 right-5 z-20 flex h-8 w-8 items-center justify-center border transition-colors ${btnCls}`}
                  aria-label="Next page"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
              )}

              {/* ── Github button (below arrow, multi-page projects with href only) ── */}
              {pageCount > 1 && project.href && (
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className={`absolute top-[6.75rem] right-5 z-20 flex h-8 w-8 items-center justify-center border transition-colors ${btnCls}`}
                  aria-label="Visit Github"
                  title="Visit Github"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                  </svg>
                </a>
              )}

              {/* ── TechStack (bottom-right, page 1 only, right-aligned with close button) ── */}
              {isPage1 && project.techStack && project.techStack.length > 0 && (
                <div className="absolute bottom-5 right-5 z-20 flex flex-col items-end gap-1.5">
                  {project.techStack.map((tag) => (
                    <span
                      key={tag}
                      className={`border px-2 py-0.5 text-xs font-medium tracking-wider ${
                        hasImg ? "border-white/60 text-white" : "border-foreground text-foreground"
                      }`}
                      style={{ fontFamily: "var(--font-oppo-sans)" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* ── Page indicator dots (bottom-center, only when pages > 1) ── */}
              {pageCount > 1 && (
                <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5">
                  {Array.from({ length: pageCount }, (_, i) => (
                    <button
                      key={i}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentPage(i + 1);
                      }}
                      className={`transition-all duration-300 ${
                        i + 1 === currentPage
                          ? `h-2.5 w-2.5 ${hasImg ? "bg-white" : "bg-foreground"}`
                          : `h-1.5 w-1.5 ${hasImg ? "bg-white/40 hover:bg-white/70" : "bg-foreground/25 hover:bg-foreground/50"}`
                      }`}
                      aria-label={`Page ${i + 1}`}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        );
      })()}
    </AnimatePresence>,
    document.body
  );
}
