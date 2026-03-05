/**
 * Work / project content.
 *
 * Add, edit, or remove entries here to control what appears in the Work section.
 * category must match one of: AI / 作品集 / 实际项目 / 摄影
 *
 * Project fields:
 *  title     — headline text (use \n for line breaks)
 *  tagline   — bottom label, e.g. "> READY TO EXECUTE _"
 *  logo      — top-left Lucide icon name (see re/icons.tsx for available names)
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
        title: "基于节点的\n生图框架",
        tagline: "> Todo _",
        logo: "Workflow",
        techStack: ["Node.js"],
        imageGroups: [
          ["/works/node-image-framework/1.png"], // pageIdx 0 = page 2
          ["/works/node-image-framework/2.mp4"], // pageIdx 1 = page 3
        ],
        pages: 3,
      },
      {
        title: "Mochi",
        tagline: "> AI结构化输出 _",
        logo: "BrainCircuit",
        techStack: ["Figma", "Html"],
        imageGroups: [
          ["/works/mochi/1-1.png", "/works/mochi/1-2.png"],
          ["/works/mochi/2.png"],
          ["/works/mochi/3.mp4"],
        ],
        pages: 4,
      },
      {
        title: "SketchUp\n插件",
        tagline: "> 原型图绘制，Vibe Coding _",
        logo: "PenTool",
        techStack: ["Ruby", "Python", "Node.js"],
      },
      {
        title: "Sketch MCP",
        tagline: "> MCP服务器，自然语言建模 _",
        logo: "Server",
        techStack: ["Python", "Json"],
        href: "https://github.com/1pitaph/su_mcp",
        imageGroups: [
          [], // pageIdx 0 = page 2 (text, handled by pageTexts)
          ["/works/sketch-mcp/1-1.png", "/works/sketch-mcp/1-2.png"], // pageIdx 1 = page 3
          ["/works/sketch-mcp/2.png"], // pageIdx 2 = page 4
          ["/works/sketch-mcp/3.mp4"], // pageIdx 3 = page 5
          ["/works/sketch-mcp/4.mp4"], // pageIdx 4 = page 6
        ],
        pages: 6,
      },
      {
        title: "NanoBanana\n生图指南",
        tagline: "> PDF _",
        logo: "BookOpen",
        techStack: ["Figma", "Tropy"],
      },
      {
        title: "Openclaw\n可视化",
        tagline: "> 像素风看板 _",
        logo: "BarChart3",
        techStack: ["Github", "Python"],
      },
      {
        title: "Lora训练",
        tagline: "> 风格化 _",
        logo: "Wand2",
        techStack: ["Pytorch"],
        pages: 2,
      },
    ],
  },
  {
    category: "作品集",
    projects: [
      {
        title: "Designer Soul.\nDeveloper Brain.",
        tagline: "> READY TO EXECUTE _",
        logo: "Code2",
      },
      {
        title: "Bento\nPortfolio.",
        tagline: "> THIS VERY SITE _",
        logo: "LayoutGrid",
        href: "https://github.com/1pitaph/bento_portofolio_template",
      },
      {
        title: "Coastal Erosion",
        tagline: "> Portfolio _",
        logo: "Waves",
        images: [
          "/works/coastal-erosion/1.png",
          "/works/coastal-erosion/2.png",
          "/works/coastal-erosion/3.png",
          "/works/coastal-erosion/4.png",
          "/works/coastal-erosion/5.png",
          "/works/coastal-erosion/6.png",
        ],
        pages: 7,
      },
      {
        title: "Avian Oasis",
        tagline: "> Portfolio _",
        logo: "Bird",
        images: [
          "/works/avian-oasis/1.png",
          "/works/avian-oasis/2.png",
          "/works/avian-oasis/3.png",
          "/works/avian-oasis/4.png",
          "/works/avian-oasis/5.png",
          "/works/avian-oasis/6.png",
        ],
        pages: 7,
      },
      {
        title: "Mountain &\nRiver Harmony",
        tagline: "> Portfolio _",
        logo: "Mountain",
        images: [
          "/works/mountain-river-harmony/1.png",
          "/works/mountain-river-harmony/2.png",
          "/works/mountain-river-harmony/3.png",
          "/works/mountain-river-harmony/4.png",
          "/works/mountain-river-harmony/5.png",
          "/works/mountain-river-harmony/6.png",
        ],
        pages: 7,
      },
    ],
  },
  {
    category: "实际项目",
    projects: [
      {
        title: "保利·天奕",
        tagline: "> 大连 _",
        logo: "Building",
        imageGroups: [
          ["/works/boli-tianyi/1.jpg"],
          ["/works/boli-tianyi/2.jpg"],
          ["/works/boli-tianyi/3.jpg"],
          ["/works/boli-tianyi/4.jpg"],
          ["/works/boli-tianyi/5.jpg"],
        ],
        pages: 6,
      },
      {
        title: "杜仲公园策划",
        tagline: "> 北京 _",
        logo: "TreePine",
        imageGroups: [
          ["/works/duzhong-park/1.jpg"],
          ["/works/duzhong-park/2.jpg"],
          ["/works/duzhong-park/3.jpg"],
          ["/works/duzhong-park/4.jpg"],
          ["/works/duzhong-park/5.jpg"],
        ],
        pages: 6,
      },
      {
        title: "昆仑府西区",
        tagline: "> 临汾 _",
        logo: "Building2",
        imageGroups: [
          ["/works/kunlunfu-west/1.jpg"],
          ["/works/kunlunfu-west/2.jpg"],
          ["/works/kunlunfu-west/3.jpg"],
          ["/works/kunlunfu-west/4.jpg"],
          ["/works/kunlunfu-west/5.jpg"],
        ],
        pages: 6,
      },
      {
        title: "联东U谷",
        tagline: "> 北京 _",
        logo: "LayoutGrid",
        imageGroups: [
          ["/works/liandong-upark/1.jpg"],
          ["/works/liandong-upark/2.jpg"],
          ["/works/liandong-upark/3.jpg"],
          ["/works/liandong-upark/4.jpg"],
          ["/works/liandong-upark/5.jpg"],
        ],
        pages: 6,
      },
      {
        title: "联想住区\n想云湾",
        tagline: "> 天津 _",
        logo: "Waves",
        imageGroups: [
          ["/works/lenovo-xiangyunwan/1.jpg"],
          ["/works/lenovo-xiangyunwan/2.jpg"],
          ["/works/lenovo-xiangyunwan/3.jpg"],
          ["/works/lenovo-xiangyunwan/4.jpg"],
          ["/works/lenovo-xiangyunwan/5.jpg"],
        ],
        pages: 6,
      },
      {
        title: "润城桃熹",
        tagline: "> 徐州 _",
        logo: "Bird",
        imageGroups: [
          ["/works/runcheng-taoxi/1.jpg"],
          ["/works/runcheng-taoxi/2.jpg"],
          ["/works/runcheng-taoxi/3.jpg"],
          ["/works/runcheng-taoxi/4.jpg"],
          ["/works/runcheng-taoxi/5.jpg"],
        ],
        pages: 6,
      },
      {
        title: "双桥公园",
        tagline: "> 北京 _",
        logo: "TreePine",
        imageGroups: [
          ["/works/shuangqiao-park/1.jpg"],
          ["/works/shuangqiao-park/2.jpg"],
          ["/works/shuangqiao-park/3.jpg"],
          ["/works/shuangqiao-park/4.jpg"],
          ["/works/shuangqiao-park/5.jpg"],
        ],
        pages: 6,
      },
    ],
  },
  {
    category: "摄影",
    projects: [
      {
        title: "宸知筑",
        tagline: "> 北京 _",
        logo: "Building2",
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
        logo: "Mountain",
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
        logo: "Building",
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
        logo: "Anchor",
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
