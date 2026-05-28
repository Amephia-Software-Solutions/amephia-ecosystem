import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  ArrowRight, Code2, Globe, ShoppingCart, Zap, Cloud,
  BarChart3, Shield, Users, CheckCircle2, FileText,
  Settings, TrendingUp, Award, Clock, PhoneCall, Mail,
  ChevronRight, Database, Cpu, Layers, Menu, X, Sparkles, Smartphone,
} from 'lucide-react';
import { trackContactClick, trackLeadGenerated } from '../lib/analytics';
import { getContactEmail, openEmailClient } from '../lib/emailUtils';
import type { ProjectId } from '../projects';
import logo from '../assets/images/amelogo_v3_optimized.webp';

/* ─── THEME ─────────────────────────────────────────
   Dark:  #080E1C  (fondo rico, no negro plano)
   Mid:   #0F1729  (cards oscuras)
   Light: #F0F4FF  (secciones claras alternadas)
   White: #FFFFFF  (cards en secciones claras)
   Blue:  #3B82F6  (acento primario)
   Purple:#8B5CF6  (acento secundario)
   Text light: #E2E8F0
   Text muted dark: #64748B (secciones claras)
   Text muted light: #94A3B8 (secciones oscuras)
───────────────────────────────────────────────────── */

const WA_NUMBER = '13347324056';
type LegalPage = 'terms' | 'privacy' | null;

const waURL = (ctx = 'hero') => {
  const msgs: Record<string, string> = {
    hero: 'Hola, les escribo desde su sitio web. Me gustaría conversar sobre un proyecto. ¿Cuándo podemos hablar?',
    services: 'Hola, vi sus servicios y quisiera que me ayuden con un proyecto. ¿Tienen disponibilidad esta semana?',
    cta: 'Hola, me interesa trabajar con AmePhia. ¿Podemos agendar una llamada corta para conversar?',
  };
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msgs[ctx] ?? msgs.hero)}`;
};

const openWA = (ctx = 'hero') => {
  trackContactClick('whatsapp', `company_${ctx}`);
  trackLeadGenerated('whatsapp', `company_${ctx}`);
  window.open(waURL(ctx), '_blank');
};

const LegalModal = ({ page, onClose }: { page: LegalPage; onClose: () => void }) => {
  if (!page) return null;

  const titles: Record<Exclude<LegalPage, null>, string> = {
    terms: 'Términos de Uso',
    privacy: 'Política de Privacidad',
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-start justify-center overflow-y-auto bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div
        className="relative w-full max-w-5xl mx-4 my-10 rounded-3xl border border-white/10 bg-[#0B1220] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full border border-white/10 bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Cerrar"
        >
          <X className="w-5 h-5 mx-auto" />
        </button>

        <div className="px-6 md:px-10 pt-10 pb-8 border-b border-white/10">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-2">{titles[page]}</h2>
          <p className="text-sm text-slate-500">Última actualización: 3 de abril de 2026</p>
        </div>

        <div className="px-6 md:px-10 py-8 max-h-[70vh] overflow-y-auto prose prose-invert prose-slate max-w-none text-slate-300 leading-relaxed space-y-6 text-sm">
          {page === 'terms' ? <CompanyTermsContent /> : <CompanyPrivacyContent />}
        </div>

        <div className="px-6 md:px-10 py-6 border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] text-white font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

const CompanyTermsContent = () => (
  <>
    <section>
      <h3 className="text-xl font-semibold text-white mb-3">1. Aceptación y alcance</h3>
      <p>
        Al acceder, navegar o utilizar este sitio web, formularios de contacto, demos, materiales comerciales, páginas de
        producto o cualquier servicio digital operado por AmePhia Systems Inc. (&quot;Amephia&quot;), usted acepta estos Términos
        de Uso y nuestra Política de Privacidad.
      </p>
      <p className="mt-2">
        Si utiliza este sitio en representación de una empresa u organización, declara que cuenta con facultades suficientes
        para obligarla frente a estos Términos. Si no está de acuerdo, no debe utilizar este sitio ni remitir información
        a través de nuestros formularios o canales digitales.
      </p>
    </section>

    <section>
      <h3 className="text-xl font-semibold text-white mb-3">2. Naturaleza informativa del sitio</h3>
      <p>
        Salvo que exista un contrato escrito firmado por Amephia, este sitio tiene carácter exclusivamente informativo y
        comercial. Las descripciones de servicios, precios referenciales, funcionalidades, integraciones, tiempos de entrega,
        casos de uso, disponibilidad y resultados esperados no constituyen oferta vinculante, promesa de resultado, garantía
        comercial ni obligación contractual exigible.
      </p>
      <p className="mt-2">
        Cualquier propuesta, cotización, cronograma, alcance técnico, SLA, soporte, entregable o condición económica solo
        será obligatorio cuando conste expresamente en una orden, contrato o acuerdo específico suscrito por las partes.
      </p>
    </section>

    <section>
      <h3 className="text-xl font-semibold text-white mb-3">3. Uso permitido</h3>
      <p>Usted se compromete a utilizar el sitio de manera lícita, diligente y conforme a estos Términos. Queda prohibido:</p>
      <ul className="list-disc pl-6 space-y-1 mt-2">
        <li>Usar el sitio para fines ilícitos, engañosos, difamatorios o que infrinjan derechos de terceros</li>
        <li>Intentar acceder sin autorización a sistemas, credenciales, cuentas, bases de datos o entornos de Amephia</li>
        <li>Ejecutar scrapers, bots, crawlers, pruebas de carga o pentesting sin autorización escrita</li>
        <li>Copiar, revender, sublicenciar, replicar o explotar comercialmente el contenido o software del sitio</li>
        <li>Transmitir malware, código malicioso, spam o archivos que comprometan la seguridad del servicio</li>
      </ul>
      <p className="mt-2">
        Amephia podrá bloquear accesos, filtrar tráfico, preservar evidencia y ejercer acciones legales o contractuales cuando
        detecte uso abusivo, fraudulento o no autorizado.
      </p>
    </section>

    <section>
      <h3 className="text-xl font-semibold text-white mb-3">4. Propiedad intelectual</h3>
      <p>
        Todo el contenido del sitio, incluyendo software, diseño, interfaz, textos, estructura, marcas, logotipos, gráficos,
        demos, capturas, material audiovisual, documentación y código, pertenece a Amephia o a sus licenciantes y está
        protegido por la normativa aplicable de propiedad intelectual.
      </p>
      <p className="mt-2">
        No se concede ninguna licencia ni cesión de derechos salvo la autorización limitada, revocable y no exclusiva de usar
        el sitio para evaluar nuestros servicios. Cualquier uso distinto requerirá autorización previa y escrita de Amephia.
      </p>
    </section>

    <section>
      <h3 className="text-xl font-semibold text-white mb-3">5. Información enviada por el usuario</h3>
      <p>
        Usted es el único responsable de la legalidad, exactitud, pertinencia y actualidad de la información que envíe a
        través de formularios, correo electrónico, WhatsApp, demos, reuniones o cualquier canal de contacto.
      </p>
      <p className="mt-2">
        Salvo pacto expreso de confidencialidad o NDA firmado, la información que nos remita para evaluar un proyecto no se
        considerará confidencial. Usted declara que cuenta con autorización suficiente para compartir cualquier dato de su
        empresa, equipo, clientes, proveedores o terceros.
      </p>
      <p className="mt-2">
        Usted se obliga a no enviar datos sensibles, credenciales productivas, secretos industriales, información sujeta a
        reserva legal o datos personales de terceros que no sean estrictamente necesarios para la evaluación comercial inicial.
      </p>
    </section>

    <section>
      <h3 className="text-xl font-semibold text-white mb-3">6. Terceros, integraciones y enlaces externos</h3>
      <p>
        El sitio puede mencionar o enlazar servicios de terceros, incluidos proveedores cloud, pasarelas de pago, plataformas
        de mensajería, analítica, IA, correo, hosting y otras herramientas. Amephia no controla ni garantiza la disponibilidad,
        seguridad, exactitud o políticas de dichos terceros.
      </p>
      <p className="mt-2">
        El uso de servicios externos se rige por los términos y políticas de sus respectivos proveedores. Amephia no será
        responsable por caídas, errores, pérdidas, bloqueos, cargos, cambios de API ni incidentes originados por terceros.
      </p>
    </section>

    <section>
      <h3 className="text-xl font-semibold text-white mb-3">7. Exclusión de garantías</h3>
      <p>
        En la máxima medida permitida por la ley, el sitio, sus contenidos y cualquier material informativo se ofrecen
        &quot;tal cual&quot; y &quot;según disponibilidad&quot;. Amephia no garantiza que el sitio estará libre de errores, interrupciones,
        vulnerabilidades, omisiones o incompatibilidades, ni que el contenido será exacto, completo o apto para un propósito
        particular.
      </p>
      <p className="mt-2">
        Amephia no garantiza resultados de negocio, posicionamiento, ventas, conversiones, cumplimiento regulatorio, tiempos
        de integración, aprobaciones de terceros, continuidad operativa ni ausencia de incidentes derivados del uso de software
        o servicios recomendados, desarrollados o integrados.
      </p>
    </section>

    <section>
      <h3 className="text-xl font-semibold text-white mb-3">8. Limitación de responsabilidad</h3>
      <p>
        En ningún caso Amephia será responsable por daños indirectos, incidentales, especiales, punitivos o consecuenciales,
        incluyendo lucro cesante, pérdida de datos, pérdida de clientes, pérdida de oportunidad, interrupción del negocio,
        reputación o sanciones regulatorias derivadas del uso o imposibilidad de uso del sitio.
      </p>
      <p className="mt-2">
        En cualquier evento, la responsabilidad total acumulada de Amephia vinculada exclusivamente al uso de este sitio no
        excederá el valor efectivamente pagado por usted a Amephia durante los tres meses anteriores al hecho que origine el
        reclamo, y si no existieron pagos, dicha responsabilidad será de USD 100 como máximo.
      </p>
    </section>

    <section>
      <h3 className="text-xl font-semibold text-white mb-3">9. Indemnidad</h3>
      <p>
        Usted acepta defender, indemnizar y mantener indemne a Amephia, sus directivos, empleados, contratistas y afiliadas
        frente a cualquier reclamo, sanción, pérdida, costo, multa, daño o gasto, incluyendo honorarios legales razonables,
        derivado de: su uso del sitio; la información que remita; la infracción de estos Términos; o la violación de derechos
        de terceros o normas aplicables.
      </p>
    </section>

    <section>
      <h3 className="text-xl font-semibold text-white mb-3">10. Modificaciones y ley aplicable</h3>
      <p>
        Amephia podrá modificar estos Términos en cualquier momento. La versión vigente será la publicada en este sitio con
        su fecha de actualización. El uso continuado del sitio después de dichos cambios constituirá aceptación de la versión
        actualizada.
      </p>
      <p className="mt-2">
        Estos Términos se rigen por las leyes de la República del Ecuador. Cualquier controversia se intentará resolver primero
        de forma directa y de buena fe. Si ello no ocurre, las partes se someten a la jurisdicción competente de Ecuador,
        salvo que un contrato específico firmado establezca otro mecanismo.
      </p>
    </section>
  </>
);

const CompanyPrivacyContent = () => (
  <>
    <section>
      <h3 className="text-xl font-semibold text-white mb-3">1. Responsable del tratamiento</h3>
      <p>
        AmePhia Systems Inc. es responsable del tratamiento de los datos personales recopilados a través de este sitio web,
        formularios de contacto, solicitudes de demo, correo electrónico, WhatsApp y demás canales digitales asociados a
        nuestros servicios comerciales.
      </p>
      <p className="mt-2">
        Para consultas relacionadas con privacidad puede escribir a <span className="text-white">info@amephia.com</span>.
      </p>
    </section>

    <section>
      <h3 className="text-xl font-semibold text-white mb-3">2. Qué datos recopilamos</h3>
      <p>Podemos recopilar las siguientes categorías de datos:</p>
      <ul className="list-disc pl-6 space-y-1 mt-2">
        <li>Datos de identificación y contacto, como nombre, empresa, email, teléfono y cargo</li>
        <li>Información comercial, como necesidad del proyecto, presupuesto estimado, industria y tamaño del negocio</li>
        <li>Datos técnicos, como IP, navegador, sistema operativo, idioma, dispositivo, páginas visitadas y eventos de navegación</li>
        <li>Comunicaciones, mensajes, archivos o notas remitidas durante el contacto comercial o técnico</li>
      </ul>
      <p className="mt-2">
        Le solicitamos no enviar datos sensibles ni información de terceros que no sea necesaria para la evaluación inicial.
        Si decide compartirlos, usted declara que cuenta con base legal suficiente para ello.
      </p>
    </section>

    <section>
      <h3 className="text-xl font-semibold text-white mb-3">3. Finalidades del tratamiento</h3>
      <p>Tratamos los datos personales para:</p>
      <ul className="list-disc pl-6 space-y-1 mt-2">
        <li>Responder consultas, agendar reuniones, entregar demos y preparar propuestas comerciales</li>
        <li>Dar seguimiento a oportunidades comerciales, ventas, onboarding y soporte precontractual</li>
        <li>Operar, asegurar y mejorar el sitio, incluyendo prevención de fraude, abuso y tráfico malicioso</li>
        <li>Medir analítica, rendimiento de campañas, conversiones y efectividad de nuestros canales</li>
        <li>Cumplir obligaciones legales, contables, tributarias o atender requerimientos de autoridad competente</li>
      </ul>
    </section>

    <section>
      <h3 className="text-xl font-semibold text-white mb-3">4. Base jurídica</h3>
      <p>
        Dependiendo del caso, Amephia tratará datos sobre la base de: su consentimiento; la ejecución de medidas precontractuales;
        la relación contractual cuando exista; el cumplimiento de obligaciones legales; y nuestro interés legítimo en proteger
        el sitio, gestionar oportunidades comerciales, mantener evidencias y prevenir fraude o uso abusivo.
      </p>
    </section>

    <section>
      <h3 className="text-xl font-semibold text-white mb-3">5. Compartición de datos</h3>
      <p>
        No vendemos datos personales. Podemos compartir información con proveedores que actúan como encargados del tratamiento,
        tales como hosting, analítica, correo, CRM, automatización, mensajería, almacenamiento cloud o herramientas de soporte,
        exclusivamente en la medida necesaria para operar nuestros procesos.
      </p>
      <p className="mt-2">
        También podremos divulgar información cuando sea necesario para cumplir la ley, atender requerimientos válidos de
        autoridad, hacer valer derechos, prevenir fraude, investigar incidentes de seguridad o en el contexto de una fusión,
        adquisición, reorganización societaria o venta de activos.
      </p>
    </section>

    <section>
      <h3 className="text-xl font-semibold text-white mb-3">6. Cookies, analítica y tecnologías similares</h3>
      <p>
        Este sitio puede utilizar cookies, píxeles, almacenamiento local y herramientas de analítica para recordar preferencias,
        medir tráfico, comprender interacciones y optimizar campañas o formularios. Algunas de estas tecnologías pueden ser
        operadas por terceros.
      </p>
      <p className="mt-2">
        Usted puede bloquear o eliminar cookies desde la configuración de su navegador; sin embargo, ciertas funcionalidades del
        sitio podrían verse afectadas o dejar de operar correctamente.
      </p>
    </section>

    <section>
      <h3 className="text-xl font-semibold text-white mb-3">7. Conservación de datos</h3>
      <p>
        Conservaremos los datos durante el tiempo necesario para cumplir las finalidades descritas en esta política, mantener
        historial comercial razonable, responder reclamos, hacer cumplir acuerdos y cumplir obligaciones legales o regulatorias.
      </p>
      <p className="mt-2">
        Cuando los datos ya no sean necesarios, podremos eliminarlos, anonimizaros o conservarlos bloqueados durante los plazos
        de prescripción aplicables. Amephia se reserva el derecho de conservar registros técnicos y evidencias cuando exista una
        necesidad legítima de seguridad, auditoría o defensa jurídica.
      </p>
    </section>

    <section>
      <h3 className="text-xl font-semibold text-white mb-3">8. Seguridad y transferencias</h3>
      <p>
        Aplicamos medidas técnicas, organizativas y contractuales razonables para proteger la información. No obstante, ningún
        sistema es absolutamente invulnerable y Amephia no puede garantizar seguridad absoluta frente a ataques sofisticados,
        errores humanos, fallas de terceros o eventos de fuerza mayor.
      </p>
      <p className="mt-2">
        Dado que utilizamos infraestructura y proveedores tecnológicos que pueden operar fuera de Ecuador, sus datos podrán ser
        almacenados o tratados en otras jurisdicciones con los resguardos contractuales y operativos que resulten razonables
        para la naturaleza del servicio.
      </p>
    </section>

    <section>
      <h3 className="text-xl font-semibold text-white mb-3">9. Derechos del titular</h3>
      <p>
        Cuando la ley aplicable lo permita, usted podrá solicitar acceso, actualización, rectificación, eliminación, oposición,
        portabilidad o revocatoria del consentimiento respecto de sus datos personales, mediante solicitud razonable enviada a
        nuestros canales de contacto.
      </p>
      <p className="mt-2">
        Amephia podrá requerir información adicional para verificar identidad, rechazar solicitudes improcedentes o limitar la
        atención cuando existan obligaciones legales, intereses legítimos prevalentes o impedimentos técnicos razonables.
      </p>
    </section>

    <section>
      <h3 className="text-xl font-semibold text-white mb-3">10. Cambios a esta política</h3>
      <p>
        Podemos actualizar esta Política de Privacidad en cualquier momento. La versión vigente será la publicada en este sitio
        con su fecha de actualización. El uso continuado del sitio después de la publicación de cambios implica conocimiento y
        aceptación de la versión actualizada en la medida permitida por la ley.
      </p>
    </section>
  </>
);

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
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [end]);
  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
};

/* ─── NAVBAR ────────────────────────────────────────── */
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const links = [
    { label: 'Servicios', id: 'servicios' },
    { label: 'Tecnología', id: 'tecnologia' },
    { label: 'Productos', id: 'productos' },
    { label: 'Nosotros', id: 'nosotros' },
    { label: 'Contacto', id: 'contacto' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled
        ? 'bg-[#080E1C]/95 backdrop-blur-xl border-b border-white/[0.07] shadow-xl shadow-black/30'
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-18 md:h-20 flex items-center justify-between py-4">
        <button onClick={() => go('hero')} className="flex items-center gap-3 group">
          <img src={logo} alt="AmePhia" className="h-7 w-auto object-contain brightness-0 invert opacity-90 group-hover:opacity-100 transition-opacity" />
        </button>

        <nav className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <button key={l.id} onClick={() => go(l.id)}
              className="text-sm text-slate-400 hover:text-white transition-colors font-medium tracking-wide">
              {l.label}
            </button>
          ))}
        </nav>

        <div className="hidden md:block">
          <button onClick={() => openWA('hero')}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#3B82F6] to-[#6366f1] hover:from-[#2563eb] hover:to-[#4f46e5] text-white text-sm font-semibold rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-px">
            <PhoneCall className="w-4 h-4" />
            Hablar con un experto
          </button>
        </div>

        <button className="md:hidden text-slate-400 hover:text-white transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {menuOpen && (
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-[#0C1220] border-t border-white/[0.07] px-6 pb-6 pt-4 space-y-1">
          {links.map(l => (
            <button key={l.id} onClick={() => go(l.id)}
              className="block w-full text-left px-4 py-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors text-sm font-medium">
              {l.label}
            </button>
          ))}
          <div className="pt-3">
            <button onClick={() => { openWA('hero'); setMenuOpen(false); }}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-[#3B82F6] to-[#6366f1] text-white text-sm font-semibold rounded-xl">
              <PhoneCall className="w-4 h-4" /> Hablar con un experto
            </button>
          </div>
        </motion.div>
      )}
    </header>
  );
};

/* ─── HERO — oscuro, impactante ─────────────────────── */
const HeroSection = () => {
  const lines = [
    { text: '$ amephia init --project "tu-negocio"', delay: 0 },
    { text: '→ Analizando requerimientos...', delay: 0.5 },
    { text: '→ Diseñando arquitectura cloud...', delay: 1.0 },
    { text: '→ Ejecutando tests de integración...', delay: 1.5 },
    { text: '✓ Sistema en producción — 99.9% uptime', delay: 2.0, green: true },
  ];

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-[#080E1C] pt-20">
      {/* Fondo: gradiente radial + grid */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-15%] left-[10%] w-[800px] h-[800px] rounded-full bg-[#3B82F6]/[0.08] blur-[140px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[700px] h-[700px] rounded-full bg-[#8B5CF6]/[0.07] blur-[120px]" />
        <div className="absolute top-1/3 left-1/2 w-[400px] h-[400px] rounded-full bg-[#3B82F6]/[0.04] blur-[80px]" />
        {/* Grid lines */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'linear-gradient(#94A3B8 1px, transparent 1px), linear-gradient(90deg, #94A3B8 1px, transparent 1px)', backgroundSize: '72px 72px' }} />
        {/* Vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#080E1C]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full py-20 md:py-0">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* COPY */}
          <div>
            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-[4.5rem] font-bold leading-[1.04] tracking-tight text-white mb-7">
              Construimos el{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#3B82F6] via-[#8B5CF6] to-[#3B82F6] bg-[length:200%_auto] animate-[shimmer_4s_linear_infinite]">
                software
              </span>{' '}
              que hace crecer tu negocio
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-slate-400 leading-relaxed mb-10 max-w-xl font-light">
              Llevamos más de diez años construyendo software en Ecuador. ERPs, e-commerce,
              plataformas SaaS y facturación electrónica SRI — todo hecho a medida,
              sin plantillas genéricas ni promesas vacías.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => openWA('hero')}
                className="group flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-[#3B82F6] to-[#6366f1] hover:from-[#2563eb] hover:to-[#4f46e5] text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-2xl hover:shadow-blue-500/30 hover:-translate-y-0.5">
                Cuéntanos tu proyecto
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button onClick={() => document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center justify-center gap-2 px-8 py-4 border border-white/15 hover:border-white/30 text-slate-300 hover:text-white font-medium rounded-xl transition-all duration-200 hover:bg-white/[0.04]">
                Ver qué hacemos
              </button>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-12 flex items-center gap-8 flex-wrap">
              {[
                { icon: <Shield className="w-4 h-4" />, text: 'Integración SRI' },
                { icon: <Cloud className="w-4 h-4" />, text: 'Infraestructura AWS' },
                { icon: <CheckCircle2 className="w-4 h-4" />, text: '99.9% de disponibilidad' },
              ].map(item => (
                <div key={item.text} className="flex items-center gap-2 text-sm text-slate-500">
                  <span className="text-[#3B82F6]">{item.icon}</span>
                  {item.text}
                </div>
              ))}
            </motion.div>
          </div>

          {/* TERMINAL */}
          <motion.div initial={{ opacity: 0, x: 32 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }} className="relative">
            {/* glow */}
            <div className="absolute -inset-6 bg-gradient-to-r from-[#3B82F6]/[0.07] to-[#8B5CF6]/[0.07] rounded-3xl blur-2xl" />

            <div className="relative bg-[#0C1220] border border-white/[0.09] rounded-2xl overflow-hidden shadow-2xl">
              {/* Title bar */}
              <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/[0.06] bg-[#111827]">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                <span className="ml-3 text-xs font-mono text-slate-500 tracking-wider">amephia — shell</span>
                <div className="ml-auto flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] animate-pulse" />
                  <span className="text-[10px] font-mono text-[#3B82F6]">LIVE</span>
                </div>
              </div>

              {/* Code */}
              <div className="p-6 font-mono text-sm space-y-2.5 min-h-[200px] bg-[#080E1C]">
                {lines.map((line, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: line.delay, duration: 0.35 }}
                    className={line.green ? 'text-emerald-400 font-medium' : i === 0 ? 'text-white' : 'text-slate-500'}>
                    {line.text}
                  </motion.div>
                ))}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.7, repeat: Infinity, repeatType: 'reverse' }}
                  className="inline-block w-2 h-4 bg-[#3B82F6] align-middle ml-0.5" />
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-3 border-t border-white/[0.06] divide-x divide-white/[0.06]">
                {[
                  { label: 'PROYECTOS', value: '150+' },
                  { label: 'UPTIME', value: '99.9%' },
                  { label: 'PAÍSES', value: '5' },
                ].map(m => (
                  <div key={m.label} className="py-4 text-center bg-[#0C1220]">
                    <div className="text-lg font-bold text-white font-mono">{m.value}</div>
                    <div className="text-[9px] font-mono text-slate-600 uppercase tracking-widest mt-0.5">{m.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating badges */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.5 }}
              className="absolute -right-6 top-10 bg-white border border-gray-100 rounded-2xl px-4 py-3 shadow-xl shadow-gray-200/60 hidden lg:block">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-900">+240% ROI</div>
                  <div className="text-[11px] text-gray-400">promedio clientes</div>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.5 }}
              className="absolute -left-6 bottom-16 bg-white border border-gray-100 rounded-2xl px-4 py-3 shadow-xl shadow-gray-200/60 hidden lg:block">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center">
                  <Clock className="w-4 h-4 text-[#3B82F6]" />
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-900">48 hrs</div>
                  <div className="text-[11px] text-gray-400">respuesta garantizada</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

    </section>
  );
};

/* ─── STATS — claro, credibilidad ───────────────────── */
const StatsStrip = () => {
  const stats = [
    { value: 10, suffix: '+', label: 'Años de experiencia' },
    { value: 150, suffix: '+', label: 'Clientes activos' },
    { value: 8, suffix: '', label: 'Productos SaaS propios' },
    { value: 100000, suffix: '+', label: 'Transacciones procesadas' },
    { value: 99.9, suffix: '%', label: 'Uptime garantizado' },
    { value: 5, suffix: '', label: 'Países con presencia' },
  ];
  return (
    <section className="bg-[#F0F4FF] py-14 border-b border-blue-100/60">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {stats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.08 }} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#0F172A] font-mono tabular-nums">
                <Counter end={s.value} suffix={s.suffix} />
              </div>
              <div className="text-xs text-slate-500 mt-1.5 tracking-wide">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── SERVICES — claro, clean ───────────────────────── */
const services = [
  { icon: <Code2 className="w-6 h-6" />, title: 'Desarrollo Web y Apps', desc: 'Plataformas web y apps móviles iOS/Android con React, TypeScript y Node.js. Desde un primer MVP ágil hasta sistemas que soportan miles de usuarios.', benefit: 'Tu producto en producción en semanas, no en meses.', accent: '#3B82F6', bg: 'bg-blue-50', border: 'border-blue-200/60' },
  { icon: <Layers className="w-6 h-6" />, title: 'ERPs y Sistemas de Gestión', desc: 'Software hecho para tu operación: facturación, inventario, nómina, contabilidad NIIF y reportes al momento, todo en una sola plataforma.', benefit: 'Un solo sistema que pone orden en tu empresa.', accent: '#8B5CF6', bg: 'bg-purple-50', border: 'border-purple-200/60' },
  { icon: <ShoppingCart className="w-6 h-6" />, title: 'E-commerce y Pagos Online', desc: 'Tiendas virtuales con checkout seguro, pasarelas locales e internacionales (PayPhone, Kushki, Stripe) y facturación electrónica integrada.', benefit: 'Vende sin parar las 24 horas, sin fricciones para tus clientes.', accent: '#059669', bg: 'bg-emerald-50', border: 'border-emerald-200/60' },
  { icon: <FileText className="w-6 h-6" />, title: 'Facturación Electrónica SRI', desc: 'Integración completa con el SRI: facturas, retenciones, notas de crédito y guías de remisión. Validación automática y trazabilidad fiscal sin papeleo.', benefit: 'Cumple la normativa SRI sin complicarte la vida.', accent: '#EA580C', bg: 'bg-orange-50', border: 'border-orange-200/60' },
  { icon: <Cloud className="w-6 h-6" />, title: 'Cloud y AWS', desc: 'Arquitectura, migración y optimización en la nube: EC2, RDS, S3, Lambda y más. Infraestructura sólida que crece contigo sin que el costo se dispare.', benefit: 'Infraestructura de empresa grande al presupuesto de una pequeña.', accent: '#0891B2', bg: 'bg-cyan-50', border: 'border-cyan-200/60' },
  { icon: <Zap className="w-6 h-6" />, title: 'Automatización e Integraciones', desc: 'Conectamos CRMs, ERPs y pasarelas de pago con APIs REST y webhooks. Eliminamos el trabajo repetitivo para que tu equipo haga lo que de verdad importa.', benefit: 'Tu equipo en estrategia; las máquinas en lo operativo.', accent: '#D97706', bg: 'bg-amber-50', border: 'border-amber-200/60' },
  { icon: <Database className="w-6 h-6" />, title: 'Plataformas SaaS', desc: 'Construimos productos SaaS multitenancy completos: onboarding automático, facturación recurrente, portal de clientes y dashboards analíticos.', benefit: 'Tu propio producto SaaS, sin vueltas innecesarias.', accent: '#4F46E5', bg: 'bg-indigo-50', border: 'border-indigo-200/60' },
  { icon: <Settings className="w-6 h-6" />, title: 'Asesoría Tecnológica', desc: 'Auditoría de arquitectura, definición de stack, roadmap de producto y acompañamiento para equipos que quieren crecer con bases sólidas.', benefit: 'Las decisiones técnicas correctas desde el principio.', accent: '#DB2777', bg: 'bg-pink-50', border: 'border-pink-200/60' },
];

const ServicesSection = () => (
  <section id="servicios" className="py-28 md:py-36 bg-[#F0F4FF]">
    <div className="max-w-7xl mx-auto px-6 md:px-12">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} className="mb-20">
        <span className="inline-block px-4 py-1.5 bg-blue-100 border border-blue-200 rounded-full text-xs font-semibold text-[#3B82F6] uppercase tracking-widest mb-6">
          Servicios
        </span>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] tracking-tight max-w-2xl leading-[1.1]">
            Lo que necesitas para{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6]">
              digitalizar y crecer
            </span>
          </h2>
          <p className="text-slate-500 max-w-sm lg:text-right text-sm leading-relaxed">
            Nada de copiar plantillas ni vender lo mismo a todos. Cada proyecto parte de
            entender cómo funciona tu negocio.
          </p>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
        {services.map((s, i) => (
          <motion.div key={s.title} initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="group bg-white border border-gray-100 hover:border-gray-200 rounded-2xl p-7 hover:shadow-xl hover:shadow-gray-200/80 transition-all duration-300 hover:-translate-y-1 flex flex-col gap-5">
            <div className={`w-12 h-12 rounded-xl ${s.bg} border ${s.border} flex items-center justify-center`}
              style={{ color: s.accent }}>
              {s.icon}
            </div>
            <div>
              <h3 className="text-[#0F172A] font-semibold text-base mb-2 leading-snug">{s.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
            </div>
            <div className="mt-auto pt-4 border-t border-gray-100">
              <p className="text-xs font-medium flex items-start gap-1.5" style={{ color: s.accent }}>
                <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                {s.benefit}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} className="mt-12 text-center">
        <button onClick={() => openWA('services')}
          className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#3B82F6] to-[#6366f1] hover:from-[#2563eb] hover:to-[#4f46e5] text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-xl hover:shadow-blue-500/25 hover:-translate-y-0.5">
          Hablar sobre mi proyecto
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>
    </div>
  </section>
);

/* ─── TECH — oscuro, autoridad técnica ──────────────── */
const techStack = [
  { name: 'React', color: '#61dafb', cat: 'Frontend' },
  { name: 'Next.js', color: '#E2E8F0', cat: 'Framework' },
  { name: 'Angular', color: '#dd0031', cat: 'Frontend' },
  { name: 'Astro', color: '#f97316', cat: 'Frontend' },
  { name: 'TypeScript', color: '#3178c6', cat: 'Lenguaje' },
  { name: 'JavaScript', color: '#f7df1e', cat: 'Lenguaje' },
  { name: 'Tailwind CSS', color: '#38bdf8', cat: 'Estilos' },
  { name: 'Flutter', color: '#02569b', cat: 'Mobile' },
  { name: 'React Native', color: '#61dafb', cat: 'Mobile' },
  { name: 'Node.js', color: '#8cc84b', cat: 'Backend' },
  { name: 'NestJS', color: '#e0234e', cat: 'Backend' },
  { name: 'Laravel', color: '#ff2d20', cat: 'Backend' },
  { name: 'PHP', color: '#777bb4', cat: 'Lenguaje' },
  { name: 'Python', color: '#fbbf24', cat: 'Backend' },
  { name: 'FastAPI', color: '#10b981', cat: 'API' },
  { name: 'REST APIs', color: '#22c55e', cat: 'API' },
  { name: 'GraphQL', color: '#e10098', cat: 'API' },
  { name: 'PostgreSQL', color: '#336791', cat: 'DB' },
  { name: 'MySQL', color: '#00758f', cat: 'DB' },
  { name: 'Microsoft SQL Server', color: '#cc2927', cat: 'DB' },
  { name: 'MongoDB', color: '#47a248', cat: 'DB' },
  { name: 'AWS', color: '#f97316', cat: 'Cloud' },
  { name: 'Docker', color: '#2496ed', cat: 'DevOps' },
  { name: 'Vite', color: '#a78bfa', cat: 'Build' },
  { name: 'Redis', color: '#dc382d', cat: 'Cache' },
  { name: 'Kubernetes', color: '#326ce5', cat: 'DevOps' },
  { name: 'Linux', color: '#facc15', cat: 'Infra' },
  { name: 'Nginx', color: '#009639', cat: 'Servidor' },
  { name: 'RabbitMQ', color: '#ff6600', cat: 'Mensajería' },
  { name: 'OpenAI', color: '#10a37f', cat: 'AI' },
  { name: 'Claude', color: '#d97706', cat: 'AI' },
  { name: 'Gemini', color: '#8b5cf6', cat: 'AI' },
  { name: 'Stripe', color: '#635bff', cat: 'Pagos' },
  { name: 'GitHub Actions', color: '#2088ff', cat: 'CI/CD' },
];

const TechSection = () => (
  <section id="tecnologia" className="py-28 md:py-36 bg-[#080E1C] relative overflow-hidden">
    {/* Sutil glow de fondo */}
    <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-[#3B82F6]/[0.05] rounded-full blur-[100px] pointer-events-none" />
    <div className="absolute bottom-0 right-1/4 w-[500px] h-[400px] bg-[#8B5CF6]/[0.05] rounded-full blur-[100px] pointer-events-none" />

    <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} className="text-center mb-16">
        <span className="inline-block px-4 py-1.5 bg-[#8B5CF6]/15 border border-[#8B5CF6]/25 rounded-full text-xs font-semibold text-[#A78BFA] uppercase tracking-widest mb-6">
          Stack Tecnológico
        </span>
        <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-5">
          Manejamos el ecosistema completo
        </h2>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
          No nos casamos con una sola tecnología. Elegimos las herramientas que mejor
          le sirven a tu proyecto, con criterio ganado a pulso en años de trabajo real.
        </p>
      </motion.div>

      {/* Badges */}
      <div className="flex flex-wrap justify-center gap-3 mb-16">
        {techStack.map((t, i) => (
          <motion.div key={t.name} initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            transition={{ delay: i * 0.04 }}
            className="group relative flex items-center gap-2.5 px-5 py-3 bg-[#0C1220] border border-white/[0.08] hover:border-white/20 rounded-xl transition-all duration-200 hover:bg-[#111827] hover:-translate-y-0.5 cursor-default">
            <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: t.color }} />
            <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">{t.name}</span>
            <span className="absolute -top-7 left-1/2 -translate-x-1/2 text-[10px] text-white bg-[#1E293B] border border-white/10 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg">
              {t.cat}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Categorías */}
      <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        {[
          { icon: <Globe className="w-5 h-5" />, label: 'Frontend', desc: 'React, Next.js, Angular, Astro y Tailwind CSS', color: '#3B82F6' },
          { icon: <Cpu className="w-5 h-5" />, label: 'Backend', desc: 'Node.js, NestJS, Laravel, Python y FastAPI', color: '#8B5CF6' },
          { icon: <Database className="w-5 h-5" />, label: 'Datos', desc: 'PostgreSQL, MySQL, SQL Server, MongoDB, Redis y mensajería', color: '#10B981' },
          { icon: <Cloud className="w-5 h-5" />, label: 'Infraestructura', desc: 'AWS, Docker, Kubernetes, Linux y Nginx', color: '#F59E0B' },
          { icon: <Smartphone className="w-5 h-5" />, label: 'Mobile', desc: 'Flutter y React Native para iOS y Android', color: '#06B6D4' },
          { icon: <Sparkles className="w-5 h-5" />, label: 'AI', desc: 'OpenAI, Claude, Gemini y automatizaciones inteligentes', color: '#EC4899' },
        ].map(cat => (
          <div key={cat.label}
            className="p-6 bg-[#0C1220] border border-white/[0.07] hover:border-white/15 rounded-2xl flex flex-col gap-3 transition-colors">
            <div style={{ color: cat.color }}>{cat.icon}</div>
            <div>
              <div className="text-white font-semibold mb-1">{cat.label}</div>
              <div className="text-slate-500 text-sm leading-snug">{cat.desc}</div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>

  </section>
);

/* ─── PRODUCTS — claro ──────────────────────────────── */
const products = [
  { id: 'shielddata' as ProjectId, name: 'SHIELDDATA', cat: 'Cumplimiento LOPDP', desc: 'Plataforma enterprise con IA para LOPDP Ecuador: RAT, EIPD, ARCO, brechas SPDP y ciberseguridad ISO 27001.', color: '#1E40AF', bg: '#EFF6FF', border: '#BFDBFE', badge: 'Enterprise · Nuevo' },
  { id: 'gym' as ProjectId, name: 'AMEPHIA GYM', cat: 'ERP para Gimnasios', desc: 'Membresías, facturación SRI, POS, inventario y contabilidad NIIF en una sola plataforma.', color: '#EA580C', bg: '#FFF7ED', border: '#FED7AA', badge: 'ERP Completo' },
  { id: 'broker-seguro' as ProjectId, name: 'BROKER SEGURO', cat: 'Gestión de Seguros', desc: 'Pólizas, vencimientos, renovaciones, reclamos, comisiones y cartera de clientes.', color: '#3B82F6', bg: '#EFF6FF', border: '#BFDBFE', badge: 'SaaS Multi-tenant' },
  { id: 'migration' as ProjectId, name: 'MIGRALIA', cat: 'SaaS Migratorio', desc: 'Plataforma multitenancy para facilitadores: casos, documentos, pagos y portal del cliente.', color: '#8B5CF6', bg: '#F5F3FF', border: '#DDD6FE', badge: 'SaaS Multitenancy' },
  { id: 'ecommerce' as ProjectId, name: 'AMEPHIA STORE', cat: 'E-commerce', desc: 'Tienda virtual con checkout seguro, pasarelas de pago y facturación integrada.', color: '#7C3AED', bg: '#F5F3FF', border: '#C4B5FD', badge: 'Pagos online', url: 'https://ameshop.ec/' },
  { id: 'facturacion' as ProjectId, name: 'FACTURA SRI', cat: 'Facturación Electrónica', desc: 'Facturas, retenciones, notas de crédito y guías de remisión con validación automática.', color: '#059669', bg: '#ECFDF5', border: '#A7F3D0', badge: '100% SRI' },
  { id: 'pos' as ProjectId, name: 'AMEPHIA POS', cat: 'Punto de Venta', desc: 'POS para mostrador: devoluciones, facturación instantánea y soporte de hardware.', color: '#D97706', bg: '#FFFBEB', border: '#FDE68A', badge: 'Tiempo real' },
  { id: 'nutri' as ProjectId, name: 'NUTRI APP', cat: 'Nutrición & Salud', desc: 'Seguimiento nutricional con planes alimenticios y monitoreo de progreso.', color: '#65A30D', bg: '#F7FEE7', border: '#BEF264', badge: 'iOS & Android' },
  { id: 'advisory' as ProjectId, name: 'TECH ADVISORY', cat: 'Consultoría', desc: 'Arquitectura de software, roadmap, optimización de procesos y mentoring técnico.', color: '#DB2777', bg: '#FDF2F8', border: '#FBCFE8', badge: 'CTO as a Service' },
  { id: 'contame' as ProjectId, name: 'CONTAME', cat: 'Contabilidad en la Nube', desc: 'Plataforma contable para empresas y contadores: NIIF, nómina, SRI, conciliación y reportes financieros.', color: '#0D9488', bg: '#F0FDFA', border: '#99F6E4', badge: 'Multi-empresa' },
];

const ProductsSection = ({ onOpenProject }: { onOpenProject: (id: ProjectId) => void }) => (
  <section id="productos" className="py-28 md:py-36 bg-white">
    <div className="max-w-7xl mx-auto px-6 md:px-12">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} className="mb-20">
        <span className="inline-block px-4 py-1.5 bg-blue-50 border border-blue-200 rounded-full text-xs font-semibold text-[#3B82F6] uppercase tracking-widest mb-6">
          Productos
        </span>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] tracking-tight max-w-2xl leading-[1.1]">
            Nueve productos que ya están{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6]">
              trabajando en el mercado
            </span>
          </h2>
          <p className="text-slate-500 max-w-sm lg:text-right text-sm leading-relaxed">
            Una década de mejoras con clientes reales. No vendemos promesas; vendemos software que ya funciona en producción.
          </p>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
        {products.map((p, i) => (
          <motion.button key={p.id} initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            onClick={() => 'url' in p && p.url ? window.open(p.url, '_blank') : onOpenProject(p.id)}
            className="group text-left bg-white border border-gray-100 hover:border-gray-200 rounded-2xl p-6 hover:shadow-xl hover:shadow-gray-200/80 transition-all duration-300 hover:-translate-y-1 flex flex-col gap-4">
            <div className="w-10 h-1.5 rounded-full group-hover:w-full transition-all duration-500" style={{ backgroundColor: p.color }} />
            <div className="inline-flex items-center self-start px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest border"
              style={{ color: p.color, backgroundColor: p.bg, borderColor: p.border }}>
              {p.cat}
            </div>
            <div>
              <div className="text-[#0F172A] font-bold text-lg leading-tight mb-2">{p.name}</div>
              <p className="text-slate-500 text-sm leading-relaxed">{p.desc}</p>
            </div>
            <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-lg" style={{ color: p.color, backgroundColor: p.bg }}>
                {p.badge}
              </span>
              <span className="flex items-center gap-1 text-xs text-slate-400 group-hover:text-slate-700 font-medium transition-colors">
                Ver más <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  </section>
);

/* ─── ABOUT — oscuro, autoridad, seriedad ───────────── */
const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const items = [
    { icon: <Award className="w-5 h-5" />, title: 'Más de diez años de trabajo real', desc: 'No empezamos ayer. Llevamos más de una década construyendo sistemas que manejan dinero real y resuelven problemas complejos en empresas ecuatorianas.', color: '#3B82F6' },
    { icon: <Shield className="w-5 h-5" />, title: 'Código que dura, no que impresiona', desc: 'Arquitecturas documentadas, mantenibles y escalables. Construimos pensando en los próximos años, no en entregar el sprint y desaparecer.', color: '#8B5CF6' },
    { icon: <Users className="w-5 h-5" />, title: 'Equipo senior, comunicación directa', desc: 'Hablas con los ingenieros que hacen el trabajo. Sin intermediarios que traduzcan mal tus ideas. Comunicación directa y decisiones rápidas.', color: '#10B981' },
    { icon: <BarChart3 className="w-5 h-5" />, title: 'Enfocados en resultados, no en horas', desc: 'Medimos el éxito en ROI, reducción de costos, más ventas y mayor eficiencia operativa. No en líneas de código ni horas facturadas.', color: '#F59E0B' },
  ];

  return (
    <section id="nosotros" className="py-28 md:py-36 bg-[#080E1C] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[700px] h-[500px] bg-[#8B5CF6]/[0.05] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[400px] bg-[#3B82F6]/[0.05] rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          {/* Left */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}>
            <span className="inline-block px-4 py-1.5 bg-[#8B5CF6]/15 border border-[#8B5CF6]/25 rounded-full text-xs font-semibold text-[#A78BFA] uppercase tracking-widest mb-6">
              Nosotros
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6 leading-[1.1]">
              No somos una agencia.<br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#60A5FA] to-[#A78BFA]">
                Somos el equipo técnico de tu empresa.
              </span>
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-5">
              AmePhia nació en Ecuador con una idea clara: las empresas de aquí merecen el mismo
              nivel de tecnología que las grandes del exterior, sin tener que pagar lo que cobran afuera.
            </p>
            <p className="text-slate-500 leading-relaxed mb-10">
              En más de diez años hemos construido apps móviles, plataformas SaaS, ERPs, sistemas
              migratorios y corredoras de seguros. Cada cliente nos enseñó algo nuevo.
              Cada proyecto nos dejó mejores que cuando empezamos.
            </p>
            <button onClick={() => openWA('cta')}
              className="group inline-flex items-center gap-3 px-7 py-3.5 bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-purple-500/20 hover:-translate-y-0.5 transition-all duration-200">
              Conversar con el equipo
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

          {/* Right */}
          <div ref={ref} className="space-y-4">
            {items.map((d, i) => (
              <motion.div key={d.title} initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.1 }}
                className="flex gap-5 p-6 bg-[#0C1220] border border-white/[0.07] hover:border-white/15 rounded-2xl transition-all group">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${d.color}20`, color: d.color }}>
                  {d.icon}
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1.5">{d.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{d.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─── PROCESS — claro ───────────────────────────────── */
const ProcessSection = () => {
  const steps = [
    { num: '01', title: 'Primero conversamos', desc: 'Hablamos para entender bien tu negocio y los problemas que necesitas resolver. Sin presiones ni compromisos.', grad: 'from-[#3B82F6] to-[#6366f1]' },
    { num: '02', title: 'Propuesta concreta', desc: 'En 48 horas te enviamos una propuesta detallada: arquitectura, tecnologías, cronograma y precio. Sin sorpresas después.', grad: 'from-[#6366f1] to-[#7C3AED]' },
    { num: '03', title: 'Desarrollo con visibilidad', desc: 'Trabajamos por sprints con demos cada semana. Ves el avance en tiempo real y puedes ajustar lo que necesites.', grad: 'from-[#7C3AED] to-[#8B5CF6]' },
    { num: '04', title: 'Lanzamiento sin sustos', desc: 'Migramos tus datos, capacitamos a tu equipo y hacemos pruebas exhaustivas. Nada sale a producción sin estar listo.', grad: 'from-[#8B5CF6] to-[#A855F7]' },
    { num: '05', title: 'Soporte de verdad', desc: 'Monitoreo activo, actualizaciones periódicas y escalamiento cuando tu operación lo pida. No desaparecemos al entregar.', grad: 'from-[#A855F7] to-[#D946EF]' },
  ];

  return (
    <section className="py-28 md:py-36 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-blue-50 border border-blue-200 rounded-full text-xs font-semibold text-[#3B82F6] uppercase tracking-widest mb-6">
            Proceso
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] tracking-tight mb-4">
            Cómo trabajamos juntos
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto leading-relaxed">
            Un proceso claro, sin sorpresas. Sabes en todo momento en qué punto está tu proyecto y qué viene después.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-5">
          {steps.map((s, i) => (
            <motion.div key={s.num} initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white border border-gray-100 hover:border-gray-200 rounded-2xl p-7 hover:shadow-xl hover:shadow-gray-200/70 transition-all duration-300 hover:-translate-y-1">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.grad} flex items-center justify-center mb-5 shadow-md`}>
                <span className="text-white text-xs font-bold font-mono">{s.num}</span>
              </div>
              <h3 className="text-[#0F172A] font-semibold mb-3 leading-snug">{s.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── CTA BANNER — impacto máximo ───────────────────── */
const CTABanner = () => (
  <section className="py-10 px-6 md:px-12">
    <div className="max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-3xl p-12 md:p-16 text-center bg-gradient-to-br from-[#0F172A] via-[#1E1040] to-[#1E1B4B]">
        {/* Orbs decorativos */}
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-[#3B82F6]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#8B5CF6]/10 rounded-full blur-3xl pointer-events-none" />
        {/* Grid sutil */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '48px 48px' }} />

        <div className="relative z-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 border border-white/20 rounded-full text-xs font-semibold text-white/70 uppercase tracking-widest mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#A78BFA]" />
            ¿Tienes un proyecto en mente?
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-5 max-w-2xl mx-auto leading-[1.1]">
            Tu próximo proyecto merece un equipo que{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#60A5FA] to-[#A78BFA]">
              ya lo ha hecho antes
            </span>
          </h2>
          <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            La primera conversación no tiene costo. Analizamos tu caso y te decimos con honestidad si podemos ayudarte y cómo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => openWA('cta')}
              className="group flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] text-white font-semibold rounded-xl hover:shadow-2xl hover:shadow-blue-500/30 hover:-translate-y-0.5 transition-all duration-200">
              Quiero hablar con el equipo
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center justify-center gap-2 px-8 py-4 border border-white/20 hover:border-white/40 text-white/80 hover:text-white font-medium rounded-xl hover:bg-white/5 transition-all duration-200">
              <Mail className="w-5 h-5" /> Escribirnos
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

/* ─── CONTACT ───────────────────────────────────────── */
const WA_ICON = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const FORM_ENDPOINT = `https://formsubmit.co/ajax/${getContactEmail()}`;

const ContactLanding = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
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
          _subject: `Nuevo contacto web — ${form.name}`,
          _template: 'table',
          _captcha: 'false',
          _replyto: form.email,
        }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || data?.success === false || data?.success === 'false') throw new Error();
      setSuccess(true);
      trackLeadGenerated('form', 'contact_landing');
      setForm({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => setSuccess(false), 4000);
    } catch {
      setError('Algo falló al enviar el formulario. Puedes escribirnos directamente por WhatsApp o email y te respondemos de inmediato.');
    } finally {
      setSubmitting(false);
    }
  };

  const openWAContact = () => {
    trackContactClick('whatsapp', 'contact_section');
    trackLeadGenerated('whatsapp', 'contact_section');
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Hola, les escribo desde su sitio web. Me gustaría saber más sobre sus servicios. ¿Podemos conversar?')}`, '_blank');
  };

  const inputCls = 'w-full bg-[#080E1C] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-[#3B82F6]/60 transition-colors text-sm';
  const labelCls = 'block text-sm font-medium text-slate-300 mb-2';

  return (
    <section id="contacto" className="py-28 bg-[#080E1C] relative overflow-hidden">
      {/* orbs */}
      <div className="absolute top-0 right-0 w-[600px] h-[400px] bg-[#3B82F6]/[0.05] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[400px] bg-[#8B5CF6]/[0.05] rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-[#3B82F6]/15 border border-[#3B82F6]/25 rounded-full text-xs font-semibold text-[#60A5FA] uppercase tracking-widest mb-5">
            Contacto
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            Cuéntanos qué necesitas
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto leading-relaxed">
            Escríbenos o llámanos. Te respondemos en menos de 24 horas con una propuesta concreta, sin rodeos ni letra pequeña.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* ── Izquierda: info de contacto ── */}
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} className="space-y-6">

            {/* WhatsApp — opción destacada */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border border-emerald-500/20 p-7">
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl" />
              <div className="relative flex items-start gap-5">
                <div className="w-14 h-14 bg-emerald-500/15 border border-emerald-500/30 rounded-2xl flex items-center justify-center text-emerald-400 flex-shrink-0">
                  <WA_ICON />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold text-lg mb-1">WhatsApp directo</h3>
                  <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                    La forma más rápida de hablar con nosotros. Nuestro equipo técnico responde en minutos dentro del horario de oficina.
                  </p>
                  <button onClick={openWAContact}
                    className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-emerald-500/25">
                    <WA_ICON />
                    +1 (334) 732-4056
                  </button>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-5 p-6 bg-[#0C1220] border border-white/[0.07] hover:border-white/15 rounded-2xl transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-[#3B82F6]/15 border border-[#3B82F6]/25 flex items-center justify-center text-[#60A5FA] flex-shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-slate-500 text-xs uppercase tracking-widest mb-1">Email</p>
                <button onClick={() => openEmailClient('Consulta desde amephia.com')}
                  className="text-white font-medium hover:text-[#60A5FA] transition-colors text-sm">
                  info@amephia.com
                </button>
              </div>
            </div>

            {/* Teléfono */}
            <div className="flex items-center gap-5 p-6 bg-[#0C1220] border border-white/[0.07] hover:border-white/15 rounded-2xl transition-colors">
              <div className="w-12 h-12 rounded-xl bg-[#8B5CF6]/15 border border-[#8B5CF6]/25 flex items-center justify-center text-[#A78BFA] flex-shrink-0">
                <PhoneCall className="w-5 h-5" />
              </div>
              <div>
                <p className="text-slate-500 text-xs uppercase tracking-widest mb-1">Teléfono</p>
                <p className="text-white font-medium text-sm">+1 (334) 732-4056</p>
              </div>
            </div>

            {/* Disponibilidad */}
            <div className="flex items-center gap-5 p-6 bg-[#0C1220] border border-white/[0.07] rounded-2xl">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 flex-shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-slate-500 text-xs uppercase tracking-widest mb-1">Disponibilidad</p>
                <p className="text-white font-medium text-sm">Lun – Vie · 9:00 – 18:00 (GMT-5)</p>
                <p className="text-slate-500 text-xs mt-0.5">Respuesta garantizada en 24 hrs</p>
              </div>
            </div>
          </motion.div>

          {/* ── Derecha: formulario ── */}
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[#0C1220] border border-white/[0.08] rounded-2xl p-8">

            <h3 className="text-white font-semibold text-lg mb-1">Escríbenos</h3>
            <p className="text-slate-500 text-sm mb-8">Cuéntanos tu proyecto y te preparamos una propuesta sin costo y sin compromisos.</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelCls}>Nombre *</label>
                  <input type="text" name="name" value={form.name} onChange={handleChange}
                    placeholder="Tu nombre completo" required className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Teléfono</label>
                  <input type="tel" name="phone" value={form.phone} onChange={handleChange}
                    placeholder="+1 (334) 000 0000" className={inputCls} />
                </div>
              </div>

              <div>
                <label className={labelCls}>Email *</label>
                <input type="email" name="email" value={form.email} onChange={handleChange}
                  placeholder="tu@empresa.com" required className={inputCls} />
              </div>

              <div>
                <label className={labelCls}>¿Qué necesitas? *</label>
                <textarea name="message" value={form.message} onChange={handleChange}
                  placeholder="Cuéntanos qué necesitas, aunque sea en pocas palabras..." required rows={5}
                  className={`${inputCls} resize-none`} />
              </div>

              <button type="submit" disabled={submitting}
                className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-[#3B82F6] to-[#6366f1] hover:from-[#2563eb] hover:to-[#4f46e5] text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-xl hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed">
                {submitting
                  ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  : <><span>Enviar</span><ArrowRight className="w-5 h-5" /></>
                }
              </button>

              {success && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 p-4 bg-emerald-500/10 border border-emerald-500/25 rounded-xl text-emerald-400 text-sm">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                  ¡Listo! Recibimos tu mensaje y te escribimos antes de 24 horas.
                </motion.div>
              )}

              {error && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                  <p className="mb-3">{error}</p>
                  <div className="flex gap-3">
                    <button type="button" onClick={() => openEmailClient('Consulta desde web')}
                      className="px-4 py-2 border border-white/15 hover:bg-white/5 rounded-lg text-white text-xs transition-colors">
                      Enviar email
                    </button>
                    <button type="button" onClick={openWAContact}
                      className="px-4 py-2 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10 rounded-lg text-xs transition-colors">
                      WhatsApp
                    </button>
                  </div>
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* ─── FOOTER ────────────────────────────────────────── */
const Footer = ({
  onOpenProject,
  onOpenLegal,
}: {
  onOpenProject: (id: ProjectId) => void;
  onOpenLegal: (page: Exclude<LegalPage, null>) => void;
}) => {
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer className="bg-[#050A14] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <img src={logo} alt="AmePhia" className="h-7 w-auto object-contain mb-5 brightness-0 invert opacity-80" />
            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              Empresa ecuatoriana de desarrollo de software. Más de diez años construyendo
              soluciones para negocios en Ecuador y el resto de Latinoamérica.
            </p>
            <div className="flex gap-3">
              {[
                { href: waURL(), icon: <PhoneCall className="w-4 h-4" />, hover: 'hover:border-emerald-500/50 hover:bg-emerald-500/10 hover:text-emerald-400', track: () => trackContactClick('whatsapp', 'footer') },
                { href: 'mailto:info@amephia.com', icon: <Mail className="w-4 h-4" />, hover: 'hover:border-blue-500/50 hover:bg-blue-500/10 hover:text-blue-400', track: () => trackContactClick('email', 'footer') },
              ].map((b, i) => (
                <a key={i} href={b.href} target="_blank" rel="noopener noreferrer" onClick={b.track}
                  className={`w-9 h-9 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-slate-500 transition-all ${b.hover}`}>
                  {b.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Servicios</h4>
            <ul className="space-y-2.5">
              {['Desarrollo Web & Apps', 'ERPs & Sistemas', 'E-commerce', 'Facturación SRI', 'Cloud & AWS', 'Automatización'].map(s => (
                <li key={s}><button onClick={() => go('servicios')} className="text-slate-500 hover:text-slate-200 text-sm transition-colors">{s}</button></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Productos</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'ERP para Gimnasios', id: 'gym' as ProjectId },
                { label: 'Broker Seguro', id: 'broker-seguro' as ProjectId },
                { label: 'Gestión Migratoria', id: 'migration' as ProjectId },
                { label: 'E-commerce', id: 'ecommerce' as ProjectId, url: 'https://ameshop.ec/' },
                { label: 'Facturación SRI', id: 'facturacion' as ProjectId },
                { label: 'Punto de Venta', id: 'pos' as ProjectId },
              ].map(p => (
                <li key={p.id}><button onClick={() => ('url' in p && p.url) ? window.open(p.url, '_blank') : onOpenProject(p.id)} className="text-slate-500 hover:text-slate-200 text-sm transition-colors">{p.label}</button></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Contacto</h4>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center gap-3 text-sm text-slate-500">
                <PhoneCall className="w-4 h-4 text-[#3B82F6] flex-shrink-0" /> +1 (334) 732-4056
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-500">
                <Mail className="w-4 h-4 text-[#3B82F6] flex-shrink-0" /> info@amephia.com
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-500">
                <Globe className="w-4 h-4 text-[#3B82F6] flex-shrink-0 mt-0.5" /> Ecuador · Latinoamérica
              </li>
            </ul>
            <button onClick={() => openWA('cta')}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all">
              <PhoneCall className="w-4 h-4" /> Hablar ahora
            </button>
          </div>
        </div>

        <div className="border-t border-white/[0.06] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-600 text-xs font-mono">© 2026 AmePhia Systems Inc. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            {[
              { label: 'Términos de uso', page: 'terms' as const },
              { label: 'Privacidad', page: 'privacy' as const },
            ].map(l => (
              <button key={l.label} onClick={() => onOpenLegal(l.page)} className="text-slate-600 hover:text-slate-400 text-xs transition-colors">
                {l.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

/* ─── EXPORT ────────────────────────────────────────── */
interface CompanyLandingProps {
  onOpenProject: (id: ProjectId) => void;
}

export const CompanyLanding = ({ onOpenProject }: CompanyLandingProps) => {
  const [legalPage, setLegalPage] = useState<LegalPage>(null);

  return (
    <div className="relative min-h-screen bg-[#080E1C] text-gray-900 selection:bg-blue-200 font-sans overflow-x-hidden">
      <div className="noise-overlay" />

      <Navbar />

      {/* Hero — oscuro, impacto */}
      <HeroSection />

      {/* Stats — claro, credibilidad */}
      <StatsStrip />

      {/* Servicios — claro, productos claros */}
      <ServicesSection />

      {/* Tech — oscuro, dominio técnico */}
      <TechSection />

      {/* Productos — claro, oferta concreta */}
      <ProductsSection onOpenProject={onOpenProject} />

      {/* About — oscuro, seriedad / autoridad */}
      <AboutSection />

      {/* Proceso — claro, confianza */}
      <ProcessSection />

      {/* CTA — oscuro, conversión */}
      <CTABanner />

      <ContactLanding />

      {/* Footer — muy oscuro, cierre premium */}
      <Footer onOpenProject={onOpenProject} onOpenLegal={setLegalPage} />
      <LegalModal page={legalPage} onClose={() => setLegalPage(null)} />
    </div>
  );
};
