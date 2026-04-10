import { Document, Packer, Paragraph, TextRun, Header, Footer, AlignmentType,
         PageNumber, PageBreak, BorderStyle, Table, TableRow, TableCell,
         WidthType, ShadingType, HeadingLevel, TabStopType, TabStopPosition,
         LevelFormat } from 'docx';
import fs from 'fs';
import { meta, digest, market, equipment, techFrontier, chinaSection,
         academic, aiSmart, policy, landscape, reading, calendar } from './data.mjs';

// ---- Colors ----
const RED = 'c0392b';
const BLACK = '141414';
const DARK = '1a1a1a';
const BODY = '333333';
const SECONDARY = '666666';
const TERTIARY = '999999';
const BORDER = 'e0e0e0';
const LIGHT_BDR = 'efefef';
const GREEN = '16a34a';
const DOWN_RED = 'dc2626';
const TAG_BG = 'f5f5f3';

// ---- Fonts ----
const FONT = 'PingFang SC';
const MONO = 'Menlo';

// ---- A4 page: 11906 x 16838 DXA ----
const PAGE_W = 11906;
const MARGIN = 1580; // ~28mm
const CONTENT_W = PAGE_W - MARGIN * 2;

// ---- Helpers ----
function sectionNum(num) {
  return new TextRun({ text: num, font: MONO, size: 14, color: RED, bold: true });
}

function sectionTitle(num, titleCN, subtitleEN) {
  return [
    new Paragraph({ spacing: { before: 360, after: 40 }, children: [sectionNum(num)] }),
    new Paragraph({
      spacing: { after: 40 },
      children: [new TextRun({ text: titleCN, font: FONT, size: 36, bold: true, color: BLACK })],
    }),
    new Paragraph({
      spacing: { after: 280 },
      children: [new TextRun({ text: subtitleEN.toUpperCase(), font: MONO, size: 14, color: TERTIARY })],
    }),
  ];
}

function bodyText(text, opts = {}) {
  const { bold = false, color = BODY, size = 21, spacing = { after: 160 } } = opts;
  return new Paragraph({
    spacing,
    children: [new TextRun({ text, font: FONT, size, color, bold, break: undefined })],
  });
}

function monoLabel(text) {
  return new TextRun({ text, font: MONO, size: 15, color: TERTIARY });
}

function dividerLine() {
  return new Paragraph({
    spacing: { before: 200, after: 200 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 1, color: LIGHT_BDR, space: 8 } },
    children: [],
  });
}

function eventRow(date, text) {
  return new Paragraph({
    spacing: { after: 100 },
    tabStops: [{ type: TabStopType.LEFT, position: 1200 }],
    children: [
      new TextRun({ text: date, font: MONO, size: 15, color: TERTIARY }),
      new TextRun({ text: '\t' }),
      new TextRun({ text, font: FONT, size: 20, color: BODY }),
    ],
  });
}

function highlightBox(label, text) {
  const border = { style: BorderStyle.SINGLE, size: 1, color: LIGHT_BDR };
  const leftAccent = { style: BorderStyle.SINGLE, size: 12, color: BLACK };
  return new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    columnWidths: [CONTENT_W],
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: CONTENT_W, type: WidthType.DXA },
            borders: { top: border, bottom: border, right: border, left: leftAccent },
            shading: { fill: TAG_BG, type: ShadingType.CLEAR },
            margins: { top: 120, bottom: 120, left: 200, right: 200 },
            children: [
              new Paragraph({ spacing: { after: 60 }, children: [new TextRun({ text: label.toUpperCase(), font: MONO, size: 13, color: TERTIARY })] }),
              new Paragraph({ spacing: { after: 0 }, children: [new TextRun({ text, font: FONT, size: 20, color: BODY })] }),
            ],
          }),
        ],
      }),
    ],
  });
}

// ---- Build document ----
const children = [];

// ==================== COVER ====================
children.push(
  new Paragraph({ spacing: { before: 600 }, children: [] }),
  new Paragraph({
    spacing: { after: 40 },
    children: [new TextRun({ text: 'WEEKLY BRIEFING', font: MONO, size: 15, color: RED, bold: true })],
  }),
  new Paragraph({
    spacing: { after: 280 },
    children: [new TextRun({ text: meta.title, font: FONT, size: 56, bold: true, color: BLACK })],
  }),
  new Paragraph({
    spacing: { after: 0 },
    border: { left: { style: BorderStyle.SINGLE, size: 6, color: BORDER, space: 12 } },
    children: [new TextRun({ text: meta.subtitle, font: FONT, size: 22, color: SECONDARY })],
  }),
);

// Spacer to push footer down
for (let i = 0; i < 16; i++) {
  children.push(new Paragraph({ spacing: { after: 100 }, children: [] }));
}

children.push(
  new Paragraph({
    spacing: { before: 200 },
    border: { top: { style: BorderStyle.SINGLE, size: 1, color: BORDER, space: 12 } },
    tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
    children: [
      new TextRun({ text: '半导体工艺装备行业追踪 | 内部参考 · 每周一刊', font: FONT, size: 16, color: TERTIARY }),
      new TextRun({ text: '\tCONFIDENTIAL', font: MONO, size: 13, color: TERTIARY }),
    ],
  }),
  new Paragraph({ children: [new PageBreak()] }),
);

// ==================== 01 DIGEST ====================
children.push(...sectionTitle('01', '本周速览', 'Weekly Digest'));
digest.forEach((d, i) => {
  children.push(new Paragraph({
    spacing: { after: 140 },
    border: { top: { style: BorderStyle.SINGLE, size: 1, color: LIGHT_BDR, space: 8 } },
    tabStops: [{ type: TabStopType.LEFT, position: 600 }, { type: TabStopType.LEFT, position: 1500 }],
    children: [
      new TextRun({ text: String(i + 1).padStart(2, '0'), font: MONO, size: 16, color: TERTIARY }),
      new TextRun({ text: '\t' }),
      new TextRun({ text: d.tag, font: MONO, size: 13, color: SECONDARY }),
      new TextRun({ text: '\t' }),
      new TextRun({ text: d.text, font: FONT, size: 20, color: DARK, bold: true }),
    ],
  }));
});

// ==================== 02 MARKET ====================
children.push(...sectionTitle('02', '市场脉搏', 'Market Pulse'));

// SOX
children.push(highlightBox('SOX 费城半导体指数', `${market.sox.value}    52W High: ${market.sox.high52w} · ${market.sox.offPeak} off peak`));
children.push(new Paragraph({ spacing: { after: 200 }, children: [] }));

// Stock table
const stockBorder = { style: BorderStyle.SINGLE, size: 1, color: BORDER };
const stockBorders = { top: stockBorder, bottom: stockBorder, left: stockBorder, right: stockBorder };
const colW = Math.floor(CONTENT_W / 4);

children.push(new Table({
  width: { size: CONTENT_W, type: WidthType.DXA },
  columnWidths: [colW, colW, colW, CONTENT_W - colW * 3],
  rows: [
    // Header
    new TableRow({
      children: ['Ticker', 'Price', 'Change', 'Note'].map((h, i) =>
        new TableCell({
          width: { size: i < 3 ? colW : CONTENT_W - colW * 3, type: WidthType.DXA },
          borders: stockBorders,
          shading: { fill: TAG_BG, type: ShadingType.CLEAR },
          margins: { top: 60, bottom: 60, left: 100, right: 100 },
          children: [new Paragraph({ children: [new TextRun({ text: h, font: MONO, size: 14, color: TERTIARY, bold: true })] })],
        })
      ),
    }),
    // Data rows
    ...market.stocks.map(s =>
      new TableRow({
        children: [
          new TableCell({
            width: { size: colW, type: WidthType.DXA }, borders: stockBorders,
            margins: { top: 80, bottom: 80, left: 100, right: 100 },
            children: [
              new Paragraph({ children: [new TextRun({ text: s.ticker, font: MONO, size: 16, color: DARK, bold: true })] }),
              new Paragraph({ children: [new TextRun({ text: s.name, font: FONT, size: 16, color: SECONDARY })] }),
            ],
          }),
          new TableCell({
            width: { size: colW, type: WidthType.DXA }, borders: stockBorders,
            margins: { top: 80, bottom: 80, left: 100, right: 100 },
            children: [new Paragraph({ children: [new TextRun({ text: s.price, font: MONO, size: 22, color: BLACK, bold: true })] })],
          }),
          new TableCell({
            width: { size: colW, type: WidthType.DXA }, borders: stockBorders,
            margins: { top: 80, bottom: 80, left: 100, right: 100 },
            children: [new Paragraph({ children: [new TextRun({ text: `${s.up ? '▲' : '▼'} ${s.change}`, font: MONO, size: 18, color: s.up ? GREEN : DOWN_RED, bold: true })] })],
          }),
          new TableCell({
            width: { size: CONTENT_W - colW * 3, type: WidthType.DXA }, borders: stockBorders,
            margins: { top: 80, bottom: 80, left: 100, right: 100 },
            children: [new Paragraph({ children: [new TextRun({ text: s.note, font: FONT, size: 16, color: TERTIARY })] })],
          }),
        ],
      })
    ),
  ],
}));

children.push(new Paragraph({ children: [new PageBreak()] }));

// ==================== 03 EQUIPMENT ====================
children.push(...sectionTitle('03', '设备巨头动态', 'Equipment Giants'));
for (const co of equipment) {
  children.push(new Paragraph({
    spacing: { before: 240, after: 60 },
    tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
    children: [
      new TextRun({ text: co.name, font: FONT, size: 26, bold: true, color: BLACK }),
      new TextRun({ text: `\t${co.ticker}`, font: MONO, size: 14, color: TERTIARY }),
    ],
  }));
  if (co.highlight) {
    children.push(new Paragraph({
      spacing: { after: 120 },
      border: { left: { style: BorderStyle.SINGLE, size: 12, color: RED, space: 12 } },
      shading: { fill: 'fdf8f7', type: ShadingType.CLEAR },
      children: [new TextRun({ text: co.highlight, font: FONT, size: 20, color: DARK, bold: true })],
    }));
  }
  for (const [date, text] of co.events) {
    children.push(eventRow(date, text));
  }
  children.push(dividerLine());
}

// ==================== 04 TECH ====================
children.push(new Paragraph({ children: [new PageBreak()] }));
children.push(...sectionTitle('04', '前沿技术', 'Tech Frontier'));
for (const t of techFrontier) {
  children.push(
    new Paragraph({ spacing: { after: 80 }, children: [new TextRun({ text: t.title, font: FONT, size: 24, bold: true, color: DARK })] }),
    bodyText(t.text),
    dividerLine(),
  );
}

// ==================== 05 CHINA ====================
children.push(...sectionTitle('05', '中国半导体动态', 'China Semiconductor'));
for (const co of chinaSection.companies) {
  children.push(new Paragraph({
    spacing: { before: 200, after: 60 },
    children: [
      new TextRun({ text: co.name, font: FONT, size: 22, bold: true, color: DARK }),
      new TextRun({ text: `  ${co.ticker}`, font: MONO, size: 14, color: TERTIARY }),
    ],
  }));
  for (const [d, t] of co.events) {
    children.push(eventRow(d, t));
  }
}
children.push(new Paragraph({ spacing: { before: 200 }, children: [] }));
children.push(highlightBox('Policy & Outlook', chinaSection.outlook));

// ==================== 06 ACADEMIC ====================
children.push(new Paragraph({ children: [new PageBreak()] }));
children.push(...sectionTitle('06', '学术与研究前沿', 'Academic & Research'));
for (const a of academic) {
  children.push(
    new Paragraph({ spacing: { after: 80 }, children: [new TextRun({ text: a.title, font: FONT, size: 24, bold: true, color: DARK })] }),
    bodyText(a.text),
    dividerLine(),
  );
}

// ==================== 07 AI & SMART ====================
children.push(...sectionTitle('07', 'AI 与智能化', 'AI & Smart Manufacturing'));
for (const a of aiSmart) {
  children.push(
    new Paragraph({ spacing: { after: 80 }, children: [new TextRun({ text: a.title, font: FONT, size: 24, bold: true, color: DARK })] }),
    bodyText(a.text),
    dividerLine(),
  );
}

// ==================== 08 POLICY ====================
children.push(new Paragraph({ children: [new PageBreak()] }));
children.push(...sectionTitle('08', '政策与地缘', 'Policy & Geopolitics'));
for (const p of policy) {
  children.push(
    new Paragraph({ spacing: { after: 40 }, children: [new TextRun({ text: p.tag.toUpperCase(), font: MONO, size: 13, color: SECONDARY })] }),
    new Paragraph({ spacing: { after: 80 }, children: [new TextRun({ text: p.title, font: FONT, size: 24, bold: true, color: DARK })] }),
    bodyText(p.text),
    dividerLine(),
  );
}

// Landscape box
children.push(...sectionTitle('09', '产业格局', 'Industry Landscape'));
children.push(highlightBox('Fab Expansion', landscape));

// ==================== 10 READING ====================
children.push(new Paragraph({ children: [new PageBreak()] }));
children.push(...sectionTitle('10', '值得一读', 'Worth Reading'));
reading.forEach((r, i) => {
  children.push(new Paragraph({
    spacing: { before: 200, after: 40 },
    children: [
      new TextRun({ text: String(i + 1).padStart(2, '0'), font: MONO, size: 28, color: LIGHT_BDR }),
      new TextRun({ text: `  ${r.title}`, font: FONT, size: 21, bold: true, color: DARK }),
    ],
  }));
  children.push(new Paragraph({ spacing: { after: 40 }, children: [new TextRun({ text: r.source, font: MONO, size: 14, color: TERTIARY })] }));
  children.push(bodyText(r.desc, { color: SECONDARY, size: 18 }));
  children.push(dividerLine());
});

// ==================== 11 CALENDAR ====================
children.push(...sectionTitle('11', '关键日程', 'Upcoming Events'));

const calBorder = { style: BorderStyle.SINGLE, size: 1, color: LIGHT_BDR };
const calBorders = { top: calBorder, bottom: calBorder, left: calBorder, right: calBorder };
children.push(new Table({
  width: { size: CONTENT_W, type: WidthType.DXA },
  columnWidths: [2000, CONTENT_W - 2000],
  rows: calendar.map(c =>
    new TableRow({
      children: [
        new TableCell({
          width: { size: 2000, type: WidthType.DXA },
          borders: calBorders,
          margins: { top: 80, bottom: 80, left: 100, right: 100 },
          children: [new Paragraph({ children: [new TextRun({ text: c.date, font: MONO, size: 16, color: TERTIARY })] })],
        }),
        new TableCell({
          width: { size: CONTENT_W - 2000, type: WidthType.DXA },
          borders: calBorders,
          margins: { top: 80, bottom: 80, left: 100, right: 100 },
          children: [new Paragraph({ children: [new TextRun({ text: c.event, font: FONT, size: 20, color: BODY })] })],
        }),
      ],
    })
  ),
}));

// ---- Document ----
const doc = new Document({
  styles: {
    default: {
      document: { run: { font: FONT, size: 21, color: BODY } },
    },
  },
  sections: [{
    properties: {
      page: {
        size: { width: 11906, height: 16838 }, // A4
        margin: { top: MARGIN, bottom: MARGIN, left: MARGIN, right: MARGIN },
      },
    },
    headers: {
      default: new Header({
        children: [new Paragraph({
          border: { bottom: { style: BorderStyle.SINGLE, size: 1, color: BLACK, space: 6 } },
          tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
          children: [
            new TextRun({ text: 'SEMICONDUCTOR WEEKLY', font: FONT, size: 13, color: TERTIARY, bold: true }),
            new TextRun({ text: `\t${meta.dateRange}`, font: MONO, size: 13, color: TERTIARY }),
          ],
        })],
      }),
    },
    footers: {
      default: new Footer({
        children: [new Paragraph({
          border: { top: { style: BorderStyle.SINGLE, size: 1, color: LIGHT_BDR, space: 6 } },
          tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
          children: [
            new TextRun({ text: 'Confidential', font: MONO, size: 13, color: TERTIARY }),
            new TextRun({ text: '\t' }),
            new TextRun({ children: [PageNumber.CURRENT], font: MONO, size: 13, color: TERTIARY }),
            new TextRun({ text: ' / ', font: MONO, size: 13, color: TERTIARY }),
            new TextRun({ children: [PageNumber.TOTAL_PAGES], font: MONO, size: 13, color: TERTIARY }),
          ],
        })],
      }),
    },
    children,
  }],
});

const buffer = await Packer.toBuffer(doc);
const outPath = '/Users/xian/AI/Claude/semi-report/report-2026-W15.docx';
fs.writeFileSync(outPath, buffer);
console.log(`DOCX generated: ${outPath}`);
