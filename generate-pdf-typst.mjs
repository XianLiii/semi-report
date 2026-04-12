// ============================================================
// Semiconductor Weekly — PDF Generator (Typst-based)
// Full rewrite. Reads data.mjs, emits .typ, compiles to PDF.
// ============================================================
import {
  meta, digest, market, equipment, techFrontier, chinaSection,
  academic, aiSmart, aiSmartOutro,
  designTrends, designTrendsOutro,
  policy, landscape, reading, calendar,
} from './data.mjs';
import fs from 'fs';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const typSource = join(__dirname, 'report-2026-W15.typ');
const pdfPath = join(__dirname, 'report-2026-W15.pdf');

// ============================================================
// ESCAPE HELPERS
// ============================================================

// Escape a string for Typst string literals ("...")
const esc = (s) =>
  s == null ? '' : String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"');

// Escape text for Typst CONTENT mode [ ... ]
// Preserves <strong> → #strong[...]
function md(s) {
  if (s == null) return '';
  let text = String(s)
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&middot;/g, '·')
    .replace(/&asymp;/g, '≈')
    .replace(/&sup2;/g, '²')
    .replace(/&sub2;/g, '₂')
    .replace(/&nbsp;/g, ' ');

  // Extract <strong> spans
  const strongs = [];
  text = text.replace(/<strong>([\s\S]*?)<\/strong>/g, (_, inner) => {
    strongs.push(inner);
    return `\x00STRONG${strongs.length - 1}\x00`;
  });

  // Strip other tags
  text = text.replace(/<br\s*\/?>/g, ' ').replace(/<[^>]+>/g, '');

  // Escape Typst content-mode special chars
  const escContent = (s) =>
    s
      .replace(/\\/g, '\\\\')
      .replace(/\$/g, '\\$')
      .replace(/#/g, '\\#')
      .replace(/@/g, '\\@')
      .replace(/\[/g, '\\[')
      .replace(/\]/g, '\\]')
      .replace(/_/g, '\\_')
      .replace(/\*/g, '\\*')
      .replace(/`/g, '\\`')
      .replace(/</g, '\\<')
      .replace(/>/g, '\\>');

  text = escContent(text);

  // Restore <strong> as #strong[...]
  text = text.replace(/\x00STRONG(\d+)\x00/g, (_, i) => {
    return `#strong[${escContent(strongs[parseInt(i, 10)])}]`;
  });

  return text;
}

// Render source list as inline clickable links
function srcs(sources) {
  if (!sources || sources.length === 0) return '';
  const links = sources.map((s) =>
    `#h(3pt)#link("${esc(s.url)}")[#text(size: 6.5pt, fill: rgb("#999"), font: "Menlo")[${md(s.name)}]]`
  );
  return links.join('');
}

// ============================================================
// TYPST SOURCE
// ============================================================

const typ = `
#set document(title: "${esc(meta.title)}")

// ---------- Page setup ----------
#set page(
  paper: "a4",
  margin: (top: 22mm, bottom: 22mm, left: 22mm, right: 22mm),
  header: context {
    if counter(page).get().first() > 1 [
      #block(spacing: 0pt)[
        #set text(size: 6.5pt, fill: rgb("#999"), font: ("Helvetica Neue", "PingFang SC"))
        #grid(
          columns: (1fr, auto),
          align(left)[SEMICONDUCTOR WEEKLY],
          align(right)[${esc(meta.dateRange)}],
        )
        #v(3pt)
        #line(length: 100%, stroke: 0.4pt + rgb("#141414"))
      ]
    ]
  },
  footer: context {
    if counter(page).get().first() > 1 [
      #block(spacing: 0pt)[
        #line(length: 100%, stroke: 0.3pt + rgb("#e0e0e0"))
        #v(3pt)
        #set text(size: 6.5pt, fill: rgb("#999"), font: ("Menlo", "Courier New"))
        #grid(
          columns: (1fr, auto),
          align(left)[Confidential],
          align(right)[#counter(page).display() / 9],
        )
      ]
    ]
  },
)

// ---------- Global typography ----------
#set text(
  font: ("PingFang SC", "Helvetica Neue", "Arial"),
  size: 10pt,
  lang: "zh",
  fill: rgb("#333"),
)
#set par(justify: false, leading: 0.72em)

// ---------- Helpers ----------

// Section head: red number / Chinese title / English subtitle
// Each row is an explicit table row so spacing is predictable.
#let sectionHead(num, titleCn, titleEn) = block(below: 20pt)[
  #table(
    columns: 1,
    stroke: none,
    inset: 0pt,
    row-gutter: 5pt,
    align: left,
    [#text(size: 8pt, fill: rgb("#c0392b"), font: "Menlo")[#num]],
    [#text(size: 19pt, weight: "bold", fill: rgb("#141414"))[#titleCn]],
    [#text(size: 8pt, fill: rgb("#999"), font: "Menlo")[#upper(titleEn)]],
  )
]

// Separator between two sections on the same page
#let sectionSeparator = v(14mm)

// Tag (small pill)
#let pill(label, bg: "#f5f5f3", color: "#666") = box(
  fill: rgb(bg),
  inset: (x: 4pt, y: 1.5pt),
  outset: (y: 0.5pt),
  radius: 2pt,
)[
  #text(size: 6.5pt, fill: rgb(color), font: "Menlo", weight: "medium")[#label]
]

// Digest item
#let digestItem(num, tagLabel, body) = block(
  below: 4pt,
  stroke: (bottom: 0.3pt + rgb("#efefef")),
  inset: (bottom: 4pt),
)[
  #grid(
    columns: (6mm, 16mm, 1fr),
    column-gutter: 3mm,
    align: (left + horizon, left + horizon, left + horizon),
    text(size: 7.5pt, fill: rgb("#999"), font: "Menlo")[#num],
    pill(tagLabel),
    text(size: 10pt, weight: "medium", fill: rgb("#1a1a1a"))[#body],
  )
]

// Stock card
#let stockCard(ticker, name, price, change, isUp, note) = {
  let changeColor = if isUp { "#16a34a" } else { "#dc2626" }
  let arrow = if isUp { "▲" } else { "▼" }
  box(
    stroke: 0.3pt + rgb("#e0e0e0"),
    inset: (x: 5mm, y: 4mm),
    width: 100%,
  )[
    #text(size: 6.5pt, fill: rgb("#999"), font: "Menlo")[#ticker] \\
    #text(size: 8pt, weight: "medium", fill: rgb("#1a1a1a"))[#name] \\
    #v(2mm)
    #text(size: 16pt, weight: "medium", fill: rgb("#141414"), font: "Menlo")[#price] \\
    #v(1mm)
    #text(size: 8pt, fill: rgb(changeColor), font: "Menlo")[#arrow #change] \\
    #v(1.5mm)
    #text(size: 7pt, fill: rgb("#999"))[#note]
  ]
}

// Company block: name + ticker, optional highlight, event list
#let companyBlock(name, ticker, events, highlight: none) = block(
  below: 5mm,
  stroke: (bottom: 0.3pt + rgb("#efefef")),
  inset: (bottom: 4mm),
)[
  #grid(
    columns: (1fr, auto),
    align: (left + horizon, right + horizon),
    text(size: 11pt, weight: "bold", fill: rgb("#141414"))[#name],
    text(size: 6.5pt, fill: rgb("#999"), font: "Menlo")[#ticker],
  )
  #v(2.5mm)

  #if highlight != none [
    #block(
      fill: rgb("#fdf8f7"),
      stroke: (left: 2pt + rgb("#c0392b")),
      inset: (x: 3mm, y: 2.5mm),
      below: 3mm,
      width: 100%,
    )[
      #text(size: 9pt, weight: "medium", fill: rgb("#1a1a1a"))[#highlight]
    ]
  ]

  #for evt in events [
    #block(below: 1.5mm, spacing: 0pt)[
      #grid(
        columns: (13mm, 1fr),
        column-gutter: 3mm,
        align: (left + top, left + top),
        text(size: 6.5pt, fill: rgb("#999"), font: "Menlo")[#evt.at(0)],
        text(size: 9pt, fill: rgb("#333"))[#evt.at(1)],
      )
    ]
  ]
]

// Simple item (tech, academic, AI, design)
#let item(title, body) = block(
  below: 4mm,
  stroke: (bottom: 0.3pt + rgb("#efefef")),
  inset: (bottom: 3.5mm),
)[
  #text(size: 10pt, weight: "bold", fill: rgb("#1a1a1a"))[#title]
  #v(1.5mm)
  #text(size: 9pt, fill: rgb("#333"))[#body]
]

// Highlight box
#let hlBox(label, body) = block(
  fill: rgb("#f5f5f3"),
  stroke: (left: 2pt + rgb("#141414")),
  inset: (x: 5mm, y: 3.5mm),
  below: 4mm,
  width: 100%,
)[
  #text(size: 6.5pt, fill: rgb("#999"), font: "Menlo", tracking: 0.5pt)[#upper(label)]
  #v(1.5mm)
  #text(size: 9pt, fill: rgb("#333"))[#body]
]

// Policy item
#let policyItem(tag, title, body) = block(
  below: 4mm,
  stroke: (bottom: 0.3pt + rgb("#efefef")),
  inset: (bottom: 3.5mm),
)[
  #box(
    fill: rgb("#eff6ff"),
    inset: (x: 4pt, y: 1.5pt),
    radius: 2pt,
  )[
    #text(size: 6pt, fill: rgb("#1e40af"), font: "Menlo", tracking: 0.3pt)[#upper(tag)]
  ]
  #v(2mm)
  #text(size: 10pt, weight: "bold", fill: rgb("#1a1a1a"))[#title]
  #v(1.5mm)
  #text(size: 9pt, fill: rgb("#333"))[#body]
]

// Reading item
#let readingItem(num, title, source, desc, url) = block(
  below: 3.5mm,
  stroke: (bottom: 0.3pt + rgb("#efefef")),
  inset: (bottom: 3mm),
)[
  #grid(
    columns: (9mm, 1fr),
    column-gutter: 2mm,
    align: (left + top, left + top),
    text(size: 14pt, fill: rgb("#e0e0e0"), font: "Menlo")[#num],
    [
      #link(url)[#text(size: 9pt, weight: "semibold", fill: rgb("#1a1a1a"))[#title]]
      #v(1mm, weak: true) \\
      #text(size: 6.5pt, fill: rgb("#999"), font: "Menlo")[#source]
      #v(1mm, weak: true) \\
      #text(size: 8pt, fill: rgb("#666"))[#desc]
    ],
  )
]

// ================================================================
// PAGE 1 — COVER
// ================================================================
#block(spacing: 0pt, height: 100%)[
  // Top bar
  #grid(
    columns: (1fr, auto),
    text(size: 8pt, weight: "semibold", fill: rgb("#666"), tracking: 1.5pt)[SEMICONDUCTOR WEEKLY],
    align(right)[
      #text(size: 7.5pt, fill: rgb("#999"), font: "Menlo")[Vol.01 / No.15 \\ ${esc(meta.dateRange)}]
    ],
  )
  #v(4pt)
  #line(length: 100%, stroke: 0.5pt + rgb("#141414"))

  #v(1fr)

  // Middle
  #text(size: 7pt, fill: rgb("#c0392b"), font: "Menlo", tracking: 1pt)[WEEKLY BRIEFING]
  #v(8mm)
  #text(size: 28pt, weight: "black", fill: rgb("#141414"))[${md(meta.title).replace('，', '，\\\n')}]
  #v(10mm)
  #block(
    stroke: (left: 2pt + rgb("#e0e0e0")),
    inset: (left: 5mm),
    width: 130mm,
  )[
    #text(size: 11pt, weight: "light", fill: rgb("#666"))[${md(meta.subtitle)}]
  ]

  #v(1fr)

  #line(length: 100%, stroke: 0.3pt + rgb("#e0e0e0"))
  #v(4pt)
  #grid(
    columns: (1fr, auto),
    text(size: 7.5pt, fill: rgb("#999"))[半导体工艺装备行业追踪 \\ 内部参考 · 每周一刊],
    box(stroke: 0.3pt + rgb("#e0e0e0"), inset: (x: 10pt, y: 4pt))[
      #text(size: 6.5pt, fill: rgb("#999"), font: "Menlo", tracking: 1pt)[CONFIDENTIAL]
    ],
  )
]

#pagebreak()

// ================================================================
// PAGE 2 — 01 本周速览 + 02 市场脉搏
// ================================================================
#sectionHead("01", "本周速览", "Weekly Digest")

${digest.map((d, i) =>
  `#digestItem("${String(i + 1).padStart(2, '0')}", "${esc(d.tag)}", [${md(d.text)}${srcs(d.sources)}])`
).join('\n')}

#sectionSeparator

#sectionHead("02", "市场脉搏", "Market Pulse")

#block(
  fill: rgb("#f5f5f3"),
  stroke: (left: 2pt + rgb("#141414")),
  inset: (x: 5mm, y: 3mm),
  below: 4mm,
  width: 100%,
)[
  #grid(
    columns: (1fr, auto),
    align: (left + horizon, right + horizon),
    text(size: 9pt, fill: rgb("#666"))[#strong[SOX] 费城半导体指数],
    [
      #text(size: 15pt, weight: "medium", fill: rgb("#141414"), font: "Menlo")[${esc(market.sox.value)}] \\
      #text(size: 6.5pt, fill: rgb("#999"), font: "Menlo")[52W High: ${esc(market.sox.high52w)} · ${esc(market.sox.offPeak)} off peak]
    ],
  )
]

#grid(
  columns: (1fr, 1fr),
  column-gutter: 3mm,
  row-gutter: 3mm,
${market.stocks.map(s =>
  `  stockCard("${esc(s.ticker)}", "${esc(s.name)}", "${esc(s.price)}", "${esc(s.change)} (${esc(s.date)})", ${s.up}, "${esc(s.note)}")`
).join(',\n')}
)

#pagebreak()

// ================================================================
// PAGE 3 — 03 设备巨头动态
// ================================================================
#sectionHead("03", "设备巨头动态", "Equipment Giants")

${equipment.map(co => `#companyBlock(
  "${esc(co.name)}",
  "${esc(co.ticker)}",
  (
${co.events.map(([d, t, srcList]) =>
  `    ("${esc(d)}", [${md(t)}${srcs(srcList)}]),`
).join('\n')}
  ),
  highlight: ${co.highlight
    ? `[${md(co.highlight)}${srcs(co.highlightSources)}]`
    : 'none'}
)`).join('\n\n')}

#pagebreak()

// ================================================================
// PAGE 4 — 04 中国半导体动态
// ================================================================
#sectionHead("04", "中国半导体动态", "China Semiconductor")

${chinaSection.companies.map(co => `#companyBlock(
  "${esc(co.name)}",
  "${esc(co.ticker)}",
  (
${co.events.map(([d, t, srcList]) =>
  `    ("${esc(d)}", [${md(t)}${srcs(srcList)}]),`
).join('\n')}
  ),
  highlight: ${co.highlight
    ? `[${md(co.highlight)}${srcs(co.highlightSources)}]`
    : 'none'}
)`).join('\n\n')}

#hlBox("Policy & Outlook", [${md(chinaSection.outlook)}${srcs(chinaSection.outlookSources)}])

#pagebreak()

// ================================================================
// PAGE 5 — 05 前沿技术 + 06 学术研究
// ================================================================
#sectionHead("05", "前沿技术", "Tech Frontier")

${techFrontier.map(t =>
  `#item([${md(t.title)}], [${md(t.text)}${srcs(t.sources)}])`
).join('\n')}

#sectionSeparator

#sectionHead("06", "学术研究", "Academic Research")

${academic.map(a =>
  `#item([${md(a.title)}], [${md(a.text)}${srcs(a.sources)}])`
).join('\n')}

#pagebreak()

// ================================================================
// PAGE 6 — 07 AI 与智能化
// ================================================================
#sectionHead("07", "AI 与智能化", "AI & Smart Manufacturing")

${aiSmart.map(a =>
  `#item([${md(a.title)}], [${md(a.text)}${srcs(a.sources)}])`
).join('\n')}

#hlBox("${esc(aiSmartOutro.label)}", [${md(aiSmartOutro.text)}${srcs(aiSmartOutro.sources)}])

#pagebreak()

// ================================================================
// PAGE 7 — 08 产品与体验设计
// ================================================================
#sectionHead("08", "产品与体验设计", "Product & Experience Design")

${designTrends.map(d =>
  `#item([${md(d.title)}], [${md(d.text)}${srcs(d.sources)}])`
).join('\n')}

#hlBox("${esc(designTrendsOutro.label)}", [${md(designTrendsOutro.text)}${srcs(designTrendsOutro.sources)}])

#pagebreak()

// ================================================================
// PAGE 8 — 09 政策与地缘 + 10 产业格局
// ================================================================
#sectionHead("09", "政策与地缘", "Policy & Geopolitics")

${policy.map(p => `#policyItem(
  "${esc(p.tag)}",
  [${md(p.title)}],
  [${md(p.text)}${srcs(p.sources)}]
)`).join('\n\n')}

#sectionSeparator

#sectionHead("10", "产业格局", "Industry Landscape")

#hlBox("Fab Expansion", [${md(landscape.text)}${srcs(landscape.sources)}])

#pagebreak()

// ================================================================
// PAGE 9 — 11 值得一读 + 12 关键日程
// ================================================================
#sectionHead("11", "值得一读", "Worth Reading")

${reading.slice(0, 3).map((r, i) =>
  `#readingItem("${String(i + 1).padStart(2, '0')}", [${md(r.title)}], [${md(r.source)}], [${md(r.desc)}], "${esc(r.url)}")`
).join('\n')}

#sectionSeparator

#sectionHead("12", "关键日程", "Upcoming Events")

#table(
  columns: (20mm, 1fr),
  inset: (x: 0mm, y: 2.2mm),
  stroke: (x, y) => (
    bottom: 0.3pt + rgb("#efefef"),
    right: if x == 0 { 0.3pt + rgb("#efefef") } else { none },
  ),
  align: (left + horizon, left + horizon),
${calendar.slice(0, 7).map(c =>
  `  text(size: 7pt, fill: rgb("#999"), font: "Menlo")[${md(c.date)}], text(size: 9pt, fill: rgb("#333"))[${md(c.event)}]`
).join(',\n')}
)
`;

fs.writeFileSync(typSource, typ);
console.log(`Typst source written: ${typSource}`);

try {
  execSync(`typst compile "${typSource}" "${pdfPath}"`, {
    cwd: __dirname,
    stdio: 'inherit',
  });
  console.log(`PDF generated: ${pdfPath}`);
} catch {
  console.error('Typst compilation failed');
  process.exit(1);
}
