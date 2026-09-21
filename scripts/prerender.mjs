/**
 * Prerenderizado estático del SPA.
 *
 * El sitio se renderiza entero en el cliente, así que el HTML que sirve el
 * servidor es idéntico para todas las rutas: un <div id="root"> vacío. Google
 * ejecuta JS y lo resuelve, pero Bing y los bots de IA que robots.txt permite
 * (GPTBot, ClaudeBot, PerplexityBot…) normalmente no, y solo ven el cascarón.
 *
 * Este script levanta el build, visita cada URL del sitemap con un Chromium
 * headless y guarda el HTML ya renderizado junto al build. Apache lo sirve
 * mediante las reglas de .htaccess; si algo falla, el fallback del SPA sigue
 * funcionando igual que antes.
 *
 * El sitemap es la fuente de verdad: se prerenderiza exactamente lo que le
 * decimos a Google que indexe, alternativas en inglés incluidas.
 */
import { chromium } from 'playwright';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');
const SITE = 'https://amephia.com';
const PORT = 4179;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
};

/** Sirve dist/ replicando el fallback SPA de .htaccess. */
const startServer = () =>
  new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      const { pathname } = new URL(req.url, `http://localhost:${PORT}`);
      const direct = path.join(DIST, decodeURIComponent(pathname));
      const file =
        fs.existsSync(direct) && fs.statSync(direct).isFile()
          ? direct
          : path.join(DIST, 'index.html');
      res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] ?? 'application/octet-stream' });
      fs.createReadStream(file).pipe(res);
    });
    server.listen(PORT, '127.0.0.1', () => resolve(server));
  });

/** URLs a prerenderizar, extraídas del sitemap (<loc> + alternates en inglés). */
const routesFromSitemap = () => {
  const xml = fs.readFileSync(path.join(DIST, 'sitemap.xml'), 'utf8');
  const found = new Set();

  for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) found.add(m[1]);
  for (const m of xml.matchAll(/hreflang="en"\s+href="([^"]+)"/g)) found.add(m[1]);

  return [...found]
    .filter((u) => u.startsWith(SITE))
    .map((u) => u.slice(SITE.length) || '/')
    // <image:loc> apunta a ficheros, no a páginas
    .filter((r) => !/\.(jpg|jpeg|png|webp|svg|ico)$/i.test(r))
    .sort();
};

/**
 * /                          → index.html
 * /?lang=en                  → index.en.html
 * /proyecto/gym              → proyecto/gym.html
 * /proyecto/contame?lang=en  → proyecto/contame.en.html
 */
const outputFor = (route) => {
  const [pathname, query = ''] = route.split('?');
  const en = /(^|&)lang=en(&|$)/.test(query);
  const base = pathname === '/' ? 'index' : pathname.replace(/^\/|\/$/g, '');
  return `${base}${en ? '.en' : ''}.html`;
};

const run = async () => {
  if (!fs.existsSync(path.join(DIST, 'index.html'))) {
    throw new Error('No hay build en dist/. Ejecuta "vite build" antes de prerenderizar.');
  }

  const routes = routesFromSitemap();
  const server = await startServer();
  const browser = await chromium.launch();

  // Se renderiza todo en memoria y se escribe al final: el servidor sirve
  // index.html como fallback, así que sobrescribirlo a mitad contaminaría el
  // resto de rutas con la portada ya prerenderizada.
  const rendered = [];
  const skipped = [];

  try {
    for (const route of routes) {
      const [pathname] = route.split('?');
      // Páginas que ya son HTML estático propio — /brochure se sirve desde
      // public/brochure.html vía .htaccess. Prerenderizarlas las sobrescribiría
      // con lo que el SPA renderiza en esa ruta, que no es lo mismo.
      const isStatic = [pathname, `${pathname}.html`].some((p) => {
        const f = path.join(DIST, p);
        return fs.existsSync(f) && fs.statSync(f).isFile();
      });
      if (isStatic) {
        skipped.push(`${route} (ya es HTML estático)`);
        continue;
      }

      const english = /lang=en/.test(route);
      // El idioma por defecto depende de navigator.language. Fijar el locale
      // hace el prerenderizado determinista y alineado con el canonical.
      const context = await browser.newContext({ locale: english ? 'en-US' : 'es-EC' });
      const page = await context.newPage();

      await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: 'networkidle' });

      // Esperar a que React haya montado contenido real, no el div vacío. No se
      // exige un <h1>: el brochure, por ejemplo, no tiene ninguno.
      try {
        await page.waitForFunction(
          () => (document.getElementById('root')?.childElementCount ?? 0) > 0,
          { timeout: 20000 }
        );
      } catch {
        throw new Error(`${route}: el SPA no montó nada en #root`);
      }
      // Margen para que corran los efectos que fijan title, canonical y hreflang.
      await page.waitForTimeout(700);

      // El snapshot congela también los <script src> que el propio sitio
      // inyecta en runtime (gtag.js lo añade analytics.ts), y al arrancar los
      // vuelve a inyectar: quedarían duplicados en cada carga. Se conserva la
      // primera aparición de cada src y se descartan las repetidas.
      const duplicates = await page.evaluate(() => {
        const seen = new Set();
        let removed = 0;
        document.querySelectorAll('script[src]').forEach((s) => {
          if (seen.has(s.src)) {
            s.remove();
            removed += 1;
          } else {
            seen.add(s.src);
          }
        });
        return removed;
      });
      if (duplicates) console.log(`  (${route}: ${duplicates} script(s) duplicado(s) eliminado(s))`);

      const html = await page.content();
      const title = await page.title();
      const canonical = await page.getAttribute('link[rel="canonical"]', 'href');
      const lang = await page.getAttribute('html', 'lang');

      rendered.push({ route, out: outputFor(route), html, title, canonical, lang });
      await context.close();
    }
  } finally {
    await browser.close();
    server.close();
  }

  for (const page of rendered) {
    const dest = path.join(DIST, page.out);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.writeFileSync(dest, page.html, 'utf8');
    console.log(
      `  ${page.route.padEnd(34)} → ${page.out.padEnd(30)} [${page.lang}] ${page.title.slice(0, 48)}`
    );
  }

  skipped.forEach((s) => console.log(`  omitido: ${s}`));
  console.log(`\n✔ Prerenderizadas ${rendered.length} páginas.`);
};

run().catch((err) => {
  console.error('✖ Prerenderizado fallido:', err.message);
  process.exit(1);
});
