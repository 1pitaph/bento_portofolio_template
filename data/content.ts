import type {
  HeroData,
  SkillsData,
  AboutData,
  ContactEntry,
  ProjectCategory,
} from "@/re/types";

// Re-export types so existing imports keep working.
export type { ContactEntry, Project, ProjectCategory } from "@/re/types";

// ─── Hero ────────────────────────────────────────────────────
export const heroData: HeroData = {
  greeting: "Hi, I am 1pitaph",
  titles: ["if it's hard to learn", "it's a valuable knowledge", "..."],
};

// ─── Skills ──────────────────────────────────────────────────
export const skillsData: SkillsData = {
  skills: "VibeCoding Agent LangChain Python Figma Rhino SU Blender Houdini",
  highlights: ["VibeCoding", "Agent", "LangChain", "Figma"],
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
    value: "xzltxy@163.com",
    href: "mailto:xzltxy@163.com",
    icon: "mail-tick",
  },
  {
    type: "Phone",
    value: "18500243104",
    href: "tel:18500243104",
    icon: "smartphone",
  },
];

// ─── Work / Projects ─────────────────────────────────────────
// category 字段需与筛选器名称对应：AI / 作品集 / 实际项目 / 摄影
export const projectCategories: ProjectCategory[] = [];
