// ============================================================
// V2 PDF Generator: data-v2.mjs → Markdown → PDF (pandoc+typst)
// ============================================================
import {
  meta, digest, market, equipment, techFrontier, chinaSection,
  academic, aiSmart, aiSmartOutro,
  designTrends, designTrendsOutro,
  policy, landscape, reading, calendar, synthesis,
} from './data-v2.mjs';
import fs from 'fs';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const mdPath = join(__dirname, 'report-v2.md');
const pdfPath = join(__dirname, 'report-v2.pdf');

function srcLine(sources) {
  if (!sources || sources.length === 0) return '';
  return '\n> ' + sources.map(s => `[${s.name}](${s.url})`).join(' · ');
}

function whyBlock(why) {
  if (!why) return '';
  return `\n> **为什么重要：** ${why}\n`;
}

// Strip HTML tags from text
function clean(s) {
  if (!s) return '';
  return s.replace(/<\/?strong>/g, '**').replace(/<[^>]+>/g, '');
}

// ============================================================
// BUILD MARKDOWN
// ============================================================
let md = '';

// ---- Cover ----
md += `# ${meta.title}\n\n`;
md += `**${meta.brand}** · ${meta.vol} · ${meta.dateRange}\n\n`;
md += `${meta.subtitle}\n\n`;
md += `---\n\n`;

// ---- 01 Digest ----
md += `## 01 本周速览\n\n`;
digest.forEach((d, i) => {
  md += `**${String(i+1).padStart(2,'0')}** \`${d.tag}\` ${clean(d.text)}${srcLine(d.sources)}\n`;
  md += whyBlock(d.why);
  md += '\n';
});

// ---- 02 Market ----
md += `## 02 市场脉搏\n\n`;
md += `**SOX 费城半导体指数：${market.sox.value}** （52W High: ${market.sox.high52w} · ${market.sox.offPeak} off peak）\n\n`;
md += `| Ticker | 公司 | 价格 | 变动 | 备注 |\n`;
md += `|--------|------|------|------|------|\n`;
market.stocks.forEach(s => {
  md += `| ${s.ticker} | ${s.name} | ${s.price} | ${s.up ? '▲' : '▼'} ${s.change} (${s.date}) | ${s.note} |\n`;
});
md += '\n';

// ---- 03 Equipment Giants ----
md += `## 03 设备巨头动态\n\n`;
equipment.forEach(co => {
  md += `### ${co.name}\n`;
  md += `*${co.ticker}*\n\n`;
  if (co.highlight) {
    md += `> **${clean(co.highlight)}**${srcLine(co.highlightSources)}\n\n`;
  }
  if (co.why) {
    md += whyBlock(co.why);
    md += '\n';
  }
  co.events.forEach(([date, text, srcs]) => {
    md += `- **${date}** ${clean(text)}${srcLine(srcs || [])}\n`;
  });
  md += '\n---\n\n';
});

// ---- 04 Tech Frontier ----
md += `## 04 前沿技术\n\n`;
techFrontier.forEach(t => {
  md += `### ${t.title}\n\n`;
  md += `${clean(t.text)}${srcLine(t.sources)}\n`;
  md += whyBlock(t.why);
  md += '\n';
});

// ---- 05 China ----
md += `## 05 中国半导体动态\n\n`;
chinaSection.companies.forEach(co => {
  md += `### ${co.name}\n`;
  md += `*${co.ticker}*\n\n`;
  if (co.highlight) {
    md += `> **${clean(co.highlight)}**${srcLine(co.highlightSources || [])}\n\n`;
  }
  if (co.why) md += whyBlock(co.why) + '\n';
  co.events.forEach(([date, text, srcs]) => {
    md += `- **${date}** ${clean(text)}${srcLine(srcs || [])}\n`;
  });
  md += '\n';
});
md += `> **Policy & Outlook：** ${clean(chinaSection.outlook)}${srcLine(chinaSection.outlookSources)}\n\n`;

// ---- 06 Academic ----
md += `## 06 学术研究\n\n`;
academic.forEach(a => {
  md += `### ${a.title}\n\n`;
  md += `${clean(a.text)}${srcLine(a.sources)}\n`;
  md += whyBlock(a.why);
  md += '\n';
});

// ---- 07 AI & Smart ----
md += `## 07 AI 与智能化\n\n`;
aiSmart.forEach(a => {
  md += `### ${a.title}\n\n`;
  md += `${clean(a.text)}${srcLine(a.sources)}\n`;
  md += whyBlock(a.why);
  md += '\n';
});
md += `> **${aiSmartOutro.label}：** ${clean(aiSmartOutro.text)}${srcLine(aiSmartOutro.sources)}\n\n`;

// ---- 08 Design ----
md += `## 08 产品与体验设计\n\n`;
designTrends.forEach(d => {
  md += `### ${d.title}\n\n`;
  md += `${clean(d.text)}${srcLine(d.sources)}\n`;
  md += whyBlock(d.why);
  md += '\n';
});
md += `> **${designTrendsOutro.label}：** ${clean(designTrendsOutro.text)}${srcLine(designTrendsOutro.sources)}\n\n`;

// ---- 09 Policy ----
md += `## 09 政策与地缘\n\n`;
policy.forEach(p => {
  md += `### \`${p.tag}\` ${p.title}\n\n`;
  md += `${clean(p.text)}${srcLine(p.sources)}\n`;
  md += whyBlock(p.why);
  md += '\n';
});

// ---- 10 Landscape ----
md += `## 10 产业格局\n\n`;
md += `${clean(landscape.text)}${srcLine(landscape.sources)}\n\n`;

// ---- 11 Reading ----
md += `## 11 值得一读\n\n`;
reading.forEach((r, i) => {
  md += `**${String(i+1).padStart(2,'0')}** [${r.title}](${r.url})\n`;
  md += `*${r.source}*\n`;
  md += `${r.desc}\n\n`;
});

// ---- 12 Calendar ----
md += `## 12 关键日程\n\n`;
md += `| 日期 | 事件 |\n`;
md += `|------|------|\n`;
calendar.forEach(c => {
  md += `| ${c.date} | ${clean(c.event)} |\n`;
});
md += '\n';

// ---- 13 Synthesis ----
md += `## 13 综合判断\n\n`;
synthesis.techLines.forEach(l => {
  md += `### ${l.theme}\n\n`;
  md += `${l.insight}\n\n`;
});

md += `### 工艺开发优先级\n\n`;
md += `| 工艺方向 | 优先级 | 影响分析 |\n`;
md += `|----------|--------|----------|\n`;
synthesis.processImpact.forEach(p => {
  const stars = '★'.repeat(p.priority) + '☆'.repeat(5 - p.priority);
  md += `| ${p.area} | ${stars} | ${p.impact} |\n`;
});
md += '\n';

md += `---\n\n*${meta.confidential} · ${meta.brand} · ${meta.dateRange}*\n`;

// ============================================================
// WRITE MD
// ============================================================
fs.writeFileSync(mdPath, md);
console.log(`Markdown written: ${mdPath} (${md.length} chars)`);

// ============================================================
// CONVERT TO PDF
// ============================================================
try {
  // Try pandoc with typst engine (best CJK support without LaTeX)
  execSync(`pandoc "${mdPath}" -o "${pdfPath}" --pdf-engine=typst -V mainfont="PingFang SC"`, {
    cwd: __dirname,
    stdio: 'inherit',
  });
  console.log(`PDF generated: ${pdfPath}`);
} catch (e) {
  console.error('pandoc+typst failed, trying pandoc+weasyprint...');
  try {
    execSync(`pandoc "${mdPath}" -o "${pdfPath}" --pdf-engine=weasyprint`, {
      cwd: __dirname,
      stdio: 'inherit',
    });
    console.log(`PDF generated (weasyprint): ${pdfPath}`);
  } catch (e2) {
    console.log(`PDF conversion failed. Markdown file is at: ${mdPath}`);
    console.log('You can convert manually with Typora or Obsidian.');
  }
}
