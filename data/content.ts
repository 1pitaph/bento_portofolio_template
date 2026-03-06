import type {
  HeroData,
  SkillsData,
  AboutData,
  ContactEntry,
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
  image: "/avatar.png",
  imageAlt: "Avatar",
  text: `工具的演进，其实总是指向一个不断后退的边界。我一直觉得未经理性的直觉是漫无目的的，未经代码转译的某些灵感是混沌和混乱的。随着AI coding能力的提升，正是对它们进行筛选和诠释的最好时机，把"技术能做什么"变成了"这对我、对设计意味着什么"。对我来说，这也能获得内在的连续性与完整感。

这就是为什么Vibe Coding常常带来高潮般的掌控感。那个受制于流程限制与繁琐步骤的狭小的我，在coding中被更互联、更具象的算力所取代。那是一种创作者体验到从工具局限中解放出来的自由与狂喜。`,
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
// Edit work content in data/works/index.ts
export { projectCategories } from "@/data/works";
