// ============================================================
// Typst-based PDF generator
// Reads data.mjs, produces a .typ source file, then compiles to PDF
// No HTML intermediary — precise paged control
// ============================================================
import {
  meta, digest, market, equipment, techFrontier, chinaSection,
  academic, aiSmart, designTrends, policy, landscape, reading, calendar
} from './data.mjs';
import fs from 'fs';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const typSource = join(__dirname, 'report-2026-W15.typ');
const pdfPath = join(__dirname, 'report-2026-W15.pdf');

// Escape for Typst string literals (backslash, quote)
function esc(s) {
  if (s == null) return '';
  return String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

// Escape Typst content-mode special characters.
// Used for text that goes inside [content blocks].
// We want to preserve bold (<strong> → #strong[...]).
function content(s) {
  if (s == null) return '';
  let text = String(s)
    // Normalize entities first
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&middot;/g, '·')
    .replace(/&asymp;/g, '≈')
    .replace(/&sup2;/g, '²')
    .replace(/&sub2;/g, '₂')
    .replace(/&nbsp;/g, ' ');

  // Extract <strong> spans BEFORE escaping
  const strongs = [];
  text = text.replace(/<strong>(.*?)<\/strong>/g, (_, inner) => {
    const idx = strongs.length;
    strongs.push(inner);
    return `\x00STRONG${idx}\x00`;
  });

  // Strip remaining tags
  text = text.replace(/<br\s*\/?>/g, ' ').replace(/<[^>]+>/g, '');

  // Escape Typst content-mode special chars
  // Backslash first!
  text = text
    .replace(/\\/g, '\\\\')
    .replace(/\$/g, '\\$')   // dollar → escaped (avoid math mode)
    .replace(/#/g, '\\#')
    .replace(/@/g, '\\@')
    .replace(/\[/g, '\\[')
    .replace(/\]/g, '\\]')
    .replace(/_/g, '\\_')
    .replace(/\*/g, '\\*')
    .replace(/`/g, '\\`')
    .replace(/</g, '\\<')
    .replace(/>/g, '\\>');

  // Restore strong markers as #strong[...]
  text = text.replace(/\x00STRONG(\d+)\x00/g, (_, idx) => {
    const inner = strongs[parseInt(idx, 10)];
    // Recursively escape inner content (dollar sign etc)
    const escInner = inner
      .replace(/\\/g, '\\\\')
      .replace(/\$/g, '\\$')
      .replace(/#/g, '\\#')
      .replace(/@/g, '\\@')
      .replace(/\[/g, '\\[')
      .replace(/\]/g, '\\]')
      .replace(/_/g, '\\_')
      .replace(/\*/g, '\\*');
    return `#strong[${escInner}]`;
  });

  return text;
}

// Legacy alias
const strip = content;

// Render a list of sources as inline Typst code: clickable #link calls
// separated by small spaces. Output is meant to be appended after content.
function sourcesInline(sources) {
  if (!sources || sources.length === 0) return '';
  const links = sources.map(s => {
    // URL in Typst string needs backslash escaping
    const safeUrl = esc(s.url);
    // Name is content-mode, escape special chars
    const safeName = content(s.name);
    return `#link("${safeUrl}")[#text(size: 6.5pt, fill: rgb("#999"), font: "Menlo")[${safeName}]]`;
  });
  return ' ' + links.join('  ');
}

// Typst source with inline template
const typst = `
// ================================================================
// Semiconductor Weekly — W15
// Generated from data.mjs via generate-pdf-typst.mjs
// ================================================================

#set document(title: "${esc(meta.title)}")
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
          align(right)[${content(meta.dateRange)}]
        )
        #v(3pt)
        #line(length: 100%, stroke: 0.3pt + rgb("#141414"))
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
          align(right)[#counter(page).display() / ${12}]
        )
      ]
    ]
  },
)

#set text(
  font: ("PingFang SC", "Helvetica Neue", "Arial"),
  size: 10pt,
  lang: "zh",
  fill: rgb("#333333"),
)
#set par(justify: false, leading: 0.7em)

// ---- Helper functions ----

#let sectionHead(num, titleCn, titleEn) = [
  #block(above: 0pt, below: 8pt)[
    #text(size: 7pt, fill: rgb("#c0392b"), font: "Menlo")[#num]
    #v(2pt)
    #text(size: 18pt, weight: "bold", fill: rgb("#141414"))[#titleCn]
    #v(1pt)
    #text(size: 7pt, fill: rgb("#999"), font: "Menlo")[#upper(titleEn)]
  ]
]

#let srcLink(name, url: none) = {
  if url != none {
    box[
      #link(url)[
        #text(size: 6.5pt, fill: rgb("#999"), font: "Menlo")[#name]
      ]
    ]
  } else {
    box[
      #text(size: 6.5pt, fill: rgb("#999"), font: "Menlo")[#name]
    ]
  }
}

// Render a list of sources as a row of clickable links
#let srcList(sources) = {
  if sources == none or sources.len() == 0 {
    []
  } else {
    sources.map(s => srcLink(s.name, url: s.url)).join("  ")
  }
}

#let tag(label, bg: "#f5f5f3", color: "#666666") = {
  box(
    fill: rgb(bg),
    inset: (x: 4pt, y: 1.5pt),
    radius: 2pt,
  )[
    #text(size: 6.5pt, fill: rgb(color), font: "Menlo")[#label]
  ]
}

#let digestItem(num, tagLabel, content) = [
  #block(
    below: 5pt,
    stroke: (bottom: 0.3pt + rgb("#efefef")),
    inset: (bottom: 5pt),
  )[
    #grid(
      columns: (6mm, 16mm, 1fr),
      column-gutter: 3mm,
      align: (left + top, left + top, left + top),
      text(size: 7.5pt, fill: rgb("#999"), font: "Menlo")[#num],
      tag(tagLabel),
      text(size: 10pt, weight: "medium", fill: rgb("#1a1a1a"))[#content]
    )
  ]
]

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

#let companyBlock(name, ticker, events, highlight: none) = [
  #block(
    below: 6mm,
    stroke: (bottom: 0.3pt + rgb("#efefef")),
    inset: (bottom: 5mm),
  )[
    #grid(
      columns: (1fr, auto),
      text(size: 11pt, weight: "bold", fill: rgb("#141414"))[#name],
      text(size: 6.5pt, fill: rgb("#999"), font: "Menlo")[#ticker]
    )
    #v(2mm)

    #if highlight != none [
      #block(
        fill: rgb("#fdf8f7"),
        stroke: (left: 2pt + rgb("#c0392b")),
        inset: (x: 3mm, y: 2mm),
        below: 3mm,
        width: 100%,
      )[
        #text(size: 9pt, weight: "medium", fill: rgb("#1a1a1a"))[#highlight]
      ]
    ]

    #for evt in events [
      #grid(
        columns: (12mm, 1fr),
        column-gutter: 3mm,
        align: (left + top, left + top),
        text(size: 6.5pt, fill: rgb("#999"), font: "Menlo")[#evt.at(0)],
        text(size: 9pt, fill: rgb("#333"))[#evt.at(1)]
      )
      #v(1.5mm)
    ]
  ]
]

#let item(title, content) = [
  #block(
    below: 5mm,
    stroke: (bottom: 0.3pt + rgb("#efefef")),
    inset: (bottom: 4mm),
  )[
    #text(size: 10pt, weight: "bold", fill: rgb("#1a1a1a"))[#title]
    #v(1.5mm)
    #text(size: 9pt, fill: rgb("#333"))[#content]
  ]
]

#let hlBox(label, content) = {
  block(
    fill: rgb("#f5f5f3"),
    stroke: (left: 2pt + rgb("#141414")),
    inset: (x: 5mm, y: 4mm),
    below: 4mm,
    width: 100%,
  )[
    #text(size: 6.5pt, fill: rgb("#999"), font: "Menlo")[#upper(label)]
    #v(1.5mm)
    #text(size: 9pt, fill: rgb("#333"))[#content]
  ]
}

// ==================== PAGE 1: COVER ====================
#block(spacing: 0pt, height: 100%)[
  // Top bar
  #grid(
    columns: (1fr, auto),
    text(size: 8pt, weight: "semibold", fill: rgb("#666"), tracking: 1.5pt)[SEMICONDUCTOR WEEKLY],
    align(right)[
      #text(size: 7.5pt, fill: rgb("#999"), font: "Menlo")[Vol.01 / No.15 \\ ${content(meta.dateRange)}]
    ]
  )
  #v(4pt)
  #line(length: 100%, stroke: 0.5pt + rgb("#141414"))

  #v(1fr)

  // Middle
  #text(size: 7pt, fill: rgb("#c0392b"), font: "Menlo", tracking: 1pt)[WEEKLY BRIEFING]
  #v(8mm)
  #text(size: 28pt, weight: "black", fill: rgb("#141414"))[${content(meta.title).replace('，', '，\\\n')}]
  #v(10mm)
  #block(
    stroke: (left: 2pt + rgb("#e0e0e0")),
    inset: (left: 5mm),
    width: 130mm,
  )[
    #text(size: 11pt, weight: "light", fill: rgb("#666"))[${content(meta.subtitle)}]
  ]

  #v(1fr)

  #line(length: 100%, stroke: 0.3pt + rgb("#e0e0e0"))
  #v(4pt)
  #grid(
    columns: (1fr, auto),
    text(size: 7.5pt, fill: rgb("#999"))[半导体工艺装备行业追踪 \\ 内部参考 · 每周一刊],
    box(
      stroke: 0.3pt + rgb("#e0e0e0"),
      inset: (x: 10pt, y: 4pt),
    )[
      #text(size: 6.5pt, fill: rgb("#999"), font: "Menlo", tracking: 1pt)[CONFIDENTIAL]
    ]
  )
]

#pagebreak()

// ==================== PAGE 2: DIGEST + MARKET (merged) ====================
#sectionHead("01", "本周速览", "Weekly Digest")

${digest.map((d, i) => `#digestItem("${String(i+1).padStart(2,'0')}", "${esc(d.tag)}", [${content(d.text)}${sourcesInline(d.sources)}])`).join('\n')}

#v(6mm)

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
    text(size: 9pt, fill: rgb("#666"))[*SOX* 费城半导体指数],
    [
      #text(size: 14pt, weight: "medium", fill: rgb("#141414"), font: "Menlo")[${market.sox.value}] \\
      #text(size: 6.5pt, fill: rgb("#999"), font: "Menlo")[52W High: ${market.sox.high52w} · ${market.sox.offPeak} off peak]
    ]
  )
]

#grid(
  columns: (1fr, 1fr),
  column-gutter: 3mm,
  row-gutter: 3mm,
${market.stocks.map(s => `  stockCard("${esc(s.ticker)}", "${esc(s.name)}", "${esc(s.price)}", "${esc(s.change)} (${esc(s.date)})", ${s.up}, "${esc(s.note)}")`).join(',\n')}
)

#pagebreak()

// ==================== PAGE 3: EQUIPMENT GIANTS (all 4 on one page) ====================
#sectionHead("03", "设备巨头动态", "Equipment Giants")

${equipment.map(co => `
#companyBlock(
  "${esc(co.name)}",
  "${esc(co.ticker)}",
  (
${co.events.map(([d, t, srcs]) => `    ("${esc(d)}", [${content(t)}${sourcesInline(srcs)}]),`).join('\n')}
  ),
  highlight: ${co.highlight ? `[${content(co.highlight)}${sourcesInline(co.highlightSources)}]` : 'none'}
)`).join('\n')}

#pagebreak()

// ==================== PAGE 5: CHINA ====================
#sectionHead("05", "中国半导体动态", "China Semiconductor")

${chinaSection.companies.map(co => `
#companyBlock(
  "${esc(co.name)}",
  "${esc(co.ticker)}",
  (
${co.events.map(([d, t, srcs]) => `    ("${esc(d)}", [${content(t)}${sourcesInline(srcs)}]),`).join('\n')}
  ),
  highlight: ${co.highlight ? `[${content(co.highlight)}${sourcesInline(co.highlightSources)}]` : 'none'}
)`).join('\n')}

#hlBox("Policy & Outlook", [${content(chinaSection.outlook)}${sourcesInline(chinaSection.outlookSources)}])

#pagebreak()

// ==================== PAGE: TECH FRONTIER + ACADEMIC (merged) ====================
#sectionHead("04", "前沿技术", "Tech Frontier")

${techFrontier.map(t => `#item([${content(t.title)}], [${content(t.text)}${sourcesInline(t.sources)}])`).join('\n')}

#v(6mm)

#sectionHead("06", "学术研究", "Academic Research")

${academic.map(a => `#item([${content(a.title)}], [${content(a.text)}${sourcesInline(a.sources)}])`).join('\n')}

#pagebreak()

// ==================== PAGE 9: AI & SMART ====================
#sectionHead("07", "AI 与智能化", "AI & Smart Manufacturing")

${aiSmart.map(a => `#item([${content(a.title)}], [${content(a.text)}${sourcesInline(a.sources)}])`).join('\n')}

#pagebreak()

// ==================== PAGE 10: DESIGN TRENDS ====================
#sectionHead("08", "产品与体验设计", "Product & Experience Design")

${designTrends.map(d => `#item([${content(d.title)}], [${content(d.text)}${sourcesInline(d.sources)}])`).join('\n')}

#pagebreak()

// ==================== PAGE 11: POLICY + LANDSCAPE ====================
#sectionHead("09", "政策与地缘", "Policy & Geopolitics")

${policy.map(p => `
#block(below: 4mm, stroke: (bottom: 0.3pt + rgb("#efefef")), inset: (bottom: 4mm))[
  #box(fill: rgb("#eff6ff"), inset: (x: 4pt, y: 1.5pt), radius: 2pt)[
    #text(size: 6pt, fill: rgb("#1e40af"), font: "Menlo", tracking: 0.3pt)[#upper("${esc(p.tag)}")]
  ]
  #v(2mm)
  #text(size: 10pt, weight: "bold", fill: rgb("#1a1a1a"))[${content(p.title)}]
  #v(1.5mm)
  #text(size: 9pt, fill: rgb("#333"))[${content(p.text)}${sourcesInline(p.sources)}]
]`).join('\n')}

#v(6mm)

#text(size: 7pt, fill: rgb("#c0392b"), font: "Menlo")[10]
#v(1pt)
#text(size: 14pt, weight: "bold", fill: rgb("#141414"))[产业格局]
#v(1pt)
#text(size: 7pt, fill: rgb("#999"), font: "Menlo")[INDUSTRY LANDSCAPE]
#v(4mm)

#hlBox("Fab Expansion", [${content(landscape.text)}${sourcesInline(landscape.sources)}])

#pagebreak()

// ==================== PAGE 12: READING + CALENDAR ====================
#sectionHead("11", "值得一读", "Worth Reading")

${reading.slice(0, 3).map((r, i) => `
#block(below: 4mm, stroke: (bottom: 0.3pt + rgb("#efefef")), inset: (bottom: 4mm))[
  #grid(
    columns: (10mm, 1fr),
    align: (left + top, left + top),
    text(size: 14pt, fill: rgb("#e0e0e0"), font: "Menlo")[${String(i+1).padStart(2,'0')}],
    [
      ${r.url ? `#link("${esc(r.url)}")[#text(size: 9pt, weight: "semibold", fill: rgb("#1a1a1a"))[${content(r.title)}]]` : `#text(size: 9pt, weight: "semibold", fill: rgb("#1a1a1a"))[${content(r.title)}]`} \\
      #v(1mm)
      #text(size: 6.5pt, fill: rgb("#999"), font: "Menlo")[${content(r.source)}] \\
      #v(1mm)
      #text(size: 8pt, fill: rgb("#666"))[${content(r.desc)}]
    ]
  )
]`).join('\n')}

#v(6mm)

#text(size: 7pt, fill: rgb("#c0392b"), font: "Menlo")[12]
#v(1pt)
#text(size: 14pt, weight: "bold", fill: rgb("#141414"))[关键日程]
#v(1pt)
#text(size: 7pt, fill: rgb("#999"), font: "Menlo")[UPCOMING EVENTS]
#v(4mm)

#table(
  columns: (20mm, 1fr),
  inset: (x: 0mm, y: 2.5mm),
  stroke: (x, y) => (bottom: 0.3pt + rgb("#efefef"), right: if x == 0 { 0.3pt + rgb("#efefef") } else { none }),
  align: (left + horizon, left + horizon),
${calendar.slice(0, 7).map(c => `  text(size: 7pt, fill: rgb("#999"), font: "Menlo")[${content(c.date)}], text(size: 9pt, fill: rgb("#333"))[${content(c.event)}]`).join(',\n')}
)
`;

fs.writeFileSync(typSource, typst);
console.log(`Typst source written: ${typSource}`);

// Compile with Typst
try {
  execSync(`typst compile "${typSource}" "${pdfPath}"`, {
    cwd: __dirname,
    stdio: 'inherit',
  });
  console.log(`PDF generated: ${pdfPath}`);
} catch (e) {
  console.error('Typst compilation failed');
  process.exit(1);
}
