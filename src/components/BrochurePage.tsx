import { useEffect, useState, useRef, useCallback } from 'react';

// Icons
const Icons = {
  ChevronLeft: () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  ),
  ChevronRight: () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  ),
  BookOpen: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  ),
  Download: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  ),
  Maximize: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
    </svg>
  ),
  Phone: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
  Check: () => (
    <svg className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  ArrowUpRight: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  ),
};

export default function BrochurePage() {
  const [lang, setLang] = useState<'es' | 'en'>('es');
  const [currentSpread, setCurrentSpread] = useState<number>(0); // 0 = Cover, 1 = Pages 1-2, 2 = Pages 3-4, 3 = Pages 5-6, 4 = Pages 7-8
  const [viewMode, setViewMode] = useState<'book' | 'scroll'>('book');
  const containerRef = useRef<HTMLDivElement>(null);
  const totalSpreads = 5;

  // Key navigation
  const nextSpread = useCallback(() => {
    setCurrentSpread((prev) => Math.min(prev + 1, totalSpreads - 1));
  }, [totalSpreads]);

  const prevSpread = useCallback(() => {
    setCurrentSpread((prev) => Math.max(prev - 1, 0));
  }, []);

  useEffect(() => {
    document.title = lang === 'es'
      ? 'AmePhia Systems — Brochure Corporativo Interactivo (Libro Digital 2026)'
      : 'AmePhia Systems — Interactive Corporate Capabilities Book 2026';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (viewMode !== 'book') return;
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        nextSpread();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        prevSpread();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lang, viewMode, nextSpread, prevSpread]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-[#050811] text-slate-100 font-sans antialiased selection:bg-blue-600 selection:text-white flex flex-col justify-between">
      {/* ── TOP NAV BAR (Sticky) ────────────────────────── */}
      <header className="sticky top-0 z-50 bg-[#070C18]/95 backdrop-blur-xl border-b border-white/[0.08] px-4 sm:px-6 h-16 flex items-center justify-between print:hidden">
        <div className="flex items-center gap-4">
          <a href="/" className="flex items-center gap-2 group">
            <span className="text-white font-extrabold text-lg tracking-tight">
              Ame<span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Phia</span>
            </span>
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 px-2 py-0.5 rounded bg-white/[0.06] border border-white/[0.08]">
              Book Edition
            </span>
          </a>
          <div className="hidden lg:flex items-center gap-2 text-xs font-mono text-slate-400 pl-4 border-l border-white/[0.08]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>DOC-ID: APS-BOOK-2026</span>
          </div>
        </div>

        {/* Center Reader Controls (Book mode) */}
        {viewMode === 'book' && (
          <div className="hidden sm:flex items-center gap-2 bg-white/[0.04] p-1.5 rounded-xl border border-white/[0.08] text-xs font-mono">
            <button
              onClick={prevSpread}
              disabled={currentSpread === 0}
              className="px-2.5 py-1 rounded-lg hover:bg-white/[0.08] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              title="Página Anterior (←)"
            >
              <Icons.ChevronLeft />
            </button>
            <span className="px-3 text-slate-300 font-medium">
              {currentSpread === 0
                ? (lang === 'es' ? 'Portada' : 'Front Cover')
                : `${lang === 'es' ? 'Páginas' : 'Pages'} ${currentSpread * 2 - 1} - ${currentSpread * 2} / 8`}
            </span>
            <button
              onClick={nextSpread}
              disabled={currentSpread === totalSpreads - 1}
              className="px-2.5 py-1 rounded-lg hover:bg-white/[0.08] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              title="Página Siguiente (→)"
            >
              <Icons.ChevronRight />
            </button>
          </div>
        )}

        {/* Right Actions */}
        <div className="flex items-center gap-2.5">
          {/* View Mode Switcher */}
          <div className="hidden md:inline-flex rounded-lg bg-white/[0.05] p-1 border border-white/[0.08] text-xs">
            <button
              onClick={() => setViewMode('book')}
              className={`px-3 py-1 rounded font-semibold transition-all flex items-center gap-1.5 ${
                viewMode === 'book' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Icons.BookOpen />
              <span>{lang === 'es' ? 'Modo Libro' : 'Book View'}</span>
            </button>
            <button
              onClick={() => setViewMode('scroll')}
              className={`px-3 py-1 rounded font-semibold transition-all flex items-center gap-1.5 ${
                viewMode === 'scroll' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>{lang === 'es' ? 'Continuo' : 'Continuous'}</span>
            </button>
          </div>

          {/* Lang toggle */}
          <div className="inline-flex rounded-lg bg-white/[0.05] p-1 border border-white/[0.08] text-xs">
            <button
              onClick={() => setLang('es')}
              className={`px-2.5 py-1 rounded font-bold transition-all ${
                lang === 'es' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              ES
            </button>
            <button
              onClick={() => setLang('en')}
              className={`px-2.5 py-1 rounded font-bold transition-all ${
                lang === 'en' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              EN
            </button>
          </div>

          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            className="hidden sm:inline-flex p-2 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 border border-white/[0.08] transition-all"
            title="Pantalla Completa"
          >
            <Icons.Maximize />
          </button>

          {/* Print / PDF */}
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90 text-white text-xs font-bold shadow-md transition-all active:scale-95"
          >
            <Icons.Download />
            <span className="hidden sm:inline">{lang === 'es' ? 'Descargar PDF' : 'Download PDF'}</span>
          </button>
        </div>
      </header>

      {/* ── MAIN CONTENT AREA ─────────────────────────────────── */}
      <main className="flex-1 flex flex-col items-center justify-center p-3 sm:p-6 lg:p-10 relative overflow-hidden">
        {/* Ambient atmospheric glows */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

        {/* ═══════════ VIEW MODE: BOOK READER (FLIPBOOK STYLE) ═══════════ */}
        {viewMode === 'book' ? (
          <div className="w-full max-w-6xl mx-auto flex flex-col items-center">
            {/* BOOK STAGE CONTAINER */}
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] max-h-[82vh] rounded-2xl p-2 sm:p-4 bg-gradient-to-b from-[#0D1426] to-[#080D1A] border border-white/[0.12] shadow-2xl shadow-black/90 flex items-center justify-center">
              
              {/* SPREAD 0: FRONT COVER (CERRADO / PORTADA REAL) */}
              {currentSpread === 0 && (
                <div className="relative w-full h-full max-w-4xl rounded-xl overflow-hidden shadow-2xl shadow-black border border-white/20 flex flex-col items-center justify-center group cursor-pointer" onClick={nextSpread}>
                  <img
                    src="/brochure-cover.jpg"
                    alt="AmePhia Systems Corporate Capabilities Cover"
                    className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-[1.01]"
                  />
                  {/* Spine effect */}
                  <div className="absolute top-0 bottom-0 left-0 w-8 bg-gradient-to-r from-black/70 via-black/30 to-transparent pointer-events-none" />
                  
                  {/* Floating Open Action Button */}
                  <div className="absolute bottom-6 right-6 z-20">
                    <button
                      onClick={(e) => { e.stopPropagation(); nextSpread(); }}
                      className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:opacity-95 text-white text-sm font-bold shadow-2xl shadow-blue-600/50 flex items-center gap-3 transform group-hover:scale-105 transition-all"
                    >
                      <Icons.BookOpen />
                      <span>{lang === 'es' ? 'Abrir Brochure Corporativo →' : 'Open Corporate Brochure →'}</span>
                    </button>
                  </div>

                  {/* Corner Ribbon */}
                  <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/15 text-[11px] font-mono text-slate-300">
                    EDICIÓN EJECUTIVA 2026
                  </div>
                </div>
              )}

              {/* SPREAD 1: PAGES 1 & 2 (CARTA EJECUTIVA + ÍNDICE & PRINCIPIOS) */}
              {currentSpread === 1 && (
                <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#0A1022] border border-white/10 shadow-2xl grid grid-cols-1 md:grid-cols-2">
                  {/* Book Spine Shadow in Center */}
                  <div className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-8 bg-gradient-to-r from-black/40 via-black/70 to-black/40 z-20 pointer-events-none" />

                  {/* Left Page (Page 1): Executive Letter & Overview */}
                  <div className="p-6 sm:p-10 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/[0.08] overflow-y-auto">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-[11px] font-mono text-blue-400">
                        <span>PAG 01 // OVERVIEW</span>
                        <span>AMEPHIA SYSTEMS INC.</span>
                      </div>
                      <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight">
                        {lang === 'es' ? 'Ingeniería de Software de Alto Nivel para Empresas' : 'Enterprise Software Engineering Statement'}
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                        {lang === 'es'
                          ? 'Fundamos AmePhia Systems con una misión clara: devolverle a las empresas el control tecnológico total sobre sus sistemas, sin comisiones infladas, sin comerciales intermediarios y con código 100% propio entregado con rigor técnico.'
                          : 'AmePhia Systems was established with an unambiguous purpose: restoring sovereign technology control to enterprise leadership without inflated agency overhead, intermediaries, or hostage code.'}
                      </p>

                      {/* Stats Box */}
                      <div className="grid grid-cols-2 gap-3 pt-2">
                        <div className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                          <div className="text-xl font-bold font-mono text-blue-400">10+</div>
                          <div className="text-[10px] uppercase text-slate-400">{lang === 'es' ? 'Años Trayectoria' : 'Years Experience'}</div>
                        </div>
                        <div className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                          <div className="text-xl font-bold font-mono text-indigo-400">9</div>
                          <div className="text-[10px] uppercase text-slate-400">{lang === 'es' ? 'Sistemas Propios' : 'Proprietary Apps'}</div>
                        </div>
                        <div className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                          <div className="text-xl font-bold font-mono text-cyan-400">99.99%</div>
                          <div className="text-[10px] uppercase text-slate-400">SLA Cloud AWS</div>
                        </div>
                        <div className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                          <div className="text-xl font-bold font-mono text-emerald-400">100%</div>
                          <div className="text-[10px] uppercase text-slate-400">{lang === 'es' ? 'Código Tuyo' : 'Code Ownership'}</div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-slate-500">
                      <span>CALIFORNIA · NEWARK NJ · ECUADOR</span>
                      <span>01</span>
                    </div>
                  </div>

                  {/* Right Page (Page 2): The 4 Commitments & Governance */}
                  <div className="p-6 sm:p-10 flex flex-col justify-between bg-[#080D1C] overflow-y-auto">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-[11px] font-mono text-indigo-400">
                        <span>PAG 02 // GOVERNANCE</span>
                        <span>4 COMMITMENTS</span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-white">
                        {lang === 'es' ? 'Los 4 Pilares de Nuestra Firma' : 'The 4 Pillars of Our Practice'}
                      </h3>

                      <div className="space-y-3 pt-1">
                        <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                          <div className="text-xs font-bold text-blue-400 mb-1">01. {lang === 'es' ? 'Rigor de Ingeniería' : 'Engineering Rigor'}</div>
                          <div className="text-[11px] text-slate-300">TypeScript, microservicios, bases de datos PostgreSQL Multi-AZ y Docker.</div>
                        </div>
                        <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                          <div className="text-xs font-bold text-emerald-400 mb-1">02. {lang === 'es' ? 'Precios Conscientes' : 'Transparent Pricing'}</div>
                          <div className="text-[11px] text-slate-300">Estimaciones basadas en horas técnicas reales. Sin sobreprecios inflados.</div>
                        </div>
                        <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                          <div className="text-xs font-bold text-purple-400 mb-1">03. {lang === 'es' ? 'Acceso Directo Senior' : 'Direct Senior Access'}</div>
                          <div className="text-[11px] text-slate-300">Hablas directamente con arquitectos de software con 10+ años de experiencia.</div>
                        </div>
                        <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                          <div className="text-xs font-bold text-cyan-400 mb-1">04. {lang === 'es' ? 'Propiedad 100% del Código' : 'True IP Ownership'}</div>
                          <div className="text-[11px] text-slate-300">Repositorios GitHub, esquemas de bases de datos y propiedad formal transferida.</div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-slate-500">
                      <span>AMEPHIA BOOK 2026</span>
                      <span>02</span>
                    </div>
                  </div>
                </div>
              )}

              {/* SPREAD 2: PAGES 3 & 4 (CAPABILITIES & COMPLIANCE) */}
              {currentSpread === 2 && (
                <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#0A1022] border border-white/10 shadow-2xl grid grid-cols-1 md:grid-cols-2">
                  <div className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-8 bg-gradient-to-r from-black/40 via-black/70 to-black/40 z-20 pointer-events-none" />

                  {/* Left Page (Page 3): Core Capabilities */}
                  <div className="p-6 sm:p-10 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/[0.08] overflow-y-auto">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-[11px] font-mono text-blue-400">
                        <span>PAG 03 // SERVICES</span>
                        <span>CUSTOM ENGINEERING</span>
                      </div>
                      <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight">
                        {lang === 'es' ? 'Sistemas Web & ERPs a Medida' : 'Custom Web Systems & ERPs'}
                      </h2>

                      <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                        <p>
                          {lang === 'es'
                            ? 'Arquitectura modular para operaciones complejas: inventarios multi-bodega, conciliación financiera, portales B2B y automatización de procesos sin software genérico.'
                            : 'Architected for complex enterprise operations: multi-branch inventory, financial reconciliation, and B2B workflows configured to your exact operations.'}
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-2">
                        <div className="text-xs font-bold text-white uppercase tracking-wider">{lang === 'es' ? 'Especificaciones Técnicas' : 'Technical Specifications'}</div>
                        <ul className="space-y-1 text-xs text-slate-400 font-mono">
                          <li className="flex items-center gap-2"><Icons.Check /> React 19 / Next.js + TypeScript</li>
                          <li className="flex items-center gap-2"><Icons.Check /> PostgreSQL Multi-AZ & Row-Level Security</li>
                          <li className="flex items-center gap-2"><Icons.Check /> Contenedores Docker & Cloud AWS</li>
                          <li className="flex items-center gap-2"><Icons.Check /> Sub-1s Core Web Vitals & Google PageSpeed 95+</li>
                        </ul>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-slate-500">
                      <span>ENTERPRISE ENGINEERING</span>
                      <span>03</span>
                    </div>
                  </div>

                  {/* Right Page (Page 4): Compliance & SRI */}
                  <div className="p-6 sm:p-10 flex flex-col justify-between bg-[#080D1C] overflow-y-auto">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-[11px] font-mono text-indigo-400">
                        <span>PAG 04 // COMPLIANCE</span>
                        <span>SRI & LOPDP SECURITY</span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight">
                        {lang === 'es' ? 'Facturación SRI & Cumplimiento LOPDP' : 'SRI Tax & Data Privacy Compliance'}
                      </h3>

                      <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                        <p>
                          {lang === 'es'
                            ? 'Integración oficial con Web Services del SRI (Ecuador) para facturas, retenciones y guías con firma digital X.509, junto con la arquitectura técnica exigida por la LOPDP.'
                            : 'Direct integration with Ecuador SRI Web Services for tax receipts with X.509 digital certificates, paired with strict technical data privacy standards.'}
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-2">
                        <div className="text-xs font-bold text-white uppercase tracking-wider">{lang === 'es' ? 'Garantías Normativas' : 'Regulatory Assurances'}</div>
                        <ul className="space-y-1 text-xs text-slate-400 font-mono">
                          <li className="flex items-center gap-2"><Icons.Check /> Registro de Actividades de Tratamiento (RAT)</li>
                          <li className="flex items-center gap-2"><Icons.Check /> Notificación de brechas a SPDP en &lt;72h</li>
                          <li className="flex items-center gap-2"><Icons.Check /> Pista de auditoría con Hash Chain Merkle</li>
                          <li className="flex items-center gap-2"><Icons.Check /> Embudo de Reseñas Google Business 5★</li>
                        </ul>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-slate-500">
                      <span>AUDITABLE & CERTIFIED</span>
                      <span>04</span>
                    </div>
                  </div>
                </div>
              )}

              {/* SPREAD 3: PAGES 5 & 6 (PROPRIETARY SUITE 9 PRODUCTS) */}
              {currentSpread === 3 && (
                <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#0A1022] border border-white/10 shadow-2xl grid grid-cols-1 md:grid-cols-2">
                  <div className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-8 bg-gradient-to-r from-black/40 via-black/70 to-black/40 z-20 pointer-events-none" />

                  {/* Left Page (Page 5): Products Part 1 */}
                  <div className="p-6 sm:p-10 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/[0.08] overflow-y-auto">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-[11px] font-mono text-cyan-400">
                        <span>PAG 05 // PRODUCT SUITE</span>
                        <span>SYSTEMS 01-05</span>
                      </div>
                      <h2 className="text-lg sm:text-xl font-bold text-white">
                        {lang === 'es' ? 'Nuestras Plataformas Propietarias' : 'Proprietary Platforms (Part 1)'}
                      </h2>

                      <div className="space-y-2.5 pt-1">
                        <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.06]">
                          <div className="flex justify-between items-center text-xs font-bold text-white">
                            <span>01. FacturOn</span>
                            <span className="text-[10px] font-mono text-blue-400">SRI BILLING</span>
                          </div>
                          <div className="text-[11px] text-slate-400">Facturación electrónica ilimitada, retenciones y firma digital X.509.</div>
                        </div>

                        <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.06]">
                          <div className="flex justify-between items-center text-xs font-bold text-white">
                            <span>02. ShieldData</span>
                            <span className="text-[10px] font-mono text-indigo-400">LOPDP COMPLIANCE</span>
                          </div>
                          <div className="text-[11px] text-slate-400">Cumplimiento LOPDP / GDPR, derechos ARCO y auditoría con Merkle tree.</div>
                        </div>

                        <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.06]">
                          <div className="flex justify-between items-center text-xs font-bold text-white">
                            <span>03. ContAme</span>
                            <span className="text-[10px] font-mono text-cyan-400">NIIF ERP</span>
                          </div>
                          <div className="text-[11px] text-slate-400">ERP contable bajo NIIF, libro diario, balances y anexos ATS.</div>
                        </div>

                        <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.06]">
                          <div className="flex justify-between items-center text-xs font-bold text-white">
                            <span>04. AmeEdu</span>
                            <span className="text-[10px] font-mono text-emerald-400">ACADEMIC ERP</span>
                          </div>
                          <div className="text-[11px] text-slate-400">Gestión escolar, matrículas en línea y cobro automatizado de pensiones.</div>
                        </div>

                        <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.06]">
                          <div className="flex justify-between items-center text-xs font-bold text-white">
                            <span>05. AmeCommerce</span>
                            <span className="text-[10px] font-mono text-purple-400">E-COMMERCE</span>
                          </div>
                          <div className="text-[11px] text-slate-400">E-commerce de alto rendimiento conectado a inventario ERP y pagos.</div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-slate-500">
                      <span>ENTERPRISE SUITE</span>
                      <span>05</span>
                    </div>
                  </div>

                  {/* Right Page (Page 6): Products Part 2 */}
                  <div className="p-6 sm:p-10 flex flex-col justify-between bg-[#080D1C] overflow-y-auto">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-[11px] font-mono text-cyan-400">
                        <span>PAG 06 // PRODUCT SUITE</span>
                        <span>SYSTEMS 06-09</span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-white">
                        {lang === 'es' ? 'Plataformas Sectoriales Especializadas' : 'Specialized Sector Suites (Part 2)'}
                      </h3>

                      <div className="space-y-2.5 pt-1">
                        <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.06]">
                          <div className="flex justify-between items-center text-xs font-bold text-white">
                            <span>06. GymAme</span>
                            <span className="text-[10px] font-mono text-purple-400">IOT / ACCESS</span>
                          </div>
                          <div className="text-[11px] text-slate-400">Control de acceso biométrico, torniquetes y cobros recurrentes de gimnasios.</div>
                        </div>

                        <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.06]">
                          <div className="flex justify-between items-center text-xs font-bold text-white">
                            <span>07. BrokerSeguro</span>
                            <span className="text-[10px] font-mono text-amber-400">INSURTECH CRM</span>
                          </div>
                          <div className="text-[11px] text-slate-400">ERP para agencias de seguros, tracking de pólizas y cálculo de comisiones.</div>
                        </div>

                        <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.06]">
                          <div className="flex justify-between items-center text-xs font-bold text-white">
                            <span>08. MigraFast</span>
                            <span className="text-[10px] font-mono text-blue-400">DATA MIGRATION</span>
                          </div>
                          <div className="text-[11px] text-slate-400">Reingeniería y migración de sistemas legacy (FoxPro/Access) a PostgreSQL.</div>
                        </div>

                        <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.06]">
                          <div className="flex justify-between items-center text-xs font-bold text-white">
                            <span>09. ReviewShield</span>
                            <span className="text-[10px] font-mono text-emerald-400">GOOGLE BUSINESS</span>
                          </div>
                          <div className="text-[11px] text-slate-400">Embudo inteligente para canalizar reseñas 5 estrellas a Google Maps.</div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-slate-500">
                      <span>9 PRODUCTION APPS</span>
                      <span>06</span>
                    </div>
                  </div>
                </div>
              )}

              {/* SPREAD 4: PAGES 7 & 8 (BINATIONAL ADVANTAGE & BACK COVER) */}
              {currentSpread === 4 && (
                <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#0A1022] border border-white/10 shadow-2xl grid grid-cols-1 md:grid-cols-2">
                  <div className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-8 bg-gradient-to-r from-black/40 via-black/70 to-black/40 z-20 pointer-events-none" />

                  {/* Left Page (Page 7): Binational Presence */}
                  <div className="p-6 sm:p-10 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/[0.08] overflow-y-auto">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-[11px] font-mono text-blue-400">
                        <span>PAG 07 // GLOBAL REACH</span>
                        <span>USA & ECUADOR</span>
                      </div>
                      <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight">
                        {lang === 'es' ? 'Ventaja Binacional & Jurisdicción Dual' : 'Binational Legal & Engineering Edge'}
                      </h2>

                      <div className="space-y-3 pt-1">
                        <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.08]">
                          <div className="flex items-center gap-2 font-bold text-white text-xs mb-1">
                            <span>🇺🇸</span> <span>United States Entity</span>
                          </div>
                          <div className="text-[11px] text-slate-300 leading-relaxed font-light">
                            Contratos corporativos bajo ley de EE.UU. (California), pagos ACH / Wire en USD y facturación con W-9 / EIN oficial.
                          </div>
                        </div>

                        <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.08]">
                          <div className="flex items-center gap-2 font-bold text-white text-xs mb-1">
                            <span>🇪🇨</span> <span>Ecuador Engineering Hub</span>
                          </div>
                          <div className="text-[11px] text-slate-300 leading-relaxed font-light">
                            Centro de ingeniería en Quito, Guayaquil y Cuenca con RUC formal para emisión de facturas electrónicas con validez tributaria.
                          </div>
                        </div>
                      </div>

                      <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
                        ✓ CERO DESFASE HORARIO (EST / PST)
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-slate-500">
                      <span>GLOBAL INFRASTRUCTURE</span>
                      <span>07</span>
                    </div>
                  </div>

                  {/* Right Page (Page 8): Guarantees & Back Cover Contact */}
                  <div className="p-6 sm:p-10 flex flex-col justify-between bg-[#070B18] overflow-y-auto">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-[11px] font-mono text-emerald-400">
                        <span>PAG 08 // CLOSING</span>
                        <span>GUARANTEES & DIRECT LINE</span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight">
                        {lang === 'es' ? 'Garantías & Contacto Directo' : 'Direct Line & Guarantees'}
                      </h3>

                      <div className="space-y-2 text-xs text-slate-300 font-mono pt-1">
                        <div className="flex items-center gap-2"><Icons.Check /> NDA Bilateral desde el día 1</div>
                        <div className="flex items-center gap-2"><Icons.Check /> Entrega total de repositorios GitHub</div>
                        <div className="flex items-center gap-2"><Icons.Check /> Garantía post-entrega de 90 días</div>
                        <div className="flex items-center gap-2"><Icons.Check /> Sin comisiones ni licencias atadas</div>
                      </div>

                      {/* Official Contact Box */}
                      <div className="p-4 rounded-xl bg-blue-600/10 border border-blue-500/20 space-y-2">
                        <div className="text-xs font-bold text-white uppercase tracking-wider">{lang === 'es' ? 'Canal Directo Inmediato' : 'Direct Executive Contact'}</div>
                        <a
                          href="https://wa.me/13347324056"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-emerald-400 hover:underline font-mono text-xs font-semibold"
                        >
                          <Icons.Phone /> +1 (334) 732-4056 (WhatsApp / Llamada)
                        </a>
                        <div className="font-mono text-[11px] text-slate-300">Email: info@amephia.com</div>
                        <div className="font-mono text-[11px] text-slate-300">Web: https://amephia.com</div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-slate-500">
                      <span>© 2026 AMEPHIA SYSTEMS INC.</span>
                      <span>08</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Book Navigation Bar */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={prevSpread}
                disabled={currentSpread === 0}
                className="px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] disabled:opacity-30 disabled:cursor-not-allowed text-xs font-bold text-white border border-white/[0.08] transition-all flex items-center gap-2"
              >
                <Icons.ChevronLeft />
                <span>{lang === 'es' ? 'Anterior' : 'Previous'}</span>
              </button>

              {/* Thumbdots */}
              <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                {Array.from({ length: totalSpreads }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSpread(i)}
                    className={`h-2.5 rounded-full transition-all ${
                      currentSpread === i ? 'w-8 bg-blue-500' : 'w-2.5 bg-white/20 hover:bg-white/40'
                    }`}
                    title={`Página ${i === 0 ? 'Portada' : `${i * 2 - 1}-${i * 2}`}`}
                  />
                ))}
              </div>

              <button
                onClick={nextSpread}
                disabled={currentSpread === totalSpreads - 1}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-30 disabled:cursor-not-allowed text-xs font-bold text-white shadow-lg transition-all flex items-center gap-2"
              >
                <span>{lang === 'es' ? 'Siguiente' : 'Next'}</span>
                <Icons.ChevronRight />
              </button>
            </div>
            <div className="text-[11px] font-mono text-slate-500 mt-2 text-center">
              {lang === 'es' ? 'Usa las flechas del teclado (← / →) o toca para pasar página' : 'Use arrow keys (← / →) or tap to flip pages'}
            </div>
          </div>
        ) : (
          /* ═══════════ VIEW MODE: SCROLL CONTINUO / EDITORIAL ═══════════ */
          <div className="w-full max-w-4xl mx-auto space-y-12">
            {/* Cover display in continuous mode */}
            <div className="rounded-2xl overflow-hidden border border-white/15 shadow-2xl">
              <img src="/brochure-cover.jpg" alt="AmePhia Systems Brochure Cover" className="w-full h-auto object-cover" />
            </div>

            <div className="p-8 sm:p-12 rounded-2xl bg-[#0A1022] border border-white/10 space-y-6">
              <span className="text-xs font-mono text-blue-400 uppercase tracking-widest">SEC 01 // OVERVIEW</span>
              <h2 className="text-3xl font-extrabold text-white">Ingeniería de Software de Alto Nivel</h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                AmePhia Systems Inc. ofrece ingeniería de software sin sobreprecios, con contratos bajo ley de EE.UU. o facturación tributaria formal para Ecuador. 10+ años de trayectoria y 9 sistemas en producción.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 font-mono">
                <div className="p-3 bg-white/[0.03] rounded-lg border border-white/10"><div className="text-xl text-blue-400 font-bold">10+</div><div className="text-[10px] text-slate-400">Años</div></div>
                <div className="p-3 bg-white/[0.03] rounded-lg border border-white/10"><div className="text-xl text-indigo-400 font-bold">9</div><div className="text-[10px] text-slate-400">Sistemas</div></div>
                <div className="p-3 bg-white/[0.03] rounded-lg border border-white/10"><div className="text-xl text-cyan-400 font-bold">99.99%</div><div className="text-[10px] text-slate-400">SLA AWS</div></div>
                <div className="p-3 bg-white/[0.03] rounded-lg border border-white/10"><div className="text-xl text-emerald-400 font-bold">100%</div><div className="text-[10px] text-slate-400">Código Tuyo</div></div>
              </div>
            </div>

            <div className="p-8 sm:p-12 rounded-2xl bg-[#080D1C] border border-white/10 space-y-6">
              <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest">SEC 02 // CAPABILITIES</span>
              <h3 className="text-2xl font-bold text-white">Servicios de Ingeniería & 9 Plataformas</h3>
              <div className="grid sm:grid-cols-2 gap-4 text-xs text-slate-300 font-mono">
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">• FacturOn: Facturación SRI ilimitada</div>
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">• ShieldData: Compliance LOPDP / GDPR</div>
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">• ContAme: ERP Financiero NIIF</div>
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">• AmeEdu: Gestión Escolar y Pensiones</div>
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">• GymAme: Gimnasios y Control IoT</div>
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">• BrokerSeguro: ERP para Brokers</div>
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">• MigraFast: Migración FoxPro/Access</div>
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">• ReviewShield: Reseñas Google 5★</div>
              </div>
            </div>

            <div className="p-8 sm:p-12 rounded-2xl bg-gradient-to-r from-blue-950/40 to-indigo-950/40 border border-white/15 text-center space-y-4">
              <h3 className="text-2xl font-bold text-white">Contacto Ejecutivo Inmediato</h3>
              <p className="text-slate-300 text-xs sm:text-sm font-mono">+1 (334) 732-4056 · info@amephia.com · https://amephia.com</p>
              <a
                href="https://wa.me/13347324056"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm shadow-xl transition-all"
              >
                <Icons.Phone /> <span>Chatear por WhatsApp con Ingeniero Senior</span>
              </a>
            </div>
          </div>
        )}
      </main>

      {/* ── FOOTER BAR ────────────────────────────────────────── */}
      <footer className="py-4 px-6 border-t border-white/[0.06] bg-[#050811] text-[11px] font-mono text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2 print:hidden">
        <div>© 2026 AmePhia Systems Inc. · California, USA · Newark NJ · Ecuador</div>
        <div className="flex items-center gap-4">
          <a href="/" className="hover:text-slate-300 transition-colors">Sitio Principal</a>
          <span>·</span>
          <a href="mailto:info@amephia.com" className="hover:text-slate-300 transition-colors">info@amephia.com</a>
          <span>·</span>
          <a href="https://wa.me/13347324056" target="_blank" rel="noopener" className="text-emerald-400 hover:underline">+1 (334) 732-4056</a>
        </div>
      </footer>
    </div>
  );
}
