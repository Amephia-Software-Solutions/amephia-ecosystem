import { motion } from 'framer-motion';
import { useLanguage } from '../i18n';
import type { Language } from '../i18n';
import type { ProjectId } from '../projects';
import { trackContactClick, trackEvent, trackLeadGenerated } from '../lib/analytics';

import { openEmailClient } from '../lib/emailUtils';

interface ProjectLandingProps {
  projectId: ProjectId;
  onBack: () => void;
}

interface ProjectCopy {
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  highlightsTitle: string;
  highlights: string[];
  deliverablesTitle: string;
  deliverables: string[];
}

const PROJECT_COPY: Record<Language, Record<ProjectId, ProjectCopy>> = {
  en: {
    gym: {
      badge: 'Project Landing',
      title: 'Gym ERP Platform',
      subtitle: 'Management software for gyms and fitness centers',
      description: 'A full operational platform to centralize memberships, billing, invoicing, attendance, inventory, and business analytics.',
      highlightsTitle: 'Core Scope',
      highlights: [
        'Member and attendance management',
        'Point of sale and billing control',
        'Electronic invoicing workflows',
        'Dashboards and KPI reporting',
      ],
      deliverablesTitle: 'What We Deliver',
      deliverables: [
        'Web admin panel',
        'Operational modules by role',
        'Automation for recurring tasks',
      ],
    },
    facturacion: {
      badge: 'Project Landing',
      title: 'Electronic Invoicing System',
      subtitle: 'Automated fiscal compliance and digital documents',
      description: 'A robust invoicing service that handles advanced document signing, real-time SRI transmission, and automated fiscal compliance.',
      highlightsTitle: 'Core Scope',
      highlights: [
        'Automated XML signing (X.509 PKCS#12)',
        'Real-time SRI transmission & authorization',
        'Direct integration with Production & Testing environments',
        'Automated RIDE (PDF) & XML delivery',
      ],
      deliverablesTitle: 'What We Deliver',
      deliverables: [
        'High-performance invoicing engine',
        'Management dashboard with document trace',
        'Digital certificate secure storage',
        'Complete fiscal audit trail',
      ],
    },
    pos: {
      badge: 'Project Landing',
      title: 'POS & Store Operations',
      subtitle: 'Fast counter sales with inventory and cashier control',
      description: 'A fast and intuitive POS interface for in-store sales. Connect barcode scanners and thermal printers, process returns, and turn your device into a powerful cash register.',
      highlightsTitle: 'Core Scope',
      highlights: [
        'Fast sales and return workflows',
        'Barcode scanner and thermal printer support',
        'Instant invoicing at checkout',
        'Multi-device and multi-user operation',
      ],
      deliverablesTitle: 'What We Deliver',
      deliverables: [
        'Counter-ready POS interface',
        'Peripheral setup for scanner and thermal printer',
        'Sales, cashier, and inventory dashboard',
      ],
    },
    nutri: {
      badge: 'Project Landing',
      title: 'Nutrition Tracking App',
      subtitle: 'Plans, adherence, and progress monitoring',
      description: 'A nutrition-focused product to manage meal plans, macro objectives, and adherence tracking with clear progress indicators.',
      highlightsTitle: 'Core Scope',
      highlights: [
        'Meal plan management',
        'Progress and adherence tracking',
        'Client profile and goal history',
        'Notifications and reminders',
      ],
      deliverablesTitle: 'What We Deliver',
      deliverables: [
        'Web/mobile experience',
        'Plan and metrics modules',
        'Operational follow-up tools',
      ],
    },
    ecommerce: {
      badge: 'SaaS Product',
      title: 'Ecommerce SaaS Platform',
      subtitle: 'Multi-tenant online store with 22+ integrated modules',
      description: 'Enterprise-grade ecommerce platform with product catalog, secure checkout, payment gateways (Nuvei, PayPhone, Kushki), Kardex inventory with WAC, SRI electronic invoicing, RMA returns, loyalty program, email marketing, B2B quotations, support tickets, and a drag-and-drop homepage builder.',
      highlightsTitle: 'Core Features',
      highlights: [
        'Multi-tenant SaaS with full data isolation',
        'Product variants, bundles, custom attributes & multi-language',
        'Checkout with Nuvei, PayPhone, Kushki & bank transfer',
        'Kardex inventory with weighted average cost (WAC)',
        'SRI electronic invoicing with XAdES digital signature',
        'Returns (RMA), coupons, reviews & loyalty program',
        'CEO dashboard, reports & abandoned cart recovery',
        'REST API with Swagger/OpenAPI documentation',
      ],
      deliverablesTitle: 'What\'s Included',
      deliverables: [
        'Full SaaS platform with Filament admin panel',
        'Responsive storefront with homepage builder (10 section types)',
        'Payment gateway integrations & SRI e-invoicing',
        'Email marketing, support tickets & webhooks',
        '3 plans: Basic ($50), Professional ($100), Enterprise ($150)',
      ],
    },
    advisory: {
      badge: 'Project Landing',
      title: 'Advisory Services',
      subtitle: 'Strategy, architecture, and implementation roadmap',
      description: 'Consulting services for startups and established companies to define technical direction, optimize processes, and execute with confidence.',
      highlightsTitle: 'Core Scope',
      highlights: [
        'Technology and architecture advisory',
        'Product planning and prioritization',
        'Process optimization initiatives',
        'Execution and scaling guidance',
      ],
      deliverablesTitle: 'What We Deliver',
      deliverables: [
        'Technical assessment report',
        'Roadmap and implementation plan',
        'Follow-up sessions with leadership',
      ],
    },
    migration: {
      badge: 'SaaS Product',
      title: 'Migration Management SaaS',
      subtitle: 'Multi-tenant platform for immigration facilitators',
      description: 'Complete SaaS platform for immigration consultancies to manage clients, cases, documents, payments, and client portal access.',
      highlightsTitle: 'Core Features',
      highlights: [
        'Multi-tenant architecture with data isolation',
        'Case and client management',
        'Document storage and tracking',
        'Integrated payment processing (Stripe, PayPal)',
        'Client self-service portal',
        'Advanced analytics and reporting',
      ],
      deliverablesTitle: 'What\'s Included',
      deliverables: [
        'Full SaaS platform with admin panel',
        'Client portal with real-time case tracking',
        'Payment integrations and invoicing',
        '14-day free trial and onboarding',
      ],
    },
    'broker-seguro': {
      badge: 'SaaS Product',
      title: 'Insurance Broker Management SaaS',
      subtitle: 'Multi-tenant platform for insurance brokers',
      description: 'Complete SaaS platform for insurance brokers to manage clients, policies, claims with wizard, dynamic forms, client portal, and reports.',
      highlightsTitle: 'Core Features',
      highlights: [
        'Multi-tenant architecture with data isolation',
        'Client and dependent management',
        'Policy lifecycle management',
        'Intelligent claims with 4-step wizard',
        'Dynamic form builder (16 field types)',
        'Client self-service portal',
      ],
      deliverablesTitle: 'What\'s Included',
      deliverables: [
        'Full SaaS platform with admin panel',
        'Client portal with policy & claims tracking',
        'Dynamic form builder for each claim type',
        '96 REST API endpoints',
      ],
    },
  },
  es: {
    gym: {
      badge: 'Landing del Proyecto',
      title: 'Plataforma ERP para Gimnasios',
      subtitle: 'Software de gestión para gimnasios y centros fitness',
      description: 'Una plataforma integral para centralizar membresías, cobros, facturación, asistencia, inventarios y analítica del negocio.',
      highlightsTitle: 'Alcance Principal',
      highlights: [
        'Gestión de miembros y asistencia',
        'Punto de venta y control de cobros',
        'Flujos de facturación electrónica',
        'Dashboards y reportes KPI',
      ],
      deliverablesTitle: 'Qué Entregamos',
      deliverables: [
        'Panel administrativo web',
        'Módulos operativos por rol',
        'Automatización de tareas recurrentes',
      ],
    },
    facturacion: {
      badge: 'Landing del Proyecto',
      title: 'Sistema de Facturación Electrónica',
      subtitle: 'Cumplimiento fiscal automatizado y documentos digitales',
      description: 'Un servicio robusto de facturación que gestiona firma avanzada de documentos, transmisión en tiempo real al SRI y cumplimiento fiscal automatizado.',
      highlightsTitle: 'Alcance Principal',
      highlights: [
        'Firma electrónica avanzada (X.509 PKCS#12)',
        'Transmisión y autorización SRI en tiempo real',
        'Integración con ambientes de Pruebas y Producción',
        'Generación automática de RIDE (PDF) y XML',
      ],
      deliverablesTitle: 'Qué Entregamos',
      deliverables: [
        'Motor de facturación de alto rendimiento',
        'Dashboard de gestión con trazabilidad',
        'Almacenamiento seguro de certificados digitales',
        'Historial y auditoría fiscal completa',
      ],
    },
    pos: {
      badge: 'Landing del Proyecto',
      title: 'POS y Operación de Tienda',
      subtitle: 'Ventas de mostrador rápidas con control de caja e inventario',
      description: 'Interfaz de venta rápida e intuitiva para operaciones en mostrador. Conecta lectores de código de barras e impresoras térmicas, procesa devoluciones y convierte tu dispositivo en una caja registradora potente.',
      highlightsTitle: 'Alcance Principal',
      highlights: [
        'Flujos rápidos de venta y devoluciones',
        'Compatibilidad con lector de códigos e impresora térmica',
        'Facturación instantánea en caja',
        'Operación multi-dispositivo y multiusuario',
      ],
      deliverablesTitle: 'Qué Entregamos',
      deliverables: [
        'Interfaz POS optimizada para mostrador',
        'Configuración de periféricos (scanner e impresora térmica)',
        'Dashboard de ventas, caja e inventario',
      ],
    },
    nutri: {
      badge: 'Landing del Proyecto',
      title: 'App de Seguimiento Nutricional',
      subtitle: 'Planes, adherencia y monitoreo de progreso',
      description: 'Un producto enfocado en nutrición para gestionar planes alimenticios, objetivos de macros y seguimiento de adherencia con indicadores claros.',
      highlightsTitle: 'Alcance Principal',
      highlights: [
        'Gestión de planes nutricionales',
        'Seguimiento de progreso y adherencia',
        'Perfiles y objetivos por cliente',
        'Notificaciones y recordatorios',
      ],
      deliverablesTitle: 'Qué Entregamos',
      deliverables: [
        'Experiencia web/móvil',
        'Módulos de planes y métricas',
        'Herramientas de seguimiento operativo',
      ],
    },
    ecommerce: {
      badge: 'Producto SaaS',
      title: 'Plataforma Ecommerce SaaS',
      subtitle: 'Tienda online multi-tenant con 22+ módulos integrados',
      description: 'Plataforma ecommerce de nivel empresarial con catálogo de productos, checkout seguro, pasarelas de pago (Nuvei, PayPhone, Kushki), inventario Kardex con WAC, facturación electrónica SRI, devoluciones RMA, programa de lealtad, email marketing, cotizaciones B2B, tickets de soporte y constructor de homepage arrastrando secciones.',
      highlightsTitle: 'Funcionalidades Principales',
      highlights: [
        'Multi-tenant SaaS con aislamiento total de datos',
        'Variantes, bundles, atributos dinámicos y multi-idioma',
        'Checkout con Nuvei, PayPhone, Kushki y transferencia bancaria',
        'Inventario Kardex con costo promedio ponderado (WAC)',
        'Facturación electrónica SRI con firma digital XAdES',
        'Devoluciones (RMA), cupones, reseñas y programa de lealtad',
        'Dashboard CEO, reportes y recuperación de carritos abandonados',
        'API REST documentada con Swagger/OpenAPI',
      ],
      deliverablesTitle: 'Qué Incluye',
      deliverables: [
        'Plataforma SaaS completa con panel admin Filament',
        'Storefront responsive con constructor de homepage (10 tipos de sección)',
        'Integración de pasarelas de pago y facturación electrónica SRI',
        'Email marketing, tickets de soporte y webhooks',
        '3 planes: Básico ($50), Profesional ($100), Enterprise ($150)',
      ],
    },
    advisory: {
      badge: 'Landing del Proyecto',
      title: 'Servicios de Asesoría',
      subtitle: 'Estrategia, arquitectura y hoja de ruta de implementación',
      description: 'Asesoría para startups y empresas consolidadas que necesitan dirección técnica, optimización de procesos y ejecución con foco en resultados.',
      highlightsTitle: 'Alcance Principal',
      highlights: [
        'Asesoría tecnológica y de arquitectura',
        'Planeación y priorización de producto',
        'Iniciativas de optimización de procesos',
        'Acompañamiento para ejecución y escala',
      ],
      deliverablesTitle: 'Qué Entregamos',
      deliverables: [
        'Diagnóstico técnico',
        'Roadmap y plan de implementación',
        'Sesiones de seguimiento con liderazgo',
      ],
    },
    migration: {
      badge: 'Producto SaaS',
      title: 'SaaS de Gestión Migratoria',
      subtitle: 'Plataforma multitenancy para facilitadores migratorios',
      description: 'Plataforma SaaS completa para consultoras de inmigración que permite gestionar clientes, casos, documentos, pagos y portal del cliente.',
      highlightsTitle: 'Funcionalidades Principales',
      highlights: [
        'Arquitectura multitenancy con aislamiento de datos',
        'Gestión completa de casos y clientes',
        'Almacenamiento y seguimiento de documentos',
        'Procesamiento de pagos integrado (Stripe, PayPal)',
        'Portal de autoservicio para clientes',
        'Analytics y reportes avanzados',
      ],
      deliverablesTitle: 'Qué Incluye',
      deliverables: [
        'Plataforma SaaS con panel de administración',
        'Portal del cliente con seguimiento en tiempo real',
        'Integraciones de pago y facturación',
        '14 días de prueba gratis y onboarding',
      ],
    },
    'broker-seguro': {
      badge: 'Producto SaaS',
      title: 'Software para Brókers de Seguros',
      subtitle: 'Plataforma multi-tenant para brókers de seguros',
      description: 'Plataforma SaaS completa para brókers de seguros: gestión de clientes, pólizas, reclamos con wizard, formularios dinámicos, portal del cliente y reportes.',
      highlightsTitle: 'Funcionalidades Principales',
      highlights: [
        'Arquitectura multi-tenant con aislamiento de datos',
        'Gestión de clientes y dependientes',
        'Ciclo de vida de pólizas',
        'Reclamos inteligentes con wizard de 4 pasos',
        'Constructor de formularios dinámicos (16 tipos de campo)',
        'Portal de autoservicio para asegurados',
      ],
      deliverablesTitle: 'Qué Incluye',
      deliverables: [
        'Plataforma SaaS con panel de administración',
        'Portal del cliente con seguimiento de pólizas y reclamos',
        'Constructor de formularios para cada tipo de reclamo',
        '96 endpoints REST API',
      ],
    },
  },
};


// ... existing code ...

export const ProjectLanding = ({ projectId, onBack }: ProjectLandingProps) => {
  const { language } = useLanguage();
  const copy = PROJECT_COPY[language][projectId];
  const whatsappNumber = '593986059727';
  const packagistUrl = 'https://packagist.org/packages/amephia/sri-ec';
  // Email generated at runtime
  const introMessage =
    language === 'es'
      ? `Hola, quiero información del proyecto ${copy.title}.`
      : `Hi, I want more information about the ${copy.title} project.`;
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(introMessage)}`;
  const emailSubject =
    language === 'es'
      ? `Agenda de proyecto: ${copy.title}`
      : `Project consultation: ${copy.title}`;

  // For email, we use a button handler instead of mailto: link to avoid scraping
  const secondaryUrl = projectId === 'facturacion' ? packagistUrl : '#';
  const secondaryLabel =
    projectId === 'facturacion'
      ? language === 'es'
        ? 'Ver Paquete en Packagist'
        : 'View Package on Packagist'
      : language === 'es'
        ? 'Agendar Asesoría'
        : 'Book Advisory Call';
  const backLabel = language === 'es' ? 'Volver al Portafolio' : 'Back to Portfolio';
  const ctaLabel = language === 'es' ? 'Solicitar este Proyecto' : 'Request this Project';
  const responseNote =
    language === 'es'
      ? 'Respuesta por WhatsApp en minutos.'
      : 'WhatsApp response in minutes.';
  const handlePrimaryCtaClick = () => {
    const context = `project_${projectId}_primary`;
    trackEvent('project_cta_click', { project_id: projectId, cta: 'whatsapp' });
    trackContactClick('whatsapp', context);
    trackLeadGenerated('whatsapp', context);
  };
  const handleSecondaryCtaClick = () => {
    const ctaType = projectId === 'facturacion' ? 'packagist' : 'email';
    trackEvent('project_cta_click', { project_id: projectId, cta: ctaType });
    if (ctaType === 'email') {
      const context = `project_${projectId}_secondary`;
      trackContactClick('email', context);
      trackLeadGenerated('email', context);
      // Trigger email client opening
      openEmailClient(emailSubject);
    }
  };

  return (
    <section className="py-16 pb-28 md:pb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="mb-10"
      >
        <button
          onClick={onBack}
          className="mb-8 px-4 py-2 text-xs font-mono uppercase tracking-wider bg-white/5 border border-white/10 rounded-lg hover:border-primary/40 hover:text-primary transition-colors"
        >
          {backLabel}
        </button>
        <span className="block text-xs font-mono uppercase tracking-wider text-primary mb-3">
          {copy.badge}
        </span>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-4">{copy.title}</h1>
        <p className="text-lg md:text-xl text-white/80 mb-4">{copy.subtitle}</p>
        <p className="text-base text-mutedText max-w-4xl leading-relaxed">{copy.description}</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.4 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-6"
        >
          <h2 className="text-xl font-semibold text-white mb-4">{copy.highlightsTitle}</h2>
          <ul className="space-y-3 text-sm text-mutedText">
            {copy.highlights.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-6"
        >
          <h2 className="text-xl font-semibold text-white mb-4">{copy.deliverablesTitle}</h2>
          <ul className="space-y-3 text-sm text-mutedText">
            {copy.deliverables.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          onClick={handlePrimaryCtaClick}
          className="inline-flex items-center justify-center px-6 py-3 bg-primary text-background font-semibold rounded-lg hover:bg-primary/90 transition-colors"
        >
          {ctaLabel}
        </a>
        <a
          href={secondaryUrl}
          target={projectId === 'facturacion' ? '_blank' : undefined}
          rel={projectId === 'facturacion' ? 'noreferrer' : undefined}
          onClick={handleSecondaryCtaClick}
          className="inline-flex items-center justify-center px-6 py-3 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/5 transition-colors"
        >
          {secondaryLabel}
        </a>
        <span className="text-sm text-mutedText">{responseNote}</span>
      </div>

      <div className="md:hidden fixed bottom-4 inset-x-4 z-40">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          onClick={handlePrimaryCtaClick}
          className="w-full inline-flex items-center justify-center px-6 py-3 bg-primary text-background font-semibold rounded-xl shadow-[0_8px_24px_rgba(143,168,118,0.35)]"
        >
          {ctaLabel}
        </a>
      </div>
    </section>
  );
};
