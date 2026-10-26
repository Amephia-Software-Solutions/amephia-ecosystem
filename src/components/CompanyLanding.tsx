import { lazy, Suspense, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import type { ProjectId } from '../projects';
import { useLanguage } from '../i18n';
import type { Language } from '../i18n';
import type { LegalPage } from './CompanyLegal';
import { openWA } from './companyContact';
const logo = '/assets/logo-nav.webp';
import { pick } from './companyShared';
import type { L } from './companyShared';

const LegalModal = lazy(() => import('./CompanyLegal').then(m => ({ default: m.LegalModal })));
const Footer = lazy(() => import('./HomeSections').then(m => ({ default: m.Footer })));
const HomeBelowFold = lazy(() => import('./HomeSections').then(m => ({ default: m.HomeBelowFold })));

/* ─── NAVBAR ────────────────────────────────────────────── */
const Navbar = () => {
  const { language, setLanguage } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState('');

  // Sección activa en el menú
  useEffect(() => {
    const ids = ['productos', 'servicios', 'confianza', 'nosotros', 'contacto'];
    const io = new IntersectionObserver(
      es => es.forEach(e => { if (e.isIntersecting) setCurrent(e.target.id); }),
      { rootMargin: '-45% 0px -50% 0px' },
    );
    const seen = new Set<string>();
    const attach = () => {
      ids.forEach(id => { const el = document.getElementById(id); if (el && !seen.has(id)) { seen.add(id); io.observe(el); } });
      return seen.size === ids.length;
    };
    let tries = 0;
    const timer = window.setInterval(() => { if (attach() || ++tries > 40) window.clearInterval(timer); }, 250);
    attach();
    return () => { window.clearInterval(timer); io.disconnect(); };
  }, []);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 24);
    h();
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', esc);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', esc); };
  }, [open]);

  const links: { id: string; label: L }[] = [
    { id: 'productos', label: { es: 'Productos', en: 'Products' } },
    { id: 'servicios', label: { es: 'Servicios', en: 'Services' } },
    { id: 'confianza', label: { es: 'Confianza', en: 'Trust' } },
    { id: 'nosotros', label: { es: 'Nosotros', en: 'About' } },
    { id: 'contacto', label: { es: 'Contacto', en: 'Contact' } },
  ];
  const go = (id: string) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    else window.location.assign(id === 'hero' ? '/' : `/#${id}`);
  };

  return (
    <>
      <header className={`am-dark fixed inset-x-0 top-0 z-50 transition-[background,border-color,padding] duration-300 ${scrolled ? 'border-b border-[color:var(--am-line)] bg-[#060B16]/95 py-3' : 'border-b border-transparent py-5'}`}>
        <div className="mx-auto flex max-w-[1320px] items-center justify-between gap-4 px-5 md:px-10">
          <a href="/" onClick={e => { if (window.location.pathname === '/') { e.preventDefault(); window.history.replaceState(null, '', '/'); window.scrollTo({ top: 0, behavior: 'smooth' }); } }} className="group flex items-center gap-3 text-white" aria-label="AmePhia Solutions - Inicio">
            <img src={logo} alt="" aria-hidden="true" width={72} height={72} className="h-10 w-10 brightness-0 invert" />
            <span className="hidden text-[17px] font-semibold tracking-[-0.01em] text-white sm:block">AmePhia Solutions</span>
          </a>

          <nav className="am-navpill hidden items-center md:flex" aria-label="Principal">
            {links.map(l => (
              <a key={l.id} href={`/#${l.id}`} data-current={current === l.id} aria-current={current === l.id ? 'true' : undefined} onClick={e => { e.preventDefault(); go(l.id); }}>
                {pick(l.label, language)}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="am-mono hidden items-center rounded-full border border-[color:var(--am-line)] bg-white/[0.04] p-1 text-[11px] sm:flex" role="group" aria-label="Language">
              {(['es', 'en'] as Language[]).map(c => (
                <button key={c} onClick={() => setLanguage(c)} aria-pressed={language === c}
                  className={`rounded-full px-3 py-1 uppercase transition-colors ${language === c ? 'bg-[color:var(--am-sig-solid)] text-white' : 'text-[color:var(--am-mute)] hover:text-white'}`}>
                  {c}
                </button>
              ))}
            </div>
            <button onClick={() => openWA(language, 'hero')} className="am-btn-sm hidden sm:inline-flex">
              {language === 'en' ? 'Talk to an engineer' : 'Hablar con un ingeniero'}
            </button>
            <button onClick={() => setOpen(true)} className="grid h-11 w-11 place-items-center rounded-full border border-[color:var(--am-line)] md:hidden" aria-label="Menu">
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {open && (
          <div
            className="am-fade-in am-dark am-sec fixed inset-0 z-[60] flex flex-col px-6 pb-10 pt-5 md:hidden"
            role="dialog" aria-modal="true"
          >
            <div className="flex items-center justify-between">
              <a href="/" aria-label="AmePhia Solutions - Inicio" onClick={() => setOpen(false)}><img src={logo} alt="AmePhia Systems" width={72} height={72} className="h-10 w-10 brightness-0 invert" /></a>
              <button onClick={() => setOpen(false)} className="grid h-11 w-11 place-items-center rounded-full border border-[color:var(--am-line)]" aria-label="Close">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-14 flex flex-1 flex-col gap-1">
              {links.map((l, i) => (
                <a
                  key={l.id} href={`/#${l.id}`} onClick={e => { e.preventDefault(); go(l.id); }}
                  style={{ animationDelay: `${0.06 * i + 0.05}s` }}
                  className="am-rise border-b border-[color:var(--am-line)] py-5 text-left text-4xl font-medium tracking-tight"
                >
                  {pick(l.label, language)}
                </a>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <div className="am-mono flex gap-4 text-sm">
                {(['es', 'en'] as Language[]).map(c => (
                  <button key={c} onClick={() => setLanguage(c)} className={`uppercase ${language === c ? 'text-[color:var(--am-sig)]' : 'text-[color:var(--am-mute)]'}`}>{c}</button>
                ))}
              </div>
              <button onClick={() => { setOpen(false); openWA(language, 'hero'); }} className="am-btn">
                {language === 'en' ? 'Talk to us' : 'Hablemos'}
              </button>
            </div>
          </div>
        )}
    </>
  );
};

/* La imagen del hero vive en #hero-bg (fuera de React): aquí solo se sincroniza su alto con el hero. */
export const useHeroBg = () => {
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-hero', '');
    const set = () => {
      const h = document.getElementById('hero');
      if (h) root.style.setProperty('--hero-h', `${h.offsetHeight}px`);
    };
    set();
    const el = document.getElementById('hero');
    const ro = new ResizeObserver(set);
    if (el) ro.observe(el);
    return () => ro.disconnect();
  }, []);
};

/* ─── HERO: fotografía en duotono marino + tarjeta de credenciales que cruza el borde ─── */
const HeroSection = () => {
  const { language } = useLanguage();
  useHeroBg();
  const en = language === 'en';

  const creds: { v: number; pre?: string; suf?: string; label: L }[] = [
    { v: 15, pre: '+', label: { es: 'años de trayectoria', en: 'years in business' } },
    { v: 9, label: { es: 'sistemas propios en producción', en: 'proprietary systems in production' } },
    { v: 2, label: { es: 'países: Ecuador y EE. UU.', en: 'countries: Ecuador and US' } },
    { v: 100, suf: ' %', label: { es: 'del código es tuyo', en: 'of the code is yours' } },
  ];

  return (
    <section id="hero" className="am-navy am-sec !bg-transparent relative z-10 mb-16 md:mb-20">

      <div className="mx-auto max-w-[1320px] px-5 pb-28 pt-36 md:px-10 md:pb-36 md:pt-44 lg:pt-52">
        <div>
          <span className="am-rule mb-7" aria-hidden="true" />
          <h1 className="am-h1 max-w-[17ch] text-white">
            {en ? 'Custom software development and technology consulting.' : 'Desarrollo de software a medida y consultoría tecnológica.'}
          </h1>
          <p className="mt-6 max-w-[44ch] text-[17px] leading-relaxed text-[color:var(--am-mute)]">
            {en ? 'Programmers and advisors with over 15 years in Ecuador and the US.' : 'Programadores y asesores con más de 15 años en Ecuador y EE. UU.'}
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <button onClick={() => openWA(language, 'hero')} className="am-btn">
              {en ? 'Request a consultation' : 'Solicitar una consultoría'}
              <ArrowUpRight className="h-4 w-4" />
            </button>
            <a href="#productos" onClick={e => { e.preventDefault(); document.getElementById('productos')?.scrollIntoView({ behavior: 'smooth' }); }} className="am-btn am-btn-ghost">
              {en ? 'See our systems' : 'Ver nuestros sistemas'}
            </a>
          </div>
        </div>
      </div>

      {/* Credenciales: la tarjeta cruza el borde del hero */}
      <div className="relative mx-auto -mb-16 max-w-[1320px] px-5 md:-mb-20 md:px-10">
        <dl className="grid grid-cols-2 overflow-hidden rounded-2xl bg-white text-[color:#0B1220] shadow-[0_30px_70px_-30px_rgba(6,14,36,.6)] md:grid-cols-4">
          {creds.map((c, k) => (
            <div key={k} className={`px-6 py-6 md:px-8 md:py-8 ${k % 2 ? 'border-l border-slate-200' : ''} ${k > 1 ? 'border-t border-slate-200 md:border-t-0' : ''} ${k > 0 ? 'md:border-l md:border-slate-200' : ''}`}>
              <dd className="text-[2.2rem] font-semibold leading-none tracking-tight tabular-nums text-[#0B1B3F] md:text-[2.8rem]">{c.pre}{c.v}{c.suf}</dd>
              <dt className="mt-2 text-[13px] leading-snug text-slate-600">{pick(c.label, language)}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};


/* ─── ESTRUCTURA COMÚN ──────────────────────────────────── */
export const SiteShell = ({ children }: { children: ReactNode }) => {
  const { language } = useLanguage();
  const [legalPage, setLegalPage] = useState<LegalPage>(null);
  return (
    <div className="am relative min-h-screen overflow-x-clip font-sans">
      <Navbar />
      <main>{children}</main>
      <Suspense fallback={<div style={{ minHeight: '24rem', background: '#040812' }} />}>
        <Footer onOpenLegal={setLegalPage} />
      </Suspense>
      {legalPage && (
        <Suspense fallback={null}>
          <LegalModal page={legalPage} onClose={() => setLegalPage(null)} lang={language} />
        </Suspense>
      )}
    </div>
  );
};

/* ─── EXPORT ────────────────────────────────────────────── */
interface CompanyLandingProps {
  onOpenProject: (id: ProjectId) => void;
}

export const CompanyLanding = ({ onOpenProject }: CompanyLandingProps) => {
  // Al llegar desde otra página con /#seccion, desplaza cuando la sección ya se montó
  useEffect(() => {
    const id = window.location.hash.replace('#', '');
    if (!id) return;
    let tries = 0;
    const timer = window.setInterval(() => {
      const el = document.getElementById(id);
      if (el) { el.scrollIntoView(); window.clearInterval(timer); }
      else if (++tries > 30) window.clearInterval(timer);
    }, 150);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <SiteShell>
      <HeroSection />
      <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
        <HomeBelowFold onOpenProject={onOpenProject} />
      </Suspense>
    </SiteShell>
  );
};
