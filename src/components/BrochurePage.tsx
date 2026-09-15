import { useEffect, useState } from 'react';

// Crisp SVG Icons (Zero amateur emojis)
const Icons = {
  Download: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  ),
  ShieldCheck: () => (
    <svg className="w-5 h-5 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
  Cpu: () => (
    <svg className="w-5 h-5 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <line x1="9" y1="1" x2="9" y2="4" />
      <line x1="15" y1="1" x2="15" y2="4" />
      <line x1="9" y1="20" x2="9" y2="23" />
      <line x1="15" y1="20" x2="15" y2="23" />
      <line x1="20" y1="9" x2="23" y2="9" />
      <line x1="20" y1="14" x2="23" y2="14" />
      <line x1="1" y1="9" x2="4" y2="9" />
      <line x1="1" y1="14" x2="4" y2="14" />
    </svg>
  ),
  Server: () => (
    <svg className="w-5 h-5 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
      <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
      <line x1="6" y1="6" x2="6.01" y2="6" />
      <line x1="6" y1="18" x2="6.01" y2="18" />
    </svg>
  ),
  Database: () => (
    <svg className="w-5 h-5 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  ),
  Scale: () => (
    <svg className="w-5 h-5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
      <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
      <path d="M7 21h10" />
      <path d="M12 3v18" />
      <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
    </svg>
  ),
  Terminal: () => (
    <svg className="w-5 h-5 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  ),
  Globe: () => (
    <svg className="w-5 h-5 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  FileCode: () => (
    <svg className="w-5 h-5 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <polyline points="10 13 8 15 10 17" />
      <polyline points="14 13 16 15 14 17" />
    </svg>
  ),
  Check: () => (
    <svg className="w-4 h-4 text-emerald-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  ArrowUpRight: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  ),
  Building: () => (
    <svg className="w-5 h-5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
      <line x1="9" y1="22" x2="9" y2="22.01" />
      <line x1="15" y1="22" x2="15" y2="22.01" />
      <line x1="9" y1="6" x2="9.01" y2="6" />
      <line x1="15" y1="6" x2="15.01" y2="6" />
      <line x1="9" y1="10" x2="9.01" y2="10" />
      <line x1="15" y1="10" x2="15.01" y2="10" />
      <line x1="9" y1="14" x2="9.01" y2="14" />
      <line x1="15" y1="14" x2="15.01" y2="14" />
      <line x1="9" y1="18" x2="9.01" y2="18" />
      <line x1="15" y1="18" x2="15.01" y2="18" />
    </svg>
  ),
  Phone: () => (
    <svg className="w-4 h-4 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
  Mail: () => (
    <svg className="w-4 h-4 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  ),
};

export default function BrochurePage() {
  const [lang, setLang] = useState<'es' | 'en'>('es');

  useEffect(() => {
    document.title = lang === 'es'
      ? 'AmePhia Systems — Brochure Corporativo & Portafolio de Ingeniería 2026'
      : 'AmePhia Systems — Corporate Capabilities Statement & Portfolio 2026';
  }, [lang]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#060A14] text-slate-100 font-sans antialiased selection:bg-blue-600 selection:text-white">
      {/* ── TOP EXECUTIVE BAR (Sticky) ────────────────────────── */}
      <header className="sticky top-0 z-50 bg-[#060A14]/90 backdrop-blur-xl border-b border-white/[0.08] print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="/" className="flex items-center gap-2 group">
              <span className="text-white font-extrabold text-lg tracking-tight">
                Ame<span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">Phia</span>
              </span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 px-2 py-0.5 rounded bg-white/[0.06] border border-white/[0.08]">
                Systems Inc.
              </span>
            </a>
            <div className="hidden md:flex items-center gap-2 pl-4 border-l border-white/[0.08] text-xs font-mono text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>REF: APS-CORP-2026-V4</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Language switch */}
            <div className="inline-flex rounded-lg bg-white/[0.05] p-1 border border-white/[0.08]">
              <button
                onClick={() => setLang('es')}
                className={`px-3 py-1 rounded text-xs font-semibold transition-all ${
                  lang === 'es' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                🇪🇸 Español
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-3 py-1 rounded text-xs font-semibold transition-all ${
                  lang === 'en' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                🇺🇸 English
              </button>
            </div>

            {/* Print / PDF Button */}
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-blue-600/20 transition-all active:scale-95"
            >
              <Icons.Download />
              <span className="hidden sm:inline">{lang === 'es' ? 'Descargar Dossier PDF' : 'Download PDF Dossier'}</span>
              <span className="sm:hidden">PDF</span>
            </button>

            <a
              href="/"
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white hover:bg-white/[0.06] border border-white/[0.08] transition-all"
            >
              <span>{lang === 'es' ? 'Volver al Sitio' : 'Back to Website'}</span>
              <Icons.ArrowUpRight />
            </a>
          </div>
        </div>
      </header>

      {/* ── COVER DOSSIER HERO ─────────────────────────────────── */}
      <section className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-white/[0.08] overflow-hidden">
        {/* Ambient atmospheric glows */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/20 rounded-full blur-[128px] pointer-events-none" />
        <div className="absolute top-1/2 -right-24 w-96 h-96 bg-purple-600/15 rounded-full blur-[128px] pointer-events-none" />

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Dossier Metadata & Value Prop */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold tracking-wide uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping" />
              <span>{lang === 'es' ? 'Brochure Corporativo Oficial 2026' : 'Official Corporate Capabilities Deck 2026'}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.12]">
              {lang === 'es' ? (
                <>
                  Ingeniería de Software de Alto Nivel.{' '}
                  <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                    Precios Justos. Código 100% Tuyo.
                  </span>
                </>
              ) : (
                <>
                  Engineering the Future of Your Business.{' '}
                  <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                    True Code Ownership.
                  </span>
                </>
              )}
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light">
              {lang === 'es'
                ? 'AmePhia Systems Inc. es una firma de ingeniería y arquitectura de software con sede corporativa en California, oficinas en Newark (New Jersey) y centro de ingeniería en Ecuador. Construimos sistemas web empresariales, ERPs robustos, facturación electrónica SRI y modernización tecnológica con rigor técnico y sin sobreprecios.'
                : 'AmePhia Systems Inc. is an enterprise software engineering and cloud architecture firm registered in California, with executive presence in Newark, NJ and technical delivery hubs in Ecuador. We deliver custom business software, ERPs, API integrations, and modern web platforms with uncompromising technical excellence and zero vendor lock-in.'}
            </p>

            {/* Credential Tags */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                <div className="text-xl font-bold font-mono text-white">10+</div>
                <div className="text-[11px] text-slate-400 uppercase tracking-wider font-medium">
                  {lang === 'es' ? 'Años Trayectoria' : 'Years Track Record'}
                </div>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                <div className="text-xl font-bold font-mono text-blue-400">9</div>
                <div className="text-[11px] text-slate-400 uppercase tracking-wider font-medium">
                  {lang === 'es' ? 'Sistemas Propios' : 'Proprietary Platforms'}
                </div>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                <div className="text-xl font-bold font-mono text-indigo-400">99.99%</div>
                <div className="text-[11px] text-slate-400 uppercase tracking-wider font-medium">
                  {lang === 'es' ? 'SLA Cloud AWS' : 'AWS Cloud SLA'}
                </div>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                <div className="text-xl font-bold font-mono text-emerald-400">100%</div>
                <div className="text-[11px] text-slate-400 uppercase tracking-wider font-medium">
                  {lang === 'es' ? 'Código Propio' : 'IP Ownership'}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-4 print:hidden">
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:opacity-90 text-white text-sm font-semibold shadow-xl shadow-blue-600/25 transition-all"
              >
                <Icons.Download />
                <span>{lang === 'es' ? 'Imprimir / Guardar como PDF' : 'Print / Save as PDF'}</span>
              </button>

              <a
                href="https://wa.me/13347324056?text=Hola%20AmePhia,%20le%C3%AD%20su%20Brochure%20Corporativo%20y%20quisiera%20conversar%20sobre%20un%20proyecto."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-sm font-semibold transition-all"
              >
                <Icons.Phone />
                <span>{lang === 'es' ? 'Hablar con un Ingeniero Senior' : 'Direct Line to Senior Engineer'}</span>
              </a>
            </div>
          </div>

          {/* Right Column: 3D Luxury Dossier Book Showcase (Featuring the user's cover image) */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="relative group max-w-lg w-full">
              {/* Outer halo / aura */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 opacity-30 blur-2xl group-hover:opacity-45 transition duration-700" />

              {/* The Dossier Frame */}
              <div className="relative rounded-2xl overflow-hidden bg-[#0A1020] border border-white/[0.15] shadow-2xl shadow-black/80">
                {/* Document Spine Bar */}
                <div className="h-9 px-4 bg-gradient-to-r from-slate-900 to-[#0A1020] border-b border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                    <span className="ml-2 font-medium text-slate-300">AMEPHIA_CAPABILITIES_2026.pdf</span>
                  </div>
                  <span className="text-slate-500 hidden sm:inline">OFFICIAL EDITION</span>
                </div>

                {/* Cover Image Presentation */}
                <div className="relative overflow-hidden bg-black aspect-[16/10] sm:aspect-[16/9]">
                  <img
                    src="/brochure-cover.jpg"
                    alt="AmePhia Systems - Corporate Brochure Cover: Engineering the Future of Your Business"
                    className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-[1.02]"
                    loading="eager"
                  />
                  {/* Subtle vignette gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060A14] via-transparent to-transparent opacity-60" />
                  
                  {/* Floating Badge */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-slate-300 bg-black/60 backdrop-blur-md px-3 py-2 rounded-lg border border-white/10 font-mono">
                    <span>USA (CA & NJ) · ECUADOR</span>
                    <span className="text-emerald-400">100% VERIFIED FIRM</span>
                  </div>
                </div>

                {/* Dossier Caption */}
                <div className="p-4 bg-[#0A1122] flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <Icons.Check />
                    <span>{lang === 'es' ? 'Documento Institucional Certificado' : 'Certified Institutional Capabilities'}</span>
                  </div>
                  <span className="font-mono text-slate-500">ID: APS-2026</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 01: THE 4 CORE COMMITMENTS ─────────────────── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-white/[0.08]">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-mono text-blue-400 uppercase tracking-widest block mb-2">
            SEC 01 // PRINCIPLES & GOVERNANCE
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {lang === 'es' ? 'Nuestros 4 Compromisos Innegociables' : 'Our 4 Non-Negotiable Commitments'}
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            {lang === 'es'
              ? 'Fundamos AmePhia sobre una premisa transparente: entregar excelencia técnica corporativa sin prácticas abusivas de la industria tradicional.'
              : 'Built on a clear premise: enterprise-grade engineering excellence with zero abusive practices, hidden costs, or hostage code.'}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="p-6 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.08] transition-all">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-5">
              <Icons.Cpu />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              {lang === 'es' ? 'Rigor de Ingeniería' : 'Engineering Rigor'}
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              {lang === 'es'
                ? 'Arquitecturas limpias basadas en TypeScript, microservicios modulares, PostgreSQL Multi-AZ y contenedores Docker para garantizar escalabilidad real y mínimo mantenimiento.'
                : 'Clean, modern stacks built on TypeScript, decoupled microservices, PostgreSQL Multi-AZ, and Docker containers designed for zero-drama scale.'}
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.08] transition-all">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-5">
              <Icons.Scale />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              {lang === 'es' ? 'Precios Conscientes' : 'Transparent Pricing'}
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              {lang === 'es'
                ? 'Tarifas éticas calculadas con base en horas de desarrollo y arquitectura real. Sin comisiones infladas, sin sorpresas de última hora y sin licencias cautivas.'
                : 'Fair, conscious project pricing based on verifiable scope and senior engineer hours. No inflated agency margins, no sudden hidden fees.'}
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.08] transition-all">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-5">
              <Icons.Terminal />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              {lang === 'es' ? 'Contacto Directo Senior' : 'Direct Senior Access'}
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              {lang === 'es'
                ? 'Trato directo de líder a líder. Tu proyecto es liderado por arquitectos de software con más de 10 años en producción, no por intermediarios comerciales.'
                : 'Zero sales intermediaries. You discuss technical requirements directly with senior software architects holding a decade in production.'}
            </p>
          </div>

          {/* Card 4 */}
          <div className="p-6 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.08] transition-all">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-5">
              <Icons.FileCode />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              {lang === 'es' ? 'Código 100% Tuyo' : '100% Code Ownership'}
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              {lang === 'es'
                ? 'El 100% del código fuente, repositorios GitHub, esquemas de bases de datos y propiedad intelectual se transfiere formalmente a tu nombre al finalizar.'
                : 'Complete source code, GitHub repos, database schemas, and intellectual property rights are formally transferred to you with full documentation.'}
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION 02: CORE SERVICES ─────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-white/[0.08]">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest block mb-2">
              SEC 02 // CAPABILITIES & SERVICES
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {lang === 'es' ? 'Servicios de Ingeniería de Software' : 'Enterprise Engineering Capabilities'}
            </h2>
          </div>
          <p className="text-slate-400 text-sm max-w-md">
            {lang === 'es'
              ? 'Soluciones tecnológicas a medida diseñadas para transformar operaciones corporativas complejas.'
              : 'Bespoke software solutions architected for high-performance business environments.'}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Service 1 */}
          <div className="p-7 rounded-2xl bg-gradient-to-br from-white/[0.04] to-transparent border border-white/[0.1] space-y-4">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
              <Icons.Database />
            </div>
            <h3 className="text-xl font-bold text-white">
              {lang === 'es' ? 'Sistemas Web Empresariales & ERP a Medida' : 'Custom Web Systems & Enterprise ERPs'}
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              {lang === 'es'
                ? 'Desarrollamos sistemas de gestión operativa, ERPs integrales, CRMs especializados y portales B2B/B2C que se adaptan exactamente a tus flujos de trabajo únicos, eliminando cuellos de botella manuales y reportes dispersos.'
                : 'End-to-end custom operational platforms, ERPs, specialized CRMs, and B2B workflows configured precisely to your proprietary operational models, replacing fragmented spreadsheets with real-time auditability.'}
            </p>
            <ul className="space-y-2 pt-2 text-xs text-slate-300 font-mono">
              <li className="flex items-center gap-2">
                <Icons.Check /> {lang === 'es' ? 'Multi-tenant con Row-Level Security' : 'Multi-tenant with Row-Level Security'}
              </li>
              <li className="flex items-center gap-2">
                <Icons.Check /> {lang === 'es' ? 'Reportes en tiempo real y exportación contable' : 'Real-time financial analytics & audit logs'}
              </li>
              <li className="flex items-center gap-2">
                <Icons.Check /> {lang === 'es' ? 'Roles, permisos jerárquicos y trazabilidad' : 'Role-based access control & full traceability'}
              </li>
            </ul>
          </div>

          {/* Service 2 */}
          <div className="p-7 rounded-2xl bg-gradient-to-br from-white/[0.04] to-transparent border border-white/[0.1] space-y-4">
            <div className="w-10 h-10 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
              <Icons.Server />
            </div>
            <h3 className="text-xl font-bold text-white">
              {lang === 'es' ? 'Modernización Web & Reingeniería de Sistemas' : 'Website Modernization & System Replatforming'}
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              {lang === 'es'
                ? 'Transformamos sitios lentos o sistemas obsoletos (Visual FoxPro, PHP antiguo, Access) hacia plataformas modernas basadas en React, Next.js y TypeScript con Core Web Vitals sub-1s, SEO orgánico de vanguardia y arquitectura responsive móvil.'
                : 'Replatforming legacy monolithic codebases (PHP 5, FoxPro, Access) into blazing-fast React and Next.js platforms optimized for sub-1s Core Web Vitals, organic search dominance, and responsive mobile parity.'}
            </p>
            <ul className="space-y-2 pt-2 text-xs text-slate-300 font-mono">
              <li className="flex items-center gap-2">
                <Icons.Check /> {lang === 'es' ? 'Puntaje 95+ en Google PageSpeed Insights' : 'Google PageSpeed 95+ performance scores'}
              </li>
              <li className="flex items-center gap-2">
                <Icons.Check /> {lang === 'es' ? 'Migración de datos histórica sin pérdida' : 'Zero-downtime historical database migration'}
              </li>
              <li className="flex items-center gap-2">
                <Icons.Check /> {lang === 'es' ? 'SEO orgánico estructurado con Schema.org' : 'Schema.org JSON-LD Rich Snippets & AI SEO'}
              </li>
            </ul>
          </div>

          {/* Service 3 */}
          <div className="p-7 rounded-2xl bg-gradient-to-br from-white/[0.04] to-transparent border border-white/[0.1] space-y-4">
            <div className="w-10 h-10 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
              <Icons.ShieldCheck />
            </div>
            <h3 className="text-xl font-bold text-white">
              {lang === 'es' ? 'Facturación SRI & Cumplimiento Normativo LOPDP' : 'SRI Invoicing & Regulatory Compliance (LOPDP)'}
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              {lang === 'es'
                ? 'Integración llave en mano de facturación electrónica con el SRI (Ecuador) y adaptación técnica estricta a la Ley Orgánica de Protección de Datos Personales (LOPDP), incluyendo registro de actividades (RAT) y auditorías con hash chain Merkle.'
                : 'Turnkey electronic tax invoicing compliant with Ecuador SRI web services, paired with compliance architecture for Personal Data Protection acts (LOPDP / GDPR), featuring automated RAT generation and tamper-proof audit trails.'}
            </p>
            <ul className="space-y-2 pt-2 text-xs text-slate-300 font-mono">
              <li className="flex items-center gap-2">
                <Icons.Check /> {lang === 'es' ? 'Firma electrónica X.509 y comprobantes XML/RIDE' : 'X.509 digital signature & XML/RIDE dispatch'}
              </li>
              <li className="flex items-center gap-2">
                <Icons.Check /> {lang === 'es' ? 'Sincronización en contingencia y modo offline' : 'Contingency queue & offline store-and-forward'}
              </li>
              <li className="flex items-center gap-2">
                <Icons.Check /> {lang === 'es' ? 'Cumplimiento normativo auditado para fiscalizaciones' : 'Inspection-ready regulatory audit logs'}
              </li>
            </ul>
          </div>

          {/* Service 4 */}
          <div className="p-7 rounded-2xl bg-gradient-to-br from-white/[0.04] to-transparent border border-white/[0.1] space-y-4">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Icons.Globe />
            </div>
            <h3 className="text-xl font-bold text-white">
              {lang === 'es' ? 'Embudo de Reputación Google Business & Reseñas' : 'Google Business Review Shield Funnel'}
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              {lang === 'es'
                ? 'Sistema automatizado para proteger la reputación digital de tu empresa: canaliza clientes satisfechos (4 y 5 estrellas) directamente a tu perfil de Google Business, mientras que las quejas se derivan a soporte interno privado para resolución inmediata.'
                : 'Intelligent review gating funnel safeguarding brand reputation: directs satisfied clients (4-5 stars) straight to your public Google Business profile while privately intercepting complaints for executive dispute resolution.'}
            </p>
            <ul className="space-y-2 pt-2 text-xs text-slate-300 font-mono">
              <li className="flex items-center gap-2">
                <Icons.Check /> {lang === 'es' ? 'Blindaje preventivo contra reseñas públicas negativas' : 'Pre-emptive filtering of negative public reviews'}
              </li>
              <li className="flex items-center gap-2">
                <Icons.Check /> {lang === 'es' ? 'Aumento comprobado del ranking local en Google Maps' : 'Proven boost in Google Maps Local Pack ranking'}
              </li>
              <li className="flex items-center gap-2">
                <Icons.Check /> {lang === 'es' ? 'Automatización de envío vía WhatsApp y Email' : 'Automated WhatsApp & Email customer triggers'}
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── SECTION 03: THE 9 PROPRIETARY PLATFORMS ────────────── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-white/[0.08]">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block mb-2">
            SEC 03 // PRODUCT SUITE
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {lang === 'es' ? 'Nuestras 9 Plataformas Propietarias en Producción' : 'Our 9 Proprietary Enterprise Platforms'}
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            {lang === 'es'
              ? 'Software robusto, probado en empresas reales en Estados Unidos y Ecuador. Desplegables de inmediato o adaptables a tus flujos.'
              : 'Production-tested enterprise solutions ready for deployment or custom adaptation across the Americas.'}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Prod 1 */}
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-blue-500/40 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-blue-400 font-semibold uppercase">01 // BILLING</span>
                <span className="text-[10px] font-mono text-slate-400 bg-white/[0.06] px-2 py-0.5 rounded">SRI CERTIFIED</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">FacturOn</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                {lang === 'es'
                  ? 'Sistema completo de facturación electrónica para Ecuador. Emisión ilimitada, retenciones, guías de remisión, notas de crédito, firma digital X.509 y envío automático a clientes.'
                  : 'Full-stack electronic tax billing suite for Ecuador. Unlimited invoice authoring, credit notes, X.509 digital certificates, and instant client dispatch.'}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/[0.06] text-[11px] font-mono text-slate-400">
              Tech: React · Node.js · SOAP SRI · PostgreSQL
            </div>
          </div>

          {/* Prod 2 */}
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-indigo-500/40 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-indigo-400 font-semibold uppercase">02 // COMPLIANCE</span>
                <span className="text-[10px] font-mono text-slate-400 bg-white/[0.06] px-2 py-0.5 rounded">LEGAL TECH</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">ShieldData</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                {lang === 'es'
                  ? 'Plataforma integral de cumplimiento LOPDP Ecuador y GDPR. Registro de actividades (RAT) asistido por IA, gestión de derechos ARCO, notificación de brechas SPDP y modo inspección formal.'
                  : 'Data privacy & regulatory compliance software. AI-assisted RAT registers, ARCO subject rights portal, SPDP breach alert pipeline, and auditor inspection rooms.'}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/[0.06] text-[11px] font-mono text-slate-400">
              Tech: Next.js · Merkle Tree · PAdES · Cloud AWS
            </div>
          </div>

          {/* Prod 3 */}
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-cyan-500/40 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-cyan-400 font-semibold uppercase">03 // FINANCE</span>
                <span className="text-[10px] font-mono text-slate-400 bg-white/[0.06] px-2 py-0.5 rounded">NIIF / GAAP</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">ContAme</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                {lang === 'es'
                  ? 'ERP contable, financiero y administrativo bajo estándares NIIF. Libro diario automático, balance general, estado de pérdidas y ganancias, anexos transaccionales ATS y gestión de inventario multi-bodega.'
                  : 'NIIF/IFRS corporate financial accounting ERP. Automated daily ledgers, P&L statements, multi-warehouse stock control, and fiscal transaction filings.'}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/[0.06] text-[11px] font-mono text-slate-400">
              Tech: TypeScript · PostgreSQL Multi-AZ · Docker
            </div>
          </div>

          {/* Prod 4 */}
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-emerald-500/40 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-emerald-400 font-semibold uppercase">04 // EDTECH</span>
                <span className="text-[10px] font-mono text-slate-400 bg-white/[0.06] px-2 py-0.5 rounded">MINEDUC READY</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">AmeEdu</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                {lang === 'es'
                  ? 'Sistema de gestión escolar para colegios y academias. Matrículas digitales, calificaciones trimestrales, portal para padres, control de asistencia y cobro automatizado de pensiones.'
                  : 'Academic management ERP for schools and institutes. Online enrollment, grading books, parental portals, attendance records, and recurring tuition billing.'}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/[0.06] text-[11px] font-mono text-slate-400">
              Tech: React · Express · Stripe/PayPhone · Postgres
            </div>
          </div>

          {/* Prod 5 */}
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-purple-500/40 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-purple-400 font-semibold uppercase">05 // WELLNESS</span>
                <span className="text-[10px] font-mono text-slate-400 bg-white/[0.06] px-2 py-0.5 rounded">IOT ACCESS</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">GymAme</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                {lang === 'es'
                  ? 'Software de gestión para gimnasios y centros deportivos. Membresías recurrentes, integración con torniquetes y cerraduras electrónicas por QR/biometría, y app web de rutinas.'
                  : 'Gym & fitness facility management software. Automated membership billing, hardware integration for turnstiles via QR/RFID, and member booking web app.'}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/[0.06] text-[11px] font-mono text-slate-400">
              Tech: IoT Gateway · WebSockets · React · Stripe
            </div>
          </div>

          {/* Prod 6 */}
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-amber-500/40 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-amber-400 font-semibold uppercase">06 // INSURTECH</span>
                <span className="text-[10px] font-mono text-slate-400 bg-white/[0.06] px-2 py-0.5 rounded">BROKER CRM</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">BrokerSeguro</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                {lang === 'es'
                  ? 'ERP para agencias y brokers de seguros. Gestión de pólizas multiaeguradora, alertas tempranas de vencimiento, cálculo de comisiones, tracking de reclamos y portal del asegurado.'
                  : 'Multi-carrier insurance broker ERP. Policy lifecycle tracking, automated renewal reminders, agent commission calculators, and policyholder claims portal.'}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/[0.06] text-[11px] font-mono text-slate-400">
              Tech: React · Node.js · Cloud Architecture · AWS
            </div>
          </div>

          {/* Prod 7 */}
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-blue-500/40 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-blue-400 font-semibold uppercase">07 // DATA MIGRATION</span>
                <span className="text-[10px] font-mono text-slate-400 bg-white/[0.06] px-2 py-0.5 rounded">ZERO DATA LOSS</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">MigraFast</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                {lang === 'es'
                  ? 'Herramienta de migración y modernización de bases de datos. Extracción, limpieza y carga de sistemas legados (FoxPro, Access, SQL Server antiguo) hacia arquitecturas cloud modernas.'
                  : 'Legacy database migration and ETL platform. Automated schema mapping and sanitized data ingestion from old FoxPro, DBF, or Access into cloud PostgreSQL.'}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/[0.06] text-[11px] font-mono text-slate-400">
              Tech: Go / Python ETL · Docker · PostgreSQL
            </div>
          </div>

          {/* Prod 8 */}
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-emerald-500/40 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-emerald-400 font-semibold uppercase">08 // REPUTATION</span>
                <span className="text-[10px] font-mono text-slate-400 bg-white/[0.06] px-2 py-0.5 rounded">GOOGLE BUSINESS</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">ReviewShield</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                {lang === 'es'
                  ? 'Embudo inteligente de reseñas para Google Business. Filtra insatisfacciones antes de que lleguen a Google y canaliza a clientes felices para disparar tus calificaciones 5 estrellas.'
                  : 'Customer sentiment filter and review funnel. Proactively diverts unhappy client feedback to management while boosting 5-star Google Business reviews.'}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/[0.06] text-[11px] font-mono text-slate-400">
              Tech: WhatsApp API · Next.js · Google Places API
            </div>
          </div>

          {/* Prod 9 */}
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-cyan-500/40 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-cyan-400 font-semibold uppercase">09 // COMMERCE</span>
                <span className="text-[10px] font-mono text-slate-400 bg-white/[0.06] px-2 py-0.5 rounded">HIGH TRAFFIC</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">AmeCommerce</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                {lang === 'es'
                  ? 'Plataforma e-commerce B2B y B2C de alta velocidad. Conexión nativa con inventarios ERP, pasarelas de pago (Stripe, PayPhone, Datafast) y sincronización con facturación SRI.'
                  : 'Enterprise B2B/B2C headless commerce engine. Native ERP inventory sync, real-time credit card processing, and instantaneous tax receipt emission.'}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/[0.06] text-[11px] font-mono text-slate-400">
              Tech: React · Node.js · Stripe · PayPhone · Postgres
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 04: DUAL PRESENCE (USA & ECUADOR) ──────────── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-white/[0.08]">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest block mb-2">
            SEC 04 // GLOBAL FOOTPRINT
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {lang === 'es' ? 'Presencia Binacional: Estados Unidos & Ecuador' : 'Binational Advantage: United States & Ecuador'}
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            {lang === 'es'
              ? 'La solidez legal y financiera de una corporación estadounidense combinada con la agilidad y ventaja de costos del talento de ingeniería de Ecuador.'
              : 'US corporate and contractual safeguards paired with high-caliber nearshore engineering delivery and zero timezone friction.'}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* USA Box */}
          <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/[0.08] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">🇺🇸</span>
              <div>
                <h3 className="text-lg font-bold text-white">United States Operations</h3>
                <span className="text-xs font-mono text-slate-400">California & Newark, New Jersey</span>
              </div>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              {lang === 'es'
                ? 'Constitución corporativa formal en EE.UU. Permite a clientes norteamericanos e internacionales celebrar contratos comerciales regidos por ley estadounidense, pagos directos vía ACH / Wire en USD, y facturación con W-9/EIN oficial.'
                : 'Formally incorporated US corporate entity. US and global enterprise clients execute enforceable service agreements under US jurisdiction, with direct domestic ACH/Wire transfers and official W-9/EIN compliance.'}
            </p>

            <ul className="space-y-2.5 text-xs text-slate-300 font-mono">
              <li className="flex items-center gap-2">
                <Icons.Check /> {lang === 'es' ? 'Contratos con marco legal de EE.UU. (California Law)' : 'US Law Contracts & Enforceable Master Service Agreements'}
              </li>
              <li className="flex items-center gap-2">
                <Icons.Check /> {lang === 'es' ? 'Pagos ACH, Wire Transfer y tarjetas en USD' : 'Direct US Banking: ACH, Domestic Wire & Card Processing'}
              </li>
              <li className="flex items-center gap-2">
                <Icons.Check /> {lang === 'es' ? 'Zona horaria EST y PST para comunicación continua' : 'Aligned Time Zones (EST & PST) with zero turnaround lag'}
              </li>
            </ul>
          </div>

          {/* Ecuador Box */}
          <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/[0.08] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/10 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">🇪🇨</span>
              <div>
                <h3 className="text-lg font-bold text-white">Ecuador Engineering Hub</h3>
                <span className="text-xs font-mono text-slate-400">Quito, Guayaquil & Cuenca</span>
              </div>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              {lang === 'es'
                ? 'Centro principal de desarrollo e innovación tecnológica. RUC formal para emisión de facturas electrónicas con validez tributaria para empresas ecuatorianas, cumplimiento estricto con SRI y marco LOPDP.'
                : 'Primary software engineering and technical innovation hub. Direct domestic invoicing for Ecuadorian enterprises with complete SRI tax accreditation and local engineering support.'}
            </p>

            <ul className="space-y-2.5 text-xs text-slate-300 font-mono">
              <li className="flex items-center gap-2">
                <Icons.Check /> {lang === 'es' ? 'Facturación electrónica autorizada por el SRI con RUC' : 'Official SRI Tax-Deductible Invoicing (RUC Registered)'}
              </li>
              <li className="flex items-center gap-2">
                <Icons.Check /> {lang === 'es' ? 'Cumplimiento normativo y auditoría de LOPDP' : 'Audited Compliance with Data Protection Authorities'}
              </li>
              <li className="flex items-center gap-2">
                <Icons.Check /> {lang === 'es' ? 'Costos de ingeniería altamente competitivos' : 'Tier-1 nearshore cost efficiency without quality sacrifice'}
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── SECTION 05: CONTRACTUAL GUARANTEES ─────────────────── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-white/[0.08]">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-blue-900/20 via-indigo-900/20 to-transparent border border-white/[0.12] space-y-6">
          <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest block">
            SEC 05 // CONTRACTUAL PROTECTIONS
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {lang === 'es' ? 'Garantías Formales en Cada Proyecto' : 'Contractual Protections on Every Engagement'}
          </h2>

          <div className="grid sm:grid-cols-3 gap-6 pt-4">
            <div className="space-y-2">
              <div className="text-white font-bold text-base flex items-center gap-2">
                <Icons.ShieldCheck />
                <span>{lang === 'es' ? 'NDA & Confidencialidad' : 'Enforceable NDA'}</span>
              </div>
              <p className="text-slate-300 text-xs leading-relaxed">
                {lang === 'es'
                  ? 'Firmamos acuerdos de estricta confidencialidad antes de revisar cualquier especificación o base de datos de tu empresa.'
                  : 'Bilateral confidentiality agreements executed before inspecting proprietary specs, databases, or trade secrets.'}
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-white font-bold text-base flex items-center gap-2">
                <Icons.FileCode />
                <span>{lang === 'es' ? 'Entrega de Repositorio' : 'Full Repository Handover'}</span>
              </div>
              <p className="text-slate-300 text-xs leading-relaxed">
                {lang === 'es'
                  ? 'Transfiriendo la titularidad en GitHub, credenciales cloud y documentación técnica completa. Cero códigos retenidos.'
                  : 'Complete GitHub repository transfer, cloud credentials ownership, and exhaustive architecture documentation.'}
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-white font-bold text-base flex items-center gap-2">
                <Icons.Check />
                <span>{lang === 'es' ? 'Garantía Técnica 90 Días' : '90-Day Post-Launch Warranty'}</span>
              </div>
              <p className="text-slate-300 text-xs leading-relaxed">
                {lang === 'es'
                  ? 'Corrección garantizada sin costo de cualquier inconsistencia o bug técnico posterior al despliegue en producción.'
                  : 'Guaranteed remediation of any production bug or specification divergence for 90 days at zero extra cost.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 06: OFFICIAL CONTACT & VERIFICATION ────────── */}
      <footer className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-12 gap-8 items-start mb-12">
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-white font-extrabold text-2xl tracking-tight">
                Ame<span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Phia</span>
              </span>
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 px-2 py-0.5 rounded bg-white/[0.06]">
                Systems Inc.
              </span>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              {lang === 'es'
                ? 'Firma internacional de ingeniería de software y soluciones tecnológicas corporativas. Presencia en California, Newark NJ y Ecuador.'
                : 'International software engineering and enterprise technology solutions firm. Operating across California, Newark NJ, and Ecuador.'}
            </p>
            <div className="text-xs font-mono text-slate-500 pt-2">
              TAX ID / EIN: REGISTERED CORP · REG. SRI ECUADOR
            </div>
          </div>

          <div className="md:col-span-7 grid sm:grid-cols-2 gap-6 text-xs text-slate-300">
            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.08] space-y-3">
              <div className="font-bold text-white text-sm flex items-center gap-2">
                <Icons.Building />
                <span>{lang === 'es' ? 'Canales Directos' : 'Executive Inquiries'}</span>
              </div>
              <div className="space-y-2">
                <a
                  href="https://wa.me/13347324056"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-slate-300 hover:text-emerald-400 transition-colors"
                >
                  <Icons.Phone />
                  <span className="font-mono">+1 (334) 732-4056 (WhatsApp / Call)</span>
                </a>
                <a
                  href="mailto:info@amephia.com"
                  className="flex items-center gap-2 text-slate-300 hover:text-blue-400 transition-colors"
                >
                  <Icons.Mail />
                  <span className="font-mono">info@amephia.com</span>
                </a>
                <a
                  href="https://amephia.com"
                  className="flex items-center gap-2 text-slate-300 hover:text-cyan-400 transition-colors"
                >
                  <Icons.Globe />
                  <span className="font-mono">https://amephia.com</span>
                </a>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.08] space-y-3">
              <div className="font-bold text-white text-sm flex items-center gap-2">
                <Icons.Globe />
                <span>{lang === 'es' ? 'Sedes Corporativas' : 'Office Locations'}</span>
              </div>
              <div className="space-y-2 text-slate-400 leading-relaxed font-mono">
                <div>• California, United States</div>
                <div>• Newark, New Jersey, United States</div>
                <div>• Quito & Guayaquil, Ecuador</div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-500 gap-4">
          <div>© 2026 AmePhia Systems Inc. All rights reserved.</div>
          <div>DOCUMENT CLASSIFICATION: PUBLIC CORPORATE DOSSIER</div>
        </div>
      </footer>
    </div>
  );
}
