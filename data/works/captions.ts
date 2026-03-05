/**
 * Modal image captions.
 *
 * Key = project title (must match exactly)
 * Value = array of page-caption arrays, parallel to imageGroups / images
 *   captions[pageIdx][imageIdx] — use undefined to skip a caption for that image
 *
 * pageIdx 0 = modal page 2 (page 1 is always the cover)
 */
export const workCaptions: Record<string, (string | undefined)[][]> = {
  "保利·天奕": [
    [undefined], [undefined], [undefined], [undefined], [undefined],
  ],
  "杜仲公园策划": [
    [undefined], [undefined], [undefined], [undefined], [undefined],
  ],
  "昆仑府西区": [
    [undefined], [undefined], [undefined], [undefined], [undefined],
  ],
  "联东U谷": [
    [undefined], [undefined], [undefined], [undefined], [undefined],
  ],
  "联想住区\n想云湾": [
    [undefined], [undefined], [undefined], [undefined], [undefined],
  ],
  "润城桃熹": [
    [undefined], [undefined], [undefined], [undefined], [undefined],
  ],
  "双桥公园": [
    [undefined], [undefined], [undefined], [undefined], [undefined],
  ],
  "基于节点的\n生图框架": [
    ["示例界面"], // pageIdx 0 = page 2: 1.png
    ["示例视频"], // pageIdx 1 = page 3: 2.mp4
  ],
  "Sketch MCP": [
    [],                       // pageIdx 0 = page 2 (text page)
    ["Claude 界面", "SketchUp Ruby 界面"],   // pageIdx 1 = page 3: 1-1.png, 1-2.png
    ["连接性测试"],              // pageIdx 2 = page 4: 2.png
    ["利用 MCP 协议通过 LLM 统计场景中材质"],              // pageIdx 3 = page 5: 3.mp4
    ["利用 MCP 协议运行 Ruby 代码"],              // pageIdx 4 = page 6: 4.mp4
  ],
  Mochi: [
    ["参考图", "在 Gemini 中生成原型代码"], // page 2: two images
    ["Figma Make 中进行细节调整"],               // page 3
    ["实际效果"],              // page 4 (gif, no caption)
  ],
};
