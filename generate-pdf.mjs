import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const htmlPath = join(__dirname, 'report-2026-W15.html');
const pdfPath = join(__dirname, 'report-2026-W15.pdf');

// Margin in mm — proper print units
const MARGIN_LR = '22mm';  // ~62pt, generous left/right
const MARGIN_TOP = '24mm'; // space for header
const MARGIN_BOT = '20mm'; // space for footer

const headerTemplate = `
<div style="
  width: 100%;
  margin: 0 22mm;
  padding-bottom: 6px;
  border-bottom: 0.5px solid #1a1a1a;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  font-family: -apple-system, 'PingFang SC', 'Helvetica Neue', sans-serif;
  box-sizing: border-box;
">
  <span style="font-size:7.5px; font-weight:600; letter-spacing:0.12em; text-transform:uppercase; color:#999;">Semiconductor Weekly</span>
  <span style="font-size:7.5px; font-family:'Courier New',monospace; color:#999;">2026.04.07 — 04.09</span>
</div>
`;

const footerTemplate = `
<div style="
  width: 100%;
  margin: 0 22mm;
  padding-top: 6px;
  border-top: 0.5px solid #e0e0e0;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  font-family: -apple-system, 'PingFang SC', 'Helvetica Neue', sans-serif;
  box-sizing: border-box;
">
  <span style="font-size:7px; font-family:'Courier New',monospace; letter-spacing:0.05em; color:#999;">Confidential</span>
  <span style="font-size:7px; font-family:'Courier New',monospace; color:#999;">
    <span class="pageNumber"></span> / <span class="totalPages"></span>
  </span>
</div>
`;

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();

await page.emulateMediaType('print');
await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0', timeout: 30000 });

await page.evaluateHandle('document.fonts.ready');
await new Promise(r => setTimeout(r, 2000));

await page.pdf({
  path: pdfPath,
  format: 'A4',
  printBackground: true,
  displayHeaderFooter: true,
  headerTemplate,
  footerTemplate,
  margin: {
    top:    MARGIN_TOP,
    bottom: MARGIN_BOT,
    left:   MARGIN_LR,
    right:  MARGIN_LR,
  },
  preferCSSPageSize: false,
});

await browser.close();
console.log(`PDF generated: ${pdfPath}`);
