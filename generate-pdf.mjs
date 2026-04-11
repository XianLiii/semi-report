import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const htmlPath = join(__dirname, 'report-2026-W15.html');
const pdfPath = join(__dirname, 'report-2026-W15.pdf');

// Strategy:
// - Puppeteer zero margin → HTML controls all padding
// - Viewport matches A4 at 96 DPI (794×1123)
// - body has no width constraint
// - Each .pdf-page has explicit padding (22mm on all sides)
// - Each .pdf-page has min-height to fill A4

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();

await page.setViewport({
  width: 794,    // A4 width at 96 DPI
  height: 1123,  // A4 height at 96 DPI
  deviceScaleFactor: 2,
});

await page.emulateMediaType('print');
await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0', timeout: 30000 });

// CRITICAL: wait for fonts to fully load to avoid garbled CJK text
await page.evaluateHandle('document.fonts.ready');
await new Promise(r => setTimeout(r, 3000));

// Zero PDF margin — all padding controlled inside HTML
await page.pdf({
  path: pdfPath,
  format: 'A4',
  printBackground: true,
  displayHeaderFooter: false,
  margin: { top: 0, bottom: 0, left: 0, right: 0 },
  preferCSSPageSize: false,
});

await browser.close();
console.log(`PDF generated: ${pdfPath}`);
