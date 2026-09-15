import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const OUT = './landing-screenshots';
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1.5 });
const page = await ctx.newPage();

const url = 'http://localhost:5173/education';
console.log('Cargando ' + url + '…');
await page.goto(url, { waitUntil: 'networkidle' });
await page.waitForTimeout(1500);

console.log('Screenshot completo…');
await page.screenshot({ path: `${OUT}/edu-full.png`, fullPage: true });

console.log('Screenshot above-the-fold (1440x900)…');
await page.screenshot({ path: `${OUT}/edu-hero.png` });

// Scroll a cada sección y screenshot
const sections = ['modulos', 'diferenciadores', 'planes', 'faq'];
for (const id of sections) {
  await page.evaluate((s) => document.getElementById(s)?.scrollIntoView({ block: 'start' }), id);
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${OUT}/edu-${id}.png` });
  console.log(`  ✓ ${id}`);
}

await browser.close();
console.log('Listo. Screenshots en ' + OUT);
