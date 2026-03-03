"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import type { ContactEntry } from "@/re/types";

const MailTickIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="block shrink-0">
    <path fillRule="evenodd" clipRule="evenodd" d="M21.0284 7.68C21.3933 7.31515 22 7.48403 22 8V16C22 18.2091 20.2091 20 18 20H6C3.79086 20 2 18.2091 2 16V8C2 5.79086 3.79086 4 6 4H18C18.4156 4 18.5631 4.48845 18.2692 4.78233L17.9629 5.08864C17.9029 5.14866 17.8061 5.15035 17.7441 5.09245C16.9363 4.33911 15.6707 4.38325 14.9173 5.19106C14.164 5.99886 14.2082 7.26442 15.016 8.01777L16.5398 9.43885C17.3277 10.1737 18.5562 10.1523 19.318 9.3904L21.0284 7.68ZM6.6 6.55C6.35147 6.21863 5.88137 6.15147 5.55 6.4C5.21863 6.64853 5.15147 7.11863 5.4 7.45L8.2 11.1833C9.08512 12.3635 10.1671 13.093 11.3411 13.2855C12.5224 13.4793 13.6827 13.1101 14.6706 12.314C14.9931 12.0541 15.0439 11.5819 14.784 11.2594C14.5241 10.9369 14.0519 10.8861 13.7294 11.146C13.0173 11.7199 12.2776 11.9191 11.5839 11.8053C10.8829 11.6903 10.1149 11.2365 9.4 10.2833L6.6 6.55Z" fill="currentColor"/>
    <path d="M21.4103 5.53033C21.7032 5.23744 21.7032 4.76256 21.4103 4.46967C21.1174 4.17678 20.6426 4.17678 20.3497 4.46967L17.8856 6.93371L16.8915 6.00661C16.5886 5.72411 16.114 5.74066 15.8315 6.04359C15.549 6.34652 15.5656 6.8211 15.8685 7.10361L17.3923 8.52469C17.6878 8.80025 18.1484 8.79222 18.4341 8.50652L21.4103 5.53033Z" fill="currentColor"/>
  </svg>
);

const SmartphoneIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="block shrink-0">
    <path fillRule="evenodd" clipRule="evenodd" d="M8 2C5.79086 2 4 3.79086 4 6V18C4 20.2091 5.79086 22 8 22H16C18.2091 22 20 20.2091 20 18V6C20 3.79086 18.2091 2 16 2H8ZM12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z" fill="currentColor"/>
  </svg>
);

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
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  return (
    <div className="relative h-full flex flex-col justify-between">
      {/* Upper Content - Main Links */}
      <div className="py-1">
        <h3 className="heading-section-sm inline-block leading-tight"><span className="relative z-10">Contact Me</span></h3>
        <div className="mt-4 space-y-2">
          {data.map((entry) => (
            <a
              key={entry.value}
              href={entry.href}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              {entry.icon === "mail-tick" && <MailTickIcon />}
              {entry.icon === "smartphone" && <SmartphoneIcon />}
              <span>{entry.value}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Theme toggle — bottom right */}
      {mounted && (
        <button
          onClick={() => setTheme(isDark ? "light" : "dark")}
          className="group absolute bottom-0 right-0 cursor-pointer overflow-hidden p-1 transition-all duration-300 ease-out hover:scale-110"
        >
          <span className="absolute inset-0 origin-left scale-x-0 bg-foreground transition-transform duration-300 ease-out group-hover:scale-x-100" />
          <span className="relative z-10 flex items-center transition-colors duration-300 group-hover:text-background">
            {isDark ? <SunIcon /> : <MoonIcon />}
          </span>
        </button>
      )}
    </div>
  );
}
