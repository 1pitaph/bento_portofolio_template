// Shared types used by both content.ts (local data) and Sanity (CMS data).

export type HeroData = {
  greeting: string;
  titles: string[];
};

export type SkillsData = {
  skills: string;
  highlights: string[];
};

export type AboutData = {
  image: string;
  imageAlt: string;
  text: string;
};

export type ContactEntry = {
  type: string;
  value: string;
  href: string;
  icon?: string;
};

export type Project = {
  title: string;
  tagline?: string;     // bottom tagline, e.g. "> READY TO EXECUTE _"
  logo?: string;        // top-left icon/emoji
  image?: string;       // single cover image
  images?: string[];    // photography: multiple photos (stacked card effect)
  imageGroups?: string[][];  // pages 2+: each sub-array = one page (supports multiple images per page)
  techStack?: string[];
  href?: string;
  pages?: number;       // number of detail pages in the modal (desktop); omit or 1 = no pagination
};

export type ProjectCategory = {
  category: string;
  projects: Project[];
};

export type SiteData = {
  hero: HeroData;
  skills: SkillsData;
  about: AboutData;
  contact: ContactEntry[];
  projectCategories: ProjectCategory[];
};

// ─── Sticky Notes ─────────────────────────────────────────────

export type NoteContentType = 'text' | 'quote' | 'snippet' | 'link';

export interface NoteContent {
  type: NoteContentType;
  text: string;
  label?: string;    // snippet header badge text
  caption?: string;  // quote attribution
  url?: string;      // link href
}

export interface StickyNoteData {
  id: string;
  x: number;         // initial left offset in px, relative to board
  y: number;         // initial top offset in px, relative to board
  rotation: number;  // initial rotation in degrees
  width: number;     // initial width in px
  height?: number;   // optional fixed height; auto-height if omitted
  bg: string;        // CSS background color
  content: NoteContent;
}
