// ============================================================
// Generate v2.html from data-v2.mjs
// Reads index.html CSS, injects V2 content with "why" blocks
// ============================================================
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import {
  meta, digest, market, equipment, techFrontier, chinaSection,
  academic, aiSmart, aiSmartOutro,
  designTrends, designTrendsOutro,
  policy, landscape, reading, calendar, synthesis,
} from './data-v2.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outPath = join(__dirname, 'v2.html');

function esc(s) { return (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
function clean(s) {
  if (!s) return '';
  return s.replace(/<strong>/g,'<strong>').replace(/<\/strong>/g,'</strong>');
}
function srcLinks(sources) {
  if (!sources || sources.length === 0) return '';
  return '<div class="item-sources">' +
    sources.map(s => `<a href="${esc(s.url)}" target="_blank">${esc(s.name)}</a>`).join('') +
    '</div>';
}
function whyBlock(why) {
  if (!why) return '';
  return `<div class="why-block"><span class="why-label">Why It Matters</span>${esc(why)}</div>`;
}

// Read index.html to extract CSS
const indexHtml = fs.readFileSync(join(__dirname, 'index.html'), 'utf-8');
const cssMatch = indexHtml.match(/<style>([\s\S]*?)<\/style>/);
const baseCss = cssMatch ? cssMatch[1] : '';

// Additional V2 CSS
const v2Css = `
  .digest-body {
    flex: 1; min-width: 0;
  }
  .why-block {
    margin-top: 8px; padding: 8px 14px;
    background: #fef9f0; border-left: 2px solid #d4a017;
    border-radius: 0 4px 4px 0;
    font-size: 0.85rem; color: #665500; line-height: 1.7;
  }
  .why-label {
    font-family: var(--mono); font-size: 0.62rem; color: #b8860b;
    text-transform: uppercase; letter-spacing: 0.05em;
    margin-bottom: 4px; display: block;
  }
  .synthesis-card {
    padding: 16px 20px; margin-bottom: 12px;
    border: 1px solid var(--light); border-radius: 8px;
    background: var(--white);
  }
  .synthesis-theme { font-size: 0.95rem; font-weight: 700; color: var(--dark); margin-bottom: 6px; }
  .synthesis-insight { font-size: 0.88rem; color: var(--body); line-height: 1.8; }
  .priority-table { width: 100%; border-collapse: collapse; margin-top: 16px; table-layout: fixed; }
  .priority-table th, .priority-table td {
    padding: 8px 12px; text-align: left; border-bottom: 1px solid var(--light); font-size: 0.85rem;
    word-wrap: break-word;
  }
  .priority-table th:nth-child(1), .priority-table td:nth-child(1) { width: 14%; white-space: nowrap; }
  .priority-table th:nth-child(2), .priority-table td:nth-child(2) { width: 12%; white-space: nowrap; }
  .priority-table th:nth-child(3), .priority-table td:nth-child(3) { width: 74%; }
  .priority-table th {
    font-family: var(--mono); font-size: 0.7rem; color: var(--tertiary); text-transform: uppercase;
  }
  .priority-stars { color: var(--red); font-size: 0.8rem; }
  .stock-grid { display: flex !important; flex-direction: column !important; gap: 12px; }
  .stock-row-top { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .stock-row-bottom { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; }
  .stock-row-bottom .stock-card { min-width: 0; }
  @media (max-width: 600px) {
    .stock-row-top { grid-template-columns: 1fr 1fr; }
    .stock-row-bottom { grid-template-columns: 1fr 1fr; }
    .stock-card { padding: 10px 8px; }
    .stock-card .stock-price { font-size: 1.1rem; }
    .stock-card .stock-note { font-size: 0.65rem; }
  }
`;

// ---- BUILD HTML ----
let html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Semiconductor Weekly V2 | 2026 W15</title>
<style>
${baseCss}
${v2Css}
</style>
</head>
<body>

<!-- NAV -->
<nav class="nav">
  <div class="nav-inner">
    <div class="nav-brand">
      Semiconductor Weekly
      <span class="version-dropdown" id="versionDropdown">
        <button class="version-btn" onclick="document.getElementById('versionDropdown').querySelector('.version-menu').classList.toggle('open')">
          V2
          <svg viewBox="0 0 10 6" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M1 1l4 4 4-4"/></svg>
        </button>
        <div class="version-menu">
          <a href="#" class="current">V2 Latest</a>
          <a href="index.html">V1</a>
        </div>
      </span>
    </div>
    <div class="nav-right">
      <span class="nav-date">${esc(meta.dateRange)}</span>
      <a class="btn-download" href="report-v2.pdf" download><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M8 2v9m0 0l-3-3m3 3l3-3M3 13h10"/></svg>PDF</a>
      <a class="btn-download" href="report-v2.md" download><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M8 2v9m0 0l-3-3m3 3l3-3M3 13h10"/></svg>MD</a>
      <button class="mobile-menu-btn" aria-label="菜单" onclick="document.getElementById('mobileMenu').classList.toggle('open')">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/></svg>
      </button>
    </div>
  </div>
</nav>

<!-- Mobile menu -->
<div class="mobile-menu" id="mobileMenu">
  <div class="mobile-menu-label">下载报告</div>
  <div class="mobile-menu-downloads">
    <a href="report-v2.pdf" download onclick="document.getElementById('mobileMenu').classList.remove('open')">
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M8 2v9m0 0l-3-3m3 3l3-3M3 13h10"/></svg>
      PDF <span class="menu-item-desc">V2 完整版</span>
    </a>
    <a href="report-v2.md" download onclick="document.getElementById('mobileMenu').classList.remove('open')">
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M8 2v9m0 0l-3-3m3 3l3-3M3 13h10"/></svg>
      Markdown <span class="menu-item-desc">可编辑源文件</span>
    </a>
  </div>
</div>

<!-- COVER ZONE -->
<div class="cover-zone">
<div class="hero">
  <div class="hero-label">Weekly Briefing · V2</div>
  <h1>${esc(meta.title)}</h1>
  <div class="hero-subtitle">${esc(meta.subtitle)}</div>
  <div class="hero-meta">
    <span class="hero-meta-item">${esc(meta.vol)}</span>
    <span class="hero-meta-item">${esc(meta.dateRange)}</span>
    <span class="hero-meta-item">${esc(meta.confidential)}</span>
  </div>
</div>

<div class="toc">
  <div class="toc-grid">
    <a class="toc-item" href="#digest"><span class="toc-num">01</span><span class="toc-label">本周速览</span></a>
    <a class="toc-item" href="#market"><span class="toc-num">02</span><span class="toc-label">市场脉搏</span></a>
    <a class="toc-item" href="#equipment"><span class="toc-num">03</span><span class="toc-label">设备巨头动态</span></a>
    <a class="toc-item" href="#tech"><span class="toc-num">04</span><span class="toc-label">前沿技术</span></a>
    <a class="toc-item" href="#china"><span class="toc-num">05</span><span class="toc-label">中国半导体动态</span></a>
    <a class="toc-item" href="#academic"><span class="toc-num">06</span><span class="toc-label">学术研究</span></a>
    <a class="toc-item" href="#ai"><span class="toc-num">07</span><span class="toc-label">AI 与智能化</span></a>
    <a class="toc-item" href="#design"><span class="toc-num">08</span><span class="toc-label">产品与体验设计</span></a>
    <a class="toc-item" href="#policy"><span class="toc-num">09</span><span class="toc-label">政策与地缘</span></a>
    <a class="toc-item" href="#reading"><span class="toc-num">11</span><span class="toc-label">值得一读</span></a>
    <a class="toc-item" href="#calendar"><span class="toc-num">12</span><span class="toc-label">关键日程</span></a>
    <a class="toc-item" href="#synthesis"><span class="toc-num">13</span><span class="toc-label">综合判断</span></a>
  </div>
</div>
</div>

<!-- CONTENT ZONE -->
<div class="content-zone">
<div class="content">
`;

// ---- 01 DIGEST ----
html += `<div class="section" id="digest">
  <div class="section-head"><span class="section-num">01</span><h2 class="section-title">本周速览</h2><div class="section-sub">Weekly Digest</div></div>
  <ul class="digest">`;
digest.forEach((d, i) => {
  html += `<li>
    <span class="digest-num">${String(i+1).padStart(2,'0')}</span>
    <span class="digest-tag">${esc(d.tag)}</span>
    <div class="digest-body">
      <span class="digest-text">${clean(d.text)}</span>
      ${srcLinks(d.sources)}
      ${whyBlock(d.why)}
    </div>
  </li>`;
});
html += `</ul></div>`;

// ---- 02 MARKET ----
html += `<div class="section" id="market">
  <div class="section-head"><span class="section-num">02</span><h2 class="section-title">市场脉搏</h2><div class="section-sub">Market Pulse</div></div>
  <div class="sox-bar"><div><span class="sox-label"><strong>SOX</strong> 费城半导体指数</span></div><div style="text-align:right"><div class="sox-value">${esc(market.sox.value)}</div><div class="sox-sub">52W High: ${esc(market.sox.high52w)} · ${esc(market.sox.offPeak)} off peak</div></div></div>
  <div class="stock-grid">
    <div class="stock-row-top">`;
market.stocks.slice(0, 2).forEach(s => {
  html += `<div class="stock-card"><div class="stock-ticker">${esc(s.ticker)}</div><div class="stock-name">${esc(s.name)}</div><div class="stock-price">${esc(s.price)}</div><div class="stock-change ${s.up?'up':'down'}">${s.up?'&#9650;':'&#9660;'} ${esc(s.change)} (${esc(s.date)})</div><div class="stock-note">${esc(s.note)}</div></div>`;
});
html += `</div><div class="stock-row-bottom">`;
market.stocks.slice(2).forEach(s => {
  html += `<div class="stock-card"><div class="stock-ticker">${esc(s.ticker)}</div><div class="stock-name">${esc(s.name)}</div><div class="stock-price">${esc(s.price)}</div><div class="stock-change ${s.up?'up':'down'}">${s.up?'&#9650;':'&#9660;'} ${esc(s.change)} (${esc(s.date)})</div><div class="stock-note">${esc(s.note)}</div></div>`;
});
html += `</div></div></div>`;

// ---- 03 EQUIPMENT ----
html += `<div class="section" id="equipment">
  <div class="section-head"><span class="section-num">03</span><h2 class="section-title">设备巨头动态</h2><div class="section-sub">Equipment Giants</div></div>`;
equipment.forEach(co => {
  html += `<div class="company"><div class="company-head"><span class="company-name">${esc(co.name)}</span><span class="company-ticker">${esc(co.ticker)}</span></div>`;
  if (co.highlight) {
    html += `<div class="company-hl">${clean(co.highlight)}${srcLinks(co.highlightSources)}</div>`;
  }
  if (co.why) html += whyBlock(co.why);
  co.events.forEach(([date, text, srcs]) => {
    html += `<div class="event"><span class="event-date">${esc(date)}</span><span class="event-text">${clean(text)}${srcLinks(srcs||[])}</span></div>`;
  });
  html += `</div>`;
});
html += `</div>`;

// ---- 04 TECH ----
html += `<div class="section" id="tech">
  <div class="section-head"><span class="section-num">04</span><h2 class="section-title">前沿技术</h2><div class="section-sub">Tech Frontier</div></div>`;
techFrontier.forEach(t => {
  html += `<div class="item"><div class="item-title">${esc(t.title)}</div><div class="item-text">${clean(t.text)}</div>${srcLinks(t.sources)}${whyBlock(t.why)}</div>`;
});
html += `</div>`;

// ---- 05 CHINA ----
html += `<div class="section" id="china">
  <div class="section-head"><span class="section-num">05</span><h2 class="section-title">中国半导体动态</h2><div class="section-sub">China Semiconductor</div></div>`;
chinaSection.companies.forEach(co => {
  html += `<div class="company"><div class="company-head"><span class="company-name">${esc(co.name)}</span><span class="company-ticker">${esc(co.ticker)}</span></div>`;
  if (co.highlight) html += `<div class="company-hl">${clean(co.highlight)}${srcLinks(co.highlightSources||[])}</div>`;
  if (co.why) html += whyBlock(co.why);
  co.events.forEach(([date, text, srcs]) => {
    html += `<div class="event"><span class="event-date">${esc(date)}</span><span class="event-text">${clean(text)}${srcLinks(srcs||[])}</span></div>`;
  });
  html += `</div>`;
});
html += `<div class="hl-box"><div class="label">Policy &amp; Outlook</div><p>${clean(chinaSection.outlook)}</p>${srcLinks(chinaSection.outlookSources)}</div></div>`;

// ---- 06 ACADEMIC ----
html += `<div class="section" id="academic">
  <div class="section-head"><span class="section-num">06</span><h2 class="section-title">学术研究</h2><div class="section-sub">Academic Research</div></div>`;
academic.forEach(a => {
  html += `<div class="item"><div class="item-title">${esc(a.title)}</div><div class="item-text">${clean(a.text)}</div>${srcLinks(a.sources)}${whyBlock(a.why)}</div>`;
});
html += `</div>`;

// ---- 07 AI ----
html += `<div class="section" id="ai">
  <div class="section-head"><span class="section-num">07</span><h2 class="section-title">AI 与智能化</h2><div class="section-sub">AI &amp; Smart Manufacturing</div></div>`;
aiSmart.forEach(a => {
  html += `<div class="item"><div class="item-title">${esc(a.title)}</div><div class="item-text">${clean(a.text)}</div>${srcLinks(a.sources)}${whyBlock(a.why)}</div>`;
});
html += `<div class="hl-box"><div class="label">${esc(aiSmartOutro.label)}</div><p>${clean(aiSmartOutro.text)}</p>${srcLinks(aiSmartOutro.sources)}</div></div>`;

// ---- 08 DESIGN ----
html += `<div class="section" id="design">
  <div class="section-head"><span class="section-num">08</span><h2 class="section-title">产品与体验设计</h2><div class="section-sub">Product &amp; Experience Design</div></div>`;
designTrends.forEach(d => {
  html += `<div class="item"><div class="item-title">${esc(d.title)}</div><div class="item-text">${clean(d.text)}</div>${srcLinks(d.sources)}${whyBlock(d.why)}</div>`;
});
html += `<div class="hl-box"><div class="label">${esc(designTrendsOutro.label)}</div><p>${clean(designTrendsOutro.text)}</p>${srcLinks(designTrendsOutro.sources)}</div></div>`;

// ---- 09 POLICY ----
html += `<div class="section" id="policy">
  <div class="section-head"><span class="section-num">09</span><h2 class="section-title">政策与地缘</h2><div class="section-sub">Policy &amp; Geopolitics</div></div>`;
policy.forEach(p => {
  html += `<div class="item"><span class="policy-tag us">${esc(p.tag)}</span><div class="item-title">${esc(p.title)}</div><div class="item-text">${clean(p.text)}</div>${srcLinks(p.sources)}${whyBlock(p.why)}</div>`;
});
html += `<div class="hl-box"><div class="label">Fab Expansion</div><p>${clean(landscape.text)}</p>${srcLinks(landscape.sources)}</div></div>`;

// ---- 11 READING ----
html += `<div class="section" id="reading">
  <div class="section-head"><span class="section-num">11</span><h2 class="section-title">值得一读</h2><div class="section-sub">Worth Reading</div></div>`;
reading.forEach((r, i) => {
  html += `<div class="reading"><span class="reading-num">${String(i+1).padStart(2,'0')}</span><div><a class="reading-title" href="${esc(r.url)}" target="_blank">${esc(r.title)}</a><div class="reading-source">${esc(r.source)}</div><div class="reading-desc">${esc(r.desc)}</div></div></div>`;
});
html += `</div>`;

// ---- 12 CALENDAR ----
html += `<div class="section" id="calendar">
  <div class="section-head"><span class="section-num">12</span><h2 class="section-title">关键日程</h2><div class="section-sub">Upcoming Events</div></div>
  <div class="cal-grid">`;
calendar.forEach(c => {
  html += `<div class="cal-date">${esc(c.date)}</div><div class="cal-event">${clean(c.event)}</div>`;
});
html += `</div></div>`;

// ---- 13 SYNTHESIS ----
html += `<div class="section" id="synthesis">
  <div class="section-head"><span class="section-num">13</span><h2 class="section-title">综合判断</h2><div class="section-sub">Synthesis</div></div>`;
synthesis.techLines.forEach(l => {
  html += `<div class="synthesis-card"><div class="synthesis-theme">${esc(l.theme)}</div><div class="synthesis-insight">${esc(l.insight)}</div></div>`;
});
html += `<table class="priority-table"><thead><tr><th>工艺方向</th><th>优先级</th><th>影响分析</th></tr></thead><tbody>`;
synthesis.processImpact.forEach(p => {
  const stars = '<span class="priority-stars">' + '★'.repeat(p.priority) + '☆'.repeat(5-p.priority) + '</span>';
  html += `<tr><td><strong>${esc(p.area)}</strong></td><td>${stars}</td><td>${esc(p.impact)}</td></tr>`;
});
html += `</tbody></table></div>`;

// ---- FOOTER ----
html += `
</div>
<footer class="site-footer">
  <span>本报告基于公开信息编制，仅供内部参考</span>
  <span>Semiconductor Weekly V2 &middot; 2026</span>
</footer>
</div>

<script>
document.addEventListener('click', (e) => {
  const dd = document.getElementById('versionDropdown');
  if (dd && !dd.contains(e.target)) dd.querySelector('.version-menu').classList.remove('open');
});
</script>
</body>
</html>`;

fs.writeFileSync(outPath, html);
console.log(`v2.html written: ${outPath} (${html.length} chars, ${html.split('\\n').length} lines)`);
