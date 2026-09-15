import { useState, useEffect } from 'react';

export default function BrochurePage() {
  const [lang, setLang] = useState<'es' | 'en'>('es');
  const [activeView, setActiveView] = useState<'trifold' | 'cover' | 'hd'>('trifold');
  const [folded, setFolded] = useState<boolean>(false);

  useEffect(() => {
    document.title = lang === 'es'
      ? 'AmePhia Software Solutions — Brochure Tríptico Corporativo Oficial 2026'
      : 'AmePhia Software Solutions — Official Corporate Trifold Brochure 2026';
  }, [lang]);

  const waLink = "https://wa.me/13347324056?text=" + encodeURIComponent(
    lang === 'es'
      ? "Hola AmePhia, vi su brochure corporativo tríptico y me gustaría solicitar una asesoría técnica para mi empresa."
      : "Hello AmePhia, I reviewed your corporate trifold brochure and would like to request an engineering consultation for my business."
  );

  return (
    <div className="min-h-screen bg-[#040712] text-slate-100 font-sans antialiased selection:bg-blue-600 selection:text-white flex flex-col justify-between overflow-x-hidden">
      
      {/* ── TOP EXECUTIVE BAR ────────────────────────── */}
      <header className="sticky top-0 z-50 bg-[#060A18]/95 backdrop-blur-2xl border-b border-white/10 px-4 sm:px-8 h-16 flex items-center justify-between print:hidden">
        <div className="flex items-center gap-4">
          <a href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 flex items-center justify-center font-mono font-bold text-white text-sm shadow-lg shadow-blue-500/30">
              &lt;/&gt;
            </div>
            <div>
              <span className="text-white font-black text-base tracking-tight block leading-none">
                Ame<span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">Phia</span>
              </span>
              <span className="text-[9px] font-mono tracking-widest text-slate-400 uppercase font-semibold">
                Software Solutions
              </span>
            </div>
          </a>
          <span className="hidden lg:inline-block text-xs font-mono text-slate-400 pl-4 border-l border-white/10">
            OFFICIAL EXECUTIVE BROCHURE 2026
          </span>
        </div>

        {/* Center Mode Controls */}
        <div className="flex items-center gap-1.5 bg-white/[0.04] p-1.5 rounded-2xl border border-white/10 text-xs">
          <button
            onClick={() => setActiveView('cover')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
              activeView === 'cover' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/30 ring-1 ring-white/20' : 'text-slate-300 hover:text-white'
            }`}
          >
            <span>📕</span>
            <span className="hidden sm:inline">{lang === 'es' ? 'Portada 3D' : '3D Cover'}</span>
            <span className="sm:hidden">{lang === 'es' ? 'Portada' : 'Cover'}</span>
          </button>

          <button
            onClick={() => { setActiveView('trifold'); setFolded(false); }}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
              activeView === 'trifold' && !folded ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'text-slate-300 hover:text-white'
            }`}
          >
            <span>📖</span>
            <span className="hidden sm:inline">{lang === 'es' ? 'Tríptico Desplegado' : 'Unfolded Trifold'}</span>
            <span className="sm:hidden">{lang === 'es' ? 'Tríptico' : 'Trifold'}</span>
          </button>

          <button
            onClick={() => { setActiveView('trifold'); setFolded(true); }}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
              activeView === 'trifold' && folded ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'text-slate-300 hover:text-white'
            }`}
          >
            <span>📁</span>
            <span className="hidden sm:inline">{lang === 'es' ? 'Vista Plegada' : 'Folded View'}</span>
            <span className="sm:hidden">{lang === 'es' ? 'Plegado' : 'Folded'}</span>
          </button>

          <button
            onClick={() => setActiveView('hd')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
              activeView === 'hd' ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30' : 'text-slate-300 hover:text-white'
            }`}
          >
            <span>🔍</span>
            <span className="hidden sm:inline">{lang === 'es' ? 'Lámina HD' : 'HD Sheet'}</span>
            <span className="sm:hidden">HD</span>
          </button>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Lang toggle */}
          <div className="inline-flex rounded-xl bg-white/[0.04] p-1 border border-white/10 text-xs">
            <button
              onClick={() => setLang('es')}
              className={`px-2.5 py-1 rounded-lg font-black transition-all ${
                lang === 'es' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              🇪🇸 ES
            </button>
            <button
              onClick={() => setLang('en')}
              className={`px-2.5 py-1 rounded-lg font-black transition-all ${
                lang === 'en' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              🇺🇸 EN
            </button>
          </div>

          {/* Download PDF button */}
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-extrabold shadow-lg shadow-blue-600/30 transition-all active:scale-95"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <span className="hidden sm:inline">{lang === 'es' ? 'Descargar PDF' : 'Download PDF'}</span>
          </button>
        </div>
      </header>

      {/* ── HERO SHOWCASE: 3D COVER & INTRO ────────────────────── */}
      <section className="relative py-8 px-4 sm:px-8 max-w-7xl mx-auto w-full print:hidden">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#0C152B] via-[#091024] to-[#050814] border border-blue-500/25 p-6 sm:p-10 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl shadow-black/80">
          
          {/* Ambient Glows */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

          {/* Left: Value proposition */}
          <div className="space-y-4 max-w-2xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>{lang === 'es' ? 'Dossier & Tríptico Oficial 2026' : 'Official Capabilities & Trifold Dossier'}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.12]">
              {lang === 'es' ? (
                <>Lleva tu negocio al siguiente nivel con una <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-300 bg-clip-text text-transparent">solución digital a tu medida.</span></>
              ) : (
                <>Get a professional website or web application for <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-300 bg-clip-text text-transparent">your business today.</span></>
              )}
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
              {lang === 'es'
                ? 'Sitios web modernos, desarrollo de sistemas y ERP a medida, actualización tecnológica, posicionamiento SEO orgánico, pauta digital y presencia optimizada en motores de IA (ChatGPT, Google Gemini).'
                : 'Modern websites, custom web apps and ERPs, system modernization, organic SEO positioning, digital advertising, and high-visibility optimization across AI engines (ChatGPT, Google Gemini).'}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-3">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:opacity-95 text-white text-sm font-bold shadow-xl shadow-blue-600/30 transition-all active:scale-95"
              >
                <span>{lang === 'es' ? 'Solicitar Asesoría por WhatsApp →' : 'Request Consultation on WhatsApp →'}</span>
              </a>

              <button
                onClick={() => { setActiveView('trifold'); setFolded(false); }}
                className={`inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl border text-sm font-semibold transition-all ${
                  activeView === 'trifold' && !folded
                    ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-600/30'
                    : 'bg-white/[0.06] hover:bg-white/[0.1] text-slate-200 border-white/10'
                }`}
              >
                <span>📖 {lang === 'es' ? 'Ver Tríptico Desplegado' : 'View Unfolded Trifold'}</span>
              </button>

              <button
                onClick={() => setActiveView('cover')}
                className={`inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl border text-sm font-semibold transition-all ${
                  activeView === 'cover'
                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-600/30'
                    : 'bg-white/[0.06] hover:bg-white/[0.1] text-slate-200 border-white/10'
                }`}
              >
                <span>📕 {lang === 'es' ? 'Ver Portada 3D' : 'View 3D Cover'}</span>
              </button>
            </div>
          </div>

          {/* Right: The 3D Book Cover Miniature */}
          <div className="relative flex-shrink-0 group cursor-pointer z-10" onClick={() => setActiveView('cover')}>
            <div className="w-64 sm:w-72 rounded-2xl overflow-hidden shadow-2xl shadow-black border border-white/20 transform transition-all duration-500 group-hover:scale-105 group-hover:rotate-1">
              <img
                src="/brochure-cover.jpg"
                alt="AmePhia Systems 3D Official Cover"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <span className="text-xs font-bold text-white bg-blue-600 px-3 py-1.5 rounded-lg shadow">
                  {lang === 'es' ? 'Haz clic para ampliar en 3D' : 'Click to expand 3D view'}
                </span>
              </div>
            </div>
            <div className="absolute -bottom-3 -right-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-[11px] font-mono font-black px-3 py-1 rounded-lg shadow-lg border border-white/20">
              PORTADA OFICIAL 3D
            </div>
          </div>
        </div>
      </section>

      {/* ── TAB: 3D EXECUTIVE COVER DOSSIER VIEW ──────────────── */}
      {activeView === 'cover' && (
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-8 py-6">
          <div className="mb-6 flex items-center justify-between text-xs font-mono text-slate-400">
            <span className="uppercase tracking-wider flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
              {lang === 'es' ? 'PORTADA OFICIAL & DOSSIER EJECUTIVO 3D' : 'OFFICIAL COVER & 3D EXECUTIVE DOSSIER'}
            </span>
            <button
              onClick={() => { setActiveView('trifold'); setFolded(false); }}
              className="text-blue-400 hover:text-blue-300 font-bold underline flex items-center gap-1.5 cursor-pointer"
            >
              <span>{lang === 'es' ? 'Abrir tríptico desplegado completo →' : 'Unfold full trifold spread →'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-gradient-to-br from-[#080E21] via-[#050917] to-[#02050E] border border-blue-500/20 rounded-3xl p-6 sm:p-12 shadow-2xl shadow-black relative overflow-hidden">
            
            {/* Ambient Lighting Orbs */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Left 3D Book Cover Stage (5 cols) */}
            <div className="lg:col-span-5 flex flex-col items-center relative z-10">
              <div
                className="relative group cursor-pointer max-w-sm sm:max-w-md w-full transition-transform duration-700 ease-out"
                style={{ perspective: '1600px' }}
                onClick={() => { setActiveView('trifold'); setFolded(false); }}
              >
                {/* Book Shadow & Glow Effect */}
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/30 via-indigo-600/20 to-cyan-400/30 rounded-3xl blur-2xl opacity-60 group-hover:opacity-100 transition-opacity" />

                {/* Hardcover Book Wrapper */}
                <div
                  className="relative rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl shadow-black bg-slate-950 transform transition-all duration-700 group-hover:scale-[1.03] group-hover:rotate-y-[-4deg]"
                  style={{
                    boxShadow: '0 25px 60px -12px rgba(0, 0, 0, 0.95), 0 0 35px rgba(37, 99, 235, 0.25)',
                  }}
                >
                  <img
                    src="/brochure-cover.jpg"
                    alt="AmePhia Systems 3D Corporate Cover"
                    className="w-full h-auto object-cover block select-none"
                  />

                  {/* Glass Sheen overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/15 pointer-events-none" />

                  {/* Hover Prompt Badge */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#040814]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                    <span className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow-lg shadow-blue-600/40">
                      <span>📖</span>
                      <span>{lang === 'es' ? 'Haz clic para desplegar el tríptico' : 'Click to unfold trifold'}</span>
                    </span>
                  </div>
                </div>

                {/* Spine & Luxury Badges */}
                <div className="absolute -top-3 -left-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[10px] font-mono font-black px-3 py-1 rounded-lg shadow-lg border border-white/20">
                  OFFICIAL 2026 EDITION
                </div>
                <div className="absolute -bottom-3 -right-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-[10px] font-mono font-black px-3 py-1 rounded-lg shadow-lg border border-white/20">
                  HARDCOVER 3D
                </div>
              </div>

              {/* Action Buttons under Book */}
              <div className="flex flex-wrap items-center justify-center gap-2.5 mt-8 w-full">
                <button
                  onClick={() => { setActiveView('trifold'); setFolded(false); }}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 transition-all text-center flex items-center justify-center gap-1.5"
                >
                  <span>📖</span>
                  <span>{lang === 'es' ? 'Desplegar Tríptico' : 'Unfold Trifold'}</span>
                </button>
                <button
                  onClick={() => { setActiveView('trifold'); setFolded(true); }}
                  className="py-2.5 px-4 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-slate-200 border border-white/10 text-xs font-semibold transition-all text-center flex items-center justify-center gap-1.5"
                >
                  <span>📁</span>
                  <span>{lang === 'es' ? 'Vista Plegada' : 'Folded View'}</span>
                </button>
                <button
                  onClick={() => setActiveView('hd')}
                  className="py-2.5 px-4 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-slate-200 border border-white/10 text-xs font-semibold transition-all text-center flex items-center justify-center gap-1.5"
                >
                  <span>🔍</span>
                  <span>{lang === 'es' ? 'Lámina HD' : 'HD Sheet'}</span>
                </button>
              </div>
            </div>

            {/* Right Dossier Capabilities (7 cols) */}
            <div className="lg:col-span-7 space-y-6 relative z-10 text-left">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono font-bold tracking-wider uppercase">
                  <span>AmePhia Software Solutions</span>
                  <span>·</span>
                  <span className="text-slate-400">USA &amp; LatAm</span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.12]">
                  Engineering the Future of{' '}
                  <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-300 bg-clip-text text-transparent">
                    Your Business.
                  </span>
                </h2>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {lang === 'es'
                    ? 'Desarrollamos soluciones tecnológicas empresariales de alto calibre: arquitectura web de alto rendimiento, sistemas a medida, posicionamiento orgánico en buscadores y presencia estratégica en motores de Inteligencia Artificial (ChatGPT, Google Gemini y Perplexity).'
                    : 'We engineer high-caliber enterprise technology: high-performance web architecture, bespoke business applications, organic search positioning, and strategic visibility across modern AI engines (ChatGPT, Google Gemini, and Perplexity).'}
                </p>
              </div>

              {/* 4 Executive Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-blue-500/40 transition-colors space-y-1">
                  <div className="text-blue-400 font-bold text-sm flex items-center gap-2">
                    <span>🌐</span>
                    <span>{lang === 'es' ? 'Desarrollo Web Moderno' : 'Modern Web Engineering'}</span>
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    {lang === 'es'
                      ? 'Sitios rápidos, intuitivos y optimizados para convertir visitantes en clientes fidelizados.'
                      : 'Fast, secure, and intuitive web platforms designed to convert visitors into loyal clients.'}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-blue-500/40 transition-colors space-y-1">
                  <div className="text-indigo-400 font-bold text-sm flex items-center gap-2">
                    <span>⚡</span>
                    <span>{lang === 'es' ? 'Sistemas & ERP a Medida' : 'Custom Web Systems & ERP'}</span>
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    {lang === 'es'
                      ? 'Automatización de procesos operativos, control integral y flujos de negocio sin limitaciones.'
                      : 'Business automation, custom operational dashboards, and seamless enterprise workflows.'}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-blue-500/40 transition-colors space-y-1">
                  <div className="text-cyan-400 font-bold text-sm flex items-center gap-2">
                    <span>🤖</span>
                    <span>{lang === 'es' ? 'Visibilidad en Motores de IA' : 'AI & ChatGPT Visibility (GEO)'}</span>
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    {lang === 'es'
                      ? 'Optimizamos la información de tu marca para que ChatGPT y Gemini te recomienden como líder.'
                      : 'Structured optimization so ChatGPT, Perplexity, and Gemini recommend your services.'}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-blue-500/40 transition-colors space-y-1">
                  <div className="text-emerald-400 font-bold text-sm flex items-center gap-2">
                    <span>📈</span>
                    <span>{lang === 'es' ? 'Crecimiento y Conversión' : 'Conversion & Scalability'}</span>
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    {lang === 'es'
                      ? 'Campañas de pauta digital, posicionamiento SEO técnico y resultados medibles en ventas.'
                      : 'ROI-driven digital advertising, technical SEO audits, and sustainable revenue growth.'}
                  </p>
                </div>
              </div>

              {/* Footprint & Direct Actions */}
              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <div className="space-y-1 text-xs font-mono text-slate-400">
                  <div>📍 Miami, FL (USA) · Newark NJ · California</div>
                  <div className="text-blue-400">🌐 www.amephia.com · ✉️ hola@amephia.com</div>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-extrabold shadow-lg shadow-blue-600/30 transition-all active:scale-95"
                  >
                    <span>{lang === 'es' ? 'Consultar por WhatsApp →' : 'WhatsApp Consultation →'}</span>
                  </a>
                </div>
              </div>

            </div>

          </div>
        </main>
      )}

      {/* ── TAB 1: TRIFOLD VIEW (DESPLEGADO / PLEGADO) ─────────── */}
      {activeView === 'trifold' && (
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-8 py-4">
          
          <div className="mb-4 flex items-center justify-between text-xs font-mono text-slate-400">
            <span className="uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              {folded
                ? (lang === 'es' ? 'VISTA PLEGADA (PORTADA Y CONTRAPORTADA)' : 'FOLDED VIEW (FRONT & BACK COVERS)')
                : (lang === 'es' ? 'TRÍPTICO CORPORATIVO DE 3 PANELES (VISTA DESPLEGADA)' : '3-PANEL CORPORATE TRIFOLD (UNFOLDED SPREAD)')}
            </span>
            <button
              onClick={() => setFolded(!folded)}
              className="text-blue-400 hover:text-blue-300 underline font-semibold cursor-pointer"
            >
              {folded
                ? (lang === 'es' ? 'Desplegar tríptico completo →' : 'Unfold full trifold →')
                : (lang === 'es' ? 'Plegar tríptico →' : 'Fold trifold →')}
            </button>
          </div>

          {/* ═══ IF FOLDED: SHOW FRONT & BACK PANELS ═══ */}
          {folded ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Front Cover Card */}
              <div className="rounded-3xl overflow-hidden border border-white/20 shadow-2xl shadow-black bg-[#0A1124] flex flex-col">
                <div className="p-4 bg-slate-900 border-b border-white/10 flex justify-between items-center text-xs font-mono text-slate-400">
                  <span>PORTADA FRONTAL</span>
                  <span className="text-blue-400">AMEPHIA SYSTEMS</span>
                </div>
                <div className="relative aspect-[16/10] overflow-hidden bg-black">
                  <img src="/brochure-cover.jpg" alt="Portada Frontal" className="w-full h-full object-cover" />
                </div>
                <div className="p-6 space-y-2 bg-[#090F1F]">
                  <h3 className="font-extrabold text-lg text-white">Engineering the Future of Your Business</h3>
                  <p className="text-xs text-slate-300">USA (California &amp; Newark NJ) · Ecuador · LatAm</p>
                </div>
              </div>

              {/* Back Cover Card (Panel 3) */}
              <div className="rounded-3xl overflow-hidden border border-white/20 shadow-2xl shadow-black bg-[#040814] flex flex-col justify-between p-8 text-white relative">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-mono font-bold text-white text-xs">
                      &lt;/&gt;
                    </div>
                    <div>
                      <div className="font-extrabold text-lg text-white leading-none">Ame<span className="text-blue-400">Phia</span></div>
                      <div className="text-[8px] font-mono tracking-widest text-slate-400 uppercase">Software Solutions</div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-black text-white leading-tight">
                    {lang === 'es' ? 'Soluciones digitales que impulsan tu negocio.' : 'Your digital partner for what\'s next.'}
                  </h3>

                  <p className="text-xs text-slate-300">
                    {lang === 'es'
                      ? 'Sitios web, aplicaciones, marketing digital, redes sociales y presencia en IA para que tu marca siga creciendo.'
                      : 'Websites, web applications, digital marketing, social media and AI visibility to take your business further.'}
                  </p>
                </div>

                <div className="pt-6 border-t border-white/10 space-y-3 font-mono text-xs text-slate-300">
                  <div>✉️ hola@amephia.com</div>
                  <div>🌐 www.amephia.com</div>
                  <div>📍 Miami, FL – USA | LatAm (Ecuador)</div>
                  <div className="pt-2 text-right font-serif italic text-lg text-blue-300">
                    {lang === 'es' ? 'Juntos, más lejos.' : 'Let\'s build what\'s next.'}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* ═══ IF UNFOLDED: 3 FULL INTERACTIVE PANELS ═══ */
            <div className="grid grid-cols-1 lg:grid-cols-3 rounded-3xl overflow-hidden border border-white/20 shadow-2xl shadow-black bg-white text-slate-900">
              
              {/* ────────────────────────────────────────────────
                  PANEL 1 (LEFT): PROPUESTA DE VALOR & EQUIPO
              ──────────────────────────────────────────────── */}
              <div className="p-8 sm:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-200 bg-gradient-to-b from-white via-slate-50 to-blue-50/40">
                <div className="space-y-6">
                  {/* Top Brand & Tagline */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center font-mono font-bold text-white text-base shadow-lg shadow-blue-600/30">
                        &lt;/&gt;
                      </div>
                      <div>
                        <div className="font-extrabold text-xl tracking-tight text-slate-950 leading-none">
                          Ame<span className="text-blue-600">Phia</span>
                        </div>
                        <div className="text-[9px] font-mono tracking-widest text-slate-500 uppercase font-semibold">
                          Software Solutions
                        </div>
                      </div>
                    </div>
                    <div className="text-right text-[10px] font-mono tracking-wider text-slate-400 uppercase leading-tight font-semibold border-l-2 border-blue-600 pl-2.5">
                      {lang === 'es' ? (
                        <>TECNOLOGÍA<br />PERSONAS<br />RESULTADOS</>
                      ) : (
                        <>TECHNOLOGY<br />PEOPLE<br />REAL RESULTS</>
                      )}
                    </div>
                  </div>

                  {/* Main Headline */}
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight leading-[1.15]">
                    {lang === 'es' ? (
                      <>Lleva tu negocio al siguiente nivel con una <span className="text-blue-600">solución digital a tu medida.</span></>
                    ) : (
                      <>Get a professional website or web application for <span className="text-blue-600">your business today.</span></>
                    )}
                  </h2>

                  {/* Subtitle */}
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {lang === 'es'
                      ? 'Sitios web, aplicaciones y marketing digital para que tu marca atraiga más clientes y aumente tus ventas.'
                      : 'We create digital solutions that help you attract more customers, strengthen your brand and grow your business.'}
                  </p>

                  {/* Primary CTA Button */}
                  <div>
                    <a
                      href={waLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white text-sm font-bold shadow-lg shadow-blue-600/25 transition-all active:scale-[0.99]"
                    >
                      <span>{lang === 'es' ? 'Solicita una asesoría hoy →' : 'Get Started Today →'}</span>
                    </a>
                  </div>

                  {/* 3 Metric Pills */}
                  <div className="grid grid-cols-3 gap-2 pt-2 text-center">
                    <div className="p-3 rounded-xl bg-blue-50/80 border border-blue-100">
                      <div className="text-blue-600 text-lg mb-1">📊</div>
                      <div className="text-[10px] font-extrabold text-slate-800 uppercase tracking-tight">
                        {lang === 'es' ? 'Más Clientes' : 'More Customers'}
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-blue-50/80 border border-blue-100">
                      <div className="text-blue-600 text-lg mb-1">👥</div>
                      <div className="text-[10px] font-extrabold text-slate-800 uppercase tracking-tight">
                        {lang === 'es' ? 'Más Ventas' : 'More Sales'}
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-blue-50/80 border border-blue-100">
                      <div className="text-blue-600 text-lg mb-1">📈</div>
                      <div className="text-[10px] font-extrabold text-slate-800 uppercase tracking-tight">
                        {lang === 'es' ? 'Más Oportunidades' : 'Real Growth'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Team Visual with polygon badge */}
                <div className="mt-8 rounded-2xl overflow-hidden bg-slate-950 text-white relative shadow-lg">
                  <div className="aspect-[16/9] overflow-hidden bg-slate-900">
                    <img
                      src="/assets/brochure/team.jpg"
                      alt="Equipo Profesional AmePhia"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <div className="p-4 bg-gradient-to-r from-blue-900 via-slate-950 to-slate-950 border-t border-blue-500/30">
                    <div className="text-xs font-bold text-white tracking-wide">
                      {lang === 'es' ? 'Tu éxito también se construye con tecnología.' : 'Your ideas. Our technology. Real results.'}
                    </div>
                    <div className="text-[9px] text-blue-300 font-mono mt-0.5 uppercase tracking-wider">
                      AMEPHIA SOFTWARE SOLUTIONS
                    </div>
                  </div>
                </div>
              </div>

              {/* ────────────────────────────────────────────────
                  PANEL 2 (CENTER): NUESTROS SERVICIOS & CHATGPT IA
              ──────────────────────────────────────────────── */}
              <div className="p-8 sm:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-200 bg-white">
                <div className="space-y-5">
                  {/* Header */}
                  <div className="flex items-center justify-between pb-3 border-b-2 border-blue-600">
                    <h3 className="text-2xl font-extrabold text-slate-950 tracking-tight">
                      {lang === 'es' ? 'Nuestros Servicios' : 'Our Services'}
                    </h3>
                    <span className="text-[9px] font-mono uppercase tracking-wider text-slate-500 font-bold text-right max-w-[130px] leading-tight">
                      {lang === 'es' ? 'SOLUCIONES DIGITALES PARA TU NEGOCIO' : 'DIGITAL SOLUTIONS FOR YOUR BUSINESS'}
                    </span>
                  </div>

                  {/* 6 Core Services */}
                  <div className="space-y-3.5 text-xs text-slate-700">
                    {/* Service 1 */}
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm flex-shrink-0 shadow-sm">
                        🌐
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-xs sm:text-sm">
                          {lang === 'es' ? 'Desarrollo de Sitios Web' : 'Website Development'}
                        </div>
                        <div className="text-slate-500 text-[11px] leading-relaxed">
                          {lang === 'es'
                            ? 'Sitios web modernos, seguros y optimizados para representar tu marca y convertir visitantes en clientes.'
                            : 'Modern, fast and secure websites designed to represent your brand and turn visitors into customers.'}
                        </div>
                      </div>
                    </div>

                    {/* Service 2 */}
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-mono font-bold text-xs flex-shrink-0 shadow-sm">
                        &lt;/&gt;
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-xs sm:text-sm">
                          {lang === 'es' ? 'Sistemas o Aplicaciones Web' : 'Web Systems or Applications'}
                        </div>
                        <div className="text-slate-500 text-[11px] leading-relaxed">
                          {lang === 'es'
                            ? 'Desarrollamos soluciones web a la medida de tu negocio, desde plataformas de gestión hasta aplicaciones complejas.'
                            : 'We develop custom web solutions for your business, from management platforms to complex enterprise apps.'}
                        </div>
                      </div>
                    </div>

                    {/* Service 3 */}
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm flex-shrink-0 shadow-sm">
                        💻
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-xs sm:text-sm">
                          {lang === 'es' ? 'Actualización de Sitios Web' : 'Website Updates'}
                        </div>
                        <div className="text-slate-500 text-[11px] leading-relaxed">
                          {lang === 'es'
                            ? 'Renovamos tu sitio web para mejorar su diseño, rendimiento, seguridad y experiencia de usuario.'
                            : 'We improve your website\'s design, performance, security, and user experience.'}
                        </div>
                      </div>
                    </div>

                    {/* Service 4 */}
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm flex-shrink-0 shadow-sm">
                        🔍
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-xs sm:text-sm">
                          {lang === 'es' ? 'SEO y Posicionamiento Web' : 'SEO & Web Positioning'}
                        </div>
                        <div className="text-slate-500 text-[11px] leading-relaxed">
                          {lang === 'es'
                            ? 'Optimizamos tu sitio para que más personas te encuentren en Google y otros buscadores de forma orgánica.'
                            : 'We optimize your website so more people find you on Google organically, attracting qualified leads.'}
                        </div>
                      </div>
                    </div>

                    {/* Service 5 */}
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm flex-shrink-0 shadow-sm">
                        📢
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-xs sm:text-sm">
                          {lang === 'es' ? 'Pauta Digital' : 'Digital Advertising'}
                        </div>
                        <div className="text-slate-500 text-[11px] leading-relaxed">
                          {lang === 'es'
                            ? 'Creamos y gestionamos campañas en Google, Meta (Facebook e Instagram) para que tu negocio llegue a las personas correctas.'
                            : 'We create and manage targeted campaigns on Google and Meta to bring the right people to your business.'}
                        </div>
                      </div>
                    </div>

                    {/* Service 6 */}
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs flex-shrink-0 shadow-sm">
                        📱
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-xs sm:text-sm">
                          {lang === 'es' ? 'Administración de Redes Sociales' : 'Social Media Management'}
                        </div>
                        <div className="text-slate-500 text-[11px] leading-relaxed">
                          {lang === 'es'
                            ? 'Gestionamos tus redes sociales con contenido estratégico que fortalece tu marca, genera comunidad y aumenta ventas.'
                            : 'We manage your social presence with strategic content that builds community and drives sales.'}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* SPECIAL AI CARD */}
                  <div className="p-4 rounded-xl border-2 border-blue-500 bg-gradient-to-r from-blue-50 to-indigo-50/60 flex items-start gap-3.5 shadow-sm">
                    <div className="w-9 h-9 rounded-lg bg-blue-600 text-white font-mono font-bold text-xs flex items-center justify-center flex-shrink-0 shadow-md shadow-blue-600/30">
                      AI
                    </div>
                    <div>
                      <div className="font-extrabold text-blue-900 text-xs sm:text-sm">
                        {lang === 'es' ? 'Visibilidad en ChatGPT y otras IA' : 'Get Seen on ChatGPT and Other AI Platforms'}
                      </div>
                      <div className="text-slate-600 text-[11px] leading-relaxed mt-0.5">
                        {lang === 'es'
                          ? 'Optimizamos tu presencia en herramientas de IA como ChatGPT, Google Gemini y Perplexity para que tu negocio aparezca cuando buscan tus servicios.'
                          : 'We optimize your online footprint for AI tools like ChatGPT, Google Gemini, and Perplexity so your business appears when clients search for your services.'}
                      </div>
                    </div>
                  </div>

                  {/* Trust Badges */}
                  <div className="grid grid-cols-2 gap-2 pt-1 text-[10px] text-slate-600 font-medium">
                    <div className="flex items-center gap-1.5">
                      <span className="text-blue-600">🛡️</span>
                      <span>{lang === 'es' ? 'Soluciones seguras y confiables' : 'Secure & reliable solutions'}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-blue-600">👤</span>
                      <span>{lang === 'es' ? 'Atención personalizada' : 'Personalized attention'}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-blue-600">⏰</span>
                      <span>{lang === 'es' ? 'Entrega a tiempo' : 'On-time delivery'}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-blue-600">📊</span>
                      <span>{lang === 'es' ? 'Resultados medibles' : 'Measurable results'}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Banner Button */}
                <div className="mt-6 pt-3 border-t border-slate-100">
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-3 px-4 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-center transition-all text-blue-700 font-bold text-xs sm:text-sm"
                  >
                    <div>{lang === 'es' ? 'Cuéntanos tu proyecto →' : 'Let\'s talk about your project →'}</div>
                    <div className="text-[10px] font-normal text-slate-500 mt-0.5">
                      {lang === 'es' ? 'Estamos listos para hacerlo realidad.' : 'We\'re ready to make it happen.'}
                    </div>
                  </a>
                </div>
              </div>

              {/* ────────────────────────────────────────────────
                  PANEL 3 (RIGHT): SKYLINE NOCTURNO & CONTACTO
              ──────────────────────────────────────────────── */}
              <div className="p-8 sm:p-10 flex flex-col justify-between bg-[#040814] text-white relative overflow-hidden">
                {/* Modern City Skyline Graphic */}
                <div className="absolute top-0 right-0 left-0 h-44 overflow-hidden pointer-events-none opacity-40">
                  <img src="/assets/brochure/skyline.jpg" alt="Miami Skyline" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#040814]/70 to-[#040814]" />
                </div>

                <div className="space-y-6 relative z-10">
                  {/* Header Logo */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center font-mono font-bold text-white text-xs shadow-md shadow-blue-500/30">
                        &lt;/&gt;
                      </div>
                      <div>
                        <div className="font-extrabold text-lg text-white leading-none">
                          Ame<span className="text-blue-400">Phia</span>
                        </div>
                        <div className="text-[8px] font-mono tracking-widest text-slate-400 uppercase">
                          Software Solutions
                        </div>
                      </div>
                    </div>
                    <div className="text-right text-[9px] font-mono text-slate-300 uppercase leading-tight font-semibold">
                      MIAMI · NEW YORK<br />ORLANDO · LATAM
                    </div>
                  </div>

                  {/* Headline */}
                  <div className="space-y-2 pt-4">
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
                      {lang === 'es' ? (
                        <>Soluciones digitales que <span className="text-blue-400">impulsan tu negocio.</span></>
                      ) : (
                        <>Your digital partner for <span className="text-blue-400">what's next.</span></>
                      )}
                    </h3>
                    <p className="text-slate-300 text-xs leading-relaxed">
                      {lang === 'es'
                        ? 'Sitios web, aplicaciones, marketing digital, redes sociales y presencia en IA para que tu marca siga creciendo.'
                        : 'Websites, web applications, digital marketing, social media and AI visibility to take your business further.'}
                    </p>
                  </div>

                  {/* 4 Feature Badges */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 text-center">
                      <div className="text-blue-400 text-lg mb-1">🚀</div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-200">
                        {lang === 'es' ? 'Más Visibilidad' : 'More Visibility'}
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 text-center">
                      <div className="text-blue-400 text-lg mb-1">📊</div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-200">
                        {lang === 'es' ? 'Más Clientes' : 'More Customers'}
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 text-center">
                      <div className="text-blue-400 text-lg mb-1">🛡️</div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-200">
                        {lang === 'es' ? 'Más Confianza' : 'Stronger Brand'}
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 text-center">
                      <div className="text-blue-400 text-lg mb-1">📈</div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-200">
                        {lang === 'es' ? 'Más Ventas' : 'Sustainable Growth'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Official Contact Card */}
                <div className="mt-8 pt-6 border-t border-white/10 space-y-3 relative z-10">
                  <div className="space-y-1.5 text-xs text-slate-300 font-mono">
                    <div className="flex items-center gap-2">
                      <span className="text-blue-400">✉</span>
                      <a href="mailto:hola@amephia.com" className="hover:text-white transition-colors">
                        {lang === 'es' ? 'hola@amephia.com' : 'hello@amephia.com'}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-blue-400">🌐</span>
                      <a href="https://amephia.com" className="hover:text-white transition-colors">
                        www.amephia.com
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-blue-400">📍</span>
                      <span>Miami, FL – USA | LatAm (Ecuador)</span>
                    </div>
                  </div>

                  <div className="pt-3 flex items-center justify-between">
                    <div className="text-[9px] font-mono text-slate-400 leading-tight uppercase">
                      TECNOLOGÍA<br />PERSONAS<br />RESULTADOS
                    </div>
                    <div className="font-serif italic text-lg text-blue-300 tracking-wide">
                      {lang === 'es' ? 'Juntos, más lejos.' : 'Let\'s build what\'s next.'}
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}
        </main>
      )}

      {/* ── TAB 2: ORIGINAL ULTRA-HD GRAPHIC SHEET VIEWER ─────── */}
      {activeView === 'hd' && (
        <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-8 py-6 flex flex-col items-center">
          <div className="w-full mb-4 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>{lang === 'es' ? 'LÁMINA GRÁFICA ORIGINAL EN ALTA RESOLUCIÓN' : 'ORIGINAL HIGH-RESOLUTION GRAPHIC SHEET'}</span>
            <a
              href={lang === 'es' ? '/brochure-es.jpg' : '/brochure-en.jpg'}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline flex items-center gap-1"
            >
              <span>{lang === 'es' ? 'Abrir en pestaña nueva ↗' : 'Open in new tab ↗'}</span>
            </a>
          </div>

          <div className="relative w-full rounded-3xl overflow-hidden border border-white/20 shadow-2xl bg-black">
            <img
              src={lang === 'es' ? '/brochure-es.jpg' : '/brochure-en.jpg'}
              alt={lang === 'es' ? 'Brochure AmePhia Español' : 'Brochure AmePhia English'}
              className="w-full h-auto object-contain"
            />
          </div>
        </main>
      )}

      {/* ── FOOTER BAR ────────────────────────────────────────── */}
      <footer className="py-4 px-6 border-t border-white/10 bg-[#040712] text-[11px] font-mono text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-2 print:hidden">
        <div>© 2026 AmePhia Software Solutions · Miami, FL - USA · Newark NJ · Ecuador</div>
        <div className="flex items-center gap-4">
          <a href="/" className="hover:text-white transition-colors">Sitio Principal</a>
          <span>·</span>
          <a href="mailto:hola@amephia.com" className="hover:text-white transition-colors">hola@amephia.com</a>
          <span>·</span>
          <a href="https://wa.me/13347324056" target="_blank" rel="noopener" className="text-emerald-400 hover:underline">+1 (334) 732-4056</a>
        </div>
      </footer>

    </div>
  );
}
