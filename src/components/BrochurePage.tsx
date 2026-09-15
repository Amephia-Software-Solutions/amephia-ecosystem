import { useState, useEffect } from 'react';

export default function BrochurePage() {
  const [lang, setLang] = useState<'es' | 'en'>('es');
  const [activeTab, setActiveTab] = useState<'book' | 'hd' | 'overview'>('book');

  useEffect(() => {
    document.title = lang === 'es'
      ? 'AmePhia Software Solutions — Brochure Corporativo Tríptico 2026'
      : 'AmePhia Software Solutions — Corporate Trifold Brochure 2026';
  }, [lang]);

  const waLink = "https://wa.me/13347324056?text=" + encodeURIComponent(
    lang === 'es'
      ? "Hola AmePhia, vi su brochure corporativo y me gustaría solicitar una asesoría para mi negocio."
      : "Hello AmePhia, I saw your corporate brochure and would like to request a consultation for my business."
  );

  return (
    <div className="min-h-screen bg-[#070B16] text-slate-100 font-sans selection:bg-blue-600 selection:text-white flex flex-col justify-between">
      {/* ── TOP NAV BAR ─────────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-[#070C18]/95 backdrop-blur-xl border-b border-white/10 px-4 sm:px-8 h-16 flex items-center justify-between print:hidden">
        <div className="flex items-center gap-4">
          <a href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center font-mono font-bold text-white text-sm shadow-md shadow-blue-500/30">
              &lt;/&gt;
            </div>
            <div>
              <span className="text-white font-extrabold text-base tracking-tight block leading-none">
                Ame<span className="text-blue-400">Phia</span>
              </span>
              <span className="text-[9px] font-mono tracking-widest text-slate-400 uppercase">
                Software Solutions
              </span>
            </div>
          </a>
          <span className="hidden md:inline-block text-xs font-mono text-slate-400 pl-3 border-l border-white/10">
            OFFICIAL TRI-FOLD &amp; CAPABILITIES BROCHURE
          </span>
        </div>

        {/* Center Mode Switcher */}
        <div className="flex items-center gap-1.5 bg-white/[0.05] p-1 rounded-xl border border-white/10 text-xs">
          <button
            onClick={() => setActiveTab('book')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              activeTab === 'book' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-300 hover:text-white'
            }`}
          >
            📖 {lang === 'es' ? 'Tríptico Interactivo' : 'Interactive Trifold'}
          </button>
          <button
            onClick={() => setActiveTab('hd')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              activeTab === 'hd' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-300 hover:text-white'
            }`}
          >
            🔍 {lang === 'es' ? 'Lámina Gráfica HD' : 'HD Graphic Sheet'}
          </button>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5">
          {/* Lang toggle */}
          <div className="inline-flex rounded-lg bg-white/[0.05] p-1 border border-white/10 text-xs">
            <button
              onClick={() => setLang('es')}
              className={`px-2.5 py-1 rounded font-bold transition-all ${
                lang === 'es' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              🇪🇸 ES
            </button>
            <button
              onClick={() => setLang('en')}
              className={`px-2.5 py-1 rounded font-bold transition-all ${
                lang === 'en' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              🇺🇸 EN
            </button>
          </div>

          {/* Print / PDF */}
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90 text-white text-xs font-bold shadow-md transition-all active:scale-95"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <span className="hidden sm:inline">{lang === 'es' ? 'Imprimir / PDF' : 'Print / PDF'}</span>
          </button>
        </div>
      </header>

      {/* ── HERO BANNER: 3D COVER DOSSIER ─────────────────────── */}
      <section className="relative py-8 px-4 sm:px-8 max-w-7xl mx-auto w-full print:hidden">
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-blue-950/40 via-[#0B132B] to-[#070B16] border border-blue-500/20 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl shadow-blue-950/40">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono font-semibold uppercase">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
              <span>{lang === 'es' ? 'Brochure Tríptico Corporativo Oficial' : 'Official Corporate Trifold Brochure'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {lang === 'es' ? (
                <>Lleva tu negocio al siguiente nivel con una <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">solución digital a tu medida</span></>
              ) : (
                <>Get a professional website or web application for <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">your business today</span></>
              )}
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              {lang === 'es'
                ? 'Sitios web modernos, aplicaciones web a medida, actualización tecnológica, posicionamiento SEO orgánico, pauta digital y optimización de presencia en motores de IA (ChatGPT, Google Gemini).'
                : 'Modern websites, custom web applications, legacy modernization, organic SEO positioning, digital advertising, and specialized visibility in AI platforms (ChatGPT, Google Gemini).'}
            </p>
          </div>

          {/* 3D Book Cover Miniature Badge */}
          <div className="relative flex-shrink-0 group">
            <div className="w-56 sm:w-64 rounded-xl overflow-hidden shadow-2xl shadow-black border border-white/20 transform transition-transform duration-500 group-hover:scale-105">
              <img src="/brochure-cover.jpg" alt="AmePhia Systems 3D Cover" className="w-full h-auto object-cover" />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white text-[10px] font-mono font-bold px-2.5 py-1 rounded-md shadow-md border border-white/20">
              PORTADA OFICIAL
            </div>
          </div>
        </div>
      </section>

      {/* ── TAB 1: INTERACTIVE FULL TRI-FOLD (PIXEL-PERFECT MAQUETADO) ── */}
      {activeTab === 'book' && (
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-8 py-4">
          <div className="mb-4 flex items-center justify-between text-xs font-mono text-slate-400">
            <span className="uppercase tracking-wider">
              {lang === 'es' ? 'VISTA TRÍPTICO DE 3 PANELES (DESPLEGADO)' : '3-PANEL TRIFOLD DISPLAY (UNFOLDED)'}
            </span>
            <span className="text-emerald-400">● 100% RESPONSIVE &amp; VECTORIAL</span>
          </div>

          {/* TRIFOLD GRID CONTAINER */}
          <div className="grid grid-cols-1 lg:grid-cols-3 rounded-2xl overflow-hidden border border-white/20 shadow-2xl shadow-black/80 bg-white text-slate-900">
            
            {/* ═════════════════════════════════════════════════
                PANEL 1 (LEFT): PROPUESTA DE VALOR & EQUIPO
            ═════════════════════════════════════════════════ */}
            <div className="p-8 sm:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-200 bg-gradient-to-b from-white via-slate-50 to-blue-50/30">
              <div className="space-y-6">
                {/* Header Logo + Tagline */}
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
                  <div className="text-right text-[10px] font-mono tracking-wider text-slate-400 uppercase leading-tight font-semibold border-l-2 border-blue-600 pl-2">
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
                  <div className="p-2.5 rounded-xl bg-blue-50/80 border border-blue-100">
                    <div className="text-blue-600 text-lg mb-0.5">📊</div>
                    <div className="text-[10px] font-extrabold text-slate-800 uppercase tracking-tight">
                      {lang === 'es' ? 'Más Clientes' : 'More Customers'}
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-blue-50/80 border border-blue-100">
                    <div className="text-blue-600 text-lg mb-0.5">👥</div>
                    <div className="text-[10px] font-extrabold text-slate-800 uppercase tracking-tight">
                      {lang === 'es' ? 'Más Ventas' : 'More Sales'}
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-blue-50/80 border border-blue-100">
                    <div className="text-blue-600 text-lg mb-0.5">📈</div>
                    <div className="text-[10px] font-extrabold text-slate-800 uppercase tracking-tight">
                      {lang === 'es' ? 'Más Oportunidades' : 'Real Growth'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Team Showcase Box */}
              <div className="mt-8 rounded-2xl overflow-hidden bg-slate-950 text-white relative shadow-md">
                <div className="p-4 bg-gradient-to-r from-blue-900 to-slate-950 border-t border-blue-500/20">
                  <div className="text-xs font-bold text-white tracking-wide">
                    {lang === 'es' ? 'Tu éxito también se construye con tecnología.' : 'Your ideas. Our technology. Real results.'}
                  </div>
                  <div className="text-[10px] text-blue-300 font-mono mt-0.5">
                    SENIOR ENGINEERING TEAM · AMEPHIA
                  </div>
                </div>
              </div>
            </div>

            {/* ═════════════════════════════════════════════════
                PANEL 2 (CENTER): NUESTROS SERVICIOS & CHATGPT IA
            ═════════════════════════════════════════════════ */}
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
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm flex-shrink-0">
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
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs flex-shrink-0 font-mono">
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
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm flex-shrink-0">
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
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm flex-shrink-0">
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
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm flex-shrink-0">
                      📢
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-xs sm:text-sm">
                        {lang === 'es' ? 'Pauta Digital' : 'Digital Advertising'}
                      </div>
                      <div className="text-slate-500 text-[11px] leading-relaxed">
                        {lang === 'es'
                          ? 'Creamos y gestionamos campañas en Google, Meta (Facebook e Instagram) para que tu negocio llegue a las personas correctas.'
                          : 'We create and manage targeted campaigns on Google and Meta (Facebook and Instagram).'}
                      </div>
                    </div>
                  </div>

                  {/* Service 6 */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs flex-shrink-0">
                      📱
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-xs sm:text-sm">
                        {lang === 'es' ? 'Administración de Redes Sociales' : 'Social Media Management'}
                      </div>
                      <div className="text-slate-500 text-[11px] leading-relaxed">
                        {lang === 'es'
                          ? 'Gestionamos tus redes sociales con contenido estratégico que fortalece tu marca, genera comunidad y aumenta ventas.'
                          : 'We manage your social presence with strategic content that builds community and drives conversions.'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* SPECIAL HIGHLIGHT CARD: VISIBILIDAD EN CHATGPT & IA */}
                <div className="p-4 rounded-xl border-2 border-blue-500 bg-gradient-to-r from-blue-50 to-indigo-50/50 flex items-start gap-3.5 shadow-sm">
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

                {/* 4 Guarantee Badges */}
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

            {/* ═════════════════════════════════════════════════
                PANEL 3 (RIGHT): SKYLINE & CONTRAPORTADA
            ═════════════════════════════════════════════════ */}
            <div className="p-8 sm:p-10 flex flex-col justify-between bg-[#040814] text-white relative overflow-hidden">
              {/* Modern City Skyline Ambient Artwork */}
              <div className="absolute top-0 right-0 left-0 h-44 bg-gradient-to-b from-blue-600/20 via-slate-900/40 to-transparent pointer-events-none" />

              <div className="space-y-6 relative z-10">
                {/* Header Logo */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center font-mono font-bold text-white text-xs">
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
                  <div className="text-right text-[9px] font-mono text-slate-400 uppercase leading-tight font-semibold">
                    {lang === 'es' ? (
                      <>MIAMI · NEW YORK<br />ORLANDO · LATAM</>
                    ) : (
                      <>MIAMI · NEW YORK<br />ORLANDO · LATAM</>
                    )}
                  </div>
                </div>

                {/* Skyline Title */}
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

                {/* 4 Pillars with icons */}
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
        </main>
      )}

      {/* ── TAB 2: ORIGINAL ULTRA-HD GRAPHIC SHEET VIEWER ─────── */}
      {activeTab === 'hd' && (
        <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-8 py-6 flex flex-col items-center">
          <div className="w-full mb-4 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>{lang === 'es' ? 'LÁMINA GRÁFICA ORIGINAL EN ALTA RESOLUCIÓN' : 'ORIGINAL HIGH-RESOLUTION GRAPHIC SHEET'}</span>
            <a
              href={lang === 'es' ? '/brochure-es.jpg' : '/brochure-en.jpg'}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline flex items-center gap-1"
            >
              <span>{lang === 'es' ? 'Abrir en pestaña nueva' : 'Open in new tab'}</span>
              <span>↗</span>
            </a>
          </div>

          <div className="relative w-full rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-black">
            <img
              src={lang === 'es' ? '/brochure-es.jpg' : '/brochure-en.jpg'}
              alt={lang === 'es' ? 'Brochure AmePhia Español' : 'Brochure AmePhia English'}
              className="w-full h-auto object-contain"
            />
          </div>
        </main>
      )}

      {/* ── FOOTER BAR ────────────────────────────────────────── */}
      <footer className="py-4 px-6 border-t border-white/10 bg-[#050811] text-[11px] font-mono text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-2 print:hidden">
        <div>© 2026 AmePhia Software Solutions · Miami, FL - USA · Newark NJ · Ecuador</div>
        <div className="flex items-center gap-4">
          <a href="/" className="hover:text-white transition-colors">Sitio Web</a>
          <span>·</span>
          <a href="mailto:hola@amephia.com" className="hover:text-white transition-colors">hola@amephia.com</a>
          <span>·</span>
          <a href="https://wa.me/13347324056" target="_blank" rel="noopener" className="text-emerald-400 hover:underline">+1 (334) 732-4056</a>
        </div>
      </footer>
    </div>
  );
}
