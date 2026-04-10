# 行业周报生成指南

本文档是**半导体行业周报**的完整生成规范。任何 Agent 读完本文档后，应能够按相同标准产出周报的四个版本：**网页主页、PDF、PPTX、Word**。

本指南基于 `2026 W15` 首期实践沉淀，适用于任何垂直行业的周报项目（半导体、新能源、生物医药等），只需替换内容数据。

---

## 目录

1. [项目哲学](#1-项目哲学)
2. [交付物清单](#2-交付物清单)
3. [内容结构](#3-内容结构)
4. [研究与数据采集](#4-研究与数据采集)
5. [设计系统](#5-设计系统)
6. [文件架构](#6-文件架构)
7. [网页版规范](#7-网页版规范)
8. [PDF 版规范](#8-pdf-版规范)
9. [PPT 版规范](#9-ppt-版规范)
10. [Word 版规范](#10-word-版规范)
11. [移动端适配规范](#11-移动端适配规范)
12. [生成流水线](#12-生成流水线)
13. [质量检查清单](#13-质量检查清单)
14. [发布与部署](#14-发布与部署)

---

## 1. 项目哲学

### 风格定位：Editorial Minimal（编辑式极简）

融合三种设计基因：
- **Medium 的阅读体验** — 字体优美、留白充足、专注内容
- **报纸的信息密度** — 编号板块、标签、有序导读
- **瑞士设计的网格感** — 对齐严谨、克制用色、功能先行

### 四大原则

1. **内容为王** — 设计服务内容，不抢戏
2. **克制用色** — 全报告只有一抹红作为强调色，其余为黑灰白
3. **可溯源** — 每条信息都带有可点击的原始来源链接
4. **一源多版** — 数据源唯一（`data.mjs`），输出多种格式

### 目标读者

- **主读者**：40-55 岁企业高层，垂直领域资深人士
- **阅读场景**：每周一早 5-8 分钟快速浏览
- **阅读偏好**：大字号、清晰层级、重点突出、无学术堆砌

---

## 2. 交付物清单

每期周报必须交付以下 **4 个版本**：

| 版本 | 文件 | 用途 |
|---|---|---|
| **网页主页** | `index.html` | 在线阅读、分享链接、响应式 |
| **PDF** | `report-YYYY-WNN.pdf` | 打印、存档、邮件附件（主力） |
| **PPTX** | `report-YYYY-WNN.pptx` | 会议演示、大屏展示 |
| **DOCX** | `report-YYYY-WNN.docx` | 二次编辑、内部批注 |

命名约定：`YYYY-WNN` = 四位年份 + W + 两位周数。例：`report-2026-W15`。

网页版必须提供三个格式的下载入口。

---

## 3. 内容结构

### 标准板块（12 个）

每期周报包含以下 12 个板块。顺序不可颠倒：

| # | 板块 | 中文标题 | 英文副标题 | 内容要求 |
|---|---|---|---|---|
| 01 | 本周速览 | 本周速览 | Weekly Digest | 5 条一句话摘要，每条带标签 |
| 02 | 市场脉搏 | 市场脉搏 | Market Pulse | 行业指数 + 4 支核心股票卡片 |
| 03 | 公司动态 | 设备巨头动态 | Equipment Giants | 4-5 家核心公司，每家含 highlight + 事件列表 |
| 04 | 前沿技术 | 前沿技术 | Tech Frontier | 3 条技术进展，每条 1 个标题 + 1 段文字 |
| 05 | 中国板块 | 中国半导体动态 | China Semiconductor | 4 家中国公司 + 政策展望 highlight box |
| 06 | 学术研究 | 学术与研究前沿 | Academic & Research | 4 条学术突破，来自 Nature/IEEE/imec 等 |
| 07 | AI 与智能化 | AI 与智能化 | AI & Smart Manufacturing | 4 条 AI/自动化相关动态 |
| **08** | **产品与体验设计** | **产品与体验设计** | **Product & Experience Design** | **4-5 条工业设计/UX/HMI/品牌趋势** |
| 09 | 政策地缘 | 政策与地缘 | Policy & Geopolitics | 3 条政策，带国别 tag（US/CN/Global） |
| 10 | 产业格局 | 产业格局 | Industry Landscape | 1 个 highlight box，扩产/并购/供应链 |
| 11 | 值得一读 | 值得一读 | Worth Reading | 3-4 篇推荐文章，带来源和一句话推荐语 |
| 12 | 关键日程 | 关键日程 | Upcoming Events | 本月重要财报/会议时间表 |

#### 板块 08 — 产品与体验设计 详细说明

这是一个跨领域观察板块，关注**半导体产业链里所有与"人"相关的设计维度**：

- **EDA / 工具 UX** — Cadence、Synopsys、Siemens EDA 的界面与交互革新，Agentic 设计工具
- **HMI / 操作员体验** — 晶圆厂控制软件、数字孪生可视化、操作员工作流
- **工业设计** — 芯片封装、参考板、机架、数据中心硬件的视觉与物理设计
- **品牌视觉** — 公司品牌升级、年报设计、产品发布叙事
- **消费产品** — 搭载前沿芯片的终端产品的工业设计亮点

**选稿原则**：
- 每条必须是**真实发生的产品/事件**，不是观点评论
- 优先选有**视觉变革**或**交互范式转变**意义的事件
- 避免纯技术性能讨论（那属于"前沿技术"板块）

### 内容约束

- **总字数**：中文 3,000-4,500 字
- **阅读时间**：5-8 分钟
- **PDF 页数**：9-11 页 A4
- **PPT 页数**：10-12 页 16:9
- **单条文字**：不超过 80 字（避免长段落）

### 每条信息的必备元素

```
├── 主文字（观点/事件）
├── 关键数据（加粗 <strong>）
└── 来源链接（可点击，hover 变红色）
```

**关键规则**：**没有来源的信息不能进报告**。

### 数据模型（`data.mjs`）

所有内容必须结构化为 ES Module export：

```javascript
export const meta = {
  title: '本期头条标题',
  subtitle: '一段话概括核心事件',
  brand: 'Semiconductor Weekly',
  vol: 'Vol.01 / No.15',
  dateRange: '2026.04.07 — 04.09',
};

export const digest = [
  { tag: 'POLICY', text: '...', source: { name: 'Bloomberg', url: '...' } },
  // 5 条
];

export const market = {
  sox: { value: '7,877', high52w: '8,498', offPeak: '-7.3%' },
  stocks: [
    { ticker, name, price, change, date, up: bool, note },
    // 4 条
  ],
};

export const equipment = [
  {
    name, ticker,
    highlight: '本周一句话要闻',
    events: [[date, text], [date, text], ...],
  },
  // 4-5 家
];

// techFrontier, chinaSection, academic, aiSmart, designTrends, policy, landscape, reading, calendar
// ...

export const designTrends = [
  {
    title: '板块条目标题',
    text: '1-3 句描述',
    sources: [
      { name: 'Cadence', url: '...' },
      { name: 'EE Times', url: '...' },
    ],
  },
  // 4-5 条
];
```

完整模型见参考文件 `data.mjs`。

---

## 4. 研究与数据采集

### 信息源优先级

1. **一手源**：公司新闻稿、投资者关系页面、财报
2. **行业协会**：SEMI、IEEE、SEMI ESH、JEITA
3. **专业媒体**：SemiEngineering、EETimes、TrendForce、Bloomberg
4. **学术**：Nature、Nature Electronics、IEEE Xplore
5. **中文源**：36Kr、芯智讯、集微网、新浪财经、SCMP

**禁止使用**：匿名博客、未署名文章、无日期的聚合页。

### 采集流程（并行 Agent）

周报采集分成 **3 个并行子 Agent**，减少主 context 消耗：

```
Agent A: 公司动态 + 市场数据
  - 核心公司财报、新品、订单
  - 股价、指数走势

Agent B: 政策地缘 + 产业格局
  - 出口管制、补贴法案
  - 并购、扩产、供应链

Agent C: 学术 + AI 与智能化
  - Nature/IEDM/VLSI 论文
  - EDA、AI 制造、新架构
```

每个子 Agent 必须返回**带 URL 和日期**的结构化摘要。

### 时间窗口

- 默认采集**最近 7 天**的新闻
- 学术/会议类可放宽到 **最近 30 天**
- 政策类追溯到**最近重大法案**（即使 >30 天）

---

## 5. 设计系统

### 5.1 颜色令牌（Design Tokens）

```css
:root {
  --black:     #141414;  /* 标题、强调文字 */
  --dark:      #1a1a1a;  /* 次级标题 */
  --body:      #333333;  /* 正文 */
  --secondary: #666666;  /* 副文字 */
  --tertiary:  #999999;  /* 元信息、时间戳 */
  --border:    #e0e0e0;  /* 边框 */
  --light:     #efefef;  /* 浅分割线 */
  --bg:        #fafaf8;  /* 内容区暖灰底 */
  --white:     #ffffff;  /* 封面区、卡片 */
  --tag-bg:    #f5f5f3;  /* 标签底色 */

  /* 功能色（极少量使用）*/
  --red:       #c0392b;  /* 编号、强调、hover */
  --green:     #16a34a;  /* 涨 */
  --down-red:  #dc2626;  /* 跌 */
}
```

**用色规则**：
- 全报告**只有编号和 hover 状态**使用红色
- 不要用品牌色主题化整个报告
- 股价涨跌是唯一可以引入彩色的地方

### 5.2 字体系统

```css
--font: 'HarmonyOS Sans', -apple-system, 'PingFang SC', sans-serif;
--mono: 'JetBrains Mono', 'Menlo', monospace;
```

- **中文优先级**：HarmonyOS Sans > PingFang SC > 系统默认
- **等宽字体用途**：数字（价格、百分比、日期）、标签、来源链接、品牌名

**字号阶层**（桌面端 rem）：

| 用途 | 字号 | 粗细 |
|---|---|---|
| Hero 标题 | 2.8rem | 900 |
| Hero 副标题 | 1.1rem | 300 |
| 板块标题 | 1.6rem | 700 |
| 公司/Item 标题 | 1.02-1.1rem | 700 |
| 正文 | 0.92rem | 400 |
| 股价数字 | 1.4rem | 500 mono |
| 标签 | 0.62-0.68rem | 500 mono |
| 时间戳 | 0.7rem | 400 mono |

**行高**：
- 标题：1.2
- 正文：1.8
- 移动端正文：1.75

### 5.3 空间系统

| 用途 | 值 |
|---|---|
| 板块间距 | 64px |
| 板块内间距 | 32px |
| 卡片内边距 | 20px |
| Hero 上下留白 | 80px / 64px |
| 内容区 max-width | 760px（桌面）|
| 左右边距（桌面）| 24px |
| 左右边距（移动）| 20px |

### 5.4 组件规范

#### 板块标题（Section Head）

```
01                      ← 编号（mono, red, 0.68rem）
本周速览                ← 中文标题（sans, black, 1.6rem, bold）
WEEKLY DIGEST           ← 英文副标题（mono, tertiary, 0.72rem, uppercase）
```

#### 速览条目（Digest Item）

```
01  [POLICY]  美国众议院推出 MATCH Act...  Bloomberg
│   │         │                             │
编号 标签tag  主文本（可含 <strong>）       来源链接
```

#### 公司块（Company Block）

```
Applied Materials                         NASDAQ: AMAT
│━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
│ Highlight: 本周最重要一句话              ← 红色左边框 + 淡红渐变底
│
Apr 8   事件 1...                       Source
Apr 22  事件 2...
```

#### 股价卡（Stock Card）

```
┌─────────────────┐
│ AMAT            │ ← ticker（tertiary, mono）
│ Applied Materials│ ← 公司名
│ $352.62         │ ← 价格（large, mono）
│ ▲ +8.0% (Apr 8) │ ← 变动（green/red）
│ GAA 新品发布提振 │ ← 备注（tertiary）
└─────────────────┘
```

#### Highlight Box（产业格局/Outlook）

```
│ POLICY & OUTLOOK             ← 标签（mono, tertiary, 0.65rem）
│ 一段概括性文字...              ← 正文
│                              ← 来源
```

左边 3px 黑色边框，背景 `--tag-bg`，圆角右上右下 6px。

### 5.5 来源链接规范（Source Links）

**唯一 token**：`.item-sources`

```css
.item-sources a,
a.item-sources {
  font-family: var(--mono);
  font-size: 0.72rem;
  color: var(--tertiary);
  text-decoration: none;
  border-bottom: 1px dotted var(--border);
  margin-right: 10px;
  transition: color 0.12s, border-color 0.12s;
}

.item-sources a:hover,
a.item-sources:hover {
  color: var(--red);
  border-bottom-color: var(--red);
}
```

**位置规则**：
- 每条信息行末或下一行
- 每条信息**至少 1 个**来源，**最多 3 个**
- 链接文字是媒体名（如 `Bloomberg`、`SemiEngineering`），不是 URL

**禁止**：蓝色浏览器默认链接样式。所有 `<a>` 必须走 design token。

---

## 6. 文件架构

```
semi-report/
├── data.mjs                    ← 唯一数据源（所有版本共用）
├── index.html                  ← 网页主页（含响应式）
├── report-YYYY-WNN.html        ← PDF 专用 HTML 模板
├── report-YYYY-WNN.pdf         ← 生成的 PDF
├── report-YYYY-WNN.pptx        ← 生成的 PPT
├── report-YYYY-WNN.docx        ← 生成的 Word
├── generate-pdf.mjs            ← PDF 生成脚本（Puppeteer）
├── generate-pptx.mjs           ← PPT 生成脚本（pptxgenjs）
├── generate-docx.mjs           ← Word 生成脚本（docx）
├── figma-generate.js           ← Figma 手动调版辅助脚本
├── .github/workflows/pages.yml ← GitHub Pages 部署
├── package.json                ← npm 依赖
└── REPORT_GUIDE.md             ← 本文档
```

### 依赖清单

```json
{
  "dependencies": {
    "puppeteer": "^23.x",
    "pptxgenjs": "^3.x",
    "docx": "^9.x"
  }
}
```

---

## 7. 网页版规范

### 7.1 结构层级

```
<nav> 顶部导航（sticky）
  ├── 品牌名
  ├── 日期
  └── PDF / PPT / Word 下载按钮
<body>
  <cover-zone> 封面区（白底）
    ├── Hero（label + h1 + subtitle + meta chips）
    └── TOC（目录网格）
  <content-zone> 正文区（暖灰底 #fafaf8）
    ├── 11 个 section
    └── site-footer
```

### 7.2 关键设计决策

- **封面区 vs 正文区**用不同背景色区分（白 vs 暖灰）
- **Sticky 导航**在顶部，带 backdrop-blur
- **目录**是网格卡片，点击跳转锚点
- **股价卡**桌面端 2×2 grid，移动端 2×2 紧凑 grid
- **公司块**左侧红色边框 + 淡红渐变作为 highlight 区

### 7.3 排版规则

- `max-width: 760px` 居中
- `line-height: 1.8` 中文舒适行距
- `scroll-behavior: smooth` 锚点跳转
- `backdrop-filter: blur(12px)` 毛玻璃导航
- 所有 hover 过渡 `0.12-0.15s ease`

### 7.4 互动

- 导航下载按钮：hover 反色
- 目录项：hover 浅灰底
- 来源链接：hover 变红 + 下划线变红
- 值得一读标题：可点击跳转原文，hover 变红

---

## 8. PDF 版规范

### 8.1 页面尺寸

- **A4 竖排**：210×297mm
- **边距**：top 24mm / bottom 20mm / left 22mm / right 22mm
- **字号基准**：15.5px（print media query 下）

### 8.2 分页策略

- **不要强制 `page-break-after: always`** — 会造成空白页
- 用 `page-break-inside: avoid` 保护关键块：
  - `.company-block`
  - `.digest-item`
  - `.market-grid`
  - `.highlight-box`
  - `.tech-item`
- 标题类用 `page-break-after: avoid` 防止孤儿标题

### 8.3 页头页脚

**必须使用 Puppeteer 的 `displayHeaderFooter`**，不要在 HTML 里做页头页脚（会漂移）：

```javascript
const headerTemplate = `
<div style="width:100%; margin:0 22mm; padding-bottom:6px;
            border-bottom:0.5px solid #1a1a1a; display:flex;
            justify-content:space-between;">
  <span style="font-size:7.5px; font-weight:600; letter-spacing:0.12em;
               text-transform:uppercase; color:#999;">Semiconductor Weekly</span>
  <span style="font-size:7.5px; font-family:'Courier New',monospace;
               color:#999;">2026.04.07 — 04.09</span>
</div>`;

const footerTemplate = `
<div style="width:100%; margin:0 22mm; padding-top:6px;
            border-top:0.5px solid #e0e0e0; display:flex;
            justify-content:space-between;">
  <span style="font-size:7px; font-family:'Courier New',monospace;
               color:#999;">Confidential</span>
  <span style="font-size:7px; font-family:'Courier New',monospace;
               color:#999;">
    <span class="pageNumber"></span> / <span class="totalPages"></span>
  </span>
</div>`;
```

### 8.4 封面

- 独立的第一页，`page-break-after: always`
- 使用 `min-height: 960px` 配合 flex `margin-top: auto` 把 footer 推到底部
- **隐藏 Puppeteer 的 header/footer 会影响所有页**，所以封面接受页头页尾也显示（视觉上已统一）

### 8.5 生成命令

```bash
node generate-pdf.mjs
```

关键参数：
```javascript
await page.pdf({
  format: 'A4',
  printBackground: true,
  displayHeaderFooter: true,
  headerTemplate, footerTemplate,
  margin: { top: '24mm', bottom: '20mm', left: '22mm', right: '22mm' },
  preferCSSPageSize: false,
});
```

---

## 9. PPT 版规范

### 9.1 尺寸与布局

- **16:9** (13.33 × 7.5 英寸)
- 使用 `pptxgenjs` 生成
- 每页一个 section（封面 + 11 个板块 = 12 页）

### 9.2 每页结构

```
┌───────────────────────────────────────┐
│ SEMICONDUCTOR WEEKLY  2026.04.07—04.09│ ← 页头（细线分割）
├───────────────────────────────────────┤
│ 01                                    │
│ 本周速览                              │ ← 板块标题
│ WEEKLY DIGEST                         │
│                                       │
│ [内容区域]                             │
│                                       │
├───────────────────────────────────────┤
│ Confidential              2 / 12      │ ← 页脚
└───────────────────────────────────────┘
```

### 9.3 字号（pptxgenjs 单位：pt）

| 用途 | 字号 |
|---|---|
| Hero 标题 | 42pt |
| 板块标题 | 22pt |
| 公司名 | 14pt |
| 正文 | 10-11pt |
| 元信息 | 7-8pt |

### 9.4 颜色

和网页版完全一致（`#141414`, `#c0392b` 等），但 pptxgenjs 使用无 `#` 前缀的 hex。

---

## 10. Word 版规范

### 10.1 页面

- **A4 竖排**
- 边距 28mm 四边
- 字体：PingFang SC（中文）+ Menlo（等宽）

### 10.2 页眉页脚

使用 `docx` 库的 `Header` / `Footer` 组件：

```javascript
headers: {
  default: new Header({
    children: [new Paragraph({
      border: { bottom: { style: BorderStyle.SINGLE, size: 1, color: '141414' } },
      tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
      children: [
        new TextRun({ text: 'SEMICONDUCTOR WEEKLY', ... }),
        new TextRun({ text: '\t2026.04.07 — 04.09', ... }),
      ],
    })],
  }),
},
```

### 10.3 结构化样式

- 用 `PageBreak` 控制板块分页
- 用 `Table` 实现股价网格、日历
- 用 `Paragraph` 的 `border.left` 实现 highlight box 的红条
- 用 `ShadingType.CLEAR`（不要用 `SOLID`）

### 10.4 字号（docx 单位：half-points）

- 1pt = 2 half-points
- Hero 标题：56 (= 28pt)
- 板块标题：36 (= 18pt)
- 正文：21 (= 10.5pt)
- 元信息：13-14

---

## 11. 移动端适配规范

### 11.1 断点

```css
@media (max-width: 720px) { ... }
```

### 11.2 核心差异（相对桌面）

| 元素 | 桌面 | 移动 |
|---|---|---|
| **顶部导航** | 品牌 + 日期 + 3 个下载按钮 | 品牌 + 汉堡菜单 |
| **下载入口** | 顶部三按钮 | 汉堡抽屉（含格式说明） |
| **Hero 标题** | 2.8rem | 1.85rem |
| **TOC** | 3 列网格 | 横向滑动 chips |
| **股价卡** | 2×2 grid | 2×2 紧凑 grid（小字号）|
| **公司块 header** | 名称 + ticker 同行 | 名称和 ticker 换行 |
| **事件行** | 日期 + 文字同行 | 日期+文字同行（紧凑）|
| **关键日程** | 日期 \| 事件 双列 | **保持同样双列**（不变）|
| **正文左右边距** | 24px | 20px |
| **底部栏** | 无 | **无**（顶部菜单已足够）|

### 11.3 汉堡菜单抽屉

```html
<button class="mobile-menu-btn" onclick="...classList.toggle('open')">
  <svg>三横线</svg>
</button>

<div class="mobile-menu" id="mobileMenu">
  <div class="mobile-menu-label">下载报告</div>
  <div class="mobile-menu-downloads">
    <a href="...pdf">PDF <span>竖排完整版</span></a>
    <a href="...pptx">PPT <span>横排幻灯片</span></a>
    <a href="...docx">Word <span>可编辑版</span></a>
  </div>
</div>
```

抽屉样式：
- `position: fixed; top: 52px`
- `transform: translateY(-100%)`，打开时 `translateY(0)`
- `transition: transform 0.25s ease`
- 点击下载项自动关闭抽屉

### 11.4 TOC 横向 chips

```css
.toc-grid {
  display: flex;
  flex-wrap: nowrap;
  gap: 8px;
  padding: 0 20px 12px;
  overflow-x: auto;
  scrollbar-width: none;  /* Firefox */
}
.toc-grid::-webkit-scrollbar { display: none; }  /* Webkit */

.toc-item {
  flex-shrink: 0;
  flex-direction: column;
  min-width: 110px;
  background: var(--white);
  border: 1px solid var(--light);
  border-radius: 10px;
  padding: 10px 14px;
}
```

### 11.5 保持原则

**移动端不是桌面端的缩放版**，是重新设计的排版，但共享同一设计语言（颜色、字体、组件风格）。

---

## 12. 生成流水线

### 12.1 新期报告生成流程

```
Step 1: 调研（并行 3 个 Agent）
    ↓
Step 2: 整理数据到 data.mjs
    ↓
Step 3: 生成四个版本
    ├── 更新 index.html（内容区填充）
    ├── 更新 report-YYYY-WNN.html（PDF 源）
    ├── node generate-pdf.mjs
    ├── node generate-pptx.mjs
    └── node generate-docx.mjs
    ↓
Step 4: 视觉验证
    ├── 桌面浏览器预览 index.html
    ├── 移动视口预览（DevTools 375×812）
    └── PDF 逐页检查
    ↓
Step 5: 推送到 GitHub
    └── git commit + push → Actions 自动部署 Pages
```

### 12.2 生成脚本模板

**PDF** (`generate-pdf.mjs`):
```javascript
import puppeteer from 'puppeteer';
// ... 见参考实现
```

**PPT** (`generate-pptx.mjs`):
```javascript
import PptxGenJS from 'pptxgenjs';
import { meta, digest, market, ... } from './data.mjs';
// 12 slides, 复用 data.mjs
```

**Word** (`generate-docx.mjs`):
```javascript
import { Document, Packer, ... } from 'docx';
import { meta, digest, ... } from './data.mjs';
```

### 12.3 验证工具

用 Claude Preview MCP 或 Puppeteer screenshot 验证：
- 桌面视口：`1200×800`
- 移动视口：`375×812`
- PDF：`pdftoppm -r 150` 转成 PNG 逐页看

---

## 13. 质量检查清单

发布前必须验证：

### 内容
- [ ] 11 个板块齐全，顺序正确
- [ ] 每条信息都有来源链接（最少 1 个）
- [ ] 加粗的关键数据不超过总字数 15%
- [ ] 标签（POLICY / AMAT / CHINA 等）使用一致
- [ ] 日期格式统一（`Apr 8` / `2026.04.07` 等）

### 设计
- [ ] 没有蓝色浏览器默认链接
- [ ] 所有 hover 状态使用红色（`--red`）
- [ ] 来源链接统一用 `.item-sources` token
- [ ] 股价涨跌颜色正确（涨绿 / 跌红）
- [ ] 封面区白底、内容区暖灰底

### 响应式
- [ ] 桌面 1200px 视口无横向滚动
- [ ] 移动 375px 视口：
  - [ ] 汉堡菜单可点击
  - [ ] 抽屉打开/关闭正常
  - [ ] TOC 横向滑动
  - [ ] 股价卡 2×2
  - [ ] 无底部固定栏
- [ ] 关键日程在两端都是双列

### PDF
- [ ] 页头页脚在每页固定位置
- [ ] 没有空白尾页
- [ ] 没有孤儿标题
- [ ] 封面 footer 在页面底部
- [ ] 左右边距对称

### PPT / Word
- [ ] 打开文件无报错
- [ ] 字体正确渲染（中文不乱码）
- [ ] 页码准确

---

## 14. 发布与部署

### 14.1 GitHub Pages 部署

仓库必须包含 `.github/workflows/pages.yml`：

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: ["main"]
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with:
          path: '.'
      - id: deployment
        uses: actions/deploy-pages@v4
```

首次启用需要 GitHub Token 含 `workflow` scope：

```bash
gh auth refresh -h github.com -s workflow
```

### 14.2 发布步骤

```bash
# 1. 生成所有版本
node generate-pdf.mjs
node generate-pptx.mjs
node generate-docx.mjs

# 2. 提交
git add .
git commit -m "feat: Weekly Report YYYY-WNN"
git push

# 3. 自动部署到 https://{username}.github.io/semi-report/
```

### 14.3 邮件发送（可选）

使用 Gmail SMTP 自动发送：
- 正文：本周速览的 5 条（HTML 邮件）
- 附件：PDF + PPTX
- 链接：网页版 URL

---

## 附录 A：常见陷阱

1. **蓝色链接**：任何 `<a>` 没走 `--tertiary` token，浏览器会用默认蓝色。始终用 `.item-sources` 或自定义 class。

2. **PDF 空白页**：`page-break-after: always` 在 `.page` 这种容器上会导致空白尾页。改用 `page-break-inside: avoid` 在关键块上。

3. **字体加载慢**：HarmonyOS Sans 通过 CDN 加载，PDF 生成时必须 `await page.evaluateHandle('document.fonts.ready')` 再 `pdf()`。

4. **中文字体回退**：始终提供完整 fallback `'HarmonyOS Sans', -apple-system, 'PingFang SC', sans-serif`。

5. **Pages 404**：仓库 Pages 设置需要 `build_type: workflow` 而非 `legacy`。

6. **移动端底部栏冗余**：如果顶部已有汉堡菜单，不要再加底部固定下载栏，会打断阅读。

7. **关键日程不要堆叠**：移动端也保持日期 | 事件的双列结构，更可读。

---

## 附录 B：参考实现

首期实现位于本仓库：

- https://xianliii.github.io/semi-report/ — 线上版本
- `index.html` — 网页主页参考
- `data.mjs` — 数据模型参考
- `generate-*.mjs` — 生成脚本参考

---

**版本**: 1.0
**生效日期**: 2026-04-10
**维护者**: Semiconductor Weekly Team
