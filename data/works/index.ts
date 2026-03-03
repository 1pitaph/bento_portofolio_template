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
 *              recommended path: /works/photography/<project-folder>/<filename>
 *  techStack — optional tags shown on card hover and in modal page 1
 *  href      — optional URL, makes the card a clickable link
 *  pages     — number of detail pages in the desktop modal (omit or 1 = single page)
 */
import type { ProjectCategory } from "@/re/types";

export const projectCategories: ProjectCategory[] = [
  {
    category: "AI",
    projects: [
      {
        title: "Mochi",
        tagline: "> AI结构化输出 _",
        logo: "⊕",
        techStack: ["Figma", "Html"],
        pages: 3,
      },
      {
        title: "SketchUp\n插件",
        tagline: "> 原型图绘制，Vibe Coding _",
        logo: "⊞",
        techStack: ["Ruby", "Python", "Node.js"],
      },
      {
        title: "NanoBanana\n生图指南",
        tagline: "> PDF _",
        logo: "⊙",
        techStack: ["Figma", "Tropy"],
      },
      {
        title: "openclaw\n可视化",
        tagline: "> 像素风看板 _",
        logo: "⊘",
        techStack: ["Github", "Python"],
      },
    ],
  },
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
        title: "宸知筑",
        tagline: "> 北京 _",
        // 页面布局：第1页 = 标题信息，第2-6页 = images[0]-images[4]
        images: [
          "/works/photography/chenzhizhu/1.jpg",
          "/works/photography/chenzhizhu/2.jpg",
          "/works/photography/chenzhizhu/3.jpg",
          "/works/photography/chenzhizhu/4.jpg",
          "/works/photography/chenzhizhu/5.jpg",
        ],
        pages: 6,
      },
      {
        title: "观山悦湖",
        tagline: "> 泰安 _",
        // 页面布局：第1页 = 标题信息，第2-5页 = images[0]-images[3]
        images: [
          "/works/photography/guanshanyuehu/1.jpg",
          "/works/photography/guanshanyuehu/2.jpg",
          "/works/photography/guanshanyuehu/3.jpg",
          "/works/photography/guanshanyuehu/4.jpg",
        ],
        pages: 5,
      },
      {
        title: "保利·璞岸",
        tagline: "> 郑州 _",
        // 页面布局：第1页 = 标题信息，第2-6页 = images[0]-images[4]
        images: [
          "/works/photography/polipuan/1.jpg",
          "/works/photography/polipuan/2.jpg",
          "/works/photography/polipuan/3.jpg",
          "/works/photography/polipuan/4.jpg",
          "/works/photography/polipuan/5.jpg",
        ],
        pages: 6,
      },
      {
        title: "保利·东港天汇",
        tagline: "> 大连 _",
        // 页面布局：第1页 = 标题信息，第2-6页 = images[0]-images[4]
        images: [
          "/works/photography/polidonggangtianhui/1.jpg",
          "/works/photography/polidonggangtianhui/2.jpg",
          "/works/photography/polidonggangtianhui/3.jpg",
          "/works/photography/polidonggangtianhui/4.jpg",
          "/works/photography/polidonggangtianhui/5.jpg",
        ],
        pages: 6,
      },
    ],
  },
];
