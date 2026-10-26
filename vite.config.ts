import { defineConfig } from 'vite'
import type { Plugin } from 'vite'
import react from '@vitejs/plugin-react'

// Inlina el CSS de entrada en el HTML: elimina la petición que bloquea el primer render (FCP/LCP).
const inlineCss = (): Plugin => ({
  name: 'inline-entry-css',
  enforce: 'post',
  generateBundle(_, bundle) {
    const html = bundle['index.html'];
    if (!html || html.type !== 'asset') return;
    let source = String(html.source);
    for (const [file, chunk] of Object.entries(bundle)) {
      if (chunk.type !== 'asset' || !file.endsWith('.css')) continue;
      const re = new RegExp(`<link[^>]*rel="stylesheet"[^>]*href="/${file.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[^>]*>`);
      if (!re.test(source)) continue;
      source = source.replace(re, () => `<style>${String(chunk.source)}</style>`);
      delete bundle[file];
    }
    html.source = source;
  },
});


// Carga la app (JS) tras el evento `load`: el primer pintado y el LCP salen del HTML estático
// (header + hero con la imagen) sin competir con ~95 KB de JS. La app reemplaza el shell al montar.
const deferEntryScript = (): Plugin => ({
  name: 'defer-entry-script',
  enforce: 'post',
  apply: 'build',
  generateBundle(_, bundle) {
    const html = bundle['index.html'];
    if (!html || html.type !== 'asset') return;
    let source = String(html.source);
    const entry = source.match(/<script type="module"[^>]*src="([^"]+)"[^>]*><\/script>/);
    if (!entry) return;
    const preloads = [...source.matchAll(/<link rel="modulepreload"[^>]*href="([^"]+)"[^>]*>/g)].map(m => m[1]);
    source = source.replace(entry[0], '').replace(/<link rel="modulepreload"[^>]*>\s*/g, '');
    const loader = `<script>addEventListener("load",function(){setTimeout(function(){${JSON.stringify(preloads)}.forEach(function(u){var l=document.createElement("link");l.rel="modulepreload";l.href=u;document.head.appendChild(l)});var s=document.createElement("script");s.type="module";s.src=${JSON.stringify(entry[1])};document.head.appendChild(s)},700)})</script>`;
    html.source = source.replace('</body>', `${loader}\n</body>`);
  },
});

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), inlineCss(), deferEntryScript()],
  build: {
    // Split the bundle into smaller chunks for faster initial load
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React runtime — loads first, cached aggressively
          'vendor-react': ['react', 'react-dom'],
          // Lucide icons — large lib, separate chunk
          'vendor-icons': ['lucide-react'],
        },
      },
    },
    // Increase chunk size warning threshold (informational only)
    chunkSizeWarningLimit: 600,
  },
})
