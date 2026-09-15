import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  ArrowRight, Code2, Globe, ShoppingCart, Zap, Cloud,
  Shield, Users, CheckCircle2, FileText,
  Settings, TrendingUp, Award, Clock, PhoneCall, Mail,
  ChevronRight, ChevronDown, Database, Cpu, Layers, Menu, X, Sparkles,
  Lock, Server, Check, ExternalLink, ShieldCheck, Terminal, Network,
  MessageSquare, Send, Activity, HelpCircle, Star,
} from 'lucide-react';
import { trackContactClick, trackLeadGenerated } from '../lib/analytics';
import { getContactEmail, openEmailClient } from '../lib/emailUtils';
import type { ProjectId } from '../projects';
import { useLanguage } from '../i18n';
import type { Language } from '../i18n';
import logo from '../assets/images/amelogo_v3_optimized.webp';

/* ─── CONFIG & CONTACT ─────────────────────────────────── */
const WA_NUMBER = '13347324056';
type LegalPage = 'terms' | 'privacy' | null;

const waURL = (lang: Language, ctx = 'hero', extraText = '') => {
  const msgsES: Record<string, string> = {
    hero: 'Hola AmePhia, les escribo desde su sitio web. Me gustaría conversar sobre un proyecto tecnológico para mi empresa. ¿Podemos agendar una llamada?',
    services: 'Hola AmePhia, vi sus servicios de ingeniería y desarrollo. Quisiera consultar por una solución a medida. ¿Tienen disponibilidad?',
    products: 'Hola AmePhia, me interesa conocer más sobre su suite de software y solicitar una demo en vivo. ¿Cuándo podemos coordinar?',
    diagnostic: extraText || 'Hola AmePhia, realicé el diagnóstico tecnológico en su web y me gustaría recibir una cotización formal.',
    cta: 'Hola AmePhia, queremos modernizar el software de nuestra empresa. ¿Cuándo podemos coordinar una reunión técnica?',
    floating: 'Hola AmePhia, quisiera información sobre sus servicios de software y arquitectura cloud.',
    footer: 'Hola AmePhia, me gustaría recibir más información sobre sus productos y desarrollos.',
  };

  const msgsEN: Record<string, string> = {
    hero: 'Hello AmePhia, I am contacting you from your website. I would like to discuss a software engineering project for my company. Can we schedule a call?',
    services: 'Hello AmePhia, I saw your engineering and development services and would like to inquire about a custom solution. Do you have availability?',
    products: 'Hello AmePhia, I am interested in your software suite and would like to request a live demo. When can we coordinate?',
    diagnostic: extraText || 'Hello AmePhia, I completed the technical diagnostic on your website and would like to receive a formal quotation.',
    cta: 'Hello AmePhia, we want to upgrade our company software architecture. When can we schedule a technical meeting?',
    floating: 'Hello AmePhia, I would like information regarding your software and cloud architecture services.',
    footer: 'Hello AmePhia, I would like to receive more information about your products and services.',
  };

  const msgs = lang === 'en' ? msgsEN : msgsES;
  const body = extraText || msgs[ctx] || msgs.hero;
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(body)}`;
};

const openWA = (lang: Language, ctx = 'hero', extraText = '') => {
  trackContactClick('whatsapp', `company_${ctx}`);
  trackLeadGenerated('whatsapp', `company_${ctx}`);
  window.open(waURL(lang, ctx, extraText), '_blank');
};

/* ─── LEGAL MODAL ───────────────────────────────────────── */
const LegalModal = ({ page, onClose, lang }: { page: LegalPage; onClose: () => void; lang: Language }) => {
  if (!page) return null;

  const titles: Record<Exclude<LegalPage, null>, { es: string; en: string }> = {
    terms: { es: 'Términos de Uso', en: 'Terms of Use' },
    privacy: { es: 'Política de Privacidad', en: 'Privacy Policy' },
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-start justify-center overflow-y-auto bg-black/85 backdrop-blur-md" onClick={onClose}>
      <div
        className="relative w-full max-w-5xl mx-4 my-10 rounded-3xl border border-white/10 bg-[#0A1124] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full border border-white/10 bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors flex items-center justify-center"
          aria-label={lang === 'en' ? 'Close' : 'Cerrar'}
        >
          <X className="w-5 h-5" />
        </button>

        <div className="px-6 md:px-10 pt-10 pb-8 border-b border-white/10">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-2">
            {titles[page][lang]}
          </h2>
          <p className="text-sm text-slate-500">
            {lang === 'en' ? 'Last updated: September 15, 2026' : 'Última actualización: 15 de septiembre de 2026'}
          </p>
        </div>

        <div className="px-6 md:px-10 py-8 max-h-[70vh] overflow-y-auto prose prose-invert prose-slate max-w-none text-slate-300 leading-relaxed space-y-6 text-sm">
          {page === 'terms' ? <CompanyTermsContent lang={lang} /> : <CompanyPrivacyContent lang={lang} />}
        </div>

        <div className="px-6 md:px-10 py-6 border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#6366F1] text-white font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all"
          >
            {lang === 'en' ? 'Close' : 'Cerrar'}
          </button>
        </div>
      </div>
    </div>
  );
};

const CompanyTermsContent = ({ lang }: { lang: Language }) => {
  if (lang === 'en') {
    return (
      <div className="space-y-6 text-slate-300 text-sm leading-relaxed">
        <section>
          <h3 className="text-lg font-bold text-white mb-2">1. Acceptance and Operational Scope</h3>
          <p>
            By accessing, browsing, or utilizing the web portals, technical calculators, diagnostic tools, demo sandboxes, and commercial communications operated by AmePhia Systems Inc. (&quot;AmePhia&quot;), you acknowledge and agree to be bound by these Terms of Use and our Privacy Policy.
          </p>
          <p className="mt-2">
            AmePhia operates as an international software engineering and cloud consulting firm with corporate offices in California, United States and engineering operations in Ecuador. If you are accessing this site on behalf of a corporation, business entity, or institution, you affirm that you have the requisite legal authority to bind said entity to these Terms.
          </p>
        </section>

        <section>
          <h3 className="text-lg font-bold text-white mb-2">2. Custom Software Engineering & Contracting</h3>
          <p>
            This website provides commercial and technical information regarding AmePhia&apos;s capabilities, proprietary products (e.g., Facturón, AmePhia EDU, ShieldData), and custom engineering services. Specific engineering engagements, dedicated nearshore teams, custom ERP deployments, and SLA commitments are formally governed by signed Master Services Agreements (MSA), Statements of Work (SOW), or Purchase Orders executed between the client and AmePhia Systems Inc.
          </p>
          <p className="mt-2">
            We provide flexible legal contracting structures tailored to your jurisdiction: US-based contracts governed under United States law (with W-8BEN/W-9 compliance, ACH, or Wire settlement) or international/domestic agreements under Ecuadorian law.
          </p>
        </section>

        <section>
          <h3 className="text-lg font-bold text-white mb-2">3. 100% Source Code Ownership & Intellectual Property</h3>
          <p>
            For all bespoke and custom software development projects, AmePhia assigns 100% of the custom source code, database architectures, APIs, and associated proprietary assets to the client upon full payment of the contractual milestones stipulated in the applicable SOW.
          </p>
          <p className="mt-2">
            AmePhia retains ownership only of its pre-existing proprietary frameworks, foundational libraries, and standardized SaaS products (such as Facturón or ShieldData), granting the client perpetual or subscription-based usage rights as defined in their respective product agreements.
          </p>
        </section>

        <section>
          <h3 className="text-lg font-bold text-white mb-2">4. Strict Confidentiality & Non-Disclosure (NDA)</h3>
          <p>
            We treat all proprietary customer business information, operational data, strategic roadmap details, workflows, and database records submitted to AmePhia with strict institutional confidentiality. Prior to exchanging detailed technical specifications or source code, we routinely execute bilateral Non-Disclosure Agreements (NDAs) to protect your trade secrets.
          </p>
        </section>

        <section>
          <h3 className="text-lg font-bold text-white mb-2">5. Permitted Use & Security Integrity</h3>
          <p>
            You agree to use this website and any associated interactive demos strictly for lawful, evaluation, and business purposes. You agree not to:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 mt-2 text-slate-300">
            <li>Engage in unauthorized penetration testing, vulnerability scanning, or Denial of Service (DoS) attacks.</li>
            <li>Use automated scrapers, web spiders, or data mining tools without prior express written authorization.</li>
            <li>Attempt to reverse-engineer, decompile, or tamper with any sandbox demo or proprietary binary.</li>
            <li>Submit malicious code, falsified contact identities, or fraudulent fiscal identifiers.</li>
          </ul>
        </section>

        <section>
          <h3 className="text-lg font-bold text-white mb-2">6. Warranty, SLA & Limitation of Liability</h3>
          <p>
            Custom development contracts include a designated post-launch warranty period during which bug fixes and defect remediations are performed at zero additional charge. Production SLA terms (e.g., 99.9% uptime, maximum response times) apply as explicitly guaranteed in signed SLA contracts.
          </p>
          <p className="mt-2">
            In no event shall AmePhia be liable for indirect, incidental, or consequential damages resulting from third-party outages (such as public telecommunication failures or external governmental tax authority downtime) outside of its direct technological control.
          </p>
        </section>

        <section>
          <h3 className="text-lg font-bold text-white mb-2">7. Governing Law & Dispute Resolution</h3>
          <p>
            Unless otherwise stipulated in a signed Master Services Agreement:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 mt-2 text-slate-300">
            <li>For engagements contracted under our United States corporate presence, disputes shall be governed by the laws of the State of California, USA, resolved through binding commercial arbitration or courts of competent jurisdiction.</li>
            <li>For domestic engagements contracted in Ecuador, disputes shall be governed by the laws of the Republic of Ecuador.</li>
          </ul>
        </section>
      </div>
    );
  }

  return (
    <div className="space-y-6 text-slate-300 text-sm leading-relaxed">
      <section>
        <h3 className="text-lg font-bold text-white mb-2">1. Aceptación y Alcance Operativo</h3>
        <p>
          Al acceder, navegar o utilizar este sitio web, calculadoras técnicas, simuladores de diagnóstico, entornos demo de producto y canales de atención de AmePhia Systems Inc. (&quot;AmePhia&quot;), usted acepta expresamente estos Términos de Uso y nuestra Política de Privacidad.
        </p>
        <p className="mt-2">
          AmePhia opera como una firma internacional de ingeniería de software con presencia corporativa en California (Estados Unidos) y centro de ingeniería en Ecuador. Si accede en nombre de una empresa u organización, declara contar con la personería y facultades legales para vincular a dicha entidad a estos Términos.
        </p>
      </section>

      <section>
        <h3 className="text-lg font-bold text-white mb-2">2. Desarrollo a Medida y Contratación de Servicios</h3>
        <p>
          La información exhibida en este sitio web tiene carácter informativo y comercial. Los compromisos de desarrollo de software a medida, asignación de equipos dedicados (nearshore), despliegue de ERPs y acuerdos de nivel de servicio (SLA) se formalizan exclusivamente mediante la firma de contratos de prestación de servicios de software (Master Services Agreement o Contrato Marco), Especificaciones Técnicas (Statement of Work - SOW) o cotizaciones formales suscritas por ambas partes.
        </p>
        <p className="mt-2">
          Disponemos de esquemas de contratación flexibles adaptados a su jurisdicción: contratos comerciales bajo legislación de Estados Unidos (con cumplimiento fiscal W-8/W-9, transferencias bancarias ACH o Wire) o contratos nacionales bajo legislación ecuatoriana y pasarelas de pago autorizadas.
        </p>
      </section>

      <section>
        <h3 className="text-lg font-bold text-white mb-2">3. Propiedad Intelectual y Código Fuente 100% del Cliente</h3>
        <p>
          En todos los desarrollos de software construidos a medida, AmePhia transfiere y cede el 100% de los derechos patrimoniales sobre el código fuente personalizado, arquitectura de datos, scripts y componentes desarrollados a favor del cliente una vez liquidados los hitos económicos pactados en el contrato.
        </p>
        <p className="mt-2">
          AmePhia conserva la titularidad exclusiva sobre sus herramientas propietarias preexistentes, librerías base y productos SaaS estandarizados (tales como Facturón o ShieldData), otorgando al cliente las licencias de uso o suscripciones estipuladas en el respectivo acuerdo de producto.
        </p>
      </section>

      <section>
        <h3 className="text-lg font-bold text-white mb-2">4. Confidencialidad Rigurosa y Acuerdos NDA</h3>
        <p>
          Toda la información operativa, bases de datos, lógica de negocio, secretos comerciales y requerimientos compartidos con AmePhia son tratados bajo estricto deber de reserva y secreto profesional. Previo al intercambio de especificaciones sensibles o código propietario, suscribimos acuerdos bilaterales de confidencialidad (NDA) para blindar legalmente sus activos comerciales.
        </p>
      </section>

      <section>
        <h3 className="text-lg font-bold text-white mb-2">5. Uso Permitido y Seguridad de la Plataforma</h3>
        <p>
          El usuario se compromete a hacer uso de este sitio y sus demostraciones exclusivamente para fines legítimos de evaluación y contacto comercial. Queda expresamente prohibido:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 mt-2 text-slate-300">
          <li>Efectuar escaneos de vulnerabilidad no autorizados, ataques de denegación de servicio o ingeniería inversa sobre las plataformas.</li>
          <li>Emplear scrapers, robots de extracción masiva o spiders sin autorización previa y por escrito de AmePhia.</li>
          <li>Introducir código malicioso, bots, malware o remitir datos de contacto falsos o suplantados.</li>
        </ul>
      </section>

      <section>
        <h3 className="text-lg font-bold text-white mb-2">6. Garantía Técnica, SLA y Límites de Responsabilidad</h3>
        <p>
          Cada proyecto de software entregado incluye un período de garantía técnica por contrato para corrección de incidencias sin costo adicional. Los niveles de servicio de disponibilidad cloud (SLA) se rigen por las condiciones pactadas formalmente en cada acuerdo de infraestructura.
        </p>
        <p className="mt-2">
          AmePhia no se responsabiliza por interrupciones atribuibles a terceros ajenos a su control tecnológico, tales como caídas de proveedores globales de telecomunicaciones o indisponibilidad temporal de servicios de entidades tributarias o bancarias externas.
        </p>
      </section>

      <section>
        <h3 className="text-lg font-bold text-white mb-2">7. Ley Aplicable y Jurisdicción</h3>
        <p>
          Salvo estipulación expresa en un contrato suscrito entre las partes:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 mt-2 text-slate-300">
          <li>Para contratos ejecutados a través de nuestra presencia corporativa en Estados Unidos, regirán las leyes del Estado de California, EE.UU., resolviéndose mediante arbitraje comercial o tribunales competentes.</li>
          <li>Para contratos suscritos en Ecuador, regirán las leyes de la República del Ecuador.</li>
        </ul>
      </section>
    </div>
  );
};

const CompanyPrivacyContent = ({ lang }: { lang: Language }) => {
  if (lang === 'en') {
    return (
      <div className="space-y-6 text-slate-300 text-sm leading-relaxed">
        <section>
          <h3 className="text-lg font-bold text-white mb-2">1. Data Controller & Scope</h3>
          <p>
            AmePhia Systems Inc. (&quot;AmePhia&quot;), operating with corporate presence in California, United States and engineering operations in Ecuador, is the data controller responsible for the processing of personal and corporate data collected through this website, interactive diagnosis forms, demo inquiries, WhatsApp channels, and direct enterprise engagements.
          </p>
          <p className="mt-2">
            For inquiries regarding personal data protection, exercising your privacy rights, or regulatory compliance, contact our Data Privacy Officer at: <span className="text-white font-mono">info@amephia.com</span>.
          </p>
        </section>

        <section>
          <h3 className="text-lg font-bold text-white mb-2">2. Information We Collect</h3>
          <p>We process only the minimum information necessary to provide software engineering proposals, technical consultation, and contract execution:</p>
          <ul className="list-disc pl-5 space-y-1.5 mt-2 text-slate-300">
            <li><strong className="text-white">Business Contact Data:</strong> Full name, corporate email address, corporate telephone or WhatsApp number, company name, and country.</li>
            <li><strong className="text-white">Project Scope Specifications:</strong> System requirements, technology preferences, timeline constraints, and architectural details submitted through our contact forms or diagnostic calculators.</li>
            <li><strong className="text-white">Technical Browsing Data:</strong> Aggregated, non-personally identifiable telemetry (browser type, device category, anonymized IP, navigation flow) managed securely via Google Analytics to optimize user experience.</li>
          </ul>
        </section>

        <section>
          <h3 className="text-lg font-bold text-white mb-2">3. Purpose of Processing & Legal Basis</h3>
          <p>We collect and process your personal and project information based on legitimate commercial interest and pre-contractual execution:</p>
          <ul className="list-disc pl-5 space-y-1.5 mt-2 text-slate-300">
            <li>Evaluating technical requirements and issuing detailed architectural and economic proposals within 48 hours.</li>
            <li>Executing bilateral Non-Disclosure Agreements (NDAs) and formal Master Services Agreements.</li>
            <li>Providing technical demonstrations, proof-of-concept sandboxes, and enterprise customer support.</li>
            <li>Complying with regulatory obligations under the Ecuadorian Personal Data Protection Law (LOPDP), the California Consumer Privacy Act (CCPA), and applicable international standards.</li>
          </ul>
        </section>

        <section>
          <h3 className="text-lg font-bold text-white mb-2">4. We Do Not Sell Personal Data (CCPA & LOPDP)</h3>
          <p>
            <strong className="text-white">AmePhia does not sell, lease, rent, or monetize personal data or client information under any circumstances.</strong> We do not share your information with data brokers or unauthorized advertising networks. Data is shared strictly with authorized cloud infrastructure providers (such as Amazon Web Services - AWS) under strict confidentiality agreements solely to host and secure the services.
          </p>
        </section>

        <section>
          <h3 className="text-lg font-bold text-white mb-2">5. Data Security & Cryptographic Protection</h3>
          <p>
            We enforce robust administrative, technical, and physical safeguards aligned with ISO 27001 and NIST security standards:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 mt-2 text-slate-300">
            <li>All website traffic is encrypted end-to-end using modern TLS 1.3 protocol.</li>
            <li>Database assets and project repositories are protected with AES-256 encryption at rest and role-based access control (RBAC).</li>
            <li>Internal access is restricted exclusively to vetted senior engineers bound by written confidentiality agreements.</li>
          </ul>
        </section>

        <section>
          <h3 className="text-lg font-bold text-white mb-2">6. Your Rights (Access, Correction & Deletion)</h3>
          <p>
            Regardless of your geographic location, you have the right to:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 mt-2 text-slate-300">
            <li><strong className="text-white">Access:</strong> Request confirmation of whether we process your data and obtain a copy.</li>
            <li><strong className="text-white">Correction:</strong> Request rectification of inaccurate or outdated corporate records.</li>
            <li><strong className="text-white">Deletion (Right to be Forgotten):</strong> Request the permanent removal of your contact records from our commercial databases, subject to mandatory tax or legal retention requirements.</li>
            <li><strong className="text-white">Opt-out:</strong> Withdraw consent for non-essential communications at any time.</li>
          </ul>
          <p className="mt-2">
            To exercise any of these rights, send a written request to <span className="text-white font-mono">info@amephia.com</span> with the subject &quot;Privacy Rights Request&quot;. We respond to all formal requests within 5 business days.
          </p>
        </section>
      </div>
    );
  }

  return (
    <div className="space-y-6 text-slate-300 text-sm leading-relaxed">
      <section>
        <h3 className="text-lg font-bold text-white mb-2">1. Responsable del Tratamiento y Ámbito</h3>
        <p>
          AmePhia Systems Inc. (&quot;AmePhia&quot;), con presencia corporativa en California (Estados Unidos) y centro de ingeniería en Ecuador, es el responsable del tratamiento de los datos personales y corporativos recopilados a través de este sitio web, calculadoras de diagnóstico tecnológico, formularios de contacto, canales de WhatsApp y comunicaciones comerciales formales.
        </p>
        <p className="mt-2">
          Para consultas sobre privacidad, ejercicio de derechos ARCO o cumplimiento normativo, puede comunicarse directamente con nuestro equipo de privacidad a través de: <span className="text-white font-mono">info@amephia.com</span>.
        </p>
      </section>

      <section>
        <h3 className="text-lg font-bold text-white mb-2">2. Qué Datos Recopilamos</h3>
        <p>Recopilamos y tratamos únicamente la información indispensable para elaborar propuestas de ingeniería, atender consultas comerciales y formalizar contratos de software:</p>
        <ul className="list-disc pl-5 space-y-1.5 mt-2 text-slate-300">
          <li><strong className="text-white">Datos de Contacto Empresarial:</strong> Nombre y apellido, correo electrónico corporativo, número de teléfono o WhatsApp, empresa y país de origen.</li>
          <li><strong className="text-white">Especificaciones del Requerimiento:</strong> Alcance funcional, tecnologías requeridas, plazos de entrega y detalles técnicos provistos en nuestros formularios o cotizador.</li>
          <li><strong className="text-white">Métricas Técnicas de Navegación:</strong> Datos estadísticos anonimizados (tipo de dispositivo, navegador, tiempo de navegación) gestionados mediante Google Analytics con IP anonimizada para mejorar la experiencia de usuario.</li>
        </ul>
      </section>

      <section>
        <h3 className="text-lg font-bold text-white mb-2">3. Finalidades y Base Legal del Tratamiento</h3>
        <p>El tratamiento de datos se fundamenta en el consentimiento previo, la ejecución de medidas precontractuales a solicitud del titular y el cumplimiento de obligaciones legales:</p>
        <ul className="list-disc pl-5 space-y-1.5 mt-2 text-slate-300">
          <li>Evaluar requerimientos técnicos para remitir propuestas de arquitectura y cotizaciones formales en un plazo de 48 horas.</li>
          <li>Suscribir acuerdos bilaterales de confidencialidad (NDA) y contratos de desarrollo de software a medida.</li>
          <li>Coordinar demostraciones en vivo, pruebas de concepto y soporte técnico especializado.</li>
          <li>Garantizar estricto cumplimiento con la Ley Orgánica de Protección de Datos Personales (LOPDP) de la República del Ecuador, la California Consumer Privacy Act (CCPA) de EE.UU. y estándares internacionales.</li>
        </ul>
      </section>

      <section>
        <h3 className="text-lg font-bold text-white mb-2">4. Declaración de No Venta de Datos Personales</h3>
        <p>
          <strong className="text-white">AmePhia bajo ninguna circunstancia vende, arrienda, comercializa ni transfiere datos personales o información de clientes a terceros para fines publicitarios.</strong> La información solo se comparte con proveedores de infraestructura tecnológica de clase mundial (como Amazon Web Services - AWS) bajo rigurosos acuerdos de confidencialidad y únicamente para alojar de forma segura nuestros servicios.
        </p>
      </section>

      <section>
        <h3 className="text-lg font-bold text-white mb-2">5. Seguridad de la Información y Cifrado</h3>
        <p>
          Implementamos protocolos de ciberseguridad industrial y directrices alineadas a ISO 27001 y NIST:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 mt-2 text-slate-300">
          <li>Toda comunicación en el sitio web está protegida con cifrado en tránsito de última generación (TLS 1.3).</li>
          <li>Repositorios de proyectos y bases de datos están protegidos con cifrado en reposo AES-256 y controles de acceso basados en roles (RBAC).</li>
          <li>El acceso a la información está estrictamente limitado a ingenieros senior autorizados bajo contratos de confidencialidad y secreto profesional.</li>
        </ul>
      </section>

      <section>
        <h3 className="text-lg font-bold text-white mb-2">6. Derechos del Titular (Acceso, Rectificación y Eliminación)</h3>
        <p>
          Conforme a la LOPDP y normativas internacionales aplicables, usted tiene derecho a:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 mt-2 text-slate-300">
          <li><strong className="text-white">Acceso y Conocimiento:</strong> Conocer qué datos personales suyos conservamos y para qué fines.</li>
          <li><strong className="text-white">Rectificación:</strong> Solicitar la actualización o corrección de datos inexactos o desactualizados.</li>
          <li><strong className="text-white">Eliminación:</strong> Solicitar la supresión definitiva de sus datos de nuestras bases comerciales cuando ya no sean necesarios para la relación comercial.</li>
          <li><strong className="text-white">Oposición:</strong> Oponerse en cualquier momento al envío de información técnica o comercial.</li>
        </ul>
        <p className="mt-2">
          Para ejercer cualquiera de estos derechos, remita un correo a <span className="text-white font-mono">info@amephia.com</span> con el asunto &quot;Solicitud de Derechos de Privacidad&quot;. Atendemos y resolvemos toda solicitud en un plazo máximo de 5 días laborables.
        </p>
      </section>
    </div>
  );
};

/* ─── COUNTER ───────────────────────────────────────── */
const Counter = ({ end, suffix = '' }: { end: number; suffix?: string }) => {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const t0 = performance.now();
        const run = (now: number) => {
          const p = Math.min((now - t0) / 1800, 1);
          setVal(Math.round((1 - Math.pow(1 - p, 3)) * end));
          if (p < 1) requestAnimationFrame(run);
        };
        requestAnimationFrame(run);
      }
    }, { threshold: 0.2 });

    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [end]);

  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
};

/* ─── NAVBAR ────────────────────────────────────────── */
const Navbar = () => {
  const { language, setLanguage } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const links = language === 'en' ? [
    { label: 'Products', id: 'productos' },
    { label: 'Services', id: 'servicios' },
    { label: 'Express Estimator', id: 'cotizador' },
    { label: 'Technology', id: 'tecnologia' },
    { label: 'About Us', id: 'nosotros' },
    { label: 'Contact', id: 'contacto' },
  ] : [
    { label: 'Productos', id: 'productos' },
    { label: 'Servicios', id: 'servicios' },
    { label: 'Cotizador Express', id: 'cotizador' },
    { label: 'Tecnología', id: 'tecnologia' },
    { label: 'Nosotros', id: 'nosotros' },
    { label: 'Contacto', id: 'contacto' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled
        ? 'bg-[#060B16]/90 backdrop-blur-xl border-b border-white/[0.08] shadow-2xl shadow-black/60 py-3.5'
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        <button onClick={() => go('hero')} className="flex items-center gap-3 group text-left">
          <div className="relative">
            <div className="absolute -inset-1 rounded-full bg-blue-500/20 blur group-hover:bg-blue-500/40 transition-all" />
            <img src={logo} alt="AmePhia Systems" className="relative h-8 md:h-9 w-auto object-contain brightness-0 invert opacity-95 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="hidden sm:block">
            <span className="block text-xs font-mono font-medium text-blue-400 tracking-wider">SYSTEMS</span>
            <span className="block text-[10px] text-slate-400">Software & Cloud</span>
          </div>
        </button>

        <nav className="hidden lg:flex items-center gap-1 bg-white/[0.03] border border-white/[0.08] px-4 py-1.5 rounded-full backdrop-blur-md">
          {links.map(l => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className="px-3.5 py-1.5 text-xs text-slate-300 hover:text-white hover:bg-white/[0.08] rounded-full transition-all font-medium tracking-wide"
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          {/* Language Selector with Flags */}
          <div className="flex items-center bg-white/[0.05] border border-white/[0.1] rounded-full p-1 text-xs backdrop-blur-sm">
            <button
              onClick={() => setLanguage('es')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full transition-all duration-200 ${
                language === 'es'
                  ? 'bg-blue-600 text-white font-semibold shadow-md shadow-blue-500/25'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Español"
              aria-label="Cambiar a Español"
            >
              <span className="text-sm leading-none" role="img" aria-label="Bandera de España">🇪🇸</span>
              <span className="font-mono text-[11px] font-semibold">ES</span>
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full transition-all duration-200 ${
                language === 'en'
                  ? 'bg-blue-600 text-white font-semibold shadow-md shadow-blue-500/25'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="English"
              aria-label="Switch to English"
            >
              <span className="text-sm leading-none" role="img" aria-label="United States Flag">🇺🇸</span>
              <span className="font-mono text-[11px] font-semibold">EN</span>
            </button>
          </div>

          <button
            onClick={() => openWA(language, 'hero')}
            className="group flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#3B82F6] via-[#6366F1] to-[#8B5CF6] hover:from-[#2563EB] hover:to-[#7C3AED] text-white text-xs font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/35 hover:-translate-y-0.5"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'Talk to an Engineer' : 'Hablar con un ingeniero'}</span>
          </button>
        </div>

        {/* Mobile menu and lang toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.06] border border-white/[0.12] text-xs text-white"
            title={language === 'es' ? 'Switch to English' : 'Cambiar a Español'}
            aria-label={language === 'es' ? 'Switch to English' : 'Cambiar a Español'}
          >
            <span className="text-sm leading-none">{language === 'es' ? '🇪🇸' : '🇺🇸'}</span>
            <span className="font-mono text-[11px] font-bold">{language.toUpperCase()}</span>
          </button>
          <button
            className="p-2 text-slate-300 hover:text-white bg-white/[0.05] border border-white/10 rounded-xl transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="lg:hidden bg-[#0A1124]/98 border-b border-white/[0.08] px-6 pb-6 pt-4 space-y-2 backdrop-blur-2xl"
        >
          {links.map(l => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className="block w-full text-left px-4 py-2.5 text-slate-300 hover:text-white hover:bg-white/[0.06] rounded-xl transition-colors text-sm font-medium"
            >
              {l.label}
            </button>
          ))}
          <div className="pt-3 flex items-center justify-between border-t border-white/[0.08]">
            <span className="text-xs text-slate-400">Idioma / Language:</span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setLanguage('es')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  language === 'es' ? 'bg-blue-600 text-white font-semibold shadow-sm' : 'text-slate-400 hover:text-white bg-white/[0.04]'
                }`}
              >
                <span>🇪🇸</span>
                <span>Español</span>
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  language === 'en' ? 'bg-blue-600 text-white font-semibold shadow-sm' : 'text-slate-400 hover:text-white bg-white/[0.04]'
                }`}
              >
                <span>🇺🇸</span>
                <span>English</span>
              </button>
            </div>
          </div>
          <div className="pt-2">
            <button
              onClick={() => { openWA(language, 'hero'); setMenuOpen(false); }}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-[#3B82F6] to-[#6366F1] text-white text-sm font-semibold rounded-xl shadow-lg shadow-blue-500/25"
            >
              <PhoneCall className="w-4 h-4" />
              <span>{language === 'en' ? 'Contact an Expert on WhatsApp' : 'Hablar con un experto en WhatsApp'}</span>
            </button>
          </div>
        </motion.div>
      )}
    </header>
  );
};

/* ─── HERO — IMPACTO EJECUTIVO & 3 MODOS ─────────────────── */
const HeroSection = () => {
  const { language } = useLanguage();
  const [heroMode, setHeroMode] = useState<'terminal' | 'arch' | 'metrics'>('terminal');

  const terminalLines = language === 'en' ? [
    { text: '$ amephia deploy --stack enterprise-cloud --region us-west-1', delay: 0 },
    { text: '→ Connecting AWS cloud cluster + PostgreSQL Multi-AZ...', delay: 0.4 },
    { text: '→ Validating SRI Ecuador & international endpoints (SOAP / X.509)...', delay: 0.8 },
    { text: '→ Verifying LLM Prompt Injection & AI Security Gateway... OK', delay: 1.2 },
    { text: '✓ 9 modules live · USA & LATAM active · SLA 99.99%', delay: 1.6, green: true },
  ] : [
    { text: '$ amephia deploy --stack enterprise-cloud --region us-west-1', delay: 0 },
    { text: '→ Conectando infraestructura AWS + Cluster PostgreSQL...', delay: 0.4 },
    { text: '→ Validando endpoints SRI Ecuador e internacionales (Soap / X.509)...', delay: 0.8 },
    { text: '→ Verificando protección contra Prompt Injection & Gateway IA... OK', delay: 1.2 },
    { text: '✓ 9 módulos en producción · Proyectos EE.UU. & LATAM · SLA 99.99%', delay: 1.6, green: true },
  ];

  return (
    <section id="hero" className="relative min-h-[92vh] flex items-center overflow-hidden bg-[#060B16] pt-24 pb-16">
      {/* Luces volumétricas ambientales */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[15%] w-[800px] h-[600px] rounded-full bg-gradient-to-br from-blue-600/15 via-indigo-600/10 to-transparent blur-[140px]" />
        <div className="absolute bottom-[-15%] right-[5%] w-[700px] h-[600px] rounded-full bg-gradient-to-tl from-purple-600/15 via-blue-600/10 to-transparent blur-[140px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[450px] bg-blue-500/[0.04] blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: 'linear-gradient(#94A3B8 1px, transparent 1px), linear-gradient(90deg, #94A3B8 1px, transparent 1px)',
            backgroundSize: '64px 64px'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#060B16]/60 to-[#060B16]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* COPY */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 bg-white/[0.04] border border-blue-500/20 rounded-2xl sm:rounded-full mb-7 backdrop-blur-md max-w-full"
            >
              <span className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-semibold text-slate-200 tracking-wide">
                <span>🇺🇸 California & NJ, USA</span>
                <span className="text-slate-500">&middot;</span>
                <span>🇪🇨 Ecuador</span>
                <span className="text-slate-500">&middot;</span>
                <span className="text-emerald-400 font-mono flex items-center gap-1">
                  <Globe className="w-3 h-3 inline" />
                  {language === 'en' ? 'US Track Record & Regional Delivery' : 'Proyectos en EE.UU. & Ecuador'}
                </span>
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-[4.2rem] font-bold leading-[1.06] tracking-tight text-white mb-7"
            >
              {language === 'en' ? (
                <>
                  We build the{' '}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#60A5FA] via-[#A78BFA] to-[#38BDF8] animate-shimmer bg-[length:200%_auto]">
                    software & cloud systems
                  </span>{' '}
                  that scale your business
                </>
              ) : (
                <>
                  Construimos el{' '}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#60A5FA] via-[#A78BFA] to-[#38BDF8] animate-shimmer bg-[length:200%_auto]">
                    software y la nube
                  </span>{' '}
                  que aceleran tu empresa
                </>
              )}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8 max-w-xl font-normal"
            >
              {language === 'en' ? (
                <>
                  Software engineering firm with corporate presence in <strong className="text-white font-semibold">California & Newark, NJ (USA)</strong> and <strong className="text-white font-semibold">Ecuador</strong>, with a <strong className="text-white font-semibold">proven track record executing projects across the United States</strong> and Latin America.
                  Over <strong className="text-white font-semibold">ten years</strong> developing custom ERPs, SaaS platforms,
                  high-concurrency mobile apps, and cloud systems with US contracting, nearshore delivery, and direct senior engineering.
                </>
              ) : (
                <>
                  Firma de ingeniería con presencia en <strong className="text-white font-semibold">California y Newark, NJ (EE.UU.)</strong> y <strong className="text-white font-semibold">Ecuador</strong>, con <strong className="text-white font-semibold">experiencia y proyectos ejecutados exitosamente en múltiples estados de Estados Unidos</strong> y Latinoamérica.
                  Más de <strong className="text-white font-semibold">diez años</strong> creando ERPs a medida, plataformas SaaS,
                  apps móviles de alto rendimiento y arquitecturas cloud con contratación formal en EE.UU., código que escala y entrega sin intermediarios.
                </>
              )}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button
                onClick={() => openWA(language, 'hero')}
                className="group flex items-center justify-center gap-3 px-7 py-4 bg-gradient-to-r from-[#3B82F6] via-[#6366F1] to-[#8B5CF6] hover:from-[#2563EB] hover:to-[#7C3AED] text-white font-semibold text-sm rounded-xl transition-all duration-300 shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5"
              >
                <span>{language === 'en' ? 'Tell Us About Your Project' : 'Cuéntanos tu proyecto'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => document.getElementById('productos')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center justify-center gap-2 px-7 py-4 border border-white/15 hover:border-white/35 bg-white/[0.03] hover:bg-white/[0.08] text-slate-200 hover:text-white font-medium text-sm rounded-xl transition-all duration-200 backdrop-blur-sm"
              >
                <Layers className="w-4 h-4 text-blue-400" />
                <span>{language === 'en' ? 'Explore Live Products' : 'Explorar productos en vivo'}</span>
              </button>
            </motion.div>

            {/* Badges de garantía */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="mt-10 pt-8 border-t border-white/[0.08] grid grid-cols-2 sm:grid-cols-4 gap-4"
            >
              {[
                { label: 'SRI Ecuador', desc: language === 'en' ? '100% Native' : '100% Nativo' },
                { label: 'AWS Cloud', desc: '99.9% SLA' },
                { label: 'LOPDP', desc: language === 'en' ? 'Legal Compliance' : 'Cumplimiento Legal' },
                { label: 'MinEduc 2025', desc: 'Tabla 9 LOEI' },
              ].map((b) => (
                <div key={b.label} className="flex flex-col">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-white">
                    <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span>{b.label}</span>
                  </div>
                  <span className="text-[11px] text-slate-400 pl-5">{b.desc}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* SHOWCASE INTERACTIVO */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 via-indigo-600/20 to-purple-600/20 rounded-3xl blur-2xl pointer-events-none" />

              <div className="relative bg-[#0B132B]/90 border border-white/[0.12] rounded-2xl overflow-hidden shadow-2xl backdrop-blur-xl">
                <div className="flex flex-wrap items-center justify-between gap-2 px-5 py-3.5 border-b border-white/[0.08] bg-[#0E1838]">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#FF5F56] inline-block" />
                    <span className="w-3 h-3 rounded-full bg-[#FFBD2E] inline-block" />
                    <span className="w-3 h-3 rounded-full bg-[#27C93F] inline-block" />
                    <span className="ml-2 text-xs font-mono text-slate-400 hidden sm:inline-block">amephia.engine v4.2</span>
                  </div>

                  <div className="flex items-center gap-1 bg-white/[0.06] p-1 rounded-lg border border-white/[0.08]">
                    <button
                      onClick={() => setHeroMode('terminal')}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono transition-all ${
                        heroMode === 'terminal' ? 'bg-blue-600 text-white font-semibold shadow' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Terminal className="w-3 h-3" />
                      <span>{language === 'en' ? 'Terminal' : 'Terminal'}</span>
                    </button>
                    <button
                      onClick={() => setHeroMode('arch')}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono transition-all ${
                        heroMode === 'arch' ? 'bg-blue-600 text-white font-semibold shadow' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Network className="w-3 h-3" />
                      <span>{language === 'en' ? 'Architecture' : 'Arquitectura'}</span>
                    </button>
                    <button
                      onClick={() => setHeroMode('metrics')}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono transition-all ${
                        heroMode === 'metrics' ? 'bg-blue-600 text-white font-semibold shadow' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Activity className="w-3 h-3" />
                      <span>{language === 'en' ? 'Metrics' : 'Métricas'}</span>
                    </button>
                  </div>
                </div>

                <div className="p-6 min-h-[300px] flex flex-col justify-center">
                  <AnimatePresence mode="wait">
                    {heroMode === 'terminal' && (
                      <motion.div
                        key="term"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-3 font-mono text-xs sm:text-sm break-words"
                      >
                        {terminalLines.map((line, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -6 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: line.delay, duration: 0.3 }}
                            className={line.green ? 'text-emerald-400 font-semibold flex items-center gap-1.5' : i === 0 ? 'text-blue-300' : 'text-slate-400'}
                          >
                            {line.text}
                          </motion.div>
                        ))}
                        <div className="pt-2 flex items-center gap-2 text-slate-500 text-xs">
                          <span className="w-2 h-4 bg-blue-500 animate-pulse" />
                          <span>{language === 'en' ? 'Listening on secure port 443...' : 'Esperando peticiones en puerto seguro 443...'}</span>
                        </div>
                      </motion.div>
                    )}

                    {heroMode === 'arch' && (
                      <motion.div
                        key="arch"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-4 text-xs font-mono"
                      >
                        <div className="grid grid-cols-3 gap-2 sm:gap-3 text-center">
                          <div className="p-2 sm:p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-300">
                            <Globe className="w-4 h-4 mx-auto mb-1 text-blue-400" />
                            <div className="font-bold text-[11px] sm:text-xs">{language === 'en' ? 'Clients' : 'Clientes'}</div>
                            <div className="text-[9px] sm:text-[10px] text-slate-400">Web/iOS/Android</div>
                          </div>
                          <div className="p-2 sm:p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-300">
                            <Server className="w-4 h-4 mx-auto mb-1 text-purple-400" />
                            <div className="font-bold text-[11px] sm:text-xs">CloudFront</div>
                            <div className="text-[9px] sm:text-[10px] text-slate-400">AWS LatAm &lt;20ms</div>
                          </div>
                          <div className="p-2 sm:p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
                            <Cpu className="w-4 h-4 mx-auto mb-1 text-emerald-400" />
                            <div className="font-bold text-[11px] sm:text-xs">{language === 'en' ? 'Services' : 'Servicios'}</div>
                            <div className="text-[9px] sm:text-[10px] text-slate-400">Docker + NestJS</div>
                          </div>
                        </div>

                        <div className="p-3 sm:p-3.5 rounded-xl bg-slate-900/80 border border-white/[0.08] flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 min-w-0">
                            <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                            <span className="text-white font-medium text-xs truncate">SRI Ecuador WebServices</span>
                          </div>
                          <span className="px-2 py-0.5 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] rounded flex-shrink-0">
                            {language === 'en' ? 'SOAP 1.2' : 'SOAP 1.2'}
                          </span>
                        </div>

                        <div className="p-3 sm:p-3.5 rounded-xl bg-slate-900/80 border border-white/[0.08] flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 min-w-0">
                            <Database className="w-4 h-4 text-amber-400 flex-shrink-0" />
                            <span className="text-white font-medium text-xs truncate">PostgreSQL + Redis</span>
                          </div>
                          <span className="px-2 py-0.5 bg-blue-500/15 border border-blue-500/30 text-blue-400 text-[10px] rounded flex-shrink-0">
                            {language === 'en' ? 'Multi-AZ' : 'Multi-AZ'}
                          </span>
                        </div>
                      </motion.div>
                    )}

                    {heroMode === 'metrics' && (
                      <motion.div
                        key="metrics"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="grid grid-cols-2 gap-3"
                      >
                        <div className="p-4 rounded-xl bg-slate-900/90 border border-white/[0.08]">
                          <div className="text-[11px] font-mono text-slate-400 uppercase">{language === 'en' ? 'Verified Uptime' : 'Uptime Verificado'}</div>
                          <div className="text-2xl sm:text-3xl font-bold text-emerald-400 font-mono mt-1">99.99%</div>
                          <div className="text-[10px] text-slate-500 mt-1">{language === 'en' ? 'AWS CloudWatch 24/7' : 'Monitoreo continuo AWS CloudWatch'}</div>
                        </div>
                        <div className="p-4 rounded-xl bg-slate-900/90 border border-white/[0.08]">
                          <div className="text-[11px] font-mono text-slate-400 uppercase">{language === 'en' ? 'SRI Latency' : 'Latencia SRI'}</div>
                          <div className="text-2xl sm:text-3xl font-bold text-blue-400 font-mono mt-1">&lt; 42ms</div>
                          <div className="text-[10px] text-slate-500 mt-1">{language === 'en' ? 'Optimized X.509 signature' : 'Firma digital X.509 optimizada'}</div>
                        </div>
                        <div className="p-4 rounded-xl bg-slate-900/90 border border-white/[0.08]">
                          <div className="text-[11px] font-mono text-slate-400 uppercase">{language === 'en' ? 'Transactions' : 'Transacciones'}</div>
                          <div className="text-2xl sm:text-3xl font-bold text-purple-400 font-mono mt-1">+100K</div>
                          <div className="text-[10px] text-slate-500 mt-1">{language === 'en' ? 'Invoices & payments processed' : 'Facturas y pagos procesados'}</div>
                        </div>
                        <div className="p-4 rounded-xl bg-slate-900/90 border border-white/[0.08]">
                          <div className="text-[11px] font-mono text-slate-400 uppercase">{language === 'en' ? 'Data Loss' : 'Pérdida de Datos'}</div>
                          <div className="text-2xl sm:text-3xl font-bold text-white font-mono mt-1">0%</div>
                          <div className="text-[10px] text-slate-500 mt-1">{language === 'en' ? 'Daily snapshots & KMS encryption' : 'Snapshots diarios y encriptación KMS'}</div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="px-5 py-3 border-t border-white/[0.08] bg-[#0E1838] flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2 text-slate-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{language === 'en' ? 'Proven Track Record: USA & LATAM' : 'Historial Comprobado: EE.UU. & LATAM'}</span>
                  </div>
                  <button
                    onClick={() => setHeroMode(heroMode === 'terminal' ? 'arch' : heroMode === 'arch' ? 'metrics' : 'terminal')}
                    className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
                  >
                    <span>{language === 'en' ? 'Switch View' : 'Cambiar vista'}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Badges interactivos flotantes */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.6 }}
                className="absolute -right-4 -bottom-6 bg-[#0E1838]/95 border border-white/15 rounded-2xl p-3.5 shadow-2xl backdrop-blur-xl hidden sm:flex items-center gap-3.5 z-20"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">{language === 'en' ? '+240% Efficiency' : '+240% de Eficiencia'}</div>
                  <div className="text-[11px] text-slate-400">{language === 'en' ? 'Proven business automation' : 'Automatización operativa comprobada'}</div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.6 }}
                className="absolute -left-4 -top-5 bg-[#0E1838]/95 border border-white/15 rounded-2xl p-3.5 shadow-2xl backdrop-blur-xl hidden sm:flex items-center gap-3.5 z-20"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">{language === 'en' ? '< 15 min response' : '< 15 min respuesta'}</div>
                  <div className="text-[11px] text-slate-400">{language === 'en' ? 'Direct engineering support' : 'Soporte técnico directo sin bots'}</div>
                </div>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

/* ─── MARQUESINA INFINITA DE INTEGRACIONES ─────────────── */
const IntegrationMarquee = () => {
  const { language } = useLanguage();

  const integrations = [
    { name: 'SRI Ecuador Facturación Nativa', cat: 'Tributario' },
    { name: 'Banco Pichincha', cat: 'Conciliación' },
    { name: 'Banco Guayaquil', cat: 'Banca' },
    { name: 'AWS Cloud Partner', cat: 'Infraestructura' },
    { name: 'PayPhone Ecuador', cat: 'Pagos' },
    { name: 'Kushki Pagos LatAm', cat: 'Pasarela' },
    { name: 'Stripe Global', cat: 'Checkout' },
    { name: 'MinEduc LOEI 2025', cat: 'Normativa' },
    { name: 'SPDP LOPDP Ecuador', cat: 'Privacidad' },
    { name: 'Docker & Kubernetes', cat: 'DevOps' },
    { name: 'PostgreSQL Enterprise', cat: 'Base de Datos' },
    { name: 'Redis In-Memory', cat: 'Caché' },
    { name: 'Apple App Store', cat: 'Móvil' },
    { name: 'Google Play Store', cat: 'Android' },
  ];

  return (
    <section className="bg-[#080F20] py-6 border-y border-white/[0.08] overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 mb-3 flex items-center justify-between">
        <span className="text-[11px] font-mono text-slate-400 uppercase tracking-widest flex items-center gap-2">
          <Shield className="w-3.5 h-3.5 text-blue-400" />
          {language === 'en' ? 'Connected Ecosystem & Regulatory Compliance' : 'Ecosistema Conectado & Cumplimiento Normativo'}
        </span>
        <span className="text-[11px] font-mono text-blue-400">USA (CA · NJ) &middot; Ecuador &middot; Global</span>
      </div>

      <div className="relative flex overflow-x-hidden">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-6 py-2">
          {integrations.concat(integrations).map((item, idx) => (
            <div
              key={idx}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-blue-500/30 text-slate-200 text-xs font-medium tracking-wide transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              <span>{item.name}</span>
              <span className="text-[10px] text-slate-500 uppercase font-mono px-1.5 py-0.5 rounded bg-white/[0.04]">
                {item.cat}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── STATS STRIP ───────────────────────────────────────── */
const StatsStrip = () => {
  const { language } = useLanguage();

  const stats = language === 'en' ? [
    { value: 10, suffix: '+', label: 'Years of Track Record', sub: 'Field-tested experience' },
    { value: 150, suffix: '+', label: 'Enterprise Clients', sub: 'In active production' },
    { value: 9, suffix: '', label: 'Proprietary Products', sub: 'Enterprise suite' },
    { value: 100000, suffix: '+', label: 'Fiscal Transactions', sub: 'Processed without failure' },
    { value: 99.9, suffix: '%', label: 'Cloud Uptime', sub: 'High availability SLA' },
    { value: 3, suffix: '', label: 'US Offices', sub: 'CA · NJ · Nationwide' },
  ] : [
    { value: 10, suffix: '+', label: 'Años de Trayectoria', sub: 'Experiencia real' },
    { value: 150, suffix: '+', label: 'Clientes y Empresas', sub: 'En producción' },
    { value: 9, suffix: '', label: 'Productos Propios', sub: 'Suite empresarial' },
    { value: 100000, suffix: '+', label: 'Transacciones Fiscales', sub: 'Procesadas sin fallos' },
    { value: 99.9, suffix: '%', label: 'Uptime Cloud', sub: 'Alta disponibilidad' },
    { value: 3, suffix: '', label: 'Sedes en EE.UU.', sub: 'CA · NJ · Todo el país' },
  ];

  return (
    <section className="bg-[#0A1124] py-14 border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="text-center p-3 sm:p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.12] transition-colors"
            >
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white font-mono tracking-tight tabular-nums">
                <Counter end={s.value} suffix={s.suffix} />
              </div>
              <div className="text-[10px] sm:text-xs font-semibold text-slate-300 mt-1.5 leading-tight">{s.label}</div>
              <div className="text-[10px] text-slate-500 mt-0.5 hidden sm:block">{s.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── SHOWCASE INTERACTIVO DE PRODUCTOS ─────────────────── */
interface ProductItem {
  id: ProjectId;
  name: string;
  tagline: { es: string; en: string };
  cat: 'sri' | 'escolar' | 'compliance' | 'erp' | 'seguros' | 'ecommerce' | 'contable';
  categoryLabel: { es: string; en: string };
  desc: { es: string; en: string };
  badge: string;
  color: string;
  screenshot?: string;
  features: { es: string[]; en: string[] };
  metrics: { label: { es: string; en: string }; value: string }[];
  url?: string;
}

const productSuite: ProductItem[] = [
  {
    id: 'facturon',
    name: 'FACTURÓN',
    tagline: {
      es: 'Facturación Electrónica SRI desde $2.99/mes sin comisión',
      en: 'SRI Electronic Invoicing from $2.99/mo with zero per-document fees',
    },
    cat: 'sri',
    categoryLabel: { es: 'Facturación SRI & Tributario', en: 'SRI Invoicing & Tax' },
    desc: {
      es: 'La plataforma oficial de facturación electrónica del Ecuador: emite los 6 comprobantes SRI (facturas, retenciones, notas de crédito/débito, liquidaciones y guías de remisión) autorizados en segundos. Firma XAdES-BES con archivo .p12, reintentos automáticos, ATS e IVA listos, portal de clientes, app móvil y API REST para conectar cualquier sistema.',
      en: 'Ecuador\'s premier electronic invoicing platform: emits all 6 SRI fiscal documents (invoices, withholdings, credit/debit notes, settlements, and consignment guides) authorized in seconds. XAdES-BES digital signature with .p12 certificate, automatic retries, ATS and VAT tax summaries, client portal, mobile app, and REST API.',
    },
    badge: '100% SRI · $2.99/mo',
    color: '#059669',
    features: {
      es: ['6 Comprobantes Oficiales SRI', 'Sin Comisión por Documento', 'Firma XAdES-BES con .p12', 'Generación de ATS e IVA', 'API REST con Llaves por Empresa', 'App Móvil Android & iOS'],
      en: ['6 Official SRI Documents', 'Zero Per-Document Commission', 'XAdES-BES Digital Signature', 'Automatic ATS & VAT Reports', 'REST API with Company Keys', 'Mobile App for Android & iOS'],
    },
    metrics: [
      { label: { es: 'Precio Inicial', en: 'Starting Price' }, value: '$2.99/m' },
      { label: { es: 'Tiempo Autorización', en: 'Auth Speed' }, value: '< 2 sec' },
      { label: { es: 'Comisión por Doc.', en: 'Document Fee' }, value: '$0.00' },
    ],
    url: 'https://facturon.ec/',
  },
  {
    id: 'education',
    name: 'AmePhia EDU',
    tagline: {
      es: 'Sistema Escolar MinEduc 2025 + LMS Nativo',
      en: 'MinEduc 2025 School Information System (SIS) + Native LMS',
    },
    cat: 'escolar',
    categoryLabel: { es: 'Sistemas Escolares & SIS', en: 'School SIS & Education' },
    desc: {
      es: 'Plataforma integral para colegios y escuelas de Ecuador. Cumple 100% la Tabla 9 MinEduc 2025, reglamento LOEI (refuerzo, supletorio, mejoramiento), conciliación bancaria con 7 bancos ecuatorianos, aula virtual LMS, portal de padres PWA y libretas con código QR de verificación pública.',
      en: 'Complete academic management system for schools in Ecuador. 100% compliant with MinEduc Table 9 (2025), LOEI regulations (remediation, improvement exams), automated reconciliation with 7 Ecuadorian banks, native LMS virtual classroom, PWA parent portal, and report cards with public QR verification.',
    },
    badge: 'MinEduc 2025 · SIS Oficial',
    color: '#3B82F6',
    features: {
      es: ['Tabla 9 MinEduc 2025', 'Conciliación Bancaria Automatizada', 'Aula Virtual LMS', 'Portal Padres PWA', 'Libreta Oficial con QR'],
      en: ['MinEduc Table 9 (2025)', 'Automated Bank Reconciliation', 'Native LMS Classroom', 'PWA Parent Portal', 'QR-Verified Report Cards'],
    },
    metrics: [
      { label: { es: 'Ahorro Administrativo', en: 'Admin Time Saved' }, value: '75%' },
      { label: { es: 'Tiempo Calificaciones', en: 'Grading Time' }, value: '-80%' },
      { label: { es: 'Cumplimiento LOEI', en: 'LOEI Compliance' }, value: '100%' },
    ],
  },
  {
    id: 'shielddata',
    name: 'SHIELDDATA',
    tagline: {
      es: 'Cumplimiento LOPDP Ecuador con Inteligencia Artificial',
      en: 'Ecuador LOPDP Data Protection Compliance with AI',
    },
    cat: 'compliance',
    categoryLabel: { es: 'Compliance & Ciberseguridad', en: 'Compliance & Cybersecurity' },
    desc: {
      es: 'Plataforma enterprise de cumplimiento de la Ley Orgánica de Protección de Datos Personales (LOPDP). RAT generado con IA, EIPD, portal de derechos ARCO, notificación de brechas a la SPDP en menos de 72 horas, modo inspección con expediente firmado PAdES-LTV y Document Intelligence.',
      en: 'Enterprise data compliance platform natively engineered for Ecuador\'s LOPDP data protection law. AI-generated RAT records, Data Protection Impact Assessment (EIPD), public ARCO rights portal, breach notification under 72h to SPDP, and inspection dossier with PAdES-LTV digital signature.',
    },
    badge: 'Superintendencia LOPDP',
    color: '#6366F1',
    screenshot: '/assets/screenshots/shielddata-dashboard.png',
    features: {
      es: ['RAT con Inteligencia Artificial', 'Firma Electrónica PAdES-LTV', 'Notificación Brechas <72h SPDP', 'Portal Derechos ARCO', 'ISO 27001 / NIST'],
      en: ['AI-Generated RAT Records', 'PAdES-LTV Electronic Signature', 'Breach Notice <72h to SPDP', 'Public ARCO Portal', 'ISO 27001 / NIST Cybersecurity'],
    },
    metrics: [
      { label: { es: 'Riesgo de Multas', en: 'Fine Risk' }, value: '0%' },
      { label: { es: 'Tiempo Generación RAT', en: 'RAT Gen Time' }, value: '10 min' },
      { label: { es: 'Expediente SPDP', en: 'Inspection Dossier' }, value: 'Instant' },
    ],
  },
  {
    id: 'gym',
    name: 'AMEPHIA GYM',
    tagline: {
      es: 'ERP Especializado para Gimnasios y Centros Fitness',
      en: 'Specialized ERP for Gyms and Fitness Centers',
    },
    cat: 'erp',
    categoryLabel: { es: 'ERP & Gestión Fitness', en: 'Fitness ERP & Operations' },
    desc: {
      es: 'Sistema líder de gestión para gimnasios en Ecuador: membresías con cobros recurrentes, facturación electrónica SRI automática, punto de venta (POS) para suplementos, control de torniquetes y biométricos, inventario Kardex y contabilidad NIIF integrada.',
      en: 'Leading gym management software in Ecuador: automated recurring memberships, native SRI electronic invoicing, counter POS for supplements and merchandise, turnstile/biometric access control, Kardex inventory, and integrated IFRS accounting.',
    },
    badge: 'ERP Fitness Completo',
    color: '#EA580C',
    screenshot: '/assets/screenshots/dashboard.png',
    features: {
      es: ['Facturación SRI Automática', 'Membresías y Cobros Recurrentes', 'POS Rápido de Mostrador', 'Control de Accesos Biométrico', 'Contabilidad NIIF'],
      en: ['Automated SRI Invoicing', 'Recurring Memberships', 'Fast Counter POS', 'Biometric Turnstile Control', 'IFRS Financial Reports'],
    },
    metrics: [
      { label: { es: 'Cobranza Efectiva', en: 'Collection Rate' }, value: '+35%' },
      { label: { es: 'Retención Miembros', en: 'User Rating' }, value: '4.9/5' },
      { label: { es: 'Multas SRI', en: 'Tax Penalties' }, value: 'Zero' },
    ],
  },
  {
    id: 'broker-seguro',
    name: 'BROKER SEGURO',
    tagline: {
      es: 'Plataforma SaaS para Corredores y Agencias de Seguros',
      en: 'SaaS Platform for Insurance Brokers and Agencies',
    },
    cat: 'seguros',
    categoryLabel: { es: 'Seguros & Pólizas', en: 'Insurance & Policies' },
    desc: {
      es: 'Control integral de cartera de clientes, pólizas, vencimientos, alertas automáticas de renovación (30, 15 y 5 días), siniestros en curso, liquidación de comisiones con aseguradoras y portal privado para que el asegurado descargue sus coberturas.',
      en: 'Comprehensive portfolio management for insurance brokers: policies, endorsements, automated renewal alerts (30, 15, and 5 days prior), claims tracking, insurer commission settlements, and private portal for insured clients.',
    },
    badge: 'SaaS Multi-tenant',
    color: '#0284C7',
    screenshot: '/assets/screenshots/broker/dashboard.png',
    features: {
      es: ['Control de Pólizas y Anexos', 'Alertas de Renovación Automáticas', 'Gestión de Siniestros', 'Comisiones por Aseguradora', 'Portal del Asegurado'],
      en: ['Policy & Endorsement Tracking', 'Automated Renewal Alerts', 'Claims Management', 'Insurer Commission Engine', 'Client Coverage Portal'],
    },
    metrics: [
      { label: { es: 'Renovaciones al Día', en: 'On-time Renewals' }, value: '98%' },
      { label: { es: 'Tiempo de Liquidación', en: 'Settlement Time' }, value: '-65%' },
      { label: { es: 'Control Cartera', en: 'Portfolio Control' }, value: '100%' },
    ],
  },
  {
    id: 'ecommerce',
    name: 'AMEPHIA STORE',
    tagline: {
      es: 'Plataforma E-commerce con Pasarelas Locales y Kardex',
      en: 'E-commerce Platform with Local Gateways and Kardex',
    },
    cat: 'ecommerce',
    categoryLabel: { es: 'E-commerce & Retail', en: 'E-commerce & Retail' },
    desc: {
      es: 'Tienda virtual con arquitectura SaaS multi-tenant: checkout seguro, integración directa con pasarelas ecuatorianas e internacionales (PayPhone, Kushki, Nuvei, Stripe), control de stock con Kardex WAC, facturación electrónica SRI y programa de lealtad.',
      en: 'Multi-tenant SaaS online store platform: frictionless checkout, direct integrations with local and global payment gateways (PayPhone, Kushki, Nuvei, Stripe), WAC Kardex inventory, SRI e-invoicing, and loyalty program.',
    },
    badge: 'Ventas 24/7',
    color: '#8B5CF6',
    screenshot: '/assets/screenshots/ecommerce/01-admin-dashboard.png',
    features: {
      es: ['Pasarelas de Pago Locales e Internacionales', 'Inventario Kardex con WAC', 'Facturación SRI Inmediata', 'Cupones y Descuentos', 'Checkout en 1 Paso'],
      en: ['Local & Global Payment Gateways', 'Kardex WAC Stock Control', 'Real-time SRI Invoicing', 'Coupons & Discounts', '1-Step Fast Checkout'],
    },
    metrics: [
      { label: { es: 'Conversión Checkout', en: 'Checkout Conversion' }, value: '+45%' },
      { label: { es: 'Disponibilidad Web', en: 'Store Uptime' }, value: '99.9%' },
      { label: { es: 'Integración SRI', en: 'SRI Integration' }, value: 'Real-time' },
    ],
    url: 'https://ameshop.ec/',
  },
  {
    id: 'contame',
    name: 'CONTAME',
    tagline: {
      es: 'Plataforma Contable en la Nube con NIIF y SRI',
      en: 'Cloud Accounting Platform with IFRS & SRI Compliance',
    },
    cat: 'contable',
    categoryLabel: { es: 'Contabilidad en la Nube', en: 'Cloud Accounting' },
    desc: {
      es: 'Software contable multi-empresa para PYMES y despachos contables: catálogo de cuentas bajo NIIF, generación de asientos automáticos por ventas y compras, nómina ecuatoriana con IESS, conciliación bancaria y estados financieros en un clic.',
      en: 'Multi-company accounting software for SMBs and accounting firms: IFRS chart of accounts, automated journal entries for sales/purchases, Ecuador payroll with IESS deductions, bank reconciliation, and one-click financial statements.',
    },
    badge: 'NIIF & SRI Ecuador',
    color: '#0D9488',
    features: {
      es: ['Plan de Cuentas NIIF', 'Asientos Contables Automáticos', 'Conciliación Bancaria', 'Nómina e IESS Ecuador', 'Reportes Financieros'],
      en: ['IFRS Chart of Accounts', 'Automated Journal Entries', 'Bank Reconciliation Engine', 'Ecuadorian Payroll & IESS', 'Real-time Balance Sheets'],
    },
    metrics: [
      { label: { es: 'Cierre de Mes', en: 'Month-End Close' }, value: '2 days' },
      { label: { es: 'Errores Contables', en: 'Accounting Errors' }, value: '-95%' },
      { label: { es: 'Multi-empresa', en: 'Multi-tenant RUCs' }, value: 'Unlimited' },
    ],
    url: 'https://contame.amephia.com/',
  },
];

const ProductsSection = ({ onOpenProject }: { onOpenProject: (id: ProjectId) => void }) => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<ProjectId>('facturon');
  const [filter, setFilter] = useState<'all' | 'sri' | 'escolar' | 'compliance' | 'erp' | 'seguros' | 'ecommerce' | 'contable'>('all');

  const selectedProduct = productSuite.find(p => p.id === activeTab) || productSuite[0];

  const filteredProducts = filter === 'all'
    ? productSuite
    : productSuite.filter(p => p.cat === filter);

  const filterOptions = language === 'en' ? [
    { id: 'all', label: 'All Products' },
    { id: 'sri', label: 'SRI Invoicing (Facturón)' },
    { id: 'escolar', label: 'School Systems (SIS)' },
    { id: 'compliance', label: 'LOPDP Compliance' },
    { id: 'erp', label: 'ERP & Fitness' },
    { id: 'seguros', label: 'Insurance & Policies' },
    { id: 'ecommerce', label: 'E-commerce' },
    { id: 'contable', label: 'Cloud Accounting' },
  ] : [
    { id: 'all', label: 'Todos los Productos' },
    { id: 'sri', label: 'Facturación SRI (Facturón)' },
    { id: 'escolar', label: 'Sistemas Escolares' },
    { id: 'compliance', label: 'Cumplimiento LOPDP' },
    { id: 'erp', label: 'ERP & Fitness' },
    { id: 'seguros', label: 'Seguros & Pólizas' },
    { id: 'ecommerce', label: 'E-commerce' },
    { id: 'contable', label: 'Contabilidad NIIF' },
  ];

  return (
    <section id="productos" className="py-28 bg-white border-t border-slate-200 relative overflow-hidden">
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-blue-50/60 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-[450px] h-[450px] bg-indigo-50/50 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <div>
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-50 border border-blue-200/80 rounded-full text-xs font-semibold text-blue-700 uppercase tracking-widest mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              {language === 'en' ? 'Proprietary Software Suite' : 'Suite de Software Especializado'}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-[1.1]">
              {language === 'en' ? (
                <>
                  Field-proven software operating{' '}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                    in real businesses
                  </span>
                </>
              ) : (
                <>
                  Software robusto que ya opera{' '}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                    en empresas reales
                  </span>
                </>
              )}
            </h2>
          </div>
          <p className="text-slate-600 max-w-md text-sm sm:text-base leading-relaxed">
            {language === 'en'
              ? 'We don\'t sell prototypes or empty promises. Every solution is refined over years of real-world use, fully compliant with regional and international standards.'
              : 'No vendemos maquetas ni promesas vacías. Cada producto ha sido afinado durante años con clientes reales, cumpliendo la normativa ecuatoriana e internacional.'}
          </p>
        </div>

        {/* Filtros */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {filterOptions.map(f => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id as typeof filter)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                filter === f.id
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                  : 'bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-200/80'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* SHOWCASE PRINCIPAL */}
        <div className="bg-slate-50 border border-slate-200/90 rounded-3xl p-6 md:p-8 mb-12 shadow-xl shadow-slate-200/60">
          <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-2 mb-8">
            {filteredProducts.map(p => (
              <button
                key={p.id}
                onClick={() => setActiveTab(p.id)}
                className={`p-3 rounded-2xl text-left transition-all border ${
                  activeTab === p.id
                    ? 'bg-white border-blue-500 shadow-md shadow-blue-500/10 ring-2 ring-blue-500/20'
                    : 'bg-white/70 border-slate-200/80 hover:bg-white hover:border-slate-300'
                }`}
              >
                <div className="w-6 h-1 rounded-full mb-2" style={{ backgroundColor: p.color }} />
                <div className="text-xs font-bold text-slate-900 truncate">{p.name}</div>
                <div className="text-[10px] text-slate-500 truncate mt-0.5">{p.badge}</div>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedProduct.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="grid lg:grid-cols-12 gap-8 items-center"
            >
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <span
                    className="inline-block px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider mb-3 border"
                    style={{
                      color: selectedProduct.color,
                      backgroundColor: `${selectedProduct.color}15`,
                      borderColor: `${selectedProduct.color}35`,
                    }}
                  >
                    {selectedProduct.categoryLabel[language]}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                    {selectedProduct.name}
                  </h3>
                  <p className="text-sm font-semibold text-blue-600 mt-1">
                    {selectedProduct.tagline[language]}
                  </p>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {selectedProduct.desc[language]}
                </p>

                <div className="space-y-2">
                  <span className="text-xs font-mono text-slate-500 uppercase tracking-wider font-semibold">
                    {language === 'en' ? 'Key Capabilities:' : 'Capacidades Destacadas:'}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.features[language].map(f => (
                      <span
                        key={f}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-700 shadow-xs"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                        {f}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-200">
                  {selectedProduct.metrics.map(m => (
                    <div key={m.label.es} className="p-3 rounded-xl bg-white border border-slate-200 shadow-xs text-center">
                      <div className="text-lg sm:text-xl font-bold text-slate-900 font-mono">{m.value}</div>
                      <div className="text-[10px] text-slate-500 leading-tight mt-0.5">{m.label[language]}</div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    onClick={() => selectedProduct.url ? window.open(selectedProduct.url, '_blank') : onOpenProject(selectedProduct.id)}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-semibold rounded-xl transition-all shadow-lg shadow-blue-500/20 hover:-translate-y-0.5"
                  >
                    <span>{language === 'en' ? 'Open Solution Platform' : 'Ver Detalles de la Solución'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => openWA(language, 'products', `Hello, I would like to schedule a private live demo of ${selectedProduct.name}.`)}
                    className="flex items-center gap-2 px-5 py-3 border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-800 text-xs font-medium rounded-xl transition-all shadow-xs"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{language === 'en' ? 'Request Private Demo' : 'Pedir Demo Privada'}</span>
                  </button>
                </div>
              </div>

              {/* Marco visual */}
              <div className="lg:col-span-7">
                <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-2xl shadow-slate-300/60">
                  <div className="px-4 py-3 bg-slate-100 border-b border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-600 px-2.5 sm:px-3 py-1 rounded-md bg-white border border-slate-200 shadow-xs max-w-[170px] sm:max-w-xs overflow-hidden">
                      <Lock className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                      <span className="truncate">{selectedProduct.url ? selectedProduct.url.replace(/^https?:\/\//, '').replace(/\/$/, '') : `${selectedProduct.id}.amephia.com`}</span>
                    </div>
                    <span className="hidden sm:inline-block text-[10px] font-mono text-blue-600 font-semibold bg-blue-50 px-2 py-0.5 rounded border border-blue-200 flex-shrink-0">
                      {language === 'en' ? 'PRODUCTION ACTIVE' : 'EN PRODUCCIÓN'}
                    </span>
                  </div>

                  <div className="p-3 sm:p-4 bg-slate-50 min-h-[300px] flex items-center justify-center">
                    {selectedProduct.screenshot ? (
                      <div className="relative group overflow-hidden rounded-xl border border-slate-200 w-full">
                        <img
                          src={selectedProduct.screenshot}
                          alt={selectedProduct.name}
                          className="w-full h-auto max-h-[400px] object-cover object-top group-hover:scale-[1.02] transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                          <span className="text-xs font-mono text-white bg-blue-600/90 px-3 py-1 rounded-md backdrop-blur-sm">
                            {language === 'en' ? 'Click to open the live platform' : 'Haga clic en el botón para abrir la plataforma en vivo'}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full space-y-3 p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
                        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                              <ShieldCheck className="w-4 h-4" />
                            </div>
                            <span className="text-sm font-semibold text-slate-900">{selectedProduct.name} — Control Dashboard</span>
                          </div>
                          <span className="text-xs font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                            {language === 'en' ? 'Synced (SOAP/REST)' : 'Sincronizado'}
                          </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                            <div className="text-[10px] text-slate-500">{language === 'en' ? 'Active Modules' : 'Módulos Activos'}</div>
                            <div className="text-lg font-bold text-slate-900 font-mono mt-1">12 / 12</div>
                          </div>
                          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                            <div className="text-[10px] text-slate-500">{language === 'en' ? 'Regulatory Audit' : 'Auditoría Regulatoria'}</div>
                            <div className="text-lg font-bold text-emerald-600 font-mono mt-1">100% OK</div>
                          </div>
                          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                            <div className="text-[10px] text-slate-500">{language === 'en' ? 'Server Latency' : 'Respuesta Servidor'}</div>
                            <div className="text-lg font-bold text-blue-600 font-mono mt-1">32 ms</div>
                          </div>
                        </div>
                        <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600 leading-relaxed">
                          ✓ {language === 'en' ? 'Schema validation and business rules executed in real-time with zero external delays.' : 'Validación de esquemas y reglas de negocio ejecutada en tiempo real sin dependencias externas.'}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Cuadrícula secundaria */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              id: 'facturon' as ProjectId,
              name: 'Facturón (SRI)',
              cat: language === 'en' ? 'Fiscal · From $2.99' : 'Fiscal · Desde $2.99',
              desc: language === 'en' ? 'Official e-invoicing platform in Ecuador. 6 SRI documents, ATS reports, mobile app and API.' : 'Plataforma oficial de facturación electrónica en Ecuador. 6 comprobantes SRI, ATS, app móvil y API REST.',
              color: '#059669',
              url: 'https://facturon.ec/',
            },
            {
              id: 'pos' as ProjectId,
              name: 'AmePhia POS',
              cat: language === 'en' ? 'Point of Sale' : 'Punto de Venta',
              desc: language === 'en' ? 'Fast counter cash register, returns, thermal printing, and instant SRI billing.' : 'Caja rápida, devoluciones, impresión de tickets térmicos y facturación instantánea.',
              color: '#D97706',
            },
            {
              id: 'migration' as ProjectId,
              name: 'Migralia SaaS',
              cat: language === 'en' ? 'Legal & Migration' : 'Legal & Migración',
              desc: language === 'en' ? 'Case management and immigration tracking with secure client portal and payments.' : 'Control de casos y trámites migratorios con portal del cliente y cobros.',
              color: '#8B5CF6',
            },
            {
              id: 'advisory' as ProjectId,
              name: 'Tech Advisory',
              cat: language === 'en' ? 'Consulting' : 'Consultoría',
              desc: language === 'en' ? 'Software architecture, security audits, product roadmaps, and CTO as a Service.' : 'Arquitectura de software, auditoría técnica, roadmap de producto y CTO as a Service.',
              color: '#DB2777',
            },
          ].map(m => (
            <div
              key={m.id}
              onClick={() => 'url' in m && m.url ? window.open(m.url, '_blank') : onOpenProject(m.id)}
              className="group p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-blue-400 hover:shadow-xl hover:shadow-slate-200/80 transition-all cursor-pointer hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 px-2 py-0.5 rounded bg-slate-100">
                    {m.cat}
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                </div>
                <h4 className="text-slate-900 font-bold text-base mb-1.5">{m.name}</h4>
                <p className="text-slate-600 text-xs leading-relaxed">{m.desc}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-medium text-blue-600 flex items-center gap-1">
                <span>{language === 'en' ? 'View module' : 'Ver módulo'}</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── DIAGNÓSTICO / COTIZADOR TECNOLÓGICO EXPRESS ─────────── */
const DiagnosticCalculator = () => {
  const { language } = useLanguage();
  const [projectType, setProjectType] = useState<'erp' | 'sri' | 'saas' | 'ecommerce' | 'mobile' | 'school'>('erp');
  const [stage, setStage] = useState<'idea' | 'legacy' | 'scale'>('legacy');
  const [urgency, setUrgency] = useState<'fast' | 'normal' | 'planned'>('fast');

  const configsES: Record<string, { arch: string; time: string; sla: string; plan: string }> = {
    erp: {
      arch: 'ERP Modular Cloud + Base PostgreSQL Multi-AZ + SRI Soap 1.2 nativo',
      time: '3 a 5 semanas',
      sla: '99.9% Uptime garantizado por contrato',
      plan: 'Implementación completa con migración de datos contables e inventario histórico.',
    },
    sri: {
      arch: 'Facturón API REST + Microservicio XAdES-BES X.509 + Cola con Reintentos',
      time: 'Inmediato con Facturón.ec (o 1 a 2 semanas a medida)',
      sla: 'Emisión autorizada en segundos, soporte para cierres contables',
      plan: 'Facturación electrónica lista para usar desde $2.99/mes o integración directa con tus sistemas vía API.',
    },
    saas: {
      arch: 'Arquitectura SaaS Multi-tenant con Row-Level Security + AWS Serverless',
      time: '4 a 6 semanas',
      sla: 'Arquitectura preparada para soportar +50k usuarios',
      plan: 'Onboarding automático de clientes, facturación recurrente y dashboards analíticos.',
    },
    ecommerce: {
      arch: 'E-commerce Headless con Kardex en tiempo real + Pasarelas de Pago Locales e Internacionales',
      time: '2 a 4 semanas',
      sla: 'Respuesta ante picos de tráfico (Black Friday / Cyber Days)',
      plan: 'Checkout seguro, inventario multialmacén y facturación electrónica SRI automática.',
    },
    mobile: {
      arch: 'App Híbrida de Alto Rendimiento (Flutter / React Native) para iOS y Android',
      time: '4 a 6 semanas',
      sla: 'Publicación garantizada en App Store y Google Play',
      plan: 'Diseño UX/UI premium, notificaciones push y sincronización offline.',
    },
    school: {
      arch: 'SIS AmePhia EDU MinEduc Tabla 9 + Conciliación Bancaria 7 bancos + PWA',
      time: '2 a 3 semanas',
      sla: 'Conformidad total LOEI y Ministerio de Educación 2025',
      plan: 'Carga de nómina estudiantil, configuración de materias y capacitación docente.',
    },
  };

  const configsEN: Record<string, { arch: string; time: string; sla: string; plan: string }> = {
    erp: {
      arch: 'Modular Cloud ERP + Multi-AZ PostgreSQL Database + Native SRI SOAP 1.2',
      time: '3 to 5 weeks',
      sla: '99.9% Uptime guaranteed by contract',
      plan: 'Complete turnkey rollout with historical ledger and inventory data migration.',
    },
    sri: {
      arch: 'Facturón REST API + XAdES-BES Microservice + Retry Queue Engine',
      time: 'Instant via Facturon.ec (or 1-2 weeks custom)',
      sla: 'Instant fiscal authorization with month-end closing support',
      plan: 'Production-ready e-invoicing from $2.99/mo or seamless API integration with your existing stack.',
    },
    saas: {
      arch: 'Multi-tenant SaaS Architecture with Row-Level Security + AWS Serverless',
      time: '4 to 6 weeks',
      sla: 'Built to scale effortlessly to 50k+ active users',
      plan: 'Automated client onboarding, subscription billing, and real-time executive dashboards.',
    },
    ecommerce: {
      arch: 'Headless E-commerce with Real-Time Kardex + Local & Global Payment Gateways',
      time: '2 to 4 weeks',
      sla: 'Auto-scaling for high traffic peaks (Black Friday / Cyber Days)',
      plan: 'High-converting checkout, multi-warehouse stock, and native SRI electronic invoicing.',
    },
    mobile: {
      arch: 'Cross-Platform Mobile App (Flutter / React Native) for iOS and Android',
      time: '4 to 6 weeks',
      sla: 'Guaranteed approval on App Store and Google Play',
      plan: 'Premium UX design, real-time push notifications, and offline data sync.',
    },
    school: {
      arch: 'AmePhia EDU SIS MinEduc Table 9 + Automated Bank Reconciliation + PWA',
      time: '2 to 3 weeks',
      sla: '100% compliant with Ecuador MinEduc 2025 regulations',
      plan: 'Student roster upload, grading scheme setup, and full teacher training.',
    },
  };

  const currentConfig = (language === 'en' ? configsEN : configsES)[projectType];

  const handleQuoteClick = () => {
    const summary = language === 'en'
      ? `Hello AmePhia, I completed the Technical Diagnostic on your website:
- Solution: ${projectType.toUpperCase()}
- Stage: ${stage === 'idea' ? 'New Initiative' : stage === 'legacy' ? 'Legacy Replacement' : 'Enterprise Scaling'}
- Timeline: ${urgency === 'fast' ? '< 30 days' : urgency === 'normal' ? '1 to 2 months' : 'Planned'}
- Suggested Stack: ${currentConfig.arch}
Can we schedule a call to review the formal quotation?`
      : `Hola AmePhia, completé el Diagnóstico Tecnológico en su web:
- Solución: ${projectType.toUpperCase()}
- Etapa: ${stage === 'idea' ? 'Nueva iniciativa' : stage === 'legacy' ? 'Reemplazar sistema antiguo' : 'Escalamiento empresarial'}
- Tiempo objetivo: ${urgency === 'fast' ? '< 30 días' : urgency === 'normal' ? '1 a 2 meses' : 'Planificado'}
- Arquitectura sugerida: ${currentConfig.arch}
¿Podemos coordinar una reunión para revisar la cotización detallada?`;

    openWA(language, 'diagnostic', summary);
  };

  return (
    <section id="cotizador" className="py-24 bg-slate-50 relative overflow-hidden border-t border-slate-200">
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-purple-50 border border-purple-200/80 rounded-full text-xs font-semibold text-purple-700 uppercase tracking-widest mb-4">
            <Cpu className="w-3.5 h-3.5" />
            {language === 'en' ? '15-Second Technical Diagnostic' : 'Diagnóstico Express en 15 Segundos'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-4">
            {language === 'en' ? 'Configure your solution and get an instant estimation' : 'Configura tu solución y obtén una estimación inmediata'}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            {language === 'en'
              ? 'Select your parameters and our engine will recommend the architecture and implementation roadmap for your business.'
              : 'Selecciona los parámetros de tu empresa y nuestro motor sugerirá la arquitectura y el cronograma de entrega ideal.'}
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <label className="block text-xs font-mono text-blue-600 font-semibold uppercase tracking-wider mb-3">
                {language === 'en' ? '1. What type of solution does your company need?' : '1. ¿Qué tipo de solución requiere tu empresa?'}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {[
                  { id: 'erp', label: language === 'en' ? 'Custom ERP' : 'ERP a Medida' },
                  { id: 'sri', label: 'Facturación SRI (Facturón)' },
                  { id: 'saas', label: language === 'en' ? 'SaaS Platform' : 'Plataforma SaaS' },
                  { id: 'ecommerce', label: language === 'en' ? 'Online Store' : 'Tienda Online' },
                  { id: 'mobile', label: 'App iOS / Android' },
                  { id: 'school', label: language === 'en' ? 'School SIS' : 'Sistema Escolar' },
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => setProjectType(opt.id as typeof projectType)}
                    className={`px-3 py-2.5 rounded-xl text-xs font-medium text-left transition-all border ${
                      projectType === opt.id
                        ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <label className="block text-xs font-mono text-purple-600 font-semibold uppercase tracking-wider mb-3">
                {language === 'en' ? '2. What stage is your project currently in?' : '2. ¿En qué estado se encuentra tu proyecto?'}
              </label>
              <div className="grid sm:grid-cols-3 gap-2.5">
                {[
                  {
                    id: 'idea',
                    label: language === 'en' ? 'New Initiative' : 'Nueva iniciativa',
                    sub: language === 'en' ? 'Start from scratch' : 'Partir desde cero',
                  },
                  {
                    id: 'legacy',
                    label: language === 'en' ? 'Replace Legacy' : 'Reemplazar sistema antiguo',
                    sub: language === 'en' ? 'Data migration & modernization' : 'Migrar datos y modernizar',
                  },
                  {
                    id: 'scale',
                    label: language === 'en' ? 'Enterprise Scaling' : 'Escalamiento empresarial',
                    sub: language === 'en' ? 'Architecture optimization' : 'Optimizar arquitectura actual',
                  },
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => setStage(opt.id as typeof stage)}
                    className={`p-3 rounded-xl text-left transition-all border ${
                      stage === opt.id
                        ? 'bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-500/20'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
                    }`}
                  >
                    <div className="text-xs font-bold">{opt.label}</div>
                    <div className={`text-[10px] mt-0.5 ${stage === opt.id ? 'text-purple-100' : 'text-slate-500'}`}>{opt.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <label className="block text-xs font-mono text-emerald-600 font-semibold uppercase tracking-wider mb-3">
                {language === 'en' ? '3. What is your target launch window?' : '3. ¿Cuál es tu ventana de tiempo de lanzamiento?'}
              </label>
              <div className="grid sm:grid-cols-3 gap-2.5">
                {[
                  { id: 'fast', label: language === 'en' ? 'Urgent (< 30 days)' : 'Urgente (< 30 días)' },
                  { id: 'normal', label: language === 'en' ? '1 to 2 months' : '1 a 2 meses' },
                  { id: 'planned', label: language === 'en' ? 'Planned Q3/Q4' : 'Planificación Q3/Q4' },
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => setUrgency(opt.id as typeof urgency)}
                    className={`px-3 py-2.5 rounded-xl text-xs font-medium text-center transition-all border ${
                      urgency === opt.id
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-500/20'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Tarjeta de Recomendación Dinámica */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl p-7 bg-gradient-to-b from-[#0F1D45] to-[#0A122A] border border-blue-500/30 shadow-2xl">
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
                <span className="text-xs font-mono text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  {language === 'en' ? 'Suggested AmePhia Architecture' : 'Arquitectura Sugerida por AmePhia'}
                </span>
                <span className="px-2 py-0.5 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono rounded">
                  {language === 'en' ? 'High Feasibility' : 'Viabilidad Alta'}
                </span>
              </div>

              <div className="py-5 space-y-4">
                <div>
                  <div className="text-xs text-slate-400 mb-1">
                    {language === 'en' ? 'Technology & Stack:' : 'Tecnología & Topología:'}
                  </div>
                  <div className="text-sm font-semibold text-white leading-snug">{currentConfig.arch}</div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <div className="text-[10px] text-slate-400">{language === 'en' ? 'Target Delivery' : 'Tiempo de Entrega'}</div>
                    <div className="text-base font-bold text-emerald-400 font-mono mt-0.5">{currentConfig.time}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <div className="text-[10px] text-slate-400">{language === 'en' ? 'Guaranteed SLA' : 'Garantía / SLA'}</div>
                    <div className="text-base font-bold text-blue-400 font-mono mt-0.5">99.9% Uptime</div>
                  </div>
                </div>

                <div>
                  <div className="text-xs text-slate-400 mb-1">{language === 'en' ? 'Recommended Scope:' : 'Alcance sugerido:'}</div>
                  <p className="text-xs text-slate-300 leading-relaxed">{currentConfig.plan}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-white/[0.08] space-y-3">
                <button
                  onClick={handleQuoteClick}
                  className="w-full flex items-center justify-center gap-2.5 px-6 py-3.5 bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] hover:from-[#2563EB] hover:to-[#7C3AED] text-white font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-xl shadow-blue-500/25 hover:-translate-y-0.5"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>{language === 'en' ? 'Get Formal Proposal via WhatsApp' : 'Obtener Cotización Formal por WhatsApp'}</span>
                </button>
                <p className="text-[11px] text-center text-slate-400">
                  {language === 'en' ? 'Initial technical assessment is 100% free with zero obligation.' : 'La evaluación técnica inicial es 100% gratuita y sin compromiso.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─── SERVICIOS — BENTO GRID CON HOVER GLOW ─────────────── */
const ServicesSection = () => {
  const { language } = useLanguage();

  const services = language === 'en' ? [
    { icon: <Code2 className="w-6 h-6" />, title: 'Web & Mobile App Development', desc: 'Responsive web applications and native/hybrid mobile apps (iOS and Android with Flutter and React Native). Engineered for high concurrency and buttery-smooth user experiences.', benefit: 'Production-ready in weeks, not quarters.', accent: '#3B82F6', roi: '+180% User retention' },
    { icon: <Sparkles className="w-6 h-6" />, title: 'Website Modernization & Organic SEO', desc: 'Revamping outdated websites into high-speed, modern platforms (Core Web Vitals < 1s). Engineered for conversion-rate optimization and organic Google ranking across US and domestic markets.', benefit: 'Turn visitors into clients with superior speed & SEO.', accent: '#8B5CF6', roi: '+320% Organic traffic' },
    { icon: <Star className="w-6 h-6" />, title: 'Google Business Review Funnel & Reputation Shield', desc: 'Automated post-purchase review requests via email and messaging with intelligent gating: 4-5 star reviews are routed to Google Business & Apple Maps, while ratings under 4 stars are captured privately for internal resolution.', benefit: 'Scale 5-star Google reviews while keeping negative feedback private.', accent: '#F59E0B', roi: '4.9★ Average rating' },
    { icon: <Layers className="w-6 h-6" />, title: 'Enterprise ERP Systems', desc: 'Tailored ERP systems to centralize purchasing, Kardex inventory, payroll, IFRS accounting, and real-time executive financial dashboards.', benefit: 'A single unified platform across your enterprise.', roi: '-60% Administrative time' },
    { icon: <ShoppingCart className="w-6 h-6" />, title: 'E-commerce & Payment Gateways', desc: 'High-conversion online stores with 1-step checkout, local and global payment gateways, and automated SRI billing.', benefit: 'Sell 24/7 with zero payment friction.', roi: '+40% Checkout conversion' },
    { icon: <FileText className="w-6 h-6" />, title: 'Native SRI Electronic Invoicing', desc: 'Fully automated tax document processing: invoices, withholdings, credit notes, and consignment guides. XAdES-BES digital signature and instant authorization.', benefit: 'Guaranteed fiscal compliance with zero manual errors.', roi: '100% Paperless workflow' },
    { icon: <Cloud className="w-6 h-6" />, title: 'AWS Cloud Infrastructure', desc: 'Enterprise cloud architecture on AWS: EC2, Aurora RDS, S3, CloudFront, and serverless pipelines designed for fault-tolerance and auto-scaling.', benefit: 'Enterprise-grade reliability at optimized cost.', roi: '99.9% Certified Uptime' },
    { icon: <Zap className="w-6 h-6" />, title: 'Workflow Automation & APIs', desc: 'We interconnect your systems with CRMs, ERPs, WhatsApp Business API, and automated webhooks to eradicate duplicate manual data entry.', benefit: 'Empower your team on strategy, not repetitive tasks.', roi: 'Zero manual data entry' },
    { icon: <Database className="w-6 h-6" />, title: 'Multi-tenant SaaS Platforms', desc: 'Architecting Software-as-a-Service products from scratch: tenant data isolation, automated onboarding, recurring billing, and analytics dashboards.', benefit: 'Launch your scalable SaaS regionally.', roi: 'Regional scalability' },
    { icon: <Settings className="w-6 h-6" />, title: 'Tech Advisory & CTO as a Service', desc: 'Executive guidance for founders and boards: code reviews, security audits, stack selection, and strategic roadmap planning to avoid technical debt.', benefit: 'Right engineering decisions from day one.', roi: 'Eliminates costly technical debt' },
  ] : [
    { icon: <Code2 className="w-6 h-6" />, title: 'Desarrollo Web & Apps Móviles', desc: 'Plataformas web reactivas y apps nativas/híbridas (iOS y Android con Flutter y React Native). Experiencias fluidas preparadas para miles de usuarios simultáneos.', benefit: 'En producción en semanas, no en meses.', accent: '#3B82F6', roi: '+180% Retención de usuarios' },
    { icon: <Sparkles className="w-6 h-6" />, title: 'Modernización Web & SEO Orgánico', desc: 'Rediseño integral de sitios web antiguos a plataformas de carga ultra rápida (Core Web Vitals < 1s). Arquitectura optimizada para conversión y posicionamiento orgánico en Google en EE.UU. y mercados locales.', benefit: 'Convierte visitas en clientes con velocidad y SEO.', accent: '#8B5CF6', roi: '+320% Tráfico orgánico' },
    { icon: <Star className="w-6 h-6" />, title: 'Gestión de Reseñas Google (Review Shield)', desc: 'Envío automatizado de invitaciones a clientes con filtro inteligente: calificaciones de 4 y 5 estrellas se publican en Google Business y Apple Maps; calificaciones menores a 4 estrellas se capturan de forma privada para atención interna.', benefit: 'Más reseñas de 5★ en Google blindando tu reputación pública.', accent: '#F59E0B', roi: '4.9★ Rating promedio' },
    { icon: <Layers className="w-6 h-6" />, title: 'ERPs & Sistemas de Gestión', desc: 'Sistemas a medida para controlar tu operación completa: compras, inventarios Kardex, nómina con IESS, contabilidad NIIF y reportes ejecutivos en tiempo real.', benefit: 'Un solo sistema unificado para toda la empresa.', roi: '-60% Tiempo administrativo' },
    { icon: <ShoppingCart className="w-6 h-6" />, title: 'E-commerce & Pasarelas de Pago', desc: 'Tiendas virtuales de alto rendimiento con checkout en 1 paso, pasarelas de pago locales e internacionales, integradas con facturación SRI.', benefit: 'Vende sin interrupciones 24/7 con cobros directos.', roi: '+40% Conversión de venta' },
    { icon: <FileText className="w-6 h-6" />, title: 'Facturación Electrónica SRI Nativa', desc: 'Emisión y recepción automatizada de comprobantes tributarios: facturas, retenciones, notas de crédito y guías. XML firmado y autorización instantánea.', benefit: 'Cumplimiento tributario garantizado sin multas.', roi: '100% Sin papeleo manual' },
    { icon: <Cloud className="w-6 h-6" />, title: 'Infraestructura Cloud & AWS', desc: 'Diseño y migración de infraestructuras en AWS: EC2, RDS Aurora, S3, CloudFront y arquitecturas serverless con alta tolerancia a fallos.', benefit: 'Infraestructura de empresa grande a costo optimizado.', roi: '99.9% Uptime certificado' },
    { icon: <Zap className="w-6 h-6" />, title: 'Automatizaciones & Conexión de APIs', desc: 'Conectamos tus sistemas con CRMs, software contable, WhatsApp Business API y webhooks. Eliminamos la doble digitación manual entre plataformas.', benefit: 'Menos errores humanos, más tiempo para vender.', roi: 'Cero digitación duplicada' },
    { icon: <Database className="w-6 h-6" />, title: 'Plataformas SaaS Multitenant', desc: 'Construcción de productos de software como servicio desde la arquitectura: aislamiento de datos por inquilino, facturación recurrente y roles avanzados.', benefit: 'Tu propio producto SaaS escalable a nivel regional.', roi: 'Escalabilidad regional' },
    { icon: <Settings className="w-6 h-6" />, title: 'Asesoría Tecnológica & CTO as a Service', desc: 'Acompañamiento a juntas directivas y fundadores: auditorías de código, selección de stack, seguridad de la información y roadmap de evolución.', benefit: 'Decisiones de ingeniería correctas desde el primer día.', roi: 'Reducción de costos de deuda técnica' },
  ];

  return (
    <section id="servicios" className="py-28 bg-white relative overflow-hidden border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <div>
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-50 border border-blue-200/80 rounded-full text-xs font-semibold text-blue-700 uppercase tracking-widest mb-4">
              <Cpu className="w-3.5 h-3.5" />
              {language === 'en' ? 'Engineering Capabilities' : 'Capacidades de Ingeniería'}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-[1.1]">
              {language === 'en' ? (
                <>
                  Services designed to{' '}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                    scale your business
                  </span>
                </>
              ) : (
                <>
                  Servicios diseñados para{' '}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                    escalar tu negocio
                  </span>
                </>
              )}
            </h2>
          </div>
          <p className="text-slate-600 max-w-md text-sm sm:text-base leading-relaxed">
            {language === 'en'
              ? 'We design custom digital solutions that solve complex operational bottlenecks with world-class engineering.'
              : 'Diseñamos soluciones personalizadas que resuelven los cuellos de botella operativos de tu empresa con ingeniería de primer nivel.'}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group relative p-7 rounded-2xl bg-white border border-slate-200/90 hover:border-blue-400 hover:shadow-xl hover:shadow-slate-200/80 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
            >
              <div>
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110"
                  style={{ backgroundColor: `${s.accent}15`, color: s.accent }}
                >
                  {s.icon}
                </div>
                <h3 className="text-slate-900 font-bold text-base mb-2.5 leading-snug">{s.title}</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">{s.desc}</p>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-2">
                <div className="text-xs font-medium text-emerald-600 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{s.benefit}</span>
                </div>
                <div className="text-[11px] font-mono text-slate-500">
                  {language === 'en' ? 'Impact: ' : 'Impacto: '}
                  <span className="text-slate-800 font-semibold">{s.roi}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={() => openWA(language, 'services')}
            className="inline-flex items-center gap-2.5 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-sm rounded-xl transition-all shadow-xl shadow-blue-500/20 hover:-translate-y-0.5"
          >
            <span>{language === 'en' ? 'Inquire About Custom Engineering' : 'Consultar por un desarrollo a medida'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

/* ─── TECH STACK & CLOUD ECOSYSTEM ──────────────────────── */
const techStack = [
  { name: 'React', color: '#61DAFB', cat: 'Frontend' },
  { name: 'Next.js', color: '#E2E8F0', cat: 'Frontend' },
  { name: 'TypeScript', color: '#3178C6', cat: 'Language' },
  { name: 'Node.js', color: '#8CC84B', cat: 'Backend' },
  { name: 'NestJS', color: '#E0234E', cat: 'Backend' },
  { name: 'Python & FastAPI', color: '#10B981', cat: 'Backend' },
  { name: 'Flutter (iOS & Android)', color: '#02569B', cat: 'Mobile' },
  { name: 'PostgreSQL Enterprise', color: '#336791', cat: 'Database' },
  { name: 'Redis Caching', color: '#DC382D', cat: 'Cache' },
  { name: 'AWS Cloud (EC2/RDS/S3)', color: '#F97316', cat: 'Cloud' },
  { name: 'Docker & Kubernetes', color: '#2496ED', cat: 'DevOps' },
  { name: 'SRI WebServices (SOAP)', color: '#22C55E', cat: 'Tax/SRI' },
  { name: 'Stripe & PayPhone', color: '#635BFF', cat: 'Payments' },
  { name: 'Tailwind CSS', color: '#38BDF8', cat: 'Styles' },
  { name: 'OpenAI / Claude / Gemini', color: '#A78BFA', cat: 'AI' },
];

const TechSection = () => {
  const { language } = useLanguage();

  const pillars = language === 'en' ? [
    { title: 'Security by Design', desc: 'Encryption in transit & at rest (KMS / SSL TLS 1.3), Row-Level Security, and automated encrypted backups.', icon: <Lock className="w-5 h-5 text-blue-400" /> },
    { title: '99.9% High Availability', desc: 'Multi-AZ redundant AWS infrastructure to guarantee your core business never faces unexpected downtime.', icon: <Server className="w-5 h-5 text-emerald-400" /> },
    { title: 'Native SRI Connectivity', desc: 'Direct socket communication with SRI web services with zero per-document middleman costs.', icon: <FileText className="w-5 h-5 text-purple-400" /> },
    { title: 'Clean, Scalable Code', desc: 'Strict Clean Architecture and comprehensive technical documentation to protect your long-term asset.', icon: <Code2 className="w-5 h-5 text-amber-400" /> },
  ] : [
    { title: 'Seguridad por Diseño', desc: 'Encriptación en reposo y tránsito (KMS / SSL TLS 1.3), Row-Level Security y backups automáticos.', icon: <Lock className="w-5 h-5 text-blue-400" /> },
    { title: 'Alta Disponibilidad 99.9%', desc: 'Infraestructura redundante multi-zona en AWS para asegurar que tu negocio nunca se detenga.', icon: <Server className="w-5 h-5 text-emerald-400" /> },
    { title: 'Conectividad Nativa SRI', desc: 'Comunicación directa con los servidores del SRI sin pagar comisiones por cada comprobante emitido.', icon: <FileText className="w-5 h-5 text-purple-400" /> },
    { title: 'Código Limpio & Escalable', desc: 'Clean Architecture y documentación técnica exhaustiva para que tu sistema perdure por años.', icon: <Code2 className="w-5 h-5 text-amber-400" /> },
  ];

  return (
    <section id="tecnologia" className="py-24 bg-slate-50 relative overflow-hidden border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-50 border border-blue-200/80 rounded-full text-xs font-semibold text-blue-700 uppercase tracking-widest mb-4">
            <Layers className="w-3.5 h-3.5" />
            {language === 'en' ? 'Enterprise Technology Stack' : 'Stack Tecnológico de Nivel Corporativo'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-4">
            {language === 'en' ? 'Comprehensive mastery of the cloud and data ecosystem' : 'Dominio integral del ecosistema cloud y de datos'}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            {language === 'en'
              ? 'We don\'t experiment with fragile stacks. We architect with the battle-tested technologies that ensure stability, speed, and long-term security.'
              : 'No improvisamos con tecnologías efímeras. Diseñamos con el stack que garantiza estabilidad, escalabilidad y seguridad a largo plazo.'}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {techStack.map((t) => (
            <div
              key={t.name}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 hover:border-slate-300 transition-all hover:shadow-sm text-xs font-medium text-slate-800"
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: t.color }} />
              <span>{t.name}</span>
              <span className="text-[10px] text-slate-500 font-mono ml-1">{t.cat}</span>
            </div>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {pillars.map((col) => (
            <div key={col.title} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <div className="mb-3">{col.icon}</div>
              <div className="text-sm font-bold text-slate-900 mb-1">{col.title}</div>
              <p className="text-xs text-slate-600 leading-relaxed">{col.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── ABOUT — AUTORIDAD Y SERIEDAD ──────────────────────── */
const AboutSection = () => {
  const { language } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const reasons = language === 'en' ? [
    {
      title: 'Proven Track Record in the US, Ecuador & Internationally',
      desc: 'Over a decade designing and scaling cloud systems that process millions in transactions for clients in the United States, Latin America, and globally.',
      icon: <Award className="w-5 h-5 text-blue-400" />,
    },
    {
      title: 'US Corporate Contracting & Nearshore Delivery',
      desc: 'Seamless US legal frameworks (W-8/W-9 compliance, ACH/Wire settlements), 100% time-zone overlap with Pacific and Eastern business hours, and fluent bilingual communication.',
      icon: <Globe className="w-5 h-5 text-indigo-400" />,
    },
    {
      title: '100% Client-Owned Code (Zero Vendor Lock-in)',
      desc: 'Upon handover, full source code, intellectual property, and cloud credentials belong entirely to your company. No hidden recurring per-user royalties.',
      icon: <Shield className="w-5 h-5 text-emerald-400" />,
    },
    {
      title: 'Direct Communication with Senior Engineers',
      desc: 'You communicate directly with the software architects designing your systems. No salespeople overpromising or distorting your technical requirements.',
      icon: <Users className="w-5 h-5 text-purple-400" />,
    },
    {
      title: 'Post-Launch SLA Guarantee & Ongoing Support',
      desc: 'We don\'t disappear upon delivery. Every release is backed by a formal warranty, 24/7 proactive cloud monitoring, and structured maintenance roadmaps.',
      icon: <Clock className="w-5 h-5 text-amber-400" />,
    },
    {
      title: 'Trustworthy Partner with Conscious & Fair Pricing',
      desc: 'We pride ourselves on doing exceptional work with clean code and reliable deliveries. We charge fair, conscious rates aligned to actual project scope with zero hidden costs or inflated markups.',
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
    },
  ] : [
    {
      title: 'Trayectoria Comprobada en EE.UU., Ecuador y la Región',
      desc: 'Más de una década diseñando y escalando sistemas que procesan millones de dólares en transacciones para empresas en Estados Unidos, Latinoamérica y a nivel internacional.',
      icon: <Award className="w-5 h-5 text-blue-400" />,
    },
    {
      title: 'Contratación Directa en EE.UU. & Modelo Nearshore',
      desc: 'Contratos comerciales bajo legislación estadounidense (cumplimiento fiscal W-8/W-9, transferencias ACH/Wire), coincidencia horaria completa con la Costa Este y Oeste, y equipo bilingüe.',
      icon: <Globe className="w-5 h-5 text-indigo-400" />,
    },
    {
      title: 'Código 100% de tu propiedad (Sin ataduras)',
      desc: 'Al finalizar el proyecto, el código fuente, la propiedad intelectual y la infraestructura cloud son íntegramente tuyos. Sin licencias abusivas ni dependencias cautivas.',
      icon: <Shield className="w-5 h-5 text-emerald-400" />,
    },
    {
      title: 'Comunicación directa con Ingenieros Senior',
      desc: 'Hablas con las personas que diseñan y programan tu sistema. Sin comerciales que prometan lo imposible ni intermediarios que distorsionen tus requerimientos.',
      icon: <Users className="w-5 h-5 text-purple-400" />,
    },
    {
      title: 'Garantía y Acompañamiento Post-Lanzamiento',
      desc: 'No desaparecemos al entregar. Respaldamos cada despliegue con garantía técnica, monitoreo proactivo 24/7 y planes de evolución continua.',
      icon: <Clock className="w-5 h-5 text-amber-400" />,
    },
    {
      title: 'Empresa Confiable con Tarifas Conscientes y Buen Trabajo',
      desc: 'Hacemos un buen trabajo garantizado, con código limpio y entregas a tiempo. Cobramos tarifas justas y conscientes, ajustadas al alcance real sin sobrecostos artificiales ni sorpresas.',
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-600" />,
    },
  ];

  return (
    <section id="nosotros" className="py-28 bg-white relative overflow-hidden border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-50 border border-blue-200/80 rounded-full text-xs font-semibold text-blue-700 uppercase tracking-widest mb-6">
              <Users className="w-3.5 h-3.5" />
              {language === 'en' ? 'Our Company' : 'Nuestra Empresa'}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-[1.1] mb-6">
              {language === 'en' ? (
                <>
                  The engineering partner trusted by{' '}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                    enterprise leaders
                  </span>
                </>
              ) : (
                <>
                  El socio tecnológico en el que confían los{' '}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                    líderes empresariales
                  </span>
                </>
              )}
            </h2>
            <p className="text-slate-700 text-base leading-relaxed mb-6">
              {language === 'en'
                ? 'AmePhia operates with an international footprint: corporate offices in California and Newark, New Jersey (USA) with presence across multiple US states, and specialized engineering operations in Ecuador. With a proven track record delivering software projects for US companies in California, New Jersey, and nationwide, our multi-state structure delivers Silicon Valley engineering standards, 100% time-zone overlap (PST/EST/CST), fluent English/Spanish communication, and flexible US corporate contracting (W-8/W-9, ACH/Wire).'
                : 'AmePhia opera con presencia internacional: oficinas corporativas en California y Newark, New Jersey (Estados Unidos) con presencia en múltiples estados, y centro de ingeniería especializada en Ecuador. Con una sólida trayectoria desarrollando proyectos de software para empresas en California, New Jersey y todo Estados Unidos, nuestra estructura multi-estado brinda estándares de Silicon Valley, coincidencia horaria completa (PST/EST/CST), comunicación bilingüe fluida y contratación formal bajo legislación estadounidense (W-8/W-9, ACH/Wire).'}
            </p>
            <p className="text-slate-600 text-sm leading-relaxed mb-8">
              {language === 'en'
                ? 'Whether your company is a US business looking for elite nearshore software engineering, or an established enterprise in Latin America modernizing critical operations, we provide the architectural precision, legal certainty, and senior talent to build and scale without friction.'
                : 'Ya sea que tu empresa se encuentre en Estados Unidos buscando ingeniería nearshore de primer nivel, o en Latinoamérica modernizando procesos críticos y plataformas en la nube, tenemos la solvencia técnica, la infraestructura y el compromiso para entregar con éxito.'}
            </p>
            <button
              onClick={() => openWA(language, 'cta')}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-xl shadow-blue-500/20 hover:-translate-y-0.5"
            >
              <span>{language === 'en' ? 'Speak with our Engineering Team' : 'Conversar con el equipo de ingeniería'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div ref={ref} className="lg:col-span-6 space-y-4">
            {reasons.map((r, i) => (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.1 }}
                className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md hover:border-slate-300 transition-all flex gap-4"
              >
                <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-100 h-fit flex-shrink-0">
                  {r.icon}
                </div>
                <div>
                  <h3 className="text-slate-900 font-bold text-sm sm:text-base mb-1">{r.title}</h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{r.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─── PROCESO EN 5 PASOS ────────────────────────────────── */
const ProcessSection = () => {
  const { language } = useLanguage();

  const steps = language === 'en' ? [
    { num: '01', title: 'Discovery & Scope', desc: 'We examine your business workflows in-depth and define clear functional requirements without confusing buzzwords.', grad: 'from-[#3B82F6] to-[#6366F1]' },
    { num: '02', title: '48h Architecture Proposal', desc: 'We deliver a comprehensive roadmap: server topology, milestone schedules, and transparent fixed pricing.', grad: 'from-[#6366F1] to-[#7C3AED]' },
    { num: '03', title: 'Weekly Agile Demos', desc: 'We work in rapid sprints. Every week you test tangible progress in a secure private staging environment.', grad: 'from-[#7C3AED] to-[#8B5CF6]' },
    { num: '04', title: 'QA, Data Migration & Deploy', desc: 'We migrate your legacy databases, perform rigorous load testing, and release to production seamlessly.', grad: 'from-[#8B5CF6] to-[#A855F7]' },
    { num: '05', title: '24/7 SLA & Ongoing Support', desc: 'Continuous performance monitoring, daily cloud snapshots, and direct engineer support whenever needed.', grad: 'from-[#A855F7] to-[#EC4899]' },
  ] : [
    { num: '01', title: 'Descubrimiento & Alcance', desc: 'Analizamos a fondo tu modelo de negocio y definimos los requerimientos exactos sin tecnicismos confusos.', grad: 'from-[#3B82F6] to-[#6366F1]' },
    { num: '02', title: 'Arquitectura & Propuesta en 48h', desc: 'Te entregamos una propuesta detallada: topología de servidores, cronograma hito por hito y precio cerrado.', grad: 'from-[#6366F1] to-[#7C3AED]' },
    { num: '03', title: 'Desarrollo con Demos Semanales', desc: 'Trabajamos en sprints ágiles. Cada semana ves avances tangibles en un entorno de pruebas privado.', grad: 'from-[#7C3AED] to-[#8B5CF6]' },
    { num: '04', title: 'QA, Migración & Despliegue', desc: 'Migramos tus datos históricos, realizamos pruebas de carga y ponemos el sistema en producción sin interrupciones.', grad: 'from-[#8B5CF6] to-[#A855F7]' },
    { num: '05', title: 'Garantía & Soporte Continuo', desc: 'Monitoreo de rendimiento 24/7, respaldo diario de datos y soporte técnico prioritario ante cualquier consulta.', grad: 'from-[#A855F7] to-[#EC4899]' },
  ];

  return (
    <section className="py-28 bg-slate-50 border-t border-slate-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-50 border border-blue-200/80 rounded-full text-xs font-semibold text-blue-700 uppercase tracking-widest mb-4">
            <Clock className="w-3.5 h-3.5" />
            {language === 'en' ? 'Transparent Methodology' : 'Metodología Transparente'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-4">
            {language === 'en' ? 'From discovery to production without surprises' : 'Cómo llevamos tu idea a producción sin sorpresas'}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            {language === 'en'
              ? 'A structured engineering process providing full visibility at all times, with zero hidden fees or delays.'
              : 'Un proceso estructurado donde siempre tienes visibilidad completa del avance, sin retrasos inesperados ni costos ocultos.'}
          </p>
        </div>

        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-5">
          {steps.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between hover:-translate-y-1"
            >
              <div>
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.grad} flex items-center justify-center text-white font-mono font-bold text-sm mb-4 shadow-md`}>
                  {s.num}
                </div>
                <h3 className="text-slate-900 font-bold text-base mb-2 leading-snug">{s.title}</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── PREGUNTAS FRECUENTES (FAQ ACCORDION) ───────────────── */
const FAQSection = () => {
  const { language } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqsES = [
    {
      q: '¿El código fuente y la propiedad intelectual le pertenecen a mi empresa?',
      a: 'Sí, absolutamente. Todo el software desarrollado a medida para tu empresa se entrega con código fuente completo, documentación técnica y transferencia de derechos al 100%. No cobramos licencias ocultas por usuario ni cobros cautivos.',
    },
    {
      q: '¿Cómo funciona la integración con la facturación electrónica del SRI?',
      a: 'Nos conectamos directamente con los web services oficiales del SRI (SOAP 1.2) utilizando tu firma electrónica de archivo (.p12). El sistema firma los comprobantes XML en milisegundos, los envía al SRI, obtiene la autorización y los envía automáticamente al cliente por correo y WhatsApp, sin pasar por intermediarios de cobro abusivos.',
    },
    {
      q: '¿Qué tipo de garantía y soporte técnico ofrecen tras el lanzamiento?',
      a: 'Todos nuestros proyectos incluyen un período de garantía formal por contrato para corrección de cualquier anomalía sin costo adicional. Además, disponemos de acuerdos de nivel de servicio (SLA) para soporte técnico prioritario, monitoreo en AWS y mantenimiento continuo.',
    },
    {
      q: '¿Pueden migrar la información de nuestros sistemas antiguos o Excel?',
      a: 'Sí. Contamos con procesos rigurosos de ETL (Extracción, Transformación y Carga) para limpiar, formatear y migrar de manera segura bases de datos legadas, hojas de cálculo de Excel e historiales contables hacia la nueva plataforma sin interrumpir la operación de tu negocio.',
    },
    {
      q: '¿Cuánto tiempo toma desarrollar e implementar un sistema?',
      a: 'Dependiendo de la complejidad: módulos de facturación SRI o tiendas virtuales pueden estar listas en 2 a 3 semanas. ERPs completos o plataformas SaaS robustas suelen requerir entre 4 y 8 semanas. En nuestra propuesta inicial de 48 horas entregamos un cronograma con hitos semanales exactos.',
    },
    {
      q: '¿Qué facilidades de pago ofrecen para empresas en Ecuador?',
      a: 'Trabajamos con pagos por hitos de entrega verificables (anticipo inicial, entregables intermedios demostrables en servidor de pruebas y liquidación contra puesta en producción). Aceptamos transferencias bancarias locales en Ecuador a través de las principales entidades financieras y pagos con tarjeta corporativa.',
    },
    {
      q: '¿Pueden desarrollar proyectos para empresas en Estados Unidos y tienen experiencia previa allá?',
      a: 'Sí, absolutamente. Contamos con un sólido historial ejecutando proyectos de software y plataformas en la nube para empresas en Estados Unidos. Gracias a nuestra presencia en California, Newark (New Jersey) y múltiples estados, y a nuestro equipo de ingenieros senior, operamos bajo modalidad nearshore con total coincidencia de zona horaria (PST, EST y CST), contratos comerciales bajo legislación estadounidense (cumplimiento fiscal W-8/W-9, transferencias ACH y Wire) y estándares de arquitectura de Silicon Valley.',
    },
    {
      q: '¿En qué consiste el servicio de Modernización Web y el Sistema de Reseñas de Google Business?',
      a: 'Ofrecemos dos soluciones de alto impacto comercial: 1) Modernización de sitios web antiguos con tecnologías ultrarrápidas, diseño de conversión y arquitectura de SEO orgánico para posicionar en los primeros puestos de Google (con amplia demanda en empresas de EE.UU. como en California, y en la región). 2) Sistema inteligente de gestión de reseñas (Review Shield): enviamos un correo o mensaje automatizado a tus clientes solicitando su opinión; si la calificación es positiva (4 o 5 estrellas), el sistema los lleva directamente a publicar su reseña pública en tu perfil de Google Business o Apple Maps; si la calificación es menor a 4 estrellas (1, 2 o 3 estrellas), el comentario se captura internamente y no se publica, permitiéndote resolver el reclamo en privado sin afectar la reputación pública ni el puntaje de tu empresa.',
    },
  ];

  const faqsEN = [
    {
      q: 'Does my company own 100% of the source code and intellectual property?',
      a: 'Yes, absolutely. All custom software developed for your business is delivered with complete source code, architectural documentation, and full transfer of rights. We do not enforce recurring per-seat licensing fees or proprietary lock-ins.',
    },
    {
      q: 'How does the native SRI electronic invoicing integration work?',
      a: 'We connect directly to Ecuador\'s official SRI web services (SOAP 1.2) utilizing your digital signature certificate (.p12 file). The engine signs the XML in milliseconds, delivers it to the SRI, retrieves fiscal authorization, and automatically dispatches the PDF (RIDE) and XML to the client via email and WhatsApp.',
    },
    {
      q: 'What warranty and technical support do you provide post-launch?',
      a: 'All custom builds include a formal contractual warranty covering any bugs or anomalies at no extra cost. We also provide Service Level Agreements (SLAs) for 24/7 cloud monitoring on AWS, continuous maintenance, and priority engineer response.',
    },
    {
      q: 'Can you migrate data from our legacy systems or spreadsheets?',
      a: 'Yes. We implement robust ETL (Extract, Transform, Load) pipelines to sanitize, restructure, and securely migrate legacy relational databases, spreadsheets, and historical customer ledgers into the new cloud platform without business interruption.',
    },
    {
      q: 'What is the typical development timeline?',
      a: 'Depending on scope: Facturación SRI modules or e-commerce stores typically launch in 2 to 4 weeks. Full enterprise ERPs or complex SaaS platforms take 4 to 8 weeks. Our initial 48-hour proposal outlines precise weekly milestones.',
    },
    {
      q: 'What payment terms are available for domestic and international clients?',
      a: 'We operate on verifiable milestone-based payments (initial deposit, staged milestone demos on private staging servers, and final settlement upon production deployment). We accept domestic bank transfers across all major national financial institutions as well as corporate card payments.',
    },
    {
      q: 'Can you deliver software projects for US companies and do you have experience in the US?',
      a: 'Yes, absolutely. We have a proven track record developing mission-critical software systems and cloud platforms for companies across the United States. Through our California and Newark, New Jersey corporate presence — plus activity across multiple US states — and our senior engineering team, we provide seamless nearshore execution with 100% time zone alignment (PST, EST & CST), US legal agreements (W-8/W-9 compliance, ACH and Wire settlements), and Silicon Valley architectural standards.',
    },
    {
      q: 'How does your Website Modernization & Google Business Review Shield work?',
      a: 'We offer two high-impact digital growth solutions: 1) Website Modernization & Organic SEO: we completely revamp legacy websites with sub-second loading speeds, conversion-optimized design, and organic SEO to rank on Google in competitive markets (such as California/US and Latin America). 2) Google Business Review Funnel (Review Shield): we automate post-service feedback requests via email/messaging; if the client rates 4 or 5 stars, they are automatically directed to leave a public review on Google Business or Apple Maps; if they rate under 4 stars (1 to 3 stars), the feedback is captured privately and routed directly to management to resolve the issue without publishing a negative rating on your public profile.',
    },
  ];

  const faqs = language === 'en' ? faqsEN : faqsES;

  return (
    <section className="py-24 bg-white border-t border-slate-200 relative text-slate-900">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-50 border border-blue-200/80 rounded-full text-xs font-semibold text-blue-700 uppercase tracking-widest mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            {language === 'en' ? 'Frequently Asked Questions' : 'Preguntas Frecuentes de Clientes'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-3">
            {language === 'en' ? 'Everything you need to know before starting' : 'Todo lo que necesitas saber antes de empezar'}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            {language === 'en' ? 'Absolute transparency in legal, technical, and operational terms.' : 'Claridad absoluta en términos legales, técnicos y operativos.'}
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 text-slate-900 font-semibold text-sm sm:text-base hover:text-blue-600 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-blue-600' : ''}`} />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-6 sm:px-6 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100 pt-4">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* ─── BANNER CTA EJECUTIVO ───────────────────────────────── */
const CTABanner = () => {
  const { language } = useLanguage();

  return (
    <section className="py-16 px-6 md:px-12 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl p-10 md:p-16 text-center bg-gradient-to-r from-[#0C1A3E] via-[#1A184D] to-[#0A1838] border border-blue-500/30 shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 border border-white/20 rounded-full text-xs font-semibold text-blue-300 uppercase tracking-widest mb-6">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              {language === 'en' ? 'Start Today with the Right Foundation' : 'Empieza hoy con las bases correctas'}
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-[1.1] mb-5">
              {language === 'en'
                ? 'Ready to build the software your company deserves?'
                : '¿Listo para construir el software que tu empresa merece?'}
            </h2>

            <p className="text-slate-300 text-sm sm:text-base mb-8 max-w-xl mx-auto leading-relaxed">
              {language === 'en'
                ? 'Schedule a 20-minute technical consultation. We will share honest architectural recommendations, technology stacks, and realistic delivery timelines.'
                : 'Coordinemos una llamada técnica de 20 minutos. Te decimos con total honestidad cómo resolver tu problema, qué tecnologías usar y cuánto tiempo tomará.'}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => openWA(language, 'cta')}
                className="group flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-[#3B82F6] via-[#6366F1] to-[#8B5CF6] hover:from-[#2563EB] hover:to-[#7C3AED] text-white font-semibold text-sm rounded-xl transition-all shadow-xl shadow-blue-500/30 hover:-translate-y-0.5"
              >
                <span>{language === 'en' ? 'Talk to Engineering on WhatsApp' : 'Hablar con el equipo por WhatsApp'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center justify-center gap-2 px-8 py-4 border border-white/20 hover:border-white/40 bg-white/[0.04] text-white text-sm font-medium rounded-xl hover:bg-white/[0.08] transition-all"
              >
                <Mail className="w-4 h-4" />
                <span>{language === 'en' ? 'Send Written Inquiry' : 'Enviar formulario por correo'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─── CONTACTO DIRECTO ──────────────────────────────────── */
const FORM_ENDPOINT = `https://formsubmit.co/ajax/${getContactEmail()}`;

const ContactSection = () => {
  const { language } = useLanguage();
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: 'erp', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
      setTimeout(() => setSuccess(false), 5000);
    } catch {
      setError(
        language === 'en'
          ? 'There was an issue sending the form. You can reach out directly via WhatsApp for an immediate response.'
          : 'Hubo un inconveniente al enviar el formulario. Puedes escribirnos directamente por WhatsApp y te atendemos al instante.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const inputCls = 'w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors text-sm';
  const labelCls = 'block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider font-mono';

  return (
    <section id="contacto" className="py-28 bg-slate-50 relative overflow-hidden border-t border-slate-200 text-slate-900">
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-50 border border-blue-200/80 rounded-full text-xs font-semibold text-blue-700 uppercase tracking-widest mb-4">
            <Mail className="w-3.5 h-3.5" />
            {language === 'en' ? 'Direct Contact' : 'Contacto Directo'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-3">
            {language === 'en' ? 'Let\'s start a productive conversation' : 'Iniciemos una conversación productiva'}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            {language === 'en'
              ? 'We respond within 24 hours with a concrete, viable technical proposal for your business.'
              : 'Respondemos en menos de 24 horas con una propuesta concreta y viable para tu negocio.'}
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-2xl bg-white border border-emerald-200 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 flex-shrink-0">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-slate-900 font-bold text-base mb-1">
                    {language === 'en' ? 'Direct Engineering WhatsApp' : 'WhatsApp de Ingeniería'}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {language === 'en'
                      ? 'The fastest way to coordinate a technical video call or resolve functional questions.'
                      : 'La vía más rápida para coordinar una videollamada técnica o resolver dudas comerciales.'}
                  </p>
                  <button
                    onClick={() => openWA(language, 'contact')}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl transition-all shadow-md shadow-emerald-600/20"
                  >
                    <span>+1 (334) 732-4056</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase text-slate-500 font-semibold">
                  {language === 'en' ? 'Corporate Email' : 'Correo Corporativo'}
                </div>
                <button
                  onClick={() => openEmailClient('Inquiry from amephia.com')}
                  className="text-slate-900 font-semibold text-sm hover:text-blue-600 transition-colors"
                >
                  info@amephia.com
                </button>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                <Globe className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <div className="text-[10px] font-mono uppercase text-slate-500 font-semibold">
                  {language === 'en' ? 'Offices & Client Coverage' : 'Oficinas & Cobertura'}
                </div>
                <div className="text-slate-900 font-bold text-sm">
                  🇺🇸 California · Newark, NJ &middot; 🇪🇨 Ecuador
                </div>
                <p className="text-slate-600 text-xs leading-relaxed">
                  {language === 'en'
                    ? 'Engineering software for companies in the United States, Ecuador, and across the region. US and international contracts with fluent bilingual delivery.'
                    : 'Desarrollamos software para empresas en Estados Unidos, Ecuador y la región. Contratos bajo marco legal estadounidense e internacional con atención bilingüe.'}
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 flex-shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase text-slate-500 font-semibold">
                  {language === 'en' ? 'Engineering Availability' : 'Disponibilidad de Ingeniería'}
                </div>
                <div className="text-slate-900 font-semibold text-sm">Mon &ndash; Fri &middot; 08:30 &ndash; 18:30 (GMT-5)</div>
                <div className="text-[11px] text-slate-500">
                  {language === 'en' ? 'Support available in English & Spanish' : 'Atención técnica en español e inglés'}
                </div>
              </div>
            </div>
          </div>

          {/* Formulario */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-7 sm:p-9 shadow-xl shadow-slate-200/60">
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              {language === 'en' ? 'Tell us about your project' : 'Cuéntanos sobre tu proyecto'}
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm mb-6">
              {language === 'en'
                ? 'Fill out the form and a software architect will review your inquiry immediately.'
                : 'Completa el formulario y un arquitecto de software revisará tu solicitud de inmediato.'}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>
                    {language === 'en' ? 'Full Name *' : 'Nombre y Apellido *'}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder={language === 'en' ? 'Your Full Name' : 'Tu Nombre Completo'}
                    required
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>
                    {language === 'en' ? 'Phone / WhatsApp *' : 'Teléfono / WhatsApp *'}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+1 (334) 000 0000"
                    required
                    className={inputCls}
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>
                    {language === 'en' ? 'Corporate Email *' : 'Email Corporativo *'}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@company.com"
                    required
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>
                    {language === 'en' ? 'Requested Service' : 'Servicio Requerido'}
                  </label>
                  <select
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    className={`${inputCls} cursor-pointer`}
                  >
                    <option value="erp">ERP / Enterprise Management</option>
                    <option value="web-seo">{language === 'en' ? 'Website Modernization & SEO' : 'Modernización Web & SEO Orgánico'}</option>
                    <option value="reviews">{language === 'en' ? 'Google Review Shield Funnel' : 'Gestión de Reseñas Google (Review Shield)'}</option>
                    <option value="sri">Facturación SRI (Facturón)</option>
                    <option value="contame">Contabilidad NIIF en la Nube (ContAme)</option>
                    <option value="school">School SIS (AmePhia EDU)</option>
                    <option value="shielddata">LOPDP Data Privacy (ShieldData)</option>
                    <option value="ecommerce">E-commerce & Payments</option>
                    <option value="mobile">Mobile App (iOS / Android)</option>
                    <option value="saas">Custom SaaS Platform</option>
                  </select>
                </div>
              </div>

              <div>
                <label className={labelCls}>
                  {language === 'en' ? 'Project Details *' : 'Detalles del Requerimiento *'}
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder={
                    language === 'en'
                      ? 'Briefly describe what your business needs to build or improve...'
                      : 'Describe brevemente qué necesita resolver tu empresa...'
                  }
                  required
                  rows={4}
                  className={`${inputCls} resize-none`}
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full flex items-center justify-center gap-2.5 px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-sm rounded-xl transition-all shadow-xl shadow-blue-500/20 disabled:opacity-50"
              >
                {submitting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>{language === 'en' ? 'Submit Inquiry' : 'Enviar Requerimiento'}</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>

              {success && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>
                    {language === 'en'
                      ? 'Inquiry received successfully! We will get back to you within 24 hours.'
                      : '¡Mensaje recibido con éxito! Te contactaremos en menos de 24 horas.'}
                  </span>
                </motion.div>
              )}

              {error && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs">
                  {error}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─── FOOTER ────────────────────────────────────────────── */
const Footer = ({
  onOpenProject,
  onOpenLegal,
}: {
  onOpenProject: (id: ProjectId) => void;
  onOpenLegal: (page: Exclude<LegalPage, null>) => void;
}) => {
  const { language } = useLanguage();
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer className="bg-[#040812] border-t border-white/[0.08] pt-16 pb-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <img src={logo} alt="AmePhia Systems" className="h-7 w-auto object-contain brightness-0 invert opacity-95" />
              <span className="font-mono text-xs font-bold text-blue-400">SYSTEMS</span>
            </div>
            <p className="leading-relaxed mb-5 text-slate-400">
              {language === 'en'
                ? 'Leading technology company building custom cloud platforms, school information systems, enterprise ERPs, and native SRI e-invoicing for Ecuador and Latin America.'
                : 'Empresa líder en desarrollo de software, plataformas cloud, sistemas escolares y facturación electrónica nativa SRI para Ecuador y Latinoamérica.'}
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => openWA(language, 'footer')}
                className="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white hover:border-emerald-500/40 hover:text-emerald-400 transition-colors flex items-center gap-1.5 text-[11px]"
              >
                <PhoneCall className="w-3 h-3" />
                WhatsApp
              </button>
              <button
                onClick={() => openEmailClient('Inquiry for AmePhia')}
                className="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white hover:border-blue-500/40 hover:text-blue-400 transition-colors flex items-center gap-1.5 text-[11px]"
              >
                <Mail className="w-3 h-3" />
                Email
              </button>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-4 font-mono">
              {language === 'en' ? 'Software Suite' : 'Suite de Productos'}
            </h4>
            <ul className="space-y-2">
              {[
                { label: 'Facturón (Facturación SRI)', id: 'facturon' as ProjectId, url: 'https://facturon.ec/' },
                { label: 'AmePhia EDU (MinEduc 2025)', id: 'education' as ProjectId },
                { label: 'ShieldData LOPDP Ecuador', id: 'shielddata' as ProjectId },
                { label: 'AmePhia Gym (ERP Fitness)', id: 'gym' as ProjectId },
                { label: 'Broker Seguro (SaaS Seguros)', id: 'broker-seguro' as ProjectId },
                { label: 'AmePhia Store (E-commerce)', id: 'ecommerce' as ProjectId, url: 'https://ameshop.ec/' },
                { label: 'ContAme (Contabilidad NIIF)', id: 'contame' as ProjectId, url: 'https://contame.amephia.com/' },
              ].map(p => (
                <li key={p.id}>
                  <button
                    onClick={() => 'url' in p && p.url ? window.open(p.url, '_blank') : onOpenProject(p.id)}
                    className="hover:text-white transition-colors"
                  >
                    {p.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-4 font-mono">
              {language === 'en' ? 'Engineering Services' : 'Servicios de Ingeniería'}
            </h4>
            <ul className="space-y-2">
              {(language === 'en' ? [
                'Web & Mobile App Engineering',
                'Native SRI Electronic Invoicing',
                'AWS Cloud Architecture',
                'Enterprise ERPs & Billing',
                'Payment Gateways Integration',
                'Tech Advisory & CTO Services',
              ] : [
                'Desarrollo Web & Apps Móviles',
                'Facturación Electrónica SRI Nativa',
                'Arquitectura Cloud en AWS',
                'ERPs y Gestión Empresarial',
                'Pasarelas de Pago Ecuatorianas',
                'Asesoría Tecnológica & CTO',
              ]).map(s => (
                <li key={s}>
                  <button onClick={() => go('servicios')} className="hover:text-white transition-colors">
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-4 font-mono">
              {language === 'en' ? 'Headquarters & Compliance' : 'Sede & Cumplimiento'}
            </h4>
            <div className="space-y-2.5 leading-relaxed">
              <p>📍 🇺🇸 California · Newark, NJ (USA) &middot; 🇪🇨 Ecuador</p>
              <p>🌐 {language === 'en' ? 'US & LATAM client execution · Contracts under US & international law' : 'Proyectos en EE.UU. & LATAM · Contratos bajo legislación de EE.UU. e internacional'}</p>
              <p>🔒 Full LOPDP compliance and ISO 27001 / NIST cybersecurity posture</p>
              <p>⚡ 99.9% Monitored infrastructure availability</p>
              <p className="pt-1 font-mono text-white">Direct Line: +1 (334) 732-4056</p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <p>© 2026 AmePhia Systems Inc. All rights reserved / Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <button
              onClick={() => onOpenLegal('terms')}
              className="hover:text-white transition-colors"
            >
              {language === 'en' ? 'Terms of Use' : 'Términos de Uso'}
            </button>
            <button
              onClick={() => onOpenLegal('privacy')}
              className="hover:text-white transition-colors"
            >
              {language === 'en' ? 'Privacy Policy' : 'Política de Privacidad'}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

/* ─── FLOATING WHATSAPP QUICK-ACTION ────────────────────── */
const FloatingWhatsAppBadge = () => {
  const { language } = useLanguage();

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => openWA(language, 'floating')}
        className="group relative flex items-center gap-3 px-4 py-3 bg-[#0E1838] border border-emerald-500/40 rounded-full shadow-2xl hover:shadow-emerald-500/25 transition-all"
        aria-label="Contact engineer on WhatsApp"
      >
        <div className="relative">
          <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow">
            <MessageSquare className="w-4 h-4" />
          </div>
          <span className="absolute top-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-[#0E1838] animate-pulse" />
        </div>
        <div className="hidden sm:block text-left pr-2">
          <div className="text-[11px] font-bold text-white leading-none">
            {language === 'en' ? 'Engineer Online' : 'Ingeniero en línea'}
          </div>
          <div className="text-[9px] text-emerald-400 font-mono mt-0.5">
            {language === 'en' ? 'Response < 15 min' : 'Respuesta < 15 min'}
          </div>
        </div>
      </motion.button>
    </div>
  );
};

/* ─── EXPORT COMPONENTE PRINCIPAL ───────────────────────── */
interface CompanyLandingProps {
  onOpenProject: (id: ProjectId) => void;
}

export const CompanyLanding = ({ onOpenProject }: CompanyLandingProps) => {
  const { language } = useLanguage();
  const [legalPage, setLegalPage] = useState<LegalPage>(null);

  return (
    <div className="relative min-h-screen bg-[#060B16] text-slate-100 selection:bg-blue-600/40 selection:text-white font-sans overflow-x-hidden">
      <div className="noise-overlay" />

      {/* Navegación flotante con conmutador ES | EN */}
      <Navbar />

      {/* Hero de alto impacto con 3 modos interactivos */}
      <HeroSection />

      {/* Marquesina infinita de integraciones (SRI, Bancos, AWS) */}
      <IntegrationMarquee />

      {/* Métricas clave */}
      <StatsStrip />

      {/* Showcase Interactivo de Productos con capturas reales */}
      <ProductsSection onOpenProject={onOpenProject} />

      {/* Diagnóstico / Cotizador Express interactivo en 3 pasos */}
      <DiagnosticCalculator />

      {/* Capacidades y Servicios en Bento Grid con Luminous Hover */}
      <ServicesSection />

      {/* Stack Tecnológico y Arquitectura Cloud */}
      <TechSection />

      {/* Autoridad Corporativa: Por qué AmePhia */}
      <AboutSection />

      {/* Metodología de 5 Fases */}
      <ProcessSection />

      {/* Preguntas Frecuentes Ejecutivas */}
      <FAQSection />

      {/* Banner de Llamado a la Acción */}
      <CTABanner />

      {/* Formulario de Contacto & Canales Directos */}
      <ContactSection />

      {/* Pie de Página Profesional */}
      <Footer onOpenProject={onOpenProject} onOpenLegal={setLegalPage} />

      {/* Botón flotante de WhatsApp en vivo */}
      <FloatingWhatsAppBadge />

      {/* Modales Legales */}
      <LegalModal page={legalPage} onClose={() => setLegalPage(null)} lang={language} />
    </div>
  );
};
