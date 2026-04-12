// ============================================================
// Semiconductor Weekly — Figma editable canvas generator
// ============================================================
// Usage:
//   1. Open Figma desktop
//   2. Menu > Plugins > Development > Open Console
//   3. Paste this whole file and press Enter
//   4. 9 A4 pages will appear horizontally on the canvas
//
// The entire PDF layout is reproduced as editable Figma nodes,
// using auto-layout frames so you can reflow / adjust easily.
// Every text is a proper TextNode (not grouped), every card is
// an auto-layout frame, every color matches the design system.
//
// After you've manually tweaked the layout, tell me which
// gaps / sizes / alignments to change in the PDF generator.
// ============================================================

(async () => {

// ============================================================
// DESIGN TOKENS
// ============================================================

const MM = 2.83465;  // mm → pt

const C = {
  black:     { r: 0.078, g: 0.078, b: 0.078 },  // #141414
  dark:      { r: 0.102, g: 0.102, b: 0.102 },  // #1a1a1a
  body:      { r: 0.2,   g: 0.2,   b: 0.2   },  // #333
  secondary: { r: 0.4,   g: 0.4,   b: 0.4   },  // #666
  tertiary:  { r: 0.6,   g: 0.6,   b: 0.6   },  // #999
  border:    { r: 0.878, g: 0.878, b: 0.878 },  // #e0e0e0
  light:     { r: 0.937, g: 0.937, b: 0.937 },  // #efefef
  tagBg:     { r: 0.961, g: 0.961, b: 0.953 },  // #f5f5f3
  hlBg:      { r: 0.992, g: 0.973, b: 0.969 },  // #fdf8f7
  white:     { r: 1,     g: 1,     b: 1     },
  red:       { r: 0.753, g: 0.224, b: 0.169 },  // #c0392b
  green:     { r: 0.086, g: 0.639, b: 0.290 },  // #16a34a
  downRed:   { r: 0.863, g: 0.149, b: 0.149 },  // #dc2626
  usTagBg:   { r: 0.937, g: 0.965, b: 1     },  // #eff6ff
  usTagFg:   { r: 0.118, g: 0.251, b: 0.686 },  // #1e40af
};

// A4 at 72 DPI: 595 × 842 pt
const PAGE_W = 210 * MM;  // ≈ 595.28
const PAGE_H = 297 * MM;  // ≈ 841.89
const MARGIN = 22 * MM;   // ≈ 62.36
const GUTTER_X = 30;      // gap between pages on canvas

// Typography (matches Typst PDF generator)
const FONT_CN = { family: "PingFang SC", style: "Regular" };
const FONT_CN_MEDIUM = { family: "PingFang SC", style: "Medium" };
const FONT_CN_BOLD = { family: "PingFang SC", style: "Semibold" };
const FONT_MONO = { family: "Menlo", style: "Regular" };
const FONT_SANS = { family: "Helvetica", style: "Regular" };
const FONT_SANS_BOLD = { family: "Helvetica", style: "Bold" };

// Preload fonts once
async function preloadFonts() {
  const fonts = [
    FONT_CN, FONT_CN_MEDIUM, FONT_CN_BOLD,
    FONT_MONO, FONT_SANS, FONT_SANS_BOLD,
  ];
  for (const f of fonts) {
    try {
      await figma.loadFontAsync(f);
    } catch (e) {
      console.warn(`Failed to load font ${f.family} ${f.style}`, e);
    }
  }
}

// ============================================================
// DATA (inlined from data.mjs)
// ============================================================

const meta = {
  title: "MATCH Act 冲击波，设备股剧烈震荡",
  subtitle: "美国国会推出新芯片设备出口管制法案，ASML 单日跌近 5%；AMAT 发布两款 GAA 2nm 沉积系统，股价反弹 8%；中国设备厂商在 SEMICON China 密集发布新品。",
  vol: "Vol.01 / No.15",
  dateRange: "2026.04.07 — 04.09",
};

const digest = [
  { tag: "POLICY",  text: "美国众议院推出 MATCH Act，拟封堵 ASML DUV 对华出口通道，ASML 单日跌 4.7%", source: "Bloomberg" },
  { tag: "AMAT",    text: "Applied Materials 发布两款面向 GAA 2nm 的沉积系统，股价当日涨 8%", source: "StockTitan" },
  { tag: "SEMI",    text: "SEMI 发布数据：2025 全球半导体设备销售 $1,351 亿，预计 2027 年达 $1,560 亿创新高", source: "SEMI" },
  { tag: "CHINA",   text: "北方华创、中微公司在 SEMICON China 2026 密集发布新品，北方华创 2026 年订单目标 600 亿", source: "36Kr" },
  { tag: "HIGH-NA", text: "Imec 接收 ASML EXE:5200 High-NA EUV 系统，预计 Q4 完成验证", source: "Imec" },
];

const market = {
  sox: { value: "7,877", high52w: "8,498", offPeak: "-7.3%" },
  stocks: [
    { ticker: "AMAT", name: "Applied Materials", price: "$352.62", change: "+8.0%", date: "Apr 8", up: true,  note: "GAA 新品发布提振" },
    { ticker: "LRCX", name: "Lam Research",      price: "$235.00", change: "+9.5%", date: "Apr 8", up: true,  note: "YTD +37.6%，连续四季超预期" },
    { ticker: "ASML", name: "ASML Holding",      price: "$1,317",  change: "-4.7%", date: "Apr 7", up: false, note: "MATCH Act 冲击，中国营收占 29%" },
    { ticker: "KLAC", name: "KLA Corporation",   price: "$1,661",  change: "+7.4%", date: "Apr 8", up: true,  note: "YTD +30.3%，$70 亿回购计划" },
  ],
};

const equipment = [
  {
    name: "Applied Materials", ticker: "NASDAQ: AMAT",
    highlight: "4 月 8 日发布 Precision Selective Nitride PECVD 和 Trillium ALD 两款沉积系统，面向 GAA 2nm 及以下节点的原子级精度制造。",
    events: [
      ["Apr 8", "新品发布后股价当日大涨约 8%，市场反应积极", "SeekingAlpha"],
      ["Q1",    "Q1 FY2026 EPS $2.38（超预期 $0.17），营收 $70.1 亿", "TrendForce"],
      ["展望",  "管理层预计 2026 年半导体行业增长 20%+，DRAM 领涨", null],
    ],
  },
  {
    name: "Lam Research", ticker: "NASDAQ: LRCX",
    highlight: "连续四个季度超预期，Q2 FY2026 营收 $53.4 亿（同比 +22%），Q3 指引 $57 亿显示持续加速。",
    events: [
      ["Apr 7",  "Morgan Stanley 上调目标价至 $260", "Yahoo Finance"],
      ["Apr 22", "即将发布 Q3 财报，关注 GAA 节奏及中国收入占比", null],
    ],
  },
  {
    name: "ASML Holding", ticker: "EURONEXT: ASML",
    highlight: "MATCH Act 冲击下股价单日跌 4.7%，但随后因美伊停火反弹 6.35%。High-NA EUV 进入商用部署阶段。",
    events: [
      ["订单",    "SK Hynix 承诺 $80 亿采购 ~30 台 EUV；Samsung 计划 $40 亿采购 ~20 台", "24/7 Wall St"],
      ["High-NA", "首批商用 EXE:5200B 已交付 Intel，2026 预计出货 5-10 台", "Tom's Hardware"],
      ["Apr 15",  "Q1 财报发布 | 指引：2026 净销售额 340-390 亿欧元", null],
    ],
  },
  {
    name: "Tokyo Electron / KLA", ticker: "TSE: 8035 / NASDAQ: KLAC",
    highlight: null,
    events: [
      ["TEL", "先进芯片设备占比提升至 40%，资本支出增 48% 至 2400 亿日元创新高", "TrendForce"],
      ["KLA", "宣布 $70 亿回购计划，连续第 17 年提高股息", "StockStory"],
    ],
  },
];

const techFrontier = [
  { title: "GAA 与背面供电进入量产倒计时", text: "TSMC N2P（2nm + 背面供电）计划 2026 下半年投产；A16（1.6nm + Super Power Rail）紧随其后。背面供电可降低电压降和供电噪声，但与 GAA 集成带来应力管理挑战。", sources: ["SemiEngineering", "Lam Research"] },
  { title: "High-NA EUV 从研发走向量产", text: "Imec 接收 EXE:5200 系统（3 月 18 日），Q4 完成验证。Intel 安装商用 EXE:5200B 用于 14A 节点。2026 年预计交付 5-10 台，2028 年增至 20+ 台。", sources: ["Imec", "IBM Research", "Tom's Hardware"] },
  { title: "SEMI 全球设备支出展望", text: "300mm 设备支出预计 2026 年增长 18% 至 $1,330 亿，2027 年增长 14% 至 $1,510 亿。AI、先进逻辑、存储及先进封装为主要驱动力。", sources: ["SEMI"] },
];

const chinaCompanies = [
  {
    name: "北方华创", ticker: "002371.SZ",
    highlight: "SEMICON China 2026 发布三款重磅设备，2026 年订单目标 600 亿元，有望跻身全球设备商前五。",
    events: [
      ["新品", "12 英寸 NMC612H ICP 刻蚀、Qomola HPD30 混合键合、Ausip T830 TSV 电镀", "新浪财经"],
      ["验证", "刻蚀设备已在 SMIC 7nm 产线测试", "SCMP"],
    ],
  },
  { name: "中微公司", ticker: "688012.SH", highlight: null, events: [["新品", "Primo Angnova ICP 刻蚀、Primo Domingo 高选择性刻蚀、Smart RF Match、Preciomo Udx Micro LED MOCVD", "快科技"]] },
  { name: "新凯来",   ticker: "深圳国资", highlight: null, events: [["新品", "SEMICON China 发布 EPI、ALD、PVD、ETCH、CVD 五款设备，对标 5nm", "东方财富"]] },
  { name: "盛合晶微半导体", ticker: "IPO", highlight: null, events: [["Apr 9", "科创板 IPO，发行价 19.68 元/股", null]] },
];

const chinaOutlook = {
  text: "中国要求新建产能使用不低于 50% 国产设备，目标 2030 年半导体自给率达 80%（现约 33%）。SMIC 发布 2026 行动计划聚焦供应链本土化。2025 年中国 WFE 预计同比 -13%，2026 年回升 +5%。",
  sources: ["Electronics Weekly", "Astute Group"],
};

const academic = [
  { title: "Imec 120 层 Si/SiGe 外延堆叠突破 3D DRAM 瓶颈", text: "Imec 联合根特大学在 300mm 晶圆上成功堆叠 120 层交替 Si/SiGe 双层（共 241 子层），发表于 Journal of Applied Physics。", sources: ["Tom's Hardware", "SemiEngineering"] },
  { title: "Nature Electronics: 碳纳米管晶体管突破 1 THz", text: "基于对齐碳纳米管薄膜的 MOSFET 实现截止频率超 1 THz，栅极长度 80nm，载流子迁移率超 3,000 cm²/V·s。", sources: ["Nature Electronics"] },
  { title: "Imec + Diraq: 工厂制造硅量子比特达 99%+ 保真度", text: "在标准半导体产线上制造的硅量子比特一致性超过 99% 精度，发表于 Nature。", sources: ["Nature"] },
  { title: "CFET（互补 FET）路线图加速", text: "Imec 推进 CFET 单片集成与顺序集成方案。全芯片评估显示 CFET 相比 Nanosheet FET 可实现面积缩减 ~55%、功耗降低 ~29%。", sources: ["Imec", "SemiEngineering"] },
];

const aiSmart = [
  { title: "Intel 将 AI 嵌入晶圆厂核心流程", text: "AI 缺陷检测精度已超人工检测员，NVIDIA NV-DINOv2 视觉模型达 98.5% die 级缺陷分类精度。先进逻辑晶圆厂每 1% 良率提升 ≈ $1.5 亿利润。", sources: ["EE Times", "NVIDIA"] },
  { title: "EDA 进入 Agent 时代", text: "Cadence 发布 ChipStack AI Agent（10x 生产力），Synopsys 推出 AgentEngineer。NVIDIA 投资 $20 亿入股 Synopsys。新锐 Cognichip 融资 $6,000 万。", sources: ["The Register", "TechCrunch"] },
  { title: "AI 芯片新品密集发布", text: "Samsung 出货首批商用 HBM4（11.7 Gbps）；Microsoft Maia 200 推理加速器（TSMC 3nm）；韩国 Rebellions 完成 $4 亿 Pre-IPO；华为 950PR 推理芯片获字节、阿里大单。", sources: ["Samsung", "Microsoft", "TechCrunch"] },
  { title: "RISC-V 进入量产汽车", text: "Bosch、Infineon、Nordic、NXP、Qualcomm 五家成立德国合资公司聚焦车规 RISC-V。零跑 LingXin01 SoC 用于 ADAS；长城紫荆 M100 MCU 已搭载新车型。", sources: ["EE Times", "Yole Group"] },
];

const aiOutro = {
  label: "Capital Flow",
  text: "四大超算巨头 2026 年 AI 基础设施资本支出计划达 $6,500 亿，同比增 71%。Intel 加入 Musk 的 Terafab 项目（$250 亿），贡献 18A 工艺。",
  sources: ["Deloitte", "TNW"],
};

const designTrends = [
  { title: "Cadence ChipStack AI Super Agent：EDA 从菜单交互走向意图对话", text: "Cadence 发布 ChipStack AI Super Agent（2 月 10 日），让工程师用自然语言描述意图，由多智能体自动生成 RTL、测试平台和验证方案。早期客户 NVIDIA、Qualcomm、Altera、Tenstorrent 反馈生产力提升 10x。这是 EDA 工具 UX 从\"工具操作\"到\"意图对话\"的历史性转向。", sources: ["Cadence", "EE Times"] },
  { title: "NVIDIA Vera Rubin：从芯片到机架的\"极致协同设计\"语言", text: "NVIDIA 在 CES 和 GTC 2026 发布 Vera Rubin 平台——6 颗芯片协同设计为一个统一的 AI 超级计算机机架，不再是独立芯片的简单组合。这标志着 AI 硬件发布的新视觉语言：整机架即产品。", sources: ["NVIDIA", "NVIDIA Dev Blog"] },
  { title: "Siemens Digital Twin Composer：HMI 从仪表盘走向可导航虚拟孪生", text: "Siemens 在 CES 2026 发布 Digital Twin Composer，基于 NVIDIA Omniverse 将 2D/3D 数字孪生数据与实时遥测统一到一个场景中。把晶圆厂操作员 HMI 从平面仪表盘重塑为可导航的虚拟孪生空间。", sources: ["Siemens", "Metrology News"] },
  { title: "Intel 18A 首秀：Core Ultra Series 3 的工业设计宣言", text: "Intel 在 CES 2026 发布首款 Intel 18A 量产消费平台 Core Ultra Series 3，把\"美国制造\"作为工业设计语言的核心叙事。", sources: ["Intel"] },
];

const designOutro = {
  label: "UX Shift",
  text: "NVIDIA 宣布与 TSMC、SK 海力士、三星、联发科等工业软件巨头合作，将 Agentic AI 嵌入设计、工程和制造软件。半导体制造 UX 迎来新的交互底层。",
  sources: ["NVIDIA IR"],
};

const policy = [
  { tag: "U.S. Congress", title: "MATCH Act：封堵 DUV 对华出口", text: "4 月 2 日众议院推出 MATCH Act，目标收紧 ASML DUV 光刻机对华出口。JPMorgan 估计若实施，ASML EPS 可能下降 10%。", sources: ["Bloomberg", "SeekingAlpha"] },
  { tag: "U.S. Tariff",   title: "Section 232 半导体关税生效", text: "1 月 15 日起对特定先进芯片征收 25% 关税，但豁免数据中心、研发等场景。7 月 1 日将评估是否扩大范围。", sources: ["White & Case"] },
  { tag: "CHIPS Act",     title: "CHIPS Act 税收优惠面临到期", text: "TSMC 宣布追加 $1,000 亿美国投资。但 Section 48D 先进制造投资税收抵免将于 2026 年到期。", sources: ["Conference Board", "Manufacturing Dive"] },
];

const landscape = {
  text: "TSMC 亚利桑那规模扩大至最多 12 座晶圆厂 + 4 座先进封装厂；台湾同步推进 10 座新厂。全球 2025 年新开工 18 个晶圆厂项目（3 座 200mm + 15 座 300mm），美洲和日本各 4 个领跑。",
  sources: ["TrendForce", "SEMI"],
};

const reading = [
  { title: "SEMI: Global 300mm Fab Equipment Spending to Reach $151B by 2027", source: "SEMI.org · Apr 8, 2026", desc: "SEMI 最新预测报告，详细拆解各地区、各环节设备投资趋势。" },
  { title: "Backside Power Delivery Nears Production", source: "SemiEngineering · Mar 2026", desc: "深度解析背面供电技术的量产挑战，涵盖 TSMC、Intel、Samsung 的不同技术路线。" },
  { title: "THz Carbon Nanotube Transistors — Nature Electronics", source: "Nature Electronics · 2026", desc: "碳纳米管 MOSFET 截止频率突破 1 THz，后硅时代高频器件里程碑。" },
];

const calendar = [
  { date: "Apr 15", event: "ASML Q1 2026 财报发布" },
  { date: "Apr 22", event: "Lam Research Q3 FY2026 财报发布" },
  { date: "Apr 22", event: "ASML 年度股东大会" },
  { date: "Apr 24", event: "ASML 每股 2.70 欧元现金股息" },
  { date: "Apr 29", event: "KLA Q3 FY2026 财报发布" },
  { date: "Apr 30", event: "Tokyo Electron 全年财报发布" },
  { date: "Jun 14", event: "VLSI Symposium 2026 檀香山" },
];

// ============================================================
// PRIMITIVES
// ============================================================

function solid(color) {
  return [{ type: "SOLID", color }];
}

function text(content, opts = {}) {
  const {
    size = 10,
    color = C.body,
    font = FONT_CN,
    letterSpacing = 0,
    lineHeightPct = null,  // e.g. 180 for 1.8
    wrap = false,          // true → textAutoResize = HEIGHT (text wraps)
  } = opts;

  const node = figma.createText();
  node.fontName = font;
  node.fontSize = size;
  node.characters = content || "";
  node.fills = solid(color);
  if (letterSpacing) {
    node.letterSpacing = { unit: "PIXELS", value: letterSpacing };
  }
  if (lineHeightPct) {
    node.lineHeight = { unit: "PERCENT", value: lineHeightPct };
  }
  if (wrap) {
    // IMPORTANT: must be set AFTER characters are assigned.
    // In WIDTH_AND_HEIGHT mode the text collapses inside auto-layout
    // with layoutGrow/STRETCH, producing one-character-per-line output.
    node.textAutoResize = "HEIGHT";
    // Seed with a reasonable width so initial render is sensible;
    // layoutAlign STRETCH on the parent will override this.
    node.resize(300, node.height);
  }
  return node;
}

// Create a single wrapping TextNode with source appended as plain text.
// No mixed fonts, no nested frames — just one TextNode per slot.
// Source is appended after body with a separator.
function bodyText(body, source, opts = {}) {
  const {
    size = 10,
    color = C.dark,
    bodyFont = FONT_CN_MEDIUM,
    lineHeightPct = 175,
  } = opts;

  const content = source ? `${body}  ${source}` : body;
  return text(content, { size, color, font: bodyFont, lineHeightPct, wrap: true });
}

function autoFrame(name, direction = "VERTICAL") {
  const f = figma.createFrame();
  f.name = name;
  f.layoutMode = direction;
  f.primaryAxisSizingMode = "AUTO";
  f.counterAxisSizingMode = "AUTO";
  f.fills = [];
  f.clipsContent = false;
  return f;
}

function hRule(width, color = C.light, thickness = 0.5) {
  const line = figma.createRectangle();
  line.name = "rule";
  line.resize(width, thickness);
  line.fills = solid(color);
  return line;
}

function pillBox(label, bg = C.tagBg, fg = C.secondary) {
  const f = autoFrame("tag", "HORIZONTAL");
  f.paddingLeft = 4;
  f.paddingRight = 4;
  f.paddingTop = 2;
  f.paddingBottom = 2;
  f.cornerRadius = 2;
  f.fills = solid(bg);
  f.appendChild(text(label, { size: 6.5, color: fg, font: FONT_MONO }));
  return f;
}

function srcLink(name) {
  return text(name, { size: 6.5, color: C.tertiary, font: FONT_MONO });
}

// ============================================================
// SECTION HEAD (number / CN title / EN subtitle)
// ============================================================

function sectionHead(num, titleCn, titleEn) {
  const f = autoFrame("section-head", "VERTICAL");
  f.itemSpacing = 4;
  f.paddingBottom = 18;
  f.layoutAlign = "STRETCH";

  f.appendChild(text(num, { size: 7.5, color: C.red, font: FONT_MONO }));
  f.appendChild(text(titleCn, { size: 19, color: C.black, font: FONT_CN_BOLD }));
  f.appendChild(text(titleEn.toUpperCase(), { size: 7, color: C.tertiary, font: FONT_MONO, letterSpacing: 0.5 }));

  return f;
}

function sectionSeparator() {
  const spacer = figma.createFrame();
  spacer.name = "section-separator";
  spacer.resize(10, 14 * MM);
  spacer.fills = [];
  return spacer;
}

// ============================================================
// COMPONENT BUILDERS
// ============================================================

function buildDigestItem(num, tag, txt, source) {
  const row = autoFrame("digest-item", "HORIZONTAL");
  row.itemSpacing = 10;
  row.counterAxisAlignItems = "MIN";  // top-align so wrapped text flows naturally
  row.paddingTop = 10;
  row.paddingBottom = 10;
  row.layoutAlign = "STRETCH";

  // number (fixed width)
  const numNode = text(num, { size: 7.5, color: C.tertiary, font: FONT_MONO });
  row.appendChild(numNode);

  // tag pill (fixed width)
  const tagNode = pillBox(tag);
  row.appendChild(tagNode);

  // body column — takes remaining space and wraps
  const bodyCol = autoFrame("body-col", "VERTICAL");
  bodyCol.itemSpacing = 0;
  bodyCol.layoutGrow = 1;
  bodyCol.layoutAlign = "STRETCH";

  const bNode = bodyText(txt, source, {
    size: 10,
    color: C.dark,
    bodyFont: FONT_CN_MEDIUM,
    lineHeightPct: 175,
  });
  bNode.layoutAlign = "STRETCH";
  bodyCol.appendChild(bNode);

  row.appendChild(bodyCol);
  return row;
}

function buildDigest() {
  const wrap = autoFrame("01 digest", "VERTICAL");
  wrap.itemSpacing = 0;
  wrap.layoutAlign = "STRETCH";
  wrap.appendChild(sectionHead("01", "本周速览", "Weekly Digest"));

  const list = autoFrame("digest-list", "VERTICAL");
  list.itemSpacing = 0;
  list.layoutAlign = "STRETCH";

  for (let i = 0; i < digest.length; i++) {
    const d = digest[i];
    const item = buildDigestItem(String(i + 1).padStart(2, "0"), d.tag, d.text, d.source);
    list.appendChild(item);
    if (i < digest.length - 1) {
      const sep = hRule(200, C.light);
      sep.layoutAlign = "STRETCH";
      list.appendChild(sep);
    }
  }

  wrap.appendChild(list);
  return wrap;
}

function buildStockCard(s) {
  const f = autoFrame(`stock ${s.ticker}`, "VERTICAL");
  f.itemSpacing = 4;
  f.paddingLeft = 14;
  f.paddingRight = 14;
  f.paddingTop = 12;
  f.paddingBottom = 12;
  f.strokes = solid(C.border);
  f.strokeWeight = 0.3;
  f.fills = solid(C.white);
  f.layoutAlign = "STRETCH";
  f.layoutGrow = 1;

  f.appendChild(text(s.ticker, { size: 6.5, color: C.tertiary, font: FONT_MONO }));
  f.appendChild(text(s.name, { size: 8, color: C.dark, font: FONT_CN_MEDIUM }));
  f.appendChild(text(s.price, { size: 16, color: C.black, font: FONT_MONO }));
  f.appendChild(text(`${s.up ? "▲" : "▼"} ${s.change} (${s.date})`, { size: 8, color: s.up ? C.green : C.downRed, font: FONT_MONO }));

  // Note may be long — enable wrapping
  const noteNode = text(s.note, { size: 7, color: C.tertiary, font: FONT_CN, lineHeightPct: 150, wrap: true });
  noteNode.layoutAlign = "STRETCH";
  f.appendChild(noteNode);

  return f;
}

function buildMarket() {
  const wrap = autoFrame("02 market", "VERTICAL");
  wrap.itemSpacing = 10;
  wrap.layoutAlign = "STRETCH";
  wrap.appendChild(sectionHead("02", "市场脉搏", "Market Pulse"));

  // SOX bar
  const sox = autoFrame("sox-bar", "HORIZONTAL");
  sox.itemSpacing = 10;
  sox.paddingLeft = 14;
  sox.paddingRight = 14;
  sox.paddingTop = 10;
  sox.paddingBottom = 10;
  sox.fills = solid(C.tagBg);
  sox.primaryAxisAlignItems = "SPACE_BETWEEN";
  sox.counterAxisAlignItems = "CENTER";
  sox.layoutAlign = "STRETCH";

  const accent = figma.createRectangle();
  accent.resize(2, 30);
  accent.fills = solid(C.black);
  sox.appendChild(accent);

  sox.appendChild(text("SOX 费城半导体指数", { size: 9, color: C.secondary, font: FONT_CN }));

  const right = autoFrame("sox-right", "VERTICAL");
  right.itemSpacing = 1;
  right.primaryAxisAlignItems = "MAX";
  right.counterAxisAlignItems = "MAX";
  right.appendChild(text(market.sox.value, { size: 15, color: C.black, font: FONT_MONO }));
  right.appendChild(text(`52W High: ${market.sox.high52w} · ${market.sox.offPeak} off peak`, { size: 6.5, color: C.tertiary, font: FONT_MONO }));
  sox.appendChild(right);

  wrap.appendChild(sox);

  // 2x2 stock grid
  const row1 = autoFrame("stock-row1", "HORIZONTAL");
  row1.itemSpacing = 8;
  row1.layoutAlign = "STRETCH";
  row1.appendChild(buildStockCard(market.stocks[0]));
  row1.appendChild(buildStockCard(market.stocks[1]));

  const row2 = autoFrame("stock-row2", "HORIZONTAL");
  row2.itemSpacing = 8;
  row2.layoutAlign = "STRETCH";
  row2.appendChild(buildStockCard(market.stocks[2]));
  row2.appendChild(buildStockCard(market.stocks[3]));

  wrap.appendChild(row1);
  wrap.appendChild(row2);

  return wrap;
}

function buildCompanyBlock(co) {
  const wrap = autoFrame(co.name, "VERTICAL");
  wrap.itemSpacing = 6;
  wrap.paddingBottom = 10;
  wrap.layoutAlign = "STRETCH";

  // header (name | ticker)
  const head = autoFrame("co-head", "HORIZONTAL");
  head.primaryAxisAlignItems = "SPACE_BETWEEN";
  head.counterAxisAlignItems = "CENTER";
  head.layoutAlign = "STRETCH";
  head.appendChild(text(co.name, { size: 11, color: C.black, font: FONT_CN_BOLD }));
  head.appendChild(text(co.ticker, { size: 6.5, color: C.tertiary, font: FONT_MONO }));
  wrap.appendChild(head);

  // highlight
  if (co.highlight) {
    const hl = autoFrame("hl", "HORIZONTAL");
    hl.itemSpacing = 10;
    hl.paddingLeft = 10;
    hl.paddingRight = 12;
    hl.paddingTop = 8;
    hl.paddingBottom = 8;
    hl.fills = solid(C.hlBg);
    hl.layoutAlign = "STRETCH";
    hl.counterAxisAlignItems = "MIN";

    const bar = figma.createRectangle();
    bar.resize(2, 30);
    bar.fills = solid(C.red);
    hl.appendChild(bar);

    const hlText = text(co.highlight, {
      size: 9, color: C.dark, font: FONT_CN_MEDIUM,
      lineHeightPct: 175, wrap: true,
    });
    hlText.layoutAlign = "STRETCH";
    hlText.layoutGrow = 1;
    hl.appendChild(hlText);

    wrap.appendChild(hl);
  }

  // events
  for (const [date, body, source] of co.events) {
    const row = autoFrame("event", "HORIZONTAL");
    row.itemSpacing = 10;
    row.paddingTop = 4;
    row.paddingBottom = 4;
    row.layoutAlign = "STRETCH";
    row.counterAxisAlignItems = "MIN";  // top-align for wrapped text

    const dateNode = text(date, { size: 6.5, color: C.tertiary, font: FONT_MONO });
    dateNode.resize(38, 14);
    row.appendChild(dateNode);

    // Single TextNode with source appended as plain text
    const bNode = bodyText(body, source, {
      size: 9,
      color: C.body,
      bodyFont: FONT_CN,
      lineHeightPct: 175,
    });
    bNode.layoutAlign = "STRETCH";
    bNode.layoutGrow = 1;
    row.appendChild(bNode);

    wrap.appendChild(row);
  }

  // bottom divider
  const sep = hRule(200, C.light);
  sep.layoutAlign = "STRETCH";
  wrap.appendChild(sep);

  return wrap;
}

function buildEquipment() {
  const wrap = autoFrame("03 equipment", "VERTICAL");
  wrap.itemSpacing = 10;
  wrap.layoutAlign = "STRETCH";
  wrap.appendChild(sectionHead("03", "设备巨头动态", "Equipment Giants"));
  for (const co of equipment) {
    wrap.appendChild(buildCompanyBlock(co));
  }
  return wrap;
}

function buildChina() {
  const wrap = autoFrame("04 china", "VERTICAL");
  wrap.itemSpacing = 10;
  wrap.layoutAlign = "STRETCH";
  wrap.appendChild(sectionHead("04", "中国半导体动态", "China Semiconductor"));
  for (const co of chinaCompanies) {
    wrap.appendChild(buildCompanyBlock(co));
  }
  // outlook hl-box
  wrap.appendChild(buildHlBox("Policy & Outlook", chinaOutlook.text, chinaOutlook.sources));
  return wrap;
}

function buildItem(title, body, sources) {
  const f = autoFrame("item", "VERTICAL");
  f.itemSpacing = 4;
  f.paddingTop = 8;
  f.paddingBottom = 10;
  f.layoutAlign = "STRETCH";

  const titleNode = text(title, { size: 10, color: C.dark, font: FONT_CN_BOLD, wrap: true });
  titleNode.layoutAlign = "STRETCH";
  f.appendChild(titleNode);

  const bodyNode = text(body, { size: 9, color: C.body, font: FONT_CN, lineHeightPct: 180, wrap: true });
  bodyNode.layoutAlign = "STRETCH";
  f.appendChild(bodyNode);

  if (sources && sources.length) {
    const srcRow = autoFrame("sources", "HORIZONTAL");
    srcRow.itemSpacing = 10;
    srcRow.paddingTop = 3;
    for (const s of sources) srcRow.appendChild(srcLink(s));
    f.appendChild(srcRow);
  }

  const sep = hRule(200, C.light);
  sep.layoutAlign = "STRETCH";
  f.appendChild(sep);
  return f;
}

function buildHlBox(label, body, sources) {
  const f = autoFrame("hl-box", "HORIZONTAL");
  f.itemSpacing = 12;
  f.paddingLeft = 12;
  f.paddingRight = 14;
  f.paddingTop = 10;
  f.paddingBottom = 10;
  f.fills = solid(C.tagBg);
  f.layoutAlign = "STRETCH";
  f.counterAxisAlignItems = "MIN";

  const bar = figma.createRectangle();
  bar.resize(2, 50);
  bar.fills = solid(C.black);
  f.appendChild(bar);

  const inner = autoFrame("hl-inner", "VERTICAL");
  inner.itemSpacing = 4;
  inner.layoutGrow = 1;
  inner.layoutAlign = "STRETCH";
  inner.appendChild(text(label.toUpperCase(), { size: 6.5, color: C.tertiary, font: FONT_MONO, letterSpacing: 0.5 }));

  const bodyText = text(body, {
    size: 9, color: C.body, font: FONT_CN, lineHeightPct: 180, wrap: true,
  });
  bodyText.layoutAlign = "STRETCH";
  inner.appendChild(bodyText);

  if (sources && sources.length) {
    const srcRow = autoFrame("sources", "HORIZONTAL");
    srcRow.itemSpacing = 10;
    srcRow.paddingTop = 2;
    for (const s of sources) srcRow.appendChild(srcLink(s));
    inner.appendChild(srcRow);
  }

  f.appendChild(inner);
  return f;
}

function buildTech() {
  const wrap = autoFrame("05 tech", "VERTICAL");
  wrap.itemSpacing = 0;
  wrap.layoutAlign = "STRETCH";
  wrap.appendChild(sectionHead("05", "前沿技术", "Tech Frontier"));
  for (const t of techFrontier) wrap.appendChild(buildItem(t.title, t.text, t.sources));
  return wrap;
}

function buildAcademic() {
  const wrap = autoFrame("06 academic", "VERTICAL");
  wrap.itemSpacing = 0;
  wrap.layoutAlign = "STRETCH";
  wrap.appendChild(sectionHead("06", "学术研究", "Academic Research"));
  for (const a of academic) wrap.appendChild(buildItem(a.title, a.text, a.sources));
  return wrap;
}

function buildAI() {
  const wrap = autoFrame("07 ai", "VERTICAL");
  wrap.itemSpacing = 10;
  wrap.layoutAlign = "STRETCH";
  wrap.appendChild(sectionHead("07", "AI 与智能化", "AI & Smart Manufacturing"));
  for (const a of aiSmart) wrap.appendChild(buildItem(a.title, a.text, a.sources));
  wrap.appendChild(buildHlBox(aiOutro.label, aiOutro.text, aiOutro.sources));
  return wrap;
}

function buildDesign() {
  const wrap = autoFrame("08 design", "VERTICAL");
  wrap.itemSpacing = 10;
  wrap.layoutAlign = "STRETCH";
  wrap.appendChild(sectionHead("08", "产品与体验设计", "Product & Experience Design"));
  for (const d of designTrends) wrap.appendChild(buildItem(d.title, d.text, d.sources));
  wrap.appendChild(buildHlBox(designOutro.label, designOutro.text, designOutro.sources));
  return wrap;
}

function buildPolicyItem(p) {
  const f = autoFrame("policy", "VERTICAL");
  f.itemSpacing = 4;
  f.paddingTop = 8;
  f.paddingBottom = 10;
  f.layoutAlign = "STRETCH";

  // pill (non-stretch)
  const pillWrap = autoFrame("pill-wrap", "HORIZONTAL");
  pillWrap.appendChild(pillBox(p.tag.toUpperCase(), C.usTagBg, C.usTagFg));
  f.appendChild(pillWrap);

  const titleNode = text(p.title, { size: 10, color: C.dark, font: FONT_CN_BOLD, wrap: true });
  titleNode.layoutAlign = "STRETCH";
  f.appendChild(titleNode);

  const bodyNode = text(p.text, { size: 9, color: C.body, font: FONT_CN, lineHeightPct: 180, wrap: true });
  bodyNode.layoutAlign = "STRETCH";
  f.appendChild(bodyNode);

  if (p.sources) {
    const srcRow = autoFrame("sources", "HORIZONTAL");
    srcRow.itemSpacing = 10;
    srcRow.paddingTop = 3;
    for (const s of p.sources) srcRow.appendChild(srcLink(s));
    f.appendChild(srcRow);
  }

  const sep = hRule(200, C.light);
  sep.layoutAlign = "STRETCH";
  f.appendChild(sep);
  return f;
}

function buildPolicy() {
  const wrap = autoFrame("09 policy", "VERTICAL");
  wrap.itemSpacing = 0;
  wrap.layoutAlign = "STRETCH";
  wrap.appendChild(sectionHead("09", "政策与地缘", "Policy & Geopolitics"));
  for (const p of policy) wrap.appendChild(buildPolicyItem(p));
  return wrap;
}

function buildLandscape() {
  const wrap = autoFrame("10 landscape", "VERTICAL");
  wrap.itemSpacing = 10;
  wrap.layoutAlign = "STRETCH";
  wrap.appendChild(sectionHead("10", "产业格局", "Industry Landscape"));
  wrap.appendChild(buildHlBox("Fab Expansion", landscape.text, landscape.sources));
  return wrap;
}

function buildReading() {
  const wrap = autoFrame("11 reading", "VERTICAL");
  wrap.itemSpacing = 0;
  wrap.layoutAlign = "STRETCH";
  wrap.appendChild(sectionHead("11", "值得一读", "Worth Reading"));

  reading.forEach((r, i) => {
    const row = autoFrame("reading-item", "HORIZONTAL");
    row.itemSpacing = 10;
    row.paddingTop = 8;
    row.paddingBottom = 10;
    row.layoutAlign = "STRETCH";
    row.counterAxisAlignItems = "MIN";

    const numNode = text(String(i + 1).padStart(2, "0"), { size: 14, color: C.border, font: FONT_MONO });
    numNode.resize(20, 18);
    row.appendChild(numNode);

    const right = autoFrame("r-right", "VERTICAL");
    right.itemSpacing = 3;
    right.layoutGrow = 1;
    right.layoutAlign = "STRETCH";

    const titleNode = text(r.title, { size: 9, color: C.dark, font: FONT_CN_BOLD, wrap: true });
    titleNode.layoutAlign = "STRETCH";
    right.appendChild(titleNode);

    right.appendChild(text(r.source, { size: 6.5, color: C.tertiary, font: FONT_MONO }));

    const descNode = text(r.desc, { size: 8, color: C.secondary, font: FONT_CN, lineHeightPct: 170, wrap: true });
    descNode.layoutAlign = "STRETCH";
    right.appendChild(descNode);

    row.appendChild(right);
    wrap.appendChild(row);

    const sep = hRule(200, C.light);
    sep.layoutAlign = "STRETCH";
    wrap.appendChild(sep);
  });

  return wrap;
}

function buildCalendar() {
  const wrap = autoFrame("12 calendar", "VERTICAL");
  wrap.itemSpacing = 0;
  wrap.layoutAlign = "STRETCH";
  wrap.appendChild(sectionHead("12", "关键日程", "Upcoming Events"));

  for (const c of calendar) {
    const row = autoFrame("cal-row", "HORIZONTAL");
    row.itemSpacing = 16;
    row.paddingTop = 8;
    row.paddingBottom = 8;
    row.layoutAlign = "STRETCH";
    row.counterAxisAlignItems = "MIN";

    const d = text(c.date, { size: 7, color: C.tertiary, font: FONT_MONO });
    d.resize(50, 14);
    row.appendChild(d);

    const eventNode = text(c.event, { size: 9, color: C.body, font: FONT_CN, wrap: true });
    eventNode.layoutAlign = "STRETCH";
    eventNode.layoutGrow = 1;
    row.appendChild(eventNode);

    wrap.appendChild(row);

    const sep = hRule(200, C.light);
    sep.layoutAlign = "STRETCH";
    wrap.appendChild(sep);
  }
  return wrap;
}

// ============================================================
// PAGE BUILDERS
// ============================================================

function makePageFrame(name) {
  const page = figma.createFrame();
  page.name = name;
  page.resize(PAGE_W, PAGE_H);
  page.fills = solid(C.white);

  page.layoutMode = "VERTICAL";
  page.primaryAxisSizingMode = "FIXED";
  page.counterAxisSizingMode = "FIXED";
  page.paddingLeft = MARGIN;
  page.paddingRight = MARGIN;
  page.paddingTop = MARGIN;
  page.paddingBottom = MARGIN;
  page.itemSpacing = 0;
  page.clipsContent = true;
  return page;
}

function pageHeader(isPage1 = false) {
  if (isPage1) return null;
  const head = autoFrame("page-header", "VERTICAL");
  head.itemSpacing = 4;
  head.paddingBottom = 16;
  head.layoutAlign = "STRETCH";

  const row = autoFrame("header-row", "HORIZONTAL");
  row.primaryAxisAlignItems = "SPACE_BETWEEN";
  row.counterAxisAlignItems = "CENTER";
  row.layoutAlign = "STRETCH";
  row.appendChild(text("SEMICONDUCTOR WEEKLY", { size: 6.5, color: C.tertiary, font: FONT_MONO, letterSpacing: 0.8 }));
  row.appendChild(text(meta.dateRange, { size: 6.5, color: C.tertiary, font: FONT_MONO }));
  head.appendChild(row);

  const rule = hRule(200, C.black, 0.4);
  rule.layoutAlign = "STRETCH";
  head.appendChild(rule);

  return head;
}

function pageFooter(pageNum) {
  const foot = autoFrame("page-footer", "VERTICAL");
  foot.itemSpacing = 4;
  foot.paddingTop = 16;
  foot.layoutAlign = "STRETCH";

  const rule = hRule(200, C.light, 0.3);
  rule.layoutAlign = "STRETCH";
  foot.appendChild(rule);

  const row = autoFrame("footer-row", "HORIZONTAL");
  row.primaryAxisAlignItems = "SPACE_BETWEEN";
  row.counterAxisAlignItems = "CENTER";
  row.layoutAlign = "STRETCH";
  row.appendChild(text("Confidential", { size: 6.5, color: C.tertiary, font: FONT_MONO }));
  row.appendChild(text(`${pageNum} / 9`, { size: 6.5, color: C.tertiary, font: FONT_MONO }));
  foot.appendChild(row);

  return foot;
}

function buildCover() {
  const page = makePageFrame("01 Cover");

  // Top bar
  const top = autoFrame("cover-top", "VERTICAL");
  top.itemSpacing = 4;
  top.layoutAlign = "STRETCH";

  const topRow = autoFrame("top-row", "HORIZONTAL");
  topRow.primaryAxisAlignItems = "SPACE_BETWEEN";
  topRow.counterAxisAlignItems = "MIN";
  topRow.layoutAlign = "STRETCH";
  topRow.appendChild(text("SEMICONDUCTOR WEEKLY", { size: 8, color: C.secondary, font: FONT_SANS_BOLD, letterSpacing: 1.2 }));

  const volWrap = autoFrame("vol", "VERTICAL");
  volWrap.itemSpacing = 2;
  volWrap.counterAxisAlignItems = "MAX";
  volWrap.appendChild(text(meta.vol, { size: 7.5, color: C.tertiary, font: FONT_MONO }));
  volWrap.appendChild(text(meta.dateRange, { size: 7.5, color: C.tertiary, font: FONT_MONO }));
  topRow.appendChild(volWrap);
  top.appendChild(topRow);

  const topLine = hRule(200, C.black, 0.5);
  topLine.layoutAlign = "STRETCH";
  top.appendChild(topLine);
  page.appendChild(top);

  // Spacer to push middle content down
  const spacer1 = figma.createFrame();
  spacer1.name = "spacer-top";
  spacer1.resize(10, 180);
  spacer1.fills = [];
  page.appendChild(spacer1);

  // Middle
  const mid = autoFrame("cover-mid", "VERTICAL");
  mid.itemSpacing = 20;
  mid.layoutAlign = "STRETCH";
  mid.appendChild(text("WEEKLY BRIEFING", { size: 7, color: C.red, font: FONT_MONO, letterSpacing: 1 }));

  // Force line break after the Chinese comma in the title
  const titleText = meta.title.replace("，", "，\n");
  const titleNode = text(titleText, {
    size: 28, color: C.black, font: FONT_CN_BOLD, lineHeightPct: 120, wrap: true,
  });
  titleNode.layoutAlign = "STRETCH";
  mid.appendChild(titleNode);

  // Subtitle with left accent bar
  const subWrap = autoFrame("subtitle-wrap", "HORIZONTAL");
  subWrap.itemSpacing = 12;
  subWrap.layoutAlign = "STRETCH";
  subWrap.counterAxisAlignItems = "MIN";

  const accent = figma.createRectangle();
  accent.resize(2, 70);
  accent.fills = solid(C.border);
  subWrap.appendChild(accent);

  const subText = text(meta.subtitle, {
    size: 11, color: C.secondary, font: FONT_CN, lineHeightPct: 180, wrap: true,
  });
  subText.layoutAlign = "STRETCH";
  subText.layoutGrow = 1;
  subWrap.appendChild(subText);

  mid.appendChild(subWrap);
  page.appendChild(mid);

  // Bottom spacer
  const spacer2 = figma.createFrame();
  spacer2.name = "spacer-bot";
  spacer2.resize(10, 200);
  spacer2.fills = [];
  page.appendChild(spacer2);

  // Bottom bar
  const bot = autoFrame("cover-bot", "VERTICAL");
  bot.itemSpacing = 6;
  bot.layoutAlign = "STRETCH";
  const botLine = hRule(200, C.border, 0.3);
  botLine.layoutAlign = "STRETCH";
  bot.appendChild(botLine);

  const botRow = autoFrame("bot-row", "HORIZONTAL");
  botRow.primaryAxisAlignItems = "SPACE_BETWEEN";
  botRow.counterAxisAlignItems = "CENTER";
  botRow.layoutAlign = "STRETCH";

  const metaWrap = autoFrame("meta-text", "VERTICAL");
  metaWrap.itemSpacing = 2;
  metaWrap.appendChild(text("半导体工艺装备行业追踪", { size: 7.5, color: C.tertiary, font: FONT_CN }));
  metaWrap.appendChild(text("内部参考 · 每周一刊", { size: 7.5, color: C.tertiary, font: FONT_CN }));
  botRow.appendChild(metaWrap);

  const conf = autoFrame("confidential-badge", "HORIZONTAL");
  conf.paddingLeft = 10;
  conf.paddingRight = 10;
  conf.paddingTop = 4;
  conf.paddingBottom = 4;
  conf.strokes = solid(C.border);
  conf.strokeWeight = 0.3;
  conf.appendChild(text("CONFIDENTIAL", { size: 6.5, color: C.tertiary, font: FONT_MONO, letterSpacing: 1 }));
  botRow.appendChild(conf);

  bot.appendChild(botRow);
  page.appendChild(bot);

  return page;
}

function buildStandardPage(pageName, pageNum, bodyBuilders) {
  const page = makePageFrame(pageName);

  const header = pageHeader();
  if (header) page.appendChild(header);

  const body = autoFrame("page-body", "VERTICAL");
  body.itemSpacing = 0;
  body.layoutAlign = "STRETCH";
  body.layoutGrow = 1;

  for (let i = 0; i < bodyBuilders.length; i++) {
    if (i > 0) body.appendChild(sectionSeparator());
    body.appendChild(bodyBuilders[i]());
  }

  page.appendChild(body);
  page.appendChild(pageFooter(pageNum));
  return page;
}

// ============================================================
// MAIN
// ============================================================

figma.notify("⏳ Loading fonts...");
await preloadFonts();
figma.notify("📄 Building 9 pages...");

const pages = [];

pages.push(buildCover());
pages.push(buildStandardPage("02 Digest + Market",     2, [buildDigest, buildMarket]));
pages.push(buildStandardPage("03 Equipment Giants",    3, [buildEquipment]));
pages.push(buildStandardPage("04 China Semiconductor", 4, [buildChina]));
pages.push(buildStandardPage("05 Tech + Academic",     5, [buildTech, buildAcademic]));
pages.push(buildStandardPage("06 AI & Smart",          6, [buildAI]));
pages.push(buildStandardPage("07 Product & UX Design", 7, [buildDesign]));
pages.push(buildStandardPage("08 Policy + Landscape",  8, [buildPolicy, buildLandscape]));
pages.push(buildStandardPage("09 Reading + Calendar",  9, [buildReading, buildCalendar]));

// Position pages horizontally
let x = 0;
for (const p of pages) {
  figma.currentPage.appendChild(p);
  p.x = x;
  p.y = 0;
  x += PAGE_W + GUTTER_X;
}

// Zoom to fit
figma.viewport.scrollAndZoomIntoView(pages);

figma.notify(`✅ Generated ${pages.length} pages. Edit freely — all nodes are auto-layout frames.`);

})();
