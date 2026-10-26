import { useState } from 'react';
import type { ReactNode } from 'react';
import type { TargetAndTransition } from 'framer-motion';
import { LazyMotion, domAnimation, m, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Check, Clock, Code2, FileCode2, FileSignature, FileText, LifeBuoy, Mail, MapPin, Phone, Rocket, Search, Send, Server, ShieldCheck } from 'lucide-react';
import { trackLeadGenerated } from '../lib/analytics';
import { getContactEmail, openEmailClient } from '../lib/emailUtils';
import type { ProjectId } from '../projects';
import { useLanguage } from '../i18n';
import type { LegalPage } from './CompanyLegal';
import { openWA } from './companyContact';
const logo = '/assets/logo-nav.webp';
import { SERVICES } from '../data/services';
import { pick } from './companyShared';
import type { L } from './companyShared';

/* ─── REVEAL ──────────────────────────────────────────────
   Variantes para que las secciones no entren todas igual.
   Con movimiento reducido el contenido queda visible desde el inicio. */
export const EASE = [0.16, 1, 0.3, 1] as const;
type RevealKind = 'up' | 'left' | 'scale' | 'mask';
const revealFrom: Record<RevealKind, TargetAndTransition> = {
  up: { opacity: 0, y: 12 },
  left: { opacity: 0, x: -18 },
  scale: { opacity: 0, y: 14 },
  mask: { opacity: 0, y: 18 },
};
const revealTo: Record<RevealKind, TargetAndTransition> = {
  up: { opacity: 1, y: 0 },
  left: { opacity: 1, x: 0 },
  scale: { opacity: 1, y: 0 },
  mask: { opacity: 1, y: 0 },
};
export const Reveal = ({ children, delay = 0, className = '', kind = 'up' }: { children: ReactNode; delay?: number; className?: string; kind?: RevealKind }) => {
  const reduced = useReducedMotion();
  return (
    <m.div
      className={className}
      initial={reduced ? false : revealFrom[kind]}
      whileInView={revealTo[kind]}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </m.div>
  );
};

/* ─── TITULAR (entrada suave) ───────────────────────────── */
export const H2 = ({ children, className = '' }: { children: string; className?: string }) => {
  const reduced = useReducedMotion();
  return (
    <m.h2
      className={className}
      initial={reduced ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      {children}
    </m.h2>
  );
};

/* ─── DATOS DE SISTEMAS ─────────────────────────────────── */
interface Product {
  id: ProjectId;
  name: string;
  kind: L;
  line: L;
  stat: string;
  statLabel: L;
  tone: string;
  shot?: string;
  shotAlt?: L;
  url?: string;
}

const products: Product[] = [
  { id: 'facturon', name: 'Facturón', kind: { es: 'Facturación electrónica SRI', en: 'SRI e-invoicing' }, line: { es: 'Sistema de facturación electrónica SRI para Ecuador, sin comisión por documento.', en: 'SRI electronic invoicing system for Ecuador with no per-document fee.' }, stat: '$2.99', statLabel: { es: 'por mes', en: 'per month' }, tone: '#0A0B12', shot: '/assets/screenshots/web/facturon.webp', shotAlt: { es: 'Facturón: sistema de facturación electrónica SRI en Ecuador', en: 'Facturón: SRI electronic invoicing system for Ecuador' }, url: 'https://facturon.ec/' },
  { id: 'gym', name: 'AmePhia Gym', kind: { es: 'Software para gimnasios', en: 'Gym software' }, line: { es: 'Software para gimnasios: membresías, control de acceso, POS, contabilidad y facturación SRI.', en: 'Gym management software: memberships, access control, POS, accounting and SRI invoicing.' }, stat: '+35%', statLabel: { es: 'cobranza', en: 'collections' }, tone: '#12306E', shot: '/assets/screenshots/web/gym.webp', shotAlt: { es: 'Software para gimnasios AmePhia Gym: panel de membresías y finanzas', en: 'AmePhia Gym software: memberships and finance dashboard' } },
  { id: 'broker-seguro', name: 'Broker Seguro', kind: { es: 'Software para corredores de seguros', en: 'Insurance broker software' }, line: { es: 'Software para corredores de seguros: pólizas, renovaciones, reclamos y comisiones.', en: 'Insurance broker software: policies, renewals, claims and commissions.' }, stat: '98%', statLabel: { es: 'renovaciones al día', en: 'on-time renewals' }, tone: '#0B1F6B', shot: '/assets/screenshots/web/broker.webp', shotAlt: { es: 'Broker Seguro: sistema para corredores de seguros, panel de pólizas y reclamos', en: 'Broker Seguro: insurance broker system, policies and claims dashboard' } },
  { id: 'ecommerce', name: 'AmePhia Store', kind: { es: 'Plataforma de e-commerce', en: 'E-commerce platform' }, line: { es: 'Plataforma de comercio electrónico con pagos locales, inventario Kardex y facturación SRI.', en: 'E-commerce platform with local payments, Kardex inventory and SRI invoicing.' }, stat: '99.9%', statLabel: { es: 'disponibilidad', en: 'uptime' }, tone: '#0F2A8F', shot: '/assets/screenshots/web/store.webp', shotAlt: { es: 'AmePhia Store: plataforma de tienda en línea, escritorio de administración', en: 'AmePhia Store: online store platform, admin dashboard' }, url: 'https://ameshop.ec/' },
  { id: 'education', name: 'AmePhia EDU', kind: { es: 'Sistema de gestión escolar', en: 'School management system' }, line: { es: 'Sistema de gestión escolar para colegios: matrículas, calificaciones MinEduc 2025 y aula virtual.', en: 'School management system: enrollment, MinEduc 2025 grading and virtual classroom.' }, stat: '−80%', statLabel: { es: 'tiempo en notas', en: 'grading time' }, tone: '#12306E' },
  { id: 'shielddata', name: 'ShieldData', kind: { es: 'Cumplimiento LOPDP', en: 'LOPDP compliance' }, line: { es: 'Software de cumplimiento LOPDP: consentimientos, derechos ARCO y expediente firmado.', en: 'LOPDP compliance software: consents, ARCO rights and signed dossiers.' }, stat: '72 h', statLabel: { es: 'aviso de brechas', en: 'breach notice' }, tone: '#0B3A3F' },
  { id: 'pos', name: 'AmePhia POS', kind: { es: 'Sistema punto de venta', en: 'Point-of-sale system' }, line: { es: 'Sistema punto de venta (POS) con devoluciones, lector de códigos y tickets térmicos.', en: 'Point-of-sale (POS) system with returns, barcode scanners and thermal tickets.' }, stat: 'POS', statLabel: { es: 'ventas de mostrador', en: 'counter sales' }, tone: '#1B1D2B' },
  { id: 'migration', name: 'Migralia', kind: { es: 'Gestión migratoria', en: 'Migration case management' }, line: { es: 'Software de gestión migratoria: casos, trámites, portal del cliente y facturación.', en: 'Migration case management software: cases, procedures, client portal and billing.' }, stat: 'SaaS', statLabel: { es: 'multi-tenant', en: 'multi-tenant' }, tone: '#17399A' },
  { id: 'contame', name: 'ContAme', kind: { es: 'Contabilidad NIIF en la nube', en: 'IFRS accounting in the cloud' }, line: { es: 'Sistema contable NIIF multiempresa en la nube para contadores y empresas.', en: 'Multi-company IFRS accounting system in the cloud for accountants and businesses.' }, stat: '2 d', statLabel: { es: 'cierre de mes', en: 'month-end close' }, tone: '#0A4A5C', shot: '/assets/screenshots/web/contame.webp', shotAlt: { es: 'ContAme: sistema contable y facturación electrónica SRI en Ecuador', en: 'ContAme: accounting and SRI e-invoicing system for Ecuador' }, url: 'https://contame593.com/' },
];
const byId = (id: ProjectId) => products.find(p => p.id === id)!;

/* ─── SISTEMAS: dos productos estrella (sitios reales) + el resto en lista compacta ─── */
const featuredIds: ProjectId[] = ['facturon', 'contame'];
const host = (u?: string) => (u ?? '').replace(/^https?:\/\//, '').replace(/\/$/, '');

const ProductsSection = ({ onOpenProject }: { onOpenProject: (id: ProjectId) => void }) => {
  const { language } = useLanguage();
  const en = language === 'en';
  const open = (p: Product) => (p.url ? window.open(p.url, '_blank', 'noopener') : onOpenProject(p.id));
  const featured = featuredIds.map(byId);
  const rest = products.filter(p => !featuredIds.includes(p.id));
  const link = (p: Product) => ({
    href: p.url ?? `/proyecto/${p.id}`,
    onClick: (e: React.MouseEvent) => { e.preventDefault(); open(p); },
    'aria-label': `${p.name} — ${pick(p.line, language)}`,
  });

  return (
    <section id="productos" className="am-sec am-light am-fog relative scroll-mt-16 overflow-hidden pb-16 pt-14 md:pb-20 md:pt-20">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-white to-transparent" />
      <div className="relative mx-auto max-w-[1320px] px-5 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-4">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-[#2563EB]/25 bg-white px-3 py-1 text-[12px] font-medium text-[#0B1B3F]">
              <span className="am-pulse h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" />
              {en ? 'Live in production' : 'Funcionando en producción'}
            </p>
            <H2 className="am-h2 mt-4 max-w-[22ch] !text-[clamp(1.75rem,2.8vw,2.5rem)]">{en ? 'Proprietary enterprise systems in production.' : 'Sistemas empresariales propios en producción.'}</H2>
          </div>
          <p className="max-w-[30ch] text-[14px] leading-relaxed text-[color:var(--am-mute)]">
            <span className="mr-2 text-[1.6rem] font-semibold tabular-nums text-[#0B1B3F]">9</span>
            {en ? 'systems built, run and supported by our own team.' : 'sistemas construidos, operados y respaldados por nuestro equipo.'}
          </p>
        </div>

        <p className="mt-8 text-[13px] font-medium text-[color:var(--am-mute)]">{en ? 'Main products' : 'Productos principales'}</p>
        <div className="mt-3 grid gap-4 lg:grid-cols-2">
          {featured.map((p, k) => (
            <Reveal key={p.id} delay={k * 0.08} className="h-full">
              <a {...link(p)} className="am-prod-card group flex h-full overflow-hidden rounded-2xl border border-[color:var(--am-line)] bg-white">
                <div className="relative w-[42%] shrink-0 overflow-hidden bg-[#0B1B3F]">
                  <img src={p.shot} alt={p.shotAlt ? pick(p.shotAlt, language) : p.name} width={640} height={360} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover object-left-top" />
                </div>
                <div className="flex min-w-0 flex-1 flex-col justify-between gap-3 p-4 md:p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="text-[1.3rem] font-semibold leading-none tracking-tight">{p.name}</h3>
                      <p className="mt-1.5 text-[13px] text-[color:var(--am-mute)]">{pick(p.kind, language)}</p>
                    </div>
                    <p className="shrink-0 text-right text-[#2563EB]"><span className="block text-[1.25rem] font-semibold leading-none tabular-nums">{p.stat}</span><span className="mt-1 block text-[11px] text-[color:var(--am-mute)]">{pick(p.statLabel, language)}</span></p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#0B1B3F]">
                    {host(p.url)}<ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        <p className="mt-6 text-[13px] font-medium text-[color:var(--am-mute)]">{en ? 'More systems' : 'Más sistemas'}</p>
        <ul className="mt-3 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {rest.map((p, k) => (
            <li key={p.id}>
              <Reveal delay={(k % 4) * 0.04} className="h-full">
                <a {...link(p)} className="am-mini flex h-full items-center gap-3 rounded-xl border border-[color:var(--am-line)] bg-white p-3 hover:border-[#2563EB]/40">
                  <span className="grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-lg text-[1.05rem] font-semibold text-white" style={{ background: p.tone }} aria-hidden="true">
                    {p.shot ? <img src={p.shot} alt="" width={240} height={150} loading="lazy" decoding="async" className="h-full w-full object-cover object-left-top" /> : p.name.replace('AmePhia ', '').charAt(0)}
                  </span>
                  <span className="min-w-0 flex-1">
                    <h3 className="truncate text-[15px] font-semibold tracking-tight">{p.name}</h3>
                    <p className="truncate text-[12px] text-[color:var(--am-mute)]">{pick(p.kind, language)}</p>
                  </span>
                  <ArrowUpRight className="am-mini-go h-4 w-4 shrink-0 text-slate-400" />
                </a>
              </Reveal>
            </li>
          ))}
          <li>
            <button onClick={() => openWA(language, 'products')} className="flex h-full min-h-[4.25rem] w-full items-center justify-between gap-3 rounded-xl bg-[#0B1B3F] px-4 py-3 text-left text-[14px] font-medium text-white transition-colors hover:bg-[#2563EB]">
              {en ? 'Need a custom system?' : '¿Necesitas uno a medida?'}
              <ArrowUpRight className="h-4 w-4 shrink-0" />
            </button>
          </li>
        </ul>
      </div>
    </section>
  );
};

const serviceSlug = (k: string) => SERVICES.find(x => x.key === k)?.slug ?? '';
const services: { k: string; title: L }[] = [
  { k: 'dev', title: { es: 'Desarrollo de software a medida', en: 'Custom software development' } },
  { k: 'cto', title: { es: 'Asesoría y consultoría tecnológica', en: 'Technology advisory and consulting' } },
  { k: 'erp', title: { es: 'ERP y sistemas de gestión', en: 'ERP and management systems' } },
  { k: 'sri', title: { es: 'Facturación electrónica SRI', en: 'SRI electronic invoicing' } },
  { k: 'web', title: { es: 'Aplicaciones móviles y web', en: 'Mobile and web applications' } },
  { k: 'ecommerce', title: { es: 'E-commerce y pasarelas de pago', en: 'E-commerce and payment gateways' } },
  { k: 'saas', title: { es: 'Plataformas SaaS multitenant', en: 'Multi-tenant SaaS platforms' } },
  { k: 'cloud', title: { es: 'Cloud, AWS y DevOps', en: 'Cloud, AWS and DevOps' } },
  { k: 'api', title: { es: 'Integraciones y automatización', en: 'Integrations and automation' } },
  { k: 'seo', title: { es: 'Modernización web y SEO', en: 'Web modernization and SEO' } },
];

const ServicesSection = () => {
  const { language } = useLanguage();
  const en = language === 'en';
  return (
    <section id="servicios" className="am-navy am-sec relative scroll-mt-16 overflow-hidden">
      <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
        <div className="relative min-h-[20rem] lg:min-h-full">
          <img src="/assets/images/foto/servicios-equipo.webp" alt={en ? 'Software engineering team working together' : 'Equipo de ingenieros de software trabajando en conjunto'} width={800} height={933} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#0B1B3F] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-[#0B1B3F]" />
        </div>
        <div className="px-5 py-20 md:px-10 md:py-28 lg:max-w-[48rem] lg:pl-6 lg:pr-16">
          <span className="am-rule mb-6" aria-hidden="true" />
          <H2 className="am-h2 max-w-[18ch] text-white">{en ? 'Programmers, advisory and software consulting.' : 'Programadores, asesoría y consultoría de software.'}</H2>
          <ul className="mt-10 grid border-t border-white/15 sm:grid-cols-2 sm:gap-x-10">
            {services.map(s => (
              <li key={s.k} className="border-b border-white/15">
                <a href={`/servicios/${serviceSlug(s.k)}`} className="am-svc-li flex min-h-[3.4rem] items-center justify-between gap-4 py-3.5 text-[15px] text-white/80">
                  <h3 className="font-normal">{pick(s.title, language)}</h3>
                  <ArrowUpRight className="h-4 w-4 shrink-0 opacity-60" />
                </a>
              </li>
            ))}
          </ul>
          <button onClick={() => openWA(language, 'services')} className="am-btn mt-10">
            {en ? 'Request a consultation' : 'Solicitar una consultoría'}
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

const steps: { t: L; d: L; icon: typeof Search }[] = [
  { t: { es: 'Descubrimiento', en: 'Discovery' }, d: { es: 'Analizamos tu operación y definimos el alcance.', en: 'We analyze your operation and define the scope.' }, icon: Search },
  { t: { es: 'Propuesta en 48 h', en: 'Proposal in 48 h' }, d: { es: 'Arquitectura, cronograma por hitos y precio cerrado.', en: 'Architecture, milestone schedule and fixed price.' }, icon: FileText },
  { t: { es: 'Desarrollo con demos semanales', en: 'Development with weekly demos' }, d: { es: 'Ves avances reales en un entorno privado.', en: 'You see real progress in a private environment.' }, icon: Code2 },
  { t: { es: 'QA y despliegue', en: 'QA and deployment' }, d: { es: 'Pruebas, seguridad y salida a producción.', en: 'Testing, security and go-live.' }, icon: Rocket },
  { t: { es: 'Garantía y soporte', en: 'Warranty and support' }, d: { es: 'Acompañamiento continuo después de la entrega.', en: 'Ongoing support after delivery.' }, icon: LifeBuoy },
];

const ProcessSection = () => {
  const { language } = useLanguage();
  const en = language === 'en';
  return (
    <section id="metodo" className="am-sec am-light relative overflow-hidden py-24 md:py-32">
      <div className="mx-auto max-w-[1320px] px-5 md:px-10">
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-16">
          <div>
            <span className="am-rule mb-6" aria-hidden="true" />
            <H2 className="am-h2 max-w-[16ch]">{en ? 'From idea to production.' : 'De la idea a producción.'}</H2>
          </div>
          <p className="max-w-[40ch] text-[16px] leading-relaxed text-[color:var(--am-mute)] lg:justify-self-end">
            {en ? 'A clear path in five stages, with a fixed price and weekly progress.' : 'Un camino claro en cinco etapas, con precio cerrado y avances cada semana.'}
          </p>
        </div>

        <ol className="relative mt-16 grid gap-5 md:grid-cols-5">
          <span aria-hidden="true" className="absolute left-[10%] right-[10%] top-[2.25rem] hidden h-px border-t border-dashed border-[#2563EB]/40 md:block" />
          {steps.map((s, k) => {
            const Icon = s.icon;
            return (
              <li key={k} className="relative">
                <Reveal delay={k * 0.07} className="h-full">
                  <div className="am-step-card relative h-full rounded-2xl border border-[color:var(--am-line)] bg-white p-6 pt-14 shadow-[0_18px_40px_-30px_rgba(11,27,63,.35)]">
                    <span className="absolute -top-0 left-6 grid h-[4.5rem] w-[4.5rem] -translate-y-1/2 place-items-center rounded-full border-4 border-white bg-[#0B1B3F] text-white shadow-md">
                      <Icon className="h-6 w-6" strokeWidth={1.6} />
                    </span>
                    <span aria-hidden="true" className="absolute right-5 top-4 text-[2.4rem] font-semibold leading-none tabular-nums text-[#0B1B3F]/10">{String(k + 1).padStart(2, '0')}</span>
                    <h3 className="mt-3 text-[17px] font-semibold leading-snug tracking-tight">{pick(s.t, language)}</h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-[color:var(--am-mute)]">{pick(s.d, language)}</p>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};

const stack = ['React', 'Next.js', 'TypeScript', 'Node.js', 'NestJS', 'Python', 'Flutter', 'PostgreSQL', 'AWS', 'Docker', 'Kubernetes', 'Stripe'];
const guarantees: { k: string; big: L; line: L }[] = [
  { k: 'tls', big: { es: 'TLS 1.3', en: 'TLS 1.3' }, line: { es: 'Cifrado total', en: 'Full encryption' } },
  { k: 'az', big: { es: 'Multi-zona', en: 'Multi-AZ' }, line: { es: 'Infraestructura AWS', en: 'AWS infrastructure' } },
  { k: 'code', big: { es: '100 % tuyo', en: '100% yours' }, line: { es: 'Código fuente', en: 'Source code' } },
  { k: 'nda', big: { es: 'NDA firmado', en: 'Signed NDA' }, line: { es: 'Antes de ver datos', en: 'Before any data' } },
];

const guaranteeIcon: Record<string, typeof ShieldCheck> = { tls: ShieldCheck, az: Server, code: FileCode2, nda: FileSignature };

const TrustSection = () => {
  const { language } = useLanguage();
  const en = language === 'en';
  return (
    <section id="confianza" className="am-sec am-light am-fog relative scroll-mt-16 overflow-hidden py-20 md:py-28">
      <div className="mx-auto max-w-[1320px] px-5 md:px-10">
        <div className="am-navy relative isolate overflow-hidden rounded-[2rem] px-6 py-12 md:px-12 md:py-16">
          <div aria-hidden="true" className="am-rings absolute inset-0 -z-10" />
          <div aria-hidden="true" className="absolute -right-24 -top-24 -z-10 h-80 w-80 rounded-full bg-[#2563EB]/30 blur-3xl" />
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <span className="am-rule mb-6" aria-hidden="true" />
              <H2 className="am-h2 max-w-[13ch] text-white">{en ? 'Security and 100% code ownership.' : 'Seguridad y código 100 % tuyo.'}</H2>
              <p className="mt-5 max-w-[34ch] text-[16px] leading-relaxed text-[color:var(--am-mute)]">
                {en ? 'Your code, your data and your infrastructure stay under your control.' : 'Tu código, tus datos y tu infraestructura quedan bajo tu control.'}
              </p>
            </div>
            <div className="grid gap-px overflow-hidden rounded-2xl border border-white/15 bg-white/15 sm:grid-cols-2">
              {guarantees.map((g, k) => {
                const Icon = guaranteeIcon[g.k] ?? ShieldCheck;
                return (
                  <Reveal key={g.k} delay={k * 0.06} className="bg-[#0B1B3F]">
                    <div className="flex h-full items-start gap-4 p-6 md:p-7">
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/25 bg-white/5 text-[#8DB4FF]"><Icon className="h-5 w-5" strokeWidth={1.6} /></span>
                      <div>
                        <h3 className="text-[1.35rem] font-semibold leading-tight tracking-tight text-white">{pick(g.big, language)}</h3>
                        <p className="mt-1 text-[14px] text-[color:var(--am-mute)]">{pick(g.line, language)}</p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
          <ul className="mt-10 flex flex-wrap gap-2 border-t border-white/15 pt-8" aria-label={en ? 'Technology stack' : 'Stack tecnológico'}>
            {stack.map(t => <li key={t} className="rounded-full border border-white/25 bg-white/5 px-3.5 py-1.5 text-[13px] text-white/90">{t}</li>)}
          </ul>
        </div>
      </div>
    </section>
  );
};

/* ─── EMPRESA: fotografía a sangre con las sedes ───────── */
const AboutSection = () => {
  const { language } = useLanguage();
  const en = language === 'en';
  const offices: { n: string; d: L }[] = [
    { n: 'California', d: { es: 'Oficina corporativa', en: 'Corporate office' } },
    { n: 'Newark, NJ', d: { es: 'Oficina Costa Este', en: 'East Coast office' } },
    { n: 'Ecuador', d: { es: 'Ingeniería: Quito, Guayaquil, Cuenca', en: 'Engineering: Quito, Guayaquil, Cuenca' } },
  ];
  return (
    <section id="nosotros" className="am-navy am-sec relative isolate scroll-mt-16 overflow-hidden py-28 md:py-40">
      <img src="/assets/images/foto/oficina.webp" srcSet="/assets/images/foto/oficina-960.webp 960w, /assets/images/foto/oficina.webp 1920w" sizes="100vw" alt="" aria-hidden="true" width={1920} height={900} loading="lazy" decoding="async" className="absolute inset-0 -z-10 h-full w-full object-cover" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[#0B1B3F]/60" />
      <div aria-hidden="true" className="am-photo-veil-b absolute inset-0 -z-10" />
      <div className="mx-auto max-w-[1320px] px-5 md:px-10">
        <span className="am-rule mb-6" aria-hidden="true" />
        <H2 className="am-h2 max-w-[16ch] text-white">{en ? 'Over 15 years building software.' : 'Más de 15 años construyendo software.'}</H2>
        <p className="mt-5 max-w-[46ch] text-[16px] leading-relaxed text-[color:var(--am-mute)]">
          {en ? 'Senior engineers, US-law contracts and nearshore hours.' : 'Ingenieros senior, contratos bajo ley de EE. UU. y horario nearshore.'}
        </p>
        <ul className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-white/20 bg-white/15 md:grid-cols-3">
          {offices.map(o => (
            <li key={o.n} className="bg-[#0B1B3F]/80 p-7">
              <MapPin className="h-5 w-5 text-[#8DB4FF]" strokeWidth={1.6} />
              <p className="mt-5 text-[1.4rem] font-semibold tracking-tight text-white">{o.n}</p>
              <p className="mt-1 text-[14px] text-[color:var(--am-mute)]">{pick(o.d, language)}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

const faqs: { q: L; a: L }[] = [
  { q: { es: '¿Dónde puedo contratar programadores o un equipo de desarrollo de software en Ecuador?', en: 'Where can I hire programmers or a software development team in Ecuador?' }, a: { es: 'En AmePhia Systems. Somos un equipo de programadores e ingenieros senior con más de 15 años de trayectoria que desarrolla software a medida para empresas de Quito, Guayaquil, Cuenca y todo el Ecuador, y también para clientes en Estados Unidos. Trabajas directamente con ingenieros senior, con contrato formal y código 100 % de tu propiedad.', en: 'At AmePhia Systems. We are a team of senior programmers and engineers with over 15 years of experience building custom software for companies in Quito, Guayaquil, Cuenca and across Ecuador, as well as clients in the United States. You work directly with senior engineers, under a formal contract, and you own 100% of the code.' } },
  { q: { es: '¿Qué incluye una asesoría o consultoría tecnológica de software?', en: 'What does a software technology advisory or consulting engagement include?' }, a: { es: 'Incluye el análisis de tu operación y de tus sistemas actuales, la auditoría de código y de infraestructura, el diseño de la arquitectura, la hoja de ruta del producto y la selección de tecnología. También ofrecemos CTO as a Service: un director de tecnología externo que acompaña a tu equipo de forma continua.', en: 'It includes analysis of your operation and current systems, code and infrastructure audits, architecture design, product roadmap and technology selection. We also offer CTO as a Service: an external technology lead who works alongside your team on an ongoing basis.' } },
  { q: { es: '¿Cuánto cuesta y cuánto tarda desarrollar un sistema a medida?', en: 'How much does a custom system cost and how long does it take?' }, a: { es: 'Depende del alcance. Tras analizar tu operación te entregamos en 48 horas una propuesta con arquitectura, cronograma por hitos y precio cerrado. Desarrollamos en sprints con demos semanales, de modo que ves avances reales en un entorno privado durante todo el proyecto.', en: 'It depends on scope. After analyzing your operation we deliver, within 48 hours, a proposal with architecture, a milestone schedule and a fixed price. We build in sprints with weekly demos, so you see real progress in a private environment throughout the project.' } },
  { q: { es: '¿El código fuente y los sistemas desarrollados son de mi empresa?', en: 'Do we own the source code and the systems you build?' }, a: { es: 'Sí. Todo el código fuente, bases de datos, APIs y configuraciones cloud son 100 % propiedad exclusiva de tu empresa desde la entrega. No existen tarifas recurrentes por usuario ni dependencias cautivas.', en: 'Yes. All source code, databases, APIs and cloud configurations are 100% yours from delivery. There are no per-user recurring fees or vendor lock-in.' } },
  { q: { es: '¿Qué es Facturón y cómo funciona la facturación electrónica SRI?', en: 'What is Facturón and how does SRI e-invoicing work?' }, a: { es: 'Facturón es nuestro sistema de facturación electrónica 100 % compatible con el SRI del Ecuador: genera facturas, notas de crédito, retenciones y guías de remisión en XML con firma electrónica, sin comisión por documento. Se integra con ContAme y puede conectarse a cualquier ERP, POS o tienda en línea.', en: 'Facturón is our e-invoicing system, 100% compatible with Ecuador’s SRI: it issues invoices, credit notes, withholdings and delivery guides as signed XML with no per-document fee. It integrates with ContAme and connects to any ERP, POS or online store.' } },
  { q: { es: '¿Qué sistema ERP o de gestión recomiendan para mi empresa?', en: 'Which ERP or management system do you recommend for my company?' }, a: { es: 'Depende de tu sector. Tenemos sistemas propios para gimnasios, corredores de seguros, colegios, tiendas en línea, puntos de venta, gestión migratoria y contabilidad NIIF. Cuando tu proceso no encaja con un producto estándar, desarrollamos un ERP a medida con compras, inventario Kardex, nómina y facturación SRI.', en: 'It depends on your industry. We have proprietary systems for gyms, insurance brokers, schools, online stores, points of sale, migration case management and IFRS accounting. When your process does not fit a standard product, we build a custom ERP with purchasing, Kardex inventory, payroll and SRI invoicing.' } },
  { q: { es: '¿Hacen proyectos y contratos para empresas en Estados Unidos?', en: 'Do you work with companies in the United States?' }, a: { es: 'Sí. Tenemos presencia corporativa en California, contratos bajo legislación estadounidense (W-8/W-9, transferencias ACH/Wire), horario sincronizado con la Costa Este y Oeste y un equipo bilingüe de ingenieros senior.', en: 'Yes. We have a corporate presence in California, contracts under US law (W-8/W-9, ACH/Wire), hours aligned with the East and West coasts, and a bilingual senior engineering team.' } },
  { q: { es: '¿Ayudan a cumplir la Ley de Protección de Datos (LOPDP)?', en: 'Can you help with Ecuador’s data protection law (LOPDP)?' }, a: { es: 'Sí. ShieldData automatiza el registro de tratamiento de datos, la gestión de consentimientos, las solicitudes de derechos ARCO y las auditorías internas para cumplir la LOPDP sin un equipo legal dedicado.', en: 'Yes. ShieldData automates data-processing records, consent management, ARCO rights requests and internal audits to comply with the LOPDP without a dedicated legal team.' } },
];

const faqCats: { k: string; l: L }[] = [
  { k: 'all', l: { es: 'Todas', en: 'All' } },
  { k: 'serv', l: { es: 'Servicios', en: 'Services' } },
  { k: 'sist', l: { es: 'Sistemas', en: 'Systems' } },
  { k: 'legal', l: { es: 'Legal y datos', en: 'Legal and data' } },
];
const faqCatOf = ['serv', 'serv', 'serv', 'legal', 'sist', 'sist', 'serv', 'legal'];

const FaqSection = () => {
  const { language } = useLanguage();
  const en = language === 'en';
  const [cat, setCat] = useState('all');
  const list = faqs.map((f, k) => ({ f, k })).filter(x => cat === 'all' || faqCatOf[x.k] === cat);
  return (
    <section id="faq" className="am-sec am-light relative scroll-mt-16 overflow-hidden py-16 md:py-20">
      <div className="mx-auto grid max-w-[1320px] gap-8 px-5 md:px-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-14">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <span className="am-rule mb-5" aria-hidden="true" />
          <H2 className="am-h2 max-w-[12ch] !text-[clamp(1.75rem,2.8vw,2.5rem)]">{en ? 'Frequently asked questions.' : 'Preguntas frecuentes.'}</H2>
          <p className="mt-4 max-w-[32ch] text-[15px] leading-relaxed text-[color:var(--am-mute)]">
            {en ? 'Before you start your project.' : 'Lo que necesitas saber antes de empezar.'}
          </p>
          <button onClick={() => openWA(language, 'faq')} className="am-btn am-btn-sm mt-6">
            {en ? 'Ask an engineer' : 'Preguntar a un ingeniero'}
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
        <div>
          <div className="mb-4 flex flex-wrap gap-2" role="tablist" aria-label={en ? 'Question topics' : 'Temas de preguntas'}>
            {faqCats.map(c => (
              <button key={c.k} role="tab" aria-selected={cat === c.k} onClick={() => setCat(c.k)} className="am-chip !min-h-[34px] !py-1 !text-[13px]" data-on={cat === c.k}>
                {pick(c.l, language)}
              </button>
            ))}
          </div>
          <div className="border-t border-[color:var(--am-line)]">
            {list.map(({ f, k }, i) => (
              <details key={`${cat}-${k}`} open={i === 0} className="am-faq group border-b border-[color:var(--am-line)]">
                <summary className="flex cursor-pointer list-none items-center gap-4 py-3.5">
                  <h3 className="flex-1 text-[15px] font-semibold leading-snug tracking-tight md:text-[16px]">{pick(f.q, language)}</h3>
                  <span className="am-faq-icon grid h-7 w-7 shrink-0 place-items-center rounded-full border border-[color:var(--am-line)] text-[15px] text-[#2563EB]" aria-hidden="true">+</span>
                </summary>
                <p className="max-w-[66ch] pb-4 pr-10 text-[14.5px] leading-relaxed text-[color:var(--am-mute)]">{pick(f.a, language)}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─── CONTACTO ──────────────────────────────────────────── */
const FORM_ENDPOINT = `https://formsubmit.co/ajax/${getContactEmail()}`;

const chips: { v: string; l: L }[] = [
  { v: 'erp', l: { es: 'ERP', en: 'ERP' } },
  { v: 'web-seo', l: { es: 'Web y SEO', en: 'Web & SEO' } },
  { v: 'sri', l: { es: 'Facturación SRI', en: 'SRI invoicing' } },
  { v: 'school', l: { es: 'Gestión escolar', en: 'School SIS' } },
  { v: 'shielddata', l: { es: 'LOPDP', en: 'LOPDP' } },
  { v: 'ecommerce', l: { es: 'E-commerce', en: 'E-commerce' } },
  { v: 'mobile', l: { es: 'App móvil', en: 'Mobile app' } },
  { v: 'saas', l: { es: 'SaaS', en: 'SaaS' } },
];

export const ContactSection = () => {
  const { language } = useLanguage();
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: 'erp', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (error) setError(null);
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          ...form,
          phone: form.phone || 'N/A',
          _subject: `New lead from AmePhia web — ${form.name} (${form.service}) [${language.toUpperCase()}]`,
          _template: 'table',
          _captcha: 'false',
          _replyto: form.email,
        }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || data?.success === false || data?.success === 'false') throw new Error();
      setSuccess(true);
      trackLeadGenerated('form', 'contact_company');
      setForm({ name: '', email: '', phone: '', service: 'erp', message: '' });
      setTimeout(() => setSuccess(false), 6000);
    } catch {
      setError(
        language === 'en'
          ? 'Could not send. Reach us on WhatsApp for an immediate reply.'
          : 'No se pudo enviar. Escríbenos por WhatsApp y te atendemos al instante.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const en = language === 'en';

  return (
    <section id="contacto" className="am-sec am-navy relative isolate scroll-mt-16 overflow-hidden py-14 md:py-20">
      <img src="/assets/images/foto/contacto.webp" srcSet="/assets/images/foto/contacto-960.webp 960w, /assets/images/foto/contacto.webp 1920w" sizes="100vw" alt="" aria-hidden="true" width={1920} height={1100} loading="lazy" decoding="async" className="absolute inset-0 -z-10 h-full w-full object-cover" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[#0B1B3F]/82" />
      <div aria-hidden="true" className="am-photo-veil absolute inset-0 -z-10" />
      <div className="relative mx-auto grid max-w-[1320px] items-center gap-10 px-5 md:px-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
        <div>
          <Reveal kind="mask">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-[12px] font-medium text-white">
              <Clock className="h-3.5 w-3.5" />
              {en ? 'Reply in under 24 hours' : 'Respuesta en menos de 24 horas'}
            </p>
            <h2 className="am-h1 mt-5 max-w-[11ch] !text-[clamp(2.1rem,3.6vw,3.2rem)] text-white">
              {en ? <>Let’s build it.</> : <>Construyámoslo.</>}
            </h2>
            <p className="mt-4 max-w-[34ch] text-[16px] leading-relaxed text-[color:var(--am-mute)]">
              {en ? 'Tell us what you need and we reply with a concrete proposal.' : 'Cuéntanos qué necesitas y te respondemos con una propuesta concreta.'}
            </p>
          </Reveal>
          <Reveal delay={0.1} className="mt-6 flex flex-wrap gap-3">
            <button onClick={() => openWA(language, 'cta')} className="am-btn">
              WhatsApp <ArrowUpRight className="h-4 w-4" />
            </button>
            <button onClick={() => openEmailClient('Inquiry for AmePhia')} className="am-btn am-btn-ghost">Email</button>
          </Reveal>
          <Reveal delay={0.15}>
            <address className="mt-8 grid gap-3 border-t border-white/20 pt-6 text-[14px] not-italic text-[color:var(--am-mute)] sm:grid-cols-2">
              <p className="flex items-start gap-3"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#8DB4FF]" /><a className="am-link text-white" href="tel:+13347324056">+1 (334) 732-4056</a></p>
              <p className="flex items-start gap-3"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#8DB4FF]" /><a className="am-link break-all text-white" href={`mailto:${getContactEmail()}`}>{getContactEmail()}</a></p>
              <p className="flex items-start gap-3"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#8DB4FF]" />California · Newark, NJ · Ecuador</p>
              <p className="flex items-start gap-3"><Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#8DB4FF]" />{en ? 'Mon–Fri 08:30–18:30 (GMT-5)' : 'Lun–Vie 08:30–18:30 (GMT-5)'}</p>
            </address>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <form onSubmit={handleSubmit} className="am-light am-form overflow-hidden rounded-3xl bg-white text-[color:var(--am-ink)] shadow-[0_40px_90px_-30px_rgba(2,8,28,.7)]">
            <div className="flex items-center justify-between gap-4 border-b border-[color:var(--am-line)] bg-[#F1F5FB] px-5 py-3.5 md:px-7">
              <div>
                <h3 className="text-[1.15rem] font-semibold tracking-tight">{en ? 'Request your proposal' : 'Solicita tu propuesta'}</h3>
                <p className="text-[12px] text-[color:var(--am-mute)]">{en ? 'Takes 1 minute · no commitment' : 'Toma 1 minuto · sin compromiso'}</p>
              </div>
              <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[12px] font-medium text-[#0B1B3F] ring-1 ring-[color:var(--am-line)]"><Clock className="h-3.5 w-3.5 text-[#2563EB]" />24 h</span>
            </div>
            <div className="p-5 md:p-7">
            <fieldset className="mb-4">
              <legend className="mb-2 text-[13px] font-medium">{en ? 'What do you need?' : '¿Qué necesitas?'}</legend>
              <div className="flex flex-wrap gap-2">
                {chips.map(c => (
                  <button
                    type="button" key={c.v} aria-pressed={form.service === c.v}
                    onClick={() => setForm(p => ({ ...p, service: c.v }))}
                    className="am-chip" data-on={form.service === c.v}
                  >
                    {pick(c.l, language)}
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="grid gap-3.5 sm:grid-cols-2">
              <label className="am-field">
                <span>{en ? 'Name' : 'Nombre'}</span>
                <input name="name" value={form.name} onChange={handleChange} required autoComplete="name" />
              </label>
              <label className="am-field">
                <span>WhatsApp</span>
                <input name="phone" type="tel" inputMode="tel" value={form.phone} onChange={handleChange} required autoComplete="tel" placeholder="+593 …" />
              </label>
            </div>
            <label className="am-field mt-3.5">
              <span>Email</span>
              <input name="email" type="email" value={form.email} onChange={handleChange} required autoComplete="email" />
            </label>
            <label className="am-field mt-3.5">
              <span>{en ? 'What do you need to solve?' : '¿Qué necesitas resolver?'}</span>
              <textarea name="message" rows={2} value={form.message} onChange={handleChange} required />
            </label>

            <button type="submit" disabled={submitting} className="am-btn mt-5 w-full justify-center disabled:opacity-50">
              {submitting ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" /> : <>{en ? 'Send' : 'Enviar'} <Send className="h-4 w-4" /></>}
            </button>

            <div aria-live="polite">
              {success && (
                <p className="mt-4 flex items-center gap-2 text-sm text-emerald-600">
                  <Check className="h-4 w-4" />
                  {en ? 'Received. We’ll reply within 24 hours.' : 'Recibido. Te respondemos en menos de 24 horas.'}
                </p>
              )}
              {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
            </div>
            <p className="mt-3 flex items-center justify-center gap-2 text-center text-[11.5px] text-[color:var(--am-mute)]"><ShieldCheck className="h-3.5 w-3.5 text-[#2563EB]" />{en ? 'Your data is only used to reply to your request. NDA available.' : 'Tus datos solo se usan para responder tu solicitud. NDA disponible.'}</p>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
};

/* ─── FOOTER ────────────────────────────────────────────── */
export const Footer = ({ onOpenLegal }: { onOpenLegal: (p: Exclude<LegalPage, null>) => void }) => {
  const { language } = useLanguage();
  const en = language === 'en';
  return (
    <footer className="am-sec am-dark am-foot border-t border-[color:var(--am-line)] py-10">
      <div className="mx-auto mb-10 grid max-w-[1320px] gap-10 px-5 text-sm md:grid-cols-2 md:px-10">
        <nav aria-label={en ? 'Products' : 'Productos'}>
          <p className="am-mono mb-4 text-[11px] uppercase tracking-[0.12em] text-[color:var(--am-mute)]">{en ? 'Products' : 'Productos'}</p>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5">
            {products.map(p => (
              <li key={p.id}><a className="am-link text-[color:var(--am-ink)]" href={p.url ?? `/proyecto/${p.id}`}>{p.name}</a></li>
            ))}
          </ul>
        </nav>
        <nav aria-label={en ? 'Services' : 'Servicios'}>
          <p className="am-mono mb-4 text-[11px] uppercase tracking-[0.12em] text-[color:var(--am-mute)]">{en ? 'Services' : 'Servicios'}</p>
          <ul className="grid gap-y-2.5 sm:grid-cols-2 sm:gap-x-6">
            {services.map(sv => (
              <li key={sv.k}><a className="am-link text-[color:var(--am-ink)]" href={`/servicios/${serviceSlug(sv.k)}`}>{pick(sv.title, language)}</a></li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="am-mono mx-auto flex max-w-[1320px] flex-col gap-5 px-5 text-[11px] text-[color:var(--am-mute)] md:flex-row md:items-center md:justify-between md:px-10">
        <div className="flex items-center gap-4">
          <img src={logo} alt="AmePhia Systems" width={72} height={72} loading="lazy" className="h-7 w-7 brightness-0 invert opacity-80" />
          <span>© 2026 AmePhia Systems Inc.</span>
        </div>
        <span>California · Newark, NJ · Ecuador</span>
        <div className="flex gap-6">
          <button onClick={() => onOpenLegal('terms')} className="am-link hover:text-white">{en ? 'Terms' : 'Términos'}</button>
          <button onClick={() => onOpenLegal('privacy')} className="am-link hover:text-white">{en ? 'Privacy' : 'Privacidad'}</button>
        </div>
      </div>
    </footer>
  );
};


/* ─── BLOQUE BAJO EL PLIEGUE (se carga después del hero) ─── */
export const MotionRoot = ({ children }: { children: ReactNode }) => <LazyMotion features={domAnimation}>{children}</LazyMotion>;

export const HomeBelowFold = ({ onOpenProject }: { onOpenProject: (id: ProjectId) => void }) => (
  <MotionRoot>
    <ProductsSection onOpenProject={onOpenProject} />
    <ServicesSection />
    <ProcessSection />
    <TrustSection />
    <AboutSection />
    <FaqSection />
    <ContactSection />
  </MotionRoot>
);
