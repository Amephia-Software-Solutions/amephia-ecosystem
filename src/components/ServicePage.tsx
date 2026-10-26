import { ArrowUpRight, Check } from 'lucide-react';
import { useLanguage } from '../i18n';
import { SERVICES, getServiceByKey } from '../data/services';
import type { ServiceData } from '../data/services';
import { openWA } from './companyContact';
import { SiteShell, useHeroBg } from './CompanyLanding';
import { ContactSection, H2, MotionRoot, Reveal } from './HomeSections';

const PROJECT_LINK: Record<string, { name: string; href: string; line: { es: string; en: string } }> = {
  facturon: { name: 'Facturón', href: 'https://facturon.ec/', line: { es: 'Nuestro sistema de facturación electrónica SRI, desde $2.99 al mes.', en: 'Our SRI e-invoicing system, from $2.99 per month.' } },
  ecommerce: { name: 'AmePhia Store', href: '/proyecto/ecommerce', line: { es: 'Plataforma de e-commerce con pagos locales y facturación SRI.', en: 'E-commerce platform with local payments and SRI invoicing.' } },
};

const ServicePage = ({ service }: { service: ServiceData }) => {
  const { language } = useLanguage();
  useHeroBg();
  const en = language === 'en';
  const lang = en ? 'en' : 'es';
  const related = service.related.map(getServiceByKey).filter((x): x is ServiceData => Boolean(x));
  const project = service.project ? PROJECT_LINK[service.project] : null;

  return (
    <SiteShell>
      <MotionRoot>
      <section id="hero" className="am-navy am-sec !bg-transparent relative pt-32 pb-14 md:pt-40 md:pb-20">
        <div className="mx-auto max-w-[1320px] px-5 md:px-10">
          <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-[13px] text-[color:var(--am-mute)]">
            <a className="am-link hover:text-white" href="/">{en ? 'Home' : 'Inicio'}</a><span aria-hidden="true">/</span>
            <a className="am-link hover:text-white" href="/#servicios">{en ? 'Services' : 'Servicios'}</a><span aria-hidden="true">/</span>
            <span className="text-white">{service.title[lang]}</span>
          </nav>
          <h1 className="am-h1 max-w-[20ch] text-white !text-[clamp(2.1rem,4vw,3.4rem)]">{service.h1[lang]}</h1>
          <p className="mt-5 max-w-[60ch] text-[17px] leading-relaxed text-[color:var(--am-mute)]">{service.intro[lang]}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button onClick={() => openWA(language, `service-${service.key}`)} className="am-btn">
              {en ? 'Request a proposal' : 'Solicitar una propuesta'}<ArrowUpRight className="h-4 w-4" />
            </button>
            <a href="/#servicios" className="am-btn am-btn-ghost">{en ? 'All services' : 'Todos los servicios'}</a>
          </div>
        </div>
      </section>

      <section className="am-sec am-light py-14 md:py-20">
        <div className="mx-auto grid max-w-[1320px] gap-8 px-5 md:px-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-14">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <span className="am-rule mb-5" aria-hidden="true" />
            <H2 className="am-h2 !text-[clamp(1.75rem,2.8vw,2.5rem)]">{en ? 'What it includes' : 'Qué incluye'}</H2>
            {project && (
              <a href={project.href} className="am-prod-card mt-8 block rounded-2xl border border-[color:var(--am-line)] bg-white p-5">
                <p className="text-[12px] font-medium text-[#2563EB]">{en ? 'Related system' : 'Sistema relacionado'}</p>
                <p className="mt-1 flex items-center justify-between text-[1.15rem] font-semibold tracking-tight">{project.name}<ArrowUpRight className="h-4 w-4" /></p>
                <p className="mt-1 text-[14px] text-[color:var(--am-mute)]">{project.line[lang]}</p>
              </a>
            )}
          </div>
          <ul className="border-t border-[color:var(--am-line)]">
            {service.includes.map((it, k) => (
              <li key={k} className="border-b border-[color:var(--am-line)]">
                <Reveal delay={k * 0.04}>
                  <div className="flex items-start gap-4 py-4">
                    <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#2563EB]/10 text-[#2563EB]"><Check className="h-4 w-4" /></span>
                    <div>
                      <h2 className="text-[1.08rem] font-semibold leading-snug tracking-tight">{it.t[lang]}</h2>
                      <p className="mt-1 text-[15px] leading-relaxed text-[color:var(--am-mute)]">{it.d[lang]}</p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="am-sec am-light am-alt py-14 md:py-20">
        <div className="mx-auto grid max-w-[1320px] gap-8 px-5 md:px-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-14">
          <div>
            <span className="am-rule mb-5" aria-hidden="true" />
            <H2 className="am-h2 !text-[clamp(1.75rem,2.8vw,2.5rem)]">{en ? 'Common questions' : 'Preguntas frecuentes'}</H2>
          </div>
          <div className="border-t border-[color:var(--am-line)]">
            {service.faqs.map((f, k) => (
              <details key={k} open={k === 0} className="am-faq group border-b border-[color:var(--am-line)]">
                <summary className="flex cursor-pointer list-none items-center gap-4 py-3.5">
                  <h3 className="flex-1 text-[15px] font-semibold leading-snug tracking-tight md:text-[16px]">{f.q[lang]}</h3>
                  <span className="am-faq-icon grid h-7 w-7 shrink-0 place-items-center rounded-full border border-[color:var(--am-line)] text-[15px] text-[#2563EB]" aria-hidden="true">+</span>
                </summary>
                <p className="max-w-[66ch] pb-4 pr-10 text-[14.5px] leading-relaxed text-[color:var(--am-mute)]">{f.a[lang]}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="am-sec am-light py-14 md:py-16">
        <div className="mx-auto max-w-[1320px] px-5 md:px-10">
          <p className="text-[13px] font-medium text-[color:var(--am-mute)]">{en ? 'Related services' : 'Servicios relacionados'}</p>
          <ul className="mt-3 grid gap-3 md:grid-cols-3">
            {related.map(r => (
              <li key={r.slug}>
                <a href={`/servicios/${r.slug}`} className="am-mini flex h-full items-center justify-between gap-4 rounded-xl border border-[color:var(--am-line)] bg-white p-4 hover:border-[#2563EB]/40">
                  <span className="text-[1.05rem] font-semibold tracking-tight">{r.title[lang]}</span>
                  <ArrowUpRight className="am-mini-go h-4 w-4 shrink-0 text-slate-400" />
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-[13px] text-[color:var(--am-mute)]">
            {SERVICES.length} {en ? 'services' : 'servicios'} · <a className="am-link text-[#2563EB]" href="/#servicios">{en ? 'See all' : 'Ver todos'}</a>
          </p>
        </div>
      </section>

      <ContactSection />
      </MotionRoot>
    </SiteShell>
  );
};

export default ServicePage;
