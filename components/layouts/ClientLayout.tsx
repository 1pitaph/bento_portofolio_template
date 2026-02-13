"use client";

import { useState } from "react";
import type { SiteData } from "@/types";
import MobileLayout from "./MobileLayout";
import LaptopLayout from "./LaptopLayout";

type ExpandedSection = "work" | "about" | null;

/**
 * Top-level client component that owns the `expandedSection` state shared
 * between the mobile and desktop layouts.
 *
 * Renders `MobileLayout` below the `md` breakpoint and `LaptopLayout` at
 * `md` and above. Both layout trees are always mounted (show/hide via CSS)
 * so that state is preserved across breakpoint transitions without a remount.
 *
 * This component lives in `components/layouts/` rather than `app/` because
 * it is not a Next.js route segment — it is a pure React client component
 * loaded by `app/page.tsx`.
 *
 * @prop siteData - Pre-fetched portfolio data from `getSiteData()`.
 */
export default function ClientLayout({ siteData }: { siteData: SiteData }) {
  const [expandedSection, setExpandedSection] = useState<ExpandedSection>(null);

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Mobile Layout */}
      <div className="block md:hidden">
        <MobileLayout
          siteData={siteData}
          expandedSection={expandedSection}
          setExpandedSection={setExpandedSection}
        />
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:block">
        <LaptopLayout
          siteData={siteData}
          expandedSection={expandedSection}
          setExpandedSection={setExpandedSection}
        />
      </div>
    </div>
  );
}
