/**
 * Text-only modal pages.
 *
 * Key = project title (must match exactly)
 * Value = array parallel to imageGroups (pageIdx 0 = modal page 2)
 *   If a page has text content here, it renders as a text page instead of an image page.
 *
 * Block types:
 *   p    — paragraph
 *   h    — section heading
 *   li   — list item (prefixed with —)
 *   arch — architecture diagram: nodes connected by labeled bidirectional arrows
 */
export type TextBlock =
  | { type: "p"; text: string }
  | { type: "h"; text: string }
  | { type: "li"; text: string }
  | { type: "arch"; nodes: string[]; edges: string[] }
  | { type: "tree"; text: string };

export const workPageTexts: Record<string, (TextBlock[] | undefined)[]> = {
  "Sketch MCP": [
    [
      { type: "p", text: "SketchUp MCP (Model Context Protocol) 服务器插件，使 AI 客户端（如 Claude）能通过标准化协议与 SketchUp 交互，实现 AI 辅助 3D 建模。" },
      { type: "h", text: "架构" },
      {
        type: "arch",
        nodes: ["MCP客户端 (Claude)", "stdio_bridge.py", "SketchUp TCP Server"],
        edges: ["stdio", "TCP"],
      },
      { type: "li", text: "SketchUp 内部: 非阻塞 TCP 服务器 (端口 9876)，使用 UI.start_timer 轮询" },
      { type: "li", text: "stdio_bridge.py: 跨平台 Python 脚本，桥接 stdio 和 TCP（无外部依赖）" },
      { type: "li", text: "SketchUp 插件: 全部纯 Ruby 实现，无外部 gem 依赖" },
      { type: "h", text: "文件结构" },
      { type: "tree", text: `su_mcp/
├── su_mcp.rb              # 扩展加载器
├── su_mcp/                # 支撑文件夹
│   ├── main.rb            # 插件入口
│   ├── version.rb         # 版本
│   ├── config.rb          # 配置
│   ├── server/            # TCP/JSON-RPC 传输层
│   ├── mcp/               # MCP 协议抽象
│   ├── tools/             # 工具实现
│   └── utils/             # 工具函数
├── bridge/
│   ├── stdio_bridge.py    # Stdio 桥接脚本 (Python, 推荐跨平台)
│   └── stdio_bridge.rb    # Stdio 桥接脚本 (Ruby, 备用)
└── README.md` },
    ],
    // pages 3–5: image pages (add entries here when ready)
  ],
};
