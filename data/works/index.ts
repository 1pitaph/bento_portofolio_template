/**
 * Work / project content.
 *
 * Add, edit, or remove entries here to control what appears in the Work section.
 * category must match one of: AI / 作品集 / 实际项目 / 摄影
 *
 * Project fields:
 *  title     — headline text (use \n for line breaks)
 *  tagline   — bottom label, e.g. "> READY TO EXECUTE _"
 *  logo      — top-left icon or emoji
 *  image     — single cover image path (relative to /public)
 *  images    — photography: first image is used as card cover (relative to /public)
 *  techStack — optional tags shown in the expanded grid view
 *  href      — optional URL, makes the card a clickable link
 */
import type { ProjectCategory } from "@/re/types";

export const projectCategories: ProjectCategory[] = [
  {
    category: "作品集",
    projects: [
      {
        title: "Designer Soul.\nDeveloper Brain.",
        tagline: "> READY TO EXECUTE _",
        logo: "⠿",
      },
      {
        title: "Bento\nPortfolio.",
        tagline: "> THIS VERY SITE _",
        logo: "⊞",
        href: "https://github.com/1pitaph/bento_portofolio_template",
      },
    ],
  },
  {
    category: "AI",
    projects: [
      {
        title: "Agent\nWorkflow.",
        tagline: "> BUILT WITH LANGCHAIN _",
        logo: "⊕",
        techStack: ["Python", "LangChain"],
      },
    ],
  },
  {
    category: "实际项目",
    projects: [
      {
        title: "Full-Stack\nDashboard.",
        tagline: "> PRODUCTION READY _",
        logo: "⊗",
        techStack: ["Next.js", "TypeScript"],
      },
    ],
  },
  {
    category: "摄影",
    projects: [
      {
        title: "City Frames",
        tagline: "> URBAN SERIES _",
        // Replace with your actual photo paths under /public
        images: [
          "/photos/city-1.jpg",
          "/photos/city-2.jpg",
          "/photos/city-3.jpg",
          "/photos/city-4.jpg",
        ],
      },
    ],
  },
];
