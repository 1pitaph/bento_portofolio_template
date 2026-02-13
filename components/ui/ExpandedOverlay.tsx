"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

/**
 * Full-screen overlay that animates in/out using a Framer Motion clip-path
 * transition, creating the illusion that the overlay expands out of the
 * source panel that was clicked.
 *
 * @prop isOpen    - Controls AnimatePresence visibility.
 * @prop clipFrom  - CSS `inset()` string for the initial/exit clip-path (the
 *   panel's screen position). Obtain via `getClipFrom` in `@/lib/animation`.
 * @prop children  - Content rendered inside the overlay (the expanded section).
 * @prop padding   - Tailwind padding class for the inner scroll container.
 *   Defaults to `"p-6"`.
 * @prop uniqueKey - Stable key for `<motion.div>` to drive AnimatePresence
 *   exit/enter cycle correctly when the same overlay re-opens.
 */
type ExpandedOverlayProps = {
  isOpen: boolean;
  clipFrom: string;
  children: ReactNode;
  padding?: string;
  uniqueKey: string;
};

export default function ExpandedOverlay({
  isOpen,
  clipFrom,
  children,
  padding = "p-6",
  uniqueKey,
}: ExpandedOverlayProps) {
  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          key={uniqueKey}
          className="fixed inset-0 z-50 bg-white"
          initial={{ clipPath: clipFrom }}
          animate={{ clipPath: "inset(0px 0px 0px 0px)" }}
          exit={{ clipPath: clipFrom }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.div
            className={`h-full overflow-auto ${padding}`}
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { duration: 0.35, delay: 0.08 },
            }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
