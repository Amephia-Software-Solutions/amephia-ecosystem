// Post-build SEO: genera sitemap.xml y pre-renderiza las páginas de servicios como HTML estático.
// Uso: node scripts/seo.mjs            -> dist/ (después de `vite build`) y public/sitemap.xml
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { serviceJsonLd, serviceMeta, SITE } from '../src/data/serviceSeo.ts';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const services = JSON.parse(readFileSync(join(root, 'src/data/services.json'), 'utf8'));
const today = new Date().toISOString().slice(0, 10);
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// ── Sitemap ─────────────────────────────────────────────
const projects = ['education', 'shielddata', 'gym', 'broker-seguro', 'ecommerce', 'migration'];
const alt = (path) => `
    <xhtml:link rel="alternate" hreflang="es" href="${SITE}${path}" />
    <xhtml:link rel="alternate" hreflang="en" href="${SITE}${path}?lang=en" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE}${path}" />`;
const url = (path, freq, prio, withAlt = true) => `  <url>
    <loc>${SITE}${path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${freq}</changefreq>
    <priority>${prio}</priority>${withAlt ? alt(path) : ''}
  </url>`;
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${[url('/', 'weekly', '1.0'),
  ...services.map(s => url(`/servicios/${s.slug}`, 'monthly', '0.9')),
  ...projects.map(p => url(`/proyecto/${p}`, 'monthly', '0.8')),
  url('/brochure', 'monthly', '0.5', false)].join('\n')}
</urlset>
`;
writeFileSync(join(root, 'public/sitemap.xml'), sitemap);

const dist = join(root, 'dist');
if (!existsSync(join(dist, 'index.html'))) { console.log('sitemap escrito (sin dist/: omito pre-render)'); process.exit(0); }
writeFileSync(join(dist, 'sitemap.xml'), sitemap);

// ── Pre-render de /servicios/<slug>/ ─────────────────────
const base = readFileSync(join(dist, 'index.html'), 'utf8');

const header = (base.match(/<header[\s\S]*?<\/header>/) || [''])[0];

const shell = s => {
  const check = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="M20 6 9 17l-5-5"/></svg>';
  const li = s.includes.map(i => `<li class="border-b border-[color:var(--am-line)]"><div class="flex items-start gap-4 py-4"><span class="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#2563EB]/10 text-[#2563EB]">${check}</span><div><h2 class="text-[1.08rem] font-semibold leading-snug tracking-tight">${esc(i.t.es)}</h2><p class="mt-1 text-[15px] leading-relaxed text-[color:var(--am-mute)]">${esc(i.d.es)}</p></div></div></li>`).join('');
  const PROJ = { facturon: ['Facturón', 'https://facturon.ec/', 'Nuestro sistema de facturación electrónica SRI, desde $2.99 al mes.'], ecommerce: ['AmePhia Store', '/proyecto/ecommerce', 'Plataforma de e-commerce con pagos locales y facturación SRI.'] };
  const pj = s.project ? PROJ[s.project] : null;
  const projCard = pj ? `<a href="${pj[1]}" class="am-prod-card mt-8 block rounded-2xl border border-[color:var(--am-line)] bg-white p-5"><p class="text-[12px] font-medium text-[#2563EB]">Sistema relacionado</p><p class="mt-1 flex items-center justify-between text-[1.15rem] font-semibold tracking-tight">${pj[0]}</p><p class="mt-1 text-[14px] text-[color:var(--am-mute)]">${pj[2]}</p></a>` : '';
  const faq = s.faqs.map((f, k) => `<details ${k === 0 ? 'open ' : ''}class="am-faq group border-b border-[color:var(--am-line)]"><summary class="flex cursor-pointer list-none items-center gap-4 py-3.5"><h3 class="flex-1 text-[15px] font-semibold leading-snug tracking-tight md:text-[16px]">${esc(f.q.es)}</h3><span class="am-faq-icon grid h-7 w-7 shrink-0 place-items-center rounded-full border border-[color:var(--am-line)] text-[15px] text-[#2563EB]" aria-hidden="true">+</span></summary><p class="max-w-[66ch] pb-4 pr-10 text-[14.5px] leading-relaxed text-[color:var(--am-mute)]">${esc(f.a.es)}</p></details>`).join('');
  const rel = s.related.map(k => services.find(x => x.key === k)).filter(Boolean)
    .map(r => `<li><a href="/servicios/${r.slug}" class="am-mini flex h-full items-center justify-between gap-4 rounded-xl border border-[color:var(--am-line)] bg-white p-4"><span class="text-[1.05rem] font-semibold tracking-tight">${esc(r.title.es)}</span></a></li>`).join('');
  const all = services.map(x => `<li><a href="/servicios/${x.slug}">${esc(x.title.es)}</a></li>`).join('');
  return `<div class="am relative min-h-screen overflow-x-clip font-sans" id="ssr-shell">
${header}
<main>
<section id="hero" class="am-navy am-sec !bg-transparent relative pt-32 pb-14 md:pt-40 md:pb-20">
<div class="mx-auto max-w-[1320px] px-5 md:px-10">
<nav aria-label="Breadcrumb" class="mb-6 flex flex-wrap items-center gap-2 text-[13px] text-[color:var(--am-mute)]"><a class="am-link hover:text-white" href="/">Inicio</a><span aria-hidden="true">/</span><a class="am-link hover:text-white" href="/#servicios">Servicios</a><span aria-hidden="true">/</span><span class="text-white">${esc(s.title.es)}</span></nav>
<h1 class="am-h1 max-w-[20ch] text-white !text-[clamp(2.1rem,4vw,3.4rem)]">${esc(s.h1.es)}</h1>
<p class="mt-5 max-w-[60ch] text-[17px] leading-relaxed text-[color:var(--am-mute)]">${esc(s.intro.es)}</p>
<div class="mt-8 flex flex-wrap gap-3"><a href="https://wa.me/13347324056" class="am-btn">Solicitar una propuesta</a><a href="/#servicios" class="am-btn am-btn-ghost">Todos los servicios</a></div>
</div></section>
<section class="am-sec am-light py-14 md:py-20"><div class="mx-auto grid max-w-[1320px] gap-8 px-5 md:px-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-14"><div class="lg:sticky lg:top-28 lg:self-start"><span class="am-rule mb-5" aria-hidden="true"></span><h2 class="am-h2 !text-[clamp(1.75rem,2.8vw,2.5rem)]">Qué incluye</h2>${projCard}</div><ul class="border-t border-[color:var(--am-line)]">${li}</ul></div></section>
<section class="am-sec am-light am-alt py-14 md:py-20"><div class="mx-auto grid max-w-[1320px] gap-8 px-5 md:px-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-14"><div><span class="am-rule mb-5" aria-hidden="true"></span><h2 class="am-h2 !text-[clamp(1.75rem,2.8vw,2.5rem)]">Preguntas frecuentes</h2></div><div class="border-t border-[color:var(--am-line)]">${faq}</div></div></section>
<section class="am-sec am-light py-14 md:py-16"><div class="mx-auto max-w-[1320px] px-5 md:px-10"><p class="text-[13px] font-medium text-[color:var(--am-mute)]">Servicios relacionados</p><ul class="mt-3 grid gap-3 md:grid-cols-3">${rel}</ul><h2 class="mt-8 text-[13px] font-medium text-[color:var(--am-mute)]">Todos los servicios</h2><ul class="mt-3">${all}</ul></div></section>
</main></div>`;
};

const set = (html, re, rep) => html.replace(re, rep);
for (const s of services) {
  const m = serviceMeta(s, 'es');
  let html = base;
  html = set(html, /<title>[\s\S]*?<\/title>/, `<title>${esc(m.title)}</title>`);
  html = set(html, /(<meta name="title" content=")[^"]*(")/, `$1${esc(m.title)}$2`);
  html = set(html, /(<meta name="description" content=")[^"]*(")/, `$1${esc(m.description)}$2`);
  html = set(html, /(<meta name="keywords" content=")[^"]*(")/, `$1${esc(m.keywords)}$2`);
  html = set(html, /(<link rel="canonical" href=")[^"]*(")/, `$1${m.canonical}$2`);
  for (const p of ['og:title', 'twitter:title']) html = set(html, new RegExp(`(<meta property="${p}" content=")[^"]*(")`), `$1${esc(m.title)}$2`);
  for (const p of ['og:description', 'twitter:description']) html = set(html, new RegExp(`(<meta property="${p}" content=")[^"]*(")`), `$1${esc(m.description)}$2`);
  for (const p of ['og:url', 'twitter:url']) html = set(html, new RegExp(`(<meta property="${p}" content=")[^"]*(")`), `$1${m.canonical}$2`);
  // Quita del HTML base los bloques propios de la home que no describen esta página
  html = html.replace(/<script type="application\/ld\+json">(?:(?!<\/script>)[\s\S])*?"@type": "(?:FAQPage|BreadcrumbList)"[\s\S]*?<\/script>/g, '');
  // La página de servicio no repite los bloques JSON-LD de la home salvo Organization/WebSite
  const ld = serviceJsonLd(s, 'es').map(o => `<script type="application/ld+json" data-seo="service">${JSON.stringify(o)}</script>`).join('\n');
  html = set(html, /<\/head>/, `${ld}\n</head>`);
  if (!html.includes('<!--ssr:start-->')) throw new Error('index.html sin marcadores ssr');
  html = html.replace(/<!--ssr:start-->[\s\S]*?<!--ssr:end-->/, () => shell(s));
  const out = join(dist, 'servicios', s.slug);
  mkdirSync(out, { recursive: true });
  writeFileSync(join(out, 'index.html'), html);
}
console.log(`sitemap + ${services.length} páginas de servicio generadas`);
