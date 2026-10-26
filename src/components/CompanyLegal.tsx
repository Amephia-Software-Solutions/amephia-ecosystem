import { X } from 'lucide-react';
import type { Language } from '../i18n';

export type LegalPage = 'terms' | 'privacy' | null;

/* ─── LEGAL MODAL ───────────────────────────────────────── */
export const LegalModal = ({ page, onClose, lang }: { page: LegalPage; onClose: () => void; lang: Language }) => {
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
