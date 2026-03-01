import { useCallback, useEffect, useState } from 'react';
import type { MouseEvent } from 'react';
import { Shell } from './components/layout/Shell';
import { Header } from './components/Header';
import { BentoGrid } from './components/layout/BentoGrid';
import { GymModule } from './components/modules/GymModule';
import { EcommerceModule } from './components/modules/EcommerceModule';
import { FacturacionModule } from './components/modules/FacturacionModule';
import { MigrationModule } from './components/modules/MigrationModule';
import { BrokerSeguroModule } from './components/modules/BrokerSeguroModule';
import { SatelliteModule } from './components/modules/SatelliteModule';
import { ProjectLanding } from './components/ProjectLanding';
import MigrationSaasLanding from './components/MigrationSaasLanding';
import GymLanding from './components/GymLanding';
import BrokerSeguroLanding from './components/BrokerSeguroLanding';

import { InfoSection } from './components/InfoSection';
import { ProductsSection } from './components/ProductsSection';
import { GymShowcaseSection } from './components/GymShowcaseSection';
import { StatsSection } from './components/StatsSection';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { isProjectId } from './projects';
import type { ProjectId } from './projects';
import { trackEvent, trackPageView } from './lib/analytics';

const BASE_TITLE = 'AmePhia Systems | Empresa de Desarrollo de Software';
const BASE_DESCRIPTION =
  'AmePhia Systems desarrolla software a medida: plataformas web, apps Android/iOS, ecommerce con pagos online, facturación electrónica, ERP y asesoría tecnológica.';

interface ProjectSEO {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
}

const PROJECT_META: Record<ProjectId, ProjectSEO> = {
  gym: {
    title: 'Software para Gimnasios Ecuador — ERP con Facturación SRI, POS e Inventario',
    description:
      'AMEPHIA GYM: sistema de gestión para gimnasios y centros fitness en Ecuador. Membresías, facturación electrónica SRI, punto de venta, inventario, contabilidad NIIF y reportes. Desde $29/mes.',
    keywords:
      'software para gimnasios, ERP gimnasio Ecuador, facturación electrónica gimnasio SRI, sistema de gestión gym, membresías gimnasio, POS gimnasio, software fitness Ecuador, contabilidad NIIF gimnasio, control de asistencia gym',
    ogImage: '/assets/screenshots/dashboard.png',
  },
  facturacion: {
    title: 'Facturación Electrónica SRI Ecuador — Sistema Automatizado',
    description:
      'Sistema de facturación electrónica con cumplimiento fiscal SRI, validaciones automáticas, retenciones, notas de crédito y trazabilidad completa de documentos tributarios.',
    keywords: 'facturación electrónica SRI, facturación Ecuador, sistema facturación electrónica, comprobantes electrónicos SRI',
  },
  pos: {
    title: 'Sistema POS para Negocios — Punto de Venta Rápido',
    description:
      'POS rápido para ventas de mostrador con devoluciones, facturación instantánea, soporte para lectores de códigos e impresoras térmicas.',
    keywords: 'sistema POS Ecuador, punto de venta, software caja registradora, POS facturación electrónica',
  },
  nutri: {
    title: 'App de Nutrición y Seguimiento — Planes Alimenticios',
    description:
      'Aplicación para seguimiento nutricional con planes alimenticios, metas personalizadas y monitoreo de progreso para clientes y profesionales de la salud.',
    keywords: 'app nutrición, seguimiento nutricional, planes alimenticios, software nutricionista',
  },
  ecommerce: {
    title: 'Ecommerce con Pagos Online — Tienda Virtual Ecuador',
    description:
      'Plataforma ecommerce con catálogo de productos, checkout seguro, pasarelas de pago y facturación electrónica integrada.',
    keywords: 'ecommerce Ecuador, tienda virtual, pagos online, plataforma ecommerce',
  },
  advisory: {
    title: 'Asesoría Tecnológica para Startups y Empresas',
    description:
      'Servicios de asesoría tecnológica: arquitectura de software, roadmap de producto, optimización de procesos y transformación digital.',
    keywords: 'asesoría tecnológica, consultoría software, transformación digital, arquitectura software',
  },
  migration: {
    title: 'Software de Gestión Migratoria — Plataforma SaaS',
    description:
      'Plataforma SaaS multitenancy para facilitadores migratorios: gestión de casos, clientes, documentos, pagos y portal del cliente.',
    keywords: 'software gestión migratoria, plataforma migración, SaaS migración, gestión casos migratorios',
  },
  'broker-seguro': {
    title: 'Software para Brókers de Seguros — Plataforma SaaS Multi-Tenant',
    description:
      'BrokerSeguro: plataforma SaaS para brókers de seguros. Gestión de clientes, pólizas, reclamos con wizard, formularios dinámicos, portal del cliente y reportes.',
    keywords:
      'software broker seguros, plataforma broker seguros Ecuador, gestión pólizas, reclamos seguros, SaaS seguros, portal cliente seguros, formularios dinámicos seguros',
  },
};

const getProjectFromPathname = (pathname: string): ProjectId | null => {
  const normalizedPath = pathname.replace(/\/+$/, '');
  const parts = normalizedPath.split('/').filter(Boolean);

  if (parts.length !== 2) return null;

  const [prefix, projectId] = parts;
  if (prefix !== 'proyecto' && prefix !== 'project') return null;
  if (!isProjectId(projectId)) return null;

  return projectId;
};

const getProjectFromHash = (hash: string): ProjectId | null => {
  const normalizedHash = hash.replace(/^#\/?/, '');
  const [prefix, projectId] = normalizedHash.split('/');

  if (!projectId) return null;
  if (prefix !== 'proyecto' && prefix !== 'project') return null;
  if (!isProjectId(projectId)) return null;

  return projectId;
};

const getProjectFromLocation = (pathname: string, hash: string): ProjectId | null =>
  getProjectFromPathname(pathname) ?? getProjectFromHash(hash);

function App() {
  const [activeProject, setActiveProject] = useState<ProjectId | null>(() =>
    typeof window === 'undefined'
      ? null
      : getProjectFromLocation(window.location.pathname, window.location.hash)
  );

  useEffect(() => {
    const syncProjectFromUrl = () => {
      setActiveProject(getProjectFromLocation(window.location.pathname, window.location.hash));
    };

    const legacyHashProject = getProjectFromHash(window.location.hash);
    if (legacyHashProject) {
      window.history.replaceState(null, '', `/proyecto/${legacyHashProject}${window.location.search}`);
    }

    syncProjectFromUrl();
    window.addEventListener('popstate', syncProjectFromUrl);
    window.addEventListener('hashchange', syncProjectFromUrl);

    return () => {
      window.removeEventListener('popstate', syncProjectFromUrl);
      window.removeEventListener('hashchange', syncProjectFromUrl);
    };
  }, []);

  useEffect(() => {
    const projectMeta = activeProject ? PROJECT_META[activeProject] : null;
    const nextTitle = projectMeta ? projectMeta.title : BASE_TITLE;
    const nextDescription = projectMeta ? projectMeta.description : BASE_DESCRIPTION;
    const nextCanonical = activeProject
      ? `https://amephia.com/proyecto/${activeProject}`
      : 'https://amephia.com/';
    const nextImage = projectMeta?.ogImage
      ? `https://amephia.com${projectMeta.ogImage}`
      : 'https://amephia.com/og-image.jpg';

    // Helper to set meta content
    const setMeta = (selector: string, content: string) => {
      const el = document.querySelector(selector);
      if (el) el.setAttribute('content', content);
    };

    document.title = nextTitle;

    // Primary meta
    setMeta('meta[name="title"]', nextTitle);
    setMeta('meta[name="description"]', nextDescription);
    if (projectMeta?.keywords) {
      setMeta('meta[name="keywords"]', projectMeta.keywords);
    }

    // Canonical
    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) canonicalLink.setAttribute('href', nextCanonical);

    // Open Graph
    setMeta('meta[property="og:title"]', nextTitle);
    setMeta('meta[property="og:description"]', nextDescription);
    setMeta('meta[property="og:url"]', nextCanonical);
    setMeta('meta[property="og:image"]', nextImage);

    // Twitter
    setMeta('meta[property="twitter:title"]', nextTitle);
    setMeta('meta[property="twitter:description"]', nextDescription);
    setMeta('meta[property="twitter:url"]', nextCanonical);
    setMeta('meta[property="twitter:image"]', nextImage);

    // Inject/update JSON-LD for product pages
    const existingLd = document.querySelector('script[data-seo="project"]');
    if (activeProject === 'gym') {
      const ld = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'AMEPHIA GYM',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        description: projectMeta?.description,
        url: nextCanonical,
        image: nextImage,
        screenshot: 'https://amephia.com/assets/screenshots/dashboard.png',
        offers: [
          { '@type': 'Offer', name: 'Básico', price: '29', priceCurrency: 'USD', billingIncrement: 'P1M', url: nextCanonical },
          { '@type': 'Offer', name: 'Profesional', price: '59', priceCurrency: 'USD', billingIncrement: 'P1M', url: nextCanonical },
          { '@type': 'Offer', name: 'Enterprise', price: '99', priceCurrency: 'USD', billingIncrement: 'P1M', url: nextCanonical },
        ],
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '47', bestRating: '5' },
        author: { '@type': 'Organization', name: 'AmePhia Systems Inc.', url: 'https://amephia.com' },
        featureList: 'Membresías, Facturación electrónica SRI, POS, Inventario, Contabilidad NIIF, Control de asistencia, Reportes, Multi-rol',
      };
      if (existingLd) {
        existingLd.textContent = JSON.stringify(ld);
      } else {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.setAttribute('data-seo', 'project');
        script.textContent = JSON.stringify(ld);
        document.head.appendChild(script);
      }
    } else if (existingLd) {
      existingLd.remove();
    }

    const currentPath = `${window.location.pathname}${window.location.search}`;
    trackPageView(currentPath, nextTitle);
  }, [activeProject]);

  const openProject = useCallback((projectId: ProjectId) => {
    const nextPath = `/proyecto/${projectId}`;
    if (window.location.pathname !== nextPath) {
      window.history.pushState(null, '', `${nextPath}${window.location.search}`);
    }
    trackEvent('project_open', { project_id: projectId });
    setActiveProject(projectId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleProjectLinkClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>, projectId: ProjectId) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
      event.preventDefault();
      openProject(projectId);
    },
    [openProject]
  );

  const closeProject = useCallback(() => {
    window.history.pushState(null, '', `/${window.location.search}`);
    setActiveProject(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  if (activeProject === 'migration') {
    return <MigrationSaasLanding />;
  }

  if (activeProject === 'gym') {
    return <GymLanding />;
  }

  if (activeProject === 'broker-seguro') {
    return <BrokerSeguroLanding />;
  }

  return (
    <Shell>
      {activeProject ? (
        <ProjectLanding projectId={activeProject} onBack={closeProject} />
      ) : (
        <>
          <Header />
          <BentoGrid>
            <GymModule onOpenProject={openProject} />
            <FacturacionModule onOpenProject={openProject} />
            <EcommerceModule onOpenProject={openProject} />
            <MigrationModule onOpenProject={openProject} />
            <BrokerSeguroModule onOpenProject={openProject} />
            <SatelliteModule title="POS" type="pos" delay={0.35} onOpenProject={openProject} />
            <SatelliteModule title="NUTRI" type="nutri" delay={0.4} onOpenProject={openProject} />
          </BentoGrid>

          <InfoSection />

          <ProductsSection onOpenProject={openProject} />

          <GymShowcaseSection onOpenProject={openProject} />

          <StatsSection />

          <FaqSection />

          <ContactSection />

          <section className="mt-12">
            <h2 className="text-sm uppercase tracking-widest text-mutedText/60 mb-3">Páginas de productos</h2>
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-mutedText">
              <a
                href="/proyecto/gym"
                className="hover:text-primary transition-colors"
                onClick={(event) => handleProjectLinkClick(event, 'gym')}
              >
                ERP para Gimnasios
              </a>
              <a
                href="/proyecto/ecommerce"
                className="hover:text-primary transition-colors"
                onClick={(event) => handleProjectLinkClick(event, 'ecommerce')}
              >
                Ecommerce y Pagos Online
              </a>
              <a
                href="/proyecto/facturacion"
                className="hover:text-primary transition-colors"
                onClick={(event) => handleProjectLinkClick(event, 'facturacion')}
              >
                Facturación Electrónica
              </a>
              <a
                href="/proyecto/pos"
                className="hover:text-primary transition-colors"
                onClick={(event) => handleProjectLinkClick(event, 'pos')}
              >
                Punto de Venta (POS)
              </a>
              <a
                href="/proyecto/nutri"
                className="hover:text-primary transition-colors"
                onClick={(event) => handleProjectLinkClick(event, 'nutri')}
              >
                App de Nutrición
              </a>
              <a
                href="/proyecto/advisory"
                className="hover:text-primary transition-colors"
                onClick={(event) => handleProjectLinkClick(event, 'advisory')}
              >
                Servicios de Asesoría
              </a>
              <a
                href="/proyecto/migration"
                className="hover:text-primary transition-colors"
                onClick={(event) => handleProjectLinkClick(event, 'migration')}
              >
                SaaS de Gestión Migratoria
              </a>
              <a
                href="/proyecto/broker-seguro"
                className="hover:text-primary transition-colors"
                onClick={(event) => handleProjectLinkClick(event, 'broker-seguro')}
              >
                Software para Brókers de Seguros
              </a>
            </div>
          </section>
        </>
      )}

      {/* Footer / Copyright */}
      <footer className="mt-24 border-t border-white/5 pt-8 flex justify-between items-center text-[10px] text-mutedText/40 font-mono tracking-widest uppercase">
        <span>AmePhia Systems Inc.</span>
        <span>© 2026</span>
      </footer>
    </Shell>
  );
}

export default App;
