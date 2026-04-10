import PptxGenJS from 'pptxgenjs';
import { meta, digest, market, equipment, techFrontier, chinaSection, academic, aiSmart, designTrends, policy, landscape, reading, calendar } from './data.mjs';

const pptx = new PptxGenJS();
pptx.defineLayout({ name: 'A4L', width: 13.33, height: 7.5 }); // 16:9
pptx.layout = 'A4L';

// ---- 颜色 & 字体 ----
const BLACK = '141414';
const DARK = '1a1a1a';
const BODY = '333333';
const SECONDARY = '666666';
const TERTIARY = '999999';
const BORDER = 'e0e0e0';
const RED = 'c0392b';
const GREEN = '16a34a';
const DOWN_RED = 'dc2626';
const TAG_BG = 'f5f5f3';
const WHITE = 'FFFFFF';

const FONT = 'HarmonyOS Sans SC';
const MONO = 'JetBrains Mono';
const MARGIN_L = 0.8;
const MARGIN_R = 0.8;
const CONTENT_W = 13.33 - MARGIN_L - MARGIN_R;

// ---- 工具函数 ----
function addPageHeader(slide) {
  slide.addText('SEMICONDUCTOR WEEKLY', { x: MARGIN_L, y: 0.25, w: 4, h: 0.25, fontSize: 7, color: TERTIARY, fontFace: FONT, bold: true });
  slide.addText(meta.dateRange, { x: 13.33 - MARGIN_R - 3, y: 0.25, w: 3, h: 0.25, fontSize: 7, color: TERTIARY, fontFace: MONO, align: 'right' });
  slide.addShape(pptx.ShapeType.line, { x: MARGIN_L, y: 0.52, w: CONTENT_W, h: 0, line: { color: BLACK, width: 0.5 } });
}

function addPageFooter(slide, pageNum, total) {
  const fy = 7.08;
  slide.addShape(pptx.ShapeType.line, { x: MARGIN_L, y: fy, w: CONTENT_W, h: 0, line: { color: BORDER, width: 0.3 } });
  slide.addText('Confidential', { x: MARGIN_L, y: fy + 0.04, w: 2, h: 0.2, fontSize: 6.5, color: TERTIARY, fontFace: MONO });
  slide.addText(`${pageNum} / ${total}`, { x: 13.33 - MARGIN_R - 1, y: fy + 0.04, w: 1, h: 0.2, fontSize: 6.5, color: TERTIARY, fontFace: MONO, align: 'right' });
}

function addSectionHeader(slide, y, num, titleCN, subtitleEN) {
  slide.addText(num, { x: MARGIN_L, y, w: 0.5, h: 0.2, fontSize: 7, color: RED, fontFace: MONO });
  slide.addText(titleCN, { x: MARGIN_L, y: y + 0.18, w: CONTENT_W, h: 0.4, fontSize: 22, color: BLACK, fontFace: FONT, bold: true });
  slide.addText(subtitleEN.toUpperCase(), { x: MARGIN_L, y: y + 0.55, w: CONTENT_W, h: 0.2, fontSize: 7, color: TERTIARY, fontFace: MONO });
  return y + 0.85;
}

const TOTAL = 13;

// ==================== SLIDE 1: COVER ====================
const s1 = pptx.addSlide();
s1.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 13.33, h: 0.06, fill: { color: BLACK } });
s1.addText('SEMICONDUCTOR WEEKLY', { x: MARGIN_L, y: 0.4, w: 4, h: 0.25, fontSize: 8, color: SECONDARY, fontFace: FONT, bold: true });
s1.addText(`${meta.vol}\n${meta.dateRange}`, { x: 13.33 - MARGIN_R - 3, y: 0.4, w: 3, h: 0.4, fontSize: 8, color: TERTIARY, fontFace: MONO, align: 'right' });

s1.addText('WEEKLY BRIEFING', { x: MARGIN_L, y: 2.4, w: 4, h: 0.3, fontSize: 8, color: RED, fontFace: MONO, bold: true });
s1.addText(meta.title, { x: MARGIN_L, y: 2.8, w: 8, h: 1.2, fontSize: 42, color: BLACK, fontFace: FONT, bold: true, lineSpacingMultiple: 1.1 });
s1.addShape(pptx.ShapeType.rect, { x: MARGIN_L, y: 4.2, w: 0.03, h: 0.7, fill: { color: BORDER } });
s1.addText(meta.subtitle, { x: MARGIN_L + 0.2, y: 4.2, w: 7, h: 0.8, fontSize: 12, color: SECONDARY, fontFace: FONT, lineSpacingMultiple: 1.6 });

s1.addShape(pptx.ShapeType.line, { x: MARGIN_L, y: 6.5, w: CONTENT_W, h: 0, line: { color: BORDER, width: 0.5 } });
s1.addText('半导体工艺装备行业追踪\n内部参考 · 每周一刊', { x: MARGIN_L, y: 6.6, w: 4, h: 0.4, fontSize: 8, color: TERTIARY, fontFace: FONT, lineSpacingMultiple: 1.4 });
s1.addShape(pptx.ShapeType.rect, { x: 13.33 - MARGIN_R - 1.2, y: 6.6, w: 1.2, h: 0.3, line: { color: BORDER, width: 0.5 }, fill: { color: WHITE } });
s1.addText('CONFIDENTIAL', { x: 13.33 - MARGIN_R - 1.18, y: 6.62, w: 1.16, h: 0.26, fontSize: 6.5, color: TERTIARY, fontFace: MONO, align: 'center' });

// ==================== SLIDE 2: DIGEST ====================
const s2 = pptx.addSlide();
addPageHeader(s2);
addPageFooter(s2, 2, TOTAL);
let y2 = addSectionHeader(s2, 0.7, '01', '本周速览', 'Weekly Digest');

digest.forEach((d, i) => {
  const yy = y2 + i * 0.65;
  s2.addShape(pptx.ShapeType.line, { x: MARGIN_L, y: yy, w: CONTENT_W, h: 0, line: { color: BORDER, width: 0.3 } });
  s2.addText(String(i + 1).padStart(2, '0'), { x: MARGIN_L, y: yy + 0.08, w: 0.3, h: 0.2, fontSize: 8, color: TERTIARY, fontFace: MONO });
  s2.addShape(pptx.ShapeType.rect, { x: MARGIN_L + 0.35, y: yy + 0.1, w: 0.55, h: 0.2, fill: { color: TAG_BG }, rectRadius: 0.02 });
  s2.addText(d.tag, { x: MARGIN_L + 0.38, y: yy + 0.1, w: 0.5, h: 0.2, fontSize: 6.5, color: SECONDARY, fontFace: MONO, align: 'center' });
  s2.addText(d.text, { x: MARGIN_L + 1.0, y: yy + 0.05, w: CONTENT_W - 1.0, h: 0.5, fontSize: 11, color: DARK, fontFace: FONT, lineSpacingMultiple: 1.5 });
});

// ==================== SLIDE 3: MARKET ====================
const s3 = pptx.addSlide();
addPageHeader(s3);
addPageFooter(s3, 3, TOTAL);
let y3 = addSectionHeader(s3, 0.7, '02', '市场脉搏', 'Market Pulse');

// SOX bar
s3.addShape(pptx.ShapeType.rect, { x: MARGIN_L, y: y3, w: CONTENT_W, h: 0.6, fill: { color: TAG_BG } });
s3.addShape(pptx.ShapeType.rect, { x: MARGIN_L, y: y3, w: 0.04, h: 0.6, fill: { color: BLACK } });
s3.addText('SOX 费城半导体指数', { x: MARGIN_L + 0.2, y: y3 + 0.15, w: 4, h: 0.3, fontSize: 10, color: SECONDARY, fontFace: FONT });
s3.addText(market.sox.value, { x: 13.33 - MARGIN_R - 2, y: y3 + 0.05, w: 2, h: 0.35, fontSize: 22, color: BLACK, fontFace: MONO, align: 'right', bold: true });
s3.addText(`52W High: ${market.sox.high52w} · ${market.sox.offPeak} off peak`, { x: 13.33 - MARGIN_R - 3, y: y3 + 0.38, w: 3, h: 0.2, fontSize: 7, color: TERTIARY, fontFace: MONO, align: 'right' });

// Stock cards — 2x2 grid
const cardW = (CONTENT_W - 0.15) / 2;
const cardH = 1.2;
const startY = y3 + 0.8;

market.stocks.forEach((s, i) => {
  const col = i % 2;
  const row = Math.floor(i / 2);
  const cx = MARGIN_L + col * (cardW + 0.15);
  const cy = startY + row * (cardH + 0.1);

  s3.addShape(pptx.ShapeType.rect, { x: cx, y: cy, w: cardW, h: cardH, line: { color: BORDER, width: 0.3 }, fill: { color: WHITE } });
  s3.addText(s.ticker, { x: cx + 0.15, y: cy + 0.1, w: 1, h: 0.15, fontSize: 7, color: TERTIARY, fontFace: MONO });
  s3.addText(s.name, { x: cx + 0.15, y: cy + 0.25, w: cardW - 0.3, h: 0.2, fontSize: 9, color: DARK, fontFace: FONT, bold: true });
  s3.addText(s.price, { x: cx + 0.15, y: cy + 0.5, w: 2, h: 0.3, fontSize: 20, color: BLACK, fontFace: MONO, bold: true });
  s3.addText(`${s.up ? '▲' : '▼'} ${s.change} (${s.date})`, { x: cx + 0.15, y: cy + 0.82, w: 2, h: 0.15, fontSize: 9, color: s.up ? GREEN : DOWN_RED, fontFace: MONO });
  s3.addText(s.note, { x: cx + 0.15, y: cy + 0.98, w: cardW - 0.3, h: 0.15, fontSize: 7.5, color: TERTIARY, fontFace: FONT });
});

// ==================== SLIDE 4-5: EQUIPMENT GIANTS ====================
const s4 = pptx.addSlide();
addPageHeader(s4);
addPageFooter(s4, 4, TOTAL);
let y4 = addSectionHeader(s4, 0.7, '03', '设备巨头动态', 'Equipment Giants');

// AMAT & Lam on this slide
for (const co of equipment.slice(0, 2)) {
  s4.addText(co.name, { x: MARGIN_L, y: y4, w: 4, h: 0.3, fontSize: 14, color: BLACK, fontFace: FONT, bold: true });
  s4.addText(co.ticker, { x: 13.33 - MARGIN_R - 2.5, y: y4 + 0.05, w: 2.5, h: 0.2, fontSize: 7, color: TERTIARY, fontFace: MONO, align: 'right' });
  y4 += 0.35;
  if (co.highlight) {
    s4.addShape(pptx.ShapeType.rect, { x: MARGIN_L, y: y4, w: 0.04, h: 0.5, fill: { color: RED } });
    s4.addText(co.highlight, { x: MARGIN_L + 0.15, y: y4, w: CONTENT_W - 0.15, h: 0.5, fontSize: 10, color: DARK, fontFace: FONT, lineSpacingMultiple: 1.5, bold: true });
    y4 += 0.55;
  }
  for (const [date, text] of co.events) {
    s4.addText(date, { x: MARGIN_L, y: y4, w: 0.6, h: 0.2, fontSize: 7.5, color: TERTIARY, fontFace: MONO });
    s4.addText(text, { x: MARGIN_L + 0.65, y: y4, w: CONTENT_W - 0.65, h: 0.25, fontSize: 10, color: BODY, fontFace: FONT });
    y4 += 0.3;
  }
  s4.addShape(pptx.ShapeType.line, { x: MARGIN_L, y: y4 + 0.05, w: CONTENT_W, h: 0, line: { color: BORDER, width: 0.3 } });
  y4 += 0.2;
}

// ASML & TEL/KLA
const s5 = pptx.addSlide();
addPageHeader(s5);
addPageFooter(s5, 5, TOTAL);
let y5 = 0.7;
for (const co of equipment.slice(2)) {
  s5.addText(co.name, { x: MARGIN_L, y: y5, w: 5, h: 0.3, fontSize: 14, color: BLACK, fontFace: FONT, bold: true });
  s5.addText(co.ticker, { x: 13.33 - MARGIN_R - 3, y: y5 + 0.05, w: 3, h: 0.2, fontSize: 7, color: TERTIARY, fontFace: MONO, align: 'right' });
  y5 += 0.35;
  if (co.highlight) {
    s5.addShape(pptx.ShapeType.rect, { x: MARGIN_L, y: y5, w: 0.04, h: 0.5, fill: { color: RED } });
    s5.addText(co.highlight, { x: MARGIN_L + 0.15, y: y5, w: CONTENT_W - 0.15, h: 0.55, fontSize: 10, color: DARK, fontFace: FONT, lineSpacingMultiple: 1.5, bold: true });
    y5 += 0.6;
  }
  for (const [date, text] of co.events) {
    s5.addText(date, { x: MARGIN_L, y: y5, w: 0.7, h: 0.2, fontSize: 7.5, color: TERTIARY, fontFace: MONO });
    s5.addText(text, { x: MARGIN_L + 0.75, y: y5, w: CONTENT_W - 0.75, h: 0.3, fontSize: 10, color: BODY, fontFace: FONT, lineSpacingMultiple: 1.4 });
    y5 += 0.35;
  }
  s5.addShape(pptx.ShapeType.line, { x: MARGIN_L, y: y5 + 0.05, w: CONTENT_W, h: 0, line: { color: BORDER, width: 0.3 } });
  y5 += 0.25;
}

// ==================== SLIDE 6: TECH FRONTIER ====================
const s6 = pptx.addSlide();
addPageHeader(s6);
addPageFooter(s6, 6, TOTAL);
let y6 = addSectionHeader(s6, 0.7, '04', '前沿技术', 'Tech Frontier');
for (const t of techFrontier) {
  s6.addText(t.title, { x: MARGIN_L, y: y6, w: CONTENT_W, h: 0.25, fontSize: 13, color: DARK, fontFace: FONT, bold: true });
  s6.addText(t.text, { x: MARGIN_L, y: y6 + 0.3, w: CONTENT_W, h: 0.7, fontSize: 10, color: BODY, fontFace: FONT, lineSpacingMultiple: 1.6 });
  y6 += 1.15;
  s6.addShape(pptx.ShapeType.line, { x: MARGIN_L, y: y6, w: CONTENT_W, h: 0, line: { color: BORDER, width: 0.3 } });
  y6 += 0.15;
}

// ==================== SLIDE 7: CHINA ====================
const s7 = pptx.addSlide();
addPageHeader(s7);
addPageFooter(s7, 7, TOTAL);
let y7 = addSectionHeader(s7, 0.7, '05', '中国半导体动态', 'China Semiconductor');
for (const co of chinaSection.companies) {
  s7.addText(co.name, { x: MARGIN_L, y: y7, w: 3, h: 0.25, fontSize: 12, color: DARK, fontFace: FONT, bold: true });
  s7.addText(co.ticker, { x: MARGIN_L + 3, y: y7 + 0.03, w: 1.5, h: 0.2, fontSize: 7, color: TERTIARY, fontFace: MONO });
  y7 += 0.3;
  for (const [d, t] of co.events) {
    s7.addText(d, { x: MARGIN_L, y: y7, w: 0.5, h: 0.18, fontSize: 7.5, color: TERTIARY, fontFace: MONO });
    s7.addText(t, { x: MARGIN_L + 0.55, y: y7, w: CONTENT_W - 0.55, h: 0.35, fontSize: 9.5, color: BODY, fontFace: FONT, lineSpacingMultiple: 1.4 });
    y7 += 0.4;
  }
  y7 += 0.1;
}
// Outlook box
s7.addShape(pptx.ShapeType.rect, { x: MARGIN_L, y: y7, w: CONTENT_W, h: 0.9, fill: { color: TAG_BG } });
s7.addShape(pptx.ShapeType.rect, { x: MARGIN_L, y: y7, w: 0.04, h: 0.9, fill: { color: BLACK } });
s7.addText('POLICY & OUTLOOK', { x: MARGIN_L + 0.15, y: y7 + 0.05, w: 3, h: 0.15, fontSize: 6.5, color: TERTIARY, fontFace: MONO });
s7.addText(chinaSection.outlook, { x: MARGIN_L + 0.15, y: y7 + 0.2, w: CONTENT_W - 0.3, h: 0.65, fontSize: 9.5, color: BODY, fontFace: FONT, lineSpacingMultiple: 1.5 });

// ==================== SLIDE 8: ACADEMIC ====================
const s8 = pptx.addSlide();
addPageHeader(s8);
addPageFooter(s8, 8, TOTAL);
let y8 = addSectionHeader(s8, 0.7, '06', '学术与研究前沿', 'Academic & Research');
for (const a of academic) {
  s8.addText(a.title, { x: MARGIN_L, y: y8, w: CONTENT_W, h: 0.25, fontSize: 12, color: DARK, fontFace: FONT, bold: true });
  s8.addText(a.text, { x: MARGIN_L, y: y8 + 0.28, w: CONTENT_W, h: 0.55, fontSize: 10, color: BODY, fontFace: FONT, lineSpacingMultiple: 1.6 });
  y8 += 1.0;
  s8.addShape(pptx.ShapeType.line, { x: MARGIN_L, y: y8, w: CONTENT_W, h: 0, line: { color: BORDER, width: 0.3 } });
  y8 += 0.12;
}

// ==================== SLIDE 9: AI & SMART ====================
const s9 = pptx.addSlide();
addPageHeader(s9);
addPageFooter(s9, 9, TOTAL);
let y9 = addSectionHeader(s9, 0.7, '07', 'AI 与智能化', 'AI & Smart Manufacturing');
for (const a of aiSmart) {
  s9.addText(a.title, { x: MARGIN_L, y: y9, w: CONTENT_W, h: 0.25, fontSize: 12, color: DARK, fontFace: FONT, bold: true });
  s9.addText(a.text, { x: MARGIN_L, y: y9 + 0.28, w: CONTENT_W, h: 0.55, fontSize: 10, color: BODY, fontFace: FONT, lineSpacingMultiple: 1.6 });
  y9 += 1.0;
  s9.addShape(pptx.ShapeType.line, { x: MARGIN_L, y: y9, w: CONTENT_W, h: 0, line: { color: BORDER, width: 0.3 } });
  y9 += 0.12;
}

// ==================== SLIDE 10: DESIGN TRENDS ====================
const sDesign = pptx.addSlide();
addPageHeader(sDesign);
addPageFooter(sDesign, 10, TOTAL);
let yDesign = addSectionHeader(sDesign, 0.7, '08', '产品与体验设计', 'Product & Experience Design');
for (const a of designTrends.slice(0, 4)) {
  sDesign.addText(a.title, { x: MARGIN_L, y: yDesign, w: CONTENT_W, h: 0.25, fontSize: 12, color: DARK, fontFace: FONT, bold: true });
  sDesign.addText(a.text, { x: MARGIN_L, y: yDesign + 0.28, w: CONTENT_W, h: 0.55, fontSize: 10, color: BODY, fontFace: FONT, lineSpacingMultiple: 1.6 });
  yDesign += 1.0;
  sDesign.addShape(pptx.ShapeType.line, { x: MARGIN_L, y: yDesign, w: CONTENT_W, h: 0, line: { color: BORDER, width: 0.3 } });
  yDesign += 0.12;
}

// ==================== SLIDE 11: POLICY ====================
const s10 = pptx.addSlide();
addPageHeader(s10);
addPageFooter(s10, 11, TOTAL);
let y10 = addSectionHeader(s10, 0.7, '09', '政策与地缘', 'Policy & Geopolitics');
for (const p of policy) {
  s10.addShape(pptx.ShapeType.rect, { x: MARGIN_L, y: y10, w: 1, h: 0.2, fill: { color: TAG_BG }, rectRadius: 0.02 });
  s10.addText(p.tag.toUpperCase(), { x: MARGIN_L + 0.05, y: y10, w: 0.9, h: 0.2, fontSize: 6.5, color: SECONDARY, fontFace: MONO, align: 'center' });
  s10.addText(p.title, { x: MARGIN_L, y: y10 + 0.28, w: CONTENT_W, h: 0.25, fontSize: 13, color: DARK, fontFace: FONT, bold: true });
  s10.addText(p.text, { x: MARGIN_L, y: y10 + 0.55, w: CONTENT_W, h: 0.6, fontSize: 10, color: BODY, fontFace: FONT, lineSpacingMultiple: 1.6 });
  y10 += 1.35;
  s10.addShape(pptx.ShapeType.line, { x: MARGIN_L, y: y10, w: CONTENT_W, h: 0, line: { color: BORDER, width: 0.3 } });
  y10 += 0.15;
}

// Landscape box
s10.addShape(pptx.ShapeType.rect, { x: MARGIN_L, y: y10, w: CONTENT_W, h: 0.8, fill: { color: TAG_BG } });
s10.addShape(pptx.ShapeType.rect, { x: MARGIN_L, y: y10, w: 0.04, h: 0.8, fill: { color: BLACK } });
s10.addText('FAB EXPANSION', { x: MARGIN_L + 0.15, y: y10 + 0.05, w: 3, h: 0.15, fontSize: 6.5, color: TERTIARY, fontFace: MONO });
s10.addText(landscape, { x: MARGIN_L + 0.15, y: y10 + 0.2, w: CONTENT_W - 0.3, h: 0.55, fontSize: 9.5, color: BODY, fontFace: FONT, lineSpacingMultiple: 1.5 });

// ==================== SLIDE 12: READING ====================
const s11 = pptx.addSlide();
addPageHeader(s11);
addPageFooter(s11, 12, TOTAL);
let y11 = addSectionHeader(s11, 0.7, '10', '值得一读', 'Worth Reading');
reading.forEach((r, i) => {
  s11.addText(String(i + 1).padStart(2, '0'), { x: MARGIN_L, y: y11, w: 0.4, h: 0.3, fontSize: 18, color: BORDER, fontFace: MONO });
  s11.addText(r.title, { x: MARGIN_L + 0.5, y: y11, w: CONTENT_W - 0.5, h: 0.25, fontSize: 11, color: DARK, fontFace: FONT, bold: true });
  s11.addText(r.source, { x: MARGIN_L + 0.5, y: y11 + 0.25, w: 3, h: 0.15, fontSize: 7, color: TERTIARY, fontFace: MONO });
  s11.addText(r.desc, { x: MARGIN_L + 0.5, y: y11 + 0.42, w: CONTENT_W - 0.5, h: 0.3, fontSize: 9, color: SECONDARY, fontFace: FONT, lineSpacingMultiple: 1.4 });
  y11 += 0.9;
  s11.addShape(pptx.ShapeType.line, { x: MARGIN_L, y: y11, w: CONTENT_W, h: 0, line: { color: BORDER, width: 0.3 } });
  y11 += 0.1;
});

// ==================== SLIDE 13: CALENDAR ====================
const s12 = pptx.addSlide();
addPageHeader(s12);
addPageFooter(s12, 13, TOTAL);
let y12 = addSectionHeader(s12, 0.7, '11', '关键日程', 'Upcoming Events');
for (const c of calendar) {
  s12.addText(c.date, { x: MARGIN_L, y: y12, w: 1, h: 0.35, fontSize: 8, color: TERTIARY, fontFace: MONO });
  s12.addShape(pptx.ShapeType.line, { x: MARGIN_L + 1.05, y: y12, w: 0, h: 0.35, line: { color: BORDER, width: 0.3 } });
  s12.addText(c.event, { x: MARGIN_L + 1.2, y: y12, w: CONTENT_W - 1.2, h: 0.35, fontSize: 11, color: BODY, fontFace: FONT });
  s12.addShape(pptx.ShapeType.line, { x: MARGIN_L, y: y12 + 0.38, w: CONTENT_W, h: 0, line: { color: BORDER, width: 0.3 } });
  y12 += 0.5;
}

// ---- 输出 ----
const outPath = new URL('./report-2026-W15.pptx', import.meta.url).pathname;
await pptx.writeFile({ fileName: outPath });
console.log(`PPTX generated: ${outPath}`);
