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
        title: "NanoBanana\n生图指南",
        tagline: "> PDF _",
        logo: "BookOpen",
        techStack: ["Figma", "Tropy"],
        imageGroups: [
          ["/works/nanobanana-guide/1.png"], // page 2
          ["/works/nanobanana-guide/2.png"], // page 3
          ["/works/nanobanana-guide/3-1.png", "/works/nanobanana-guide/3-2.png"], // page 4
          ["/works/nanobanana-guide/4-1.png", "/works/nanobanana-guide/4-2.png"], // page 5
          ["/works/nanobanana-guide/5-1.png", "/works/nanobanana-guide/5-2.png"], // page 6
          ["/works/nanobanana-guide/6-1.png", "/works/nanobanana-guide/6-2.png"], // page 7
        ],
        pages: 7,
      },
      {
        title: "奥创Bridge",
        tagline: "> 连接奥创引擎与SU _",
        logo: "Link",
        techStack: ["Ruby", "Node.js"],
        imageGroups: [
          ["/works/aichuang-bridge/1.png"], // page 2
          ["/works/aichuang-bridge/2-1.png", "/works/aichuang-bridge/2-2.png"], // page 3
          ["/works/aichuang-bridge/3.mp4"], // page 4
        ],
        pages: 4,
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
        imageGroups: [
          ["/works/sketchup-plugin/1.png"], // page 2
          ["/works/sketchup-plugin/2.png"], // page 3
          ["/works/sketchup-plugin/3.png"], // page 4
          ["/works/sketchup-plugin/4.png"], // page 5
          ["/works/sketchup-plugin/5.png"], // page 6
          ["/works/sketchup-plugin/6.png"], // page 7
          ["/works/sketchup-plugin/7.png"], // page 8
          ["/works/sketchup-plugin/8.png"], // page 9
          ["/works/sketchup-plugin/9.png"], // page 10
          ["/works/sketchup-plugin/10.mp4"], // page 11 (long video)
        ],
        pages: 11,
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
        title: "前端设计",
        tagline: "> ai生成前端页面尝试 _",
        logo: "Palette",
        techStack: ["Figma", "Html"],
        imageGroups: [
          ["/works/frontend-design/1.mp4"], // page 2
          ["/works/frontend-design/2.mp4"], // page 3
          ["/works/frontend-design/3.mp4"], // page 4
          ["/works/frontend-design/4.mp4"], // page 5
          ["/works/frontend-design/5.mp4"], // page 6
          ["/works/frontend-design/6.mp4"], // page 7
          ["/works/frontend-design/7.mp4"], // page 8
          ["/works/frontend-design/8.png"], // page 9
          ["/works/frontend-design/9.png"], // page 10
          ["/works/frontend-design/10.png"], // page 11
          ["/works/frontend-design/11.png"], // page 12
          ["/works/frontend-design/12.png"], // page 13
          ["/works/frontend-design/13.png"], // page 14
        ],
        pages: 14,
      },
      {
        title: "iOS App 框架",
        tagline: "> ios app开发尝试 _",
        logo: "Smartphone",
        techStack: ["Swift"],
        imageGroups: [
          ["/works/ios-app-framework/1-1.jpg", "/works/ios-app-framework/1-2.jpg"], // page 2
        ],
        pages: 2,
      },
      {
        title: "Openclaw\n可视化",
        tagline: "> 像素风看板 _",
        logo: "BarChart3",
        techStack: ["Github", "Python"],
        imageGroups: [
          ["/works/openclaw/1.jpg"], // page 2
        ],
        pages: 2,
      },
      {
        title: "Lora训练",
        tagline: "> 风格化 _",
        logo: "Wand2",
        techStack: ["Pytorch"],
        imageGroups: [
          ["/works/lora-training/1.jpg"], // page 2
        ],
        pages: 2,
      },
    ],
  },
  {
    category: "作品集",
    projects: [
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
          ["/works/boli-tianyi/6.jpg"],
          ["/works/boli-tianyi/7.jpg"],
          ["/works/boli-tianyi/8.jpg"],
        ],
        pages: 9,
      },
      {
        title: "杜仲公园策划",
        tagline: "> 北京 _",
        logo: "TreePine",
        imageGroups: [
          ["/works/duzhong-park/1.png"],
          ["/works/duzhong-park/2.jpg"],
          ["/works/duzhong-park/3.jpg"],
          ["/works/duzhong-park/4.png"],
          ["/works/duzhong-park/5.png"],
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
