"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import type { ContactEntry } from "@/types";

const SunIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

const MoonIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

type ContactSectionProps = {
  data: ContactEntry[];
};

export function ContactSection({ data }: ContactSectionProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = theme === "dark";

  return (
    <div className="relative h-full">
      <h3 className="heading-section-sm">Contact Me</h3>
      <div className="mt-4 space-y-2">
        {data.map((entry) => (
          <a
            key={entry.value}
            href={entry.href}
            className="flex items-baseline gap-2 text-gray-600 hover:text-black"
          >
            <span>{entry.value}</span>
          </a>
        ))}
      </div>

      {/* Theme toggle — bottom right */}
      {mounted && (
        <button
          onClick={() => setTheme(isDark ? "light" : "dark")}
          className="group absolute bottom-0 right-0 cursor-pointer overflow-hidden p-1 transition-all duration-300 ease-out hover:scale-110"
        >
          <span className="absolute inset-0 origin-left scale-x-0 bg-black transition-transform duration-300 ease-out group-hover:scale-x-100" />
          <span className="relative z-10 flex items-center transition-colors duration-300 group-hover:text-white">
            {isDark ? <SunIcon /> : <MoonIcon />}
          </span>
        </button>
      )}
    </div>
  );
}
