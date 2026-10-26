import { useState, useEffect } from 'react';
import logoImg from '../assets/images/amelogo_v3_white.png';
import { trackContactClick, trackEvent, trackLeadGenerated, trackPageView } from '../lib/analytics';

const PAGE_NAMES = ['portada', 'panel-1-2', 'panel-3-cierre'];

export default function BrochurePage() {
  const [lang, setLang] = useState<'es' | 'en'>('es');
  const [viewMode, setViewMode] = useState<'book' | 'trifold' | 'hd'>('book');
  const [page, setPage] = useState<number>(0); // 0 = Cover, 1 = Pages 1 & 2, 2 = Page 3 & Executive Closing
  const [isFlipping, setIsFlipping] = useState<boolean>(false);

  useEffect(() => {
    document.title = lang === 'es'
      ? 'AmePhia Software Solutions — Brochure Tríptico Ejecutivo 2026'
      : 'AmePhia Software Solutions — Official Corporate Executive Brochure 2026';
  }, [lang]);

  // App.tsx no reporta esta ruta (ver isBrochureRoute): el page_view del
  // brochure se emite aquí, una sola vez. El cambio de idioma se registra
  // como evento propio (brochure_language), no como una visita nueva.
  useEffect(() => {
    trackPageView(
      `${window.location.pathname}${window.location.search}${window.location.hash}`,
      document.title
    );
  }, []);

  // Keyboard navigation for realistic book experience
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (viewMode !== 'book') return;
      if (e.key === 'ArrowRight' || e.key === ' ') {
        nextPage();
      } else if (e.key === 'ArrowLeft') {
        prevPage();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [viewMode, page]);

  const selectView = (mode: 'book' | 'trifold' | 'hd') => {
    if (mode !== viewMode) trackEvent('brochure_view_mode', { view_mode: mode, language: lang });
    setViewMode(mode);
  };

  const selectLang = (next: 'es' | 'en') => {
    if (next !== lang) trackEvent('brochure_language', { language: next, view_mode: viewMode });
    setLang(next);
  };

  const handlePrint = () => {
    trackEvent('brochure_download_pdf', { language: lang, view_mode: viewMode });
    window.print();
  };

  const goToPage = (newPage: number) => {
    if (newPage === page || newPage < 0 || newPage > 2) return;
    trackEvent('brochure_page_view', {
      brochure_page: newPage + 1,
      page_name: PAGE_NAMES[newPage],
      language: lang,
    });
    setIsFlipping(true);
    setTimeout(() => {
      setPage(newPage);
      setIsFlipping(false);
    }, 250);
  };

  const nextPage = () => {
    if (page < 2) goToPage(page + 1);
  };

  const prevPage = () => {
    if (page > 0) goToPage(page - 1);
  };

  const handleWhatsAppClick = (context: string) => {
    trackContactClick('whatsapp', context);
    trackLeadGenerated('whatsapp', context);
  };

  const waLink = "https://wa.me/13347324056?text=" + encodeURIComponent(
    lang === 'es'
      ? "Hola AmePhia, estuve revisando su brochure digital ejecutivo y me gustaría agendar una asesoría de ingeniería para mi empresa."
      : "Hello AmePhia, I reviewed your executive digital brochure and would like to schedule an engineering consultation for my business."
  );

  return (
    <div className="min-h-screen bg-[#030611] text-slate-100 font-sans antialiased selection:bg-blue-600 selection:text-white flex flex-col justify-between overflow-x-hidden">
      
      {/* ── TOP LUXURY BAR ────────────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-[#040816]/90 backdrop-blur-2xl border-b border-white/[0.08] px-4 sm:px-8 h-16 flex items-center justify-between print:hidden">
        {/* Brand */}
        <div className="flex items-center gap-4">
          <a href="/" className="flex items-center gap-3 group">
            <img
              src={logoImg}
              alt="AmePhia Software Solutions Logo"
              className="h-9 w-auto object-contain transition-transform group-hover:scale-105 filter drop-shadow-[0_2px_10px_rgba(37,99,235,0.35)]"
            />
          </a>
          <span className="hidden xl:inline-block text-xs font-mono text-slate-400 pl-4 border-l border-white/10 tracking-wider">
            EXECUTIVE DIGITAL DOSSIER · 2026
          </span>
        </div>

        {/* Center View Selector */}
        <div className="flex items-center gap-1 bg-white/[0.04] p-1 rounded-2xl border border-white/10 text-xs">
          <button
            onClick={() => selectView('book')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
              viewMode === 'book'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/30'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <span>📖</span>
            <span className="hidden sm:inline">{lang === 'es' ? 'Libro Digital 3D' : '3D Digital Book'}</span>
            <span className="sm:hidden">{lang === 'es' ? 'Libro' : 'Book'}</span>
          </button>

          <button
            onClick={() => selectView('trifold')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
              viewMode === 'trifold'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <span>📑</span>
            <span className="hidden sm:inline">{lang === 'es' ? 'Tríptico Panorámico' : 'Panoramic Trifold'}</span>
            <span className="sm:hidden">{lang === 'es' ? 'Tríptico' : 'Trifold'}</span>
          </button>

          <button
            onClick={() => selectView('hd')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
              viewMode === 'hd'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <span>🔍</span>
            <span className="hidden sm:inline">{lang === 'es' ? 'Lámina HD' : 'HD Sheet'}</span>
            <span className="sm:hidden">HD</span>
          </button>
        </div>

        {/* Right Action Bar */}
        <div className="flex items-center gap-2.5">
          {/* Language Toggle */}
          <div className="inline-flex rounded-xl bg-white/[0.04] p-1 border border-white/10 text-xs">
            <button
              onClick={() => selectLang('es')}
              className={`px-2.5 py-1 rounded-lg font-black transition-all ${
                lang === 'es' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              ES
            </button>
            <button
              onClick={() => selectLang('en')}
              className={`px-2.5 py-1 rounded-lg font-black transition-all ${
                lang === 'en' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              EN
            </button>
          </div>

          {/* WhatsApp Direct */}
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleWhatsAppClick("brochure_header")}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600/90 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/20 transition-all active:scale-95"
          >
            <span>WhatsApp</span>
          </a>

          {/* Download PDF button */}
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-slate-200 border border-white/10 text-xs font-bold transition-all active:scale-95"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <span className="hidden md:inline">PDF</span>
          </button>
        </div>
      </header>

      {/* ── 1. MAIN INTERACTIVE 3D FLIPBOOK VIEW (DEFAULT) ───── */}
      {viewMode === 'book' && (
        <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 relative min-h-[calc(100vh-8rem)] print:hidden">
          
          {/* Subtle Ambient Studio Lighting */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-blue-600/15 via-indigo-600/10 to-transparent rounded-full blur-3xl pointer-events-none" />

          {/* Book Stage Container */}
          <div className="w-full max-w-5xl flex flex-col items-center relative z-10">

            {/* ════ PAGE 0: CLOSED 3D HARDCOVER BOOK ════ */}
            {page === 0 && (
              <div
                className={`flex flex-col items-center cursor-pointer transition-all duration-500 ${
                  isFlipping ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                }`}
                onClick={nextPage}
              >
                {/* 3D Hardcover Book Realistic Wrapper */}
                <div
                  className="relative group transition-transform duration-500 ease-out hover:scale-[1.02]"
                  style={{
                    perspective: '1800px',
                  }}
                >
                  {/* Outer glow and shadow */}
                  <div className="absolute -inset-3 bg-gradient-to-r from-blue-600/25 via-indigo-500/15 to-cyan-400/20 rounded-3xl blur-2xl opacity-70 group-hover:opacity-100 transition-opacity" />

                  {/* Physical Book Body */}
                  <div
                    className="relative rounded-2xl overflow-hidden border-2 border-white/20 bg-black shadow-2xl"
                    style={{
                      width: 'min(440px, 86vw)',
                      aspectRatio: '505 / 658',
                      boxShadow: '0 30px 70px -10px rgba(0, 0, 0, 0.95), 0 10px 25px rgba(37, 99, 235, 0.2), inset 0 0 0 1px rgba(255,255,255,0.15)',
                    }}
                  >
                    {/* The User's Beloved Cover Crop */}
                    <img
                      src="/assets/brochure/book-cover-vertical.jpg"
                      alt="AmePhia Systems Official Book Cover"
                      className="w-full h-full object-cover block select-none"
                    />

                    {/* Book Spine Highlight (Left Edge) */}
                    <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-white/20 via-white/5 to-transparent pointer-events-none" />

                    {/* Hardcover Gloss Sheen */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-white/10 pointer-events-none" />

                    {/* Hover "Abrir Libro" Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#02050E]/90 via-[#02050E]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end items-center p-8">
                      <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-sm py-3 px-6 rounded-2xl shadow-xl shadow-blue-600/40 transform transition-transform group-hover:translate-y-0 translate-y-2">
                        <span>📖</span>
                        <span>{lang === 'es' ? 'Haz clic para abrir el dossier →' : 'Click to open dossier →'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Physical Pages Thickness Simulation (Right & Bottom edge) */}
                  <div
                    className="absolute top-2 -right-3 bottom-2 w-3 rounded-r-sm bg-gradient-to-r from-slate-300 via-slate-100 to-slate-400 border-y border-r border-slate-500/30 pointer-events-none opacity-80"
                    style={{
                      boxShadow: '2px 5px 15px rgba(0,0,0,0.8)',
                    }}
                  />
                  <div
                    className="absolute -bottom-2.5 left-4 right-1 h-2.5 rounded-b-sm bg-gradient-to-b from-slate-400 via-slate-200 to-slate-500 pointer-events-none opacity-70"
                  />
                </div>

                {/* Subtitle & Open Button under Cover */}
                <div className="mt-8 flex flex-col items-center gap-3 text-center">
                  <div className="text-xs font-mono text-slate-400 tracking-wider uppercase">
                    {lang === 'es' ? 'EDICIÓN OFICIAL 2026 · FORMATO LIBRO' : 'OFFICIAL 2026 EDITION · BOOK FORMAT'}
                  </div>
                  <button
                    onClick={nextPage}
                    className="inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-sm font-extrabold shadow-lg shadow-blue-600/30 transition-all active:scale-95 cursor-pointer"
                  >
                    <span>📖</span>
                    <span>{lang === 'es' ? 'Abrir y Explorar Dossier →' : 'Open and Explore Dossier →'}</span>
                  </button>
                </div>
              </div>
            )}

            {/* ════ PAGE 1: OPEN 2-PAGE SPREAD (PANEL 1 + PANEL 2) ════ */}
            {page === 1 && (
              <div
                className={`w-full transition-all duration-500 ${
                  isFlipping ? 'opacity-0 scale-98' : 'opacity-100 scale-100'
                }`}
              >
                {/* 2-Page Spread Container */}
                <div
                  className="relative rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl shadow-black bg-white flex flex-col md:flex-row"
                  style={{
                    boxShadow: '0 30px 80px -15px rgba(0, 0, 0, 0.95), 0 0 40px rgba(37, 99, 235, 0.15)',
                  }}
                >
                  {/* Left Page: Panel 1 (Propuesta & Equipo) */}
                  <div
                    className="relative flex-1 cursor-pointer overflow-hidden border-b md:border-b-0 md:border-r border-slate-200 bg-white"
                    onClick={prevPage}
                    title={lang === 'es' ? 'Haz clic para volver a la portada' : 'Click to return to cover'}
                  >
                    <img
                      src={lang === 'es' ? '/assets/brochure/page-es-1.jpg' : '/assets/brochure/page-en-1.jpg'}
                      alt="Panel 1 - Propuesta y Equipo"
                      className="w-full h-auto object-contain block select-none"
                    />
                    {/* Left Page Turn Indicator Button */}
                    <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md hover:bg-blue-600 text-white text-[11px] font-mono px-3 py-1 rounded-lg border border-white/10 transition-colors">
                      ← {lang === 'es' ? 'Portada' : 'Cover'}
                    </div>
                  </div>

                  {/* Center Book Spine Fold Shadow */}
                  <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-8 -translate-x-1/2 pointer-events-none bg-gradient-to-r from-black/20 via-black/5 to-black/20 z-20" />

                  {/* Right Page: Panel 2 (Servicios & ChatGPT IA) */}
                  <div
                    className="relative flex-1 cursor-pointer overflow-hidden bg-white"
                    onClick={nextPage}
                    title={lang === 'es' ? 'Haz clic para ver la contraportada' : 'Click to view back cover'}
                  >
                    <img
                      src={lang === 'es' ? '/assets/brochure/page-es-2.jpg' : '/assets/brochure/page-en-2.jpg'}
                      alt="Panel 2 - Nuestros Servicios"
                      className="w-full h-auto object-contain block select-none"
                    />
                    {/* Right Page Turn Indicator Button */}
                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md hover:bg-blue-600 text-white text-[11px] font-mono px-3 py-1 rounded-lg border border-white/10 transition-colors">
                      {lang === 'es' ? 'Siguiente' : 'Next'} →
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ════ PAGE 2: PAGE 3 & EXECUTIVE CONTACT SPREAD ════ */}
            {page === 2 && (
              <div
                className={`w-full transition-all duration-500 ${
                  isFlipping ? 'opacity-0 scale-98' : 'opacity-100 scale-100'
                }`}
              >
                {/* 2-Page Spread: Left = Panel 3 (Skyline), Right = Executive Contact Card */}
                <div
                  className="relative rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl shadow-black bg-[#040816] flex flex-col md:flex-row"
                  style={{
                    boxShadow: '0 30px 80px -15px rgba(0, 0, 0, 0.95), 0 0 40px rgba(37, 99, 235, 0.25)',
                  }}
                >
                  {/* Left Page: Panel 3 (Skyline & Canales) */}
                  <div
                    className="relative flex-1 cursor-pointer overflow-hidden border-b md:border-b-0 md:border-r border-white/10"
                    onClick={prevPage}
                    title={lang === 'es' ? 'Haz clic para volver a páginas interiores' : 'Click to return to interior pages'}
                  >
                    <img
                      src={lang === 'es' ? '/assets/brochure/page-es-3.jpg' : '/assets/brochure/page-en-3.jpg'}
                      alt="Panel 3 - Skyline y Contacto"
                      className="w-full h-auto object-contain block select-none"
                    />
                    <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md hover:bg-blue-600 text-white text-[11px] font-mono px-3 py-1 rounded-lg border border-white/10 transition-colors">
                      ← {lang === 'es' ? 'Páginas Anteriores' : 'Previous Pages'}
                    </div>
                  </div>

                  {/* Right Page: Executive Closing & VIP Actions */}
                  <div className="flex-1 p-8 sm:p-12 flex flex-col justify-between bg-gradient-to-b from-[#081026] via-[#050A1A] to-[#02050E] text-white">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <img
                          src={logoImg}
                          alt="AmePhia Software Solutions"
                          className="h-10 w-auto object-contain filter drop-shadow-[0_2px_8px_rgba(37,99,235,0.3)]"
                        />
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-[10px] font-mono font-bold uppercase tracking-wider">
                          <span>USA &amp; LATAM</span>
                        </div>
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                        {lang === 'es' ? (
                          <>Ingeniería de software de nivel superior para <span className="text-blue-400">tu negocio.</span></>
                        ) : (
                          <>Next-level software engineering for <span className="text-blue-400">your business.</span></>
                        )}
                      </h3>

                      <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                        {lang === 'es'
                          ? 'Acompañamos a líderes empresariales en EE.UU. y Ecuador a construir soluciones digitales que impulsan la productividad, multiplican las ventas y garantizan escalabilidad en la era de la IA.'
                          : 'We empower business leaders across the US and LatAm to engineer digital solutions that elevate productivity, scale revenues, and ensure longevity in the AI era.'}
                      </p>

                      {/* 3 Executive Pillars */}
                      <div className="space-y-2.5 pt-2 font-mono text-xs text-slate-300">
                        <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 flex items-center gap-3">
                          <span className="text-blue-400 font-bold">✓</span>
                          <span>{lang === 'es' ? 'Atención directa por ingenieros seniors' : 'Direct consultation with senior engineers'}</span>
                        </div>
                        <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 flex items-center gap-3">
                          <span className="text-blue-400 font-bold">✓</span>
                          <span>{lang === 'es' ? 'Optimización de visibilidad en ChatGPT & Gemini' : 'AI & ChatGPT visibility optimization'}</span>
                        </div>
                        <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 flex items-center gap-3">
                          <span className="text-blue-400 font-bold">✓</span>
                          <span>{lang === 'es' ? 'Presupuestos claros y entregas a tiempo' : 'Transparent pricing & on-time delivery'}</span>
                        </div>
                      </div>
                    </div>

                    {/* Direct Executive Actions */}
                    <div className="pt-8 space-y-3">
                      <a
                        href={waLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => handleWhatsAppClick("brochure_cierre_ejecutivo")}
                        className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-xl shadow-emerald-600/30 transition-all active:scale-98"
                      >
                        <span>💬</span>
                        <span>{lang === 'es' ? 'Iniciar Consulta por WhatsApp (+1 334 732 4056)' : 'Start Consultation on WhatsApp (+1 334 732 4056)'}</span>
                      </a>

                      <button
                        onClick={() => goToPage(0)}
                        className="w-full py-3 px-6 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-slate-300 text-xs font-bold border border-white/10 transition-colors flex items-center justify-center gap-2"
                      >
                        <span>↺</span>
                        <span>{lang === 'es' ? 'Volver a la Portada del Libro' : 'Return to Book Cover'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* ════ BOTTOM EXECUTIVE READER CONTROLS ════ */}
          <div className="mt-8 flex items-center gap-4 bg-[#050918]/90 backdrop-blur-xl px-6 py-3 rounded-2xl border border-white/10 shadow-2xl relative z-20">
            {/* Previous Button */}
            <button
              onClick={prevPage}
              disabled={page === 0}
              className={`p-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                page === 0 ? 'text-slate-600 cursor-not-allowed' : 'text-slate-200 hover:text-white hover:bg-white/10'
              }`}
            >
              <span>◀</span>
              <span className="hidden sm:inline">{lang === 'es' ? 'Anterior' : 'Previous'}</span>
            </button>

            {/* Page Dots & Numbers */}
            <div className="flex items-center gap-2 px-3 border-x border-white/10 font-mono text-xs">
              <button
                onClick={() => goToPage(0)}
                className={`w-7 h-7 rounded-lg font-bold transition-all ${
                  page === 0 ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                1
              </button>
              <button
                onClick={() => goToPage(1)}
                className={`w-7 h-7 rounded-lg font-bold transition-all ${
                  page === 1 ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                2
              </button>
              <button
                onClick={() => goToPage(2)}
                className={`w-7 h-7 rounded-lg font-bold transition-all ${
                  page === 2 ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                3
              </button>
              <span className="text-slate-500 pl-2 hidden sm:inline">
                {page === 0 && (lang === 'es' ? 'Portada 3D' : '3D Cover')}
                {page === 1 && (lang === 'es' ? 'Páginas 1 & 2' : 'Pages 1 & 2')}
                {page === 2 && (lang === 'es' ? 'Contraportada & Contacto' : 'Back Cover & Contact')}
              </span>
            </div>

            {/* Next Button */}
            <button
              onClick={nextPage}
              disabled={page === 2}
              className={`p-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                page === 2 ? 'text-slate-600 cursor-not-allowed' : 'text-slate-200 hover:text-white hover:bg-white/10'
              }`}
            >
              <span className="hidden sm:inline">{lang === 'es' ? 'Siguiente' : 'Next'}</span>
              <span>▶</span>
            </button>
          </div>

        </main>
      )}

      {/* ── 2. PANORAMIC 3-PANEL TRIFOLD VIEW ─────────────────── */}
      {viewMode === 'trifold' && (
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-8 py-6 print:hidden">
          <div className="mb-4 flex items-center justify-between text-xs font-mono text-slate-400">
            <span className="uppercase tracking-wider">
              {lang === 'es' ? 'TRÍPTICO CORPORATIVO PANORÁMICO (3 PANELES)' : 'PANORAMIC CORPORATE TRIFOLD (3 PANELS)'}
            </span>
            <button
              onClick={() => selectView('book')}
              className="text-blue-400 hover:text-blue-300 underline font-semibold cursor-pointer"
            >
              {lang === 'es' ? '← Volver al modo Libro 3D' : '← Return to 3D Book mode'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl shadow-black bg-white">
            {/* Panel 1 */}
            <div className="border-b md:border-b-0 md:border-r border-slate-200">
              <img
                src={lang === 'es' ? '/assets/brochure/page-es-1.jpg' : '/assets/brochure/page-en-1.jpg'}
                alt="Panel 1"
                className="w-full h-auto object-contain block"
              />
            </div>
            {/* Panel 2 */}
            <div className="border-b md:border-b-0 md:border-r border-slate-200">
              <img
                src={lang === 'es' ? '/assets/brochure/page-es-2.jpg' : '/assets/brochure/page-en-2.jpg'}
                alt="Panel 2"
                className="w-full h-auto object-contain block"
              />
            </div>
            {/* Panel 3 */}
            <div>
              <img
                src={lang === 'es' ? '/assets/brochure/page-es-3.jpg' : '/assets/brochure/page-en-3.jpg'}
                alt="Panel 3"
                className="w-full h-auto object-contain block"
              />
            </div>
          </div>
        </main>
      )}

      {/* ── 3. ULTRA-HD ORIGINAL GRAPHIC SHEET VIEWER ─────────── */}
      {viewMode === 'hd' && (
        <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-8 py-6 flex flex-col items-center print:hidden">
          <div className="w-full mb-4 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>{lang === 'es' ? 'LÁMINA GRÁFICA ORIGINAL EN ULTRA-ALTA DEFINICIÓN' : 'ORIGINAL ULTRA-HD GRAPHIC PRINT SHEET'}</span>
            <a
              href={lang === 'es' ? '/brochure-es.jpg' : '/brochure-en.jpg'}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("brochure_open_hd_sheet", { language: lang })}
              className="text-blue-400 hover:underline flex items-center gap-1"
            >
              <span>{lang === 'es' ? 'Abrir archivo completo en pestaña nueva ↗' : 'Open full file in new tab ↗'}</span>
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

      {/* ── DEDICATED PDF EXPORT (PRINT ONLY) ─────────────────── */}
      <div className="hidden print:block w-full bg-[#030611]">
        {/* PDF Page 1: The Beloved 3D Cover */}
        <div
          className="w-full h-screen flex items-center justify-center p-0 m-0 bg-[#030611]"
          style={{ breakAfter: 'page', pageBreakAfter: 'always' }}
        >
          <img
            src="/brochure-cover.jpg"
            alt="AmePhia Systems 3D Official Cover"
            className="w-full h-full object-contain"
          />
        </div>

        {/* PDF Page 2: The Full Panoramic Trifold Spread */}
        <div
          className="w-full h-screen flex items-center justify-center p-0 m-0 bg-[#030611]"
          style={{ breakAfter: 'page', pageBreakAfter: 'always' }}
        >
          <img
            src={lang === 'es' ? '/brochure-es.jpg' : '/brochure-en.jpg'}
            alt="AmePhia Trifold Spread"
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      {/* ── FOOTER BAR ────────────────────────────────────────── */}
      <footer className="py-4 px-6 border-t border-white/[0.08] bg-[#030611] text-[11px] font-mono text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-2 print:hidden">
        <div>© 2026 AmePhia Software Solutions · Miami, FL - USA · Newark NJ · Ecuador</div>
        <div className="flex items-center gap-4">
          <a href="/" className="hover:text-white transition-colors">Sitio Principal</a>
          <span>·</span>
          <a href="mailto:hola@amephia.com" onClick={() => { trackContactClick("email", "brochure_footer"); trackLeadGenerated("email", "brochure_footer"); }} className="hover:text-white transition-colors">hola@amephia.com</a>
          <span>·</span>
          <a href="https://wa.me/13347324056" target="_blank" rel="noopener" onClick={() => handleWhatsAppClick("brochure_footer")} className="text-emerald-400 hover:underline">+1 (334) 732-4056</a>
        </div>
      </footer>

    </div>
  );
}
