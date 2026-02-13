import type {
  HeroData,
  SkillsData,
  AboutData,
  ContactEntry,
  ProjectCategory,
} from "@/types";

// Re-export types so existing imports keep working.
export type { ContactEntry, Project, ProjectCategory } from "@/types";

// ─── Hero ────────────────────────────────────────────────────
export const heroData: HeroData = {
  greeting: "Hi, I am XXX",
  titles: ["a template", "still a template", "just a template"],
};

// ─── Skills ──────────────────────────────────────────────────
export const skillsData: SkillsData = {
  skills: "claude, chatgpt, copilot, openclaw, gemini, deepseek ",
  highlights: ["claude", "chatgpt"],
};

// ─── About ───────────────────────────────────────────────────
export const aboutData: AboutData = {
  image: "/pic.png",
  imageAlt: " Character Illustration",
  text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore e`,
};

// ─── Contact ─────────────────────────────────────────────────
export const contactData: ContactEntry[] = [
  {
    type: "Email",
    value: "xxxxxxxx@g123.com",
    href: "mailto:xxxxxxxx@g123.com",
  },
];

// ─── Work / Projects ─────────────────────────────────────────
export const projectCategories: ProjectCategory[] = [
  {
    category: "Web Development",
    projects: [
      {
        title: "XXX",
        image: "/projects/placeholder.png",
        techStack: ["GSAP", "Three.js"],
        href: "#",
      },
    ],
  },
];
