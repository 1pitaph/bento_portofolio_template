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
    [undefined], [undefined], [undefined], [undefined], [undefined], [undefined], [undefined], [undefined],
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
  "SketchUp\n插件": [
    ["平行边间距检测（Parallel Gap）"], // page 2
    ["面厚度 / 距离检测（Thickness / Distance）"], // page 3
    ["钉标坐标工具（Pin Tool）"], // page 4
    ["参考线交点检测（CLine Inspector）"], // page 5
    ["Offset ++ — 偏移工具增强"], // page 6
    ["Set Dimension"], // page 7
    ["三轴尺寸标注"], // page 8
    ["Edge Highlight 模式"], // page 9
    ["SelectionInfoOverlay — 左上角信息面板"], // page 10
    ["演示视频"], // page 11 (long video)
  ],
  "奥创Bridge": [
    ["Figma 中绘制原型图"], // page 2: 1.png
    ["图片库", "主界面"], // page 3: 2-1.png, 2-2.png
    ["演示视频"], // page 4: 3.mp4
  ],
  "NanoBanana\n生图指南": [
    ["概览"], // page 2: 1.png
    ["概览"], // page 3: 2.png
    [undefined, undefined], // page 4: 3-1.png, 3-2.png
    [undefined, undefined], // page 5: 4-1.png, 4-2.png
    [undefined, undefined], // page 6: 5-1.png, 5-2.png
    [undefined, undefined], // page 7: 6-1.png, 6-2.png
  ],
  "前端设计": [
    [undefined], // page 2: 1.mp4
    [undefined], // page 3: 2.mp4
    [undefined], // page 4: 3.mp4
    [undefined], // page 5: 4.mp4
    [undefined], // page 6: 5.mp4
    [undefined], // page 7: 6.mp4
    [undefined], // page 8: 7.mp4
    [undefined], // page 9: 8.png
    [undefined], // page 10: 9.png
    [undefined], // page 11: 10.png
    [undefined], // page 12: 11.png
    [undefined], // page 13: 12.png
    [undefined], // page 14: 13.png
  ],
  "iOS App 框架": [
    ["主界面", "播放界面"], // page 2: 1-1.png, 1-2.png
  ],
  "Openclaw\n可视化": [
    ["基于开源项目 Star-Office-UI 构建"], // page 2: 1.png
  ],
  "Lora训练": [
    [undefined], // page 2: 1.png
  ],
};
