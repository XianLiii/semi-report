// ============================================================
// 半导体行业周报 — Figma 生成脚本
// 使用方法：Figma > Plugins > Development > Open Console > 粘贴运行
// ============================================================

// ---- 设计参数 ----
const PAGE_W = 595;        // A4 @ 72dpi
const PAGE_H = 842;
const MARGIN = { top: 56, bottom: 48, left: 56, right: 56 };
const CONTENT_W = PAGE_W - MARGIN.left - MARGIN.right;
const CONTENT_H = PAGE_H - MARGIN.top - MARGIN.bottom;

// 颜色
const C = {
  black:     { r: 0.078, g: 0.078, b: 0.078 },  // #141414
  dark:      { r: 0.1,   g: 0.1,   b: 0.1   },  // #1a1a1a
  body:      { r: 0.2,   g: 0.2,   b: 0.2   },  // #333
  secondary: { r: 0.4,   g: 0.4,   b: 0.4   },  // #666
  tertiary:  { r: 0.6,   g: 0.6,   b: 0.6   },  // #999
  border:    { r: 0.878, g: 0.878, b: 0.878 },  // #e0e0e0
  lightBdr:  { r: 0.937, g: 0.937, b: 0.937 },  // #efefef
  white:     { r: 1,     g: 1,     b: 1     },
  red:       { r: 0.753, g: 0.224, b: 0.169 },  // #c0392b
  green:     { r: 0.086, g: 0.639, b: 0.29  },  // #16a34a
  downRed:   { r: 0.863, g: 0.149, b: 0.149 },  // #dc2626
  tagBg:     { r: 0.961, g: 0.961, b: 0.953 },  // #f5f5f3
};

// ---- 工具函数 ----
async function loadFont(family, style) {
  try {
    await figma.loadFontAsync({ family, style });
    return true;
  } catch {
    return false;
  }
}

function createPage(name) {
  const page = figma.createFrame();
  page.name = name;
  page.resize(PAGE_W, PAGE_H);
  page.fills = [{ type: 'SOLID', color: C.white }];
  page.layoutMode = 'NONE';
  page.clipsContent = true;
  return page;
}

function addRect(parent, x, y, w, h, color) {
  const rect = figma.createRectangle();
  rect.x = x; rect.y = y;
  rect.resize(w, h);
  rect.fills = [{ type: 'SOLID', color }];
  parent.appendChild(rect);
  return rect;
}

function addLine(parent, x, y, w, color, thickness = 1) {
  const line = figma.createLine();
  line.x = x; line.y = y;
  line.resize(w, 0);
  line.strokes = [{ type: 'SOLID', color }];
  line.strokeWeight = thickness;
  parent.appendChild(line);
  return line;
}

async function addText(parent, x, y, w, content, opts = {}) {
  const {
    size = 11,
    color = C.body,
    weight = 'Regular',
    family = 'Inter',
    lineH = null,
    letterSpacing = null,
    align = 'LEFT',
  } = opts;

  const node = figma.createText();

  // Try to load font, fallback chain
  let loaded = await loadFont(family, weight);
  if (!loaded) loaded = await loadFont('Inter', weight);
  if (!loaded) loaded = await loadFont('Inter', 'Regular');
  if (!loaded) await loadFont('Roboto', 'Regular');

  node.x = x; node.y = y;
  if (w) node.resize(w, 1);
  node.textAutoResize = w ? 'HEIGHT' : 'WIDTH_AND_HEIGHT';
  node.characters = content;

  const len = content.length;
  try {
    node.setRangeFontFamily(0, len, family);
    node.setRangeFontStyle(0, len, weight);
  } catch {
    try { node.setRangeFontFamily(0, len, 'Inter'); } catch {}
  }
  node.setRangeFontSize(0, len, size);
  node.setRangeFills(0, len, [{ type: 'SOLID', color }]);
  if (lineH) node.setRangeLineHeight(0, len, { value: lineH, unit: 'PIXELS' });
  if (letterSpacing) node.setRangeLetterSpacing(0, len, { value: letterSpacing, unit: 'PIXELS' });
  node.textAlignHorizontal = align;

  parent.appendChild(node);
  return node;
}

// ---- 页头页尾 ----
async function addHeader(page) {
  addLine(page, MARGIN.left, MARGIN.top - 12, CONTENT_W, C.black, 0.5);
  await addText(page, MARGIN.left, MARGIN.top - 26, null, 'SEMICONDUCTOR WEEKLY', {
    size: 6.5, color: C.tertiary, weight: 'Medium', letterSpacing: 1,
  });
  await addText(page, PAGE_W - MARGIN.right, MARGIN.top - 26, null, '2026.04.07 — 04.09', {
    size: 6.5, color: C.tertiary, weight: 'Regular', family: 'Inter', align: 'RIGHT',
  });
}

async function addFooter(page, pageNum, totalPages) {
  const fy = PAGE_H - MARGIN.bottom + 16;
  addLine(page, MARGIN.left, fy - 4, CONTENT_W, C.lightBdr, 0.5);
  await addText(page, MARGIN.left, fy, null, 'Confidential', {
    size: 6.5, color: C.tertiary, weight: 'Regular', family: 'Inter',
  });
  await addText(page, PAGE_W - MARGIN.right, fy, null, `${pageNum} / ${totalPages}`, {
    size: 6.5, color: C.tertiary, weight: 'Regular', family: 'Inter', align: 'RIGHT',
  });
}

// ---- 板块标题 ----
async function addSectionTitle(page, y, num, titleCN, subtitleEN) {
  await addText(page, MARGIN.left, y, null, num, {
    size: 7, color: C.red, weight: 'Medium', family: 'Inter', letterSpacing: 0.5,
  });
  await addText(page, MARGIN.left, y + 12, CONTENT_W, titleCN, {
    size: 18, color: C.black, weight: 'Bold',
  });
  await addText(page, MARGIN.left, y + 36, null, subtitleEN.toUpperCase(), {
    size: 7, color: C.tertiary, weight: 'Regular', family: 'Inter', letterSpacing: 0.5,
  });
  return y + 56;
}

// ---- 速览条目 ----
async function addDigestItem(page, y, num, tag, text) {
  addLine(page, MARGIN.left, y, CONTENT_W, C.lightBdr, 0.5);
  await addText(page, MARGIN.left, y + 10, null, num, {
    size: 8, color: C.tertiary, weight: 'Regular', family: 'Inter',
  });

  // Tag
  const tagNode = addRect(page, MARGIN.left + 24, y + 10, 42, 14, C.tagBg);
  tagNode.cornerRadius = 2;
  await addText(page, MARGIN.left + 28, y + 12, null, tag, {
    size: 6.5, color: C.secondary, weight: 'Medium', family: 'Inter', letterSpacing: 0.3,
  });

  await addText(page, MARGIN.left + 72, y + 8, CONTENT_W - 72, text, {
    size: 10.5, color: C.dark, weight: 'Medium', lineH: 18,
  });

  return y + 38;
}

// ---- 市场卡片 ----
async function addMarketCard(page, x, y, w, ticker, name, price, change, isUp, note) {
  addRect(page, x, y, w, 90, C.white);
  addLine(page, x, y, w, C.border, 0.5);

  await addText(page, x + 12, y + 10, null, ticker, {
    size: 7, color: C.tertiary, weight: 'Regular', family: 'Inter', letterSpacing: 0.3,
  });
  await addText(page, x + 12, y + 22, null, name, {
    size: 9, color: C.dark, weight: 'Medium',
  });
  await addText(page, x + 12, y + 40, null, price, {
    size: 17, color: C.black, weight: 'Medium', family: 'Inter',
  });
  await addText(page, x + 12, y + 62, null, change, {
    size: 9, color: isUp ? C.green : C.downRed, weight: 'Medium', family: 'Inter',
  });
  await addText(page, x + 12, y + 76, w - 24, note, {
    size: 7.5, color: C.tertiary, weight: 'Regular',
  });
}

// ---- 公司块 ----
async function addCompanyBlock(page, y, name, ticker, highlight, events) {
  // Header
  await addText(page, MARGIN.left, y, null, name, {
    size: 13, color: C.black, weight: 'Bold',
  });
  await addText(page, PAGE_W - MARGIN.right, y + 2, null, ticker, {
    size: 7, color: C.tertiary, weight: 'Regular', family: 'Inter', align: 'RIGHT',
  });

  let cy = y + 22;

  // Highlight bar
  if (highlight) {
    addRect(page, MARGIN.left, cy, 3, 36, C.red);
    addRect(page, MARGIN.left, cy, CONTENT_W, 36, { r: 0.992, g: 0.973, b: 0.969 }); // #fdf8f7
    addRect(page, MARGIN.left, cy, 3, 36, C.red);
    await addText(page, MARGIN.left + 14, cy + 8, CONTENT_W - 20, highlight, {
      size: 10, color: C.dark, weight: 'Medium', lineH: 17,
    });
    cy += 44;
  }

  // Events
  for (const [date, text] of events) {
    await addText(page, MARGIN.left, cy, null, date, {
      size: 7.5, color: C.tertiary, weight: 'Regular', family: 'Inter',
    });
    await addText(page, MARGIN.left + 48, cy - 1, CONTENT_W - 48, text, {
      size: 10, color: C.body, weight: 'Regular', lineH: 17,
    });
    cy += 22;
  }

  addLine(page, MARGIN.left, cy + 8, CONTENT_W, C.lightBdr, 0.5);
  return cy + 16;
}

// ============================================================
// 主生成逻辑
// ============================================================
async function main() {
  const pages = [];
  const TOTAL = 10;

  // ===================== PAGE 1: COVER =====================
  const p1 = createPage('01 — Cover');
  addRect(p1, 0, 0, PAGE_W, 4, C.black); // top bar

  await addText(p1, MARGIN.left, 52, null, 'SEMICONDUCTOR WEEKLY', {
    size: 7.5, color: C.secondary, weight: 'Medium', letterSpacing: 1.2,
  });
  await addText(p1, PAGE_W - MARGIN.right, 52, null, 'Vol.01 / No.15\n2026.04.07 — 04.09', {
    size: 7.5, color: C.tertiary, weight: 'Regular', family: 'Inter', align: 'RIGHT', lineH: 13,
  });

  await addText(p1, MARGIN.left, 300, null, 'WEEKLY BRIEFING', {
    size: 7.5, color: C.red, weight: 'Medium', family: 'Inter', letterSpacing: 1,
  });
  await addText(p1, MARGIN.left, 328, CONTENT_W, 'MATCH Act 冲击波，\n设备股剧烈震荡', {
    size: 38, color: C.black, weight: 'Bold', lineH: 48,
  });

  // Subtitle with left border
  addRect(p1, MARGIN.left, 430, 2, 60, C.border);
  await addText(p1, MARGIN.left + 16, 432, CONTENT_W - 20, '美国国会推出新芯片设备出口管制法案，ASML 单日跌近 5%；AMAT 发布两款 GAA 2nm 沉积系统，股价反弹 8%；中国设备厂商在 SEMICON China 密集发布新品。', {
    size: 11, color: C.secondary, weight: 'Light', lineH: 20,
  });

  // Cover footer
  addLine(p1, MARGIN.left, PAGE_H - 88, CONTENT_W, C.border, 0.5);
  await addText(p1, MARGIN.left, PAGE_H - 76, null, '半导体工艺装备行业追踪\n内部参考 · 每周一刊', {
    size: 8, color: C.tertiary, weight: 'Regular', lineH: 15,
  });
  // CONFIDENTIAL badge
  addRect(p1, PAGE_W - MARGIN.right - 80, PAGE_H - 78, 80, 22, C.white);
  const badge = addRect(p1, PAGE_W - MARGIN.right - 80, PAGE_H - 78, 80, 22, C.white);
  badge.strokes = [{ type: 'SOLID', color: C.border }];
  badge.strokeWeight = 0.5;
  await addText(p1, PAGE_W - MARGIN.right - 76, PAGE_H - 73, null, 'CONFIDENTIAL', {
    size: 6.5, color: C.tertiary, weight: 'Regular', family: 'Inter', letterSpacing: 1,
  });

  pages.push(p1);

  // ===================== PAGE 2: DIGEST + MARKET =====================
  const p2 = createPage('02 — Digest + Market');
  await addHeader(p2);
  await addFooter(p2, 2, TOTAL);

  let y2 = await addSectionTitle(p2, MARGIN.top, '01', '本周速览', 'Weekly Digest');

  const digests = [
    ['01', 'POLICY', '美国众议院推出 MATCH Act，拟封堵 ASML DUV 对华出口通道，ASML 单日跌 4.7%'],
    ['02', 'AMAT', 'Applied Materials 发布两款面向 GAA 2nm 的沉积系统，股价当日涨 8%'],
    ['03', 'SEMI', 'SEMI 发布数据：2025 全球半导体设备销售 $1,351 亿，预计 2027 年达 $1,560 亿创新高'],
    ['04', 'CHINA', '北方华创、中微公司在 SEMICON China 2026 密集发布新品，北方华创 2026 年订单目标 600 亿'],
    ['05', 'HIGH-NA', 'Imec 接收 ASML EXE:5200 High-NA EUV 系统，预计 Q4 完成验证'],
  ];
  for (const [num, tag, text] of digests) {
    y2 = await addDigestItem(p2, y2, num, tag, text);
  }

  y2 += 16;
  y2 = await addSectionTitle(p2, y2, '02', '市场脉搏', 'Market Pulse');

  // SOX bar
  addRect(p2, MARGIN.left, y2, CONTENT_W, 40, C.tagBg);
  addRect(p2, MARGIN.left, y2, 3, 40, C.black);
  await addText(p2, MARGIN.left + 14, y2 + 12, null, 'SOX 费城半导体指数', {
    size: 9, color: C.secondary, weight: 'Regular',
  });
  await addText(p2, PAGE_W - MARGIN.right - 12, y2 + 6, null, '7,877', {
    size: 16, color: C.black, weight: 'Medium', family: 'Inter', align: 'RIGHT',
  });
  await addText(p2, PAGE_W - MARGIN.right - 12, y2 + 26, null, '52W High: 8,498 · -7.3% off peak', {
    size: 7, color: C.tertiary, weight: 'Regular', family: 'Inter', align: 'RIGHT',
  });

  pages.push(p2);

  // ===================== PAGE 3: MARKET CARDS + EQUIPMENT =====================
  const p3 = createPage('03 — Market + Equipment');
  await addHeader(p3);
  await addFooter(p3, 3, TOTAL);

  const cardW = (CONTENT_W - 1) / 2;
  await addMarketCard(p3, MARGIN.left, MARGIN.top, cardW, 'AMAT', 'Applied Materials', '$352.62', '▲ +8.0% (Apr 8)', true, 'GAA 新品发布提振');
  await addMarketCard(p3, MARGIN.left + cardW + 1, MARGIN.top, cardW, 'LRCX', 'Lam Research', '$235.00', '▲ +9.5% (Apr 8)', true, 'YTD +37.6%，连续四季超预期');
  await addMarketCard(p3, MARGIN.left, MARGIN.top + 91, cardW, 'ASML', 'ASML Holding', '$1,317', '▼ -4.7% (Apr 7)', false, 'MATCH Act 冲击，中国营收占 29%');
  await addMarketCard(p3, MARGIN.left + cardW + 1, MARGIN.top + 91, cardW, 'KLAC', 'KLA Corporation', '$1,661', '▲ +7.4% (Apr 8)', true, 'YTD +30.3%，$70 亿回购计划');

  let y3 = MARGIN.top + 200;
  y3 = await addSectionTitle(p3, y3, '03', '设备巨头动态', 'Equipment Giants');

  y3 = await addCompanyBlock(p3, y3, 'Applied Materials', 'NASDAQ: AMAT',
    '4 月 8 日发布 Precision Selective Nitride PECVD 和 Trillium ALD 两款沉积系统，面向 GAA 2nm 及以下节点。',
    [
      ['Apr 8', '新品发布后股价当日大涨约 8%，市场反应积极'],
      ['Q1', 'Q1 FY2026 EPS $2.38（超预期 $0.17），营收 $70.1 亿'],
      ['展望', '管理层预计 2026 年半导体行业增长 20%+，DRAM 领涨'],
    ]);

  y3 = await addCompanyBlock(p3, y3, 'Lam Research', 'NASDAQ: LRCX',
    '连续四个季度超预期，Q2 FY2026 营收 $53.4 亿（同比 +22%），Q3 指引 $57 亿显示持续加速。',
    [
      ['Apr 7', 'Morgan Stanley 上调目标价至 $260'],
      ['Apr 22', '即将发布 Q3 财报，关注 GAA 节奏及中国收入占比'],
    ]);

  pages.push(p3);

  // ===================== PAGE 4: MORE EQUIPMENT + TECH =====================
  const p4 = createPage('04 — Equipment + Tech');
  await addHeader(p4);
  await addFooter(p4, 4, TOTAL);

  let y4 = MARGIN.top;
  y4 = await addCompanyBlock(p4, y4, 'ASML Holding', 'EURONEXT: ASML',
    'MATCH Act 冲击下股价单日跌 4.7%，但随后因美伊停火反弹 6.35%。High-NA EUV 进入商用部署阶段。',
    [
      ['订单', 'SK Hynix 承诺 $80 亿采购 ~30 台 EUV；Samsung 计划 $40 亿采购 ~20 台'],
      ['High-NA', '首批商用 EXE:5200B 已交付 Intel，2026 预计出货 5-10 台'],
      ['Apr 15', 'Q1 财报发布 | 指引：2026 净销售额 340-390 亿欧元'],
    ]);

  y4 = await addCompanyBlock(p4, y4, 'Tokyo Electron / KLA', 'TSE: 8035 / NASDAQ: KLAC', null,
    [
      ['TEL', '先进芯片设备占比提升至 40%，资本支出增 48% 至 2400 亿日元创新高'],
      ['KLA', '宣布 $70 亿回购计划，连续第 17 年提高股息'],
    ]);

  y4 += 8;
  y4 = await addSectionTitle(p4, y4, '04', '前沿技术', 'Tech Frontier');

  // Tech items as text blocks
  await addText(p4, MARGIN.left, y4, CONTENT_W, 'GAA 与背面供电进入量产倒计时', {
    size: 12, color: C.dark, weight: 'Bold',
  });
  await addText(p4, MARGIN.left, y4 + 18, CONTENT_W, 'TSMC N2P（2nm + 背面供电）计划 2026 下半年投产；A16（1.6nm + Super Power Rail）紧随其后。背面供电可降低电压降和供电噪声，但与 GAA 集成带来应力管理挑战。', {
    size: 10, color: C.body, weight: 'Regular', lineH: 18,
  });
  y4 += 72;
  addLine(p4, MARGIN.left, y4, CONTENT_W, C.lightBdr, 0.5);
  y4 += 12;

  await addText(p4, MARGIN.left, y4, CONTENT_W, 'High-NA EUV 从研发走向量产', {
    size: 12, color: C.dark, weight: 'Bold',
  });
  await addText(p4, MARGIN.left, y4 + 18, CONTENT_W, 'Imec 接收 EXE:5200 系统（3 月 18 日），Q4 完成验证。Intel 安装商用 EXE:5200B 用于 14A 节点。IBM 在 SPIE 2026 展示 High-NA 工艺能力。2026 年预计交付 5-10 台，2028 年增至 20+ 台。', {
    size: 10, color: C.body, weight: 'Regular', lineH: 18,
  });

  pages.push(p4);

  // ===================== PAGE 5-10: Placeholder frames =====================
  const remainingPages = [
    ['05 — China Semiconductor', '05', '中国半导体动态', 'China Semiconductor'],
    ['06 — Academic & Research', '06', '学术与研究前沿', 'Academic & Research'],
    ['07 — AI & Smart', '07', 'AI 与智能化', 'AI & Smart Manufacturing'],
    ['08 — Policy', '08', '政策与地缘', 'Policy & Geopolitics'],
    ['09 — Reading', '10', '值得一读', 'Worth Reading'],
    ['10 — Calendar', '11', '关键日程', 'Upcoming Events'],
  ];

  for (let i = 0; i < remainingPages.length; i++) {
    const [name, num, title, subtitle] = remainingPages[i];
    const pn = createPage(name);
    await addHeader(pn);
    await addFooter(pn, 5 + i, TOTAL);
    await addSectionTitle(pn, MARGIN.top, num, title, subtitle);

    // Placeholder content area indicator
    addRect(pn, MARGIN.left, MARGIN.top + 64, CONTENT_W, 2, C.lightBdr);
    await addText(pn, MARGIN.left, MARGIN.top + 76, CONTENT_W, '[ 在此添加内容 — 参考 HTML 报告填充 ]', {
      size: 10, color: C.tertiary, weight: 'Regular', align: 'CENTER',
    });

    pages.push(pn);
  }

  // ---- 排列所有页面 ----
  let offsetX = 0;
  for (const page of pages) {
    page.x = offsetX;
    page.y = 0;
    figma.currentPage.appendChild(page);
    offsetX += PAGE_W + 40; // 40px gap between pages
  }

  // 缩放到全部可见
  figma.viewport.scrollAndZoomIntoView(pages);

  figma.notify(`✅ 已生成 ${pages.length} 页报告框架！前 4 页有完整内容，后 6 页为占位符。`);
}

main();
